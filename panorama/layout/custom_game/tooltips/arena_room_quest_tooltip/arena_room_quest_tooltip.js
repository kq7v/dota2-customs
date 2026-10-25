--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


function UpdateArenaRoomQuestTooltip()
{
    var root = $.GetContextPanel()
    var room = root.GetAttributeString("room", "0")
    var difficulty = Number(root.GetAttributeString("difficulty", "1")) || 1
    var count = Number(root.GetAttributeString("count", "10")) || 10
    var label = $("#ArenaRoomQuestTooltipText")
    label.SetDialogVariable("room", $.Localize("#arena_room_" + room))
    label.SetDialogVariableInt("difficulty", difficulty)
    label.SetDialogVariableInt("count", count)
    label.text = $.Localize("#arena_room_quest_tooltip", label)
}