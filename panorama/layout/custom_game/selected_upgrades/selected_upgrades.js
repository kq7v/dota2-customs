--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


let OVERRIDE_BUTTON;
let OVERRIDE_PLAYER_ID;
let UPDATE_POS_TOGGLER = false;

function ToggleSingleClassInParent(parent, child_name, class_name) {
	parent.Children().forEach((upgrade) => {
		upgrade.RemoveClass(class_name);
	});
	const focus_panel = $(`#${child_name}`);
	if (focus_panel) focus_panel.AddClass(class_name);
}

function ShowUpgrades(name) {
	ToggleSingleClassInParent(HUD.UPGRADE_LIST, `Upgrades_List_${name}`, "Show");
	ToggleSingleClassInParent(HUD.AU_LIST_1, `AU_${name}`, "Active");
	ToggleSingleClassInParent(HUD.AU_LIST_2, `AU_${name}`, "Active");
}

function LocalizeUpgrade(ability_name, upgrade_name, b_generic) {
	let loc_upgrade = "";
	let check_localize = (key) => {
		let loc_line = $.Localize(key);
		if (loc_line != key) loc_upgrade = loc_line;
	};

	check_localize(`${upgrade_name}_upgrade`);
	check_localize(`DOTA_Tooltip_ability_${ability_name}_${upgrade_name}`);
	check_localize(`upgrade_DOTA_Tooltip_ability_${ability_name}_${upgrade_name}`);

	if (b_generic) {
		check_localize(`DOTA_Tooltip_demo_generic_orb_${upgrade_name}`);
		loc_upgrade = loc_upgrade.replace(/<b>.*<\/b>/, "");
	}
	return loc_upgrade;
}

function CheckUncorrectTalents(data) {
	$.Msg("CheckUncorrectTalents START");
	let linked_values_loc_counter = 1;
	Object.entries(data).forEach(([hero_name, abilities]) => {
		Object.entries(abilities).forEach(([ability_name, upgrade_data]) => {
			Object.entries(upgrade_data).forEach(([upgrade_name, upgrade_info], index) => {
				let b_has_localization = false;

				let loc_upgrade = LocalizeUpgrade(ability_name, upgrade_name);
				if (loc_upgrade != "") b_has_localization = true;

				if (upgrade_info.linked_special_values) {
					Object.keys(upgrade_info.linked_special_values).forEach((link_upgrade_name, index) => {
						let link_loc_upgrade = LocalizeUpgrade(ability_name, link_upgrade_name);

						if (link_loc_upgrade != "") b_has_localization = true;
					});
				}

				if (upgrade_info.linked_abilities)
					Object.entries(upgrade_info.linked_abilities).forEach(
						([linked_ability, linked_ability_specials]) => {
							let linked_localizations = {};
							Object.entries(linked_ability_specials).forEach(
								([la_special_upgrade_name, la_special_upgrade_value]) => {
									let link_loc_upgrade = LocalizeUpgrade(linked_ability, la_special_upgrade_name);
									if (link_loc_upgrade == "")
										link_loc_upgrade = LocalizeUpgrade(ability_name, la_special_upgrade_name);

									if (link_loc_upgrade != "") {
										linked_localizations[la_special_upgrade_value] = true;
									} else if (typeof linked_localizations[la_special_upgrade_value] != "boolean") {
										linked_localizations[la_special_upgrade_value] =
											linked_localizations[la_special_upgrade_value] || [];
										linked_localizations[la_special_upgrade_value].push(la_special_upgrade_name);
									}
								},
							);

							Object.entries(linked_localizations).forEach(([value, loc_info]) => {
								if (typeof loc_info == "boolean") return;

								loc_info.forEach((ls_name) => {
									$.Msg(
										`${
											loc_info.length > 1 ? `##SAMEVALUE:${linked_values_loc_counter}##` : ""
										}"upgrade_DOTA_Tooltip_ability_${linked_ability}_${ls_name}"	""`,
									);
								});
								if (loc_info.length > 1) linked_values_loc_counter++;
							});
						},
					);

				if (!b_has_localization) $.Msg(`"upgrade_DOTA_Tooltip_ability_${ability_name}_${upgrade_name}"	""`);
			});
		});
	});
	$.Msg("CheckUncorrectTalents END");
}

let b_abilities_filled = false;
let generic_definition = CustomNetTables.GetTableValue("ability_upgrades", "generic_upgrades");
let last_hero_id = -1;
let cached_upgrades = {};
let cached_upgrades_roots = {};
function FillBasicUpgrades() {
	let hero_ent_idx = Players.GetLocalPlayerPortraitUnit();
	let player_id = Entities.GetPlayerOwnerID(hero_ent_idx);

	if (OVERRIDE_PLAYER_ID != undefined) {
		player_id = OVERRIDE_PLAYER_ID;
		hero_ent_idx = Players.GetPlayerHeroEntityIndex(OVERRIDE_PLAYER_ID);
	}

	HUD.CONTEXT.SetHasClass("BLocalPlayer", player_id == LOCAL_PLAYER_ID);

	if (last_hero_id == hero_ent_idx) return;

	HUD.AU_LIST_1.RemoveAndDeleteChildren();
	HUD.AU_LIST_2.RemoveAndDeleteChildren();
	HUD.UPGRADE_LIST.RemoveAndDeleteChildren();
	HUD.CONTEXT.SwitchClass("hero", Entities.GetUnitName(hero_ent_idx));

	const abilities_order = {};
	for (let i = 0; i < 32; i++) {
		const ability = Entities.GetAbility(hero_ent_idx, i);
		const ability_name = Abilities.GetAbilityName(ability);
		if (Entities.IsValidEntity(ability) && ability_name.search("special_bonus_") == -1) {
			abilities_order[ability_name] = i;
		}
	}

	let upgrades_data = CustomNetTables.GetTableValue("ability_upgrades", Entities.GetUnitName(hero_ent_idx));
	if (!upgrades_data) return;

	upgrades_data.generic = generic_definition;
	abilities_order.generic = 9999999;

	upgrades_data = Object.entries(upgrades_data);
	upgrades_data = upgrades_data.map(([k, v]) => {
		v.ability_name = k;
		v.order = abilities_order[k] != undefined ? abilities_order[k] : 10000;
		return v;
	});

	upgrades_data = upgrades_data.sort((a, b) => {
		return a.order - b.order;
	});

	cached_upgrades = {};
	cached_upgrades_roots = {};

	upgrades_data.forEach((ability_data, index) => {
		const ability_name = ability_data.ability_name;
		delete ability_data.order;
		delete ability_data.ability_name;
		let ability_upgrades = ability_data;
		cached_upgrades[ability_name] = {};
		cached_upgrades_roots[ability_name] = {};

		const line_applied_order = Math.floor(index / 8) + 1;
		const panel_upgrade = $.CreatePanel("Button", HUD[`AU_LIST_${line_applied_order}`], `AU_${ability_name}`);
		HUD.CONTEXT.SwitchClass("lines_applied", `LinesApplied_${line_applied_order}`);

		panel_upgrade.BLoadLayoutSnippet("Upgrade");

		const ability_image = panel_upgrade.GetChild(0);
		ability_image.abilityname = ability_name;

		if (ability_name != "generic" && hero_ent_idx)
			ability_image.SetAbilityImage(Entities.GetAbilityByName(hero_ent_idx, ability_name));

		panel_upgrade.SetPanelEvent("onmouseover", function () {
			$.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", panel_upgrade, ability_name, hero_ent_idx);
		});
		panel_upgrade.SetPanelEvent("onmouseout", function () {
			$.DispatchEvent("DOTAHideAbilityTooltip");
		});
		panel_upgrade.SetPanelEvent("onactivate", () => {
			ShowUpgrades(ability_name);
		});

		const available_upgrades = $.CreatePanel("Panel", HUD.UPGRADE_LIST, `Upgrades_List_${ability_name}`);
		available_upgrades.BLoadLayoutSnippet("AU_Upgrades_List");
		let upgrades_container = available_upgrades.FindChildTraverse("Upgrades_Lines");

		const is_generic = ability_name == "generic";
		if (is_generic) {
			upgrades_container.rarity_containers = {};
			Object.entries(RARITIES_NAMES).forEach(([rarity, rarity_name]) => {
				const rarity_root = $.CreatePanel("Panel", upgrades_container, `GRC_Rarity_${rarity}`);
				rarity_root.BLoadLayoutSnippet("GenericRariryContainer");

				rarity_root.SetDialogVariableLocString("grc_header_rarity", `selected_upgrades_generic_${rarity_name}`);

				rarity_root.FindChildTraverse("GRC_Header_Root").SetPanelEvent("onactivate", () => {
					rarity_root.ToggleClass("BShowAllUpgrades");
					$.Schedule(0.1, () => {
						SetLimitHeightForSelectedUpgradesRoot(HUD.CONTEXT.BHasClass("BottomView"));
					});
				});

				upgrades_container.rarity_containers[rarity] = rarity_root.FindChildTraverse("GRC_Container");
			});
		}

		available_upgrades.SetDialogVariable("ability_name", $.Localize(`DOTA_Tooltip_ability_${ability_name}`));
		available_upgrades.SetDialogVariableInt("total_u_count", 0);
		panel_upgrade.SetDialogVariableInt("total_u_count", 0);

		Object.entries(ability_upgrades).forEach(([upgrade_name, upgrade_info], index) => {
			if (upgrade_info.disabled) return;

			let container_for_upgrades = upgrades_container;
			if (is_generic) container_for_upgrades = upgrades_container.rarity_containers[upgrade_info.rarity];

			const basic_root_for_lines = $.CreatePanel(
				"Panel",
				container_for_upgrades,
				`UpgradeSelected_${ability_name}_${upgrade_name}`,
			);
			basic_root_for_lines.BLoadLayoutSnippet("UpgradesLinesContainer");
			const main_lines_root = basic_root_for_lines.FindChildTraverse("ULC_Main");
			const linked_lines_root = basic_root_for_lines.FindChildTraverse("ULC_Linked");

			panel_upgrade.AddClass("BAbilityHasUpgrades");
			cached_upgrades[ability_name][upgrade_name] = CreateUpgrades(
				upgrade_info,
				basic_root_for_lines,
				linked_lines_root,
				true,
				true,
				last_hero_id,
				0,
				0,
				"Upgrade_Line",
				main_lines_root,
				is_generic ? "" : ":",
				true,
				is_generic,
			);
			cached_upgrades_roots[ability_name][upgrade_name] = basic_root_for_lines;

			basic_root_for_lines.FindChildTraverse("FavoriteUpgradeButton").SetPanelEvent("onactivate", () => {
				GameUI.Upgrades.ToggleFavoriteUpgrade(ability_name, upgrade_name);
			});

			const linked_length = linked_lines_root.Children().length;
			if (linked_length > 0) linked_lines_root.GetChild(linked_length - 1).AddClass("LastUpgradeLine");
		});

		for (const ability_specials_block of upgrades_container.Children().sort((a, b) => {
			return b.first_localized_upgrade > a.first_localized_upgrade
				? 1
				: b.first_localized_upgrade == a.first_localized_upgrade
				? 0
				: -1;
		})) {
			upgrades_container.MoveChildBefore(ability_specials_block, upgrades_container.GetChild(0));
		}

		if (index == 0) ShowUpgrades(ability_name);
	});
	b_abilities_filled = true;
	last_hero_id = hero_ent_idx;

	UpdateSelectedUpgrades(CustomNetTables.GetTableValue("ability_upgrades", player_id.toString()));
	UpdateFavoriteUpgrades();
}

function countDecimals(value) {
	if (Math.floor(value) === value) return 0;
	return value.toString().split(".")[1].length || 0;
}
function SetValueForUpgradeLine(line, base_value, upgrade_data) {
	const count = upgrade_data.count || 0;

	if (!line.b_linked || line.b_force_visible) line.set_value_by_count(count);
	line.SetHasClass("BHasUpgrades", count > 0);

	line.SetHasClass("BLinked", line.b_linked != undefined && !line.b_force_visible);
}

function _UpdateUpgrades(ability_name, data, b_generic) {
	let track_ability = ability_name;

	const au_button = $(`#AU_${track_ability}`);
	const upgrades_list = $(`#Upgrades_List_${track_ability}`);
	if (!au_button || !upgrades_list) return;
	let count = 0;
	Object.entries(data).forEach(([upgrade_name, upgrade_data]) => {
		const cached_upgrade = (cached_upgrades[ability_name || ""] || {})[upgrade_name];
		if (cached_upgrade)
			cached_upgrade.forEach((p) => {
				const is_generic = ability_name == "generic";
				if (!p.BHasClass("BLinked"))
					count += (upgrade_data.count || 0) / (is_generic ? 1 : upgrade_data.min_rarity || 1);
				p.set_value_by_count(upgrade_data.count);
			});
	});

	if (track_ability != ability_name) return;
	au_button.SetDialogVariableInt("total_u_count", count);
	upgrades_list.SetDialogVariableInt("total_u_count", count);
}
function UpdateSelectedGenericUpgrades(data) {
	if (!data) return;

	_UpdateUpgrades("generic", data, true);
}
function UpdateSelectedUpgrades(data) {
	if (!data) return;

	Object.entries(data).forEach(([ability_name, ability_upgrades], index) => {
		_UpdateUpgrades(ability_name, ability_upgrades, ability_name == "generic");
	});
}

function UpdatePosForUpgrades() {
	if (!b_abilities_filled) {
		$.Schedule(1, UpdatePosForUpgrades);
		return;
	}
	if (!UPDATE_POS_TOGGLER) return;

	UpdatePosForUpgradesOnce();

	$.Schedule(0, UpdatePosForUpgrades);
}

function SetLimitHeightForSelectedUpgradesRoot(force_value) {
	const button = OVERRIDE_BUTTON || HUD.UPGRADE_BUTTON;
	const button_pos = button.GetPositionWithinWindow();
	const offset = 12; // Height offset from button that open menu

	let max_content_height = 0;
	for (panel of HUD.UPGRADE_LIST.Children()) {
		if (panel.contentheight > max_content_height) {
			max_content_height = panel.contentheight;
		}
	}

	const content_height = HUD.AU_BUTTONS_CONTAINER.contentheight + max_content_height + offset;
	const above_height = button_pos.y - offset;
	const below_height = Game.GetScreenHeight() - button_pos.y - offset;

	let bottom_view = !!force_value || (content_height > above_height && above_height < below_height);

	// Limit panel height if content too big
	if (content_height > above_height || content_height > below_height) {
		let max_height =
			(bottom_view ? below_height : above_height) - HUD.AU_BUTTONS_CONTAINER.contentheight - offset - 20;
		max_height = max_height / HUD.CONTEXT.actualuiscale_y - 80;

		for (const panel of HUD.UPGRADE_LIST.Children())
			panel.FindChild("Upgrades_Lines").style.maxHeight = max_height.toFixed() + "px";
	} else {
		for (const panel of HUD.UPGRADE_LIST.Children())
			panel.FindChild("Upgrades_Lines").ClearPropertyFromCode("maxHeight");
	}
	return bottom_view;
}

function UpdatePosForUpgradesOnce() {
	const button = OVERRIDE_BUTTON || HUD.UPGRADE_BUTTON;
	const button_pos = button.GetPositionWithinWindow();
	const offset = 12; // Height offset from button that open menu

	let bottom_view = SetLimitHeightForSelectedUpgradesRoot();

	let y_pos = 0;

	if (!bottom_view) {
		y_pos = button_pos.y - Game.GetScreenHeight() - offset;
		HUD.CONTEXT.RemoveClass("BottomView");
		HUD.CONTEXT.ClearPropertyFromCode("margin");
	} else {
		const filler_height = (button_pos.y + offset) / HUD.CONTEXT.actualuiscale_y;
		HUD.CONTEXT.AddClass("BottomView");
		HUD.CONTEXT.style.marginTop = filler_height.toFixed() + "px";
	}

	const fav_builds_width = HUD.FAVORITE_BUILDS_ROOT.actuallayoutwidth / 2;
	const fav_builds_toggle_width = HUD.BUILDS_LIST_TOGGLE_BUTTON.actuallayoutwidth / 2;
	const fav_builds_margin = 10 / 2;

	HUD.CONTEXT.SetPositionInPixels(
		Math.round(
			(button_pos.x -
				(HUD.CONTEXT.actuallayoutwidth / 2 - button.actuallayoutwidth / 2) -
				fav_builds_width -
				fav_builds_margin -
				fav_builds_toggle_width) /
				HUD.CONTEXT.actualuiscale_x,
		),
		Math.round(y_pos / HUD.CONTEXT.actualuiscale_y) + (bottom_view ? 22 : 0),
		0,
	);
}

function ShowDefaultSelectedUpgrades() {
	OVERRIDE_BUTTON = undefined;
	OVERRIDE_PLAYER_ID = undefined;
	ToggleUpgrades();
}

function ToggleUpgrades(b_skip_position_update) {
	dotaHud.ToggleClass("ShowSelectedUpgradesList");

	if (dotaHud.BHasClass("ShowSelectedUpgradesList")) {
		FillBasicUpgrades();

		if (!b_skip_position_update) {
			UPDATE_POS_TOGGLER = true;
			$.Schedule(0, UpdatePosForUpgrades);
		} else $.Schedule(0.07, UpdatePosForUpgradesOnce);
	} else UPDATE_POS_TOGGLER = false;
}
function CloseUpgrades(check_is_default) {
	if (check_is_default && !OVERRIDE_BUTTON) return;

	dotaHud.RemoveClass("ShowSelectedUpgradesList");
}

function OnPortraitUnitChanged() {
	if (OVERRIDE_PLAYER_ID) return;

	const unit = Players.GetLocalPlayerPortraitUnit();
	const local_team = Players.GetTeam(Game.GetLocalPlayerID());

	HUD.UPGRADE_BUTTON.SetHasClass(
		"Visible",
		Entities.IsHero(unit) &&
			(local_team == 1 ||
				local_team == Entities.GetTeamNumber(unit) ||
				Game.GetMapInfo().map_display_name == "ot3_demo"),
	);

	CloseUpgrades();
}

function OnUpgradesChanged(table_name, key, value) {
	if (Entities.GetPlayerOwnerID(last_hero_id) == key) UpdateSelectedUpgrades(value);
}

function ShowForPlayerAndButton(player_id, button) {
	if (button != OVERRIDE_BUTTON || player_id != OVERRIDE_PLAYER_ID) {
		OVERRIDE_BUTTON = button;
		OVERRIDE_PLAYER_ID = player_id;

		CloseUpgrades();
	}

	ToggleUpgrades(true);
}

CACHED_FAVORITES = {};
CACHED_FAVORITES_CONTAINERS = {};
function InitFavoriteBuilds() {
	HUD.BUILDS_LIST_TOGGLE_BUTTON.AddClass("ToggleBuildGlow");
	HUD.CONTEXT.RemoveClass("BShowBuildsHint");
	HUD.BUILDS_LIST.RemoveAndDeleteChildren();

	let counter = 1;
	for (const [tier, count] of Object.entries(FAVORITE_BUILDS_PER_TIER)) {
		const container = $.CreatePanel("Panel", HUD.BUILDS_LIST, `F_Builds_List_T${tier}`);
		container.BLoadLayoutSnippet("F_Builds_TierContainer");

		container.SetDialogVariableLocString("supp_name", `subscription_tier_${tier}`);
		container.SetDialogVariable("max_slots", count);
		container.SetDialogVariable("supp_level", tier);

		container.FindChildTraverse("F_Builds_TC_Overlay").SetPanelEvent("onactivate", () => {
			CloseUpgrades();
			GameUI.Collection.OpenSpecificTab("subscription");
		});

		CACHED_FAVORITES_CONTAINERS[tier] = container;

		const builds_list = container.FindChildTraverse("F_Builds_TC_List");
		for (let x = 0; x < count; x++) CACHED_FAVORITES[counter] = new FavoriteBuild(counter++, tier, builds_list);
	}

	GameUI.Player.RegisterForPlayerDataChanges(UpdatePlayerData);
	UpdatePlayerData();
}

function UpdatePlayerData() {
	let sub_tier = GameUI.Player.GetSubscriptionTier(LOCAL_PLAYER_ID);
	if (sub_tier == undefined) return;

	for (const [tier, cached_container] of Object.entries(CACHED_FAVORITES_CONTAINERS))
		cached_container.SetHasClass("BLockedBuildsTier", sub_tier < tier);

	for (const fav_build of Object.values(CACHED_FAVORITES)) fav_build.CheckAvailableByTier(sub_tier);
}

function UpdateFavoriteUpgrades() {
	for (const [ability_name, upgrades] of Object.entries(cached_upgrades_roots))
		for (const [upgrade_name, panel] of Object.entries(upgrades)) {
			const is_fav = !!GameUI.Upgrades.IsUpgradeFavorite(ability_name, upgrade_name);
			panel.SetHasClass("BFavorite", is_fav);

			const upgrade_panel = FindDotaHudElement(`UpgradeSelection_${ability_name}_${upgrade_name}`);
			if (upgrade_panel) upgrade_panel.SetHasClass("BFavorite", is_fav);
		}
}
function UpdateFavoriteBuilds(builds) {
	for (const [build_id, cached_build] of Object.entries(CACHED_FAVORITES)) {
		const build = builds[build_id];
		cached_build.UpdateData(build?.hero_name, build?.build_name);
	}

	UpdateFavoriteUpgrades();
	if (Object.keys(builds).length == 0) ShowFavoriteBuildsHint();
}

function ToggleFavoriteBuilds() {
	HUD.CONTEXT.ToggleClass("BHideFavoriteBuild");
	ShowToggleFavoriteBuildsHint();
}
function ShowToggleFavoriteBuildsHint() {
	HUD.BUILDS_LIST_TOGGLE_BUTTON.RemoveClass("ToggleBuildGlow");
	$.DispatchEvent(
		"DOTAShowTextTooltip",
		HUD.BUILDS_LIST_TOGGLE_BUTTON,
		`#favorite_builds_toggle_hint_${HUD.CONTEXT.BHasClass("BHideFavoriteBuild") ? "show" : "hide"}`,
	);
}

let b_fav_build_hint_was_show = false;
function ShowFavoriteBuildsHint() {
	if (b_fav_build_hint_was_show) return;

	const owned_hero = Players.GetPlayerHeroEntityIndex(LOCAL_PLAYER_ID);
	if (owned_hero == -1) return void $.Schedule(0, ShowFavoriteBuildsHint);

	b_fav_build_hint_was_show = true;

	$.Schedule(1, () => {
		FillBasicUpgrades();
		$.Schedule(1, () => {
			UpdatePosForUpgradesOnce();
			// HUD.CONTEXT.AddClass("BShowBuildsHint");
		});
	});
}
function RemoveBuildsHint() {
	HUD.CONTEXT.RemoveClass("BShowBuildsHint");
}

GameUI.SelectedUpgrades = {};
GameUI.SelectedUpgrades.CloseUpgrades = CloseUpgrades;
GameUI.SelectedUpgrades.ShowForPlayerAndButton = ShowForPlayerAndButton;
GameUI.SelectedUpgrades.UpdateFavoriteBuilds = UpdateFavoriteBuilds;
GameUI.SelectedUpgrades.UpdateFavoriteUpgrades = UpdateFavoriteUpgrades;

(() => {
	const abilities_block = FindDotaHudElement("AbilitiesAndStatBranch").GetChild(0);

	RemoveChildrenByID(abilities_block, "Upgrades_Button");
	HUD.UPGRADE_BUTTON.SetParent(abilities_block);

	GameEvents.Subscribe("dota_player_update_query_unit", OnPortraitUnitChanged);
	GameEvents.Subscribe("dota_player_update_selected_unit", OnPortraitUnitChanged);

	CustomNetTables.SubscribeNetTableListener("ability_upgrades", OnUpgradesChanged);

	$.RegisterForUnhandledEvent("Cancelled", () => {
		CloseUpgrades();
	});

	GameUI.SetMouseCallback((event_name, arg) => {
		if (event_name == "pressed" && arg == 0) CloseUpgrades();
	});

	if (Game.IsInToolsMode()) {
		// GameEvents.SendToServerEnsured("Upgrades:get_debug_localization_check", {});
		// GameEvents.SubscribeProtected("Upgrades:send_debug_localization_check", CheckUncorrectTalents);
	}

	SubscribeToNetTableKey("game_state", "portraits", () => {
		for (const c of Object.values(CACHED_FAVORITES)) c.RedrawHeroIcon();
	});

	OnPortraitUnitChanged();
	FillBasicUpgrades();
	InitFavoriteBuilds();
})();