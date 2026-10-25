--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var PROFILE_MODES = ["arena", "rating", "rating_duo"]
var PROFILE_ARENA_DIFFICULTIES = 10
var PROFILE_ARENA_STAGES = 10
var PROFILE_ARENA_FINAL_WAVE = 100
var PROFILE_STATS = null
var PROFILE_STATS_STATE = "idle"
var PROFILE_STATS_TIME = 0
var PROFILE_STATS_REFRESH_MS = 90000
var PROFILE_STATS_TIMEOUT = 8
var PROFILE_PARTY_MAX = 4
var PROFILE_COLLECTION_TOOLTIP_ID = "woda_collection_tooltip"
var PROFILE_COLLECTION_TOOLTIP_LAYOUT = "file://{resources}/layout/custom_game/tooltips/collection_tooltip/collection_tooltip.xml"
var PROFILE_RATING_MODES =
{
    rating: {places: 7, top: 4, legacy_key: "solo", player_key: "place", colors: [1, 2, 3, 4, 5, 6, 7], chart_title: "#profile_places_title"},
    rating_duo: {places: 4, top: 2, legacy_key: "duo", player_key: "place_duo", colors: [1, 3, 5, 7], chart_title: "#profile_places_title", teammates: true},
}
var profile_stats_request_token = 0
var profile_stats_parts = null
var profile_mode_selected = null
var profile_pages_built = {}
var profile_signatures = {}

GameEvents.Subscribe_custom("woda_profile_stats", Profile_OnStats)

function Profile_Refresh(player_data)
{
    if (!player_data) { return }
    ProfileUpdateSide(player_data)
    if (!profile_mode_selected)
    {
        ProfileSelectMode(ProfileDefaultMode(), true)
    }
    else
    {
        ProfileRenderMode(profile_mode_selected)
    }
    if (current_tab == "ProfileWindow")
    {
        ProfileRequestStats(false)
    } 
}

function Profile_OnStats(data)
{
    if (!data) { return }
    if (data.part && data.part != "done")
    {
        if (ProfileNum(data.ok) != 1) { return }
        if (!profile_stats_parts)
        {
            profile_stats_parts = {ok: 1}
        }
        profile_stats_parts[data.part] = data.value || {}
        return
    }
    profile_stats_request_token++
    if (ProfileNum(data.ok) == 1 && profile_stats_parts)
    {
        PROFILE_STATS = profile_stats_parts
        PROFILE_STATS_STATE = "ready"
    }
    else
    {
        PROFILE_STATS_STATE = PROFILE_STATS ? "ready" : "failed"
    }
    profile_stats_parts = null
    PROFILE_STATS_TIME = Date.now()
    ProfileUpdateStatus()
    if (PLAYER_DATA)
    {
        ProfileUpdateSide(PLAYER_DATA)
    }
    if (profile_mode_selected)
    {
        ProfileRenderMode(profile_mode_selected)
    }
}

function ProfileRequestStats(force)
{
    if (PROFILE_STATS_STATE == "loading") { return }
    if (!force && PROFILE_STATS_STATE != "idle" && Date.now() - PROFILE_STATS_TIME < PROFILE_STATS_REFRESH_MS) { return }
    PROFILE_STATS_STATE = "loading"
    PROFILE_STATS_TIME = Date.now()
    profile_stats_parts = null
    ProfileUpdateStatus()
    GameEvents.SendCustomGameEventToServer_custom("woda_profile_stats_request", {})
    profile_stats_request_token++
    var token = profile_stats_request_token
    $.Schedule(PROFILE_STATS_TIMEOUT, function()
    {
        if (token != profile_stats_request_token || PROFILE_STATS_STATE != "loading") { return }
        PROFILE_STATS_STATE = PROFILE_STATS ? "ready" : "failed"
        PROFILE_STATS_TIME = Date.now()
        ProfileUpdateStatus()
        if (profile_mode_selected)
        {
            ProfileRenderMode(profile_mode_selected)
        }
    })
}

function ProfileUpdateStatus()
{
    var label = $("#ProfileStatus")
    if (!label) { return }
    if (PROFILE_STATS_STATE == "loading")
    {
        label.text = $.Localize("#profile_loading")
    }
    else if (PROFILE_STATS_STATE == "failed")
    {
        label.text = $.Localize("#profile_unavailable")
    }
    else
    {
        label.text = ""
    }
}

function ProfileDefaultMode()
{
    var map = String(Game.GetMapInfo().map_display_name || "")
    if (/^(arena|1_player|4_player)$/.test(map)) { return "arena" }
    if (map.indexOf("rating_duo") == 0) { return "rating_duo" }
    if (map.indexOf("rating") == 0) { return "rating" }
    return "arena"
}

function ProfileSelectMode(mode, silent)
{
    if (PROFILE_MODES.indexOf(mode) < 0) { mode = "arena" }
    if (!silent && profile_mode_selected != mode)
    {
        Game.EmitSound("ui_topmenu_select")
    }
    profile_mode_selected = mode
    for (var i = 0; i < PROFILE_MODES.length; i++)
    {
        var tab = $("#ProfileModeTab_" + PROFILE_MODES[i])
        var page = $("#ProfilePage_" + PROFILE_MODES[i])
        if (tab) { tab.SetHasClass("Active", PROFILE_MODES[i] == mode) }
        if (page) { page.SetHasClass("Visible", PROFILE_MODES[i] == mode) }
    }
    ProfileRenderMode(mode)
}

function ProfileRenderMode(mode)
{
    var page = $("#ProfilePage_" + mode)
    if (!page) { return }
    if (!profile_pages_built[mode])
    {
        page.RemoveAndDeleteChildren()
        if (mode == "arena")
        {
            ProfileBuildArenaPage(page)
        }
        else
        {
            ProfileBuildRatingPage(page, mode)
        }
        profile_pages_built[mode] = true
    }
    if (mode == "arena")
    {
        ProfileRenderArena()
    }
    else
    {
        ProfileRenderRating(mode)
    }
}

function ProfileNum(value)
{
    return Number(value) || 0
}

function ProfileList(value)
{
    if (!value) { return [] }
    if (Array.isArray(value)) { return value }
    var keys = Object.keys(value).sort(function(a, b) { return Number(a) - Number(b) })
    var result = []
    for (var i = 0; i < keys.length; i++)
    {
        result.push(value[keys[i]])
    }
    return result
}

function ProfileLoc(key, values)
{
    var text = $.Localize(key)
    for (var name in values)
    {
        text = text.split("{" + name + "}").join(String(values[name]))
    }
    return text
}

function ProfileLocGold(key, values)
{
    var gold = {}
    for (var name in values)
    {
        gold[name] = WodaGold(String(values[name]))
    }
    return ProfileLoc(key, gold)
}

function ProfileFormatNumber(value)
{
    var number = Math.floor(ProfileNum(value))
    var sign = number < 0 ? "-" : ""
    var text = String(Math.abs(number))
    return sign + text.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

function ProfilePercent(part, total)
{
    total = ProfileNum(total)
    if (total <= 0) { return 0 }
    return Math.round(ProfileNum(part) / total * 100)
}

function ProfileFormatDuration(seconds)
{
    seconds = Math.max(0, Math.floor(ProfileNum(seconds)))
    var hours = Math.floor(seconds / 3600)
    var minutes = Math.floor((seconds % 3600) / 60)
    var rest = seconds % 60
    var minutes_text = (hours > 0 && minutes < 10 ? "0" : "") + minutes
    var seconds_text = (rest < 10 ? "0" : "") + rest
    if (hours > 0)
    {
        return hours + ":" + minutes_text + ":" + seconds_text
    }
    return minutes_text + ":" + seconds_text
}

function ProfileFormatPlaytime(seconds)
{
    seconds = Math.max(0, ProfileNum(seconds))
    if (seconds < 3600)
    {
        return ProfileLoc("#profile_minutes_value", {n: Math.floor(seconds / 60)})
    }
    var hours = seconds / 3600
    return ProfileLoc("#profile_hours_value", {n: hours < 10 ? hours.toFixed(1) : Math.floor(hours)})
}

function ProfileFormatAgo(seconds)
{
    seconds = Math.max(0, ProfileNum(seconds))
    if (seconds < 60) { return $.Localize("#profile_ago_now") }
    if (seconds < 3600) { return ProfileLoc("#profile_ago_min", {n: Math.floor(seconds / 60)}) }
    if (seconds < 86400) { return ProfileLoc("#profile_ago_hour", {n: Math.floor(seconds / 3600)}) }
    return ProfileLoc("#profile_ago_day", {n: Math.floor(seconds / 86400)})
}

function ProfilePanel(type, parent, classes, id, properties)
{
    var panel = properties ? $.CreatePanel(type, parent, id || "", properties) : $.CreatePanel(type, parent, id || "")
    if (classes)
    {
        var list = classes.split(" ")
        for (var i = 0; i < list.length; i++)
        {
            if (list[i] != "") { panel.AddClass(list[i]) }
        }
    }
    return panel
}

function ProfileLabel(parent, classes, text, id)
{
    var label = ProfilePanel("Label", parent, classes, id)
    label.text = text || ""
    return label
}

function ProfileHeroImage(parent, classes, hero)
{
    return ProfilePanel("DOTAHeroImage", parent, classes, "", {heroname: String(hero), heroimagestyle: "landscape", scaling: "stretch-to-cover-preserve-aspect", hittest: "false"})
}

function ProfileRoomImage(panel, room)
{
    panel.style.backgroundImage = 'url("file://{images}/custom_game/arena_rooms/arena_a_0_' + room + '.png")'
    panel.style.backgroundSize = "100%"
}

function ProfileTooltip(panel, title, lines)
{
    if (!panel) { return }
    var text = Array.isArray(lines) ? lines.join("<br>") : (lines || "")
    if (!title && !text)
    {
        panel.ClearPanelEvent("onmouseover")
        panel.ClearPanelEvent("onmouseout")
        return
    }
    WodaSetTitleTooltip(panel, title || "", text)
}

function ProfileTableCell(row, classes)
{
    return ProfilePanel("Panel", row, "ProfileTableCell " + classes)
}

function ProfileHeadCell(head, classes, text)
{
    var cell = ProfileTableCell(head, classes)
    ProfileLabel(cell, "ProfileTableHeadCell", text)
    return cell
}

function ProfileHeroCell(row, hero)
{
    var cell = ProfileTableCell(row, "ProfileTableCellHero")
    ProfileHeroImage(cell, "ProfileRowHeroImage", hero)
    ProfileLabel(cell, "ProfileRowHeroName", $.Localize("#" + hero))
    return cell
}

function ProfileNumCell(row, text, classes)
{
    var cell = ProfileTableCell(row, "ProfileTableCellNum")
    ProfileLabel(cell, "ProfileRowNum " + (classes || ""), text)
    return cell
}

function ProfileSection(parent, classes, title_key, id)
{
    var section = ProfilePanel("Panel", parent, "ProfileSection " + (classes || ""), id)
    var header = ProfilePanel("Panel", section, "ProfileSectionHeader")
    ProfileLabel(header, "ProfileSectionTitle", $.Localize(title_key))
    var body = ProfilePanel("Panel", section, "ProfileSectionBody")
    return {section: section, header: header, body: body}
}

function ProfileFillList(list, key, items, builder, empty_text)
{
    if (!list) { return }
    var signature = JSON.stringify(items) + "|" + empty_text
    if (profile_signatures[key] === signature && list.GetChildCount() > 0) { return }
    profile_signatures[key] = signature
    list.RemoveAndDeleteChildren()
    if (items.length == 0)
    {
        ProfileLabel(list, "ProfileEmpty", empty_text)
        return
    }
    for (var i = 0; i < items.length; i++)
    {
        builder(list, items[i], i)
    }
}

function ProfileEmptyText()
{
    if (PROFILE_STATS_STATE == "loading" || PROFILE_STATS_STATE == "idle") { return $.Localize("#profile_loading") }
    if (!PROFILE_STATS) { return $.Localize("#profile_unavailable") }
    return $.Localize("#profile_empty_mode")
}

function ProfileCreateTiles(parent, mode, tiles)
{
    var row = ProfilePanel("Panel", parent, "ProfileTiles")
    for (var i = 0; i < tiles.length; i++)
    {
        var tile = ProfilePanel("Panel", row, "ProfileTile ProfileTile_" + tiles[i][0] + (i == 0 ? " First" : ""), "ProfileTile_" + mode + "_" + tiles[i][0])
        ProfileLabel(tile, "ProfileTileTitle", ProfileLoc(tiles[i][1], tiles[i][2] || {}), "ProfileTileTitle_" + mode + "_" + tiles[i][0])
        ProfileLabel(tile, "ProfileTileValue", "-", "ProfileTileValue_" + mode + "_" + tiles[i][0])
    }
    return row
}

function ProfileSetTile(mode, id, value)
{
    var value_label = $("#ProfileTileValue_" + mode + "_" + id)
    if (!value_label) { return }
    value_label.text = value
}

function ProfileDifficultyBadge(parent, classes, difficulty)
{
    var badge = ProfilePanel("Panel", parent, "ProfileBadge " + (classes || ""))
    ProfileLabel(badge, "ProfileBadgeLabel", difficulty > 0 ? String(difficulty) : "-")
    return badge
}

function ProfileMakeResult(difficulty, waves)
{
    difficulty = ProfileNum(difficulty)
    waves = ProfileNum(waves)
    if (difficulty <= 0 && waves <= 0) { return null }
    var victory = waves >= PROFILE_ARENA_FINAL_WAVE
    return {
        difficulty: Math.max(difficulty, 1),
        waves: waves,
        victory: victory,
        stage: victory ? PROFILE_ARENA_STAGES : Math.min(Math.floor(waves / 10) + 1, PROFILE_ARENA_STAGES),
    }
}

function ProfileResultFromScore(score)
{
    score = ProfileNum(score)
    if (score <= 0) { return null }
    return ProfileMakeResult(Math.floor(score / 1000), score % 1000)
}

function ProfileBetterResult(a, b)
{
    if (!a) { return b }
    if (!b) { return a }
    if (a.difficulty != b.difficulty) { return a.difficulty > b.difficulty ? a : b }
    return a.waves >= b.waves ? a : b
}

function ProfileResultScore(result)
{
    return result ? result.difficulty * 1000 + Math.min(result.waves, 999) : 0
}

function ProfileReachedWave(result)
{
    if (!result) { return null }
    var reached = result.victory ? PROFILE_ARENA_FINAL_WAVE : Math.min(result.waves + 1, PROFILE_ARENA_FINAL_WAVE)
    return {stage: Math.floor((reached - 1) / 10) + 1, wave: (reached - 1) % 10 + 1}
}

function ProfileWaveCode(result)
{
    return result ? String(result.waves) : "-"
}

function Profile_UpdateAccount(pd)
{
    if (!pd) { return }
    var coins = $("#CoinsBuyCount")
    if (!coins) { return }
    coins.text = ProfileFormatNumber(pd.coins)
    $("#CrystalsBuyCount").text = ProfileFormatNumber(pd.crystals)
    var can_buy = ProfileNum(pd.games) >= 1 || Game.IsInToolsMode()
    $("#CoinsBuyPlusBB").style.visibility = can_buy ? "visible" : "collapse"
    $("#ProfileCrystalsPlus").style.visibility = can_buy ? "visible" : "collapse"
    ProfileSetSubscriptionStatus("Plus", "#subscribe_information", ProfileNum(pd.plus_days), can_buy)
    ProfileSetSubscriptionStatus("Premium", "#premium_information", ProfileNum(pd.premium_days), can_buy)
    $("#ProfileBossSoulsCount").text = ProfileFormatNumber(pd.boss_souls)
    ProfileSetCollectionTooltip()
}

function ProfileSetSubscriptionStatus(kind, info_key, days, can_buy)
{
    var row = $("#ProfileAccount" + kind + "Row")
    var status = $("#ProfileAccount" + kind + "Status")
    var buy = $("#ProfileAccount" + kind + "Buy")
    if (!row || !status || !buy) { return }
    var active = days > 0
    status.SetHasClass("Active", active)
    status.style.visibility = active ? "visible" : "collapse"
    buy.style.visibility = !active && can_buy ? "visible" : "collapse"
    var text = $.Localize(info_key)
    if (active)
    {
        text += "<br><br>" + ProfileLocGold("#profile_account_days_left", {n: ProfileFormatNumber(days)})
    }
    row.SetPanelEvent("onmouseover", function()
    {
        $.DispatchEvent("DOTAShowTextTooltip", row, text)
    })
    row.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("DOTAHideTextTooltip", row)
    })
}

function ProfileGetCollectionStats(pd)
{
    var stats = {}
    var count = 0
    var seen = {}
    var items = ProfileList(pd ? pd.donate_items : null)
    for (var i = 0; i < items.length; i++)
    {
        var key = String(items[i])
        var bonus = ITEM_ARENA_BONUS[key]
        if (!seen[key] && bonus)
        {
            seen[key] = true
            count++
            stats[bonus[0]] = (stats[bonus[0]] || 0) + ProfileNum(bonus[1])
        }
    }
    return {stats: stats, count: count}
}

function ProfileSetCollectionTooltip()
{
    var row = $("#ProfileAccountCollection")
    if (!row || profile_signatures.collection_tooltip_set) { return }
    profile_signatures.collection_tooltip_set = true
    row.SetPanelEvent("onmouseover", function()
    {
        var info = ProfileGetCollectionStats(PLAYER_DATA)
        var bonus = []
        for (var key in info.stats)
        {
            bonus.push(key + ":" + info.stats[key])
        }
        var params = "percent=" + GetPercentItemsInProfile() + "&count=" + info.count + "&bonus=" + bonus.join(",")
        $.DispatchEvent("UIShowCustomLayoutParametersTooltip", row, PROFILE_COLLECTION_TOOLTIP_ID, PROFILE_COLLECTION_TOOLTIP_LAYOUT, params)
    })
    row.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("UIHideCustomLayoutTooltip", row, PROFILE_COLLECTION_TOOLTIP_ID)
    })
}

function ProfileUpdateSide(pd)
{
    Profile_UpdateAccount(pd)
    var id_label = $("#ProfilePlayerId")
    if (!id_label) { return }
    id_label.text = $.Localize("#your_gameid") + " " + pd.steamid
    $("#ProfilePlayerGames").text = ProfileLoc("#profile_games_hours", {games: ProfileFormatNumber(pd.games), hours: ProfileFormatNumber(Math.floor(ProfileNum(pd.game_time) / 60))})
    $("#ProfileChipRatingValue").text = ProfileFormatNumber(pd.rating)
    ProfileTooltip($("#ProfileChipRating"), "", [])

    var arena = ProfileGetArenaData()
    $("#ProfileChipArenaDifficulty").text = arena.best ? String(arena.best.difficulty) : "-"
    $("#ProfileChipArenaValue").text = ProfileWaveCode(arena.best)
    $("#ProfileChipArena").SetHasClass("Victory", arena.best != null && arena.best.victory)
    ProfileTooltip($("#ProfileChipArena"), "", [])

    var talents = ProfileList(pd.talents_stats)
    var talent_names = ["#DOTA_Tooltip_Ability_item_power_treads_str", "#DOTA_Tooltip_Ability_item_power_treads_agi", "#DOTA_Tooltip_Ability_item_power_treads_int"]
    var talent_ids = ["STR", "AGI", "INT"]
    var talent_total = ProfileNum(talents[0]) + ProfileNum(talents[1]) + ProfileNum(talents[2])
    var talent_top = Math.max(ProfileNum(talents[0]), ProfileNum(talents[1]), ProfileNum(talents[2]))
    for (var t = 0; t < talent_ids.length; t++)
    {
        var count = ProfileNum(talents[t])
        $("#ProfileTalent" + talent_ids[t]).text = ProfileFormatNumber(count)
        $("#ProfileTalentPick" + talent_ids[t]).SetHasClass("Top", count > 0 && count == talent_top)
        ProfileTooltip($("#ProfileTalentPick" + talent_ids[t]), $.Localize(talent_names[t]), [ProfileLocGold("#profile_talent_pick_line", {n: ProfileFormatNumber(count), p: ProfilePercent(count, talent_total) + "%"})])
    }

    var favorites = []
    var top_heroes = ProfileList(pd.top_heroes)
    for (var h = 0; h < top_heroes.length && favorites.length < 3; h++)
    {
        if (top_heroes[h] && String(top_heroes[h].hero || "").indexOf("npc_dota_hero_") == 0)
        {
            favorites.push({hero: String(top_heroes[h].hero), games: ProfileNum(top_heroes[h].games)})
        }
    }
    ProfileFillList($("#ProfileFavoriteHeroes"), "favorites", favorites, ProfileCreateFavoriteHero, $.Localize("#profile_empty_favorites"))
}

function ProfileCreateFavoriteHero(parent, info, index)
{
    var card = ProfilePanel("Panel", parent, "ProfileFavoriteHero" + (index == 0 ? " First" : ""))
    ProfileHeroImage(card, "ProfileFavoriteHeroImage", info.hero)
    var games = ProfilePanel("Panel", card, "ProfileFavoriteHeroGames")
    ProfileLabel(games, "ProfileFavoriteHeroGamesLabel", ProfileFormatNumber(info.games))
}

function ProfileGetArenaData()
{
    var pd = PLAYER_DATA || {}
    var stats = (PROFILE_STATS && PROFILE_STATS.arena) || {}
    var summary = stats.summary || {}
    var legacy = (PROFILE_STATS && PROFILE_STATS.legacy) || {}
    var quests = pd.quest_data || {}
    var by_difficulty = {}
    var difficulty_rows = ProfileList(stats.difficulties)
    for (var r = 0; r < difficulty_rows.length; r++)
    {
        by_difficulty[ProfileNum(difficulty_rows[r].difficulty)] = difficulty_rows[r]
    }
    var max_cleared = Math.max(ProfileNum(pd.arena_max_difficulty), ProfileNum(summary.max_difficulty))
    var difficulties = []
    var legacy_victories = 0
    for (var d = 1; d <= PROFILE_ARENA_DIFFICULTIES; d++)
    {
        var row = by_difficulty[d] || {}
        var tracked = ProfileNum(row.victories)
        var legacy_count = ProfileNum(quests[ARENA_DIFFICULTY_REPEAT_QUEST_FIRST_ID + d - 1])
        if (ProfileNum(quests[ARENA_DIFFICULTY_QUEST_FIRST_ID + d - 1]) >= 1 || d == ProfileNum(pd.arena_max_difficulty))
        {
            legacy_count = Math.max(legacy_count, 1)
        }
        legacy_victories += legacy_count
        var victories = Math.max(tracked, legacy_count)
        if (victories > 0)
        {
            max_cleared = Math.max(max_cleared, d)
        }
        difficulties.push({
            difficulty: d,
            room: ARENA_DIFFICULTY_ROOMS[d - 1],
            victories: victories,
            capped: legacy_count >= ARENA_DIFFICULTY_REPEAT_QUEST_TIMES && tracked <= legacy_count,
            runs: Math.max(ProfileNum(row.runs), victories),
            best_waves: ProfileNum(row.best_waves),
            best_time: ProfileNum(row.best_time),
        })
    }
    max_cleared = Math.min(max_cleared, PROFILE_ARENA_DIFFICULTIES)
    var best = ProfileResultFromScore(summary.best_score)
    if (max_cleared > 0)
    {
        best = ProfileBetterResult(best, ProfileMakeResult(max_cleared, PROFILE_ARENA_FINAL_WAVE))
    }
    if (!best && ProfileNum(pd.pve_rating) > 0)
    {
        best = ProfileMakeResult(1, ProfileNum(pd.pve_rating))
    }
    var victories_total = Math.max(ProfileNum(summary.victories), legacy_victories)
    var runs = Math.max(ProfileNum(summary.runs), ProfileNum(legacy.arena_runs), victories_total)
    var boss_cap = ARENA_BOSS_KILL_QUEST_COUNT * ARENA_BOSS_KILL_QUEST_STEP
    var legacy_bosses = ProfileNum(quests[ARENA_BOSS_KILL_QUEST_FIRST_ID + ARENA_BOSS_KILL_QUEST_COUNT - 1])
    var bosses = Math.max(ProfileNum(summary.bosses), legacy_bosses)
    return {
        summary: summary,
        difficulties: difficulties,
        max_cleared: max_cleared,
        unlocked: Math.min(max_cleared + 1, PROFILE_ARENA_DIFFICULTIES),
        best: best,
        runs: runs,
        victories: victories_total,
        bosses: bosses,
        bosses_capped: legacy_bosses >= boss_cap && ProfileNum(summary.bosses) <= legacy_bosses,
        season_record: ProfileNum(pd.pve_rating),
        stats: stats,
    }
}

function ProfileGetArenaHeroes()
{
    var pd = PLAYER_DATA || {}
    var stats = (PROFILE_STATS && PROFILE_STATS.arena) || {}
    var heroes = {}
    var create = function(hero)
    {
        var entry = {hero: hero, runs: 0, victories: 0, tracked: false, wins: [], legacy: [], best: null, best_time: 0, best_time_difficulty: 0}
        for (var d = 0; d < PROFILE_ARENA_DIFFICULTIES; d++)
        {
            entry.wins.push(0)
            entry.legacy.push(false)
        }
        heroes[hero] = entry
        return entry
    }
    var rows = ProfileList(stats.heroes)
    for (var i = 0; i < rows.length; i++)
    {
        var hero = String(rows[i].hero || "")
        if (hero == "") { continue }
        var entry = create(hero)
        var wins = ProfileList(rows[i].wins)
        entry.runs = ProfileNum(rows[i].runs)
        entry.victories = ProfileNum(rows[i].victories)
        entry.tracked = true
        entry.best = ProfileResultFromScore(rows[i].best_score)
        entry.best_time = ProfileNum(rows[i].best_time)
        entry.best_time_difficulty = ProfileNum(rows[i].best_time_difficulty)
        for (var w = 0; w < PROFILE_ARENA_DIFFICULTIES; w++)
        {
            entry.wins[w] = ProfileNum(wins[w])
        }
    }
    var owned = {}
    var donate_items = ProfileList(pd.donate_items)
    for (var k = 0; k < donate_items.length; k++)
    {
        owned[ProfileNum(donate_items[k])] = true
    }
    var quests = pd.quest_data || {}
    for (var hero_name in ARENA_HERO_WIN_QUEST_IDS)
    {
        for (var difficulty = 1; difficulty <= PROFILE_ARENA_DIFFICULTIES; difficulty++)
        {
            var quest_id = GetArenaHeroDifficultyQuestId(hero_name, difficulty)
            if (!quest_id) { continue }
            if (ProfileNum(quests[quest_id]) >= 1 || owned[ARENA_HERO_DIFFICULTY_QUEST_REWARD_BASE + quest_id])
            {
                var legacy_entry = heroes[hero_name] || create(hero_name)
                legacy_entry.legacy[difficulty - 1] = true
            }
        }
    }
    var list = []
    for (var name in heroes)
    {
        var info = heroes[name]
        info.done = 0
        for (var n = 0; n < PROFILE_ARENA_DIFFICULTIES; n++)
        {
            if (info.wins[n] > 0 || info.legacy[n])
            {
                info.done++
                info.best = ProfileBetterResult(info.best, ProfileMakeResult(n + 1, PROFILE_ARENA_FINAL_WAVE))
            }
        }
        info.score = ProfileResultScore(info.best)
        list.push(info)
    }
    list.sort(function(a, b)
    {
        if (b.score != a.score) { return b.score - a.score }
        if (b.done != a.done) { return b.done - a.done }
        if (b.runs != a.runs) { return b.runs - a.runs }
        return a.hero < b.hero ? -1 : 1
    })
    return list
}

function ProfileBuildArenaPage(page)
{
    ProfileCreateTiles(page, "arena", [
        ["runs", "#profile_arena_tile_runs"],
        ["victories", "#profile_arena_tile_victories"],
        ["bosses", "#profile_arena_tile_bosses"],
        ["time", "#profile_arena_tile_time"],
    ])

    var path = ProfileSection(page, "ProfileDifficultySection", "#profile_arena_difficulties")
    var track = ProfilePanel("Panel", path.body, "ProfileDifficultyTrack")
    for (var d = 1; d <= PROFILE_ARENA_DIFFICULTIES; d++)
    {
        var room = ARENA_DIFFICULTY_ROOMS[d - 1]
        var card = ProfilePanel("Panel", track, "ProfileDifficultyCard", "ProfileDifficultyCard_" + d)
        var art = ProfilePanel("Panel", card, "ProfileDifficultyArt")
        ProfileRoomImage(art, room)
        ProfilePanel("Panel", art, "ProfileDifficultyShade")
        ProfileDifficultyBadge(art, "ProfileDifficultyBadge", d)
        var count = ProfilePanel("Panel", art, "ProfileDifficultyCount")
        ProfileLabel(count, "ProfileDifficultyCountLabel", "", "ProfileDifficultyCountLabel_" + d)
        ProfileLabel(card, "ProfileDifficultyRoom", $.Localize("#arena_room_" + room))
        ProfileLabel(card, "ProfileDifficultyStatus", "", "ProfileDifficultyStatus_" + d)
    }

    var bottom = ProfilePanel("Panel", page, "ProfileBottomRow")

    var heroes = ProfileSection(bottom, "ProfileArenaHeroesSection", "#profile_arena_heroes")
    var head = ProfilePanel("Panel", heroes.body, "ProfileTableHead")
    ProfileHeadCell(head, "ProfileTableCellHero", $.Localize("#profile_col_hero"))
    ProfileHeadCell(head, "ProfileTableCellBest", $.Localize("#profile_col_best_result"))
    ProfileHeadCell(head, "ProfileTableCellTime", $.Localize("#profile_col_best_time"))
    ProfilePanel("Panel", heroes.body, "ProfileTableList", "ProfileArenaHeroList")

    var recent = ProfileSection(bottom, "ProfileArenaRecentSection", "#profile_recent_runs")
    ProfilePanel("Panel", recent.body, "ProfileTableList", "ProfileArenaRecentList")

    var side = ProfilePanel("Panel", bottom, "ProfileArenaSide")
    var rooms = ProfileSection(side, "ProfileArenaRoomsSection", "#profile_arena_rooms")
    ProfilePanel("Panel", rooms.body, "ProfileRoomList", "ProfileArenaRoomList")
    var party = ProfileSection(side, "ProfileArenaPartySection", "#profile_arena_party")
    ProfilePanel("Panel", party.body, "ProfilePartyList", "ProfileArenaPartyList")
}

function ProfileRenderArena()
{
    var arena = ProfileGetArenaData()
    var summary = arena.summary
    var tracked = ProfileNum(summary.runs) > 0

    ProfileSetTile("arena", "runs", ProfileFormatNumber(arena.runs))
    ProfileSetTile("arena", "victories", ProfileFormatNumber(arena.victories))
    ProfileSetTile("arena", "bosses", ProfileFormatNumber(arena.bosses) + (arena.bosses_capped ? "+" : ""))
    ProfileSetTile("arena", "time", tracked ? ProfileFormatPlaytime(summary.game_time) : "-")

    for (var i = 0; i < arena.difficulties.length; i++)
    {
        ProfileRenderDifficultyCard(arena.difficulties[i], arena)
    }

    var empty_text = ProfileEmptyText()
    var heroes = ProfileGetArenaHeroes()
    ProfileFillList($("#ProfileArenaHeroList"), "arena_heroes", heroes, ProfileCreateArenaHeroRow, PROFILE_STATS || heroes.length > 0 ? $.Localize("#profile_empty_heroes") : empty_text)

    var stats = arena.stats
    ProfileFillList($("#ProfileArenaRecentList"), "arena_recent", ProfileList(stats.recent), ProfileCreateArenaRecentRow, empty_text)

    var rooms = ProfileList(stats.rooms)
    var room_cards = []
    var favorite = null
    var deadly = null
    for (var r = 0; r < rooms.length; r++)
    {
        var room = rooms[r]
        if (ProfileNum(room.visits) > 0 && (!favorite || ProfileNum(room.visits) > ProfileNum(favorite.visits)))
        {
            favorite = room
        }
        if (ProfileNum(room.ends) > 0 && (!deadly || ProfileNum(room.ends) > ProfileNum(deadly.ends)))
        {
            deadly = room
        }
    }
    if (favorite)
    {
        room_cards.push({kind: "favorite", room: ProfileNum(favorite.room), value: ProfileNum(favorite.visits)})
    }
    if (deadly)
    {
        room_cards.push({kind: "deadly", room: ProfileNum(deadly.room), value: ProfileNum(deadly.ends)})
    }
    ProfileFillList($("#ProfileArenaRoomList"), "arena_rooms", room_cards, ProfileCreateRoomCard, empty_text)

    var party_rows = ProfileList(stats.party)
    var party = []
    var party_max = 0
    for (var size = 1; size <= PROFILE_PARTY_MAX; size++)
    {
        var info = {players: size, runs: 0, victories: 0, best_waves: 0}
        for (var q = 0; q < party_rows.length; q++)
        {
            if (ProfileNum(party_rows[q].players) == size)
            {
                info.runs = ProfileNum(party_rows[q].runs)
                info.victories = ProfileNum(party_rows[q].victories)
                info.best_waves = ProfileNum(party_rows[q].best_waves)
            }
        }
        party_max = Math.max(party_max, info.runs)
        party.push(info)
    }
    for (var s = 0; s < party.length; s++)
    {
        party[s].max = party_max
    }
    ProfileFillList($("#ProfileArenaPartyList"), "arena_party", party_max > 0 ? party : [], ProfileCreatePartyRow, empty_text)
}

function ProfileRenderDifficultyCard(info, arena)
{
    var card = $("#ProfileDifficultyCard_" + info.difficulty)
    if (!card) { return }
    var done = info.victories > 0
    var locked = !done && info.difficulty > arena.unlocked
    var available = !done && info.difficulty == arena.unlocked
    card.SetHasClass("Done", done)
    card.SetHasClass("Locked", locked)
    card.SetHasClass("Available", available)
    card.SetHasClass("Open", !done && !locked && !available)

    $("#ProfileDifficultyCountLabel_" + info.difficulty).text = done ? ("x" + info.victories + (info.capped ? "+" : "")) : ""

    var status = $("#ProfileDifficultyStatus_" + info.difficulty)
    status.SetHasClass("Time", done && info.best_time > 0)
    if (done)
    {
        status.text = info.best_time > 0 ? ProfileFormatDuration(info.best_time) : $.Localize("#profile_difficulty_done")
    }
    else if (locked)
    {
        status.text = $.Localize("#profile_difficulty_locked")
    }
    else if (info.best_waves > 0)
    {
        status.text = ProfileLoc("#profile_difficulty_best", {n: info.best_waves})
    }
    else if (available)
    {
        status.text = $.Localize("#profile_difficulty_available")
    }
    else
    {
        status.text = $.Localize("#profile_difficulty_not_done")
    }

    var lines = []
    if (locked)
    {
        lines.push($.Localize("#profile_difficulty_locked_tooltip"))
    }
    if (info.runs > 0)
    {
        lines.push(ProfileLocGold("#profile_tt_runs", {n: ProfileFormatNumber(info.runs)}))
    }
    if (done)
    {
        lines.push(ProfileLocGold("#profile_tt_victories", {n: ProfileFormatNumber(info.victories) + (info.capped ? "+" : "")}))
    }
    if (info.best_waves > 0)
    {
        lines.push(ProfileLocGold("#profile_tt_best_wave", {n: info.best_waves}))
    }
    if (info.best_time > 0)
    {
        lines.push(ProfileLocGold("#profile_tt_fastest", {t: ProfileFormatDuration(info.best_time)}))
    }
    if (lines.length == 0)
    {
        lines.push($.Localize(available ? "#profile_difficulty_available" : "#profile_difficulty_not_done"))
    }
    var rewards = BuildArenaDifficultyRewardsLines(info.difficulty)
    if (rewards.length > 0)
    {
        lines.push("")
        lines = lines.concat(rewards)
    }
    ProfileTooltip(card, ProfileLoc("#profile_tt_difficulty", {d: info.difficulty}) + " - " + $.Localize("#arena_room_" + info.room), lines)
}

function ProfileCreateArenaHeroRow(parent, info)
{
    var row = ProfilePanel("Panel", parent, "ProfileTableRow ProfileArenaHeroRow")
    ProfileHeroCell(row, info.hero)
    var best_cell = ProfileTableCell(row, "ProfileTableCellBest" + (info.best ? "" : " Empty"))
    var best = ProfilePanel("Panel", best_cell, "ProfileHeroBest")
    ProfileDifficultyBadge(best, "ProfileHeroBestBadge", info.best ? info.best.difficulty : 0)
    ProfileLabel(best, "ProfileHeroBestStage", ProfileWaveCode(info.best))
    var time_cell = ProfileTableCell(row, "ProfileTableCellTime" + (info.best_time > 0 ? "" : " Empty"))
    ProfileLabel(time_cell, "ProfileRowNum ProfileRowTime", info.best_time > 0 ? ProfileFormatDuration(info.best_time) : "-")
    var lines = []
    if (!info.best)
    {
        lines.push($.Localize("#profile_best_none"))
    }
    else if (info.best.victory)
    {
        lines.push($.Localize("#profile_best_victory_line"))
    }
    if (info.best_time > 0)
    {
        lines.push(ProfileLocGold("#profile_tt_fastest_difficulty", {t: ProfileFormatDuration(info.best_time), d: info.best_time_difficulty}))
    }
    if (info.done > 0)
    {
        lines.push(ProfileLocGold("#profile_cleared_line", {n: info.done, t: PROFILE_ARENA_DIFFICULTIES}))
    }
    if (info.tracked)
    {
        lines.push(ProfileLocGold("#profile_tt_runs", {n: ProfileFormatNumber(info.runs)}))
        lines.push(ProfileLocGold("#profile_tt_victories", {n: ProfileFormatNumber(info.victories)}))
    }
    ProfileTooltip(row, $.Localize("#" + info.hero), lines)
}

function ProfileCreateArenaRecentRow(parent, info)
{
    var victory = ProfileNum(info.victory) == 1
    var row = ProfilePanel("Panel", parent, "ProfileTableRow ProfileRecentRow " + (victory ? "Victory" : "Defeat"))
    ProfileHeroImage(row, "ProfileRecentHeroImage", info.hero)
    ProfileDifficultyBadge(row, "ProfileRecentBadge", ProfileNum(info.difficulty))
    var main = ProfilePanel("Panel", row, "ProfileRecentMain")
    var reached = ProfileReachedWave(ProfileMakeResult(info.difficulty, info.waves))
    ProfileLabel(main, "ProfileRecentResult", victory || !reached ? $.Localize("#profile_result_victory") : ProfileLoc("#profile_result_defeat", {n: ProfileWaveCode(ProfileMakeResult(info.difficulty, info.waves))}))
    var party_key = "#profile_party_" + Math.min(Math.max(ProfileNum(info.players), 1), PROFILE_PARTY_MAX)
    ProfileLabel(main, "ProfileRecentSub", $.Localize(party_key) + "  " + ProfileFormatDuration(info.game_time))
    ProfileLabel(row, "ProfileRecentAgo", ProfileFormatAgo(info.ago))
    var lines = [ProfileLocGold("#profile_tt_difficulty", {d: ProfileNum(info.difficulty)}), ProfileLocGold("#profile_tt_waves", {n: ProfileNum(info.waves)})]
    if (ProfileNum(info.final_room) >= 0 && !victory)
    {
        lines.push(ProfileLoc("#profile_tt_final_room", {room: WodaGold($.Localize("#arena_room_" + ProfileNum(info.final_room)))}))
    }
    lines.push(ProfileLocGold("#profile_tt_deaths", {n: ProfileNum(info.deaths)}))
    lines.push(ProfileLocGold("#profile_tt_duration", {t: ProfileFormatDuration(info.game_time)}))
    ProfileTooltip(row, $.Localize("#" + info.hero), lines)
}

function ProfileCreateRoomCard(parent, info)
{
    var card = ProfilePanel("Panel", parent, "ProfileRoomCard " + (info.kind == "deadly" ? "Deadly" : "Favorite"))
    var art = ProfilePanel("Panel", card, "ProfileRoomArt")
    ProfileRoomImage(art, info.room)
    var text = ProfilePanel("Panel", card, "ProfileRoomText")
    ProfileLabel(text, "ProfileRoomKind", $.Localize(info.kind == "deadly" ? "#profile_room_deadly" : "#profile_room_favorite"))
    ProfileLabel(text, "ProfileRoomName", $.Localize("#arena_room_" + info.room))
    ProfileLabel(text, "ProfileRoomValue", ProfileLoc(info.kind == "deadly" ? "#profile_room_ends" : "#profile_room_visits", {n: ProfileFormatNumber(info.value)}))
}

function ProfileCreatePartyRow(parent, info)
{
    var row = ProfilePanel("Panel", parent, "ProfilePartyRow" + (info.runs > 0 ? "" : " Empty"))
    ProfileLabel(row, "ProfilePartyName", $.Localize("#profile_party_" + info.players))
    var bar = ProfilePanel("Panel", row, "ProfilePartyBar")
    var fill = ProfilePanel("Panel", bar, "ProfilePartyFill")
    fill.style.width = (info.max > 0 ? Math.max(Math.round(info.runs / info.max * 100), info.runs > 0 ? 4 : 0) : 0) + "%"
    var win = ProfilePanel("Panel", bar, "ProfilePartyWin")
    win.style.width = (info.max > 0 ? Math.round(info.victories / info.max * 100) : 0) + "%"
    ProfileLabel(row, "ProfilePartyValue", ProfileFormatNumber(info.runs))
    var lines = [ProfileLocGold("#profile_tt_runs", {n: ProfileFormatNumber(info.runs)}), ProfileLocGold("#profile_tt_victories", {n: ProfileFormatNumber(info.victories)})]
    ProfileTooltip(row, $.Localize("#profile_party_" + info.players), lines)
}

function ProfileGetRatingData(mode)
{
    var config = PROFILE_RATING_MODES[mode]
    var pd = PLAYER_DATA || {}
    var stats = (PROFILE_STATS && PROFILE_STATS[mode]) || {}
    var legacy = PROFILE_STATS && PROFILE_STATS.legacy ? PROFILE_STATS.legacy[config.legacy_key] : null
    var source = ProfileList(legacy ? legacy : pd[config.player_key])
    var places = []
    var games = 0
    var place_sum = 0
    for (var p = 1; p <= config.places; p++)
    {
        var count = ProfileNum(source[p])
        places.push(count)
        games += count
        place_sum += count * p
    }
    var top = 0
    for (var t = 0; t < config.top; t++)
    {
        top += places[t]
    }
    return {
        config: config,
        places: places,
        leave: ProfileNum(source[0]),
        games: games,
        wins: places[0],
        top: top,
        avg: games > 0 ? place_sum / games : 0,
        summary: stats.summary || {},
        heroes: ProfileList(stats.heroes),
        recent: ProfileList(stats.recent),
        teammates: ProfileList(stats.teammates),
    }
}

function ProfileBuildRatingPage(page, mode)
{
    var config = PROFILE_RATING_MODES[mode]
    ProfileCreateTiles(page, mode, [
        ["games", "#profile_rating_tile_games"],
        ["wins", "#profile_rating_tile_wins"],
        ["top", "#profile_rating_tile_top", {n: config.top}],
        ["avg", "#profile_rating_tile_avg"],
        ["leaves", "#profile_rating_tile_leaves"],
        ["duels", "#profile_rating_tile_duels"],
    ])

    var chart_section = ProfileSection(page, "ProfilePlacesSection", config.chart_title)
    var chart = ProfilePanel("Panel", chart_section.body, "ProfilePlacesChart" + (config.places <= 4 ? " Duo" : ""))
    for (var p = 1; p <= config.places + 1; p++)
    {
        var is_leave = p > config.places
        var key = mode + "_" + (is_leave ? "leave" : p)
        var column = ProfilePanel("Panel", chart, "ProfilePlaceColumn" + (is_leave ? " Leave" : ""), "ProfilePlaceColumn_" + key)
        var area = ProfilePanel("Panel", column, "ProfilePlaceArea")
        ProfilePanel("Panel", area, "ProfilePlaceBar " + (is_leave ? "ColumnWinrateleave" : "ColumnWinrate" + config.colors[p - 1]), "ProfilePlaceBar_" + key)
        ProfileLabel(area, "ProfilePlaceCount", "0", "ProfilePlaceCount_" + key)
        ProfileLabel(column, "ProfilePlaceLabel", is_leave ? $.Localize("#leave") : String(p))
        ProfileLabel(column, "ProfilePlacePercent", "0%", "ProfilePlacePercent_" + key)
    }

    var bottom = ProfilePanel("Panel", page, "ProfileBottomRow")
    var heroes = ProfileSection(bottom, "ProfileRatingHeroesSection", "#profile_rating_heroes")
    var head = ProfilePanel("Panel", heroes.body, "ProfileTableHead")
    ProfileHeadCell(head, "ProfileTableCellHero", $.Localize("#profile_col_hero"))
    ProfileHeadCell(head, "ProfileTableCellNum", $.Localize("#profile_col_games"))
    ProfileHeadCell(head, "ProfileTableCellNum", $.Localize("#profile_col_wins"))
    ProfileHeadCell(head, "ProfileTableCellNum", ProfileLoc("#profile_col_top", {n: config.top}))
    ProfileHeadCell(head, "ProfileTableCellNum", $.Localize("#profile_col_avg"))
    ProfilePanel("Panel", heroes.body, "ProfileTableList", "ProfileRatingHeroList_" + mode)

    var recent = ProfileSection(bottom, "ProfileRatingRecentSection" + (config.teammates ? " WithSide" : ""), "#profile_recent_games")
    ProfilePanel("Panel", recent.body, "ProfileTableList", "ProfileRatingRecentList_" + mode)

    if (config.teammates)
    {
        var teammates = ProfileSection(bottom, "ProfileRatingTeammatesSection", "#profile_duo_teammates")
        ProfilePanel("Panel", teammates.body, "ProfileTeammateList", "ProfileRatingTeammateList_" + mode)
    }
}

var PROFILE_PLACE_AREA_HEIGHT = 128

function ProfileRenderRating(mode)
{
    var data = ProfileGetRatingData(mode)
    var config = data.config
    var summary = data.summary
    var tracked = ProfileNum(summary.games) > 0
    ProfileSetTile(mode, "games", ProfileFormatNumber(data.games))
    ProfileSetTile(mode, "wins", ProfileFormatNumber(data.wins))
    ProfileSetTile(mode, "top", ProfilePercent(data.top, data.games) + "%")
    ProfileSetTile(mode, "avg", data.games > 0 ? data.avg.toFixed(2) : "-")
    ProfileSetTile(mode, "leaves", ProfileFormatNumber(data.leave))
    ProfileSetTile(mode, "duels", tracked ? ProfileFormatNumber(summary.duel_streak) : "-")

    var max_count = data.leave
    for (var i = 0; i < data.places.length; i++)
    {
        max_count = Math.max(max_count, data.places[i])
    }
    for (var p = 1; p <= config.places + 1; p++)
    {
        var is_leave = p > config.places
        var key = mode + "_" + (is_leave ? "leave" : p)
        var count = is_leave ? data.leave : data.places[p - 1]
        var height = max_count > 0 ? Math.max(Math.round(count / max_count * PROFILE_PLACE_AREA_HEIGHT), count > 0 ? 4 : 2) : 2
        var bar = $("#ProfilePlaceBar_" + key)
        var count_label = $("#ProfilePlaceCount_" + key)
        var percent_label = $("#ProfilePlacePercent_" + key)
        if (!bar || !count_label || !percent_label) { continue }
        bar.style.height = height + "px"
        count_label.text = ProfileFormatNumber(count)
        count_label.style.marginBottom = (height + 4) + "px"
        percent_label.text = ProfilePercent(count, data.games) + "%"
    }

    var empty_text = ProfileEmptyText()
    var heroes = []
    for (var h = 0; h < data.heroes.length; h++)
    {
        var hero = data.heroes[h]
        heroes.push({hero: String(hero.hero || ""), games: ProfileNum(hero.games), wins: ProfileNum(hero.wins), top: ProfileNum(hero.top), avg: ProfileNum(hero.avg_place), top_places: config.top})
    }
    ProfileFillList($("#ProfileRatingHeroList_" + mode), mode + "_heroes", heroes, ProfileCreateRatingHeroRow, empty_text)
    var recent = []
    for (var r = 0; r < data.recent.length; r++)
    {
        var game = data.recent[r]
        recent.push({hero: String(game.hero || ""), place: ProfileNum(game.place), places_total: ProfileNum(game.places_total) || config.places, rating_change: ProfileNum(game.rating_change), kills: ProfileNum(game.kills), deaths: ProfileNum(game.deaths), assists: ProfileNum(game.assists), game_time: ProfileNum(game.game_time), leave: ProfileNum(game.leave), duels: ProfileNum(game.duel_streak), ago: ProfileNum(game.ago), color: config.colors[Math.max(ProfileNum(game.place), 1) - 1] || config.colors[config.colors.length - 1]})
    }
    ProfileFillList($("#ProfileRatingRecentList_" + mode), mode + "_recent", recent, ProfileCreateRatingRecentRow, empty_text)

    if (config.teammates)
    {
        var teammates = []
        for (var m = 0; m < data.teammates.length; m++)
        {
            var mate = data.teammates[m]
            teammates.push({steamid64: String(mate.steamid64 || ""), games: ProfileNum(mate.games), wins: ProfileNum(mate.wins), avg: ProfileNum(mate.avg_place)})
        }
        ProfileFillList($("#ProfileRatingTeammateList_" + mode), mode + "_teammates", teammates, ProfileCreateTeammateRow, PROFILE_STATS ? $.Localize("#profile_empty_teammates") : empty_text)
    }
}

function ProfileCreateTeammateRow(parent, info, index)
{
    var row = ProfilePanel("Panel", parent, "ProfileTeammateRow" + (index == 0 ? " First" : ""))
    ProfilePanel("DOTAAvatarImage", row, "ProfileTeammateAvatar", "", {steamid: info.steamid64, hittest: "false"})
    var main = ProfilePanel("Panel", row, "ProfileTeammateMain")
    ProfilePanel("DOTAUserName", main, "ProfileTeammateName", "", {steamid: info.steamid64, hittest: "false"})
    ProfileLabel(main, "ProfileTeammateSub", ProfileLoc("#profile_teammate_sub", {games: ProfileFormatNumber(info.games), wins: ProfileFormatNumber(info.wins)}))
    ProfileLabel(row, "ProfileTeammateWinrate", ProfilePercent(info.wins, info.games) + "%")
    ProfileTooltip(row, $.Localize("#profile_duo_teammates"), [
        ProfileLocGold("#profile_tt_games", {n: ProfileFormatNumber(info.games)}),
        ProfileLocGold("#profile_tt_wins", {n: ProfileFormatNumber(info.wins)}),
        ProfileLocGold("#profile_tt_avg_place", {n: info.avg > 0 ? info.avg.toFixed(2) : "-"}),
    ])
}

function ProfileCreateRatingHeroRow(parent, info)
{
    var row = ProfilePanel("Panel", parent, "ProfileTableRow ProfileRatingHeroRow")
    ProfileHeroCell(row, info.hero)
    ProfileNumCell(row, ProfileFormatNumber(info.games))
    ProfileNumCell(row, ProfileFormatNumber(info.wins), "ProfileRowNumGold")
    ProfileNumCell(row, ProfilePercent(info.top, info.games) + "%")
    ProfileNumCell(row, info.avg > 0 ? info.avg.toFixed(1) : "-")
    ProfileTooltip(row, $.Localize("#" + info.hero), [
        ProfileLocGold("#profile_tt_games", {n: ProfileFormatNumber(info.games)}),
        ProfileLocGold("#profile_tt_wins", {n: ProfileFormatNumber(info.wins)}),
        ProfileLocGold("#profile_tt_avg_place", {n: info.avg > 0 ? info.avg.toFixed(2) : "-"}),
    ])
}

function ProfileCreateRatingRecentRow(parent, info)
{
    var row = ProfilePanel("Panel", parent, "ProfileTableRow ProfileRecentRow ProfileRatingRecentRow" + (info.place == 1 ? " Victory" : ""))
    ProfileHeroImage(row, "ProfileRecentHeroImage", info.hero)
    var place = ProfilePanel("Panel", row, "ProfileRecentPlace ColumnWinrate" + info.color)
    ProfileLabel(place, "ProfileRecentPlaceLabel", info.place > 0 ? String(info.place) : "-")
    var main = ProfilePanel("Panel", row, "ProfileRecentMain")
    var change = info.rating_change > 0 ? "+" + info.rating_change : String(info.rating_change)
    ProfileLabel(main, "ProfileRecentResult " + (info.rating_change > 0 ? "Positive" : (info.rating_change < 0 ? "Negative" : "")), info.leave ? $.Localize("#leave") + "  " + change : change)
    ProfileLabel(main, "ProfileRecentSub", info.kills + " / " + info.deaths + " / " + info.assists + "  " + ProfileFormatDuration(info.game_time))
    ProfileLabel(row, "ProfileRecentAgo", ProfileFormatAgo(info.ago))
    var lines = [ProfileLocGold("#profile_tt_place", {n: info.place, t: info.places_total})]
    lines.push(ProfileLocGold("#profile_tt_rating_change", {n: change}))
    lines.push(ProfileLocGold("#profile_tt_kda", {k: info.kills, d: info.deaths, a: info.assists}))
    if (info.duels > 0)
    {
        lines.push(ProfileLocGold("#profile_tt_duels", {n: info.duels}))
    }
    lines.push(ProfileLocGold("#profile_tt_duration", {t: ProfileFormatDuration(info.game_time)}))
    ProfileTooltip(row, $.Localize("#" + info.hero), lines)
}