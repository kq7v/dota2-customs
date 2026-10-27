--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


function EOMPlatformLoadScreen(battleLayout) {
    var host = $.GetContextPanel();
    function load() {
        if (!host.IsValid()) return;
        var info = Game.GetMapInfo();
        var map = (info && info.map_display_name || '').replace(/^maps\//, '').replace(/\.vpk$/, '');
        if (!map || map === 'dota' || map === '<empty>') {
            $.Schedule(0.1, load);
            return;
        }
        var platform = map === 'platform_entry' || map === 'platform_lobby';
        var layout = platform ? 'eom_platform/loading.xml' : battleLayout;
        if (layout) {
            var content = $.CreatePanel('Panel', host, 'EOMPlatformLoadingContent');
            content.style.width = '100%';
            content.style.height = '100%';
            if (content.BLoadLayout('file://{resources}/layout/custom_game/' + layout, false, false) === false) throw new Error('Platform loading layout failed: ' + layout);
            if ($.Msg) $.Msg('[platform] Loading UI selected: ' + map + ' -> ' + layout);
        }
    }
    $.Schedule(0, load);
}