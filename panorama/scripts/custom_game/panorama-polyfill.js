--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


// Auto-generated from package.json Polyfill (timers.js, console.js, index.ts, enums.ts, constant.ts, localization.ts, request.js, command.ts, keybind.ts, Entities.ts, Players.ts, Abilities.ts, net_table.js, store.ts, properties.ts)

// ========== timers.js ==========
!function () { "use strict"; const e = new Map; let l = -1e5; const t = (e, l = 0, ...t) => $.Schedule(l / 1e3, (() => e(...t))); function c(t, c = 0, ...a) { c /= 1e3, l -= 1; const s = l, n = () => { e.set(s, $.Schedule(c, n)), t(...a); }; return e.set(s, $.Schedule(c, n)), s; } const a = (e, ...l) => $.Schedule(0, (() => e(...l))); function s(l) { if ("number" == typeof l) try { l < -1e5 ? e.has(l) && ($.CancelScheduled(e.get(l)), e.delete(l)) : $.CancelScheduled(l); } catch { } } globalThis.setInterval = c, globalThis.clearInterval = s, globalThis.setTimeout = t, globalThis.clearTimeout = s, globalThis.setImmediate = a, globalThis.clearImmediate = s; }();
// ========== console.js ==========
!function () { "use strict"; function e(e, ...t) { if ("string" != typeof e) return [e, ...t].map((e => n(e))).join(" "); let o = String(e).replace(/%[sdj%]/g, (e => { if ("%%" === e) return "%"; if (0 === t.length) return e; switch (e) { case "%s": return String(t.shift()); case "%d": return String(Number(t.shift())); case "%j": try { return JSON.stringify(t.shift()); } catch { return "[Circular]"; } default: return e; } })); for (const e of t) o += "object" != typeof e || null === e ? ` ${e}` : ` ${n(e)}`; return o; } function n(e, o, r = "") { let i = ""; if ("string" == typeof e) i = `"${e}"`; else if ("number" == typeof e || "boolean" == typeof e) i = `${e}`; else if ("function" == typeof e) i = function (e) { if ("function" != typeof e) return !1; const n = Object.getOwnPropertyDescriptor(e, "prototype"); return !!n && !n.writable; }(e) ? `[class ${e.name}]` : `[function ${e.name}]`; else if ("symbol" == typeof e) i = e.toString(); else if (void 0 === e) i = "undefined"; else if ("bigint" == typeof e) i = `[bigint ${e.toString()}]`; else if ("object" == typeof e) if (null === e) i = "null"; else if (Array.isArray(e)) { let t = []; for (const i of e) t.push(r + n(i, o, o ? r + "    " : r)); o ? (i += "[\n", i += t.map((e => "    " + e)).join(",\n"), i += "\n" + r + "]") : i = `[ ${t.join(", ")} ]`; } else { let s = [], c = ""; if (e instanceof Map) { c = "[Map]"; for (const [t, i] of e.entries()) { let e = ""; "object" == typeof t ? e = Array.isArray(t) ? "[Array]" : "[Object]" : t.toString && (e = t.toString()), s.push(`${r}${e}: ${n(i, o, o ? r + "    " : r)}`); } } else if (e instanceof Set) { c = "[Set]"; for (const t of e.values()) s.push(`${r}${n(t, o, o ? r + "    " : r)}`); } else { const i = t(e); for (const [t, c] of Object.entries(e)) "style" === t && i ? s.push(`${r}${t}: [VCSSStyleDeclaration]`) : s.push(`${r}${t}: ${n(c, o, o ? r + "    " : r)}`); } o ? (i += c + "{\n", i += s.map((e => "    " + e)).join(",\n"), i += "\n" + r + "}") : i = c + `{ ${s.join(", ")} }`; } return i; } const t = e => "paneltype" in e && "rememberchildfocus" in e && "SetPanelEvent" in e; function o(e) { for (const n of e.split("\n")) if (n.length > 2047) { const e = "... (line have been trimmed because of a length limit)"; $.Warning(`${n.slice(0, 2047 - e.length)}${e}`); } else $.Msg(n); } function r(...n) { $.Warning(e(...n)); } const i = r; function s(...n) { o(e(...n)); } const c = s, l = s, f = new Map; const u = { logx: function (...e) { o(function (e, ...t) { if ("string" != typeof e) return [e, ...t].map((e => n(e, !0))).join(" "); let o = String(e).replace(/%[sdj%]/g, (e => { if ("%%" === e) return "%"; if (0 === t.length) return e; switch (e) { case "%s": return String(t.unshift()); case "%d": return String(Number(t.unshift())); case "%j": try { return JSON.stringify(t.unshift()); } catch { return "[Circular]"; } default: return e; } })); for (const e of t) o += "object" != typeof e || null === e ? ` ${e}` : ` ${n(e)}`; return o; }(...e)); }, assert: function (e, n = "console.assert", ...t) { e || r(new Error(`Assertion failed: ${n}`), ...t); }, warn: i, error: r, log: s, debug: c, info: l, time: function (e = "default") { e = `${e}`, f.has(e) ? i(`Timer '${e}' already exists`) : f.set(e, Date.now()); }, timeEnd: function (e = "default") { e = `${e}`; const n = f.get(e); null != n ? (f.delete(e), o(`${e}: ${Date.now() - n}ms`)) : i(`Timer '${e} does not exist'`); }, trace: function n(t = "", ...r) { const i = { message: e(t, ...r), name: "Trace", stack: "" }; Error.captureStackTrace(i, n), o(e(i.stack)); }, clear: function () { }, dir: function () { throw new Error("console.dir is not implemented"); }, dirxml: function () { throw new Error("console.dirxml is not implemented"); }, table: function () { throw new Error("console.table is not implemented"); }, count: function () { throw new Error("console.count is not implemented"); }, countReset: function () { throw new Error("console.countReset is not implemented"); }, group: function () { throw new Error("console.group is not implemented"); }, groupCollapsed: function () { throw new Error("console.groupCollapsed is not implemented"); }, groupEnd: function () { throw new Error("console.groupEnd is not implemented"); }, profile: function () { throw new Error("console.profile is not implemented"); }, profileEnd: function () { throw new Error("console.profileEnd is not implemented"); }, timeStamp: function () { throw new Error("console.timeStamp is not implemented"); } }; globalThis.console = u; }();
// ========== index.ts ==========
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var CustomUIConfig = GameUI.CustomUIConfig();
var KeyValues = GameUI.CustomUIConfig();
var Camera = GameUI.CustomUIConfig().Camera;
var Storage = GameUI.CustomUIConfig().Storage;
var Timer = GameUI.CustomUIConfig().Timer;
var STEAM_WEB_KEY = "D34B40626FBA6E482A7653E4FB8A80CB";
var Digit;
(function (Digit) {
    Digit[Digit["K"] = 1] = "K";
    Digit[Digit["M"] = 2] = "M";
    Digit[Digit["G"] = 3] = "G";
    Digit[Digit["T"] = 4] = "T";
    Digit[Digit["P"] = 5] = "P";
    Digit[Digit["E"] = 6] = "E";
    Digit[Digit["Z"] = 7] = "Z";
    Digit[Digit["Y"] = 8] = "Y";
    Digit[Digit["R"] = 9] = "R";
})(Digit || (Digit = {}));
// 中文单位
var DigitSchinese;
(function (DigitSchinese) {
    DigitSchinese[DigitSchinese["\u4E07"] = 1] = "\u4E07";
    DigitSchinese[DigitSchinese["\u4EBF"] = 2] = "\u4EBF";
    DigitSchinese[DigitSchinese["\u5146"] = 3] = "\u5146";
    DigitSchinese[DigitSchinese["\u4EAC"] = 4] = "\u4EAC";
    DigitSchinese[DigitSchinese["\u5793"] = 5] = "\u5793";
    DigitSchinese[DigitSchinese["\u79ED"] = 6] = "\u79ED";
    DigitSchinese[DigitSchinese["\u7A70"] = 7] = "\u7A70";
    DigitSchinese[DigitSchinese["\u6C9F"] = 8] = "\u6C9F";
    DigitSchinese[DigitSchinese["\u6DA7"] = 9] = "\u6DA7";
})(DigitSchinese || (DigitSchinese = {}));
GameEvents.SendCustomEventToServer = function (pEventName, eventData) {
    if (!(Players.GetLocalPlayer() == -1 || Players.IsSpectator(Players.GetLocalPlayer()) || Players.IsLocalPlayerLiveSpectating())) {
        GameEvents.SendCustomGameEventToServer(pEventName, eventData);
    }
};
JSON.parseSafe = function (text, reviver) {
    if (text == "")
        return undefined;
    try {
        return JSON.parse(text, reviver);
    }
    catch (error) {
        error.message += '\n\tparams={text:' + text + '}';
        print(error === null || error === void 0 ? void 0 : error.stack);
        return undefined;
    }
};
function print() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (!Game.IsInToolsMode()) {
        return;
    }
    var s = "";
    var a = __spreadArray([], args, true);
    a.forEach(function (e) {
        if (s != "") {
            s += "\t";
        }
        if (typeof (e) == "function" && e.length == 0) {
            e = e();
        }
        if (typeof (e) == "object") {
            s = s + JSON.stringify(e);
        }
        else {
            s = s + String(e);
        }
    });
    if (s.length > 2000) {
        for (var i = 0; i < s.length; i += 2000) {
            $.Msg(s.slice(i, Math.min(s.length, i + 2000)));
        }
    }
    else {
        $.Msg(s);
    }
}
/**
 * 四舍五入
 * @param fNumber 数值
 * @param prec 精确到小数点几位，选填，默认0
 */
function Round(fNumber, prec) {
    if (prec === void 0) { prec = 0; }
    var i = Math.pow(10, prec);
    return Math.round(fNumber * i) / i;
}
/**
 * 区间限定函数
 * @param num 数值
 * @param min 最大值
 * @param max 最小值
 * @returns 返回限定区间的值
 */
function Clamp(num, min, max) {
    return num <= min ? min : (num >= max ? max : num);
}
/**
 * 线性插值函数
 * @param percent 百分比（0~1）
 * @param a 起始值
 * @param b 结束值
 * @returns 返回插值结果
 */
function Lerp(percent, a, b) {
    return a + percent * (b - a);
}
/**
 * 重映射区间函数
 * @param num 数值
 * @param a 初始区间最小值
 * @param b 初始区间最大值
 * @param c 最终区间最小值
 * @param d 最终区间最大值
 * @returns 返回重映射区间的值
 */
function RemapVal(num, a, b, c, d) {
    if (a == b)
        return c;
    var percent = (num - a) / (b - a);
    return Lerp(percent, c, d);
}
/**
 * 重映射区间限定函数
 * @param num 数值
 * @param a 初始区间最小值
 * @param b 初始区间最大值
 * @param c 最终区间最小值
 * @param d 最终区间最大值
 * @returns 返回重映射区间的值
 */
function RemapValClamped(num, a, b, c, d) {
    if (a == b)
        return c;
    var percent = (num - a) / (b - a);
    percent = Clamp(percent, 0.0, 1.0);
    return Lerp(percent, c, d);
}
/**
 * 在对象里寻找值
 * @param o 对象
 * @param v 值
 * @returns 返回值的key，无此值则返回undefined
 */
function FindKey(o, v) {
    for (var k in o) {
        if (o[k] == v)
            return k;
    }
}
/** 处理错误Float */
function Float(f) {
    return Math.round(f * 10000) / 10000;
}
/**
 * 将矢量转化为字符串（方便lua端和js端通讯）
 * @param vec 矢量
 * @returns 返回以空格分隔坐标的字符串
 */
function VectorToString(vec) {
    return vec.join(" ");
}
/**
 * 将字符串转化为矢量（方便lua端和js端通讯）
 * @param str 空格分隔坐标的字符串
 * @returns 返回矢量
 */
function StringToVector(str) {
    var a = str.split(" ");
    return [Number(a[0]), Number(a[1]), Number(a[2])];
}
/**
 * 递归打印对象结构
 * @param obj 要打印的对象
 * @param name 对象名称
 * @param str 缩进字符串
 * @param map 已访问对象的映射，用于避免循环引用
 */
function alertObj(obj, name, str, map) {
    if (!Game.IsInToolsMode()) {
        return;
    }
    var output = "";
    if (name == null) {
        name = toString(obj);
    }
    if (str == null) {
        str = "";
    }
    if (map == null) {
        map = new Map();
    }
    map.set(obj, true);
    $.Msg(str + name + "\n" + str + "{");
    for (var k in obj) {
        var property = obj[k];
        if (typeof (property) == "object") {
            if (map.get(property)) {
                $.Msg(str + "\t" + k + " = [already seen]");
                continue;
            }
            alertObj(property, k, str + "\t", map);
        }
        else {
            output = k + " = " + property + "\t(" + typeof (property) + ")";
            $.Msg(str + "\t" + output);
        }
    }
    $.Msg(str + "}");
}
/**
 * 深度打印对象的所有属性和结构
 * @param obj 要打印的对象
 */
function DeepPrint(obj) {
    return alertObj(obj);
}
/**
 * 符号分割器 - 将内容按指定分隔符分割并转换为对象
 * @param content 要分割的内容
 * @param symbol1 第一级分隔符
 * @param symbol2 第二级分隔符
 * @returns 分割后的对象
 */
function SymbolSpliter(content, symbol1, symbol2) {
    return Object.fromEntries(content.split(symbol1).map(function (str) {
        return str.split(symbol2);
    }));
}
/** 获取当前语言
 * @returns 当前语言字符串（仅返回 english、russian 或 schinese）
 */
function Language() {
    // 获取当前语言的逻辑
    var language = $.Language().toLowerCase();
    // 只返回english, russian和schinese两种语言，其他语言均返回english
    if (language !== "russian" && language !== "schinese") {
        language = "english";
    }
    return language;
}
CustomUIConfig._unique_id = CustomUIConfig._unique_id || 0;
/**
 * 获取随机字符串
 * @param {string} string 基础字符串
 * @returns {string}
 */
function DoUniqueString(string) {
    return "".concat(string).concat(CustomUIConfig._unique_id++);
}
;
function EnsureSceneLoadSerialState() {
    CustomUIConfig._scene_load_serial_queue = CustomUIConfig._scene_load_serial_queue || {};
    CustomUIConfig._scene_load_serial_active = CustomUIConfig._scene_load_serial_active || {};
    return {
        queue: CustomUIConfig._scene_load_serial_queue,
        active: CustomUIConfig._scene_load_serial_active,
    };
}
function TryStartNextSerialSceneLoad(entityName) {
    var state = EnsureSceneLoadSerialState();
    if (state.active[entityName] !== undefined) {
        return;
    }
    var queue = state.queue[entityName];
    if (queue == undefined || queue.length == 0) {
        return;
    }
    var next = queue.shift();
    if (next == undefined) {
        return;
    }
    state.active[entityName] = next.token;
    next.activate();
}
function QueueSerialSceneEntityLoad(entityName, activate) {
    var token = DoUniqueString("".concat(entityName, "_serial_scene_load_"));
    var state = EnsureSceneLoadSerialState();
    if (state.queue[entityName] == undefined) {
        state.queue[entityName] = [];
    }
    state.queue[entityName].push({ token: token, activate: activate });
    TryStartNextSerialSceneLoad(entityName);
    return token;
}
function ReleaseSerialSceneEntityLoad(entityName, token) {
    var state = EnsureSceneLoadSerialState();
    if (state.active[entityName] == token) {
        state.active[entityName] = undefined;
        TryStartNextSerialSceneLoad(entityName);
        return;
    }
    var queue = state.queue[entityName];
    if (queue == undefined) {
        return;
    }
    for (var i = 0; i < queue.length; i++) {
        if (queue[i].token == token) {
            queue.splice(i, 1);
            break;
        }
    }
}
/** 保存数据到面板的Data属性中
 * @param panel 目标面板
 * @param key 键
 * @param value 值
 */
function SaveData(panel, key, value) {
    panel.Data()[key] = value;
}
;
/** 从面板的Data属性中加载数据
 * @param panel 目标面板
 * @param key 键
 * @returns 值
 */
function LoadData(panel, key) {
    return panel.Data()[key];
}
;
/** 返回`url('file://{images}/custom_game/${relativePath}')` */
function getImagePath(relativePath) {
    if (typeof relativePath == "string") {
        return "url('file://{images}/custom_game/".concat(relativePath, "')");
    }
    else {
        return "url('file://{images}/custom_game/".concat(relativePath.join("/"), "')");
    }
}
/** 返回`s2r://panorama/images/custom_game/${relativePath.replace(".png", "_png")}.vtex` */
function getSrcPath(relativePath) {
    if (typeof relativePath == "string") {
        return "s2r://panorama/images/custom_game/".concat(relativePath.replace(".png", "_png"), ".vtex");
    }
    else {
        return "s2r://panorama/images/custom_game/".concat(relativePath.join("/").replace(".png", "_png"));
    }
}
function ToggleWindow(windowName, state, data) {
    ClientSideEvent("custom_ui_toggle_windows", { windowName: windowName, state: state, data: data });
}
/** 封装客户端消息 */
function useToggleWindow(windowName, value, setter) {
    return GameEvents.Subscribe("custom_ui_toggle_windows", function (eventData) {
        if (eventData.windowName == windowName) {
            if (eventData.state === undefined) {
                setter(!value());
            }
            else {
                //@ts-ignore
                setter(eventData.state == 1 || eventData.state === true);
            }
        }
        else {
            setter(false);
        }
    });
}
/** 发送UI端事件到客户端 */
function ClientSideEvent(eventName, eventData) {
    GameEvents.SendEventClientSide("client_side_event", { event_name: eventName, event_data: JSON.stringify(eventData) });
}
/** 发送UI端事件到所有客户端 */
function AllClientSideEvent(eventName, eventData) {
    GameEvents.SendCustomGameEventToAllClients("client_side_event", { event_name: eventName, event_data: JSON.stringify(eventData) });
}
/** 封装客户端消息，轻量化使用，现写现用所以不写定义 */
function useClientSideEvent(eventName, callback) {
    return GameEvents.Subscribe("client_side_event", function (eventData) {
        if (eventName == eventData.event_name) {
            callback(JSON.parseSafe(eventData.event_data));
        }
    });
}
function ShowContextMenu(panel, name, showArrow) {
    if (showArrow === void 0) { showArrow = true; }
    var contextMenu = $.CreatePanel("ContextMenuScript", panel, "");
    if (showArrow) {
        contextMenu.AddClass("ContextMenuBlackArrow");
    }
    contextMenu.GetContentsPanel().BLoadLayout("file://{resources}/layout/custom_game/context_menus/".concat(name, ".xml"), false, false);
    return contextMenu.GetContentsPanel();
}
function HideContextMenu() {
    $.DispatchEvent("DismissAllContextMenus");
}
function CallAction(actionName, params) {
    GameEvents.SendCustomEventToServer("call_action", {
        actionName: actionName,
        params: JSON.stringify(params)
    });
}
function CallActionRequest(action, params, callback, onTimeOut, showAddItem) {
    ServerRequest("call_action_request", {
        action: action,
        action_params: params,
        showAddItems: showAddItem !== null && showAddItem !== void 0 ? showAddItem : true
    }, function (result) {
        callback(result);
    }, undefined, onTimeOut);
}
function finiteNumber(i, defaultVar) {
    if (defaultVar === void 0) { defaultVar = 0; }
    return isFinite(i) ? i : defaultVar;
}
function toFiniteNumber(i, defaultVar) {
    if (defaultVar === void 0) { defaultVar = 0; }
    return finiteNumber(Number(i), defaultVar);
}
function toString(i) {
    var t = typeof i;
    return (t == "number" || t == "string" || t == "boolean") ? String(i) : undefined;
}
function toFiniteString(i, defaultVar) {
    var _a;
    if (defaultVar === void 0) { defaultVar = ""; }
    return (_a = toString(i)) !== null && _a !== void 0 ? _a : defaultVar;
}
/** 调用Lua客户端全局函数，有返回值 */
function CallLuaClientFunction(funcName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var t = ClientRequest("call_lua_client_function", {
        func_name: funcName,
        args_json: JSON.stringify(args)
    });
    return t === null || t === void 0 ? void 0 : t.value;
}
;
function CallLuaClientAction(funcName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    GameEvents.SendEventClientSide("call_lua_client_action", {
        func_name: funcName,
        json: JSON.stringify(args),
    });
}
;
function GetCursorEntity(aPosition) {
    if (aPosition === void 0) { aPosition = GameUI.GetCursorPosition(); }
    var targets = GameUI.FindScreenEntities(aPosition);
    var world_position = GameUI.GetScreenWorldPosition(aPosition);
    if (world_position == undefined)
        return -1;
    var targets1 = targets.filter(function (e) {
        return e.accurateCollision;
    });
    var targets2 = targets.filter(function (e) {
        return !e.accurateCollision;
    });
    targets = targets1;
    if (targets1.length == 0) {
        targets = targets2;
    }
    if (targets.length == 0) {
        return -1;
    }
    targets.sort(function (a, b) {
        var a_loc = Entities.GetAbsOrigin(a.entityIndex);
        var b_loc = Entities.GetAbsOrigin(b.entityIndex);
        return Game.Length2D(a_loc, world_position) - Game.Length2D(b_loc, world_position);
    });
    return targets[0].entityIndex;
}
;
/** steam短id转长id */
function Steam_3_64(steamid_3) {
    return "7656" + (parseFloat(steamid_3) + 1197960265728);
}
/** steam长id转短id */
function Steam_64_3(steamid_64) {
    return "" + (parseFloat((steamid_64 + "").substring(4)) - 1197960265728);
}
/** 显示一个popup，data中可以传入PopupID指定ID，如果已经存在则不会重新创建，group可以用closePopupGroup来批量关闭 */
function ShowPopup(popupName, data) {
    var _a;
    //@ts-ignore
    var PopupID = (_a = data.PopupID) !== null && _a !== void 0 ? _a : DoUniqueString("Popup");
    GameEvents.SendEventClientSide("client_side_event", { event_name: "show_popup", event_data: JSON.stringify(Object.assign(data, { popupName: popupName, PopupID: PopupID })) });
    return PopupID;
}
/** 关闭一个popup */
function ClosePopup(PopupID) {
    GameEvents.SendEventClientSide("client_side_event", { event_name: "close_popup_fadeout", event_data: { PopupID: PopupID } });
    $.Schedule(0.2, function () {
        GameEvents.SendEventClientSide("client_side_event", { event_name: "close_popup", event_data: { PopupID: PopupID } });
    });
}
/** 关闭一个popup组 */
function ClosePopupGroup(group) {
    GameEvents.SendEventClientSide("client_side_event", { event_name: "close_popup_fadeout", event_data: { group: group } });
    $.Schedule(0.2, function () {
        GameEvents.SendEventClientSide("client_side_event", { event_name: "close_popup", event_data: { group: group } });
    });
}
/**
 *
 * @param entityName
 * @param data
 */
function WaitSceneEntityLoad(entityName, data) {
    var key = DoUniqueString("WaitSceneEntityLoad");
    GameEvents.SendEventClientSide("wait_scene_entity_load", {
        name: entityName,
        key: key,
        data: JSON.stringify(data),
    });
    return key;
}
function StopWaitSceneEntityLoad(entityName, key) {
    GameEvents.SendEventClientSide("wait_scene_entity_load", {
        name: entityName,
        key: key,
    });
}
/**
 *  将键值对序列化为URLQuery格式
 * @param data
 */
function URLQuerySerialize(data) {
    var stringList = [];
    var first = true;
    for (var k in data) {
        var v = data[k];
        if (!(typeof v == "string" || typeof v == "number")) {
            continue;
        }
        if (!first) {
            stringList.push("&");
        }
        else {
            first = false;
        }
        stringList.push("".concat(k, "=").concat(encodeURIComponent(String(v))));
    }
    return stringList.join("");
}
/**
 * 显示自定义Tooltip
 * @param {Panel} 面板
 * @param {string} 名字
 */
function ShowCustomTooltip(panel, name, data) {
    $.DispatchEvent("UIShowCustomLayoutParametersTooltip", panel, name, "file://{resources}/layout/custom_game/tooltips/" + name + ".xml", URLQuerySerialize(data));
}
/**
 * 隐藏自定义Tooltip
 * @param {Panel} 面板
 * @param {string} 名字
 */
function HideCustomTooltip(panel, name) {
    $.DispatchEvent("UIHideCustomLayoutTooltip", panel, name);
}
function ToColor(text, color) {
    return "<font color='" + color + "'>" + text + "</font>";
}
/**
 * 通过英雄ID获取DOTA2英雄名字
 * @param iHeroID 英雄ID
 * @returns DOTA2英雄名字
 */
function GetHeroNameByHeroID(heroID) {
    for (var heroName in CustomUIConfig.heroes) {
        if (heroName != "Version") {
            var tHeroData = CustomUIConfig.heroes[heroName];
            if (tHeroData && Number(tHeroData.HeroID) == heroID) {
                return heroName;
            }
        }
    }
}
/**
 * 通过DOTA2英雄名字获取英雄ID
 * @param iHeroID 英雄ID
 * @returns DOTA2英雄名字
 */
function GetHeroIDByHeroName(heroName) {
    for (var sHeroName in CustomUIConfig.heroes) {
        if (sHeroName == heroName) {
            var tHeroData = CustomUIConfig.heroes[sHeroName];
            return Number(tHeroData.HeroID);
        }
    }
}
/**
 * 返回多个参数中第一个不为0的参数，一般用于多条件排序
 * @example 先以a降序，a相同的再以b降序
 * ```ts
 * array.sort((object_a, object_b) => {
 * 	return multiCompare(
 * 		object_b.a - object_a.a,
 * 		object_b.b - object_a.b,
 * 	);
 * });
 * ```
 */
function multiCompare() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (arg != 0) {
            return arg;
        }
    }
    return args[args.length - 1];
}
/**
 * 发送错误信息
 * @param msg 错误信息
 * @param sound 音效，选填，默认"General.CastFail_Custom"
 */
function ErrorMessage(msg, sound) {
    if (sound === void 0) { sound = "CastFail_Custom"; }
    GameUI.SendCustomHUDError(msg, sound);
}
function intToARGB(i) {
    return ('00' + (i & 0xFF).toString(16)).substr(-2) +
        ('00' + ((i >> 8) & 0xFF).toString(16)).substr(-2) +
        ('00' + ((i >> 16) & 0xFF).toString(16)).substr(-2) +
        ('00' + ((i >> 24) & 0xFF).toString(16)).substr(-2);
}
$.RandomInt = function (n, m) {
    // 修正为左闭右闭区间 [n, m]
    var random = RemapValClamped(Math.random(), 0, 1, n, m + 1);
    return Math.floor(random);
};
$.RandomFloat = function (n, m) {
    var random = RemapValClamped(Math.random(), 0, 1, n, m);
    return random;
};
$.RollPercentage = function (percent) {
    return RemapValClamped(Math.random(), 0, 1, 0, 100) < percent;
};
/**
 * 是否有某个资源
 * @param path 资源路径，`panorama/images/custom_game/tokens/510004.png` 或 `resource/flash3/images/spellicons/vespera_1.png`
 */
function HasResource(path) {
    // @ts-ignore
    var list = GameUI.CustomUIConfig().src_list;
    var normalized = path.startsWith("raw://") ? path.substring("raw://".length) : path;
    if (Array.isArray(list)) {
        return list.indexOf(normalized) !== -1;
    }
    return (list === null || list === void 0 ? void 0 : list[normalized]) != undefined;
}
/** 获取图标路径；Dota 内置图标读取资源包中的编译纹理。 */
function GetTexturePath(name, source) {
    if (source === void 0) { source = "auto"; }
    if (!name)
        return;
    if (source === "dota") {
        return name.startsWith("item_")
            ? "s2r://panorama/images/items/".concat(name.substring(5), "_png.vtex")
            : "s2r://panorama/images/spellicons/".concat(name, "_png.vtex");
    }
    if (name.startsWith("item_")) {
        var rawPath_1 = "resource/flash3/images/items/".concat(name.substring(5), ".png");
        if (HasResource(rawPath_1)) {
            return "raw://" + rawPath_1;
        }
        return "file://{images}/items/".concat(name.substring(5), ".png");
    }
    var rawPath = "resource/flash3/images/spellicons/".concat(name, ".png");
    if (HasResource(rawPath)) {
        return "raw://" + rawPath;
    }
    return "file://{images}/spellicons/".concat(name, ".png");
}
/** 跳转到指定菜单
 * @param events 包含window_name和menu字段的对象，
 * window_name 是要跳转的窗口， MenuButton_ + 菜单名，
 * menu 是要跳转的菜单（如果有的话），
 * menu2 是要跳转的二级菜单（如果有的话），
 * force 是是否强制跳转（如果为true则无论当前窗口状态如何都会跳转并打开窗口）
 * @example
 * JumpToMenu({ window_name: "MenuButton_hero", menu: "HeroTalent" });
 */
function JumpToMenu(events) {
    var _a;
    if ((events.window_name === "store" || events.window_name === "MenuButton_store")
        && (((_a = getServiceNetData("open_shop", Game.GetLocalPlayerID())) === null || _a === void 0 ? void 0 : _a.value) !== true)) {
        return;
    }
    if (!events.window_name.startsWith("MenuButton_")) {
        events.window_name = "MenuButton_" + events.window_name;
    }
    ClientSideEvent("toggle_window_tag", events);
}
/**
 * 根据属性配置的聚合策略，将当前累计值与新值聚合计算
 * 通过 ClientRequest 调用 Lua 客户端的 PropertySystem.AggregatePropertyValues 完成实际计算
 *
 * 聚合策略示例：
 * - SUM：直接相加（如伤害强度）
 * - MULTIPLY：乘算，((1+current*0.01)*(1+value*0.01)-1)*100
 * - MAX：取较大值
 *
 * @param propertyId 属性系统中的属性ID（如 "damage_intensity"），用于查找对应的聚合策略
 * @param current 当前已累计的值
 * @param value 本次新增的值
 * @returns 聚合后的结果值
 */
function CalculatePropertyValue(propertyId, current, value) {
    return CallLuaClientFunction("CalculatePropertyValue", propertyId, current, value);
}
function FormatNumber(fNumber, prec) {
    var _a = FormatNumberBase(fNumber, prec), a = _a[0], b = _a[1];
    if (b) {
        return a + b;
    }
    return a;
}
function NumberToString(fNumber) {
    var sNumber = String(fNumber);
    if (sNumber.indexOf("e+") != -1) {
        var s = sNumber.split("e+");
        s[0] = s[0].replace(/\./g, "");
        var n = finiteNumber(Number(s[1])) + 1;
        for (var index = s[0].length; index < n; index++) {
            s[0] += "0";
        }
        sNumber = s[0];
    }
    return sNumber;
}
function FormatNumberBase(fNumber, prec) {
    var sSign = fNumber < 0 ? "-" : "";
    fNumber = Math.abs(fNumber);
    var sNumber = NumberToString(Math.abs(fNumber));
    var a = sNumber.split(".");
    var sInteger = a[0];
    var sLanguage = $.Language().toLowerCase();
    if (sLanguage == "schinese") {
        var n = Math.floor((sInteger.length - 1) / 4);
        if (n == 0) {
            return [sSign + NumberToString(Round(fNumber, prec))];
        }
        sNumber = NumberToString(Round(fNumber / Math.pow(10000, n), prec));
        var sDigit = DigitSchinese[n];
        if (sDigit == undefined) {
            sDigit = "e+".concat(4 * n);
        }
        return [sSign + sNumber, sDigit];
    }
    else {
        var n = Math.floor((sInteger.length - 1) / 3);
        if (n == 0) {
            return [sSign + NumberToString(Round(fNumber, prec))];
        }
        sNumber = NumberToString(Round(fNumber / Math.pow(1000, n), prec));
        var sDigit = Digit[n];
        if (sDigit == undefined) {
            sDigit = "e+".concat(3 * n);
        }
        return [sSign + sNumber, sDigit];
    }
}
// 自定义 polyfill 初始化
!function () {
    // polyfill 初始化逻辑
}();

// ========== enums.ts ==========
"use strict";
//********************************************************************************
// 编辑 polyfill/enums.ts 或 framework/enums.ts 自动同步
//********************************************************************************
var StateEnum;
(function (StateEnum) {
    /** 默认都是没有血条的，但是会在modifier_common中加入该值，防止出生或者销毁瞬间血条闪烁 */
    StateEnum[StateEnum["HEALTH_BAR"] = 0] = "HEALTH_BAR";
    /** 优先级比HEALTH_BAR高 */
    StateEnum[StateEnum["NO_HEALTH_BAR"] = 1] = "NO_HEALTH_BAR";
    /** 禁用AI */
    StateEnum[StateEnum["AI_DISABLED"] = 2] = "AI_DISABLED";
    /** 无法控制 */
    StateEnum[StateEnum["UNCONTROLLABLE"] = 3] = "UNCONTROLLABLE";
    /** 闪避弹道 */
    StateEnum[StateEnum["DODGE_BULLET"] = 4] = "DODGE_BULLET";
    /** TODO:闪避陷阱 */
    StateEnum[StateEnum["DODGE_TRAP"] = 5] = "DODGE_TRAP";
    /** 破坏物 */
    StateEnum[StateEnum["BREAKABLE"] = 6] = "BREAKABLE";
    /** 无法暴击 */
    StateEnum[StateEnum["NO_CRIT"] = 7] = "NO_CRIT";
    /** 晕眩免疫 */
    StateEnum[StateEnum["STUN_IMMUNE"] = 8] = "STUN_IMMUNE";
    /** 击退免疫 */
    StateEnum[StateEnum["KNOCKBACK_IMMUNE"] = 9] = "KNOCKBACK_IMMUNE";
    /** 攻击免疫 */
    StateEnum[StateEnum["ATTACK_IMMUNE"] = 10] = "ATTACK_IMMUNE";
    /** 致盲 */
    StateEnum[StateEnum["BLIND"] = 11] = "BLIND";
    /** 迷雾免疫 */
    StateEnum[StateEnum["SMOKE_IMMUNE"] = 12] = "SMOKE_IMMUNE";
    /** 免疫外部控制；由 modifier 状态、属性和位移入口共同检查。 */
    StateEnum[StateEnum["CONTROL_IMMUNE"] = 13] = "CONTROL_IMMUNE";
    /** 禁止受状态限制的召唤。 */
    StateEnum[StateEnum["SUMMON_DISABLED"] = 14] = "SUMMON_DISABLED";
})(StateEnum || (StateEnum = {}));
/** 支付类型 */
var PayType;
(function (PayType) {
    PayType[PayType["MONEY"] = 0] = "MONEY";
    PayType[PayType["MOON"] = 100001] = "MOON";
    PayType[PayType["STAR"] = 100002] = "STAR";
    PayType[PayType["SHARD"] = 100003] = "SHARD";
    PayType[PayType["COIN"] = 110001] = "COIN";
})(PayType || (PayType = {}));
/** 玩家登录状态 */
var PlayerLoginState;
(function (PlayerLoginState) {
    PlayerLoginState[PlayerLoginState["None"] = 0] = "None";
    PlayerLoginState[PlayerLoginState["Success"] = 1] = "Success";
    PlayerLoginState[PlayerLoginState["NoPermission"] = 2] = "NoPermission";
    PlayerLoginState[PlayerLoginState["Banned"] = 3] = "Banned";
    PlayerLoginState[PlayerLoginState["Failed"] = 4] = "Failed";
    PlayerLoginState[PlayerLoginState["NeedAuth"] = 5] = "NeedAuth";
    PlayerLoginState[PlayerLoginState["MatchIDPre"] = 6] = "MatchIDPre";
})(PlayerLoginState || (PlayerLoginState = {}));
/** 伤害状态 */
var EOM_DAMAGE_FLAGS;
(function (EOM_DAMAGE_FLAGS) {
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["NONE"] = 0] = "NONE";
    /** 暴击 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["CRIT"] = 1] = "CRIT";
    /** 不触发暴击 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["NO_CRIT"] = 2] = "NO_CRIT";
    /** 持续伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["DOT"] = 4] = "DOT";
    /** TODO:m不会受到来源者的伤害增强 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["NO_SOURCE_AMPLIFY"] = 8] = "NO_SOURCE_AMPLIFY";
    /** 不会受到伤害增强，包含来源伤害增强 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["NO_DAMAGE_AMPLIFY"] = 16] = "NO_DAMAGE_AMPLIFY";
    /** TODO:被转化后的伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["CONVERTED_DAMAGE"] = 32] = "CONVERTED_DAMAGE";
    /** TODO:召唤伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["SUMMONED_DAMAGE"] = 64] = "SUMMONED_DAMAGE";
    /** 不受目标承伤加成和伤害减免影响 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["NO_INCOMING_AMPLIFY"] = 128] = "NO_INCOMING_AMPLIFY";
    /** 跳过承受伤害调整和规避伤害；护盾仍由 IGNORE_BARRIER 控制 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["NO_INCOMING_ADJUST"] = 256] = "NO_INCOMING_ADJUST";
    /** 无视护盾 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["IGNORE_BARRIER"] = 512] = "IGNORE_BARRIER";
    /** TODO:无视躲避伤害，包括免死效果 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["IGNORE_VOID_DAMAGE"] = 1024] = "IGNORE_VOID_DAMAGE";
    /** 反击伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["RETALIATED_DAMAGE"] = 2048] = "RETALIATED_DAMAGE";
    /** 流血伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["BLEEDING_DAMAGE"] = 4096] = "BLEEDING_DAMAGE";
    /** 中毒伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["POISON_DAMAGE"] = 8192] = "POISON_DAMAGE";
    /** 燃烧伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["BURNING_DAMAGE"] = 16384] = "BURNING_DAMAGE";
    /** 特殊标记 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["SPECIAL_MARK"] = 32768] = "SPECIAL_MARK";
    /** 环绕物标记 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["RING_DAMAGE"] = 65536] = "RING_DAMAGE";
    /** 飞剑标记 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["SWORD"] = 131072] = "SWORD";
    /** 没有怒气回复 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["NO_MANA_REGEN"] = 262144] = "NO_MANA_REGEN";
    /** 雷电伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["LIGHTNING_DAMAGE"] = 524288] = "LIGHTNING_DAMAGE";
    /** 冰冻伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["FREEZE_DAMAGE"] = 1048576] = "FREEZE_DAMAGE";
    /** 盾击伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["SHIELD_DAMAGE"] = 2097152] = "SHIELD_DAMAGE";
    /** 反弹伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["REFLECT_DAMAGE"] = 4194304] = "REFLECT_DAMAGE";
    /** 散射伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["SPLIT_DAMAGE"] = 8388608] = "SPLIT_DAMAGE";
    /** 剑气伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["BLADE"] = 16777216] = "BLADE";
    /** 陷阱伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["TRAP"] = 33554432] = "TRAP";
    /** 背刺伤害 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["Backstab"] = 67108864] = "Backstab";
    /** 不触发触电效果 */
    EOM_DAMAGE_FLAGS[EOM_DAMAGE_FLAGS["NO_EXPOSE"] = 134217728] = "NO_EXPOSE";
})(EOM_DAMAGE_FLAGS || (EOM_DAMAGE_FLAGS = {}));
/** 攻击状态 */
var ATTACK_STATES;
(function (ATTACK_STATES) {
    ATTACK_STATES[ATTACK_STATES["NONE"] = 0] = "NONE";
    /** 不触发攻击法球 */
    ATTACK_STATES[ATTACK_STATES["NOT_USECASTATTACKORB"] = 2] = "NOT_USECASTATTACKORB";
    /** 不触发攻击特效 */
    ATTACK_STATES[ATTACK_STATES["NOT_PROCESSPROCS"] = 4] = "NOT_PROCESSPROCS";
    /** 无视攻击间隔 */
    ATTACK_STATES[ATTACK_STATES["SKIPCOOLDOWN"] = 8] = "SKIPCOOLDOWN";
    /** 不触发破影一击 */
    ATTACK_STATES[ATTACK_STATES["IGNOREINVIS"] = 16] = "IGNOREINVIS";
    /** 没有攻击弹道 */
    ATTACK_STATES[ATTACK_STATES["NOT_USEPROJECTILE"] = 32] = "NOT_USEPROJECTILE";
    /** 假攻击 */
    ATTACK_STATES[ATTACK_STATES["FAKEATTACK"] = 64] = "FAKEATTACK";
    /** 攻击不会丢失 */
    ATTACK_STATES[ATTACK_STATES["NEVERMISS"] = 128] = "NEVERMISS";
    /** 没有分裂攻击 */
    ATTACK_STATES[ATTACK_STATES["NO_CLEAVE"] = 256] = "NO_CLEAVE";
    /** 无额外攻击 */
    ATTACK_STATES[ATTACK_STATES["NO_EXTENDATTACK"] = 512] = "NO_EXTENDATTACK";
    /** 不减少各种攻击计数 */
    ATTACK_STATES[ATTACK_STATES["SKIPCOUNTING"] = 1024] = "SKIPCOUNTING";
    /** 攻击暴击，攻击流程中会自动插入，Attack调用时不能填 */
    ATTACK_STATES[ATTACK_STATES["CRIT"] = 2048] = "CRIT";
    /** 不计算格挡 */
    ATTACK_STATES[ATTACK_STATES["BYPASSES_BLOCK"] = 4096] = "BYPASSES_BLOCK";
    /** 反击 */
    ATTACK_STATES[ATTACK_STATES["RETALIATION"] = 8192] = "RETALIATION";
})(ATTACK_STATES || (ATTACK_STATES = {}));
/** 添加 Modifier 标记 */
var AddModifierFlag;
(function (AddModifierFlag) {
    AddModifierFlag[AddModifierFlag["IGNORE_DEATH"] = 1] = "IGNORE_DEATH";
})(AddModifierFlag || (AddModifierFlag = {}));
/** AI 搜索行为 */
var AI_SEARCH_BEHAVIOR;
(function (AI_SEARCH_BEHAVIOR) {
    AI_SEARCH_BEHAVIOR[AI_SEARCH_BEHAVIOR["AI_SEARCH_BEHAVIOR_NONE"] = 0] = "AI_SEARCH_BEHAVIOR_NONE";
    AI_SEARCH_BEHAVIOR[AI_SEARCH_BEHAVIOR["AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET"] = 1] = "AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET";
    AI_SEARCH_BEHAVIOR[AI_SEARCH_BEHAVIOR["AI_SEARCH_BEHAVIOR_MOST_LINE_TARGET"] = 2] = "AI_SEARCH_BEHAVIOR_MOST_LINE_TARGET";
})(AI_SEARCH_BEHAVIOR || (AI_SEARCH_BEHAVIOR = {}));
/** 属性类型 */
var EOMModifierPropertyType;
(function (EOMModifierPropertyType) {
    EOMModifierPropertyType[EOMModifierPropertyType["NONE"] = 0] = "NONE";
    EOMModifierPropertyType[EOMModifierPropertyType["PLAYER"] = 1] = "PLAYER";
    EOMModifierPropertyType[EOMModifierPropertyType["TEAM"] = 2] = "TEAM";
    EOMModifierPropertyType[EOMModifierPropertyType["TEAM_HERO"] = 3] = "TEAM_HERO";
})(EOMModifierPropertyType || (EOMModifierPropertyType = {}));
var BULLET_TYPE;
(function (BULLET_TYPE) {
    BULLET_TYPE[BULLET_TYPE["CUSTOM"] = 0] = "CUSTOM";
    BULLET_TYPE[BULLET_TYPE["LINEAR"] = 1] = "LINEAR";
    BULLET_TYPE[BULLET_TYPE["TRACKING"] = 2] = "TRACKING";
    BULLET_TYPE[BULLET_TYPE["SURROUND"] = 3] = "SURROUND";
    BULLET_TYPE[BULLET_TYPE["GUIDED"] = 4] = "GUIDED";
    BULLET_TYPE[BULLET_TYPE["RING"] = 5] = "RING";
})(BULLET_TYPE || (BULLET_TYPE = {}));
var KeyFunction;
(function (KeyFunction) {
    KeyFunction["Up"] = "up";
    KeyFunction["Down"] = "down";
    KeyFunction["Left"] = "left";
    KeyFunction["Right"] = "right";
    KeyFunction["Skill"] = "skill";
    KeyFunction["Dodge"] = "dodge";
    KeyFunction["Defense"] = "defense";
    KeyFunction["Ultimate"] = "ultimate";
    KeyFunction["Attack"] = "attack";
    KeyFunction["Interact"] = "interact";
    KeyFunction["Attribute"] = "attribute";
    KeyFunction["Upgrade"] = "upgrade";
    KeyFunction["OptionUp"] = "OptionUp";
    KeyFunction["OptionDown"] = "OptionDown";
    KeyFunction["OptionConfirm"] = "OptionConfirm";
    KeyFunction["Option1"] = "Option1";
    KeyFunction["Option2"] = "Option2";
    KeyFunction["Option3"] = "Option3";
    KeyFunction["ToggleAutoCast"] = "ToggleAutoCast";
})(KeyFunction || (KeyFunction = {}));
/** 装饰品类型 */
var COSMETIC_TYPE;
(function (COSMETIC_TYPE) {
    COSMETIC_TYPE["BORDER"] = "BORDER";
    COSMETIC_TYPE["TITLE"] = "TITLE";
    COSMETIC_TYPE["HEAD"] = "HEAD";
    COSMETIC_TYPE["SHOULDER"] = "SHOULDER";
    COSMETIC_TYPE["BACK"] = "BACK";
    COSMETIC_TYPE["TAIL"] = "TAIL";
    COSMETIC_TYPE["WING"] = "WING";
    COSMETIC_TYPE["FOOTPRINT_EFFECT"] = "FOOTPRINT_EFFECT";
    COSMETIC_TYPE["AURA_EFFECT"] = "AURA_EFFECT";
    COSMETIC_TYPE["ATTACK_EFFECT"] = "ATTACK_EFFECT";
    COSMETIC_TYPE["SPECIAL_SKILL_EFFECT"] = "SPECIAL_SKILL_EFFECT";
    COSMETIC_TYPE["DASH_SKILL_EFFECT"] = "DASH_SKILL_EFFECT";
    COSMETIC_TYPE["DEFENSE_SKILL_EFFECT"] = "DEFENSE_SKILL_EFFECT";
    COSMETIC_TYPE["ULTIMATE_SKILL_EFFECT"] = "ULTIMATE_SKILL_EFFECT";
    COSMETIC_TYPE["MISC"] = "MISC";
    COSMETIC_TYPE["MEDAL"] = "MEDAL";
})(COSMETIC_TYPE || (COSMETIC_TYPE = {}));
var COSMETIC_SLOT;
(function (COSMETIC_SLOT) {
    COSMETIC_SLOT[COSMETIC_SLOT["HEAD"] = 1] = "HEAD";
    COSMETIC_SLOT[COSMETIC_SLOT["SHOULDER"] = 2] = "SHOULDER";
    COSMETIC_SLOT[COSMETIC_SLOT["BACK"] = 3] = "BACK";
    COSMETIC_SLOT[COSMETIC_SLOT["TAIL"] = 4] = "TAIL";
    COSMETIC_SLOT[COSMETIC_SLOT["WING"] = 5] = "WING";
    COSMETIC_SLOT[COSMETIC_SLOT["FOOTPRINT_EFFECT"] = 6] = "FOOTPRINT_EFFECT";
    COSMETIC_SLOT[COSMETIC_SLOT["AURA_EFFECT"] = 7] = "AURA_EFFECT";
    COSMETIC_SLOT[COSMETIC_SLOT["ATTACK_EFFECT"] = 8] = "ATTACK_EFFECT";
    COSMETIC_SLOT[COSMETIC_SLOT["SPECIAL_SKILL_EFFECT"] = 9] = "SPECIAL_SKILL_EFFECT";
    COSMETIC_SLOT[COSMETIC_SLOT["DASH_SKILL_EFFECT"] = 10] = "DASH_SKILL_EFFECT";
    COSMETIC_SLOT[COSMETIC_SLOT["DEFENSE_SKILL_EFFECT"] = 11] = "DEFENSE_SKILL_EFFECT";
    COSMETIC_SLOT[COSMETIC_SLOT["ULTIMATE_SKILL_EFFECT"] = 12] = "ULTIMATE_SKILL_EFFECT";
    COSMETIC_SLOT[COSMETIC_SLOT["MISC"] = 13] = "MISC";
    COSMETIC_SLOT[COSMETIC_SLOT["BORDER"] = 14] = "BORDER";
    COSMETIC_SLOT[COSMETIC_SLOT["TITLE"] = 15] = "TITLE";
    COSMETIC_SLOT[COSMETIC_SLOT["MEDAL"] = 16] = "MEDAL";
})(COSMETIC_SLOT || (COSMETIC_SLOT = {}));
/** 地牢房间类型 */
var DungeonRoomType;
(function (DungeonRoomType) {
    DungeonRoomType["Combat"] = "Combat";
    DungeonRoomType["Reward"] = "Reward";
    DungeonRoomType["Shop"] = "Shop";
    DungeonRoomType["MiniBoss"] = "MiniBoss";
    DungeonRoomType["Boss"] = "Boss";
})(DungeonRoomType || (DungeonRoomType = {}));
/** 地牢区域（4大关） */
var DungeonZone;
(function (DungeonZone) {
    DungeonZone[DungeonZone["Zone1"] = 1] = "Zone1";
    DungeonZone[DungeonZone["Zone2"] = 2] = "Zone2";
    DungeonZone[DungeonZone["Zone3"] = 3] = "Zone3";
    DungeonZone[DungeonZone["Zone4"] = 4] = "Zone4";
})(DungeonZone || (DungeonZone = {}));
/** 升级稀有度 */
var UpgradeRarity;
(function (UpgradeRarity) {
    UpgradeRarity["Common"] = "Common";
    UpgradeRarity["Rare"] = "Rare";
    UpgradeRarity["Epic"] = "Epic";
    UpgradeRarity["Legendary"] = "Legendary";
})(UpgradeRarity || (UpgradeRarity = {}));
/** 房间尺寸类型 */
var RoomSizeType;
(function (RoomSizeType) {
    RoomSizeType["Small"] = "Small";
    RoomSizeType["Medium"] = "Medium";
    RoomSizeType["Large"] = "Large";
    RoomSizeType["XLarge"] = "XLarge";
})(RoomSizeType || (RoomSizeType = {}));
/** 敌人生成模式 */
var SpawnPattern;
(function (SpawnPattern) {
    SpawnPattern["Circle"] = "Circle";
    SpawnPattern["Line"] = "Line";
    SpawnPattern["Random"] = "Random"; // 随机分散
})(SpawnPattern || (SpawnPattern = {}));
/** 可交互物类型 */
var InteractType;
(function (InteractType) {
    InteractType["Portal"] = "Portal";
    InteractType["Faith"] = "Faith";
    InteractType["Chest"] = "Chest";
    InteractType["NPC"] = "NPC";
    InteractType["Outpost"] = "Outpost";
    InteractType["Pool"] = "Pool";
    InteractType["Smithy"] = "Smithy";
    InteractType["ShopItem"] = "ShopItem";
    InteractType["Consumables"] = "Consumables";
    InteractType["DropItem"] = "DropItem";
    InteractType["Fishing"] = "Fishing";
    InteractType["RegenWell"] = "RegenWell";
    InteractType["Book"] = "Book";
    InteractType["Mirror"] = "Mirror";
    InteractType["Refresh"] = "Refresh";
    InteractType["BossChest"] = "BossChest";
    InteractType["CourierExplore"] = "CourierExplore";
    InteractType["Arena"] = "Arena";
    InteractType["Meepo"] = "Meepo";
    InteractType["Abyssal"] = "Abyssal";
    InteractType["Hunt"] = "Hunt";
})(InteractType || (InteractType = {}));
var RoomType;
(function (RoomType) {
    /** 无效 */
    RoomType[RoomType["INVALID"] = 0] = "INVALID";
    /** 开始房间 */
    RoomType[RoomType["STARTING"] = 1] = "STARTING";
    /** 主线的怪物房间 */
    RoomType[RoomType["ENEMY"] = 2] = "ENEMY";
    /** 商店房间 */
    RoomType[RoomType["SHOP"] = 3] = "SHOP";
    /** 酒馆 */
    RoomType[RoomType["TAVERN"] = 4] = "TAVERN";
    /** BOSS房间 */
    RoomType[RoomType["BOSS"] = 5] = "BOSS";
    /** 特殊房间 */
    RoomType[RoomType["SPECIAL"] = 6] = "SPECIAL";
    /** 休息（恢复生命） */
    RoomType[RoomType["REST"] = 7] = "REST";
    /** 楼梯房（通往下一区域） */
    RoomType[RoomType["STAIR"] = 8] = "STAIR";
    /** Mini-boss房 */
    RoomType[RoomType["MINI_BOSS"] = 9] = "MINI_BOSS";
    /** 精英房（增强敌人） */
    RoomType[RoomType["ELITE"] = 10] = "ELITE";
})(RoomType || (RoomType = {}));
var RoomState;
(function (RoomState) {
    RoomState[RoomState["ROOM_STATE_INVALID"] = 0] = "ROOM_STATE_INVALID";
    RoomState[RoomState["ROOM_STATE_HIDE"] = 1] = "ROOM_STATE_HIDE";
    RoomState[RoomState["ROOM_STATE_ACTIVE"] = 2] = "ROOM_STATE_ACTIVE";
    RoomState[RoomState["ROOM_STATE_USED"] = 3] = "ROOM_STATE_USED";
})(RoomState || (RoomState = {}));
/** 房间奖励类型（哈迪斯风格） */
var RoomRewardType;
(function (RoomRewardType) {
    RoomRewardType[RoomRewardType["NONE"] = 0] = "NONE";
    RoomRewardType[RoomRewardType["HERO_UPGRADE"] = 1] = "HERO_UPGRADE";
    RoomRewardType[RoomRewardType["BOON"] = 2] = "BOON";
    RoomRewardType[RoomRewardType["POM"] = 3] = "POM";
    RoomRewardType[RoomRewardType["GOLD"] = 4] = "GOLD";
    RoomRewardType[RoomRewardType["SHOP"] = 5] = "SHOP";
    RoomRewardType[RoomRewardType["WISH_POOL"] = 6] = "WISH_POOL";
    RoomRewardType[RoomRewardType["DOUBLE_BOON"] = 7] = "DOUBLE_BOON";
    RoomRewardType[RoomRewardType["TREASURE"] = 8] = "TREASURE";
})(RoomRewardType || (RoomRewardType = {}));
/** 技能标签 */
var AbilityTag;
(function (AbilityTag) {
    /** 无 */
    AbilityTag[AbilityTag["None"] = 0] = "None";
    /** 攻击 */
    AbilityTag[AbilityTag["Attack"] = 1] = "Attack";
    /** 技能 */
    AbilityTag[AbilityTag["Skill"] = 2] = "Skill";
    /** 闪避 */
    AbilityTag[AbilityTag["Dodge"] = 3] = "Dodge";
    /** 防御 */
    AbilityTag[AbilityTag["Defense"] = 4] = "Defense";
    /** 大招 */
    AbilityTag[AbilityTag["Ultimate"] = 5] = "Ultimate";
    /** 交互 */
    AbilityTag[AbilityTag["Interact"] = 6] = "Interact";
})(AbilityTag || (AbilityTag = {}));
/** 临时阻挡区域类型 */
var TEMPORARY_BLOCK_TYPE;
(function (TEMPORARY_BLOCK_TYPE) {
    TEMPORARY_BLOCK_TYPE[TEMPORARY_BLOCK_TYPE["CIRCLE"] = 1] = "CIRCLE";
    TEMPORARY_BLOCK_TYPE[TEMPORARY_BLOCK_TYPE["POLYGON"] = 2] = "POLYGON";
})(TEMPORARY_BLOCK_TYPE || (TEMPORARY_BLOCK_TYPE = {}));
var DOTA_UNIT_TARGET_TYPE;
(function (DOTA_UNIT_TARGET_TYPE) {
    DOTA_UNIT_TARGET_TYPE[DOTA_UNIT_TARGET_TYPE["UNIT_AND_BUILDING"] = DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HEROES_AND_CREEPS + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_OTHER] = "UNIT_AND_BUILDING";
})(DOTA_UNIT_TARGET_TYPE || (DOTA_UNIT_TARGET_TYPE = {}));

// ========== constant.ts ==========
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
// VScripts 专用常量（不需要在 UI 端使用）
/**
const vec3_left = Vector(-1, 0, 0);
const vec3_right = Vector(1, 0, 0);
const vec3_top = Vector(0, 1, 0);
const vec3_bottom = Vector(0, -1, 0);
// @ts-ignore
const vec3_invalid = Vector(3.402823466e+38, 3.402823466e+38, 3.402823466e+38);

/**
 */
var AI_TIMER_TICK_TIME = 0.15; // AI的计时器间隔
/**暂停冷却 */
var CUSTOM_PAUSE_CD = 60;
/** 网格大小 */
var GRID_SIZE = 384;
var MINIMUM_ATTACK_SPEED = 20; // 最小攻击速度
var MAXIMUM_ATTACK_SPEED = 600; // 最大攻击速度
var BULLET_WIDTH = 32; // 普通子弹宽度
var INTERACT_RADIUS = 200; // 交互范围半径
var HERO_MAX_LEVEL = 30; // 英雄最大等级
var HERO_XP_PER_LEVEL_TABLE = []; // 英雄升级经验表
for (var index = 0; index < 30; index++) {
    HERO_XP_PER_LEVEL_TABLE.push(75 * index + 50 * index * index);
}
/** 复活次数 */
var HERO_RESPAWN_COUNT = 0;
/** 酒馆商店物品Key */
var TAVERN_ITEMS = ["item_whisky", "item_beer", "item_rum", "item_tequila", "item_champagne", "item_gin", "item_wine"];
/** 最大祝福类型数量数量（不包括风） */
var MAX_BLESS_TYPE_COUNT = 3;
//祝福稀有度对应权重
var BLESS_RARITY_WEIGHT = {
    1: 60, // 普通 - 构筑基石
    2: 25, // 稀有 - 可靠强化
    3: 10, // 史诗 - 惊喜提升
    4: 5, // 英雄 - 顶级奖励
};
/** 稀有度价格表 */
var SHOP_RARITY_COST = {
    1: 50,
    2: 100,
    3: 150,
    4: 200,
    5: 250,
};
/** 套装经验 */
var SUIT_EXP = {
    1: 4,
    2: 8,
    3: 16,
    4: 32,
};
// 遗物稀有度对应权重
var ARTIFACT_RARITY_WEIGHT = {
    1: 60, // 普通
    2: 25, // 稀有
    3: 10, // 史诗
    4: 5, // 传说
    5: 1, // 英雄
};
/** %基础背刺伤害 */
var BASE_BACKSTAB_DAMAGE = 25;
/** 陷阱伤害系数，生命百分比 */
var TRAP_DAMAGE_FACTOR = 0.2;
/** 伤害/防御强度 百分比 */
var INTENSITY_FACTOR = 0.1;
/** 钥匙每点强度提供的怪物生命额外乘区 */
var DIFFICULTY_KEY_HEALTH_FACTOR_PER_INTENSITY = 0.052;
/** 钥匙每点强度提供的怪物攻击额外乘区 */
var DIFFICULTY_KEY_DAMAGE_FACTOR_PER_INTENSITY = 0.005;
// 技能冷却缩减
var COOLDOWN_REDUCTION_RATE = 0.005; // 每点冷却缩减属性的基础转换率
var COOLDOWN_REDUCTION_CAP = 0.8; // 冷却缩减上限（80%）
/** 难度对应的Boss冷却缩减（负值=增加冷却时间），key为难度等级 */
var DIFFICULTY_COOLDOWN_REDUCTION = {
    1: -60,
    2: -50,
    3: -40,
    4: -30,
    5: -20,
    6: -10,
};
/**
 * 难度对应的 Boss 技能间隔增幅，key 为难度等级。
 *
 * 数值会作为 AI 行动间隔的百分比附加值：35 表示间隔为基础值的 1.35 倍。
 * 与 DIFFICULTY_BOSS_DAMAGE_AMPLIFY 配对，使提高施法频率后平均输出保持不变。
 */
var DIFFICULTY_BOSS_GAP_AMPLIFY = {
// 1: 35,
// 2: 28,
// 3: 20,
// 4: 14,
// 5: 8,
// 6: 3,
};
/**
 * Boss 全部伤害的最终修正，key 为难度等级。
 *
 * 计算式为 newGapMultiplier / oldGapMultiplier - 1；它与上面的间隔倍率互为倒数，
 * 因而在不考虑技能自身冷却、未命中和机制差异时，单位时间的理论输出不变。
 */
var DIFFICULTY_BOSS_DAMAGE_AMPLIFY = {
// 1: -25,
// 2: -20,
// 3: -18,
// 4: -12,
// 5: -6,
// 6: -2,
};
/** 难度对应的陷阱伤害 */
var DIFFICULTY_TRAP_DAMAGE_REDUCTION = {
    1: -90,
    2: -80,
    3: -70,
    4: -60,
    5: -40,
    6: -20,
};
/** 触电伤害百分比 */
var EXPOSE_DAMAGE_PCT = 25;
/** 飞剑伤害 */
var SWORD_DAMAGE = 24;
/** 剑意每层提升 */
var SWORD_INTENT_PCT_PER_STACK = 20;
/** 剑意最大层数 */
var SWORD_INTENT_MAX_STACK = 5;
/** 护盾每秒衰减比例 */
var SHIELD_DECAY_RATE = 30;
/** 护盾每秒衰减最低值，生命上限系数 */
var SHIELD_DECAY_MIN = 0.05;
/** 护盾衰减间隔（秒） */
var SHIELD_DECAY_INTERVAL = 1.0;
/** 中毒每秒衰减比例 */
var POISON_DECAY_RATE = 30;
/** 中毒衰减间隔（秒） */
var POISON_DECAY_INTERVAL = 1.0;
/** 冰冻每秒衰减比例 */
var FROZEN_DECAY_RATE = 30;
/** 冰冻衰减间隔（秒） */
var FROZEN_DECAY_INTERVAL = 2.0;
/** 冰冻增伤曲线最大值（%） */
var FROZEN_DAMAGE_AMPLIFY_MAX = 30;
/** 冰冻增伤达到一半收益时的层数 */
var FROZEN_DAMAGE_AMPLIFY_HALF_STACK = 50;
/** 毒瓶最大数量 */
var POISON_BOTTLE_MAX_COUNT = 5;
/** 虚弱减少伤害 */
var WEAK_REDUCE_DAMAGE_PCT = 1;
/** 虚弱最大层数 */
var WEAK_MAX_STACK = 25;
/** 虚弱最大层数 */
var WEAK_DURATION = 5;
/** 斩杀线最大生命值% */
var EXECUTE_THRESHOLD_MAX_HEALTH = 20;
/** 流血基础伤害次数 */
var BLEED_DAMAGE_COUNT = 2;
/** 流血基础伤害间隔 */
var BLEED_DAMAGE_INTERVAL = 1;
/** 流血移动额外伤害距离阈值 */
var BLEED_MOVE_DAMAGE_DISTANCE_THRESHOLD = 100;
/** 流血移动额外伤害内置冷却 */
var BLEED_MOVE_DAMAGE_COOLDOWN = 0.25;
/** 流血移动额外伤害百分比 */
var BLEED_MOVE_DAMAGE_PCT = 40;
/** 反击冷却 */
var COUNTER_CD = 0.3;
/** 暴击飞剑冷却 */
var CRIT_CALL_BLADE_CD = 0.3;
/** 健康血量 */
var HEALTHY_PCT = 80;
/** 残血血量 */
var LOW_HEALTH_PCT = 20;
/** 近距离 */
var CLOSE_RANGE = 250;
/** 远距离 */
var FAR_RANGE = 850;
/** 激光长度 */
var LASER_LENGTH = 600;
/** 激光宽度 */
var LASER_WIDTH = 100;
/** 天罚伤害 */
var PUNISHMENT_DAMAGE = 30;
/** 洗礼 */
var PURIFY_DAMAGE = 48;
/** 洗礼范围 */
var PURIFY_RADIUS = 300;
/** 霜冻印记伤害 */
var ICE_MARK_DAMAGE = 24;
/** 许愿池每次消耗 */
var WISHING_POOL_COST = 10;
/** 商店刷新基础消耗 */
var SHOP_REFRESH_BASE_COST = 50;
/** 商店刷新每次递增消耗 */
var SHOP_REFRESH_COST_INCREMENT = 10;
/** 祝福选择放弃获得金币 */
var BLESS_GIVEUP_REWARD = 10;
/** 祝福选择放弃获得金币稀有度 */
var BLESS_GIVEUP_RARITY_REWARD = 5;
/** 三选一选项对应的快捷键功能，按选项顺序排列。 */
var SELECTION_KEY_FUNCTIONS = [KeyFunction.Option1, KeyFunction.Option2, KeyFunction.Option3];
/** 默认键盘按键设置 */
var DEFAULT_KEYBOARD_BINDINGS = (_a = {},
    _a[KeyFunction.Up] = "W",
    _a[KeyFunction.Down] = "S",
    _a[KeyFunction.Left] = "A",
    _a[KeyFunction.Right] = "D",
    _a[KeyFunction.Skill] = "MOUSE1",
    _a[KeyFunction.Dodge] = "SPACE",
    _a[KeyFunction.Defense] = "SHIFT",
    _a[KeyFunction.Ultimate] = "R",
    _a[KeyFunction.Attack] = "MOUSE0",
    _a[KeyFunction.Interact] = "E",
    _a[KeyFunction.Attribute] = "`",
    _a[KeyFunction.Upgrade] = "Q",
    _a[KeyFunction.Option1] = "scancode30",
    _a[KeyFunction.Option2] = "scancode31",
    _a[KeyFunction.Option3] = "scancode32",
    _a);
/** Mode2 (左键移动) 默认键位 */
var DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK = __assign(__assign({}, DEFAULT_KEYBOARD_BINDINGS), (_b = {}, _b[KeyFunction.Skill] = "Q", _b[KeyFunction.Dodge] = "W", _b[KeyFunction.Defense] = "E", _b[KeyFunction.Ultimate] = "R", _b[KeyFunction.Attack] = "MOUSE1", _b[KeyFunction.Interact] = "F", _b));
/** Mode3 (右键移动) 默认键位 */
var DEFAULT_KEYBOARD_BINDINGS_RIGHT_CLICK = __assign(__assign({}, DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK), (_c = {}, _c[KeyFunction.Attack] = "MOUSE0", _c));
var MOVE_MODE_KEYBOARD = "keyboard";
var MOVE_MODE_LEFT_CLICK = "left_click";
var MOVE_MODE_RIGHT_CLICK = "right_click";
var DEFAULT_MOVE_MODE = MOVE_MODE_RIGHT_CLICK;
var MOVE_MODE_DEFAULTS = (_d = {},
    _d[MOVE_MODE_KEYBOARD] = DEFAULT_KEYBOARD_BINDINGS,
    _d[MOVE_MODE_LEFT_CLICK] = DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK,
    _d[MOVE_MODE_RIGHT_CLICK] = DEFAULT_KEYBOARD_BINDINGS_RIGHT_CLICK,
    _d);
/** 点击移动子模式 */
var CLICK_MOVE_MODE_CLICK = "click";
var CLICK_MOVE_MODE_HOLD = "hold";
var CLICK_MOVE_MODE_FOLLOW = "follow";
var DEFAULT_CLICK_MOVE_MODE = CLICK_MOVE_MODE_HOLD;
var DEFAULT_CAMERA_FOLLOW_MODE = "free";
/**
 * joy5:		左肩键
 * joy6:		右肩键
 * joy7:		切换键
 * joy8:		菜单键
 * joy9:		左摇杆按下
 * joy10:		右摇杆按下
 * joy1:		A键(下)
 * joy2:		B键(右)
 * joy4:		Y键(上)
 * joy3:		X键(左)
 * z_axis_pos:	左扳机
 * y_axis_pos:	右扳机
 * pov_left:	十字方向键 - 左
 * pov_right:	十字方向键 - 右
 * pov_up:		十字方向键 - 上
 * pov_down:	十字方向键 - 下
 * x_axis_neg:	左摇杆 - 左
 * x_axis_pos:	左摇杆 - 右
 * y_axis_neg:	左摇杆 - 上
 * y_axis_pos:	左摇杆 - 下
 * r_axis_neg:	右摇杆 - 左
 * r_axis_pos:	右摇杆 - 右
 * u_axis_neg:	右摇杆 - 上
 * u_axis_pos:	右摇杆 - 下
 */
// 默认手柄按键设置（用于在UI侧解析 key -> KeyFunction）
var DEFAULT_GAMEPAD_BINDINGS = (_e = {},
    _e[KeyFunction.Up] = "y_axis_neg",
    _e[KeyFunction.Down] = "y_axis_pos",
    _e[KeyFunction.Left] = "x_axis_neg",
    _e[KeyFunction.Right] = "x_axis_pos",
    _e[KeyFunction.Skill] = "v_axis_pos",
    _e[KeyFunction.Dodge] = "joy1",
    _e[KeyFunction.Defense] = "joy4",
    _e[KeyFunction.Ultimate] = "joy2",
    _e[KeyFunction.Attack] = "joy3",
    _e[KeyFunction.Interact] = "joy5",
    _e[KeyFunction.Upgrade] = "joy7",
    _e[KeyFunction.OptionUp] = "pov_up",
    _e[KeyFunction.OptionDown] = "pov_down",
    _e[KeyFunction.OptionConfirm] = "joy10",
    _e[KeyFunction.ToggleAutoCast] = "joy9",
    _e);
/** 任务类型枚举（前端更新的任务类型，event_id=24） */
var SERVICE_TASK_TYPE;
(function (SERVICE_TASK_TYPE) {
    /**陷阱清除所有怪 */
    SERVICE_TASK_TYPE[SERVICE_TASK_TYPE["TrapClearEnemy"] = 1] = "TrapClearEnemy";
    /**手动成功钓鱼 */
    SERVICE_TASK_TYPE[SERVICE_TASK_TYPE["Fishing"] = 2] = "Fishing";
    /**单局游戏激活所有祝福 */
    SERVICE_TASK_TYPE[SERVICE_TASK_TYPE["ActivateAllBlessings"] = 3] = "ActivateAllBlessings";
    /**击杀怪物 param_s1怪物ID */
    SERVICE_TASK_TYPE[SERVICE_TASK_TYPE["KillEnemy"] = 4] = "KillEnemy";
    /**酒馆购买道具 param_2道具:1威士忌:2啤酒:3朗姆酒:4龙舌兰*/
    SERVICE_TASK_TYPE[SERVICE_TASK_TYPE["ShopItemPurchase"] = 5] = "ShopItemPurchase";
    /**拾取道具，param_2 (param_2道具:1属性书:2神杖祝福:3金币袋:4在许愿池花费金币许愿*/
    SERVICE_TASK_TYPE[SERVICE_TASK_TYPE["AddItem"] = 6] = "AddItem";
    /**玩家死亡 */
    SERVICE_TASK_TYPE[SERVICE_TASK_TYPE["Die"] = 7] = "Die";
})(SERVICE_TASK_TYPE || (SERVICE_TASK_TYPE = {}));
/** 深渊玩法配置 */
var ABYSS_CONFIG = {
    /** 基础 */
    base: {
        /** 通关地牢难度解锁模式 */
        NeedDungeonDiff: 5,
        /** 玩法限时 */
        timeLimit: 600,
        /** 初始怪物数量 */
        initialEnemyCount: 5,
        /** 闪怪生命值百分比 */
        flashEnemyHealthPct: 400,
        /** 闪怪攻击力百分比 */
        flashEnemyAttackPct: 30,
        /** 闪怪模型缩放 */
        flashEnemyModelScale: 100,
        /** 自动拾取范围 */
        autoPickupRadius: 1000,
    },
    /** 刷怪 */
    spawn: {
        /** 最大同时存在的敌人数量 */
        maxAliveEnemyCount: 30,
        /** 玩家周围允许存在的最大敌人数量；达到该数量时不再在该玩家附近刷怪 */
        maxNearbyEnemyCount: 12,
        /** 与玩家的最小距离 */
        minDistanceFromPlayer: 10,
        /** 与玩家的最大距离 */
        maxDistanceFromPlayer: 1500,
    },
    /** 事件 */
    event: {
        /** 初始触发次数 */
        initialTriggerCount: 20,
        /** 每次增加的触发次数 */
        triggerCountIncrease: 5,
        /** 最大触发次数 */
        maxTriggerCount: 60,
    },
    /** 击杀 */
    kill: {
        /** 击杀敌人基础分数 */
        baseScore: 1,
    },
    /** UI */
    ui: {
        /** 吞噬解锁难度：深渊难度 */
        devourUnlock: 1,
    }
};
/** 连击系统配置 */
var COMBO_CONFIG = {
    /** 初始倍率、默认倍率 */
    initialMultiplier: 1,
    /** 最低倍率 */
    minMultiplier: 1,
    /** 最高倍率 */
    maxMultiplier: 10,
    /** 每次增加倍率的次数 */
    multiplierIncreaseEveryCount: 2,
    /** 每次增加的倍率值 */
    multiplierIncreaseValue: 0.1,
    /** 每次减少的倍率值 */
    multiplierDecreaseValue: 0.1,
    /** 倍率衰减倒计时 */
    comboCountdownDuration: 10,
    /** 分数取整模式 */
    scoreRoundingMode: "floor",
};
/** Boss挑战时间 */
var BOSS_MAX_TIME = 300;
/** Boss缩圈初始范围 */
var BOSS_SHRINK_START_RADIUS = 3000;
/** Boss缩圈每秒减少范围 */
var BOSS_SHRINK_RADIUS_PER_SECOND = 60;
/** Boss缩圈百分比伤害 */
var BOSS_SHRINK_OUTSIDE_DAMAGE_PCT = 5;
/** Boss缩圈伤害tick */
var BOSS_SHRINK_TICK_INTERVAL = 1;
/** 最大难度 */
var MAX_DIFFICULTY = 19;
/**最大装备数量 */
var EQUIP_MAX_COUNT = 400;
/** 商店物品数量 */
var SHOP_ITEM_COUNT = 5;

// ========== localization.ts ==========
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * 将字符串里$xxx替换为具体翻译
 * @param str 要替换的字符串
 * @returns 替换后的字符串
 * @example replaceDollar("$mana") -> "蓝量加成"
 */
function replaceDollar(text) {
    return text.replace(/\$(\w+)\b/g, function (match, variableName, offset, string) {
        var text = "dota_ability_variable_".concat(variableName);
        var localization = Localize(text);
        if (localization == text) {
            return match;
        }
        return localization;
    });
}
function Localize(token) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (token == "")
        return token;
    var parent;
    var value;
    if (args.length == 1) {
        if (typeof args[0] == "number") {
            value = args[0];
        }
        else {
            parent = args[0];
        }
    }
    if (args.length == 2) {
        value = args[0];
        parent = args[1];
    }
    var originalToken = token;
    if (token[0] != "#") {
        token = "#" + token;
    }
    var old = token;
    if (value != undefined) {
        if (parent != undefined) {
            token = $.Localize(token, value, parent);
        }
        else {
            token = $.Localize(token, value, $.GetContextPanel());
        }
    }
    else {
        if (parent != undefined) {
            token = $.Localize(token, parent);
        }
        else {
            token = $.Localize(token, $.GetContextPanel());
        }
    }
    if (token.length == old.length && token.toLocaleLowerCase() == old.toLocaleLowerCase()) {
        return originalToken;
    }
    token = replaceDollar(token);
    token = token.replace(/(?<!%(-)?(\.(\d+))?([dfl])?\w+\b)%%/g, "%");
    // 匹配 <Hotkey|Skill/> 这样的 <aaa|bbb/> 格式
    token = token.replace(/<(\w+)\|([\s\S]*?)\/>/g, function (match, key, value) {
        // key = "Hotkey", value = "Skill"
        /** 快捷键加描述 */
        if (key == "Hotkey") {
            return "<panel class='InlineHotKey HotKey".concat(value, "'/><span class='AbilityLabel'>").concat(GetLocalization("#feature_" + value), "</span>");
        }
        /** 只有快捷键 */
        if (key == "HotkeyOnly") {
            return "<panel class='InlineHotKey HotKey".concat(value, "'/>");
        }
        if (key == "Mark") {
            return "<span class='MarkLabel'>".concat(value, "</span>");
        }
        if (key == "Constant") {
            // @ts-ignore
            return "<span class='MarkLabel'>".concat(globalThis[value], "</span>");
        }
        if (key == "Ability") {
            var abilityName = GetLocalization("DOTA_Tooltip_ability_".concat(value), "");
            // const keybind = getServiceNetData("player_key_values", Players.GetLocalPlayer())?.["keybind_keyboard_skill"]?.value ?? "";
            // return `<span class='AbilityLabel'>${abilityName}</span><span class="hotkey">${keybind}</span>`;
            return "<span class='MarkLabel'>".concat(abilityName, "</span>");
        }
        return match; // 暂时返回原字符串，等待具体实现
    });
    token = token.replace(/<(\w+\b):([\s\S]*?)\/>/g, function (match, key, text, offset, string) {
        var featureKey = GetLocalization("feature_".concat(key), "");
        if (featureKey == "")
            return match;
        // GameUI.CustomUIConfig().LocalizationFeatureList ??= []
        if (GameUI.CustomUIConfig().LocalizationFeatureList != undefined) {
            if (GameUI.CustomUIConfig().LocalizationFeatureList.indexOf(key) == -1) {
                GameUI.CustomUIConfig().LocalizationFeatureList.push(key);
            }
        }
        return "<span class='FeatureLabel'>".concat(text, "</span>");
    });
    return token;
}
function GetLocalization(text, defaultText) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    // @ts-ignore
    var canLocalize = $.CanLocalize(text);
    if (!canLocalize) {
        return defaultText !== null && defaultText !== void 0 ? defaultText : text;
    }
    var localizedText = Localize.apply(void 0, __spreadArray([text], args, false));
    if (defaultText != undefined && localizedText == text) {
        localizedText = defaultText;
    }
    return localizedText;
}
/**
 * 在独立作用域内收集 GetLocalization 解析到的特性标签。
 * 回调必须同步执行；结束后会恢复调用前的收集状态。
 */
function CollectLocalizationFeatureTags(callback) {
    var _a;
    var config = GameUI.CustomUIConfig();
    var previousFeatureList = config.LocalizationFeatureList;
    config.LocalizationFeatureList = [];
    try {
        var result = callback();
        return {
            result: result,
            tags: __spreadArray([], ((_a = config.LocalizationFeatureList) !== null && _a !== void 0 ? _a : []), true),
        };
    }
    finally {
        config.LocalizationFeatureList = previousFeatureList;
    }
}
var addedValueFunctionMap = {
    attack: Entities.GetAttackDamage,
    health: Entities.GetMaxHealth,
    shield: Entities.GetShield,
};
/** 计算扩展等级成长：value 为1级数值，extra_level_growth 从2级开始生效。 */
function GetAbilityExtraLevelGrowthValue(valueData, level) {
    if (typeof valueData != "object" || valueData.extra_level_growth == undefined)
        return undefined;
    var valueList = String(valueData.value).split(" ");
    var growthList = String(valueData.extra_level_growth).split(" ");
    if (growthList.length == 0)
        return toFiniteNumber(valueList[0], 0);
    var interval = 10;
    var remainingLevels = Math.max(0, Math.floor(level) - 1);
    var value = toFiniteNumber(valueList[0], 0);
    for (var i = 0; i < growthList.length && remainingLevels > 0; i++) {
        // value 已经代表1级，因此首段只包含2~interval级的成长次数。
        var capacity = i == 0 ? interval - 1 : interval;
        var count = Math.min(remainingLevels, capacity);
        value += count * toFiniteNumber(growthList[i], 0);
        remainingLevels -= count;
    }
    if (remainingLevels > 0) {
        value += remainingLevels * toFiniteNumber(growthList[growthList.length - 1], 0);
    }
    return Math.round(value * 1000000) / 1000000;
}
/** 获取具体的数值
 * @param valueData 键对应的值，如"100 200 300"，也有可能是个表，{"value": "100 200 300", "_str": "1"}
 * @param entIndex 实体index，传入实体index就会计算_str这种加成，类型定义在addedValueFunctionMap中
 * @param onlyShowNowLevel 默认为false，true的情况下只显示当前等级的数值
 */
function GetAbilityValue(valueData, params, onlyValue) {
    var _a, _b, _c, _d, _e, _f;
    if (params === void 0) { params = {}; }
    if (onlyValue === void 0) { onlyValue = false; }
    if (valueData == undefined) {
        return 0;
    }
    var level = (_a = params.level) !== null && _a !== void 0 ? _a : 1;
    var entIndex = params.entIndex;
    var onlyShowNowLevel = params.onlyShowNowLevel;
    var hasPct = (_b = params.hasPct) !== null && _b !== void 0 ? _b : false;
    var pctSymbol = hasPct ? "%" : "";
    var baseValueString = "";
    var addedValueString = "";
    var levelGrowthValue = GetAbilityExtraLevelGrowthValue(valueData, Math.max(1, Number(level)));
    var valueList = levelGrowthValue == undefined
        ? String(typeof valueData == "object" ? valueData.value : valueData).split(" ")
        : [String(levelGrowthValue)];
    var maxLevel = valueList.length - 1;
    var currentLevel = Math.min(maxLevel, Math.max(0, level - 1));
    {
        var _baseValue_1 = [];
        var digitalNum = 1;
        var maxs_1 = 0;
        if (onlyShowNowLevel) {
            var value = Number((_c = valueList === null || valueList === void 0 ? void 0 : valueList[currentLevel]) !== null && _c !== void 0 ? _c : "0");
            var s = value.toString().split(".");
            if (s[1] && s[1].length > 0) {
                maxs_1 = s[1].length;
            }
            _baseValue_1 = [Number((_d = valueList === null || valueList === void 0 ? void 0 : valueList[currentLevel]) !== null && _d !== void 0 ? _d : "0")];
        }
        else {
            _baseValue_1 = valueList.map(function (v, index) {
                var value = Number(v);
                var s = value.toString().split(".");
                if (s[1] && s[1].length > maxs_1) {
                    maxs_1 = s[1].length;
                }
                return value;
            });
        }
        if (maxs_1 > 0) {
            for (var i = 0; i < maxs_1; i++) {
                digitalNum = digitalNum * 10;
            }
        }
        if (entIndex != undefined && entIndex > -1) {
            if (_baseValue_1.length > 0) {
                // 加入单位属性的数值
                if (typeof valueData == "object") {
                    for (var key in valueData) {
                        var method = key.substring(0, 1);
                        var addedKey = key.substring(1);
                        var addedValue = 0;
                        var addedValueList = String(valueData[key]).split(" ");
                        var maxLevel_1 = addedValueList.length - 1;
                        if (addedValueFunctionMap[addedKey]) {
                            if (method == "_" || method == "+") {
                                addedValue += Round((addedValueFunctionMap[addedKey](entIndex) * Number(addedValueList[Math.min(maxLevel_1, Math.max(0, level - 1))])) * digitalNum) / digitalNum;
                            }
                        }
                    }
                }
            }
        }
        else {
            // 加入单位属性的数值
            if (typeof valueData == "object") {
                var addedParts = [];
                var _loop_1 = function (key) {
                    var method = key.substring(0, 1);
                    var addedKey = key.substring(1);
                    var addedValueList = String(valueData[key]).split(" ");
                    var addedMaxLevel = addedValueList.length - 1;
                    var addedCurrentLevel = Math.min(addedMaxLevel, Math.max(0, level - 1));
                    if (Object.keys(addedValueFunctionMap).includes(addedKey)) {
                        var addedValueText = void 0;
                        var toPct_1 = function (v) { return Math.round(Number(v) * 10000) / 100; };
                        if (onlyShowNowLevel) {
                            addedValueText = "".concat(toPct_1(addedValueList[addedCurrentLevel]), "%");
                        }
                        else {
                            addedValueText = addedValueList.map(function (v, index) {
                                var str = "".concat(toPct_1(v), "%");
                                if (addedValueList.length > 1) {
                                    if (level > 0 && index == addedCurrentLevel) {
                                        str = "<span class=\"current\">".concat(str, "</span>");
                                    }
                                }
                                else {
                                    str = "<span class=\"current\">".concat(str, "</span>");
                                }
                                return str;
                            }).join("/");
                        }
                        addedParts.push("".concat(addedValueText, " \u00D7 ").concat(GetLocalization("dota_ability_special_variable_" + addedKey)));
                    }
                };
                for (var key in valueData) {
                    _loop_1(key);
                }
                if (addedParts.length > 0) {
                    addedValueString = addedParts.join(" + ");
                }
            }
        }
        if (onlyValue && onlyShowNowLevel) {
            return (_f = (_e = _baseValue_1[currentLevel]) !== null && _e !== void 0 ? _e : _baseValue_1[0]) !== null && _f !== void 0 ? _f : 0;
        }
        if (_baseValue_1.some(function (v) { return v !== 0; })) {
            baseValueString = _baseValue_1.map(function (v, index) {
                var str = v + pctSymbol;
                if (_baseValue_1.length > 1) {
                    if (level > 0 && index == currentLevel) {
                        str = "<span class=\"current\">".concat(str, "</span>");
                    }
                }
                else {
                    str = "<span class=\"current\">".concat(str, "</span>");
                }
                return str;
            }).join("/");
        }
    }
    var connector = (baseValueString != "" && addedValueString != "") ? " + " : "";
    return baseValueString + connector + addedValueString;
}
/** 将description用kv里的键值替换数值
 * @param description 文本描述
 * @param abilityValues 键值表AbilityValues，不再支持旧版的AbilitySpecial
 * @param entIndex 实体index，传入实体index就会计算_str这种加成，类型定义在addedValueFunctionMap中
 * @param symbol 匹配的符号，默认是官方的%damage%，你可以传入["<",">"]来匹配<damage>
 * @param onlyShowNowLevel 默认为false，true的情况下只显示当前等级的数值
 */
function getKeyValueDescription(description, abilityValues, params) {
    var _a, _b, _c, _d;
    if (abilityValues === void 0) { abilityValues = {}; }
    if (params === void 0) { params = {}; }
    var level = (_a = params.level) !== null && _a !== void 0 ? _a : 0;
    var entIndex = ((_b = params.entIndex) !== null && _b !== void 0 ? _b : -1);
    var symbol = (_c = params.symbol) !== null && _c !== void 0 ? _c : ["%", "%"];
    var onlyShowNowLevel = (_d = params.onlyShowNowLevel) !== null && _d !== void 0 ? _d : false;
    var valueNameList = Object.keys(abilityValues);
    for (var _i = 0, valueNameList_1 = valueNameList; _i < valueNameList_1.length; _i++) {
        var valueName = valueNameList_1[_i];
        var block = new RegExp(symbol[0] + valueName + symbol[1], "g");
        var blockPS = new RegExp(symbol[0] + valueName + symbol[1] + "%", "g");
        var iResult = description.search(block);
        var iResultPS = description.search(blockPS);
        if (iResult == -1 && iResultPS == -1)
            continue;
        var value = abilityValues[valueName];
        var spanClass = "GameplayValues GameplayVariable";
        var v = GetAbilityValue(value, {
            entIndex: entIndex,
            level: level,
            onlyShowNowLevel: onlyShowNowLevel,
            hasPct: iResultPS != -1
        });
        description = description.replace(blockPS, "<span class='".concat(spanClass, "'>").concat(v, "</span>"));
        description = description.replace(block, "<span class='".concat(spanClass, "'>").concat(v, "</span>"));
    }
    return description;
}
/** 获取物品属性文本 */
function getItemArrtibute(itemName, level) {
    var _a;
    if (level === void 0) { level = 1; }
    var itemKV = GameUI.CustomUIConfig().npc_items_custom[itemName];
    var AbilityValues = (_a = itemKV === null || itemKV === void 0 ? void 0 : itemKV.AbilityValues) !== null && _a !== void 0 ? _a : {};
    var aValueNames = Object.keys(AbilityValues);
    var sAttributes = aValueNames.filter(function (v) { return v.startsWith("item_"); }).map(function (sValueName) {
        var valueData = AbilityValues[sValueName];
        var valueList = String(typeof valueData == "object" ? valueData.value : valueData).split(" ");
        var maxLevel = valueList.length - 1;
        var currentLevel = Math.min(maxLevel, Math.max(0, level - 1));
        var value = toFiniteNumber(valueList === null || valueList === void 0 ? void 0 : valueList[currentLevel], 0);
        var text = GetLocalization("#property_" + sValueName.substring(5));
        var bHasPercentSign = text.search(/%/g) == 0;
        var name = text.substring(bHasPercentSign ? 1 : 0);
        if (value < 0) {
            name = "<font color='#e03f2f'>" + name + "</font>";
        }
        return (value >= 0 ? "+" : "-") + " <span class='GameplayValues GameplayVariable'>" + Math.abs(value) + (bHasPercentSign ? "%" : "") + "</span> " + name;
    }).join("<br>");
    return sAttributes;
}
/**
 * 根据属性值生成格式化的属性描述文本
 * @param value 属性数值
 * @param propertyName 属性名称（不含前缀）
 * @param isPercent 是否为百分比格式（决定是否在属性名前查找%符号）
 * @returns 格式化后的属性描述HTML字符串
 */
function GetPropertyLocalization(propertyName, value, isPercent) {
    if (isPercent === void 0) { isPercent = false; }
    var text = GetLocalization("#property_" + propertyName);
    // 检查文本是否以百分号开头
    var bHasPercentSign = text && text.search(/%/) === 0;
    // 根据是否以百分号开头截取实际名称
    var name = text ? text.substring(bHasPercentSign ? 1 : 0) : "";
    // 如果值为负数，则将名称标记为红色
    if (value < 0) {
        name = "<font color='#e03f2f'>" + name + "</font>";
    }
    // 返回格式化的字符串，包括正负号、数值和名称
    return (value >= 0 ? "+" : "-") +
        " <span class='GameplayValues GameplayVariable'>" +
        Math.abs(value) + (bHasPercentSign || isPercent ? "%" : "") +
        "</span> " + name;
}
/**
 * 从任意字符串中解析所有标签名
 * 支持格式：<Tag:文本/>、<Tag|文本/>
 */
function GetTagsFromString(text) {
    if (!text)
        return [];
    var tags = new Set();
    var regexList = [
        /<(\w+):[\s\S]*?\/>/g,
        // /<(\w+)\|[\s\S]*?\/>/g,
    ];
    for (var i = 0; i < regexList.length; i++) {
        var regex = regexList[i];
        var match = void 0;
        while ((match = regex.exec(text)) !== null) {
            tags.add(match[1]);
        }
    }
    return Array.from(tags);
}
/** 获取物品的所有Tag（从描述文本和AbilityValues中解析） */
function GetArtifactTags(itemName) {
    var _a, _b, _c;
    var itemKV = GameUI.CustomUIConfig().npc_items_custom[itemName];
    if (!itemKV)
        return [];
    var tags = new Set();
    // 1. 从描述文本中解析标签
    var desc = $.Localize("#DOTA_Tooltip_ability_".concat(itemName, "_description"), $.GetContextPanel());
    var descTags = GetTagsFromString(desc);
    descTags.forEach(function (tag) { return tags.add(tag); });
    // 2. 从 AbilityValues 中获取 Tag
    var abilityValuesTags = GetAbilityValuesTags((_a = itemKV.AbilityValues) !== null && _a !== void 0 ? _a : {});
    abilityValuesTags.forEach(function (tag) { return tags.add(tag); });
    // 3. 从 KV 字段中获取 Tag
    if (Number((_b = itemKV.Quantitylimit) !== null && _b !== void 0 ? _b : 0) == 1) {
        tags.add("Quantitylimit");
    }
    if (String((_c = itemKV.UpgradeGroup) !== null && _c !== void 0 ? _c : "") != "") {
        tags.add("Grouplimit");
    }
    // 4.从tags中获取 Tag
    tags.forEach(function (tag) {
        var tagDesc = $.Localize("#feature_".concat(tag, "_description"), $.GetContextPanel());
        var nestedTags = GetTagsFromString(tagDesc);
        nestedTags.forEach(function (nestedTag) { return tags.add(nestedTag); });
    });
    // tagsTemp.forEach(tempTag => {
    // 	tags.add(tempTag);
    // });
    return Array.from(tags);
}
/** 获取技能升级的所有Tag（从描述文本和AbilityValues中解析） */
function GetAbilityUpgradeTags(upgradeID) {
    var _a;
    var upgradeKV = GameUI.CustomUIConfig().ability_upgrades[upgradeID];
    if (!upgradeKV)
        return [];
    var tags = new Set();
    // 1. 从描述文本中解析标签
    var desc = $.Localize("#".concat(upgradeID, "_description"), $.GetContextPanel());
    var descTags = GetTagsFromString(desc);
    descTags.forEach(function (tag) { return tags.add(tag); });
    // 2. 从 AbilityValues 中获取 Tag
    var abilityValuesTags = GetAbilityValuesTags((_a = upgradeKV.AbilityValues) !== null && _a !== void 0 ? _a : {});
    abilityValuesTags.forEach(function (tag) { return tags.add(tag); });
    // 3.从tags中获取 Tag
    tags.forEach(function (tag) {
        var tagDesc = $.Localize("#feature_".concat(tag, "_description"), $.GetContextPanel());
        var nestedTags = GetTagsFromString(tagDesc);
        nestedTags.forEach(function (nestedTag) { return tags.add(nestedTag); });
    });
    return Array.from(tags);
}
/** 传入AbilityValues解析tag */
function GetAbilityValuesTags(abilityValues) {
    if (abilityValues === void 0) { abilityValues = {}; }
    var tags = new Set();
    var addPropertyTags = function (property) {
        var token = "#property_".concat(property);
        // @ts-ignore
        if (!$.CanLocalize(token))
            return;
        var tagDesc = $.Localize(token, $.GetContextPanel());
        var parsedTags = GetTagsFromString(tagDesc);
        parsedTags.forEach(function (tag) { return tags.add(tag); });
    };
    for (var key in abilityValues) {
        var value = abilityValues[key];
        // 物品自动属性检查
        if (key.startsWith("item_")) {
            var property = key.substring(5);
            addPropertyTags(property);
            // if (PROPERTY_TAGS[property]) {
            // 	PROPERTY_TAGS[property].forEach(tag => tags.add(tag));
            // }
        }
        // 附加属性检查
        if (typeof value == "object") {
            for (var _addedKey in value) {
                var method = _addedKey.substring(0, 1);
                if (method != "_" && method != "+")
                    continue;
                var addedKey = _addedKey.substring(1);
                addPropertyTags(addedKey);
                // if (PROPERTY_TAGS[addedKey]) {
                // 	PROPERTY_TAGS[addedKey].forEach(tag => tags.add(tag));
                // }
            }
        }
    }
    return Array.from(tags);
}
/**
 * 获取特权描述
 * @param privilege 特权名
 * @param value 外部传入的value
 */
function GetPrivilegeDesc(privilege, level, params) {
    var _a, _b;
    if (level === void 0) { level = 1; }
    if (KeyValues.privilege[privilege]) {
        var privilegeData = KeyValues.privilege[privilege];
        var suitLimit = toFiniteNumber((_b = (_a = KeyValues.gem_entry_suit) === null || _a === void 0 ? void 0 : _a[privilege]) === null || _b === void 0 ? void 0 : _b.entry_limit, 0);
        var effectiveLevel = suitLimit > 0 ? Math.min(level, suitLimit) : level;
        var values = __assign(__assign({}, privilegeData.AbilityValues), params);
        return getKeyValueDescription(GetLocalization("#DOTA_Tooltip_ability_".concat(privilege), ""), values, { level: effectiveLevel, onlyShowNowLevel: true });
    }
    return "";
}
/**
 *  解析描述文本
 * @param effectText K:V|PrivilegeKey
 * @returns
 */
function ParseEffectTooltipSegments(effectText) {
    if (effectText === undefined || effectText === "") {
        return [];
    }
    var result = [];
    var effectSegments = effectText.split("|");
    for (var index = 0; index < effectSegments.length; index++) {
        var segment = effectSegments[index];
        if (segment === "") {
            continue;
        }
        var _a = segment.split(":"), rawKey = _a[0], rawValue = _a[1];
        if (rawKey === undefined || rawKey === "") {
            continue;
        }
        if (rawValue !== undefined && rawValue !== "") {
            var parsedValue = Number(rawValue);
            if (!Number.isNaN(parsedValue)) {
                result.push({
                    rawKey: rawKey,
                    value: parsedValue,
                    text: GetPropertyLocalization(rawKey, parsedValue),
                });
                continue;
            }
        }
        var privilegeText = GetPrivilegeDesc(rawKey);
        if (privilegeText !== "") {
            result.push({
                rawKey: rawKey,
                text: privilegeText,
            });
        }
    }
    return result;
}
function GetEffectTooltipText(effectText) {
    return ParseEffectTooltipSegments(effectText).map(function (segment) { return segment.text; }).join("<br>");
}
/**
 * 替换本地化文本中的变量
 * @param token 本地化 key（支持带或不带 # 前缀）
 * @param variables 变量对象，如 {playerName: "xxx", amount: 100}
 * @returns 替换后的文本
 *
 * @example
 * // 本地化文件： "npc_achievement" "成就系统 {playerName}"
 * LocalizeWithVars("#npc_achievement", {playerName: "张三"})
 * // 返回: "成就系统 张三"
 */
function LocalizeWithVars(token, variables) {
    if (variables === void 0) { variables = {}; }
    // @ts-ignore
    var canLocalize = $.CanLocalize(token);
    if (!canLocalize) {
        return token;
    }
    var text = Localize(token);
    // 替换所有 {variableName} 格式的变量
    for (var _i = 0, _a = Object.entries(variables); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var regex = new RegExp("\\{".concat(key, "\\}"), "g");
        text = text.replace(regex, String(value));
    }
    return text;
}
;

// ========== request.js ==========
function ServerRequest(event, data, func, timeout, timeoutCallback) {
	return CustomUIConfig.ServerRequest(event, data, func, timeout, timeoutCallback);
}

function CancelRequest(index) {
	CustomUIConfig.CancelServerRequest(index);
}

function ClientRequest(event, data) {
	let t = CustomNetTables.GetTableValue("common", "client_ability");
	if (t) {
		let abilityEntIndex = t._;
		if (typeof abilityEntIndex == "number" && Entities.IsValidEntity(abilityEntIndex)) {
			GameEvents.SendEventClientSide("client_request_event", {
				event: event,
				data: JSON.stringify(data),
			});
			let value = Abilities.GetAbilityTextureName(abilityEntIndex);
			return JSON.parseSafe(value);
		}
	}
}

// ========== command.ts ==========
"use strict";
Game.AddCommandUnique = function (pszCommandName, callback, pszDescription, nFlags) {
    var _a;
    (_a = CustomUIConfig.ConsoleCommandUnique) !== null && _a !== void 0 ? _a : (CustomUIConfig.ConsoleCommandUnique = {});
    var uniqueKey = DoUniqueString(Math.floor(Date.now() / 1000));
    Game.AddCommand(pszCommandName + uniqueKey, callback, pszDescription, nFlags);
    var state = Game.GetState();
    // 这之前lua客户端还没初始化，所以先记下来接下来一起发
    if (state < DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP) {
        CustomUIConfig.ConsoleCommandUnique[pszCommandName] = uniqueKey;
    }
    else {
        GameEvents.SendEventClientSide("custom_command_unique", { command: pszCommandName, unique: uniqueKey });
    }
};

// ========== keybind.ts ==========
"use strict";
var KeyCode;
(function (KeyCode) {
    KeyCode["Q"] = "Q";
    KeyCode["W"] = "W";
    KeyCode["E"] = "E";
    KeyCode["R"] = "R";
    KeyCode["T"] = "T";
    KeyCode["Y"] = "Y";
    KeyCode["U"] = "U";
    // I="I",
    KeyCode["O"] = "O";
    KeyCode["P"] = "P";
    KeyCode["A"] = "A";
    KeyCode["S"] = "S";
    KeyCode["D"] = "D";
    KeyCode["F"] = "F";
    KeyCode["G"] = "G";
    KeyCode["H"] = "H";
    KeyCode["J"] = "J";
    KeyCode["K"] = "K";
    KeyCode["L"] = "L";
    KeyCode["Z"] = "Z";
    KeyCode["X"] = "X";
    KeyCode["C"] = "C";
    KeyCode["V"] = "V";
    KeyCode["B"] = "B";
    KeyCode["N"] = "N";
    KeyCode["M"] = "M";
    KeyCode["Backquote"] = "`";
    KeyCode["Tab"] = "TAB";
    KeyCode["Capslock"] = "CAPSLOCK";
    KeyCode["Shift"] = "SHIFT";
    KeyCode["Ctrl"] = "CTRL";
    //无效 Alt="ALT",
    KeyCode["Space"] = "SPACE";
    // Minus="-",
    // Equal="=",
    // Backspace="BACKSPACE",
    // BracketLeft="[",
    // BracketRight="]",
    // Backslash="\\",
    //无效 Semicolon=";",
    // Quote="'",
    // Comma=",",
    // Period=".",
    // Slash="/",
    //无效 Enter="RETURN",
    // Printscreen="PRINTSCREEN",
    // ScrollLock="SCROLLLOCK",
    // Pause="PAUSE",
    //无效 Insert="INSERT",
    // Home="HOME",
    //无效 Delete="DELETE",
    // End="END",
    //无效 PageUp="PAGEUP",
    //无效 PageDown="PAGEDOWN",
    //无效 Up="UP",
    //无效 Down="DOWN",
    //无效 Left="LEFT",
    //无效 Right="RIGHT",
    KeyCode["Digit1"] = "1";
    KeyCode["Digit2"] = "2";
    KeyCode["Digit3"] = "3";
    KeyCode["Digit4"] = "4";
    KeyCode["Digit5"] = "5";
    KeyCode["Digit6"] = "6";
    KeyCode["Digit7"] = "7";
    KeyCode["Digit8"] = "8";
    KeyCode["Digit9"] = "9";
    KeyCode["Digit0"] = "0";
    // S1_UP="S1_UP",
    // S1_DOWN="S1_DOWN",
    // S1_LEFT="S1_LEFT",
    // S1_RIGHT="S1_RIGHT",
    // A_BUTTON="A_BUTTON",
    // B_BUTTON="B_BUTTON",
    // X_BUTTON="X_BUTTON",
    // Y_BUTTON="Y_BUTTON",
    // L_SHOULDER="L_SHOULDER",
    // R_SHOULDER="R_SHOULDER",
    // L_TRIGGER="L_TRIGGER",
    // R_TRIGGER="R_TRIGGER",
    // X_AXIS="X_AXIS",
    // Keypad1="KEYPAD1",
    // Keypad2="KEYPAD2",
    // Keypad3="KEYPAD3",
    // Keypad4="KEYPAD4",
    // Keypad5="KEYPAD5",
    // Keypad6="KEYPAD6",
    // Keypad7="KEYPAD7",
    // Keypad8="KEYPAD8",
    // Keypad9="KEYPAD9",
    // Keypad0="KEYPAD0",
    // KeypadPeriod="KEYPAD.",
    // NumLock="NUMLOCK",
    //无效 KeypadDivide="KEYPAD/",
    //无效 KeypadMultiply="KEYPAD*",
    //无效 KeypadSubtract="KEYPAD-",
    //无效 KeypadAdd="KEYPAD+",
    //无效 KeypadEnter="KEYPAD ENTER",
    KeyCode["Esc"] = "ESCAPE";
    // F1="F1",
    // F2="F2",
    // F3="F3",
    // F4="F4",
    // F5="F5",
    // F6="F6",
    // F7="F7",
    // F8="F8",
    // F9="F9",
    // F10="F10",
    // F11="F11",
    // F12="F12",
})(KeyCode || (KeyCode = {}));
;
/**
 * 根据功能获取当前快捷键（优先玩家自定义，其次默认键位）
 * @param func 功能枚举 KeyFunction
 * @param playerKeyValues 可传入响应式读取的设置快照
 * @returns 快捷键名（如 W、SPACE、MOUSE0）
 */
function GetKeyBind(func, playerKeyValues) {
    var _a, _b, _c, _d, _e, _f;
    if (playerKeyValues === void 0) { playerKeyValues = getServiceNetData("player_key_values", Players.GetLocalPlayer()); }
    if (playerKeyValues !== undefined) {
        var mode_1 = (_b = (_a = playerKeyValues["move_mode"]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : MOVE_MODE_KEYBOARD;
        var modePrefix = mode_1 == MOVE_MODE_KEYBOARD ? "" : "_m".concat(mode_1);
        var keybindData = playerKeyValues["keybind_keyboard".concat(modePrefix, "_").concat(func)];
        if (keybindData !== undefined && keybindData.value !== undefined) {
            return keybindData.value;
        }
    }
    var mode = (_d = (_c = playerKeyValues === null || playerKeyValues === void 0 ? void 0 : playerKeyValues["move_mode"]) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : MOVE_MODE_KEYBOARD;
    var defaults = (_e = MOVE_MODE_DEFAULTS[mode]) !== null && _e !== void 0 ? _e : DEFAULT_KEYBOARD_BINDINGS;
    return (_f = defaults[func]) !== null && _f !== void 0 ? _f : "";
}
/**
 * 注册一个按键事件
 * @param keyName 按键名
 * @param funcPressedCallback 按下按键事件回调
 * @param funcReleasedCallback 松开按键事件回调
 * @returns 返回事件字符串用于取消注册
 */
function RegisterKeyEvent(keyName, funcPressedCallback, funcReleasedCallback) {
    var data = ClientRequest("register_key_event", { key_name: keyName });
    if (data) {
        var uniqueName = data.unique_name;
        Game.AddCommand("+".concat(uniqueName), function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            if (funcPressedCallback != undefined) {
                funcPressedCallback(data);
            }
        }, "", 67108864);
        Game.AddCommand("-".concat(uniqueName), function () {
            if (funcReleasedCallback != undefined) {
                funcReleasedCallback(data);
            }
        }, "", 67108864);
        return data.event_name;
    }
}
/**
 * 注销注册的按键事件
 * @param sEventName 事件字符串
 * @returns 是否注销成功
 */
function UnregisterKeyEvent(keyName) {
    var _a;
    return (_a = ClientRequest("unregister_key_event", { event_name: keyName })) === null || _a === void 0 ? void 0 : _a.success;
}
/**
 * 注册一个技能槽位的快捷键
 * @param slot 槽位，从0开始
 * @param keyName 键位
 * @param quickCast 是否是快捷施法
 * @returns 返回注册的事件字符串
 */
function RegisterAbilityKeyEvent(slot, keyName, quickCast) {
    var tData = ClientRequest("register_ability_key_event", { slot: slot, key_name: keyName, quick_cast: quickCast });
    if (tData) {
        var sEventName_1 = tData.event_name;
        Game.AddCommand("+".concat(sEventName_1), function () {
            var hCaster = Players.GetSelectedEntities(Players.GetLocalPlayer())[0];
            if (Entities.IsValidEntity(hCaster)) {
                var hAbility = Entities.GetAbility(hCaster, slot);
                if (Entities.IsValidEntity(hAbility)) {
                    if (GameUI.IsAltDown() && Abilities.IsAutocast(hAbility)) {
                        GameEvents.SendEventClientSide("custom_ability_key_event", {
                            event_name: sEventName_1,
                            phase: 0,
                        });
                        return;
                    }
                    else {
                        GameEvents.SendEventClientSide("custom_ability_key_event", {
                            event_name: sEventName_1,
                            phase: 1,
                        });
                    }
                }
            }
        }, "", 67108864);
        Game.AddCommand("-".concat(sEventName_1), function () {
            var hCaster = Players.GetSelectedEntities(Players.GetLocalPlayer())[0];
            if (Entities.IsValidEntity(hCaster)) {
                var hAbility = Entities.GetAbility(hCaster, slot);
                if (Entities.IsValidEntity(hAbility)) {
                    GameEvents.SendEventClientSide("custom_ability_key_event", {
                        event_name: sEventName_1,
                        phase: 2,
                    });
                }
            }
        }, "", 67108864);
        return tData.event_name;
    }
}
/**
 * 注销注册的技能槽位快捷键
 * @param eventName 事件字符串
 * @returns 是否注销成功
 */
function UnregisterAbilityKeyEvent(eventName) {
    var _a;
    return (_a = ClientRequest("unregister_ability_key_event", { event_name: eventName })) === null || _a === void 0 ? void 0 : _a.success;
}

// ========== Entities.ts ==========
"use strict";
Entities.HasBuff = function (unitEntIndex, buffName) {
    for (var index = 0; index < Entities.GetNumBuffs(unitEntIndex); index++) {
        var buff = Entities.GetBuff(unitEntIndex, index);
        if (Buffs.GetName(unitEntIndex, buff) == buffName)
            return true;
    }
    return false;
};
Entities.FindBuffByName = function (unitEntIndex, buffName) {
    for (var index = 0; index < Entities.GetNumBuffs(unitEntIndex); index++) {
        var buff = Entities.GetBuff(unitEntIndex, index);
        if (Buffs.GetName(unitEntIndex, buff) == buffName)
            return buff;
    }
    return -1;
};
Entities.GetHealthBarWidth = function (iUnitEntIndex) {
    return finiteNumber(Number(Entities.GetUnitData(iUnitEntIndex, "GetHealthBarWidth")), -1);
};
Entities.GetHealthBarHeight = function (iUnitEntIndex) {
    return finiteNumber(Number(Entities.GetUnitData(iUnitEntIndex, "GetHealthBarHeight")), -1);
};
Entities.GetPropertyValue = function (key, propertyId, fallbackToPlayer) {
    // 0 = UNIT scope
    var unitKey = "0_".concat(key);
    var unitData = CustomNetTables.GetTableValue("property_system", unitKey);
    if (unitData && unitData[propertyId] != undefined) {
        return toFiniteNumber(Float(unitData[propertyId]), 0);
    }
    // 单位 scope 未命中时，允许回退的属性名列表；undefined 表示回退所有属性
    if (fallbackToPlayer === undefined || fallbackToPlayer.includes(propertyId)) {
        //fallback: 1 = PLAYER scope，用单位的所有者 playerID 查
        var playerID = Entities.GetPlayerOwnerID(key);
        if (playerID !== -1) {
            var playerKey = "1_".concat(playerID);
            var playerData = CustomNetTables.GetTableValue("property_system", playerKey);
            if (playerData && playerData[propertyId] != undefined) {
                return toFiniteNumber(Float(playerData[propertyId]), 0);
            }
        }
    }
    return 0;
};
Entities.HasState = function (unitEntIndex, stateId) {
    var entityKey = "unit_".concat(unitEntIndex);
    var data = CustomNetTables.GetTableValue("state_system", entityKey);
    if (data && data[stateId] != undefined) {
        return Boolean(data[stateId]);
    }
    return false;
};
// Entities.GetMaxMana_Engine ??= Entities.GetMaxMana;
// Entities.GetMaxMana = (unitEntIndex: EntityIndex): number => {
// 	return (Entities.GetMaxMana_Engine(unitEntIndex) + Entities.GetPropertyValue(unitEntIndex, "mana")) * (1 + Entities.GetPropertyValue(unitEntIndex, "mana_amplify") * 0.01);
// };
// Entities.GetMaxHealth_Engine ??= Entities.GetMaxHealth;
// Entities.GetMaxHealth = (unitEntIndex): number => {
// 	return Math.floor((Entities.GetPropertyValue(unitEntIndex, "base_health") + Entities.GetPropertyValue(unitEntIndex, "health")) * (1 + Entities.GetPropertyValue(unitEntIndex, "health_amplify") * 0.01) * (1 + Entities.GetPropertyValue(unitEntIndex, "defense_intensity") * INTENSITY_FACTOR * 0.01));
// };
Entities.HasHealthBar = function (unitEntIndex) {
    return Entities.HasState(unitEntIndex, StateEnum.HEALTH_BAR) && !Entities.HasState(unitEntIndex, StateEnum.NO_HEALTH_BAR);
};
Entities.GetAttackDamage = function (unitEntIndex) {
    return Float((Entities.GetPropertyValue(unitEntIndex, "base_attack") + Entities.GetPropertyValue(unitEntIndex, "attack")) * (1 + Entities.GetPropertyValue(unitEntIndex, "attack_amplify") / 100));
};
Entities.GetShield = function (unitEntIndex) {
    return Buffs.GetStackCount(unitEntIndex, Entities.FindBuffByName(unitEntIndex, "modifier_shield"));
};

// ========== Players.ts ==========
"use strict";
Players.GetPropertyValue = function (playerID, propertyId) {
    // 1代表玩家属性
    var entityKey = "1_".concat(playerID);
    var data = CustomNetTables.GetTableValue("property_system", entityKey);
    if (data && data[propertyId] != undefined) {
        return toFiniteNumber(Float(data[propertyId]), 0);
    }
    return 0;
};
Players.SetPlayerSetting = function (key, value) {
    if (value == true) {
        value = "TRUE";
    }
    if (value == false) {
        value = "FALSE";
    }
    CallAction("/v1/key/save", { type: "setting", key: key, value: String(value) });
};
Players.GetPlayerSetting = function (key, dafaultValue) {
    var _a, _b, _c;
    var playerKeyValues = (_a = getServiceNetData("player_key_values", Players.GetLocalPlayer())) !== null && _a !== void 0 ? _a : {};
    return ((_c = (_b = playerKeyValues[key]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : dafaultValue);
};

// ========== Abilities.ts ==========
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
function getUnitAbilityNetState(unitIndex, abilityIndex) {
    var state = getCachedNetDataKey("ability_state", String(abilityIndex));
    return (state === null || state === void 0 ? void 0 : state.unitIndex) === unitIndex && state.entIndex === abilityIndex ? state : undefined;
}
/** 列表提供身份，等级和层数只从对应实体的动态状态读取。 */
function getUnitItemNetData(unitIndex, item) {
    var state = getUnitAbilityNetState(unitIndex, item.entIndex);
    if (state && state.abilityName === item.itemName) {
        return __assign(__assign({}, item), { level: state.level, stackCount: state.stackCount });
    }
    return __assign(__assign({}, item), { level: 0, stackCount: 0 });
}
Abilities.GetChargeRestoreTime = function (abilityEntIndex) {
    return Abilities.GetChargeInfo(abilityEntIndex).chargeRestoreTime;
};
Abilities.GetMaxCharge = function (abilityEntIndex) {
    return Abilities.GetChargeInfo(abilityEntIndex).maxCharge;
};
Abilities.GetCharge = function (abilityEntIndex) {
    return Abilities.GetChargeInfo(abilityEntIndex).charge;
};
Abilities.GetChargeInfo = function (abilityEntIndex) {
    var unitIndex = Abilities.GetCaster(abilityEntIndex);
    var state = getUnitAbilityNetState(unitIndex, abilityEntIndex);
    if (state && state.abilityName === Abilities.GetAbilityName(abilityEntIndex))
        return state;
    return {
        entIndex: -1,
        level: 0,
        stackCount: 0,
        abilityName: "",
        charge: 0,
        maxCharge: 0,
        chargeRestoreTime: 0,
        isChargeCooldownFrozen: false,
        chargeFrozenCooldownRemaining: 0,
    };
};
Abilities.GetAbilityCooldown = function (abilityEntIndex) {
    var casterIndex = Abilities.GetCaster(abilityEntIndex);
    return Abilities.GetCooldown(abilityEntIndex) * (1 - Entities.GetPropertyValue(casterIndex, "cooldown_reduction") * 0.01);
};
/** 解析值数据在指定level的数值 */
function parseValueAtLevel(valueData, level) {
    var _a;
    if (valueData === undefined)
        return 0;
    var valueString = typeof valueData == "object" ? String(valueData.value) : String(valueData);
    var valueList = valueString.split(" ");
    var maxLevel = valueList.length - 1;
    return Number((_a = valueList[Math.min(maxLevel, Math.max(0, level - 1))]) !== null && _a !== void 0 ? _a : 0);
}
/** 将固定加成和百分比乘算统一应用到valueData的每一级上，保持原有格式 */
function calculateValueData(valueData, bonus, multiplierPct) {
    if (bonus === 0 && multiplierPct === 0)
        return valueData;
    var factor = 1 + multiplierPct * 0.01;
    var calculateValueList = function (value) { return String(value)
        .split(" ")
        .map(function (v) { return String(Round((Number(v) + bonus) * factor, 6)); })
        .join(" "); };
    if (typeof valueData == "object") {
        return __assign(__assign({}, valueData), { value: calculateValueList(valueData.value) });
    }
    return calculateValueList(valueData);
}
Abilities.GetUpgradedAbilityValues = function (abilityName, baseAbilityValues, unitEntIndex) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (unitEntIndex == undefined || unitEntIndex < 0) {
        return baseAbilityValues;
    }
    var data = getNetDataKey("ability_upgrade", String(unitEntIndex));
    if (!(data === null || data === void 0 ? void 0 : data.upgrades)) {
        return baseAbilityValues;
    }
    var bonusByTarget = {};
    var multiplierPctByTarget = {};
    // 遍历所有升级，分别累计固定加成和百分比乘算
    for (var _i = 0, _h = data.upgrades; _i < _h.length; _i++) {
        var upgrade = _h[_i];
        var upgradeKV = (_b = (_a = KeyValues.ability_upgrades) === null || _a === void 0 ? void 0 : _a[upgrade.name]) !== null && _b !== void 0 ? _b : (_c = KeyValues.ability_upgrades_service) === null || _c === void 0 ? void 0 : _c[upgrade.name];
        if (!upgradeKV || upgradeKV.ability_name !== abilityName || !upgradeKV.AbilityValues) {
            continue;
        }
        for (var key in upgradeKV.AbilityValues) {
            if (baseAbilityValues[key] === undefined)
                continue;
            var upgradeValue = upgradeKV.AbilityValues[key];
            var bonus = parseValueAtLevel(upgradeValue, upgrade.level);
            bonusByTarget[key] = ((_d = bonusByTarget[key]) !== null && _d !== void 0 ? _d : 0) + bonus;
        }
        var valueMultipliers = upgradeKV.AbilityValueMultipliers;
        if (valueMultipliers !== undefined) {
            for (var targetKey in valueMultipliers) {
                if (baseAbilityValues[targetKey] === undefined)
                    continue;
                var multiplierValueName = valueMultipliers[targetKey];
                var multiplierValue = upgradeKV.AbilityValues[multiplierValueName];
                multiplierPctByTarget[targetKey] = ((_e = multiplierPctByTarget[targetKey]) !== null && _e !== void 0 ? _e : 0) + parseValueAtLevel(multiplierValue, upgrade.level);
            }
        }
    }
    var mergedValues = {};
    for (var key in baseAbilityValues) {
        mergedValues[key] = calculateValueData(baseAbilityValues[key], (_f = bonusByTarget[key]) !== null && _f !== void 0 ? _f : 0, (_g = multiplierPctByTarget[key]) !== null && _g !== void 0 ? _g : 0);
    }
    return mergedValues;
};

// ========== net_table.js ==========
// 按原始 JSON 缓存解码结果；调用方只读，变化通过新的网表值交付。
const cachedNetData = {};
function getCachedNetDataKey(tableName, tableKey) {
	const cacheKey = tableName + ":" + tableKey;
	const json = CustomNetTables.GetTableValue(tableName, tableKey)?.data;
	const cached = cachedNetData[cacheKey];
	if (cached && cached.json === json) return cached.value;
	const value = json ? JSON.parseSafe(json) : undefined;
	cachedNetData[cacheKey] = { json, value };
	return value;
}

/** 监听 JSON 网表的所有 key；初始值由调用方按需读取。 */
function ListenNetDataTable(tableName, callback) {
	return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
		callback(key, value?.data ? JSON.parseSafe(value.data) : undefined);
	});
}

/** 网表，但是套的netdata的定义，因为是json所以会保留array */
function useNetDataKey(tableName, tableKey, callback, playerID) {
	if (playerID == -1) {
		for (let id = 0; id < 4; id++) {
			const net = CustomNetTables.GetTableValue(tableName, tableKey + id);
			if (net != undefined) {
				if (net.data == "") {
					callback(undefined, id);
				} else {
					const data = JSON.parseSafe(net.data);
					callback(data, id);
				}
			}
		}
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (new RegExp(`^${tableKey}[0-7]$`).test(key)) {
				if (value.data == "") {
					callback(undefined, id);
				} else {
					const data = JSON.parseSafe(value.data);
					const id = finiteNumber(Number(key.slice(-1)), -1);
					callback(data, id);
				}
			}
		});
	} else if (typeof playerID == "number") {
		const realKey = tableKey + playerID.toString();
		const net = CustomNetTables.GetTableValue(tableName, realKey);
		if (net != undefined) {
			if (net.data == "") {
				callback(undefined);
			} else {
				const data = JSON.parseSafe(net.data);
				callback(data);
			}
		}
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (key == realKey) {
				if (value.data == "") {
					callback(undefined);
				} else {
					const data = JSON.parseSafe(value.data);
					callback(data);
				}
			}
		});
	} else {
		const net = CustomNetTables.GetTableValue(tableName, tableKey);
		if (net != undefined) {
			if (net.data == "") {
				callback(undefined);
			} else {
				const data = JSON.parseSafe(net.data);
				callback(data);
			}
		}
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (key == tableKey) {
				if (value.data == "") {
					callback(undefined);
				} else {
					const data = JSON.parseSafe(value.data);
					callback(data);
				}
			}
		});
	}
}
/** 网表，但是套的netdata的定义，因为是json所以会保留array */
function ListenNetDataKey(tableName, tableKey, callback, playerID) {
	if (playerID == -1) {
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (new RegExp(`^${tableKey}[0-7]$`).test(key)) {
				const data = JSON.parseSafe(value.data);
				const id = finiteNumber(Number(key.slice(-1)), -1);
				callback(data, id);
			}
		});
	} else if (typeof playerID == "number") {
		const realKey = tableKey + playerID.toString();
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (key == realKey) {
				const data = JSON.parseSafe(value.data);
				callback(data);
			}
		});
	} else {
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (key == tableKey) {
				const data = JSON.parseSafe(value.data);
				callback(data);
			}
		});
	}
}
function getNetDataKey(tableName, tableKey, playerID) {
	if (playerID == -1) {
		const result = {};
		for (let id = 0; id < 4; id++) {
			const realKey = tableKey + id;
			const net = CustomNetTables.GetTableValue(tableName, realKey);
			if (net != undefined) {
				const data = JSON.parseSafe(net.data);
				result[id] = data;
			}
		}
		return result;
	} else if (typeof playerID == "number") {
		const realKey = tableKey + playerID.toString();
		const net = CustomNetTables.GetTableValue(tableName, realKey);
		if (net != undefined) {
			const data = JSON.parseSafe(net.data);
			return data;
		}
	} else {
		const net = CustomNetTables.GetTableValue(tableName, tableKey);
		if (net != undefined) {
			const data = JSON.parseSafe(net.data);
			return data;
		}
	}
}

/** 网表，但是套的netdata的定义，因为是json所以会保留array */
function useServiceNetData(tableName, callback, playerID) {
	if (playerID == -1) {
		const cache = CustomNetTables.GetTableValue("service", tableName);
		if (cache != undefined) {
			const data = JSON.parse(cache.data);
			callback(data);
		}
		return CustomNetTables.SubscribeNetTableListener("service", (_, key, value) => {
			if (tableName == key) {
				const data = JSON.parse(value.data);
				callback(data);
			}
		});
	} else if (typeof playerID == "number") {
		const tableKey = tableName + playerID.toString();
		const cache = CustomNetTables.GetTableValue("service", tableKey);
		if (cache != undefined) {
			const data = JSON.parse(cache.data);
			callback(data);
		}
		return CustomNetTables.SubscribeNetTableListener("service", (_, key, value) => {
			if (key == tableKey) {
				const data = JSON.parse(value.data);
				callback(data);
			}
		});
	} else {
		const tableKey = tableName;
		const cache = CustomNetTables.GetTableValue("service", tableKey);
		if (cache != undefined) {
			const data = JSON.parse(cache.data);
			callback(data);
		}
		return CustomNetTables.SubscribeNetTableListener("service", (_, key, value) => {
			if (key == tableKey) {
				const data = JSON.parse(value.data);
				callback(data);
			}
		});
	}
}
function getServiceNetData(tableName, playerID) {
	if (playerID == -1) {
		const cache = CustomNetTables.GetTableValue("service", tableName);
		if (cache != undefined) {
			return JSON.parse(cache.data);
		}
	} else if (typeof playerID == "number") {
		const tableKey = tableName + playerID.toString();
		const cache = CustomNetTables.GetTableValue("service", tableKey);
		if (cache != undefined) {
			const data = JSON.parse(cache.data);
			return data;
		}
	} else {
		const tableKey = tableName;
		const cache = CustomNetTables.GetTableValue("service", tableKey);
		if (cache != undefined) {
			const data = JSON.parse(cache.data);
			return data;
		}
	}
}


/** 玩家数据监听 */
function SubscribePlayerDataListener(playerID, tableKey, callback) {
	if (playerID == -1) {
		let players = Game.GetPlayerIDsOnTeam(DOTATeam_t.DOTA_TEAM_GOODGUYS);
		return players.map((id) => CustomNetTables.SubscribeNetTableListener(`player_data_${id}`, (_, key, value) => {
			if (key == tableKey) {
				if (value.data == "") {
					callback(id, undefined);
					return;
				}
				const data = JSON.parseSafe(value.data);
				callback(id, data);
			}
		}));
	} else {
		return [CustomNetTables.SubscribeNetTableListener(`player_data_${playerID}`, (_, key, value) => {
			if (key == tableKey) {
				if (value.data == "") {
					callback(playerID, undefined);
					return;
				}
				const data = JSON.parseSafe(value.data);
				callback(playerID, data);
			}
		})];
	}
}
function UnsubscribePlayerDataListener(keys) {
	for (const key of keys) {
		CustomNetTables.UnsubscribeNetTableListener(key);
	}
}
function GetPlayerData(playerID, tableKey) {
	let t = CustomNetTables.GetTableValue(`player_data_${playerID}`, tableKey);
	if (t == undefined) {
		return undefined;
	}
	return JSON.parseSafe(t.data);
}
function GetAllPlayerData(tableKey) {
	let players = Game.GetPlayerIDsOnTeam(DOTATeam_t.DOTA_TEAM_GOODGUYS);
	let t = {};
	for (let i = 0; i < players.length; i++) {
		const playerID = players[i];
		let data = GetPlayerData(playerID, tableKey);
		if (data != undefined) {
			t[playerID] = data;
		}
	}
	return t;
}

// ========== store.ts ==========
"use strict";
/** 道具类型 */
var PropType;
(function (PropType) {
    /** 货币 */
    PropType[PropType["Token"] = 1] = "Token";
    /** 经验 */
    PropType[PropType["Exp"] = 2] = "Exp";
    /** 祝福 */
    PropType[PropType["Bless"] = 3] = "Bless";
    /** 藏品 */
    PropType[PropType["Collection"] = 4] = "Collection";
    /** 英雄 */
    PropType[PropType["Hero"] = 5] = "Hero";
    /** 信使 */
    PropType[PropType["Courier"] = 6] = "Courier";
    /** 通行证 */
    // BattlePass = 7,
    /** 商品 */
    PropType[PropType["Store"] = 8] = "Store";
    /** 装备 */
    PropType[PropType["Equipment"] = 9] = "Equipment";
    /** 英雄武器 */
    PropType[PropType["Weapon"] = 10] = "Weapon";
    /** 精粹 */
    PropType[PropType["Essences"] = 11] = "Essences";
    /** 通行证 */
    PropType[PropType["BattlePass"] = 12] = "BattlePass";
    /** 宝石 */
    PropType[PropType["Gem"] = 14] = "Gem";
    /** 符文 */
    PropType[PropType["Rune"] = 15] = "Rune";
    /** 渊瞳珍宝 */
    PropType[PropType["CollectionTreasure"] = 16] = "CollectionTreasure";
    /** 饰品 */
    PropType[PropType["Cosmetic"] = 17] = "Cosmetic";
    /** 宝箱 */
    PropType[PropType["Chest"] = 18] = "Chest";
    /** 地牢钥匙 */
    PropType[PropType["Key"] = 19] = "Key";
    /** 装备图纸 */
    PropType[PropType["Drawing"] = 20] = "Drawing";
    /** 猎魂战利品 */
    PropType[PropType["Huntloot"] = 22] = "Huntloot";
})(PropType || (PropType = {}));
/** 获取商城物品售价 */
function GetStoreItemCost(itemData, count) {
    if (count === void 0) { count = 1; }
    if (itemData == undefined) {
        return 0;
    }
    var price = itemData.real_price;
    if (itemData.pay_type == 0) {
        var language = $.Language().toLowerCase();
        if (language == "english") {
            price = itemData.overseas_realprice;
        }
        else if (language == "russian") {
            price = itemData.russia_realprice;
        }
    }
    return price * count;
}
/** 获取商品最大数量 */
function GetStoreMaxCount(itemData) {
    if (itemData == undefined) {
        return 999;
    }
    return itemData.limit_type > 0 ? itemData.limit_count : 999;
}
var splitStorePrivilegeNames = function (value) {
    return (value !== null && value !== void 0 ? value : "").split("|").filter(function (name) { return name != ""; });
};
var GetBuffIdFromItemId = function (itemId) {
    return String(itemId).slice(-3);
};
function GetPrivilegeNamesByBlessID(blessID) {
    var blessing = KeyValues.info_item_blessing[GetBuffIdFromItemId(blessID)];
    return splitStorePrivilegeNames(blessing === null || blessing === void 0 ? void 0 : blessing.blessing_effect);
}
function GetPrivilegeNamesByCondition(condition) {
    if (condition == undefined || condition == "") {
        return [];
    }
    if (condition.startsWith("privilege_")) {
        return [condition];
    }
    return GetPrivilegeNamesByBlessID(condition);
}
function GetPrivilegeIconIDByCondition(condition) {
    if (condition == undefined || condition == "") {
        return undefined;
    }
    if (!condition.startsWith("privilege_")) {
        return GetBuffIdFromItemId(condition);
    }
    for (var blessID in KeyValues.info_item_blessing) {
        if (GetPrivilegeNamesByBlessID(blessID).includes(condition)) {
            return GetBuffIdFromItemId(blessID);
        }
    }
    return undefined;
}
function GetStoreProductPrivilegeNames(itemData) {
    var _a;
    var conditionPrivileges = GetPrivilegeNamesByCondition(itemData.effect_condition);
    if (conditionPrivileges.length > 0) {
        return conditionPrivileges;
    }
    var result = [];
    for (var _i = 0, _b = Object.keys((_a = itemData.items) !== null && _a !== void 0 ? _a : {}); _i < _b.length; _i++) {
        var itemID = _b[_i];
        if (GetPropType(itemID) == PropType.Bless) {
            result.push.apply(result, GetPrivilegeNamesByBlessID(itemID));
        }
    }
    if (itemData.img != undefined && KeyValues.info_item_blessing[itemData.img] != undefined) {
        result.push.apply(result, GetPrivilegeNamesByBlessID(itemData.img));
    }
    return result;
}
function GetStoreProductPrivilegeIconID(itemData) {
    var _a;
    var conditionIconID = GetPrivilegeIconIDByCondition(itemData.effect_condition);
    if (conditionIconID != undefined) {
        return conditionIconID;
    }
    var blessItemID = Object.keys((_a = itemData.items) !== null && _a !== void 0 ? _a : {}).find(function (itemID) { return GetPropType(itemID) == PropType.Bless; });
    if (blessItemID != undefined) {
        return GetBuffIdFromItemId(blessItemID);
    }
    return itemData.img != undefined && KeyValues.info_item_blessing[itemData.img] != undefined ? itemData.img : undefined;
}
function GetStorePrivilegeProductID(condition) {
    var iconID = GetPrivilegeIconIDByCondition(condition);
    if (iconID == undefined) {
        return undefined;
    }
    for (var itemName in KeyValues.info_shop_product) {
        var itemData = KeyValues.info_shop_product[itemName];
        if (!itemData.tag.split("|").includes("Privilege")) {
            continue;
        }
        var itemIconID = GetStoreProductPrivilegeIconID(itemData);
        if (itemIconID == iconID) {
            return itemData.id;
        }
    }
    return undefined;
}
function HasStorePrivilege(condition, playerPrivileges) {
    var privileges = GetPrivilegeNamesByCondition(condition);
    if (privileges.length == 0) {
        return true;
    }
    return privileges.some(function (privilegeName) { return playerPrivileges[privilegeName] == true; });
}
function HasStoreProductPrivileges(itemData, playerPrivileges) {
    var privileges = GetStoreProductPrivilegeNames(itemData);
    return privileges.length > 0 && privileges.every(function (privilegeName) { return playerPrivileges[privilegeName] == true; });
}
/** 获取道具类型 */
function GetPropType(propID) {
    var propType = String(propID);
    if (propType.startsWith("rod_level")) {
        return 11;
    }
    else if (propType.length == 3 && KeyValues.info_item_blessing[propID]) {
        return PropType.Bless;
    }
    if (propType.length == 6) {
        propType = propType[0];
    }
    else {
        propType = propType.substring(0, 2);
    }
    return Number(propType);
}
/** 通过英雄碎片道具ID获取英雄信息 */
function GetHeroInfoByGoodID(goodID) {
    var goodIDString = String(goodID);
    for (var _i = 0, _a = Object.entries(KeyValues.heroes); _i < _a.length; _i++) {
        var _b = _a[_i], heroName = _b[0], heroData = _b[1];
        if (heroName == "Version" || (heroData === null || heroData === void 0 ? void 0 : heroData.HeroID) == undefined) {
            continue;
        }
        var serviceHeroData = KeyValues.hero[String(heroData.HeroID)];
        if (serviceHeroData != undefined && String(serviceHeroData.hero_fragment) == goodIDString) {
            return {
                heroID: serviceHeroData.hero_id,
                heroName: heroName,
            };
        }
    }
}
/** 通过英雄碎片道具ID获取英雄名字 */
function GetHeroNameByGoodID(goodID) {
    var _a;
    return (_a = GetHeroInfoByGoodID(goodID)) === null || _a === void 0 ? void 0 : _a.heroName;
}
/** 商品是否被限购 */
function IsProductLimit(itemid) {
    itemid = itemid.toString();
    var itemKV = GameUI.CustomUIConfig().info_shop_product[itemid];
    if (itemKV == undefined)
        return true;
    if (itemKV.limit_type == 0)
        return false;
    var cache = CustomNetTables.GetTableValue("service", "player_shop_product_limits" + Players.GetLocalPlayer());
    if (cache == undefined)
        return true;
    var data = JSON.parse(cache.data);
    if (data[itemid] == undefined)
        return false;
    return data[itemid] >= itemKV.limit_count;
}
/** 获取道具数量，支持货币，道具，英雄整卡 */
function GetServiceItemCount(id) {
    var _a, _b, _c, _d;
    id = id.toString();
    var type = GetPropType(id);
    if (type == PropType.Token) {
        var player_tokens = (_a = getServiceNetData("player_tokens", Players.GetLocalPlayer())) !== null && _a !== void 0 ? _a : {};
        return (_c = (_b = player_tokens[id.toString()]) === null || _b === void 0 ? void 0 : _b.amounts) !== null && _c !== void 0 ? _c : 0;
    }
    else if (type == PropType.Hero) {
        //const player_heros = getServiceNetData("player_heros", Players.GetLocalPlayer()) ?? {};
        //return player_heros?.[id]?.extra_star_exp ?? 0;
    }
    else if (type == PropType.Collection) {
        var props = (_d = getServiceNetData("player_props", Players.GetLocalPlayer())) !== null && _d !== void 0 ? _d : {};
        var sum = 0;
        for (var _i = 0, _e = Object.values(props); _i < _e.length; _i++) {
            var _f = _e[_i], prop_id = _f.prop_id, amounts = _f.amounts;
            if (prop_id == Number(id)) {
                sum += amounts;
            }
        }
        return sum;
    }
    return 0;
}
/** 获取局外物品的稀有度，默认为1 */
function GetServiceItemRarity(itemid) {
    if (itemid == undefined)
        return 1;
    itemid = itemid.toString();
    var itemKV = GameUI.CustomUIConfig().info_item_rarity[itemid];
    if (itemKV == undefined)
        return 1;
    return itemKV.rarity;
}

// ========== properties.ts ==========
"use strict";
/**
 * ⚠️ 此文件由 generate-property-system.js 自动生成，请勿手动修改！
 * 源文件: content/c1/scripts/vscripts/framework/property_system/properties.kv
 */
var PROPERTY_LIST = [
    "health",
    "base_health",
    "health_amplify",
    "heal_room_start",
    "health_cost_room_start",
    "base_mana",
    "mana",
    "mana_amplify",
    "base_attack",
    "attack",
    "attack_amplify",
    "attackspeed",
    "attackspeed_reduction",
    "wisp_attackspeed",
    "wisp_damage",
    "cooldown_reduction",
    "boss_gap_amplify",
    "attack_range",
    "attack_range_melee",
    "attack_range_ranger",
    "bullet_range",
    "aoe_amplify",
    "crit_chance",
    "attack_crit_chance",
    "spell_crit_chance",
    "expose_attack_crit_chance",
    "crit_damage",
    "crit_damage_mult",
    "barrier_crit_damage",
    "bleed_crit_damage",
    "attack_crit_damage",
    "attack_crit_damage_boost",
    "spell_crit_damage",
    "spell_crit_damage_boost",
    "attack_damage_proc",
    "spell_damage_proc",
    "spell_damage_proc_target",
    "damage_proc_target",
    "damage_amplify",
    "final_damage",
    "final_defense",
    "pvp_hero_defense_boost",
    "pvp_final_defense",
    "final_damage_101",
    "final_damage_102",
    "final_damage_103",
    "physical_damage_amplify",
    "magical_damage_amplify",
    "attack_damage_amplify",
    "spell_damage_amplify",
    "backstab_damage_amplify",
    "backstab_damage_boost",
    "backstab_damage_boost_2",
    "barrier_damage_amplify",
    "barrier_damage_boost",
    "barrier_damage_boost_2",
    "retaliated_damage_amplify",
    "ring_damage_amplify",
    "ring_damage_boost",
    "ring_damage_boost_2",
    "blade_damage_amplify",
    "blade_speed_amplify",
    "damage_reduction",
    "poison_pool_shield_attenuation_interval_amplify",
    "incoming_damage_amplify",
    "trap_incoming_damage_amplify",
    "trap_damage_amplify",
    "poison_attenuation_interval_amplify",
    "poison_pool_incoming_damage_amplify",
    "tavern_effect_amplify",
    "evasion",
    "avoid_damage",
    "min_health",
    "heal_amplify",
    "fury_amplify",
    "fury_regen",
    "crit_fury_amplify",
    "skill_fury_amplify",
    "ring_fury_amplify",
    "movespeed",
    "movespeed_not_calculated",
    "movespeed_amplify",
    "movespeed_reduce_mul",
    "shop_discount",
    "shop_refresh_refund",
    "split_count",
    "ability_charge_attack",
    "ability_charge_skill",
    "ability_charge_dodge",
    "ability_charge_defense",
    "ability_charge_ultimate",
    "ring_count",
    "ring_speed_amplify",
    "ring_track_radius",
    "lightning_multiple_chance",
    "lightning_radius",
    "lightning_damage",
    "lightning_expose_chance",
    "expose_keep_chance",
    "lightning_count",
    "poison_no_attenuation_chance",
    "poison_attenuation_reduction",
    "frozen_no_attenuation_chance",
    "frozen_attenuation_reduction",
    "frozen_damage_amplify",
    "shield_attenuation_reduction",
    "shield_attenuation_interval_amplify",
    "shield_no_attenuation_chance",
    "frozen_burst_stack",
    "bounce_count",
    "laser_bounce_count",
    "laser_damage_amplify",
    "snowball_bounce_count",
    "snowball_extra_shot",
    "snowball_damage",
    "ice_strike",
    "reflect_damage",
    "per_encounter_attack_bonus",
    "per_encounter_attack_amplify",
    "per_encounter_attack_damage_amplify",
    "per_encounter_skill_damage_amplify",
    "per_encounter_ultimate_damage_amplify",
    "per_encounter_physical_damage_amplify",
    "per_encounter_magical_damage_amplify",
    "per_encounter_melee_hero_damage_amplify",
    "per_encounter_ranger_hero_damage_amplify",
    "per_encounter_crit_damage",
    "block",
    "poison_stacks_amplify",
    "shock_damage_amplify",
    "bleed_stacks_amplify",
    "freeze_stacks_amplify",
    "shield_amplify",
    "shield_reduction_mul",
    "crit_damage_amplify",
    "melee_hero_damage_amplify",
    "ranger_hero_damage_amplify",
    "health_potion_heal_amplify",
    "crit_chance_amplify",
    "splash_damage_amplify",
    "splash_damage_boost",
    "splash_damage_boost_2",
    "debuff_target_damage_amplify",
    "minion_damage_boost",
    "boss_damage_boost",
    "boss_damage_boost_2",
    "elite_damage_boost",
    "elite_damage_boost_2",
    "all_stats_amplify",
    "ultimate_mana_cost_reduce",
    "buff_duration",
    "debuff_duration",
    "ability_charge_defense_time",
    "potion_heal_restore",
    "break_drop_chance",
    "break_drop_profit_pct",
    "revive_count",
    "revive_health_recover",
    "initial_gold",
    "exp_gain_chance",
    "gold_room_amount",
    "shop_item_rarity",
    "artifact_item_rarity",
    "blessing_rarity",
    "zeus_bless_rarity_up",
    "poison_bless_rarity_up",
    "ice_bless_rarity_up",
    "bleed_bless_rarity_up",
    "crit_bless_rarity_up",
    "holy_bless_rarity_up",
    "wind_bless_rarity_up",
    "bless_refresh_count",
    "artifact_allin_count",
    "bless_allin_count",
    "bless_upgrade_allin_count",
    "ability_upgrade_allin_count",
    "ability_upgrade_refresh_count",
    "equip_extra_potential",
    "equip_extra_drop_base",
    "equip_drop_pct",
    "equip_drop_num_pct",
    "equip_rarity_chance",
    "equip_potential_lucky",
    "equip_recast_lucky",
    "melee_damage_boost",
    "melee_damage_boost_2",
    "ranged_damage_boost",
    "ranged_damage_boost_2",
    "execute_damage",
    "fury_reduction_mul",
    "rage_capacity_amplify",
    "heavy_attack",
    "hp_regeneration",
    "thorns_damage",
    "damage_vs_bleeding_targets",
    "damage_vs_frozen_targets",
    "damage_vs_shocked_targets",
    "damage_vs_poisoned_targets",
    "finisher_damage",
    "finisher_crit_chance",
    "skill_cooldown_reduction",
    "evade_cooldown_reduction",
    "block_cooldown_reduction",
    "ultimate_cooldown_reduction",
    "gold_gain_amount",
    "exp_gain_amount",
    "gold_reward_per_encounter",
    "exp_reward_per_encounter",
    "poison_decay_reduction",
    "bleed_trigger_interval",
    "freeze_duration",
    "shock_no_decay_rate",
    "rage_gain_percent_per_attack",
    "rage_gain_percent_per_block",
    "rage_gain_percent_per_evade",
    "rage_gain_percent_per_ultimate",
    "poison_damage_amplify",
    "poison_damage_boost",
    "poison_damage_boost_2",
    "lightning_damage_amplify",
    "lightning_damage_boost",
    "lightning_damage_boost_2",
    "holy_shield_damage_boost",
    "holy_shield_damage_boost_2",
    "bleed_damage_amplify",
    "bleed_damage_boost",
    "bleed_damage_boost_2",
    "blade_damage_boost",
    "blade_damage_boost_2",
    "freeze_damage_amplify",
    "freeze_damage_boost",
    "freeze_damage_boost_2",
    "shield_damage_amplify",
    "execute_damage_amplify",
    "conditional_damage_amplify",
    "attack_damage_boost",
    "attack_damage_boost_2",
    "spell_damage_boost",
    "spell_damage_boost_2",
    "skill_damage_amplify",
    "skill_damage_boost",
    "skill_damage_boost_2",
    "ultimate_damage_amplify",
    "ultimate_damage_boost",
    "ultimate_damage_boost_2",
    "dodge_damage_amplify",
    "dodge_damage_boost",
    "dodge_damage_boost_2",
    "defense_damage_amplify",
    "defense_damage_boost",
    "defense_damage_boost_2",
    "melee_hero_damage_boost",
    "ranger_hero_damage_boost",
    "damage_boost",
    "damage_boost_2",
    "magical_damage_boost",
    "magical_damage_boost_2",
    "physical_damage_boost",
    "physical_damage_boost_2",
    "damage_boost_per_level",
    "physical_damage_boost_per_level",
    "magical_damage_boost_per_level",
    "rage_gain_percent_per_skill",
    "bonus_frost_damage",
    "bonus_poison_damage",
    "bonus_lightning_damage",
    "bonus_bleed_damage",
    "hp_regen_per_encounter",
    "mana_regen_per_encounter",
    "elemental_damage",
    "physical_armor",
    "hp_regen_on_kill",
    "attack_speed_boost",
    "damage_intensity",
    "damage_intensity_boost",
    "defense_intensity",
    "defense_intensity_boost",
    "hero_damage_boost",
    "hero_defense_boost",
    "damage_boost_mult",
    "lightning_cloud_damage",
    "lightning_cloud_duration",
    "lightning_cloud_hit_count",
    "idle_power_recover",
    "idle_max_power",
    "idle_max_power_pct",
    "idle_power_cost_inc_pct",
    "idle_power_cost_reduce_pct",
    "idle_fish_total_profit",
    "idle_fish_total_profit_pct",
    "idle_fish_normalbox_chance",
    "idle_fish_goldbox_chance",
    "idle_fish_box_profit_pct",
    "ability_upgrade_count",
    "idle_fish_rainbow_chance",
    "idle_fish_rainbow1_chance",
    "idle_fish_rainbow2_chance",
    "idle_fish_rainbow3_chance",
    "idle_fish_rainbow4_chance",
    "idle_fish_rainbow5_chance",
    "idle_fish_chance",
    "idle_fish_num",
    "idle_fish_num_pct",
    "idle_fish_crit_chance",
    "idle_fish_crit_num",
    "idle_fish_lucky_num",
    "idle_fish_efficiency",
    "idle_fish_interaction_pct",
    "idle_fish_escape_speed_pct",
    "idle_fish_wait_time_reduce_pct",
    "idle_fish_courier_slot",
    "aquarium_slot",
    "holy_shield_damage_boost2",
    "blade_sword_boost2",
    "dash_distance",
    "move_distance_efficiency",
    "explore_profit_110005_pct",
    "resource_profit_stone_pct",
    "resource_profit_forge_pct",
    "resource_profit_talent_pct",
    "resource_profit_210001_pct",
    "lightning_damage_boost2",
    "poison_damage_boost2",
    "freeze_damage_boost2",
    "bleed_damage_boost2",
    "holy_suit_effect_boost",
    "zeus_suit_effect_boost",
    "ice_suit_effect_boost",
    "poison_suit_effect_boost",
    "bleed_suit_effect_boost",
    "crit_suit_effect_boost",
    "wind_suit_effect_boost",
    "revive_max",
    "in_game_bless_refresh_max",
    "in_game_ability_upgrade_max",
    "gem_drop_pct",
    "gem_drop_num_pct",
    "gem_extra_drop_base",
    "total_drop_num_pct",
    "refine_inc_pct",
    "abyssal_free",
    "daily_bounty_free_count",
    "weekly_bounty_free_count",
    "daily_bounty_complete_count",
    "weekly_bounty_complete_count",
    "daily_bounty_num",
    "week_bounty_num",
    "daily_rarity4_num",
    "daily_rarity5_num",
    "week_rarity4_num",
    "week_rarity5_num",
    "drawing_drop_chance",
    "gem_roll_change",
    "explore_extra_chance",
    "explore_extra_profit_pct",
    "rune_rarity_chance",
    "rune_devour_lock",
    "explore_limit",
    "attack_damage_boost_per_level",
    "spell_damage_boost_per_level",
    "skill_damage_boost_per_level",
    "dodge_damage_boost_per_level",
    "defense_damage_boost_per_level",
    "ultimate_damage_boost_per_level",
    "lightning_damage_boost_per_level",
    "freeze_damage_boost_per_level",
    "poison_damage_boost_per_level",
    "bleed_damage_boost_per_level",
    "blade_damage_boost_per_level",
    "holy_shield_damage_boost_per_level",
    "ring_damage_boost_per_level",
    "splash_damage_boost_per_level",
    "melee_damage_boost_per_level",
    "ranged_damage_boost_per_level",
    "elite_damage_boost_per_level",
    "boss_damage_boost_per_level",
    "barrier_damage_boost_per_level",
    "backstab_damage_boost_per_level",
    "idle_fish_myth_fish_chance",
    "engraving_1_transfer",
    "engraving_2_transfer",
    "engraving_3_transfer",
    "engraving_4_transfer",
    "engraving_5_transfer",
    "engraving_1_strengthen",
    "engraving_2_strengthen",
    "engraving_3_strengthen",
    "engraving_4_strengthen",
    "engraving_5_strengthen",
    "physical_damage_multiplier",
    "physical_damage_multiplier_mul",
    "magical_damage_multiplier",
    "magical_damage_multiplier_mul",
    "spell_damage_multiplier",
    "skill_damage_multiplier",
];
var PROPERTY_TAGS = {
    split_count: ["Split"],
    ability_charge_skill: ["Skill"],
    ability_charge_dodge: ["Dodge"],
    ability_charge_defense: ["Defense"],
    ability_charge_ultimate: ["Ultimate"],
    ring_count: ["Ring"],
    ring_speed_amplify: ["Ring"],
    ring_track_radius: ["Ring"],
    per_encounter_skill_damage_amplify: ["Skill"],
    per_encounter_ultimate_damage_amplify: ["Ultimate"],
};
var PROPERTY_UI_CATEGORIES = {
    attack: [
        "base_attack",
        "attack",
        "attack_amplify",
        "attackspeed",
        "attackspeed_reduction",
        "wisp_attackspeed",
        "attack_range",
        "attack_range_melee",
        "attack_range_ranger",
        "bullet_range",
        "aoe_amplify",
        "attack_speed_boost",
        "crit_chance",
        "attack_crit_chance",
        "spell_crit_chance",
        "expose_attack_crit_chance",
        "crit_chance_amplify",
        "finisher_crit_chance",
        "crit_damage",
        "crit_damage_amplify",
        "crit_damage_mult",
        "barrier_crit_damage",
        "bleed_crit_damage",
        "attack_crit_damage",
        "attack_crit_damage_boost",
        "spell_crit_damage",
        "spell_crit_damage_boost",
        "final_damage_101",
        "final_damage_102",
        "final_damage_103",
        "damage_intensity",
        "damage_intensity_boost",
        "damage_boost_mult",
        "physical_damage_multiplier",
        "physical_damage_multiplier_mul",
        "magical_damage_multiplier",
        "magical_damage_multiplier_mul",
        "damage_amplify",
        "damage_boost_per_level",
        "damage_boost",
        "damage_boost_2",
        "physical_damage_amplify",
        "physical_damage_boost_per_level",
        "physical_damage_boost",
        "physical_damage_boost_2",
        "magical_damage_amplify",
        "magical_damage_boost_per_level",
        "magical_damage_boost",
        "magical_damage_boost_2",
        "hero_damage_boost",
        "final_damage",
        "attack_damage_proc",
        "spell_damage_proc",
        "spell_damage_proc_target",
        "spell_damage_multiplier",
        "skill_damage_multiplier",
        "attack_damage_amplify",
        "attack_damage_boost_per_level",
        "attack_damage_boost",
        "attack_damage_boost_2",
        "spell_damage_amplify",
        "spell_damage_boost_per_level",
        "spell_damage_boost",
        "spell_damage_boost_2",
        "finisher_damage",
        "skill_damage_amplify",
        "skill_damage_boost_per_level",
        "skill_damage_boost",
        "skill_damage_boost_2",
        "ultimate_damage_amplify",
        "ultimate_damage_boost_per_level",
        "ultimate_damage_boost",
        "ultimate_damage_boost_2",
        "dodge_damage_amplify",
        "dodge_damage_boost_per_level",
        "dodge_damage_boost",
        "dodge_damage_boost_2",
        "defense_damage_amplify",
        "defense_damage_boost_per_level",
        "defense_damage_boost",
        "defense_damage_boost_2",
        "ring_damage_amplify",
        "ring_damage_boost_per_level",
        "ring_damage_boost",
        "ring_damage_boost_2",
        "ring_count",
        "ring_speed_amplify",
        "ring_track_radius",
        "split_count",
        "splash_damage_amplify",
        "splash_damage_boost_per_level",
        "splash_damage_boost",
        "splash_damage_boost_2",
        "blade_damage_amplify",
        "blade_damage_boost_per_level",
        "blade_damage_boost",
        "blade_damage_boost_2",
        "blade_speed_amplify",
        "blade_sword_boost2",
        "poison_attenuation_interval_amplify",
        "poison_no_attenuation_chance",
        "poison_attenuation_reduction",
        "poison_stacks_amplify",
        "poison_decay_reduction",
        "poison_damage_amplify",
        "poison_damage_boost_per_level",
        "poison_damage_boost",
        "poison_damage_boost_2",
        "poison_damage_boost2",
        "lightning_multiple_chance",
        "lightning_radius",
        "lightning_damage",
        "lightning_expose_chance",
        "expose_keep_chance",
        "lightning_count",
        "shock_damage_amplify",
        "shock_no_decay_rate",
        "lightning_damage_amplify",
        "lightning_damage_boost_per_level",
        "lightning_damage_boost",
        "lightning_damage_boost_2",
        "lightning_cloud_damage",
        "lightning_cloud_duration",
        "lightning_cloud_hit_count",
        "lightning_damage_boost2",
        "shield_damage_amplify",
        "holy_shield_damage_boost_per_level",
        "holy_shield_damage_boost",
        "holy_shield_damage_boost_2",
        "holy_shield_damage_boost2",
        "frozen_no_attenuation_chance",
        "frozen_attenuation_reduction",
        "frozen_damage_amplify",
        "frozen_burst_stack",
        "freeze_stacks_amplify",
        "freeze_duration",
        "freeze_damage_amplify",
        "freeze_damage_boost_per_level",
        "freeze_damage_boost",
        "freeze_damage_boost_2",
        "freeze_damage_boost2",
        "bleed_stacks_amplify",
        "bleed_trigger_interval",
        "bleed_damage_amplify",
        "bleed_damage_boost_per_level",
        "bleed_damage_boost",
        "bleed_damage_boost_2",
        "bleed_damage_boost2",
        "melee_damage_boost_per_level",
        "melee_damage_boost",
        "melee_damage_boost_2",
        "ranged_damage_boost_per_level",
        "ranged_damage_boost",
        "ranged_damage_boost_2",
        "elite_damage_boost_per_level",
        "elite_damage_boost",
        "elite_damage_boost_2",
        "boss_damage_boost_per_level",
        "boss_damage_boost",
        "boss_damage_boost_2",
        "backstab_damage_amplify",
        "backstab_damage_boost_per_level",
        "backstab_damage_boost",
        "backstab_damage_boost_2",
        "barrier_damage_amplify",
        "barrier_damage_boost_per_level",
        "barrier_damage_boost",
        "barrier_damage_boost_2",
        "retaliated_damage_amplify",
        "melee_hero_damage_amplify",
        "melee_hero_damage_boost",
        "ranger_hero_damage_amplify",
        "ranger_hero_damage_boost",
        "debuff_target_damage_amplify",
        "minion_damage_boost",
        "execute_damage",
        "damage_vs_bleeding_targets",
        "damage_vs_frozen_targets",
        "damage_vs_shocked_targets",
        "damage_vs_poisoned_targets",
        "execute_damage_amplify",
        "conditional_damage_amplify",
        "per_encounter_attack_bonus",
        "per_encounter_attack_amplify",
        "per_encounter_attack_damage_amplify",
        "per_encounter_skill_damage_amplify",
        "per_encounter_ultimate_damage_amplify",
        "per_encounter_physical_damage_amplify",
        "per_encounter_magical_damage_amplify",
        "per_encounter_melee_hero_damage_amplify",
        "per_encounter_ranger_hero_damage_amplify",
        "per_encounter_crit_damage",
        "wisp_damage",
        "damage_proc_target",
        "trap_damage_amplify",
        "bounce_count",
        "laser_bounce_count",
        "laser_damage_amplify",
        "snowball_bounce_count",
        "snowball_extra_shot",
        "snowball_damage",
        "ice_strike",
        "reflect_damage",
        "heavy_attack",
        "thorns_damage",
        "bonus_frost_damage",
        "bonus_poison_damage",
        "bonus_lightning_damage",
        "bonus_bleed_damage",
    ],
    defence: [
        "health",
        "base_health",
        "health_amplify",
        "heal_room_start",
        "health_cost_room_start",
        "final_defense",
        "pvp_hero_defense_boost",
        "pvp_final_defense",
        "damage_reduction",
        "poison_pool_shield_attenuation_interval_amplify",
        "incoming_damage_amplify",
        "trap_incoming_damage_amplify",
        "poison_pool_incoming_damage_amplify",
        "evasion",
        "avoid_damage",
        "min_health",
        "heal_amplify",
        "shield_attenuation_reduction",
        "shield_attenuation_interval_amplify",
        "shield_no_attenuation_chance",
        "block",
        "shield_amplify",
        "shield_reduction_mul",
        "health_potion_heal_amplify",
        "potion_heal_restore",
        "revive_count",
        "revive_health_recover",
        "hp_regeneration",
        "hp_regen_per_encounter",
        "elemental_damage",
        "physical_armor",
        "hp_regen_on_kill",
        "defense_intensity",
        "defense_intensity_boost",
        "hero_defense_boost",
        "revive_max",
    ],
    special: [
        "base_mana",
        "mana",
        "mana_amplify",
        "cooldown_reduction",
        "boss_gap_amplify",
        "fury_amplify",
        "fury_regen",
        "crit_fury_amplify",
        "skill_fury_amplify",
        "ring_fury_amplify",
        "movespeed",
        "movespeed_not_calculated",
        "movespeed_amplify",
        "movespeed_reduce_mul",
        "ability_charge_attack",
        "ability_charge_skill",
        "ability_charge_dodge",
        "ability_charge_defense",
        "ability_charge_ultimate",
        "all_stats_amplify",
        "ultimate_mana_cost_reduce",
        "buff_duration",
        "debuff_duration",
        "ability_charge_defense_time",
        "fury_reduction_mul",
        "rage_capacity_amplify",
        "skill_cooldown_reduction",
        "evade_cooldown_reduction",
        "block_cooldown_reduction",
        "ultimate_cooldown_reduction",
        "rage_gain_percent_per_attack",
        "rage_gain_percent_per_block",
        "rage_gain_percent_per_evade",
        "rage_gain_percent_per_ultimate",
        "rage_gain_percent_per_skill",
        "mana_regen_per_encounter",
        "dash_distance",
        "move_distance_efficiency",
        "holy_suit_effect_boost",
        "zeus_suit_effect_boost",
        "ice_suit_effect_boost",
        "poison_suit_effect_boost",
        "bleed_suit_effect_boost",
        "crit_suit_effect_boost",
        "wind_suit_effect_boost",
        "engraving_1_transfer",
        "engraving_2_transfer",
        "engraving_3_transfer",
        "engraving_4_transfer",
        "engraving_5_transfer",
        "engraving_1_strengthen",
        "engraving_2_strengthen",
        "engraving_3_strengthen",
        "engraving_4_strengthen",
        "engraving_5_strengthen",
    ],
    farm: [
        "tavern_effect_amplify",
        "shop_discount",
        "shop_refresh_refund",
        "break_drop_chance",
        "break_drop_profit_pct",
        "initial_gold",
        "exp_gain_chance",
        "gold_room_amount",
        "shop_item_rarity",
        "artifact_item_rarity",
        "blessing_rarity",
        "zeus_bless_rarity_up",
        "poison_bless_rarity_up",
        "ice_bless_rarity_up",
        "bleed_bless_rarity_up",
        "crit_bless_rarity_up",
        "holy_bless_rarity_up",
        "wind_bless_rarity_up",
        "bless_refresh_count",
        "artifact_allin_count",
        "bless_allin_count",
        "bless_upgrade_allin_count",
        "ability_upgrade_allin_count",
        "ability_upgrade_refresh_count",
        "equip_extra_potential",
        "equip_extra_drop_base",
        "equip_drop_pct",
        "equip_drop_num_pct",
        "equip_rarity_chance",
        "equip_potential_lucky",
        "equip_recast_lucky",
        "gold_gain_amount",
        "exp_gain_amount",
        "gold_reward_per_encounter",
        "exp_reward_per_encounter",
        "idle_power_recover",
        "idle_max_power",
        "idle_max_power_pct",
        "idle_power_cost_inc_pct",
        "idle_power_cost_reduce_pct",
        "idle_fish_total_profit",
        "idle_fish_total_profit_pct",
        "idle_fish_normalbox_chance",
        "idle_fish_goldbox_chance",
        "idle_fish_box_profit_pct",
        "ability_upgrade_count",
        "idle_fish_rainbow_chance",
        "idle_fish_rainbow1_chance",
        "idle_fish_rainbow2_chance",
        "idle_fish_rainbow3_chance",
        "idle_fish_rainbow4_chance",
        "idle_fish_rainbow5_chance",
        "idle_fish_chance",
        "idle_fish_num",
        "idle_fish_num_pct",
        "idle_fish_crit_chance",
        "idle_fish_crit_num",
        "idle_fish_lucky_num",
        "idle_fish_efficiency",
        "idle_fish_interaction_pct",
        "idle_fish_escape_speed_pct",
        "idle_fish_wait_time_reduce_pct",
        "idle_fish_courier_slot",
        "aquarium_slot",
        "explore_profit_110005_pct",
        "resource_profit_stone_pct",
        "resource_profit_forge_pct",
        "resource_profit_talent_pct",
        "resource_profit_210001_pct",
        "in_game_bless_refresh_max",
        "in_game_ability_upgrade_max",
        "gem_drop_pct",
        "gem_drop_num_pct",
        "gem_extra_drop_base",
        "total_drop_num_pct",
        "refine_inc_pct",
        "abyssal_free",
        "daily_bounty_free_count",
        "weekly_bounty_free_count",
        "daily_bounty_complete_count",
        "weekly_bounty_complete_count",
        "daily_bounty_num",
        "week_bounty_num",
        "daily_rarity4_num",
        "daily_rarity5_num",
        "week_rarity4_num",
        "week_rarity5_num",
        "drawing_drop_chance",
        "gem_roll_change",
        "explore_extra_chance",
        "explore_extra_profit_pct",
        "rune_rarity_chance",
        "rune_devour_lock",
        "explore_limit",
        "idle_fish_myth_fish_chance",
    ],
};
var PROPERTY_UI_ATTACK_GROUPS = {
    attack: [
        "base_attack",
        "attack",
        "attack_amplify",
        "attackspeed",
        "attackspeed_reduction",
        "wisp_attackspeed",
        "attack_range",
        "attack_range_melee",
        "attack_range_ranger",
        "bullet_range",
        "aoe_amplify",
        "attack_speed_boost",
    ],
    crit: [
        "crit_chance",
        "attack_crit_chance",
        "spell_crit_chance",
        "expose_attack_crit_chance",
        "crit_chance_amplify",
        "finisher_crit_chance",
        "crit_damage",
        "crit_damage_amplify",
        "crit_damage_mult",
        "barrier_crit_damage",
        "bleed_crit_damage",
        "attack_crit_damage",
        "attack_crit_damage_boost",
        "spell_crit_damage",
        "spell_crit_damage_boost",
    ],
    damage: [
        "final_damage_101",
        "final_damage_102",
        "final_damage_103",
        "damage_intensity",
        "damage_intensity_boost",
        "damage_boost_mult",
        "physical_damage_multiplier",
        "physical_damage_multiplier_mul",
        "magical_damage_multiplier",
        "magical_damage_multiplier_mul",
        "damage_amplify",
        "damage_boost_per_level",
        "damage_boost",
        "damage_boost_2",
        "physical_damage_amplify",
        "physical_damage_boost_per_level",
        "physical_damage_boost",
        "physical_damage_boost_2",
        "magical_damage_amplify",
        "magical_damage_boost_per_level",
        "magical_damage_boost",
        "magical_damage_boost_2",
        "hero_damage_boost",
        "final_damage",
    ],
    ability: [
        "attack_damage_proc",
        "spell_damage_proc",
        "spell_damage_proc_target",
        "spell_damage_multiplier",
        "skill_damage_multiplier",
        "attack_damage_amplify",
        "attack_damage_boost_per_level",
        "attack_damage_boost",
        "attack_damage_boost_2",
        "spell_damage_amplify",
        "spell_damage_boost_per_level",
        "spell_damage_boost",
        "spell_damage_boost_2",
        "finisher_damage",
        "skill_damage_amplify",
        "skill_damage_boost_per_level",
        "skill_damage_boost",
        "skill_damage_boost_2",
        "ultimate_damage_amplify",
        "ultimate_damage_boost_per_level",
        "ultimate_damage_boost",
        "ultimate_damage_boost_2",
        "dodge_damage_amplify",
        "dodge_damage_boost_per_level",
        "dodge_damage_boost",
        "dodge_damage_boost_2",
        "defense_damage_amplify",
        "defense_damage_boost_per_level",
        "defense_damage_boost",
        "defense_damage_boost_2",
    ],
    damage_type: [
        "ring_damage_amplify",
        "ring_damage_boost_per_level",
        "ring_damage_boost",
        "ring_damage_boost_2",
        "ring_count",
        "ring_speed_amplify",
        "ring_track_radius",
        "split_count",
        "splash_damage_amplify",
        "splash_damage_boost_per_level",
        "splash_damage_boost",
        "splash_damage_boost_2",
        "blade_damage_amplify",
        "blade_damage_boost_per_level",
        "blade_damage_boost",
        "blade_damage_boost_2",
        "blade_speed_amplify",
        "blade_sword_boost2",
        "poison_attenuation_interval_amplify",
        "poison_no_attenuation_chance",
        "poison_attenuation_reduction",
        "poison_stacks_amplify",
        "poison_decay_reduction",
        "poison_damage_amplify",
        "poison_damage_boost_per_level",
        "poison_damage_boost",
        "poison_damage_boost_2",
        "poison_damage_boost2",
        "lightning_multiple_chance",
        "lightning_radius",
        "lightning_damage",
        "lightning_expose_chance",
        "expose_keep_chance",
        "lightning_count",
        "shock_damage_amplify",
        "shock_no_decay_rate",
        "lightning_damage_amplify",
        "lightning_damage_boost_per_level",
        "lightning_damage_boost",
        "lightning_damage_boost_2",
        "lightning_cloud_damage",
        "lightning_cloud_duration",
        "lightning_cloud_hit_count",
        "lightning_damage_boost2",
        "shield_damage_amplify",
        "holy_shield_damage_boost_per_level",
        "holy_shield_damage_boost",
        "holy_shield_damage_boost_2",
        "holy_shield_damage_boost2",
        "frozen_no_attenuation_chance",
        "frozen_attenuation_reduction",
        "frozen_damage_amplify",
        "frozen_burst_stack",
        "freeze_stacks_amplify",
        "freeze_duration",
        "freeze_damage_amplify",
        "freeze_damage_boost_per_level",
        "freeze_damage_boost",
        "freeze_damage_boost_2",
        "freeze_damage_boost2",
        "bleed_stacks_amplify",
        "bleed_trigger_interval",
        "bleed_damage_amplify",
        "bleed_damage_boost_per_level",
        "bleed_damage_boost",
        "bleed_damage_boost_2",
        "bleed_damage_boost2",
    ],
    target: [
        "melee_damage_boost_per_level",
        "melee_damage_boost",
        "melee_damage_boost_2",
        "ranged_damage_boost_per_level",
        "ranged_damage_boost",
        "ranged_damage_boost_2",
        "elite_damage_boost_per_level",
        "elite_damage_boost",
        "elite_damage_boost_2",
        "boss_damage_boost_per_level",
        "boss_damage_boost",
        "boss_damage_boost_2",
        "backstab_damage_amplify",
        "backstab_damage_boost_per_level",
        "backstab_damage_boost",
        "backstab_damage_boost_2",
        "barrier_damage_amplify",
        "barrier_damage_boost_per_level",
        "barrier_damage_boost",
        "barrier_damage_boost_2",
        "retaliated_damage_amplify",
        "melee_hero_damage_amplify",
        "melee_hero_damage_boost",
        "ranger_hero_damage_amplify",
        "ranger_hero_damage_boost",
        "debuff_target_damage_amplify",
        "minion_damage_boost",
        "execute_damage",
        "damage_vs_bleeding_targets",
        "damage_vs_frozen_targets",
        "damage_vs_shocked_targets",
        "damage_vs_poisoned_targets",
        "execute_damage_amplify",
        "conditional_damage_amplify",
    ],
    encounter: [
        "per_encounter_attack_bonus",
        "per_encounter_attack_amplify",
        "per_encounter_attack_damage_amplify",
        "per_encounter_skill_damage_amplify",
        "per_encounter_ultimate_damage_amplify",
        "per_encounter_physical_damage_amplify",
        "per_encounter_magical_damage_amplify",
        "per_encounter_melee_hero_damage_amplify",
        "per_encounter_ranger_hero_damage_amplify",
        "per_encounter_crit_damage",
    ],
    other: [
        "wisp_damage",
        "damage_proc_target",
        "trap_damage_amplify",
        "bounce_count",
        "laser_bounce_count",
        "laser_damage_amplify",
        "snowball_bounce_count",
        "snowball_extra_shot",
        "snowball_damage",
        "ice_strike",
        "reflect_damage",
        "heavy_attack",
        "thorns_damage",
        "bonus_frost_damage",
        "bonus_poison_damage",
        "bonus_lightning_damage",
        "bonus_bleed_damage",
    ],
};