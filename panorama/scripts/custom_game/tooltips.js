--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


let HUD = $.GetContextPanel().GetParent().GetParent().GetParent();
let fixed = false;
let SHOW_ABILITY_NAME = '';
let HEIGHT_DELTA = 0;

$.RegisterForUnhandledEvent("DOTAShowAbilityTooltip", function (ability, ability_name, c, d) {
	SHOW_ABILITY_NAME = ability_name;
    OnShowAbilityTooltip(ability, ability_name, c);
});
$.RegisterForUnhandledEvent("DOTAShowAbilityTooltipForEntityIndex", function (ability, ability_name, c, d) {
	SHOW_ABILITY_NAME = ability_name;
	OnShowAbilityTooltip(ability, ability_name, c);
});
$.RegisterForUnhandledEvent("DOTAShowAbilityInventoryItemTooltip", function (pPanel, iEntityIndex, iInventorySlot, d) {
	OnShowItemTooltip();
});
$.RegisterForUnhandledEvent("DOTAShowAbilityShopItemTooltip", function (pPanel, iEntityIndex, iInventorySlot, d) {
	OnShowItemTooltip();
});

function OnShowItemTooltip(){
	$.Schedule(0, function () {
		InitHUDStyle();
	});
}
function OnShowAbilityTooltip(ability, ability_name, entity_index){
	InitHUDStyle();

    $.Schedule(0.01, function () {
		ability_name = SHOW_ABILITY_NAME;
		// 动态显示种族/职业技能的小头像
		var chess_list_by_synergy = CustomNetTables.GetTableValue("chess_pool_table", 'chess_list_by_synergy');
		var chess_list_by_synergy_black_and_pandaman = CustomNetTables.GetTableValue("chess_pool_table", 'chess_list_by_synergy_black_and_pandaman');

		var synergy_table = CustomNetTables.GetTableValue("chess_pool_table", 'synergy_info');
    	var ban_info = CustomNetTables.GetTableValue("chess_pool_table", 'ban_info');

		var my_vchess = CustomNetTables.GetTableValue("player_id_table", 'vchess_'+Players.GetLocalPlayer());

		var my_chess_lineup_table = {};
		for (var i in my_vchess){
			var chess_info = my_vchess[i];
			my_chess_lineup_table[chess_info.index] = GetChessBaseName(chess_info.chess);
			// $.Msg(GetChessBaseName(chess_info.chess));
			if (CHESS_2_SPEC_CLASS && CHESS_2_SPEC_CLASS[GetChessBaseName(chess_info.chess)] && CHESS_2_SPEC_CLASS[GetChessBaseName(chess_info.chess)].indexOf(ability_name)>=0){
				chess_info['show'] = true;
			}
		}
		if (chess_list_by_synergy && chess_list_by_synergy[ability_name]){
			ShowSynergyTooltipsSmallIcons(ban_info[ability_name].chess_list,chess_list_by_synergy_black_and_pandaman[ability_name],my_chess_lineup_table);
			KeepAbilityTooltip(ability, ability_name);
			// 此种族/职业的棋子高亮特效展示
			if (!TIME_OBJ || TIME_OBJ.phase == 2){
				// 战斗回合不展示
				return;
			}
			for (var i in my_vchess){
				var chess_info = my_vchess[i];
				if (chess_info.show){
					RemindChess(chess_info,ability_name)
				}
			}
		}
		else{
			ClearSynergyTooltipsSmallIcons();
		}
    });
}
function ClearSynergyTooltipsSmallIcons(){
	$.Schedule(0, function () {
		var Tooltips = HUD.FindChildTraverse("Tooltips");
		var DOTAAbilityTooltip = Tooltips.FindChildTraverse("DOTAAbilityTooltip");
		if (!DOTAAbilityTooltip){
			return;
		}
		var AbilityDescriptionContainer = DOTAAbilityTooltip.FindChildTraverse("AbilityDescriptionContainer");
		var panel_icons_container = AbilityDescriptionContainer.FindChildTraverse("panel_icons_container");
		if (panel_icons_container){
			panel_icons_container.RemoveAndDeleteChildren();
		}
	});
}
function KeepAbilityTooltip(ability, ability_name){
	var Tooltips = HUD.FindChildTraverse("Tooltips");
	var DOTAAbilityTooltip = Tooltips.FindChildTraverse("DOTAAbilityTooltip");
	var AbilityDescriptionContainer = DOTAAbilityTooltip.FindChildTraverse("AbilityDescriptionContainer");
	if (!DOTAAbilityTooltip || DOTAAbilityTooltip.BHasClass("TooltipVisible") == false || !AbilityDescriptionContainer){
		return;
	}
	if (!AbilityDescriptionContainer.FindChildTraverse("panel_icons_container")){
		OnShowAbilityTooltip(ability, ability_name);
		return;
	}
	
	
	$.Schedule(0.01,function(){
		FixAbilityTooltipsPosition();
	});
}

function ShowSynergyTooltipsSmallIcons(chess_list, chess_list2, my_chess){
	var chess_list_all = {
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
	};

	for (var i in chess_list){
		var chess = chess_list[i];
		var cost = CHESS_2_LEVEL[chess];
		var hero_name = CHESS_2_HERO[chess];
		var is_black = false;
		for (var j in chess_list2){
			if (chess == chess_list2[j]){
				is_black = true;
			}
		}
		chess_list_all[cost].push({
			chess: chess,
			is_black: is_black,
			hero_name: hero_name,
			i_have: FindValueInObj(my_chess,chess),
		});
	}

	// for (var i in chess_list2){
	// 	var chess = chess_list2[i];
	// 	var cost = CHESS_2_LEVEL[chess];
	// 	var hero_name = CHESS_2_HERO[chess];
	// 	if (chess_list_all[cost]){
	// 		chess_list_all[cost].push({
	// 			chess: chess,
	// 			is_black: true,
	// 			hero_name: hero_name,
	// 			i_have: FindValueInObj(my_chess,chess),
	// 		});
	// 	}
	// }

    var Tooltips = HUD.FindChildTraverse("Tooltips");
	var DOTAAbilityTooltip = Tooltips.FindChildTraverse("DOTAAbilityTooltip");
	DOTAAbilityTooltip.SetPositionInPixels(0, 0, 0);

	var AbilityDescriptionContainer = DOTAAbilityTooltip.FindChildTraverse("AbilityDescriptionContainer");
	var panel_icons_container = AbilityDescriptionContainer.FindChildTraverse("panel_icons_container");
	if (panel_icons_container){
		panel_icons_container.RemoveAndDeleteChildren();
	}
	else{
		panel_icons_container = $.CreatePanel("Panel", AbilityDescriptionContainer, "panel_icons_container", { 
			style: "width:100%;flow-children:right-wrap;padding-left:5px;padding-right:5px;"
		});
	}

	ShowSynergyTooltipsSmallIconsInner(chess_list_all, panel_icons_container);
}

function ShowSynergyTooltipsSmallIconsInner(chess_list_all, panel_icons_container){
	for (var cost in chess_list_all){
		var panel_cost = $.CreatePanel("Panel", panel_icons_container, "", {
			style: "min-width:16px;flow-children:down;height:42px;margin-left:1px;margin-right:1px;margin-bottom:2px;",
		});
		var container1 = $.CreatePanel("Panel", panel_cost, "", {
			style: "height:40px;flow-children:right-wrap;z-index:10;",
		});
		for (var i=0;i<chess_list_all[cost].length;i++){
			var c = chess_list_all[cost][i];
			var ii = $.CreatePanel("DOTAHeroImage", container1, "", { 
				style: "height:32px;width:32px;vertical-align:top;margin-top:0px;",
				heroimagestyle: "icon",
				heroname: c.hero_name,
			});
			if (c.is_black){
				ii.style['brightness'] = '0.1';
				ii.style['saturation'] = '0';
			}
			if (c.i_have){
				//已经有了的棋子：右下角打对号（原来是 check_png.vtex，src 被注释掉导致对号不见了）
				$.CreatePanel("Image", container1, "", { 
					src: "file://{images}/custom_game/tick.png",
					style: "height:14px;width:18px;margin-left:-19px;margin-top:20px;img-shadow:0px 0px 2px 2px #000000cc;",
				});
			}
		}
		$.CreatePanel("Panel", panel_cost, "", {
			style: "width:100%;height:4px;margin-top:-8px;z-index:5;background-color:"+LEVEL_2_COLOR[cost]+";",
		});
	}
}

function InitHUDStyle(){
	var Tooltips = HUD.FindChildTraverse("Tooltips");
	var DOTAAbilityTooltip = Tooltips.FindChildTraverse("DOTAAbilityTooltip");

	var CostToComplete = Tooltips.FindChildTraverse("CostToComplete");
	var AbilitySubHeader = Tooltips.FindChildTraverse("AbilitySubHeader");
	if (CostToComplete){
		CostToComplete.visible = false;
	}
	if (AbilitySubHeader){
		AbilitySubHeader.visible = false;
	}
	var AbilityHeader = Tooltips.FindChildTraverse("AbilityHeader");
	if (AbilityHeader){
		var AbilityName = AbilityHeader.FindChildTraverse("AbilityName");
		if (AbilityName){
			AbilityName.style['font-size'] = '24px';
			AbilityName.style['line-height'] = '24px';
		}
	}
	ClearSynergyTooltipsSmallIcons();
}

function RemindChess(chess_info, ability_name){

	var base_vectror = CENTER_ENTITY_INDEX[PLAYERID_2_TEAM[Players.GetLocalPlayer()]];
	var xx = ((chess_info.x||1)-1)*128 + base_vectror[0] - 128*3.5;
	var yy = ((chess_info.y||1)-1)*128 + base_vectror[1] - 128*1.5;
	var p = [xx,yy,256];

	var par = Particles.CreateParticle("effect/remind_chess/21.vpcf", 0, 0);
	// Particles.SetParticleControl(par, 0, Entities.GetAbsOrigin( chess_info.index ));
	Particles.SetParticleControl(par, 0, p);
	Particles.SetParticleControl(par, 1, { x: 255, y: 255, z: 255 });
	$.Schedule(0.01,function(){
		DestroyRemindChessParticle(par,ability_name);
	});
}
function DestroyRemindChessParticle(par,ability_name){
	let HUD = $.GetContextPanel().GetParent().GetParent().GetParent();
	let Tooltips = HUD.FindChildTraverse("Tooltips");
	let DOTAAbilityTooltip = Tooltips.FindChildTraverse("DOTAAbilityTooltip");
	if (ability_name!=SHOW_ABILITY_NAME || DOTAAbilityTooltip == null || DOTAAbilityTooltip.BHasClass("TooltipVisible") == false) {
		Particles.DestroyParticleEffect(par, true);
		Particles.ReleaseParticleIndex(par);
		return;
	}
	$.Schedule(0.5,function(){
		DestroyRemindChessParticle(par,ability_name);
	});
}

function FixAbilityTooltipsPosition(){
	// 
	let HUD = $.GetContextPanel().GetParent().GetParent().GetParent();
	let Tooltips = HUD.FindChildTraverse("Tooltips");
	var DOTAAbilityTooltip = Tooltips.FindChildTraverse("DOTAAbilityTooltip");
	DOTAAbilityTooltip.SetPositionInPixels(0, 0, 0);

	// 修正位置
	let PositionY = DOTAAbilityTooltip.GetPositionWithinWindow().y;
	let Height = DOTAAbilityTooltip.actuallayoutheight;
	var screen_height = Game.GetScreenHeight();
	if (Math.floor(PositionY + Height) > screen_height) {
		DOTAAbilityTooltip.SetPositionInPixels(0, screen_height - PositionY - Height, 0);
	}
}