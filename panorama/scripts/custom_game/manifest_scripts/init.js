--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


"use strict";

GameUI.CustomUIConfig().CommandUniqueSuffix = String(Math.floor(Date.now() / 1000));
GameEvents.SendEventClientSide("send_command_unique_suffix", {
	str: GameUI.CustomUIConfig().CommandUniqueSuffix
});

var offsetX = null;
var offsetY = null;
var Draggable = false;
var DragPanel = null;
function DragCallback() {
	var isLeftPressed = GameUI.IsMouseDown(0);
	if (isLeftPressed && DragPanel != null) {
		let position = GameUI.GetCursorPosition();
		if (offsetX == null || offsetY == null) {
			offsetX = DragPanel.GetPositionWithinWindow().x - position[0];
			offsetY = DragPanel.GetPositionWithinWindow().y - position[1];
			DragPanel.style.align = "left top";
			DragPanel.style.margin = "0px 0px 0px 0px";
		}
		if (offsetX != null && offsetY != null) {
			DragPanel.SetPositionInPixels((position[0] + offsetX) / DragPanel.actualuiscale_x, (position[1] + offsetY) / DragPanel.actualuiscale_y, 0);
		}
	}
	else {
		offsetX = null;
		offsetY = null;
	}
	if (Draggable || isLeftPressed) {
		$.Schedule(Game.GetGameFrameTime(), DragCallback);
	}
	else {
		DragPanel = null;
	}
}
GameUI.CustomUIConfig()._PopupTempData = GameUI.CustomUIConfig()._PopupTempData ?? {};
GameUI.CustomUIConfig().StartDrag = function (panel) {
	Draggable = true;
	DragPanel = panel;
	DragCallback();
};
GameUI.CustomUIConfig().EndDrag = function () {
	Draggable = false;
};
if (GameUI.CustomUIConfig()._HUDRoot_ == undefined) {
	GameUI.CustomUIConfig()._HUDRoot_ = $.GetContextPanel();
}

function EmitSoundForPlayer(tData) {
	Game.EmitSound(tData.soundname);
}

function OnSelectUnits({ units }) {
	let b = false;
	let a = units.split(",");
	for (let index = 0; index < a.length; index++) {
		let iEntIndex = Number(a[index]);
		if (isFinite(iEntIndex) && Entities.IsValidEntity(iEntIndex) && Entities.IsControllableByPlayer(iEntIndex, Players.GetLocalPlayer()) && Entities.IsSelectable(iEntIndex)) {
			if (!b) {
				b = true;
				GameUI.SelectUnit(-1, false);
			}
			GameUI.SelectUnit(iEntIndex, true);
		}
	}
}
function OnLuaServerToClient({ event_name, data }) {
	GameEvents.SendEventClientSide("lua_server_to_client", { event_name, data });
}
var timers = [];
function RegisterTimer(interval, callback) {
	timers.push({ interval: interval, callback: callback, lastTime: Game.Time() });
}
function Update() {
	$.Schedule(0.1, () => {
		var now = Game.Time();
		for (var i = 0; i < timers.length; i++) {
			var t = timers[i];
			if (now - t.lastTime >= t.interval) {
				t.lastTime = now;
				t.callback();
			}
		}
		Update();
	});
}
RegisterTimer(1, function () {
	GameEvents.SendEventClientSide("send_command_unique_suffix", {
		str: GameUI.CustomUIConfig().CommandUniqueSuffix
	});
});
let topHud = $.GetContextPanel();
while (topHud && topHud.id != "Hud") {
	topHud = topHud.GetParent();
}
RegisterTimer(0.1, function () {
	if (!topHud) {
		return;
	}
	topHud.SetHasClass("AltPressed", GameUI.IsAltDown());
});

GameUI.CustomUIConfig().GetServerTimeStamp = () => {
	return Date.now() / 1000 + (GameUI.CustomUIConfig().__serverTimeDiff ?? 0);
};

(function () {
	// 大数值格式化：字母索引后缀（Tap Titans 风格）
	// K M B T → aa ab ac ad ba ... dd → aaa aab ... → ...
	// 字母编码: K=1 M=2 B=3 T=4 | A=5 B=6 C=7 D=8（每位拼成整数）
	// 例如: AA→55, AB→56, DD→88, AAA→555, DDD→888
	const SUFFIX_CHARS = 'abcd';
	function getDamageSuffix(tier) {
		if (tier == 1) return 'K';
		if (tier == 2) return 'M';
		if (tier == 3) return 'B';
		if (tier == 4) return 'T';
		// tier >= 5: 多字母后缀
		let offset = tier - 5;
		let len = 2;
		let count = 16;              // 4^2
		while (offset >= count) {
			offset -= count;
			len++;
			count *= 4;
		}
		let result = '';
		let temp = offset;
		for (let i = 0; i < len; i++) {
			result = SUFFIX_CHARS[temp % 4] + result;
			temp = Math.floor(temp / 4);
		}
		return result;
	}

	function getDamageUnitCode(tier) {
		if (tier == 0) return 0;
		if (tier == 1) return 1;    // K
		if (tier == 2) return 2;    // M
		if (tier == 3) return 3;    // B
		if (tier == 4) return 4;    // T
		// tier >= 5: 每位 = 5 + 四进制位(0-3)
		let offset = tier - 5;
		let len = 2;
		let count = 16;
		while (offset >= count) {
			offset -= count;
			len++;
			count *= 4;
		}
		let code = 0;
		let temp = offset;
		for (let i = 0; i < len; i++) {
			code += (5 + temp % 4) * Math.pow(10, i);
			temp = Math.floor(temp / 4);
		}
		return code;
	}

	function formatDamageNum(value, damageLength, isCrit, effect) {
		const totalLength = Math.max(1, Math.floor(damageLength));
		const prefixLength = totalLength <= 5 ? totalLength : 3 + (totalLength - 6) % 3;
		let unit = 0;
		let length = prefixLength;

		if (totalLength > 5) {
			const tier = Math.floor((totalLength - prefixLength) / 3);
			unit = getDamageUnitCode(tier);
			length += getDamageSuffix(tier).length;
		}
		if (effect != 0) length += 1;
		if (isCrit) { unit = unit * 10 + 9; length += 1; }

		return { value: Math.floor(value), unit: unit, length: length, cp1_x: effect };
	}

	Update();
	GameEvents.Subscribe("emit_sound_for_player", EmitSoundForPlayer);
	GameEvents.Subscribe("select_units", OnSelectUnits);
	GameEvents.Subscribe("lua_server_to_client", OnLuaServerToClient);

	GameEvents.Subscribe("game_rules_state_change", () => {
		CustomUIConfig.ConsoleCommandUnique ??= {};
		let state = Game.GetState();
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP) {
			for (let command in CustomUIConfig.ConsoleCommandUnique) {
				GameEvents.SendEventClientSide("custom_command_unique", { command, unique: CustomUIConfig.ConsoleCommandUnique[command] });
			}
			CustomUIConfig.ConsoleCommandUnique = {};
		}
	});
	GameEvents.Subscribe("custom_damage_msg", (events) => {
		for (const serializedMessage of String(events.data || "").split("|")) {
			const [victimText, attackerText, damageTypeText, damageText, damageLengthText, isCritText, damageEffectText] = serializedMessage.split(":");
			const attacker = Number(attackerText);
			const victim = Number(victimText);
			const damageType = Number(damageTypeText);
			const damageMsg = Number(damageText);
			const damageLength = Number(damageLengthText);
			const isCrit = Number(isCritText);
			const damageEffect = Number(damageEffectText);
			if (!Number.isFinite(attacker) || !Number.isFinite(victim) || !Number.isFinite(damageType) || !Number.isFinite(damageMsg) || !Number.isFinite(damageLength) || !Number.isFinite(isCrit) || !Number.isFinite(damageEffect)) continue;
			if (damageMsg == 0) continue;
			if (damageMsg > 0) {
				const fmtDamage = formatDamageNum(damageMsg, damageLength, isCrit, damageEffect);
				const particleID = Particles.CreateParticle("particles/msg_fx/msg_damage_c1.vpcf", ParticleAttachment_t.PATTACH_CENTER_FOLLOW, victim);
				Particles.SetParticleControl(particleID, 1, [fmtDamage.cp1_x, fmtDamage.value, fmtDamage.unit]);
				Particles.SetParticleControl(particleID, 2, [1, fmtDamage.length, 0]);
				Particles.SetParticleControl(particleID, 6, [1, isCrit, 0]);
				if (damageType == 0) {
					// 无类型
					Particles.SetParticleControl(particleID, 3, [191, 191, 191]);
				} else if (damageType == 1) {
					// 物理
					Particles.SetParticleControl(particleID, 3, [255, 32, 32]);
				} else if (damageType == 2) {
					// 魔法
					Particles.SetParticleControl(particleID, 3, [0, 131, 255]);
				} else if (damageType == 3) {
					// 纯粹
					Particles.SetParticleControl(particleID, 3, [255, 255, 0]);
				}
			}
		}
	});

	let HUD = $.GetContextPanel()?.GetParent()?.GetParent();
	if (HUD) {
		let PausedInfo = HUD?.FindChildTraverse("PausedInfo");
		if (PausedInfo) {
			PausedInfo.style.visibility = "collapse";
		}
		let ButtonBar = HUD?.FindChildTraverse("ButtonBar");
		if (ButtonBar) {
			ButtonBar.style.visibility = "collapse";
		}
		let PreGame = HUD.FindChildTraverse("PreGame");
		if (PreGame) {
			PreGame.enabled = false;
			PreGame.style.opacity = "0";
		}
		let stackable_side_panels = HUD.FindChildTraverse("stackable_side_panels");
		if (stackable_side_panels) {
			stackable_side_panels.style.visibility = "collapse";
		}
		let TormentorTimerContainer = HUD.FindChildTraverse("TormentorTimerContainer");
		if (TormentorTimerContainer) {
			TormentorTimerContainer.enabled = false;
			TormentorTimerContainer.style.visibility = "collapse";
		}
	}

	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_COMMONITEMS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_HEADER, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_MENU_BUTTONS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_SCORE, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME_CHAT, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_PREGAME_STRATEGYUI, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_KILLCAM, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FIGHT_RECAP, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS, true);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_AGHANIMS_STATUS, false);
})();