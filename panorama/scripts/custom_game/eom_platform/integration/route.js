--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


function EOMPlatformRoute(battleLayout, platformLayout) {
    var host = $.GetContextPanel();
    if (host.EOMPlatformRouteCleanup) host.EOMPlatformRouteCleanup();
    var timer;
    var content;
    var selected;
    var selectedMap;
    var stopped = false;
    var serverListener;
    if (platformLayout === 'eom_platform/loading.xml') {
        var config = GameUI.CustomUIConfig();
        delete config.EOMPlatformServer;
        serverListener = GameEvents.Subscribe('server_spawn', function (event) {
            var map = (event.mapname || '').replace(/^maps\//, '').replace(/\.vpk$/, '');
            config.EOMPlatformServer = map === 'platform_lobby' ? { address: event.address, port: event.port } : undefined;
            if (config.EOMPlatformServer) GameEvents.SendEventClientSide('client_side_event', { event_name: 'platform_server_endpoint', event_data: JSON.stringify(config.EOMPlatformServer) });
        });
    }
    function cleanup() {
        stopped = true;
        if (serverListener !== undefined) GameEvents.Unsubscribe(serverListener);
        if (timer !== undefined) $.CancelScheduled(timer);
        if (content && content.IsValid()) content.DeleteAsync(0);
        content = undefined;
    }
    host.EOMPlatformRouteCleanup = cleanup;
    function update() {
        if (stopped) return;
        if (!host.IsValid()) { cleanup(); return; }
        var info = Game.GetMapInfo();
        var map = (info && info.map_display_name || '').replace(/^maps\//, '').replace(/\.vpk$/, '');
        var known = map && map !== 'dota' && map !== '<empty>';
        var platform = map === 'platform_entry' || map === 'platform_lobby';
        var layout = known ? (platform ? platformLayout : battleLayout) : null;
        if (layout !== selected || map !== selectedMap) {
            if (content && content.IsValid()) content.DeleteAsync(0);
            content = undefined;
            selected = layout;
            selectedMap = map;
            if (layout) {
                content = $.CreatePanel('Panel', host, 'EOMPlatformRouteContent');
                content.style.width = '100%';
                content.style.height = '100%';
                if (content.BLoadLayout('file://{resources}/layout/custom_game/' + layout, false, false) === false) {
                    cleanup();
                    throw new Error('Platform layout failed: ' + layout);
                }
                $.Msg('[platform] UI route: ' + map + ' -> ' + layout);
            }
        }
        timer = $.Schedule(0.1, update);
    }
    // Layout includes run before the XML root is mounted.
    timer = $.Schedule(0, update);
}