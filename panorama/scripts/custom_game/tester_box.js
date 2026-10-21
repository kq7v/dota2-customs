--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


// 测试员工具盒
const IS_TESTER_BOX_AVAILABLE = true;
var ALL_COURIER_LIST, ALL_COLLECT_LIST = {};

GameEvents.Subscribe("show_tester_box", (keys) => {
	if (IS_TESTER_BOX_AVAILABLE) {
		ShowTesterBox();
	}
});
GameEvents.Subscribe("export_lineup", (keys) => {
	ExportLineup(keys);
});

GameEvents.Subscribe("set_all_courier_list", (keys) => {
	ALL_COURIER_LIST = keys.all_courier_list;
});

GameEvents.Subscribe("start_touch_mode", (keys) => {
	StartTouchMode(keys);
});


function ShowTesterBox() {
	if (IsOBing()){
		return;
	}
	$('#panel_tester_box').visible = true;
	FindDotaHudElement('button_board_right').style['margin-top'] = '240px';
	FindDotaHudElement('board_right').style['height'] = '150px';

	GameEvents.SendCustomGameEventToServer("tester_box_show_damage", { is_show_damage: true });
}

function startBattle() {
	$('#panel_tester_select').visible = false;
	Game.EmitSound("dac.testerbox.start_battle");
	GameEvents.SendCustomGameEventToServer("tester_box_start_battle", {});

	play_battle_animation();
}
function chooseRound() {
	var round = parseInt($('#textentry_tester_box_round').text) || 1;
	GameEvents.SendCustomGameEventToServer("tester_box_choose_round", { round: round });
}
function giveMoney() {
	GameEvents.SendCustomGameEventToServer("tester_box_give_money", {});
}
function giveExp() {
	GameEvents.SendCustomGameEventToServer("tester_box_give_exp", {});
}
function clearGround(){
	GameEvents.SendCustomGameEventToServer("tester_box_clear_ground", {});
}

function toggleShowDamage() {
	var is_show_damage = $('#toggle_tester_box_show_damage').checked;
	GameEvents.SendCustomGameEventToServer("tester_box_show_damage", { is_show_damage: is_show_damage });
}
function toggleShowGrid() {
	var is_show_grid = $('#toggle_tester_box_show_grid').checked;
	GameEvents.SendCustomGameEventToServer("tester_box_show_grid", { is_show_grid: is_show_grid });
}
function toggleCourierNoDamage() {
	var is_courier_no_damage = $('#toggle_tester_box_courier_no_damage').checked;
	GameEvents.SendCustomGameEventToServer("tester_box_courier_no_damage", { is_courier_no_damage: is_courier_no_damage });
}

var select_board_tab;
var CHESS_STARS = 1;
function changeChessStars() {
	var panel_c = $('#tester_box_chess_list_stars');
	if (panel_c) {
		ClearUIElement(panel_c);
		CHESS_STARS++;
		if (CHESS_STARS > 3) {
			CHESS_STARS = 1;
		}

		CreateUIElement(panel_c, 'Label', '', {
			text: $.Localize('#'+'text_chess_stars'),
			style: 'vertical-align:center;margin-right:5px;',
		});
		for (var i = 0; i < CHESS_STARS; i++) {
			CreateUIElement(panel_c, 'Image', '', {
				src: 's2r://panorama/images/guilds/contracts/contracts_star_psd.vtex',
				style: 'width:30px;height:30px;vertical-align:center;margin-right:4px;',
			});
		}
		Game.EmitSound("ui.crafting_newslot");
	}
}

function closeSelect() {
	// 关上
	select_board_tab = null;
	$('#panel_tester_select').visible = false;
}

function openChessSelect() {
	if ($('#panel_tester_select').visible == false || select_board_tab != 'chess') {
		// 开启
		$('#panel_tester_select').visible = true;
		select_board_tab = 'chess';
		ClearUIElement($('#panel_tester_select'));

		var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_chess_list_stars', {
			style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;",
			onactivate: "changeChessStars()",
		});
		CreateUIElement(panel_c, 'Label', '', {
			text: $.Localize('#'+'text_chess_stars'),
			style: 'vertical-align:center;margin-right:5px;',
		});
		for (var i = 0; i < CHESS_STARS; i++) {
			CreateUIElement(panel_c, 'Image', '', {
				src: 's2r://panorama/images/guilds/contracts/contracts_star_psd.vtex',
				style: 'width:30px;height:30px;vertical-align:center;margin-right:4px;',
			});
		}

		var chess_list_by_mana = CustomNetTables.GetTableValue("chess_pool_table", 'chess_list_by_mana');
		for (var cost in chess_list_by_mana) {
			var c = chess_list_by_mana[cost];
			var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_chess_list_' + c, {
				style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
			})
			for (var i in c) {
				var chess = c[i];
				CreateUIElement(panel_c, 'DOTAHeroImage', 'tester_box_chess_' + chess, {
					heroname: CHESS_2_HERO[chess],
					heroimagestyle: "icon",
					style: "width:40px;height:40px;margin:2px;",
					onactivate: "giveChess('" + chess + "')",
					onmouseover: "DOTAShowTextTooltip('#" + chess + "')",
					onmouseout: "DOTAHideTextTooltip()",
				});
			}
		}
		var chess_list_by_mana_black = CustomNetTables.GetTableValue("chess_pool_table", 'chess_list_by_mana_black');

		chess_list_by_mana_black['6'] = {
			"1": 'chess_storm',
			"2": 'chess_ember',
			"3": 'chess_earth',
			"4": 'chess_void',
		}
		chess_list_by_mana_black['7'] = {
			"1": 'chess_io',
		}

		for (var cost in chess_list_by_mana_black) {
			var c = chess_list_by_mana_black[cost];
			var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_chess_list_black_' + c, {
				style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
			})
			for (var i in c) {
				var chess = c[i];
				CreateUIElement(panel_c, 'DOTAHeroImage', 'tester_box_chess_' + chess, {
					heroname: CHESS_2_HERO[chess],
					heroimagestyle: "icon",
					style: "width:40px;height:40px;margin:2px;",
					onactivate: "giveChess('" + chess + "')",
					onmouseover: "DOTAShowTextTooltip('#" + chess + "')",
					onmouseout: "DOTAHideTextTooltip()",
				})
			}
		}

		// 潮小汐木桩
		var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_chess_list_other', {
			style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
		});
		CreateUIElement(panel_c, 'Image', 'tester_box_chess_chaoxiaoxi', {
			style: "width:40px;height:40px;margin:2px;",
			src: 'file://{images}/custom_game/chaoxiaoxi.png',
			onactivate: "giveChess('dummy')",
			onmouseover: "DOTAShowTextTooltip('#dummy')",
			onmouseout: "DOTAHideTextTooltip()",
		});
		// CreateUIElement(panel_c, 'Image', 'tester_box_chess_datoucai', {
		// 	style: "width:40px;height:40px;margin:2px;",
		// 	src: 'file://{images}/custom_game/datoucai.png',
		// 	onactivate: "giveChess('placeholder')",
		// 	onmouseover: "DOTAShowTextTooltip('#placeholder')",
		// 	onmouseout: "DOTAHideTextTooltip()",
		// });
		// CreateUIElement(panel_c, 'Image', 'tester_box_chess_egg', {
		// 	style: "width:40px;height:40px;margin:2px;",
		// 	src: 'file://{images}/custom_game/egg.png',
		// 	onactivate: "giveChess('egg')",
		// 	onmouseover: "DOTAShowTextTooltip('#egg')",
		// 	onmouseout: "DOTAHideTextTooltip()",
		// });
	}
	else {
		// 关上
		select_board_tab = null;
		$('#panel_tester_select').visible = false;
	}
}
function giveChess(chess) {
	if (CHESS_STARS == 2) {
		chess += '1';
	}
	if (CHESS_STARS == 3) {
		chess += '11';
	}
	if (chess == 'dummy1' || chess == 'dummy11'){
		chess = 'dummy';
	}
	GameEvents.SendCustomGameEventToServer("tester_box_give_chess", { chess: chess });
}
function openItemSelect() {
	if ($('#panel_tester_select').visible == false || select_board_tab != 'item') {
		// 开启
		$('#panel_tester_select').visible = true;
		select_board_tab = 'item';
		ClearUIElement($('#panel_tester_select'));

		// var drop_item_list_by_mana = CustomNetTables.GetTableValue("chess_pool_table", 'drop_item_list_by_mana');
		// for (var cost in drop_item_list_by_mana) {
		// 	var c = drop_item_list_by_mana[cost];
		// 	var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_' + c, {
		// 		style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
		// 	})
		// 	for (var i in c) {
		// 		var item = c[i];
		// 		CreateUIElement(panel_c, 'DOTAItemImage', 'tester_box_item_' + item, {
		// 			itemname: item,
		// 			style: "width:44px;height:32px;margin:2px;",
		// 			onactivate: "giveItem('" + item + "')",
		// 		})
		// 	}
		// }
		var combined_item_list_by_mana = CustomNetTables.GetTableValue("chess_pool_table", 'item_list_by_mana');
		for (var cost in combined_item_list_by_mana) {
			var c = combined_item_list_by_mana[cost];
			var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_combined_' + c, {
				style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
			})
			for (var i in c) {
				var item = c[i];
				CreateUIElement(panel_c, 'DOTAItemImage', 'tester_box_item_' + item, {
					itemname: item,
					style: "width:44px;height:32px;margin:2px;",
					onactivate: "giveItem('" + item + "')",
				})
			}
		}

		

		var box_list = {
			"1": "item_lootbox_lv1",
			"2": "item_lootbox_lv2",
			"3": "item_lootbox_lv3",
			"4": "item_lootbox_lv4",
			"5": "item_lootbox_lv5",
			"6": "item_relicbox",
		};
		// for (var cost in combined_item_list_by_mana){
		var c = box_list;
		var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_relic_' + c, {
			style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
		})
		for (var i in c) {
			var item = c[i];
			CreateUIElement(panel_c, 'DOTAItemImage', 'tester_box_item_' + item, {
				itemname: item,
				style: "width:44px;height:32px;margin:2px;",
				onactivate: "giveItem('" + item + "')",
			})
		}
		// }

		var relic_list = CustomNetTables.GetTableValue("chess_pool_table", 'relic_list');
		// for (var cost in combined_item_list_by_mana){
		var c = relic_list;
		var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_relic_' + c, {
			style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
		})
		for (var i in c) {
			var item = c[i];
			CreateUIElement(panel_c, 'DOTAItemImage', 'tester_box_item_' + item, {
				itemname: item,
				style: "width:44px;height:32px;margin:2px;",
				onactivate: "giveItem('" + item + "')",
			})
		}

		// var food_list = CustomNetTables.GetTableValue("chess_pool_table", 'food_list');
		var food_list = {
			"1": "item_zhishizhishu",
			"2": "item_fengwangjiang",
			"3": "item_chishu",
			"4": "item_mangguo",
			"5": "item_pingguo",
			"6": "item_jixiezhixin",
			"7": "item_jixiezhixin_gold",
			"8": "item_gold_token",
			"9": "item_rm_token",
			"10": "item_money",
		};
		// for (var cost in combined_item_list_by_mana){
		var c = food_list;
		var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_food_' + c, {
			style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
		})
		for (var i in c) {
			var item = c[i];
			CreateUIElement(panel_c, 'DOTAItemImage', 'tester_box_item_' + item, {
				itemname: item,
				style: "width:44px;height:32px;margin:2px;",
				onactivate: "giveItem('" + item + "')",
			})
		}

		var test_list = {
			"1": "item_test_dahujia",
			"2": "item_test_damokang",
			"3": "item_test_dashanbi",
			"4": "item_test_dafali",
			"5": "item_test_poyinyue",
			"6": "item_test_pomokang",
			"7": "item_test_no_ai",
		};
		// for (var cost in combined_item_list_by_mana){
		var c = test_list;
		var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_test_' + c, {
			style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
		})
		for (var i in c) {
			var item = c[i];
			CreateUIElement(panel_c, 'DOTAItemImage', 'tester_box_item_' + item, {
				itemname: item,
				style: "width:44px;height:32px;margin:2px;",
				onactivate: "giveItem('" + item + "')",
			})
		}
		// }
	}
	else {
		// 关上
		select_board_tab = null;
		$('#panel_tester_select').visible = false;
	}
}
function giveItem(item) {
	GameEvents.SendCustomGameEventToServer("tester_box_give_item", { item: item });
}

function openCourierSelect() {
	if ($('#panel_tester_select').visible == false || select_board_tab != 'courier') {
		// 开启
		$('#panel_tester_select').visible = true;
		select_board_tab = 'courier';
		ClearUIElement($('#panel_tester_select'));

		// 基础信使
		if (ALL_COURIER_LIST['basic_list']) {
			var c = ALL_COURIER_LIST['basic_list'];
			var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_basic_list_' + i, {
				style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
			})
			for (var i in c) {
				var item = c[i];
				var rarity = parseInt(item.slice(1, 2));
				var text = $.Localize('#'+'rarity_' + rarity) + ' ' + $.Localize('#'+'type_h');
				CreateUIElement(panel_c, 'Image', 'tester_box_item_' + item, {
					src: 'file://{images}/custom_game/skaters/' + item + '.png',
					style: "width:45px;height:45px;margin:3px;",
					onactivate: "selectCourier('" + item + "')",
					onmouseover: "DOTAShowTitleTextTooltip('" + name2ColorName(item) + "','" + text + "')",
					onmouseout: "DOTAHideTitleTextTooltip()",
				})
			}
		}

		// 扭蛋机信使
		if (ALL_COURIER_LIST['lottery_list']) {
			for (var l in ALL_COURIER_LIST['lottery_list']) {
				var c = ALL_COURIER_LIST['lottery_list'][l];
				var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_lottery_list_' + c, {
					style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
				})
				for (var i in c) {
					var item = c[i];
					var rarity = parseInt(item.slice(1, 2));
					var text = $.Localize('#'+'rarity_' + rarity) + ' ' + $.Localize('#'+"courier_type_lottery") + ' ' + $.Localize('#'+'type_h');
					CreateUIElement(panel_c, 'Image', 'tester_box_item_' + item, {
						src: 'file://{images}/custom_game/skaters/' + item + '.png',
						style: "width:45px;height:45px;margin:3px;",
						onactivate: "selectCourier('" + item + "')",
						onmouseover: "DOTAShowTitleTextTooltip('" + name2ColorName(item) + "','" + text + "')",
						onmouseout: "DOTAHideTitleTextTooltip()",
					})
				}
			}
		}

		// 赛季奖励信使
		if (ALL_COURIER_LIST['award_list']) {
			var award_list_array = [];
			for (var l in ALL_COURIER_LIST['award_list']) {
				award_list_array.push({
					season: l,
					list: ALL_COURIER_LIST['award_list'][l],
				});
			}
			award_list_array.sort(function(a,b){
				return parseInt(a.season.slice(1, 3)) - parseInt(b.season.slice(1, 3));
			});
			$.Msg(award_list_array);
			for (var l =0;l<award_list_array.length;l++) {
				var c = award_list_array[l].list;
				var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_award_list_' + l, {
					style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
				})
				for (var i in c) {
					var item = c[i];
					var rarity = parseInt(item.slice(1, 2));
					var text = $.Localize('#'+'rarity_' + rarity) + ' ' + award_list_array[l].season.toUpperCase() + $.Localize('#'+"courier_type_award") + ' ' + $.Localize('#'+'type_h');
					CreateUIElement(panel_c, 'Image', 'tester_box_item_' + item, {
						src: 'file://{images}/custom_game/skaters/' + item + '.png',
						style: "width:45px;height:45px;margin:3px;",
						onactivate: "selectCourier('" + item + "')",
						onmouseover: "DOTAShowTitleTextTooltip('" + name2ColorName(item) + "','" + text + "')",
						onmouseout: "DOTAHideTitleTextTooltip()",
					})
				}
			}
		}

		// 赛季糖果商店信使
		if (ALL_COURIER_LIST['season_list']) {
			var c = ALL_COURIER_LIST['season_list'];
			var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_season', {
				style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
			})
			for (var i in c) {
				var item = c[i];
				var rarity = parseInt(item.slice(1, 2));
				var text = $.Localize('#'+'rarity_' + rarity) + ' ' + $.Localize('#'+"courier_type_season") + ' ' + $.Localize('#'+'type_h');
				CreateUIElement(panel_c, 'Image', 'tester_box_item_' + item, {
					src: 'file://{images}/custom_game/skaters/' + item + '.png',
					style: "width:45px;height:45px;margin:3px;",
					onactivate: "selectCourier('" + item + "')",
					onmouseover: "DOTAShowTitleTextTooltip('" + name2ColorName(item) + "','" + text + "')",
					onmouseout: "DOTAHideTitleTextTooltip()",
				})
			}
		}

		// 甜甜圈信使
		if (ALL_COURIER_LIST['biscuit_list']) {
			var c = ALL_COURIER_LIST['biscuit_list'];
			var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_biscuit' + i, {
				style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
			})
			for (var i in c) {
				var item = c[i];
				var rarity = parseInt(item.slice(1, 2));
				var text = $.Localize('#'+'rarity_' + rarity) + ' ' + $.Localize('#'+"courier_type_biscuit") + ' ' + $.Localize('#'+'type_h');
				CreateUIElement(panel_c, 'Image', 'tester_box_item_' + item, {
					src: 'file://{images}/custom_game/skaters/' + item + '.png',
					style: "width:45px;height:45px;margin:3px;",
					onactivate: "selectCourier('" + item + "')",
					onmouseover: "DOTAShowTitleTextTooltip('" + name2ColorName(item) + "','" + text + "')",
					onmouseout: "DOTAHideTitleTextTooltip()",
				})
			}
		}

		// 比赛活动信使
		if (ALL_COURIER_LIST['event_list']) {
			var c = ALL_COURIER_LIST['event_list'];
			var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_event', {
				style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
			})
			for (var i in c) {
				var item = c[i];
				var rarity = parseInt(item.slice(1, 2));
				var text = $.Localize('#'+'rarity_' + rarity) + ' ' + $.Localize('#'+"courier_type_event") + ' ' + $.Localize('#'+'type_h');
				CreateUIElement(panel_c, 'Image', 'tester_box_item_' + item, {
					src: 'file://{images}/custom_game/skaters/' + item + '.png',
					style: "width:45px;height:45px;margin:3px;",
					onactivate: "selectCourier('" + item + "')",
					onmouseover: "DOTAShowTitleTextTooltip('" + name2ColorName(item) + "','" + text + "')",
					onmouseout: "DOTAHideTitleTextTooltip()",
				})
			}
		}

		// 集换信使
		if (ALL_COURIER_LIST['collect_list']) {
			var c = ALL_COURIER_LIST['collect_list'];
			var cc = [];
			for (var i in c) {
				var award = c[i].award;
				if (award.indexOf('_') > 0) {
					award = award.split('_')[0];
				}
				ALL_COLLECT_LIST[award] = {
					award: award,
					parts: [],
				};
				for (var p in c[i].parts) {
					var pp = c[i].parts[p];
					if (pp.indexOf('_') > 0) {
						pp = pp.split('_')[0];
					}
					ALL_COLLECT_LIST[award].parts.push(pp);
				}

				cc.push({
					award: award,
					parts: ALL_COLLECT_LIST[award].parts
				});
			}

			cc.sort(function (a, b) {
				return getCollectDifficulty(a.award) - getCollectDifficulty(b.award);
			});

			var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_collect', {
				style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
			});
			for (var i in cc) {
				var item = cc[i].award;
				var parts_text = '';

				if (item.indexOf('_') > 0) {
					item = item.split('_')[0];
				}

				var parts = cc[i].parts;
				var parts_array = [];
				if (parts && parts.length > 0) {
					for (var p = 0; p < parts.length; p++) {
						var ii = parts[p];
						if (ii.indexOf('_') > 0) {
							ii = ii.split('_')[0];
						}
						parts_array.push(name2ColorName(ii));
					}
				}

				parts_text += $.Localize('#'+'courier_type_collect_difficulty') + ': ' + getCollectDifficulty(item) + '<br>';
				parts_text += parts_array.join(' + ');

				var rarity = parseInt(item.slice(1, 2));
				var text = $.Localize('#'+'rarity_' + rarity) + ' ' + $.Localize('#'+"courier_type_collect") + ' ' + $.Localize('#'+'type_h');
				CreateUIElement(panel_c, 'Image', 'tester_box_item_' + item, {
					src: 'file://{images}/custom_game/skaters/' + item + '.png',
					style: "width:45px;height:45px;margin:3px;",
					onactivate: "selectCourier('" + item + "')",
					onmouseover: "DOTAShowTitleTextTooltip('" + name2ColorName(item) + "','" + (text + '<br><br>' + parts_text) + "')",
					onmouseout: "DOTAHideTitleTextTooltip()",
				})
			}
		}

		// 测试员信使
		if (ALL_COURIER_LIST['tester_list']) {
			var c = ALL_COURIER_LIST['tester_list'];
			var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_tester', {
				style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
			})
			for (var i in c) {
				var item = c[i];
				var rarity = parseInt(item.slice(1, 2));
				var text = $.Localize('#'+'rarity_' + rarity) + ' ' + $.Localize('#'+"courier_type_tester") + ' ' + $.Localize('#'+'type_h');
				CreateUIElement(panel_c, 'Image', 'tester_box_item_' + item, {
					src: 'file://{images}/custom_game/skaters/' + item + '.png',
					style: "width:45px;height:45px;margin:3px;",
					onactivate: "selectCourier('" + item + "')",
					onmouseover: "DOTAShowTitleTextTooltip('" + name2ColorName(item) + "','" + text + "')",
					onmouseout: "DOTAHideTitleTextTooltip()",
				})
			}
		}

		var new_courier_list = [
			"h151",
			"h152",
			"h280",
			"h281",
			"h381",
			"h382",
			"h476",
		];
		if (new_courier_list) {
			var c = new_courier_list;
			var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_new', {
				style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
			})
			for (var i in c) {
				var item = c[i];
				var rarity = parseInt(item.slice(1, 2));
				var text = $.Localize('#'+'rarity_' + rarity) + ' ' + $.Localize('#'+'type_h');
				CreateUIElement(panel_c, 'Image', 'tester_box_item_' + item, {
					src: 'file://{images}/custom_game/skaters/' + item + '.png',
					style: "width:45px;height:45px;margin:3px;",
					onactivate: "selectCourier('" + item + "')",
					onmouseover: "DOTAShowTitleTextTooltip('" + name2ColorName(item) + "','" + text + "')",
					onmouseout: "DOTAHideTitleTextTooltip()",
				})
			}
		}

		// 预览表情
		// var panel_c = CreateUIElement($('#panel_tester_select'), 'Panel', 'tester_box_item_list_tester', {
		// 	style: "width:100%;flow-children:right-wrap;padding:10px;border-bottom:1px solid #333;"
		// })
		// for (var i=0;i<200;i++){
		// 	CreateUIElement(panel_c, 'DOTAEmoticon', '', {
		// 		emoticonid: i,
		// 		animating: "true",
		// 		onmouseover: "DOTAShowTextTooltip('#" + i + "')",
		// 		onmouseout: "DOTAHideTextTooltip()",
		// 	})
		// }
	}
	else {
		// 关上
		select_board_tab = null;
		$('#panel_tester_select').visible = false;
	}
}

function selectCourier(id) {
	GameEvents.SendCustomGameEventToServer("change_onduty_hero",
		{
			'player_id': Players.GetLocalPlayer(),
			'onduty_hero_new': id,
		}
	);
}

function name2ColorName(name) {
	var level = parseInt(name.slice(1, 2));
	return name + '<font color="' + COLOR_STR[level] + '">' + $.Localize('#'+name) + '</font>';
}

function getCollectDifficulty(i) {
	var list = ALL_COLLECT_LIST;

	if (!list[i]) {
		// 不是合成品，直接返回稀有度对应的数值
		var level = parseInt(i.slice(1, 2));
		return [1, 1, 2, 4, 8, 16][level];
	}
	else {
		var parts = list[i].parts;
		var result = 0;
		if (parts && parts.length > 0) {
			for (var p = 0; p < parts.length; p++) {
				var ii = parts[p];
				result += getCollectDifficulty(ii);
			}
		}
		return result;
	}
}

function exportLineup() {
	if ($('#button_export_lineup').BHasClass('unavailable') == false) {
		$('#tester_box_import_export').text = '导出中...';
		Game.EmitSound("ui.crafting_newslot");

		GameEvents.SendCustomGameEventToServer("request_export_lineup", {});
		$('#button_export_lineup').SetHasClass('unavailable', true);
		$.Schedule(10, function () {
			$('#button_export_lineup').SetHasClass('unavailable', false);
		});
	}
}

function ExportLineup(keys) {
	$('#tester_box_import_export').text = keys.data;
	$('#tester_box_import_export').SelectAll();
}

function importLineup() {
	if ($('#button_import_lineup').BHasClass('unavailable') == false) {
		var data = $('#tester_box_import_export').text;
		if (data) {
			GameEvents.SendCustomGameEventToServer("request_import_lineup", {
				data: data
			});
		}
		$('#button_import_lineup').SetHasClass('unavailable', true);
		$('#tester_box_import_export').text = '';
		Game.EmitSound("ui.crafting_newslot");

		$.Schedule(10, function () {
			$('#button_import_lineup').SetHasClass('unavailable', false);
		});
	}
}

// 画战斗动画
if ($('#panel_battle_animation')){
	var sword1 = CreateUIElement($('#panel_battle_animation'), 'Image', 'img_sword1', {
		style: "width:30px;height:30px;margin-left:0px;margin-right:0px;transition-property:transform,position;transition-duration:0.2s;",
		src: 'file://{images}/custom_game/sword.png',
	});
	var sword2 = CreateUIElement($('#panel_battle_animation'), 'Image', 'img_sword2', {
		style: "width:30px;height:30px;margin-left:15px;margin-right:0px;transition-property:transform,position;transition-duration:0.2s;",
		src: 'file://{images}/custom_game/sword.png',
	});
}

function play_battle_animation(){
	if ($('#img_sword1') && $('#img_sword2')){
		var s1 = $('#img_sword1');
		var s2 = $('#img_sword2');

		s1.style['transform'] = 'rotateZ(45deg)';
		s1.style['position'] = '7px 0px 0px';
		s2.style['transform'] = 'rotateZ(-45deg)';
		s2.style['position'] = '-7px 0px 0px';

		$.Schedule(0.5,function(){
			s1.style['transform'] = 'rotateZ(0deg)';
			s1.style['position'] = '0px 0px 0px';
			s2.style['transform'] = 'rotateZ(0deg)';
			s2.style['position'] = '0px 0px 0px';
		});
	}
}

function pauseGame(){
	var  button = $('#panel_pause_game_button');
	if (!button){
		return;
	}
	button.ToggleClass('paused');
	GameEvents.SendCustomGameEventToServer("request_pause_game", {
        "playerid": Players.GetLocalPlayer(),
    });
	PlayClickCSS($('#panel_pause_game'));
}

function backHome(){
	if (CENTER_ENTITY_INDEX[Players.GetTeam(Players.GetLocalPlayer())]) {
        GameUI.SetCameraTargetPosition(CENTER_ENTITY_INDEX[Players.GetTeam(Players.GetLocalPlayer())], 0.2);
        CURR_CAMERA_PLAYER_ID = Players.GetLocalPlayer();
        GameUI.SelectUnit(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), false);
        $.Schedule(0.5, function () {
            GameUI.SetCameraTarget(-1);
        });
    }
	PlayClickCSS($('#panel_back_home'));
}

// var is_slide_mode = 0;
// $.RegisterEventHandler( 'DragStart', $('#panel_slide'), function( panelId, draggedPanel ){
// 	is_slide_mode ++;
// 	if (is_slide_mode >= 5 || $('#panel_slide').BHasClass('show')){
// 		$('#panel_slide').ToggleClass('show');
// 		is_slide_mode = 0;
// 		// 开启触屏模式
// 		// var p = FindDotaHudElement('panel_draw_card');
// 		// if (p){
// 		// 	$.Msg('进来了');
// 		// 	p.draggable = 'true';
// 		// 	p.SetPanelEvent("DragStart",function () {
//         //     	$.Msg('进来了2');
// 		// 	});
// 		// }
// 	}
// 	else{
// 		$.Schedule(3,function(){
// 			is_slide_mode = 0;
// 		});
// 	}
    
//     return true;
// } );

function StartTouchMode(){
	if ($('#panel_slide')){
		$('#panel_slide').ToggleClass('show');
	}
}



function d(){
	GameEvents.SendCustomGameEventToServer("dac_refresh_chess", {
        "team": Players.GetTeam(Players.GetLocalPlayer())
    });
	PlayClickCSS($('#panel_d'));
}
function f(){
	GameEvents.SendCustomGameEventToServer("dac_exp_book", {
        "team": Players.GetTeam(Players.GetLocalPlayer())
    });
	PlayClickCSS($('#panel_f'));
}