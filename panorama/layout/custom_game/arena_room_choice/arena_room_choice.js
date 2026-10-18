--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var room_choice_rooms = []
var room_choice_votes = {}
var room_choice_open = false
var room_choice_time = 0
var room_choice_full_time = 1
var room_choice_fixed = false

function RoomChoiceIsArenaMap()
{
	return /^(arena|1_player|4_player)$/.test(Game.GetMapInfo().map_display_name)
}

function RoomChoiceSetBar(time, animate)
{
	var fill = $("#RoomChoiceTimerFill")
	if (!fill) { return }
	var full = Math.max(1, Number(room_choice_full_time) || 1)
	var percent = Math.max(0, Math.min(100, (Number(time) || 0) * 100 / full))
	fill.SetHasClass("animation", animate)
	fill.style.width = percent + "%"
}

function RoomChoiceOpen(data)
{
	if (!RoomChoiceIsArenaMap()) { return }
	if (!data || !data.rooms) { return }
	room_choice_rooms = []
	room_choice_votes = {}
	room_choice_fixed = data.fixed == 1
	room_choice_time = Number(data.time) || 0
	room_choice_full_time = Math.max(1, room_choice_time)
	var keys = Object.keys(data.rooms)
	keys.sort(function(a, b) { return Number(a) - Number(b) })
	for (var i = 0; i < keys.length; i++)
	{
		var room = data.rooms[keys[i]]
		if (room && room.id !== undefined)
		{
			room_choice_rooms.push({ id: Number(room.id), name: room.name, image: room.image, bonus: room.bonus, boss: room.boss })
		}
	}
	if (room_choice_rooms.length <= 0) { return }

	$("#RoomChoiceTitle").text = $.Localize(room_choice_fixed ? "#arena_room_choice_final" : "#arena_room_choice_title")
	$("#RoomChoiceStage").text = $.Localize("#arena_room_stage") + " " + (Number(data.stage) || 1) + " / " + (Number(data.stages) || 10)
	RoomChoiceSetBar(room_choice_time, false)
	$.Schedule(0.03, function()
	{
		if (room_choice_open) { RoomChoiceSetBar(room_choice_time - 1, true) }
	})

	var cards = $("#RoomChoiceCards")
	cards.RemoveAndDeleteChildren()
	for (var r = 0; r < room_choice_rooms.length; r++)
	{
		RoomChoiceCreateCard(cards, room_choice_rooms[r])
	}
	$("#RoomChoiceWindow").SetHasClass("Fixed", room_choice_fixed)
	$("#RoomChoiceWindow").SetHasClass("Wide", room_choice_rooms.length > 2)
	$("#RoomChoiceWindow").AddClass("Visible")
	room_choice_open = true
	Game.EmitSound("ui_topmenu_select")
}

function RoomChoiceCreateCard(parent, room)
{
	var card = $.CreatePanel("Panel", parent, "RoomCard_" + room.id)
	card.AddClass("RoomCard")
	if (!room_choice_fixed)
	{
		card.AddClass("Clickable")
		card.hittestchildren = false
		card.SetPanelEvent("onactivate", function()
		{
			RoomChoiceVote(room.id)
		})
	}

	var body = $.CreatePanel("Panel", card, "")
	body.AddClass("RoomCardBody")

	var image = $.CreatePanel("Panel", body, "")
	image.AddClass("RoomCardImage")
	image.style.backgroundImage = 'url("file://{images}/custom_game/arena_rooms/' + room.image + '.png")'
	image.style.backgroundSize = "100%"

	var name = $.CreatePanel("Label", body, "")
	name.AddClass("RoomCardName")
	name.text = $.Localize("#" + room.name)

	if (room.boss)
	{
		var boss = $.CreatePanel("Panel", body, "")
		boss.AddClass("RoomCardBoss")
		var boss_icon = $.CreatePanel("Panel", boss, "")
		boss_icon.AddClass("RoomCardBossIcon")
		boss_icon.style.backgroundImage = 'url("' + RoomChoiceGetBossIcon(room.boss) + '")'
		boss_icon.style.backgroundSize = "100%"
		var boss_name = $.CreatePanel("Label", boss, "")
		boss_name.AddClass("RoomCardBossName")
		boss_name.text = $.Localize("#" + room.boss)
	}

	var bonus = $.CreatePanel("Label", body, "")
	bonus.AddClass("RoomCardBonus")
	bonus.text = $.Localize("#" + room.bonus)

	var votes = $.CreatePanel("Panel", image, "RoomCardVotes_" + room.id)
	votes.AddClass("RoomCardVotes")

	if (!room_choice_fixed)
	{
		var button = $.CreatePanel("Panel", card, "")
		button.AddClass("RoomCardButton")
		var label = $.CreatePanel("Label", button, "")
		label.text = $.Localize("#arena_room_choice_go")
	}
}

function RoomChoiceGetBossIcon(unit_name)
{
	var get_icon = GameUI.CustomUIConfig().GetBossHealthBarIcon
	if (typeof get_icon == "function")
	{
		return get_icon(unit_name)
	}
	return "file://{images}/custom_game/talents/" + unit_name + ".png"
}

function RoomChoiceVote(room_id)
{
	if (!room_choice_open || room_choice_fixed) { return }
	Game.EmitSound("ui_topmenu_select")
	GameEvents.SendCustomGameEventToServer_custom("arena_room_vote", { room: room_id })
}

function RoomChoiceUpdateVotes(data)
{
	if (!room_choice_open) { return }
	room_choice_votes = (data && data.votes) ? data.votes : {}
	var local_id = Game.GetLocalPlayerID()
	for (var r = 0; r < room_choice_rooms.length; r++)
	{
		var room = room_choice_rooms[r]
		var card = $("#RoomCard_" + room.id)
		var votes = $("#RoomCardVotes_" + room.id)
		if (!card || !votes) { continue }
		votes.RemoveAndDeleteChildren()
		var selected = false
		for (var pid in room_choice_votes)
		{
			if (Number(room_choice_votes[pid]) != room.id) { continue }
			var player_id = Number(pid)
			if (player_id == local_id) { selected = true }
			var hero = $.CreatePanel("DOTAHeroImage", votes, "")
			hero.AddClass("RoomCardVoteHero")
			hero.heroimagestyle = "icon"
			var info = Game.GetPlayerInfo(player_id)
			if (info && info.player_selected_hero)
			{
				hero.heroname = info.player_selected_hero
			}
		}
		card.SetHasClass("Selected", selected)
	}
}

function RoomChoiceTime(data)
{
	if (!room_choice_open) { return }
	room_choice_time = Number(data.time) || 0
	RoomChoiceSetBar(room_choice_time - 1, true)
}

function RoomChoiceClose(data)
{
	room_choice_open = false
	room_choice_rooms = []
	room_choice_votes = {}
	$("#RoomChoiceWindow").RemoveClass("Visible")
}

function RoomEnterBanner(data)
{
	if (!RoomChoiceIsArenaMap()) { return }
	$("#RoomEnterStage").text = $.Localize("#arena_room_stage") + " " + (Number(data.stage) || 1) + " / " + (Number(data.stages) || 10)
	$("#RoomEnterName").text = $.Localize("#" + data.name)
	var banner = $("#RoomEnterBanner")
	banner.RemoveClass("Visible")
	$.Schedule(0.5, function()
	{
		Game.EmitSound("ui.badge_levelup")
		banner.AddClass("Visible")
	})
	$.Schedule(4.9, function()
	{
		banner.RemoveClass("Visible")
	})
}

function RoomChoiceRestore()
{
	if (!RoomChoiceIsArenaMap()) { return }
	var state = CustomNetTables.GetTableValue("map_info", "room_choice")
	RoomChoiceApplyState(state)
}

function RoomChoiceApplyState(state)
{
	if (!state) { return }
	if (state.open == 1 && state.rooms)
	{
		if (!room_choice_open)
		{
			RoomChoiceOpen(state)
		}
	}
	else if (state.open == 0 && room_choice_open)
	{
		RoomChoiceClose(state)
	}
}

function RoomChoiceOnNetTable(table_name, key, value)
{
	if (table_name != "map_info" || key != "room_choice") { return }
	if (!RoomChoiceIsArenaMap()) { return }
	RoomChoiceApplyState(value)
}

CustomNetTables.SubscribeNetTableListener("map_info", RoomChoiceOnNetTable)

GameEvents.Subscribe_custom("arena_room_choice_open", RoomChoiceOpen)
GameEvents.Subscribe_custom("arena_room_choice_votes", RoomChoiceUpdateVotes)
GameEvents.Subscribe_custom("arena_room_choice_time", RoomChoiceTime)
GameEvents.Subscribe_custom("arena_room_choice_close", RoomChoiceClose)
GameEvents.Subscribe_custom("arena_pve_room_enter", RoomEnterBanner)

$.Schedule(1, function()
{
	RoomChoiceRestore()
})