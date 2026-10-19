--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]



var CENTER_ENTITY_INDEX = {
    6: [-2048, 1950, 128],
    7: [0, 1950, 128],
    8: [2048, 1950, 128],
    9: [2048, -98, 128],
    10: [2048, -2144, 128],
    11: [0, -2144, 128],
    12: [-2048, -2144, 128],
    13: [-2048, -88, 128],
    14: [0, -354, 128], // 中心点
};
var ALL_COURIER_LIST = null;

// ============================================================
// VIP 徽章 tooltip：显示该玩家通行证的到期日
// 数据来源：服务器下发的玩家信息表里的 vip_info（addon_game_mode.lua:3157）
// vip_expire 形如 20250101（既有格式化写法见 dac.js:2611）
// 缓存键 = 徽章 id 后缀（dac 侧为 player_id，end 侧为数组序号 i+1），
// 由绑定处传入，保证"哪个徽章显示哪个玩家的日期"不会错位。
// ============================================================
var VIP_INFO_CACHE = {};

function FormatVipExpire(v) {
	var s = (v === null || v === undefined) ? '' : (v + '');
	if (!/^\d{8}$/.test(s)) return '';
	var y = s.substr(0, 4), m = s.substr(4, 2), d = s.substr(6, 2);
	if (m === '00' || d === '00') return '';
	return y + '/' + m + '/' + d;
}

// 到期日字段名不完全确定，按可能性依次尝试，取不到就返回空串
function GetVipExpireText(info) {
	if (!info) return '';
	var cands = [info.vip_expire, info.vip_expired, info.vip_expire_date, info.expire, info.vip_end_time];
	if (info.vip && typeof info.vip === 'object') cands.push(info.vip.vip_expire);
	for (var k = 0; k < cands.length; k++) {
		var s = FormatVipExpire(cands[k]);
		if (s) return s;
	}
	return '';
}

// 在"给徽章设可见性"的地方顺手绑定，键与徽章后缀一致
function RefreshVipTooltip(panel, key, info) {
	if (key === null || key === undefined) return;
	VIP_INFO_CACHE[key] = info || null;
	if (!panel) return;
	// 覆盖 XML 里静态的 DOTAShowTextTooltip('#txt_dac_vip')
	panel.SetPanelEvent('onmouseover', function () { ShowVipTooltip(key, panel); });
	panel.SetPanelEvent('onmouseout', function () {
		$.DispatchEvent("DOTAHideTitleTextTooltip");
		$.DispatchEvent("DOTAHideTextTooltip");
	});
}

function ShowVipTooltip(key, panel) {
	var dateStr = GetVipExpireText(VIP_INFO_CACHE[key]);
	var body = $.Localize('#txt_dac_vip');
	var text = body;
	if (dateStr) {
		// 有效期那行 + 正文，中间不再留空行
		var tpl = $.Localize('#txt_dac_vip_expire');
		var line = '';
		if (tpl && tpl.indexOf('#txt_dac_vip_expire') < 0) {
			line = (tpl.indexOf('%s') >= 0) ? tpl.replace('%s', dateStr) : (tpl + ' ' + dateStr);
		} else {
			line = "<font color='#888888'>" + dateStr + '</font>';
		}
		if (line) text = line + '<br>' + body;
	}
	if (panel) {
		var title = $.Localize('#txt_dac_vip_title');
		if (!title || title.indexOf('#txt_dac_vip_title') >= 0) title = '';
		$.DispatchEvent("DOTAShowTitleTextTooltip", panel, title, text);
	}
}

GameEvents.Subscribe("receive_client_key", function (keys) {
    CheckClientKey(keys.key)
});

var CLIENT_KEY;
function CheckClientKey(k) {
    if (!CLIENT_KEY) {
        CLIENT_KEY = k;
        return true;
    }
    else {
        if (CLIENT_KEY == k) {
            return true;
        }
        else {
            return false;
        }
    }
}
// var COLOR_STR = {
//     "0":"#dddddd",
//     "1":"#dddddd",
//     "2":"#7777ff",
//     "3":"#ff00cc",
//     "4":"#ff8800",
// }


var COLOR_STR = {
    "0": '#b0c3d9',//"gradient( linear, 0% 0%, 100% 0%, from( #b0c3d9 ), color-stop( 0.5, #eeeeee  ), to( #b0c3d9 ) )",
    "1": '#b0c3d9',//"gradient( linear, 0% 0%, 100% 0%, from( #4b69ff ), color-stop( 0.5, #5555ff  ), to( #4b69ff ) )",
    "2": '#5e98d9',//"gradient( linear, 0% 0%, 100% 0%, from( #5e98d9 ), color-stop( 0.5, #bbbbff  ), to( #5e98d9 ) )",
    "3": '#d32ce6',//"gradient( linear, 0% 0%, 100% 0%, from( #d32ce6 ), color-stop( 0.5, #ff22ff  ), to( #d32ce6 ) )",
    "4": '#e4ae39',//"gradient( linear, 0% 0%, 100% 0%, from( #e4ae39 ), color-stop( 0.5, #ff8800  ), to( #e4ae39 ) )",
}
var COLOR_STR_OPACITY = {
    "0": '0.05',//"gradient( linear, 0% 0%, 100% 0%, from( #b0c3d9 ), color-stop( 0.5, #eeeeee  ), to( #b0c3d9 ) )",
    "1": '0.05',//"gradient( linear, 0% 0%, 100% 0%, from( #4b69ff ), color-stop( 0.5, #5555ff  ), to( #4b69ff ) )",
    "2": '0.1',//"gradient( linear, 0% 0%, 100% 0%, from( #5e98d9 ), color-stop( 0.5, #bbbbff  ), to( #5e98d9 ) )",
    "3": '0.15',//"gradient( linear, 0% 0%, 100% 0%, from( #d32ce6 ), color-stop( 0.5, #ff22ff  ), to( #d32ce6 ) )",
    "4": '0.15',//"gradient( linear, 0% 0%, 100% 0%, from( #e4ae39 ), color-stop( 0.5, #ff8800  ), to( #e4ae39 ) )",
}

var COLOR = {
    "0": "rgba(176,195,217,0.8)",
    "1": "rgba(176,195,217,0.8)",
    "2": "rgba(94,152,255,0.8)",
    "3": "rgba(255,44,230,0.8)",
    "4": "rgba(228,174,57,0.8)",
};
var EMOTION_LIST = {
    m101: {
        // 军团：winner
        emotion_index: 1,
        size: 0.8,
    },
    m102: {
        // 巨魔：loser
        emotion_index: 2,
        size: 0.75,
    },
    m103: {
        // fight me
        emotion_index: 7,
        size: 1,
    },
    m104: {
        // r.i.p
        emotion_index: 8,
        size: 0.8,
    },
    m105: {
        // boo diretide
        emotion_index: 13,
        size: 0.75,
    },
    m106: {
        // dp diretide
        emotion_index: 14,
        size: 0.8,
    },
    m107: {
        // 紫猫：为何是你？
        emotion_index: 21,
        size: 0.8,
    },
    m108: {
        // 圣堂：不！
        emotion_index: 26,
        size: 0.8,
    },
    m109: {
        // 幻刺：LOSER
        emotion_index: 33,
        size: 0.75,
    },
    m110: {
        // 幽鬼：疑问
        emotion_index: 39,
        size: 0.8,
    },
    m111: {
        // 圣诞小鹿 哈哈哈
        emotion_index: 40,
        size: 0.8,
    },
    

    m201: {
        // ??
        emotion_index: 3,
        size: 0.9,
    },
    m202: {
        // ?!
        emotion_index: 4,
        size: 0.8,
    },
    m203: {
        // zzz
        emotion_index: 11,
        size: 1,
    },
    m204: {
        // wolf
        emotion_index: 15,
        size: 0.85,
    },
    m205: {
        // 滚雪球
        emotion_index: 17,
        size: 1,
    },
    m206: {
        // 光法 魔法咒语
        emotion_index: 18,
        size: 0.9,
    },
    m207: {
        // 海民：冲我来吧
        emotion_index: 20,
        size: 0.9,
    },
    m208: {
        // 松鼠：大头爆栗子
        emotion_index: 22,
        size: 0.85,
    },
    m209: {
        // 卡尔：我怎么会知道
        emotion_index: 25,
        size: 0.85,
    },
    m210: {
        // 死灵法师：旧病复发
        emotion_index: 35,
        size: 0.8,
    },
    m211: {
        // 本尊受到攻击
        emotion_index: 38,
        size: 0.8,
    },
    m212: {
        // 饼干派对！
        emotion_index: 41,
        size: 0.8,
    },
    

    m301: {
        // tututu
        emotion_index: 5,
        size: 0.8,
    },
    m302: {
        // $$
        emotion_index: 9,
        size: 0.8,
    },
    m303: {
        // zeus
        emotion_index: 10,
        size: 0.9,
    },
    m304: {
        // fur hahahahaha
        emotion_index: 16,
        size: 0.85,
    },
    m305: {
        // 玛西：？
        emotion_index: 19,
        size: 0.8,
    },
    m306: {
        // 拉比克：这技能怎么放
        emotion_index: 24,
        size: 0.85,
    },
    m307: {
        // 酒仙：干一杯
        emotion_index: 34,
        size: 0.8,
    },
    m308: {
        // 隐形刺客：看不见
        emotion_index: 37,
        size: 0.95,
    },

    m401: {
        // wow
        emotion_index: 6,
        size: 0.85,
    },
    m402: {
        // chick
        emotion_index: 12,
        size: 0.75,
    },
    m403: {
        // 猫叫
        emotion_index: 32,
        size: 0.8,
    },
    m404: {
        // 炸弹人：那里！
        emotion_index: 23,
        size: 0.9,
    },
    m405: {
        // ASTAER：起飞
        emotion_index: 27,
        size: 0.8,
    },
    m406: {
        // 糖果
        emotion_index: 36,
        size: 0.85,
    },
}
var CHESS_COUNT = 0, ITEM_COUNT = 0, RELIC_COUNT = 0;
for (var i in CHESS_2_SPEC_CLASS) {
    if (i.indexOf('_ssr') < 0) {
        CHESS_COUNT++;
    }
}

var BUFF_PRIORITY = {
    is_warrior: 1,
    is_assassin: 2,
    is_mage: 3,
    is_hunter: 4,
    is_elf: 5,
    is_warlock: 6,
    is_troll: 7,
    is_beast: 8,
    is_human: 9,
    is_undead: 10,
    is_orc: 11,
    is_goblin: 12,
    is_mech: 13,
    is_knight: 14,
    is_dragon: 15,
    is_shaman: 16,
    is_druid: 17,
    is_wizard: 18,
    is_naga: 19,
    is_element: 20,
    is_god: 21,
    is_pandaman: 22,
    is_aqir: 23,
    is_priest: 24,
    is_dwarf: 25,
    is_demonhunter: 26,
    is_ogre: 27,
    is_demon: 28,
    is_monk: 29,
    is_tauren: 30,
    is_kobold: 31,
    is_nraqi: 32,
    is_satyr: 33,
    is_draenei: 34,
};

function Text2ColorText(id){
    var color = COLOR_STR[id.slice(1, 2)] || '#b0c3d9';
    var text = '「<font color="'+color+'">'+$.Localize('#'+id)+'</font>」';
    return text;
}
function Text2GoodsLevel(id){
    var level = parseInt(id.slice(1, 2));
    if (level){
        return level;
    }
    else{
        return 0;
    }
}

function BuffStr2BuffList(buff_str, is_keep_unlock) {
    var buff_str1 = "";
    var buffs = buff_str.split(',');

    var buff_count_list = {};

    var the_only_buff = null;

    for (var j = 0; j < buffs.length; j++) {
        if (buffs[j]) {
            var buff = buffs[j];
            var buff_name = buff.split(':')[0];
            var buff_count = parseInt(buff.split(':')[1] || 0);
            buff_count_list[buff_name] = buff_count;
        }
    }

    for (var buff_name in buff_count_list) {
        var buff_count = buff_count_list[buff_name];
        if (buff_name == 'is_demon') {
            if (buff_count == 1 || buff_count_list['is_demonhunter'] >= 2) {
                buff_count_list[buff_name] = 1;
                buff_count = 1;
            }
            else {
                buff_count_list[buff_name] = 0;
                buff_count = 0;
            }
        }
        if (buff_name == 'is_wizard' && buff_count >= 3) {
            buff_count_list[buff_name] = 4;
        }


        if (buff_name != 'is_wizard' && buff_name != 'is_wizard1' && the_only_buff && the_only_buff != 'not_only' && ((BUFF_LIST_1[buff_name] && buff_count >= BUFF_LIST_1[buff_name][0]) || (BUFF_LIST_2[buff_name] && buff_count >= BUFF_LIST_2[buff_name][0]))) {
            the_only_buff = 'not_only';
        }
        if (buff_name != 'is_wizard' && buff_name != 'is_wizard1' && !the_only_buff && ((BUFF_LIST_1[buff_name] && buff_count >= BUFF_LIST_1[buff_name][0]) || (BUFF_LIST_2[buff_name] && buff_count >= BUFF_LIST_2[buff_name][0]))) {
            the_only_buff = buff_name;
        }
    }

    var have_spec_buff = false;
    var have_wizard_buff = false;
    var have_wizard_buff_plus = false;
    if (buff_count_list['is_wizard'] >= 2) {
        have_wizard_buff = true;
    }
    if (buff_count_list['is_wizard'] >= 3) {
        have_wizard_buff_plus = true;
    }
    var show_buff_index = 0;
    var show_buff_list = [];
    var buff_rule;

    for (var buff_name in buff_count_list) { 
        if (buff_count_list[buff_name]) {
            if (BUFF_LIST_1[buff_name]) {
                // 种族技能

                buff_rule = JSON.parse(JSON.stringify(BUFF_LIST_1[buff_name]));
                var show_buff_count = 0;
                for (var a = 0; a < BUFF_LIST_1[buff_name].length; a++) {
                    var buff_count = buff_count_list[buff_name] || 0;
                    var check_buff_count = buff_count;
                    var a_count = BUFF_LIST_1[buff_name][a];

                    // 4巫师
                    if (the_only_buff == buff_name && have_wizard_buff_plus && buff_name != 'is_demon') {
                        show_buff_count = BUFF_LIST_1[buff_name][BUFF_LIST_1[buff_name].length - 1];
                        check_buff_count = show_buff_count;
                        buff_count = show_buff_count;
                    }
                    else {
                        if (a_count >= 4 && have_wizard_buff && buff_name != 'is_demon' && check_buff_count >= 4) {
                            // 2巫师
                            check_buff_count = check_buff_count + 1;
                        }

                        if (check_buff_count >= a_count) {
                            show_buff_count = a_count;
                            // $.Msg('show_buff_count='+show_buff_count);
                            // if (have_wizard_buff_plus && a < BUFF_LIST_2[buff_name].length-1){
                            //     show_buff_count = BUFF_LIST_2[buff_name][a+1];
                            // }
                        }
                    }
                }

                var buff_unlock_count = 0;
                for (var j = 0; j < buff_rule.length; j++) {
                    // 第j+1层的羁绊 需要buff_rule[j]个来解锁
                    var unlock_count = buff_rule[j];

                    if (have_wizard_buff && buff_rule[j] >= 4 && buff_name != 'is_pandaman') {
                        unlock_count--;
                    }

                    if (buff_count >= unlock_count) {
                        buff_unlock_count = BUFF_LIST_1[buff_name][j];
                    }
                }

                if (show_buff_count > 0 || is_keep_unlock) {
                    have_spec_buff = true;
                    var color = 'color-' + buff_name.split('_')[1];
                    buff_str1 = "<Panel class='panel_end_buff_one'>";
                    buff_str1 += "<DOTAAbilityImage class='img_end_buff_one' abilityname='" + buff_name + "' onmouseover='DOTAShowAbilityTooltip(" + buff_name + ")' onmouseout='DOTAHideAbilityTooltip()'/>";
                    buff_str1 += "<Label class='text_end_buff_one' text='(" + buff_unlock_count + ")'/>";
                    buff_str1 += "</Panel>";
                    show_buff_list.push({
                        name: buff_name,
                        count: show_buff_count,
                        buff_count: buff_count,
                        check_buff_count: check_buff_count,
                        xml: buff_str1,
                        buff_type: 'debuff',
                        have_wizard_buff: have_wizard_buff,
                        buff_rule: buff_rule,
                        buff_rule_ori: BUFF_LIST_1[buff_name],
                    });
                }
            }
            if (BUFF_LIST_2[buff_name]) {
                // 职业技能

                buff_rule = JSON.parse(JSON.stringify(BUFF_LIST_2[buff_name]));
                var show_buff_count = 0;
                for (var a = 0; a < BUFF_LIST_2[buff_name].length; a++) {
                    var buff_count = buff_count_list[buff_name] || 0;
                    var check_buff_count = buff_count;
                    var a_count = BUFF_LIST_2[buff_name][a];
                    // 4巫师
                    if (the_only_buff == buff_name && have_wizard_buff_plus && buff_name != 'is_demon') {

                        show_buff_count = BUFF_LIST_2[buff_name][BUFF_LIST_2[buff_name].length - 1];
                        check_buff_count = show_buff_count;
                        buff_count = show_buff_count;
                    }
                    else {
                        if (a_count >= 4 && have_wizard_buff && buff_name != 'is_demon' && check_buff_count >= 4) {
                            // 2巫师
                            check_buff_count = check_buff_count + 1;
                        }
                        if (check_buff_count >= a_count) {
                            show_buff_count = a_count;
                        }
                    }
                }

                var buff_unlock_count = 0;
                for (var j = 0; j < buff_rule.length; j++) {
                    // 第j+1层的羁绊 需要buff_rule[j]个来解锁
                    var unlock_count = buff_rule[j];
                    if (have_wizard_buff && buff_rule[j] >= 4) {
                        unlock_count--;
                    }

                    if (buff_count >= unlock_count) {
                        buff_unlock_count = BUFF_LIST_2[buff_name][j];
                    }
                }

                if (show_buff_count > 0 || is_keep_unlock) {
                    var color = 'color-' + buff_name.split('_')[1];
                    buff_str1 = "<Panel class='panel_end_buff_one'>";
                    buff_str1 += "<DOTAAbilityImage class='img_end_buff_one' abilityname='" + buff_name + "' onmouseover='DOTAShowAbilityTooltip(" + buff_name + ")' onmouseout='DOTAHideAbilityTooltip()'/>";
                    buff_str1 += "<Label class='text_end_buff_one' text='(" + buff_unlock_count + ")'/>";
                    buff_str1 += "</Panel>";
                    show_buff_list.push({
                        name: buff_name,
                        count: show_buff_count,
                        buff_count: buff_count,
                        check_buff_count: check_buff_count,
                        xml: buff_str1,
                        buff_type: 'buff',
                        have_wizard_buff: have_wizard_buff,
                        buff_rule: buff_rule,
                        buff_rule_ori: BUFF_LIST_2[buff_name],
                    });
                }
            }
        }
    }
    show_buff_list.sort(function (a, b) {
        return b.count - a.count;
    });

    return show_buff_list;
}
function GetShowBuffXML(buff_str) {
    // 显示buff
    var buff_str_line1 = "", buff_str_line2 = "";

    var show_buff_list = BuffStr2BuffList(buff_str);

    var show_count = 0;
    var show_buff_list_simple = [];
    for (var i = 0; i < show_buff_list.length; i++) {
        var ii = show_buff_list[i];
        if (ii && ii.count && ii.xml && ii.name) {
            if (i < 6) {
                buff_str_line1 += ii.xml;
                show_count++;
            }
            else if (i < 12) {
                buff_str_line2 += ii.xml;
                show_count++;
            }

            show_buff_list_simple.push(ii.name + ':' + ii.count);
        }
    }
    GameEvents.SendCustomGameEventToServer("set_player_show_buff_list", {
        'show_buff_list': show_buff_list_simple.join(','),
        'hehe': Date.now(),
    });

    var buff_str_final = "<Panel class='end_buff_line_final'>";

    if (show_count > 6) {
        buff_str_final += "<Panel class='end_buff_line_1'>" + buff_str_line1 + "</Panel>";
        buff_str_final += "<Panel class='end_buff_line_2'>" + buff_str_line2 + "</Panel>";
    }
    else {
        buff_str_final += "<Panel class='end_buff_line_0'>" + buff_str_line1 + "</Panel>";
    }
    buff_str_final += "</Panel>";

    return buff_str_final;
}

const centers = {
    [DOTATeam_t.DOTA_TEAM_CUSTOM_1]: [4128, 128, 305],
    [DOTATeam_t.DOTA_TEAM_CUSTOM_2]: [4128, -3872, 305],
    [DOTATeam_t.DOTA_TEAM_CUSTOM_3]: [128, -3872, 305],
    [DOTATeam_t.DOTA_TEAM_CUSTOM_4]: [-3872, -3872, 305],
    [DOTATeam_t.DOTA_TEAM_CUSTOM_5]: [-3872, 128, 305],
    [DOTATeam_t.DOTA_TEAM_CUSTOM_6]: [-3872, 4128, 305],
    [DOTATeam_t.DOTA_TEAM_CUSTOM_7]: [128, 4128, 305],
    [DOTATeam_t.DOTA_TEAM_CUSTOM_8]: [4128, 4128, 305],
};

function PosToXY(pos) {
    let team = Players.GetTeam(Players.GetLocalPlayer());
    let center = centers[team];
    let lbx = center[0] - 1280 / 2;
    let lby = center[1] - 1280 / 2;
    let x = Math.floor((pos[0] - lbx) / 128);
    let y = Math.floor((pos[1] - lby) / 128);
    return [x, y];
}
function XYToPos(xy) {
    let team = Players.GetTeam(Players.GetLocalPlayer());
    let center = centers[team];
    let lbx = center[0] - 1280 / 2;
    let lby = center[1] - 1280 / 2;
    let x = lbx + 64 + 128 * xy[0];
    let y = lby + 64 + 128 * xy[1];
    return [x, y, 180];
}

// 因为BCreateChildren无了，改为调用这个CreateChildren
function CreateChildren(parent_panel, xmlstring) {
    var obj = readXML(xmlstring);
    CreateOneElement(obj, parent_panel);
}
function FindDotaHudElement(id) {
    var hudRoot;
    for (panel = $.GetContextPanel(); panel != null; panel = panel.GetParent()) {
        hudRoot = panel;
    }
    var comp = hudRoot.FindChildTraverse(id);
    return comp;
}
function CreateUIElement(parent_panel, panel_type, id, prop) {
    if (!parent_panel || !panel_type) {
        return;
    }
    var new_ui_element = $.CreatePanel(panel_type, parent_panel, id, prop || {});
    return new_ui_element;
}
function ClearUIElement(parent_panel) {
    parent_panel.RemoveAndDeleteChildren();
}
function CreateOneElement(obj, parent_panel) {
    if (!obj) {
        return;
    }
    if (!obj.type) {
        if (obj.children && obj.children.length > 0) {
            for (var i = 0; i < obj.children.length; i++) {
                CreateOneElement(obj.children[i], parent_panel);
            }
        }
        return;
    }
    var panel_type = obj.type;
    var props = obj.props;
    var panel_id = obj.props.id;
    var panel = CreateUIElement(parent_panel, panel_type, panel_id, props);

    if (obj.children && obj.children.length > 0) {
        for (var i = 0; i < obj.children.length; i++) {
            CreateOneElement(obj.children[i], panel);
        }
    }
}

function readXML(xmlstring) {
    xmlstring = xmlstring.replace(/\s+=\s+/g, '=');
    xmlstring = xmlstring.replace(/\s+=/g, '=');
    xmlstring = xmlstring.replace(/=\s+/g, '=');

    var element_queue = [];
    var p_i = 0;
    var element_temp = "";
    while (p_i < xmlstring.length) {
        element_temp = element_temp + xmlstring.charAt(p_i);
        if (xmlstring.charAt(p_i) == '>') {
            element_queue.unshift(element_temp);
            element_temp = "";
        }
        p_i++;
    }
    var element_stack = [];

    var element_string_object = { context: 'root', children: [], parent: null };
    var tree_pointer = element_string_object['children'];
    var parent_pointer = element_string_object;
    while (element_queue.length > 0) {
        var element = element_queue.pop();
        if (element.indexOf('/>') != -1) {
            tree_pointer.push({ context: element, children: [], parent: parent_pointer });
        }
        else if (element.indexOf('</') != -1) {
            parent_pointer = element_stack.pop()['parent'];
            tree_pointer = parent_pointer['children'];
        }
        else if (element.indexOf('<') != -1) {
            var obj = { context: element, children: [], parent: parent_pointer };
            tree_pointer.push(obj);
            element_stack.push(obj);
            parent_pointer = obj;
            tree_pointer = obj['children'];
        }
    }
    readchild(element_string_object);

    return element_string_object;
}
function readchild(obj) {
    if (obj['children'].length == 0) {
        return null;
    }
    else {
        for (var i = 0; i < obj['children'].length; i++) {
            var str = obj['children'][i]['context'];
            var p_type_start = str.indexOf('<');
            var p_type_end = str.indexOf(' ');
            var type = str.slice(p_type_start + 1, p_type_end);
            obj['children'][i]['type'] = type;
            var props = {};
            var p_i = p_type_end;
            while (p_i < str.length) {
                var p_prop_name_end = str.indexOf('=', p_i);
                if (p_prop_name_end == -1) {
                    break;
                }
                var prop_name = str.slice(p_i, p_prop_name_end).trim();

                var p_prop_value_start_1 = str.indexOf('"', p_i);
                var p_prop_value_start_2 = str.indexOf("'", p_i);
                var p_prop_value_end_1 = null;
                var p_prop_value_end_2 = null;
                if (p_prop_value_start_1) {
                    p_prop_value_end_1 = str.indexOf('"', p_prop_value_start_1 + 1) + 1;
                }
                if (p_prop_value_start_2) {
                    p_prop_value_end_2 = str.indexOf("'", p_prop_value_start_2 + 1) + 1;
                }
                var p_prop_value_end = (p_prop_value_end_1 || p_prop_value_end_2);
                if (p_prop_value_end == -1) {
                    break;
                }
                var prop_value = str.slice(p_prop_name_end + 1, p_prop_value_end).slice(1, -1);
                if (prop_name != "" && prop_value != "") {
                    props[prop_name] = prop_value;
                }
                p_i = p_prop_value_end + 1;
            }
            obj['children'][i]['props'] = props;
            delete obj['children'][i]['context'];
            delete obj['children'][i]['parent'];
            readchild(obj['children'][i]);
        }
    }
}

function GetWSColor(win_streak) {
    var ws_color = '#ddd';
    if (!win_streak) {
        return ws_color;
    }
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

function html2Escape(sHtml) {
    if (!sHtml) {
        return;
    }
    return sHtml.replace(/[<>&"']/g, function (c) {
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&apos;',
        }[c];
    });
}

function GetChessBaseName(chess) {
    var chess_name = chess || '';
    if (chess_name.indexOf('11') > -1) {
        chess_name = chess_name.substr(0, chess_name.length - 2);
    }
    if (chess_name.indexOf('1') > -1) {
        chess_name = chess_name.substr(0, chess_name.length - 1);
    }
    return chess_name;
}

function FindValueInObj(obj, v) {
    var have = false;
    for (var j in obj) {
        if (obj[j] == v) {
            have = true;
        }
    }
    return have;
}

function show_tag(container, tags) {
    if (!container) {
        return;
    }
    var inner = $.CreatePanel('Panel', container, 'panel_award_tag_container_inner', {
        style: 'horizontal-align: right; flow-children: right;'
    });
    for (var i = 0; i < tags.length; i++) {
        var text = tags[i].text;
        var color = tags[i].color;
        var tag = $.CreatePanel('Panel', inner, '', {
            class: 'tags_one',
            style: 'background-color:' + color + ';',
        });
        $.CreatePanel('Label', tag, '', {
            text: $.Localize('#' + text),
        });
    }
}

function IsUnitHasModifier(portrait_unit, modifier_name) {
    for (var i = 0; i <= Entities.GetNumBuffs(portrait_unit); i++) {
        var buff_name = Buffs.GetName(portrait_unit, i);
        if (modifier_name == buff_name) {
            return true;
        }
    }
    return false;
}
function GetUnitLevel(portrait_unit) {
    if (Entities.IsHero(portrait_unit)) {
        return Entities.GetLevel(portrait_unit);
    }
    if (Entities.HasItemInInventory(portrait_unit, 'item_shirenmozhimao')) {
        var level = Entities.GetLevel(portrait_unit) + 2;
        if (level > 9) {
            level = 9;
        }
        return level;
    }
    else if (Entities.HasItemInInventory(portrait_unit, 'item_wuzhixiaomao')) {
        var level = Entities.GetLevel(portrait_unit) + 1;
        if (level > 9) {
            level = 9;
        }
        return level;
    }
    else if (IsUnitHasModifier(portrait_unit, 'modifier_more_creep') == true){
        var level = Entities.GetLevel(portrait_unit) + 1;
        if (level > 9) {
            level = 9;
        }
        return level;
    }
    else if (Entities.IsIllusion(portrait_unit) == true){
        return 1;
    }
    else {
        return Entities.GetLevel(portrait_unit);
    }
}

function format_time(timespan) {
    var dateTime = new Date(timespan) // 将传进来的字符串或者毫秒转为标准时间
    var year = dateTime.getFullYear()
    var month = dateTime.getMonth() + 1
    var day = dateTime.getDate()
    var hour = dateTime.getHours()
    var minute = dateTime.getMinutes()
    // var second = dateTime.getSeconds()
    var millisecond = dateTime.getTime() // 将当前编辑的时间转换为毫秒
    var now = new Date() // 获取本机当前的时间
    var nowNew = now.getTime() // 将本机的时间转换为毫秒
    var milliseconds = 0
    var timeSpanStr
    milliseconds = nowNew - millisecond
    if (milliseconds <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
        timeSpanStr = $.Localize('#just_now')
    } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + $.Localize('#m_ago');
    } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + $.Localize('#h_ago');
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) { // 大于一天小于十五天展示位天
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + $.Localize('#d_ago');
    } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + $.Localize('#d_ago');
    } else {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + $.Localize('#d_ago');
    }
    return timeSpanStr;
}
function close_confirm() {
    FindDotaHudElement('confirm_box').SetHasClass('invisible', true);
}

function IsTouchMode() {
    var is_slide_mode = false;
    if (FindDotaHudElement('panel_slide')) {
        is_slide_mode = FindDotaHudElement('panel_slide').BHasClass('show');
    }
    return is_slide_mode;
}
function PlayClickCSS(p) {
    p.SetHasClass('click', true);
    $.Schedule(0.1, function () {
        p.SetHasClass('click', false);
    });
}

var WINDOW_STACK = {};
function ShowExclusionWindow(w, force) {
    if (!WINDOW_STACK[w]) {
        WINDOW_STACK[w] = 1;
    }
    for (var i in WINDOW_STACK) {
        if (i != w) {
            // 关掉i
            if (FindDotaHudElement(i)) {
                FindDotaHudElement(i).SetHasClass('show', false);
            }
        }
    }
    // 打开w
    if (FindDotaHudElement(w)) {
        if (force == true || force == false) {
            FindDotaHudElement(w).SetHasClass('show', force);
        }
        else {
            FindDotaHudElement(w).ToggleClass('show');
        }
    }
}

function SetHotKey(key, down_cb, up_cb) {
    const command = `On${key}${Date.now()}`;
    Game.CreateCustomKeyBind(key, `+${command}`);
    Game.AddCommand(
        `+${command}`,
        () => {
            // key down callback
            if (down_cb) {
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
            if (up_cb) {
                up_cb();
            }
        },
        ``,
        1 << 32
    );
}

const SEASON_LIST_DEFAULT = [
];

var IS_CAMERA_LOCKED = false;

// 新天赋树
// 在panel_talent_tree_new（64x64px）画一个空的天赋树
function InitTalentTreeNew(talent_tree_panel_name, round) {
    var panel_talent_tree_new = FindDotaHudElement(talent_tree_panel_name);
    if (!panel_talent_tree_new){
        return;
    }
    panel_talent_tree_new.RemoveAndDeleteChildren();

    var glow = $.CreatePanel('DOTAScenePanel', panel_talent_tree_new, talent_tree_panel_name+'_glow', {
        map: "maps/ui/glow.vmap",
        camera: "default_camera",
        style: 'margin-left:0px;width:100px;height:100px;z-index:2;horizontal-align:center;vertical-align:center;opacity:0;',
        light: "global_light",
        antialias: "true",
        renderdeferred: 'false',
        particleonly: false,
    });

    $.CreatePanel('Panel', panel_talent_tree_new, talent_tree_panel_name+'_bg', {
        class: '',
        style: 'width:64px;height:64px;background-image:url("s2r://panorama/images/hud/reborn/statbranch_button_bg_psd.vtex");background-size:100% 100%;z-index:1;',
    });
    $.CreatePanel('Panel', panel_talent_tree_new, talent_tree_panel_name+'bg_well', {
        class: '',
        style: 'width:64px;height:64px;background-image:url("s2r://panorama/images/hud/reborn/statbranch_button_bg_all_off_psd.vtex");background-size:cover;z-index:3;',
    })
    var panel_talent_tree_new_graphics = $.CreatePanel('Panel', panel_talent_tree_new, talent_tree_panel_name+'_branch', {
        class: '',
        style: 'width:64px;height:64px;z-index:5;',
    });
    var panel_talent_tree_new_branch_channel = $.CreatePanel('Panel', panel_talent_tree_new_graphics, talent_tree_panel_name+'_branch_channel', {
        class: '',
        style: 'width:64px;height:64px;vertical-align:top;horizontal-align:center;overflow:noclip;z-index:21;',
    });

    // 树干
    var panel_talent_tree_new_level_progress = $.CreatePanel('Panel', panel_talent_tree_new_branch_channel, talent_tree_panel_name+'_level_progress', {
        class: '',
        style: 'width:50px;height:4px;transform:rotateZ(-90deg) translate3d( -3px, 35px, 0px);opacity-mask:url("s2r://panorama/images/hud/reborn/statbranch_progress_mask_psd.vtex") 1.0;horizontal-align:center;margin-top:10px;margin-bottom:50px;margin-left:5px;overflow:clip;border-radius:0;border-bottom-right-radius:3px;border-bottom-left-radius:2px;z-index:2;',
    });
    var panel_talent_tree_new_level_progress_bar = $.CreatePanel('ProgressBar', panel_talent_tree_new_level_progress, 'panel_talent_tree_new_level_progress_bar', {
        class: '',
        style: 'width:100%;vertical-align:bottom;height:6px;border-radius:1px;background-color:none;box-shadow:none;',
        max: 35,
        min: 0,
        // value: 30,
    });
    var panel_talent_tree_new_level_progress_bar = $.CreatePanel('Panel', panel_talent_tree_new_level_progress, talent_tree_panel_name+'_level_progress_bar', {
        class: '',
        style: 'width:100%;vertical-align:bottom;height:6px;background-color:#ffff88;',
        // value: 30,
    });
    SetTalentTreeNewLevelProgressBar(talent_tree_panel_name, round);

    // 树枝
    var panel_talent_tree_new_pip_container = $.CreatePanel('Panel', panel_talent_tree_new_branch_channel, talent_tree_panel_name+'_pip_container', {
        class: '',
        style: 'width:64px;height:64px;',
    });
    // 8个分支
    var panel_talent_tree_new_pip_4 = $.CreatePanel('Panel', panel_talent_tree_new_pip_container, talent_tree_panel_name+'_pip_4', {
        class: '',
        style: 'horizontal-align:center;overflow:noclip;flow-children:none;',
    });
    var panel_talent_tree_new_pip_4a = $.CreatePanel('Panel', panel_talent_tree_new_pip_4, talent_tree_panel_name+'_pip_4a', {
        class: '',
        style: 'background-image:url("s2r://panorama/images/hud/reborn/statbranch_button_pip25_psd.vtex");width:64px;height:64px;transform:scaleX(-1) translateX(1px);horizontal-align:left;opacity:0;background-size:100%;background-repeat:no-repeat;z-index:1;margin-top:0px;margin-left:0px;',
    });
    var panel_talent_tree_new_pip_4b = $.CreatePanel('Panel', panel_talent_tree_new_pip_4, talent_tree_panel_name+'_pip_4b', {
        class: '',
        style: 'background-image:url("s2r://panorama/images/hud/reborn/statbranch_button_pip25_psd.vtex");width:64px;height:64px;transform:scaleX(1) translateX(1px);horizontal-align:right;opacity:0;background-size:100%;background-repeat:no-repeat;z-index:1;margin-top:0px;margin-left:0px;',
    });

    var panel_talent_tree_new_pip_3 = $.CreatePanel('Panel', panel_talent_tree_new_pip_container, talent_tree_panel_name+'_pip_3', {
        class: '',
        style: 'horizontal-align:center;overflow:noclip;flow-children:none;',
    });
    var panel_talent_tree_new_pip_3a = $.CreatePanel('Panel', panel_talent_tree_new_pip_3, talent_tree_panel_name+'_pip_3a', {
        class: '',
        style: 'background-image:url("s2r://panorama/images/hud/reborn/statbranch_button_pip20_psd.vtex");width:64px;height:64px;transform:scaleX(-1) translateX(1px);horizontal-align:left;opacity:0;background-size:100%;background-repeat:no-repeat;z-index:1;margin-top:0px;margin-left:0px;',
    });
    var panel_talent_tree_new_pip_3b = $.CreatePanel('Panel', panel_talent_tree_new_pip_3, talent_tree_panel_name+'_pip_3b', {
        class: '',
        style: 'background-image:url("s2r://panorama/images/hud/reborn/statbranch_button_pip20_psd.vtex");width:64px;height:64px;transform:scaleX(1) translateX(1px);horizontal-align:right;opacity:0;background-size:100%;background-repeat:no-repeat;z-index:1;margin-top:0px;margin-left:0px;',
    });

    var panel_talent_tree_new_pip_2 = $.CreatePanel('Panel', panel_talent_tree_new_pip_container, talent_tree_panel_name+'_pip_2', {
        class: '',
        style: 'horizontal-align:center;overflow:noclip;flow-children:none;',
    });
    var panel_talent_tree_new_pip_2a = $.CreatePanel('Panel', panel_talent_tree_new_pip_2, talent_tree_panel_name+'_pip_2a', {
        class: '',
        style: 'background-image:url("s2r://panorama/images/hud/reborn/statbranch_button_pip15_psd.vtex");width:64px;height:64px;transform:scaleX(-1) translateX(1px);horizontal-align:left;opacity:0;background-size:100%;background-repeat:no-repeat;z-index:1;margin-top:0px;margin-left:0px;',
    });
    var panel_talent_tree_new_pip_2b = $.CreatePanel('Panel', panel_talent_tree_new_pip_2, talent_tree_panel_name+'_pip_2b', {
        class: '',
        style: 'background-image:url("s2r://panorama/images/hud/reborn/statbranch_button_pip15_psd.vtex");width:64px;height:64px;transform:scaleX(1) translateX(1px);horizontal-align:right;opacity:0;background-size:100%;background-repeat:no-repeat;z-index:1;margin-top:0px;margin-left:0px;',
    });

    var panel_talent_tree_new_pip_1 = $.CreatePanel('Panel', panel_talent_tree_new_pip_container, talent_tree_panel_name+'_pip_1', {
        class: '',
        style: 'horizontal-align:center;overflow:noclip;flow-children:none;',
    });
    var panel_talent_tree_new_pip_1a = $.CreatePanel('Panel', panel_talent_tree_new_pip_1, talent_tree_panel_name+'_pip_1a', {
        class: '',
        style: 'background-image:url("s2r://panorama/images/hud/reborn/statbranch_button_pip10_psd.vtex");width:64px;height:64px;transform:scaleX(-1) translateX(1px);horizontal-align:left;opacity:0;background-size:100%;background-repeat:no-repeat;z-index:1;margin-top:0px;margin-left:0px;',
    });
    var panel_talent_tree_new_pip_1b = $.CreatePanel('Panel', panel_talent_tree_new_pip_1, talent_tree_panel_name+'_pip_1b', {
        class: '',
        style: 'background-image:url("s2r://panorama/images/hud/reborn/statbranch_button_pip10_psd.vtex");width:64px;height:64px;transform:scaleX(1) translateX(1px);horizontal-align:right;opacity:0;background-size:100%;background-repeat:no-repeat;z-index:1;margin-top:0px;margin-left:0px;',
    });

    InitTalentTreePipStatus(talent_tree_panel_name);
    // SetTalentTreePipStatus(talent_tree_panel_name, '1a', true);
    // SetTalentTreePipStatus(talent_tree_panel_name, '2b', true);
}
function InitTalentTreePipStatus(talent_tree_panel_name){
    FindDotaHudElement(talent_tree_panel_name+'_pip_1a').style.opacity = 0;
    FindDotaHudElement(talent_tree_panel_name+'_pip_2a').style.opacity = 0;
    FindDotaHudElement(talent_tree_panel_name+'_pip_3a').style.opacity = 0;
    FindDotaHudElement(talent_tree_panel_name+'_pip_4a').style.opacity = 0;
    FindDotaHudElement(talent_tree_panel_name+'_pip_1b').style.opacity = 0;
    FindDotaHudElement(talent_tree_panel_name+'_pip_2b').style.opacity = 0;
    FindDotaHudElement(talent_tree_panel_name+'_pip_3b').style.opacity = 0;
    FindDotaHudElement(talent_tree_panel_name+'_pip_4b').style.opacity = 0;
}
function SetTalentTreePipStatus(talent_tree_panel_name, pip, status){
    var xxx = FindDotaHudElement(talent_tree_panel_name+'_pip_'+pip);
    if (xxx){
        if (status){
            xxx.style.opacity = 1;
        }
        else{
            xxx.style.opacity = 0;
        }
    }
}

function SetTalentTreeNewLevelProgressBar(talent_tree_panel_name, round){
    var r = round || 35;
    if (r > 35){
        r = 35;
    }
    if (!r || r < 0){
        r = 0;
    }
    
    var v=0;
    if (r<=5){
        v = 7+r/5.0*8.0;
    }
    else{
        v = 15+(r-5)/10.0*7.0;
    }
    var xxx = FindDotaHudElement(talent_tree_panel_name+'_level_progress_bar');
    if (xxx){
        v = v/35.0*100;
        xxx.style['width'] = v+'%';
    }
}

function BindTalentClickEvent(t){
    FindDotaHudElement('talent_tree_'+t).SetPanelEvent("onactivate",
        function () {
            if (!FindDotaHudElement('panel_talent_tree_box_inner').BHasClass('unavailable')){
                FindDotaHudElement('panel_talent_tree_box_inner').SetHasClass('unavailable',true);
                RequestChooseTalent(t);
                $.Schedule(5,function(){
                    FindDotaHudElement('panel_talent_tree_box_inner').SetHasClass('unavailable',false);
                });
            }
        }
    );
}

function RequestChooseTalent(t){
    // $.Msg('RequestChooseTalent: '+t);
    Game.EmitSound("General.Buy");
    GameEvents.SendCustomGameEventToServer("request_choose_talent", {
        talent: t,
    });
}

function ToggleTalentTree(){
    var tree = FindDotaHudElement('panel_talent_tree_box');
    if (!tree){
        return;
    }
    tree.SetHasClass('show', !tree.BHasClass('show'));
}
function ShowTalentTreeBox(){
    var tree = FindDotaHudElement('panel_talent_tree_box');
    if (!tree){
        return;
    }
    tree.SetHasClass('show', true);
}
function HideTalentTreeBox(){
    var tree = FindDotaHudElement('panel_talent_tree_box');
    if (!tree){
        return;
    }
    tree.SetHasClass('show', false);
}

function SetTalentTreeActive(tf){
    if (tf == true){
        if (FindDotaHudElement('level_stats_frame')){

            // FindDotaHudElement('level_stats_frame').style['visibility'] = 'visible';
            // FindDotaHudElement('level_stats_frame').FindChild('LevelUpTab').SetPanelEvent("onactivate",
            FindDotaHudElement('talent_tree_new_glow').style['opacity'] = '1';
            FindDotaHudElement('talent_tree_new_container').SetPanelEvent("onactivate",
                function () {
                    ToggleTalentTree();
                }
            );
            FindDotaHudElement('talent_tree_new_container').SetPanelEvent("onmouseover",
                function () {
                    $.DispatchEvent("DOTAShowTextTooltip", FindDotaHudElement('talent_tree_new_container'), $.Localize('#text_you_have_talent_selectable'));
                }
            );
            FindDotaHudElement('talent_tree_new_container').SetPanelEvent("onmouseout",
                function () {
                    $.DispatchEvent("DOTAHideTextTooltip");
                }
            );
            // FindDotaHudElement('level_stats_frame').FindChild('LevelUpTab').SetPanelEvent("onactivate",
            //     function () {
            //     }
            // );
        }
        else{

        }
    }
    else{
        // FindDotaHudElement('level_stats_frame').style['visibility'] = 'collapse';
        // FindDotaHudElement('level_stats_frame').FindChild('LevelUpTab').SetPanelEvent("onactivate",
        FindDotaHudElement('talent_tree_new_glow').style['opacity'] = '0';
        FindDotaHudElement('talent_tree_new_container').SetPanelEvent("onactivate",
            function () {
            }
        );
        FindDotaHudElement('talent_tree_new_container').SetPanelEvent("onmouseover",
            function () {
            }
        );
        FindDotaHudElement('talent_tree_new_container').SetPanelEvent("onmouseout",
            function () {
            }
        );
        // FindDotaHudElement('level_stats_frame').FindChild('LevelUpTab').SetPanelEvent("onactivate",
        //     function () {
        //     }
        // );
    }
}

function HideTalentTreeNew(){
    FindDotaHudElement('talent_tree_new_container').visible = false;
    SetTalentTreeActive(false);
}
function ShowTalentTreeNew(unit){
    FindDotaHudElement('talent_tree_new_container').visible = true;
}

function SetPanelMouseOverText(panel,text){
    if (!panel){
        return;
    }
    panel.SetPanelEvent("onmouseover",
        function () {
            $.DispatchEvent("DOTAShowTextTooltip", panel, text);
        }
    );
    panel.SetPanelEvent("onmouseout",
        function () {
            $.DispatchEvent("DOTAHideTextTooltip");
        }
    );
}

function ErrorMsg(text){
    if ($.Localize('#'+text) == '#'+text){
        return text || ":(";
    }
    else{
        return $.Localize('#'+text);
    }
}

function IsOBing(){
    if (Game.GetPlayerInfo(Players.GetLocalPlayer()).player_team_id == 1) {
        return true;
    }
    else{
        return false;
    }
}