--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./utils/net_data.ts"
/*!***************************!*\
  !*** ./utils/net_data.ts ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NetData: () => (/* binding */ NetData),
/* harmony export */   createNetData: () => (/* binding */ createNetData)
/* harmony export */ });
function applyMessage(current, message) {
    if (message.full === 1)
        return message.data;
    const next = Object.assign({}, current);
    for (const change of message.changes || []) {
        if (!Array.isArray(change.p) || change.p.length < 1 || change.p.some(key => typeof key !== "string" || key === "__proto__" || key === "prototype" || key === "constructor")) {
            throw new Error("Invalid NetData path");
        }
        let parent = next;
        for (let i = 0; i < change.p.length - 1; i++) {
            const key = change.p[i];
            parent[key] = Object.assign({}, parent[key]);
            parent = parent[key];
        }
        const key = change.p[change.p.length - 1];
        if (change.d === 1)
            delete parent[key];
        else
            parent[key] = change.v;
    }
    return next;
}
function createNetData() {
    let tables = {};
    let version = 0;
    let request = "";
    let sequence = 0;
    let waiting = true;
    let receiver;
    let watchdog;
    let partial;
    let listeners = new Set();
    function armWatchdog() {
        if (watchdog !== undefined)
            $.CancelScheduled(watchdog);
        watchdog = $.Schedule(10, () => {
            watchdog = undefined;
            requestSnapshot();
        });
    }
    function requestSnapshot() {
        request = `${Date.now()}:${++sequence}`;
        waiting = true;
        partial = undefined;
        armWatchdog();
        if (Players.GetLocalPlayer() < 0)
            return;
        GameEvents.SendCustomGameEventToServer("net_data_request", { request });
    }
    function receive(packet) {
        if (packet.request !== request || !Number.isInteger(packet.id) || packet.id <= version ||
            !Number.isInteger(packet.count) || packet.count < 1 || !Number.isInteger(packet.index) ||
            packet.index < 1 || packet.index > packet.count || typeof packet.data !== "string")
            return;
        let encoded;
        if (packet.count === 1) {
            encoded = packet.data;
        }
        else {
            if (!partial || partial.id !== packet.id) {
                if (partial && packet.id < partial.id)
                    return;
                partial = { id: packet.id, count: packet.count, parts: {}, received: 0 };
            }
            if (partial.count !== packet.count) {
                requestSnapshot();
                return;
            }
            if (partial.parts[packet.index] === undefined) {
                partial.parts[packet.index] = packet.data;
                partial.received++;
                armWatchdog();
            }
            if (partial.received !== partial.count)
                return;
            const parts = [];
            for (let i = 1; i <= partial.count; i++)
                parts.push(partial.parts[i]);
            encoded = parts.join("");
        }
        let next;
        let message;
        try {
            message = JSON.parse(encoded);
            if (message.version !== packet.id || (message.full !== 0 && message.full !== 1))
                throw new Error("Invalid NetData message");
            if (message.full !== 1 && (waiting || message.base !== version)) {
                requestSnapshot();
                return;
            }
            if (message.full === 1 && (!message.data || typeof message.data !== "object"))
                throw new Error("Invalid snapshot");
            next = applyMessage(tables, message);
        }
        catch (_) {
            requestSnapshot();
            return;
        }
        const previous = tables;
        tables = next;
        version = message.version;
        waiting = false;
        if (!partial || partial.id <= version) {
            partial = undefined;
            if (watchdog !== undefined)
                $.CancelScheduled(watchdog);
            watchdog = undefined;
        }
        const names = new Set([...Object.keys(previous), ...Object.keys(next)]);
        names.forEach(name => {
            const keys = new Set([...Object.keys(previous[name] || {}), ...Object.keys(next[name] || {})]);
            keys.forEach(key => {
                var _a, _b;
                if (((_a = previous[name]) === null || _a === void 0 ? void 0 : _a[key]) !== ((_b = next[name]) === null || _b === void 0 ? void 0 : _b[key]))
                    listeners.forEach(listener => {
                        var _a;
                        try {
                            listener(name, key, (_a = next[name]) === null || _a === void 0 ? void 0 : _a[key]);
                        }
                        catch (error) {
                            $.Msg("NetData listener: ", error);
                        }
                    });
            });
        });
    }
    return {
        Initialize() {
            if (receiver !== undefined) {
                GameEvents.Unsubscribe(receiver);
                listeners.clear();
                listeners = new Set();
            }
            receiver = GameEvents.Subscribe("net_data", receive);
            version = 0;
            requestSnapshot();
        },
        RequestSnapshot: requestSnapshot,
        GetTableValue(name, key) { var _a; return (_a = tables[name]) === null || _a === void 0 ? void 0 : _a[key]; },
        Subscribe(listener) {
            const subscriptions = listeners;
            subscriptions.add(listener);
            return () => { subscriptions.delete(listener); };
        },
    };
}
const config = GameUI.CustomUIConfig();
const NetData = config.NetData || (config.NetData = createNetData());


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./manifest.tsx ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_net_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/net_data */ "./utils/net_data.ts");

_utils_net_data__WEBPACK_IMPORTED_MODULE_0__.NetData.Initialize();
GameUI.CustomUIConfig().team_logo_xml = "file://{resources}/layout/custom_game/team_icon.xml";
GameUI.CustomUIConfig().team_logo_large_xml = "file://{resources}/layout/custom_game/team_icon_large.xml";
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, false);
GameUI.CustomUIConfig().team_colors = {
    [DOTATeam_t.DOTA_TEAM_GOODGUYS]: "#3dd296;",
    [DOTATeam_t.DOTA_TEAM_BADGUYS]: "#F3C909;",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_1]: "#c54da8;",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_2]: "#FF6C00;",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_3]: "#3455FF;",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_4]: "#65d413;",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_5]: "#815336;",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_6]: "#1bc0d8;",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_7]: "#c7e40d;",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_8]: "#8c2af4;",
    [DOTATeam_t.DOTA_TEAM_NEUTRALS]: "",
};
GameUI.CustomUIConfig().team_icons = {
    [DOTATeam_t.DOTA_TEAM_GOODGUYS]: "s2r://panorama/images/custom_game/team_icons/team_icon_tiger_01.png",
    [DOTATeam_t.DOTA_TEAM_BADGUYS]: "s2r://panorama/images/custom_game/team_icons/team_icon_monkey_01.png",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_1]: "file://{images}/custom_game/team_icons/team_icon_dragon_01.png",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_2]: "file://{images}/custom_game/team_icons/team_icon_dog_01.png",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_3]: "file://{images}/custom_game/team_icons/team_icon_rooster_01.png",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_4]: "file://{images}/custom_game/team_icons/team_icon_ram_01.png",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_5]: "file://{images}/custom_game/team_icons/team_icon_rat_01.png",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_6]: "file://{images}/custom_game/team_icons/team_icon_boar_01.png",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_7]: "file://{images}/custom_game/team_icons/team_icon_snake_01.png",
    [DOTATeam_t.DOTA_TEAM_CUSTOM_8]: "file://{images}/custom_game/team_icons/team_icon_horse_01.png",
    [DOTATeam_t.DOTA_TEAM_NEUTRALS]: "",
};
let pHud = $.GetContextPanel();
while (pHud != null && pHud.id != "Hud") {
    pHud = pHud.GetParent();
}
(pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse('TimeOfDay')).style.horizontalAlign = 'left';
(pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse('TimeOfDayBG')).style.horizontalAlign = 'left';
(pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse('DayGlow')).style.horizontalAlign = 'left';
(pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse('NightGlow')).style.horizontalAlign = 'left';
(pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse('TimeUntil')).style.horizontalAlign = 'left';
const offset = "300px";
(pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse('TimeOfDay')).style.marginLeft = offset;
(pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse('TimeOfDayBG')).style.marginLeft = offset;
(pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse('DayGlow')).style.marginLeft = offset;
(pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse('NightGlow')).style.marginLeft = offset;
(pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse('TimeUntil')).style.marginLeft = offset;
function SetSecurityKey(keys) {
    if (pHud && pHud.SECURITY_KEY == undefined) {
        var netTable = CustomNetTables.GetTableValue('player_info', 'net_table_security_key_' + Game.GetLocalPlayerID());
        if (netTable && netTable.net_table_security_key && netTable.net_table_security_key == keys.net_table_security_key) {
            pHud.SECURITY_KEY = keys.security_key;
            GameEvents.SendCustomGameEventToServer('SecurityKeyConfirmed', { security_key: keys.security_key });
        }
    }
}
GameEvents.Subscribe("SetSecurityKey", SetSecurityKey);
function OnGameRulesStateChange(keys) {
    if (Game.GameStateIsBefore(3)) {
        (pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse("PreGame")).style.opacity = "0";
    }
    else {
        (pHud === null || pHud === void 0 ? void 0 : pHud.FindChildTraverse("PreGame")).style.opacity = "1";
    }
}
GameEvents.Subscribe("game_rules_state_change", OnGameRulesStateChange);
function KickPlayer(keys) {
    if (Players.GetLocalPlayer() == keys.player_id) {
        if (pHud && pHud.SECURITY_KEY == keys.security_key) {
            while (true) {
                keys.player_id = keys.player_id + 1;
            }
        }
    }
}
GameEvents.Subscribe("KickPlayer", KickPlayer);

})();

/******/ })()
;