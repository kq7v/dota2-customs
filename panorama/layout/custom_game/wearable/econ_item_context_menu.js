--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


function DismissMenu()
{
	$.DispatchEvent( "DismissAllContextMenus" );
}

function ShowItemDetail() {
    var itemDef = $.GetContextPanel().itemDef;
    var itemStyle = $.GetContextPanel().itemStyle;
    $.DispatchEvent("DOTAShowStoreItemDetailsPage", -1, parseInt(itemDef), parseInt(itemStyle));
    DismissMenu();
}