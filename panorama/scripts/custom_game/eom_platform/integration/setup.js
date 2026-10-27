--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var EOMPlatformSetupOriginalState;

function EOMPlatformBlockTeamSelect(initialize) {
    var host = $.GetContextPanel();
    if (!host.IsValid()) return true;
    var info = Game.GetMapInfo();
    var map = (info && info.map_display_name || '').replace(/^maps\//, '').replace(/\.vpk$/, '');
    var waiting = !map || map === 'dota' || map === '<empty>';
    var platform = map === 'platform_entry' || map === 'platform_lobby';
    if (waiting || platform) {
        if (!EOMPlatformSetupOriginalState) EOMPlatformSetupOriginalState = { visible: host.visible, hittestchildren: host.hittestchildren };
        host.visible = false;
        host.hittestchildren = false;
        if (waiting && initialize) $.Schedule(0.1, function () { if (host.IsValid()) initialize(); });
        return true;
    }
    if (EOMPlatformSetupOriginalState) {
        host.visible = EOMPlatformSetupOriginalState.visible;
        host.hittestchildren = EOMPlatformSetupOriginalState.hittestchildren;
        EOMPlatformSetupOriginalState = undefined;
    }
    return false;
}