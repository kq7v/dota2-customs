--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var CHEAT_STATE = null
var CHEAT_MINIMIZED = false
var CHEAT_WAVE_INIT = false
var CHEAT_WAVE_MAX = 10
var CHEAT_ARENA_ROWS = [["relax", "1", "2"], ["3", "4", "5"], ["6", "duel", "finalduel"]]
var CHEAT_SPAWN_HERO = ""
var CHEAT_PICKER_MODE = "spawn"
var CHEAT_PICKER_BUILT = false
var CHEAT_TALENT_UNIT = -1
var CHEAT_TALENT_ROWS = []
var CHEAT_TALENT_HERO = ""
var CHEAT_TALENT_TAB = "str"
var CHEAT_ATTRIBUTES = ["str", "agi", "int"]

function CheatSend(action, extra)
{
    var data = { action: action }
    if (extra)
    {
        for (var key in extra)
        {
            if (Object.prototype.hasOwnProperty.call(extra, key))
            {
                data[key] = extra[key]
            }
        }
    }
    GameEvents.SendCustomGameEventToServer_custom("woda_cheat_action", data)
    Game.EmitSound("ui_generic_button_click")
}

function CheatLocalHero()
{
    return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
}

function CheatToggleMinimized()
{
    CHEAT_MINIMIZED = !CHEAT_MINIMIZED
    $("#CheatControlPanel").SetHasClass("Minimized", CHEAT_MINIMIZED)
    if (CHEAT_MINIMIZED)
    {
        CheatClosePicker()
        CheatCloseTalents()
    }
    Game.EmitSound(CHEAT_MINIMIZED ? "ui_settings_slide_in" : "ui_settings_slide_out")
}

function CheatBuildArenaRows()
{
    var container = $("#CheatArenaRows")
    container.RemoveAndDeleteChildren()
    for (var r = 0; r < CHEAT_ARENA_ROWS.length; r++)
    {
        var row = $.CreatePanel("Panel", container, "")
        row.AddClass("Row")
        for (var i = 0; i < CHEAT_ARENA_ROWS[r].length; i++)
        {
            CheatCreateArenaButton(row, CHEAT_ARENA_ROWS[r][i], i < CHEAT_ARENA_ROWS[r].length - 1)
        }
    }
}

function CheatCreateArenaButton(row, key, has_margin)
{
    var button = $.CreatePanel("Button", row, "CheatArena_" + key)
    button.AddClass("DemoButton")
    button.AddClass("ArenaButton")
    if (has_margin) { button.AddClass("LeftButton") }
    var label = $.CreatePanel("Label", button, "")
    var text = key
    if (key == "relax") { text = $.Localize("#cheat_arena_relax") }
    else if (key == "duel") { text = $.Localize("#cheat_arena_duel") }
    else if (key == "finalduel") { text = $.Localize("#cheat_arena_final") }
    label.text = text
    button.SetPanelEvent("onactivate", function()
    {
        CheatSend("arena_select", { value: key })
    })
}

var CHEAT_ROOM_COUNT = 38
var CHEAT_ROOMS_PER_ROW = 6

function CheatBuildRoomRows()
{
    var container = $("#CheatRoomRows")
    container.RemoveAndDeleteChildren()
    var row = null
    for (var id = 0; id < CHEAT_ROOM_COUNT; id++)
    {
        if (id % CHEAT_ROOMS_PER_ROW == 0)
        {
            row = $.CreatePanel("Panel", container, "")
            row.AddClass("Row")
        }
        CheatCreateRoomButton(row, id, id % CHEAT_ROOMS_PER_ROW < CHEAT_ROOMS_PER_ROW - 1)
    }
}

function CheatCreateRoomButton(row, id, has_margin)
{
    var button = $.CreatePanel("Button", row, "CheatRoom_" + id)
    button.AddClass("DemoButton")
    button.AddClass("ArenaButton")
    if (has_margin) { button.AddClass("LeftButton") }
    var label = $.CreatePanel("Label", button, "")
    label.text = String(id)
    button.SetPanelEvent("onactivate", function()
    {
        CheatSend("room_select", { value: id })
    })
    button.SetPanelEvent("onmouseover", function()
    {
        $.DispatchEvent("DOTAShowTextTooltip", button, $.Localize("#arena_room_" + id))
    })
    button.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("DOTAHideTextTooltip", button)
    })
}

function CheatSetSelectedInGroup(container, class_name, prefix, selected_id)
{
    var buttons = container.FindChildrenWithClassTraverse(class_name)
    for (var i = 0; i < buttons.length; i++)
    {
        buttons[i].SetHasClass("Selected", buttons[i].id == prefix + selected_id)
    }
}

function CheatWaveGet()
{
    var value = parseInt($("#CheatWaveEntry").text)
    if (isNaN(value))
    {
        value = (CHEAT_STATE && Number(CHEAT_STATE.stage_wave)) || 1
    }
    if (value < 1) { value = 1 }
    if (value > CHEAT_WAVE_MAX) { value = CHEAT_WAVE_MAX }
    return value
}

function CheatWaveAdjust(delta)
{
    var value = CheatWaveGet() + delta
    if (value < 1) { value = 1 }
    if (value > CHEAT_WAVE_MAX) { value = CHEAT_WAVE_MAX }
    $("#CheatWaveEntry").text = String(value)
}

function CheatWaveApply()
{
    var value = CheatWaveGet()
    $("#CheatWaveEntry").text = String(value)
    CheatSend("wave_set", { value: value })
}

function CheatUnitSpawn()
{
    if (!CHEAT_SPAWN_HERO) { return }
    if (CHEAT_STATE && Number(CHEAT_STATE.bot_pending) == 1) { return }
    CheatSend("unit_spawn", { value: CHEAT_SPAWN_HERO })
}

function CheatGetTargetUnit()
{
    var selection = CheatGetSelectedTalentUnit()
    return selection.ent
}

function CheatGetSelectedAnyUnit()
{
    var entities = Players.GetSelectedEntities(Players.GetLocalPlayer())
    for (var i = 0; i < entities.length; i++)
    {
        if (entities[i] != -1) { return entities[i] }
    }
    return -1
}

function CheatHeroAction(action)
{
    var ent = CheatGetTargetUnit()
    if (ent == -1) { return }
    CheatSend(action, { ent: ent })
}

function CheatUnitAction(action)
{
    var ent = CheatGetSelectedAnyUnit()
    if (ent == -1) { return }
    CheatSend(action, { ent: ent })
}

function CheatInvulnToggle()
{
    CheatHeroAction("hero_invuln")
    $.Schedule(0.2, CheatUpdateInvuln)
}

function CheatUpdateInvuln()
{
    var target = CheatGetTargetUnit()
    var on = target != -1 && HasModifier(target, "modifier_woda_cheat_invulnerable")
    $("#CheatInvuln").SetSelected(on)
}

function CheatUpdateTarget()
{
    var target = CheatGetTargetUnit()
    var label = $("#CheatHeroTarget")
    if (target == -1)
    {
        label.text = ""
    }
    else
    {
        label.text = $.Localize("#" + Entities.GetUnitName(target))
    }
    label.SetHasClass("Running", target != -1 && target != CheatLocalHero())
    CheatUpdateInvuln()
}

function CheatTargetThink()
{
    if (CHEAT_STATE && $("#CheatControlPanel").BHasClass("Enabled"))
    {
        CheatUpdateTarget()
        CheatSyncTalentsWithSelection()
    }
    $.Schedule(0.5, CheatTargetThink)
}

function CheatSyncTalentsWithSelection()
{
    if (!$("#CheatTalentPopup").BHasClass("Visible")) { return }
    var target = CheatGetTargetUnit()
    if (target == -1 || target == CHEAT_TALENT_UNIT) { return }
    CheatOpenTalents()
}

function CheatOnSelectionChanged(data)
{
    CheatSyncTalentsWithSelection()
}

function CheatGetHeroList()
{
    var table = Game.GetCustomTable("cheat_panel", "heroes")
    var list = []
    if (!table) { return list }
    for (var key in table)
    {
        if (Object.prototype.hasOwnProperty.call(table, key))
        {
            list.push(String(table[key]))
        }
    }
    list.sort(function(a, b)
    {
        var la = $.Localize("#" + a)
        var lb = $.Localize("#" + b)
        return la < lb ? -1 : (la > lb ? 1 : 0)
    })
    return list
}

function CheatBuildPicker()
{
    var list = CheatGetHeroList()
    if (list.length == 0) { return }
    var grid = $("#CheatPickerGrid")
    grid.RemoveAndDeleteChildren()
    for (var i = 0; i < list.length; i++)
    {
        CheatCreatePickerItem(grid, list[i])
    }
    CHEAT_PICKER_BUILT = true
    if (!CHEAT_SPAWN_HERO)
    {
        CheatSetSpawnHero(list[0])
    }
}

function CheatCreatePickerItem(grid, hero_name)
{
    var item = $.CreatePanel("DOTAHeroImage", grid, "CheatPick_" + hero_name)
    item.AddClass("PickerItem")
    item.heroimagestyle = "landscape"
    item.heroname = hero_name
    item.SetPanelEvent("onactivate", function()
    {
        CheatPickerSelect(hero_name)
    })
    item.SetPanelEvent("onmouseover", function()
    {
        $.DispatchEvent("DOTAShowTextTooltip", item, $.Localize("#" + hero_name))
    })
    item.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("DOTAHideTextTooltip", item)
    })
}

function CheatPickerFilter()
{
    var query = ($("#CheatPickerSearch").text || "").toLowerCase().replace(/^\s+|\s+$/g, "")
    var items = $("#CheatPickerGrid").FindChildrenWithClassTraverse("PickerItem")
    for (var i = 0; i < items.length; i++)
    {
        var name = String(items[i].heroname || "")
        var localized = $.Localize("#" + name).toLowerCase()
        var short_name = name.replace("npc_dota_hero_", "")
        var match = query == "" || localized.indexOf(query) != -1 || short_name.indexOf(query) != -1
        items[i].SetHasClass("Hidden", !match)
    }
}

function CheatOpenPicker(mode)
{
    if (!CHEAT_PICKER_BUILT)
    {
        CheatBuildPicker()
    }
    CHEAT_PICKER_MODE = mode
    CheatCloseTalents()
    $("#CheatPickerTitle").text = $.Localize(mode == "main" ? "#cheat_picker_title_main" : "#cheat_picker_title_spawn")
    $("#CheatPickerSearch").text = ""
    CheatPickerFilter()
    var items = $("#CheatPickerGrid").FindChildrenWithClassTraverse("PickerItem")
    var current = mode == "main" ? CheatLocalHeroName() : CHEAT_SPAWN_HERO
    for (var i = 0; i < items.length; i++)
    {
        items[i].SetHasClass("Selected", String(items[i].heroname) == current)
    }
    $("#CheatHeroPicker").AddClass("Visible")
    $("#CheatPickerSearch").SetFocus()
    Game.EmitSound("ui_generic_button_click")
}

function CheatClosePicker()
{
    $("#CheatHeroPicker").RemoveClass("Visible")
}

function CheatPickerSelect(hero_name)
{
    if (CHEAT_PICKER_MODE == "main")
    {
        CheatSend("hero_change", { value: hero_name })
    }
    else
    {
        CheatSetSpawnHero(hero_name)
    }
    CheatClosePicker()
}

function CheatSetSpawnHero(hero_name)
{
    CHEAT_SPAWN_HERO = hero_name
    $("#CheatSpawnHeroImage").heroname = hero_name
    $("#CheatSpawnHeroName").text = $.Localize("#" + hero_name)
}

function CheatLocalHeroName()
{
    var hero = CheatLocalHero()
    if (hero == -1) { return "" }
    return Entities.GetUnitName(hero)
}

function CheatUpdateHeader()
{
    var hero_name = CheatLocalHeroName()
    if (hero_name == "") { return }
    $("#CheatPlayerHeroImage").heroname = hero_name
    $("#CheatHeroName").text = $.Localize("#" + hero_name)
}

function CheatGetSelectedTalentUnit()
{
    var local_hero = CheatLocalHero()
    var entities = Players.GetSelectedEntities(Players.GetLocalPlayer())
    for (var i = 0; i < entities.length; i++)
    {
        var ent = entities[i]
        if (ent != -1 && ent != local_hero && Entities.IsHero(ent) && !Entities.IsIllusion(ent))
        {
            return { ent: ent, own: false }
        }
    }
    return { ent: local_hero, own: true }
}

function CheatGetUnitTalentLevel(ent, talent_name)
{
    if (ent == -1) { return 0 }
    var count = Entities.GetNumBuffs(ent)
    for (var i = 0; i < count; i++)
    {
        var buff = Entities.GetBuff(ent, i)
        if (Buffs.GetName(ent, buff) == talent_name)
        {
            return Buffs.GetStackCount(ent, buff)
        }
    }
    return 0
}

function CheatToggleTalents()
{
    if ($("#CheatTalentPopup").BHasClass("Visible"))
    {
        CheatCloseTalents()
        Game.EmitSound("ui_generic_button_click")
        return
    }
    CheatOpenTalents()
}

function CheatOpenTalents()
{
    var selection = CheatGetSelectedTalentUnit()
    if (selection.ent == -1) { return }
    CheatClosePicker()
    CHEAT_TALENT_UNIT = selection.ent
    var hero_name = Entities.GetUnitName(selection.ent)
    $("#CheatTalentUnitImage").heroname = hero_name
    $("#CheatTalentUnitName").text = $.Localize("#" + hero_name)
    CheatBuildTalentGrids(selection.ent, hero_name)
    CheatTalentTab(CHEAT_TALENT_TAB)
    if (!$("#CheatTalentPopup").BHasClass("Visible"))
    {
        $("#CheatTalentPopup").AddClass("Visible")
        Game.EmitSound("ui_generic_button_click")
    }
}

function CheatCloseTalents()
{
    $("#CheatTalentPopup").RemoveClass("Visible")
    CHEAT_TALENT_UNIT = -1
}

function CheatTalentTab(attribute)
{
    CHEAT_TALENT_TAB = attribute
    for (var i = 0; i < CHEAT_ATTRIBUTES.length; i++)
    {
        var name = CHEAT_ATTRIBUTES[i]
        $("#CheatTab_" + name).SetHasClass("Selected", name == attribute)
        var grid = $("#CheatTalentGrids").FindChild("CheatGrid_" + name)
        if (grid) { grid.SetHasClass("Active", name == attribute) }
    }
}

function CheatBuildTalentGrids(ent, hero_name)
{
    var grids = $("#CheatTalentGrids")
    grids.RemoveAndDeleteChildren()
    CHEAT_TALENT_ROWS = []
    CHEAT_TALENT_HERO = hero_name
    var tree = Game.GetCustomTable("herotalents", hero_name)
    if (!tree) { return }
    for (var attribute = 1; attribute <= 3; attribute++)
    {
        var attribute_name = CHEAT_ATTRIBUTES[attribute - 1]
        var grid = $.CreatePanel("Panel", grids, "CheatGrid_" + attribute_name)
        grid.AddClass("CheatTalentGrid")
        grid.AddClass("talent_choose_" + attribute_name)
        grid.AddClass(hero_name + "_" + attribute_name)
        var attribute_table = tree[attribute]
        if (!attribute_table) { continue }
        for (var line = 1; line <= 7; line++)
        {
            var line_table = attribute_table[line]
            if (!line_table) { continue }
            var line_panel = $.CreatePanel("Panel", grid, "")
            line_panel.AddClass("talent_line")
            for (var block = 1; block <= 5; block++)
            {
                CheatCreateTalentBlock(line_panel, ent, line_table[block])
            }
        }
    }
}

function CheatCreateTalentBlock(line_panel, ent, info)
{
    var block = $.CreatePanel("Panel", line_panel, "")
    block.AddClass("talent_block")
    var image = $.CreatePanel("Panel", block, "")
    image.AddClass("talent_block_image")
    var level_bar = $.CreatePanel("Panel", block, "")
    level_bar.AddClass("talent_level_image")
    level_bar.style.width = "0%"
    var talent_name = info && info[1] ? String(info[1]) : ""
    if (talent_name == "" || talent_name.indexOf("empty") != -1)
    {
        block.AddClass("EmptyTalent")
        return
    }
    var description = String(info[2] || "")
    var max_level = Number(info[3]) || 1
    var icon = String(info[4] || "")
    if (icon != "")
    {
        image.style.backgroundImage = 'url("file://{images}/custom_game/talents/' + icon + '.png")'
        image.style.backgroundSize = "100%"
    }
    var controls = $.CreatePanel("Panel", image, "")
    controls.AddClass("CheatTalentControls")
    var minus = $.CreatePanel("Button", controls, "")
    minus.AddClass("CheatTalentBtn")
    $.CreatePanel("Label", minus, "").text = "-"
    var level_label = $.CreatePanel("Label", controls, "")
    level_label.AddClass("CheatTalentLevel")
    var plus = $.CreatePanel("Button", controls, "")
    plus.AddClass("CheatTalentBtn")
    $.CreatePanel("Label", plus, "").text = "+"
    var entry = { ent: ent, name: talent_name, max_level: max_level, description: description, image: image, level_bar: level_bar, level_label: level_label, current: 0 }
    CHEAT_TALENT_ROWS.push(entry)
    minus.SetPanelEvent("onactivate", function() { CheatTalentAdjust(entry, -1) })
    plus.SetPanelEvent("onactivate", function() { CheatTalentAdjust(entry, 1) })
    image.SetPanelEvent("onmouseover", function()
    {
        if (entry.description != "")
        {
            $.DispatchEvent("DOTAShowTextTooltip", image, $.Localize(entry.description + "_" + entry.current))
        }
    })
    image.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("DOTAHideTextTooltip", image)
    })
    CheatRefreshTalentRow(entry)
}

function CheatRefreshTalentRow(entry)
{
    entry.current = CheatGetUnitTalentLevel(entry.ent, entry.name)
    entry.level_label.text = entry.current + "/" + entry.max_level
    entry.level_label.SetHasClass("Maxed", entry.current >= entry.max_level)
    entry.level_bar.style.width = Math.round(entry.current / entry.max_level * 100) + "%"
    entry.image.SetHasClass("talent_nolvl", entry.current <= 0)
}

function CheatRefreshTalentRows()
{
    for (var i = 0; i < CHEAT_TALENT_ROWS.length; i++)
    {
        CheatRefreshTalentRow(CHEAT_TALENT_ROWS[i])
    }
}

function CheatTalentAdjust(entry, delta)
{
    CheatTalentSetLevel(entry, entry.current + delta)
}

function CheatTalentSetLevel(entry, level)
{
    if (level < 0) { level = 0 }
    if (level > entry.max_level) { level = entry.max_level }
    if (level == entry.current) { return }
    CheatSend("talents_set", { ent: entry.ent, value: entry.name, level: level })
    $.Schedule(0.3, CheatRefreshTalentRows)
}

function CheatTalentsResetUnit()
{
    if (CHEAT_TALENT_UNIT == -1) { return }
    CheatSend("talents_reset", { ent: CHEAT_TALENT_UNIT })
    $.Schedule(0.3, CheatRefreshTalentRows)
}

function CheatTalentsResetTarget()
{
    var ent = CheatGetTargetUnit()
    if (ent == -1) { return }
    CheatSend("talents_reset", { ent: ent })
    $.Schedule(0.3, CheatRefreshTalentRows)
}

function CheatOnTalentsReinit(data)
{
    CheatUpdateHeader()
    if ($("#CheatTalentPopup").BHasClass("Visible"))
    {
        CheatCloseTalents()
    }
}

function CheatApplyState(state)
{
    CHEAT_STATE = state
    var root = $("#CheatControlPanel")
    var visible = !!(state && Number(state.enabled) == 1 && Number(state.game_started) == 1 && !IsSpectator())
    root.SetHasClass("Enabled", visible)
    if (!visible) { return }

    CheatUpdateHeader()
    if (!CHEAT_PICKER_BUILT)
    {
        CheatBuildPicker()
    }

    var mode = String(state.mode)
    var mode_key = "#cheat_mode_" + mode
    if (mode == "rating" && Number(state.duo) == 1)
    {
        mode_key = "#cheat_mode_rating_duo"
    }
    $("#CheatModeLabel").text = $.Localize(mode_key)
    $("#CatRating").SetHasClass("Hidden", mode != "rating")
    $("#CatRatingRule").SetHasClass("Hidden", mode != "rating")
    $("#CatArena").SetHasClass("Hidden", mode != "arena")
    $("#CheatEndVictory").SetHasClass("Hidden", mode != "arena")
    $("#CatArenaRule").SetHasClass("Hidden", mode != "arena")
    $("#CheatAegisRow").SetHasClass("Hidden", mode != "arena")

    var flow_stopped = Number(state.flow_stopped) == 1
    var flow_status = $("#CheatFlowStatus")
    flow_status.text = $.Localize(flow_stopped ? "#cheat_flow_status_stopped" : "#cheat_flow_status_running")
    flow_status.SetHasClass("Running", !flow_stopped)
    $("#CheatFlowButtonLabel").text = $.Localize(flow_stopped ? "#cheat_flow_start" : "#cheat_flow_stop")
    $("#CheatFlowButton").SetHasClass("Selected", !flow_stopped)
    var position = null
    if (state.positions)
    {
        position = state.positions[String(Players.GetLocalPlayer())]
    }
    if (!position) { position = String(state.arena) }
    CheatSetSelectedInGroup($("#CheatArenaRows"), "ArenaButton", "CheatArena_", String(position))

    var wave = Number(state.stage_wave) || 1
    $("#CheatWaveLabel").SetDialogVariableInt("wave", wave)
    var room = Number(state.room)
    var room_name = (room >= 0) ? $.Localize("#arena_room_" + room) : $.Localize("#name_relax")
    $("#CheatRoomLabel").text = room_name + "  |  " + $.Localize("#arena_room_stage") + " " + (Number(state.stage) || 0) + " / " + (Number(state.stages) || 10)
    CheatSetSelectedInGroup($("#CheatRoomRows"), "ArenaButton", "CheatRoom_", String(room))
    var wave_stopped = Number(state.wave_stopped) == 1
    var wave_status = $("#CheatWaveStatus")
    wave_status.text = $.Localize(wave_stopped ? "#cheat_wave_timer_stopped" : "#cheat_wave_timer_running")
    wave_status.SetHasClass("Running", !wave_stopped)
    $("#CheatWaveButtonLabel").text = $.Localize(wave_stopped ? "#cheat_wave_resume" : "#cheat_wave_stop")
    $("#CheatWaveButton").SetHasClass("Selected", wave_stopped)
    if (!CHEAT_WAVE_INIT)
    {
        CHEAT_WAVE_INIT = true
        $("#CheatWaveEntry").text = String(wave)
    }

    $("#CheatFreeSpells").SetSelected(Number(state.free_spells) == 1)
    $("#CheatNight").SetSelected(Number(state.night) == 1)
    $("#CheatDummiesLabel").SetDialogVariableInt("count", Number(state.dummies) || 0)
    $("#CheatEndRow").SetHasClass("Hidden", Number(state.game_end) == 1)
    CheatUpdateInvuln()
}

function CheatInit()
{
    if (typeof Game.SubscribeCustomTableListener !== "function")
    {
        $.Schedule(0.5, CheatInit)
        return
    }
    CheatBuildArenaRows()
    CheatBuildRoomRows()
    CheatTargetThink()
    GameEvents.Subscribe("dota_player_update_selected_unit", CheatOnSelectionChanged)
    GameEvents.Subscribe("dota_player_update_query_unit", CheatOnSelectionChanged)
    GameEvents.Subscribe_custom("woda_cheat_talents_reinit", CheatOnTalentsReinit)
    Game.SubscribeCustomTableListener("cheat_panel", "heroes", function(table_name, key, value)
    {
        CHEAT_PICKER_BUILT = false
        if (CHEAT_STATE)
        {
            CheatBuildPicker()
        }
    })
    Game.SubscribeCustomTableListener("cheat_panel", "state", function(table_name, key, value)
    {
        CheatApplyState(value)
    })
}

CheatInit()
WodaTrackTextEntry($("#CheatWaveEntry"))
WodaTrackTextEntry($("#CheatPickerSearch"))