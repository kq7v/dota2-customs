--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


// UI事件
GameEvents.Subscribe("msg", SafeCallback("msg", OnMsg));
GameEvents.Subscribe("show_time", SafeCallback("show_time", OnShowTime));
GameEvents.Subscribe("mima", SafeCallback("mima", OnMima));
GameEvents.Subscribe("show_draw_card", SafeCallback("show_draw_card", OnShowDrawCard));
GameEvents.Subscribe("close_draw_card", SafeCallback("close_draw_card", close_panel_draw_card));
GameEvents.Subscribe("show_gold", SafeCallback("show_gold", OnShowGold));
GameEvents.Subscribe("send_http_cb", SafeCallback("send_http_cb", SendHTTPCb));
GameEvents.Subscribe("win_streak", SafeCallback("win_streak", OnWinStreak));
GameEvents.Subscribe("sync_hp", SafeCallback("sync_hp", OnSyncHp));
GameEvents.Subscribe("population", SafeCallback("population", OnPopulation));
GameEvents.Subscribe("player_reconnect", SafeCallback("player_reconnect", OnPlayerReconnect));
GameEvents.Subscribe("show_liuju", SafeCallback("show_liuju", OnShowLiuju));
GameEvents.Subscribe("hide_liuju", SafeCallback("hide_liuju", OnHideLiuju));
GameEvents.Subscribe("update_liuju", SafeCallback("update_liuju", OnUpdateLiuju));
GameEvents.Subscribe("request_buy_chess_cb", SafeCallback("request_buy_chess_cb", OnRequestBuyChessCb));
GameEvents.Subscribe("show_gameover", SafeCallback("show_gameover", OnShowGameover));
GameEvents.Subscribe("show_damage_stat", SafeCallback("show_damage_stat", OnShowDamageStat));
GameEvents.Subscribe("show_ob_count", SafeCallback("show_ob_count", OnShowOBCount));
GameEvents.Subscribe("show_round_win_lose", SafeCallback("show_round_win_lose", ShowRoundWinLose));
GameEvents.Subscribe("clear_round_win_lose", SafeCallback("clear_round_win_lose", ClearRoundWinLose));
GameEvents.Subscribe("request_player_language", SafeCallback("request_player_language", OnRequestPlayerLanguage));
GameEvents.Subscribe("test_legendary", SafeCallback("test_legendary", OnTestLegendary));
GameEvents.Subscribe("show_ban_choose", SafeCallback("show_ban_choose", OnShowBanChoose));
GameEvents.Subscribe("show_confirm_unban_synergy", SafeCallback("show_confirm_unban_synergy", OnShowConfirmUnbanSynergy));
GameEvents.Subscribe("ban_chess", SafeCallback("ban_chess", OnBanChess));
GameEvents.Subscribe("unban_chess", SafeCallback("unban_chess", OnUnBanChess));
GameEvents.Subscribe("dota_player_update_selected_unit", SafeCallback("dota_player_update_selected_unit", ForceSingleSelection));
GameEvents.Subscribe("show_cursor_hero_icon", SafeCallback("show_cursor_hero_icon", OnShowCursorHeroIcon));
// GameEvents.Subscribe("show_combinable_item", SafeCallback("show_combinable_item", OnShowCombinableItem));
GameEvents.Subscribe("toggle_is_click_select", SafeCallback("toggle_is_click_select", OnToggleIsClickSelect));
GameEvents.Subscribe("show_drodo_courier_buff", SafeCallback("show_drodo_courier_buff", OnShowDrodoCourierBuff));
GameEvents.Subscribe("show_lua_ping", SafeCallback("show_lua_ping", OnShowLuaPing));
GameEvents.Subscribe("update_ranking_top", SafeCallback("update_ranking_top", UpdateRankingTop));
GameEvents.Subscribe("init_chesspool", SafeCallback("init_chesspool", FillChessListPanel));
GameEvents.Subscribe("user_panel_ranking", SafeCallback("user_panel_ranking", UserPanelRanking));
GameEvents.Subscribe("hide_damage_stat", SafeCallback("hide_damage_stat", HideDamageStat));
GameEvents.Subscribe("show_petgpt", SafeCallback("show_petgpt", ShowPetGPT));
GameEvents.Subscribe("hide_petgpt", SafeCallback("hide_petgpt", HidePetGPT));
GameEvents.Subscribe("set_petgpt_status", SafeCallback("set_petgpt_status", SetPetGPTStatus));
GameEvents.Subscribe("show_banned_items", SafeCallback("show_banned_items", SetBannedItem));
// GameEvents.Subscribe("update_item_recycle_result", SafeCallback("update_item_recycle_result", UpdateItemRecycleResult));
GameEvents.Subscribe("show_item_recycle_result", SafeCallback("show_item_recycle_result", ShowItemRecycleResult));
GameEvents.Subscribe("toggle_request_recycle_item", SafeCallback("toggle_request_recycle_item", ToggleRequestRecycleItem));
GameEvents.Subscribe("refill_chess_in_panel", SafeCallback("refill_chess_in_panel", RefillChessInPanel));
GameEvents.Subscribe("update_my_money", SafeCallback("update_my_money", UpdateMyMoney));
GameEvents.Subscribe("show_double_coin_confirm", SafeCallback("show_double_coin_confirm", DoubleCoinComfirm));
GameEvents.Subscribe("show_2b_per", SafeCallback("show_2b_per", OnShow2bPer));
GameEvents.Subscribe("show_qr_code", SafeCallback("show_qr_code", OnShowStoreQRCode));

CustomNetTables.SubscribeNetTableListener("dac_table", SafeCallback("nt:dac_table", DACTableChanged));
CustomNetTables.SubscribeNetTableListener("player_info_table", SafeCallback("nt:player_info_table", PlayerInfoTableChanged));
CustomNetTables.SubscribeNetTableListener("ranking_top_table", SafeCallback("nt:ranking_top_table", RankingTopTableChanged));
CustomNetTables.SubscribeNetTableListener("quest_table", SafeCallback("nt:quest_table", QuestTableChanged));
CustomNetTables.SubscribeNetTableListener("game_info", SafeCallback("nt:game_info", GameInfoTableChanged));
CustomNetTables.SubscribeNetTableListener("chess_pool_table", SafeCallback("nt:chess_pool_table", ChessPoolTableChanged));
CustomNetTables.SubscribeNetTableListener("player_id_table", SafeCallback("nt:player_id_table", PlayerIDTableChanged));

UpdateHeroIcon();
ShowAllPlayerInfo();
// refresh_shop_v5();
refresh_shop_v5();

ShowGameMode();

SetHotKey('SPACE', toggle_panel);
SetHotKey('=', toggle_player_details);
SetHotKey('F3', toggle_player_details);
SetHotKey('\\', toggle_player_details);
SetHotKey('F9', toggle_f9);
SetHotKey('K', ShowChatEmotion, HideChatEmotion);
SetHotKey('/', ToggleLegendaryBox);
SetHotKey('L', ShowLineupShortCuts, HideLineupShortCuts);
SetHotKey('J', TogglePetGPTStatus);

//==========================================================
// 调试：模拟断线重连（不需要按键，定时自动触发）
//   （之前用 F8，但 F8 和 Dota2 默认快捷键冲突，会顺带触发商店购买并弹「金钱不足」，
//     所以改成定时自动触发，完全不占按键）
//   客户端发 debug_fake_reconnect -> 服务端复用 DAC:OnPlayerReconnected
//   => 客户端会收到和真重连一样的下行事件（player_reconnect / set_petgpt_status /
//      update_config / show_all_player_connect_status / sync_hp / 战利品弹窗…）
// 注意：不会真的重建 Panorama HUD（那是引擎行为），但能覆盖这些"重连时序"崩溃
// 发布时保持 false 即可（服务端还有一道 _G.DEBUG_FAKE_RECONNECT 开关）
//==========================================================
var DEBUG_FAKE_RECONNECT = false;          // 总开关（调试时改 true，发布必须 false）
var DEBUG_FAKE_RECONNECT_FIRST_DELAY = 6;  // 进图后多少秒第一次触发
var DEBUG_FAKE_RECONNECT_INTERVAL = 15;    // 之后每隔多少秒再触发；填 0 = 只触发一次

if (DEBUG_FAKE_RECONNECT === true) {
    var __fake_reconnect_count = 0;
    function __DoFakeReconnect() {
        __fake_reconnect_count++;
        $.Msg('[DEBUG] fake reconnect #' + __fake_reconnect_count
            + ', player_id=' + Game.GetLocalPlayerID());
        GameEvents.SendCustomGameEventToServer('debug_fake_reconnect', {
            player_id: Game.GetLocalPlayerID(),
        });
        if (DEBUG_FAKE_RECONNECT_INTERVAL > 0) {
            $.Schedule(DEBUG_FAKE_RECONNECT_INTERVAL, __DoFakeReconnect);
        }
    }
    $.Msg('[DEBUG] fake reconnect armed: first in ' + DEBUG_FAKE_RECONNECT_FIRST_DELAY
        + 's, interval=' + DEBUG_FAKE_RECONNECT_INTERVAL + 's');
    $.Schedule(DEBUG_FAKE_RECONNECT_FIRST_DELAY, __DoFakeReconnect);
}
// SetHotKey('R', Try2Reroll);


// 全局变量
var IS_CURSOR_HERO_ICON_SHOWING = false;
var MOVING_PCF = -1;

//粒子句柄校验：Particles.CreateParticle 在资源没加载好（重连后常见）时会返回 undefined，
//直接把 undefined 传给 Particles.* 会抛 "expected Number" 异常并把后续脚本整段跳过
function IsValidParticleIndex(p) {
    return (typeof p === 'number' && p >= 0);
}

//==========================================================
// 动态创建的 HUD 面板（宠物托管/表情/阵型/羁绊 buff 栏/圣物提示/留局按钮…）
// 在「断线重连 / HUD 重建 / 面板还没创建」时 FindDotaHudElement 会返回 null，
// 直接 .style / .visible 会抛 TypeError 并让整段脚本被跳过（Skipping rest of script）。
// 统一走下面这几个包装函数，取不到元素就安静跳过。
//==========================================================
function HudStyle(id, prop, value) {
    var el = FindDotaHudElement(id);
    if (!el) { return false; }
    el.style[prop] = value;
    return true;
}

function HudVisible(id, visible) {
    var el = FindDotaHudElement(id);
    if (!el) { return false; }
    el.visible = visible;
    return true;
}

function HudClass(id, cls, has_class) {
    var el = FindDotaHudElement(id);
    if (!el) { return false; }
    el.SetHasClass(cls, has_class);
    return true;
}

function HudImage(id, src) {
    var el = FindDotaHudElement(id);
    if (!el) { return false; }
    el.SetImage(src);
    return true;
}

function HudEvent(id, event_name, callback) {
    var el = FindDotaHudElement(id);
    if (!el) { return false; }
    el.SetPanelEvent(event_name, callback);
    return true;
}

//==========================================================
// 通用加固
//   1) GetTableSafe：net table 取不到就是 nil（重连/表还没下发），
//      直接索引会抛 Type error，用它兜底成空表
//   2) SafeCallback：给事件/net table 回调套 try/catch。
//      Panorama 里回调抛异常会 "Skipping rest of script"，把同一段里后面的逻辑全丢掉，
//      套上之后单个回调出错只打日志，不影响其它链路
//==========================================================
function GetTableSafe(tbl, key) {
    var v = CustomNetTables.GetTableValue(tbl, key);
    return v || {};
}

function SafeCallback(name, fn) {
    return function () {
        try {
            return fn.apply(null, arguments);
        }
        catch (e) {
            $.Msg('[JS-ERROR] ' + name + ': ' + e);
            if (e && e.stack) {
                $.Msg('[JS-ERROR] stack: ' + e.stack);
            }
        }
    };
}
var PORTRAIT_UNIT = Players.GetLocalPlayerPortraitUnit();
var IS_SEASON_AWARD_AVAILABLE = true;

// 通行证面板的「是否已激活」外观：
//   未激活 -> 面板整体换灰色背景，各特权项的状态标签显示「未激活」
//   已激活 -> 恢复金色背景和原来的「已启用 / 已解锁」文案
// 面板上所有「已解锁 / 已启用 / 未解锁」状态角标：未激活通行证时统一显示「未激活」
var VIP_PANEL_STATUS_LABELS = [
    ['text_vip_roshan_status', '#text_vip_got'],
    ['text_vip_board1_status', '#text_vip_got'],
    ['text_vip_board2_status', '#text_vip_got'],
    ['text_vip_avatar_status', '#text_vip_on'],
    ['text_vip_bullet_status', '#text_vip_on'],
    ['text_vip_firstwin_got_1', '#text_vip_ungot'],
    ['text_vip_quest_got_1', '#text_vip_ungot'],
];

$('#text_chess_list_title').text = $.Localize('#' + 'chess_list') + ' (' + CHESS_COUNT + ')';

var my_collect_ready = {};
var IS_PANEL_DRAW_CARD_CAN_OPEN = false;

var BATTLE_STATUS = 0; // 0=准备阶段，1=pve对战，2=玩家对战，3=云对战
var is_rolling = false;

// 移除天赋树、命石UI
// FindDotaHudElement('StatBranch').style['width'] = '0';
FindDotaHudElement('ContentsContainer').style['opacity'] = '0';
FindDotaHudElement('ContentsContainer').style['width'] = '0px';
var xxx = FindDotaHudElement('AbilitiesAndStatBranch').FindChildrenWithClassTraverse('RootInnateDisplay');
for (var ii in xxx) {
    if (xxx[ii]) {
        xxx[ii].style['width'] = '0px';
    }
}
// 隐藏天赋树
FindDotaHudElement('StatBranch').style['width'] = '0px';
FindDotaHudElement('AghsStatusContainer').style['width'] = '0';
FindDotaHudElement('StatBranchDrawer').style['opacity'] = '0';
ModifyDOTAHUDTalentTree();

// 隐藏中立物品UI（20250219中立物品新改动：打造中立物品）
FindDotaHudElement('inventory_neutral_level_up').style['opacity'] = '0';
FindDotaHudElement('inventory_neutral_craft_holder').style['opacity'] = '0';
FindDotaHudElement('inventory_neutral_slot_container').style['opacity'] = '0';
FindDotaHudElement('RoshanTimerContainer').style['opacity'] = '0';
FindDotaHudElement('TormentorTimer').style['opacity'] = '0';

// 其他UI
FindDotaHudElement('TeamItems').style['opacity'] = '0';
FindDotaHudElement('ToggleScoreboardButton').style['opacity'] = '0';
FindDotaHudElement('shop_launcher_block').style['opacity'] = '0';
FindDotaHudElement('shop').style['margin-bottom'] = '0px';
FindDotaHudElement('shop').style['width'] = '500px';
FindDotaHudElement('HeightLimiter').style['opacity'] = '0';
FindDotaHudElement('GuideFlyout').style['opacity'] = '0';
FindDotaHudElement('Main').style['vertical-align'] = 'bottom';
FindDotaHudElement('Main').style['width'] = '530px';
FindDotaHudElement('Main').style['height'] = '145px';
FindDotaHudElement('ItemCombines').style['background-image'] = 'none';
FindDotaHudElement('ItemCombines').style['background-color'] = 'gradient( linear, 0% 0%, 0% 100%, from( #8dc0f288 ), color-stop( 0.00, #0e1318fb), to( #0e1318ff ) )';
FindDotaHudElement('ItemCombines').style['border-top'] = '1px solid #8dc0f205';
FindDotaHudElement('ItemCombines').style['border-radius'] = '0px';
FindDotaHudElement('ItemCombines').style['width'] = '530px';
FindDotaHudElement('ItemCombines').style['height'] = '145px';
FindDotaHudElement('ItemCombines').style['position'] = '0px 0px 0px';
FindDotaHudElement('ItemCombines').style['padding'] = '10px';
FindDotaHudElement('ChatControls').style['border-radius'] = '0px';
FindDotaHudElement('HealthLabel').style['font-family'] = 'titleFont';
FindDotaHudElement('AbilityButton').style['width'] = '80%';
FindDotaHudElement('international_hall_of_fame').style['vertical-align'] = 'top';
FindDotaHudElement('international_hall_of_fame').style['margin-right'] = '220px';

// FindDotaHudElement('neutralCharges').visible = true;
// FindDotaHudElement('neutralCharges').text = '';
FindDotaHudElement('neutralCharges').style['font-size'] = '18px';
FindDotaHudElement('neutralCharges').style['opacity'] = '0.75';








FindDotaHudElement('AbilitiesAndStatBranch').style['z-index'] = '5';

// FindDotaHudElement('inventory_composition_layer_container').style['margin-right'] = '0px';

// if (FindDotaHudElement('NetGraph')){
//     if (FindDotaHudElement('drodo_ping_pabel')){
//         FindDotaHudElement('drodo_ping_pabel').RemoveAndDeleteChildren();
//     }
//     var drodo_ping_panel = $.CreatePanel('Panel', FindDotaHudElement('NetGraph'), "drodo_ping_panel", {
//         style: 'width:50px;height:100%;flow-children:down;padding-top:1px;',
//     });
//     $.CreatePanel('Label', drodo_ping_panel, "drodo_ping_label1", {
//         style: 'color:#C5DAFF;font-size:14px;font-weight:bold;horizontal-align:center;text-shadow:1px 1px 2px 2 #000000;',
//         text: '0',
//     });
//     $.CreatePanel('Label', drodo_ping_panel, "drodo_ping_label2", {
//         style: 'color:#C5DAFF;font-size:14px;font-weight:bold;horizontal-align:center;text-shadow:1px 1px 2px 2 #000000;',
//         text: '0',
//     });
// }

function OnShowLuaPing(keys) {
    // ShowLuaInfoOnScreen((keys.memory || 0)+'M')
    if (FindDotaHudElement('drodo_ping_label1')) {
        FindDotaHudElement('drodo_ping_label1').text = keys.fps || 0;
    }
    if (FindDotaHudElement('drodo_ping_label2')) {
        FindDotaHudElement('drodo_ping_label2').text = (keys.entities || 0);//+'/'+(keys.memory||0)+'M';
    }
}

if (FindDotaHudElement('buffs')) {
    FindDotaHudElement('buffs').style['transition-property'] = 'transform';
    FindDotaHudElement('buffs').style['transition-duration'] = '0s';
}
if (FindDotaHudElement('debuffs')) {
    FindDotaHudElement('debuffs').style['transition-property'] = 'transform';
    FindDotaHudElement('debuffs').style['transition-duration'] = '0s';
}

if (FindDotaHudElement('RadarButton')) {
    FindDotaHudElement('RadarButton').style['opacity'] = '0';
}

if (FindDotaHudElement('minimap_block')) {
    var minimap_panel = FindDotaHudElement('minimap_block');
    minimap_panel.SetPanelEvent("onmouseover",
        function () {
            $.DispatchEvent("DOTAShowTitleTextTooltip", FindDotaHudElement('minimap_block'), $.Localize('#' + 'tips_minimap'), $.Localize('#' + 'tips_minimap_desc'));
        }
    );
    minimap_panel.SetPanelEvent("onmouseout",
        function () {
            $.DispatchEvent("DOTAHideTitleTextTooltip");
        }
    );
}

if (FindDotaHudElement('inventory')) {
    var emotion_button_container = FindDotaHudElement('inventory');

    FindDotaHudElement('inventory_items').style['z-index'] = '100';
    FindDotaHudElement('inventory').style['height'] = '210px';
    FindDotaHudElement('inventory').style['padding-top'] = '65px';

    // emotion_button_container.RemoveAndDeleteChildren();
    emotion_button_container.style['overflow'] = 'noclip noclip';
    // emotion_button_container.style['margin-bottom'] = '0px';
    if (FindDotaHudElement('emotion_button')) {
        FindDotaHudElement('emotion_button').RemoveAndDeleteChildren();
    }
    if (FindDotaHudElement('petgpt_button')) {
        FindDotaHudElement('petgpt_button').RemoveAndDeleteChildren();
    }


    // 发表情按钮
    $.CreatePanel('Image', emotion_button_container, "emotion_button", {
        src: "file://{images}/custom_game/button2.png",
        style: "width:60px;height:40px;vertical-align:top;horizontal-align:right;margin-top:-35px;margin-right:70px;position:0px 10px 0px;transition-duration:0.2s;transition-property:position;z-index:0;",
        hittest: 'true',
    });
    HudStyle('emotion_button', 'tooltip-position', 'top');
    HudEvent('emotion_button', "onmouseover",
        function () {
            $.DispatchEvent("DOTAShowTitleTextTooltip", FindDotaHudElement('emotion_button'), $.Localize('#' + 'text_icon_emotion_button'), $.Localize('#' + 'text_icon_emotion_button_desc'));
            HudStyle('emotion_button', 'position', '0px 0px 0px');
            HudImage('emotion_button', "file://{images}/custom_game/button2.png");
        }
    );
    HudEvent('emotion_button', "onmouseout",
        function () {
            $.DispatchEvent("DOTAHideTitleTextTooltip");
            HudStyle('emotion_button', 'position', '0px 10px 0px');
            HudImage('emotion_button', "file://{images}/custom_game/button2.png");
        }
    );
    HudEvent('emotion_button', "onactivate",
        function () {
            ShowChatEmotion();
        }
    );

    // 宠物托管按钮
    $.CreatePanel('Image', emotion_button_container, "petgpt_button", {
        src: "file://{images}/custom_game/button1.png",
        style: "width:60px;height:40px;vertical-align:top;horizontal-align:right;margin-top:-35px;margin-right:136px;position:0px 10px 0px;transition-duration:0.2s;transition-property:position;z-index:0;",
        hittest: 'true',
    });
    HudStyle('petgpt_button', 'tooltip-position', 'top');
    HudVisible('petgpt_button', false);

    SetPetGPTStatus({
        key: CLIENT_KEY,
        on_off: "0",
    });

    // 阵型按钮
    $.CreatePanel('Image', emotion_button_container, "lineup_button", {
        src: "file://{images}/custom_game/button3.png",
        style: "width:60px;height:40px;vertical-align:top;horizontal-align:right;margin-top:-35px;margin-right:5px;position:0px 10px 0px;transition-duration:0.2s;transition-property:position;z-index:0;",
        hittest: 'true',
    });
    HudStyle('lineup_button', 'tooltip-position', 'top');
    HudEvent('lineup_button', "onmouseover",
        function () {
            $.DispatchEvent("DOTAShowTitleTextTooltip", FindDotaHudElement('lineup_button'), $.Localize('#' + 'text_icon_lineup_button'), $.Localize('#' + 'text_icon_lineup_button_desc'));
            HudStyle('lineup_button', 'position', '0px 0px 0px');
            HudImage('lineup_button', "file://{images}/custom_game/button3.png");
        }
    );
    HudEvent('lineup_button', "onmouseout",
        function () {
            $.DispatchEvent("DOTAHideTitleTextTooltip");
            HudStyle('lineup_button', 'position', '0px 10px 0px');
            HudImage('lineup_button', "file://{images}/custom_game/button3.png");
        }
    );
    HudEvent('lineup_button', "onactivate",
        function () {
            ShowLineupShortCuts();
        }
    );
}

function ShowChatEmotion() {
    // FindDotaHudElement('ChatEmoticonPicker').SetHasClass('Visible', true);

    $('#panel_emotion_box').SetHasClass('invisible', false);
    $('#panel_emotion_box').style['opacity'] = '1';
    $('#panel_emotion_box').style['transform'] = 'scale3d( 1, 1, 1)';
    $('#panel_emotion_box').SetFocus();
    HideLineupShortCuts();
}
function HideChatEmotion() {
    // FindDotaHudElement('ChatEmoticonPicker').SetHasClass('Visible', false);

    $('#panel_emotion_box').SetHasClass('invisible', true);
    $('#panel_emotion_box').style['opacity'] = '0';
    $('#panel_emotion_box').style['transform'] = 'scale3d( 0.01, 0.01, 0.01)';
}

function ShowLineupShortCuts() {
    // FindDotaHudElement('ChatEmoticonPicker').SetHasClass('Visible', true);

    $('#panel_lineup_box').SetHasClass('invisible', false);
    $('#panel_lineup_box').style['opacity'] = '1';
    $('#panel_lineup_box').style['transform'] = 'scale3d( 1, 1, 1)';
    $('#panel_lineup_box').SetFocus();
    HideChatEmotion();
}
function HideLineupShortCuts() {
    // FindDotaHudElement('ChatEmoticonPicker').SetHasClass('Visible', false);

    $('#panel_lineup_box').SetHasClass('invisible', true);
    $('#panel_lineup_box').style['opacity'] = '0';
    $('#panel_lineup_box').style['transform'] = 'scale3d( 0.01, 0.01, 0.01)';
}

// 小地图右侧的按钮
var gs_container = FindDotaHudElement('GlyphScanContainer');
gs_container.RemoveAndDeleteChildren();
if (gs_container) {
    $.CreatePanel('Image', gs_container, "icon_legendary_box", {
        // src: "file://{images}/custom_game/icon_pumpkin.png",
        src: "file://{images}/custom_game/chess_knight.png",
        style: "width:35px;height:35px;vertical-align:bottom;margin-bottom:11px;margin-left:10px;brightness:0.5;",
        onactivate: "ToggleLegendaryBox();",
    });
    $.CreatePanel('Image', gs_container, "icon_config", {
        src: "file://{images}/custom_game/config.png",
        style: "width:32px;height:32px;vertical-align:bottom;margin-bottom:56px;margin-left:12px;brightness:0.5;",
        onactivate: "ShowConfig();",
    });

    FindDotaHudElement('icon_legendary_box').SetPanelEvent("onactivate",
        function () {
            ToggleLegendaryBox();
        }
    );
    FindDotaHudElement('icon_legendary_box').SetPanelEvent("onmouseover",
        function () {
            FindDotaHudElement('icon_legendary_box').style['brightness'] = '1';
            $.DispatchEvent("DOTAShowTitleTextTooltip", FindDotaHudElement('icon_legendary_box'), $.Localize('#' + 'text_icon_legendary_box'), $.Localize('#' + 'text_icon_legendary_box_desc'));
        }
    );
    FindDotaHudElement('icon_legendary_box').SetPanelEvent("onmouseout",
        function () {
            FindDotaHudElement('icon_legendary_box').style['brightness'] = '0.5';
            $.DispatchEvent("DOTAHideTitleTextTooltip");
        }
    );

    FindDotaHudElement('icon_config').SetPanelEvent("onactivate",
        function () {
            GameEvents.SendCustomGameEventToServer("request_show_config", {});
            // GameEvents.SendCustomGameEventToClient('show_config', Players.GetLocalPlayer(), {})
            // ShowConfig();
        }
    );
    FindDotaHudElement('icon_config').SetPanelEvent("onmouseover",
        function () {
            FindDotaHudElement('icon_config').style['brightness'] = '1';
            $.DispatchEvent("DOTAShowTitleTextTooltip", FindDotaHudElement('icon_config'), $.Localize('#' + 'text_icon_config'), $.Localize('#' + 'text_icon_config_desc'));
        }
    );
    FindDotaHudElement('icon_config').SetPanelEvent("onmouseout",
        function () {
            FindDotaHudElement('icon_config').style['brightness'] = '0.5';
            $.DispatchEvent("DOTAHideTitleTextTooltip");
        }
    );
}

FindDotaHudElement('TipContainer').style['opacity'] = '0';
FindDotaHudElement('PrevTip').style['opacity'] = '0';
FindDotaHudElement('NextTip').style['opacity'] = '0';
FindDotaHudElement('KillCam').style['opacity'] = '0';
FindDotaHudElement('quickstats').style['opacity'] = '0';
FindDotaHudElement('Main').style['opacity'] = '0';
FindDotaHudElement('NewPlayerShopConsumables').style['opacity'] = '0';
FindDotaHudElement('ItemCombinesAndBasicItemsContainer').style['flow-children'] = 'right';
FindDotaHudElement('Main').style['width'] = '0px';
FindDotaHudElement('ItemCombines').style['visibility'] = 'visible';
FindDotaHudElement('combat_events').style['width'] = '550px';
FindDotaHudElement('combat_events').style['height'] = '350px';

// FindDotaHudElement('combat_events').style['margin-top'] = '430px';
FindDotaHudElement('combat_events').style['vertical-align'] = 'bottom';

// FindDotaHudElement('combat_events').style['background-color'] = '#000';

// // 强行改变ItemsContainer的样式
// function AutoSetItemsContainerStyle() {
//     if (FindDotaHudElement('ItemsContainer')) {
//         var child_list = FindDotaHudElement('ItemsContainer').FindChildrenWithClassTraverse('MainShopItem');
//         for (var i = 0; i < child_list.length; i++) {
//             var element = child_list[i];
//             element.style['width'] = '60px';
//             element.style['opacity-mask'] = 'url("s2r://panorama/images/masks/scratched_box_psd.vtex")';
//             element.style['box-shadow'] = 'none';
//         }
//     }
//     $.Schedule(0.1, function () {
//         AutoSetItemsContainerStyle();
//     });
// }
// AutoSetItemsContainerStyle();

// 战报面板的高度适配“特大尺寸小地图”
function AutoSetCombatPanelHeight() {
    if (FindDotaHudElement('minimap_block')) {
        var minimap_height = FindDotaHudElement('minimap_block').actuallayoutheight;
        var minimap_width = FindDotaHudElement('minimap_block').actuallayoutwidth;
        var h = Game.GetScreenHeight();
        // FindDotaHudElement('combat_events').style['height'] = (720 - minimap_height) + 'px';
        // FindDotaHudElement('minimap_block').style['horizontal-align'] = 'left';
        FindDotaHudElement('combat_events').style['margin-bottom'] = (minimap_height * 1080 / h + 20) + 'px';
        // if (Game.IsHUDFlipped() == true) {
        //     // 小地图设置在右边，为了UI不冲突，隐藏小地图和战报面板
        //     FindDotaHudElement('combat_events').visible = false;
        //     FindDotaHudElement('minimap_block').visible = false;
        //     FindDotaHudElement('GlyphScanContainer').style['margin-left'] = '0px';
        // }
        // else {
        FindDotaHudElement('combat_events').visible = true;
        FindDotaHudElement('minimap_block').visible = true;
        // FindDotaHudElement('GlyphScanContainer').style['margin-left'] = minimap_width + 'px';
        // }
    }
    // $.Schedule(0.1, function () {
    //     AutoSetCombatPanelHeight();
    // });
}
AutoSetCombatPanelHeight();
InitDrodoCourierBuffContainer();

FindDotaHudElement('right_flare').style['margin-right'] = '2px';
FindDotaHudElement('HUDSkinTopBarBG').style['width'] = '100%';
FindDotaHudElement('HUDSkinTopBarBG').style['height'] = '50px';
FindDotaHudElement('topbar').style['width'] = '100%';
FindDotaHudElement('HUDSkinAbilityContainerBG').style['width'] = '500px';
FindDotaHudElement('ChatEmoticonButton').style['opacity'] = '0';
// FindDotaHudElement('ChatEmoticonPicker').BCreateChildren("<Panel id='ChatEmoticonPickerEmoticonList' style='width:100%;height:100%;flow-children:right-wrap;overflow: squish scroll;'></Panel>");
CreateChildren(FindDotaHudElement('ChatEmoticonPicker'), "<Panel id='ChatEmoticonPickerEmoticonList' style='width:100%;height:100%;flow-children:right-wrap;overflow: squish scroll;'></Panel>");
FindDotaHudElement('HealthProgress_Left').style['background-color'] = 'gradient( linear, 0% 0%, 100% 0%, from( #2da02788 ), color-stop( 0.85, #2da027dd), to( #2da027ff ) )';
FindDotaHudElement('ManaProgress_Left').style['background-color'] = 'gradient( linear, 0% 0%, 100% 0%, from( #4d47a088 ), color-stop( 0.85, #4d47a0dd), to( #4d47a0ff ) )';

FindDotaHudElement('HealthContainer').style['height'] = '36px';
FindDotaHudElement('ManaContainer').style['height'] = '16px';
FindDotaHudElement('ManaLabel').style['vertical-align'] = 'center';
FindDotaHudElement('ManaLabel').style['font-size'] = '16px';
FindDotaHudElement('HealthLabel').style['font-size'] = '22px';
FindDotaHudElement('HealthLabel').style['font-family'] = 'titleFont';
FindDotaHudElement('ManaLabel').style['font-family'] = 'titleFont';
//background-color:gradient( linear, 0% 0%, 100% 0%, from( #2da02788 ), color-stop( 0.85, #2da027dd), to( #2da027ff ) );

FindDotaHudElement('ChatHelpPanel').style['opacity'] = '0';
FindDotaHudElement('ChatTabHelpButton').style['opacity'] = '0';
FindDotaHudElement('level_stats_frame').style['opacity'] = '0';

FindDotaHudElement('inventory_tpscroll_container').style['background-image'] = 'url("file://{images}/custom_game/recycle_item.png")';
FindDotaHudElement('inventory_tpscroll_container').style['background-repeat'] = 'no-repeat';
FindDotaHudElement('inventory_tpscroll_container').style['background-position'] = 'center center';
FindDotaHudElement('inventory_tpscroll_container').style['background-size'] = '100% 100%';
FindDotaHudElement('inventory_tpscroll_container').style['brightness'] = '1';
FindDotaHudElement('inventory_tpscroll_container').style['background-img-opacity'] = '0.1';
FindDotaHudElement('inventory_tpscroll_container').style['opacity'] = '0.75';

FindDotaHudElement('inventory_tpscroll_slot').style['opacity'] = '0';
FindDotaHudElement('tpCharges').style['font-size'] = '18px';
FindDotaHudElement('tpCharges').text = "";
if (FindDotaHudElement('InspectButton')) {
    FindDotaHudElement('InspectButton').style['opacity'] = '0';
}

//天赋树
//tp、中立物品栏位置的快捷键
FindDotaHudElement('inventory_tpscroll_HotkeyContainer').style['opacity'] = '0';
FindDotaHudElement('inventory_neutral_slot_HotkeyContainer').style['opacity'] = '0';
// FindDotaHudElement('inventory_tpscroll_container').style['opacity'] = '0';

// $.CreatePanel('Image', $('#qipa'), "", {
//     src: "file://{images}/custom_game/jiuxian.png",
//     onmouseover: "DOTAShowAbilityTooltip('brewmaster_cinder_brew')",
//     onmouseout: "DOTAHideAbilityTooltip()",
// });



// FindDotaHudElement('ChatLinesPanel').style['background-color'] = '#ff0000';
// FindDotaHudElement('ChatLinesPanel').RemoveAndDeleteChildren();
// FindDotaHudElement('ChatLinesPanel').BCreateChildren("<Label class='ChatLine Expired' text='ceshi'/>");
// CreateChildren(FindDotaHudElement('ChatLinesPanel'), "<Label class='ChatLine Expired' text='ceshi'/>");

// 观战视角，清理不需要的ui
if (IsOBing() == true) {
    if (FindDotaHudElement('SpectatorItemsButton')) {
        FindDotaHudElement('SpectatorItemsButton').style['opacity'] = '0';
    }
    if (FindDotaHudElement('SpectatorXPGraphButtonItemsButton')) {
        FindDotaHudElement('XPGraphButton').style['opacity'] = '0';
    }
    if (FindDotaHudElement('SpectatorXPGraphButtonItemsButton')) {
        FindDotaHudElement('SpectatorXPGraphButtonItemsButton').style['opacity'] = '0';
    }
    if (FindDotaHudElement('SpectatorXPGraphButtonItemsButton')) {
        FindDotaHudElement('SpectatorXPGraphButtonItemsButton').style['opacity'] = '0';
    }
    if (FindDotaHudElement('spectator_options')) {
        FindDotaHudElement('spectator_options').style['opacity'] = '1';
        FindDotaHudElement('spectator_options').style['margin-top'] = '10px';
        FindDotaHudElement('spectator_options').style['height'] = '80px';
        // if (FindDotaHudElement('spectator_options').FindChildrenWithClassTraverse('CloseButton') && FindDotaHudElement('spectator_options').FindChildrenWithClassTraverse('CloseButton')[0]) {
        //     FindDotaHudElement('spectator_options').FindChildrenWithClassTraverse('CloseButton')[0].style['opacity'] = '0';
        // }
    }
    if (FindDotaHudElement('AudioDropDown')) {
        FindDotaHudElement('AudioDropDown').style['opacity'] = '0';
    }
    if (FindDotaHudElement('SpectatorGraph')) {
        FindDotaHudElement('SpectatorGraph').style['opacity'] = '0';
    }
    if (FindDotaHudElement('RoshanTimerContainer')) {
        FindDotaHudElement('RoshanTimerContainer').style['opacity'] = '0';
    }
    if (FindDotaHudElement('DisconnectButton')) {
        FindDotaHudElement('DisconnectButton').style['opacity'] = '0';
    }
    if (FindDotaHudElement('spectator_game_stats')) {
        FindDotaHudElement('spectator_game_stats').style['opacity'] = '0';
    }
    if (FindDotaHudElement('spectator_quickstats')) {
        FindDotaHudElement('spectator_quickstats').style['opacity'] = '0';
    }

    // $('#panel_fog_toggle').style['opacity'] = '0';
    // $('#panel_combine_toggle').style['opacity'] = '0';
    // $('#panel_select_toggle').style['opacity'] = '0';
    $('#icon-ranking').style['opacity'] = '0';
    $('#icon-my').style['opacity'] = '0';

    $('#round_battle').text = $.Localize('#' + 'round_status_obing');
    $('#round_status').style['color'] = '#00ffff';

    // $('#battle_icon').SetImage("s2r://panorama/images/control_icons/eye_png.vtex");
}


if (GetPlayerCount() == 1) {
    // 单人模式
    $('#txt_game_mode').text = $.Localize('#' + 'dac_1p');
}
// else {
$('#txt_game_mode').text = $.Localize('#' + 'dac_' + Game.GetMapInfo().map_display_name);
// }

// FindDotaHudElement('stackable_side_panels').style['opacity'] = '0';
// FindDotaHudElement('PlusStatus').style['opacity'] = '0';




var steamid2panelindex = {};

var player_count = 0;
var player_radient = 0;
var player_dire = 0;
var local_id = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
HighLightPlayerHPBar(Players.GetLocalPlayer());

var changed = false;
var heroindex2id = {};
var timeout = 15;
var userinfo;
var CURR_HOST_OPPO = null;
var CURR_GUEST_OPPO = null;

// 初始化
function OnShowOBCount(keys) {
    FindDotaHudElement('SpectatorCount').text = $.Localize('#' + 'text_ob_count') + ': ' + keys.count;
}


var CURR_CAMERA_PLAYER_ID = Players.GetLocalPlayer();
var CURR_CAMERA_TEAM_ID = Players.GetTeam(Players.GetLocalPlayer());
var OLD_CAMERA_PLAYER_ID = CURR_CAMERA_PLAYER_ID;
var IS_CAMERA_MOVING = false;

var TEAM_2_PLAYERID = {};
var PLAYERID_2_TEAM = {};
for (var i = 0; i <= 11; i++) {
    if (Players.GetTeam(i)) {
        TEAM_2_PLAYERID[Players.GetTeam(i)] = i;
        PLAYERID_2_TEAM[i] = Players.GetTeam(i);
    }
}





function GetLength2D(p1, p2) {
    return Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]), 2));
}

var is_mimaing = false;
var mima_waterid = 0;

OnTestLegendary();

function OnTestLegendary() {
    var data = GetTableSafe("chess_pool_table", 'legendary_info');
    if (data && data.chess_banned) {
        var g_arr = data.chess_banned;
        SetLegendaryChessStatus(g_arr);
        var r_arr = data.relic_banned;
        SetLegendaryChessStatus(r_arr, true);
    }
}


var TIME_OBJ;
function OnShowTime(keys) {
    if (!CheckClientKey(keys.key)) return;
    $('#total_time').text = time2showtime_hour(keys.total_elapsed);
    var t = keys.left || 0;
    TIME_OBJ = keys;

    if (keys.phase == 2) {
        // 战斗回合
        $('#round_time').text = keys.left < 10 ? '0' + keys.left : keys.left;
        if ($('#panel_top_player_round_winlose').BHasClass('invisible')) {
            $('#round_status').text = $.Localize('#' + 'zhandouhuihe');
            $('#round_status').SetHasClass('text_green', false);
            $('#round_status').SetHasClass('text_yellow', false);
            $('#round_status').SetHasClass('text_red', true);
            $('#round_status').SetHasClass('text_win', false);
            $('#round_status').SetHasClass('text_lose', false);
            $('#round_status').SetHasClass('text_draw', false);

            if ($('#round_time_bg')) {
                $('#round_time_bg').style['background-color'] = '#ff4444';
                var total = (keys.left || 0) + (keys.elapsed || 0);
                $('#round_time_bg').style['transform'] = 'scale3d( ' + ((keys.left - 1) / (total - 1)) + ', 1, 1);';
            }
        }
    }
    else if (keys.phase == 1 && keys.left >= 5) {
        // 准备回合
        t -= 5;

        $('#round_time').text = t < 10 ? '0' + t : t;
        $('#round_status').text = $.Localize('#' + 'zhunbeihuihe');
        $('#round_status').SetHasClass('text_green', true);
        $('#round_status').SetHasClass('text_yellow', false);
        $('#round_status').SetHasClass('text_red', false);
        $('#round_status').SetHasClass('text_win', false);
        $('#round_status').SetHasClass('text_lose', false);
        $('#round_status').SetHasClass('text_draw', false);
        $('#panel_top_player_round_winlose').SetHasClass('invisible', true);
        $('#round_status').style['margin-left'] = '0px';

        if ($('#round_time_bg')) {
            $('#round_time_bg').style['background-color'] = '#66bb66';
            var total = (t || 0) + (keys.elapsed || 0);
            $('#round_time_bg').style['transform'] = 'scale3d( ' + (t / total) + ', 1, 1);';
        }
    }
    else {
        // 即将战斗
        $('#round_time').text = '50';
        $('#round_status').text = $.Localize('#' + 'readyhuihe');
        $('#round_status').SetHasClass('text_green', false);
        $('#round_status').SetHasClass('text_yellow', true);
        $('#round_status').SetHasClass('text_red', false);
        $('#round_status').SetHasClass('text_win', false);
        $('#round_status').SetHasClass('text_lose', false);
        $('#round_status').SetHasClass('text_draw', false);
        $('#panel_top_player_round_winlose').SetHasClass('invisible', true);
        $('#round_status').style['margin-left'] = '0px';

        if ($('#round_time_bg')) {
            $('#round_time_bg').style['background-color'] = '#ffff88';
            $('#round_time_bg').style['transform'] = 'scale3d(1,1,1);';
        }
    }
}
function OnShowGameTime(keys) {
    $('#panel_time_best').text = time2showtime_hour(keys.time);
}
function time2showtime_hour(t) {
    if (t > 362439) t = 362439;
    var h = 0, m = 0, s = 0;
    if (!t) return "00:00:00";

    t = parseInt(t);
    h = Math.floor(t / 3600);
    m = Math.floor((t - h * 3600) / 60);
    s = t - h * 3600 - m * 60;

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return h + ':' + m + ':' + s;
}
function OnMima(keys) {
    if (!CheckClientKey(keys.key)) return;
    Game.EmitSound("General.CastFail_NoMana");

    GameUI.SendCustomHUDError($.Localize('#' + keys.text), "General.CastFail_NoMana");
}

var round_mana = 1;
var lose_streak_anwei = 0;
var win_streak_anwei = 0;
var WL_STREAK = 0;
var STREAK_BOX = 0;
var UNIT_NAME_INDEX = {};
var ROUND = 0;
var CHESS_STAT = {};
function ShowChesses(pos) {
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize('#' + 'tips_chesses_title'), $.Localize('#' + 'tips_chesses_text'));
}
function ShowBattle(pos) {
    if (BATTLE_STATUS) {
        $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize('#' + 'tips_battle_title' + BATTLE_STATUS), $.Localize('#' + 'tips_battle_text' + BATTLE_STATUS));
    }
}
function ShowInterest(pos) {
    var hero_index = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
    var curr_gold = Entities.GetMana(hero_index);
    var shouru = Math.floor((ROUND + 1) / 2 + 0.5);
    if (shouru > 4) {
        shouru = 4;
    }
    var lixi = Math.floor(curr_gold / 10);
    var hero_index = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());

    if (lixi > 4) {
        if (HasModifier('modifier_item_more_interest')) {
            lixi = 4 + 2 * Math.floor((curr_gold - 40) / 20)
        }
        else {
            lixi = 4;
        }
    }

    var all_shouru = Math.round(shouru + lixi + win_streak_anwei + lose_streak_anwei + 1);

    var text = $.Localize('#' + 'tips_gold_0') + $.Localize('#' + 'tips_gold_1') + Math.floor(curr_gold) + '  <font color=\"#ffff88\">+' + all_shouru + '</font>';
    if (shouru > 0) {
        text += $.Localize('#' + 'tips_gold_2') + shouru;
    }
    if (lixi > 0) {
        text += $.Localize('#' + 'tips_gold_3') + lixi;
    }
    text += $.Localize('#' + 'tips_gold_35');
    if (win_streak_anwei > 0) {
        text += $.Localize('#' + 'tips_gold_5') + (win_streak_anwei);
    }
    if (lose_streak_anwei > 0) {
        text += $.Localize('#' + 'tips_gold_4') + (lose_streak_anwei);
    }

    if (HasModifier('modifier_item_streak_plus')) {
        // 有明暗终途，显示预计获得的战利品代币
        if (STREAK_BOX) {
            text += '<br>' + $.Localize('#item_streak_plus') + ': ' + $.Localize('#DOTA_Tooltip_ability_item_lootbox_lv' + STREAK_BOX);
        }
    }

    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize('#' + 'tips_gold_title'), text);
}
function OnMouseOut() {
    $.DispatchEvent("DOTAHideTextTooltip");
    $.DispatchEvent("DOTAHideTitleTextTooltip");
}

var my_team6 = Players.GetTeam(Players.GetLocalPlayer())-6;
change_camera_2_player_ground(my_team6);
function change_camera_2_player_ground(player_id) {
    CURR_CAMERA_PLAYER_ID = player_id;
    GameUI.SetCameraTargetPosition(CENTER_ENTITY_INDEX[CURR_CAMERA_PLAYER_ID + 6], 0.2);

    var target_player_team = player_id + 6;
    GameEvents.SendCustomGameEventToServer("reset_fow", {
        "local_player_team": Players.GetTeam(Players.GetLocalPlayer()),
        "target_player_team": target_player_team,
    });
    IS_CAMERA_MOVING = true;
    $.Schedule(0.5, function () {
        GameUI.SetCameraTarget(-1);
        IS_CAMERA_MOVING = false;
    });
}
function ShowTableDataOnScreen(key, data) {
    $('#show_screen_info').RemoveAndDeleteChildren();
    $.CreatePanel('Label', $('#show_screen_info'), '', {
        class: '',
        text: key + ':' + JSON.stringify(data).length,
    });
}
function ShowLuaInfoOnScreen(info) {
    $('#show_screen_info_lua').RemoveAndDeleteChildren();
    $.CreatePanel('Label', $('#show_screen_info_lua'), '', {
        class: '',
        text: 'Lua Momery:' + info,
    });
}
function GameInfoTableChanged(table, key, data) {
    if (key == 'round_info') {
        // ShowTableDataOnScreen(key,data);
        $('#round_info').text = ($.Localize('#text_top_round') || 'ROUND %round%').replace('%round%', data.round || '?');
        ROUND = data.round;
        // SetTalentTreeNewLevelProgressBar(data.round);
        UpdateTalentTree(PORTRAIT_COURIER_PLAYER_ID);
        if (IsOBing() == true) {
            // 观战视角
            return;
        }
        var player_hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
        if (!Entities.IsAlive(player_hero)) {
            // 玩家已阵亡
            return;
        }
        if (ROUND == 5 || ROUND == 15 || ROUND == 25 || ROUND == 35) {
            $.Schedule(0.5, function () {
                ShowTalentTreeBox();
            });
        }
    }
    if (key == 'host_info') {
        ShowHostInfo();
    }
}

function QuestTableChanged(table, key, data) {
    if (key == 'show_quest') {
        // ShowTableDataOnScreen(key,data);
        if (data.quest && data.quest == BISCUIT_QUEST_ID) {
            for (var i in data.status) {
                var local_team = Players.GetTeam(Players.GetLocalPlayer());
                if (i == local_team) {
                    if (data.status[i] == 1) {
                        $('#quest_one_biscuit_tick').SetHasClass('invisible', false);
                    }
                    else {
                        $('#quest_one_biscuit_tick').SetHasClass('invisible', true);
                    }
                }
            }
        }
        else {
            $('#quest_bar').SetHasClass('invisible', true);
        }
    }
}
function PlayerInfoTableChanged(table, key, data) {
    if (key == 'player_info') {
        // ShowTableDataOnScreen(key,data);
        // 经济条：统计最大金钱
        var max_money = 0, max_width = 100;
        for (var i in data.data) {
            var info = data.data[i];
            var money = info.total_money;
            if (money > max_money) {
                max_money = money;
            }
        }
        if (max_money < 25) {
            max_money = 25;
        }
        max_width = max_money * 2;
        if (max_width < 50) {
            max_width = 50;
        }

        for (var i in data.data) {
            var info = data.data[i];
            var lineup_worth = info.lineup_value;
            var is_muted = Game.IsPlayerMuted(info.player_id);
            var is_local_player = Players.GetLocalPlayer() == info.player_id ? true : false;
            var player_name = Game.GetPlayerInfo(info.player_id).player_name;
            info.player_id = GetPlayerIndexByPlayerID(info.player_id);
            var player_id = info.player_id;

            if (player_id < 0 || player_id > 7) {
                //ob
                continue;
            }

            if (!info.chess_lineup) {
                // 空城
                info.chess_lineup = "";
            }
            if (info.chess_lineup != null) {
                var str = info.chess_lineup;
                // 显示阵容
                var chess_lineup_arr = str.split(',');
                var chess_arr = [];
                // 去除空的和无效的
                for (var j = 0; j < chess_lineup_arr.length; j++) {
                    if (chess_lineup_arr[j]) {
                        chess_arr.push(chess_lineup_arr[j]);
                    }
                }
                //排序
                chess_arr.sort(function (a, b) {
                    var score_b = 0;
                    var score_a = 0;

                    if (a.indexOf('11') > -1) {
                        score_a += 10000;
                    }
                    if (b.indexOf('11') > -1) {
                        score_b += 10000;
                    }
                    if (a.indexOf('1') > -1) {
                        score_a += 100;
                    }
                    if (b.indexOf('1') > -1) {
                        score_b += 100;
                    }
                    score_a += get_chess_cost(a);
                    score_b += get_chess_cost(b);

                    return score_b - score_a;
                });
                //显示i的阵容！
                var lineup_str = '';
                for (var j = 0; j < chess_arr.length; j++) {
                    var chess = chess_arr[j];
                    var chess_ori = chess;
                    var chess_star = 1;
                    var chess_star_str = "■";
                    var chess_level = 1;

                    if (chess.indexOf('11') > -1) {
                        chess_star = 3;
                        chess_star_str = "■■■";
                        chess = chess.substr(0, chess.length - 2);
                        chess_level = 9;
                    }
                    if (chess.indexOf('1') > -1) {
                        chess_star_str = "■■";
                        chess_star = 2;
                        chess = chess.substr(0, chess.length - 1);
                        chess_level = 3;
                    }
                    var chess_name = CHESS_2_HERO[chess];
                    var chess_index = j + 1;
                    // lineup_worth += chess_level * (CHESS_2_LEVEL[chess] || 1);
                    lineup_str += '<Panel style="width:40px;height:60px;flow-children:down;">';
                    lineup_str += '<DOTAHeroImage heroname="' + chess_name + '" heroimagestyle="icon" class="lineup_chess" id = "chess_lineup_' + (player_id + 1) + '_' + (j + 1) + '" style="" onmouseover="DOTAShowTextTooltip(\'' + $.Localize('#' + chess_ori) + '\')" onmouseout="DOTAHideTextTooltip()"/>';
                    lineup_str += '<Label id="chess_lineup_star_' + (player_id + 1) + '_' + (j + 1) + '" class="lineup_star"' + '"style="color:' + (LEVEL_2_COLOR[CHESS_2_LEVEL[chess]] || '#fff') + ';width:' + (chess_star * 7 + (chess_star - 1) * 3) + 'px;" text="' + chess_star_str + '"/>';
                    lineup_str += '</Panel>';

                    if (j > 10) {
                        break;
                    }
                }

                $('#player_details_lineup_' + player_id).RemoveAndDeleteChildren();
                // $('#player_details_lineup_' + player_id).BCreateChildren(lineup_str);
                CreateChildren($('#player_details_lineup_' + player_id), lineup_str);
            }

            // 渲染玩家详情面板
            $('#player_name_' + player_id).steamid = info.steam_id;
            $('#player_name_' + player_id).text = player_name
            $('#avatar_player_' + player_id).steamid = info.steam_id;

            $('#player_details_damage_' + player_id).text = (info.hero_damage || 0) + '-' + (info.hero_damaged || 0);
            $("#player_details_win_" + player_id).text = info.win_round + '-' + info.lose_round;
            $("#player_details_money_" + player_id).text = '$' + info.total_money;

            //更新经济条
            if ($('#panel_player_details_g_bar_' + player_id)) {

                var g_bar_width = (1.0 * info.total_money / max_money) * max_width;
                if (g_bar_width < 50) {
                    g_bar_width = 50;
                }
                if (g_bar_width > 1000) {
                    g_bar_width = 1000;
                }
                var lineup_worth_width = (1.0 * lineup_worth / max_money) * max_width;
                // if (lineup_worth_width < 50){
                //     lineup_worth_width = 50;
                // }
                if (lineup_worth_width > 1200) {
                    lineup_worth_width = 1200;
                }
                $('#panel_player_details_g_bar_bar_total_' + player_id).style['width'] = g_bar_width + 'px;';

                $('#panel_player_details_g_bar_bar_' + player_id).style['width'] = lineup_worth_width + 'px;';
                $('#panel_player_details_g_bar_text_' + player_id).text = '$' + lineup_worth;
                $('#panel_player_details_g_bar_text_' + player_id).style['margin-left'] = (lineup_worth_width + 5) + 'px;';

                // if (lineup_worth_width > 30){

                // }
                // else{
                //     $('#panel_player_details_g_bar_text_'+player_id).text = '';
                // }
                // $('#panel_player_details_g_bar_total_text_'+player_id).text = '$'+lineup_worth;
            }

            if (info.ban_synergy) {
                var str = '<DOTAAbilityImage id="player_details_ban_image_' + player_id + '" abilityname="' + info.ban_synergy + '" onmouseover="DOTAShowAbilityTooltip(' + info.ban_synergy + ')" onmouseout="DOTAHideAbilityTooltip()" hittest="true"/><Image src = "file://{resources}/images/custom_game/ban.png" hittest="false"/>';
                $('#player_details_ban_' + player_id).RemoveAndDeleteChildren();
                // $('#player_details_ban_' + player_id).BCreateChildren(str);
                CreateChildren($('#player_details_ban_' + player_id), str);
            }
            else {
                $('#player_details_ban_' + player_id).RemoveAndDeleteChildren();
            }

            // 圣物
            if (info.relic || info.relic_history) {
                var panel = $('#player_details_relic_' + player_id);
                ShowRelicAndRelicHistory(panel, info.relic, info.relic_history);
            }
            else {
                $('#player_details_relic_' + player_id).RemoveAndDeleteChildren();
            }

            // 天赋树
            InitTalentTreeNew('player_details_talent_tree_' + player_id, ROUND);
            if (info.talent_tree) {
                var talent_learned_list = [];
                var r = ROUND;
                if (r > 35) {
                    r = 35;
                }
                if (!r || r < 0) {
                    r = 0;
                }
                var max_unlock_level = Math.floor((r + 5) / 10);

                for (var i = 1; i <= max_unlock_level; i++) {
                    if (info.talent_tree[i]) {
                        talent_learned_list.push(info.talent_tree[i].split('_')[1]);
                    }
                }
                for (var i = 5; i <= 8; i++) {
                    if (info.talent_tree[i]) {
                        talent_learned_list.push(info.talent_tree[i].split('_')[1]);
                    }
                }
                // 点亮已经学习了的天赋
                var text = '';
                for (var i = 0; i < talent_learned_list.length; i++) {
                    var t = talent_learned_list[i];
                    SetTalentTreePipStatus('player_details_talent_tree_' + player_id, t, true);
                    text += '<font color="#fff">' + $.Localize('#talent_' + t + '_title') + '</font><font color="#bbb">: ' + $.Localize('#talent_' + t + '_description') + '</font>';
                    if (i < talent_learned_list.length - 1) {
                        text += '<br>';
                    }
                }
                // 微调样式
                // FindDotaHudElement('player_details_talent_tree_'+ player_id+'_level_progress').style['margin-bottom'] = '50px';
                // 鼠标悬停提示
                if (!text) {
                    text = '<font color="#bbb">' + $.Localize('#text_no_talent_tree') + '</font>';
                }
                SetPanelMouseOverText(FindDotaHudElement("player_details_talent_tree_" + player_id), text);
            }
            // 如果是我自己，更新天赋树选择面板
            if (is_local_player) {
                UpdateTalentTree(PORTRAIT_COURIER_PLAYER_ID);
            }

            if (!info.buff) {
                // 空城
                info.buff = "";
            }
            if (info.buff != null) {
                $('#player_details_buff_' + player_id).RemoveAndDeleteChildren();
                // $('#player_details_buff_' + player_id).BCreateChildren(GetShowBuffXML(info.buff));
                CreateChildren($('#player_details_buff_' + player_id), GetShowBuffXML(info.buff));
            }

            if (info.is_vip) {
                $('#avatar_player_vip_badge_' + player_id).SetHasClass('invisible', false);
                $('#avatar_player_vip_' + player_id).SetHasClass('invisible', false);
                RefreshVipTooltip($('#avatar_player_vip_badge_' + player_id), player_id, info.vip_info || info);
            }
            else {
                $('#avatar_player_vip_badge_' + player_id).SetHasClass('invisible', true);
                $('#avatar_player_vip_' + player_id).SetHasClass('invisible', true);
            }

            if (is_muted == true && !is_local_player) {
                // 屏蔽了这个玩家的聊天
                $('#player_details_blockchat_' + player_id).SetHasClass('invisible', false);
            }
            else {
                $('#player_details_blockchat_' + player_id).SetHasClass('invisible', true);
            }

        }
    }
}

function ToggleLegendaryBox() {
    $('#legendary_box').ToggleClass('show');
}

function close_legendary_box() {
    $('#legendary_box').SetHasClass('show', false);
}

function show_legendary_box() {
    $('#legendary_box').SetHasClass('show', true);
}

function flip_a_panel(panel_index, chess_name) {
    // var flip_deday = Math.random()*2+0.5;
    $.Schedule(0, function () {
        // 翻开的动画
        $('#flip_' + panel_index).SetHasClass('unturn', false);
        // Game.EmitSound("card.flip");

        $.Schedule(0.3, function () {
            $('#frontend_' + panel_index).SetHasClass('invisible', false);
            $('#backend_' + panel_index).SetHasClass('invisible', true);
            Game.EmitSound("card.flip");
            // GameEvents.SendCustomGameEventToServer( "show_game_notice", 
            // {
            //     "hehe": Date.now(),
            //     "text": ''+$.Localize('#'+chess_name)+' '+$.Localize('#'+'join_the_game'),
            // });

            OnShowDrodoChat({
                type: 'chess_event',
                chess: chess_name,
                text: 'join_the_game',
            });
        });
    })
}

var legendary_list = {};
var relic_list = {};

function show_legendary_tips(index, pos) {
    index = index + 1;
    if (legendary_list[index]) {
        var chess = legendary_list[index];
        var title = '<font color="#e4ae39">' + $.Localize('#' + chess) + '</font>';
        var text_ori = CHESS_2_SPEC_CLASS[chess].split(',');

        var text = '';
        for (var i = 0; i < text_ori.length; i++) {
            text += $.Localize('#' + 'DOTA_Tooltip_ability_' + text_ori[i]);
            if (i != text_ori.length - 1) {
                text += ' / ';
            }
        }
        $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), title, text);
    }
}
function GrayALegendaryChess(chess, tf) {
    // var fff = FindDotaHudElement('panel_legendary_container');
    // if (fff) {
    //     var xxx = fff.FindChildrenWithClassTraverse('legendary_box_' + chess);
    //     for (var ii in xxx) {
    //         if (xxx[ii]) {
    //             xxx[ii].SetHasClass('unavailable', tf);
    //         }
    //     }
    // }
}

function SetLegendaryChessStatus(g_arr, is_relic) {
    if (!g_arr) {
        return;
    }
    for (var i in g_arr) {
        if (g_arr[i] && $("#" + g_arr[i])) {
            // if (is_relic){
            $("#" + g_arr[i]).SetHasClass('unavailable', true);
            GrayALegendaryChess(g_arr[i], true);
            // }
            // else{
            //    $("#" + g_arr[i]).SetHasClass('unavailable', true); 
            // }
        }
    }
}
function RefillChessInPanel(keys) {
    if (!CheckClientKey(keys.key)) return;
    if (keys.chess && $("#" + keys.chess)) {
        $("#" + keys.chess).SetHasClass('banned', false);
        $("#" + keys.chess).SetHasClass('unavailable', false);
    }
}
function SetDestroyedChessStatus(g_arr) {
    if (!g_arr) {
        return;
    }
    for (var i in g_arr) {
        if (g_arr[i] && $("#" + g_arr[i])) {
            $("#" + g_arr[i]).SetHasClass('banned', true);
            GrayALegendaryChess(g_arr[i], true);
        }

    }
}
var BANNED_TABLE;
function SetBannedChessStatus(g_arr) {
    if (!g_arr) {
        return;
    }
    BANNED_TABLE = g_arr;
    for (var i in g_arr) {
        if (g_arr[i] && $("#" + g_arr[i])) {
            $("#" + g_arr[i]).SetHasClass('banned', true);
            GrayALegendaryChess(g_arr[i], true);
        }
    }
}
function UnsetBannedChessStatus() {
    if (!BANNED_TABLE) {
        return;
    }
    for (var i in BANNED_TABLE) {
        if (BANNED_TABLE[i] && $("#" + BANNED_TABLE[i])) {
            $("#" + BANNED_TABLE[i]).SetHasClass('banned', false);
            GrayALegendaryChess(BANNED_TABLE[i], false);
        }
    }
    BANNED_TABLE = null;
}

function ChessPoolTableChanged(table, key, data) {
    if (key == 'legendary_info') {
    }

    if (key == 'destroy_info') {
        SetDestroyedChessStatus(data);
    }
    if (key == 'revealed_legendary_chess_list') {
        ShowRevealedLegendaryChessList();
    }
}

function SetLegendaryChessAndRelicInfo(data) {
    if (!data || !data.chess_banned) {
        return;
    }
    var g_arr = data.chess_banned;
    SetLegendaryChessStatus(g_arr);

    var r_arr = data.relic_banned;
    SetLegendaryChessStatus(r_arr, true);

    if (data.chess_active) {
        if (!legendary_list) {
            legendary_list = {};
        }
        $('#legendary_box').SetHasClass('show', true);
        // for (var j in data.chess_active) {
        //     var chess = data.chess_active[j];
        //     if ($('#movie_legendary_box_' + (j - 1))) {
        //         $('#movie_legendary_box_' + (j - 1)).heroname = CHESS_2_HERO[chess];
        //     }
        //     legendary_list[j] = chess;

        //     var spec_class = CHESS_2_SPEC_CLASS[chess];
        //     if (spec_class && $('#bottom_bar_legendary_box_' + (j - 1))){
        //         var bottom_bar = $('#bottom_bar_legendary_box_' + (j - 1));
        //         bottom_bar.RemoveAndDeleteChildren();
        //         var spec_class_arr = spec_class.split(',');
        //         for (var k=0;k<spec_class_arr.length;k++){
        //             var spec_class_one = spec_class_arr[k];
        //             $.CreatePanel('DOTAAbilityImage', bottom_bar, '', {
        //                 class: 'ability_grid',
        //                 abilityname: spec_class_one,
        //                 onmouseover: "DOTAShowAbilityTooltip('"+spec_class_one+"')",
        //                 onmouseout: "DOTAHideAbilityTooltip()",
        //             });
        //         }
        //     }

        //     if ($('#flip_' + (j - 1)) && $('#flip_' + (j - 1)).BHasClass('unturn') == true) {
        //         flip_a_panel((j - 1), data.chess_active[j]);
        //     }

        //     $('#panel_legendary_box_'+ (j - 1)).AddClass('legendary_box_'+chess);
        // }
    }

    if (data.relic_active) {
        if (!relic_list) {
            relic_list = {};
        }
        for (var j in data.relic_active) {
            if ($('#relic_active_' + (j - 1))) {
                $('#relic_active_' + (j - 1)).itemname = data.relic_active[j];
                $('#relic_active_' + (j - 1)).AddClass('legendary_box_' + data.relic_active[j]);
            }
            relic_list[j] = data.relic_active[j];

            // if ($('#flip_'+(j-1)) && $('#flip_'+(j-1)).BHasClass('unturn') == true){
            //     flip_a_panel((j-1),data.relic_active[j]);
            // }
        }
    }

    // 

}


function ShowAllPlayerInfo(data) {
    if (!data) {
        data = CustomNetTables.GetTableValue("dac_table", 'player_info');
        if (!data || !data.info) {
            return;
        }
    }
    for (var i in data.info) {
        var badge = GetBadgeByPlayerID(data.info[i].player_id) || data.info[i].badge;
        var player_name = Game.GetPlayerInfo(data.info[i].player_id).player_name;

        data.info[i].player_id = GetPlayerIndexByPlayerID(data.info[i].player_id);
        var player_id = data.info[i].player_id;
        if (player_id < 0 || player_id > 7) {
            //ob
            continue;
        }
        var is_local_player = (i == Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid);
        // 本地玩家刚激活成功时，服务端 net table 可能还是旧数据，这里用本地标记兜底
        var vip_now = data.info[i].is_vip || (LOCAL_VIP_ACTIVATED && is_local_player);
        if (is_local_player) {
            // 显示任务信息
            ShowQuestInfo(data.info[i].vip_info);
            // 商城顶栏的通行证图标
            UpdateStorePassIcon(data.info[i].is_vip, data.info[i].vip_info || data.info[i]);
        }
        if ($('#panel_player_board_' + data.info[i].player_id)) {
            $('#panel_player_board_' + data.info[i].player_id).SetHasClass('invisible', false);
            $('#panel_player_board_' + data.info[i].player_id).style['opacity'] = '1';
        }

        // $("#button_board_right").SetHasClass('invisible',false);

        if ($('#avatar_player_' + data.info[i].player_id)) {
            $('#avatar_player_' + data.info[i].player_id).steamid = i;
        }

        if (vip_now) {
            $('#avatar_player_vip_badge_' + data.info[i].player_id).SetHasClass('invisible', false);
            $('#avatar_player_vip_' + data.info[i].player_id).SetHasClass('invisible', false);
            RefreshVipTooltip($('#avatar_player_vip_badge_' + data.info[i].player_id), data.info[i].player_id, data.info[i].vip_info || data.info[i]);
        }
        else {
            $('#avatar_player_vip_badge_' + data.info[i].player_id).SetHasClass('invisible', true);
            $('#avatar_player_vip_' + data.info[i].player_id).SetHasClass('invisible', true);
        }


        if (badge) {
            // if (badge.indexOf('bet_') > -1) {
            //     var bet_team_index = parseInt(badge.split('_')[1]);
            //     var bet_team = TI9_TEAM_LIST[bet_team_index];
            //     $('#panel_badge_' + data.info[i].player_id).style['background-image'] = "url('" + bet_team.pic + "')";
            //     $('#panel_badge_' + data.info[i].player_id).style['width'] = "90px";
            //     $('#panel_badge_' + data.info[i].player_id).style['height'] = "90px";
            //     $('#panel_badge_' + data.info[i].player_id).style['margin-top'] = "10px";
            //     $('#panel_badge_' + data.info[i].player_id).style['margin-left'] = "5px";
            //     if (badge != 'donnot_show_badge') {
            //         SetPanelMouseOverTitleText('#panel_badge_' + data.info[i].player_id, $.Localize('#' + "team_badge") + bet_team.name, $.Localize('#' + 'team_badge_text'));
            //     }
            // }
            // else {
                if ($('#panel_badge_' + data.info[i].player_id)) {
                    $('#panel_badge_' + data.info[i].player_id).style['background-image'] = "url('file://{images}/custom_game/badges/" + badge + ".png')";
                }

                if (badge != 'donnot_show_badge') {
                    SetPanelMouseOverTitleText('#panel_badge_' + data.info[i].player_id, $.Localize('#' + 'badge_title_' + badge), $.Localize('#' + 'badge_text_' + badge));
                }
            // }

        }
        if (player_id == 0) {
            $('#avatar_player_0').SetPanelEvent("onactivate",
                function () { change_camera_2_player_ground(0); }
            );
        }
        if (player_id == 1) {
            $('#avatar_player_1').SetPanelEvent("onactivate",
                function () { change_camera_2_player_ground(1); }
            );
        }
        if (player_id == 2) {
            $('#avatar_player_2').SetPanelEvent("onactivate",
                function () { change_camera_2_player_ground(2); }
            );
        }
        if (player_id == 3) {
            $('#avatar_player_3').SetPanelEvent("onactivate",
                function () { change_camera_2_player_ground(3); }
            );
        }
        if (player_id == 4) {
            $('#avatar_player_4').SetPanelEvent("onactivate",
                function () { change_camera_2_player_ground(4); }
            );
        }
        if (player_id == 5) {
            $('#avatar_player_5').SetPanelEvent("onactivate",
                function () { change_camera_2_player_ground(5); }
            );
        }
        if (player_id == 6) {
            $('#avatar_player_6').SetPanelEvent("onactivate",
                function () { change_camera_2_player_ground(6); }
            );
        }
        if (player_id == 7) {
            $('#avatar_player_7').SetPanelEvent("onactivate",
                function () { change_camera_2_player_ground(7); }
            );
        }

        $('#player_name_' + player_id).steamid = i;
        $('#player_name_' + player_id).text = player_name;
        $('#avatar_player_' + player_id).steamid = i;

        var team = Players.GetTeam(data.info[i].player_id);
        var local_id = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
        if (data.info[i].zhugong) {
            data.info[i].onduty_hero = data.info[i].zhugong;
        }
        if (data.info[i].onduty_hero) {
            $('#pic_player_hero_' + player_id).style['background-image'] = "url('file://{images}/custom_game/skaters/" + (data.info[i].onduty_hero) + ".png')";
        }

        var level = data.info[i].mmr_level;
        var queen_rank = data.info[i].queen_rank;

        if (Game.GetMapInfo().map_display_name == 'candy_5_1x8') {
            // 糖果竞赛模式：显示糖果数
            $('#pic_player_level_' + data.info[i].player_id).style['background-image'] = "url('file://{images}/custom_game/candy.png')";
            $('#pic_player_level_' + data.info[i].player_id).style['margin-left'] = '48px';
            $('#pic_player_level_' + data.info[i].player_id).style['width'] = '27px';
            $('#pic_player_level_' + data.info[i].player_id).style['height'] = '27px';
            var candy_count = (data.info[i].candy ? data.info[i].candy : 0)
            $('#text_player_level_' + data.info[i].player_id).text = " × " + candy_count;
            $('#text_player_level_' + data.info[i].player_id).style['margin-left'] = '75px';
            $('#text_player_level_' + data.info[i].player_id).style['font-size'] = '18px';
            if (data.info[i].candy && data.info[i].candy > 5) {
                $('#text_player_level_' + data.info[i].player_id).style['color'] = '#fff';
            }
            else {
                $('#text_player_level_' + data.info[i].player_id).style['color'] = '#bbb';
            }
        }
        else {
            // 天梯/休闲模式：显示段位
            $('#pic_player_level_' + data.info[i].player_id).style['background-image'] = "url('file://{images}/custom_game/level_" + level + ".png')";
            if (level >= 38 && queen_rank) {
                $('#text_player_level_' + data.info[i].player_id).text = $.Localize('#' + 'text_player_level_' + level) + '#' + queen_rank;
            }
            else {
                $('#text_player_level_' + data.info[i].player_id).text = $.Localize('#' + 'text_player_level_' + level);
            }

            if (level > 0) {
                $('#text_player_level_' + data.info[i].player_id).style['color'] = '#fff';
            }
            else {
                $('#text_player_level_' + data.info[i].player_id).style['color'] = '#bbb';
            }
        }
    }
}
function HideDamageStat(keys) {
    $("#board_left").SetHasClass('invisible', true);
}
function UserPanelRanking(keys) {
    // ShowTableDataOnScreen('event:user_ranking',keys.table)
    var arr = [];
    for (var d in keys.table) {
        keys.table[d].steamid = d;
        keys.table[d].score = 1000000 * keys.table[d].hp + 1000 * (10 - (keys.table[d].rank || 0)) + (keys.table[d].p2team || keys.table[d].player_id);
        arr.push(keys.table[d]);
    }
    arr.sort(function (a, b) { return b.score - a.score });

    var my_p2team;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < 8; j++) {
            if (arr[i].player_id == Players.GetLocalPlayer() && arr[i].p2team) {
                my_p2team = arr[i].p2team;
            }
        }
    }
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < 8; j++) {
            var team_index = GetPlayerIndexByPlayerID(arr[i].player_id);
            if (team_index == j) {
                // SetPlayerPanelPosition(arr[i].player_id, i);
                $('#outer_player_board_' + j).style['position'] = '0px ' + i * 92 + 'px 0px';
                if (arr[i].p2team) {
                    $('#p2team_flag_' + j).SetImage('file://{resources}/images/custom_game/p2team_' + arr[i].p2team + '.png');
                    $('#p2team_flag_' + j).SetHasClass('invisible', false);
                    // $('#panel_player_board_'+j).style['opacity'] = '1';

                    if (my_p2team == arr[i].p2team && (Game.GetMapInfo().map_display_name == 'casual_2x4' || Game.GetMapInfo().map_display_name == 'ranked_2x4')) {
                        HighLightPlayerHPBar(j);
                    }
                }
            }
        }
    }
    $("#button_board_right").SetHasClass('invisible', false);
}
function DACTableChanged(table, key, data) {
    if (key == 'cdkey') {
        var steamid = data.steam_id;
        var local_id = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
        var cdkey = data.text;
        if (local_id == steamid) {
            ActivateCDKEY(cdkey);
        }
    }
    if (key == 'user_panel_ranking') {
    }
    // 个人信息显示
    if (key == 'player_info') {
        ShowAllPlayerInfo(data);
        refresh_shop_v5();
    }

    if (key == "show_all_player_connect_status") {
        for (var i in data.table) {
            var player_index = GetPlayerIndexByPlayerID(i);

            if (data.table[i] == false) {
                if ($("#outer_player_board_" + player_index)) {
                    $("#outer_player_board_" + player_index).style["opacity"] = "0.3";
                }
            }
            else {
                if ($("#outer_player_board_" + player_index)) {
                    $("#outer_player_board_" + player_index).style["opacity"] = "1";
                }
            }
        }
    }
}

function RankingTopTableChanged(table, key, data) {
    if (key == 'ranking_top') {
        // ShowTableDataOnScreen(key,data);
        UpdateRankingTop(data);
        
    }
}

function tips_over(t, pos) {
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize('#' + t + '_title'), $.Localize('#' + t));
}
function tips_over_guide(t, pos) {
    $.DispatchEvent("DOTAShowTextTooltip", $("#" + pos), $.Localize('#' + t + '_title'));
}
function tips_out() {
    $.DispatchEvent("DOTAHideTitleTextTooltip");
    $.DispatchEvent("DOTAHideTextTooltip");
}

// 抽牌面板
var MY_DRAW_CHESS_LIST = {};

//抽牌列表兜底：服务端某些流程（重连重新弹抽牌面板等）下发的 show_draw_card 里没有 chesses，
//直接把 MY_DRAW_CHESS_LIST 赋成 undefined 后，后面任何 MY_DRAW_CHESS_LIST[x] 都会抛
// "Cannot set properties of undefined"，所以读写前统一走这个函数
function EnsureDrawChessList() {
    if (!MY_DRAW_CHESS_LIST || typeof MY_DRAW_CHESS_LIST !== 'object') {
        MY_DRAW_CHESS_LIST = {};
    }
    return MY_DRAW_CHESS_LIST;
}
var IS_PANEL_DRAW_CARD_SHOW = false;
var IS_PANEL_DRAW_CARD_LOCKED = false;
var IS_PANEL_PLAYER_DETAILS_SHOW = false;

function chess2specclass(chess) {
    var arr = CHESS_2_SPEC_CLASS[chess].split(',');
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        arr2.push($.Localize('#DOTA_Tooltip_ability_' + arr[i]));
    }
    return arr2.join(' / ');
}

// 购买第index个棋子
function request_buy_chess(index) {
    if (!EnsureDrawChessList()[index + 1]) {
        return;
    }
    var is_money_enough = check_buy_available(index);
    if (typeof (is_money_enough) == 'number') {
        // 请求购买
        GameEvents.SendCustomGameEventToServer("request_buy_chess", {
            "buy_index": index + 1,
        });
        $('#image_reroll_draw').SetHasClass('invisible', true);
        $('#image_refresh').SetHasClass('invisible', false);
        REROLL_STATUS = null;
    }
    else {
        OnMima({ text: "text_mima_no_" + is_money_enough, key: CLIENT_KEY });
    }
}
function OnRequestBuyChessCb(keys) {
    if (!CheckClientKey(keys.key)) return;
    // 购买棋子成功
    var buy_index = keys.buy_index;
    Game.EmitSound("General.Buy");

    $('#panel_hero_draw_card_' + (buy_index - 1)).style['opacity'] = '0';

    // 重新渲染手牌
    // LEVEL_ONE_CHESS += MY_DRAW_CHESS_LIST[buy_index]+',';
    set_draw_card_status();

    $('#panel_draw_card_guangzhao_' + (buy_index - 1)).SetHasClass('invisible', true);
    EnsureDrawChessList();
    MY_DRAW_CHESS_LIST[buy_index] = null;
    // 选中自己棋手
    GameUI.SelectUnit(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), false);

    Game.EmitSound("ui.crafting_newslot");
    IS_PANEL_DRAW_CARD_LOCKED = false;
    $("#image_lock").SetImage("file://{images}/custom_game/unlock.png");
    $("#image_lock").style['opacity'] = '0.1';
    GameEvents.SendCustomGameEventToServer("unlock_chess", { "team": Players.GetTeam(Players.GetLocalPlayer()) });
}


var LEVEL_ONE_CHESS = '';
var REROLL_STATUS;
var SHOW_DRAE_CARD_CD = false; // 并发延迟处理，防止DOTAScenePanel加载中就刷新导致的黑屏bug
function OnShowDrawCard(keys) {
    if (!CheckClientKey(keys.key)) return;
    if (SHOW_DRAE_CARD_CD) {
        $.Schedule(0.2, function () {
            OnShowDrawCard(keys);
        });
        return;
    }
    else {
        ShowDrawCard(keys);
        SHOW_DRAE_CARD_CD = true;
        $.Schedule(0.8, function () {
            SHOW_DRAE_CARD_CD = false;
        });
    }
}


var SHOW_DRAW_CARD_STAR = 1;
function ShowDrawCard(keys) {
    if (keys.unlock == true) {
        Game.EmitSound("ui.crafting_newslot");
        IS_PANEL_DRAW_CARD_LOCKED = false;
        $("#image_lock").SetImage("file://{images}/custom_game/unlock.png");
        $("#image_lock").style['opacity'] = '0.1';
        // $("#image_lock").SetHasClass('unavailable',true);
    }
    if (keys.auto_unlock == true) {
        Game.EmitSound("ui.crafting_newslot");
        IS_PANEL_DRAW_CARD_LOCKED = false;
        $("#image_lock").SetImage("file://{images}/custom_game/unlock.png");
        $("#image_lock").style['opacity'] = '0.1';
        // $("#image_lock").SetHasClass('unavailable',true);
        return;
    }
    if (keys.lock == true) {
        IS_PANEL_DRAW_CARD_LOCKED = true;
        $("#image_lock").SetImage("file://{images}/custom_game/lock.png");
        $("#image_lock").style['opacity'] = '1';
        // $("#image_lock").SetHasClass('unavailable',true);
    }
    //keys.unlock=0不表示不解锁，是表示是使用物品强制重抽的
    if (keys.reroll_status && (!REROLL_STATUS || keys.unlock == 0) && HasModifier('modifier_item_second_chance')) {
        $('#image_reroll_draw').SetHasClass('invisible', false);
        $('#image_refresh').SetHasClass('invisible', true);
        REROLL_STATUS = keys.reroll_status;
    }
    else {
        $('#image_reroll_draw').SetHasClass('invisible', true);
        $('#image_refresh').SetHasClass('invisible', false);
        REROLL_STATUS = null;
    }
    LEVEL_ONE_CHESS = keys.level_one_chess;

    //服务端可能没带 chesses（重连等），兜底成空表
    MY_DRAW_CHESS_LIST = (keys.chesses && typeof keys.chesses === 'object') ? keys.chesses : {};
    show_panel_draw_card();
    GameUI.SelectUnit(-1, false);
}

function check_buy_available(index) {
    var c = EnsureDrawChessList()[index + 1];
    if (!c) {
        return 'no_chess';
    }
    var price = c.price;
    var my_gold = MY_GOLD || Math.round(Entities.GetMana(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())));
    var my_rm_token = MY_RM_TOKEN || 0;
    var my_gold_token = MY_GOLD_TOKEN || 0;
    var my_common_token = MY_COMMON_TOKEN || 0;
    var money = c.money || 'gold';
    var is_money_enough = money;
    if (money == 'gold') {
        if (price > my_gold) {
            is_money_enough = money;
        }
        else {
            is_money_enough = 1;
            var price_before = c.old_price || CHESS_2_LEVEL[c.chess];
            if (price_before > price) {
                is_money_enough = 2;
            }
            if (price_before < price) {
                is_money_enough = 3;
            }
        }
    }
    else if (money == 'rm_token') {
        if (price > my_rm_token) {
            is_money_enough = money;
        }
        else {
            is_money_enough = 1;
        }
    }
    else if (money == 'common_token') {
        if (price > my_common_token) {
            is_money_enough = money;
        }
        else {
            is_money_enough = 1;
        }
    }
    else if (money == 'gold_token') {
        if (price > my_gold_token) {
            is_money_enough = money;
        }
        else {
            is_money_enough = 1;
            var price_before = c.old_price;
            if (price_before > price) {
                is_money_enough = 2;
            }
        }
    }
    return is_money_enough;
}
function set_draw_card_status() {
    if (MY_DRAW_CHESS_LIST) {
        for (var i = 0; i <= 4; i++) {
            var c = MY_DRAW_CHESS_LIST['' + (i + 1)];
            if (c) {
                var is_money_enough = check_buy_available(i)
                if (typeof (is_money_enough) == 'string') {
                    $('#text_draw_card_price_' + i).style['color'] = '#ff4444';
                }
                else if (is_money_enough == 1) {
                    $('#text_draw_card_price_' + i).style['color'] = '#ffffff';
                }
                else if (is_money_enough == 2) {
                    $('#text_draw_card_price_' + i).style['color'] = '#66dd66';
                }
                else if (is_money_enough == 3) {
                    $('#text_draw_card_price_' + i).style['color'] = '#ff44aa';
                }

                if (c.chess && LEVEL_ONE_CHESS) {
                    // 检查LEVEL_ONE_CHESS中是否有MY_DRAW_CHESS_LIST[i]，有的话亮灯i
                    var level_one_chess_list = LEVEL_ONE_CHESS.split(',');
                    var is_guangzhao = false;
                    for (var ii = 0; ii < level_one_chess_list.length; ii++) {
                        var one = level_one_chess_list[ii];
                        if (c.chess == one || (c.chess + '1') == one || (c.chess + '11') == one) {
                            is_guangzhao = true;
                        }
                    }

                    if (is_guangzhao) {
                        $('#panel_draw_card_guangzhao_' + i).SetHasClass('invisible', false);
                        $('#text_draw_card_price_' + i).text = ' × ' + c.price;
                    }
                    else {
                        $('#panel_draw_card_guangzhao_' + i).SetHasClass('invisible', true);
                    }
                }
            }
        }
    }
}
var MY_GOLD = 0;
var MY_RM_TOKEN = 0;
var MY_GOLD_TOKEN = 0;
var MY_COMMON_TOKEN = 0;
function OnShowGold(keys) {
    if (!CheckClientKey(keys.key)) return;

    if (keys.lose_streak && keys.lose_streak > 0) {
        ShowWinLoseStreak(-keys.lose_streak);
    }
    else if (keys.win_streak && keys.win_streak > 0) {
        ShowWinLoseStreak(keys.win_streak);
    }
    else {
        ShowWinLoseStreak(0);
    }

    // 计算连胜、连败的奖励
    STREAK_BOX = keys.box_level;

    WL_STREAK = 0;
    lose_streak_anwei = 0;
    if (keys.lose_streak && keys.lose_streak >= 1) {
        WL_STREAK = keys.lose_streak;
        if (keys.lose_streak >= 1 && keys.lose_streak < 4) {
            lose_streak_anwei = 1;
        }
        if (keys.lose_streak >= 4 && keys.lose_streak < 9) {
            lose_streak_anwei = 2;
            WL_STREAK = 1;
        }
        if (keys.lose_streak >= 9) {
            lose_streak_anwei = 3;
        }

    }
    win_streak_anwei = 0;
    if (keys.win_streak && keys.win_streak >= 1) {
        WL_STREAK = keys.win_streak;
        if (keys.win_streak >= 1 && keys.win_streak < 4) {
            win_streak_anwei = 1;
        }
        if (keys.win_streak >= 4 && keys.win_streak < 9) {
            win_streak_anwei = 2;
        }
        if (keys.win_streak >= 9) {
            win_streak_anwei = 3;
        }
    }

    if (keys.gold || keys.gold == 0) {
        $('#gold_count').text = Math.round(keys.gold);
        MY_GOLD = Math.round(keys.gold);
        ShowLixi();
    }
    else {
        if (Players.GetLocalPlayer() || Players.GetLocalPlayer() == 0) {
            $('#gold_count').text = Math.round(Entities.GetMana(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())));
            MY_GOLD = Math.round(Entities.GetMana(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())));
            ShowLixi();
        }
    }
    if (keys.level_one_chess) {
        LEVEL_ONE_CHESS = keys.level_one_chess;
    }

    set_draw_card_status();
}
function lock_panel_draw_card() {
    if (IS_PANEL_DRAW_CARD_LOCKED) {
        Game.EmitSound("ui.crafting_newslot");
        IS_PANEL_DRAW_CARD_LOCKED = false;
        $("#image_lock").SetImage("file://{images}/custom_game/unlock.png");
        $("#image_lock").style['opacity'] = '0.1';
        GameEvents.SendCustomGameEventToServer("unlock_chess", { "team": Players.GetTeam(Players.GetLocalPlayer()) });
    }
    else {
        Game.EmitSound("ui.crafting_gem_drop");
        IS_PANEL_DRAW_CARD_LOCKED = true;
        $("#image_lock").SetImage("file://{images}/custom_game/lock.png");
        $("#image_lock").style['opacity'] = '1';
        GameEvents.SendCustomGameEventToServer("lock_chess", { "team": Players.GetTeam(Players.GetLocalPlayer()) });
    }
}
function OnMouseInTips(pos, title, text) {
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize('#' + title), $.Localize('#' + text));
}
function OnMouseOutTips() {
    $.DispatchEvent("DOTAHideTitleTextTooltip");
}

function get_chess_cost(chess) {
    var chess_name = chess;
    if (chess_name.indexOf('11') > -1) {
        chess_name = chess_name.substr(0, chess_name.length - 2);
    }
    if (chess_name.indexOf('1') > -1) {
        chess_name = chess_name.substr(0, chess_name.length - 1);
    }
    return CHESS_2_LEVEL[chess_name] || 0;
}



var keys = [
    '968CE0A7C36CA9440441899F19C1707F',
    '990E299A833D8BCDCDE781ED98192574',
    'D90B5894B88D6FF32D3D39F8C5AE0060',
    '7F14C3F4EC674A7C72AA8A7C1BF17C03',
    '5EF7E4AC4FCAC916C6BE712D696D2854',
    '1DB32B03E887FF71A59E5C7481087DB2',
];
var key = keys[Math.floor(Math.random() * 6)];


function refresh_chess() {
    GameEvents.SendCustomGameEventToServer("dac_refresh_chess", {
        "team": Players.GetTeam(Players.GetLocalPlayer())
    });
}
function reroll_panel_draw_card(reroll_status) {
    Game.EmitSound("item.multicast");

    GameEvents.SendCustomGameEventToServer("dac_refresh_chess", {
        "team": Players.GetTeam(Players.GetLocalPlayer()),
    });
}
function toggle_panel() {
    ShowExclusionWindow('panel_draw_card');
}

var STORE_CD_VER = 0, QUEST_CD_VER = 0;
var MY_ONDUTY_HERO = '', MY_HERO_LIST = null, MY_ONDUTY_HERO_INDEX = null;
var MY_EMOTION_LIST = null;

function refresh_shop_manual() {
    if (!$('#refresh_empty_shop').BHasClass('unavailable')) {
        refresh_shop_v5();
        $('#refresh_empty_shop').SetHasClass('unavailable', true);
        $.Schedule(10, function () {
            $('#refresh_empty_shop').SetHasClass('unavailable', false);
        });
    }
}

function refresh_shop_v5() {
    SendHTTP('refresh_shop_v5', 'refresh_shop_v5_cb', { language: $.Language() }, 1);
}

function buy_courier() {
    SendHTTP('buy_courier', 'buy_courier_cb', { hero: GOODS }, 1);
    close_confirm();
    refresh_shop_v5();
}
function buy_effect() {
    SendHTTP('buy_effect', 'buy_effect_cb', { hero: GOODS }, 1);
    close_confirm();
    refresh_shop_v5();
}
function buy_projectile() {
    SendHTTP('buy_projectile', 'buy_projectile_cb', { hero: GOODS }, 1);
    close_confirm();
    refresh_shop_v5();
}
function buy_pet() {
    SendHTTP('buy_pet', 'buy_pet_cb', { hero: GOODS }, 1);
    close_confirm();
    refresh_shop_v5();
}
function buy_animation() {
    SendHTTP('buy_animation', 'buy_animation_cb', { hero: GOODS }, 1);
    close_confirm();
    refresh_shop_v5();
}
function buy_emotion() {
    SendHTTP('buy_emotion', 'buy_emotion_cb', { hero: GOODS }, 1);
    close_confirm();
    refresh_shop_v5();
}
function buy_chessboard() {
    SendHTTP('buy_chessboard', 'buy_chessboard_cb', { hero: GOODS }, 1);
    close_confirm();
    refresh_shop_v5();
}
function shop_v5_buy() {
    $.Msg('shop_v5_buy:'+GOODS);
    SendHTTP('shop_v5_buy', 'shop_v5_buy_cb', { item: GOODS }, 1);
    close_confirm();
    // refresh_shop_v5();
}

var click_cd = false;
var showing_courier = null;
var SELECTED_COURIER_INDEX = null;
var SELECTED_COURIER = null;
function choose_hero(hid, index) {
    showing_courier = hid;
    SELECTED_COURIER = hid;

    set_showing_courier(hid, index);

    // show_can_merge_status(MY_HERO_LIST, hid);
    // refresh_shop_goods_status();

    if (MY_ONDUTY_HERO == hid) {
        $('#icon_my_equiped').SetHasClass('invisible', false);
    }
    else {
        $('#icon_my_equiped').SetHasClass('invisible', true);
    }

    if (MY_ONDUTY_HERO != hid && !click_cd) {
        // 选了一个不是当前信使的，并且本局没有换过信使
        $('#button_use_courier').SetHasClass('unavailable', false);
    }
    else {
        $('#button_use_courier').SetHasClass('unavailable', true);
    }
}
function set_curr_courier() {
    if (!click_cd && !$('#button_use_courier').BHasClass('unavailable')) {
        click_cd = true;
        $('#button_use_courier').SetHasClass('unavailable', true);
        SendHTTP('choose_hero', 'change_zhugong_cb', { hero: showing_courier }, 1);
        show_notice_choose_courier(showing_courier);

        $.Schedule(30, function () {
            click_cd = false;
            if (MY_ONDUTY_HERO == SELECTED_COURIER) {
                $('#icon_my_equiped').SetHasClass('invisible', false);
            }
        });
    }
}
function set_curr_chessboard() {
    if (!click_cd && !$('#button_use_chessboard').BHasClass('unavailable') && MY_SELECT_CHESSBOARD && MY_SELECT_CHESSBOARD != MY_CURR_CHESSBOARD) {
        click_cd = true;
        $('#button_use_chessboard').SetHasClass('unavailable', true);
        SendHTTP('choose_chessboard', 'change_chessboard_cb', { hero: MY_SELECT_CHESSBOARD }, 1);
        $.Schedule(30, function () {
            click_cd = false;
            $('#button_use_chessboard').SetHasClass('unavailable', false);
        });
    }
}

function show_notice_choose_courier(c) {
    Game.EmitSound("dac.chat");
    var player_name = Players.GetPlayerName(Players.GetLocalPlayer());
    var hero_name = c.split('_')[0];
    var color = COLOR_STR[hero_name.slice(1, 2)];
    var level_exp = c.split('_')[2] || 1;
    var level = parseInt(level_exp);
    // GameEvents.SendCustomGameEventToServer( "show_game_notice", 
    // {
    //     "hehe": Date.now(),
    //     "text": player_name+' '+$.Localize('#'+'tips_is_using_courier')+' <font color="'+color+'">'+$.Localize('#'+hero_name)+'</font>(Lv.'+level+')',
    // });
}

function confirm_merge_courier() {
    if ($('#button_merge_courier').BHasClass('unavailable')) {
        return;
    }
    show_confirm($.Localize('#' + 'text_confirm_merge_courier'), function () {
        merge_curr_courier();
    });
}
function merge_curr_courier() {
    close_confirm();
    if (CAN_MERGE_COUNT > 0 && !$('#button_merge_courier').BHasClass('unavailable')) {
        $('#button_merge_courier').SetHasClass('unavailable', true);
        CAN_MERGE_COUNT = 0;
        SendHTTP('merge_hero', 'merge_zhugong_cb', { hero: showing_courier }, 1);
    }
}

function lottery_go() {
    SendHTTP('lottery_go', 'lottery_cb', {}, 1);
    close_confirm();
}

function time2showtime(t) {
    if (t > 6039) t = 6039;
    var m = 0, s = 0;
    if (!t) return "00:00";

    t = parseInt(t);
    m = Math.floor(t / 60);
    s = t - m * 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
}
function time2showtime_hour(t) {
    if (t > 362439) t = 362439;
    var h = 0, m = 0, s = 0;
    if (!t) return "00:00:00";

    t = parseInt(t);
    h = Math.floor(t / 3600);
    m = Math.floor((t - h * 3600) / 60);
    s = t - h * 3600 - m * 60;

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return h + ':' + m + ':' + s;
}
// 汰换信使
function confirm_recycle_hero() {
    if ($('#button_recycle_courier').BHasClass('unavailable')) {
        return;
    }
    var hero = SELECTED_COURIER;
    var hero_name = hero.split('_')[0];
    var level = Text2GoodsLevel(hero_name);
    var recycle_price_table = SHOP_INFO_V5.recycle_price.courier;
    var recycle_price = recycle_price_table[level - 1] || 0;
    var text = $.Localize('#' + 'text_confirm_recycle_hero1') + Text2ColorText(hero_name) + $.Localize('#' + 'text_confirm_recycle_hero2').replace('%s', recycle_price);

    show_confirm(text, function () {
        recycle_hero();
    });
}

function recycle_hero() {
    close_confirm();
    SendHTTP('recycle_hero', 'recycle_hero_cb', { hero: SELECTED_COURIER }, 1);
}

// 汰换特效
function confirm_recycle_effect() {
    if ($('#button_recycle_effect').BHasClass('unavailable')) {
        return;
    }
    var hero = SELECTED_COURIER;
    var effect_name = hero.split('_')[1];
    var level = Text2GoodsLevel(effect_name);
    var recycle_price_table = SHOP_INFO_V5.recycle_price.effect;
    var recycle_price = recycle_price_table[level - 1] || 0;
    show_confirm($.Localize('#' + 'text_confirm_recycle_effect1') + Text2ColorText(effect_name) + $.Localize('#' + 'text_confirm_recycle_effect2').replace('%s', recycle_price), function () {
        recycle_effect();
    });
}
function recycle_effect() {
    close_confirm();
    SendHTTP('recycle_effect', 'recycle_effect_cb', { hero: SELECTED_COURIER }, 1);
}

// 汰换弹道
function confirm_recycle_projectile() {
    if ($('#button_recycle_projectile').BHasClass('unavailable')) {
        return;
    }
    var hero = SELECTED_COURIER;
    var projectile_name = hero.split('_')[3];
    var level = Text2GoodsLevel(projectile_name);
    var recycle_price_table = SHOP_INFO_V5.recycle_price.effect;
    var recycle_price = recycle_price_table[level - 1] || 0;
    show_confirm($.Localize('#' + 'text_confirm_recycle_projectile1') + Text2ColorText(projectile_name) + $.Localize('#' + 'text_confirm_recycle_projectile2').replace('%s', recycle_price), function () {
        recycle_projectile();
    });
}
function recycle_projectile() {
    close_confirm();
    SendHTTP('recycle_projectile', 'recycle_projectile_cb', { hero: SELECTED_COURIER }, 1);
}

// 汰换出场动画
function confirm_recycle_animation() {
    if ($('#button_recycle_animation').BHasClass('unavailable')) {
        return;
    }
    var hero = SELECTED_COURIER;
    var animation_name = hero.split('_')[5];
    var level = Text2GoodsLevel(animation_name);
    var recycle_price_table = SHOP_INFO_V5.recycle_price.effect;
    var recycle_price = recycle_price_table[level - 1] || 0;
    show_confirm($.Localize('#' + 'text_confirm_recycle_animation1') + Text2ColorText(animation_name) + $.Localize('#' + 'text_confirm_recycle_animation2').replace('%s', recycle_price), function () {
        recycle_animation();
    });
}
function recycle_animation() {
    close_confirm();
    SendHTTP('recycle_animation', 'recycle_animation_cb', { hero: SELECTED_COURIER }, 1);
}

// 汰换宠物
function confirm_recycle_pet() {
    if ($('#button_recycle_pet').BHasClass('unavailable')) {
        return;
    }
    var hero = SELECTED_COURIER;
    var pet_name = hero.split('_')[4];
    var level = Text2GoodsLevel(pet_name);
    var recycle_price_table = SHOP_INFO_V5.recycle_price.effect;
    var recycle_price = recycle_price_table[level - 1] || 0;
    show_confirm($.Localize('#' + 'text_confirm_recycle_pet1') + Text2ColorText(pet_name) + $.Localize('#' + 'text_confirm_recycle_pet2').replace('%s', recycle_price), function () {
        recycle_pet();
    });
}
function recycle_pet() {
    close_confirm();
    SendHTTP('recycle_pet', 'recycle_pet_cb', { hero: SELECTED_COURIER }, 1);
}


















function end_game() {
    // Game.FinishGame();
    GameEvents.SendCustomGameEventToServer("quit_game", { player_id: Players.GetLocalPlayer() });
}
function show_kejin_qrcode() {
    // $('#kejin').style['background-image'] = 'url("file://{images}/custom_game/kejinjia.png")';
    $('#buy_candy_ad').SetHasClass('invisible', false);
}
function hide_kejin_qrcode() {
    // $('#kejin').style['background-image'] = 'url("file://{images}/custom_game/kehuijia.png")';
    $('#buy_candy_ad').SetHasClass('invisible', true);
}

function OnCdkeySubmitted() {
    var text = $("#entry_cdkey").text;
    ActivateCDKEY(text);
    $("#entry_cdkey").text = '';
}
var activate_cd = false;
function ActivateCDKEY(cdkey) {
    if (cdkey.length != 17) {
        Game.EmitSound("General.CastFail_NoMana");
        return;
    }
    if (!activate_cd) {
        activate_cd = true;
        if ($("#btn_entry_cdkey")) {
            $("#btn_entry_cdkey").SetHasClass('unavailable', true);
        }

        SendHTTP('activate_cdkey', 'activate_cdkey_cb', { hero: cdkey }, 1);
        $.Schedule(10, function () {
            activate_cd = false;
            if ($("#btn_entry_cdkey")) {
                $("#btn_entry_cdkey").SetHasClass('unavailable', false);
            }
        });
    }
}
function SendHTTP(event, cb, params, user_specific) {
    GameEvents.SendCustomGameEventToServer("catch_crab", {
        event: event,
        cb: cb,
        params: params,
        user_specific: user_specific
    });
}

var CURR_SHOP_EFFECT, CURR_SHOP_COLLECT, CURR_SHOP_COLLECT_PARTS;
var SHOP_GOODS_STATUS = {}, MY_CANDY, MY_BISCUIT;
var MY_LAST_ONDUTY_HERO_ID;
var IS_SKIP_LOTTERY_ANIMATION = false;
function SendHTTPCb(keys) {
    if (!CheckClientKey(keys.key)) return;
    var event = keys.event;
    var data = JSON.parse(keys.data);

    if (event == 'shop_v5_buy_cb') {
        var object = data;
        if (object.err == 0) {
            ShowMyMoney(object.candy, object.biscuit);
            // show_msg($.Localize('#'+'buysuccess'));
            if (object.award) {
                var pic = '';
                if (object.award.slice(0, 1) == 'h') {
                    open_panel_award('dac', 'courier', object.award, '', 'candystore');
                }
                if (object.award.slice(0, 1) == 'b') {
                    open_panel_award('dac', 'chessboard', object.award, '', 'candystore');
                }
                if (object.award.slice(0, 1) == 'm') {
                    open_panel_award('dac', 'emotion', object.award, '', 'candystore');
                }
                if (object.award.slice(0, 1) == 'e' || object.award.slice(0, 1) == 'p' || object.award.slice(0, 1) == 'n' || object.award.slice(0, 1) == 't') {
                    if (object.award.slice(0, 1) == 'e') {
                        pic = 'file://{images}/custom_game/effect/' + object.award + '.png';
                    }
                    if (object.award.slice(0, 1) == 'p') {
                        pic = 'file://{images}/custom_game/projectile/' + object.award + '.png';
                    }
                    if (object.award.slice(0, 1) == 'n') {
                        pic = 'file://{images}/custom_game/animation/' + object.award + '.png';
                    }
                    if (object.award.slice(0, 1) == 't') {
                        pic = 'file://{images}/custom_game/pets/' + object.award + '.png';
                    }
                    show_msg(Text2ColorText(object.award) + $.Localize('#buysuccess'), pic);
                    GameEvents.SendCustomGameEventToServer("change_onduty_hero",
                        {
                            'player_id': Players.GetLocalPlayer(),
                            'onduty_hero_new': object.onduty_hero,
                        }
                    );

                    MY_ONDUTY_HERO = object.onduty_hero;
                    MY_LAST_ONDUTY_HERO_ID = MY_ONDUTY_HERO.split('_')[0];

                    show_my_shop();
                    FillStoreV5ByTab(SHOP_V5_CURR_TAB || 'recomment');
                }
            }
            refresh_shop_v5();
        }
        else {
            var text = $.Localize('#buyfail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
    }

    if (event == 'buy_bet_cb') {
        var object = data;
        if (object.err == 0) {
            ShowMyMoney(data.candy, data.biscuit);
            show_msg($.Localize('#' + 'text_ti12_bet_bet_success'));
            ShowBetInfo(data.bet_info);
        }
        else {
            show_msg('#bet_fail');
        }
    }

    if (event == 'refresh_shop_v5_cb') {
        // $.Msg('refresh_shop_v5_cb');
        // $.Msg(data);
        FillStoreV5(data);
    }

    // 购买特效cb
    if (event == 'buy_courier_cb') {

        var object = data;
        if (object.err == 0) {
            ShowMyMoney(object.candy, object.biscuit);
            open_panel_award('dac', 'courier', object.award, '', 'candystore');
            refresh_shop_v5();
        }
        else {
            show_msg($.Localize('#buyfail') + '<br><br>' + (object.err_msg || ':('));
        }
    }
    if (event == 'buy_effect_cb') {
        var object = data;
        if (object.err == 0) {
            ShowMyMoney(object.candy, object.biscuit);
            show_msg($.Localize('#' + 'buysuccess'));
            refresh_shop_v5();

            GameEvents.SendCustomGameEventToServer("change_onduty_hero",
                {
                    'player_id': Players.GetLocalPlayer(),
                    'onduty_hero_new': object.onduty_hero,
                }
            );
        }
        else {
            show_msg($.Localize('#buyfail') + '<br><br>' + (object.err_msg || ':('));
        }
    }
    if (event == 'buy_projectile_cb') {
        var object = data;
        if (object.err == 0) {
            ShowMyMoney(object.candy, object.biscuit);
            show_msg($.Localize('#' + 'buysuccess'));
            refresh_shop_v5();

            GameEvents.SendCustomGameEventToServer("change_onduty_hero",
                {
                    'player_id': Players.GetLocalPlayer(),
                    'onduty_hero_new': object.onduty_hero,
                }
            );
        }
        else {
            show_msg($.Localize('#buyfail') + '<br><br>' + (object.err_msg || ':('));
        }
    }
    if (event == 'buy_animation_cb') {
        var object = data;
        if (object.err == 0) {
            ShowMyMoney(object.candy, object.biscuit);
            show_msg($.Localize('#' + 'buysuccess'));
            refresh_shop_v5();

            GameEvents.SendCustomGameEventToServer("change_onduty_hero",
                {
                    'player_id': Players.GetLocalPlayer(),
                    'onduty_hero_new': object.onduty_hero,
                }
            );
        }
        else {
            show_msg($.Localize('#buyfail') + '<br><br>' + (object.err_msg || ':('));
        }
    }
    if (event == 'buy_pet_cb') {
        var object = data;
        if (object.err == 0) {
            ShowMyMoney(object.candy, object.biscuit);
            show_msg($.Localize('#' + 'buysuccess'));
            refresh_shop_v5();

            GameEvents.SendCustomGameEventToServer("change_onduty_hero",
                {
                    'player_id': Players.GetLocalPlayer(),
                    'onduty_hero_new': object.onduty_hero,
                }
            );
        }
        else {
            show_msg($.Localize('#buyfail') + '<br><br>' + (object.err_msg || ':('));
        }
    }
    if (event == 'buy_emotion_cb') {
        var object = data;
        if (object.err == 0) {
            ShowMyMoney(object.candy, object.biscuit);
            open_panel_award('dac', 'emotion', object.award, '', 'cdkey');
            refresh_shop_v5();
        }
        else {
            show_msg($.Localize('#buyfail') + '<br><br>' + (object.err_msg || ':('));
        }
    }
    if (event == 'buy_chessboard_cb') {
        var object = data;
        if (object.err == 0) {
            ShowMyMoney(object.candy, object.biscuit);
            // show_msg($.Localize('#'+'buysuccess'));
            open_panel_award('dac', 'chessboard', object.award, '', 'candystore');
            refresh_shop_v5();
        }
        else {
            show_msg($.Localize('#buyfail') + '<br><br>' + (object.err_msg || ':('));
        }
    }
    // 更换当前棋手cb
    if (event == 'change_zhugong_cb') {
        var object = data;
        if (object.err == 0) {
            MY_ONDUTY_HERO = object.onduty_hero;
            var courier_id = MY_ONDUTY_HERO.split('_')[0];
            show_msg('#tips_choose_hero_success', 'file://{images}/custom_game/skaters/' + courier_id + '.png');
            refresh_shop_v5();
            ShowStore(false);

            GameEvents.SendCustomGameEventToServer("change_onduty_hero",
                {
                    'player_id': Players.GetLocalPlayer(),
                    'onduty_hero_new': object.onduty_hero,
                }
            );
            show_my_shop();
            FillStoreV5ByTab(SHOP_V5_CURR_TAB || 'recomment');
        }
        else {
            var text = $.Localize('#tips_choose_hero_fail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
    }
    // 更换当前棋手cb
    if (event == 'change_chessboard_cb') {
        var object = data;
        if (object.err == 0) {
            MY_CURR_CHESSBOARD = object.onduty_chessboard;
            show_msg('#tips_choose_chessboard_success');
            GameEvents.SendCustomGameEventToServer("choose_chessboard", {
                "chessboard": MY_CURR_CHESSBOARD,
            });
            refresh_shop_v5();
            // ShowStore(false);
            // show_my_shop();
            // FillStoreV5ByTab(SHOP_V5_CURR_TAB || 'recomment');
        }
        else {
            var text = $.Localize('#tips_choose_chessboard_fail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
    }
    // 合并棋手cb
    if (event == 'merge_zhugong_cb') {
        var object = data;
        if (object.err == 0) {
            var new_hero = object.new_hero;
            var hero = new_hero.split('_')[0];
            var level_exp = parseFloat(new_hero.split('_')[2]);
            var level = Math.floor(level_exp);
            show_msg($.Localize('#' + 'tips_merge_courier_success1') + $.Localize('#' + hero) + $.Localize('#' + 'tips_merge_courier_success2') + level);
            refresh_shop_v5();
        }
        else {
            show_msg('#tips_merge_hero_fail');
        }
    }
    // 抽扭蛋机cb
    if (event == 'lottery_cb') {
        var object = data;
        if (object.err == 0) {
            if (FindDotaHudElement('toggle_confirm')) {
                IS_SKIP_LOTTERY_ANIMATION = FindDotaHudElement('toggle_confirm').checked;
            }
            ShowMyMoney(object.candy, object.biscuit);
            if (is_rolling == true) {
                $('#go_lottery').SetHasClass('invisible', true);
                if (!object.award) {
                    show_msg($.Localize('#buyfail') + '<br><br>' + (object.err_msg || ':('));
                }
                else {
                    open_panel_award('dac', 'courier', object.award, '', 'candystore');
                    refresh_shop_v5();
                }
            }
            else {
                is_rolling = true;
                if (IS_SKIP_LOTTERY_ANIMATION) {
                    open_panel_award('dac', 'courier', object.award, '', 'candystore');
                    refresh_shop_v5();
                    $.Schedule(0.5, function () {
                        is_rolling = false;
                    })
                }
                else {
                    for (var i = 0; i < object.fake.length; i++) {
                        var fake = object.fake[i].split('_')[0];
                        $('#lottery_' + i).style['background-image'] = "url('file://{images}/custom_game/skaters/" + fake + ".png')";
                        $('#lottery_' + i).style['background-size'] = '100% 100%';
                    }
                    $('#go_lottery').SetHasClass('invisible', false);
                    var s = Game.EmitSound('ui.treasure_spin');
                    $('#lottery_track').style['position'] = "-8100px 0px 0px";

                    $.Schedule(5, function () {
                        Game.StopSound(s);
                        Game.EmitSound('ui.npe_objective_given');
                    });
                    $.Schedule(6, function () {
                        $('#go_lottery').SetHasClass('invisible', true);
                        $('#lottery_track').style['transition-duration'] = "0.5s";
                        $('#lottery_track').style['position'] = "0px 0px 0px";
                        if (!object.award) {
                            show_msg($.Localize('#' + 'lotfailed'));
                        }
                        else {
                            open_panel_award('dac', 'courier', object.award, '', 'candystore');
                            refresh_shop_v5();
                        }
                        $.Schedule(1, function () {
                            is_rolling = false;
                            $('#lottery_track').style['transition-duration'] = "5s";
                        })
                    })
                }
            }
        }
        else {
            var text = $.Localize('#buyfail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
    }
    // 激活激活码cb
    if (event == 'activate_cdkey_cb') {
        var object = data;
        //激活码无效
        if (object.err) {
            if (object.msg == "invalid key") {
                show_msg($.Localize('#' + 'invalid_key'));
            }
            //已被激活
            else if (object.msg == "already activated") {
                show_msg($.Localize('#' + 'already_activated'));
            }
            //已拥有，无法激活
            else if (object.msg == "already_have") {
                show_msg($.Localize('#' + 'already_have'));
            }
            //无效的棋盘
            else if (object.msg == "invalid_chessboard_id") {
                show_msg($.Localize('#' + 'invalid_chessboard_id'));
            }
            else {
                show_msg($.Localize('#' + 'activate_error'));
            }
        }
        //激活成功
        else {

            if (object.award.test == true) {
                show_msg('内测资格激活成功！');
            }
            else if (object.award.vip) {
                var expStr = ((object.award.vip.vip_expire || '000000') + '').replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3');
                show_msg($.Localize('#text_vip_activate_success') + expStr + GetVipRemainDaysText(expStr));
            }
            else if (object.award.candy) {
                open_panel_award('dac', 'candy', '', object.award.candy, 'cdkey');
                refresh_shop_v5();
            }
            else if (object.award.chessboard) {
                open_panel_award('dac', 'chessboard', object.award.chessboard, '', 'cdkey');
                refresh_shop_v5();
            }
            else if (object.award.emotion) {
                open_panel_award('dac', 'emotion', object.award.emotion, '', 'cdkey');
                refresh_shop_v5();
            }
            else if (object.award.courier) {
                var c = object.award.courier.split('_')[0];
                open_panel_award('dac', 'courier', c, '', 'cdkey');
                refresh_shop_v5();
            }
        }
    }
    // 汰换英雄cb
    if (event == 'recycle_hero_cb') {
        var object = data;
        if (object.err == 0) {
            show_msg($.Localize('#tips_recycle_hero_success').replace('%s', object.new_candy), 'file://{images}/custom_game/candy.png');
            refresh_shop_v5();
            show_my_shop();
            FillStoreV5ByTab(SHOP_V5_CURR_TAB || 'recomment');
        }
        else {
            var text = $.Localize('#tips_recycle_hero_fail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
    }
    if (event == 'recycle_effect_cb') {
        var object = data;
        if (object.err == 0) {
            show_msg($.Localize('#tips_recycle_effect_success').replace('%s', object.new_candy), 'file://{images}/custom_game/candy.png');
            refresh_shop_v5();
            show_my_shop();
            FillStoreV5ByTab(SHOP_V5_CURR_TAB || 'recomment');
        }
        else {
            var text = $.Localize('#tips_recycle_effect_fail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
    }
    if (event == 'recycle_projectile_cb') {
        var object = data;
        if (object.err == 0) {
            show_msg($.Localize('#tips_recycle_projectile_success').replace('%s', object.new_candy), 'file://{images}/custom_game/candy.png');
            refresh_shop_v5();
            show_my_shop();
            FillStoreV5ByTab(SHOP_V5_CURR_TAB || 'recomment');
        }
        else {
            var text = $.Localize('#tips_recycle_projectile_fail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
    }
    if (event == 'recycle_animation_cb') {
        var object = data;
        if (object.err == 0) {
            show_msg($.Localize('#tips_recycle_animation_success').replace('%s', object.new_candy), 'file://{images}/custom_game/candy.png');
            refresh_shop_v5();
            show_my_shop();
            FillStoreV5ByTab(SHOP_V5_CURR_TAB || 'recomment');
        }
        else {
            var text = $.Localize('#tips_recycle_animation_fail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
    }
    if (event == 'recycle_pet_cb') {
        var object = data;
        if (object.err == 0) {
            show_msg($.Localize('#' + 'tips_recycle_pet_success').replace('%s', object.new_candy), 'file://{images}/custom_game/candy.png');
            refresh_shop_v5();
            show_my_shop();
            FillStoreV5ByTab(SHOP_V5_CURR_TAB || 'recomment');
        }
        else {
            var text = $.Localize('#tips_recycle_pet_fail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
    }

    // 集换英雄cb
    if (event == 'jihuan_hero_cb') {
        var object = data;
        if (object.err == 0) {
            // show_msg('#tips_jihuan_hero_success');
            if (object.award) {
                var award_hero = object.award.split('_')[0];
                open_panel_award('dac', 'courier', award_hero, '', 'candystore');
            }
            refresh_shop_v5();
            show_my_shop();
            FillStoreV5ByTab(SHOP_V5_CURR_TAB || 'recomment');
        }
        else {
            var text = $.Localize('#tips_jihuan_hero_fail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
    }

    // 投票cb
    if (event == 'request_vote_chess_cb') {
        var object = data;
        if (object.err == 0) {
            show_msg('#vote_success');
            refresh_shop_v5();
        }
        else {
            show_msg($.Localize('#' + 'vote_fail'));
        }
    }

    // 领取赛季奖励cb
    if (event == 'get_season_award_cb') {
        var object = data;
        if (!object || object.err) {
            var text = $.Localize('#get_season_award_fail') + '<br>' + ErrorMsg(object.err_msg);
            show_msg(text, "file://{images}/custom_game/vip/bird_sang.png");
        }
        else {
            show_msg('#get_season_award_success', 'file://{images}/custom_game/candy.png');
            if (object.awardlist) {
                if (object.awardlist.candy) {
                    open_panel_award('dac', 'candy', '', object.awardlist.candy, 'season');
                }
                if (object.awardlist.courier) {
                    open_panel_award('dac', 'courier', object.awardlist.courier, '', 'season');
                }
                refresh_shop_v5();
            }
        }
    }
    if (event == 'request_casino_award_cb') {
        var object = data;
        if (!object || object.err) {
            show_msg($.Localize('#get_casino_award_fail'));
        }
        else {
            show_msg('#get_casino_award_success');
            if (object.award) {
                open_panel_award('dac', 'candy', '', object.award, 'casino');
                refresh_shop_v5();
            }
        }
    }
    if (event == 'get_bet_award_cb') {
        var object = data;

        if (!object || object.err) {
            show_msg($.Localize('#' + 'get_season_award_fail'));
        }
        else {
            // show_msg('#get_season_award_success');
            if (object.award) {
                if (object.award.candy_add) {
                    open_panel_award('dac', 'candy', '', object.award.candy_add, 'lucky');
                }
                if (object.award.courier) {
                    open_panel_award('dac', 'courier', object.award.courier, '', 'lucky');
                }
                refresh_shop_v5();
            }
        }
    }
}
var streak_list = [];
function OnWinStreak(keys) {
    if (!CheckClientKey(keys.key)) return;
    var streak = keys.streak;
    var is_vip = keys.is_vip;
    var player_name = Game.GetPlayerInfo(keys.player_id).player_name;
    streak_list.push({ player_name: player_name, streak: streak, is_vip: is_vip });
    ShowMsg();
}
function ShowMsg() {
    if (streak_list.length > 0) {
        var this_msg = streak_list.shift();
        $('#winstreak').text = (this_msg.player_name + $.Localize('#' + 'hasgot') + this_msg.streak + $.Localize('#' + 'winstreak'))
        $('#winstreak').SetHasClass('invisible', false);
        var effects;
        if (this_msg.streak == 5) {
            Game.EmitSound("announcer_killing_spree_announcer_kill_mega_01");
            if (this_msg.is_vip) {
                effects = Particles.CreateParticle('particles/econ/events/killbanners/screen_killbanner_compendium16_multikill_generic.vpcf', 6, 0)
            }
            else {
                effects = Particles.CreateParticle('particles/econ/events/killbanners/screen_killbanner_compendium14_doublekill.vpcf', 6, 0)
            }
        }
        if (this_msg.streak == 8) {
            Game.EmitSound("announcer_killing_spree_announcer_kill_monster_01");
            if (this_msg.is_vip) {
                effects = Particles.CreateParticle("particles/econ/events/killbanners/screen_killbanner_compendium16_triplekill.vpcf", 6, 0)
            }
            else {
                effects = Particles.CreateParticle("particles/econ/events/killbanners/screen_killbanner_compendium14_triplekill.vpcf", 6, 0)
            }
        }
        if (this_msg.streak == 10) {
            Game.EmitSound("announcer_killing_spree_announcer_kill_holy_01");
            if (this_msg.is_vip) {
                effects = Particles.CreateParticle("particles/econ/events/killbanners/screen_killbanner_compendium16_rampage.vpcf", 6, 0)
            }
            else {
                effects = Particles.CreateParticle("particles/econ/events/killbanners/screen_killbanner_compendium14_rampage.vpcf", 6, 0)
            }
        }

        var ws_color = '#fff';
        if (this_msg.streak >= 5) {
            ws_color = '#ffff88';
        }
        if (this_msg.streak >= 8) {
            ws_color = '#ff8844';
        }
        if (this_msg.streak >= 10) {
            ws_color = '#ff2222';
        }
        $('#winstreak').style['color'] = ws_color;

        $('#winstreak').style['transform'] = 'scale3d( 1.5, 1.5, 1.5)';
        $.Schedule(0.3, function () {
            $('#winstreak').style['transform'] = 'scale3d( 1,1,1)';
        });

        $.Schedule(5, function () {
            if (IsValidParticleIndex(effects)) {
                Particles.DestroyParticleEffect(effects, true);
            }
            $('#winstreak').SetHasClass('invisible', true);
            ShowMsg();
        });
    }
}
function show_lottery_content() {
    $('#panel_lottery_show').SetHasClass('invisible', false);
}
function hide_lottery_content() {
    $('#panel_lottery_show').SetHasClass('invisible', true);
}



function OnSyncHp(data) {
    data.player_id = GetPlayerIndexByPlayerID(data.player_id);
    if (data.player_id < 0 || data.player_id > 7) {
        //ob
        return;
    }

    $('#text_player_hp_' + (data.player_id)).text = Math.round(data.hp) + '%';
    if (data.hp <= 0) {
        $('#text_player_hp_' + (data.player_id)).text = "FAILED";
        $('#outer_player_board_' + (data.player_id)).SetHasClass('unavailable', true);

        var team = Players.GetTeam(data.player_id);
        if (FindDotaHudElement('minimap_player_avatar_team_' + team)) {
            FindDotaHudElement('minimap_player_avatar_team_' + team).style['brightness'] = '0.1';
            FindDotaHudElement('minimap_player_avatar_team_' + team).style['saturation'] = '0';
        }
    }
    $('#player_hp_' + (data.player_id)).style['width'] = (data.hp / (data.hp_max || 100)) * 190 + 'px';
    $('#player_mp_' + (data.player_id)).style['width'] = ((data.mp || 0) / (100)) * 190 + 'px';
    $('#text_player_mp_' + (data.player_id)).text = '$' + Math.round(data.mp || 0);
    $('#text_player_courier_level_' + (data.player_id)).text = Math.round(data.level) || 0;

    if (data.win_streak != null && data.hp > 0) {
        var ws_color = GetWSColor(data.win_streak);

        var ele = $('#player_name_' + (data.player_id));
        if (ele) {
            ele.style['color'] = ws_color;
        }
        if (data.win_streak >= 10) {
            $('#panel_winstreak_effect_' + (data.player_id)).SetHasClass('invisible', false);
        }
        else {
            $('#panel_winstreak_effect_' + (data.player_id)).SetHasClass('invisible', true);
        }
    }
    else {
        $('#panel_winstreak_effect_' + (data.player_id)).SetHasClass('invisible', true);
    }

    // 把自己的面板高亮
    var self_player_id = GetPlayerIndexByPlayerID(Players.GetLocalPlayer());
    if ($('#panel_player_details_bg_self_' + self_player_id)) {
        $('#panel_player_details_bg_self_' + self_player_id).style['opacity'] = '1';
        $('#player_hp_' + self_player_id).style['background-color'] = 'gradient( linear, 0% 0%, 100% 0%, from( #79f27988 ), color-stop( 0.85, #79f279dd), to( #79f279ff ) )';
    }

    // if (data.sync_hp_bar){
    //     InitHpBar(data.player_id, data.unit_index, data.courier_id, data.win_streak);
    // }
}

function OnPopulation(data) {
    if (!CheckClientKey(data.key)) return;
    if (data.count <= data.max_count) {
        $('#population').style['color'] = '#ffffff';
        $('#population').text = data.count + ' / ' + data.max_count;
    }
    else {
        $('#population').style['color'] = '#ff0000';
        $('#population').text = data.count + ' / ' + data.max_count;
    }
}


// function OnPlayerDisconnect(data){
//     $("#outer_player_board_"+data.disconnectid).style["opacity"] = "0.3";
// }

// FillChessListPanel();


// 断线重连
function OnPlayerReconnect(data) {
    data.id = GetPlayerIndexByPlayerID(data.id); //？？？

    // （1）重建 heroindex2id（不知道干啥用的）
    for (var i = 0; i < 12; i++) {
        if (Players.GetPlayerHeroEntityIndex(i)) {
            heroindex2id[Players.GetPlayerHeroEntityIndex(i)] = i;
        }
    }

    // （2）显示左上角iconlist 和 右侧开关按钮
    $("#iconlist").style["position"] = "0px 0px 0px";
    $("#button_board_right").SetHasClass('invisible', false);

    // （3）把右侧玩家列表中的自己亮起来？
    if ($("#outer_player_board_" + data.id)) {
        $("#outer_player_board_" + data.id).style["opacity"] = "1";
    }

    // （4）显示棋子图鉴和装备图鉴
    FillChessListPanel();

    // （5）显示本局橙卡池和圣物池
    OnShowLegendaryAndBan();

    // （6）显示橙卡池的揭示状态
    $.Schedule(1, function () {
        ShowRevealedLegendaryChessList();
    });

    // （7）显示圣物物品栏上的剩余回合数
    var local_player_id = Players.GetLocalPlayer();
    var relic_ttl = GetTableSafe("player_id_table", 'relic_ttl_' + local_player_id);
    if (relic_ttl) {
        RELIC_TTL = relic_ttl['ttl'];
        UpdateRelicRemainingRounds(RELIC_TTL);
    }
    $.Schedule(1, function () {
        if (PORTRAIT_COURIER_PLAYER_ID || PORTRAIT_COURIER_PLAYER_ID == 0) {
            UpdateTalentTree(PORTRAIT_COURIER_PLAYER_ID);
        }
    });
    ShowHostInfo();
}


function OnShowLegendaryAndBan() {
    var data = GetTableSafe("chess_pool_table", 'legendary_info');
    SetLegendaryChessAndRelicInfo(data);

    var destroy_table = GetTableSafe("chess_pool_table", 'destroy_info');
    SetDestroyedChessStatus(destroy_table);

    var synergy_banned_data = CustomNetTables.GetTableValue("chess_pool_table", 'ban_info_' + Players.GetLocalPlayer());
    if (synergy_banned_data) {
        var synergy_banned = synergy_banned_data.banned_synergy;
        var synergy_table = GetTableSafe("chess_pool_table", 'synergy_info');
        //重连时这张表可能还没下发，直接索引会抛 TypeError 打断整条重连链
        if (synergy_table && synergy_banned) {
            var s = synergy_table[synergy_banned];
            SetBannedChessStatus(s);
        }
    }
}



var CURR_COLLECT = null;
function confirm_jihuan_hero(jihuan_hero) {
    CURR_COLLECT = jihuan_hero;
    var id = jihuan_hero.split('_')[0];
    show_confirm($.Localize('#' + 'text_confirm_jihuan_hero0') + Text2ColorText(id) + $.Localize('#' + 'text_confirm_jihuan_hero1'), function () {
        close_confirm();
        SendHTTP('jihuan_hero', 'jihuan_hero_cb', { hero: CURR_COLLECT }, 1)
    });
}

var IS_BULLET_SHOW = true;
// $('#img_bullet_toggle_tick').SetHasClass('invisible',false);
function toggle_bullet() {
    if (IS_BULLET_SHOW) {
        // 隐藏弹幕
        IS_BULLET_SHOW = false;
        $('#img_bullet_toggle_tick').SetHasClass('invisible', true);
        Game.EmitSound("Shop.PanelUp");
        // $('#bulletbox').SetHasClass('invisible',true);
    }
    else {
        // 显示弹幕
        IS_BULLET_SHOW = true;
        $('#img_bullet_toggle_tick').SetHasClass('invisible', false);
        Game.EmitSound("ui.settings_open");
        // $('#bulletbox').SetHasClass('invisible',false);
    }
    //通知lua设置改变了
    GameEvents.SendCustomGameEventToServer("user_settings_update",
        {
            "key": "is_bullet_show",
            "value": IS_BULLET_SHOW ? 1 : 0,
            "hehe": Date.now(),
        });
}

function show_collect_part(c, index) {
    if (CURR_SHOP_COLLECT_PARTS && CURR_SHOP_COLLECT_PARTS[c] && CURR_SHOP_COLLECT_PARTS[c][index]) {
        var jihuan_name = CURR_SHOP_COLLECT_PARTS[c][index].split('_')[0];
        $.DispatchEvent("DOTAShowTextTooltip", $("#img_shop_jihuan_part_" + c + '_' + index), $.Localize('#' + jihuan_name));
    }
}
function OnShowLiuju(keys) {
    if (!CheckClientKey(keys.key)) return;
    HudClass('button_liuju', 'unavailable', false);
    // // $('#btn_liuju').SetHasClass('invisible',false);
    // OnSuggestLiuju();
}
function OnHideLiuju(keys) {
    if (!CheckClientKey(keys.key)) return;
    HudClass('button_liuju', 'unavailable', true);
    // $('#button_liuju').SetHasClass('invisible', true);
}
function OnUpdateLiuju(keys) {
    if (!CheckClientKey(keys.key)) return;
    if (keys.count > keys.total) {
        keys.count = keys.total;
    }
    $('#txt_liuju').text = '( ' + (keys.count || 0) + ' / ' + (keys.total || 0) + ' )';
}



function toggle_f9() {
    GameEvents.SendCustomGameEventToServer("request_pause_game", {
        "playerid": Players.GetLocalPlayer(),
    });
}

var GOODS;
function buy_courier_outer(e, goods) {
    return function () {
        if ($('#buy_courier_' + e).BHasClass('unavailable')) {
            return;
        }
        GOODS = goods;
        show_confirm($.Localize('#' + 'buycourier1') + Text2ColorText(goods) + $.Localize('#' + 'buycourier2'), function () {
            buy_courier();
        });
    }
}

function preview_effect_outer(e, goods) {
    return function () {
        preview_effect(e, goods)
    }
}
function buy_effect_outer(e, goods) {
    return function () {
        if ($('#buy_texiao_' + e).BHasClass('unavailable')) {
            return;
        }
        GOODS = goods;
        show_confirm($.Localize('#' + 'buyeffect1') + $.Localize('#' + MY_ONDUTY_HERO.split('_')[0]) + $.Localize('#' + 'buyeffect2'), function () {
            buy_effect();
        });
    }
}

function preview_projectile_outer(e, goods) {
    return function () {
        preview_projectile(e, goods)
    }
}
function buy_projectile_outer(e, goods) {
    return function () {
        if ($('#buy_dandao_' + e).BHasClass('unavailable')) {
            return;
        }
        GOODS = goods;
        show_confirm($.Localize('#' + 'buyprojectile1') + $.Localize('#' + MY_ONDUTY_HERO.split('_')[0]) + $.Localize('#' + 'buyprojectile2'), function () {
            buy_projectile();
        });
    }
}

function buy_pet_outer(e, goods) {
    return function () {
        if ($('#buy_pet_' + e).BHasClass('unavailable')) {
            return;
        }
        GOODS = goods;
        show_confirm($.Localize('#' + 'buypet1') + $.Localize('#' + MY_ONDUTY_HERO.split('_')[0]) + $.Localize('#' + 'buypet2'), function () {
            buy_pet();
        });
    }
}


function buy_emotion_outer(e, goods) {
    return function () {
        if ($('#buy_emotion_' + e).BHasClass('unavailable')) {
            return;
        }
        GOODS = goods;
        show_confirm($.Localize('#' + 'buyemotion1') + $.Localize('#' + goods) + $.Localize('#' + 'buyemotion2'), function () {
            buy_emotion();
        });
    }
}

function preview_animation_outer(e, goods) {
    return function () {
        preview_animation(e, goods)
    }
}
function buy_animation_outer(e, goods) {
    return function () {
        if ($('#buy_animation_' + e).BHasClass('unavailable')) {
            return;
        }
        GOODS = goods;
        show_confirm($.Localize('#' + 'buyanimation1') + $.Localize('#' + MY_ONDUTY_HERO.split('_')[0]) + $.Localize('#' + 'buyanimation2'), function () {
            buy_animation();
        });
    }
}
function shopv5_lottery_outer(button) {
    return function () {
        if (button.BHasClass('unavailable')) {
            return;
        }
        show_confirm($.Localize('#' + 'buyniudan'), function () {
            lottery_go();
        }, null, {
            toggle_text: $.Localize('#skip_animation'),
            selected: IS_SKIP_LOTTERY_ANIMATION,
        });
    }
}
function shopv5_buy_outer(button, confirm_message, goods) {
    return function () {
        if (button.BHasClass('unavailable')) {
            return;
        }
        GOODS = goods;
        show_confirm(confirm_message, function () {
            shop_v5_buy();
        });
    }
}
function mima_outer(text) {
    return function () {
        GameUI.SendCustomHUDError(text, "General.CastFail_NoMana");
    }
}


function confirm_jihuan_hero_outer(goods) {
    return function () {
        confirm_jihuan_hero(goods)
    }
}

function OnShowGameover(keys) {
    if (!CheckClientKey(keys.key)) return;

    // 填写个人结束面板的内容
    $("#gameover_text_rank_2").text = keys.rank || '?';
    $("#gameover_text_rank_3").text = '/' + (keys.total_rank || '?');

    if (keys.rank == 1) {
        $('#gameover_text_lost').text = $.Localize('#' + 'txt_you_win');
        $('#gameover_text_lost').style['color'] = '#00ff00';
    }
    if (keys.candy || keys.candy == 0) {
        $("#gameover_panel_candy").SetHasClass('invisible', false);
        if (keys.candy > 0) {
            $("#gameover_text_candy").text = '+ ' + keys.candy;
            $("#gameover_text_candy").style['color'] = '#88ff88';
        }
        else if (keys.candy < 0) {
            $("#gameover_text_candy").text = '- ' + (-keys.candy);
            $("#gameover_text_candy").style['color'] = '#ff4444';
        }
        else if (Game.GetMapInfo().map_display_name == 'candy_5_1x8') {
            $("#gameover_text_candy").text = '+ ' + 0;
            $("#gameover_text_candy").style['color'] = '#bbbbbb';
        }
        else {
            $("#gameover_panel_candy").SetHasClass('invisible', true);
        }
    }
    if (keys.biscuit) {
        $("#gameover_panel_biscuit").SetHasClass('invisible', false);
        $("#gameover_text_biscuit").text = '+ ' + keys.biscuit;
        $("#gameover_text_biscuit").style['color'] = '#88ff88';
    }
    if (keys.level) {
        $("#gameover_image_level").SetImage('file://{images}/custom_game/level_' + keys.level + '.png');
        $("#gameover_text_level_1").text = $.Localize('#' + 'text_player_level_' + keys.level);
        if (keys.level >= 38 && keys.queen_rank) {
            $("#gameover_text_level_1").text = '#' + keys.queen_rank;
        }
        if (keys.level > 0) {
            $("#gameover_text_level_1").style['color'] = '#fff';
        }

        if (keys.mmr_delta > 0) {
            if (keys.level_delta > 0) {
                $('#gameover_text_level_2').text = "▲♫";
            }
            else {
                $('#gameover_text_level_2').text = "▲";
            }
            $('#gameover_text_level_2').style['color'] = "#88ff88";
        }
        if (keys.mmr_delta < 0) {
            if (keys.level_delta < 0) {
                $('#gameover_text_level_2').text = "▼♭";
            }
            else {
                $('#gameover_text_level_2').text = "▼";
            }
            $('#gameover_text_level_2').style['color'] = "#ff0000";
        }
    }

    // if (keys.quest_id && keys.biscuit) {
    //     $('#gameover_panel_quest').SetHasClass('invisible', false);
    //     $('#gameover_text_quest').text = $.Localize('#' + 'daily_quest') + '  ' + $.Localize('#' + keys.quest_id + '_title');
    //     $("#daily_quest_countdown").text = $.Localize('#' + 'text_quest_finished');
    //     $('#quest_bar').SetHasClass('invisible', false);
    //     // $('#daily_quest').text = $.Localize('#'+'daily_quest') + '  ' + $.Localize('#'+keys.quest_id + '_title');
    //     // $('#googie_quest').text = $.Localize('#'+keys.quest_id);

    //     // $('#daily_quest').text = $.Localize('#'+'daily_quest');
    //     // $('#googie_quest').style['color'] = COLOR_STR[quest_level];
    //     // $('#googie_quest').text = $.Localize('#'+quest_id + '_title');
    // }
    if (keys.exp_info && keys.exp_info.courier) {
        $('#gameover_panel_courier').SetHasClass('invisible', false);
        $("#gameover_image_courier").SetImage('file://{images}/custom_game/skaters/' + keys.exp_info.courier + '.png');
        var exp_old = parseFloat(keys.exp_info.exp_old || 1.0);
        var exp_new = parseFloat(keys.exp_info.exp_new || 1.0);
        var level_old = keys.exp_info.level_old;
        var level_new = keys.exp_info.level_new;
        var level_delta = keys.exp_info.level_delta;

        var exp = exp_new - level_new;
        UpdateGameoverCourierLevel(0, exp_old, level_old);
        var t = 2;
        for (var e = exp_old; e <= exp_new; e += 0.02) {
            UpdateGameoverCourierLevel(t, e, level_old);
            t = t + 0.05;
        }
        UpdateGameoverCourierLevel(t, exp_new, level_old);
    }
    else {
        $('#gameover_panel_courier').SetHasClass('invisible', true);
    }
    Game.EmitSound("dac.liuju");
    $('#panel_gameover').style['position'] = '0px 0px 0px';
    refresh_shop_v5();
    close_panel_draw_card();
    SetTalentTreeActive(false);
    HideTalentTreeBox();

    var data = CustomNetTables.GetTableValue("game_info", "host_info");
    if (local_id == data.host_steamid){
        showPanelHost();
    }
}

function UpdateGameoverCourierLevel(t, exp, level_old) {
    $.Schedule(t, function () {
        var level = parseInt(exp || 1);
        if (level > 30) {
            level = 30;
        }

        var level_text = "Lv." + level;
        if (level > level_old) {
            level_text += ' ♫';
        }
        var exp_bar = exp - level;
        $('#gameover_courier_exp_level').text = level_text;

        if (level == 30) {
            exp_bar = 1;
        }
        $('#gameover_courier_exp_bar_exp_1').style['width'] = 80 * exp_bar + 'px';
    });
}

function unhighlight_chess() {
    var yyy = $("#panel_chess_list").FindChildrenWithClassTraverse('list_line');
    for (var j in yyy) {
        yyy[j].SetHasClass("opacity_100", true);
        yyy[j].SetHasClass("opacity_5", false);
    }
    HideChessDetail();
    ShowBanOneSynergyOnChessListPanel();
}

function highlight_chess(class_name) {
    HideChessDetail();
    var xxx = $("#panel_chess_list").FindChildrenWithClassTraverse(class_name);
    var yyy = $("#panel_chess_list").FindChildrenWithClassTraverse('list_line');
    var filtered = false;
    for (var j in yyy) {
        if (yyy[j].BHasClass('opacity_5')) {
            filtered = true;
        }
    }
    for (var i in xxx) {
        var rm_visible_status = true;
        var ability_panels = xxx[i].FindChildrenWithClassTraverse('long_label_4_icons');
        if (ability_panels[0] && ability_panels[0].BHasClass('invisible')) {
            rm_visible_status = false;
        }
        if (xxx[i].BHasClass('opacity_5') && rm_visible_status) {
            filtered = false;
        }
    }
    if (class_name.indexOf('is_') >= 0) {
        if (filtered == true) {
            ShowBanOneSynergyOnChessListPanel();
        }
        else {
            ShowBanOneSynergyOnChessListPanel(class_name);
        }
    }

    if (xxx.length) {
        if (!filtered) {
            for (var j in yyy) {
                yyy[j].SetHasClass("opacity_100", false);
                yyy[j].SetHasClass("opacity_5", true);
            }
            for (var i in xxx) {
                var rm_visible_status = true;
                var ability_panels = xxx[i].FindChildrenWithClassTraverse('long_label_4_icons');
                if (ability_panels[0] && ability_panels[0].BHasClass('invisible')) {
                    rm_visible_status = false;
                }
                if (rm_visible_status) {
                    xxx[i].SetHasClass("opacity_100", true);
                    xxx[i].SetHasClass("opacity_5", false);
                }
            }
        }
        else {
            for (var j in yyy) {
                yyy[j].SetHasClass("opacity_100", true);
                yyy[j].SetHasClass("opacity_5", false);
            }
        }
    }
}

var VIP_VOTE_INFO, VOTE_INFO = {}, CURR_VOTE_CHESS, CURR_VOTE_INDEX, CURR_VOTE_ID;
var IS_PANEL_VOTE_OPEN = false;
function show_vote_panel(index) {
    if (IS_PANEL_VOTE_OPEN) {
        return;
    }
    if (!VIP_VOTE_INFO || !VIP_VOTE_INFO[index - 1]) {
        show_msg($.Localize('#' + 'vote_fail'));
    }
    // 显示投票面板
    $('#panel_vote').style['opacity'] = '1';
    $("#panel_vote").style['position'] = '0px 0px 0px';
    $("#panel_vote").style['transform'] = 'scale3d( 1,1,1)';
    Game.EmitSound("ui.settings_open");

    for (var i = 1; i <= 64; i++) {
        $('#panel_vote_chess_' + i).SetHasClass('invisible', true);
        $('#panel_vote_grid_' + i).style['background-image'] = 'none';
    }

    var v = VIP_VOTE_INFO[index - 1];
    var id = v.id;
    var title = id.split(':')[0];
    var time = id.split(':')[1];

    $('#text_vote_title').text = $.Localize('#' + title);
    $('#button_vote').SetHasClass('unavailable', false);
    CURR_VOTE_ID = id;
    var options = v.options;
    VOTE_INFO = {};
    IS_PANEL_VOTE_OPEN = true;

    for (var i = 0; i < options.length; i++) {
        var hero = CHESS_2_HERO[options[i]] || 'npc_dota_hero_wisp';

        var ii = 0, count = 0;
        while (!ii && count < 10000) {
            var ran = Math.floor(Math.random() * 64);
            if (!VOTE_INFO[ran]) {
                ii = ran;
            }
            count++;
        }

        if (!ii) {
            show_msg($.Localize('#' + 'vote_fail'));
            close_panel_vote();
            return;
        }


        VOTE_INFO[ii + 1] = options[i];
        $('#panel_vote_chess_' + (ii + 1)).heroname = hero;
        $('#panel_vote_chess_' + (ii + 1)).SetHasClass('invisible', false);
    }
}
function close_panel_vote() {
    $('#panel_vote').style['opacity'] = '0';
    $('#panel_vote').style['transform'] = 'scale3d( 0.95, 0.95, 0.95)';
    $('#panel_vote').style['position'] = '-100px -50px 0px';
    Game.EmitSound("Shop.PanelUp");
    IS_PANEL_VOTE_OPEN = false;
}

function vote_chess(index) {
    if (!VOTE_INFO[index]) {
        return;
    }
    if (CURR_VOTE_INDEX && CURR_VOTE_CHESS) {
        $('#panel_vote_grid_' + CURR_VOTE_INDEX).style['background-image'] = 'none';
        CURR_VOTE_CHESS = null;
        CURR_VOTE_INDEX = null;
    }

    var chess = VOTE_INFO[index];
    CURR_VOTE_CHESS = chess;
    CURR_VOTE_INDEX = index;
    $('#button_vote').style['opacity'] = '1';
    $('#panel_vote_grid_' + index).style['background-image'] = 'url("file://{images}/custom_game/vip/player_board_04.png")';
    Game.EmitSound('ui.npe_objective_given');

    $('#text_vote_title').text = $.Localize('#' + CURR_VOTE_ID.split(':')[0]) + ': ' + $.Localize('#' + chess);
}

function request_vote() {
    if (CURR_VOTE_ID && CURR_VOTE_CHESS) {
        SendHTTP('request_vote_chess', 'request_vote_chess_cb', {
            id: CURR_VOTE_ID,
            chess: CURR_VOTE_CHESS,
        }, 1);
        close_panel_vote();
    }
}
function request_casino_award() {
    SendHTTP('request_casino_award', 'request_casino_award_cb', { steam_id: local_id }, 1)
}
// 领取赛季奖励
function GetSeasonAward() {
    if (!IS_SEASON_AWARD_AVAILABLE) {
        return;
    }
    if ($('#button_get_season_award')) {
        $('#button_get_season_award').SetHasClass('unavailable', true);
    }

    var local_id = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
    if (!local_id) {
        IS_SEASON_AWARD_AVAILABLE = false;
        return;
    }
    IS_SEASON_AWARD_AVAILABLE = false;

    // 发送请求
    SendHTTP('get_season_award', 'get_season_award_cb', { steam_id: local_id }, 1)
}


function HighLightPlayerHPBar(player_id) {
    //
    // $('#player_hp_'+player_id).style['background-color'] = 'gradient( linear, 0% 0%, 0% 100%, from( #426d25  ), color-stop( 0.2, #5BB539 ), color-stop( .5, #4DA030), to( #426d25) );';
}



function SetPanelMouseOverTitleText(id, title, text) {
    if ($(id)) {
        $(id).SetPanelEvent("onmouseover",
            function () {
                $.DispatchEvent("DOTAShowTitleTextTooltip", $(id), title, text);
            }
        );
        $(id).SetPanelEvent("onmouseout",
            function () {
                $.DispatchEvent("DOTAHideTextTooltip");
                $.DispatchEvent("DOTAHideTitleTextTooltip");
            }
        );
    }
}

function GetPlayerIndexByPlayerID(player_id) {
    var player_id_info = CustomNetTables.GetTableValue("player_id_table", 'player_' + player_id);
    if (!player_id_info) {
        return;
    }
    return player_id_info.player_index;
}
function GetBadgeByPlayerID(player_id) {
    var badge_info = CustomNetTables.GetTableValue("player_id_table", 'badge_' + player_id);
    if (badge_info && badge_info.badge) {
        return badge_info.badge;
    }
    else {
        return null;
    }

}

function SetGoogieEggStatus(p) {
    p = parseInt(p);
    if (p == null || isNaN(p)) {
        return;
    }
    if (p < 0) p = 0;
    if (p > 15) p = 15;
    $('#text_panel_ranking_line_event_googie').text = $.Localize('#' + 'egg_quest_progress') + ': ' + p + '/15';
    if (p <= 3) {
        $('#img_event_status_pic_googie').SetImage('file://{images}/custom_game/award_item_egg_1.png');
    }
    else if (p <= 7) {
        $('#img_event_status_pic_googie').SetImage('file://{images}/custom_game/award_item_egg_2.png');
    }
    else if (p <= 11) {
        $('#img_event_status_pic_googie').SetImage('file://{images}/custom_game/award_item_egg_3.png');
    }
    else if (p <= 15) {
        $('#img_event_status_pic_googie').SetImage('file://{images}/custom_game/award_item_egg_4.png');
    }
}

function GetMMRLevelByScore(mmr, match) {
    if (!mmr) {
        mmr = 0;
    }
    var mmr_level = parseInt((mmr - 340) / 80);
    if (mmr_level > 38) {
        mmr_level = 38;
    }
    if (mmr_level < 1) {
        mmr_level = 1;
    }
    if (match && match >= 5) {
        return mmr_level;
    }
    else {
        return 0;
    }

}

function ShowRoundWinLose(data) {
    if (!CheckClientKey(data.key)) return;
    var is_myself = false;
    if (data.player_id == Players.GetLocalPlayer()) {
        is_myself = true;
    }
    data.player_id = GetPlayerIndexByPlayerID(data.player_id);
    if (data.player_id < 0 || data.player_id > 7) {
        //ob
        return;
    }
    $('#panel_player_round_winlose_' + (data.player_id)).style['background-image'] = "url('file://{images}/custom_game/round_" + data.winlose + ".png')";
    $('#panel_player_round_winlose_' + (data.player_id)).SetHasClass('invisible', false);

    if ($('#panel_battle_' + (data.player_id)) && $('#panel_battle_' + (data.player_id)).visible == true) {
        $('#panel_battle_' + (data.player_id)).SetHasClass(data.winlose, true);
    }

    if (is_myself) {
        // 是自己，显示上方panel的胜负旗子
        $('#panel_top_player_round_winlose').style['background-image'] = "url('file://{images}/custom_game/round_" + data.winlose + ".png')";
        $('#panel_top_player_round_winlose').SetHasClass('invisible', false);

        $('#round_status').text = $.Localize('#' + 'round_' + data.winlose);
        $('#round_status').SetHasClass('text_green', false);
        $('#round_status').SetHasClass('text_yellow', false);
        $('#round_status').SetHasClass('text_red', false);
        $('#round_status').SetHasClass('text_win', false);
        $('#round_status').SetHasClass('text_lose', false);
        $('#round_status').SetHasClass('text_draw', false);
        $('#round_status').SetHasClass('text_' + data.winlose, true);
        $('#round_status').style['margin-left'] = '60px';
    }
}
function ClearRoundWinLose(data) {
    if (!CheckClientKey(data.key)) return;
    for (var i = 0; i <= 7; i++) {
        $('#panel_player_round_winlose_' + i).SetHasClass('invisible', true);
    }
    $('#panel_top_player_round_winlose').SetHasClass('invisible', true);
}

function show_my_warehouse() {
    $('#button_show_my_warehouse').SetHasClass('invisible', true);
    $('#button_show_my_shop').SetHasClass('invisible', false);

    $('#store_panel_v5_goods_outer').style.width = '0px';
    // $('#store_panel_my_courier_list_outer').style.width = '670px';
    $('#store_panel_v5_my_courier_list_outer').style["margin-left"] = '0px';

    $('#my_courier_effect_bg').SetHasClass('active', false);
    $('#my_courier_projectile_bg').SetHasClass('active', false);
    $('#my_courier_animation_bg').SetHasClass('active', false);
    $('#my_courier_pet_bg').SetHasClass('active', false);
}
function show_my_shop() {
    $('#button_show_my_warehouse').SetHasClass('invisible', false);
    $('#button_show_my_shop').SetHasClass('invisible', true);

    $('#store_panel_v5_goods_outer').style.width = '1300px';
    // $('#store_panel_my_courier_list_outer').style.width = '0px';
    $('#store_panel_v5_my_courier_list_outer').style["margin-left"] = '20px';

    //自动选中当前信使
    choose_hero(MY_ONDUTY_HERO, MY_ONDUTY_HERO_INDEX);
}


function set_showing_courier(onduty_zhugong, new_index) {
    // 初始化
    $('#store_panel_my_courier_projectile').style['background-image'] = "url('file://{images}/custom_game/bg_lock.png')";
    $('#store_panel_my_courier_pet').style['background-image'] = "url('file://{images}/custom_game/bg_lock.png')";
    $('#store_panel_my_courier_effect').style['background-image'] = "url('file://{images}/custom_game/bg_lock.png')";
    // $('#store_panel_my_courier_courier').style['background-image'] = "url('file://{images}/custom_game/empty.png')";
    $('#store_panel_my_courier_projectile').style['opacity'] = "0";
    $('#store_panel_my_courier_pet').style['opacity'] = "0";
    $('#store_panel_my_courier_effect').style['opacity'] = "0";
    $('#courier_exp_level').text = "Lv.0";
    $('#courier_exp_bar_exp_1').style['width'] = '0px';
    $('#button_recycle_courier').SetHasClass('unavailable', true);

    var onduty_hero = onduty_zhugong.split('_')[0];
    // MY_ONDUTY_HERO = onduty_zhugong;
    var onduty_effect = onduty_zhugong.split('_')[1];
    var onduty_exp = onduty_zhugong.split('_')[2];
    var onduty_projectile = onduty_zhugong.split('_')[3];
    var onduty_pet = onduty_zhugong.split('_')[4];
    var onduty_animation = onduty_zhugong.split('_')[5];

    if ((SELECTED_COURIER_INDEX || SELECTED_COURIER_INDEX == 0) && $('#my_courier_list_' + SELECTED_COURIER_INDEX)) {
        $('#my_courier_list_' + SELECTED_COURIER_INDEX).SetHasClass('selected', false);
    }
    SELECTED_COURIER_INDEX = new_index;
    if ($('#my_courier_list_' + SELECTED_COURIER_INDEX)) {
        $('#my_courier_list_' + SELECTED_COURIER_INDEX).SetHasClass('selected', true);
    }

    if (SELECTED_COURIER_INDEX != MY_ONDUTY_HERO_INDEX && (!onduty_effect || onduty_effect == 'e000') && (!onduty_projectile || onduty_projectile == 'p000') && (!onduty_pet || onduty_pet == 't000')) {
        $('#button_recycle_courier').SetHasClass('unavailable', false);
    }

    fill_tags_container(onduty_hero, "#panel_my_courier_tags_container");

    var text = '';

    if (onduty_hero) {
        // <DOTAScenePanel style="width:400px;height:400px;horizontal-align:center;vertical-align:center;margin-top:200px;" light="global_light" camera="camera_1" unit="courier_h318"  particleonly="false" antialias="true"  hittest='false'/>
        $('#store_panel_my_courier_courier').RemoveAndDeleteChildren();
        $.CreatePanel('DOTAScenePanel', $('#store_panel_my_courier_courier'), "", {
            style: 'width:400px;height:400px;horizontal-align:center;vertical-align:top;overflow:noclip;',
            light: 'global_light',
            camera: 'camera_1',
            unit: 'courier_'+onduty_hero,
            particleonly: false,
            antialias: true,
            hittest: false,
        });


        // $('#store_panel_my_courier_courier').style['background-image'] = "url('file://{images}/custom_game/skaters/" + onduty_hero + ".png')";
        $('#store_panel_my_courier_courier_container').style['background-color'] = COLOR_STR[onduty_hero.slice(1, 2)];
        $('#store_panel_my_courier_courier_container').style['background-color-opacity'] = COLOR_STR_OPACITY[onduty_hero.slice(1, 2)];

        // $('#store_panel_my_courier_name_bar').style['background-color'] = 'rgba(0,0,0,0.9)';//COLOR[onduty_hero.slice(1,2)];
        $('#text_my_courier_name').text = $.Localize('#' + onduty_hero);
        // $('#text_my_courier_name').style['color'] = 'gradient( linear, 0% 0%, 0% 100%, from( white ), color-stop( 0.5, '+COLOR_STR[onduty_hero.slice(1,2)]+' ), to( '+COLOR_STR[onduty_hero.slice(1,2)]+' ) );';
        $('#text_my_courier_name').style['color'] = COLOR_STR[onduty_hero.slice(1, 2)];
    }

    if (!onduty_exp) {
        onduty_exp = 1.0;
    }
    if (onduty_exp) {
        var level_exp = parseFloat(onduty_exp);
        var level = Math.floor(level_exp);
        var exp = level_exp - level;
        $('#courier_exp_level').text = "Lv." + level;
        $('#courier_exp_bar_exp_1').style['width'] = 80 * exp + 'px';

        if (level >= 1) {
            // 1级解锁
            if (onduty_effect && onduty_effect != 'e000') {
                $('#store_panel_my_courier_effect').style['background-image'] = "url('file://{images}/custom_game/effect/" + onduty_effect + ".png')";
                $('#store_panel_my_courier_effect').style['opacity'] = "1";
                $('#icon_my_equiped_effect').style['background-color'] = COLOR[onduty_effect.slice(1, 2)];
                $('#text_my_courier_effect_line1').style['color'] = COLOR[onduty_effect.slice(1, 2)];
                $('#text_my_courier_effect_line1').text = $.Localize('#' + onduty_effect);
                $('#button_recycle_effect').SetHasClass('invisible', false);
                $('#button_recycle_effect').SetHasClass('unavailable', false);
            }
            else {
                // $('#store_panel_my_courier_effect').style['background-image'] = "url('s2r://panorama/images/items/emptyitembg_png.vtex')";
                $('#store_panel_my_courier_effect').style['opacity'] = "1";
                $('#icon_my_equiped_effect').style['background-color'] = '#000';
                $('#text_my_courier_effect_line1').style['color'] = '#bbb';
                $('#text_my_courier_effect_line1').text = $.Localize('#' + "type_e");
                $('#button_recycle_effect').SetHasClass('invisible', true);
            }
            $('#text_my_courier_effect_line2').SetHasClass('invisible', true);
            $('#icon_my_equiped_effect').SetHasClass('invisible', false);
            // $('#text_my_courier_effect_line1').style['color'] = '#444';
            // $('#text_my_courier_effect_line1').text = $.Localize('#'+"type_e");
        }
        else {
            $('#store_panel_my_courier_effect').style['opacity'] = "0";
            $('#text_my_courier_effect_line2').SetHasClass('invisible', false);
            $('#icon_my_equiped_effect').SetHasClass('invisible', true);
            $('#text_my_courier_effect_line1').style['color'] = '#bbb';
            $('#text_my_courier_effect_line1').text = $.Localize('#' + "type_e");
            $('#button_recycle_effect').SetHasClass('invisible', true);
        }

        if (level >= 10) {
            // 10级解锁
            if (onduty_projectile && onduty_projectile != 'p000') {
                $('#store_panel_my_courier_projectile').style['background-image'] = "url('file://{images}/custom_game/projectile/" + onduty_projectile + ".png')";
                $('#store_panel_my_courier_projectile').style['opacity'] = "1";
                $('#icon_my_equiped_projectile').style['background-color'] = COLOR[onduty_projectile.slice(1, 2)];
                $('#text_my_courier_projectile_line1').style['color'] = COLOR[onduty_projectile.slice(1, 2)];
                $('#text_my_courier_projectile_line1').text = $.Localize('#' + onduty_projectile);
                $('#button_recycle_projectile').SetHasClass('invisible', false);
                $('#button_recycle_projectile').SetHasClass('unavailable', false);
            }
            else {
                // $('#store_panel_my_courier_projectile').style['background-image'] = "url('s2r://panorama/images/items/emptyitembg_png.vtex')";
                $('#store_panel_my_courier_projectile').style['opacity'] = "1";
                $('#icon_my_equiped_projectile').style['background-color'] = '#000';
                $('#text_my_courier_projectile_line1').style['color'] = '#bbb';
                $('#text_my_courier_projectile_line1').text = $.Localize('#' + "type_p");
                $('#button_recycle_projectile').SetHasClass('invisible', true);
            }
            $('#text_my_courier_projectile_line2').SetHasClass('invisible', true);
            $('#icon_my_equiped_projectile').SetHasClass('invisible', false);
            // $('#text_my_courier_projectile_line1').style['color'] = '#444';
            // $('#text_my_courier_projectile_line1').text = $.Localize('#'+"type_p");
        }
        else {
            $('#store_panel_my_courier_projectile').style['opacity'] = "0";
            $('#text_my_courier_projectile_line2').SetHasClass('invisible', false);
            $('#icon_my_equiped_projectile').SetHasClass('invisible', true);
            $('#text_my_courier_projectile_line1').style['color'] = '#bbb';
            $('#text_my_courier_projectile_line1').text = $.Localize('#' + "type_p");
            $('#button_recycle_projectile').SetHasClass('invisible', true);
        }

        if (level >= 20) {
            // 20级解锁
            if (onduty_animation && onduty_animation != 'n000') {
                $('#store_panel_my_courier_animation').style['background-image'] = "url('file://{images}/custom_game/animation/" + onduty_animation + ".png')";
                $('#store_panel_my_courier_animation').style['opacity'] = "1";
                $('#icon_my_equiped_animation').style['background-color'] = COLOR[onduty_animation.slice(1, 2)];
                $('#text_my_courier_animation_line1').style['color'] = COLOR[onduty_animation.slice(1, 2)];
                $('#text_my_courier_animation_line1').text = $.Localize('#' + onduty_animation);
                $('#button_recycle_animation').SetHasClass('invisible', false);
                $('#button_recycle_animation').SetHasClass('unavailable', false);
            }
            else {
                // $('#store_panel_my_courier_animation').style['background-image'] = "url('s2r://panorama/images/items/emptyitembg_png.vtex')";
                $('#store_panel_my_courier_animation').style['opacity'] = "1";
                $('#icon_my_equiped_animation').style['background-color'] = '#000';
                $('#text_my_courier_animation_line1').style['color'] = '#bbb';
                $('#text_my_courier_animation_line1').text = $.Localize('#' + "type_n");
                $('#button_recycle_animation').SetHasClass('invisible', true);
            }
            $('#text_my_courier_animation_line2').SetHasClass('invisible', true);
            $('#icon_my_equiped_animation').SetHasClass('invisible', false);
            // $('#text_my_courier_projectile_line1').style['color'] = '#444';
            // $('#text_my_courier_projectile_line1').text = $.Localize('#'+"type_p");
        }
        else {
            $('#store_panel_my_courier_animation').style['opacity'] = "0";
            $('#text_my_courier_animation_line2').SetHasClass('invisible', false);
            $('#icon_my_equiped_animation').SetHasClass('invisible', true);
            $('#text_my_courier_animation_line1').style['color'] = '#bbb';
            $('#text_my_courier_animation_line1').text = $.Localize('#' + "type_n");
            $('#button_recycle_animation').SetHasClass('invisible', true);
        }

        if (level >= 30) {
            //30级解锁
            if (onduty_pet && onduty_pet != 't000') {
                $('#store_panel_my_courier_pet').style['background-image'] = "url('file://{images}/custom_game/pets/" + onduty_pet + ".png')";
                $('#store_panel_my_courier_pet').style['opacity'] = "1";
                $('#icon_my_equiped_pet').style['background-color'] = COLOR[onduty_pet.slice(1, 2)];
                $('#text_my_courier_pet_line1').style['color'] = COLOR[onduty_pet.slice(1, 2)];
                $('#text_my_courier_pet_line1').text = $.Localize('#' + onduty_pet);
                $('#button_recycle_pet').SetHasClass('invisible', false);
                $('#button_recycle_pet').SetHasClass('unavailable', false);
            }
            else {
                // $('#store_panel_my_courier_pet').style['background-image'] = "url('s2r://panorama/images/items/emptyitembg_png.vtex')";
                $('#store_panel_my_courier_pet').style['opacity'] = "1";
                $('#icon_my_equiped_pet').style['background-color'] = '#000';
                $('#text_my_courier_pet_line1').style['color'] = '#bbb';
                $('#text_my_courier_pet_line1').text = $.Localize('#' + "type_t");
                $('#button_recycle_pet').SetHasClass('invisible', true);
            }
            $('#text_my_courier_pet_line2').SetHasClass('invisible', true);
            $('#icon_my_equiped_pet').SetHasClass('invisible', false);
            // $('#text_my_courier_pet_line1').style['color'] = '#444';
            // $('#text_my_courier_pet_line1').text = $.Localize('#'+"type_t");
        }
        else {
            $('#store_panel_my_courier_pet').style['opacity'] = "0";
            $('#text_my_courier_pet_line2').SetHasClass('invisible', false);
            $('#icon_my_equiped_pet').SetHasClass('invisible', true);
            $('#text_my_courier_pet_line1').style['color'] = '#bbb';
            $('#text_my_courier_pet_line1').text = $.Localize('#' + "type_t");
            $('#button_recycle_pet').SetHasClass('invisible', true);
        }

    }
}
function get_courier_info(courier_str) {
    if (!courier_str) {
        return null;
    }
    if (courier_str.slice(0, 1) != 'h') {
        return null;
    }
    var courier = courier_str.split('_')[0];
    var effect = courier_str.split('_')[1];
    if (effect == 'e000') {
        effect = null;
    }

    var level_exp = parseFloat(courier_str.split('_')[2]) || 1;
    var level = Math.floor(level_exp);
    var exp = level_exp - level;

    var projectile = courier_str.split('_')[3];
    if (projectile == 'p000') {
        projectile = null;
    }
    var pet = courier_str.split('_')[4];
    if (pet == 't000') {
        pet = null;
    }
    var animation = courier_str.split('_')[5];
    if (animation == 'n000') {
        animation = null;
    }

    var courier_info = {
        courier: courier,
        effect: effect,
        exp: exp,
        projectile: projectile,
        pet: pet,
        animation: animation,
        level_exp: level_exp,
        level: level,
        exp: exp,
        rarity: parseInt(courier.slice(1, 2)),
    };

    return courier_info;
}

var CAN_MERGE_COUNT = 0;

function sort_courier_list(zhugong_list) {
    zhugong_list.sort(function (a, b) {
        var score_b = 0;
        var score_a = 0;

        var info_b = get_courier_info(b);
        var info_a = get_courier_info(a);

        if (info_a && info_b) {
            score_a += (info_a.level_exp || 0) * 1000000;
            score_b += (info_b.level_exp || 0) * 1000000;
        }
        if ((info_a.rarity || 0) > (info_b.rarity || 0)) {
            score_a += 10000;
        }
        else if ((info_a.rarity || 0) < (info_b.rarity || 0)) {
            score_b += 10000;
        }
        if ((info_a.effect || 'e000') > (info_b.effect || 'e000')) {
            score_a += 100;
        }
        else if ((info_a.effect || 'e000') < (info_b.effect || 'e000')) {
            score_b += 100;
        }
        if ((info_a.projectile || 'p000') > (info_b.projectile || 'p000')) {
            score_a += 100;
        }
        else if ((info_a.projectile || 'p000') < (info_b.projectile || 'p000')) {
            score_b += 100;
        }
        if ((info_a.animation || 'n000') > (info_b.animation || 'n000')) {
            score_a += 100;
        }
        else if ((info_a.animation || 'n000') < (info_b.animation || 'n000')) {
            score_b += 100;
        }
        if ((info_a.pet || 't000') > (info_b.pet || 't000')) {
            score_a += 100;
        }
        else if ((info_a.pet || 't000') < (info_b.pet || 't000')) {
            score_b += 100;
        }
        if (info_a.courier > info_b.courier) {
            score_a += 1;
        }
        else if (info_a.courier < info_b.courier) {
            score_b += 1;
        }
        return score_b - score_a;
    });

    return zhugong_list;
}

function fill_tags_container(item, container_name, subtype, align) {
    if (!$(container_name)) {
        return;
    }
    var text = "";

    text += '<Panel style="horizontal-align:' + (align || 'center') + ';flow-children:right;">';

    var rarity = item.slice(1, 2);
    if (rarity) {
        if (rarity == '0') {
            rarity = 1;
        }
        text += '<Panel class="tags_one" style="background-color:' + COLOR["" + rarity] + ';">';
        text += '<Label text="' + $.Localize('#' + 'rarity_' + rarity) + '"/>';
        text += '</Panel>';
    }

    if (subtype) {
        text += '<Panel class="tags_one" style="background-color:' + COLOR["1"] + ';">';
        text += '<Label text="' + $.Localize('#' + 'type_' + subtype) + '"/>';
        text += '</Panel>';
    }

    var type = item.slice(0, 1);
    if (type) {
        text += '<Panel class="tags_one" style="background-color:' + COLOR["1"] + ';">';
        text += '<Label text="' + $.Localize('#' + 'type_' + type) + '"/>';
        text += '</Panel>';
    }

    text += '</Panel>';

    $(container_name).RemoveAndDeleteChildren();
    // $(container_name).BCreateChildren(text);
    CreateChildren($(container_name), text);
}

function refresh_shop_goods_status() {
    var is_shop_available = true;
    if (Game.GetMapInfo().map_display_name == 'candy_5_1x8') {
        is_shop_available = false;
    }

    var courier_info = get_courier_info(MY_ONDUTY_HERO);
    if (!courier_info) {
        return;
    }
    var level = courier_info.level || 1;
    var good_type = 'unknown';
    var is_already_have = false;

    for (var i in SHOP_GOODS_STATUS) {
        var is_slot_full = false;
        var need_level = 1;
        if (i.indexOf('texiao') > -1) {
            need_level = 1;
            if (courier_info.effect) {
                is_slot_full = true;
            }
            good_type = 'effect';
        }
        if (i.indexOf('dandao') > -1) {
            need_level = 10;
            if (courier_info.projectile) {
                is_slot_full = true;
            }
            good_type = 'projectile';
        }
        if (i.indexOf('animation') > -1) {
            need_level = 20;
            if (courier_info.animation) {
                is_slot_full = true;
            }
            good_type = 'animation';
        }
        if (i.indexOf('pet') > -1) {
            need_level = 30;
            if (courier_info.pet) {
                is_slot_full = true;
            }
            good_type = 'pet';
        }
        if (i.indexOf('courier') > -1) {
            need_level = 0;
            already_have = false; // 不占用信使栏位
            good_type = 'courier';
        }
        if (i.indexOf('emotion') > -1) {
            need_level = 0;
            is_slot_full = false; // 不占用信使栏位
            good_type = 'emotion';
            if (MY_EMOTION_LIST && MY_EMOTION_LIST.indexOf(SHOP_GOODS_STATUS[i].id) >= 0) {
                is_already_have = true;
            }
            else {
                is_already_have = false;
            }
        }
        if (i.indexOf('chessboard') > -1) {
            need_level = 0;
            is_slot_full = false; // 不占用信使栏位
            good_type = 'chessboard';

            // if (MY_EMOTION_LIST && MY_EMOTION_LIST.indexOf(SHOP_GOODS_STATUS[i].id)>=0){
            //     is_already_have = true;
            // }
            // else{
            //     is_already_have = false;
            // }
            is_already_have = false;

            if (SHOP_GOODS_STATUS[i] && SHOP_GOODS_STATUS[i].id && MY_CHESSBOARD_LIST && MY_CHESSBOARD_LIST.length) {
                for (var j = 0; j < MY_CHESSBOARD_LIST.length; j++) {
                    if (MY_CHESSBOARD_LIST[j].id == SHOP_GOODS_STATUS[i].id) {
                        is_already_have = true;
                    }
                }
            }
        }
        var price = SHOP_GOODS_STATUS[i].price;
        var money = SHOP_GOODS_STATUS[i].money;
        var my_money = MY_CANDY || 0;
        if (money == 'biscuit') {
            my_money = MY_BISCUIT || 0;
        }

        if (good_type == 'courier' || good_type == 'emotion' || good_type == 'chessboard') {
            if (is_shop_available && my_money >= price && !is_already_have) {
                $(i).SetHasClass('unavailable', false);
            }
            else {
                $(i).SetHasClass('unavailable', true);
            }
        }
        else if (good_type == 'effect' || good_type == 'projectile' || good_type == 'animation' || good_type == 'pet') {
            // 占用信使栏位的
            if (is_shop_available && MY_ONDUTY_HERO_INDEX == SELECTED_COURIER_INDEX && !is_slot_full && level >= need_level) {
                if (my_money >= price) {
                    $(i).SetHasClass('unavailable', false);
                }
                else {
                    $(i).SetHasClass('unavailable', true);
                }
            }
            else {
                $(i).SetHasClass('unavailable', true);
            }
        }
        else {
            $(i).SetHasClass('unavailable', true);
        }
    }
}

function OnRequestPlayerLanguage(data) {
    if (!CheckClientKey(data.key)) return;
    GameEvents.SendCustomGameEventToServer("player_language",
    {
        "hehe": Date.now(),
        "language": $.Language(),
    });
}

function show_ban_panel_chess_list() {
    show_chess_list();
    ShowList(true);
}

show_chess_list();
function show_chess_list() {
    $('#chess_list_1').visible = true;
    $('#chess_list_2').visible = true;
    $('#chess_list_3').visible = true;
    $('#chess_list_4').visible = true;
    $('#chess_list_5').visible = true;
    $('#item_list_1').visible = false;
    $('#item_list_2').visible = false;
    $('#item_list_3').visible = false;
    $('#item_list_4').visible = false;
    $('#item_list_5').visible = false;
    $('#item_list_relic').visible = false;
    $('#text_chess_list_title').text = $.Localize('#' + 'chess_list') + ' (' + CHESS_COUNT + ')';
}
function show_item_list() {
    $('#chess_list_1').visible = false;
    $('#chess_list_2').visible = false;
    $('#chess_list_3').visible = false;
    $('#chess_list_4').visible = false;
    $('#chess_list_5').visible = false;
    $('#item_list_1').visible = true;
    $('#item_list_2').visible = true;
    $('#item_list_3').visible = true;
    $('#item_list_4').visible = true;
    $('#item_list_5').visible = true;
    $('#item_list_relic').visible = true;
    $('#text_chess_list_title').text = $.Localize('#' + 'item_list') + ' (' + ITEM_COUNT + ' + ' + RELIC_COUNT + ')';
}
// function show_relic_list() {
//     $('#chess_list_1').style['width'] = "0px";
//     $('#chess_list_2').style['width'] = "0px";
//     $('#chess_list_3').style['width'] = "0px";
//     $('#chess_list_4').style['width'] = "0px";
//     $('#chess_list_5').style['width'] = "0px";
//     $('#item_list_1').style['width'] = "0px";
//     $('#item_list_2').style['width'] = "0px";
//     $('#item_list_3').style['width'] = "0px";
//     $('#item_list_4').style['width'] = "0px";
//     $('#item_list_5').style['width'] = "0px";
//     $('#item_list_relic').style['width'] = "360px";
//     $('#text_chess_list_title').text = $.Localize('#' + 'relic_list') + ' (' + RELIC_COUNT + ')';
// }

function GetWSColor(win_streak) {
    var ws_color = '#ddd';
    if (win_streak >= 5) {
        ws_color = '#ffff88';
    }
    if (win_streak >= 8) {
        ws_color = '#ff8844';
    }
    if (win_streak >= 10) {
        ws_color = '#ff2222';
    }
    return ws_color;
}

function Chess2HeroName(show_name) {
    var hero = null;
    if (show_name.indexOf('11') > -1) {
        show_name = show_name.substr(0, show_name.length - 2);
    }
    if (show_name.indexOf('1') > -1) {
        show_name = show_name.substr(0, show_name.length - 1);
    }
    if (CHESS_2_HERO[show_name]) {
        hero = CHESS_2_HERO[show_name];
    }
    return hero;
}

// 根据当前的筛选，在棋子图鉴面板中显示ban的按钮
function ShowBanOneSynergyOnChessListPanel(synergy) {
    if (!synergy) {
        $('#panel_list_ban_chess').RemoveAndDeleteChildren();
        return;
    }
    var curr_money = Entities.GetMana(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
    var synergy_table = GetTableSafe("chess_pool_table", 'synergy_info');
    var ban_info = CustomNetTables.GetTableValue("chess_pool_table", 'ban_info');

    var local_steam_id = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
    var player_info_table = CustomNetTables.GetTableValue("player_info_table", 'player_info');

    if (!player_info_table || !player_info_table.data) {
        return;
    }

    var my_info = player_info_table.data[local_steam_id];
    var already_have_count = 0;

    // 统计已有多少
    if (my_info) {
        if (my_info.ban_synergy) {
            // 已有的ban棋子
            $('#panel_list_ban_chess').RemoveAndDeleteChildren();
            return;
        }
        var my_lineup = my_info.chess_lineup.split(',');
        var my_hand = my_info.chess_hand.split(',');
        for (var c = 0; c < my_lineup.length; c++) {
            if (my_lineup[c]) {
                var base_chess_name = '';
                var chess_count = 0;
                if (my_lineup[c].indexOf('11') > -1) {
                    // 3星怪
                    base_chess_name = my_lineup[c].substr(0, my_lineup[c].length - 2);
                    chess_count = 9;
                }
                else if (my_lineup[c].indexOf('1') > -1) {
                    // 2星怪
                    base_chess_name = my_lineup[c].substr(0, my_lineup[c].length - 1);
                    chess_count = 3;
                }
                else {
                    base_chess_name = my_lineup[c];
                    chess_count = 1;
                }
                if (CHESS_2_SPEC_CLASS[base_chess_name]) {
                    var spec_class = CHESS_2_SPEC_CLASS[base_chess_name].split(',');
                    if (spec_class) {
                        for (var s = 0; s < spec_class.length; s++) {
                            var spec = spec_class[s];
                            if (spec == synergy) {
                                already_have_count += chess_count;
                            }
                        }
                    }
                }
            }

        }
        for (var c = 0; c < my_hand.length; c++) {
            if (my_hand[c]) {
                var base_chess_name = '';
                var chess_count = 0;
                if (my_hand[c].indexOf('11') > -1) {
                    // 三星怪
                    base_chess_name = my_hand[c].substr(0, my_hand[c].length - 2);
                    chess_count = 9;
                }
                else if (my_hand[c].indexOf('1') > -1) {
                    // 三星怪
                    base_chess_name = my_hand[c].substr(0, my_hand[c].length - 1);
                    chess_count = 3;
                }
                else {
                    base_chess_name = my_hand[c];
                    chess_count = 1;
                }
                if (CHESS_2_SPEC_CLASS[base_chess_name]) {
                    var spec_class = CHESS_2_SPEC_CLASS[base_chess_name].split(',');
                    if (spec_class) {
                        for (var s = 0; s < spec_class.length; s++) {
                            var spec = spec_class[s];
                            if (spec == synergy) {
                                already_have_count += chess_count;
                            }
                        }
                    }
                }
            }
        }
    }

    // 计算ban的价格
    var ban_price = 999;
    if (ban_info[synergy]) {
        ban_price = ban_info[synergy].ban_price || 999;
    }
    if (HasModifier('modifier_item_free_ban')) {
        ban_price = 0;
    }
    if (synergy == 'is_undead') {
        return;
    }
    // 渲染UI
    var text = '';
    text += '<Panel class = "ban_item_one" onactivate = "BanChess(\'' + synergy + '\')" onmouseover="DOTAShowAbilityTooltip(' + synergy + ')" onmouseout="DOTAHideAbilityTooltip()" style="margin-top:0px;margin-right:0px;">';
    // text += '<Image class = "ban_item_one_image" src="file://{images}/custom_game/banlist/'+synergy+'_banned.png"/>';
    text += '<DOTAAbilityImage class = "ban_item_one_image" abilityname="' + synergy + '"/>';

    text += '<Panel class = "ban_item_label_container">';
    text += '<Label class = "ban_item_one_label" text="' + $.Localize('#' + 'text_ban_synergy') + ': ' + $.Localize('#' + 'DOTA_Tooltip_ability_' + synergy) + '"/>';
    if (already_have_count) {
        text += '<Label class = "ban_item_one_label2" text="' + $.Localize('#' + 'text_already_have') + (already_have_count || 0) + '"/>';
    }
    text += '</Panel>';
    text += '<Panel class = "ban_item_one_price"><Image src="file://{images}/custom_game/money.png"/>';
    if (ban_price == 0) {
        text += '<Label style="color:#88ff88;" text = "× ' + ban_price + '"/>';
    }
    else if (ban_price <= curr_money) {
        text += '<Label style="color:#fff;" text = "× ' + ban_price + '"/>';
    }
    else {
        text += '<Label style="color:#ff4444;" text = "× ' + ban_price + '"/>';
    }
    text += '</Panel></Panel>';

    $('#panel_list_ban_chess').RemoveAndDeleteChildren();
    // $('#panel_list_ban_chess').BCreateChildren(text);  
    CreateChildren($('#panel_list_ban_chess'), text);
}

function OnShowBanChoose(keys) {
    if (!CheckClientKey(keys.key)) return;

    var curr_money = keys.curr_money;
    var synergy_table = GetTableSafe("chess_pool_table", 'synergy_info');
    var ban_info = CustomNetTables.GetTableValue("chess_pool_table", 'ban_info');

    var local_steam_id = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
    var player_info_table = CustomNetTables.GetTableValue("player_info_table", 'player_info');
    if (!player_info_table || !player_info_table.data) {
        return;
    }

    var my_info = player_info_table.data[local_steam_id];
    var synergy_table_me = {};
    if (my_info) {
        var my_lineup = my_info.chess_lineup.split(',');
        var my_hand = my_info.chess_hand.split(',');
        for (var c = 0; c < my_lineup.length; c++) {
            if (my_lineup[c]) {
                var base_chess_name = '';
                var chess_count = 0;
                if (my_lineup[c].indexOf('11') > -1) {
                    // 3星怪
                    base_chess_name = my_lineup[c].substr(0, my_lineup[c].length - 2);
                    chess_count = 9;
                }
                else if (my_lineup[c].indexOf('1') > -1) {
                    // 2星怪
                    base_chess_name = my_lineup[c].substr(0, my_lineup[c].length - 1);
                    chess_count = 3;
                }
                else {
                    base_chess_name = my_lineup[c];
                    chess_count = 1;
                }
                if (CHESS_2_SPEC_CLASS[base_chess_name]) {
                    var spec_class = CHESS_2_SPEC_CLASS[base_chess_name].split(',');
                    if (spec_class) {
                        for (var s = 0; s < spec_class.length; s++) {
                            var spec = spec_class[s];
                            if (!synergy_table_me[spec]) {
                                synergy_table_me[spec] = 0;
                            }
                            synergy_table_me[spec] += chess_count;
                        }
                    }
                }
            }

        }
        for (var c = 0; c < my_hand.length; c++) {
            if (my_hand[c]) {
                var base_chess_name = '';
                var chess_count = 0;
                if (my_hand[c].indexOf('11') > -1) {
                    // 三星怪
                    base_chess_name = my_hand[c].substr(0, my_hand[c].length - 2);
                    chess_count = 9;
                }
                else if (my_hand[c].indexOf('1') > -1) {
                    // 三星怪
                    base_chess_name = my_hand[c].substr(0, my_hand[c].length - 1);
                    chess_count = 3;
                }
                else {
                    base_chess_name = my_hand[c];
                    chess_count = 1;
                }
                if (CHESS_2_SPEC_CLASS[base_chess_name]) {
                    var spec_class = CHESS_2_SPEC_CLASS[base_chess_name].split(',');
                    if (spec_class) {
                        for (var s = 0; s < spec_class.length; s++) {
                            var spec = spec_class[s];
                            if (!synergy_table_me[spec]) {
                                synergy_table_me[spec] = 0;
                            }
                            synergy_table_me[spec] += chess_count;
                        }
                    }
                }
            }
        }
    }


    // 渲染每一个ban种类的价格
    if (synergy_table) {
        var SYNERGY_ORDER = {
            is_satyr: 0.5,
            is_nraqi: 0.6,
            is_harpy: 0.62,
            is_draenei: 0.65,
            is_centaur: 0.7,
            is_pandaman: 1,
            is_kobold: 1.1,
            is_monk: 1.2,
            is_tauren: 1.3,

            is_dwarf: 2,
            is_demonhunter: 2.1,
            is_ogre: 2.2,

            is_shaman: 3,
            is_wizard: 3.1,
            is_priest: 3.2,

            is_element: 4,
            is_god: 4.1,
            is_naga: 4.2,
            is_druid: 4.3,
            is_aqir: 4.4,

            is_mech: 5.0,
            is_dragon: 5.1,
            is_beast: 5.2,

            is_orc: 6,
            is_troll: 6.1,

            is_warlock: 7.0,
            is_goblin: 7.1,
            is_demon: 7.2,
            is_knight: 7.3,
            is_human: 7.4,

            is_undead: 8,

            is_mage: 9,
            is_elf: 9.1,
            is_hunter: 9.2,
            is_assassin: 9.3,

            is_warrior: 12,
        };

        // 排序synergy_table
        var synergy_arr = [];
        for (var i in synergy_table) {
            var count = 0;
            for (ii in synergy_table[i]) {
                count++;
            }
            synergy_arr.push({
                synergy: i,
                count: count,
            });
        }
        synergy_arr.sort(function (a, b) {
            return (SYNERGY_ORDER[b.synergy] || 0) - (SYNERGY_ORDER[a.synergy] || 0);
        });

        var text = '';
        for (var i = 0; i < synergy_arr.length; i++) {
            var count = synergy_arr[i].count;
            if (count > 0) {
                var synergy = synergy_arr[i].synergy;

                // $('#'+i+'_price').text = '× '+;
                if (synergy == 'is_undead') {
                    continue;
                }
                text += '<Panel class = "ban_item_one" onactivate = "BanChess(\'' + synergy + '\')" onmouseover="DOTAShowAbilityTooltip(' + synergy + ')" onmouseout="DOTAHideAbilityTooltip()">';
                // text += '<Image class = "ban_item_one_image" src="file://{images}/custom_game/banlist/'+synergy+'_banned.png"/>';
                text += '<DOTAAbilityImage class = "ban_item_one_image" abilityname="' + synergy + '"/>';

                text += '<Panel class = "ban_item_label_container">';
                text += '<Label class = "ban_item_one_label" text="' + $.Localize('#' + 'DOTA_Tooltip_ability_' + synergy) + '"/>';
                if (synergy_table_me[synergy]) {
                    text += '<Label class = "ban_item_one_label2" text="' + $.Localize('#' + 'text_already_have') + (synergy_table_me[synergy] || 0) + '"/>';
                }
                text += '</Panel>';
                text += '<Panel class = "ban_item_one_price"><Image style="width:35px;height:35px;" src="file://{images}/custom_game/money.png"/>';
                var price = ban_info[synergy].ban_price || 999;
                if (HasModifier('modifier_item_free_ban')) {
                    price = 0;
                }
                if (price <= curr_money) {
                    text += '<Label style="color:#fff;font-family:titleFont;" text = "× ' + price + '"/>';
                }
                else {
                    text += '<Label style="color:#ff4444;font-family:titleFont;" text = "× ' + price + '"/>';
                }
                text += '</Panel></Panel>';
            }
        }

        $('#ban_body').RemoveAndDeleteChildren();
        // $('#ban_body').BCreateChildren(text); 
        CreateChildren($('#ban_body'), text);

        ShowExclusionWindow('ban_panel', true);
    }
}

function OnShowConfirmUnbanSynergy(keys) {
    if (!CheckClientKey(keys.key)) return;
    show_confirm($.Localize('#' + 'text_confirm_unban_chess'), function () {
        request_unban_chess();
    });
}
function request_unban_chess() {
    close_confirm();
    GameEvents.SendCustomGameEventToServer("request_unban_chess", {
    });
}

var BAN_SYNERGY, BAN_PRICE;
function BanChess(synergy) {

    var synergy_table = GetTableSafe("chess_pool_table", 'synergy_info');
    var ban_info = CustomNetTables.GetTableValue("chess_pool_table", 'ban_info');
    var price = Math.round(ban_info[synergy].price || 999);

    if (!synergy_table || !synergy_table[synergy]) {
        return;
    }
    var tip_text = $.Localize('#' + 'text_confirm_ban_chess1') + ' <font color="#ff4444">' + $.Localize('#' + 'DOTA_Tooltip_ability_' + synergy) + '</font>' + $.Localize('#' + 'text_confirm_ban_chess2');

    // var chess_arr = [];
    // for (var i in synergy_table[synergy]) {
    //     var c = synergy_table[synergy][i];
    //     chess_arr.push({
    //         chess: c,
    //         cost: CHESS_2_LEVEL[c],
    //     });
    // }
    // chess_arr.sort((a, b) => {
    //     return a.cost - b.cost;
    // });

    // for (var i = 0; i < chess_arr.length; i++) {
    //     var s = chess_arr[i].chess;
    //     // tip_text += "<img src='file://{images}/custom_game/chess_icon/" + s + ".png'>";
    // }
    BAN_SYNERGY = synergy;
    BAN_PRICE = price;
    show_confirm(tip_text, function () {
        request_ban_chess();
    }, {
        ban_synergy: synergy,
        chess_list: ban_info[synergy].chess_list,
    });
}

function close_ban_choose() {
    ShowExclusionWindow('ban_panel', false);
}


function request_ban_chess(synergy, price) {
    close_confirm();
    GameEvents.SendCustomGameEventToServer("request_ban_chess", {
        "synergy": BAN_SYNERGY,
        "price": BAN_PRICE,
    });
    $('#panel_list_ban_chess').RemoveAndDeleteChildren();
}

function OnBanChess(keys) {
    var synergy = keys.synergy;
    close_ban_choose();
    if (synergy) {
        var synergy_table = GetTableSafe("chess_pool_table", 'synergy_info');
        var s = synergy_table[synergy];
        SetBannedChessStatus(s);
    }
}
function OnUnBanChess(keys) {
    UnsetBannedChessStatus();
}
function IsOBing() {
    return (Game.GetPlayerInfo(Players.GetLocalPlayer()).player_team_id == 1);
}

function confirm_lottery() {
    if ($('#buy_courier_lottery').BHasClass('unavailable')) {
        return;
    }
    show_confirm($.Localize('#' + 'buyniudan'), function () {
        lottery_go();
    }, null, $.Localize('#skip_animation'));
}

function fill_goods_tag(id, tag) {
    $('#goods_tag_' + id).SetHasClass('invisible', true);
    if (tag) {
        $('#text_goods_tag_' + id).text = tag;
        $('#goods_tag_' + id).SetHasClass('invisible', false);
    }
    if (tag == 'new') {
        $('#text_goods_tag_' + id).text = $.Localize('#' + 'tag_new');
        $('#goods_tag_' + id).SetHasClass('invisible', false);
    }
    if (tag == 'recomment') {
        $('#text_goods_tag_' + id).text = $.Localize('#' + 'tag_recomment');
        $('#goods_tag_' + id).SetHasClass('invisible', false);
    }
    if (tag == 'festival') {
        $('#text_goods_tag_' + id).text = $.Localize('#' + 'tag_festival');
        $('#goods_tag_' + id).SetHasClass('invisible', false);
    }
    if (tag == 'pass_only') {
        $('#text_goods_tag_' + id).text = $.Localize('#' + 'tag_pass_only');
        $('#goods_tag_' + id).SetHasClass('invisible', false);
    }
    if (tag == 'season') {
        $('#text_goods_tag_' + id).text = $.Localize('#' + 'tag_season');
        $('#goods_tag_' + id).SetHasClass('invisible', false);
    }
}

function ForceSingleSelection() {
    let selected = Players.GetSelectedEntities(Players.GetLocalPlayer());
    let main = Players.GetLocalPlayerPortraitUnit();
    if (selected.length > 1) {
        GameUI.SelectUnit(main, false);
    }
}


// 点击“别处”关闭：表情轮盘 / 阵型轮盘 / 设置
function DacClosePopupsOnClick(eventName, mouseButton) {
    if (eventName !== 'pressed') { return; }
    if (mouseButton !== 0 && mouseButton !== 1) { return; }
    var e = $('#panel_emotion_box');
    if (e && !e.BHasClass('invisible')) { HideChatEmotion(); }
    var l = $('#panel_lineup_box');
    if (l && !l.BHasClass('invisible')) { HideLineupShortCuts(); }
    var c = FindDotaHudElement('panel_config');
    if (c && c.BHasClass('show')) { c.SetHasClass('show', false); }
}
// 监听鼠标事件
if (Players.GetTeam(Players.GetLocalPlayer()) != 1) {
    GameUI.SetMouseCallback((eventName, mouseButton) => {
        // 先处理“点击别处关闭弹窗”，再走原来的选人逻辑
        try { DacClosePopupsOnClick(eventName, mouseButton); } catch (e0) { }
        const CONSUME_EVENT = true;
        const CONTINUE_EVENT = false;
        const LEFT_BUTTON = 0;
        const RIGHT_BUTTON = 1;

        if (GameUI.GetClickBehaviors() !== CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_NONE)
            return CONTINUE_EVENT;
        if (eventName === "pressed") {
            if (mouseButton === LEFT_BUTTON) {
                // 左键点击
                if (!IS_CURSOR_HERO_ICON_SHOWING) {
                    // 当前不显示英雄小图标
                    PORTRAIT_UNIT = Players.GetLocalPlayerPortraitUnit();
                    $.Schedule(0.01, () => {
                        OnPlayerSelectUnit();
                    });

                    return CONTINUE_EVENT;
                }
                else {
                    // 当前显示英雄小图标
                    var position = Game.ScreenXYToWorld(GameUI.GetCursorPosition()[0], GameUI.GetCursorPosition()[1]);
                    GameEvents.SendCustomGameEventToServer("pick_chess_position", { x: position[0], y: position[1], z: position[2], player_id: Game.GetLocalPlayerID(), is_slide_mode: IsTouchMode() });
                    var par = Particles.CreateParticle("particles/ui_mouseactions/clicked_basemove.vpcf", 0, 0);
                    Particles.SetParticleControl(par, 0, position);
                    Particles.SetParticleControl(par, 1, { x: 0, y: 255, z: 0 });
                    hide_cursor_hero();
                    return CONSUME_EVENT;
                }

            }

            if (mouseButton === RIGHT_BUTTON && IS_CURSOR_HERO_ICON_SHOWING) {
                // 右键点击，当前显示英雄小图标
                GameEvents.SendCustomGameEventToServer("cancel_pick_chess_position", { player_id: Game.GetLocalPlayerID() });
                // GameUI.SelectUnit(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), false);
                hide_cursor_hero();
                return CONSUME_EVENT;
            }
            if (mouseButton === RIGHT_BUTTON && IsOBing()) {
                // OB位屏蔽右键
                return CONSUME_EVENT;
            }
        }
        if (eventName == 'doublepressed') {
            return CONSUME_EVENT;
        }

        if (eventName === "wheeled") {
            g_targetDistance += mouseButton * -100;
            smoothCameraDistance();

            return CONSUME_EVENT;
        }

        return CONTINUE_EVENT;
    });
}

var IS_CLICK_SELECT = true;
function OnToggleIsClickSelect(keys) {
    IS_CLICK_SELECT = keys.is_click_select;
}
function OnPlayerSelectUnit() {
    if (GameUI.GetCameraYaw() != 0) {
        return;
    }
    if (!IS_CLICK_SELECT) {
        return;
    }
    // if (Players.GetTeam(Players.GetLocalPlayer()) == 1) {
    if (Game.GetPlayerInfo(Players.GetLocalPlayer()).player_team_id == 1) {
        OnPlayerQueryUnit();
        return;
    }
    const unit = Players.GetLocalPlayerPortraitUnit();
    if (unit == -1) {
        return;
    }
    // $.Msg(Entities.GetUnitName(unit));
    // if (Entities.GetUnitName(unit) == 'npc_dota_hero_wisp') {
    // GameEvents.SendCustomGameEventToServer("request_select_chess", {
    //     "point": GameUI.GetCursorPosition(),
    // });
    //     return;
    // }

    const controllable = Entities.GetTeamNumber(unit) == Players.GetTeam(Players.GetLocalPlayer());
    let unit_name = Entities.GetUnitName(unit);

    if (controllable && unit_name != "npc_dota_hero_wisp") {
        GameEvents.SendCustomGameEventToServer("request_select_chess", {
            "unit_index": unit,
        });
    }
}
function ShowMovingChess(unit_index) {
    let unitName = Entities.GetUnitName(unit_index);
    if (unitName == 'npc_dota_hero_wisp')
        return;
    show_cursor_hero(unitName);

    // 先清掉上一次的拖拽粒子（句柄可能是 -1 / undefined，必须校验）
    if (IsValidParticleIndex(MOVING_PCF)) {
        Particles.DestroyParticleEffect(MOVING_PCF, true);
        Particles.ReleaseParticleIndex(MOVING_PCF);
    }
    MOVING_PCF = -1;

    MOVING_PCF = Particles.CreateParticle('particles/ui/selection/selection_grid_drag.vpcf', ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, unit_index);
    if (!IsValidParticleIndex(MOVING_PCF)) {
        // 粒子没创建出来（重连后资源未就绪）：不要再把 undefined 传下去
        MOVING_PCF = -1;
        return;
    }
    const origin = Entities.GetAbsOrigin(unit_index);

    origin[2] += 50;
    Particles.SetParticleControl(MOVING_PCF, 4, origin);
    Particles.SetParticleAlwaysSimulate(MOVING_PCF);
}

function UpdateHeroIcon() {
    var currentUnit = Players.GetLocalPlayerPortraitUnit();
    if (currentUnit != PORTRAIT_UNIT) {
        PORTRAIT_UNIT = currentUnit;
        OnPlayerSelectUnit();
    }
    if (IS_CURSOR_HERO_ICON_SHOWING) {
        $.Schedule(0, UpdateHeroIcon);
        // 显示英雄小图标
        const cursorPosition = GameUI.GetCursorPosition();

        var w = Game.GetScreenWidth();
        var h = Game.GetScreenHeight();

        var maxwidth = (w / h) * 1080;
        var midwidth = maxwidth / 2;
        var maxheight = 1080;//1920 * h / w;
        var midheight = maxheight / 2;

        var newX = ((cursorPosition[0] / w) * maxwidth);
        var newY = ((cursorPosition[1] / h) * maxheight);

        newX -= 30;
        newY -= 30;

        $('#cursor_hero_icon').style.position = '' + newX + 'px ' + newY + 'px ' + '0px';


        if (IsValidParticleIndex(MOVING_PCF)) {
            const gamePosition = Game.ScreenXYToWorld(cursorPosition[0], cursorPosition[1]);
            Particles.SetParticleControl(MOVING_PCF, 5, [gamePosition[0], gamePosition[1], gamePosition[2]]);
            Particles.SetParticleControl(MOVING_PCF, 2, [128, 128, 128]);
        }

    }
}
function OnShowCursorHeroIcon(keys) {
    if (keys.unit) {
        PORTRAIT_UNIT = keys.unit_index;
        ShowMovingChess(keys.unit_index);
        show_cursor_hero(keys.unit);
    }
    else {
        hide_cursor_hero();
    }
}
function show_cursor_hero(unit_name) {
    if (unit_name.indexOf('11') > -1) {
        unit_name = unit_name.substr(0, unit_name.length - 2);
    }
    if (unit_name.indexOf('1') > -1) {
        unit_name = unit_name.substr(0, unit_name.length - 1);
    }
    $('#cursor_hero_icon').style['opacity'] = 1;
    $('#cursor_hero_icon').heroname = CHESS_2_HERO[unit_name] || '';
    IS_CURSOR_HERO_ICON_SHOWING = true;
    UpdateHeroIcon();
}
function hide_cursor_hero() {
    $('#cursor_hero_icon').style['opacity'] = 0;
    $('#cursor_hero_icon').heroname = '';
    IS_CURSOR_HERO_ICON_SHOWING = false;

    //重连后 MOVING_PCF 可能还是 undefined（粒子没创建成功），这里必须先校验，
    //否则 Particles.* 抛异常会打断整个脚本，后面 reconnect 的初始化全部跳过
    if (IsValidParticleIndex(MOVING_PCF)) {
        Particles.DestroyParticleEffect(MOVING_PCF, true);
        Particles.ReleaseParticleIndex(MOVING_PCF);
    }
    MOVING_PCF = -1;
}

// 渲染小地图 和 玩家头像
var teamid2steamid = {};
var teamid2playerid = {};
for (var i = 0; i <= 7; i++) {
    if (Game.GetPlayerInfo(i)) {
        var team = Players.GetTeam(i);
        teamid2steamid[team] = Game.GetPlayerInfo(i).player_steamid;
        teamid2playerid[team] = i;
    }
}
// // minimap_block
// var text = '<Panel id="minimap_mask" style="width:100%;height:100%;flow-children:right-wrap;margin:9%;">';
// text += '<Panel style="width:33%;height:33%;">';
// if (teamid2steamid[6]){
//     // text += '<DOTAAvatarImage id="minimap_player_avatar_team_6" steamid="'+teamid2steamid[6]+'" nocompendiumborder="true" style="width:50%;height:50%;margin-top:50%;margin-left:0%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;" hittest="false" class=""/>';
//     text += '<Image id="minimap_player_avatar_team_6" src="file://{images}/custom_game/chessboard/b301.png" style="horizontal-align:center;vertical-align:center;width:100%;height:100%;z-index:9999;box-shadow: fill #00000066 0px 0px 8px 0px;opacity:0.75;brightness:1;" hittest="false"/>'
// }
// text += '</Panel>';
// text += '<Panel style="width:33%;height:33%;">';
// if (teamid2steamid[7]){
//     // text += '<DOTAAvatarImage id="minimap_player_avatar_team_7" steamid="'+teamid2steamid[7]+'" nocompendiumborder="true" style="width:50%;height:50%;margin-top:50%;margin-left:0%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;" hittest="false"/>';
//     text += '<Image id="minimap_player_avatar_team_7" src="file://{images}/custom_game/shop_icon.png" style="horizontal-align:center;vertical-align:center;width:40%;height:40%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;opacity:0.5;brightness:0.5;" hittest="false"/>'
// }
// text += '</Panel>';
// text += '<Panel style="width:33%;height:33%;">';
// if (teamid2steamid[8]){
//     // text += '<DOTAAvatarImage id="minimap_player_avatar_team_8" steamid="'+teamid2steamid[8]+'" nocompendiumborder="true" style="width:50%;height:50%;margin-top:50%;margin-left:0%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;" hittest="false"/>';
//     text += '<Image id="minimap_player_avatar_team_8" src="file://{images}/custom_game/shop_icon.png" style="horizontal-align:center;vertical-align:center;width:40%;height:40%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;opacity:0.5;brightness:0.5;" hittest="false"/>'
// }
// text += '</Panel>';
// text += '<Panel style="width:33%;height:33%;">';
// if (teamid2steamid[13]){
//     // text += '<DOTAAvatarImage id="minimap_player_avatar_team_13" steamid="'+teamid2steamid[13]+'" nocompendiumborder="true" style="width:50%;height:50%;margin-top:50%;margin-left:0%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;" hittest="false"/>';
//     text += '<Image id="minimap_player_avatar_team_13" src="file://{images}/custom_game/shop_icon.png" style="horizontal-align:center;vertical-align:center;width:40%;height:40%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;opacity:0.5;brightness:0.5;" hittest="false"/>'
// }
// text += '</Panel>';
// text += '<Panel style="width:33%;height:33%;">';
// text += '</Panel>';
// text += '<Panel style="width:33%;height:33%;">';
// if (teamid2steamid[9]){
//     // text += '<DOTAAvatarImage id="minimap_player_avatar_team_9" steamid="'+teamid2steamid[9]+'" nocompendiumborder="true" style="width:50%;height:50%;margin-top:50%;margin-left:0%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;" hittest="false"/>';
//     text += '<Image id="minimap_player_avatar_team_9" src="file://{images}/custom_game/shop_icon.png" style="horizontal-align:center;vertical-align:center;width:40%;height:40%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;opacity:0.5;brightness:0.5;" hittest="false"/>'
// }
// text += '</Panel>';
// text += '<Panel style="width:33%;height:33%;">';
// if (teamid2steamid[12]){
//     // text += '<DOTAAvatarImage id="minimap_player_avatar_team_12" steamid="'+teamid2steamid[12]+'" nocompendiumborder="true" style="width:50%;height:50%;margin-top:50%;margin-left:0%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;" hittest="false"/>';
//     text += '<Image id="minimap_player_avatar_team_12" src="file://{images}/custom_game/shop_icon.png" style="horizontal-align:center;vertical-align:center;width:40%;height:40%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;opacity:0.5;brightness:0.5;" hittest="false"/>'
// }
// text += '</Panel>';
// text += '<Panel style="width:33%;height:33%;">';
// if (teamid2steamid[11]){
//     // text += '<DOTAAvatarImage id="minimap_player_avatar_team_11" steamid="'+teamid2steamid[11]+'" nocompendiumborder="true" style="width:50%;height:50%;margin-top:50%;margin-left:0%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;" hittest="false"/>';
//     text += '<Image id="minimap_player_avatar_team_11" src="file://{images}/custom_game/shop_icon.png" style="horizontal-align:center;vertical-align:center;width:40%;height:40%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;opacity:0.5;brightness:0.5;" hittest="false"/>'
// }
// text += '</Panel>';
// text += '<Panel style="width:33%;height:33%;">';
// if (teamid2steamid[10]){
//     // text += '<DOTAAvatarImage id="minimap_player_avatar_team_12" steamid="'+teamid2steamid[10]+'" nocompendiumborder="true" style="width:50%;height:50%;margin-top:50%;margin-left:0%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;" hittest="false"/>';
//     text += '<Image id="minimap_player_avatar_team_10" src="file://{images}/custom_game/shop_icon.png" style="horizontal-align:center;vertical-align:center;width:40%;height:40%;z-index:9999;box-shadow: fill #00000066 -4px -4px 8px 8px;opacity:0.5;brightness:0.5;" hittest="false"/>'
// }
// text += '</Panel>';
// text += '</Panel>';
// FindDotaHudElement('minimap_block').BCreateChildren(text);



function InitChatEmoticon(m_list) {
    if (!m_list) {
        m_list = ['m101', 'm103', 'm104'];
    }
    // m_list = ['m101','m105','m106','m204','m205','m206','m304'];

    // 去重
    m_list.sort();
    var hash = [m_list[0]];
    for (var i = 1; i < m_list.length; i++) {
        if (m_list[i] != hash[hash.length - 1]) {
            hash.push(m_list[i]);
        }
    }
    m_list = hash;
    MY_EMOTION_LIST = m_list.join(',');

    // FindDotaHudElement('ChatEmoticonButton').style['opacity'] = '1';
    // FindDotaHudElement('EmoticonAlias').style['opacity'] = '0';
    // FindDotaHudElement('ChatEmoticonPicker').style['max-width'] = '600px';
    // FindDotaHudElement('ChatEmoticonPicker').style['max-height'] = '300px';
    // FindDotaHudElement('ChatEmoticonPicker').style['width'] = '600px';
    // FindDotaHudElement('ChatEmoticonPicker').style['height'] = '300px';
    // FindDotaHudElement('ChatEmoticonPicker').style['margin-bottom'] = '100px';
    // FindDotaHudElement('EmoticonsContainer').style['max-width'] = '0px';
    // FindDotaHudElement('EmoticonsContainer').style['max-height'] = '0px';
    // FindDotaHudElement('EmoticonsContainer').style['width'] = '0px';
    // FindDotaHudElement('EmoticonsContainer').style['height'] = '0px';

    // FindDotaHudElement('EmoticonAlias').RemoveAndDeleteChildren();
    // FindDotaHudElement('EmoticonsContainer').RemoveAndDeleteChildren();

    var text = "";
    var emotion_schema = "<Panel class='emotion_one' id = 'emotion_list_EMOTIONINDEX'><Image src='file://{images}/custom_game/chat/EMOTIONINDEX.png' style='transform: scale3d( EMOTIONSIZE, EMOTIONSIZE, EMOTIONSIZE);'/></Panel>";

    for (var i = 0; i < m_list.length; i++) {
        var m = m_list[i];
        var m_info = EMOTION_LIST[m];
        if (m_info) {
            text += emotion_schema.replace(/EMOTIONINDEX/g, m_info.emotion_index).replace(/EMOTIONSIZE/g, m_info.size).replace(/EMOTIONID/g, $.Localize('#' + m));
        }
    }

    // text += "<Panel id = 'emotion_list_end' style='width:600px;height:100px;' </Panel>";

    FindDotaHudElement('panel_emotion_box_inner').RemoveAndDeleteChildren();
    // // FindDotaHudElement('ChatEmoticonPickerEmoticonList').BCreateChildren(text);
    CreateChildren(FindDotaHudElement('panel_emotion_box_inner'), text);

    for (var i = 0; i < m_list.length; i++) {
        var m = m_list[i];
        var m_info = EMOTION_LIST[m];
        if (m_info) {
            var ii = m_info.emotion_index;
            (function (ii, m) {
                FindDotaHudElement('emotion_list_' + ii).SetPanelEvent("onactivate",
                    function () {
                        RequestSendEmotion(ii);
                    }
                );
                FindDotaHudElement('emotion_list_' + ii).SetPanelEvent("onmouseover",
                    function () {
                        $.DispatchEvent("DOTAShowTextTooltip", FindDotaHudElement('emotion_list_' + ii), $.Localize('#' + m));
                    }
                );
                FindDotaHudElement('emotion_list_' + ii).SetPanelEvent("onmouseout",
                    function () {
                        $.DispatchEvent("DOTAHideTextTooltip");
                    }
                );
            })(ii, m);
        }
    }
}

function fill_good_price(panel_name, good_info) {
    var money = 'candy';
    var price = parseInt(good_info.price || 0);

    if (good_info.biscuit) {
        money = 'biscuit';
        price = parseInt(good_info.biscuit || 0);
    }
    $('#image_money_' + panel_name).SetImage('file://{images}/custom_game/award_' + money + '.png')
    $('#text_' + panel_name).text = '× ' + price;
    return {
        id: good_info.id,
        money: money,
        price: price,
    };
}


function ShowMyMoney(candy, biscuit) {
    MY_CANDY = parseInt(candy || 0);
    MY_BISCUIT = parseInt(biscuit || 0);

    // if (!MY_CANDY){
    //     $('#ice_storage').SetHasClass('invisible',true);
    //     $('#image_ice_storage').SetHasClass('invisible',true);
    // }
    // else{
    // $('#ice_storage').text = '× ' + MY_CANDY;
    $('#text_store_v5_candy').text = '× ' + MY_CANDY;
    // $('#ice_storage').SetHasClass('invisible', false);
    // $('#image_ice_storage').SetHasClass('invisible', false);
    // }

    // if (!MY_BISCUIT){
    //     $('#biscuit_storage').SetHasClass('invisible',true);
    //     $('#image_biscuit_storage').SetHasClass('invisible',true);
    // }
    // else{
    // $('#biscuit_storage').text = '× ' + MY_BISCUIT;
    $('#text_store_v5_biscuit').text = '× ' + MY_BISCUIT;
    // $('#biscuit_storage').SetHasClass('invisible', false);
    // $('#image_biscuit_storage').SetHasClass('invisible', false);
    // }

    if (FindDotaHudElement('text_event_ti12_candy')) {
        FindDotaHudElement('text_event_ti12_candy').text = '× ' + MY_CANDY;
    }

}

function OnMsg(data) {
    $.Msg(data);
}

// function OnShowCombinableItem(keys) {
//     var items = keys.items;
//     var unit_index = keys.unit_index;
//     var is_empty = true;
//     $('#panel_combinable_box_inner').RemoveAndDeleteChildren();
//     $('#panel_combinable_box_topright').RemoveAndDeleteChildren();

//     // 终止棋子快速移动状态
//     GameEvents.SendCustomGameEventToServer("cancel_pick_chess_position", { player_id: Game.GetLocalPlayerID() });
//     hide_cursor_hero();

//     // 显示右上角的当前操作对象
//     var panel = $('#panel_combinable_box_topright');
//     if (panel) {
//         if (unit_index && keys.base_unit_name) {
//             // 棋子：显示小头像
//             $.CreatePanel('DOTAHeroImage', panel, undefined, {
//                 heroname: CHESS_2_HERO[keys.base_unit_name],
//                 heroimagestyle: 'icon',
//             });
//         }
//         else if (keys.onduty_hero) {
//             // 信使：显示图片
//             $.CreatePanel('Image', panel, undefined, {
//                 src: 'file://{images}/custom_game/skaters/' + keys.onduty_hero + '.png',
//             });
//         }
//     }

//     // 显示每一个物品
//     var panel = $('#panel_combinable_box_inner');
//     for (var i in items) {
//         var item = items[i];
//         if (item) {
//             if (!unit_index) {
//                 unit_index = -1;
//             }
//             var panel_loot = $.CreatePanel('Panel', panel, undefined, {
//                 class: 'panel_loot',
//                 onactivate: 'OnClickCombinableItem("' + item + '",' + unit_index + ')',
//             });

//             $.CreatePanel('DOTAItemImage', panel_loot, undefined, {
//                 itemname: item,
//             });
//             is_empty = false;
//         }
//     }
//     if (!is_empty) {
//         $('#panel_combinable_box').SetHasClass('invisible', false);
//         $('#panel_combinable_box').style['opacity'] = '1';
//         $('#panel_combinable_box').style['transform'] = 'scale3d( 1, 1, 1)';
//         $('#panel_combinable_box').SetFocus();
//     }
//     else {
//         OnMima({ text: "text_mima_no_combinable_item", key: CLIENT_KEY });
//         $('#panel_combinable_box').SetHasClass('invisible', true);
//         $('#panel_combinable_box').style['opacity'] = '0';
//         $('#panel_combinable_box').style['transform'] = 'scale3d( 0.01, 0.01, 0.01)';
//     }
// }
// function OnHideCombinableItem() {
//     $('#panel_combinable_box').SetHasClass('invisible', true);
//     $('#panel_combinable_box').style['opacity'] = '0';
//     $('#panel_combinable_box').style['transform'] = 'scale3d( 0.01, 0.01, 0.01)';
// }
// function OnClickCombinableItem(item_name, unit_index) {
//     GameEvents.SendCustomGameEventToServer("request_combine_item", {
//         item: item_name,
//         unit_index: unit_index,
//     });
//     $('#panel_combinable_box').SetHasClass('invisible', true);
//     $('#panel_combinable_box').style['opacity'] = '0';
//     $('#panel_combinable_box').style['transform'] = 'scale3d( 0.01, 0.01, 0.01)';
// }

function GetPlayerCount() {
    var count = 0;
    for (var i = 0; i <= 7; i++) {
        var playerdata = Game.GetPlayerInfo(i);
        if (playerdata) {
            count++;
        }
    }
    return count;
}

var MY_CHESSBOARD_LIST = [];
var MY_CURR_CHESSBOARD = null;
var MY_SELECT_CHESSBOARD = null;
function sort_chessboard_list(chessboard_list) {
    chessboard_list.sort(function (a, b) {
        var score_b = 0;
        var score_a = 0;

        if (a && a.id) {
            score_a += parseInt(a.id.slice(1, 4)) * 1000;
        }
        if (b && b.id) {
            score_b += parseInt(b.id.slice(1, 4)) * 1000;
        }

        if (a && a.tag) {
            score_a += parseInt(a.tag.length || 1);
        }
        if (b && b.tag) {
            score_b += parseInt(b.tag.length || 1);
        }
        return score_b - score_a;
    });

    return chessboard_list;
}
function choose_chessboard(chessboard) {
    MY_SELECT_CHESSBOARD = chessboard;
    fill_my_chessboard_list();
}
function fill_my_chessboard_list() {
    if (!MY_CHESSBOARD_LIST) {
        return;
    }
    var chessboard_count = 0;
    var text = "";
    var chessboard_list = MY_CHESSBOARD_LIST;
    for (var i = 0; i < chessboard_list.length; i++) {
        var chessboard = chessboard_list[i];
        if (chessboard && chessboard.id) {
            chessboard_count++;
            var tip_title = $.Localize('#' + chessboard.id);

            tip_title += ' (' + $.Localize('#' + 'rarity_' + chessboard.id.slice(1, 2));

            if (chessboard.tag) {
                tip_title += '/' + $.Localize('#' + 'chessboard_tag_' + chessboard.tag);
            }

            tip_title += ')';

            var tip_text = '';
            if (chessboard.tag) {
                tip_text += $.Localize('#' + 'chessboard_tag_' + chessboard.tag + '_desc');
            }

            text += '<Panel class="goods_list_one_outer_chessboard' + ((chessboard.id == MY_SELECT_CHESSBOARD) ? ' selected' : '') + '" onactivate = "choose_chessboard(\'' + chessboard.id + '\');" onmouseover="DOTAShowTitleTextTooltip(\'' + tip_title + '\',\'' + tip_text + '\')" onmouseout="DOTAHideTitleTextTooltip()">';
            text += '<Panel class="goods_list_one" style="background-image:url(\'file://{images}/custom_game/chessboard/' + chessboard.id + '.png\');">';
            if (chessboard.id == MY_CURR_CHESSBOARD) {
                // 当前棋盘
                text += '<Panel id = "my_equiped_chessboard" class="icon_equiped icon_one_equiped"/>';
            }
            // 棋盘名字条
            text += '<Panel class="goods_list_one_chessboard_name_bar" >';
            text += '<Label text="' + $.Localize('#' + chessboard.id) + '" style="color:' + COLOR_STR[chessboard.id.slice(1, 2)] + ';"/>';
            text += '</Panel>';
            text += '</Panel>';
            //       text += '<Panel class="my_courier_list_one_right">';

            //     text += '<Panel class="my_courier_list_one_right_line1" >';
            //      text += '<Label text="'+$.Localize('#'+chessboard)+'" style="color:'+COLOR_STR[chessboard.slice(1,2)]+';"/>';
            //     text += '</Panel>';
            //     text += '<Panel class="my_courier_list_one_right_line2">';
            //     text += '</Panel>';
            // text += '</Panel>';
            text += '</Panel>';
        }
    }
    $('#store_panel_my_chessboard_list').RemoveAndDeleteChildren();
    // $('#store_panel_my_chessboard_list').BCreateChildren(text);
    CreateChildren($('#store_panel_my_chessboard_list'), text);

    $("#text_store_panel_my_chessboard_list").text = $.Localize('#' + 'text_my_chessboard_list') + ' (' + chessboard_count + ')';
}

// 显示世界排行榜
UpdateRankingTop();
function UpdateRankingTop(info) {
    var info = CustomNetTables.GetTableValue("ranking_top_table", 'ranking_top');

    if (!info){
        return;
    }
    if (info.season && $('#season' + info.season)) {
        $('#season' + info.season).SetHasClass('season_event_curr', true);
    }
    if (info && info.ranking_top) {
        var data = info.ranking_top;
        $('#ranking_world_empty').style['width'] = '0px';
        $('#ranking_world_empty').visible = false;

        var panel_inner = $('#ranking_world_half');
        panel_inner.RemoveAndDeleteChildren();
        panel_inner.style.height = (100*70+10)+'px';

        for (var j in data) {
            var i = parseInt(j - 1);
            if (i + 1 > 100) {
                break;
            }

            var steam_id = data[j].player;
            var mmr_level = data[j].mmr_level || 0;
            var queen_rank = data[j].queen_rank;
            var chicken_count = data[j].chicken_count || 0;
            var rank = i + 1;

            var panel_one = $.CreatePanel('Panel', panel_inner, '', {
                class: 'leaderboard_line',
            });
            if (rank <= 20){
                panel_one.SetHasClass('top20',true);
            }

            $.CreatePanel('Label', panel_one, '', {
                text: '#'+rank,
                class: "super_short_label color-white center font-bold",
                style: "width:80px;margin-left:20px;"
            });

            var panel_one_vip = $.CreatePanel('Panel', panel_one, '', {
                style: "width:30px;"
            });
            if (data[j].is_vip) {
                $.CreatePanel('Panel', panel_one_vip, '', {
                    style: "width:30px;z-index:500;margin-top:5px;",
                    class: "ranking_vip_icon",
                });
            }

            $.CreatePanel('DOTAAvatarImage', panel_one, '', {
                style: "width:55px;height:55px;margin-left:-10px;z-index:400;vertical-align:center;",
                steamid: steam_id,
            });
            $.CreatePanel('DOTAUserName', panel_one, '', {
                style: "width:200px;height:55px;margin-left:10px;vertical-align:center;",
                steamid: steam_id,
            });

            $.CreatePanel('Image', panel_one, '', {
                style: "width:40px;height:40px;margin-left:0px;vertical-align:center;",
                src: 'file://{images}/custom_game/level_' + mmr_level + '.png',
            });
            var rank_level_text = '';
            if (mmr_level >= 38 && queen_rank) {
                rank_level_text = $.Localize('#' + "text_player_level_" + mmr_level)+ ' #' + queen_rank;
            }
            else {
                rank_level_text = $.Localize('#' + "text_player_level_" + mmr_level);
            }
            $.CreatePanel('Label', panel_one, '', {
                text: rank_level_text,
                style: "width:150px;margin-left:5px;vertical-align:center;font-size:24px;"
            });

            // $.CreatePanel('DOTAEmoticon', panel_one, '', {
            //     emoticonid: 12,
            //     animating: false,
            //     style: "vertical-align:center;"
            // });
            // $.CreatePanel('Label', panel_one, '', {
            //     text: '× ' + chicken_count,
            //     style: "width:80px;margin-left:5px;vertical-align:center;font-size:24px;"
            // });
        }
    }
    

    info = CustomNetTables.GetTableValue("ranking_top_table", 'ranking_top');
    data = info.leaderboard_info.leaderboard_chicken;

    if (data) {
        $('#ranking_world_empty').style['width'] = '0px';
        $('#ranking_world_empty').visible = false;

        var panel_inner = $('#ranking_world_half2');
        panel_inner.RemoveAndDeleteChildren();
        panel_inner.style.height = (50*70+10)+'px';

        for (var j in data) {
            var i = parseInt(j - 1);
            if (i + 1 > 50) {
                break;
            }

            var steam_id = data[j].steam_id;
            var mmr_level = data[j].mmr_level || 0;
            var queen_rank = data[j].queen_rank;
            var chicken_count = data[j].chicken || 0;
            var rank = i + 1;

            var panel_one = $.CreatePanel('Panel', panel_inner, '', {
                class: 'leaderboard_line',
            });
            if (rank <= 20){
                panel_one.SetHasClass('top20',true);
            }

            $.CreatePanel('Label', panel_one, '', {
                text: '#'+rank,
                class: "super_short_label color-white center font-bold",
                style: "width:80px;margin-left:20px;"
            });

            var panel_one_vip = $.CreatePanel('Panel', panel_one, '', {
                style: "width:30px;"
            });
            if (data[j].is_vip) {
                $.CreatePanel('Panel', panel_one_vip, '', {
                    style: "width:30px;z-index:500;margin-top:5px;",
                    class: "ranking_vip_icon",
                });
            }

            $.CreatePanel('DOTAAvatarImage', panel_one, '', {
                style: "width:55px;height:55px;margin-left:-10px;z-index:400;vertical-align:center;",
                steamid: steam_id,
            });
            $.CreatePanel('DOTAUserName', panel_one, '', {
                style: "width:200px;height:55px;margin-left:10px;vertical-align:center;",
                steamid: steam_id,
            });

            // $.CreatePanel('Image', panel_one, '', {
            //     style: "width:40px;height:40px;margin-left:0px;vertical-align:center;",
            //     src: 'file://{images}/custom_game/level_' + mmr_level + '.png',
            // });
            // var rank_level_text = '';
            // if (mmr_level >= 38 && queen_rank) {
            //     rank_level_text = $.Localize('#' + "text_player_level_" + mmr_level)+ ' #' + queen_rank;
            // }
            // else {
            //     rank_level_text = $.Localize('#' + "text_player_level_" + mmr_level);
            // }
            // $.CreatePanel('Label', panel_one, '', {
            //     text: rank_level_text,
            //     style: "width:150px;margin-left:5px;vertical-align:center;font-size:24px;"
            // });

            $.CreatePanel('DOTAEmoticon', panel_one, '', {
                emoticonid: 12,
                animating: false,
                style: "vertical-align:center;"
            });
            $.CreatePanel('Label', panel_one, '', {
                text: '× ' + chicken_count,
                style: "width:80px;margin-left:5px;vertical-align:center;font-size:28px;font-family:titleFont;"
            });
        }
    }

    data = info.leaderboard_info.leaderboard_lineup_value;

    if (data) {
        $('#leaderboard_lineup_value_container_empty').style['width'] = '0px';
        $('#leaderboard_lineup_value_container_empty').visible = false;
 
        var panel_inner = $('#ranking_world_leaderboard_lineup_value');
        panel_inner.RemoveAndDeleteChildren();
        panel_inner.style.height = (50*70+10)+'px';

        for (var j in data) {
            var i = parseInt(j - 1);
            if (i + 1 > 50) {
                break;
            }

            var steam_id = data[j].steam_id;
            var rank = i + 1;

            var panel_one = $.CreatePanel('Panel', panel_inner, '', {
                class: 'leaderboard_line',
            });
            if (rank <= 20){
                panel_one.SetHasClass('top20',true);
            }

            $.CreatePanel('Label', panel_one, '', {
                text: '#'+rank,
                class: "super_short_label color-white center font-bold",
                style: "width:80px;margin-left:20px;"
            });

            var panel_one_vip = $.CreatePanel('Panel', panel_one, '', {
                style: "width:30px;"
            });
            if (data[j].is_vip) {
                $.CreatePanel('Panel', panel_one_vip, '', {
                    style: "width:30px;z-index:500;margin-top:5px;",
                    class: "ranking_vip_icon",
                });
            }

            $.CreatePanel('DOTAAvatarImage', panel_one, '', {
                style: "width:55px;height:55px;margin-left:-10px;z-index:400;vertical-align:center;",
                steamid: steam_id,
            });
            $.CreatePanel('DOTAUserName', panel_one, '', {
                style: "width:250px;height:55px;margin-left:10px;vertical-align:center;",
                steamid: steam_id,
            });

            $.CreatePanel('Image', panel_one, '', {
                style: "width:40px;height:40px;margin-left:0px;vertical-align:center;",
                src: 'file://{images}/custom_game/money.png',
            });
            $.CreatePanel('Label', panel_one, '', {
                text: data[j].lineup_value,
                style: "width:80px;margin-left:5px;vertical-align:center;font-size:28px;font-family:titleFont;"
            });

            // 显示棋子阵容
            ShowLineup(panel_one, data[j].lineup);
        }
    }


    // info = CustomNetTables.GetTableValue("ranking_top_table", 'ranking_top');
    data = info.leaderboard_info.leaderboard_mvp_chess;

    if (data) {
        $('#leaderboard_mvp_chess_container_empty').style['width'] = '0px';
        $('#leaderboard_mvp_chess_container_empty').visible = false;

        var panel_inner = $('#ranking_world_leaderboard_mvp_chess');
        panel_inner.RemoveAndDeleteChildren();
        panel_inner.style.height = (50*70+10)+'px';

        for (var j in data) {
            var i = parseInt(j - 1);
            if (i + 1 > 50) {
                break;
            }

            var steam_id = data[j].steam_id;
            var rank = i + 1;

            var panel_one = $.CreatePanel('Panel', panel_inner, '', {
                class: 'leaderboard_line',
            });
            if (rank <= 20){
                panel_one.SetHasClass('top20',true);
            }

            $.CreatePanel('Label', panel_one, '', {
                text: '#'+rank,
                class: "super_short_label color-white center font-bold",
                style: "width:80px;margin-left:20px;"
            });

            var panel_one_vip = $.CreatePanel('Panel', panel_one, '', {
                style: "width:30px;"
            });
            if (data[j].is_vip) {
                $.CreatePanel('Panel', panel_one_vip, '', {
                    style: "width:30px;z-index:500;margin-top:5px;",
                    class: "ranking_vip_icon",
                });
            }

            $.CreatePanel('DOTAAvatarImage', panel_one, '', {
                style: "width:55px;height:55px;margin-left:-10px;z-index:400;vertical-align:center;",
                steamid: steam_id,
            });
            $.CreatePanel('DOTAUserName', panel_one, '', {
                style: "width:250px;height:55px;margin-left:10px;vertical-align:center;",
                steamid: steam_id,
            });

            $.CreatePanel('Image', panel_one, '', {
                style: "width:30px;height:30px;margin-left:0px;vertical-align:center;margin-left:10px;",
                // src: 's2r://panorama/images/hud/facets/icons/damage_png.vtex',
            });
            $.CreatePanel('Label', panel_one, '', {
                text: data[j].damage,
                style: "width:120px;margin-left:5px;vertical-align:center;font-size:28px;font-family:titleFont;margin-left:5px;"
            });
            
        
            ShowMvpChess(panel_one, data[j].name, data[j].item);
        }
    }

    data = info.leaderboard_info.leaderboard_pandaman_fish;

    if (data) {
        $('#leaderboard_pandaman_fish_container_empty').style['width'] = '0px';
        $('#leaderboard_pandaman_fish_container_empty').visible = false;

        var panel_inner = $('#ranking_world_leaderboard_pandaman_fish');
        panel_inner.RemoveAndDeleteChildren();
        panel_inner.style.height = (50*70+10)+'px';

        for (var j in data) {
            var i = parseInt(j - 1);
            if (i + 1 > 50) {
                break;
            }
            // $.Msg(data[j]);
            var steam_id = data[j].steam_id;
            var rank = i + 1;

            var panel_one = $.CreatePanel('Panel', panel_inner, '', {
                class: 'leaderboard_line',
            });
            if (rank <= 20){
                panel_one.SetHasClass('top20',true);
            }

            $.CreatePanel('Label', panel_one, '', {
                text: '#'+rank,
                class: "super_short_label color-white center font-bold",
                style: "width:80px;margin-left:20px;"
            });

            var panel_one_vip = $.CreatePanel('Panel', panel_one, '', {
                style: "width:30px;"
            });
            if (data[j].is_vip) { 
                $.CreatePanel('Panel', panel_one_vip, '', {
                    style: "width:30px;z-index:500;margin-top:5px;",
                    class: "ranking_vip_icon",
                });
            }

            $.CreatePanel('DOTAAvatarImage', panel_one, '', {
                style: "width:55px;height:55px;margin-left:-10px;z-index:400;vertical-align:center;",
                steamid: steam_id,
            });
            $.CreatePanel('DOTAUserName', panel_one, '', {
                style: "width:250px;height:55px;margin-left:10px;vertical-align:center;",
                steamid: steam_id,
            });

            $.CreatePanel('DOTAAbilityImage', panel_one, '', {
                style: "width:30px;height:30px;margin-left:0px;vertical-align:center;margin-left:10px;",
                abilityname: 'is_pandaman',
            });
            var fish_list = data[j].chess_list.split(',');
            $.CreatePanel('Label', panel_one, '', {
                text: '× ' + (fish_list.length || 0),
                style: "width:120px;margin-left:5px;vertical-align:center;font-size:28px;font-family:titleFont;margin-left:5px;"
            });
            
            var fish_table = {};
            var fish_arr = [];
            for (var i=0;i<fish_list.length;i++){
                var fish_one = fish_list[i] || '';
                var fish_one_name = 'chess_'+(fish_one.split('_')[1] || '');
                if (!fish_table[fish_one_name]){
                    fish_table[fish_one_name] = 1;
                }
                else{
                    fish_table[fish_one_name] ++;
                }
            }
            for (var i in fish_table){
                fish_arr.push({
                    chess: i,
                    count: fish_table[i],
                    cost: get_chess_cost(i),
                });
            }
            fish_arr.sort(function(a,b){
                var score_a = a.count * 10000 + a.cost;
                var score_b = b.count * 10000 + b.cost;
                return score_b - score_a;
            });
            for (var i=0;i<fish_arr.length;i++){
                var fish_one = fish_arr[i];
                var block3_container_chess = $.CreatePanel('Panel', panel_one, "", {
                    style: 'width:36px;height:45px;flow-children:down;vertical-align: center;',
                });
    
                var chess_name = CHESS_2_HERO[fish_arr[i].chess];
                var count = fish_arr[i].count;
    
                if (chess_name) {
                    $.CreatePanel('DOTAHeroImage', block3_container_chess, "", {
                        heroname: chess_name,
                        heroimagestyle: 'icon',
                        onmouseover: 'DOTAShowTextTooltip(\'' + $.Localize('#' + fish_arr[i].chess) + '\')',
                        onmouseout: 'DOTAHideTextTooltip()',
                        style: 'width:36px;height:36px;',
                    });
                    $.CreatePanel('Label', block3_container_chess, "", {
                        text: '×'+count,
                        style: 'font-size:18px;color:#fff;text-align:center;line-height: 14px;horizontal-align:center;text-shadow:0px 0px 2px 2 #000000;margin-top:-5px;',
                    });
                }
            }
            
        
            // ShowMvpChess(panel_one, data[j].name, data[j].item);
        }
    }

    // 显示我的战绩（如果有）
    UpdateRankingSelf()
}

function UpdateRankingSelf() {
    var data = CustomNetTables.GetTableValue("match_history_table", 'match_history_' + Game.GetLocalPlayerID());
}


// 监听选中的单位
GameEvents.Subscribe("dota_player_update_query_unit", SafeCallback("dota_player_update_query_unit", OnPlayerQueryUnit));
ShowUnitLevelPlus();
var LAST_PORTRAIT_UNIT;
function ShowUnitLevelPlus() {
    var portrait_unit = Players.GetLocalPlayerPortraitUnit();
    if (portrait_unit >= 0) {
        if (FindDotaHudElement('LevelLabel')) {
            // 显示单位等级
            FindDotaHudElement('LevelLabel').text = GetUnitLevel(portrait_unit);
        }
        var player_hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
        // if (!Entities.IsAlive(portrait_unit)) {
        //     // 当前选中的单位死亡，就切换回选中自己信使
        //     GameUI.SelectUnit(player_hero, false);
        //     OnPlayerQueryUnit();
        // }
        if (LAST_PORTRAIT_UNIT) {
            if (portrait_unit == player_hero && LAST_PORTRAIT_UNIT != player_hero && IsOBing() == false) {
                if (FindDotaHudElement('ItemCombines') && FindDotaHudElement('ItemCombines').visible != true) {
                    GameUI.SelectUnit(player_hero, false);
                }
                OnPlayerQueryUnit();
            }
        }

        LAST_PORTRAIT_UNIT = portrait_unit;
    }

    $.Schedule(0.5, function () {
        ShowUnitLevelPlus();
    })
}

var PORTRAIT_COURIER_PLAYER_ID = -1;
function OnPlayerQueryUnit(keys) {
    // if (keys.splitscreenplayer == Game.GetLocalPlayerID()) {
    if (GameUI.GetCameraYaw() != 0) {
        GameUI.SetCameraTarget(Players.GetLocalPlayerPortraitUnit());
        SetCamera();
    }

    var portrait_unit = Players.GetLocalPlayerPortraitUnit();
    if (portrait_unit == Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())) {
        // 选中自己信使
        FindDotaHudElement('abilities').style['margin-left'] = '10px';
        if (FindDotaHudElement('emotion_button')) {
            HudVisible('emotion_button', true);
        }
        if (FindDotaHudElement('petgpt_button')) {
            FindDotaHudElement('petgpt_button').visible = true;
        }
        if (FindDotaHudElement('lineup_button')) {
            HudVisible('lineup_button', true);
        }
        if (FindDotaHudElement('inventory_tpscroll_container')) {
            FindDotaHudElement('inventory_tpscroll_container').visible = true;
        }
        ShowDrodoCourierBuffContainer(Entities.GetTeamNumber(portrait_unit));
        UpdatePortraitCourierName(portrait_unit);
        if (FindDotaHudElement('HealthProgress_Left')) {
            // 生命条颜色变黄
            FindDotaHudElement('HealthProgress_Left').style['background-color'] = 'gradient( linear, 0.0% 0.0%, 100.0% 0.0%, color-stop( 0.0, #79F27988 ), color-stop( 0.850, #79F279DD ), color-stop( 1.0, #79F279FF ) )';
        }
        // FindDotaHudElement('neutralCharges').visible = true;
        ShowRelicTTL();

        PORTRAIT_COURIER_PLAYER_ID = Entities.GetPlayerOwnerID(portrait_unit);

        UpdateTalentTree(PORTRAIT_COURIER_PLAYER_ID);
        ShowTalentTreeNew();
    }
    else {
        // 选中的不是自己信使
        // FindDotaHudElement('neutralCharges').visible = false;
        HideRelicTTL();

        if (FindDotaHudElement('HealthProgress_Left')) {
            // 生命条颜色变绿
            FindDotaHudElement('HealthProgress_Left').style['background-color'] = 'gradient( linear, 0.0% 0.0%, 100.0% 0.0%, color-stop( 0.0, #2DA02788 ), color-stop( 0.850, #2DA027DD ), color-stop( 1.0, #2DA027FF ) )';
        }
        if (FindDotaHudElement('petgpt_button')) {
            FindDotaHudElement('petgpt_button').visible = false;
        }
        if (FindDotaHudElement('emotion_button')) {
            HudVisible('emotion_button', false);
        }
        if (FindDotaHudElement('lineup_button')) {
            HudVisible('lineup_button', false);
        }
        if (Entities.GetTeamNumber(portrait_unit) == Players.GetTeam(Players.GetLocalPlayer())) {
            // 选中友方棋子
            FindDotaHudElement('abilities').style['margin-left'] = '0px';
            if (FindDotaHudElement('inventory_tpscroll_container')) {
                FindDotaHudElement('inventory_tpscroll_container').visible = false;
            }
            HideDrodoCourierBuffContainer();
            if (Entities.GetUnitName(portrait_unit) == 'egg') {
                UpdatePortraitEggName(portrait_unit);
            }
            PORTRAIT_COURIER_PLAYER_ID = -1;
            HideTalentTreeNew();
        }
        else {
            // 选中敌人
            if (FindDotaHudElement('inventory_tpscroll_container')) {
                FindDotaHudElement('inventory_tpscroll_container').visible = false;
            }
            if (Entities.IsHero(portrait_unit)) {
                // 是信使，展示它的信使名字
                FindDotaHudElement('abilities').style['margin-left'] = '10px';
                UpdatePortraitCourierName(portrait_unit);
                ShowDrodoCourierBuffContainer(Entities.GetTeamNumber(portrait_unit));
                PORTRAIT_COURIER_PLAYER_ID = Entities.GetPlayerOwnerID(portrait_unit);

                UpdateTalentTree(PORTRAIT_COURIER_PLAYER_ID);
                ShowTalentTreeNew();
            }
            else {
                FindDotaHudElement('abilities').style['margin-left'] = '0px';
                HideDrodoCourierBuffContainer();
                if (Entities.GetUnitName(portrait_unit) == 'egg') {
                    UpdatePortraitEggName(portrait_unit);
                }
                PORTRAIT_COURIER_PLAYER_ID = -1;
                HideTalentTreeNew();
            }
        }
        if (FindDotaHudElement('UnitNameLabel')) {
            FindDotaHudElement('UnitNameLabel').text = $.Localize('#' + Entities.GetUnitName(Players.GetLocalPlayerPortraitUnit()));
        }
    }
    // }
}
GameEvents.Subscribe("update_portrait_courier_name", SafeCallback("update_portrait_courier_name", OnPlayerQueryUnit));
function UpdatePortraitCourierName(portrait_unit) {
    if (portrait_unit && FindDotaHudElement('UnitNameLabel')) {
        var data = CustomNetTables.GetTableValue("player_id_table", 'courier_' + Entities.GetPlayerOwnerID(portrait_unit));
        if (data && data.courier) {
            var courier_id = data.courier.split('_')[0];
            $.Schedule(0.03, function () {
                FindDotaHudElement('UnitNameLabel').text = $.Localize('#' + courier_id);
            });
        }
        else {
            FindDotaHudElement('UnitNameLabel').text = '';
        }
    }
}
function UpdatePortraitEggName(portrait_unit) {
    if (portrait_unit && FindDotaHudElement('UnitNameLabel')) {
        var data = CustomNetTables.GetTableValue("unit_table", 'egg_' + portrait_unit);
        if (data && data.chess && data.count) {
            var chess_name = $.Localize('#' + data.chess).replace('★', '') + $.Localize('#' + 'egg') + '★';
            if (data.count >= 3) {
                chess_name += '★';
            }
            if (data.count >= 9) {
                chess_name += '★';
            }

            $.Schedule(0.03, function () {
                FindDotaHudElement('UnitNameLabel').text = chess_name;
            });
        }
        else {
            FindDotaHudElement('UnitNameLabel').text = $.Localize('#' + "item_egg");
        }
    }
}

// 玩家选中了信使：隐藏自带的buff/debuff栏，显示自制的
function ShowDrodoCourierBuffContainer(team_id) {
    if (!FindDotaHudElement('buffs') || !FindDotaHudElement('debuffs')) {
        return;
    }
    if (!FindDotaHudElement('DrodoBuffs') || !FindDotaHudElement('DrodoDebuffs')) {
        InitDrodoCourierBuffContainer();
    }
    // for (t = 6; t <= 13; t++) {
    //     FindDotaHudElement('DrodoBuffs_' + t).style['opacity'] = '0.0';
    //     FindDotaHudElement('DrodoDebuffs_' + t).style['opacity'] = '0.0';
    // }
    FillDrodoCourierBuffContainer(DRODO_BUFF_LIST[team_id], team_id);

    $.Schedule(0.01, function () {
        //延迟执行期间面板可能已被重建/销毁，全部走安全访问
        HudStyle('DrodoBuffs', 'opacity', '1');
        HudStyle('DrodoDebuffs', 'opacity', '1');
        HudStyle('buffs', 'opacity', '0.0');
        HudStyle('debuffs', 'opacity', '0.0');
    });
}
function HideDrodoCourierBuffContainer() {
    if (!FindDotaHudElement('buffs') || !FindDotaHudElement('debuffs')) {
        return;
    }
    if (!FindDotaHudElement('DrodoBuffs') || !FindDotaHudElement('DrodoDebuffs')) {
        InitDrodoCourierBuffContainer();
    }

    $.Schedule(0.01, function () {
        //延迟执行期间面板可能已被重建/销毁，全部走安全访问
        HudStyle('buffs', 'opacity', '1');
        HudStyle('debuffs', 'opacity', '1');
        HudStyle('DrodoBuffs', 'opacity', '0.0');
        HudStyle('DrodoDebuffs', 'opacity', '0.0');
    });
}

var DRODO_BUFF_LIST = {};
function InitDrodoCourierBuffContainer() {
    var buff_container = FindDotaHudElement('BuffContainer');
    if (!buff_container) {
        return;
    }

    if (!FindDotaHudElement('DrodoBuffs')) {
        $.CreatePanel('Panel', buff_container, 'DrodoBuffs', {
            style: 'margin-bottom:141px;margin-left:50%;flow-children:right;horizontal-align:left;vertical-align:bottom;transform:translateY(0px);transition-property:opacity,transform;transition-duration:0.12s;',
        });
    }
    if (!FindDotaHudElement('DrodoDebuffs')) {
        $.CreatePanel('Panel', buff_container, 'DrodoDebuffs', {
            style: 'margin-bottom:141px;margin-right:50%;flow-children:left;horizontal-align:right;vertical-align:bottom;transform:translateY(0px);transition-property:opacity,transform;transition-duration:0.12s;',
        });
    }
    // for (var t = 6; t <= 13; t++) {
    //     // if (!FindDotaHudElement('DrodoBuffs_' + t)) {
    //     //     $.CreatePanel('Panel', buff_container, 'DrodoBuffs_' + t, {
    //     //         style: 'margin-bottom:141px;margin-left:50%;flow-children:right;horizontal-align:left;vertical-align:bottom;transform:translateY(0px);transition-property:opacity,transform;transition-duration:0.12s;',
    //     //     });
    //     // }
    //     // if (!FindDotaHudElement('DrodoDebuffs_' + t)) {
    //     //     $.CreatePanel('Panel', buff_container, 'DrodoDebuffs_' + t, {
    //     //         style: 'margin-bottom:141px;margin-right:50%;flow-children:left;horizontal-align:right;vertical-align:bottom;transform:translateY(0px);transition-property:opacity,transform;transition-duration:0.12s;',
    //     //     });
    //     // }
    //     DRODO_BUFF_LIST[t] = '';
    // }
}
function FillDrodoCourierBuffContainer(buff, team_id) {
    var buff_container = FindDotaHudElement('DrodoBuffs');
    var debuff_container = FindDotaHudElement('DrodoDebuffs');

    var all_buffs = [];
    buff_container.RemoveAndDeleteChildren();
    debuff_container.RemoveAndDeleteChildren();
    if (buff_container && debuff_container && buff) {
        // var buff_array = buff.split(',');
        var buff_array = BuffStr2BuffList(buff, true);

        for (var i = 0; i < buff_array.length; i++) {
            if (buff_array[i]) {
                var buff_one = buff_array[i];
                var buff_name = buff_one.name;
                var buff_count = parseInt(buff_one.buff_count) || 0;

                if (buff_name && buff_count) {
                    var buff_type = buff_one.buff_type;
                    var buff_rule = buff_one.buff_rule;
                    var buff_rule_ori = buff_one.buff_rule_ori;

                    var buff_unlock_count = 0;
                    var buff_unlock_level = 0;
                    // if (BUFF_LIST_1[buff_name]) {
                    //     buff_type = 'debuff'; // 种族
                    //     buff_rule = BUFF_LIST_1[buff_name];
                    // }
                    // if (BUFF_LIST_2[buff_name]) {
                    //     buff_type = 'buff'; // 职业
                    //     buff_rule = BUFF_LIST_2[buff_name];
                    // }
                    for (var j = 0; j < buff_rule.length; j++) {
                        // 第j+1层的羁绊 需要buff_rule[j]个来解锁
                        if (buff_one.have_wizard_buff && buff_rule[j] >= 4 && buff_name != 'is_pandaman') {
                            buff_rule[j]--;
                        }

                        if (buff_count >= buff_rule[j]) {
                            buff_unlock_level = j + 1;
                            buff_unlock_count = buff_rule_ori[j];
                        }
                    }
                    all_buffs.push({
                        name: buff_name,
                        count: buff_count,
                        type: buff_type,
                        priority: (BUFF_PRIORITY[buff_name]) || 0,
                        buff_unlock_count: buff_unlock_count,
                        buff_unlock_level: buff_unlock_level,
                        buff_rule: buff_rule,
                    });
                }
            }
        }

        all_buffs.sort(function (a, b) {
            var score_a = 0, score_b = 0;
            if (a.buff_unlock_level > 0) {
                score_a += 10000;
            }
            if (b.buff_unlock_level > 0) {
                score_b += 10000;
            }
            score_a += a.buff_unlock_count * 100;
            score_b += b.buff_unlock_count * 100;

            score_a += a.priority;
            score_b += b.priority;

            return score_b - score_a;
        })

        // 展示
        for (var i = 0; i < all_buffs.length; i++) {
            var b = all_buffs[i];

            var color = 'gradient( linear, 0% 0%, 0% 100%, from( #91C1F7 ), to( #4575A8 ) )';

            var parent_panel = buff_container;
            if (b.type == 'debuff') {
                parent_panel = debuff_container;
                color = 'gradient( linear, 0% 0%, 0% 100%, from( #E7D291 ), to( #887845 ) )';
            }
            var buff_panel = $.CreatePanel('Panel', parent_panel, 'DrodoBuffs_panel_' + i, {
                style: 'width:35px;height:80px;margin:5px;',
                hittest: true,
            });
            if (!b.buff_unlock_level) {
                buff_panel.style['brightness'] = '0.5';
                buff_panel.style['saturation'] = '0';
                // buff_panel.style['transform'] = 'scale3d( 0.5,0.5,0.5)';
            }
            // if (Game.IsHUDFlipped() == true) {
            //     buff_panel.style['transform'] = 'rotateY(180deg)';
            // }
            var buff_image = $.CreatePanel('DOTAAbilityImage', buff_panel, 'DrodoBuffs_image_' + i, {
                style: 'width:35px;height:35px;margin-bottom:10px;vertical-align:bottom;box-shadow:fill #000000ff 0px 0px 2px 0px;',
                abilityname: b.name,
                onmouseover: "DOTAShowAbilityTooltip(" + b.name + ")",
                onmouseout: "DOTAHideAbilityTooltip()",
            });

            if (b.buff_unlock_level > 0) {
                $.CreatePanel('Label', buff_panel, 'DrodoBuffs_count_' + i, {
                    style: 'text-shadow:0px 0px 4px 4 #000000;color:#ccc;vertical-align:bottom;horizontal-align:center;margin-bottom:-5px;font-family:titleFont;font-weight:bold;',
                    text: '(' + b.buff_unlock_count + ')',
                    hittest: false,
                });
            }

            // 根据rule渲染进度线段
            if (b.buff_rule) {
                var count = b.count;
                for (var j = 0; j < b.buff_rule.length; j++) {
                    // 第j+1层的羁绊 需要b.buff_rule[j]个来解锁
                    var total_this_line = (b.buff_rule[j] || 0) - (b.buff_rule[j - 1] || 0);
                    if (total_this_line > 0) {
                        var width_each_this_line = Math.floor(36 / total_this_line - 1) + 'px';
                        var buff_panel_line = $.CreatePanel('Panel', buff_panel, 'DrodoBuffs_line_' + i + '_' + j, {
                            style: 'width:100%;height:10px;margin-bottom:' + (52 + (j - 1) * 8) + 'px;vertical-align:bottom;flow-children:right;',
                            hittest: true,
                        });
                        for (k = 0; k < total_this_line; k++) {
                            if (count > 0) {
                                count--;
                                $.CreatePanel('Panel', buff_panel_line, 'DrodoBuffs_line_' + i + '_' + j + '_' + k, {
                                    style: 'width:' + width_each_this_line + ';height:6px;background-color:' + color + ';margin-right:1px;border-radius:2px;box-shadow:fill #000000ff 0px 0px 2px 0px;',
                                    hittest: true,
                                });
                            }
                            else {
                                $.CreatePanel('Panel', buff_panel_line, 'DrodoBuffs_line_' + i + '_' + j + '_' + k, {
                                    style: 'width:' + width_each_this_line + ';height:6px;background-color:rgba(0,0,0,0.8);margin-right:1px;border-radius:2px;',
                                    hittest: true,
                                });
                            }
                        }
                    }
                }
            }
        }
    }
}

function OnShowDrodoCourierBuff(keys) {
    if (!DRODO_BUFF_LIST) {
        DRODO_BUFF_LIST = {};
    }
    DRODO_BUFF_LIST[keys.team_id] = keys.buff;

    if (Entities.GetTeamNumber(Players.GetLocalPlayerPortraitUnit()) == keys.team_id) {
        if (Players.GetLocalPlayerPortraitUnit() == Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())) {
            ShowDrodoCourierBuffContainer(keys.team_id);
        }

    }
}





// Game.AddCommand("+TogglePanel", toggle_panel, "", 0);
// Game.AddCommand("+BackHome", OnBackHome, "", 0);
// Game.AddCommand("+TabHome", OnTabHome, "", 0);
// Game.AddCommand("+ToggleF9", toggle_f9, "", 0);
// Game.AddCommand("+ToggleStat", toggle_player_details, "", 0);
// Game.AddCommand("+ChatEmotion", ShowChatEmotion, "", 0);
// Game.AddCommand("-ChatEmotion", HideChatEmotion, "", 0);

// Game.AddCommand("+KeyboardZ", KeyboardZ, "", 0);
// Game.AddCommand("+KeyboardA", KeyboardA, "", 0);
// Game.AddCommand("+KeyboardXiegang", KeyboardXiegang, "", 0);
// Game.AddCommand("+KeyboardUp", KeyboardUp, "", 0);
// Game.AddCommand("+KeyboardDown", KeyboardDown, "", 0);
// Game.AddCommand("+KeyboardLeft", KeyboardLeft, "", 0);
// Game.AddCommand("+KeyboardRight", KeyboardRight, "", 0);

// Game.AddCommand("+Keyboard1", Keyboard1, "", 0);
// Game.AddCommand("+Keyboard2", Keyboard2, "", 0);
// Game.AddCommand("+Keyboard3", Keyboard3, "", 0);
// Game.AddCommand("+Keyboard4", Keyboard4, "", 0);
// Game.AddCommand("+Keyboard5", Keyboard5, "", 0);
// Game.AddCommand("+Keyboard6", Keyboard6, "", 0);
// Game.AddCommand("+Keyboard7", Keyboard7, "", 0);
// Game.AddCommand("+Keyboard8", Keyboard8, "", 0);
// Game.AddCommand("+KeyboardF1", KeyboardF1, "", 0);
// Game.AddCommand("+KeyboardF2", KeyboardF2, "", 0);
// Game.AddCommand("+KeyboardF3", KeyboardF3, "", 0);
// Game.AddCommand("+KeyboardF4", KeyboardF4, "", 0);
// Game.AddCommand("+KeyboardF5", KeyboardF5, "", 0);
// Game.AddCommand("+KeyboardF6", KeyboardF6, "", 0);
// Game.AddCommand("+KeyboardF7", KeyboardF7, "", 0);
// Game.AddCommand("+KeyboardF8", KeyboardF8, "", 0);

function KeyboardZ() {
    OnShowDrodoChat({ text: 'Z' });
}
function KeyboardA() {
    OnShowDrodoChat({ text: 'A' });
}
function KeyboardXiegang() {
    OnShowDrodoChat({ text: '/' });
}
function KeyboardUp() {
    OnShowDrodoChat({ text: 'Up' });
}
function KeyboardDown() {
    OnShowDrodoChat({ text: 'Down' });
}
function KeyboardLeft() {
    OnShowDrodoChat({ text: 'Left' });
}
function KeyboardRight() {
    OnShowDrodoChat({ text: 'Right' });
}
function Keyboard1() {
    // OnShowDrodoChat({ text: '1' });
    GameEvents.SendCustomGameEventToServer("request_select_handchess", { hand_index: 1 });
}
function Keyboard2() {
    // OnShowDrodoChat({ text: '2' });
    GameEvents.SendCustomGameEventToServer("request_select_handchess", { hand_index: 2 });
}
function Keyboard3() {
    // OnShowDrodoChat({ text: '3' });
    GameEvents.SendCustomGameEventToServer("request_select_handchess", { hand_index: 3 });
}
function Keyboard4() {
    // OnShowDrodoChat({ text: '4' });
    GameEvents.SendCustomGameEventToServer("request_select_handchess", { hand_index: 4 });
}
function Keyboard5() {
    // OnShowDrodoChat({ text: '5' });
    GameEvents.SendCustomGameEventToServer("request_select_handchess", { hand_index: 5 });
}
function Keyboard6() {
    // OnShowDrodoChat({ text: '6' });
    GameEvents.SendCustomGameEventToServer("request_select_handchess", { hand_index: 6 });
}
function Keyboard7() {
    // OnShowDrodoChat({ text: '7' });
    GameEvents.SendCustomGameEventToServer("request_select_handchess", { hand_index: 7 });
}
function Keyboard8() {
    // OnShowDrodoChat({ text: '8' });
    GameEvents.SendCustomGameEventToServer("request_select_handchess", { hand_index: 8 });
}
function KeyboardF1() {
    // 选中自己信使
    GameUI.SelectUnit(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), false);
    // OnShowDrodoChat({ text: 'F1' });
}
function KeyboardF2() {
    // OnShowDrodoChat({ text: 'F2' });
}
function KeyboardF3() {
    // OnShowDrodoChat({ text: 'F3' });
}
function KeyboardF4() {
    // OnShowDrodoChat({ text: 'F4' });
}
function KeyboardF5() {
    // OnShowDrodoChat({ text: 'F5' });
}
function KeyboardF6() {
    // OnShowDrodoChat({ text: 'F6' });
}
function KeyboardF7() {
    // OnShowDrodoChat({ text: 'F7' });
}
function KeyboardF8() {
    // OnShowDrodoChat({ text: 'F8' }); 
}


function start_battle_animation(panel) {
    if (panel) {
        panel.RemoveAndDeleteChildren();
        panel.SetHasClass('win', false);
        panel.SetHasClass('draw', false);
        panel.SetHasClass('lose', false);
        var sword1 = CreateUIElement(panel, 'Image', '', {
            style: "width:40px;height:40px;margin-left:0px;margin-right:0px;transition-property:transform,position,opacity;transition-duration:0.2s;img-shadow: 0px 0px 4px 0.0 #000;transform:rotateZ(45deg);position:10px 0px 0px;",
            src: 'file://{images}/custom_game/sword.png',
        });
        var sword2 = CreateUIElement(panel, 'Image', '', {
            style: "width:40px;height:40px;margin-left:20px;margin-right:0px;transition-property:transform,position,opacity;transition-duration:0.2s;img-shadow: 0px 0px 4px 0.0 #000;transform:rotateZ(-45deg);position:-10px 0px 0px;",
            src: 'file://{images}/custom_game/sword.png',
        });
        $.Schedule(5.5, function () {
            battle_animation(panel, sword1, sword2);
        });
    }
}
function battle_animation(panel, sword1, sword2) {
    if (!panel || !sword1 || !sword2) {
        return;
    }
    if (panel.visible == false) {
        return;
    }
    if (panel.BHasClass('win') == true) {
        set_battle_win(panel, sword1, sword2);
        return;
    }
    if (panel.BHasClass('draw') == true) {
        set_battle_draw(panel, sword1, sword2);
        return;
    }
    if (panel.BHasClass('lose') == true) {
        set_battle_lose(panel, sword1, sword2);
        return;
    }

    sword1.style['transform'] = 'rotateZ(0deg)';
    sword1.style['position'] = '0px 0px 0px';
    sword2.style['transform'] = 'rotateZ(0deg)';
    sword2.style['position'] = '0px 0px 0px';

    $.Schedule(0.4, function () {
        sword1.style['transform'] = 'rotateZ(45deg)';
        sword1.style['position'] = '10px 0px 0px';
        sword2.style['transform'] = 'rotateZ(-45deg)';
        sword2.style['position'] = '-10px 0px 0px';
    });

    $.Schedule(0.9, function () {
        battle_animation(panel, sword1, sword2);
    });
}

function set_battle_win(panel, sword1, sword2) {
    // sword1.style['opacity'] = 0;
    // sword1.style['transform'] = 'scale3d( 3, 3, 3);';

    // sword2.style['transform'] = 'rotateZ(-60deg)';
    // sword2.style['position'] = '-10px 0px 0px';
    sword1.style['transform'] = 'rotateZ(45deg)';
    sword1.style['position'] = '10px 0px 0px';
    sword2.style['transform'] = 'rotateZ(-45deg)';
    sword2.style['position'] = '-10px 0px 0px';
}
function set_battle_draw(panel, sword1, sword2) {
    // sword1.style['transform'] = 'rotateZ(0deg)';
    // sword1.style['position'] = '0px 0px 0px';
    // sword2.style['transform'] = 'rotateZ(0deg)';
    // sword2.style['position'] = '0px 0px 0px';
    sword1.style['transform'] = 'rotateZ(45deg)';
    sword1.style['position'] = '10px 0px 0px';
    sword2.style['transform'] = 'rotateZ(-45deg)';
    sword2.style['position'] = '-10px 0px 0px';
}
function set_battle_lose(panel, sword1, sword2) {
    // sword1.style['transform'] = 'rotateZ(60deg)';
    // sword1.style['position'] = '10px 0px 0px';

    // sword2.style['opacity'] = 0;
    // sword2.style['transform'] = 'scale3d( 3, 3, 3);';
    sword1.style['transform'] = 'rotateZ(45deg)';
    sword1.style['position'] = '10px 0px 0px';
    sword2.style['transform'] = 'rotateZ(-45deg)';
    sword2.style['position'] = '-10px 0px 0px';
}

// $('#panel_battle_0').visible = true;
// start_battle_animation($('#panel_battle_0'));

change_tab_ranking('ranking_self');
function change_tab_ranking(tab) {
    $('#ranking_self_container').visible = false;
    $('#ranking_world_container').visible = false;
    $('#leaderboard_lineup_value_container').visible = false;
    $('#leaderboard_mvp_chess_container').visible = false;
    $('#leaderboard_pandaman_fish_container').visible = false;

    $('#tab_ranking_self_container').SetHasClass('grey_title_highlight', false);
    $('#tab_ranking_world_container').SetHasClass('grey_title_highlight', false);
    $('#tab_leaderboard_lineup_value_container').SetHasClass('grey_title_highlight', false);
    $('#tab_leaderboard_mvp_chess_container').SetHasClass('grey_title_highlight', false);
    $('#tab_leaderboard_pandaman_fish_container').SetHasClass('grey_title_highlight', false);

    $('#tab_ranking_self_container').SetHasClass('grey_title_hover', true);
    $('#tab_ranking_world_container').SetHasClass('grey_title_hover', true);
    $('#tab_leaderboard_lineup_value_container').SetHasClass('grey_title_hover', true);
    $('#tab_leaderboard_mvp_chess_container').SetHasClass('grey_title_hover', true);
    $('#tab_leaderboard_pandaman_fish_container').SetHasClass('grey_title_hover', true);

    $('#' + tab + '_container').visible = true;
    $('#tab_' + tab + '_container').SetHasClass('grey_title_highlight', true);
    $('#tab_' + tab + '_container').SetHasClass('grey_title_hover', false);
}

function ToggleOnlyShowRankMatch() {
    if ($('#panel_ranking_self_checkbox_only_rank').checked) {
        // 只看天梯
        var xxx = $("#ranking_self_list").FindChildrenWithClassTraverse('casual');
        for (var i in xxx) {
            if (xxx[i]) {
                xxx[i].visible = false;
            }
        }
    }
    else {
        // 全看
        var xxx = $("#ranking_self_list").FindChildrenWithClassTraverse('casual');
        for (var i in xxx) {
            if (xxx[i]) {
                xxx[i].visible = true;
            }
        }
    }
}

function ShowSeasonList(season_list, curr_season, award_season) {
    if (!$('#panel_event_container')) {
        return;
    }
    $('#panel_event_container').RemoveAndDeleteChildren()
    for (var i = 0; i < season_list.length; i++) {
        var s = season_list[i];
        var container = $.CreatePanel('Panel', $('#panel_event_container'), "season_container_" + s.season, {
            class: 'ranking_line_event',
        });
        if (curr_season == s.season || s.is_curr_season) {
            container.SetHasClass('season_event_curr', true);
        }

        var ad_img = $.CreatePanel('Panel', container, "", {
            style: 'height:220px;width:100%;opacity-mask:url("s2r://panorama/images/masks/scratched_box_psd.vtex");'
        });
        ad_img.style['background-image'] = 'url("' + s.ad_pic + '")';
        if (s.ad_pic.indexOf('file://{images}/econ/') >= 0) {
            ad_img.style['background-size'] = '100% 250%';
            ad_img.style['background-position'] = '0px -50px';
            ad_img.style.height = '120px';
        }
        else {
            ad_img.style['background-size'] = '100% 100%';
        }

        var text_container = $.CreatePanel('Panel', container, "", {
            style: 'width:100%; min-height:30px; flow-children: right;',
        });

        var text_container_left = $.CreatePanel('Panel', text_container, "", {
            style: 'width:450px;flow-children:down;',
        });
        var text_container_right = $.CreatePanel('Panel', text_container, "", {
            style: 'width:100px;flow-children:down;',
        });

        var text_container_left_line1 = $.CreatePanel('Panel', text_container_left, "", {
            style: 'width:100%;flow-children:right-wrap;margin-top:5px;',
        });

        $.CreatePanel('Label', text_container_left_line1, "", {
            text: $.Localize('#season_' + s.season),
            style: 'font-size:26px;margin-left:10px;color:#ddd;text-transform: uppercase;line-height:30px;font-weight: bold;font-style: italic;',
        });
        $.CreatePanel('Label', text_container_left_line1, "", {
            text: '(' + s.date + ')',
            style: 'font-size:18px;margin-left:10px;color:#888;font-style:italic;line-height:20px;vertical-align:center;',
        });
        if (s.badge) {
            $.CreatePanel('Image', text_container_right, "", {
                style: 'width:100px;height:100px;',
                src: s.badge,
                onmouseover: "DOTAShowTextTooltip(\'" + $.Localize('#badge_title_' + s.season) + "\')",
                onmouseout: "DOTAHideTextTooltip()",
            });
        }

        if (s.courier) {
            var text_container_left_courier_container = $.CreatePanel('Panel', text_container_left, "", {
                style: 'width:100%;min-height:45px;flow-children:right-wrap;padding-left:5px;margin-top:5px;',
            });
            for (var j = 0; j < s.courier.length; j++) {
                // 信使奖励图标
                $.CreatePanel('Image', text_container_left_courier_container, "", {
                    style: 'width:40px;height:40px;margin:5px;',
                    src: 'file://{images}/custom_game/skaters/' + s.courier[j] + '.png',
                    onmouseover: "DOTAShowTextTooltip(\'" + $.Localize('#' + s.courier[j]) + "\')",
                    onmouseout: "DOTAHideTextTooltip()",
                });

            }
        }

        if (s.update && s.update.length > 0) {
            var text_container_left_update_container = $.CreatePanel('Panel', text_container_left, "", {
                style: 'width:100%;min-height:45px;flow-children:down;padding-left:5px;margin-top:5px;',
            });
            for (var j = 0; j < s.update.length; j++) {
                var u = s.update[j];
                var text_container_left_update_container_one = $.CreatePanel('Panel', text_container_left_update_container, "", {
                    style: 'width:100%;flow-children:right-wrap;',
                });
                var update_pretext = '';
                if (!u.type || u.type == 'update') {
                    update_pretext = '(' + u.date + ' ' + $.Localize("#text_update") + ')';
                }
                else {
                    update_pretext = '(' + u.date + ' ' + $.Localize('#text_' + u.type) + ')';
                }

                $.CreatePanel('Label', text_container_left_update_container_one, "", {
                    text: update_pretext,
                    style: 'font-size:18px;margin-left:10px;color:#888;font-style:italic;line-height:20px;vertical-align:center;',
                });

                var lan = $.Language();
                if (lan == 'tchinese' && !u[lan]) {
                    lan = 'schinese';
                }
                if (lan == 'koreana' && !u[lan]) {
                    lan = 'korean';
                }
                var uu = u[lan] || u['english'] || u['schinese'];
                var title = uu['title'];
                var link = uu['link'];
                var uu_one = $.CreatePanel('Label', text_container_left_update_container_one, "", {
                    text: title,
                    style: 'font-size:18px;margin-left:10px;color:#888;line-height:20px;vertical-align:center;',
                    html: true,
                });
                if (link) {
                    uu_one.text = '<a href="' + link + '"><em>' + title + '</em></a> <img src="file://{images}/custom_game/link.png"/>';
                    uu_one.style.color = '#ddd';
                    // uu_one.SetHasClass('link_text',true);
                }
            }
        }

        if (award_season && award_season == s.season) {
            var button_get_season_award = $.CreatePanel('Panel', container, "button_get_season_award", {
                class: 'dota_button button_get_season_award unavailable',
                onactivate: 'GetSeasonAward()',
            });
            $.CreatePanel('Label', button_get_season_award, "text_get_season_award", {
                text: "#text_get_season_award",
                style: 'font-size:22px;horizontal-align:center;vertical-align:center;',
            });
        }
    }
}






function ShowGuide(force) {
    ShowExclusionWindow('panel_guide', force);
}
function ShowList(force) {
    ShowExclusionWindow('panel_list', force);
}
function ShowRanking(force) {
    ShowExclusionWindow('panel_ranking', force);
}
function ShowStore(force) {
    ShowExclusionWindow('store_panel', force);
}
function ShowVip(force) {
    ShowExclusionWindow('panel_vip', force);
}
function ShowRight(force) {
    ShowExclusionWindow('board_right', force);
}
function ShowStoreV5(force) {
    ShowExclusionWindow('store_panel_v5', force);

    //商城关掉时，二维码弹窗一起关掉，加号恢复可点（否则弹窗藏在商城里面，加号会一直灰着）
    if (!$('#store_panel_v5').BHasClass('show')) {
        HideStoreQRPopup();
    }
}

function toggle_player_details() {
    if (FindDotaHudElement('board_right').BHasClass('show')) {
        FindDotaHudElement('button_board_right').style['transform'] = 'rotateZ(0deg)';
    }
    else {
        FindDotaHudElement('button_board_right').style['transform'] = 'rotateZ(180deg)';
    }
    ShowExclusionWindow('board_right');
}
function close_player_details() {
    FindDotaHudElement('board_right').SetHasClass('show', false);
    FindDotaHudElement('button_board_right').style['transform'] = 'rotateZ(0deg)';
}

function open_panel_draw_card() {
    ShowExclusionWindow('panel_draw_card', true);
}
function close_panel_draw_card() {
    FindDotaHudElement('panel_draw_card').SetHasClass('show', false);
}
function guanbi_panel_draw_card() {
    close_panel_draw_card({ key: CLIENT_KEY });
}
function show_panel_draw_card() {
    var chess_discount_list = CustomNetTables.GetTableValue("chess_pool_table", 'chess_discount_list') || {};
    var discount_chess_dic = {};
    for (var i in chess_discount_list){
        discount_chess_dic[chess_discount_list[i]] = 1;
    }
    EnsureDrawChessList();
    for (var i = 0; i <= 4; i++) {
        var c = MY_DRAW_CHESS_LIST['' + (i + 1)];

        if (c && c.chess && $('#hero_draw_card_box_' + i) && CHESS_2_HERO[c.chess]) {
            $('#panel_hero_draw_card_' + i).style['opacity'] = '1';
            // var text = '<DOTAScenePanel id="hero_draw_card_' + i + '" class="hero_draw_card" unit="' + CHESS_2_HERO[c.chess] + '"  light="global_light" antialias="true" renderdeferred="false" particleonly="false"/>';
            $('#hero_draw_card_box_' + i).RemoveAndDeleteChildren();
            // $('#hero_draw_card_box_'+i).BCreateChildren(text);
            // CreateChildren($('#hero_draw_card_box_' + i), text);

            // 新抽牌面板的棋子模型
            var time = 0.5;//(Math.random()/4+0.5);
            // if (CHESS_2_LEVEL[c.chess] == 5){
            //     time += 0.25;
            // }
            var ppp = $.CreatePanel('Panel', $('#hero_draw_card_box_' + i), 'hero_draw_card_outer_' + i, {
                style: "width:300px;height:300px;overflow:clip;margin-top:10px;margin-left:0px;transition-property:position,opacity;transition-duration:" + time + "s;position:0px 0px 0px;opacity:0.01;",
            });
            $.CreatePanel('DOTAScenePanel', ppp, 'hero_draw_card_' + i, {
                style: "width:750px;height:750px;horizontal-align:center;vertical-align:center;margin-top:50px;",
                // unit: CHESS_2_HERO[c.chess],
                light: "global_light",
                antialias: true,
                renderdeferred: false,
                particleonly: false,
                camera: "camera_1",
                map: "maps/chess/" + c.chess + ".vmap",
            });
            ppp.style['position'] = '0px 0px 0px';
            ppp.style['opacity'] = '1';

            //<DOTAScenePanel id="panel_draw_card_ray_0" tabindex="auto" unit="chess_pom" style="width:400px;height:400px;z-index:1;" light="global_light" antialias="true" renderdeferred="false" particleonly="false"/>

            $('#img_draw_card_' + i).heroname = CHESS_2_HERO[c.chess];

            var star = c.wheel_chess_star || 1;
            if (star == 1) {
                $('#text_draw_card_' + i).text = $.Localize('#' + c.chess);
            }
            else if (star == 2) {
                $('#text_draw_card_' + i).text = $.Localize('#' + c.chess + '1');
            }
            else if (star == 3) {
                $('#text_draw_card_' + i).text = $.Localize('#' + c.chess + '11');
            }

            // $('#text_draw_card_'+i).SetAttributeString('chess',MY_DRAW_CHESS_LIST[i]);


            // $('#text_draw_card_' + i + '_spec_class').text = chess2specclass(c.chess);



            // var spec_class = CHESS_2_SPEC_CLASS[c.chess];

            var spec_class = c.class_list;
            if (spec_class && $('#text_draw_card_' + i + '_spec_class')) {
                var bottom_bar = $('#text_draw_card_' + i + '_spec_class');
                bottom_bar.RemoveAndDeleteChildren();

                var arr2 = [];
                for (var j in spec_class) {
                    arr2.push($.Localize('#DOTA_Tooltip_ability_' + spec_class[j]));
                }
                var text_race_class = arr2.join(' / ');
                for (var k in spec_class) {
                    var spec_class_one = spec_class[k];
                    // $.CreatePanel('DOTAAbilityImage', bottom_bar, '', {
                    //     class: 'ability_grid',
                    //     style: 'margin-top:4px;margin-left:5px;margin-right:5px;tooltip-position: bottom;',
                    //     abilityname: spec_class_one,
                    //     onmouseover: "DOTAShowTextTooltip('#DOTA_Tooltip_ability_" + spec_class_one + "')",
                    //     onmouseout: "DOTAHideTextTooltip()",
                    // });

                    $.CreatePanel('DOTAAbilityImage', bottom_bar, '', {
                        class: 'ability_grid',
                        style: 'margin-left:5px;margin-right:5px;',
                        abilityname: spec_class_one,
                        onmouseover: "DOTAShowAbilityTooltip('" + spec_class_one + "')",
                        onmouseout: "DOTAHideAbilityTooltip()",
                    });
                }
                if (c.extra_synergy && c.extra_synergy[1]) {
                    $.CreatePanel('Image', bottom_bar, "", {
                        src: "file://{images}/custom_game/plus.png",
                        style: 'width:15px;height:15px;opacity:0.5;vertical-align:center;margin-top:4px;tooltip-position: bottom;',
                    });
                    for (var k in c.extra_synergy) {
                        var spec_class_one = c.extra_synergy[k];
                        // $.CreatePanel('DOTAAbilityImage', bottom_bar, '', {
                        //     class: 'ability_grid',
                        //     style: 'margin-top:4px;margin-left:5px;margin-right:5px;',
                        //     abilityname: spec_class_one,
                        //     onmouseover: "DOTAShowTextTooltip('#DOTA_Tooltip_ability_" + spec_class_one + "')",
                        //     onmouseout: "DOTAHideTextTooltip()",
                        // });
                        $.CreatePanel('DOTAAbilityImage', bottom_bar, '', {
                            class: 'ability_grid',
                            style: 'margin-left:5px;margin-right:5px;',
                            abilityname: spec_class_one,
                            onmouseover: "DOTAShowAbilityTooltip('" + spec_class_one + "')",
                            onmouseout: "DOTAHideAbilityTooltip()",
                        });
                    }
                }

                if (discount_chess_dic[c.chess]){
                    $.CreatePanel('Image', bottom_bar, '', {
                        class: 'chess_grid',
                        style: 'opacity:0.9;margin-left:5px;margin-right:5px;',
                        src: 'file://{images}/custom_game/discount.png',
                        onmouseover: "DOTAShowTitleTextTooltip('#discount_chess','#discount_chess_desc')",
                        onmouseout: "DOTAHideTitleTextTooltip()",
                    });
                }

            }




            $('#text_draw_card_' + i).style['color'] = '#fff';
            $('#panel_draw_card_name_effect_' + i).RemoveAndDeleteChildren();

            if (c.chess.indexOf('ssr') > -1) {
                $('#panel_draw_card_name_brush_' + i).style['background-color'] = LEVEL_2_COLOR[6];
                $('#text_draw_card_' + i).style['color'] = LEVEL_2_COLOR[6];

                $.CreatePanel('DOTAScenePanel', $('#panel_draw_card_name_effect_' + i), "", {
                    hittest: "false",
                    map: "maps/scenes/rank_divine_ambient.vmap",
                    camera: "default_camera",
                    style: "width:100%;height:100%;z-index:1;opacity:1;",
                    // light: "global_light",
                    antialias: "true",
                    renderdeferred: "true",
                    particleonly: "true",
                });
            }
            else {
                $('#panel_draw_card_name_brush_' + i).style['background-color'] = LEVEL_2_COLOR[CHESS_2_LEVEL[c.chess]];
                $('#text_draw_card_' + i).style['color'] = LEVEL_2_COLOR[CHESS_2_LEVEL[c.chess]];

                if (CHESS_2_LEVEL[c.chess] == 5) {
                    $.CreatePanel('DOTAScenePanel', $('#panel_draw_card_name_effect_' + i), "", {
                        hittest: "false",
                        map: "maps/scenes/plus_button.vmap",
                        camera: "default_camera",
                        style: "width:100%;height:100%;z-index:1;opacity:0.5;",
                        // light: "global_light",
                        antialias: "true",
                        renderdeferred: "true",
                        particleonly: "true",
                    });
                }
            }
            $('#text_draw_card_price_' + i).text = ' × ' + c.price;
            $('#img_draw_card_price_' + i).SetHasClass('invisible', false);

            // 货币类型
            var image_draw_card_price_money = $('#img_draw_card_price_' + i);
            if (image_draw_card_price_money) {
                if (c.money && c.money != 'gold') {
                    // 代币

                    $('#img_draw_card_price_' + i).SetImage("file://{images}/custom_game/ui/money/" + c.money + ".png");
                    $('#img_draw_card_price_' + i).SetHasClass('token', true);
                    $('#img_draw_card_price_' + i).SetHasClass('gold', false);
                    // $('#img_draw_card_price_' + i).style['height'] = '30px';
                    // $('#img_draw_card_price_' + i).style['width'] = '40px';
                    // $('#img_draw_card_price_' + i).style['margin-left'] = '-5px';

                    // image_draw_card_price_money.SetPanelEvent("onmouseover",
                    //     function () {
                    //         $.DispatchEvent("DOTAShowTextTooltip", image_draw_card_price_money, $.Localize('#text_money_'+c.money));
                    //     }
                    // );
                    // image_draw_card_price_money.SetPanelEvent("onmouseout",
                    //     function () {
                    //         $.DispatchEvent("DOTAHideTextTooltip");
                    //     }
                    // );
                }
                else {
                    // 金币
                    $('#img_draw_card_price_' + i).SetImage("file://{images}/custom_game/ui/money/gold.png");
                    $('#img_draw_card_price_' + i).SetHasClass('token', false);
                    $('#img_draw_card_price_' + i).SetHasClass('gold', true);
                    // $('#img_draw_card_price_' + i).style['height'] = '30px';
                    // $('#img_draw_card_price_' + i).style['width'] = '30px';
                    // $('#img_draw_card_price_' + i).style['margin-left'] = '0px';

                    // image_draw_card_price_money.SetPanelEvent("onmouseover",
                    //     function () {
                    //         $.DispatchEvent("DOTAShowTextTooltip", image_draw_card_price_money, $.Localize('#text_money_gold'));
                    //     }
                    // );
                    // image_draw_card_price_money.SetPanelEvent("onmouseout",
                    //     function () {
                    //         $.DispatchEvent("DOTAHideTextTooltip");
                    //     }
                    // );
                }
            }

        }
        else {
            $('#panel_hero_draw_card_' + i).style['opacity'] = '0.0001';
            $('#hero_draw_card_box_' + i).RemoveAndDeleteChildren();
        }
    }

    set_draw_card_status();
    //商城面板开着的时候，自动刷新只更新招募面板的内容，不把它弹到商城（二维码弹窗）上面
    var store_open = $('#store_panel_v5') && $('#store_panel_v5').BHasClass('show');
    if (!store_open) {
        open_panel_draw_card();
    }
}

$.RegisterEventHandler('DragStart', $('#legendary_box'), function (panelId, draggedPanel) {
    if (IsTouchMode()) {
        close_legendary_box();
        return true;
    }
});
$.RegisterEventHandler('DragStart', $('#panel_draw_card'), function (panelId, draggedPanel) {
    if (IsTouchMode()) {
        guanbi_panel_draw_card();
        return true;
    }
});
$.RegisterEventHandler('DragStart', $('#board_right'), function (panelId, draggedPanel) {
    if (IsTouchMode()) {
        toggle_player_details();
        return true;
    }
});
$.RegisterEventHandler('DragStart', $('#board_top'), function (panelId, draggedPanel) {
    if (IsTouchMode()) {
        open_panel_draw_card();
        return true;
    }
});

function ShowChessDetail(chess) {
    unhighlight_chess();
    var is_show = $('#panel_chess_list').BHasClass('show_detail');
    if ($('#panel_chess_list')) {
        // $('#panel_chess_list').ToggleClass('show_detail');
        $('#panel_chess_list').SetHasClass('show_detail', true);
        $('#panel_chess_detail').SetHasClass('show', true);
        // if (!is_show){
        var detail_container = $('#panel_chess_detail_inner');
        if (detail_container) {
            detail_container.RemoveAndDeleteChildren();

            var chess_heroname = CHESS_2_HERO[chess]; // 英雄名字
            var chess_level = CHESS_2_LEVEL[chess]; // 棋子费用
            var chess_level_color = LEVEL_2_COLOR[chess_level];  // 费用颜色
            var chess_spec_class = CHESS_2_SPEC_CLASS[chess];  // 棋子的种族职业

            var chess_kv = CustomNetTables.GetTableValue("chess_kv_table", chess);
            var chess_kv1 = CustomNetTables.GetTableValue("chess_kv_table", chess + '1');
            var chess_kv11 = CustomNetTables.GetTableValue("chess_kv_table", chess + '11');

            var ChessAbility = chess_kv.ChessAbility;
            var ability_kv = CustomNetTables.GetTableValue("ability_kv_table", ChessAbility);

            var detail_top = $.CreatePanel('Panel', detail_container, "", {
                class: 'detail_top',
            });

            var detail_avatar_container = $.CreatePanel('Panel', detail_top, "", {
                class: 'detail_onecard',
            });
            $.CreatePanel('DOTAHeroMovie', detail_avatar_container, "", {
                heroname: chess_heroname,
            });

            var detail_top_right = $.CreatePanel('Panel', detail_top, "", {
                class: 'detail_top_right',
            });
            $.CreatePanel('Label', detail_top_right, "", {
                class: 'detail_top_right_line1',
                style: 'color:' + chess_level_color + ';',
                text: $.Localize('#' + chess),
            });
            $.CreatePanel('Label', detail_top_right, "", {
                class: 'detail_top_right_line2',
                text: $.Localize('#real_name_' + chess) || 'unknown',
            });
            var detail_top_right_line3 = $.CreatePanel('Panel', detail_top_right, "", {
                class: 'detail_top_right_line3',
            });

            // 种族/职业
            var chess_spec_class_arr = chess_spec_class.split(',');
            if (chess_spec_class_arr && chess_spec_class_arr.length > 0) {
                for (var i = 0; i < chess_spec_class_arr.length; i++) {
                    var s = chess_spec_class_arr[i];
                    $.CreatePanel('DOTAAbilityImage', detail_top_right_line3, "", {
                        class: 'detail_top_right_line3_pic',
                        abilityname: s,
                        onmouseover: 'DOTAShowAbilityTooltip(' + s + ')',
                        onmouseout: 'DOTAHideAbilityTooltip()',
                    });
                    $.CreatePanel('Label', detail_top_right_line3, "", {
                        text: $.Localize('#DOTA_Tooltip_ability_' + s),
                        style: 'margin-left: 5px;margin-right:15px;',
                    });

                }
                if (chess == 'chess_rm') {
                    detail_top_right_line3.SetHasClass('invisible', true);
                }
            }

            // 分割线
            $.CreatePanel('Panel', detail_container, "", {
                class: 'panel_splitter bg-cost' + chess_level,
            });

            // 棋子属性

            var detail_prop = $.CreatePanel('Panel', detail_container, "", {
                class: 'detail_prop',
            });

            if (chess_kv.StatusHealth) {
                var detail_prop_one = $.CreatePanel('Panel', detail_prop, "", {
                    class: 'detail_prop_one',
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    text: $.Localize('#StatusHealth'),
                    style: 'color:#3ed038;',
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    class: 'detail_prop_one_main_text',
                    text: chess_kv.StatusHealth || 0,
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    text: '/',
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    class: 'detail_prop_one_main_text',
                    text: chess_kv1.StatusHealth || 0,
                });
                if (chess_kv11) {
                    $.CreatePanel('Label', detail_prop_one, "", {
                        text: '/',
                    });
                    $.CreatePanel('Label', detail_prop_one, "", {
                        class: 'detail_prop_one_main_text',
                        text: chess_kv11.StatusHealth || 0,
                    });
                }
            }
            if (chess_kv.StatusMana || chess_kv.StatusMana == 0) {
                var detail_prop_one = $.CreatePanel('Panel', detail_prop, "", {
                    class: 'detail_prop_one',
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    text: $.Localize('#StatusMana'),
                    style: 'color:#83C2FE;',
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    class: 'detail_prop_one_main_text',
                    text: chess_kv.StatusMana || 0,
                });
            }
            if (chess_kv.AttackDamageMin) {
                var detail_prop_one = $.CreatePanel('Panel', detail_prop, "", {
                    class: 'detail_prop_one',
                });

                $.CreatePanel('Image', detail_prop_one, "", {
                    // src: "s2r://panorama/images/hud/reborn/icon_damage_psd.vtex",
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    text: $.Localize('#AttackDamage'),
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    class: 'detail_prop_one_main_text',
                    text: (chess_kv.AttackDamageMin || 0) + '~' + (chess_kv.AttackDamageMax || 0),
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    text: '/',
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    class: 'detail_prop_one_main_text',
                    text: (chess_kv1.AttackDamageMin || 0) + '~' + (chess_kv1.AttackDamageMax || 0),
                });
                if (chess_kv11) {
                    $.CreatePanel('Label', detail_prop_one, "", {
                        text: '/',
                    });
                    $.CreatePanel('Label', detail_prop_one, "", {
                        class: 'detail_prop_one_main_text',
                        text: (chess_kv11.AttackDamageMin || 0) + '~' + (chess_kv11.AttackDamageMax || 0),
                    });
                }
            }
            if (chess_kv.AttackRate && chess_kv.AttackRange) {
                var detail_prop_one = $.CreatePanel('Panel', detail_prop, "", {
                    class: 'detail_prop_one',
                });
                $.CreatePanel('Image', detail_prop_one, "", {
                    // src: "s2r://panorama/images/hud/reborn/icon_attack_speed2_psd.vtex",
                });

                $.CreatePanel('Label', detail_prop_one, "", {
                    text: $.Localize('#AttackRate'),
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    class: 'detail_prop_one_main_text',
                    text: (chess_kv.AttackRate || 0).toFixed(2) + ' s',
                });

                $.CreatePanel('Image', detail_prop_one, "", {
                    // src: "s2r://panorama/images/hud/reborn/icon_attack_range_psd.vtex",
                    style: 'margin-left: 20px;',
                });

                $.CreatePanel('Label', detail_prop_one, "", {
                    text: $.Localize('#AttackRange'),
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    class: 'detail_prop_one_main_text',
                    text: chess_kv.AttackRange || 0,
                });
            }
            if ((chess_kv.ArmorPhysical || chess_kv.ArmorPhysical == 0) && (chess_kv.MagicalResistance || chess_kv.MagicalResistance == 0)) {
                var detail_prop_one = $.CreatePanel('Panel', detail_prop, "", {
                    class: 'detail_prop_one',
                });
                $.CreatePanel('Image', detail_prop_one, "", {
                    // src: "s2r://panorama/images/hud/reborn/icon_armor_psd.vtex",
                });

                $.CreatePanel('Label', detail_prop_one, "", {
                    text: $.Localize('#ArmorPhysical'),
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    class: 'detail_prop_one_main_text',
                    text: chess_kv.ArmorPhysical || 0,
                });
                $.CreatePanel('Image', detail_prop_one, "", {
                    // src: "s2r://panorama/images/hud/reborn/icon_magic_resist_psd.vtex",
                    style: 'margin-left: 20px;',
                });

                $.CreatePanel('Label', detail_prop_one, "", {
                    text: $.Localize('#MagicalResistance'),
                });
                $.CreatePanel('Label', detail_prop_one, "", {
                    class: 'detail_prop_one_main_text',
                    text: (chess_kv.MagicalResistance || 0) + ' %',
                });
            }

            // 分割线
            $.CreatePanel('Panel', detail_container, "", {
                class: 'panel_splitter bg-cost' + chess_level,
                style: 'margin-top:10px;margin-bottom: 20px;',
            });

            // 技能标题
            var detail_top_right_line4 = $.CreatePanel('Panel', detail_container, "", {
                class: 'detail_top_right_line4',
            });
            if (ChessAbility) {
                $.CreatePanel('DOTAAbilityImage', detail_top_right_line4, "", {
                    abilityname: ChessAbility,
                    onmouseover: 'DOTAShowAbilityTooltip(' + ChessAbility + ')',
                    onmouseout: "DOTAHideAbilityTooltip()",
                    class: 'detail_top_right_line4_pic',
                });
                $.CreatePanel('Label', detail_top_right_line4, "", {
                    text: $.Localize('#DOTA_Tooltip_ability_' + ChessAbility),
                    style: 'margin-left: 10px;margin-right:15px;',
                });
            }

            // 技能描述
            var detail_top_right_line5 = $.CreatePanel('Panel', detail_container, "", {
                class: 'detail_top_right_line5',
            });
            if (ChessAbility) {
                var tt = $.Localize('#DOTA_Tooltip_ability_' + ChessAbility + '_Description');
                tt = tt.replace('<h1>', '<p><font color=\"#83C2FE\">');
                tt = tt.replace('</h1>', '</font></p>');
                $.CreatePanel('Label', detail_top_right_line5, "", {
                    html: 'true',
                    text: tt,
                    style: 'margin-left: 0px;margin-right:15px;color:#ddd;',
                });

                for (var i = 0; i <= 3; i++) {
                    var tt = '#DOTA_Tooltip_ability_' + ChessAbility + '_Note' + i;
                    var ttt = $.Localize(tt);
                    if (ttt != tt && ttt.indexOf('%') < 0) {
                        $.CreatePanel('Label', detail_top_right_line5, "", {
                            html: 'true',
                            text: ttt,
                            style: 'margin-left: 0px;margin-right:15px;color:#999;',
                        });
                    }
                }
                if (ability_kv.IsDOTA2OriginalAbility == 'true') {
                    $.CreatePanel('Label', detail_top_right_line5, "", {
                        html: 'true',
                        text: $.Localize('#is_dota2_original_ability'),
                        style: 'margin-left: 0px;margin-right:15px;color:#999;',
                    });
                }
            }

            // 技能kv
            var ability_kv_prop = $.CreatePanel('Panel', detail_container, "", {
                class: 'detail_prop',
                style: 'margin-bottom: 10px;',
            });
            if (ability_kv && ability_kv.AbilityKV) {
                for (var k in ability_kv.AbilityKV) {
                    var ability_kv_prop_one = $.CreatePanel('Panel', ability_kv_prop, "", {
                        class: 'detail_prop_one',
                    });
                    var kk = '#DOTA_Tooltip_ability_' + ChessAbility + '_' + k;
                    if (k == 'AbilityDamage') {
                        kk = '#text_ability_damage';
                    }

                    if ($.Localize(kk) != kk) {
                        var v = ('' + ability_kv.AbilityKV[k]).split(' ');

                        var all_zero = true;
                        for (var i = 0; i < v.length; i++) {
                            if (parseFloat(v[i]) != 0 && parseFloat(v[i]) < 9000) {
                                all_zero = false;
                            }
                        }
                        if (!all_zero) {
                            var kk_local = $.Localize(kk).replace(':', '').replace('：', '');
                            var suffix = '';
                            if (kk_local.indexOf('%') >= 0) {
                                suffix = '%';
                            }
                            kk_local = kk_local.replace('%', '');
                            $.CreatePanel('Label', ability_kv_prop_one, "", {
                                text: kk_local,
                            });

                            for (var i = 0; i < v.length; i++) {
                                $.CreatePanel('Label', ability_kv_prop_one, "", {
                                    class: 'detail_prop_one_main_text',
                                    text: ((v[i] || 0) + '').replace('-', '') + suffix,
                                });
                                if (i != v.length - 1) {
                                    $.CreatePanel('Label', ability_kv_prop_one, "", {
                                        text: '/',
                                    });
                                }

                            }
                        }

                    }
                }
            }

            var ability_kv_prop_one = $.CreatePanel('Panel', ability_kv_prop, "", {
                class: 'detail_prop_one',
            });
            if (ability_kv.AbilityManaCost || ability_kv.AbilityManaCost == 0) {
                var v = ('' + ability_kv.AbilityManaCost).split(' ');
                var have_manacost = false, is_manacost_all_same = true;
                for (var i = 0; i < v.length; i++) {
                    if (parseFloat(v[i]) > 0) {
                        have_manacost = true;
                    }
                    if (parseFloat(v[i]) != parseFloat(v[0])) {
                        is_manacost_all_same = false;
                    }
                }
                if (is_manacost_all_same) {
                    v = [v[0]];
                }
                if (have_manacost) {
                    $.CreatePanel('Image', ability_kv_prop_one, "", {
                        // src: "s2r://panorama/images/status_icons/ability_manacost_icon_psd.vtex",
                        style: 'margin-right:5px;',
                    });
                    for (var i = 0; i < v.length; i++) {
                        $.CreatePanel('Label', ability_kv_prop_one, "", {
                            class: 'detail_prop_one_main_text',
                            text: v[i] || 0,
                        });
                        if (i != v.length - 1) {
                            $.CreatePanel('Label', ability_kv_prop_one, "", {
                                text: '/',
                            });
                        }
                    }
                    $.CreatePanel('Panel', ability_kv_prop_one, "", {
                        style: 'margin-right:20px;',
                    });
                }
            }
            if (ability_kv.AbilityCooldown) {
                var v = ('' + ability_kv.AbilityCooldown).split(' ');
                var is_cooldown_all_same = true;
                for (var i = 0; i < v.length; i++) {
                    if (parseFloat(v[i]) != parseFloat(v[0])) {
                        is_cooldown_all_same = false;
                    }
                }
                if (is_cooldown_all_same) {
                    v = [v[0]];
                }

                $.CreatePanel('Image', ability_kv_prop_one, "", {
                    // src: "s2r://panorama/images/status_icons/ability_cooldown_icon_psd.vtex",
                    style: 'margin-left:0px;margin-right:5px;',
                });

                for (var i = 0; i < v.length; i++) {
                    $.CreatePanel('Label', ability_kv_prop_one, "", {
                        class: 'detail_prop_one_main_text',
                        text: v[i] || 0,
                    });
                    if (i != v.length - 1) {
                        $.CreatePanel('Label', ability_kv_prop_one, "", {
                            text: '/',
                        });
                    }
                }
            }

            // 技能Lore
            var detail_top_right_line6 = $.CreatePanel('Panel', detail_container, "", {
                class: 'detail_top_right_line6',
            });
            if (ChessAbility) {
                $.CreatePanel('Label', detail_top_right_line6, "", {
                    html: 'true',
                    text: $.Localize('#DOTA_Tooltip_ability_' + ChessAbility + '_Lore'),
                    style: 'margin-left: 0px;margin-right:15px;',
                });
            }

            if (chess_level >= 5) {
                $.Schedule(0.3, function () {
                    $('#panel_chess_list').ScrollToRightEdge();
                });
            }
        }
        // }
    }
}
function HideChessDetail() {
    var is_show = $('#panel_chess_list').BHasClass('show_detail');
    if ($('#panel_chess_list') && is_show) {
        $('#panel_chess_list').SetHasClass('show_detail', false);
        $('#panel_chess_detail').SetHasClass('show', false);
    }
    $.Schedule(0.3, function () {
        if ($('#panel_chess_list') && $('#panel_chess_list').ScrollToRLeftEdge) {
            $('#panel_chess_list').ScrollToRLeftEdge();
        }
    });
}


// 每日任务
var BISCUIT_QUEST_ID = null;
function showQuestDetail() {

}
function ShowQuestInfo(vip_info) {

    $.Schedule(1, function () {
        if (!vip_info) {
            $('#quest_bar').SetHasClass('vip', false);
            return;
        }

        var is_vip = vip_info.is_vip;
        var biscuit_quest_id = vip_info.biscuit_quest;
        var quest_level = vip_info.biscuit_quest_level;
        var biscuit_quest_ttl = vip_info.biscuit_ttl;
        BISCUIT_QUEST_ID = biscuit_quest_id;

        var quest_nettable = CustomNetTables.GetTableValue("game_info", 'quest');
        var quest_in_nettable;
        if (quest_nettable) {
            quest_in_nettable = quest_nettable.biscuit_quest;
        }

        var casino_nettable = CustomNetTables.GetTableValue("casino_table", 'casino_info');

        var quest_list = [];

        if (is_vip && quest_level && biscuit_quest_id) {
            $('#panel_vip_quest_got_1').SetHasClass('unavailable', false);
            $('#text_vip_quest_got_1').text = $.Localize('#' + 'text_vip_got');
            if (quest_level) {
                $('#text_vip_biscuit').text = '× ' + quest_level;
            }
            $('#panel_vip_quest_got_1').SetHasClass('unavailable', true);
            $('#text_vip_quest_got_1').text = $.Localize('#' + 'text_vip_ungot');

            quest_list.push({
                quest_type: 'vip_biscuit',
                quest_award_type: 'award_biscuit',
                quest_award_count: quest_level,
                biscuit_quest_id: biscuit_quest_id,
                biscuit_quest_ttl: biscuit_quest_ttl,
            });

            if (!vip_info.got_top1_today) {
                quest_list.push({
                    quest_type: 'vip_first_top3',
                    quest_award_type: 'candy',
                    quest_award_count: 5,
                });
            }
        }

        if (vip_info.candy_added_limit || vip_info.candy_added_limit == 0) {
            quest_list.push({
                quest_type: 'candy_added_limit',
                quest_award_type: 'candy',
                quest_award_count: 10,
                candy_added_limit: vip_info.candy_added_limit,
                candy_added_limit_total: vip_info.candy_added_limit_total || 10,
            });
        }

        if (Game.GetMapInfo().map_display_name == 'candy_5_1x8' && (vip_info.casino_count || vip_info.casino_count == 0)) {
            quest_list.push({
                quest_type: 'casino_count',
                quest_award_type: 'candy',
                quest_award_count: 5,
                casino_count: vip_info.casino_count,
                casino_count_total: vip_info.casino_count_total || 5,
            });
        }

        if (Game.GetMapInfo().map_display_name == 'candy_5_1x8' && casino_nettable) {
            var top1_award = Math.round((casino_nettable.award_list[1] || 0) * (casino_nettable.casino || 5));
            quest_list.push({
                quest_type: 'casino_pool',
                quest_award_type: 'candy',
                quest_award_count: top1_award,
                casino: casino_nettable.casino,
                award_list: casino_nettable.award_list,
            });
        }

        // 在左上角#quest_bar显示各个任务
        if (quest_list && quest_list.length > 0 && $('#quest_bar')) {
            $('#quest_bar').SetHasClass('invisible', false);
            // vip高亮
            if (is_vip) {
                $('#quest_bar').SetHasClass('vip', true);
            }
            else {
                $('#quest_bar').SetHasClass('vip', false);
            }
            var quest_bar = $('#quest_bar');
            quest_bar.RemoveAndDeleteChildren();
            // 遍历显示每一个任务
            var quest_one = {};
            for (var i = 0; i < quest_list.length; i++) {
                var q = quest_list[i];
                ShowOneQuest(quest_bar, q);
            }
        }
        else {
            $('#quest_bar').SetHasClass('invisible', true);
        }
    });
}

function ShowOneQuest(quest_bar, q) {
    var id = "quest_one_biscuit";
    if (q.quest_award_type == 'candy') {
        id = '';
    }
    var quest_one = $.CreatePanel('Panel', quest_bar, id, {
        class: 'quest_one',
    });
    $.CreatePanel('Image', quest_one, "", {
        src: "file://{images}/custom_game/" + q.quest_award_type + ".png",
    });
    if (q.quest_award_type == 'award_biscuit') {
        $.CreatePanel('Image', quest_one, "quest_one_biscuit_tick", {
            src: "file://{images}/custom_game/tick.png",
            class: 'tick invisible',
        });
    }
    $.CreatePanel('Label', quest_one, "", {
        text: '× ' + q.quest_award_count,
    });


    var title = '', text = '';
    if (q.quest_type == 'vip_biscuit') {
        title += $.Localize('#text_vip_quest_title') + ': ';
        title += ($.Localize('#' + q.biscuit_quest_id + '_title')).toUpperCase();

        text += $.Localize('#' + q.biscuit_quest_id);
        text += '<br><br>' + $.Localize('#quest_award') + ': ' + $.Localize('#courier_type_biscuit') + ' × ' + q.quest_award_count;
    }
    if (q.quest_type == 'vip_first_top3') {
        title += $.Localize('#text_vip_firstwin_title');
        text += $.Localize('#vip_firstwin');
        text += '<br><br>' + $.Localize('#quest_award') + ': ' + $.Localize('#courier_type_season') + ' × ' + q.quest_award_count;
    }

    if (q.quest_type == 'candy_added_limit') {
        title += $.Localize('#text_candy_added_limit_title');
        text += $.Localize('#candy_added_limit_desc');
        text += '<br><br>' + $.Localize('#quest_award') + ': ' + $.Localize('#courier_type_season') + ' × ' + q.quest_award_count;
        text += '<br>' + $.Localize('#text_vip_got') + ': ' + q.candy_added_limit + ' / ' + q.candy_added_limit_total;
    }

    if (q.quest_type == 'casino_count') {
        title += $.Localize('#text_casino_count_title');
        text += $.Localize('#text_casino_count_desc');
        text += '<br><br>' + $.Localize('#quest_award') + ': ' + $.Localize('#courier_type_season') + ' × ' + q.casino_count_total;
        text += '<br>' + $.Localize('#text_casino_count') + ': ' + q.casino_count + ' / ' + q.casino_count_total;
    }

    if (q.quest_type == 'casino_pool') {
        title += $.Localize('#text_casino_pool_title');
        text += $.Localize('#text_casino_pool_desc');
        var casino = q.casino || 5;
        text += '<br><br>' + $.Localize('#text_casino_candy_in') + ': ' + $.Localize('#courier_type_season') + ' × ' + casino;
        text += '<br><br>' + $.Localize('#text_casino_candy_award');
        for (var i in q.award_list) {
            var topn_award = Math.round(q.award_list[i] * casino);
            var topn_award2 = Math.round(topn_award - casino);
            text += '<br>' + $.Localize('#text_casino_rank').replace('<rank>', i) + ': ' + $.Localize('#courier_type_season') + ' × ' + topn_award + '  (' + (topn_award2 > 0 ? ('+' + topn_award2) : topn_award2) + ')';
        }
    }

    quest_one.SetPanelEvent("onmouseover", function () {
        $.DispatchEvent("DOTAShowTitleTextTooltip", quest_one, title, text);
    });
    quest_one.SetPanelEvent("onmouseout", function () {
        $.DispatchEvent("DOTAHideTitleTextTooltip", quest_one);
    });

}

function ShowGameMode() {
    $('#panel_game_mode').SetHasClass('invisible', false);
    $('#txt_game_mode').text = Game.GetMapInfo().map_display_name;
}

function select_panel_list_top_tags(tag) {
    $('#panel_list_top_tags_chess').SetHasClass('unactive', true);
    $('#panel_list_top_tags_item').SetHasClass('unactive', true);
    // $('#panel_list_top_tags_relic').SetHasClass('unactive',true);

    HideChessDetail();

    $('#' + tag).SetHasClass('unactive', false);
    if (tag == 'panel_list_top_tags_chess') {
        show_chess_list();
        unhighlight_chess();
    }
    if (tag == 'panel_list_top_tags_item') {
        show_item_list();
        unhighlight_chess();
    }
    // if (tag == 'panel_list_top_tags_relic'){
    //     show_relic_list();
    //     unhighlight_chess();
    // }
}
function ShowWinLoseStreak(wl) {
    var ws_color = '#bbb';
    if (wl >= 5) {
        ws_color = '#ffff88';
    }
    if (wl >= 8) {
        ws_color = '#ff8844';
    }
    if (wl >= 10) {
        ws_color = '#ff2222';
    }
    $('#lixi_count').style['color'] = ws_color;
    if (wl >= 1) {
        $('#lixi_count').text = ' ' + wl + ($.Localize('#winstreak_w') || 'W');
    }
    else if (wl <= -1) {
        $('#lixi_count').text = ' ' + (-wl) + ($.Localize('#winstreak_l') || 'L');
    }
    else {
        $('#lixi_count').text = '';
    }
}
function ShowLixi() {
    var curr_gold = Entities.GetMana(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
    var shouru = Math.floor((ROUND + 1) / 2 + 0.5);
    if (shouru > 4) {
        shouru = 4;
    }
    var lixi = Math.floor(curr_gold / 10);
    if (lixi > 4) {
        if (HasModifier('modifier_item_more_interest')) {
            lixi = 4 + 1 * Math.floor((curr_gold - 40) / 10)
        }
        else {
            lixi = 4;
        }
    }
    // if (lixi>0){
    //     $('#lixi_count').text = '+'+lixi;
    // }
    // else{
    //     $('#lixi_count').text = '';
    // }

}

var IS_PETGPT_ON = false;
function ShowPetGPT(keys) {
    if (!CheckClientKey(keys.key)) return;
    if (FindDotaHudElement('petgpt_button')) {
        FindDotaHudElement('petgpt_button').style['opacity'] = '1';
    }
}
function HidePetGPT(keys) {
    if (!CheckClientKey(keys.key)) return;
    if (FindDotaHudElement('petgpt_button')) {
        FindDotaHudElement('petgpt_button').style['opacity'] = '0';
    }
}
function RequestPetGPT(on_off) {
    GameEvents.SendCustomGameEventToServer("request_petgpt", { on_off: on_off });
}

function TogglePetGPTStatus() {
    if (IS_PETGPT_ON) {
        SetPetGPTStatus({
            key: CLIENT_KEY,
            on_off: "0",
        });
        RequestPetGPT(false);
    }
    else {
        SetPetGPTStatus({
            key: CLIENT_KEY,
            on_off: "1",
        });
        RequestPetGPT(true);
    }
}

function SetPetGPTStatus(keys, retry_count) {
    if (!CheckClientKey(keys.key)) return;

    //重连/切图时 petgpt_button 可能还没被创建出来（这个按钮是动态生成的），
    //直接 FindDotaHudElement(...).style 会抛 TypeError 并让整段脚本被跳过，这里先判空
    var btn = FindDotaHudElement('petgpt_button');
    if (!btn) {
        //面板还没建好：1 秒后重试，最多 5 次（重连后 HUD 重建有时序差）
        var tries = retry_count || 0;
        if (tries < 5) {
            $.Schedule(1.0, function () {
                SetPetGPTStatus(keys, tries + 1);
            });
        }
        else {
            $.Msg('[PETGPT] petgpt_button not found, skip status sync');
        }
        return;
    }

    if (keys.on_off == "1") {
        // 开
        IS_PETGPT_ON = true;
        btn.style['position'] = '0px 0px 0px';
        btn.style['box-shadow'] = 'fill #ffffff66 0px 0px 8px 0px';

        btn.SetImage("file://{images}/custom_game/button1.png");

        btn.SetPanelEvent("onmouseover",
            function () {
                $.DispatchEvent("DOTAShowTitleTextTooltip", btn, $.Localize('#' + 'text_icon_petgpt_button'), $.Localize('#' + 'text_icon_petgpt_button_desc'));
            }
        );
        btn.SetPanelEvent("onmouseout",
            function () {
                $.DispatchEvent("DOTAHideTitleTextTooltip");
            }
        );
        btn.SetPanelEvent("onactivate",
            function () {
                RequestPetGPT(false);
            }
        );
    }
    else {
        // 关
        IS_PETGPT_ON = false;
        btn.style['position'] = '0px 10px 0px';
        btn.SetImage("file://{images}/custom_game/button1.png");
        btn.style['box-shadow'] = 'fill #ffffff66 0px 0px 0px 0px';

        btn.SetPanelEvent("onmouseover",
            function () {
                $.DispatchEvent("DOTAShowTitleTextTooltip", btn, $.Localize('#' + 'text_icon_petgpt_button'), $.Localize('#' + 'text_icon_petgpt_button_desc'));
                btn.style['position'] = '0px 0px 0px';
                btn.SetImage("file://{images}/custom_game/button1.png");
            }
        );
        btn.SetPanelEvent("onmouseout",
            function () {
                $.DispatchEvent("DOTAHideTitleTextTooltip");
                btn.style['position'] = '0px 10px 0px';
                btn.SetImage("file://{images}/custom_game/button1.png");
            }
        );
        btn.SetPanelEvent("onactivate",
            function () {
                RequestPetGPT(true);
            }
        );
    }
}


// 自动生成棋子图鉴面板
function FillChessListPanel() {
    var chess_list = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
    }
    //重连/刚进图时这几张表可能还没下发，兜底成空表，避免 chess_list_by_mana[cost] 抛异常
    var chess_list_by_mana = CustomNetTables.GetTableValue("chess_pool_table", 'chess_list_by_mana') || {};
    var chess_list_by_mana_black = CustomNetTables.GetTableValue("chess_pool_table", 'chess_list_by_mana_black') || {};
    var chess_list_by_mana_special = CustomNetTables.GetTableValue("chess_pool_table", 'chess_list_by_mana_special') || {};
    var chess_discount_list = CustomNetTables.GetTableValue("chess_pool_table", 'chess_discount_list') || {};
    var discount_chess_dic = {};
    for (var i in chess_discount_list){
        discount_chess_dic[chess_discount_list[i]] = 1;
    }
    
    for (var cost = 1; cost <= 5; cost++) {
        var chess_list_cost = chess_list_by_mana[cost] || [];
        for (var i in chess_list_cost) {
            var chess = chess_list_cost[i];
            var spec_class = CHESS_2_SPEC_CLASS[chess];
            //百戏大王
            var rm_spec_class = GetTableSafe("chess_pool_table", 'chess_rm_class');
            if (rm_spec_class && chess == 'chess_rm') {
                spec_class = '';
                for (var i in rm_spec_class) {
                    spec_class += rm_spec_class[i] + ',';
                }
                spec_class = spec_class.slice(0, spec_class.length - 1);
                CHESS_2_SPEC_CLASS['chess_rm'] = spec_class;
            }
            var prioroty = (BUFF_PRIORITY[spec_class.split(',')[0]] || 999) * 1000;
            prioroty += (BUFF_PRIORITY[spec_class.split(',')[1]] || 999);
            chess_list[cost].push({
                chess: chess,
                spec_class: spec_class,
                prioroty: prioroty,
                hero_name: CHESS_2_HERO[chess],
            });
        }
    }
    for (var cost = 1; cost <= 5; cost++) {
        var chess_list_cost = chess_list_by_mana_black[cost] || [];
        for (var i in chess_list_cost) {
            var chess = chess_list_cost[i];
            var spec_class = CHESS_2_SPEC_CLASS[chess];
            var prioroty = (BUFF_PRIORITY[spec_class.split(',')[0]] || 999) * 1000;
            prioroty += (BUFF_PRIORITY[spec_class.split(',')[1]] || 999);
            prioroty += 1000000;
            chess_list[cost].push({
                chess: chess,
                spec_class: spec_class,
                prioroty: prioroty,
                is_black: true,
                hero_name: CHESS_2_HERO[chess],
            });
        }
    }
    for (var cost = 1; cost <= 5; cost++) {
        var chess_list_cost = chess_list_by_mana_special[cost] || [];
        for (var i in chess_list_cost) {
            var chess = chess_list_cost[i];
            var spec_class = CHESS_2_SPEC_CLASS[chess];
            var prioroty = (BUFF_PRIORITY[spec_class.split(',')[0]] || 999) * 1000;
            prioroty += (BUFF_PRIORITY[spec_class.split(',')[1]] || 999);
            prioroty += 2000000;
            chess_list[cost].push({
                chess: chess,
                spec_class: spec_class,
                prioroty: prioroty,
                is_special: true,
                hero_name: CHESS_2_HERO[chess],
            });
        }
    }

    for (var cost = 1; cost <= 5; cost++) {
        var chess_list_cost = chess_list[cost];
        chess_list_cost.sort(function (a, b) {
            return a.prioroty - b.prioroty;
        })
    }

    for (var cost = 1; cost <= 5; cost++) {
        var chess_list_cost_one = chess_list[cost];
        var panel_cost = $('#chess_list_' + cost);
        if (panel_cost) {
            panel_cost.RemoveAndDeleteChildren();

            var panel_cost_title = $.CreatePanel('Panel', panel_cost, "", {
                class: 'no_bg',
            });
            $.CreatePanel('Label', panel_cost_title, "", {
                class: 'super_long_label grey_title',
                text: '#text_chess_cost_' + cost,
                style: 'width:200px;',
            });
            var panel_cost_title = $.CreatePanel('Panel', panel_cost, "", {
                class: "panel_splitter bg-cost" + cost,
            });

            for (var i = 0; i < chess_list_cost_one.length; i++) {
                var chess_info = chess_list_cost_one[i];
                var chess_name = chess_info.chess;
                var spec_class = chess_info.spec_class;
                var is_black = chess_info.is_black;
                var spec_class_arr = spec_class.split(',');
                var hero_name = chess_info.hero_name;
                var black_class = (chess_info.is_black || chess_info.is_special || cost == 5) ? ' unavailable' : '';

                var panel_chess_one = $.CreatePanel('Panel', panel_cost, chess_name, {
                    class: "list_line chess opacity_100 " + spec_class_arr.join(' ') + black_class,
                });
                $.CreatePanel('DOTAHeroImage', panel_chess_one, '', {
                    class: 'hero_grid',
                    heroname: hero_name,
                    heroimagestyle: 'icon',
                    onactivate: "ShowChessDetail('" + chess_name + "')",
                });
                $.CreatePanel('Label', panel_chess_one, "", {
                    class: "color-cost" + cost,
                    text: '#' + chess_name,
                    style: 'width:150px;vertical-align:center;',
                    onactivate: "ShowChessDetail('" + chess_name + "')",
                });
                var abilitybar_class = 'long_label_4_icons';
                if (chess_name == 'chess_rm') {
                    abilitybar_class = 'long_label_4_icons invisible';
                }
                var panel_chess_one_plus = $.CreatePanel('Panel', panel_chess_one, chess_name + '_abilities', {
                    class: abilitybar_class,
                    style: 'padding-right:10px;',
                });
                for (var j = 0; j < spec_class_arr.length; j++) {
                    var spec_class_one = spec_class_arr[j];
                    $.CreatePanel('DOTAAbilityImage', panel_chess_one_plus, '', {
                        class: 'ability_grid',
                        abilityname: spec_class_one,
                        onmouseover: "DOTAShowAbilityTooltip('" + spec_class_one + "')",
                        onmouseout: "DOTAHideAbilityTooltip()",
                        onactivate: "highlight_chess('" + spec_class_one + "')",
                    });
                }

                // 低价收购
                if (discount_chess_dic[chess_name]){
                    $.CreatePanel('Image', panel_chess_one_plus, '', {
                        class: 'chess_grid',
                        style: 'opacity:0.9;',
                        src: 'file://{images}/custom_game/discount.png',
                        onmouseover: "DOTAShowTitleTextTooltip('#discount_chess','#discount_chess_desc')",
                        onmouseout: "DOTAHideTitleTextTooltip()",
                    });
                }
                
            }
        }
    }

    FillItemListPanel();

    var data = GetTableSafe("chess_pool_table", 'legendary_info');
    SetLegendaryChessAndRelicInfo(data);

    HideChessDetail();
}
// 自动生成装备图鉴面板
function FillItemListPanel() {
    var item_list_by_mana = CustomNetTables.GetTableValue("chess_pool_table", 'item_list_by_mana');
    var drop_item_list_by_mana = CustomNetTables.GetTableValue("chess_pool_table", 'drop_item_list_by_mana');
    var relic_list = CustomNetTables.GetTableValue("chess_pool_table", 'relic_list');

    var drop_list = [];
    for (var c in drop_item_list_by_mana) {
        for (var cc in drop_item_list_by_mana[c]) {
            drop_list.push(drop_item_list_by_mana[c][cc]);
        }
    }
    var count = 0;
    var reliccount = 0;

    for (var cost in item_list_by_mana) {
        var panel = $('#item_list_' + cost);
        if (panel) {
            panel.RemoveAndDeleteChildren();
            var panel_cost_title = $.CreatePanel('Panel', panel, "", {
                class: 'no_bg',
            });
            $.CreatePanel('Label', panel_cost_title, "", {
                class: 'super_long_label grey_title',
                text: '#text_item_tier_' + cost,
                style: '',
            });
            var panel_cost_title = $.CreatePanel('Panel', panel, "", {
                class: "panel_splitter bg-cost" + cost,
                style: 'margin-bottom:10px;',
            });
            var panel_item_container = $.CreatePanel('Panel', panel, "", {
                style: 'flow-children:down-wrap;height:800px;',
            });

            var item_list = item_list_by_mana[cost];
            for (var i in item_list) {
                var item = item_list[i];
                var c = 'list_line item opacity_100';
                if (drop_list.indexOf(item) >= 0) {
                    c += ' gray';
                }
                var panel_item_one = $.CreatePanel('Panel', panel_item_container, item, {
                    class: c,
                    style: 'padding-right:0px;',
                });
                $.CreatePanel('DOTAItemImage', panel_item_one, "", {
                    itemname: item,
                });
                $.CreatePanel('Label', panel_item_one, "", {
                    class: 'color-cost' + cost,
                    text: $.Localize('#' + item),
                    style: 'vertical-align: center;width:200px;',
                });
                count++;
            }
        }
    }

    var panel = $('#item_list_relic');
    if (panel) {
        panel.RemoveAndDeleteChildren();
        var panel_cost_title = $.CreatePanel('Panel', panel, "", {
            class: 'no_bg',
        });
        $.CreatePanel('Label', panel_cost_title, "", {
            class: 'super_long_label grey_title',
            text: '#text_item_relic',
            style: '',
        });
        var panel_cost_title = $.CreatePanel('Panel', panel, "", {
            class: "panel_splitter bg-cost6",
            style: 'margin-bottom:10px;',
        });
        var panel_item_container = $.CreatePanel('Panel', panel, "", {
            style: 'flow-children:down-wrap;height:800px;',
        });

        var item_list = relic_list;
        for (var i in item_list) {
            var item = item_list[i];
            var c = 'list_line item opacity_100';

            var panel_item_one = $.CreatePanel('Panel', panel_item_container, item, {
                class: c,
                style: 'padding-right:0px;',
            });
            $.CreatePanel('DOTAItemImage', panel_item_one, "", {
                itemname: item,
            });
            $.CreatePanel('Label', panel_item_one, "", {
                class: 'color-cost' + cost,
                text: $.Localize('#' + item),
                style: 'vertical-align: center;width:200px;',
            });
            reliccount++;
        }
    }

    ITEM_COUNT = count;
    RELIC_COUNT = reliccount;
}


// 重铸装备
FindDotaHudElement('inventory_tpscroll_container').SetPanelEvent("onactivate",
    function () {
        if (Entities.GetTeamNumber(Players.GetLocalPlayerPortraitUnit()) == Players.GetTeam(Players.GetLocalPlayer())) {
            if (FindDotaHudElement('inventory_tpscroll_container').style['background-img-opacity'] == 1) {
                GameEvents.SendCustomGameEventToServer("request_show_recycle_item_result", {
                    show_confirm: 1,
                });
            }
        }
    }
);
FindDotaHudElement('inventory_tpscroll_container').SetPanelEvent("onmouseover",
    function () {
        if (Entities.GetTeamNumber(Players.GetLocalPlayerPortraitUnit()) == Players.GetTeam(Players.GetLocalPlayer())) {
            if (FindDotaHudElement('inventory_tpscroll_container').style['background-img-opacity'] == 1) {
                FindDotaHudElement('inventory_tpscroll_container').style['opacity'] = '1';
            }
            var text = $.Localize('#text_item_recycle_desc');
            var text2 = "";
            if (ITEM_RECYCLE_RESULT && ITEM_RECYCLE_RESULT.lootbox) {
                text2 = $.Localize('#DOTA_Tooltip_ability_' + ITEM_RECYCLE_RESULT.lootbox);

                if (text2) {
                    var sum = ITEM_RECYCLE_RESULT.item_level_sum || 0;
                    text += ($.Localize('#text_item_recycle_desc2') + '<font color=\"#ffffff\">' + (ITEM_RECYCLE_RESULT.item_level_sum || 0) + '</font>');
                    text += ($.Localize('#text_item_recycle_desc2_2') + text2);
                    text += ($.Localize('#text_item_recycle_desc4') + '<font color=\"#ffffff\">' + (ITEM_RECYCLE_RESULT.item_level_extra || 0) + '</font>');
                }
            }
            if (FindDotaHudElement('inventory_tpscroll_container').style['background-img-opacity'] != 1) {
                text += $.Localize('#text_item_recycle_desc3');
            }

            $.DispatchEvent("DOTAShowTitleTextTooltip", FindDotaHudElement('inventory_tpscroll_container'), $.Localize('#' + 'text_item_recycle'), text);
        }
    }
);
FindDotaHudElement('inventory_tpscroll_container').SetPanelEvent("onmouseout",
    function () {
        FindDotaHudElement('inventory_tpscroll_container').style['opacity'] = '0.75';
        $.DispatchEvent("DOTAHideTitleTextTooltip");
    }
);

var ITEM_RECYCLE_RESULT;
function ShowItemRecycleResult(keys) {
    if (!CheckClientKey(keys.key)) return;
    ITEM_RECYCLE_RESULT = keys.result;

    if (ITEM_RECYCLE_RESULT.item_level_sum) {
        FindDotaHudElement('tpCharges').text = ITEM_RECYCLE_RESULT.item_level_sum;
    }
    else {
        FindDotaHudElement('tpCharges').text = '';
    }

    if (FindDotaHudElement('inventory_tpscroll_container').style['background-img-opacity'] == 1) {
        if (ITEM_RECYCLE_RESULT.lootbox) {
            FindDotaHudElement('inventory_tpscroll_container').style['background-image'] = 'url("file://{images}/custom_game/lootbox/' + ITEM_RECYCLE_RESULT.lootbox + '.png")';
            // FindDotaHudElement('inventory_tpscroll_container').style['background-size'] = '100% 70%';
        }
        else {
            FindDotaHudElement('inventory_tpscroll_container').style['background-image'] = 'url("file://{images}/custom_game/recycle_item.png")';
        }
    }

    if (keys.show_confirm) {
        var text = $.Localize('#text_confirm_recycle_item');

        if (!ITEM_RECYCLE_RESULT.lootbox) {
            OnMima({ text: "text_mima_no_recycle_item", key: CLIENT_KEY });
            return;
        }
        text += ('<br>' + $.Localize('#DOTA_Tooltip_ability_' + ITEM_RECYCLE_RESULT.lootbox));
        show_confirm(text, function () {
            close_confirm();
            GameEvents.SendCustomGameEventToServer("request_recycle_item", {});
        });
    }
}
function ToggleRequestRecycleItem(keys) {
    if (keys.available == 1) {
        FindDotaHudElement('inventory_tpscroll_container').style['background-img-opacity'] = '1';
        if (ITEM_RECYCLE_RESULT && ITEM_RECYCLE_RESULT.lootbox) {
            FindDotaHudElement('inventory_tpscroll_container').style['background-image'] = 'url("file://{images}/custom_game/lootbox/' + ITEM_RECYCLE_RESULT.lootbox + '.png")';
        }
    }
    else {
        FindDotaHudElement('inventory_tpscroll_container').style['background-img-opacity'] = '0.1';
        FindDotaHudElement('inventory_tpscroll_container').style['background-image'] = 'url("file://{images}/custom_game/recycle_item.png")';
    }
}


function SetBannedItem(keys) {
    var banned_items = keys.banned_items;
    if (!banned_items) {
        return;
    }
    if (keys.type == 'relic') {
        // var panelr = $('#item_list_relic');
        // if (panelr){
        for (var i in banned_items) {
            var item = banned_items[i];
            if (item && FindDotaHudElement(item)) {
                FindDotaHudElement(item).SetHasClass('banned', true);
                //在本局橙卡面板也灰掉
                // var fff = FindDotaHudElement('panel_relic_box_inner');
                // if (fff) {
                //     var xxx = fff.FindChildrenWithClassTraverse('legendary_box_' + item);
                //     for (var ii in xxx) {
                //         if (xxx[ii]) {
                //             xxx[ii].SetHasClass('banned', true);
                //         }
                //     }
                // }

            }
        }
        // }
    }
    for (var cost = 1; cost <= 5; cost++) {
        var panel = $('#item_list_' + cost);
        if (panel) {
            var xxx = panel.FindChildrenWithClassTraverse('item');
            for (var i in xxx) {
                if (xxx[i]) {
                    xxx[i].SetHasClass('banned', false);
                }
            }
        }
    }

    for (var i in banned_items) {
        var item = banned_items[i];
        if (item && FindDotaHudElement(item)) {
            FindDotaHudElement(item).SetHasClass('banned', true);
        }
    }
}

function lineup(t) {
    if ($('#panel_lineup_box_inner').BHasClass('unavailable')) {
        return;
    }
    $('#panel_lineup_box_inner').SetHasClass('unavailable', true);
    GameEvents.SendCustomGameEventToServer("lineup", {
        "type": t,
    });
    $.Schedule(1, function () {
        $('#panel_lineup_box_inner').SetHasClass('unavailable', false);
    })
    HideLineupShortCuts();
    Game.EmitSound("hud.equip.agh_shard");
}

function ShowRelicAndRelicHistory(panel, relic, history) {
    panel.RemoveAndDeleteChildren();
    var container = $.CreatePanel('Panel', panel, '', {
        style: 'width:130px;flow-children:right;horizontal-align:center;vertical-align:center;',
    });

    var container_inner = $.CreatePanel('Panel', container, '', {
        style: 'flow-children:right;horizontal-align:center;vertical-align:center;',
    });
    var first = $.CreatePanel('Panel', container_inner, '', {
        style: 'vertical-align:center;max-height:60px;',
    });
    var first1 = $.CreatePanel('Panel', first, '', {
        style: 'flow-children:down-wrap;horizontal-align:center;vertical-align:center;max-height:60px;',
    });
    if (history) {
        var history_arr = [];
        for (var i in history) {
            var r = history[i].relic;
            history_arr.push(r);
        }
        var relic_his_count = history_arr.length;
        if (relic){
            relic_his_count --;
        }
        for (var i = 0; i < relic_his_count; i++) {
            var rr = $.CreatePanel('Panel', first1, '', {
                style: 'width:20px;height:20px;margin-right:3px;margin-top:1px;margin-bottom:1px;overflow:clip clip;',
            });
            $.CreatePanel('DOTAItemImage', rr, '', {
                style: 'width:40px;height:25px;horizontal-align:center;vertical-align:center;',
                itemname: history_arr[i],
            });
        }
    }

    var last = $.CreatePanel('Panel', container_inner, '', {
        style: 'width:55px;height:45px;margin-left:5px;flow-children:right;vertical-align:center;overflow:clip clip;',
    });
    $.CreatePanel('DOTAItemImage', last, '', {
        style: 'width:61px;height:45px;horizontal-align:center;vertical-align:center;',
        itemname: relic || 'item_null',
    });
}

function Try2Reroll() {
    if ($('#image_reroll_draw') && $('#image_reroll_draw').BHasClass('invisible') == false) {
        reroll_panel_draw_card();
    }
}

function UpdateRelicRemainingRounds(round) {
    if (round > 0) {
        // FindDotaHudElement('neutralCharges').text = round;
        UpdateRelicTTL(round);
    }
    else {
        ClearRelicTTL();
    }
}

var RELIC_TTL = 0;
function PlayerIDTableChanged(table, key, data) {
    var local_player_id = Players.GetLocalPlayer();
    if (key == 'relic_ttl_' + local_player_id) {
        RELIC_TTL = data['ttl'];
        UpdateRelicRemainingRounds(RELIC_TTL);
        UpdateMyRelicShow(data['relic_name']);
    }
}

function ShowRevealedLegendaryChessList() {
    var data = GetTableSafe("chess_pool_table", 'revealed_legendary_chess_list');
    for (var j in data) {
        var chess = data[j];
        if ($('#movie_legendary_box_' + (j - 1))) {
            $('#movie_legendary_box_' + (j - 1)).heroname = CHESS_2_HERO[chess];
        }
        legendary_list[j] = chess;

        var spec_class = CHESS_2_SPEC_CLASS[chess];
        if (spec_class && $('#bottom_bar_legendary_box_' + (j - 1))) {
            var bottom_bar = $('#bottom_bar_legendary_box_' + (j - 1));
            bottom_bar.RemoveAndDeleteChildren();
            var spec_class_arr = spec_class.split(',');
            for (var k = 0; k < spec_class_arr.length; k++) {
                var spec_class_one = spec_class_arr[k];
                $.CreatePanel('DOTAAbilityImage', bottom_bar, '', {
                    class: 'ability_grid',
                    abilityname: spec_class_one,
                    onmouseover: "DOTAShowAbilityTooltip('" + spec_class_one + "')",
                    onmouseout: "DOTAHideAbilityTooltip()",
                });
            }
        }

        if ($('#flip_' + (j - 1)) && $('#flip_' + (j - 1)).BHasClass('unturn') == true) {
            flip_a_panel((j - 1), data[j]);
        }

        $('#panel_legendary_box_' + (j - 1)).AddClass('legendary_box_' + chess);
    }

    var data2 = GetTableSafe("chess_pool_table", 'unrevealed_legendary_chess_list');

    for (var i in data2) {
        if (data2[i] && $("#" + data2[i])) {
            // if (is_relic){
            $("#" + data2[i]).SetHasClass('unavailable', true);
            GrayALegendaryChess(data2[i], true);
        }
    }
    for (var i in data) {
        if (data[i] && $("#" + data[i])) {
            $("#" + data[i]).SetHasClass('unavailable', false);
            if (data[i] == 'chess_rm') {
                $("#chess_rm_abilities").SetHasClass('invisible', false);
            }
            GrayALegendaryChess(data[i], false);
        }
    }
    SetBannedChessStatus(BANNED_TABLE)
}

function show_legendary_box_tips(pos) {
    var title = $.Localize('#dac_' + Game.GetMapInfo().map_display_name).toUpperCase();
    var text = $.Localize('#dac_' + Game.GetMapInfo().map_display_name + '_desc');
    text += '<br>';
    text += $.Localize('#text_legendary_box_tips_desc');
    text += $.Localize('#text_relic_box_tips_desc');
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize(title), $.Localize(text));
}

function HasModifier(modifier_name) {
    var hero_index = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
    var buff_count = Entities.GetNumBuffs(hero_index);
    for (var i = 0; i < buff_count; i++) {
        var buff = Entities.GetBuff(hero_index, i);
        var buff_name = Buffs.GetName(hero_index, buff);
        if (buff_name == modifier_name) {
            return true;
        }
    }
    return false;
}

function refresh_shop_v5_manual() {
    if (!$('#refresh_empty_shop_v5').BHasClass('unavailable')) {
        refresh_shop_v5();
        $('#refresh_empty_shop_v5').SetHasClass('unavailable', true);
        $.Schedule(10, function () {
            $('#refresh_empty_shop_v5').SetHasClass('unavailable', false);
        });
    }
}
function OnStoreV5ChooseCate(cate) {
    if ($('#button_show_my_warehouse').BHasClass('invisible') == true) {
        return;
    }
    $('#store_panel_v5_cate_recomment').SetHasClass('active', false);
    $('#store_panel_v5_cate_chessboard').SetHasClass('active', false);
    $('#store_panel_v5_cate_courier').SetHasClass('active', false);
    $('#store_panel_v5_cate_season').SetHasClass('active', false);
    $('#store_panel_v5_cate_collect').SetHasClass('active', false);
    $('#store_panel_v5_cate_effect').SetHasClass('active', false);
    $('#store_panel_v5_cate_projectile').SetHasClass('active', false);
    $('#store_panel_v5_cate_animation').SetHasClass('active', false);
    $('#store_panel_v5_cate_pet').SetHasClass('active', false);
    $('#store_panel_v5_cate_emotion').SetHasClass('active', false);

    $('#my_courier_effect_bg').SetHasClass('active', false);
    $('#my_courier_projectile_bg').SetHasClass('active', false);
    $('#my_courier_animation_bg').SetHasClass('active', false);
    $('#my_courier_pet_bg').SetHasClass('active', false);

    $('#store_panel_v5_cate_' + cate).SetHasClass('active', true);
    if ($('#my_courier_' + cate + '_bg')) {
        $('#my_courier_' + cate + '_bg').SetHasClass('active', true);
    }

    $('#store_panel_v5_goods_list_recomment').SetHasClass('invisible', true);
    $('#store_panel_v5_goods_list_chessboard').SetHasClass('invisible', true);
    $('#store_panel_v5_goods_list_courier').SetHasClass('invisible', true);
    $('#store_panel_v5_goods_list_collect').SetHasClass('invisible', true);
    $('#store_panel_v5_goods_list_effect').SetHasClass('invisible', true);
    $('#store_panel_v5_goods_list_projectile').SetHasClass('invisible', true);
    $('#store_panel_v5_goods_list_animation').SetHasClass('invisible', true);
    $('#store_panel_v5_goods_list_pet').SetHasClass('invisible', true);
    $('#store_panel_v5_goods_list_emotion').SetHasClass('invisible', true);

    $('#store_panel_v5_goods_list_' + cate).SetHasClass('invisible', false);

    FillStoreV5ByTab(cate);
}
var SHOP_INFO_V5;
var SHOP_V5_CURR_TAB;
// 渲染新版商店V5
function FillStoreV5(data) {
    if (!data || !data.shop_info) {
        return;
    }
    SHOP_INFO_V5 = data.shop_info;
    ShowMyMoney(data.user_info.candy, data.user_info.biscuit);

    if (data.is_shop_available === false) {
        // 只有后端明确返回不可用才隐藏商店按钮；字段缺失时保持显示（激活后刷新可能不返回该字段）
        $('#icon-my').SetHasClass('invisible', true);
    }
    else {
        $('#icon-my').SetHasClass('invisible', false);

        OnStoreV5ChooseCate(SHOP_V5_CURR_TAB || 'recomment');
        // 全局折扣
        if (SHOP_INFO_V5.price_off && $('#store_panel_v5_title_plus')) {
            $('#store_panel_v5_title_plus').RemoveAndDeleteChildren();
            var tt = $.CreatePanel('Panel', $('#store_panel_v5_title_plus'), '', {
                class: 'tags_one',
                style: 'background-color:#ff4444;padding:5px 5px 5px 5px;height:35px;',
            });
            $.CreatePanel('Label', tt, '', {
                text: SHOP_INFO_V5.price_off,
                style: 'font-size:24px;',
            });
        }
        if (SHOP_INFO_V5.spring_festival) {
            $('#store_panel_v5').SetHasClass('spring_festival', true);
            $('#store_panel_v5_title').SetHasClass('spring_festival', true);
            $('#text_panel_shop_title').text = $.Localize('#text_panel_shop_title_spring_festival');
        }
        if (SHOP_INFO_V5.debug_link && ($.Language() == 'schinese' || $.Language() == 'tchinese')) {
            DEBUG_LINK = SHOP_INFO_V5.debug_link;
            $('#store_link').SetHasClass('invisible', false);
        }
    }

    if (data && data.user_info && data.user_info.onduty_hero) {
        // 更新 MY_ONDUTY_HERO
        MY_ONDUTY_HERO = data.user_info.onduty_hero;
        GameEvents.SendCustomGameEventToServer("choose_courier",
            {
                courier: MY_ONDUTY_HERO.split('_')[0],
                courier_id: MY_ONDUTY_HERO,
            });
    }
    FillOtherStoreInfo(data);
    choose_hero(MY_ONDUTY_HERO, MY_ONDUTY_HERO_INDEX);
}
// ===== 商城顶栏的通行证图标 ===== 
var STORE_IS_VIP = false;
var STORE_VIP_INFO = null;
// 本次会话内刚激活成功过：服务端 net table 可能还没跟上，用这个标记避免界面又闪回「未激活」
var LOCAL_VIP_ACTIVATED = false;

// 已激活：原色 + 和头像通行证徽章一致的“标题+正文”气泡；未激活：灰色
function UpdateStorePassIcon(is_vip, vip_info) {
    // 刚激活成功时，服务端数据回来可能还是旧的（后端落库有延迟），这里以本地标记为准
    if (LOCAL_VIP_ACTIVATED && !is_vip) {
        $.Msg('[PASS] UpdateStorePassIcon: server says not vip, but locally activated -> keep activated UI');
        is_vip = true;
    }
    STORE_IS_VIP = !!is_vip;
    STORE_VIP_INFO = vip_info || null;
    // 左上角的通行证入口也跟着刷新（已激活=彩色，未激活=灰色）
    RefreshVipEntryIcon(STORE_IS_VIP, STORE_VIP_INFO); 
    var panel = $('#image_pass_storage');
    if (!panel) {
        return;
    }
    panel.SetHasClass('store_pass_locked', !STORE_IS_VIP);
    if (STORE_IS_VIP) {
        // 和 dota_avatar_vip_badge 完全一致：DOTAShowTitleTextTooltip（标题 + 有效期 + 正文）
        RefreshVipTooltip(panel, 'store_pass', STORE_VIP_INFO);
    }
    else {
        panel.SetPanelEvent('onmouseover', function () {
            $.DispatchEvent('DOTAShowTitleTextTooltip', panel, $.Localize('#txt_dac_vip_title'),
                $.Localize('#text_store_pass_locked'));
        });
        panel.SetPanelEvent('onmouseout', OnOutStoreIconTip);
    }
}

// 左上角「通行证」入口（替换原来的 TI15 竞猜入口）
// 所有人可见；图标由 CSS 按 vip_active 类切换（未激活=蓝灰，已激活=彩色棋盘图）
//
// 【调试开关】置 true → 无视真实通行证状态，强制显示「未激活」的灰蓝图标
//   （用来在自己有通行证的账号上预览未激活态；调试完改回 false）
var DEBUG_FORCE_VIP_ENTRY_LOCKED = false;

function RefreshVipEntryIcon(is_vip, vip_info) {
    var entry = $('#icon-vip');
    if (!entry) {
        return;
    }
    if (DEBUG_FORCE_VIP_ENTRY_LOCKED === true) {
        is_vip = false;
        vip_info = null;
        // 便于确认调试开关生效
        $.Msg('[VIP-ENTRY] DEBUG_FORCE_VIP_ENTRY_LOCKED = true，已强制显示未激活态');
    }
    entry.SetHasClass('vip_locked', !is_vip);
    entry.SetHasClass('vip_active', !!is_vip);
    // 通行证面板里的「有效期」文本也一起刷新
    RefreshVipExpireText(is_vip, vip_info);

    // 左上角入口的 hover：只显示「通行证特权」，不带标题（详细 tooltip 保留给商城图标/头像徽章）
    entry.SetPanelEvent('onmouseover', function () {
        $.DispatchEvent('DOTAShowTextTooltip', entry, $.Localize('#tips_icon-vip_title'));
    });
    entry.SetPanelEvent('onmouseout', function () {
        $.DispatchEvent('DOTAHideTextTooltip');
        $.DispatchEvent('DOTAHideTitleTextTooltip');
    });
}

// =========================================================
// 通行证面板：有效期文本 + 「激活通行证」按钮
// =========================================================

// 通行证面板里的显示逻辑：
//   已激活 -> 只显示有效期/已激活文字，隐藏「说明 + 激活按钮」
//   未激活 -> 显示「说明 + 激活按钮」，隐藏有效期那行
function RefreshVipExpireText(is_vip, vip_info) {
    // 面板整体状态（灰色背景、各特权项的「未激活/已启用」文案）一起刷新
    RefreshVipPanelState(is_vip);

    var label = $('#text_vip_expire_time');
    var explain = $('#text_activate_pass_explain');
    var btn_group = $('#panel_activate_buttons');
    var btn = $('#button_activate_pass');

    // 说明 + 按钮组：只在未激活时出现
    if (explain) {
        explain.SetHasClass('invisible', !!is_vip);
    }
    if (btn_group) {
        btn_group.SetHasClass('invisible', !!is_vip);
    }
    if (btn) {
        btn.SetHasClass('invisible', !!is_vip);
    }
    if (!label) {
        return;
    }

    if (!is_vip) {
        // 未激活：不显示「尚未激活通行证」这行，避免和上面的说明重复
        label.SetHasClass('invisible', true);
        return;
    }

    label.SetHasClass('invisible', false);
    var dateStr = GetVipExpireText(vip_info);   // utils.js 里已有的解析（yyyy/mm/dd）
    if (dateStr) {
        // 「通行证已激活，有效期至 2027/09/10（剩余 x 天）」
        // 模板里若有 <font> 标签则去掉，Label 不解析 HTML
        var tpl = ('' + $.Localize('#text_vip_active_expire')).replace(/<[^>]*>/g, '');
        var head;
        if (!tpl || tpl.indexOf('#text_vip_active_expire') >= 0) {
            head = $.Localize('#text_vip_active') + ' ' + dateStr;
        }
        else {
            head = (tpl.indexOf('%s') >= 0) ? tpl.replace('%s', dateStr) : (tpl + ' ' + dateStr);
        }
        label.text = head + GetVipRemainDaysText(dateStr);
    }
    else {
        label.text = $.Localize('#text_vip_active');
    }
}

function RefreshVipPanelState(is_vip) {
    //兜底：脚本初始化早期（顶层 ShowAllPlayerInfo 调用链）可能还没跑过上面的赋值，
    //visitor 情况下这里可能仍是 undefined，直接遍历会抛 TypeError 并打断整段脚本
    if (!VIP_PANEL_STATUS_LABELS || !VIP_PANEL_STATUS_LABELS.length) {
        return;
    }
    var panel = $('#panel_vip');
    if (panel) {
        panel.SetHasClass('vip_locked', !is_vip);
    }
    for (var i = 0; i < VIP_PANEL_STATUS_LABELS.length; i++) {
        var label = $('#' + VIP_PANEL_STATUS_LABELS[i][0]);
        if (!label) {
            continue;
        }
        label.text = is_vip
            ? $.Localize(VIP_PANEL_STATUS_LABELS[i][1])
            : $.Localize('#text_vip_not_activated');
    }
}

// 根据到期日算「（剩余 x 天）」；实现在 utils.js（那里的通行证 tooltip 也用），这里直接复用

// 服务端中止对局（无测试资格 / 连不上服务器等）：
// ui.js 里关掉了 DOTA_DEFAULT_UI_ENDGAME（平时用 DAC 自己的结算界面），
// 中止时没有结算数据，这里必须把 Dota 默认的结束界面放回来，
// 否则进入 POST_GAME 后屏幕上什么都没有，玩家只能强退。
GameEvents.Subscribe('abort_game_notice', SafeCallback('abort_game_notice', function (keys) {
    try {
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME, true);
        $.Msg('[ABORT] DOTA_DEFAULT_UI_ENDGAME enabled');
    }
    catch (e) {
        $.Msg('[ABORT] enable ENDGAME ui failed: ' + e);
    }
    // 顺手把被 dac.js 强制隐藏的“断开连接”按钮放出来，留一条手动退出的路
    if (FindDotaHudElement('DisconnectButton')) {
        FindDotaHudElement('DisconnectButton').style['opacity'] = '1';
    }
    if (keys && keys.text) {
        show_msg(keys.text);
    }
}));

// 激活请求是否正在等待回包（防止重复点击）
var ACTIVATE_PASS_PENDING = false;
// 只要成功过一次，就永久不再弹「激活失败」（后端重复回包 / 超时兜底都不弹）
var ACTIVATE_PASS_SUCCEEDED = false;

// 切换按钮的「加载中」状态：转圈 + 文案变「激活中...」+ 按钮置灰不可点
function SetActivatePassLoading(loading) {
    ACTIVATE_PASS_PENDING = !!loading;

    var btn = $('#button_activate_pass');
    if (btn) {
        // 查询中：按钮进入 unavailable（禁用）外观；loading 用来保证转圈环仍白亮
        btn.SetHasClass('unavailable', !!loading);
        btn.SetHasClass('loading', !!loading);
    }
    var spin = $('#panel_activate_loading');
    if (spin) {
        spin.SetHasClass('invisible', !loading);
    }
    var label = $('#text_activate_pass');
    if (label) {
        label.text = loading
            ? $.Localize('#text_activate_pass_loading')
            : $.Localize('#text_activate_pass');
    }
}

// 点击「直接去商店购买」：打开战利品兑换（商店）窗口，并弹出二维码充值弹窗
function OnClickGoToStore() {
    $.Msg('[PASS] goto store: open store panel + qr popup');
    try {
        // 1) 战利品兑换窗口
        ShowStoreV5();
    }
    catch (e) {
        $.Msg('[PASS] ShowStoreV5 failed: ' + e);
    }
    try {
        // 2) 二维码弹窗（内部会向服务端请求二维码）
        OnClickStoreV5PlusButton();
    }
    catch (e) {
        $.Msg('[PASS] OnClickStoreV5PlusButton failed: ' + e);
    }
}

// 点击「激活通行证」：只发请求给服务端，由服务端去请求 activate/pass/<steamid>
// （不在客户端打开外部浏览器）
function OnClickActivatePass() {
    if (ACTIVATE_PASS_PENDING) {
        return;
    }
    // 已经激活过就不用再点（防止后端落库延迟期间重复请求，回来一个「激活失败」的弹窗）
    if (LOCAL_VIP_ACTIVATED || STORE_IS_VIP) {
        $.Msg('[PASS] already activated, ignore click');
        return;
    }
    SetActivatePassLoading(true);

    // 兜底：服务端 HTTP 超时是 20 秒，25 秒还没回包就自己复位，避免一直转圈
    $.Schedule(25, function () {
        if (ACTIVATE_PASS_SUCCEEDED) {
            return;                 // 已经成功了，超时兜底不再弹失败
        }
        if (ACTIVATE_PASS_PENDING) {
            $.Msg('[PASS] activate no response in 25s, reset loading');
            SetActivatePassLoading(false);
            show_msg($.Localize('#text_activate_pass_failed'));
        }
    });

    $.Msg('[PASS] request activate pass');
    GameEvents.SendCustomGameEventToServer('request_activate_pass', {});
}

// 服务端广播：某个玩家的通行证刚激活成功 -> 立刻把他头像上的 VIP 徽章点亮（不用等 player_info 刷新）
GameEvents.Subscribe('update_player_vip', SafeCallback('update_player_vip', function (keys) {
    if (!keys || !keys.is_vip) {
        return;
    }
    try {
        var idx = GetPlayerIndexByPlayerID(keys.player_id);
        $.Msg('[PASS] update_player_vip: player_id=' + keys.player_id + ' index=' + idx);
        if (idx === undefined || idx === null || idx < 0) {
            return;
        }
        if ($('#avatar_player_vip_badge_' + idx)) {
            $('#avatar_player_vip_badge_' + idx).SetHasClass('invisible', false);
        }
        if ($('#avatar_player_vip_' + idx)) {
            $('#avatar_player_vip_' + idx).SetHasClass('invisible', false);
        }
        // 如果是自己，顺带把整块 VIP 界面也点亮
        var my_steamid = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
        if (('' + keys.steamid) === ('' + my_steamid)) {
            LOCAL_VIP_ACTIVATED = true;
            STORE_IS_VIP = true;
            RefreshVipEntryIcon(true, STORE_VIP_INFO);
            RefreshVipPanelState(true);
        }
    }
    catch (e) {
        $.Msg('[PASS] update_player_vip failed: ' + e);
    }
}));

// 本地玩家的头像 VIP 徽章（激活成功后立刻显示，不等 net table）
function ShowLocalPlayerVipBadge(show) {
    try {
        var my_index = Players.GetLocalPlayer();
        if ($('#avatar_player_vip_badge_' + my_index)) {
            $('#avatar_player_vip_badge_' + my_index).SetHasClass('invisible', !show);
        }
        if ($('#avatar_player_vip_' + my_index)) {
            $('#avatar_player_vip_' + my_index).SetHasClass('invisible', !show);
        }
    }
    catch (e) {
        $.Msg('[PASS] ShowLocalPlayerVipBadge failed: ' + e);
    }
}

// 服务端校验结果：err == 0 视为激活成功
GameEvents.Subscribe('activate_pass_result', SafeCallback('activate_pass_result', function (keys) {
    // 无论成功失败，先结束加载状态
    SetActivatePassLoading(false);

    if (keys && keys.ok) {
        // 先本地立刻把 VIP 相关界面切到「已激活」，不用等服务端 net table 回来：
        //   左上角入口图标、通行证面板（金色背景 + 各特权项已启用/已解锁）、本地玩家头像 VIP 徽章
        ACTIVATE_PASS_SUCCEEDED = true;   // 成功一次后，永久不再弹「激活失败」
        LOCAL_VIP_ACTIVATED = true;       // 会话内锁定为已激活，避免后端落库延迟导致界面闪回「未激活」
        STORE_IS_VIP = true;
        RefreshVipEntryIcon(true, STORE_VIP_INFO);
        RefreshVipPanelState(true);
        ShowLocalPlayerVipBadge(true);
        // 左上角商店按钮：确保激活过程中被刷新隐藏过也能恢复
        if ($('#icon-my')) {
            $('#icon-my').SetHasClass('invisible', false);
        }

        show_msg('#text_activate_pass_success', 'file://{images}/custom_game/vip/bird_sang.png', 6);

        // 再拉真实的通行证信息（有效期等），服务端那边也会强制刷新一次
        refresh_shop_v5();
        $.Schedule(1.5, function () {
            refresh_shop_v5();
        });
        $.Schedule(4.0, function () {
            refresh_shop_v5();
        });
        return;
    }

    // 已经成功过：后端重复回包/超时兜底送来的失败一律忽略，绝不再弹失败弹窗
    if (ACTIVATE_PASS_SUCCEEDED) {
        $.Msg('[PASS] ignore failure popup because activate already succeeded');
        return;
    }

    var err = (keys && keys.err !== undefined && keys.err !== null) ? ('' + keys.err) : '';
    var msg = (keys && keys.msg !== undefined && keys.msg !== null) ? ('' + keys.msg) : '';

    // 失败时把服务端返回的完整信息打到控制台，方便排查
    try {
        $.Msg('[PASS] activate failed, result=' + JSON.stringify(keys));
    }
    catch (e) {
        $.Msg('[PASS] activate failed, err=' + err + ' msg=' + msg);
    }

    // 弹窗文案：
    //   1501 -> 「由于steam库存未公开，暂时无法激活。」+ 第二行服务端原始 msg
    //   其它 -> 原样显示服务端 msg；没有 msg 就显示通用的失败提示
    var head = (err === '1501') ? $.Localize('#text_activate_pass_steam_private') : '';
    var detail = (msg !== '' && msg !== 'no_steam_id') ? msg : '';

    if (head === '' && detail === '') {
        show_msg($.Localize('#text_activate_pass_failed'));
    }
    else if (head !== '' && detail !== '') {
        // msg_box_text 带 html="true"，<br> 会正常换行
        show_msg(head + '<br>' + detail);
    }
    else {
        show_msg(head !== '' ? head : detail);
    }
}));

// 界面初始化：先按「未激活」显示，等服务器数据回来再刷新

$.Schedule(1, function () {
    RefreshVipEntryIcon(typeof STORE_IS_VIP !== 'undefined' ? STORE_IS_VIP : false,
        typeof STORE_VIP_INFO !== 'undefined' ? STORE_VIP_INFO : null);
});

// 通用：把tooltip锚定到指定控件上，避免气泡位置跑偏
function ShowStoreIconTip(panel_id, token) {
    var el = $('#' + panel_id);
    if (el) {
        $.DispatchEvent('DOTAShowTextTooltip', el, $.Localize(token));
    }
}

// 带标题的气泡：标题 + 正文（和通行证/头像徽章同一种气泡样式）
function ShowStoreIconTitleTip(panel_id, title_token, text_token) {
    var el = $('#' + panel_id);
    if (el) {
        $.DispatchEvent('DOTAShowTitleTextTooltip', el, $.Localize(title_token), $.Localize(text_token));
    }
}

// 还没拿到通行证状态时的兜底（同样带标题）
function OnHoverStorePassIcon() {
    var el = $('#image_pass_storage');
    if (!el) {
        return;
    }
    var token = STORE_IS_VIP ? '#txt_dac_vip' : '#text_store_pass_locked';
    $.DispatchEvent('DOTAShowTitleTextTooltip', el, $.Localize('#txt_dac_vip_title'), $.Localize(token));
}

function OnOutStoreIconTip() {
    $.DispatchEvent('DOTAHideTitleTextTooltip');
    $.DispatchEvent('DOTAHideTextTooltip');
}

// ===== 商城顶栏加号按钮：二维码弹窗 =====
var STORE_QR_WAITING = false;
var STORE_QR_TEXT = '';

function HideStoreQRPopup() {
    STORE_QR_WAITING = false;
    var popup = $('#store_qr_popup');
    var was_open = popup && !popup.BHasClass('invisible');
    if (popup) {
        popup.SetHasClass('invisible', true);
    }
    //弹窗关掉后，加号恢复原色、可以再次点击
    $('#btn_plus_store_title').SetHasClass('store_plus_disabled', false);
    //通知服务端：把「压住招募面板」的保护窗口缩短，否则招募面板要等满 180 秒才恢复自动刷新
    if (was_open) {
        GameEvents.SendCustomGameEventToServer('qr_popup_closed', {});
    }
}

// 弹窗底部的提示行：没内容时整个收起来，避免按钮下面多出一块空白
function SetStoreQRPopupTips(text) {
    var el = $('#store_qr_popup_tips');
    if (!el) {
        return;
    }
    el.text = text || '';
    el.SetHasClass('invisible', !text);
}

// 二维码 + 两个按钮：reveal=false 收起（不占位），true 时向下展开
// 标题行只做显示/隐藏（不参与缩放动画，避免样式卡在收起态导致文字看不见）
function SetStoreQRContentState(reveal) {
    if ($('#store_qr_popup_title')) {
        $('#store_qr_popup_title').SetHasClass('invisible', !reveal);
    }
    var ids = ['store_qr_popup_image_box', 'store_qr_popup_open', 'store_qr_popup_refresh'];
    for (var i = 0; i < ids.length; i++) {
        var el = $('#' + ids[i]);
        if (!el) {
            continue;
        }
        //先复位：收起状态 + 不可见
        el.SetHasClass('qr_show', false);
        el.SetHasClass('invisible', true);
    }
    if (!reveal) {
        return;
    }
    $('#store_qr_popup_image_box').SetHasClass('invisible', false);
    $('#store_qr_popup_open').SetHasClass('invisible', !STORE_QR_TEXT);
    $('#store_qr_popup_refresh').SetHasClass('invisible', false);
    //等一帧再加 qr_show，transition 才会真的跑起来
    $.Schedule(0.02, function () {
        for (var j = 0; j < ids.length; j++) {
            var e2 = $('#' + ids[j]);
            if (!e2) {
                continue;
            }
            if (ids[j] == 'store_qr_popup_open' && !STORE_QR_TEXT) {
                continue;
            }
            e2.SetHasClass('qr_show', true);
        }
    });
}

// 在外部（系统默认）浏览器打开二维码里的链接
function OpenStoreQRLink() {
    if (!STORE_QR_TEXT) {
        return;
    }
    $.Msg('[QR] open external browser: ' + STORE_QR_TEXT);
    $.DispatchEvent("ExternalBrowserGoToURL", STORE_QR_TEXT);
}

// 点击加号：弹窗先进入“请求中”，再交给服务器用 当前玩家steamid+时间戳 发http请求
function OnClickStoreV5PlusButton() {
    //弹窗已经打开时加号是灰的，不能重复点
    if ($('#btn_plus_store_title').BHasClass('store_plus_disabled')) {
        return;
    }
    $('#btn_plus_store_title').SetHasClass('store_plus_disabled', true);
    STORE_QR_WAITING = true;
    STORE_QR_TEXT = '';
    $('#store_qr_popup').SetHasClass('invisible', false);
    $('#store_qr_popup_image').SetImage('');
    //先收起二维码和两个按钮（等回包后向下展开）
    SetStoreQRContentState(false);
    SetStoreQRPopupTips($.Localize('#text_store_qr_popup_loading'));
    // 服务器迟迟没回，提示超时
    $.Schedule(12, function () {
        if (STORE_QR_WAITING) {
            STORE_QR_WAITING = false;
            SetStoreQRPopupTips($.Localize('#text_store_qr_popup_timeout'));
        }
    });
    // 昵称随请求一起带上：workshop tools / 本地房下服务端不一定能拿到玩家名
    var qr_nickname = '';
    try {
        qr_nickname = Players.GetPlayerName(Players.GetLocalPlayer()) || '';
    }
    catch (e) {
        qr_nickname = '';
    }
    GameEvents.SendCustomGameEventToServer('request_qr_code', { nickname: qr_nickname });
}

// 充值后刷新账户信息：关掉弹窗，重新请求 shop/v5（回调 FillStoreV5 会整页重绘商店）
function OnClickStoreQRRefresh() {
    if ($('#store_qr_popup_refresh').BHasClass('unavailable')) {
        return;
    }
    //2秒内不可重复点，避免连点刷接口
    $('#store_qr_popup_refresh').SetHasClass('unavailable', true);
    $.Schedule(2, function () {
        $('#store_qr_popup_refresh').SetHasClass('unavailable', false);
    });
    HideStoreQRPopup();
    refresh_shop_v5();
}

// 服务器http回调：keys = {url, text, status_code, body_size}
function OnShowStoreQRCode(keys) {
    if (!keys || !keys.url) {
        return;
    }
    STORE_QR_WAITING = false;
    $('#store_qr_popup').SetHasClass('invisible', false);
    // panorama 不能把lua拿到的二进制字节直接当纹理，这里用同一个地址让客户端加载这张png
    $('#store_qr_popup_image').SetImage(keys.url);
    // 按钮跳转的是二维码里的链接（站点地址+base64）
    STORE_QR_TEXT = keys.text || '';
    // 二维码和两个按钮一起向下展开（CSS 里带 transition-delay 形成依次展开）
    SetStoreQRContentState(true);
    // 不加任何状态码/体积之类的提示，只有失败时才给一句提示
    var code = keys.status_code || 0;
    SetStoreQRPopupTips((code == 200) ? '' : $.Localize('#text_store_qr_popup_failed'));
    $.Msg('[QR] popup image url = ' + keys.url);
}

var DEBUG_LINK;
function DebugLink() {
    if (DEBUG_LINK) {
        $.DispatchEvent("ExternalBrowserGoToURL", DEBUG_LINK);
    }
}

function FillStoreV5OneChessboard(panel, one, i) {
    var panel_outer = $.CreatePanel('Panel', panel, 'store_v5_chessboards_' + i, {
        class: 'store_panel_goods_line8_one goods_chongwu'
    });
    var panel_image = $.CreatePanel('Panel', panel_outer, 'store_v5_chessboards_image_' + i, {
        class: 'goods_item_img_chessboard',
        style: 'background-image:url("file://{images}/custom_game/chessboard/' + one.id + '.png");transform:scale3d( 0.8, 0.8, 0.8);'
    });
    panel_image.style['transform'] = 'scale3d( 1, 1, 1)';

    var panel_image_title = $.CreatePanel('Panel', panel_image, 'store_v5_chessboards_image_title_' + i, {
        class: 'goods_item_title chessboard',
    });
    $.CreatePanel('Label', panel_image_title, 'store_v5_chessboards_image_title_text_' + i, {
        text: $.Localize('#' + one.id),
        style: 'color:' + COLOR_STR[one.id.slice(1, 2)] + ';',
    });
    $.CreatePanel('Panel', panel_outer, 'store_v5_chessboards_tags_' + i, {
        class: 'tags_container',
        style: 'height:60px;margin-top:260px;'
    });
    fill_tags_container(one.id, "#store_v5_chessboards_tags_" + i, null, 'right');

    var panel_goods_tags_container = $.CreatePanel('Panel', panel_image, '', {
        class: 'goods_tags_container',
        style: 'margin-right:15px;margin-top:30px;',
    });
    if (one.tag) {
        var tag_arr = one.tag.split(',');
        for (var j = 0; j < tag_arr.length; j++) {
            var t = tag_arr[j];
            if (t) {
                var tt = $.CreatePanel('Panel', panel_goods_tags_container, '', {
                    class: 'tags_one',
                    style: 'background-color:#ff4444;',
                });

                $.CreatePanel('Label', tt, '', {
                    text: ($.Localize('#tags_' + t) == '#tags_' + t) ? t.toUpperCase() : $.Localize('#tags_' + t),
                });
            }
        }
    }

    var panel_buy = $.CreatePanel('Panel', panel_outer, 'store_v5_chessboards_buy_' + i, {
        class: 'dota_button goods_item_button_chessboard',
    });
    var panel_buy_inner = $.CreatePanel('Panel', panel_buy, 'store_v5_chessboards_buy_' + i, {
        class: 'goods_buy_button_inner',
    });
    var money = one.money || 'candy';
    var price = parseInt(one.price || 0);
    if (!one.is_owned) {
        $.CreatePanel('Image', panel_buy_inner, '', {
            class: 'candy',
            src: 'file://{images}/custom_game/award_' + money + '.png',
        });
        // 价格
        $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: '×' });
        if (one.price_old) {
            $.CreatePanel('Label', panel_buy_inner, '', { class: 'price delete_line', text: ' ' + one.price_old });
        }
        var price_text = $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: price });
        if (IsShopV5ItemMoneyEnough(one)) {
            // 可以买
            price_text.style['color'] = '#fff';
            var confirm_text = $.Localize('#' + 'buychessboard1') + Text2ColorText(one.id) + $.Localize('#' + 'buychessboard2');
            panel_buy.SetPanelEvent(
                "onactivate",
                shopv5_buy_outer(panel_buy, confirm_text, one.id)
            );
        }
        else {
            // 买不起
            price_text.style['color'] = '#ff4444';
            panel_buy.SetPanelEvent("onactivate",
                mima_outer($.Localize('#no_enough_' + one.money))
            );
        }
    }
    else {
        // 已拥有，不能买
        $.CreatePanel('Label', panel_buy_inner, '', {
            class: 'price',
            text: $.Localize('#text_vip_got'),
            style: 'font-family: Radiance,FZLanTingHei-R-GBK,defaultFont;font-size:22px;',
        });
        panel_buy.SetHasClass('unavailable', true);
    }
}
function FillStoreV5OneCourier(panel, one, i) {
    if (one.id != 'lottery') {
        var panel_outer = $.CreatePanel('Panel', panel, 'store_v5_couriers_' + i, {
            class: 'store_panel_goods_courier_one goods_chongwu',
        });
        var panel_image_container = $.CreatePanel('Panel', panel_outer, 'store_v5_couriers_image_container_' + i, {
            class: '',
            style: 'width:200px;height:200px;margin-top:10px;z-index:100;opacity-mask:url("s2r://panorama/images/masks/scratched_box_psd.vtex");overflow:clip clip;'
        });
        panel_image_container.style['background-color'] = COLOR_STR[one.id.slice(1, 2)];
        panel_image_container.style['background-color-opacity'] = COLOR_STR_OPACITY[one.id.slice(1, 2)];

        var panel_image = $.CreatePanel('Panel', panel_image_container, 'store_v5_couriers_image_' + i, {
            class: 'store_panel_goods_courier_one_img',
            style: 'background-image:url("file://{images}/custom_game/skaters/' + one.id + '.png");width:160px;height:160px;transform:scale3d( 0.8, 0.8, 0.8);z-index:10;'
        });
        panel_image.style['transform'] = 'scale3d( 1, 1, 1)';

        var panel_image_title = $.CreatePanel('Panel', panel_image_container, 'store_v5_couriers_image_title_' + i, {
            class: 'goods_item_title_v5',
        });
        $.CreatePanel('Label', panel_image_title, 'store_v5_couriers_image_title_text_' + i, {
            text: $.Localize('#' + one.id),
            style: 'color:' + (COLOR_STR[one.id.slice(1, 2)] || '#bbb') + ';',
        });
        $.CreatePanel('Panel', panel_outer, 'store_v5_couriers_tags_' + i, {
            class: 'tags_container',
        });
        fill_tags_container(one.id, "#store_v5_couriers_tags_" + i);

        var panel_goods_tags_container = $.CreatePanel('Panel', panel_image_container, '', {
            class: 'goods_tags_container',
        });
        if (one.tag) {
            var tag_arr = one.tag.split(',');
            for (var j = 0; j < tag_arr.length; j++) {
                var t = tag_arr[j];
                if (t) {
                    var tt = $.CreatePanel('Panel', panel_goods_tags_container, '', {
                        class: 'tags_one',
                        style: 'background-color:#ff4444;',
                    });

                    $.CreatePanel('Label', tt, '', {
                        text: ($.Localize('#tags_' + t) == '#tags_' + t) ? t.toUpperCase() : $.Localize('#tags_' + t),
                    });
                }
            }
        }

        var panel_buy = $.CreatePanel('Panel', panel_outer, 'store_v5_couriers_buy_' + i, {
            class: 'dota_button goods_item_button_v5',
        });
        var panel_buy_inner = $.CreatePanel('Panel', panel_buy, 'store_v5_couriers_buy_' + i, {
            class: 'goods_buy_button_inner',
        });

        // 货币
        var money = one.money || 'candy';
        var price = parseInt(one.price || 0);
        $.CreatePanel('Image', panel_buy_inner, '', {
            class: 'candy',
            src: 'file://{images}/custom_game/award_' + money + '.png',
        });

        // 价格
        $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: '×' });
        if (one.price_old) {
            $.CreatePanel('Label', panel_buy_inner, '', { class: 'price delete_line', text: ' ' + one.price_old });
        }
        var price_text = $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: price });

        if (IsShopV5ItemMoneyEnough(one)) {
            // 可以买
            price_text.style['color'] = '#fff';
            var confirm_text = $.Localize('#' + 'buycourier1') + Text2ColorText(one.id) + $.Localize('#' + 'buycourier2');
            panel_buy.SetPanelEvent("onactivate",
                shopv5_buy_outer(panel_buy, confirm_text, one.id)
            );
        }
        else {
            // 买不起
            price_text.style['color'] = '#ff4444';
            panel_buy.SetPanelEvent("onactivate",
                mima_outer($.Localize('#no_enough_' + one.money))
            );
        }
    }
}
function FillStoreV5OneLottery(panel, one, i) {
    var panel_outer = $.CreatePanel('Panel', panel, 'store_v5_couriers_lottery_' + i, {
        class: 'store_panel_goods_courier_one goods_chongwu',
    });
    var panel_image_container = $.CreatePanel('Panel', panel_outer, 'store_v5_couriers_lottery_image_' + i, {
        class: 'img_shop_courier_lottery',
        style: 'background-image:url("file://{images}/custom_game/lottery/lottery.png");width:200px;height:190px;z-index:10;background-size:100% 100%;margin-top:10px;margin-bottom:10px;',
        onmouseover: "show_lottery_content();",
        onmouseout: "hide_lottery_content();",
    });
    var tags_container = $.CreatePanel('Panel', panel_outer, 'store_v5_lottery_tags_' + i, {
        class: 'tags_container',
        style: 'flow-children:right;',
    });
    var tags_container_inner = $.CreatePanel('Panel', tags_container, '', {
        style: 'horizontal-align:center;flow-children:right;',
    });
    var tags_container_one = $.CreatePanel('Panel', tags_container_inner, '', {
        class: 'tags_one',
        style: 'background-color:' + COLOR["1"] + ';',
    });
    $.CreatePanel('Label', tags_container_one, '', {
        text: $.Localize('#tips_title_image_random'),
    });
    var tags_container_one = $.CreatePanel('Panel', tags_container_inner, '', {
        class: 'tags_one',
        style: 'background-color:' + COLOR["1"] + ';',
    });
    $.CreatePanel('Label', tags_container_one, '', {
        text: $.Localize('#type_h'),
    });
    var panel_goods_tags_container = $.CreatePanel('Panel', panel_image_container, '', {
        class: 'goods_tags_container',
    });
    if (one.tag) {
        var tag_arr = one.tag.split(',');
        for (var j = 0; j < tag_arr.length; j++) {
            var t = tag_arr[j];
            if (t) {
                var tt = $.CreatePanel('Panel', panel_goods_tags_container, '', {
                    class: 'tags_one',
                    style: 'background-color:#ff4444;',
                });

                $.CreatePanel('Label', tt, '', {
                    text: ($.Localize('#tags_' + t) == '#tags_' + t) ? t.toUpperCase() : $.Localize('#tags_' + t),
                });
            }
        }
    }

    var panel_buy = $.CreatePanel('Panel', panel_outer, 'store_v5_couriers_buy_' + i, {
        class: 'dota_button goods_item_button_v5',
    });
    var panel_buy_inner = $.CreatePanel('Panel', panel_buy, 'store_v5_couriers_buy_' + i, {
        class: 'goods_buy_button_inner',
    });

    // 货币
    var money = one.money || 'candy';
    var price = parseInt(one.price || 0);
    $.CreatePanel('Image', panel_buy_inner, '', {
        class: 'candy',
        src: 'file://{images}/custom_game/award_' + money + '.png',
    });

    // 价格
    $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: '×' });
    if (one.price_old) {
        $.CreatePanel('Label', panel_buy_inner, '', { class: 'price delete_line', text: ' ' + one.price_old });
    }
    var price_text = $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: price });

    if (IsShopV5ItemMoneyEnough(one)) {
        // 可以买
        price_text.style['color'] = '#fff';
        var confirm_text = $.Localize('#' + 'buycourier1') + $.Localize('#' + one.id) + $.Localize('#' + 'buycourier2');
        panel_buy.SetPanelEvent("onactivate",
            shopv5_lottery_outer(panel_buy)
        );
    }
    else {
        // 买不起
        price_text.style['color'] = '#ff4444';
        panel_buy.SetPanelEvent("onactivate",
            mima_outer($.Localize('#no_enough_' + one.money))
        );
    }
    // text += '<Panel class="tags_one" style="background-color:' + COLOR["1"] + ';">';
    //     text += '<Label text="' + $.Localize('#' + 'type_' + type) + '"/>';
    //     text += '</Panel>';
    // fill_tags_container(one.id, "#store_v5_couriers_tags_" + i);

    // <Image id="img_shop_courier_lottery" class= "goods_item_img" src = "file://{images}/custom_game/lottery/lottery.png" onmouseover="show_lottery_content();" onmouseout="hide_lottery_content();"/>
}

function FillStoreV5OneEffect(panel, one, i) {
    if (one) {
        var panel_outer = $.CreatePanel('Panel', panel, 'store_v5_effects_' + i, {
            class: 'store_panel_goods_courier_one goods_chongwu',
        });
        var panel_image_container = $.CreatePanel('Panel', panel_outer, 'store_v5_effects_image_container_' + i, {
            class: '',
            style: 'width:200px;height:200px;margin-top:10px;z-index:100;opacity-mask:url("s2r://panorama/images/masks/scratched_box_psd.vtex");overflow:clip clip;'
        });
        panel_image_container.style['background-color'] = COLOR_STR[one.id.slice(1, 2)];
        panel_image_container.style['background-color-opacity'] = COLOR_STR_OPACITY[one.id.slice(1, 2)];

        var panel_image = $.CreatePanel('Panel', panel_image_container, 'store_v5_effects_image_' + i, {
            class: 'store_panel_goods_courier_one_img',
            style: 'background-image:url("file://{images}/custom_game/effect/' + one.id + '.png");width:170px;height:150px;transform:scale3d( 0.8, 0.8, 0.8);z-index:10;'
        });
        panel_image.style['transform'] = 'scale3d( 1, 1, 1)';

        var panel_image_title = $.CreatePanel('Panel', panel_image_container, 'store_v5_effects_image_title_' + i, {
            class: 'goods_item_title_v5',
        });
        $.CreatePanel('Label', panel_image_title, 'store_v5_effects_image_title_text_' + i, {
            text: $.Localize('#' + one.id),
            style: 'color:' + (COLOR_STR[one.id.slice(1, 2)] || '#bbb') + ';',
        });
        $.CreatePanel('Panel', panel_outer, 'store_v5_effects_tags_' + i, {
            class: 'tags_container',
        });
        fill_tags_container(one.id, "#store_v5_effects_tags_" + i);

        // 预览
        var icon_preview = $.CreatePanel('Image', panel_image_container, '', {
            class: 'btn_preview',
            src: 'file://{images}/custom_game/preview.png',
        });
        SetPanelMouseOverText(icon_preview, $.Localize('#text_preview'));
        icon_preview.SetPanelEvent(
            "onactivate",
            preview_effect_outer(null, one.id)
        );

        // tag
        var panel_goods_tags_container = $.CreatePanel('Panel', panel_image_container, '', {
            class: 'goods_tags_container',
        });
        if (one.tag) {
            var tag_arr = one.tag.split(',');
            for (var j = 0; j < tag_arr.length; j++) {
                var t = tag_arr[j];
                if (t) {
                    var tt = $.CreatePanel('Panel', panel_goods_tags_container, '', {
                        class: 'tags_one',
                        style: 'background-color:#ff4444;',
                    });

                    $.CreatePanel('Label', tt, '', {
                        text: ($.Localize('#tags_' + t) == '#tags_' + t) ? t.toUpperCase() : $.Localize('#tags_' + t),
                    });
                }
            }
        }

        var panel_buy = $.CreatePanel('Panel', panel_outer, 'store_v5_effects_buy_' + i, {
            class: 'dota_button goods_item_button_v5',
        });
        var panel_buy_inner = $.CreatePanel('Panel', panel_buy, 'store_v5_effects_buy_' + i, {
            class: 'goods_buy_button_inner',
        });
        var money = one.money || 'candy';
        var price = parseInt(one.price || 0);
        if (!one.is_slot_invalid) {
            $.CreatePanel('Image', panel_buy_inner, '', {
                class: 'candy',
                src: 'file://{images}/custom_game/award_' + money + '.png',
            });
            // 价格
            $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: '×' });
            if (one.price_old) {
                $.CreatePanel('Label', panel_buy_inner, '', { class: 'price delete_line', text: ' ' + one.price_old });
            }
            var price_text = $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: price });
            if (IsShopV5ItemMoneyEnough(one)) {
                // 可以买
                price_text.style['color'] = '#fff';
                var confirm_text = $.Localize('#' + 'buyeffect1') + Text2ColorText(one.id) + $.Localize('#' + 'buyeffect2');
                panel_buy.SetPanelEvent(
                    "onactivate",
                    shopv5_buy_outer(panel_buy, confirm_text, one.id)
                );
            }
            else {
                // 买不起
                price_text.style['color'] = '#ff4444';
                panel_buy.SetPanelEvent("onactivate",
                    mima_outer($.Localize('#no_enough_' + one.money))
                );
            }
        }
        else {
            // 已拥有，不能买
            $.CreatePanel('Label', panel_buy_inner, '', {
                class: 'price',
                text: $.Localize('#text_is_slot_invalid'),
                style: 'font-family: Radiance,FZLanTingHei-R-GBK,defaultFont;font-size:22px;',
            });
            panel_buy.SetHasClass('unavailable', true);
        }
    }
}
function FillStoreV5OneProjectile(panel, one, i) {
    if (one) {
        var panel_outer = $.CreatePanel('Panel', panel, 'store_v5_projectiles_' + i, {
            class: 'store_panel_goods_courier_one goods_chongwu',
        });
        var panel_image_container = $.CreatePanel('Panel', panel_outer, 'store_v5_projectiles_image_container_' + i, {
            class: '',
            style: 'width:200px;height:200px;margin-top:10px;z-index:100;opacity-mask:url("s2r://panorama/images/masks/scratched_box_psd.vtex");overflow:clip clip;'
        });
        panel_image_container.style['background-color'] = COLOR_STR[one.id.slice(1, 2)];
        panel_image_container.style['background-color-opacity'] = COLOR_STR_OPACITY[one.id.slice(1, 2)];

        var panel_image = $.CreatePanel('Panel', panel_image_container, 'store_v5_projectiles_image_' + i, {
            class: 'store_panel_goods_courier_one_img',
            style: 'background-image:url("file://{images}/custom_game/projectile/' + one.id + '.png");width:170px;height:150px;transform:scale3d( 0.8, 0.8, 0.8);z-index:10;'
        });
        panel_image.style['transform'] = 'scale3d( 1, 1, 1)';

        var panel_image_title = $.CreatePanel('Panel', panel_image_container, 'store_v5_projectiles_image_title_' + i, {
            class: 'goods_item_title_v5',
        });
        $.CreatePanel('Label', panel_image_title, 'store_v5_projectiles_image_title_text_' + i, {
            text: $.Localize('#' + one.id),
            style: 'color:' + (COLOR_STR[one.id.slice(1, 2)] || '#bbb') + ';',
        });
        $.CreatePanel('Panel', panel_outer, 'store_v5_projectiles_tags_' + i, {
            class: 'tags_container',
        });
        fill_tags_container(one.id, "#store_v5_projectiles_tags_" + i);

        // tag
        var panel_goods_tags_container = $.CreatePanel('Panel', panel_image_container, '', {
            class: 'goods_tags_container',
        });
        if (one.tag) {
            var tag_arr = one.tag.split(',');
            for (var j = 0; j < tag_arr.length; j++) {
                var t = tag_arr[j];
                if (t) {
                    var tt = $.CreatePanel('Panel', panel_goods_tags_container, '', {
                        class: 'tags_one',
                        style: 'background-color:#ff4444;',
                    });

                    $.CreatePanel('Label', tt, '', {
                        text: ($.Localize('#tags_' + t) == '#tags_' + t) ? t.toUpperCase() : $.Localize('#tags_' + t),
                    });
                }
            }
        }

        // 预览
        var icon_preview = $.CreatePanel('Image', panel_image_container, '', {
            class: 'btn_preview',
            src: 'file://{images}/custom_game/preview.png',
        });
        SetPanelMouseOverText(icon_preview, $.Localize('#text_preview'));
        icon_preview.SetPanelEvent(
            "onactivate",
            preview_projectile_outer(null, one.id)
        );

        var panel_buy = $.CreatePanel('Panel', panel_outer, 'store_v5_projectiles_buy_' + i, {
            class: 'dota_button goods_item_button_v5',
        });
        var panel_buy_inner = $.CreatePanel('Panel', panel_buy, 'store_v5_projectiles_buy_' + i, {
            class: 'goods_buy_button_inner',
        });
        var money = one.money || 'candy';
        var price = parseInt(one.price || 0);
        if (!one.is_slot_invalid) {
            $.CreatePanel('Image', panel_buy_inner, '', {
                class: 'candy',
                src: 'file://{images}/custom_game/award_' + money + '.png',
            });
            // 价格
            $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: '×' });
            if (one.price_old) {
                $.CreatePanel('Label', panel_buy_inner, '', { class: 'price delete_line', text: ' ' + one.price_old });
            }
            var price_text = $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: price });
            if (IsShopV5ItemMoneyEnough(one)) {
                // 可以买
                price_text.style['color'] = '#fff';
                var confirm_text = $.Localize('#' + 'buyprojectile1') + Text2ColorText(one.id) + $.Localize('#' + 'buyprojectile2');
                panel_buy.SetPanelEvent(
                    "onactivate",
                    shopv5_buy_outer(panel_buy, confirm_text, one.id)
                );
            }
            else {
                // 买不起
                price_text.style['color'] = '#ff4444';
                panel_buy.SetPanelEvent("onactivate",
                    mima_outer($.Localize('#no_enough_' + one.money))
                );
            }
        }
        else {
            // 已拥有，不能买
            $.CreatePanel('Label', panel_buy_inner, '', {
                class: 'price',
                text: $.Localize('#text_is_slot_invalid'),
                style: 'font-family: Radiance,FZLanTingHei-R-GBK,defaultFont;font-size:22px;',
            });
            panel_buy.SetHasClass('unavailable', true);
        }
    }
}
function FillStoreV5OneAnimation(panel, one, i) {
    if (one) {
        var panel_outer = $.CreatePanel('Panel', panel, 'store_v5_animations_' + i, {
            class: 'store_panel_goods_courier_one goods_chongwu',
        });
        var panel_image_container = $.CreatePanel('Panel', panel_outer, 'store_v5_animations_image_container_' + i, {
            class: '',
            style: 'width:200px;height:200px;margin-top:10px;z-index:100;opacity-mask:url("s2r://panorama/images/masks/scratched_box_psd.vtex");overflow:clip clip;'
        });
        panel_image_container.style['background-color'] = COLOR_STR[one.id.slice(1, 2)];
        panel_image_container.style['background-color-opacity'] = COLOR_STR_OPACITY[one.id.slice(1, 2)];

        var panel_image = $.CreatePanel('Panel', panel_image_container, 'store_v5_animations_image_' + i, {
            class: 'store_panel_goods_courier_one_img',
            style: 'background-image:url("file://{images}/custom_game/animation/' + one.id + '.png");width:170px;height:150px;transform:scale3d( 0.8, 0.8, 0.8);z-index:10;'
        });
        panel_image.style['transform'] = 'scale3d( 1, 1, 1)';

        var panel_image_title = $.CreatePanel('Panel', panel_image_container, 'store_v5_animations_image_title_' + i, {
            class: 'goods_item_title_v5',
        });
        $.CreatePanel('Label', panel_image_title, 'store_v5_animations_image_title_text_' + i, {
            text: $.Localize('#' + one.id),
            style: 'color:' + (COLOR_STR[one.id.slice(1, 2)] || '#bbb') + ';',
        });
        $.CreatePanel('Panel', panel_outer, 'store_v5_animations_tags_' + i, {
            class: 'tags_container',
        });
        fill_tags_container(one.id, "#store_v5_animations_tags_" + i);

        // 预览
        var icon_preview = $.CreatePanel('Image', panel_image_container, '', {
            class: 'btn_preview',
            src: 'file://{images}/custom_game/preview.png',
        });
        SetPanelMouseOverText(icon_preview, $.Localize('#text_preview'));
        icon_preview.SetPanelEvent(
            "onactivate",
            preview_animation_outer(null, one.id)
        );

        // tag
        var panel_goods_tags_container = $.CreatePanel('Panel', panel_image_container, '', {
            class: 'goods_tags_container',
        });
        if (one.tag) {
            var tag_arr = one.tag.split(',');
            for (var j = 0; j < tag_arr.length; j++) {
                var t = tag_arr[j];
                if (t) {
                    var tt = $.CreatePanel('Panel', panel_goods_tags_container, '', {
                        class: 'tags_one',
                        style: 'background-color:#ff4444;',
                    });

                    $.CreatePanel('Label', tt, '', {
                        text: ($.Localize('#tags_' + t) == '#tags_' + t) ? t.toUpperCase() : $.Localize('#tags_' + t),
                    });
                }
            }
        }

        var panel_buy = $.CreatePanel('Panel', panel_outer, 'store_v5_animations_buy_' + i, {
            class: 'dota_button goods_item_button_v5',
        });
        var panel_buy_inner = $.CreatePanel('Panel', panel_buy, 'store_v5_animations_buy_' + i, {
            class: 'goods_buy_button_inner',
        });
        var money = one.money || 'candy';
        var price = parseInt(one.price || 0);
        if (!one.is_slot_invalid) {
            $.CreatePanel('Image', panel_buy_inner, '', {
                class: 'candy',
                src: 'file://{images}/custom_game/award_' + money + '.png',
            });
            // 价格
            $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: '×' });
            if (one.price_old) {
                $.CreatePanel('Label', panel_buy_inner, '', { class: 'price delete_line', text: ' ' + one.price_old });
            }
            var price_text = $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: price });
            if (IsShopV5ItemMoneyEnough(one)) {
                // 可以买
                price_text.style['color'] = '#fff';
                var confirm_text = $.Localize('#' + 'buyanimation1') + Text2ColorText(one.id) + $.Localize('#' + 'buyanimation2');
                panel_buy.SetPanelEvent(
                    "onactivate",
                    shopv5_buy_outer(panel_buy, confirm_text, one.id)
                );
            }
            else {
                // 买不起
                price_text.style['color'] = '#ff4444';
                panel_buy.SetPanelEvent("onactivate",
                    mima_outer($.Localize('#no_enough_' + one.money))
                );
            }
        }
        else {
            // 已拥有，不能买
            $.CreatePanel('Label', panel_buy_inner, '', {
                class: 'price',
                text: $.Localize('#text_is_slot_invalid'),
                style: 'font-family: Radiance,FZLanTingHei-R-GBK,defaultFont;font-size:22px;',
            });
            panel_buy.SetHasClass('unavailable', true);
        }
    }
}
function FillStoreV5OnePet(panel, one, i) {
    if (one) {
        var panel_outer = $.CreatePanel('Panel', panel, 'store_v5_pets_' + i, {
            class: 'store_panel_goods_courier_one goods_chongwu',
        });
        var panel_image_container = $.CreatePanel('Panel', panel_outer, 'store_v5_animations_pets_container_' + i, {
            class: '',
            style: 'width:200px;height:200px;margin-top:10px;z-index:100;opacity-mask:url("s2r://panorama/images/masks/scratched_box_psd.vtex");overflow:clip clip;'
        });
        panel_image_container.style['background-color'] = COLOR_STR[one.id.slice(1, 2)];
        panel_image_container.style['background-color-opacity'] = COLOR_STR_OPACITY[one.id.slice(1, 2)];

        var panel_image = $.CreatePanel('Panel', panel_image_container, 'store_v5_pets_image_' + i, {
            class: 'store_panel_goods_courier_one_img',
            style: 'background-image:url("file://{images}/custom_game/pets/' + one.id + '.png");width:160px;height:160px;transform:scale3d( 0.8, 0.8, 0.8);z-index:10;'
        });
        panel_image.style['transform'] = 'scale3d( 1, 1, 1)';

        var panel_image_title = $.CreatePanel('Panel', panel_image_container, 'store_v5_pets_image_title_' + i, {
            class: 'goods_item_title_v5',
        });
        $.CreatePanel('Label', panel_image_title, 'store_v5_pets_image_title_text_' + i, {
            text: $.Localize('#' + one.id),
            style: 'color:' + (COLOR_STR[one.id.slice(1, 2)] || '#bbb') + ';',
        });
        $.CreatePanel('Panel', panel_outer, 'store_v5_pets_tags_' + i, {
            class: 'tags_container',
        });
        fill_tags_container(one.id, "#store_v5_pets_tags_" + i);

        // tag
        var panel_goods_tags_container = $.CreatePanel('Panel', panel_image_container, '', {
            class: 'goods_tags_container',
        });
        if (one.tag) {
            var tag_arr = one.tag.split(',');
            for (var j = 0; j < tag_arr.length; j++) {
                var t = tag_arr[j];
                if (t) {
                    var tt = $.CreatePanel('Panel', panel_goods_tags_container, '', {
                        class: 'tags_one',
                        style: 'background-color:#ff4444;',
                    });

                    $.CreatePanel('Label', tt, '', {
                        text: ($.Localize('#tags_' + t) == '#tags_' + t) ? t.toUpperCase() : $.Localize('#tags_' + t),
                    });
                }
            }
        }

        var panel_buy = $.CreatePanel('Panel', panel_outer, 'store_v5_pets_buy_' + i, {
            class: 'dota_button goods_item_button_v5',
        });
        var panel_buy_inner = $.CreatePanel('Panel', panel_buy, 'store_v5_pets_buy_' + i, {
            class: 'goods_buy_button_inner',
        });
        var money = one.money || 'candy';
        var price = parseInt(one.price || 0);
        if (!one.is_slot_invalid) {
            $.CreatePanel('Image', panel_buy_inner, '', {
                class: 'candy',
                src: 'file://{images}/custom_game/award_' + money + '.png',
            });
            // 价格
            $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: '×' });
            if (one.price_old) {
                $.CreatePanel('Label', panel_buy_inner, '', { class: 'price delete_line', text: ' ' + one.price_old });
            }
            var price_text = $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: price });
            if (IsShopV5ItemMoneyEnough(one)) {
                // 可以买
                price_text.style['color'] = '#fff';
                var confirm_text = $.Localize('#' + 'buypet1') + Text2ColorText(one.id) + $.Localize('#' + 'buypet2');
                panel_buy.SetPanelEvent(
                    "onactivate",
                    shopv5_buy_outer(panel_buy, confirm_text, one.id)
                );
            }
            else {
                // 买不起
                price_text.style['color'] = '#ff4444';
                panel_buy.SetPanelEvent("onactivate",
                    mima_outer($.Localize('#no_enough_' + one.money))
                );
            }
        }
        else {
            // 已拥有，不能买
            $.CreatePanel('Label', panel_buy_inner, '', {
                class: 'price',
                text: $.Localize('#text_is_slot_invalid'),
                style: 'font-family: Radiance,FZLanTingHei-R-GBK,defaultFont;font-size:22px;',
            });
            panel_buy.SetHasClass('unavailable', true);
        }
    }
}
function FillStoreV5OneEmotion(panel, one, i) {
    if (one) {
        var panel_outer = $.CreatePanel('Panel', panel, 'store_v5_emotions_' + i, {
            class: 'store_panel_goods_courier_one goods_chongwu',
        });

        var panel_image_container = $.CreatePanel('Panel', panel_outer, 'store_v5_emotions_image_container_' + i, {
            class: '',
            style: 'width:200px;height:200px;margin-top:10px;z-index:100;opacity-mask:url("s2r://panorama/images/masks/scratched_box_psd.vtex");overflow:clip clip;'
        });
        panel_image_container.style['background-color'] = COLOR_STR[one.id.slice(1, 2)];
        panel_image_container.style['background-color-opacity'] = COLOR_STR_OPACITY[one.id.slice(1, 2)];

        var panel_image = $.CreatePanel('Panel', panel_image_container, 'store_v5_emotions_image_' + i, {
            class: 'store_panel_goods_courier_one_img',
            style: 'background-image:url("file://{images}/custom_game/chat/' + EMOTION_LIST[one.id].emotion_index + '.png");margin-top:-10px;transform:scale3d( 0.5, 0.5, 0.5);z-index:10;'
        });
        panel_image.style['transform'] = 'scale3d( EMOTIONSIZE, EMOTIONSIZE, EMOTIONSIZE)'.replace(/EMOTIONSIZE/g, EMOTION_LIST[one.id].size * 1.1);

        // $('#img_shop_emotion_' + i).SetImage('file://{images}/custom_game/chat/' + EMOTION_LIST[shop_emotion_id].emotion_index + '.png');
        //     $('#img_bg_shop_emotion_' + i).style['background-color'] = COLOR_STR[shop_emotion_id.slice(1, 2)];
        //     $('#img_shop_emotion_' + i).style['transform'] = 'scale3d( EMOTIONSIZE, EMOTIONSIZE, EMOTIONSIZE)'.replace(/EMOTIONSIZE/g, EMOTION_LIST[shop_emotion_id].size);

        var panel_image_title = $.CreatePanel('Panel', panel_image_container, 'store_v5_emotions_image_title_' + i, {
            class: 'goods_item_title_v5',
        });
        $.CreatePanel('Label', panel_image_title, 'store_v5_emotions_image_title_text_' + i, {
            text: $.Localize('#' + one.id),
            style: 'color:' + (COLOR_STR[one.id.slice(1, 2)] || '#bbb') + ';',
        });
        $.CreatePanel('Panel', panel_outer, 'store_v5_emotions_tags_' + i, {
            class: 'tags_container',
        });
        fill_tags_container(one.id, "#store_v5_emotions_tags_" + i);

        // tag
        var panel_goods_tags_container = $.CreatePanel('Panel', panel_image_container, '', {
            class: 'goods_tags_container',
        });
        if (one.tag) {
            var tag_arr = one.tag.split(',');
            for (var j = 0; j < tag_arr.length; j++) {
                var t = tag_arr[j];
                if (t) {
                    var tt = $.CreatePanel('Panel', panel_goods_tags_container, '', {
                        class: 'tags_one',
                        style: 'background-color:#ff4444;',
                    });

                    $.CreatePanel('Label', tt, '', {
                        text: ($.Localize('#tags_' + t) == '#tags_' + t) ? t.toUpperCase() : $.Localize('#tags_' + t),
                    });
                }
            }
        }

        var panel_buy = $.CreatePanel('Panel', panel_outer, 'store_v5_emotions_buy_' + i, {
            class: 'dota_button goods_item_button_v5',
        });
        var panel_buy_inner = $.CreatePanel('Panel', panel_buy, 'store_v5_emotions_buy_' + i, {
            class: 'goods_buy_button_inner',
        });
        var money = one.money || 'candy';
        var price = parseInt(one.price || 0);
        if (!one.is_owned) {
            $.CreatePanel('Image', panel_buy_inner, '', {
                class: 'candy',
                src: 'file://{images}/custom_game/award_' + money + '.png',
            });
            // 价格
            $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: '×' });
            if (one.price_old) {
                $.CreatePanel('Label', panel_buy_inner, '', { class: 'price delete_line', text: ' ' + one.price_old });
            }
            var price_text = $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: price });
            if (IsShopV5ItemMoneyEnough(one)) {
                // 可以买
                price_text.style['color'] = '#fff';
                var confirm_text = $.Localize('#' + 'buyemotion1') + Text2ColorText(one.id) + $.Localize('#' + 'buyemotion2');
                panel_buy.SetPanelEvent(
                    "onactivate",
                    shopv5_buy_outer(panel_buy, confirm_text, one.id)
                );
            }
            else {
                // 买不起
                price_text.style['color'] = '#ff4444';
                panel_buy.SetPanelEvent("onactivate",
                    mima_outer($.Localize('#no_enough_' + one.money))
                );
            }
        }
        else {
            // 已拥有，不能买
            $.CreatePanel('Label', panel_buy_inner, '', {
                class: 'price',
                text: $.Localize('#text_vip_got'),
                style: 'font-family: Radiance,FZLanTingHei-R-GBK,defaultFont;font-size:22px;',
            });
            panel_buy.SetHasClass('unavailable', true);
        }
    }
}


function FillStoreV5ByTab(tab) {
    // 因为DOTA2 UI渲染内存泄漏问题，界面点击才加载
    if (!SHOP_INFO_V5) {
        $('#store_panel_v5_goods_empty').SetHasClass('hide', false);
        return;
    }
    SHOP_V5_CURR_TAB = tab;

    $('#store_panel_v5_goods_list_recomment_chessboard').RemoveAndDeleteChildren();
    $('#store_panel_v5_goods_list_recomment_other').RemoveAndDeleteChildren();
    if (tab == 'recomment') {
        $('#store_panel_v5_goods_empty').SetHasClass('hide', true);
        // 推荐！
        // 棋盘
        if (SHOP_INFO_V5.chessboards && SHOP_INFO_V5.chessboards.length > 0) {
            for (var i = 0; i < SHOP_INFO_V5.chessboards.length; i++) {
                var one = SHOP_INFO_V5.chessboards[i];
                if (one.tag && one.tag != 'pass_only' && one.tag != 'basic') {
                    FillStoreV5OneChessboard($('#store_panel_v5_goods_list_recomment_chessboard'), one, i);
                }
            }
        }

        // 信使
        if (SHOP_INFO_V5.couriers && SHOP_INFO_V5.couriers.length > 0) {
            for (var i = 0; i < SHOP_INFO_V5.couriers.length; i++) {
                var one = SHOP_INFO_V5.couriers[i];
                if (one.id == 'lottery') {
                    FillStoreV5OneLottery($('#store_panel_v5_goods_list_recomment_other'), one, 0);
                }
                if (one.tag && one.tag != 'pass_only' && one.tag != 'basic') {
                    FillStoreV5OneCourier($('#store_panel_v5_goods_list_recomment_other'), one, i);
                }
            }
        }

        // 周身特效
        if (SHOP_INFO_V5.effects && SHOP_INFO_V5.effects.length > 0) {
            for (var i = 0; i < SHOP_INFO_V5.effects.length; i++) {
                var one = SHOP_INFO_V5.effects[i];
                if (one.tag && one.tag != 'pass_only' && one.tag != 'basic') {
                    FillStoreV5OneEffect($('#store_panel_v5_goods_list_recomment_other'), one, i);
                }
            }
        }

        // 弹道特效
        if (SHOP_INFO_V5.projectiles && SHOP_INFO_V5.projectiles.length > 0) {
            for (var i = 0; i < SHOP_INFO_V5.projectiles.length; i++) {
                var one = SHOP_INFO_V5.projectiles[i];
                if (one.tag && one.tag != 'pass_only' && one.tag != 'basic') {
                    FillStoreV5OneProjectile($('#store_panel_v5_goods_list_recomment_other'), one, i);
                }
            }
        }

        // 出场动画
        if (SHOP_INFO_V5.animations && SHOP_INFO_V5.animations.length > 0) {
            for (var i = 0; i < SHOP_INFO_V5.animations.length; i++) {
                var one = SHOP_INFO_V5.animations[i];
                if (one.tag && one.tag != 'pass_only' && one.tag != 'basic') {
                    FillStoreV5OneAnimation($('#store_panel_v5_goods_list_recomment_other'), one, i);
                }
            }
        }

        // 宠物
        if (SHOP_INFO_V5.pets && SHOP_INFO_V5.pets.length > 0) {
            for (var i = 0; i < SHOP_INFO_V5.pets.length; i++) {
                var one = SHOP_INFO_V5.pets[i];
                if (one.tag && one.tag != 'pass_only' && one.tag != 'basic') {
                    FillStoreV5OnePet($('#store_panel_v5_goods_list_recomment_other'), one, i);
                }
            }
        }

        // 表情
        if (SHOP_INFO_V5.emotions && SHOP_INFO_V5.emotions.length > 0) {
            for (var i = 0; i < SHOP_INFO_V5.emotions.length; i++) {
                var one = SHOP_INFO_V5.emotions[i];
                if (one.tag && one.tag != 'pass_only' && one.tag != 'basic') {
                    FillStoreV5OneEmotion($('#store_panel_v5_goods_list_recomment_other'), one, i);
                }
            }
        }
    }

    $('#store_panel_v5_goods_list_chessboard').RemoveAndDeleteChildren();
    if (tab == 'chessboard') {
        // 棋盘
        if (SHOP_INFO_V5.chessboards && SHOP_INFO_V5.chessboards.length > 0) {
            $('#store_panel_v5_goods_empty').SetHasClass('hide', true);
            for (var i = 0; i < SHOP_INFO_V5.chessboards.length; i++) {
                var one = SHOP_INFO_V5.chessboards[i];
                FillStoreV5OneChessboard($('#store_panel_v5_goods_list_chessboard'), one, i);
            }
        }
    }
    $('#store_panel_v5_goods_list_courier').RemoveAndDeleteChildren();
    if (tab == 'courier') {
        // 信使
        if (SHOP_INFO_V5.couriers && SHOP_INFO_V5.couriers.length > 0) {
            $('#store_panel_v5_goods_empty').SetHasClass('hide', true);
            for (var i = 0; i < SHOP_INFO_V5.couriers.length; i++) {
                var one = SHOP_INFO_V5.couriers[i];
                FillStoreV5OneCourier($('#store_panel_v5_goods_list_courier'), one, i);
            }
        }
    }

    $('#store_panel_v5_goods_list_season').RemoveAndDeleteChildren();
    if (tab == 'season') {
        // 信使
        // $.Msg(SHOP_INFO_V5.seasons);
        if (SHOP_INFO_V5.seasons && SHOP_INFO_V5.seasons.length > 0) {
            $('#store_panel_v5_goods_empty').SetHasClass('hide', true);
            for (var i = 0; i < SHOP_INFO_V5.seasons.length; i++) {
                var one = SHOP_INFO_V5.seasons[i];
                if (one.id != 'lottery') {
                    var panel_outer = $.CreatePanel('Panel', $('#store_panel_v5_goods_list_season'), 'store_v5_couriers_' + i, {
                        class: 'store_panel_goods_courier_one goods_chongwu',
                    });
                    var panel_image_container = $.CreatePanel('Panel', panel_outer, 'store_v5_couriers_image_container_' + i, {
                        class: '',
                        style: 'width:200px;height:200px;margin-top:10px;z-index:100;opacity-mask:url("s2r://panorama/images/masks/scratched_box_psd.vtex");overflow:clip clip;'
                    });
                    panel_image_container.style['background-color'] = COLOR_STR[one.id.slice(1, 2)];
                    panel_image_container.style['background-color-opacity'] = COLOR_STR_OPACITY[one.id.slice(1, 2)];

                    var panel_image = $.CreatePanel('Panel', panel_image_container, 'store_v5_couriers_image_' + i, {
                        class: 'store_panel_goods_courier_one_img',
                        style: 'background-image:url("file://{images}/custom_game/skaters/' + one.id + '.png");width:160px;height:160px;transform:scale3d( 0.8, 0.8, 0.8);z-index:10;'
                    });
                    panel_image.style['transform'] = 'scale3d( 1, 1, 1)';

                    var panel_image_title = $.CreatePanel('Panel', panel_image_container, 'store_v5_couriers_image_title_' + i, {
                        class: 'goods_item_title_v5',
                    });
                    $.CreatePanel('Label', panel_image_title, 'store_v5_couriers_image_title_text_' + i, {
                        text: $.Localize('#' + one.id),
                        style: 'color:' + (COLOR_STR[one.id.slice(1, 2)] || '#bbb') + ';',
                    });
                    $.CreatePanel('Panel', panel_outer, 'store_v5_couriers_tags_' + i, {
                        class: 'tags_container',
                    });
                    fill_tags_container(one.id, "#store_v5_couriers_tags_" + i);

                    var panel_goods_tags_container = $.CreatePanel('Panel', panel_image_container, '', {
                        class: 'goods_tags_container',
                    });
                    if (one.tag) {
                        var tag_arr = one.tag.split(',');
                        for (var j = 0; j < tag_arr.length; j++) {
                            var t = tag_arr[j];
                            if (t) {
                                var tt = $.CreatePanel('Panel', panel_goods_tags_container, '', {
                                    class: 'tags_one',
                                    style: 'background-color:#ff4444;',
                                });

                                $.CreatePanel('Label', tt, '', {
                                    text: ($.Localize('#tags_' + t) == '#tags_' + t) ? t.toUpperCase() : $.Localize('#tags_' + t),
                                });
                            }
                        }
                    }

                    var panel_buy = $.CreatePanel('Panel', panel_outer, 'store_v5_couriers_buy_' + i, {
                        class: 'dota_button goods_item_button_v5',
                    });
                    var panel_buy_inner = $.CreatePanel('Panel', panel_buy, 'store_v5_couriers_buy_' + i, {
                        class: 'goods_buy_button_inner',
                    });
                    var money = one.money || 'candy';
                    var price = parseInt(one.price || 0);
                    $.CreatePanel('Image', panel_buy_inner, '', {
                        class: 'candy',
                        src: 'file://{images}/custom_game/award_' + money + '.png',
                    });
                    // 价格
                    $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: '×' });
                    if (one.price_old) {
                        $.CreatePanel('Label', panel_buy_inner, '', { class: 'price delete_line', text: ' ' + one.price_old });
                    }
                    var price_text = $.CreatePanel('Label', panel_buy_inner, '', { class: 'price', text: price });
                    if (IsShopV5ItemMoneyEnough(one)) {
                        // 可以买
                        price_text.style['color'] = '#fff';
                        var confirm_text = $.Localize('#' + 'buycourier1') + $.Localize('#' + one.id) + $.Localize('#' + 'buycourier2');
                        panel_buy.SetPanelEvent("onactivate",
                            shopv5_buy_outer(panel_buy, confirm_text, one.id)
                        );
                    }
                    else {
                        // 买不起
                        price_text.style['color'] = '#ff4444';
                        panel_buy.SetPanelEvent("onactivate",
                            mima_outer($.Localize('#no_enough_' + one.money))
                        );
                    }
                }
            }
        }
    }

    $('#store_panel_v5_goods_list_collect').RemoveAndDeleteChildren();
    if (tab == 'collect') {
        // 集换
        if (SHOP_INFO_V5.collects && SHOP_INFO_V5.collects.length > 0) {
            $('#store_panel_v5_goods_empty').SetHasClass('hide', true);
            // 排序
            var collect_arr = [];
            for (var i = 0; i < SHOP_INFO_V5.collects.length; i++) {
                var one = SHOP_INFO_V5.collects[i];
                var id = one.award.split('_')[0];
                var level = parseInt(id.slice(1, 2));
                var parts = [];
                var collected = true;
                var parts_total = 0;
                var parts_owned = 0;
                for (var ii = 0; ii < one.parts.length; ii++) {
                    if (one.parts[ii]) {
                        var is_owned = false;
                        var p = one.parts[ii];
                        var p_id = p.split('_')[0];
                        if (one.collect_parts && one.collect_parts[ii] != null) {
                            var cp = one.collect_parts[ii];
                            if (cp != null && cp >= 0) {
                                is_owned = true;
                                parts_owned++;
                            }
                        }
                        if (is_owned == false) {
                            collected = false;
                        }
                        parts_total++;
                        parts.push({
                            id: p_id,
                            is_owned: is_owned,
                        });
                    }
                }
                collect_arr.push({
                    id: id,
                    award: one.award,
                    parts: parts,
                    collected: collected,
                    parts_total: parts_total,
                    parts_owned: parts_owned,
                    tag: one.tag,
                });
            }
            collect_arr.sort((a, b) => {
                if (a.collected == true && b.collected == false) {
                    return -1;
                }
                if (b.collected == true && a.collected == false) {
                    return 1;
                }
                if (a.id > b.id) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            for (var i = 0; i < collect_arr.length; i++) {
                var one = collect_arr[i];
                one.id = one.award.split('_')[0];
                var panel_outer = $.CreatePanel('Panel', $('#store_panel_v5_goods_list_collect'), 'store_v5_collects_' + i, {
                    class: 'store_panel_goods_courier_one goods_chongwu',
                });
                var panel_image_container = $.CreatePanel('Panel', panel_outer, 'store_v5_collects_image_container_' + i, {
                    class: '',
                    style: 'width:200px;height:200px;margin-top:10px;z-index:100;opacity-mask:url("s2r://panorama/images/masks/scratched_box_psd.vtex");overflow:clip clip;'
                });
                panel_image_container.style['background-color'] = COLOR_STR[one.id.slice(1, 2)];
                panel_image_container.style['background-color-opacity'] = COLOR_STR_OPACITY[one.id.slice(1, 2)];

                var panel_image = $.CreatePanel('Panel', panel_image_container, 'store_v5_collects_image_' + i, {
                    class: 'store_panel_goods_courier_one_img',
                    style: 'background-image:url("file://{images}/custom_game/skaters/' + one.id + '.png");width:160px;height:160px;transform:scale3d( 0.8, 0.8, 0.8);z-index:10;'
                });
                panel_image.style['transform'] = 'scale3d( 1, 1, 1)';

                var panel_image_title = $.CreatePanel('Panel', panel_image_container, 'store_v5_collects_image_title_' + i, {
                    class: 'goods_item_title_v5',
                });
                $.CreatePanel('Label', panel_image_title, 'store_v5_collects_image_title_text_' + i, {
                    text: $.Localize('#' + one.id),
                    style: 'color:' + (COLOR_STR[one.id.slice(1, 2)] || '#bbb') + ';',
                });
                $.CreatePanel('Panel', panel_outer, 'store_v5_collects_tags_' + i, {
                    class: 'tags_container',
                    style: 'width:100%;',
                });
                fill_tags_container(one.id, "#store_v5_collects_tags_" + i);

                var panel_goods_tags_container = $.CreatePanel('Panel', panel_image_container, '', {
                    class: 'goods_tags_container',
                });
                if (one.tag) {
                    var tag_arr = one.tag.split(',');
                    for (var j = 0; j < tag_arr.length; j++) {
                        var t = tag_arr[j];
                        if (t) {
                            var tt = $.CreatePanel('Panel', panel_goods_tags_container, '', {
                                class: 'tags_one',
                                style: 'background-color:#ff4444;',
                            });

                            $.CreatePanel('Label', tt, '', {
                                text: ($.Localize('#tags_' + t) == '#tags_' + t) ? t.toUpperCase() : $.Localize('#tags_' + t),
                            });
                        }
                    }
                }

                var panel_buy = $.CreatePanel('Panel', panel_outer, 'store_v5_collects_buy_' + i, {
                    class: 'dota_button goods_item_button_v5',
                });

                var panel_buy_container = $.CreatePanel('Panel', panel_outer, 'store_v5_collects_buy_container' + i, {
                    class: 'goods_buy_button_inner',
                });
                if (one.parts) {
                    for (var j = 0; j < one.parts.length; j++) {
                        var p = one.parts[j];
                        var panel_parts_inner_icon = $.CreatePanel('Panel', panel_buy_container, 'store_v5_collects_buy_parts_' + i + '_' + j, {
                            style: 'background-image:url("file://{images}/custom_game/skaters/' + p.id + '.png");width:40px;height:40px;background-size:100% 100%;margin:2px;box-shadow:fill #00000066 0px 0px 4px 0px;',
                            class: '',
                        });
                        if (p.is_owned) {
                            $.CreatePanel('Image', panel_parts_inner_icon, "", {
                                src: "file://{images}/custom_game/tick.png",
                                class: 'store_v5_collects_parts_tick',
                            });
                            panel_parts_inner_icon.SetHasClass('unavailable', false);
                        }
                        else {
                            panel_parts_inner_icon.SetHasClass('unavailable', true);
                        }
                        SetPanelMouseOverText(panel_parts_inner_icon, $.Localize('#' + p.id));
                    }
                }

                var panel_buy_inner = $.CreatePanel('Panel', panel_buy, 'store_v5_collects_buy_' + i, {
                    class: 'goods_buy_button_inner',
                });
                if (!one.collected) {
                    panel_buy.SetHasClass('unavailable', true);
                    $.CreatePanel('Label', panel_buy_inner, '', {
                        class: 'price',
                        text: $.Localize('#text_collect_unavailable') + ' (' + one.parts_owned + '/' + one.parts_total + ')',
                        style: 'font-family: Radiance,FZLanTingHei-R-GBK,defaultFont;font-size:22px;',
                    });
                }
                else {
                    panel_buy.SetHasClass('unavailable', false);
                    // 可以集换
                    $.CreatePanel('Label', panel_buy_inner, '', {
                        class: 'price',
                        text: $.Localize('#text_collect'),
                        style: 'font-family: Radiance,FZLanTingHei-R-GBK,defaultFont;font-size:22px;',
                    });
                    panel_buy.SetPanelEvent(
                        "onactivate",
                        confirm_jihuan_hero_outer(one.award),
                    )
                }
            }
        }
    }


    $('#store_panel_v5_goods_list_effect').RemoveAndDeleteChildren();
    if (tab == 'effect') {
        // 周身特效
        if (SHOP_INFO_V5.effects && SHOP_INFO_V5.effects.length > 0) {
            $('#store_panel_v5_goods_empty').SetHasClass('hide', true);

            for (var i = 0; i < SHOP_INFO_V5.effects.length; i++) {
                var one = SHOP_INFO_V5.effects[i];
                FillStoreV5OneEffect($('#store_panel_v5_goods_list_effect'), one, i);
            }
        }
    }
    $('#store_panel_v5_goods_list_projectile').RemoveAndDeleteChildren();
    if (tab == 'projectile') {
        // 弹道特效
        if (SHOP_INFO_V5.projectiles && SHOP_INFO_V5.projectiles.length > 0) {
            $('#store_panel_v5_goods_empty').SetHasClass('hide', true);
            for (var i = 0; i < SHOP_INFO_V5.projectiles.length; i++) {
                var one = SHOP_INFO_V5.projectiles[i];
                FillStoreV5OneProjectile($('#store_panel_v5_goods_list_projectile'), one, i);
            }
        }
    }
    $('#store_panel_v5_goods_list_animation').RemoveAndDeleteChildren();
    if (tab == 'animation') {
        // 出场动画
        if (SHOP_INFO_V5.animations && SHOP_INFO_V5.animations.length > 0) {
            $('#store_panel_v5_goods_empty').SetHasClass('hide', true);

            for (var i = 0; i < SHOP_INFO_V5.animations.length; i++) {
                var one = SHOP_INFO_V5.animations[i];
                FillStoreV5OneAnimation($('#store_panel_v5_goods_list_animation'), one, i);
            }
        }
    }
    $('#store_panel_v5_goods_list_pet').RemoveAndDeleteChildren();
    if (tab == 'pet') {
        // 宠物
        if (SHOP_INFO_V5.pets && SHOP_INFO_V5.pets.length > 0) {
            $('#store_panel_v5_goods_empty').SetHasClass('hide', true);

            for (var i = 0; i < SHOP_INFO_V5.pets.length; i++) {
                var one = SHOP_INFO_V5.pets[i];
                FillStoreV5OnePet($('#store_panel_v5_goods_list_pet'), one, i);
            }
        }
    }
    $('#store_panel_v5_goods_list_emotion').RemoveAndDeleteChildren();
    if (tab == 'emotion') {
        // 表情
        if (SHOP_INFO_V5.emotions && SHOP_INFO_V5.emotions.length > 0) {
            $('#store_panel_v5_goods_empty').SetHasClass('hide', true);

            for (var i = 0; i < SHOP_INFO_V5.emotions.length; i++) {
                var one = SHOP_INFO_V5.emotions[i];
                FillStoreV5OneEmotion($('#store_panel_v5_goods_list_emotion'), one, i);
            }
        }
    }
}
function FillOtherStoreInfo(object) {
    if (object.user_info) {
        var myinfo = object.user_info;
        ShowMyMoney(object.user_info.candy, object.user_info.biscuit);

        if (myinfo.pre_candy) {
            open_panel_award('dac', 'candy', '', myinfo.pre_candy, 'season');
        }
        if (myinfo.pre_courier) {
            open_panel_award('dac', 'courier', myinfo.pre_courier, '', 'candystore');
        }

        var hero_count = 0;
        var zhugong_list = myinfo['zhugong'];

        // 排序信使！
        zhugong_list = sort_courier_list(zhugong_list);
        var onduty_zhugong = myinfo['onduty_hero'];
        showing_courier = onduty_zhugong;
        var onduty_index = zhugong_list.indexOf(onduty_zhugong);
        SELECTED_COURIER_INDEX = onduty_index;
        MY_ONDUTY_HERO_INDEX = onduty_index;
        MY_ONDUTY_HERO = onduty_zhugong;

        // var nettable_courier = CustomNetTables.GetTableValue("player_id_table", 'courier_' + Players.GetLocalPlayer());
        // if (nettable_courier && nettable_courier.courier_id) {
        //     MY_ONDUTY_HERO = nettable_courier.courier_id;
        // }

        set_showing_courier(onduty_zhugong, onduty_index);
        MY_HERO_LIST = zhugong_list;
        // choose_hero(MY_ONDUTY_HERO, MY_ONDUTY_HERO_INDEX);
        // show_notice_choose_courier(MY_ONDUTY_HERO);
        var text = '';
        for (var i = 0; i < zhugong_list.length; i++) {
            var zhugong = zhugong_list[i];
            var zhugong_info = get_courier_info(zhugong);

            var hero = zhugong.split('_')[0];
            var effect = zhugong.split('_')[1];
            var level_exp = parseFloat(zhugong.split('_')[2]) || 1.0;
            var level = Math.floor(level_exp);

            if (hero_count % 10 == 0) {
                text += '<Panel class="my_courier_list_line">';
            }

            // text += '<Panel class="my_courier_list_one" onactivate = "choose_hero(\''+zhugong+'\');" style="background-color:gradient( linear, 100.0% 0.0%, 0.0% 0.0%, color-stop( 0.0, #88888800 ), color-stop( 1.0, #88888822 ) );">';
            if (zhugong == MY_ONDUTY_HERO) {
                // 当前信使
                text += '<Panel class="my_courier_list_one selected" id="my_courier_list_' + i + '" onactivate = "choose_hero(\'' + zhugong + '\',' + i + ');" >';
            }
            else {
                text += '<Panel class="my_courier_list_one" id="my_courier_list_' + i + '" onactivate = "choose_hero(\'' + zhugong + '\',' + i + ');" >';
            }
            if (zhugong == MY_ONDUTY_HERO) {
                // 当前信使
                text += '<Panel class="my_courier_list_one_left" style="background-image:url(\'file://{images}/custom_game/skaters/' + hero + '.png\');">';
                text += '<Panel class="icon_equiped icon_one_equiped"/>';
                text += '</Panel>';
            }
            else {
                text += '<Panel class="my_courier_list_one_left" style="background-image:url(\'file://{images}/custom_game/skaters/' + hero + '.png\');"/>';
            }

            text += '<Panel class="my_courier_list_one_right">';

            text += '<Panel class="my_courier_list_one_right_line1" >';


            // text += '<Panel class="my_courier_list_one_right_line1" >';
            // text += '<Label text="'+$.Localize('#'+hero)+'" style="color:gradient( linear, 0% 0%, 0% 100%, from( white ), color-stop( 0.5, '+COLOR_STR[hero.slice(1,2)]+' ), to( '+COLOR_STR[hero.slice(1,2)]+' ) );"/>';
            text += '<Label text="' + $.Localize('#' + hero) + '" style="color:' + COLOR_STR[hero.slice(1, 2)] + ';"/>';
            text += '</Panel>';
            text += '<Panel class="my_courier_list_one_right_line2">';
            text += '<Label text="Lv.' + level + '"/>';

            if (zhugong_info && zhugong_info.effect) {
                text += '<Panel class="icon_effect" style="background-color:' + COLOR[zhugong_info.effect.slice(1, 2)] + ';"/>';
            }
            if (zhugong_info && zhugong_info.projectile) {
                text += '<Panel class="icon_projectile" style="background-color:' + COLOR[zhugong_info.projectile.slice(1, 2)] + ';"/>';
            }
            if (zhugong_info && zhugong_info.animation) {
                text += '<Panel class="icon_animation" style="background-color:' + COLOR[zhugong_info.animation.slice(1, 2)] + ';"/>';
            }
            if (zhugong_info && zhugong_info.pet) {
                text += '<Panel class="icon_pet" style="background-color:' + COLOR[zhugong_info.pet.slice(1, 2)] + ';"/>';
            }


            text += '</Panel>';
            text += '</Panel>';
            text += '</Panel>';

            if (hero_count % 10 == 9 || i == zhugong_list.length - 1) {
                text += '</Panel>';
            }

            hero_count++;
        }
        // choose_hero(onduty_zhugong,onduty_index);

        $('#store_panel_my_courier_list').RemoveAndDeleteChildren();
        // $('#store_panel_my_courier_list').BCreateChildren(text);
        CreateChildren($('#store_panel_my_courier_list'), text);

        $("#text_store_panel_my_courier_list").text = $.Localize('#' + 'text_my_courier_list') + ' (' + hero_count + ')';


        // 渲染我的棋盘
        MY_CHESSBOARD_LIST = myinfo['chessboard_list'];
        if (MY_CHESSBOARD_LIST) {
            MY_CHESSBOARD_LIST = sort_chessboard_list(MY_CHESSBOARD_LIST);
            if (myinfo['onduty_chessboard']) {
                MY_CURR_CHESSBOARD = myinfo['onduty_chessboard'];
                MY_SELECT_CHESSBOARD = myinfo['onduty_chessboard'];
            }
            var nettable_chessboard = CustomNetTables.GetTableValue("player_id_table", 'chessboard_' + Players.GetLocalPlayer());
            if (nettable_chessboard && nettable_chessboard.chessboard) {
                MY_CURR_CHESSBOARD = nettable_chessboard.chessboard;
                MY_SELECT_CHESSBOARD = nettable_chessboard.chessboard;
            }
            fill_my_chessboard_list();

        }

        // 通知服务器，该玩家都有哪些信使
        var courier_top_30 = zhugong_list.slice(0, 100);
        for (var i = 0; i < courier_top_30.length; i++) {
            if (courier_top_30[i] == onduty_zhugong) {
                courier_top_30.splice(i, 1);
            }
        }
        GameEvents.SendCustomGameEventToServer("set_courier_table", {
            'courier_list': courier_top_30.join(','),
            'onduty_courier': onduty_zhugong,
            'player_id': Players.GetLocalPlayer(),
            'hehe': Date.now(),
        });

        // 装载拥有的表情包
        if (myinfo.emotion_list) {
            InitChatEmoticon(myinfo.emotion_list.split(','));
            // InitChatEmoticon(myinfo.emotion_list.split(','));
        }

        // if (object.user_info.vip_info && object.user_info.vip_info.is_vip) {
        //     // 渲染VIP面板
        //     if (object.user_info.vip_info.is_vip && $('#icon-vip')) {
        //         $('#icon-vip').SetHasClass('unavailable', false);
        //     }
        //     if (object.user_info.vip_info.got_top1_today) {
        //         $('#panel_vip_firstwin_got_1').SetHasClass('unavailable', false);
        //         $('#text_vip_firstwin_got_1').text = $.Localize('#' + 'text_vip_got');
        //     }
        //     else {
        //         $('#panel_vip_firstwin_got_1').SetHasClass('unavailable', true);
        //         $('#text_vip_firstwin_got_1').text = $.Localize('#' + 'text_vip_ungot');
        //     }
        //     // if (object.user_info.vip_info.got_top3_today){
        //     //     $('#panel_vip_firstwin_got_2').SetHasClass('unavailable',false);
        //     //     $('#text_vip_firstwin_got_2').text = $.Localize('#'+'text_vip_got');
        //     // }
        //     // else{
        //     //     $('#panel_vip_firstwin_got_2').SetHasClass('unavailable',true);
        //     //     $('#text_vip_firstwin_got_2').text = $.Localize('#'+'text_vip_ungot');
        //     // }

        //     var onduty_effect = null;
        //     if (MY_ONDUTY_HERO) {
        //         onduty_effect = MY_ONDUTY_HERO.split('_')[3];
        //     }
        //     // if (!onduty_effect || onduty_effect=='p000'){
        //     //     $('#panel_vip_projectile_on').SetHasClass('unavailable',false);
        //     //     $('#text_vip_projectile_on').text = $.Localize('#'+'text_vip_on');
        //     // }
        //     // else{
        //     //     $('#panel_vip_projectile_on').SetHasClass('unavailable',true);
        //     //     $('#text_vip_projectile_on').text = $.Localize('#'+'text_vip_off');
        //     // }

        //     // 渲染任务面板
        //     // ShowQuestInfo(object.user_info.vip_info);

        //     // 渲染投票面板
        //     if (object.user_info.vip_info.vip_vote_info) {
        //         VIP_VOTE_INFO = object.user_info.vip_info.vip_vote_info;

        //         for (var i = 0; i < VIP_VOTE_INFO.length; i++) {
        //             var v = VIP_VOTE_INFO[i];
        //             var id = v.id;
        //             var options = v.options;
        //             var title = id.split(':')[0];
        //             var time = id.split(':')[1];

        //             if ($('#list_vip_vote_null')) {
        //                 $('#list_vip_vote_null').SetHasClass('invisible', true);
        //             }

        //             if (title && time) {
        //                 $('#panel_vote_box_' + (i + 1)).SetHasClass('invisible', false);
        //                 $('#text_vote_box_' + (i + 1) + '_title').text = $.Localize('#' + title);
        //                 $('#text_vote_box_' + (i + 1) + '_time').text = $.Localize('#' + time);
        //             }
        //             // if (v.winner1){
        //             var text = '<DOTAScenePanel id="panel_vote_box_' + (i + 1) + '_winner_2_hero" class="panel_vote_box_winner_hero" unit="' + (CHESS_2_HERO[v.winner1] || 'npc_dota_hero_wisp') + '"  light="global_light" antialias="true" renderdeferred="false" particleonly="false"/>';
        //             $('#panel_vote_box_' + (i + 1) + '_winner_1').RemoveAndDeleteChildren();
        //             // $('#panel_vote_box_'+(i+1)+'_winner_1').BCreateChildren(text);
        //             CreateChildren($('#panel_vote_box_' + (i + 1) + '_winner_1'), text);

        //             // }
        //             // if (v.winner2){
        //             var text = '<DOTAScenePanel id="panel_vote_box_' + (i + 1) + '_winner_2_hero" class="panel_vote_box_winner_hero" unit="' + (CHESS_2_HERO[v.winner2] || 'npc_dota_hero_wisp') + '"  light="global_light" antialias="true" renderdeferred="false" particleonly="false"/>';
        //             $('#panel_vote_box_' + (i + 1) + '_winner_2').RemoveAndDeleteChildren();
        //             // $('#panel_vote_box_'+(i+1)+'_winner_2').BCreateChildren(text);
        //             CreateChildren($('#panel_vote_box_' + (i + 1) + '_winner_2'), text);
        //             // }
        //             // if (v.winner3){
        //             var text = '<DOTAScenePanel id="panel_vote_box_' + (i + 1) + '_winner_2_hero" class="panel_vote_box_winner_hero" unit="' + (CHESS_2_HERO[v.winner3] || 'npc_dota_hero_wisp') + '"  light="global_light" antialias="true" renderdeferred="false" particleonly="false"/>';
        //             $('#panel_vote_box_' + (i + 1) + '_winner_3').RemoveAndDeleteChildren();
        //             // $('#panel_vote_box_'+(i+1)+'_winner_3').BCreateChildren(text);
        //             CreateChildren($('#panel_vote_box_' + (i + 1) + '_winner_3'), text);
        //             // }
        //             if (v.voted) {
        //                 // 已投票
        //                 $('#button_vote_box_' + (i + 1)).SetHasClass('invisible', true);
        //                 $('#panel_vote_box_' + (i + 1) + '_voted').SetHasClass('invisible', false);
        //                 $('#panel_vote_box_' + (i + 1) + '_hero').heroname = CHESS_2_HERO[v.voted];
        //             }
        //             else {
        //                 // 未投票
        //                 $('#panel_vote_box_' + (i + 1) + '_voted').SetHasClass('invisible', true);
        //                 $('#button_vote_box_' + (i + 1)).SetHasClass('invisible', false);
        //             }

        //             // 百分比
        //             if (v.winner1_count && v.total_count) {
        //                 $('#panel_vote_box_' + (i + 1) + '_winner_text_1').text = Math.floor(v.winner1_count / v.total_count * 100) + '%';
        //             }
        //             if (v.winner2_count && v.total_count) {
        //                 $('#panel_vote_box_' + (i + 1) + '_winner_text_2').text = Math.floor(v.winner2_count / v.total_count * 100) + '%';
        //             }
        //             if (v.winner3_count && v.total_count) {
        //                 $('#panel_vote_box_' + (i + 1) + '_winner_text_3').text = Math.floor(v.winner3_count / v.total_count * 100) + '%';
        //             }


        //         }
        //     }
        // }

        if (myinfo.match_history) {
            // 我的战绩
            ShowMatchHistory(myinfo, object.season);
        }

        if (FindDotaHudElement('icon_event_ti12')) {
            if (myinfo.bet_info) {
                FindDotaHudElement('icon_event_ti12').visible = true;
                ShowBetInfo(myinfo.bet_info);
            }
            else {
                FindDotaHudElement('icon_event_ti12').visible = false;
            }
        }
    }

    if (object.season_list || SEASON_LIST_DEFAULT) {
        // 赛季列表
        ShowSeasonList(object.season_list || SEASON_LIST_DEFAULT, object.season, object.award_season);
    }

    // 可领奖时打开
    // $.Msg("myinfo['award_available']="+myinfo['award_available']);
    if ($('#button_get_season_award') && $('#text_get_season_award')) {
        if (myinfo['award_available'] == true && parseInt(myinfo['match_' + object.award_season]) >= 5) {
            $('#button_get_season_award').SetHasClass('unavailable', false);
            IS_SEASON_AWARD_AVAILABLE = true;
        }
        else {
            $('#button_get_season_award').SetHasClass('unavailable', true);
            $('#text_get_season_award').text = $.Localize('#' + 'text_get_season_award_unavailable');
            IS_SEASON_AWARD_AVAILABLE = false;
        }
    }
}

// 魔改原版天赋树UI
function ModifyDOTAHUDTalentTree() {
    var xxx = FindDotaHudElement('AbilitiesAndStatBranch').FindChildrenWithClassTraverse('LeftRightFlow');
    var talent_tree_new_parent;
    if (xxx) {
        for (var ii in xxx) {
            if (xxx[ii]) {
                talent_tree_new_parent = xxx[ii];
            }
        }
    }

    var panel_talent_tree_new_container;
    if (FindDotaHudElement('talent_tree_new_container')) {
        FindDotaHudElement('talent_tree_new_container').RemoveAndDeleteChildren();
        panel_talent_tree_new_container = FindDotaHudElement('talent_tree_new_container');
    }
    else {
        panel_talent_tree_new_container = $.CreatePanel('Panel', talent_tree_new_parent, 'talent_tree_new_container', {
            class: '',
            style: 'width:69px;height:64px;vertical-align:bottom;margin-bottom:24px;tooltip-position: top;',
        });
        talent_tree_new_parent.MoveChildBefore(panel_talent_tree_new_container, FindDotaHudElement('StatBranch'));
    }

    var panel_talent_tree_new = $.CreatePanel('Panel', panel_talent_tree_new_container, 'talent_tree_new', {
        class: '',
        style: 'width:64px;height:64px;margin-right:5px;',
    });
    talent_tree_new_parent.MoveChildBefore(panel_talent_tree_new, FindDotaHudElement('StatBranch'));

    InitTalentTreeNew('talent_tree_new');
}

function UpdateTalentTree(player_id) {
    if (!Game.GetPlayerInfo(player_id)) {
        return;
    }
    // 判断是否有可以点的天赋树
    var data = CustomNetTables.GetTableValue("player_info_table", 'player_info');
    var talent_tree_curr;
    if (data && data.data) {
        var info = data.data[Game.GetPlayerInfo(player_id).player_steamid];
        talent_tree_curr = info.talent_tree;
    }
    else {
        talent_tree_curr = {};
    }
    if (talent_tree_curr) {
        var talent_tree_panel_name = 'talent_tree_new';

        var talent_learnable_list = [];
        var talent_learned_list = [];

        var r = ROUND;
        if (r > 35) {
            r = 35;
        }
        if (!r || r < 0) {
            r = 0;
        }
        var max_unlock_level = Math.floor((r + 5) / 10);

        for (var i = 1; i <= max_unlock_level; i++) {
            if (!talent_tree_curr[i]) {
                talent_learnable_list.push(i + 'a');
                talent_learnable_list.push(i + 'b');
            }
            else {
                talent_learned_list.push(talent_tree_curr[i].split('_')[1]);
            }
        }
        for (var i = 5; i <= 8; i++) {
            if (talent_tree_curr[i]) {
                talent_learned_list.push(talent_tree_curr[i].split('_')[1]);
            }
        }

        // 更新的是我的信使 并且 我选中的也是我的信使，就允许天赋树加点
        if (player_id == Players.GetLocalPlayer() && PORTRAIT_COURIER_PLAYER_ID == Players.GetLocalPlayer() && talent_learnable_list.length > 0 && Entities.IsAlive(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))) {
            SetTalentTreeActive(true);

            // 鼠标悬停 无动作
            FindDotaHudElement('talent_tree_new').SetPanelEvent("onmouseover",
                function () {
                }
            );
            FindDotaHudElement('talent_tree_new').SetPanelEvent("onmouseout",
                function () {
                }
            );
        }
        else {
            SetTalentTreeActive(false);

            // 鼠标悬停 显示天赋树
            FindDotaHudElement('talent_tree_new').SetPanelEvent("onmouseover",
                function () {
                    ShowTalentTreeBox();
                }
            );
            FindDotaHudElement('talent_tree_new').SetPanelEvent("onmouseout",
                function () {
                    HideTalentTreeBox();
                }
            );
        }

        for (var i = 1; i <= 4; i++) {
            FindDotaHudElement('talent_tree_' + i + 'a').SetHasClass('highlight', false);
            FindDotaHudElement('talent_tree_' + i + 'b').SetHasClass('highlight', false);
            FindDotaHudElement('talent_tree_' + i + 'a').SetHasClass('learnable', false);
            FindDotaHudElement('talent_tree_' + i + 'b').SetHasClass('learnable', false);
            SetTalentTreePipStatus(talent_tree_panel_name, i + 'a', false);
            SetTalentTreePipStatus(talent_tree_panel_name, i + 'b', false);
        }

        // 点亮已经学习了的天赋
        for (var i = 0; i < talent_learned_list.length; i++) {
            var t = talent_learned_list[i];
            FindDotaHudElement('talent_tree_' + t).SetHasClass('highlight', true);
            SetTalentTreePipStatus(talent_tree_panel_name, t, true);
        }
        // 可以学习的天赋
        for (var i = 0; i < talent_learnable_list.length; i++) {
            var t = talent_learnable_list[i];
            FindDotaHudElement('talent_tree_' + t).SetHasClass('learnable', true);
            BindTalentClickEvent(t);
        }
        HudClass('panel_talent_tree_box_inner', 'unavailable', false);

        SetTalentTreeNewLevelProgressBar(talent_tree_panel_name, ROUND);
    }
    else {
        $.Msg('no data');
    }
}

// 面板上是否还有"可以学（还亮着）"的天赋格子
function HasLearnableTalentOption() {
    for (var i = 1; i <= 4; i++) {
        var a = FindDotaHudElement('talent_tree_' + i + 'a');
        var b = FindDotaHudElement('talent_tree_' + i + 'b');
        if (a && a.BHasClass('learnable')) { return true; }
        if (b && b.BHasClass('learnable')) { return true; }
    }
    return false;
}

// 点完一个天赋后，只有"没有还亮着的可选项"时才关闭弹窗。
// 服务端的新状态是异步下发的：刚点完时面板上仍留着旧的 learnable，直接用会误判，
// 所以按 0.1 秒轮询复查（最多 0.5 秒），一旦发现确实没有可选项就关闭；
// 若一直还有可选项（或状态迟迟未刷新）就保持打开——宁可多开，不可误关。
GameEvents.Subscribe("choose_talent_result", SafeCallback("choose_talent_result", function () {
    var tries = 0;
    var check = function () {
        tries++;
        if (!HasLearnableTalentOption()) {
            HideTalentTreeBox();
            return;
        }
        if (tries < 5) {
            $.Schedule(0.1, check);
        }
    };
    $.Schedule(0.1, check);
}));

// 显示圣物剩余回合数的新UI
var pui = FindDotaHudElement('inventory_composition_layer_container');
if (pui) {
    var panel_relic_ttl = FindDotaHudElement('panel_relic_ttl');
    if (!panel_relic_ttl) {
        panel_relic_ttl = $.CreatePanel('Panel', pui, 'panel_relic_ttl', {
            style: 'width:45px;height:18px;flow-children:right;background-color:rgba(0,0,0,0.1);margin-bottom:98px;vertical-align:bottom;horizontal-align:center;',
        });
    }
    else {
        panel_relic_ttl.RemoveAndDeleteChildren();
    }
    var panel_relic_show = FindDotaHudElement('panel_relic_show');
    if (!panel_relic_show) {
        panel_relic_show = $.CreatePanel('Panel', pui, 'panel_relic_show', {
            style: 'width:40px;height:40px;flow-children:right;background-color:rgba(0,0,0,0.0);margin-bottom:55px;vertical-align:bottom;horizontal-align:center;',
        });
    }
    else {
        panel_relic_show.RemoveAndDeleteChildren();
    }

    var panel_relic_ttl_inner = $.CreatePanel('Panel', panel_relic_ttl, 'panel_relic_ttl_inner', {
        style: 'flow-children:right;horizontal-align:center;vertical-align:center;',
    });
    $.CreatePanel('Image', panel_relic_ttl_inner, '', {
        src: 'file://{images}/custom_game/ttl.png',
        style: 'width:12px;height:12px;margin-left:2px;margin-right:2px;vertical-align:center;opacity:0.5;',
    });
    $.CreatePanel('Label', panel_relic_ttl_inner, 'text_relic_ttl', {
        text: '0',
        style: 'font-size:14px;color:#bbb;font-family:titleFont;font-weight:bold;vertical-align:center;margin-top:0px;'
    });

    panel_relic_ttl.SetPanelEvent("onmouseover",
        function () {
            $.DispatchEvent("DOTAShowTextTooltip", FindDotaHudElement('panel_relic_ttl'), $.Localize('#text_relic_ttl'));
        }
    );
    panel_relic_ttl.SetPanelEvent("onmouseout",
        function () {
            $.DispatchEvent("DOTAHideTextTooltip");
        }
    );
    HideRelicTTL();
    ClearRelicTTL();
}
function UpdateRelicTTL(ttl) {
    var t = FindDotaHudElement('text_relic_ttl');
    var inner = FindDotaHudElement('panel_relic_ttl_inner');
    if (t && inner) {
        t.text = ttl || '0';
        inner.style['opacity'] = 1;
    }
}
function ClearRelicTTL(ttl) {
    var t = FindDotaHudElement('text_relic_ttl');
    var inner = FindDotaHudElement('panel_relic_ttl_inner');
    if (t && inner) {
        inner.style['opacity'] = 0;
    }
}
function ShowRelicTTL() {
    var p = FindDotaHudElement('panel_relic_ttl');
    if (p) {
        p.style['opacity'] = 1;
    }
    HudStyle('panel_relic_show', 'opacity', 1);
}
function HideRelicTTL() {
    var p = FindDotaHudElement('panel_relic_ttl');
    if (p) {
        p.style['opacity'] = 0;
    }
    HudStyle('panel_relic_show', 'opacity', 0);
}
function UpdateMyMoney(keys) {
    if (keys.gold || keys.gold == 0) {
        MY_GOLD = keys.gold || 0;
    }
    if (keys.rm_token || keys.rm_token == 0) {
        MY_RM_TOKEN = keys.rm_token || 0;
    }
    if (keys.common_token || keys.common_token == 0) {
        MY_COMMON_TOKEN = keys.common_token || 0;
    }
    if (keys.gold_token || keys.gold_token == 0) {
        MY_GOLD_TOKEN = keys.gold_token || 0;
    }
    set_draw_card_status();
}

// 适应特殊屏幕分辨率 
AutoZoomScreenWidthHeight();
function AutoZoomScreenWidthHeight() {
    var w = Game.GetScreenWidth();
    var h = Game.GetScreenHeight();
    if (w / h == 16 / 10) {
        $('#board_right').SetHasClass('wh1610', true);
    }
    else {
        $('#board_right').SetHasClass('wh1610', false);
    }
}

function IsShopV5ItemMoneyEnough(one) {
    if (!one || !one.money) {
        return false;
    }
    if (one.money == 'candy') {
        var price = one.price || 0;
        if (MY_CANDY >= price) {
            return true;
        }
        else {
            return false;
        }
    }
    if (one.money == 'biscuit') {
        var price = one.price || 0;
        if (MY_BISCUIT >= price) {
            return true;
        }
        else {
            return false;
        }
    }
}




var IS_PREVIEW_CD = false;
function preview_effect(e, goods) {
    if (IS_PREVIEW_CD) {
        OnMima({ text: 'text_please_preview_later', key: CLIENT_KEY });
        return;
    }
    IS_PREVIEW_CD = true;

    ShowStore(false);
    GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));

    GameEvents.SendCustomGameEventToServer("preview_effect", { "hero_index": Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), "effect": goods });

    ToggleViewCamera(true, $.Localize('#camera_preview') + $.Localize('#' + goods));

    $.Schedule(10, function () {
        IS_PREVIEW_CD = false;
    });
}
function preview_projectile(e, goods) {
    if (IS_PREVIEW_CD) {
        OnMima({ text: 'text_please_preview_later', key: CLIENT_KEY });
        return;
    }
    IS_PREVIEW_CD = true;

    ShowStore(false);
    GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));

    GameEvents.SendCustomGameEventToServer("preview_projectile", { "hero_index": Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), "projectile": goods });

    ToggleViewCamera(true, $.Localize('#camera_preview') + $.Localize('#' + goods));

    $.Schedule(10, function () {
        IS_PREVIEW_CD = false;
    });
}
function preview_animation(e, goods) {
    if (IS_PREVIEW_CD) {
        OnMima({ text: 'text_please_preview_later', key: CLIENT_KEY });
        return;
    }
    IS_PREVIEW_CD = true;

    ShowStore(false);
    GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));

    GameEvents.SendCustomGameEventToServer("preview_animation", { "hero_index": Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), "animation": goods });

    ToggleViewCamera(true, $.Localize('#camera_preview') + $.Localize('#' + goods));

    $.Schedule(10, function () {
        IS_PREVIEW_CD = false;
    });
}

function OnShowCameraText(text) {
    $('#text_panel_camera').text = text;
    $('#panel_camera').SetHasClass('invisible', false);
}
function OnHideCameraText() {
    $('#text_panel_camera').text = '';
    $('#panel_camera').SetHasClass('invisible', true);
}

function UpdateMyRelicShow(name) {
    var panel_relic_show = FindDotaHudElement('panel_relic_show');
    if (!panel_relic_show) {
        return;
    }
    else {
        panel_relic_show.RemoveAndDeleteChildren();
    }
    $.CreatePanel('DOTAItemImage', panel_relic_show, undefined, {
        itemname: name,
    });
}


function OnShowDamageStat(keys) {
    // if (!CheckClientKey(keys.key)) return;
    var damage_table = keys.damage_table;
    $("#board_left").SetHasClass('invisible', false);

    if ($('#panel_damage_stat_title')) {
        $('#panel_damage_stat_title').SetHasClass('invisible', false);

        if (IsOBing() == true) {
            if (keys.player_id != null) {
                $('#text_damage_stat_title').text = $.Localize('#text_chess_damage_stat') + ' (' + (Players.GetPlayerName(keys.player_id) || '???') + ')';
            }
            else {
                $('#text_damage_stat_title').text = '';
                for (var k = 0; k < 10; k++) {
                    $("#panel_damage_stat_" + k).SetHasClass('invisible', true);
                    $("#panel_damage_stat_text_per_" + k).style['color'] = "#bbb";
                }
                return;
            }
        }
        else {
            $('#text_damage_stat_title').text = $.Localize('#text_chess_damage_stat');
        }
    }
    for (var k = 0; k < 10; k++) {
        $("#panel_damage_stat_" + k).SetHasClass('invisible', true);
        $("#panel_damage_stat_text_per_" + k).style['color'] = "#bbb";
    }
    var damages = [];
    var total_damage = 0;
    if (damage_table) {
        for (var i in damage_table) {
            var info = damage_table[i];
            total_damage += parseInt(info['total'] || 0);

            damages.push({
                index: i,
                unit_name: info['unit_name'],
                total: info['total'] || 0,
                magical: info['magical'] || 0,
                physical: info['physical'] || 0,
                pure: info['pure'] || 0,
            });
        }
    }
    if (total_damage <= 0) {
        return;
    }
    damages.sort(function (a, b) { return b.total - a.total; });

    var total_width = 250;
    if (damages.length <= 1) {
        total_width = 150;
    }
    if (damages.length == 2) {
        total_width = 200;
    }

    for (var j = 0; j < damages.length; j++) {
        if (j >= 10) break;

        if (!damages[j]) {
            continue;
        }

        var color = '#fff';
        var n = $.Localize('#' + damages[j].unit_name);
        var d = Math.floor(damages[j].total);
        var unit_index = damages[j].index;

        $("#panel_damage_stat_" + j).SetHasClass('invisible', false);
        $("#panel_damage_stat_bar_physical_" + j).style['width'] = '' + Math.floor(damages[j].physical / total_damage * total_width) + 'px';
        $("#panel_damage_stat_bar_pure_" + j).style['width'] = '' + Math.floor(damages[j].pure / total_damage * total_width) + 'px';
        $("#panel_damage_stat_bar_magical_" + j).style['width'] = '' + Math.floor(damages[j].magical / total_damage * total_width) + 'px';
        $("#panel_damage_stat_text_" + j).text = n;
        $("#panel_damage_stat_text_" + j).style['color'] = color;
        $("#panel_damage_stat_text_per_" + j).text = d;//'('+d+')';
    }

    OnTestLegendary();
}

// 观战显示伤害统计
if (IsOBing() == true) {
    OBSyncCurrCameraChessBoard();
}
function OBSyncCurrCameraChessBoard() {
    $.Schedule(2, function () {
        OBSyncCurrCameraChessBoard();
    });
    GameEvents.SendCustomGameEventToServer("request_damage_stat", {
        "team_id": CURR_CAMERA_TEAM_ID,
    });
}

// 移动视角自动开关战争迷雾
SyncCurrCameraChessBoard();
function SyncCurrCameraChessBoard() {
    $.Schedule(0.5, function () {
        SyncCurrCameraChessBoard();
    });
    if (IS_CAMERA_MOVING == true) {
        return;
    }
    var pos = GameUI.GetCameraPosition();

    // 找到最近的一个棋盘
    var length = 9999;
    var curr_team = Players.GetTeam(Players.GetLocalPlayer());
    for (var i = 6; i <= 14; i++) {
        var l = GetLength2D(pos, CENTER_ENTITY_INDEX[i]);
        if (l < length) {
            curr_team = i;
            length = l;
        }
    }
    // $.Msg('队伍'+curr_team+'最近！！');
    // $.Msg(CURR_CAMERA_TEAM_ID);
    if (CURR_CAMERA_TEAM_ID != curr_team) {

        for (var i = 0; i <= 11; i++) {
            if (Players.GetTeam(i) == curr_team) {
                CURR_CAMERA_PLAYER_ID = i;
                CURR_CAMERA_TEAM_ID = curr_team;
                ChangeCameraChessboard();
                return;
            }
            if (curr_team == 14) {
                CURR_CAMERA_PLAYER_ID = 8;
                CURR_CAMERA_TEAM_ID = 14;
                ChangeCameraChessboard();
                return;
            }

        }
    }
}

function ChangeCameraChessboard() {
    GameEvents.SendCustomGameEventToServer("reset_fow", {
        "local_player_team": Players.GetTeam(Players.GetLocalPlayer()),
        "target_player_team": CURR_CAMERA_TEAM_ID,
    });
    GameEvents.SendCustomGameEventToServer("request_damage_stat", {
        "team_id": CURR_CAMERA_TEAM_ID,
    });
}

function DoubleCoinComfirm(keys) {
    if (!CheckClientKey(keys.key)) return;
    var transfer_hp = parseInt(keys.result.transfer_hp);
    var transfer_gold = parseInt(keys.result.transfer_gold);
    if (keys.result.hp > keys.result.gold) {
        var textstr = $.Localize('#text_confirm_double_coin').replace('%s1', transfer_hp + ' ' + $.Localize('#text_courier_health')).replace('%s2', transfer_gold + ' ' + $.Localize('#text_money_gold'));
    }
    else {
        var textstr = $.Localize('#text_confirm_double_coin').replace('%s1', transfer_gold + ' ' + $.Localize('#text_money_gold')).replace('%s2', transfer_hp + ' ' + $.Localize('#text_courier_health'));
    }
    show_confirm(textstr, function () {
        close_confirm();
        GameEvents.SendCustomGameEventToServer("item_double_coin", {});
    });
}

function close_panel_host() {
    $('#panel_host').style['position'] = '-500px 0px 0px';
}

function close_panel_gameover() {
    $('#panel_gameover').style['position'] = '-500px 0px 0px';
}

function ShowMatchHistory(myinfo, curr_season) {
    if (!curr_season) {
        curr_season = 's21';
    }
    var match_history = myinfo.match_history;

    $('#ranking_self_empty').visible = false;

    var steam_id = myinfo.steam_id || Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
    $('#ranking_self_avatar').steamid = steam_id;
    $('#ranking_self_top_right_name_username').steamid = steam_id;
    $('#ranking_self_top_right_name_steam_id_label').text = 'Steam ID: ' + steam_id;

    $('#ranking_self_top_right_tag_chikens').text = ' × ' + (myinfo.chicken_count || 0);

    var max_mmr_season = parseInt(myinfo['max_mmr_' + curr_season] || 0);
    var match_season = parseInt(myinfo['match_' + curr_season] || 0);
    var max_level_season = GetMMRLevelByScore(max_mmr_season, match_season);
    // 我的战绩-最高段位
    $('#ranking_self_level_season').SetHasClass('invisible', false);
    $('#img_ranking_self_level_season').style['background-image'] = 'url("file://{images}/custom_game/level_' + max_level_season + '.png")';
    $('#text_ranking_self_level_season').text = $.Localize('#' + 'text_player_level_' + max_level_season);
    if (max_level_season > 0) {
        $('#text_ranking_self_level_season').style['color'] = '#fff';
    }

    // 天梯场次
    $('#ranking_self_top_right_tag_match').text = match_season || 0;

    // 吃鸡率
    if (!match_season) {
        $('#ranking_self_top_right_tag_chikens_per').text = '(0%)';
    }
    else {
        var chikens_per = (myinfo.chicken_count / match_season).toFixed(2) * 100;
        chikens_per = chikens_per.toFixed(0);
        $('#ranking_self_top_right_tag_chikens_per').text = '(' + chikens_per + '%)';
    }


    // 场均排名
    if (myinfo.match_history && myinfo.match_history.length > 0) {
        var rank_all = 0;
        var rank_count = 0;
        for (var i = 0; i < myinfo.match_history.length; i++) {
            var rank = myinfo.match_history[i].game_info.rank || 8;
            rank_all += rank;
            rank_count++;
        }
        var ave_rank = (rank_all / rank_count).toFixed(1);
        $('#ranking_self_top_right_tag_ave_rank').text = '#' + ave_rank;
    }
    else {
        $('#ranking_self_top_right_tag_ave_rank').text = '-';
    }

    $('#ranking_self_list').RemoveAndDeleteChildren();
    if (!match_history || match_history.length <= 0) {
        var panel = $.CreatePanel('Panel', $('#ranking_self_list'), '', {
            style: 'width:100%;height:80px;flow-children:right;margin-top:5px;background-color:#222;overflow:clip clip;',
        });
        $.CreatePanel('Label', panel, "", {
            text: '暂无比赛记录',
            style: 'font-size:20px;color:#444;horizontal-align:center;vertical-align:center;margin-left:20px;',
        });
        return;
    }
    var favorite_chess = {};
    var favorite_synergy = {};
    var favorite_relic = {};
    for (i = 0; i < match_history.length; i++) {
        var panel_class = '';
        var match = match_history[i];
        if (match.game_info.is_test || !match.mmr_info.k) {
            panel_class = 'casual';
        }
        var panel = $.CreatePanel('Panel', $('#ranking_self_list'), "match_" + i, {
            style: 'width:100%;height:80px;flow-children:right;margin-top:5px;background-color:gradient( linear, 0% 0%, 100% 0%, from( #49497044 ), to( #39397000 ) );overflow:clip clip;',
            class: panel_class,
        });

        // 排名和比赛时间戳
        var block1 = $.CreatePanel('Panel', panel, "", {
            style: 'width:90px;height:100%;flow-children:down;margin-left:20px;padding-top:10px;',
        });
        var block1_top = $.CreatePanel('Panel', block1, "", {
            style: 'width:100%;height:50px;flow-children:right;',
        });
        $.CreatePanel('Label', block1_top, "", {
            text: '#',
            style: 'color:#ddd;font-size:30px;vertical-align:bottom;margin-bottom:0px;',
        });
        $.CreatePanel('Label', block1_top, "", {
            text: match.game_info.rank,
            style: 'color:#ffff88;font-size:50px;vertical-align:bottom;font-weight:bold;',
        });
        $.CreatePanel('Label', block1_top, "", {
            text: '/' + match.game_info.player_count,
            style: 'color:#ddd;font-size:30px;vertical-align:bottom;margin-bottom:0px;',
        });
        $.CreatePanel('Label', block1, "", {
            style: 'color:#888;font-size:16px;vertical-align:bottom;margin-bottom:5px;horizontal-align:left;margin-left:0px;font-style:italic;',
            text: format_time(match.time),
        });

        // 信使
        var block7 = $.CreatePanel('Panel', panel, "", {
            style: 'width:40px;height:100%;vertical-align:center;margin-left:10px;flow-children:down;',
        });
        var block7_container = $.CreatePanel('Panel', block7, "", {
            style: 'vertical-align:center;horizontal-align:left;flow-children:down;',
        });
        if (match.exp_info && match.exp_info.courier) {
            $.CreatePanel('Image', block7_container, "", {
                style: 'width:35px;height:35px;',
                src: 'file://{images}/custom_game/skaters/' + match.exp_info.courier + '.png',
            });
            $.CreatePanel('Label', block7_container, "", {
                text: 'Lv.' + match.exp_info.level_new,
                style: 'font-size:18px;color:#bbb;horizontal-align:center;font-style:italic;margin-top:5px;',
            });
        }

        // 人口
        var block2 = $.CreatePanel('Panel', panel, "", {
            style: 'width:50px;height:50px;border-radius:25px;border:4px solid #222;background-color:rgba(0,0,0,0.5);vertical-align: center;margin-left:10px;',
        });
        $.CreatePanel('Label', block2, "", {
            text: match.game_info.population,
            style: 'text-shadow:0px 0px 3px 3.7 #EC780E24;color:#E7D291;vertical-align:center;horizontal-align:center;font-size:28px;',
        });

        // 棋子阵容
        var block3 = $.CreatePanel('Panel', panel, "", {
            style: 'width:320px;height:100%;vertical-align: center;margin-left:15px;',
        });
        var block3_container = $.CreatePanel('Panel', block3, "", {
            style: 'vertical-align:center;horizontal-align:left;flow-children:right-wrap;',
        });
        var lineup = match.game_info.chess_lineup.split(',');
        lineup.sort(function (a, b) {
            var score_b = 0;
            var score_a = 0;

            if (a.indexOf('11') > -1) {
                score_a += 10000;
            }
            if (b.indexOf('11') > -1) {
                score_b += 10000;
            }
            if (a.indexOf('1') > -1) {
                score_a += 100;
            }
            if (b.indexOf('1') > -1) {
                score_b += 100;
            }
            score_a += get_chess_cost(a);
            score_b += get_chess_cost(b);

            return score_b - score_a;
        });
        if (lineup && lineup.length > 0) {
            for (var l = 0; l < lineup.length; l++) {
                var block3_container_chess = $.CreatePanel('Panel', block3_container, "", {
                    style: 'width:32px;height:40px;flow-children:down;',
                });
                var chess = lineup[l];
                var chess_ori = chess;
                var chess_star = 1;
                var chess_star_str = "■";
                var chess_count = 1;

                if (chess.indexOf('11') > -1) {
                    chess_star = 3;
                    chess_star_str = "■■■";
                    chess = chess.substr(0, chess.length - 2);
                    chess_count = 9;
                }
                if (chess.indexOf('1') > -1) {
                    chess_star_str = "■■";
                    chess_star = 2;
                    chess = chess.substr(0, chess.length - 1);
                    chess_count = 3;
                }
                var chess_name = CHESS_2_HERO[chess];
                if (!favorite_chess[chess]) {
                    favorite_chess[chess] = chess_count;
                }
                else {
                    favorite_chess[chess] += chess_count;
                }

                if (chess_name) {
                    $.CreatePanel('DOTAHeroImage', block3_container_chess, "", {
                        heroname: chess_name,
                        heroimagestyle: 'icon',
                        onmouseover: 'DOTAShowTextTooltip(\'' + $.Localize('#' + chess_ori) + '\')',
                        onmouseout: 'DOTAHideTextTooltip()',
                    });
                    $.CreatePanel('Label', block3_container_chess, "", {
                        text: chess_star_str,
                        style: 'font-size:9px;color:' + (LEVEL_2_COLOR[CHESS_2_LEVEL[chess]] || '#fff') + ';text-align:center;line-height: 9px;horizontal-align:center;text-shadow:0px 0px 2px 2 #000000;',
                    });
                }
            }
        }


        // 羁绊
        var block4 = $.CreatePanel('Panel', panel, "", {
            style: 'width:210px;height:100%;vertical-align: center;margin-left:20px;',
        });
        var block4_container = $.CreatePanel('Panel', block4, "", {
            style: 'vertical-align:center;horizontal-align:left;flow-children:right-wrap;',
        });

        if (match.game_info.synergy) {
            var synergy = match.game_info.synergy.split(',');
            for (var l = 0; l < synergy.length; l++) {
                var s = synergy[l];
                var buff_name = '';
                var buff_count = 0;
                if (s.indexOf('11') > -1) {
                    buff_name = s.substr(0, s.length - 2);
                    buff_index = 2;
                }
                else if (s.indexOf('1') > -1) {
                    buff_name = s.substr(0, s.length - 1);
                    buff_index = 1;
                }
                else {
                    buff_name = s;
                    buff_index = 0;
                }

                if (BUFF_LIST_1[buff_name]) {
                    buff_count = BUFF_LIST_1[buff_name][buff_index] || 0;
                }
                if (BUFF_LIST_2[buff_name]) {
                    buff_count = BUFF_LIST_2[buff_name][buff_index] || 0;
                }

                if (!favorite_synergy[buff_name]) {
                    favorite_synergy[buff_name] = buff_count;
                }
                else {
                    favorite_synergy[buff_name] += buff_count;
                }

                var block4_container_buff = $.CreatePanel('Panel', block4_container, "", {
                    style: 'width:35px;height:48px;flow-children:down;margin-top:0px;',
                });
                $.CreatePanel('DOTAAbilityImage', block4_container_buff, "", {
                    abilityname: buff_name,
                    style: 'width:30px;height:30px;',
                    onmouseover: 'DOTAShowAbilityTooltip(\'' + buff_name + '\')',
                    onmouseout: 'DOTAHideAbilityTooltip()',
                });
                $.CreatePanel('Label', block4_container_buff, "", {
                    text: '(' + buff_count + ')',
                    style: 'font-size:18px;margin-top:0px;color:#ddd;horizontal-align:center;',
                });
            }
        }

        


        // 圣物
        var block45 = $.CreatePanel('Panel', panel, "", {
            style: 'width:160px;height:100%;vertical-align: center;margin-left:20px;',
        });
        var block45_container = $.CreatePanel('Panel', block45, "", {
            style: 'vertical-align:center;horizontal-align:left;flow-children:down-wrap;',
        });
        if (match.game_info.relic_history){
            var relic_history_arr = match.game_info.relic_history.split(',');
            // $.Msg(relic_history_arr);
            for (var iii=0;iii<relic_history_arr.length;iii++){
                var relic_name = relic_history_arr[iii];
                if (relic_name){
                    $.CreatePanel('DOTAItemImage', block45_container, "", {
                        itemname: relic_name,
                        style: 'width:35px;height:25px;margin:3px;'
                    });
                }
                if (!favorite_relic[relic_name]) {
                    favorite_relic[relic_name] = 1;
                }
                else {
                    favorite_relic[relic_name] += 1;
                }
            }
        }
        



        // 金币/胜负
        var block5 = $.CreatePanel('Panel', panel, "", {
            style: 'width:60px;height:100%;vertical-align: center;margin-left:10px;flow-children:down;',
        });
        var block5_container = $.CreatePanel('Panel', block5, "", {
            style: 'vertical-align:center;horizontal-align:left;flow-children:down;',
        });
        $.CreatePanel('Label', block5_container, "", {
            text: match.game_info.total_money ? '$' + match.game_info.total_money : '-',
            style: 'font-size:26px;color:#ffff88;horizontal-align:center;font-weight:bold;',
        });
        $.CreatePanel('Label', block5_container, "", {
            text: (match.game_info.win_round || 0) + '-' + (match.game_info.lose_round || 0),
            style: 'font-size:22px;color:#ddd;horizontal-align:center;',
        });

        // 段位/糖果/甜甜圈
        var block6 = $.CreatePanel('Panel', panel, "", {
            style: 'width:130px;height:100%;vertical-align: center;margin-left:10px;flow-children:down;',
        });
        var block6_container = $.CreatePanel('Panel', block6, "", {
            style: 'vertical-align:center;horizontal-align:center;flow-children:down;',
        });

        // if (match.game_info.is_test) {
        //     // 内测/糖果
        //     $.CreatePanel('Label', block6_container, "", {
        //         text: $.Localize('#text_test_match'),
        //         style: 'font-size:18px;color:#bbbbff;horizontal-align:center;',
        //     });
        // }

        if (!match.mmr_info.k) {
            // 不计段位的，休闲/糖果
            var mode_text = '';
            if (match.game_info.is_test) {
                mode_text += $.Localize('#text_test_match') + '/';
            }
            if (match.map && match.map == 'candy_5_1x8') {
                mode_text += $.Localize('#candy_match');
            }
            else {
                mode_text += $.Localize('#text_casual_match');
            }
            $.CreatePanel('Label', block6_container, "", {
                text: mode_text,
                style: 'font-size:18px;color:#bbbbff;horizontal-align:center;',
            });
        }
        else {
            // 段位
            var block6_rank_container = $.CreatePanel('Panel', block6_container, "", {
                style: 'vertical-align:center;horizontal-align:center;flow-children:right;',
            });
            var level = match.mmr_info.level || 0;
            $.CreatePanel('Image', block6_rank_container, "", {
                style: 'width:25px;height:25px;margin-top:-1px;',
                src: 'file://{images}/custom_game/level_' + level + '.png',
            });
            var color = '#fff';
            if (level <= 0) {
                var color = '#888';
            }
            $.CreatePanel('Label', block6_rank_container, "", {
                text: $.Localize('#' + 'text_player_level_' + level),
                style: 'font-size:18px;color:' + color + ';horizontal-align:center;vertical-align:center;',
            });
            if (match.mmr_info.delta_jiantou) {
                var color = '#88ff88';
                if (match.mmr_info.mmr_delta < 0) {
                    var color = '#ff0000';
                }
                $.CreatePanel('Label', block6_rank_container, "", {
                    text: match.mmr_info.delta_jiantou,
                    style: 'font-size:14px;color:' + color + ';horizontal-align:center;vertical-align:center;',
                });
            }
        }

        if (match.award_info.candy) {
            var block6_candy_container = $.CreatePanel('Panel', block6_container, "", {
                style: 'vertical-align:center;horizontal-align:center;flow-children:right;',
            });
            $.CreatePanel('Image', block6_candy_container, "", {
                style: 'width:25px;height:25px;margin-right:5px;',
                src: 'file://{images}/custom_game/candy.png',
            });
            if (match.award_info.candy) {
                if (match.award_info.candy > 0) {
                    $.CreatePanel('Label', block6_candy_container, "", {
                        text: '+ ' + match.award_info.candy,
                        style: 'font-size:20px;color:#88ff88;horizontal-align:center;vertical-align:center;',
                    });
                }
                else {
                    $.CreatePanel('Label', block6_candy_container, "", {
                        text: '- ' + (-match.award_info.candy),
                        style: 'font-size:20px;color:#ff4444;horizontal-align:center;vertical-align:center;',
                    });
                }
            }
        }
        if (match.award_info.biscuit) {
            var block6_biscuit_container = $.CreatePanel('Panel', block6_container, "", {
                style: 'vertical-align:center;horizontal-align:center;flow-children:right;',
            });
            $.CreatePanel('Image', block6_biscuit_container, "", {
                style: 'width:25px;height:25px;margin-right:5px;',
                src: 'file://{images}/custom_game/award_biscuit.png',
            });
            $.CreatePanel('Label', block6_biscuit_container, "", {
                text: '+ ' + match.award_info.biscuit,
                style: 'font-size:20px;color:#88ff88;horizontal-align:center;vertical-align:center;',
            });
        }
    }

    // 统计偏爱棋子
    var favorite_chess_arr = [];
    for (var k in favorite_chess) {
        favorite_chess_arr.push({
            chess: k,
            count: favorite_chess[k] || 0,
        });
    }
    favorite_chess_arr.sort(function (a, b) {
        return b.count - a.count;
    });
    var my_favorite_chess = favorite_chess_arr[0].chess;
    var my_favorite_chess_hero = CHESS_2_HERO[my_favorite_chess];
    $('#icon_ranking_self_top_right_tag_favorite_chess').heroname = my_favorite_chess_hero;
    $('#icon_ranking_self_top_right_tag_favorite_chess').SetPanelEvent("onmouseover",
        function () {
            $.DispatchEvent("DOTAShowTextTooltip", $('#icon_ranking_self_top_right_tag_favorite_chess'), $.Localize('#' + my_favorite_chess));
        }
    );
    $('#icon_ranking_self_top_right_tag_favorite_chess').SetPanelEvent("onmouseout",
        function () {
            $.DispatchEvent("DOTAHideTextTooltip");
        }
    );

    // 统计偏爱羁绊
    var favorite_synergy_arr = [];
    for (var k in favorite_synergy) {
        favorite_synergy_arr.push({
            synergy: k,
            count: favorite_synergy[k] || 0,
        });
    }
    favorite_synergy_arr.sort(function (a, b) {
        return b.count - a.count;
    });
    var my_favorite_synergy = favorite_synergy_arr[0].synergy;
    $('#icon_ranking_self_top_right_tag_favorite_synergy').abilityname = my_favorite_synergy;
    $('#icon_ranking_self_top_right_tag_favorite_synergy').SetPanelEvent("onmouseover",
        function () {
            $.DispatchEvent("DOTAShowAbilityTooltip", $('#icon_ranking_self_top_right_tag_favorite_synergy'), my_favorite_synergy);
        }
    );
    $('#icon_ranking_self_top_right_tag_favorite_synergy').SetPanelEvent("onmouseout",
        function () {
            $.DispatchEvent("DOTAHideAbilityTooltip");
        }
    );

    // 统计偏爱圣物
    // var favorite_relic_arr = [];
    // for (var k in favorite_relic) {
    //     favorite_relic_arr.push({
    //         relic: k,
    //         count: favorite_relic[k] || 0,
    //     });
    // }
    // favorite_relic_arr.sort(function (a, b) {
    //     return b.count - a.count;
    // });
    // var my_favorite_relic = favorite_relic_arr[0].relic;
    // $('#icon_ranking_self_top_right_tag_favorite_relic').itemname = my_favorite_relic;
    // $('#icon_ranking_self_top_right_tag_favorite_relic').SetPanelEvent("onmouseover",
    //     function () {
    //         $.DispatchEvent("DOTAShowAbilityTooltip", $('#icon_ranking_self_top_right_tag_favorite_relic'), my_favorite_synergy);
    //     }
    // );
    // $('#icon_ranking_self_top_right_tag_favorite_relic').SetPanelEvent("onmouseout",
    //     function () {
    //         $.DispatchEvent("DOTAHideAbilityTooltip");
    //     }
    // );


    // if (myinfo.casino_count) {
    //     $('#ranking_self_top_right_tag_casino_count').text = myinfo.casino_count + '/5';
    //     if (parseInt(myinfo.casino_count) >= 5) {
    //         $('#ranking_self_top_right_tag_casino_claim').SetHasClass('invisible', false);
    //     }
    //     else {
    //         $('#ranking_self_top_right_tag_casino_claim').SetHasClass('invisible', true);
    //     }
    // }
    // else {
    //     $('#ranking_self_top_right_tag_casino_count').text = '0/5';
    // }

    if (myinfo.leaderboard_info && myinfo.leaderboard_info.leaderboard_lineup_value_info){
        var leaderboard_lineup_value_info = myinfo.leaderboard_info.leaderboard_lineup_value_info;
        var lineup_value = leaderboard_lineup_value_info.lineup_value || 0;
        var lineup_str = leaderboard_lineup_value_info.lineup || '';
        $('#ranking_self_leaderboard_max_lineup_value').text = lineup_value;
        $('#panel_season_max_lineup_value_container').RemoveAndDeleteChildren();
        if (lineup_value > 0){
            // 显示棋子阵容
            ShowLineup($('#panel_season_max_lineup_value_container'), lineup_str);   
        }
    }
    if (myinfo.leaderboard_info && myinfo.leaderboard_info.leaderboard_mvp_chess_info){
        var leaderboard_mvp_chess_info = myinfo.leaderboard_info.leaderboard_mvp_chess_info;
        var mvp_damage = leaderboard_mvp_chess_info.damage || 0;
        var mvp_name = leaderboard_mvp_chess_info.name || '';
        var mvp_item = leaderboard_mvp_chess_info.item || '';
        $('#ranking_self_leaderboard_max_mvp_damage').text = mvp_damage;
        $('#panel_season_max_mvp_chess_container').RemoveAndDeleteChildren();
        if (mvp_damage > 0){
            // 显示MVP棋子
            ShowMvpChess($('#panel_season_max_mvp_chess_container'), mvp_name, mvp_item);
        }
    }
}

function ShowLineup(panel, lineup_str){ 
    var block3 = $.CreatePanel('Panel', panel, "", {
        style: 'width:600px;height:100%;vertical-align: center;margin-left:0px;',
    });
    var block3_container = $.CreatePanel('Panel', block3, "", {
        style: 'vertical-align:center;horizontal-align:left;vertical-align: center;flow-children:right-wrap;',
    });
    var lineup = lineup_str.split(',');
    lineup.sort(function (a, b) {
        var score_b = 0;
        var score_a = 0;

        if (a.indexOf('11') > -1) {
            score_a += 10000;
        }
        if (b.indexOf('11') > -1) {
            score_b += 10000;
        }
        if (a.indexOf('1') > -1) {
            score_a += 100;
        }
        if (b.indexOf('1') > -1) {
            score_b += 100;
        }
        score_a += get_chess_cost(a);
        score_b += get_chess_cost(b);

        return score_b - score_a;
    });
    if (lineup && lineup.length > 0) {
        for (var l = 0; l < lineup.length; l++) {
            var block3_container_chess = $.CreatePanel('Panel', block3_container, "", {
                style: 'width:36px;height:45px;flow-children:down;vertical-align: center;',
            });
            var chess = lineup[l];
            var chess_ori = chess;
            var chess_star = 1;
            var chess_star_str = "■";
            var chess_count = 1;

            if (chess.indexOf('11') > -1) {
                chess_star = 3;
                chess_star_str = "■■■";
                chess = chess.substr(0, chess.length - 2);
                chess_count = 9;
            }
            if (chess.indexOf('1') > -1) {
                chess_star_str = "■■";
                chess_star = 2;
                chess = chess.substr(0, chess.length - 1);
                chess_count = 3;
            }
            var chess_name = CHESS_2_HERO[chess];

            if (chess_name) {
                $.CreatePanel('DOTAHeroImage', block3_container_chess, "", {
                    heroname: chess_name,
                    heroimagestyle: 'icon',
                    onmouseover: 'DOTAShowTextTooltip(\'' + $.Localize('#' + chess_ori) + '\')',
                    onmouseout: 'DOTAHideTextTooltip()',
                    style: 'width:36px;height:36px;',
                });
                $.CreatePanel('Label', block3_container_chess, "", {
                    text: chess_star_str,
                    style: 'font-size:9px;color:' + (LEVEL_2_COLOR[CHESS_2_LEVEL[chess]] || '#fff') + ';text-align:center;line-height: 9px;horizontal-align:center;text-shadow:0px 0px 2px 2 #000000;',
                });
            }
        }
    }
}

function ShowMvpChess(panel, name, item){
    var chess_ori = name;
    var chess_star_str = "■";
    var chess = chess_ori;

    if (chess_ori.indexOf('1') > -1) {
        chess_star_str = "■■";
        chess = chess_ori.substr(0, chess_ori.length - 1);
    }
    if (chess_ori.indexOf('11') > -1) {
        chess_star_str = "■■■";
        chess = chess_ori.substr(0, chess_ori.length - 2);
    }

    var chess_name = CHESS_2_HERO[chess];

    if (chess_name) {
        var block3_container_chess = $.CreatePanel('Panel', panel, "", {
            style: 'width:48px;height:50px;flow-children:down;vertical-align:center;margin-right:10px;',
        });
        $.CreatePanel('DOTAHeroImage', block3_container_chess, "", {
            heroname: chess_name,
            heroimagestyle: 'icon',
            onmouseover: 'DOTAShowTextTooltip(\'' + $.Localize('#' + chess_ori) + '\')',
            onmouseout: 'DOTAHideTextTooltip()',
            style: 'width:48px;height:48px;',
        });
        $.CreatePanel('Label', block3_container_chess, "", {
            text: chess_star_str,
            style: 'font-size:9px;color:' + (LEVEL_2_COLOR[CHESS_2_LEVEL[chess]] || '#fff') + ';text-align:center;line-height: 9px;margin-top:-5px;horizontal-align:center;text-shadow:0px 0px 2px 2 #000000;',
        });
    }

    if (item) {
        var item_list = item.split(',');
        for (ii=0;ii<=5;ii++){
            var item_one = item_list[ii];
            $.CreatePanel('DOTAItemImage', panel, "", {
                itemname: item_one,
                style: 'width:45px;height:35px;margin:3px;vertical-align:center;'
            });
        }
    }
}
// OnShow2bPer({per: 55});
function OnShow2bPer(keys){
    var per_2b = parseInt(keys.per);
    $('#text_talent_tree_2b').text = $.Localize('#talent_2b_description').replace('%per%',per_2b);
}


function tips_over_host(pos) {
    var text = $.Localize('#text_is_host').replace('<s1>',HOST_MATCH).replace('<s2>',HOST_CREDIT);
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize('#title_is_host'), text);
}
var HOST_MATCH = 0;
var HOST_CREDIT = 0;
function ShowHostInfo(){
    // host_info 这张表不一定会下发（非主机房 / 重连时还没推到 / 本局没有 host 信息），
    // 原来直接 data.host_playerid 会抛 TypeError 并让整段脚本被跳过（OnPlayerReconnect 里的后续都丢了）
    var data = CustomNetTables.GetTableValue("game_info", "host_info");
    if (!data || data.host_playerid === undefined || data.host_playerid === null) {
        return;
    }
    var player_index = GetPlayerIndexByPlayerID(data.host_playerid);
    if (player_index === undefined || player_index === null || player_index < 0) {
        return;
    }
    var host_panel = $('#panel_host_' + player_index);
    if (!host_panel) {
        return;
    }
    host_panel.SetHasClass('invisible', false);
    host_panel.style['position'] = '0px 0px 0px';
    HOST_MATCH = data.host_match;
    HOST_CREDIT = data.host_credit;

    if (typeof local_id !== 'undefined' && local_id == data.host_steamid){
        showPanelHost();
    }
}
// CustomGameEventManager:Send_ServerToAllClients("show_host_info", {
//     hehe = RandomFloat(1, 10000),
//     host_playerid = _G.host_player_id,
//     host_steamid = _G.host_steam_id,
//     host_match = t.host_info.host_match,
//     host_credit = math.floor(t.host_info.host_credit*100),
// })

function showPanelHost(){
    if (Game.GetMapInfo().map_display_name != 'ranked_1x8'){
        $('#panel_host').style['position'] = '0px 0px 0px';
    }
}


// 天梯模式不显示主机提示
var data = CustomNetTables.GetTableValue("game_info", "game_host_type");
if (data && data.game_host_type == 'server'){
    var host_panel_list = ["panel_host","panel_host_0","panel_host_1","panel_host_2","panel_host_3","panel_host_4","panel_host_5","panel_host_6","panel_host_7"]
    for (var i=0;i<host_panel_list.length;i++){
        if ($('#'+host_panel_list[i])){
            // $.Msg($('#'+host_panel_list[i]));
            $('#'+host_panel_list[i]).SetHasClass('opacity0',true);
        }
    }
}