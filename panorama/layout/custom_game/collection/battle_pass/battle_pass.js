--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.Battlepass = GameUI.Battlepass || {};

const CONTEXT = $.GetContextPanel();
const LEVEL_PROGRESS_CONTAINER = $("#BP_Levels_Progress_Container");
const LEVEL_PROGRESS_CONTAINER_BG = $("#BP_Levels_Progress_Container_BG");
const LEVELS_ROOT = $("#BP_Levels_Root");
const BP_CORE_ROOT = $("#BP_Core");
const ITEMS_LINES = {
	0: $("#BP_Items_Core"),
	1: $("#BP_Items_Extend"),
};
const item_margin = 10;

const DATE_MULTIPLIERS = {
	day: 8.64e7,
	hour: 3.6e6,
	min: 60000,
	sec: 1000,
};

function SetBPTimeReamining(end_season_time) {
	let today = new Date();
	today.setMinutes(today.getMinutes() + today.getTimezoneOffset());
	const end_date = new Date(end_season_time);
	end_date.setDate(end_date.getDate() + 7);

	let diff = Math.max(0, end_date - today);

	let format_count = 2;
	let b_has_format = false;
	let line = "";
	Object.entries(DATE_MULTIPLIERS).forEach(([format, _v]) => {
		const diff_by_format = Math.floor(diff / _v);
		if (diff_by_format > 0 && format_count-- > 0) {
			line += ` ${diff_by_format} ${$.Localize(`#bp_timer_remaining_${format}`, diff_by_format, CONTEXT)}`;
			diff -= diff_by_format * _v;
			b_has_format = true;
		}
	});

	if (!b_has_format) {
		GameUI.Collection.OpenSpecificTab("cosmetics");
		GameUI.Collection.HideTab("battle_pass");
	}
	dotaHud.SetHasClass("CustomBPEnds", !b_has_format);

	CONTEXT.SetDialogVariable("bp_time_reamining", b_has_format ? line : $.Localize(`#bp_timer_remaining_time_left`));
}

let max_level_reward = 0;
let b_items_filled = false;
function SetBPProgress(data) {
	if (!b_items_filled) {
		$.Schedule(0.5, () => {
			SetBPProgress(data);
		});
		return;
	}
	const bp_level = Math.min(data.level || 0, max_level_reward);
	CONTEXT.SetDialogVariable("bp_level", bp_level);

	LEVELS_ROOT.Children().forEach((level_label, idx) => {
		level_label.SetHasClass("BLevelReached", idx + 1 <= bp_level);
	});

	if (bp_level <= 0) return;

	for (let level = 1; level <= bp_level; level++) {
		let progress = $(`#LevelProgress_${level}`);
		if (!progress) continue;
		let width = progress.default_width;
		const b_last_level = bp_level == max_level_reward;

		if (level == bp_level) {
			width = width / (b_last_level ? 1 : 2) + (b_last_level ? 0 : item_margin / 2);
			const exp_pct = Math.min(data.exp_current / data.exp_requirement, 1);

			if (exp_pct > 0) {
				const next_level = level + 1;
				const next_progress = $(`#LevelProgress_${next_level}`);
				const b_next_last = next_level == max_level_reward;
				if (next_progress) {
					const next_w =
						next_progress.default_width / (b_next_last ? 1 : 2) - item_margin / (b_next_last ? 1 : 2);
					const to_next_w = progress.default_width / 2 + item_margin / 2;
					const summary = next_w + to_next_w;
					width += summary * exp_pct;
				}
			}
		}

		progress.style.width = `${width}px`;
	}
}
function GetBPLevelUI(level, b_last_level) {
	let label = $(`#Level_${level}`);
	if (!label) {
		label = $.CreatePanel("Panel", LEVELS_ROOT, `Level_${level}`);
		label.BLoadLayoutSnippet("BP_Level");
		label.SetDialogVariableInt("level", level);
	}
	let progress = $(`#LevelProgress_${level}`);
	if (!progress) {
		progress = $.CreatePanel("Panel", LEVEL_PROGRESS_CONTAINER, `LevelProgress_${level}`);
		progress.BLoadLayoutSnippet("BP_Level_Progress");

		progress.bg = $.CreatePanel("Panel", LEVEL_PROGRESS_CONTAINER_BG, `Level_BG_${level}`);
		progress.bg.BLoadLayoutSnippet("BP_Level_Progress");

		progress.default_width = 126;

		if (b_last_level) progress.default_width = progress.default_width / 2 + item_margin / 2;

		progress.bg.style.width = `${progress.default_width}px`;
	}

	return { label: label, progress: progress };
}
let item_slots = {};
function FillItemsRewards(data) {
	LEVELS_ROOT.RemoveAndDeleteChildren();
	LEVEL_PROGRESS_CONTAINER.RemoveAndDeleteChildren();
	LEVEL_PROGRESS_CONTAINER_BG.RemoveAndDeleteChildren();

	if (!data.bp_rewards_data) return;
	data = data.bp_rewards_data;

	let largest_reward_levels = [];
	Object.values(data).forEach((items_line) => {
		let largest_key = Object.keys(items_line).reduce((accumulated_v, current_v) => {
			return Math.max(accumulated_v, current_v);
		});
		largest_reward_levels.push(largest_key);
	});
	max_level_reward = largest_reward_levels.reduce((accumulated_v, current_v) => {
		return Math.max(accumulated_v, current_v);
	});

	Object.entries(data).forEach(([tier, items_line]) => {
		const root = ITEMS_LINES[tier];
		if (!root) return;
		root.RemoveAndDeleteChildren();

		for (let item_idx = 1; item_idx <= max_level_reward; item_idx++) {
			const item = $.CreatePanel("Panel", root, `Item_t${tier}_${item_idx}`);
			item.BLoadLayoutSnippet("BP_Item");
			if (item_slots[item_idx] == undefined) item_slots[item_idx] = true;

			GetBPLevelUI(item_idx, item_idx == max_level_reward);
			const item_def = items_line[item_idx];
			if (!item_def) continue;
			item_slots[item_idx] = false;

			item.AddClass("BFilled");
			let item_name = "";
			let count = 0;
			if (item_def.currency) {
				item.AddClass("BHasCurrencyRewards");
				count = item_def.currency;
				item_name = "currency";
			}

			const bp_image = item.FindChildTraverse("BP_ItemImage");

			let items_for_tooltip;
			if (item_def.item_name) {
				items_for_tooltip = { [item_def.item_name]: item_def.count || 0 };
				item_name = item_def.item_name;
				item.AddClass("BHasItemsRewards");
				bp_image.SetImage(GameUI.Inventory.GetItemImagePath(item_def.item_name));

				count = item_def.count || 1;
			}
			item.item_name = item_name;

			item.SetHasClass("BManyItems", count > 1);
			item.SetDialogVariableInt("count", count);

			let rarity = GameUI.Inventory.GetItemRarity(item_def.item_name) || 1;

			let bundle_for_tooltip = {};
			if (item_def.items) {
				let bundle_items = Object.values(item_def.items);
				bundle_items.forEach((_bundle_item) => {
					bundle_for_tooltip[_bundle_item.item_name] = _bundle_item.count || 1;
					rarity = Math.max(rarity, GameUI.Inventory.GetItemRarity(_bundle_item.item_name) || -1);
				});
				items_for_tooltip = bundle_for_tooltip;
				item_name = "bundle";
				item.AddClass("BHasItemsRewards");
			}
			if ((item_def.currency && item_def.item_name) || item_def.items)
				bp_image.SetImage(GetC_Image(`cosmetics/items/bundle_icon`));

			item.SwitchClass("rarity", GameUI.Inventory.GetRarityName(rarity));
			item.SetPanelEvent("onmouseover", () => {
				$.DispatchEvent(
					"UIShowCustomLayoutParametersTooltip",
					item,
					"CustomItem_Tooltip",
					"file://{resources}/layout/custom_game/collection/item_tooltip/item_tooltip.xml",

					BuildTooltipParams({
						currency: item_def.currency || 0,
						items: items_for_tooltip,
						custom_count: count,
					}),
				);
			});

			item.SetPanelEvent("onmouseout", () => {
				$.DispatchEvent("UIHideCustomLayoutTooltip", item, "CustomItem_Tooltip");
			});
		}
	});

	Object.entries(item_slots).forEach(([slot_idx, b_empty]) => {
		if (!b_empty) return;
		Object.keys(ITEMS_LINES).forEach((tier) => {
			const item = $(`#Item_t${tier}_${slot_idx}`);
			if (!item) return;
			item.AddClass("BFullEmptyLevel");
			const level_ui = GetBPLevelUI(slot_idx);
			if (level_ui.label) {
				level_ui.label.style.opacity = 0;
				level_ui.label.style.marginLeft = `10px`;

				level_ui.label.style.width = `5px`;
			}
			if (level_ui.progress) {
				level_ui.progress.default_width = 15;
				level_ui.progress.bg.style.width = `15px`;
			}
		});
	});
	b_items_filled = true;
}

let b_has_available_item_once_check = true;
function UpdatePlayerData(data) {
	const b_unlocked_extra_items = data.b_unlocked_extra_items == 1;
	const b_unlocked_full_rewards = data.b_unlocked_full_rewards == 1;

	if (data.end_date_redeem_only && new Date() > new Date(data.end_date_redeem_only)) return;

	const bp_data = data.bp_player_data;
	if (!bp_data) return;

	const bp_level = data.current_level_from_date || 0;
	SetBPProgress({
		level: bp_level,
		exp_current: 0,
		exp_requirement: 1000,
	});
	SetBPTimeReamining(data.end_date);

	let unlock_loc_key = "unlock_full_bp_tier";

	if (b_unlocked_full_rewards) unlock_loc_key = "unlock_full_bp_full";
	else if (b_unlocked_extra_items) unlock_loc_key = "unlock_full_bp_extra";

	CONTEXT.SetDialogVariableLocString("unlock_bp_button_text", unlock_loc_key);

	CONTEXT.SetHasClass("BAvailableTier_1", b_unlocked_extra_items);
	CONTEXT.SetHasClass("BattlePassFullRewardsUnlocked", b_unlocked_full_rewards);

	let item_for_scroll;
	let b_has_available_item = false;
	if (bp_data.redeemed_levels)
		Object.values(ITEMS_LINES).forEach((item_line, tier_level) => {
			if (tier_level == 1 && !b_unlocked_extra_items) return;

			const redeemed = Object.values(bp_data.redeemed_levels[tier_level] || {});

			item_line.Children().forEach((item, idx) => {
				if (redeemed && redeemed.indexOf(idx + 1) > -1) {
					if (temp_redeem_data && temp_redeem_data[tier_level] && temp_redeem_data[tier_level][idx])
						GameUI.Cosmetics.AddNewItem(item.item_name);

					item.RemoveClass("BAvailable");
					item.AddClass("BOwned");
				} else if (!item.BHasClass("BOwned") && item.BHasClass("BFilled") && idx + 1 <= bp_level) {
					item.AddClass("BAvailable");
					if (!item_for_scroll) item_for_scroll = item;
					b_has_available_item = true;
				}
			});
		});
	if (item_for_scroll) item_for_scroll.ScrollParentToMakePanelFit(1, true);
	if (b_has_available_item && b_has_available_item_once_check) {
		GameUI.Collection.OpenSpecificTab("battle_pass", true);
		b_has_available_item_once_check = false;
	}
	CONTEXT.SetHasClass("BHasItemsForRedeem", b_has_available_item);
	temp_redeem_data = undefined;
}

function UnlockFullBP() {
	let item_name = "battle_pass_tier_2";

	if (GameUI.Inventory.HasItem("battle_pass_tier_2")) item_name = "battle_pass_extra_rewards_bundle";
	if (GameUI.Inventory.HasItem("battle_pass_extra_rewards_bundle")) return;

	GameUI.InitiatePaymentFor(item_name);
}

let temp_redeem_data;
function RedeemAllRewards() {
	temp_redeem_data = undefined;

	let redeem_data = {};
	let b_has_redeem_data = false;

	Object.values(ITEMS_LINES).forEach((item_line, tier_level) => {
		if (tier_level > 0 && !CONTEXT.BHasClass(`BAvailableTier_${tier_level}`)) return;

		redeem_data[tier_level] = [];

		item_line.Children().forEach((item, idx) => {
			if (item.BHasClass("Owned") || !item.BHasClass("BAvailable") || item.BHasClass("BFullEmptyLevel")) return;
			b_has_redeem_data = true;
			redeem_data[tier_level].push(idx + 1);
		});
	});

	temp_redeem_data = redeem_data;

	if (!b_has_redeem_data) return;
	GameEvents.SendToServerEnsured("BattlePass:redeem", {
		redeemed_levels: redeem_data,
	});
}

function SetBPContentFocus(b_focus) {
	if (b_focus) BP_CORE_ROOT.SetFocus();
	else $.DispatchEvent("DropInputFocus");
}
function PurchaseBPCheck() {
	if (GameUI.Inventory.HasItem("battle_pass_tier_2")) return;
	GameUI.InitiatePaymentFor("battle_pass_tier_2");
}
function HideLockLine() {
	CONTEXT.SetHasClass("BHideUnlockLine", true);
}
function ShowLockLine() {
	CONTEXT.SetHasClass("BHideUnlockLine", false);
}
(() => {
	CONTEXT.SetDialogVariable("bp_level", 0);
	GameUI.Inventory.RegisterForDefinitionsChanges(() => {
		GameEvents.SendToServerEnsured("BattlePass:get_rewards_data", {});
		GameEvents.SendToServerEnsured("BattlePass:get_player_data", {});
	});

	const frame = GameEvents.NewProtectedFrame($.GetContextPanel());

	frame.SubscribeProtected("BattlePass:set_rewards_data", FillItemsRewards);
	frame.SubscribeProtected("BattlePass:update", UpdatePlayerData);
})();