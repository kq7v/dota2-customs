--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


// 由于AsyncWebRequest无了，使用lua转发http请求
var request_proxy_data_table = {};
var request_proxy_trycount_table = {};
GameEvents.Subscribe("response_proxy", OnResponseProxy);
function RequestProxy(url,cb){
	var r_id = Math.round(Math.random()*10000000);
	GameEvents.SendCustomGameEventToServer("request_proxy", { "requestid": r_id ,"url":url});
	request_proxy_trycount_table[r_id] = 20;
	ResponseHandler(r_id,cb);
}
function OnResponseProxy(keys){
	request_proxy_data_table[keys.requestid] = keys.data_table;
}
function ResponseHandler(requestid,cb){
	$.Schedule(0.5,function(){
		if (request_proxy_data_table[requestid] && cb){
			cb(request_proxy_data_table[requestid]);
			$.Schedule(5,function(){
				delete request_proxy_trycount_table[requestid];
				delete request_proxy_data_table[requestid];
			})
		}
		else if(request_proxy_trycount_table[requestid] > 0){
			request_proxy_trycount_table[requestid] --;
			ResponseHandler(requestid,cb);
		}
	})
}

Game.AddCommand("+CustomGameTestButton", OnTestButtonPressed, "", 0);

function OnTestButtonPressed() {
    open_heropool_board()
}

var VER = 'v1';
var IS_GAME_STARTED = false;
var end_game_extra_data = null;

// 移除天赋树、命石UI
FindDotaHudElement('StatBranch').style['width'] = '0';
FindDotaHudElement('ContentsContainer').style['opacity'] = '0';
FindDotaHudElement('ContentsContainer').style['width'] = '0px';
var xxx = FindDotaHudElement('AbilitiesAndStatBranch').FindChildrenWithClassTraverse('RootInnateDisplay');
for (var ii in xxx) {
    if (xxx[ii]) {
        xxx[ii].style['width'] = '0px';
    }
}

// 隐藏中立物品UI（20250219中立物品新改动：打造中立物品）
FindDotaHudElement('inventory_neutral_level_up').style['opacity'] = '0';
FindDotaHudElement('inventory_neutral_craft_holder').style['opacity'] = '0';
FindDotaHudElement('inventory_neutral_slot_container').style['opacity'] = '0';
FindDotaHudElement('RoshanTimerContainer').style['opacity'] = '0';

var tormentorTimer = FindDotaHudElement('DOTATormentorTimer');
if (tormentorTimer) {
    tormentorTimer.style['visibility'] = 'collapse';
    tormentorTimer.style['opacity'] = '0';
}

var tormentorTimerContainer = FindDotaHudElement('TormentorTimerContainer');
if (tormentorTimerContainer) {
    tormentorTimerContainer.style['visibility'] = 'collapse';
    tormentorTimerContainer.style['opacity'] = '0';
}

// 其他UI
FindDotaHudElement('abilities').style['margin-left'] = '15px';

FindDotaHudElement('ToggleScoreboardButton').style['opacity'] = '0';
FindDotaHudElement('scoreboard').style['margin-top'] = '104px';
FindDotaHudElement('scoreboard').style['z-index'] = '99999';
FindDotaHudElement('Main').style['opacity'] = '0';
FindDotaHudElement('shop_launcher_block').style['opacity'] = '0';
FindDotaHudElement('inventory_tpscroll_container').style['opacity'] = '0';
// FindDotaHudElement('DamageBreakdownRaw').style['opacity'] = '0';
FindDotaHudElement('RadarButton').style['opacity'] = '0';
FindDotaHudElement('GlyphScanContainer').style['opacity'] = '0';
FindDotaHudElement('TipContainer').style['opacity'] = '0';
FindDotaHudElement('PrevTip').style['opacity'] = '0';
FindDotaHudElement('NextTip').style['opacity'] = '0';
FindDotaHudElement('KillCam').style['opacity'] = '0';
FindDotaHudElement('quickstats').style['opacity'] = '0';
FindDotaHudElement('shop').style['vertical-align'] = 'bottom';
FindDotaHudElement('shop').style['margin-bottom'] = '-500px';
FindDotaHudElement('shop').style['margin-right'] = '150px';
FindDotaHudElement('GuideFlyout').style['opacity'] = '0';
FindDotaHudElement('ItemCombinesAndBasicItemsContainer').style['opacity'] = '0';
FindDotaHudElement('HUDSkinTopBarBG').style['width'] = '100%';
FindDotaHudElement('HUDSkinTopBarBG').style['height'] = '50px';
FindDotaHudElement('topbar').style['width'] = '100%';
FindDotaHudElement('HUDSkinAbilityContainerBG').style['width'] = '470px';
FindDotaHudElement('AghsStatusContainer').style['width'] = '0';
FindDotaHudElement('GridShopHeaders').style['opacity'] = '0';

// toggle_exchange();

var my_onduty_hero_id = "";
var my_hero_sea = {};
var my_hero_index = "";
var my_mmr_level = null;
var mmr_rank = [], mmr_per = [];
var is_recycle_opened = false;
var my_hero_i = 0;
var wo_shi_ji = 0;
var pcount;
var default_maze = [];
var shell = 0;
var STORE_LIST = [];
var bet_team = "";
var is_heropool_board_open = false;
var is_store_board_open = false;
var is_gameinfo_board_open = false;
var is_merge_board_open = false;
var is_ranking_board_open = false;
var is_friend_board_open = false;
var is_map_board_open = false;
var is_quest_board_open = false;
var is_bet_board_open = false;

var extend_tool = 0;

var is_rolling = false;
var local_id;
if (Game.GetPlayerInfo(Players.GetLocalPlayer())){
    local_id = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
}

// 表情列表
var EMOJI_LIST = {};
RequestProxy('http://gemtd.ppbizon.com/emoji/list?hehe='+Math.random(),function(object){
    if (object.err == 0) {
        EMOJI_LIST = object.data;
    }
});

var HERO_LIST = {
    h101: "npc_dota_hero_enchantress",
    h102: "npc_dota_hero_puck",
    h103: "npc_dota_hero_omniknight",
    h104: "npc_dota_hero_wisp",
    h105: "npc_dota_hero_ogre_magi",
    h106: "npc_dota_hero_lion",
    h107: "npc_dota_hero_keeper_of_the_light",
    h108: "npc_dota_hero_rubick",
    h109: "npc_dota_hero_jakiro",
    h110: "npc_dota_hero_sand_king",
    h111: "npc_dota_hero_ancient_apparition", //new
    h112: "npc_dota_hero_earth_spirit", //new

    h201: "npc_dota_hero_crystal_maiden",
    h202: "npc_dota_hero_death_prophet",
    h203: "npc_dota_hero_templar_assassin",
    h204: "npc_dota_hero_lina",
    h205: "npc_dota_hero_tidehunter",
    h206: "npc_dota_hero_naga_siren",
    h207: "npc_dota_hero_phoenix",
    h208: "npc_dota_hero_dazzle",
    h209: "npc_dota_hero_warlock",
    h210: "npc_dota_hero_necrolyte",
    h211: "npc_dota_hero_lich",
    h212: "npc_dota_hero_furion",
    h213: "npc_dota_hero_venomancer",
    h214: "npc_dota_hero_kunkka",
    h215: "npc_dota_hero_axe",
    h216: "npc_dota_hero_slark",
    h217: "npc_dota_hero_viper",
    h218: "npc_dota_hero_tusk",
    h219: "npc_dota_hero_abaddon",
    h220: "npc_dota_hero_winter_wyvern", //new
    h221: "npc_dota_hero_ember_spirit", //new

    h301: "npc_dota_hero_windrunner",
    h302: "npc_dota_hero_phantom_assassin",
    h303: "npc_dota_hero_sniper",
    h304: "npc_dota_hero_sven",
    h305: "npc_dota_hero_luna",
    h306: "npc_dota_hero_mirana",
    h307: "npc_dota_hero_nevermore",
    h308: "npc_dota_hero_queenofpain",
    h309: "npc_dota_hero_juggernaut",
    h310: "npc_dota_hero_pudge",
    h311: "npc_dota_hero_shredder",
    h312: "npc_dota_hero_slardar",
    h313: "npc_dota_hero_antimage",
    h314: "npc_dota_hero_bristleback",
    h315: "npc_dota_hero_lycan",
    h316: "npc_dota_hero_lone_druid",
    h317: "npc_dota_hero_storm_spirit", //new
    h318: "npc_dota_hero_obsidian_destroyer", //new
    h319: "npc_dota_hero_grimstroke",

    h401: "npc_dota_hero_vengefulspirit",
    h402: "npc_dota_hero_invoker",
    h403: "npc_dota_hero_alchemist",
    h404: "npc_dota_hero_spectre",
    h405: "npc_dota_hero_morphling",
    h406: "npc_dota_hero_techies",
    h407: "npc_dota_hero_chaos_knight",
    h408: "npc_dota_hero_faceless_void",
    h409: "npc_dota_hero_legion_commander",
    h410: "npc_dota_hero_monkey_king",
    h411: "npc_dota_hero_razor",
    h412: "npc_dota_hero_tinker",
    h413: "npc_dota_hero_pangolier",
    h414: "npc_dota_hero_dark_willow",
    h415: "npc_dota_hero_terrorblade", //new
    h416: "npc_dota_hero_enigma", //new
}

var ABILITY_LIST = {
    a101: "gemtd_hero_huichun",
    a102: "gemtd_hero_shanbi",
    a103: "gemtd_hero_shouhu",
    a105: "gemtd_hero_beishuiyizhan",

    a201: "gemtd_hero_lanse",
    a202: "gemtd_hero_danbai",
    a203: "gemtd_hero_baise",
    a204: "gemtd_hero_hongse",
    a205: "gemtd_hero_lvse",
    a206: "gemtd_hero_fense",
    a207: "gemtd_hero_huangse",
    a208: "gemtd_hero_zise",
    a209: "gemtd_hero_jingying",
    a210: "gemtd_hero_putong",
    a211: "gemtd_hero_qingyi",
    a212: "gemtd_hero_shitou", //new

    a301: "gemtd_hero_kuaisusheji",
    a302: "gemtd_hero_baoji",
    a303: "gemtd_hero_miaozhun",
    a304: "gemtd_hero_fengbaozhichui",
    a305: "gemtd_hero_wuxia",
    a306: "gemtd_hero_huidaoguoqu",
    a307: "gemtd_hero_lianjie",
    a308: "gemtd_hero_xuanfeng", //new

    a401: "gemtd_hero_yixinghuanwei",
    a402: "gemtd_hero_wanmei",
    a403: "gemtd_hero_guangzhudaobiao",
}

var TOY_LIST = {
    t401: 'roshan',
    t402: 'greevil',
    t403: 'shell',
    t301: 'pumpkin',
    t302: 'snow',
    t303: 'beach',
    t304: 'mushroom',
}

var my_maze_cache = null;
// $("#topbar").SetHasClass("hidden", true);


// 视角控制（改回原来的手感：滚轮同时改变俯仰角和距离，角度决定距离）
//GameUI.SetCameraDistance( 1200 );
var g_Distance = 0;
var g_targetDistance = 1000;    // 与初始角度 60 对应（angle = 50 + distance/100）
var g_MaxDistance = 4000;
var g_MinDistance = 0;
var g_camera_angle = 60;
var g_camera_angle_target = 60;

function smoothCameraDistance() {
    $.Schedule(1.0 / 30.0, smoothCameraDistance);

    g_targetDistance = Math.max(Math.min(g_targetDistance, g_MaxDistance), g_MinDistance);
    g_Distance = Math.max(Math.min(g_Distance, g_MaxDistance), g_MinDistance);

    // 角度每帧平滑 1 度，滚轮 = 拉近拉远 + 改变俯仰角（不再是固定 60 度）
    if (g_camera_angle_target > g_camera_angle) {
        g_camera_angle = g_camera_angle + 1
        GameUI.SetCameraPitchMax(g_camera_angle);
        GameUI.SetCameraPitchMin(g_camera_angle);
    }
    if (g_camera_angle_target < g_camera_angle) {
        g_camera_angle = g_camera_angle - 1
        GameUI.SetCameraPitchMax(g_camera_angle);
        GameUI.SetCameraPitchMin(g_camera_angle);
    }

    g_Distance = (g_camera_angle - 50) * 100
    GameUI.SetCameraDistance(1000 + g_Distance);
    return;
}

// Main mouse event callback
GameUI.SetMouseCallback(
    function (eventName, arg) {
        var mouseButton = arg
        var CONSUME_EVENT = true;
        var CONTINUE_PROCESSING_EVENT = false;
        const LEFT_BUTTON = 0;
        const RIGHT_BUTTON = 1;

        // if (GameUI.GetClickBehaviors() !== CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_NONE)
        //     return CONTINUE_PROCESSING_EVENT;

        if (eventName === "wheeled") {
            g_targetDistance += arg * -100;
            g_targetDistance = Math.max(Math.min(g_targetDistance, g_MaxDistance), g_MinDistance);

            // 滚轮同时驱动俯仰角：角度 = 50 + 距离/100（滚轮上/下就是拉远/拉近 + 抬高/压低视角）
            g_camera_angle_target = 50 + (g_targetDistance) / 100;

            return CONSUME_EVENT;
        }

        if (eventName === "pressed") {
            if (mouseButton === LEFT_BUTTON) {
                // 左键点击
                var position = Game.ScreenXYToWorld(GameUI.GetCursorPosition()[0], GameUI.GetCursorPosition()[1]);
                GameEvents.SendCustomGameEventToServer("left_click", { 
                    x: position[0], 
                    y: position[1], 
                    z: position[2], 
                    player_id: Game.GetLocalPlayerID(), 
                    entity_index: Players.GetLocalPlayerPortraitUnit()
                });
                // return CONSUME_EVENT;
            }
        }

        return CONTINUE_PROCESSING_EVENT;
    });
GameUI.SetCameraPitchMax(60);
GameUI.SetCameraPitchMin(60);

// $.Schedule(2,function(){
//     g_camera_angle_target = 60;
// });

smoothCameraDistance();

// $('#kejin_qrcode').SetImage('http://drodo.oss-cn-shanghai.aliyuncs.com/ads/buy_shell_ad_'+$.Language()+'.png');

// 翻译mvp文字
var mvp_text_1 = $.Localize('#'+"mvp_text_1");
var mvp_text_2 = $.Localize('#'+"mvp_text_2");
GameEvents.SendCustomGameEventToServer("get_mvp_text", { "mvp_text_1": mvp_text_1, "mvp_text_2": mvp_text_2 });


// gemtd.ppbizon.com/gemtd/goods/list/v1/@ 
refresh_store();

var STORE_LINK;
function StoreLink(){
    $.DispatchEvent("ExternalBrowserGoToURL", STORE_LINK);
}

// ===== 贝壳商店：store_link_img 的二维码弹窗（逻辑照搬 dac 商城的 store_qr_popup）=====
// 流程：点图标 -> 告诉服务器(request_qr_code) -> 服务器用 当前玩家steamid+时间戳 拼 base64 链接
//       -> 服务器回 show_qr_code {url=二维码图片, text=链接} -> 这里显示二维码 + 跳转按钮
var STORE_QR_WAITING = false;
var STORE_QR_TEXT = '';

function HideStoreQRPopup() {
    STORE_QR_WAITING = false;
    $('#store_qr_popup').SetHasClass('invisible', true);
    //弹窗关掉后，商店图标恢复原色、可以再次点击
    $('#store_link').SetHasClass('store_link_disabled', false);
}

// 弹窗底部的提示行：没内容时整行收起，避免按钮下面多一块空白
function SetStoreQRPopupTips(text) {
    var el = $('#store_qr_popup_tips');
    if (!el) {
        return;
    }
    el.text = text || '';
    el.SetHasClass('invisible', !text);
}

// 二维码 + 跳转按钮 + 刷新按钮：reveal=false 收起（不占位），true 时向下展开
// 标题只做显示/隐藏（二维码出来后才显示，避免加载中还挂着“支付宝扫码”）
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

// 点击商店图标：弹窗先进入"请求中"，再交给服务器生成二维码
function OnClickStoreQRButton() {
    //弹窗已经打开时图标是灰的，不能重复点
    if ($('#store_link').BHasClass('store_link_disabled')) {
        return;
    }
    $('#store_link').SetHasClass('store_link_disabled', true);
    STORE_QR_WAITING = true;
    STORE_QR_TEXT = '';
    $('#store_qr_popup').SetHasClass('invisible', false);
    $('#store_qr_popup_image').SetImage('');
    //先收起二维码和按钮（等回包后再向下展开）
    SetStoreQRContentState(false);
    SetStoreQRPopupTips($.Localize('#text_store_qr_popup_loading'));
    // 服务器迟迟没回，提示超时
    $.Schedule(12, function () {
        if (STORE_QR_WAITING) {
            STORE_QR_WAITING = false;
            SetStoreQRPopupTips($.Localize('#text_store_qr_popup_timeout'));
        }
    });
    GameEvents.SendCustomGameEventToServer('request_qr_code', {});
}

// 充值后刷新账户信息：关掉弹窗，重新拉账户信息（贝壳/冰块/糖果）和商店列表
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
    //刷新成功后弹一个提示（show_msg 是工程里现成的居中提示框，z-index 40000，在商店之上）
    refresh_hero_sea(function () {
        show_msg('text_store_qr_refresh_ok');
    });
}

// 服务器 http 回调：keys = {url, text, status_code}
function OnShowStoreQRCode(keys) {
    if (!keys || !keys.url) {
        return;
    }
    STORE_QR_WAITING = false;
    $('#store_qr_popup').SetHasClass('invisible', false);
    // panorama 不能把 lua 拿到的二进制字节直接当纹理，这里用同一个地址让客户端自己加载这张 png
    $('#store_qr_popup_image').SetImage(keys.url);
    // 按钮跳转的就是二维码里的链接（站点地址 + base64）
    STORE_QR_TEXT = keys.text || '';
    // 二维码和按钮一起向下展开（CSS 里带 transition-delay 形成依次展开）
    SetStoreQRContentState(true);
    // 只有失败时才给一句提示
    var code = keys.status_code || 0;
    SetStoreQRPopupTips((code == 200) ? '' : $.Localize('#text_store_qr_popup_failed'));
    $.Msg('[QR] popup image url = ' + keys.url);
}

GameEvents.Subscribe("show_qr_code", OnShowStoreQRCode);

// 商店货币图标的 hover 说明（标题 + 文本）。
// 两个坑：1) XML 的 onmouseover 只支持“函数名 + 字面量参数”，写 DOTAShowTitleTextTooltip($.Localize('...'))
//          会把整串表达式当纯文本传给 tooltip；
//        2) DOTAShowTitleTextTooltip 的签名是 (panel, title, text)，不给 panel 就没有锚点，tooltip 会跑到屏幕左上角。
function ShowStoreCurrencyTips(panel_id, title_key, text_key) {
    var panel = $('#' + panel_id);
    if (!panel) {
        return;
    }
    $.DispatchEvent("DOTAShowTitleTextTooltip", panel, $.Localize('#' + title_key), $.Localize('#' + text_key));
}

function refresh_store() {
    // 商店商品
    var store_url = 'http://gemtd.ppbizon.com/gemtd/201803/goods/list/@' + local_id + '?hehe=' + Math.random();
    RequestProxy(store_url,function(object){
        if (object.err == 0) {
            $("#store_panel_row1").style['opacity'] = 1;
            $("#store_panel_row2").style['opacity'] = 1;

            if (object.show_level){
                $("#button_board7").SetHasClass("invisible", false);
                if (object.show_level != -1){
                    STORE_LINK = object.show_level;
                }
                else{
                    $('#store_link').visible = false;
                }
            }

            // 显示商店cd
            var cd = object.expire;
            if (!cd || cd < 0) {
                $("#store_cd").text = $.Localize('#'+"text_store_cd") + ": ???";
            }
            else {
                var text = time2showtime_hour(cd);
                var refresh_time = Math.floor(Date.now() / 1000) + cd;

                $("#store_cd").text = $.Localize('#'+"text_store_cd") + ": " + text;

                Countdown({
                    ttl: refresh_time,
                    label_id: 'store_cd',
                    pre_text: 'text_store_cd',
                    expire_text: 'time_expired',
                    cb: ()=>{
                        refresh_store();
                    },
                });
            }

            var goods_list = [];

            for (var i in object.list) {
                goods_list.push(object.list[i]);
            }

            goods_list.sort(function (a, b) {
                var score_a = 0;
                if (a.rarity.indexOf('luckybox') > -1) {
                    score_a += 300000;
                }
                if (a.rarity.indexOf('hero') > -1) {
                    score_a += 200000;
                }
                if (a.rarity.indexOf('toy') > -1) {
                    score_a += 150000;
                }
                if (a.rarity.indexOf('ability') > -1) {
                    score_a += 100000;
                }
                score_a += parseInt(a.id.substr(1, 1));

                var score_b = 0;
                if (b.rarity.indexOf('luckybox') > -1) {
                    score_b += 300000;
                }
                if (b.rarity.indexOf('hero') > -1) {
                    score_b += 200000;
                }
                if (b.rarity.indexOf('toy') > -1) {
                    score_b += 150000;
                }
                if (b.rarity.indexOf('ability') > -1) {
                    score_b += 100000;
                }
                score_b += parseInt(b.id.substr(1, 1));

                return score_b - score_a;
            });

            STORE_LIST = goods_list;

            var ii = 0;
            for (var i in goods_list) {
                var goods = goods_list[i];

                if (goods.pic == "hero_avatar") {
                    // $("#store_movie_"+ii).heroname = HERO_LIST[goods.id];
                    $("#store_name_" + ii).text = $.Localize('#'+HERO_LIST[goods.id]);

                    $("#store_image_" + ii).SetImage("file://{images}/custom_game/heros/" + HERO_LIST[goods.id] + ".png");
                    $("#store_image_" + ii).SetHasClass('invisible', true);
                    $("#store_movie_" + ii).heroname = HERO_LIST[goods.id];
                }
                else {
                    $("#store_movie_" + ii).heroname = "";
                    $("#store_image_" + ii).SetImage(goods.pic);
                    $("#store_image_" + ii).SetHasClass('invisible', false);
                    $("#store_name_" + ii).text = $.Localize('#'+goods.id);

                    if (goods.rarity.indexOf('toy') > -1) {
                        $("#store_name_" + ii).text = $.Localize('#'+'award_name_item_' + TOY_LIST[goods.id]);
                    }
                }

                $("#store_rarity_" + ii).text = $.Localize('#'+goods.rarity);
                $("#store_price_" + ii).text = '×' + goods.price;

                if (goods.id == object.onsale) {
                    var sale_price = Math.floor(goods.price / 2);
                    $("#goods_sale_" + ii).SetHasClass('hidden', false);
                    $("#store_price_" + ii).text = '×' + sale_price;
                }
                else {
                    $("#goods_sale_" + ii).SetHasClass('hidden', true);
                }

                if ($("#goods_preview_" + ii)) {
                    $("#goods_preview_" + ii).SetHasClass('hidden', false);
                }

                if (!goods.price || parseInt(goods.price) < 0) {
                    $("#store_shell_icon_" + ii).SetHasClass('hidden', true);
                    $("#store_price_" + ii).text = $.Localize('#'+'text_already_full');
                    $("#store_price_" + ii).SetHasClass('text_center', true);

                    if (goods.price == 0) {
                        $("#store_price_" + ii).text = $.Localize('#'+'text_free');
                    }
                }
                else {
                    $("#store_shell_icon_" + ii).SetHasClass('hidden', false);
                    $("#store_price_" + ii).SetHasClass('text_center', false);
                }

                if (goods.iceblock) {
                    $("#store_shell_icon_" + ii).SetImage("file://{images}/custom_game/award_ice.png");
                }
                else {
                    $("#store_shell_icon_" + ii).SetImage("file://{images}/custom_game/shell.png");
                }

                var color = "#888";
                if (goods.id.slice(1, 2) == "2") {
                    color = "#4444ff";
                }
                if (goods.id.slice(1, 2) == "3") {
                    color = "#ff00ff";
                }
                if (goods.id.slice(1, 2) == "4") {
                    color = "#ff8800";
                }
                if (goods.id.slice(0, 1) == "b") {
                    color = "#888";
                }
                $("#store_top_panel_" + ii).style['background-color'] = color;
                $("#store_rarity_" + ii).style['color'] = color;

                ii++;
            }
        }
        else {
            $("#store_panel_row1").style['opacity'] = 0.01;
            $("#store_panel_row2").style['opacity'] = 0.01;
        }
    });
}


if (Players.GetPlayerSelectedHero(0)) {
    $("#player_hero1").style['background-image'] = 'url("file://{images}/custom_game/heros/' + Players.GetPlayerSelectedHero(0) + '.png");';
}
else {
    $("#panel_player_board1").SetHasClass("hidden", true);
}
if (Players.GetPlayerSelectedHero(1)) {
    $("#player_hero2").style['background-image'] = 'url("file://{images}/custom_game/heros/' + Players.GetPlayerSelectedHero(1) + '.png");';
}
else {
    $("#panel_player_board2").SetHasClass("hidden", true);
}
if (Players.GetPlayerSelectedHero(2)) {
    $("#player_hero3").style['background-image'] = 'url("file://{images}/custom_game/heros/' + Players.GetPlayerSelectedHero(2) + '.png");';
}
else {
    $("#panel_player_board3").SetHasClass("hidden", true);
}
if (Players.GetPlayerSelectedHero(3)) {
    $("#player_hero4").style['background-image'] = 'url("file://{images}/custom_game/heros/' + Players.GetPlayerSelectedHero(3) + '.png");';
}
else {
    $("#panel_player_board4").SetHasClass("hidden", true);
}



// ============================================================================
// GemTD 好友排名补丁块：Steam GetFriendList 优先 -> steamgpt.net 兜底 + 查询转圈提示
//
// 用法：把这一整块粘到你本地 panorama/scripts/custom_game/gemtd.js 里，
//       位置是原来的 "// get friends mmr" 那一整段（旧版那段 68 行是注释掉的，整段删掉），
//       粘在 "// get mmr" 这一行之前即可。其它文件都不用改。
//
// 依赖（你的 gemtd.js 里本来就有）：request_proxy_data_table、RequestProxy、
//       FindDotaHudElement、$.CreatePanel、GameEvents("request_proxy")、
//       addon_game_mode.lua 里的 GemTD:OnRequestProxy。
// ============================================================================

// ==================== 好友排名：好友列表查询（Steam 官方接口优先，steamgpt.net 兜底） ====================
// 流程：api.steampowered.com/ISteamUser/GetFriendList -> 查不到(超时/报错/空) -> steamgpt.net/friends/<steamid>.json
// 拿到好友 steamid 后，仍然走 http://gemtd.ppbizon.com/gemtd/201807/mmr/get/ 查段位（接口未改动）
// 另需 gem_board.xml 里好友排名表头的 #lbl_friend_rank_title（查询中/失败状态显示在标题上，见 FRIEND_RANK_PATCH.md 第 9 节）
var FRIEND_STEAM_KEYS = [
    '968CE0A7C36CA9440441899F19C1707F',
    '990E299A833D8BCDCDE781ED98192574',
    'D90B5894B88D6FF32D3D39F8C5AE0060',
    '7F14C3F4EC674A7C72AA8A7C1BF17C03',
    '5EF7E4AC4FCAC916C6BE712D696D2854',
    '1DB32B03E887FF71A59E5C7481087DB2'
];
var FRIEND_RANK_MAX = 100;      // 一次最多带多少个 steamid 去查段位（URL 太长服务器会拒）
var FRIEND_RANK_ROWS = 10;      // 界面上最多显示多少个好友
var friend_rank_busy = false;   // 防止连续点击重复请求
var friend_rank_loaded = false; // 已经成功查到过一次，之后不再重复查询（本局内有效）
var FRIEND_RANK_DEBUG = true;   // 排查期间打开：所有关键节点都会打印 [gemtd friend] 日志

function friend_rank_log(msg) {
    // 排查期间无条件打印（原本受 FRIEND_RANK_DEBUG 控制）
    $.Msg('[gemtd friend] ' + msg);
}

function my_steam_id() {
    var info = Game.GetPlayerInfo(Players.GetLocalPlayer());
    if (!info || !info.player_steamid) return '';
    return '' + info.player_steamid;
}

// 服务器是先用 lua 的 json.decode 解析、再把 table 发给客户端的，
// 所以 json 里的数组到这里会变成 {"1":{...},"2":{...}} 这种“数字键对象”，没有 length。
// 这里统一转成真正的 JS 数组（按 key 的数值排序，避免 "10" 排在 "2" 前面）。
function friend_as_array(t) {
    if (!t) return [];
    if (typeof t.length === 'number' && typeof t.push === 'function') return t;   // 已经是数组
    var keys = [];
    for (var k in t) keys.push(k);
    keys.sort(function (a, b) {
        var na = parseInt(a);
        var nb = parseInt(b);
        if (!isNaN(na) && !isNaN(nb)) return na - nb;
        return ('' + a) < ('' + b) ? -1 : (('' + a) > ('' + b) ? 1 : 0);
    });
    var out = [];
    for (var i = 0; i < keys.length; i++) out.push(t[keys[i]]);
    return out;
}

// 带失败/超时回调的请求代理：成功 cb(对象)，失败 cb(null)，且只回调一次
// （原来的 RequestProxy 超时后不回调，没法判断"查不到"，所以单独加一个）
function request_proxy_ex(url, cb, tries) {
    var r_id = Math.round(Math.random() * 10000000);
    var left = tries || 20;                 // 最多轮询次数
    var round = 0;
    friend_rank_log('请求发出 id=' + r_id + ' tries=' + left + ' url=' + ('' + url).substring(0, 130) + ((('' + url).length > 130) ? '...' : ''));
    GameEvents.SendCustomGameEventToServer("request_proxy", { "requestid": r_id, "url": url });

    function poll() {
        // 前 8 轮 0.25s 一次（接口快时能明显提前出结果），之后 0.5s
        var interval = (round < 8) ? 0.25 : 0.5;
        round++;
        $.Schedule(interval, function () {
            var d = request_proxy_data_table[r_id];
            if (d) {
                friend_rank_log('请求返回 id=' + r_id + ' 轮次=' + round + ' keys=' + (d ? Object.keys(d).join(',') : 'null'));
                cb(d);
            }
            else if (--left > 0) {
                poll();
            }
            else {
                friend_rank_log('请求超时 id=' + r_id + '（服务器没回 response_proxy）');
                cb(null);
            }
        });
    }
    poll();
}

// http://api.steampowered.com/ISteamUser/GetFriendList 的返回：{friendslist:{friends:[{steamid:"..."}]}}
function parse_steam_friend_list(j) {
    if (!j || !j.friendslist || !j.friendslist.friends) return null;
    var arr = friend_as_array(j.friendslist.friends);
    var ids = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].steamid) ids.push('' + arr[i].steamid);
    }
    return ids;
}

// https://steamgpt.net/friends/<steamid>.json 的返回：{result:"success",data:{count:N,friends:[{steamid64:"...",steam:{...}}]}}
function parse_steamgpt_friend_list(j) {
    if (!j || j.result !== 'success' || !j.data || !j.data.friends) return null;
    var arr = friend_as_array(j.data.friends);
    var ids = [];
    for (var i = 0; i < arr.length; i++) {
        var f = arr[i];
        if (!f) continue;
        var id = f.steamid64 || (f.steam && f.steam.steamid) || f.steamid;
        if (id) ids.push('' + id);
    }
    return ids;
}

// 取好友列表：官方接口优先，失败再用 steamgpt.net
function get_friend_steam_ids(cb) {
    var me = my_steam_id();
    friend_rank_log('get_friend_steam_ids 开始，me=' + (me ? me : '(空)'));
    if (!me) { cb(null); return; }

    var key = FRIEND_STEAM_KEYS[Math.floor(Math.random() * FRIEND_STEAM_KEYS.length)];
    var official_url = 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=' + key
        + '&relationship=friend&steamid=' + me;

    request_proxy_ex(official_url, function (j) {
        var ids = parse_steam_friend_list(j);
        friend_rank_log('官方接口返回: ' + (j ? JSON.stringify(j).substring(0, 160) : 'null') + ' -> 解析到 ' + (ids ? ids.length : 0) + ' 个好友');
        if (ids && ids.length > 0) {
            friend_rank_log('好友列表来自 api.steampowered.com，共 ' + ids.length + ' 个');
            cb(ids);
            return;
        }
        friend_rank_log('api.steampowered.com 没查到（返回为空或超时），改用 steamgpt.net');

        // 官方接口超时 / 报错 / 好友列表为空，走备用接口
        var backup_url = 'https://steamgpt.net/friends/' + me + '.json';
        request_proxy_ex(backup_url, function (j2) {
            var ids2 = parse_steamgpt_friend_list(j2);
            friend_rank_log('steamgpt 返回: ' + (j2 ? JSON.stringify(j2).substring(0, 160) : 'null') + ' -> 解析到 ' + (ids2 ? ids2.length : 0) + ' 个好友');
            if (ids2 && ids2.length > 0) {
                friend_rank_log('好友列表来自 steamgpt.net，共 ' + ids2.length + ' 个');
                cb(ids2);
            }
            else {
                friend_rank_log('steamgpt.net 也没取到，放弃');
                cb(null);
            }
        });
    }, 16);     // 官方接口经常超时，给它 16*0.5s=8s，超了立刻走备用接口
}

// 填充好友排名列表（按 rankall 显示星数；不含 % 视为前 100 名，用金色图标）
function fill_friend_rank(list, me) {
    // 段位数据同样是 lua table 发过来的“数字键对象”，先转成真数组
    list = friend_as_array(list);
    var shown = 0;
    for (var i = 0; i < list.length && shown < FRIEND_RANK_ROWS; i++) {
        var d = list[i];
        if (!d || !d.rankall || ('' + d.rankall) == '100%') continue;   // 未上榜，跳过
        shown++;
        var n = shown;
        var is_me = ('' + d.user) == me;

        var row = $('#fd_rank_' + n);
        if (row) row.style['background-color'] = is_me ? '#333333' : 'transparent';

        var row_b = $('#fd_rank_1' + n);
        if (row_b) row_b.style['background-color'] = is_me ? '#333333' : 'transparent';

        var av = $('#avatar0_' + n + '_1');
        if (av) av.steamid = d.user;

        var lbl = $('#lbl_boss_damage0_' + n);
        if (lbl) {
            lbl.text = d.rankall + '  ';
            lbl.style['color'] = '#ffffff';
        }

        var img = $('#rank_friend_img_' + n);
        if (img) {
            img.style['opacity'] = 1;
            if (('' + d.rankall).indexOf('%') < 0) {
                img.SetImage('file://{images}/custom_game/rank/all_rank_6.png');
                if (lbl) lbl.style['color'] = 'yellow';
            }
            else {
                var r = parseInt(d.rankall);
                var level = 1;
                if (r <= 2) { level = 5; }
                else if (r <= 10) { level = 4; }
                else if (r <= 25) { level = 3; }
                else if (r <= 50) { level = 2; }
                img.SetImage('file://{images}/custom_game/rank/all_rank_' + level + '.png');
            }
        }
    }

    // 把没用到的行清空
    for (var k = shown + 1; k <= FRIEND_RANK_ROWS; k++) {
        var av2 = $('#avatar0_' + k + '_1'); if (av2) av2.steamid = '';
        var l2 = $('#lbl_boss_damage0_' + k); if (l2) { l2.text = ''; l2.style['color'] = '#ffffff'; }
        var i2 = $('#rank_friend_img_' + k); if (i2) i2.style['opacity'] = 0;
    }
    return shown;
}

// 查好友排名：标题显示“查询中...” -> 取好友列表 -> 查段位 -> 填表 -> 标题恢复“好友排名”
// 只查一次：成功查到过就把 friend_rank_loaded 置 true，之后（本局内）再打开排行榜都不会重复请求。
// 需要强制重查时调 refresh_friend_rank(true)。
function refresh_friend_rank(force) {
    if (!force && friend_rank_loaded) {
        $.Msg('[gemtd friend] 已查过，跳过重复查询');
        return;
    }
    if (friend_rank_busy) return;
    friend_rank_busy = true;
    friend_rank_set_title('busy');
    $.Msg('[gemtd friend] refresh_friend_rank start');

    get_friend_steam_ids(function (ids) {
        if (!ids || ids.length == 0) {
            friend_rank_busy = false;
            $.Msg('[gemtd friend] 好友列表为空（两个接口都没拿到）');
            friend_rank_set_title('failed');
            return;
        }
        $.Msg('[gemtd friend] 拿到好友 ' + ids.length + ' 个，开始查段位');

        var me = my_steam_id();
        if (ids.indexOf(me) < 0) ids.push(me);
        if (ids.length > FRIEND_RANK_MAX) ids = ids.slice(0, FRIEND_RANK_MAX);

        var url = 'http://gemtd.ppbizon.com/gemtd/201807/mmr/get/@' + ids.join(',') + '?myself=' + me;
        request_proxy_ex(url, function (aa) {
            friend_rank_busy = false;
            if (!aa || !aa.data) {
                $.Msg('[gemtd friend] mmr/get 没返回 data');
                friend_rank_set_title('failed');
                return;
            }
            var n = fill_friend_rank(aa.data, me);
            $.Msg('[gemtd friend] 段位返回 ' + aa.data.length + ' 条，已上榜填了 ' + n + ' 行（好友 ' + ids.length + ' 人）');
            friend_rank_set_title('idle');
            // 成功一次就锁定，避免每次打开排行榜都重新查
            friend_rank_loaded = true;
        });
    });
}

// ==================== 好友排名标题状态 ====================
// busy   : “好友排名（查询中...）”
// failed : “好友排名（获取失败）”，2.5 秒后自动回到正常
// idle   : 正常的“好友排名”
// 不再用弹窗（弹窗在 HUD 里不好定位，标题上显示更直观）。
var friend_rank_title_token = 0;

function friend_rank_set_title(state) {
    var lbl = $('#lbl_friend_rank_title');
    if (!lbl) {
        $.Msg('[gemtd friend] 找不到 #lbl_friend_rank_title（xml 没生效？）');
        return;
    }
    if (state === 'busy') {
        friend_rank_title_token++;
        lbl.text = $.Localize('#text_friend_rank_loading');
    }
    else if (state === 'failed') {
        friend_rank_title_token++;
        var token = friend_rank_title_token;
        lbl.text = $.Localize('#text_friend_rank_failed');
        $.Schedule(2.5, function () {
            // 期间没有新的查询/失败，才恢复
            if (token === friend_rank_title_token && !friend_rank_busy) {
                friend_rank_set_title('idle');
            }
        });
    }
    else {
        friend_rank_title_token++;
        lbl.text = $.Localize('#txt_friend_rank');
    }
}

// 挂到好友面板的打开函数上：原来有 open_friend_board 就保留它的逻辑再追加刷新，没有就给个默认实现
if (typeof open_friend_board === 'function') {
    var _orig_open_friend_board = open_friend_board;
    open_friend_board = function () {
        _orig_open_friend_board.apply(this, arguments);
        refresh_friend_rank();
    };
}
else {
    open_friend_board = function () {
        var b = $('#friend_board');
        if (b) b.style['position'] = '0px 0px 0px';
        refresh_friend_rank();
    };
}

// ==================== 本地集成：打开排行榜时刷新好友排名 ====================
// 这份工程里好友排名显示在排行榜(ranking_board)的好友列上，没有单独的“打开好友面板”入口。
// 触发点直接写在下面的 open_ranking_board() 里（不用再包装函数，避免 hoisting/被覆盖的坑）。
// 排查用：控制台里能看到这一行，才说明这一版 gemtd.js 真的被加载了
$.Msg('[gemtd friend] friend_rank_block 已加载 (build 2026-10-19b)');
// get mmr
// lbl_player_info1
var steam_ids = '';
for (var i = 0; i <= 3; i++) {
    var playerdata = Game.GetPlayerInfo(i);
    if (playerdata && playerdata.player_steamid) {

        if (local_id == playerdata.player_steamid) {
            wo_shi_ji = 1;
        }
        steam_ids += playerdata.player_steamid + ',';

        $("#panel_player_board" + (i + 1)).SetHasClass("hidden", false);

        $("#avatar_player" + (i + 1)).steamid = playerdata.player_steamid;
        $("#player_name" + (i + 1)).steamid = playerdata.player_steamid;
    }
}
var url = 'http://gemtd.ppbizon.com/gemtd/201807/mmr/get/@' + steam_ids + '?no_sort=1&hehe=' + Math.random();
RequestProxy(url, function(aa){
    if (aa.err == 1086) {
        show_msg('text_sumuping');
        return;
    }
    aa = aa.data;
    if (aa) {
        for (var i in aa) {
            if (aa[i] && aa[i].user) {
                $("#panel_player_board" + (i)).SetHasClass("hidden", false);

                $("#avatar_player" + (i)).steamid = aa[i].user;
                $("#player_name" + (i)).steamid = aa[i].user;

                if (local_id == aa[i].user) {
                    my_mmr_level = aa[i].race_level;
                    if (aa[i].rank == '100%') {
                        $.Schedule(10, function () {
                            $('#teach_maze').SetHasClass('hidden', false);
                            $.Schedule(10, function () {
                                $('#teach_maze').SetHasClass('hidden', true);
                            });
                        });
                    }
                }

                $("#lbl_player_race_rank_per" + (i)).text = aa[i].race_level > 0 ? 26 - aa[i].race_level : '';
                $("#lbl_player_all_rank_per" + (i)).text = aa[i].rankall;


                if (aa[i].race_level == 25) {
                    $("#lbl_player_race_rank_per" + (i)).style['color'] = "yellow";
                }
                if ((aa[i].rankall + '').indexOf('%') < 0) {
                    $("#lbl_player_all_rank_per" + (i)).style['color'] = "yellow";
                }
                $("#pic_player_race_level" + (i)).style['background-image'] = 'url("file://{images}/custom_game/rank/race_rank_' + aa[i].race_level + '.png")';

                var coop_level = aa[i].coop_level;
                if (coop_level > 0) {
                    $("#pic_player_coop_level" + (i)).style['background-image'] = 'url("file://{images}/custom_game/rank/coop_rank_' + coop_level + '.png")';
                    $("#pic_player_all_level" + (i)).style['background-image'] = 'url("file://{images}/custom_game/rank/all_rank_' + aa[i].all_level + '.png")';
                    $("#lbl_player_coop_rank_per" + (i)).text = 26 - coop_level;
                    if (26 - coop_level == 1) {
                        $("#lbl_player_coop_rank_per" + (i)).style['color'] = "yellow";
                    }
                }
            }
        }
    }
});

function cal_level_coop(rank) {

    if (rank.indexOf('%') == -1) return 1;
    else if (parseInt(rank) <= 1) return 2;
    else if (parseInt(rank) <= 2) return 3;
    else if (parseInt(rank) <= 3) return 4;
    else if (parseInt(rank) <= 4) return 5;
    else if (parseInt(rank) <= 5) return 6;
    else if (parseInt(rank) <= 6) return 7;
    else if (parseInt(rank) <= 7) return 8;
    else if (parseInt(rank) <= 8) return 9;
    else if (parseInt(rank) <= 9) return 10;
    else if (parseInt(rank) <= 10) return 11;
    else if (parseInt(rank) <= 12) return 12;
    else if (parseInt(rank) <= 14) return 13;
    else if (parseInt(rank) <= 16) return 14;
    else if (parseInt(rank) <= 18) return 15;
    else if (parseInt(rank) <= 20) return 16;
    else if (parseInt(rank) <= 25) return 17;
    else if (parseInt(rank) <= 30) return 18;
    else if (parseInt(rank) <= 35) return 19;
    else if (parseInt(rank) <= 40) return 20;
    else if (parseInt(rank) <= 45) return 21;
    else if (parseInt(rank) <= 50) return 22;
    else if (parseInt(rank) <= 60) return 23;
    else if (parseInt(rank) <= 80) return 24;
    else if (parseInt(rank) <= 99) return 25;
    else return 0;
}
var ranking_get_all;

update_leaderboard();

function open_store() {
    if (!is_store_board_open) {
        show_store_panel();
        is_store_board_open = true;
    }
    else {
        hide_store_panel();
        is_store_board_open = false;
    }

    hide_right_panel();
    $("#gameinfo_board").style["position"] = "1200px 0px 0px";
    $("#merge_board").style["position"] = "3000px 0px 0px";
    $("#ranking_board").style["position"] = "3000px 0px 0px";
    $("#map_board").style["position"] = "920px 0px 0px";
    $("#quest_board").style["position"] = "920px 0px 0px";
    is_bet_board_open = false;
    is_heropool_board_open = false;
    is_gameinfo_board_open = false;
    is_merge_board_open = false;
    is_ranking_board_open = false;
    is_friend_board_open = false;
    is_map_board_open = false;
    is_quest_board_open = false;
}

function open_heropool_board() {
    if (!is_heropool_board_open) {
        show_right_panel();
        is_heropool_board_open = true;
    }
    else {
        hide_right_panel();
        is_heropool_board_open = false;
    }

    hide_store_panel();
    $("#gameinfo_board").style["position"] = "1200px 0px 0px";
    $("#merge_board").style["position"] = "3000px 0px 0px";
    $("#ranking_board").style["position"] = "3000px 0px 0px";
    $("#map_board").style["position"] = "920px 0px 0px";
    $("#quest_board").style["position"] = "920px 0px 0px";

    is_bet_board_open = false;
    is_store_board_open = false;
    is_gameinfo_board_open = false;
    is_merge_board_open = false;
    is_ranking_board_open = false;
    is_friend_board_open = false;
    is_map_board_open = false;
    is_quest_board_open = false;
}

function open_gameinfo_board() {
    if (!is_gameinfo_board_open) {
        $("#gameinfo_board").style["position"] = "0px 0px 0px";
        is_gameinfo_board_open = true;
    }
    else {
        $("#gameinfo_board").style["position"] = "1200px 0px 0px";
        is_gameinfo_board_open = false;
    }

    hide_right_panel();
    hide_store_panel();
    $("#merge_board").style["position"] = "3000px 0px 0px";
    $("#ranking_board").style["position"] = "3000px 0px 0px";
    $("#map_board").style["position"] = "920px 0px 0px";
    $("#friend_board").style["position"] = "920px 0px 0px";
    $("#quest_board").style["position"] = "920px 0px 0px";
    is_bet_board_open = false;
    is_heropool_board_open = false;
    is_store_board_open = false;
    is_merge_board_open = false;
    is_ranking_board_open = false;
    is_friend_board_open = false;
    is_map_board_open = false;
    is_quest_board_open = false;
}
function open_merge_board() {
    if (!is_merge_board_open) {
        $("#merge_board").style["position"] = "0px 0px 0px";
        is_merge_board_open = true;
    }
    else {
        $("#merge_board").style["position"] = "3000px 0px 0px";
        is_merge_board_open = false;
    }

    hide_right_panel();
    hide_store_panel();
    $("#gameinfo_board").style["position"] = "1200px 0px 0px";
    $("#ranking_board").style["position"] = "3000px 0px 0px";
    $("#map_board").style["position"] = "920px 0px 0px";
    $("#quest_board").style["position"] = "920px 0px 0px";
    is_bet_board_open = false;
    is_heropool_board_open = false;
    is_store_board_open = false;
    is_gameinfo_board_open = false;
    is_ranking_board_open = false;
    is_friend_board_open = false;
    is_map_board_open = false;
    is_quest_board_open = false;
}
function open_map_board() {
    if (!is_map_board_open) {
        $("#map_board").style["position"] = "0px 0px 0px";
        is_map_board_open = true;
    }
    else {
        $("#map_board").style["position"] = "920px 0px 0px";
        is_map_board_open = false;
    }

    hide_right_panel();
    hide_store_panel();
    $("#gameinfo_board").style["position"] = "1200px 0px 0px";
    $("#ranking_board").style["position"] = "3000px 0px 0px";
    $("#merge_board").style["position"] = "3000px 0px 0px";
    $("#quest_board").style["position"] = "920px 0px 0px";
    is_bet_board_open = false;
    is_heropool_board_open = false;
    is_store_board_open = false;
    is_gameinfo_board_open = false;
    is_ranking_board_open = false;
    is_friend_board_open = false;
    is_merge_board_open = false;
    is_quest_board_open = false;
}
function open_ranking_board() {
    if (!is_ranking_board_open) {
        $("#ranking_board").style["position"] = "0px 0px 0px";
        is_ranking_board_open = true;
        // 打开排行榜时刷新好友排名（好友列就在排行榜里）
        refresh_friend_rank();
    }
    else {
        $("#ranking_board").style["position"] = "3000px 0px 0px";
        is_ranking_board_open = false;
    }

    hide_right_panel();
    hide_store_panel();
    $("#gameinfo_board").style["position"] = "1200px 0px 0px";
    $("#map_board").style["position"] = "920px 0px 0px";
    $("#merge_board").style["position"] = "3000px 0px 0px";
    $("#quest_board").style["position"] = "920px 0px 0px";
    is_bet_board_open = false;
    is_heropool_board_open = false;
    is_store_board_open = false;
    is_gameinfo_board_open = false;
    is_map_board_open = false;
    is_friend_board_open = false;
    is_merge_board_open = false;
    is_quest_board_open = false;
}

function close_ranking_board() {
    $("#ranking_board").style["position"] = "3000px 0px 0px";
    is_ranking_board_open = false;
}

function open_quest_board() {
    if (!is_quest_board_open) {
        $("#quest_board").style["position"] = "0px 0px 0px";
        is_quest_board_open = true;
    }
    else {
        $("#quest_board").style["position"] = "920px 0px 0px";
        is_quest_board_open = false;
    }

    hide_right_panel();
    hide_store_panel();
    $("#gameinfo_board").style["position"] = "1200px 0px 0px";
    $("#ranking_board").style["position"] = "3000px 0px 0px";
    $("#merge_board").style["position"] = "3000px 0px 0px";
    $("#map_board").style["position"] = "920px 0px 0px";
    is_bet_board_open = false;
    is_heropool_board_open = false;
    is_store_board_open = false;
    is_gameinfo_board_open = false;
    is_map_board_open = false;
    is_ranking_board_open = false;
    is_merge_board_open = false;
    is_friend_board_open = false;
}


var heroindex2id = {};
var heroid_pool = [];
var is_curtain_hidden = false;

// 选择英雄
function select_hero(x) {
}

function close_pre_shell() {
    $("#panel_pre_shell").style['opacity'] = 0;
}
function close_pre_bet_shell() {
    $("#panel_pre_bet_shell").style['opacity'] = 0;
}
var maze_on = false;
var maze_particles = [];
var maze_count = 0;
// 点击在大地图里显示迷宫指南
function click_maze_guide_panel_coop(index) {
    GameEvents.SendCustomGameEventToServer("click_maze_guide_panel_coop", { "maze_index": index, "player_id": Game.GetLocalPlayerID(), "hehe": Date.now() });
}
function click_maze_guide_panel_race(index) {
    GameEvents.SendCustomGameEventToServer("click_maze_guide_panel_race", { "maze_index": index, "player_id": Game.GetLocalPlayerID(), "hehe": Date.now() });
}
function end_game_parse_towers(raw) {
    var result = [];
    if (!raw) return result;
    var tower_part = String(raw).split("|")[0];
    var parts = tower_part.split(",");
    for (var i = 0; i < parts.length; i++) {
        if (!parts[i]) continue;
        var t = parts[i].split(":");
        var name = t[0];
        if (!name) continue;
        var count = parseInt(t[1]);
        if (isNaN(count) || count < 1) count = 1;
        var level = TOWER_LEVEL[name] || 0;
        var color = TOWER_LEVEL_COLOR[level] || "#888888";
        result.push({ name: name, count: count, level: level, color: color });
    }
    result.sort(function(a, b) {
        if (b.level !== a.level) return b.level - a.level;
        return b.count - a.count;
    });
    return result;
}

function update_end_game_towers(raw) {
    var list = $("#end_game_tower_list");
    if (!list) return;
    list.RemoveAndDeleteChildren();
    var towers = end_game_parse_towers(raw);
    var per_row = 10;
    var item_w = 88;
    var gap = 0;
    var row = null;
    var rows = [];
    for (var i = 0; i < towers.length; i++) {
        if (i % per_row == 0) {
            row = $.CreatePanel("Panel", list, "");
            row.style["width"] = "100%";
            row.style["height"] = "80px";
            row.style["flow-children"] = "right";
            row.style["horizontal-align"] = "center";
            rows.push(row);
        }

        var t = towers[i];
        var p = $.CreatePanel("Panel", row, "");
        p.style["width"] = item_w + "px";
        p.style["height"] = "78px";
        p.style["margin-right"] = gap + "px";
        p.style["flow-children"] = "down";
        p.style["border-top"] = "0px";
        p.style["border-right"] = "0px";
        p.style["border-left"] = "0px";
        p.style["border-bottom"] = "0px";

        var imgBox = $.CreatePanel("Panel", p, "");
        imgBox.style["width"] = "74px";
        imgBox.style["height"] = "46px";
        imgBox.style["overflow"] = "clip";
        imgBox.style["horizontal-align"] = "center";
        imgBox.style["margin-top"] = "2px";

        var img = $.CreatePanel("Image", imgBox, "");
        img.SetImage("file://{images}/custom_game/towers/" + t.name + ".png");
        img.style["width"] = "74px";
        img.style["height"] = "64px";
        img.style["vertical-align"] = "center";

        var label = $.CreatePanel("Label", p, "");
        label.text = "x" + t.count;
        label.style["width"] = "100%";
        label.style["height"] = "30px";
        label.style["font-size"] = "28px";
        label.style["color"] = t.color;
        label.style["text-align"] = "center";
        label.style["horizontal-align"] = "center";
        label.style["font-family"] = "defaultFont";
        label.style["font-weight"] = "bold";

        (function(panel, tower) {
            panel.SetPanelEvent("onmouseover", function () {
                var towerName = "<font color='" + tower.color + "'>" + $.Localize('#' + tower.name) + "</font>";
                $.DispatchEvent("DOTAShowTitleTextTooltip", panel, towerName, "");
            });
            panel.SetPanelEvent("onmouseout", function () {
                $.DispatchEvent("DOTAHideTitleTextTooltip");
                $.DispatchEvent("DOTAHideTextTooltip");
            });
        })(p, t);
    }
    for (var r = 0; r < rows.length; r++) {
        var count = Math.min(per_row, towers.length - r * per_row);
        rows[r].style["width"] = (count * (item_w + gap)) + "px";
    }
}

function update_end_game_avatars(raw) {
    var ids = [];
    if (raw) ids = String(raw).split(",");
    if (ids.length == 0 || (ids.length == 1 && !ids[0])) {
        ids = [];
        for (var p = 0; p <= 3; p++) {
            var info = Game.GetPlayerInfo(p);
            if (info && info.player_steamid) ids.push(info.player_steamid);
        }
    }
    for (var i = 1; i <= 4; i++) {
        var av = $("#end_game_avatar_" + i);
        if (!av) continue;
        av.steamid = ids[i - 1] || "";
        av.SetHasClass("invisible", false);
    }
    var list = $("#end_game_avatar_list");
    if (list) {
        list.style["width"] = "256px";
    }
}function OnGameStateChanged(table, key, data) {
    if (key == 'bullet') {
        var steamid = Game.GetPlayerInfo(data.player_id).player_steamid;
        var playername = Game.GetPlayerInfo(data.player_id).player_name;
        var chatting = data.text;
        bullet_chat(steamid, playername, chatting, '#fff');
    }
    if (key == "vectors_race") {
        if (data.player != undefined && data.player != Game.GetLocalPlayerID()) {
            return;
        }
        if (!maze_on) {
            maze_on = true;
            for (var i in data.t) {
                show_guide_one(data.t[i]);
            }
        }
        else {
            maze_on = false;
            hide_guide_all();
        }
    }
    if (key == "vectors_coop") {
        if (data.player != undefined && data.player != Game.GetLocalPlayerID()) {
            return;
        }
        for (var i in data.t) {
            show_guide_one(data.t[i]);
        }
    }
    if (key == "vectors_coop_hide") {
        if (data.player != undefined && data.player != Game.GetLocalPlayerID()) {
            return;
        }
        hide_guide_all();
    }
    if (key == 'show_quest') {
        var j = 3;
        for (var i in data) {
            var quest_name = i;
            $("#panel_quest_stat_" + j).SetHasClass('invisible', false);
            var text = $.Localize('#'+i);
            if (quest_name.indexOf('q111') > -1) {
                var hero = quest_name.split('_')[1];
                text = $.Localize('#'+'q111_1') + $.Localize('#'+HERO_LIST[hero]) + $.Localize('#'+'q111_2');
            }
            if (data[i]) {
                $("#panel_quest_stat_text_" + j).text = text + ' √';
                $("#panel_quest_stat_text_" + j).style['color'] = '#fff';
            }
            else {
                $("#panel_quest_stat_text_" + j).text = text;
                $("#panel_quest_stat_text_" + j).style['color'] = '#8696ad';
            }
            j--;
        }
    }
    if (key == 'show_top_tips') {
        if (data.wave && data.count) {
            $("#text_top_tips").text = 'WAVE ' + data.wave + '   ' + $.Localize('#'+data.text) + '×' + data.count;
        }
        else {
            $("#text_top_tips").text = $.Localize('#'+data.text);
        }

        $("#panel_top_tips").style['opacity'] = 1;

        var time = data.time || 5;
        $.Schedule(time, function () {
            $("#panel_top_tips").style['opacity'] = 0;
        });
    }

    if (key == 'gem_maze_length') {
        $("#txt_maze").text = data.length;
    }
    if (key == 'gem_maze_length_race') {
        if (data.player == Players.GetLocalPlayer()) {
            $("#txt_maze").text = data.length;
        }
    }
    if (key == 'reconnect') {
        reconnect_game()
    }

    if (key == 'repick_hero') {
        if (my_hero_index == data.old_index) {
            my_hero_index = data.new_index;
        }

        // DisplayBubble({text:'repick',unit:Players.GetPlayerHeroEntityIndex( Players.GetLocalPlayer() )});
    }

    if (key == 'say_bubble') {
        var p = EMOJI_LIST[data.text] || null;
        DisplayBubble({ text: data.text, unit: data.unit, pic: p });
    }

    if (key == 'startgame') {

        // 游戏模式显示
        if (Game.GetMapInfo().map_display_name == 'gemtd_1p') {
            $('#txt_game_mode').text = $.Localize('#'+'txt_game_mode_gemtd_1p');
        }
        if (Game.GetMapInfo().map_display_name == 'gemtd_race') {
            $('#txt_game_mode').text = $.Localize('#'+'txt_game_mode_gemtd_race');
        }
        if (Game.GetMapInfo().map_display_name == 'gemtd_coop') {
            $('#txt_game_mode').text = $.Localize('#'+'txt_game_mode_gemtd_coop') + '(' + data.p + 'P)';
        }

        // 欢迎和tips
        bullet_chat('', '', $.Localize('#'+'gamemode_' + data.map_name), '#fff');

        $.Schedule(5, function () {
            bullet_chat('', '', $.Localize('#'+'tipstitle') + $.Localize('#'+'tips' + Math.ceil(Math.random() * 15)), '#fff');

            $.Schedule(5, function () {
                var url = 'http://gemtd.ppbizon.com/gemtd/welcome?hehe=' + Math.random();

                RequestProxy(url, function(object){
                    if (object.err == 0 && object['msg_' + $.Language()]) {
                        bullet_chat('', '', object['msg_' + $.Language()]);
                    }
                });
            });
        });     

        // 从nettable获取玩家信息
        var my_player_info = CustomNetTables.GetTableValue("player_info_table", "player_info_"+local_id);
        my_maze_cache = my_player_info['my_maze'];
        rank_info = my_player_info['rank_info'];
        set_hero_sea(my_player_info);
        pcount = my_player_info.pcount;

        // if (($.Language() == 'schinese' && rank_info['all_level'] > 1)||rank_info['all_level'] > 4){
        // if (rank_info['rankall'] != '100%'){

        $("#hero_pool_button_panel").SetHasClass("invisible", false);
    }

    if (key == 'gem_team_gold') {
        var table_value = CustomNetTables.GetTableValue("game_state", "gem_team_gold");
        if (table_value) {
            $("#txt_gold").text = table_value.gold;
        }
    }

    if (key == 'gem_life') {
        var table_value = CustomNetTables.GetTableValue("game_state", "gem_life");
        if (table_value) {
            if (!table_value.gem_life || parseInt(table_value.gem_life) < 0) {
                table_value.gem_life = 0
            }
            $("#txt_hp").text = table_value.gem_life + "%";
        }
        // 显示血条
        for (var p = 0; p < data.p; p++) {
            $('#player_board_xuetiao_' + (p + 1) + '_1').SetHasClass('invisible', false);
            $('#player_board_xuetiao_' + (p + 1) + '_2').SetHasClass('invisible', false);
            $('#text_player_hp' + (p + 1)).text = table_value.gem_life + "%";
            if (table_value.gem_life <= 0) {
                $('#text_player_hp' + (p + 1)).text = "FAILED";
                $('#text_player_hp' + (p + 1)).style['color'] = '#bbb';
            }
            $('#player_hp' + (p + 1)).style['width'] = (table_value.gem_life / (table_value.gem_life_max||100)) * 245 + 'px';
        }

    }

    if (key == 'gem_life_race') {
        if (data.player == Game.GetLocalPlayerID()) {
            if (!data.gem_life || parseInt(data.gem_life) < 0) {
                data.gem_life = 0
            }
            $("#txt_hp").text = data.gem_life + "%";
        }

        // 显示血条
        $('#player_board_xuetiao_' + (data.player + 1) + '_1').SetHasClass('invisible', false);
        $('#player_board_xuetiao_' + (data.player + 1) + '_2').SetHasClass('invisible', false);
        $('#text_player_hp' + (data.player + 1)).text = data.gem_life + "%";
        if (data.gem_life <= 0) {
            $('#text_player_hp' + (data.player + 1)).text = "FAILED";
            $('#text_player_hp' + (data.player + 1)).style['color'] = '#bbb';
        }
        $('#player_hp' + (data.player + 1)).style['width'] = (data.gem_life / (data.gem_life_max||100)) * 245 + 'px';
        // var text_position = (data.gem_life/100)*200-45;
        // if (text_position < 5) {
        //     text_position = 5;
        // }
        // $('#text_player_hp'+(data.player+1)).style['margin-left'] = text_position+'px';
    }

    if (key == 'gem_top_runner') {
        $('#text_top_runner1').SetHasClass('invisible', true);
        $('#text_top_runner2').SetHasClass('invisible', true);
        $('#text_top_runner3').SetHasClass('invisible', true);
        $('#text_top_runner4').SetHasClass('invisible', true);

        $('#text_top_runner' + (data.player + 1)).SetHasClass('invisible', false);
    }

    if (key == 'disable_repick') {
        if (my_hero_index == data.heroindex) {
            IS_GAME_STARTED = true;
            $("#hero_pool_button_panel").SetHasClass("hidden", true);
            $("#button_board7").SetHasClass("invisible", true);
            hide_right_panel();
            hide_store_panel();
        }
    }
    if (key == 'disable_all_repick') {
        $("#hero_pool_button_panel").SetHasClass("invisible", true);
        $("#button_board7").SetHasClass("invisible", true);
        hide_right_panel();
        hide_store_panel();
    }

    // if (key == 'disable_all_repick'){
    //     $("#hero_pool_button_panel").SetHasClass("hidden",true);
    //     $("#right_panel").SetHasClass("hidden",true);
    //     // 商店也变灰
    //     $("#button_board7").style["visibility"] = "collapse";
    //     $("#store_panel").SetHasClass("hidden",true);
    // }

    if (key == "damage_stat") {

        var damages = [];
        var total_damage = 0;
        if (data.damage_table) {
            for (var i in data.damage_table) {
                total_damage += parseInt(data.damage_table[i] || 0);

                damages.push({
                    name: Entities.GetUnitName(parseInt(i)),
                    damage: data.damage_table[i],
                    max: Entities.GetAbilityByName(parseInt(i), "tower_mvp10")
                });
            }
        }
        damages.sort(function (a, b) { return b.damage - a.damage; });

        $('#panel_damage_stat').SetHasClass('invisible', false);
        for (var k = 0; k < 10; k++) {
            $("#panel_damage_stat_" + k).SetHasClass('invisible', true);
            $("#panel_damage_stat_text_per_" + k).style['color'] = "#bbb";
        }

        for (var j = 0; j < damages.length; j++) {
            if (j >= 10) break;

            var color = TOWER_LEVEL_COLOR[TOWER_LEVEL[damages[j].name]] || '#888';

            var n = $.Localize('#'+damages[j].name);
            // n = n.split('/')[0];
            var n = $.Localize('#'+damages[j].name);
            if (n.indexOf('/') > 0) {
                n = n.substr(n.length - 2);
            }

            var dps = Math.floor(damages[j].damage / data.time_this_level);

            if (dps > 1000) {
                dps = Math.floor(dps / 1000) + 'K';
            }

            $("#panel_damage_stat_" + j).SetHasClass('invisible', false);
            $("#panel_damage_stat_bar_" + j).style['width'] = '' + Math.floor(damages[j].damage / total_damage * 150) + 'px';
            $("#panel_damage_stat_text_" + j).text = n;
            $("#panel_damage_stat_text_" + j).style['color'] = color;
            $("#panel_damage_stat_text_per_" + j).text = '(' + dps + ')';

            if (damages[j].max >= 0) {
                $("#panel_damage_stat_text_per_" + j).text = '(' + dps + ') MAX';
            }
        }

    }

    if (key == "damage_stat_race") {
        for (var ii in data.damage_table) {
            if (ii == Game.GetLocalPlayerID()) {
                var damages = [];
                var total_damage = 0;
                if (data.damage_table[ii]) {
                    for (var i in data.damage_table[ii]) {
                        total_damage += parseInt(data.damage_table[ii][i] || 0);

                        damages.push({ name: Entities.GetUnitName(parseInt(i)), damage: data.damage_table[ii][i], max: Entities.GetAbilityByName(parseInt(i), "tower_mofa10") });
                    }
                }
                if (total_damage <= 0) {
                    return;
                }
                damages.sort(function (a, b) { return b.damage - a.damage; });

                for (var k = 0; k < 10; k++) {
                    $("#panel_damage_stat_" + k).SetHasClass('invisible', true);
                    $("#panel_damage_stat_text_per_" + k).style['color'] = "#bbb";
                }

                for (var j = 0; j < damages.length; j++) {
                    if (j >= 10) break;

                    var color = TOWER_LEVEL_COLOR[TOWER_LEVEL[damages[j].name]] || '#888';

                    var n = $.Localize('#'+damages[j].name);
                    // n = n.split('/')[0];
                    var n = $.Localize('#'+damages[j].name);
                    if (n.indexOf('/') > 0) {
                        n = n.substr(n.length - 2);
                    }

                    var dps = Math.floor(damages[j].damage / data.time_this_level);

                    if (dps > 1000) {
                        dps = Math.floor(dps / 1000) + 'K';
                    }

                    $("#panel_damage_stat_" + j).SetHasClass('invisible', false);
                    $("#panel_damage_stat_bar_" + j).style['width'] = '' + Math.floor(damages[j].damage / total_damage * 150) + 'px';
                    $("#panel_damage_stat_text_" + j).text = n;
                    $("#panel_damage_stat_text_" + j).style['color'] = color;
                    $("#panel_damage_stat_text_per_" + j).text = '(' + dps + ' dps / ' + Math.floor(damages[j].damage / total_damage * 100) + '%)';

                    if (damages[j].max >= 0) {
                        $("#panel_damage_stat_text_per_" + j).text = '(' + dps + ' dps / ' + Math.floor(damages[j].damage / total_damage * 100) + '%) MAX';
                    }
                }
            }
        }
    }

    if (key == 'gem_merge_board') { //更新合成面板
        var table_value = CustomNetTables.GetTableValue("game_state", "gem_merge_board");
        if (table_value) {
            var c = "lbl";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("no", true);
            }
            var c = "item0";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("huibeijing", false);
            }
            var c = "item1";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("huibeijing", false);
            }
            var c = "item2";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("huibeijing", false);
            }
            var c = "item3";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("huibeijing", false);
            }
            // 更新合成面板的状态
            //$("#gemtd_jixueshi").SetHasClass("no",false);
            for (var i in table_value) {
                var c = table_value[i];
                var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
                for (var j in xxx) {
                    if (xxx[j].BHasClass("lbl") && !xxx[j].BHasClass("only_1turn")) {
                        xxx[j].SetHasClass("no", false);
                    }
                    if (xxx[j].BHasClass("item0") && !xxx[j].BHasClass("only_1turn")) {
                        xxx[j].SetHasClass("huibeijing", true);
                    }
                    if (xxx[j].BHasClass("item1") && !xxx[j].BHasClass("only_1turn")) {
                        xxx[j].SetHasClass("huibeijing", true);
                    }
                    if (xxx[j].BHasClass("item2") && !xxx[j].BHasClass("only_1turn")) {
                        xxx[j].SetHasClass("huibeijing", true);
                    }
                    if (xxx[j].BHasClass("item3") && !xxx[j].BHasClass("only_1turn")) {
                        xxx[j].SetHasClass("huibeijing", true);
                    }
                }
            }
        }
    }
    if (key == 'gem_merge_board_race') { //更新合成面板 竞速模式
        var table_value = CustomNetTables.GetTableValue("game_state", "gem_merge_board_race");
        if (table_value.player == Game.GetLocalPlayerID()) {
            table_value = table_value.pool;
            var c = "lbl";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("no", true);
            }
            var c = "item0";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("huibeijing", false);
            }
            var c = "item1";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("huibeijing", false);
            }
            var c = "item2";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("huibeijing", false);
            }
            var c = "item3";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("huibeijing", false);
            }
            // 更新合成面板的状态
            //$("#gemtd_jixueshi").SetHasClass("no",false);
            for (var i in table_value) {
                var c = table_value[i];
                var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
                for (var j in xxx) {
                    if (xxx[j].BHasClass("lbl") && !xxx[j].BHasClass("only_1turn")) {
                        xxx[j].SetHasClass("no", false);
                    }
                    if (xxx[j].BHasClass("item0") && !xxx[j].BHasClass("only_1turn")) {
                        xxx[j].SetHasClass("huibeijing", true);
                    }
                    if (xxx[j].BHasClass("item1") && !xxx[j].BHasClass("only_1turn")) {
                        xxx[j].SetHasClass("huibeijing", true);
                    }
                    if (xxx[j].BHasClass("item2") && !xxx[j].BHasClass("only_1turn")) {
                        xxx[j].SetHasClass("huibeijing", true);
                    }
                    if (xxx[j].BHasClass("item3") && !xxx[j].BHasClass("only_1turn")) {
                        xxx[j].SetHasClass("huibeijing", true);
                    }
                }
            }
        }
    }

    if (key == 'gem_merge_board_curr') { //更新合成面板(本回合)
        var table_value = CustomNetTables.GetTableValue("game_state", "gem_merge_board_curr");
        if (table_value) {
            var c = "item0";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("waifaguang", false);
                xxx[j].SetHasClass("waifaguang_no", true);
            }
            var c = "item1";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("waifaguang", false);
                xxx[j].SetHasClass("waifaguang_no", true);
            }
            var c = "item2";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("waifaguang", false);
                xxx[j].SetHasClass("waifaguang_no", true);
            }
            var c = "item3";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("waifaguang", false);
                xxx[j].SetHasClass("waifaguang_no", true);
            }
            // 更新合成面板的状态
            //$("#gemtd_jixueshi").SetHasClass("no",false);
            for (var i in table_value) {
                var c = table_value[i];
                var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
                for (var j in xxx) {
                    if (xxx[j].BHasClass("item0")) {
                        xxx[j].SetHasClass("waifaguang", true);
                        xxx[j].SetHasClass("waifaguang_no", false);
                    }
                    if (xxx[j].BHasClass("item1")) {
                        xxx[j].SetHasClass("waifaguang", true);
                        xxx[j].SetHasClass("waifaguang_no", false);
                    }
                    if (xxx[j].BHasClass("item2")) {
                        xxx[j].SetHasClass("waifaguang", true);
                        xxx[j].SetHasClass("waifaguang_no", false);
                    }
                    if (xxx[j].BHasClass("item3")) {
                        xxx[j].SetHasClass("waifaguang", true);
                        xxx[j].SetHasClass("waifaguang_no", false);
                    }
                }
            }
        }
    }
    if (key == 'gem_merge_board_curr_race') { //更新合成面板(本回合) 竞速模式
        var table_value = CustomNetTables.GetTableValue("game_state", "gem_merge_board_curr_race");
        if (table_value.player == Game.GetLocalPlayerID()) {
            table_value = table_value.pool;

            var c = "item0";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("waifaguang", false);
                xxx[j].SetHasClass("waifaguang_no", true);
            }
            var c = "item1";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("waifaguang", false);
                xxx[j].SetHasClass("waifaguang_no", true);
            }
            var c = "item2";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("waifaguang", false);
                xxx[j].SetHasClass("waifaguang_no", true);
            }
            var c = "item3";
            var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
            for (var j in xxx) {
                xxx[j].SetHasClass("waifaguang", false);
                xxx[j].SetHasClass("waifaguang_no", true);
            }
            // 更新合成面板的状态
            //$("#gemtd_jixueshi").SetHasClass("no",false);
            for (var i in table_value) {
                var c = table_value[i];
                var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
                for (var j in xxx) {
                    if (xxx[j].BHasClass("item0")) {
                        xxx[j].SetHasClass("waifaguang", true);
                        xxx[j].SetHasClass("waifaguang_no", false);
                    }
                    if (xxx[j].BHasClass("item1")) {
                        xxx[j].SetHasClass("waifaguang", true);
                        xxx[j].SetHasClass("waifaguang_no", false);
                    }
                    if (xxx[j].BHasClass("item2")) {
                        xxx[j].SetHasClass("waifaguang", true);
                        xxx[j].SetHasClass("waifaguang_no", false);
                    }
                    if (xxx[j].BHasClass("item3")) {
                        xxx[j].SetHasClass("waifaguang", true);
                        xxx[j].SetHasClass("waifaguang_no", false);
                    }
                }
            }
        }
    }

    if (key == 'select_hero1') {
        if (data.p1) {
            $("#player_hero1").style['background-image'] = 'url("file://{images}/custom_game/heros/' + data.p1 + '.png");';
        }
        if (data.p2) {
            $("#player_hero2").style['background-image'] = 'url("file://{images}/custom_game/heros/' + data.p2 + '.png");';
        }
        if (data.p3) {
            $("#player_hero3").style['background-image'] = 'url("file://{images}/custom_game/heros/' + data.p3 + '.png");';
        }
        if (data.p4) {
            $("#player_hero4").style['background-image'] = 'url("file://{images}/custom_game/heros/' + data.p4 + '.png");';
        }

    }

    if (key == 'show_ggsimida') {
        $('#panel_ggsimida').SetHasClass('hidden', false);
    }
    if (key == 'show_ggsimida_race') {
        if (Game.GetLocalPlayerID() == data.player) {
            $('#panel_ggsimida').SetHasClass('hidden', false);
        }
    }

    if (key == 'send_ranking') { //发送成绩
        var auth = parseInt(data.seed) * parseInt(data.level) * 7;
        end_game_extra_data = {
            towers: data.towers,
            maze_length: data.maze_length,
            player_ids: data.player_ids
        };

        var url = 'http://gemtd.ppbizon.com/gemtd/ranking/add/@' + data.time_cost + '@' + data.level + '@' + data.kills + '@' + data.player_ids + '@' + (data.finishd_quest || ',') + '@' + local_id + '?hehe=' + Math.random() + '&towers=' + data.towers + '&ac=20180827&gold=' + data.gold + '&extra_kill=' + data.extra_kill + '&maze_length=' + data.maze_length+'&player_count='+data.player_count;

        GameEvents.SendCustomGameEventToServer("catch_crab", { url: url, cb: 'send_ranking_cb', user: local_id });
    }
    if (key == 'send_ranking_cb') {
        if (!data) {
            return;
        }
        if (data.user != local_id) return;

        var object = JSON.parse(data.crab);

        if (object.err == 1200) {
            show_msg(object.msg);
            return;
        }

        var is_win = false;
        if (object.level > 50) {
            is_win = true;
        }

        var beat_percent1 = Math.floor(((1.0 - (parseInt(object.rank) + 0.0) / (parseInt(object.total) || 1)) * 100));

        var beat_percent = beat_percent1;
        if (beat_percent < 0) beat_percent = 0;
        if (beat_percent > 100) beat_percent = 100;

        var stars = "★";
        if (beat_percent >= 99) {
            stars = "★★★★★";
        }
        else if (beat_percent >= 90) {
            stars = "★★★★";
        }
        else if (beat_percent >= 75) {
            stars = "★★★";
        }
        else if (beat_percent >= 50) {
            stars = "★★";
        }

        // 结束面板已搬到 end.xml(EndScreen)，由 end.js 用 net table 填充；
        // 这里(游戏内 Hud)已经没有 #panel_end_game，跳过这段，只保留下面的通关奖励逻辑
        if ($("#panel_end_game")) {
            if (is_win) {
                Game.EmitSound("Loot_Drop_Stinger_Arcana");
                // $("#panel_end_game_title").style["background-color"] = "#ff4444";
                $("#label_end_game_title").SetHasClass("end_game_win", true);
                $("#label_end_game_title").SetHasClass("end_game_lose", false);
                $("#label_end_game_title").text = $.Localize('#'+"end_game_defender_win");
            }
            else {
                Game.EmitSound("diretide_roshdeath_Stinger");
                // $("#panel_end_game_title").style["background-color"] = "#777777";
                $("#label_end_game_title").SetHasClass("end_game_win", false);
                $("#label_end_game_title").SetHasClass("end_game_lose", true);
                $("#label_end_game_title").text = $.Localize('#'+"end_game_enemy_win");
            }

            // 填写战绩
            $("#label_end_game_subtitle2").text = (object.level - 1);
            $("#label_end_game_subtitle6").text = (object.kill);
            // $("#label_end_game_subtitle4").text = Math.floor(parseInt(data.boss_damage)/1000)+'k';

            if (is_win) {
                $("#label_end_game_subtitle4").text = time2showtime_hour(object.time);
            }
            else {
                $("#label_end_game_subtitle4").text = time2showtime_hour(object.time);
            }

            $("#panel_end_game").style["opacity"] = 0.95;
            $("#label_beat_percent").text = $.Localize('#'+"end_game_beat_1") + beat_percent + $.Localize('#'+"end_game_beat_2") + object.player_count + $.Localize('#'+"end_game_beat_3") + stars;
            update_end_game_towers(object.towers || (end_game_extra_data && end_game_extra_data.towers));
            var maze_table = CustomNetTables.GetTableValue("game_state", "gem_maze_length");
            var maze_length = object.maze_length || (end_game_extra_data && end_game_extra_data.maze_length) || (maze_table && maze_table.length) || 0;
            $("#end_game_maze_length").text = maze_length;
            update_end_game_avatars(object.player_ids || (end_game_extra_data && end_game_extra_data.player_ids));
        }

        // 通关奖励：弹窗已在 end.xml/end.js(结束界面)里弹，这里只更新 HUD 上的贝壳数
        if (object.award > 0) {
            $("#store_shell_count").text = "× " + object.shell || "0";
        }
    }

    if (key == 'send_http') {
        var url = CustomNetTables.GetTableValue("game_state", "send_http").url;

        RequestProxy(url, function(object){

        });
    }
    if (key == "victory_condition") {
        if (data.kills_to_win) {

            $("#txt_wave").text = data.kills_to_win;

            if (data.enemy_show != 'gemtd_stone') {
                // 解决奇葩bug
                var show = data.enemy_show=='gemtd_yu'?'gemtd_yu_true':data.enemy_show;

                var text = '<DOTAScenePanel id="enemy_show_' + show + '" style="width:320px;height:320px;" unit="' + show + '" light="global_light" antialias="true" renderdeferred="false" rotateonhover="true" yawmin="-45" yawmax="45" pitchmin="-0" pitchmax="0" particleonly="false"/>';
                $('#enemy_show').RemoveAndDeleteChildren();
                // $('#enemy_show').BCreateChildren(text);
                CreateChildren($('#enemy_show'), text);

                $('#enemy_show_name').text = $.Localize('#'+data.enemy_show || '');
            }

        }
    }
    if (key == "victory_condition_race") {
        if (data.player == Game.GetLocalPlayerID()) {
            if (data.kills_to_win) {

                $("#txt_wave").text = data.kills_to_win;

                if (data.enemy_show != 'gemtd_stone') {
                    var text = '<DOTAScenePanel id="enemy_show_' + data.enemy_show + '" style="width:320px;height:320px;" unit="' + data.enemy_show + '" light="global_light" antialias="true" renderdeferred="false" rotateonhover="true" yawmin="-45" yawmax="45" pitchmin="-0" pitchmax="0"  particleonly="false"/>';
                    $('#enemy_show').RemoveAndDeleteChildren();
                    // $('#enemy_show').BCreateChildren(text);
                    CreateChildren($('#enemy_show'), text);


                    $('#enemy_show_name').text = $.Localize('#'+data.enemy_show || '');
                }

            }
        }
    }

    if (key == "player_disconnect") {

        // $("#panel_notice").style['opacity'] = "1";
        // $("#text_notice").text = "#player_board"+(data.user_name+1+"")+" 掉线了！";
        // $.Schedule(2,function(){
        //     $("#panel_notice").style['opacity'] = "0";
        // });

        $("#panel_player_board" + (data.id + 1 + "")).style["opacity"] = "0.3";
    }

    if (key == "player_connect") {
        $("#panel_player_board" + (data.id + 1 + "")).SetHasClass("hidden", false);
        $("#panel_player_board" + (data.id + 1 + "")).style["opacity"] = "1";
    }

    if (key == "show_maze_map") {
        var mz = data.map;

        if (mz.length < 10) {
            mz = "http://gemtd.ppbizon.com/pic/show?file_name=" + mz + ".png";
        }
        $("#shared_map").SetImage(mz);

        $("#map_board").style["position"] = "0px 0px 0px";
        is_map_board_open = true;

        hide_right_panel();
        hide_store_panel();
        $("#gameinfo_board").style["position"] = "1200px 0px 0px";
        $("#ranking_board").style["position"] = "3000px 0px 0px";
        $("#merge_board").style["position"] = "3000px 0px 0px";

        is_heropool_board_open = false;
        is_store_board_open = false;
        is_gameinfo_board_open = false;
        is_ranking_board_open = false;
        is_friend_board_open = false;
        is_merge_board_open = false;
    }

    //监听cdkey输入，激活角色/贝壳
    if (key == 'cdkey') {
        var steamid = data.steam_id;
        if (local_id == steamid) {
            SendCdkeyHTTP(data.text);
        }
    }

    if (key == 'crab') {



       
    }

    if (key == 'save_maze_cb') {
        if (data.player != undefined && data.player != Game.GetLocalPlayerID()) {
            return;
        }
        var r = JSON.parse(data.crab);
        if (r.err == 0) {
            $("#store_shell_count").text = "× " + r.shell;

            show_msg($.Localize('#'+"notice_save_maze_success"));
        }
        else {
            show_msg($.Localize('#'+"notice_save_maze_failed"));
        }
    }

    if (key == 'buy_b_cb') {
        if (data.user != local_id) return;
        var object = JSON.parse(data.crab);
        if (object.err == 0) {
            is_rolling = true;
            for (var l = 0; l < 30; l++) {
                if (object.fake[l] && object.fake[l].award) {
                    if (object.fake[l].award.slice(0, 1) != "s") {
                        if (object.fake[l].award.slice(1, 2) == "1") {
                            $('#lottery_' + l).style['border-bottom'] = '20px solid rgb(128,128,128)';
                        }
                        if (object.fake[l].award.slice(1, 2) == "2") {
                            $('#lottery_' + l).style['border-bottom'] = '20px solid rgb(64,64,255)';
                        }
                        if (object.fake[l].award.slice(1, 2) == "3") {
                            $('#lottery_' + l).style['border-bottom'] = '20px solid rgb(200,0,200)';
                        }
                        if (object.fake[l].award.slice(1, 2) == "4") {
                            $('#lottery_' + l).style['border-bottom'] = '20px solid rgb(255,128,0)';
                        }
                    }
                    else {
                        $('#lottery_' + l).style['border-bottom'] = '20px solid rgb(128,128,128)';
                    }

                    if (object.fake[l].award.slice(0, 1) == "h") {
                        $('#lottery_' + l).style['background-image'] = 'url("file://{images}/custom_game/heros/' + HERO_LIST[object.fake[l].award] + '.png")';
                    }
                    if (object.fake[l].award.slice(0, 1) == "s") {
                        $('#lottery_' + l).style['background-image'] = 'url("file://{images}/custom_game/lottery/shell.png")';
                    }
                    if (object.fake[l].award.slice(0, 1) == "a") {
                        $('#lottery_' + l).style['background-image'] = 'url("file://{images}/custom_game/lottery/gem_' + object.fake[l].award + '.png")';
                    }
                    if (object.fake[l].award.slice(0, 1) == "e") {
                        $('#lottery_' + l).style['background-image'] = 'url("file://{images}/custom_game/lottery/' + object.fake[l].award + '.png")';
                    }

                }
                else {
                    $('#lottery_' + l).style['border-bottom'] = '20px solid rgb(64,64,64)';
                    $('#lottery_' + l).style['background-image'] = 'url("file://{images}/custom_game/lottery/oops' + Math.ceil(Math.random() * 11) + '.png")';
                    $('#lottery_effect_' + l).SetHasClass('invisible', true);
                }
            }
            $('#go_lottery').SetHasClass('invisible', false);
            var s = Game.EmitSound('ui.treasure_spin');
            $('#lottery_track').style['position'] = "-4762px 0px 0px";
            $.Schedule(5, function () {
                Game.StopSound(s);
                Game.EmitSound('ui.npe_objective_given');
            });
            $.Schedule(6, function () {
                $('#go_lottery').SetHasClass('invisible', true);
                $('#lottery_track').style['transition-duration'] = "0.5s";
                $('#lottery_track').style['position'] = "0px 0px 0px";
                if (!object.award) {
                    show_msg($.Localize('#'+"notice_unlucky"));
                    $("#store_shell_count").text = "× " + object.shell;
                }
                else {
                    if (object.award.slice(0, 1) == 'h') {
                        open_panel_award('gem', 'hero', object.award, '1', 'luckybox');
                    }
                    if (object.award.slice(0, 1) == 'a') {
                        open_panel_award('gem', 'gemability', object.award, '1', 'luckybox');
                    }
                    if (object.award.slice(0, 1) == 'e') {
                        open_panel_award('gem', 'effect', object.award, '1', 'luckybox');
                    }
                    if (object.award.slice(0, 1) == 's') {
                        open_panel_award('gem', 'shell', '', object.award.slice(1), 'luckybox');
                    }

                    refresh_hero_sea();
                }
                refresh_store();
                $.Schedule(1, function () {
                    is_rolling = false;
                    $('#lottery_track').style['transition-duration'] = "5s";
                })
            })
        }
        else {
            // 购买失败
            show_msg($.Localize('#'+"notice_buy_failed"));
        }
    }
    if (key == 'buy_h_cb') {
        if (data.user != local_id) return;
        var object = JSON.parse(data.crab);
        if (object.err == 0) {
            // 成功了
            open_panel_award('gem', 'hero', object.award, '1', 'shellstore');
            refresh_hero_sea();
        }
        else {
            // 购买失败
            show_msg($.Localize('#'+"notice_buy_failed"));
        }
    }
    if (key == 'buy_a_cb') {
        if (data.user != local_id) return;
        var object = JSON.parse(data.crab);
        if (object.err == 0) {
            // 成功了
            open_panel_award('gem', 'gemability', object.award, '1', 'shellstore');
            refresh_hero_sea();
        }
        else {
            // 购买失败
            show_msg($.Localize('#'+"notice_buy_failed"));
        }
    }
    if (key == 'buy_e_cb') {
        if (data.user != local_id) return;
        var object = JSON.parse(data.crab);
        if (object.err == 0) {
            // 成功了
            open_panel_award('gem', 'effect', object.award, '1', 'shellstore');
            refresh_hero_sea();
        }
        else {
            // 购买失败
            show_msg($.Localize('#'+"notice_buy_failed"));
        }
    }
    if (key == 'buy_t_cb') {
        if (data.user != local_id) return;

        var object = JSON.parse(data.crab);
        if (object.err == 0) {
            // 成功了
            open_panel_award('gem', 'item', object.award, '1', 'shellstore');
            refresh_hero_sea();
        }
        else {
            // 购买失败
            show_msg($.Localize('#'+"notice_buy_failed"));
        }
    }
    if (key == 'recycle_cb') {
        if (data.user != local_id) return;
        var object = JSON.parse(data.crab);
        if (object.err == 0) {
            $("#store_shell_count").text = "× " + object.shell;

            //汰换成功
            show_msg($.Localize('#'+"notice_recycle_success"));

            refresh_hero_sea();

        }
    }
    if (key == 'delete_cb') {
        if (data.user != local_id) return;
        var object = JSON.parse(data.crab);
        if (object.err == 0) {
            //删除成功
            show_msg($.Localize('#'+"notice_delete_success"));
            refresh_hero_sea();
        }
        else {
            //删除失败
            show_msg($.Localize('#'+"notice_delete_fail"));
        }
    }
    if (key == 'race_gameover_show') {
        $('#race_gameover').SetHasClass('invisible', false);

        var stat_arr = [];
        for (var i in data.stat) {
            if (data.stat[i] && data.stat[i].steam_id) {
                stat_arr.push(data.stat[i]);
            }
        }
        stat_arr.sort(function (a, b) {
            return b.game_time - a.game_time;
        });

        Game.EmitSound("Loot_Drop_Stinger_Arcana");

        for (var i = 0; i < stat_arr.length; i++) {
            $('#race_avatar_' + (i + 1)).steamid = stat_arr[i].steam_id;
            $('#race_player_' + (i + 1)).steamid = stat_arr[i].steam_id;
            $('#race_player_' + (i + 1)).SetHasClass('invisible', false);
            $('#race_hero_' + (i + 1)).SetHasClass('invisible', false);
            // $('#race_hero_border_'+(i+1)).SetHasClass('invisible',false);
            $('#race_hero_' + (i + 1)).style['background-image'] = 'url("file://{images}/custom_game/heros/' + stat_arr[i].hero + '.png");';
            $('#race_level_' + (i + 1)).SetHasClass('invisible', false);
            if (stat_arr[i].steam_id == local_id && !stat_arr[i].mmr_level && my_mmr_level) {
                stat_arr[i].mmr_level = my_mmr_level;
            }
            if (parseInt(stat_arr[i].mmr_level) > 0) {
                $('#race_level_' + (i + 1)).style['background-image'] = 'url("file://{images}/custom_game/rank/race_rank_' + stat_arr[i].mmr_level + '.png");';
                $('#race_level_lbl_' + (i + 1)).text = 26 - parseInt(stat_arr[i].mmr_level);
                if (parseInt(stat_arr[i].mmr_level) == 25) {
                    $('#race_level_lbl_' + (i + 1)).style['color'] = 'yellow';
                }
                else {
                    $('#race_level_lbl_' + (i + 1)).style['color'] = '#fff';
                }
            }
            $('#race_wave_' + (i + 1)).text = stat_arr[i].wave;
            $('#race_kill_' + (i + 1)).text = stat_arr[i].kills;
            $('#race_miss_' + (i + 1)).text = stat_arr[i].miss;
            $('#race_maze_' + (i + 1)).text = stat_arr[i].maze_length || '0';
            $('#race_duration_' + (i + 1)).text = time2showtime_hour(stat_arr[i].game_time);

        }

        $.Schedule(20, function () {
            $('#race_gameover').SetHasClass('invisible', true);
        })
    }

    //CustomNetTables:SetTableValue( "game_state", "send_http", { url = url } );
}
var path_list_coop = [
    '5_19', '33_19', '5_33', '19_5', '19_33'
];
var path_list_race = [
    '3_9', '15_9', '3_15', '9_3', '9_15'
];
function OnGameMazeChanged(table, key, data) {
    if (key == "show_maze_guide") {
        var t = data.t;
        var str = "";
        if (data.player != undefined && data.player != Game.GetLocalPlayerID()) {
            return;
        }
        if (data.map == 'gemtd_race') {
            // 竞速模式
            $('#map_board_title_text').text = $.Localize('#'+'text_map_board_title') + ' RACE';
            $('#maze_guide_coop').SetHasClass('invisible', true);
            $('#maze_guide_race').SetHasClass('invisible', false);

            for (var i in t) {
                str += '<Panel class="block_line_race">';
                for (var j in t[i]) {
                    if (path_list_race.indexOf(i + '_' + j) >= 0) {
                        str += '<Panel class="block2_race"/>';
                    }
                    else {
                        str += '<Panel class="block' + t[i][j] + '_race"/>';
                    }

                }
                str += '</Panel>';
            }
            $('#maze_guide_race_' + data.maze_index).RemoveAndDeleteChildren();
            // $('#maze_guide_race_' + data.maze_index).BCreateChildren(str);
            CreateChildren($('#maze_guide_race_' + data.maze_index), str);

            $('#maze_guide_coop_' + data.maze_index).style['width'] = '330px';
            $('#maze_guide_coop_' + data.maze_index).style['height'] = '330px';
        }
        else {
            // 合作模式
            // FindDotaHudElement('ToggleScoreboardButton').style['opacity'] = '1';
            // GameUI.SetDefaultUIEnabled( DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, true );
            $('#maze_guide_coop').SetHasClass('invisible', false);
            $('#maze_guide_race').SetHasClass('invisible', true);

            for (var i in t) {
                str += '<Panel class="block_line">';
                for (var j in t[i]) {
                    if (path_list_coop.indexOf(i + '_' + j) >= 0) {
                        str += '<Panel class="block2"/>';
                    }
                    else {
                        str += '<Panel class="block' + t[i][j] + '"/>';
                    }

                }
                str += '</Panel>';
            }
            $('#maze_guide_coop_' + data.maze_index).RemoveAndDeleteChildren();
            // $('#maze_guide_coop_' + data.maze_index).BCreateChildren(str);
            CreateChildren($('#maze_guide_coop_' + data.maze_index), str);
        }
    }
}


var c = "lbl";
var xxx = $("#hehehe").FindChildrenWithClassTraverse(c);
for (var j in xxx) {
    xxx[j].SetHasClass("no", true);
}

$("#hehehe").steamid = Game.GetPlayerInfo(0).player_steamid;

$("#txt_wave").text = "0";

CustomNetTables.SubscribeNetTableListener("game_state", OnGameStateChanged);
CustomNetTables.SubscribeNetTableListener("game_maze", OnGameMazeChanged);

GameEvents.Subscribe("show_money", OnShowMoney);


function OnShowMoney(keys) {
    var money = keys.money;
    if (money || money == 0) {
        $("#txt_gold").text = money;
    }
}

GameEvents.Subscribe("show_enemy_count", OnShowEnemyCount);

function OnShowEnemyCount(keys) {
    var count = keys.count;
    if (count || count == 0) {
        $("#txt_enemy").text = '× ' + count;
    }
}


GameEvents.Subscribe("show_kill_stat", OnShowKillStat);

function OnShowKillStat(keys) {
    $("#txt_kills_unkills").text = (keys.kill || 0) + ' / ' + (keys.unkill || 0);
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

function OnDrawRightIn(a, pos) {
    var title = $.Localize('#'+a);
    var text = $.Localize('#'+a + '_help');
    //text = text.replace(': ','<br>------------------<br>');
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + a), title, text);
}

function OnDrawRightOut(a) {
    $.DispatchEvent("DOTAHideTitleTextTooltip");
}

// function OnMouseInStoreHero(index, pos){
//     var text = $.Localize('#'+goods_list[index].name+'_help');
//     $.DispatchEvent( "DOTAShowTextTooltip", $("#"+pos), text );
// }

// function OnMouseOutStoreHero(){
//     $.DispatchEvent( "DOTAHideTextTooltip");
// }

function OnMouseInMmr(index, level, pos) {
    var text = $.Localize('#'+'top_ui_mmr_1') + " " + mmr_rank[index];
    text += "<br>" + $.Localize('#'+'top_ui_mmr_2') + " " + (100 - mmr_per[index]) + "% " + $.Localize('#'+'top_ui_mmr_3');
    // $.DispatchEvent( "DOTAShowTextTooltip", $("#"+pos), text );

    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize('#'+'level_' + level + '_help'), text);
}

function OnMouseOutMmr(pos) {
    $.DispatchEvent("DOTAHideTitleTextTooltip", $("#" + pos));
}

function OnMouseInStore(index) {
    var g = STORE_LIST[index].id;

    if (ABILITY_LIST[g]) { // 技能
        $.DispatchEvent("DOTAShowAbilityTooltip", $("#store_panel_" + index), ABILITY_LIST[g]);
    }
    if (TOY_LIST[g]) { // 玩具
        $.DispatchEvent("DOTAShowAbilityShopItemTooltip", $("#store_panel_" + index), 'item_' + TOY_LIST[g], 'item_' + TOY_LIST[g], 0);
    }
    if (STORE_LIST[index].rarity.indexOf('luckybox') > -1) { // 宝箱
        $.DispatchEvent("DOTAShowTitleTextTooltip", $("#store_panel_" + index), $.Localize('#'+'title_store_tooltip_luckybox'), $.Localize('#'+'text_store_tooltip_luckybox'));
    }
    if (STORE_LIST[index].rarity.indexOf('hero') > -1) { // 英雄
        $.DispatchEvent("DOTAShowTitleTextTooltip", $("#store_panel_" + index), $.Localize('#'+'title_store_tooltip_hero'), $.Localize('#'+'text_store_tooltip_hero'));
    }
    if (STORE_LIST[index].rarity.indexOf('effect') > -1) { // 特效
        $.DispatchEvent("DOTAShowTitleTextTooltip", $("#store_panel_" + index), $.Localize('#'+'title_store_tooltip_effect'), $.Localize('#'+'text_store_tooltip_effect'));
    }

}
function OnMouseOutStore() {
    $.DispatchEvent("DOTAHideAbilityTooltip");
    $.DispatchEvent("DOTAHideTitleTextTooltip");
}


function click_map_to_share(m) {
    GameEvents.SendCustomGameEventToServer("player_share_map", { "map": default_maze[m] });
}


function close_store() {
    hide_store_panel();
    is_store_board_open = false;
    //商城关掉时二维码弹窗一起关掉，避免弹窗藏在已关闭的商店后面
    HideStoreQRPopup();
}

function confirm_buy() {
    $("#confirm_buy").style["position"] = "0px -1000px 0px";
    local_id = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
    if (buy_x == 'save_maze') {
        GameEvents.SendCustomGameEventToServer("save_maze", { player_id: Game.GetLocalPlayerID(), steam_id: local_id });
        return;
    }
    var buy_info = STORE_LIST[buy_x];

    var buy_id = buy_info.id;
    if (buy_id.slice(0, 1) == "b") {
        if (is_rolling) {
            show_msg($.Localize('#'+"notice_buy_failed"));
            return;
        }
        // 开宝箱！
        var buy_url = "http://gemtd.ppbizon.com/gemtd/201803/boxwinter/buy/@" + local_id + "?hehe=" + Math.random();
        GameEvents.SendCustomGameEventToServer("catch_crab", { url: buy_url, cb: 'buy_b_cb', user: local_id });
    }
    if (buy_id.slice(0, 1) == "h") {
        // 买英雄！
        var buy_url = "http://gemtd.ppbizon.com/gemtd/201803/hero/buy/" + buy_id + "@" + local_id + "?hehe=" + Math.random();
        GameEvents.SendCustomGameEventToServer("catch_crab", { url: buy_url, cb: 'buy_h_cb', user: local_id });
    }
    if (buy_id.slice(0, 1) == "a") {
        // 买技能！
        var buy_url = "http://gemtd.ppbizon.com/gemtd/201803/ability/buy/" + buy_id + "@" + my_onduty_hero_id + "@" + local_id + "?hehe=" + Math.random();
        GameEvents.SendCustomGameEventToServer("catch_crab", { url: buy_url, cb: 'buy_a_cb', user: local_id });
    }
    if (buy_id.slice(0, 1) == "e") {
        // 买特效！
        var buy_url = "http://gemtd.ppbizon.com/gemtd/201803/effect/buy/" + buy_id + "@" + my_onduty_hero_id + "@" + local_id + "?hehe=" + Math.random();
        GameEvents.SendCustomGameEventToServer("catch_crab", { url: buy_url, cb: 'buy_e_cb', user: local_id });
    }
    if (buy_id.slice(0, 1) == "t") {
        // 买玩具！
        var buy_url = "http://gemtd.ppbizon.com/gemtd/201811/toy/buy/" + buy_id + "@" + local_id + "?hehe=" + Math.random();
        GameEvents.SendCustomGameEventToServer("catch_crab", { url: buy_url, cb: 'buy_t_cb', user: local_id });
    }

}
function buy(x) {
    var goods = STORE_LIST[x];
    var buy_name = "";
    buy_x = x;

    if (goods.pic == "hero_avatar") {
        buy_name = $.Localize('#'+HERO_LIST[goods.id]);
    }
    else {
        buy_name = $.Localize('#'+goods.id);
    }

    if (TOY_LIST[goods.id]) {
        buy_name = $.Localize('#'+'award_name_item_' + TOY_LIST[goods.id]);
    }

    $("#text_confirm_buy").text = $.Localize('#'+"text_confirm_buy") + ' ' + buy_name + '?';
    $("#confirm_buy").style["position"] = "0px 0px 0px";

}
function close_confirm_buy() {
    $("#confirm_buy").style["position"] = "0px -1000px 0px";
}

function show_recycle(x) {
    var curr = 0;
    var number = 0;
    for (var i in my_hero_sea) {
        if (x == number) {
            curr = i;
        }
        number++;
    }
    if (curr != my_onduty_hero_id) {
        $("#hero_sea_recycle_" + x).SetHasClass("hidden", false);
    }
}
function hide_recycle(i) {
    $("#hero_sea_recycle_" + i).SetHasClass("hidden", true);
}

function recycle(recycle_i) {
    var curr = 0;
    var number = 0;
    var index_from = ((my_hero_cards_curr_page || 1) - 1) * 16;
    recycle_i = recycle_i + index_from;
    for (var i in my_hero_sea) {
        if (recycle_i == number) {
            curr = i;
        }
        number++;
    }
    $("#text_confirm_recycle").text = $.Localize('#'+"text_confirm_recycle") + ' ' + $.Localize('#'+HERO_LIST[curr]) + '?';
    $("#confirm_recycle").style["position"] = "0px 0px 0px";
    recycle_x = curr;
}

function confirm_recycle() {
    $("#confirm_recycle").style["position"] = "0px -1000px 0px";
    var recycle_url = "http://gemtd.ppbizon.com/gemtd/hero/recycle/progress/" + recycle_x + "@" + local_id + '?hehe=' + Math.random();
    GameEvents.SendCustomGameEventToServer("catch_crab", { url: recycle_url, cb: 'recycle_cb', user: local_id });
}

function close_confirm_recycle() {
    $("#confirm_recycle").style["position"] = "0px -1000px 0px";
}

function delete_ability(h_index, a_index) {
    var curr = 0;  // h
    var curr2 = 0;  // a
    var number = 0;
    var index_from = ((my_hero_cards_curr_page || 1) - 1) * 16;
    h_index = h_index + index_from;
    for (var i in my_hero_sea) {
        if (h_index == number) {
            curr = i;
        }
        number++;
    }
    var hhhhh = my_hero_sea[curr];
    number = 0;
    for (var j in hhhhh.ability) {
        if (a_index == number) {
            curr2 = j;
        }
        number++;
    }
    if (!HERO_LIST[curr]) return;
    if (!ABILITY_LIST[curr2]) return;
    $("#text_confirm_delete").text = $.Localize('#'+"text_confirm_delete") + ' ' + $.Localize('#'+HERO_LIST[curr]) + '-' + $.Localize('#'+'DOTA_Tooltip_ability_' + ABILITY_LIST[curr2]) + '?';
    $("#confirm_delete").style["position"] = "0px 0px 0px";
    delete_h = curr;
    delete_a = curr2;
}

function close_confirm_delete() {
    $("#confirm_delete").style["position"] = "0px -1000px 0px";
}

function confirm_delete() {
    $("#confirm_delete").style["position"] = "0px -1000px 0px";
    var delete_url = "http://gemtd.ppbizon.com/gemtd/ability/delete/" + delete_h + "@" + delete_a + "@" + local_id + '?hehe=' + Math.random();
    GameEvents.SendCustomGameEventToServer("catch_crab", { url: delete_url, cb: 'delete_cb', user: local_id });
}


function init_hero_pool_board() {
    $("#hero_pool_panel_1").SetHasClass("hidden", true);
    $("#hero_pool_panel_2").SetHasClass("hidden", true);
    $("#hero_pool_panel_3").SetHasClass("hidden", true);
    $("#hero_pool_panel_4").SetHasClass("hidden", true);
    $("#hero_pool_panel_5").SetHasClass("hidden", true);
    $("#hero_pool_panel_6").SetHasClass("hidden", true);
    $("#hero_pool_panel_7").SetHasClass("hidden", true);
    $("#hero_pool_panel_8").SetHasClass("hidden", true);
    $("#hero_pool_panel_9").SetHasClass("hidden", true);
    $("#hero_pool_panel_10").SetHasClass("hidden", true);
    $("#hero_pool_panel_11").SetHasClass("hidden", true);
    $("#hero_pool_panel_12").SetHasClass("hidden", true);
    $("#recycle_1").SetHasClass("hidden", true);
    $("#recycle_2").SetHasClass("hidden", true);
    $("#recycle_3").SetHasClass("hidden", true);
    $("#recycle_4").SetHasClass("hidden", true);
    $("#recycle_5").SetHasClass("hidden", true);
    $("#recycle_6").SetHasClass("hidden", true);
    $("#recycle_7").SetHasClass("hidden", true);
    $("#recycle_8").SetHasClass("hidden", true);
    $("#recycle_9").SetHasClass("hidden", true);
    $("#recycle_10").SetHasClass("hidden", true);
    $("#recycle_11").SetHasClass("hidden", true);
    $("#recycle_12").SetHasClass("hidden", true);

    is_recycle_opened = false;
}


function OnMouseInManila(pos) {
    var text = $.Localize('#'+'manila_help');
    $.DispatchEvent("DOTAShowTextTooltip", $("#" + pos), text);
}

function OnMouseOutManila() {
    $.DispatchEvent("DOTAHideTextTooltip");
}

var my_player_info_object;
var my_hero_cards_pages;
var my_hero_cards_curr_page;
function refresh_hero_sea(cb) {
    for (var i = 0; i < 10; i++) {
        if (Players.GetPlayerHeroEntityIndex(i)) {
            heroindex2id[Players.GetPlayerHeroEntityIndex(i)] = i;
        }
    }

    $("#hero_sea_panel_0").SetHasClass("hidden", true);
    $("#hero_sea_panel_1").SetHasClass("hidden", true);
    $("#hero_sea_panel_2").SetHasClass("hidden", true);
    $("#hero_sea_panel_3").SetHasClass("hidden", true);
    $("#hero_sea_panel_4").SetHasClass("hidden", true);
    $("#hero_sea_panel_5").SetHasClass("hidden", true);
    $("#hero_sea_panel_6").SetHasClass("hidden", true);
    $("#hero_sea_panel_7").SetHasClass("hidden", true);
    $("#hero_sea_panel_8").SetHasClass("hidden", true);
    $("#hero_sea_panel_9").SetHasClass("hidden", true);
    $("#hero_sea_panel_10").SetHasClass("hidden", true);
    $("#hero_sea_panel_11").SetHasClass("hidden", true);
    $("#hero_sea_panel_12").SetHasClass("hidden", true);
    $("#hero_sea_panel_13").SetHasClass("hidden", true);
    $("#hero_sea_panel_14").SetHasClass("hidden", true);
    $("#hero_sea_panel_15").SetHasClass("hidden", true);

    var url = 'http://gemtd.ppbizon.com/gemtd/202203/heros/get/@' + local_id + '_' + Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()) + '?hehe=' + Math.random() + '&ver=' + VER + '&pcount=' + pcount;

    RequestProxy(url, function(object){
        object = object['data'][local_id];
        refresh_store();

        $("#store_shell_count").text = "× " + (object.shell || "0");
        $("#store_ice_count").text = "× " + (object.ice || "0");
        $("#store_candy_count").text = "× " + (object.candy || "0");

        if (object.extend_tool) {
            extend_tool = object.extend_tool;
            // $('#text_item_extend_name2').text = "× "+extend_tool;
        }
        else {
            extend_tool = 0;
        }

        var heroindex = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());

        my_onduty_hero_id = object.onduty_hero.hero_id;
        my_hero_sea = object.hero_sea;
        my_hero_index = heroindex;

        //告诉lua
        var onduty_hero_info = my_hero_sea[my_onduty_hero_id];
        onduty_hero_info['hero_id'] = my_onduty_hero_id;

        // 试图排序技能
        var sort_a = [];
        for (var hhh in onduty_hero_info['ability']) {
            sort_a.push({ ability: hhh, level: onduty_hero_info['ability'][hhh], number: parseInt(hhh.substr(1, hhh.length - 1)) });
        }
        sort_a.sort(function (a, b) { return a.number - b.number; });
        onduty_hero_info['ability'] = {};
        for (var hhhh = 0; hhhh < sort_a.length; hhhh++) {
            var aaaa = sort_a[hhhh];
            onduty_hero_info['ability'][aaaa['ability']] = aaaa['level'];
        }

        var m = {
            "heroindex": heroindex,
            "steam_id": local_id,
            "onduty_hero": onduty_hero_info,
            "is_black": object.is_black || 0,
            'my_maze': object.my_maze,
            'is_test_user': object.is_test_user,
            'pet': object.pet,
            'pet2': object.pet2,
            'quest': object.quest,
            'extend_tool': object.extend_tool,
            'items': object.items,
            'is_crown': object.is_crown,
        };
        if (!object.my_maze) {
            delete m.my_maze;
        }

        GameEvents.SendCustomGameEventToServer("gemtd_hero", m);
        my_player_info_object = object;
        // 根据object.hero_sea填写车库面板
        fill_hero_cards();
        // 可选回调：调用方需要知道"拉取成功"时用（比如二维码弹窗里的刷新按钮）
        if (cb) {
            cb();
        }
    });
}
function set_hero_sea(object) {
    my_onduty_hero_id = object.onduty_hero.hero_id;
    my_hero_sea = object.hero_sea;
    my_hero_index = object.hero_index;

    refresh_store();

    $("#store_shell_count").text = "× " + (object.shell || "0");
    $("#store_ice_count").text = "× " + (object.ice || "0");
    $("#store_candy_count").text = "× " + (object.candy || "0");


    if (object.pre_shell && object.pre_shell > 0) {
        open_panel_award('gem', 'shell', '', object.pre_shell, 'season');
    }

    if (object.compen_shell && object.compen_shell > 0) {
        open_panel_award('gem', 'shell', '', object.compen_shell, 'compen');
    }

    if (object.pre_card && parseInt(object.pre_card) > 0) {
        open_panel_award('dac', 'card', 'default', object.pre_card, 'season');
    }

    if (object.ti8_award_shell && parseInt(object.ti8_award_shell) > 0) {
        open_panel_award('gem', 'shell', '', object.ti8_award_shell, 'ti8');
    }

    if (object.ti8_award_hero) {
        open_panel_award('gem', 'hero', object.ti8_award_hero, 1, 'ti8');
    }

    my_player_info_object = object;
    // 根据object.hero_sea填写车库面板
    fill_hero_cards();

    // 根据object.quest填写任务面板
    fill_quest_board(object.quest);
}
function fill_hero_cards() {
    var object = my_player_info_object;
    var index_from = ((my_hero_cards_curr_page || 1) - 1) * 16;
    var index_to = ((my_hero_cards_curr_page || 1) - 1) * 16 + 15;

    var arr = [];
    for (var a in object.hero_sea) {
        object.hero_sea[a]['hero_id'] = a;
        arr.push(object.hero_sea[a]);
    }
    arr.sort(function (a, b) {
        return parseInt(b['hero_id'].substr(1)) - parseInt(a['hero_id'].substr(1));
    });
    my_hero_cards_pages = Math.ceil(arr.length / 16);
    my_hero_cards_curr_page = my_hero_cards_curr_page || 1;
    refresh_page_arrow();

    $('#text_hero_cards_page').text = my_hero_cards_curr_page + " / " + my_hero_cards_pages;

    object.hero_sea = {};
    for (var c = 0; c < arr.length; c++) {
        object.hero_sea[arr[c]['hero_id']] = arr[c];
    }
    my_hero_sea = object.hero_sea;

    var ii = 0;
    $("#hero_sea_panel_0").SetHasClass("hidden", true);
    $("#hero_sea_panel_1").SetHasClass("hidden", true);
    $("#hero_sea_panel_2").SetHasClass("hidden", true);
    $("#hero_sea_panel_3").SetHasClass("hidden", true);
    $("#hero_sea_panel_4").SetHasClass("hidden", true);
    $("#hero_sea_panel_5").SetHasClass("hidden", true);
    $("#hero_sea_panel_6").SetHasClass("hidden", true);
    $("#hero_sea_panel_7").SetHasClass("hidden", true);
    $("#hero_sea_panel_8").SetHasClass("hidden", true);
    $("#hero_sea_panel_9").SetHasClass("hidden", true);
    $("#hero_sea_panel_10").SetHasClass("hidden", true);
    $("#hero_sea_panel_11").SetHasClass("hidden", true);
    $("#hero_sea_panel_12").SetHasClass("hidden", true);
    $("#hero_sea_panel_13").SetHasClass("hidden", true);
    $("#hero_sea_panel_14").SetHasClass("hidden", true);
    $("#hero_sea_panel_15").SetHasClass("hidden", true);

    for (var i in object.hero_sea) {
        if (ii < index_from) {
            ii++;
            continue;
        }
        var p = object.hero_sea[i];
        var index = parseInt(i) + 1;

        // 当前英雄
        if (i == my_onduty_hero_id) {
            $("#hero_sea_panel_" + (ii - index_from)).style["box-shadow"] = "fill #ffffff22 0px 0px 15px 0px;";
        }
        else {
            $("#hero_sea_panel_" + (ii - index_from)).style["box-shadow"] = "fill #00000066 0px 0px 8px 0px;";
        }

        $("#hero_sea_panel_" + (ii - index_from)).SetHasClass("hidden", false);

        $("#hero_sea_image_" + (ii - index_from)).heroname = HERO_LIST[i];
        // $("#hero_sea_image_"+ii).SetImage("file://{images}/custom_game/heros/"+HERO_LIST[i]+".png");
        $("#hero_sea_name_" + (ii - index_from)).text = $.Localize('#'+HERO_LIST[i]);

        var color = "#777777";
        var ability_count = 1;
        if (i.slice(1, 2) == "2") {
            color = "#4444ff";
            ability_count = 2;
        }
        if (i.slice(1, 2) == "3") {
            color = "#bb00bb";
            ability_count = 3;
        }
        if (i.slice(1, 2) == "4") {
            color = "#dd7700";
            ability_count = 4;
        }

        if (p.extend) {
            ability_count = ability_count + parseInt(p.extend);
        }

        $("#hero_sea_ability_level_" + (ii - index_from) + "_0").SetHasClass("hidden", true);
        $("#hero_sea_ability_level_" + (ii - index_from) + "_1").SetHasClass("hidden", true);
        $("#hero_sea_ability_level_" + (ii - index_from) + "_2").SetHasClass("hidden", true);
        $("#hero_sea_ability_level_" + (ii - index_from) + "_3").SetHasClass("hidden", true);
        $("#hero_sea_ability_" + (ii - index_from) + "_0").abilityname = 'empty1';
        $("#hero_sea_ability_" + (ii - index_from) + "_1").abilityname = 'empty1';
        $("#hero_sea_ability_" + (ii - index_from) + "_2").abilityname = 'empty1';
        $("#hero_sea_ability_" + (ii - index_from) + "_3").abilityname = 'empty1';

        for (var k = 0; k < 4; k++) {
            if (k + 1 > ability_count) {
                $("#hero_sea_ability_" + (ii - index_from) + "_" + k).SetHasClass("hidden", true);
            }
            else {
                $("#hero_sea_ability_" + (ii - index_from) + "_" + k).SetHasClass("hidden", false);
            }
        }

        $("#hero_sea_top_panel_" + (ii - index_from)).style["background-color"] = color;

        $("#hero_sea_top_panel2_" + (ii - index_from)).SetHasClass("hidden", true);
        if (object.hero_sea[i].effect) {
            var color = "#777777";
            if (object.hero_sea[i].effect.slice(1, 2) == "2") {
                color = "#4444ff";
            }
            if (object.hero_sea[i].effect.slice(1, 2) == "3") {
                color = "#bb00bb";
            }
            if (object.hero_sea[i].effect.slice(1, 2) == "4") {
                color = "#dd7700";
            }
            $("#hero_sea_name2_" + (ii - index_from)).text = $.Localize('#'+object.hero_sea[i].effect);
            $("#hero_sea_top_panel2_" + (ii - index_from)).SetHasClass("hidden", false);
            $("#hero_sea_name2_" + (ii - index_from)).style["color"] = color;
        }

        //技能
        var jj = 0;
        for (var j in object.hero_sea[i].ability) {
            var ability_id = j;
            var ability_name = ABILITY_LIST[ability_id] || 'empty1';
            ability_level = object.hero_sea[i].ability[j];

            $("#hero_sea_ability_" + (ii - index_from) + "_" + jj).SetHasClass("hidden", false);

            if (ability_name != 'empty1') {
                $("#hero_sea_ability_" + (ii - index_from) + "_" + jj).abilityname = ability_name;
                if (ability_level == 1) {
                    $("#hero_sea_ability_level_" + (ii - index_from) + "_" + jj).text = '■□□□';
                }
                if (ability_level == 2) {
                    $("#hero_sea_ability_level_" + (ii - index_from) + "_" + jj).text = '■■□□';
                }
                if (ability_level == 3) {
                    $("#hero_sea_ability_level_" + (ii - index_from) + "_" + jj).text = '■■■□';
                }
                if (ability_level == 4) {
                    $("#hero_sea_ability_level_" + (ii - index_from) + "_" + jj).text = '■■■■';
                }
                $("#hero_sea_ability_level_" + (ii - index_from) + "_" + jj).SetHasClass("hidden", false);
            }

            jj++;
        }

        ii++;
        if (ii > index_to) break;
    }
}

var requested_bush = false;
function RequestBushTicket(){
    if (requested_bush) return;
    GameEvents.SendCustomGameEventToServer("add_bush_ticket", {
        player_id: Game.GetLocalPlayerID()
    });
    requested_bush = true;
    $('#link_request_ticket').visible = false;
}
var requested_night = false;
function RequestNightTicket(){
    if (requested_night) return;
    GameEvents.SendCustomGameEventToServer("add_night_ticket", {
        player_id: Game.GetLocalPlayerID()
    });
    requested_night = true;
    $('#link_request_ticket').visible = false;
}

function fill_quest_board(q) {
    if (q.quest == 'q399' && q.quest_expire == -2) {
        // 给一张丛林挑战门票
        GameEvents.SendCustomGameEventToServer("add_bush_ticket", {
            player_id: Game.GetLocalPlayerID()
        });
        if ($('#panel_quest_text_random')){
            var uu_one = $.CreatePanel('Label', $('#panel_quest_text_random'), "link_request_ticket", {
                text: '<a href="javascript:RequestBushTicket();">'+$.Localize('#txt_get_ticket')+'</a>',
                style: 'font-size:18px;margin-left:10px;color:#ddd;line-height:25px;',
                html: true,
            });
        }
    }
    if (q.quest == 'q398' && q.quest_expire == -2) {
        // 给一张暗夜挑战门票
        GameEvents.SendCustomGameEventToServer("add_night_ticket", {
            player_id: Game.GetLocalPlayerID()
        });
        if ($('#panel_quest_text_random')){
            var uu_one = $.CreatePanel('Label', $('#panel_quest_text_random'), "link_request_ticket", {
                text: '<a href="javascript:RequestNightTicket();">'+$.Localize('#txt_get_ticket')+'</a>',
                style: 'font-size:18px;margin-left:10px;color:#ddd;line-height:25px;',
                html: true,
            });
        }
    }
    for (var j in q) {
        if (j == "quest_expire") {
            $("#quest_random").SetHasClass('hidden', false);
            if (q[j] > 0) {
                $("#quest_image_random").SetImage('file://{images}/custom_game/quest.png');

                Countdown({
                    ttl: q[j] + Date.now()/1000,
                    label_id: 'quest_time_random',
                    expire_text: 'time_expired',
                });
                $("#quest_time_random").style['color'] = '#666';
                $("#quest_text_random").style['color'] = '#666';
                $("#quest_time_random").style['font-size'] = '20px';
            }
            else {
                $("#quest_time_random").text = 'READY';
                $("#quest_time_random").style['color'] = '#fff';
                $("#quest_text_random").style['color'] = '#fff';
                $("#quest_time_random").style['font-size'] = '22px';
            }
            continue;
        }

        if (j == "quest") {
            // 随机任务
            $("#quest_random").SetHasClass('hidden', false);
            var award_shell = parseInt(q[j].substr(1, 1)) * 5;
            var quest_text = $.Localize('#'+q[j]);
            if (q[j].indexOf('q111') > -1) {
                quest_text = $.Localize('#'+'q111_1') + $.Localize('#'+HERO_LIST[q[j].split('_')[1]]) + $.Localize('#'+'q111_2')
            }
            $("#quest_text_random").text = $.Localize('#'+"quest_random_0") + quest_text + $.Localize('#'+"quest_random_1") + award_shell + $.Localize('#'+"quest_random_2");

            // 夜魇暗潮节日，q399奖励改为南瓜头
            // if (q[j] == 'q399'){
            //     $("#quest_text_random").text = $.Localize('#'+"quest_random_0")+quest_text+$.Localize('#'+"quest_random_1_pumpkin");
            // }    
            continue;
        }

        if (j == "quest_finish_count" && $("#quest_time_randomextend")) {
            $("#quest_time_randomextend").text = q[j] + '/4';
            $("#quest_time_randomextend").style['color'] = '#fff';
            $("#quest_text_randomextend").style['color'] = '#fff';
            $("#quest_time_randomextend").style['font-size'] = '22px';
        }

        if (!$("#quest_" + j)) {
            continue;
        }

        $("#quest_" + j).SetHasClass('hidden', false);
        $("#quest_text_" + j).text = $.Localize('#'+'quest_' + j);

        if (q[j]) {
            if (q[j] == -999) {
                $("#quest_time_" + j).text = 'DONE';
                $("#quest_time_" + j).style['color'] = '#666';
                $("#quest_text_" + j).style['color'] = '#666';
                $("#quest_image_" + j).SetImage('file://{images}/custom_game/quest.png');
            }
            else if (q[j] <= 0) {
                $("#quest_time_" + j).text = 'READY';
                $("#quest_time_" + j).style['color'] = '#fff';
                $("#quest_text_" + j).style['color'] = '#fff';
                $("#quest_time_" + j).style['font-size'] = '22px';
            }
            else {
                $("#quest_image_" + j).SetImage('file://{images}/custom_game/quest.png');
                Countdown({
                    ttl: q[j] + Date.now()/1000,
                    label_id: 'quest_time_'+j,
                    expire_text: 'time_expired',
                });
                $("#quest_time_" + j).style['color'] = '#666';
                $("#quest_text_" + j).style['color'] = '#666';
                $("#quest_time_" + j).style['font-size'] = '20px';

            }

        }
        else {
            $("#quest_time_" + j).text = 'READY';
            $("#quest_time_" + j).style['color'] = '#fff';
            $("#quest_text_" + j).style['color'] = '#fff';
            $("#quest_time_" + j).style['font-size'] = '22px';
        }
    }
}
function last_page() {
    my_hero_cards_curr_page = my_hero_cards_curr_page - 1;
    if (my_hero_cards_curr_page < 1) {
        my_hero_cards_curr_page = 1;
        return;
    }
    fill_hero_cards();
    refresh_page_arrow();
}
function next_page() {
    my_hero_cards_curr_page = my_hero_cards_curr_page + 1;
    if (my_hero_cards_curr_page > my_hero_cards_pages) {
        my_hero_cards_curr_page = my_hero_cards_pages;
        return;
    }
    fill_hero_cards();
    refresh_page_arrow();
}
function refresh_page_arrow() {
    if (my_hero_cards_curr_page == 1) {
        $("#panel_hero_cards_left_arrow").SetHasClass('invisible', true);
    }
    else {
        $("#panel_hero_cards_left_arrow").SetHasClass('invisible', false);
    }

    if (my_hero_cards_curr_page == my_hero_cards_pages) {
        $("#panel_hero_cards_right_arrow").SetHasClass('invisible', true);
    }
    else {
        $("#panel_hero_cards_right_arrow").SetHasClass('invisible', false);
    }
}
// 刷新任务面板
function refresh_quest_board() {
    var url = 'http://gemtd.ppbizon.com/gemtd/202203/heros/get/@' + local_id + '?hehe=' + Math.random();
    RequestProxy(url, function(object){
        fill_quest_board(object.data[local_id].quest);
    });
}

function pop_notice(text) {
    $("#panel_notice").style['opacity'] = "1";
    $("#text_notice").text = text;
    $.Schedule(2, function () {
        $("#panel_notice").style['opacity'] = "0";
    });
}
function close_ice_get() {
    $('#ice_get').SetHasClass('hidden', true);
}
function close_ice_get_ebay() {
    $('#ice_get_ebay').SetHasClass('hidden', true);
}
function open_ice_get() {
    if ($.Language() == "schinese") {
        $('#ice_get').SetHasClass('hidden', false);
    }
    else {
        $('#ice_get_ebay').SetHasClass('hidden', false);
    }
}

function time_2_string(t) {
    var minute = Math.floor(t / 60);
    var second = parseInt(t % 60);
    var ms = (parseInt(t * 100)) % 100;
    if (minute != 0 && second < 10) {
        second = "0" + second;
    }
    if (ms < 10) {
        ms = "0" + ms;
    }
    return (minute != 0 ? (minute + "\'") : "") + second + "\"";
}


GameEvents.Subscribe("use_extend", OnUseExtend);

function OnUseExtend() {
    var url = 'http://gemtd.ppbizon.com/gemtd/extend/use/@' + local_id;
    RequestProxy(url, function(a){
        if (a && a.err == 0) {
            show_msg($.Localize('#'+"notice_use_success"));
            refresh_hero_sea();

            is_heropool_board_open = false;
        }
        else {
            show_msg($.Localize('#'+"notice_use_failed"));
            hide_right_panel();
            is_heropool_board_open = false;
        }
    });
}

function hide_right_panel() {
    $("#right_panel").SetHasClass("invisible", true);
    $("#right_panel").style["position"] = "0px 1000px 0px";
}
function show_right_panel() {
    $("#right_panel").SetHasClass("invisible", false);
    $("#right_panel").style["position"] = "0px 230px 0px";
}
function hide_store_panel() {
    $("#store_panel").style["position"] = "0px -1200px 0px";
    $("#store_panel").SetHasClass("invisible", true);
}
function show_store_panel() {
    $("#store_panel").style["position"] = "0px -1200px 0px";
    $("#store_panel").SetHasClass("invisible", false);
    $.Schedule(0, function () {
        $("#store_panel").style["position"] = "0px 0px 0px";
    });
}

function end_game_exit() {
    // 结束面板的“退出游戏”：只让服务器直接判定游戏结束，不再走结算/提交成绩流程
    $.Msg('end_game_exit');
    GameEvents.SendCustomGameEventToServer("end_game_exit", {
        player_id: Game.GetLocalPlayerID()
    });
}

function ggsimida() {
    $("#panel_confirm_ggsimida").style["position"] = "0px 0px 0px";
}

function close_confirm_ggsimida() {
    $("#panel_confirm_ggsimida").style["position"] = "0px -1000px 0px";
}

function confirm_ggsimida() {
    $("#panel_ggsimida").SetHasClass('hidden', true);
    $("#panel_confirm_ggsimida").style["position"] = "0px -1000px 0px";
    GameEvents.SendCustomGameEventToServer("click_ggsimida", {
        player_id: Game.GetLocalPlayerID()
    });
}


// 时间显示

GameEvents.Subscribe("show_time", OnShowTime);

var global_win_streak_time = 0;
var global_kuangbao_time = 0;
function OnShowTime(keys) {
    $('#panel_time').style['opacity'] = 1;
    $('#panel_wave').style['opacity'] = 1;
    $('#panel_enemy').style['opacity'] = 1;
    if (keys.game_mode) {
        // 游戏模式显示
        if (Game.GetMapInfo().map_display_name == 'gemtd_1p') {
            $('#txt_game_mode').text = $.Localize('#'+'txt_game_mode_gemtd_1p');
        }
        if (Game.GetMapInfo().map_display_name == 'gemtd_race') {
            $('#txt_game_mode').text = $.Localize('#'+'txt_game_mode_gemtd_race');
        }
        if (Game.GetMapInfo().map_display_name == 'gemtd_coop') {
            $('#txt_game_mode').text = $.Localize('#'+'txt_game_mode_gemtd_coop') + '(' + keys.p + 'P)';
        }
    }


    if (keys.is_race == true) {
        // $('#panel_time_2').SetHasClass('invisible',true);
        // $('#panel_time_3').SetHasClass('invisible',true);
        // $('#panel_time_3_4').SetHasClass('invisible',true);

        // $('#panel_time_label').SetHasClass('invisible',true);
        // $('#panel_time_1').style['flow-children'] = 'down';
        // $('#panel_time_label').style['horizontal-align'] = 'center';
        // $('#panel_time_label').text = "GEMTD RACE";
        // $('#panel_time_1').style['height'] = '60px';
        // $('#panel_time_best').style['height'] = '40px';
        // $('#panel_time_best').style['font-size'] = '28px';
        // $('#panel_time_best').style['horizontal-align'] = 'center';

        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, true);
    }
    //显示血条
    $('#player_board_xuetiao_1_1').SetHasClass('invisible', false);
    $('#player_board_xuetiao_1_2').SetHasClass('invisible', false);
    $('#player_board_xuetiao_2_1').SetHasClass('invisible', false);
    $('#player_board_xuetiao_2_2').SetHasClass('invisible', false);
    $('#player_board_xuetiao_3_1').SetHasClass('invisible', false);
    $('#player_board_xuetiao_3_2').SetHasClass('invisible', false);
    $('#player_board_xuetiao_4_1').SetHasClass('invisible', false);
    $('#player_board_xuetiao_4_2').SetHasClass('invisible', false);
    if (keys.wave_time) {

        $('#panel_time_now').text = time2showtime(keys.wave_time);
        var per = keys.wave_time / keys.kuangbao_time * 120;
        // $("#panel_time_progress2").style['position'] = "-"+per+"px 0px 0px";

        if (keys.wave_time >= keys.kuangbao_time) {
            $('#panel_time_now').style['color'] = '#ff4444';
        }
        // else if (keys.wave_time >= keys.win_streak_time){
        //     $('#panel_time_now').style['color'] = '#ffff88';
        // }
        else {
            $('#panel_time_now').style['color'] = '#ffffff';
        }
    }
    if (keys.kuangbao_time && keys.win_streak_time) {
        global_kuangbao_time = keys.kuangbao_time;
        global_win_streak_time = keys.win_streak_time;
    }
    if (keys.total_time) {
        $('#panel_time_best').text = time2showtime_hour(keys.total_time);
    }

    if (keys.win_streak || keys.win_streak == 0) {
        if (keys.win_streak > 50) {
            keys.win_streak = 50;
        }
        if (keys.win_streak < -50) {
            keys.win_streak = -50;
        }
        // $('#panel_time_3_2').style['width'] = (120*(keys.win_streak+50)/100)+'px';

        $('#panel_streak').text = (Math.floor(keys.win_streak) + 50) + '%';
    }

    if (keys.enemy_count) {
        $('#panel_streak_enemy').text = keys.enemy_count;
    }

    // if (keys.up_down == 1){
    //     $('#panel_time_3_3').SetHasClass('invisible',false);
    //     $.Schedule(3,function(){
    //         $('#panel_time_3_3').SetHasClass('invisible',true);
    //     });
    // }
    // if (keys.up_down == -1){
    //     $.Schedule(3,function(){
    //         $('#panel_time_3_4').SetHasClass('invisible',true);
    //     });
    // }

}

function OnPanelTimeIn(pos) {
    var title = $.Localize('#'+'text_panel_time_title');
    var text = $.Localize('#'+'text_panel_time_text') + time2showtime(global_kuangbao_time);
    //text = text.replace(': ','<br>------------------<br>');
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), title, text);
}

function OnPanelTimeOut(a) {
    $.DispatchEvent("DOTAHideTitleTextTooltip");
}

function OnPanelTime3In(pos) {
    var title = $.Localize('#'+'text_panel_time_3_title');
    var text = $.Localize('#'+'text_panel_time_3_text');
    //text = text.replace(': ','<br>------------------<br>');
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), title, text);
}

function OnPanelTime3Out(a) {
    $.DispatchEvent("DOTAHideTitleTextTooltip");
}



function OnRankKillsIn(p, r) {
    if (ranking_get_all && ranking_get_all['p' + p] && ranking_get_all['p' + p][r] && ranking_get_all['p' + p][r]['towers']) {
        var all = ranking_get_all['p' + p][r]['towers'].split('|');
        var kills = ranking_get_all['p' + p][r]['kill'];
        var towers = all[0];
        var waves = parseInt(all[1]);
        var duration = Math.floor(all[2]);
        var datetime = all[6];
        var maze = all[5];
        var gold = all[3];
        var extra = all[4];

        var tower_arr = towers.split(',');
        var tower_str = '';

        tower_arr.sort(function (a, b) {
            var aa = TOWER_LEVEL[a.split(':')[0]] || 0;
            var bb = TOWER_LEVEL[b.split(':')[0]] || 0;
            return bb - aa;
        });

        for (var i = 0; i < tower_arr.length; i++) {
            // if (tower_arr[i] && tower_arr[i].indexOf('shiban')<0){
            var t = tower_arr[i].split(':');
            var tt = t[0];
            var cc = t[1] ? ' ×' + t[1] : '';
            var color = TOWER_LEVEL_COLOR[TOWER_LEVEL[tt]] || '#fff';
            tower_str += '<br><font color="' + color + '">' + $.Localize('#'+tt) + '</font>' + cc;
            // }
        }

        var title = 'KILLS: ' + kills + ' <font color="#888888">(+' + extra + ')</font>';
        var text = 'WAVES: <font color="#ff8888">' + waves + '</font><br>DURATION: <font color="#fff">' + time2showtime_hour(duration) + '</font><br>MAZE LENGTH: <font color="#ddddff">' + maze + '</font><br>GOLD: <font color="#ffff88">' + gold + '</font><br>' + tower_str;

        var pos = 'lbl_boss_damage' + p + '_' + r;
        $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), title, text);
    }

}
function OnRankKillsOut() {
    $.DispatchEvent("DOTAHideTitleTextTooltip");
}

// TOWER_LEVEL / TOWER_LEVEL_COLOR 已移到 data.js（Hud 和 EndScreen 两个 layout 共用）

function preview_effect(x) {
    var goods = STORE_LIST[x].id;
    close_store();
    GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));

    GameEvents.SendCustomGameEventToServer("preview_effect", { "hero_index": Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), "effect": goods });

    var distance_old = g_targetDistance;

    // $('#ie_welcome_text2').text = ;
    GameUI.SendCustomHUDError($.Localize('PREVIEW: ' + $.Localize('#'+goods)),"General.CastFail_NoMana");
    // $("#ie_welcome").style["position"] = "0px 0px 0px";

    $.Schedule(0.1, function () {
        g_targetDistance = 0;
        g_targetDistance = Math.max(Math.min(g_targetDistance, g_MaxDistance), g_MinDistance);

        $.Schedule(5, function () {
            GameUI.SetCameraTarget(-1);
            // $("#ie_welcome").style["position"] = "0px -200px 0px";
        });
    });
}

if ($.Language() != 'schinese' && $('#kejin_qrcode')) {
    // $('#kejin_qrcode').style['background-image'] = "url('file://{images}/custom_game/kejin_qrcode_black_ebay.png')";
}

function show_kejin_qrcode() {
    $('#kejin_qrcode').style['opacity'] = '1';
}
function hide_kejin_qrcode() {
    $('#kejin_qrcode').style['opacity'] = '0';
}

function show_guide_one(vec) {
    var par = Particles.CreateParticle("effect/x/econ.vpcf", 0, 0);
    maze_particles.push(par);
    Particles.SetParticleControl(par, 0, vec);
}
function hide_guide_all() {
    for (var i = 0; i < maze_particles.length; i++) {
        Particles.DestroyParticleEffect(maze_particles[i], true);
    }
    maze_particles = [];
}

function confirm_save_maze() {
    buy_x = 'save_maze';

    $("#text_confirm_buy").text = $.Localize('#'+"text_confirm_save_maze");
    $("#confirm_buy").style["position"] = "0px 0px 0px";
}

function FindDotaHudElement(id) {
    var hudRoot;
    for (panel = $.GetContextPanel(); panel != null; panel = panel.GetParent()) {
        hudRoot = panel;
    }
    var comp = hudRoot.FindChildTraverse(id);
    return comp;
}
// 发送弹幕
var bullet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function bullet_chat(steamid, playername, chatting, color) {
    var channel = 0;
    for (var i in bullet) {
        if (bullet[i] == 0) {
            channel = i;
            bullet[i] = 1;
            break;
        }
    }
    channel++;

    if (channel == 0) {
        return;
    }
    // $("#bullet_icon_"+channel).steamid = steamid;
    color = TOWER_LEVEL_COLOR[TOWER_LEVEL[chatting]] || '#fff';
    $("#bullet_text_" + channel).text = playername + '';
    $("#bullet_tower_" + channel).text = $.Localize(chatting);
    $("#bullet_empty_" + channel).style.width = "0px";
    $("#bullet_text_" + channel).style.color = "#ddd";
    $("#bullet_tower_" + channel).style.color = color || "white";
    $.Schedule(20, function () {
        if (bullet){
            bullet[channel - 1] = 0;
            $("#bullet_empty_" + channel).style['transition-duration'] = "0s";
            $("#bullet_empty_" + channel).style.width = "3840px";
            $("#bullet_empty_" + channel).style['transition-duration'] = "20s";
        }
    });
}

function lua_print(text) {
    GameEvents.SendCustomGameEventToServer("prt",
        {
            text: text,
            steam_id: local_id,
            player_id: Players.GetLocalPlayer(),
            hehe: Math.random()
        }
    );
}
// reconnect_game();
function reconnect_game() {
    for (var i = 0; i < 10; i++) {
        if (Players.GetPlayerHeroEntityIndex(i)) {
            heroindex2id[Players.GetPlayerHeroEntityIndex(i)] = i;
        }
    }
    // $("#panel_notice").style['opacity'] = "1";
    // $("#text_notice").text = $.Localize('#'+"重连成功，欢迎回来！");
    // $.Schedule(2,function(){
    //     $("#panel_notice").style['opacity'] = "0";
    // });

    $("#hero_pool_button_panel").SetHasClass("hidden", true);
    hide_right_panel();
    // 商店也变灰
    $("#button_board7").style["visibility"] = "collapse";
    hide_store_panel();
}

function OnPicRankAllIn(pos) {
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize('#'+'tips_rank_all_title'), $.Localize('#'+'tips_rank_all_text'));
}
function OnPicRankCoopIn(pos) {
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize('#'+'tips_rank_coop_title'), $.Localize('#'+'tips_rank_coop_text'));
}
function OnPicRankRaceIn(pos) {
    $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + pos), $.Localize('#'+'tips_rank_race_title'), $.Localize('#'+'tips_rank_race_text'));
}
function OnMouseOut() {
    $.DispatchEvent("DOTAHideTitleTextTooltip");
}

GameEvents.Subscribe("mima", OnMima);
var is_mimaing = false;
var mima_waterid = 0;
function OnMima(keys) {
    Game.EmitSound("General.CastFail_NoMana");
    mima_waterid++;
    var mid = mima_waterid;
    $('#text_mima').text = $.Localize('#'+keys.text);
    $('#panel_mima').style['opacity'] = '1';
    $('#panel_mima').style['transform'] = 'scale3d( 1.25, 1.25, 1.25)';
    $.Schedule(0.2, function () {
        $('#panel_mima').style['transform'] = 'scale3d( 1, 1, 1)';
    });
    $.Schedule(3, function () {
        if (mid == mima_waterid) {
            $('#panel_mima').style['opacity'] = '0';
        }
    });
}

function show_confirm_box(id, text) {
    $("#text_" + id).text = text;
    $("#" + id).style["position"] = "0px 0px 0px";
}
function close_confirm_use_extend() {
    $("#confirm_use_extend").style["position"] = "0px -1000px 0px";
}
function close_confirm_use_bush_ticket() {
    $("#confirm_use_bush_ticket").style["position"] = "0px -1000px 0px";
}
function close_confirm_use_night_ticket() {
    $("#confirm_use_night_ticket").style["position"] = "0px -1000px 0px";
}
GameEvents.Subscribe("show_use_extend", OnShowUseExtend);

GameEvents.Subscribe("show_use_bush_ticket", OnShowUseBushTicket);
GameEvents.Subscribe("show_use_night_ticket", OnShowUseNightTicket);

function OnShowUseExtend() {
    show_confirm_box('confirm_use_extend', $.Localize('#'+'text_confirm_use_extend'));
}
function OnShowUseBushTicket() {
    show_confirm_box('confirm_use_bush_ticket', $.Localize('#'+'text_confirm_use_bush_ticket'));
}
function OnShowUseNightTicket() {
    show_confirm_box('confirm_use_night_ticket', $.Localize('#'+'text_confirm_use_night_ticket'));
}
function confirm_use_extend() {
    OnUseExtend();
    $("#confirm_use_extend").style["position"] = "0px -1000px 0px";
}
function confirm_use_bush_ticket() {
    $("#confirm_use_bush_ticket").style["position"] = "0px -1000px 0px";
    GameEvents.SendCustomGameEventToServer("confirm_use_bush_ticket", { player_id: Players.GetLocalPlayer() });
}
function confirm_use_night_ticket() {
    $("#confirm_use_night_ticket").style["position"] = "0px -1000px 0px";
    GameEvents.SendCustomGameEventToServer("confirm_use_night_ticket", { player_id: Players.GetLocalPlayer() });
}

function rotator_go(target_index) {
    var degree = target_index * 40;
    $.Schedule(0, function () {
        $('#wheel-rotator').style['transform'] = 'rotateZ(179deg)';
    })
    $.Schedule(0.2, function () {
        $('#wheel-rotator').style['transition-duration'] = '0s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(180deg)';
        $('#wheel-rotator').style['transition-duration'] = '0.2s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(359deg)';
    })
    $.Schedule(0.4, function () {
        $('#wheel-rotator').style['transition-duration'] = '0s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(0deg)';
        $('#wheel-rotator').style['transition-duration'] = '0.2s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(179deg)';
    })
    $.Schedule(0.6, function () {
        $('#wheel-rotator').style['transition-duration'] = '0s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(180deg)';
        $('#wheel-rotator').style['transition-duration'] = '0.2s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(359deg)';
    })
    $.Schedule(0.8, function () {
        $('#wheel-rotator').style['transition-duration'] = '0s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(0deg)';
        $('#wheel-rotator').style['transition-duration'] = '0.2s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(179deg)';
    })
    $.Schedule(1, function () {
        $('#wheel-rotator').style['transition-duration'] = '0s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(180deg)';
        $('#wheel-rotator').style['transition-duration'] = '0.3s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(359deg)';
    })
    $.Schedule(1.3, function () {
        $('#wheel-rotator').style['transition-duration'] = '0s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(0deg)';
        $('#wheel-rotator').style['transition-duration'] = '0.4s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(179deg)';
    })
    $.Schedule(1.7, function () {
        $('#wheel-rotator').style['transition-duration'] = '0s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(180deg)';
        $('#wheel-rotator').style['transition-duration'] = '0.5s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(359deg)';
    })
    $.Schedule(2.2, function () {
        $('#wheel-rotator').style['transition-duration'] = '0s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(0deg)';
        $('#wheel-rotator').style['transition-duration'] = '0.6s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(179deg)';
    })
    $.Schedule(2.8, function () {
        $('#wheel-rotator').style['transition-duration'] = '0s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(180deg)';
        $('#wheel-rotator').style['transition-duration'] = '0.7s';
        $('#wheel-rotator').style['transform'] = 'rotateZ(359deg)';
    })
    if (degree < 180) {
        var time = degree / 180 * 0.8;
        $.Schedule(3.5, function () {
            $('#wheel-rotator').style['transition-duration'] = '0s';
            $('#wheel-rotator').style['transform'] = 'rotateZ(0deg)';
            $('#wheel-rotator').style['transition-duration'] = time + 's';
            $('#wheel-rotator').style['transform'] = 'rotateZ(' + degree + 'deg)';
        })
        // $.Schedule(3.5+time,function(){
        //     $('#wheel-rotator').style['transition-duration'] = '0s';
        //     $('#wheel-rotator').style['transform'] = 'rotateZ(0deg)';
        //     $('#wheel-rotator').style['transition-duration'] = '0.2s';
        // })
    }
    else {
        var time = (degree - 180) / 180 * 0.9;
        $.Schedule(3.5, function () {
            $('#wheel-rotator').style['transition-duration'] = '0s';
            $('#wheel-rotator').style['transform'] = 'rotateZ(0deg)';
            $('#wheel-rotator').style['transition-duration'] = '0.8s';
            $('#wheel-rotator').style['transform'] = 'rotateZ(179deg)';
        })
        $.Schedule(4.3, function () {
            $('#wheel-rotator').style['transition-duration'] = '0s';
            $('#wheel-rotator').style['transform'] = 'rotateZ(180deg)';
            $('#wheel-rotator').style['transition-duration'] = time + 's';
            $('#wheel-rotator').style['transform'] = 'rotateZ(' + degree + 'deg)';
        })
        // $.Schedule(4.3+time,function(){   
        //     $('#wheel-rotator').style['transition-duration'] = '0s';
        //     $('#wheel-rotator').style['transform'] = 'rotateZ(0deg)';
        //     $('#wheel-rotator').style['transition-duration'] = '0.2s';
        // })
    }
}

var WORDS_NAME = null;
var WORDS_EXPIRE = null;
var WORDS_NAME_NEXT = null;
GameEvents.Subscribe("show_words", OnShowWords);
function OnShowWords(keys) {
    var name = keys.name;
    WORDS_NAME = name;
    var expire = keys.expire;
    WORDS_EXPIRE = expire;
    WORDS_NAME_NEXT = keys.word_next;
    $("#panel_words").style['background-image'] = 'url("file://{images}/custom_game/words/' + name + '.png")';
}
function OnPanelWordsIn(panel_id) {
    if (WORDS_NAME && WORDS_EXPIRE) {
        var title = $.Localize('#'+'text_words_title') + $.Localize('#'+'text_words_' + WORDS_NAME);
        var text = $.Localize('#'+'text_words_text_' + WORDS_NAME) + $.Localize('#'+'text_words_expire') + Seconds2Text(WORDS_EXPIRE);
        if (WORDS_NAME_NEXT) {
            text += $.Localize('#'+'text_words_text_next') + $.Localize('#'+'text_words_' + WORDS_NAME_NEXT);
        }

        $.DispatchEvent("DOTAShowTitleTextTooltip", $("#" + panel_id), title, text);
    }
}
function OnPanelWordsOut() {
    $.DispatchEvent("DOTAHideTitleTextTooltip");
}
function Seconds2Text(s) {
    var days = parseInt(s / 86400);
    if (days >= 1) {
        var hours = parseInt((s - days * 86400) / 3600);
        return days + 'd ' + hours + 'h';
    }
    else {
        var hours = parseInt((s - days * 86400) / 3600);
        return hours + 'h';
    }
}

GameEvents.Subscribe("prt_localize", OnPrtLocalize);
function OnPrtLocalize(keys) {
    var t = keys.text;
    var arr = t.split('|');
    var r = '';

    for (var i = 0; i < arr.length; i++) {
        var l = $.Localize('#'+arr[i]);
        if (l.substr(0,1) == '#'){
            l = l.substr(1);
        }
        r += l;
    }
    GameEvents.SendCustomGameEventToServer("prt_localize", {
        text: r
    });
}
// $.Schedule(2,function(){
//     open_panel_award('gem','item','extend',1,'pass');
// });


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
        $("#btn_entry_cdkey").SetHasClass('unavailable', true);
        SendCdkeyHTTP(cdkey);
        $.Schedule(10, function () {
            activate_cd = false;
            $("#btn_entry_cdkey").SetHasClass('unavailable', false);
        });
    }
}
function SendCdkeyHTTP(cdkey) {
    var local_steam_id = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
    RequestProxy('http://gemtd.ppbizon.com/gemtd/cdkey/use/' + cdkey + '@' + local_steam_id + '?hehe=' + Math.random(), function(object){
        //看看自己是玩家几，向lua报送
        // for (var i = 0; i <= 9; i++) {
        //     if (Game.GetPlayerInfo(i)) {
        //         var steam_id = Game.GetPlayerInfo(i).player_steamid;
        //         if (steam_id == local_id) {
        //             player_id = i;
        //         }
        //     }
        // }

        // var player_hero_id = Players.GetPlayerHeroEntityIndex(player_id)
        //激活码无效
        if (object.msg == "invalid key") {
            show_msg('invalid_key');
        }
        //已被激活
        if (object.msg == "already activated") {
            show_msg('already_activated');
        }
        //已拥有该英雄
        if (object.msg == "already have") {
            show_msg('already_have');
        }

        //激活成功
        if (object.err == 0) {
            if (object.award.test == true) {
                show_msg('内测资格激活成功！');
            }
            if (object.award.quest == 'q399') {
                show_msg('丛林挑战门票激活成功！');

                refresh_quest_board();
            }
            if (object.award.quest == 'q398') {
                show_msg('暗夜挑战门票激活成功！');

                refresh_quest_board(); 
            }
            if (object.award.hero) {
                // 弹窗
                open_panel_award('gem', 'hero', object.award.hero, '1', 'cdkey');

                refresh_hero_sea();
            }
            if (object.award.shell) {
                // 弹窗
                open_panel_award('gem', 'shell', '', object.award.shell, 'cdkey');

                $("#store_shell_count").text = "× " + object.shell || "0";
            }
            if (object.award.fb) {
                // 弹窗
                open_panel_award('gem', 'hero', object.award.fb, '1', 'cdkey');
            }

        }
    });
}

function update_leaderboard() {
    // 排行榜
    RequestProxy('http://gemtd.ppbizon.com/gemtd/leaderboard/@' + local_id, function(aa){
        if (!aa || !aa['data']) {
            return;
        }
        ranking_get_all = aa['data'];
        if (!ranking_get_all){
            return;
        }

        if (ranking_get_all.season){
            $('#title_leaderboard').text = $.Localize('#'+'text_leaderboard') + ' ' + ranking_get_all.season + $.Localize('#'+'text_leaderboard2');
        }
        
        // 击杀 
        for (var p = 1; p <= 4; p++) {
            var rk = aa['data']['p' + p];
            for (var r = 1; r <= 10; r++) {
                if (rk[r]) {
                    var player_ids = rk[r].player_ids.split(',');
                    for (var v = 1; v <= p; v++) {
                        $("#avatar" + p + "_" + (r) + "_" + v).steamid = player_ids[v - 1] || '';
                    }

                    // $("#lbl_waves"+p+"_"+(r+1)).text = '     lv.'+(rk[r].level-1);
                    $("#lbl_boss_damage" + p + "_" + (r)).text = rk[r].kill + '<font color="gray"> kills</font>';

                }
            }
        }

        var season_ttl = ranking_get_all['season_ttl'];
        if (season_ttl && season_ttl>0){
            // 赛季倒计时
            Countdown({
                ttl: season_ttl+ Date.now()/1000,
                label_id: 'text_leaderboard_ttl',
                expire_text: 'text_season_end',
            });
        }

        var my_shell_pool = ranking_get_all['my_shell_pool'];
        if (my_shell_pool){
            var shell = parseInt(my_shell_pool.shell||0);
            var collect_available = my_shell_pool.collect_available;
            if (shell){
                $('#text_collect_award_shell').text = '× '+shell;
            }
            if (collect_available){
                $('#button_collect_award').SetHasClass('unavailable',false);
            }
        }

        var my_rank = ranking_get_all['my_rank'];
        if (my_rank){
            if ($('#image_leaderboard_my_rank')){
                $('#image_leaderboard_my_rank').style['background-image'] = "url('file://{images}/custom_game/rank/all_rank_"+(my_rank.all_level || 1)+".png')";
            }
            if ($('#text_leaderboard_my_rank')){
                $('#text_leaderboard_my_rank').text = my_rank.rankall || '100%';
                if (my_rank.all_level && my_rank.all_level == 6){
                    $('#text_leaderboard_my_rank').style['color'] = 'yellow';
                }
            }
        }
    });
}

function collect_award() {
    if (!$('#button_collect_award') || $('#button_collect_award').BHasClass('unavailable')){
        return;
    }
    $('#button_collect_award').SetHasClass('unavailable',true);
    // 领取赛季奖励
    RequestProxy('http://gemtd.ppbizon.com/gemtd/leaderboard/collect/@' + local_id, function(r){
        if (!r){
            return;
        }
        if (r.err == 0){
            // 领取成功
            // show_msg($.Localize('#msg_collect_success'));
            if ($('#text_collect_award_shell')){
                $('#text_collect_award_shell').text = '× 0';
            }
            
            // shell_get
            if (r.shell_get){
                open_panel_award('gem', 'shell', '', r.shell_get, 'season');
            }
            // 更新shell
            if (r.shell){
                $("#store_shell_count").text = "× " + (r.shell || "0");
            }
        }
        else{
            show_msg($.Localize('msg_'+r.msg||'msg_collect_failed'));
        }
    });
}

// Game.AddCommand("+ToggleF9", toggle_f9, "", 0);
function toggle_f9() {
    GameEvents.SendCustomGameEventToServer("request_pause_game", {
        "playerid": Players.GetLocalPlayer(),
        "player_name": Game.GetPlayerInfo(Players.GetLocalPlayer()).player_name,
    });
}
SetHotKey('F9', toggle_f9);

function SetHotKey(key, down_cb, up_cb){
    const command = `On${key}${Date.now()}`;
    Game.CreateCustomKeyBind(key, `+${command}`);
    Game.AddCommand(
        `+${command}`,
        () => {
            // key down callback
            if (down_cb){
                down_cb();
            }
        },
        ``,
        1 << 32
    );
    Game.AddCommand(
        `-${command}`,
        () => {
            // key up callback
            if (up_cb){
                up_cb();
            }
        },
        ``,
        1 << 32
    );
}



// 监听选中的单位
// GameEvents.Subscribe("dota_player_update_selected_unit", OnPlayerQueryUnit);
// function OnPlayerQueryUnit(keys) {
//     var portrait_unit = Players.GetLocalPlayerPortraitUnit();
//     if (Entities.IsHero(portrait_unit)) {
//         // 是信使，展示它的信使名字
//         FindDotaHudElement('abilities').style['margin-left'] = '-40px';
//     }
//     else {
//         FindDotaHudElement('abilities').style['margin-left'] = '0px';
//     }
// }