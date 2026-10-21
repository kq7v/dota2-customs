--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


function downloadPlatform() {
    var addonId = '3797844518';
    var config = GameUI.CustomUIConfig();
    // 平台下载链路的调试日志开关（true 时才往控制台打 [下载验证] ...）
    var DEBUG_TRACE = false;

    // 停止之前的诊断和等待循环
    if (config.workshopVerification && config.workshopVerification.stop) {
        config.workshopVerification.stop();
    }
    if (config.workshopLaunchTest) {
        config.workshopLaunchTest.active = false;
    }

    var panel = $.GetContextPanel();
    var run = {
        active: true,
        pending: false,
        started: false
    };
    config.workshopLaunchTest = run;

    function live() {
        return run.active &&
            config.workshopLaunchTest === run &&
            panel.IsValid();
    }

    function trace(name, args) {
        // 调试输出默认关闭；排查平台下载问题时把下面的 DEBUG_TRACE 改成 true
        if (!DEBUG_TRACE) return;
        $.Msg('[下载验证] ' + name +
            ' pending=' + run.pending +
            ' argc=' + args.length);

        for (var i = 0; i < args.length; i++) {
            $.Msg('[下载验证] 参数[' + i + '] type=' +
                typeof args[i] + ' value=', args[i]);
        }
    }

    // 安装完成：仅处理正在等待的目标地图
    $.RegisterForUnhandledEvent('WorkshopItemInstalled', function (id) {
        if (!live()) return;
        trace('Installed', arguments);

        if (!run.pending || String(id) !== addonId) return;

        run.pending = false;
        
        StartLaunchPlatform();
    });

    $.RegisterForUnhandledEvent('WorkshopItemDownloadRequested', function (id) {
        if (!live()) return;
        trace('Installed', arguments);

        if (!run.pending || String(id) !== addonId) return;

        run.pending = false;
        
        StartLaunchPlatform();
    });


    // 收到下载请求通知，不代表安装完成
    $.RegisterForUnhandledEvent('WorkshopItemDownloadRequested', function () {
        if (live()) trace('DownloadRequested', arguments);
    });

    $.RegisterForUnhandledEvent('WorkshopItemRequestFailed', function () {
        if (live()) trace('RequestFailed', arguments);
    });

    function wait() {
        $.Schedule(3, function () {
            if (!live() || !run.pending) return;

            if (DEBUG_TRACE) {
                $.Msg('[下载验证] 尚未收到匹配的安装通知，继续等 3 秒');
            }
            wait();
        });
    }

    function start() {
        if (!live() || run.started) return;

        run.started = true;
        run.pending = true;
        if (DEBUG_TRACE) $.Msg('[下载验证] 请求下载 ' + addonId);

        try {
            $.DispatchEvent('DOTADownloadCustomGameUpdate', addonId);
        } catch (err) {
            run.pending = false;
            if (DEBUG_TRACE) $.Msg('[下载验证] 请求异常：', err);
            return;
        }

        wait();

        $.Schedule(10, function () {
            // 10秒还没返回下载成功，只能直接连接试试了...
            StartLaunchPlatform();
        });
    }

    if (DEBUG_TRACE) $.Msg('[下载验证] 测试已加载，1 秒后请求下载');
    $.Schedule(1, start);
}

function StartLaunchPlatform(){
    var map_name = 'ranked_1x8';
    var map_display_name = Game.GetMapInfo().map_display_name;
    // 调试打印已关闭（原来会刷地图名 / 111111 / 222222 / 333333 / 准备启动）
    if (map_display_name == '休闲_casual' || map_display_name == '休闲_Casual'){
        map_name = 'casual_1x8';
    }
    if (map_display_name == '休闲观战_casualob' || map_display_name == '休闲观战_CasualOB'){
        map_name = 'casual_1x8_ob';
    }
    if (map_display_name == '自由天梯_ranked' || map_display_name == '自由天梯_Ranked'){
        map_name = 'ranked_1x8';
    }
    GameEvents.SendEventClientSide('client_connect_server', { map_name: map_name });
}

var game_host_type = CustomNetTables.GetTableValue("game_info", 'game_host_type');
if (game_host_type.game_host_type == 'arcade_platform'){
    downloadPlatform();
}
else{
    $('#TeamSelectContainer').SetHasClass('invisible',false);
    $('#CourierSelectContainer').SetHasClass('invisible',false);
}