--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var InitLeaderboard = false;
var cooldown_panel = false
var current_sub_tab = "";
var TOP_RATING_LIST = {}
// var OpenedHeroSoloPanel = null
// var ARENA_HERO_TOP_PLAYERS = 10
// var CURRENT_PVE_TAB = "hero"
var CURRENT_PVE_TAB = "1"
var CURRENT_RANKING_TAB = "pvp"
var LEADERBOARD_ROWS_PER_FRAME = 12
var LEADERBOARD_BUILD = {}
var LEADERBOARD_BUILD_SCHEDULED = false
var LEADERBOARD_REQUEST_PENDING = false
var LEADERBOARD_SHOP_ROWS = {}
var LEADERBOARD_SEASON = 1
var LEADERBOARD_TOOLTIP_ID = "woda_leaderboard_tooltip"
var LEADERBOARD_TOOLTIP_LAYOUT = "file://{resources}/layout/custom_game/tooltips/leaderboard_tooltip/leaderboard_tooltip.xml"

function InitLeaderboardSeason()
{
    $("#LeaderboardSeasonNumber").text = String(LEADERBOARD_SEASON)
    var panel = $("#LeaderboardSeason")
    panel.SetPanelEvent("onmouseover", ShowLeaderboardSeasonTooltip)
    panel.SetPanelEvent("onmouseout", function() { $.DispatchEvent("DOTAHideTextTooltip") })
}

function ShowLeaderboardSeasonTooltip()
{
    var panel = $("#LeaderboardSeason")
    panel.SetDialogVariable("season", String(LEADERBOARD_SEASON))
    $.DispatchEvent("DOTAShowTextTooltip", panel, $.Localize("#Leaderboard_season_tooltip", panel))
}

InitLeaderboardSeason()

function ShowLeaderboardMinWavesTooltip()
{
    $.DispatchEvent("UIShowCustomLayoutParametersTooltip", $("#LeaderboardMinWavesIcon"), LEADERBOARD_TOOLTIP_ID, LEADERBOARD_TOOLTIP_LAYOUT, "text=Leaderboard_arena_min_waves_tooltip")
}

function HideLeaderboardMinWavesTooltip()
{
    $.DispatchEvent("UIHideCustomLayoutTooltip", $("#LeaderboardMinWavesIcon"), LEADERBOARD_TOOLTIP_ID)
}

var leaderboard_window_hide_schedule = -1

function SetLeaderboardWindowVisible(visible)
{
    var leaderboard_window = $("#LeaderboardWindow")
    if (leaderboard_window_hide_schedule != -1)
    {
        $.CancelScheduled(leaderboard_window_hide_schedule)
        leaderboard_window_hide_schedule = -1
    }
    if (visible)
    {
        leaderboard_window.style.visibility = "visible"
    }
    leaderboard_window.SetHasClass("setvisible", visible)
    if (!visible)
    {
        leaderboard_window_hide_schedule = $.Schedule(0.25, function()
        {
            leaderboard_window_hide_schedule = -1
            if (!leaderboard_window.BHasClass("setvisible"))
            {
                leaderboard_window.style.visibility = "collapse"
            }
        })
    }
}

$("#LeaderboardWindow").style.visibility = "collapse"

function IsLeaderboardOpen()
{
    return $("#LeaderboardWindow").BHasClass("setvisible")
}

function ToggleLeaderboard()
{
    if (!InitLeaderboard)
    {
        InitLeaderboard = true
        GetLocalRating()
        FirstOpen()
    }
    let visible = !IsLeaderboardOpen()
    SetLeaderboardWindowVisible(visible)
    if (visible)
    {
        BuildVisibleLeaderboard()
    }
}

function FirstOpen()
{
    $("#PanelButPVE").SetHasClass("ButtonRatActive", false)
    $("#PanelButPVP").SetHasClass("ButtonRatActive", false)
    $("#PvpInfo").style.visibility = "collapse"
    $("#PveInfo").style.visibility = "collapse"
    if (/^(arena|1_player|4_player)$/.test(Game.GetMapInfo().map_display_name))
    {
        CURRENT_RANKING_TAB = "pve"
        $("#PanelButPVE").SetHasClass("ButtonRatActive", true)
        $("#PveInfo").style.visibility = "visible"
    }
    else
    {
        CURRENT_RANKING_TAB = "pvp"
        $("#PanelButPVP").SetHasClass("ButtonRatActive", true)
        $("#PvpInfo").style.visibility = "visible"
    }
}
 
function GetLocalRating()
{
    var localplayer_data = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
    if (!localplayer_data)
    {
        $.Schedule(1, GetLocalRating)
        return;
    } 
    $("#LocalRating").text = String(localplayer_data.rating)
    UpdateLocalRatingGames()
    UpdateLocalArenaResult()
}

function UpdateLocalRatingGames()
{
    let label = $("#LocalRatingGames")
    if (!label)
    {
        return
    }
    label.text = ""
    let top_rating = TOP_RATING_LIST["top_rating"]
    let localplayer_data = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()))
    if (!top_rating || !localplayer_data || !localplayer_data.steamid)
    {
        return
    }
    let steamid = String(localplayer_data.steamid)
    for (let i in top_rating)
    {
        let entry = top_rating[i]
        if (entry && String(entry.steamid) == steamid && entry.games !== undefined)
        {
            label.text = $.Localize("#profile_tt_games").split("{n}").join(String(Number(entry.games) || 0))
            return
        }
    }
}


function InitRatingTable()
{
    GameEvents.SendCustomGameEventToServer_custom( "donate_shop_get_top_rating", {} );
}

GameEvents.Subscribe_custom( 'donate_shop_set_top_rating', donate_shop_set_top_rating );
function IsArenaLegacy()
{
    let pve = TOP_RATING_LIST && TOP_RATING_LIST.top_rating_pve
    return !!(pve && pve.format == "legacy")
}

function donate_shop_set_top_rating(data)
{
    TOP_RATING_LIST = data
    let pve_info = $("#PveInfo")
    if (pve_info)
    {
        pve_info.SetHasClass("ArenaLegacy", IsArenaLegacy())
    }
    if (!InitLeaderboard)
    {
        return
    }
    if (data.rebuild_pve)
    {
        ResetArenaLeaderboard()
    }
    if (data.rebuild_pvp)
    {
        ResetRatingLeaderboard()
    }
    UpdateLocalRatingGames()
    UpdateLocalArenaResult()
    BuildVisibleLeaderboard()
}

function ResetRatingLeaderboard()
{
    LEADERBOARD_BUILD["pvp"] = null
    $("#PlayersTable").RemoveAndDeleteChildren()
}

// var ARENA_LEADERBOARD_TABS = ["1", "2", "3", "4", "hero"]
var ARENA_LEADERBOARD_TABS = ["1", "2", "3", "4"]

function ResetArenaLeaderboard()
{
    // OpenedHeroSoloPanel = null
    let keys = ARENA_LEADERBOARD_TABS
    for (let i = 0; i < keys.length; i++)
    {
        LEADERBOARD_BUILD[keys[i]] = null
        $("#PlayersTablePVE" + keys[i]).RemoveAndDeleteChildren()
    }
}

function BuildVisibleLeaderboard()
{
    if (LEADERBOARD_BUILD_SCHEDULED)
    {
        return
    }
    LeaderboardBuildStep()
}

function LeaderboardBuildStep()
{
    LEADERBOARD_BUILD_SCHEDULED = false
    if (!InitLeaderboard || !IsLeaderboardOpen())
    {
        return
    }
    let key = CURRENT_RANKING_TAB == "pve" ? CURRENT_PVE_TAB : "pvp"
    let build = LEADERBOARD_BUILD[key]
    if (!build)
    {
        let rows = GetLeaderboardRows(key)
        if (!rows)
        {
            RequestLeaderboardData()
            return
        }
        build = { rows: rows, index: 0, done: false }
        LEADERBOARD_BUILD[key] = build
    }
    if (build.done)
    {
        return
    }
    let end = Math.min(build.index + LEADERBOARD_ROWS_PER_FRAME, build.rows.length)
    while (build.index < end)
    {
        let row = build.rows[build.index]
        build.index++
        CreateLeaderboardRow(key, row)
    }
    if (build.index < build.rows.length)
    {
        LEADERBOARD_BUILD_SCHEDULED = true
        $.Schedule(0, LeaderboardBuildStep)
        return
    }
    build.done = true
    if (key != "pvp")
    {
        AddArenaEmptyLabel($("#PlayersTablePVE" + key))
    }
}

function RequestLeaderboardData()
{
    if (LEADERBOARD_REQUEST_PENDING)
    {
        return
    }
    LEADERBOARD_REQUEST_PENDING = true
    InitRatingTable()
    $.Schedule(1, function()
    {
        LEADERBOARD_REQUEST_PENDING = false
        BuildVisibleLeaderboard()
    })
}

function GetLeaderboardRows(key)
{
    let rows = []
    if (!TOP_RATING_LIST["season_rewards"])
    {
        return null
    }
    if (key == "pvp")
    {
        let top_rating = TOP_RATING_LIST["top_rating"]
        if (!top_rating)
        {
            return null
        }
        for (let i in top_rating)
        {
            if (top_rating[i])
            {
                rows.push({ number: i, data: top_rating[i] })
            }
        }
        return rows
    }
    let top_rating_pve = TOP_RATING_LIST["top_rating_pve"]
    if (!top_rating_pve || Object.keys(top_rating_pve).length <= 0)
    {
        return null
    }
    let list = top_rating_pve[key] || {}
    for (let i in list)
    {
        if (list[i])
        {
            rows.push({ number: Number(i), data: list[i] })
        }
    }
    return rows
}

function CreateLeaderboardRow(key, row)
{
    let data = row.data
    if (key == "pvp")
    {
        CreatePlayer(data.steamid, data.rating, $("#PlayersTable"), row.number, false, data)
    }
    // else if (key == "hero")
    // {
    //     CreateHeroPanel(row.number, data)
    // }
    else
    {
        CreatePlayers(data.p1, data.p2, data.p3, data.p4, $("#PlayersTablePVE" + key), row.number, data, "pve_" + key)
    }
}

function CompareArenaResults(a, b)
{
    let difficulty = (Number(b.difficulty) || 0) - (Number(a.difficulty) || 0)
    if (difficulty != 0)
    {
        return difficulty
    }
    let waves = (Number(b.wave_count) || 0) - (Number(a.wave_count) || 0)
    if (waves != 0)
    {
        return waves
    }
    return (Number(a.game_seconds) || 0) - (Number(b.game_seconds) || 0)
}

function LeaderboardFormatTime(seconds)
{
    seconds = Math.max(0, Math.floor(Number(seconds) || 0))
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds % 3600) / 60)
    let rest = seconds % 60
    let minutes_text = (hours > 0 && minutes < 10 ? "0" : "") + minutes
    let seconds_text = (rest < 10 ? "0" : "") + rest
    if (hours > 0)
    {
        return hours + ":" + minutes_text + ":" + seconds_text
    }
    return minutes_text + ":" + seconds_text
}

function CreateArenaResult(parent, data)
{
    let difficulty = Number(data.difficulty) || 0
    let waves = Number(data.wave_count) || 0

    let result = $.CreatePanel("Panel", parent, "");
    result.AddClass("ArenaResult");

    let result_inner = $.CreatePanel("Panel", result, "");
    result_inner.AddClass("ArenaResultInner");

    let badge = $.CreatePanel("Panel", result_inner, "");
    badge.AddClass("ArenaResultBadge");

    let badge_label = $.CreatePanel("Label", badge, "");
    badge_label.AddClass("ArenaResultBadgeLabel");
    badge_label.text = difficulty > 0 ? String(difficulty) : "-"

    let wave_label = $.CreatePanel("Label", result_inner, "");
    wave_label.AddClass("ArenaResultWave");
    wave_label.text = String(waves)
    return result
}

function CreateArenaTime(parent, data)
{
    let seconds = Number(data.game_seconds) || 0
    let time_label = $.CreatePanel("Label", parent, "");
    time_label.AddClass("ArenaTime");
    time_label.text = seconds > 0 ? LeaderboardFormatTime(seconds) : "-"
    return time_label
}

function AddArenaEmptyLabel(panel)
{
    if (!panel || panel.GetChildCount() > 0)
    {
        return
    }
    let empty_label = $.CreatePanel("Label", panel, "");
    empty_label.AddClass("ArenaEmpty");
    empty_label.text = $.Localize("#Leaderboard_arena_empty")
}

function FindLocalArenaResult(mode)
{
    let top_rating = TOP_RATING_LIST["top_rating_pve"]
    let localplayer_data = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()))
    if (!top_rating || !localplayer_data || !localplayer_data.steamid)
    {
        return null
    }
    let steamid = String(localplayer_data.steamid)
    let best = null
    // if (mode == "hero")
    // {
    //     let heroes = top_rating["hero"] || {}
    //     for (let i in heroes)
    //     {
    //         let players = heroes[i] && heroes[i].players || {}
    //         for (let key in players)
    //         {
    //             let entry = players[key]
    //             if (entry && String(entry.player_id) == steamid && (!best || CompareArenaResults(entry, best) < 0))
    //             {
    //                 best = entry
    //             }
    //         }
    //     }
    //     return best
    // }
    let list = top_rating[mode] || {}
    for (let i in list)
    {
        let entry = list[i]
        if (!entry)
        {
            continue
        }
        let ids = [String(entry.p1), String(entry.p2), String(entry.p3), String(entry.p4)]
        if (ids.indexOf(steamid) >= 0 && (!best || CompareArenaResults(entry, best) < 0))
        {
            best = entry
        }
    }
    return best
}

function UpdateLocalArenaResult()
{
    let panel = $("#LocalArenaResult")
    if (!panel)
    {
        return
    }
    panel.RemoveAndDeleteChildren()
    let best = FindLocalArenaResult(CURRENT_PVE_TAB)
    if (!best)
    {
        let empty_label = $.CreatePanel("Label", panel, "");
        empty_label.AddClass("LocalArenaEmpty");
        empty_label.text = "-"
        return
    }
    CreateArenaResult(panel, best)
    CreateArenaTime(panel, best)
}

function CreatePlayer(steam_id, rating, panel, number, pve, full_data) 
{
    var Line = $.CreatePanel("Panel", panel, "");
    Line.AddClass("LinePlayer");

    var RankPanel = $.CreatePanel("Panel", Line, "");
    RankPanel.AddClass("RankPanel");

    var RankImage = $.CreatePanel("Panel", RankPanel, "");
    RankImage.AddClass("RankImage");

    let index = number >= 1 && number <= 10 ? 1 : number <= 50 ? 2 : number <= 100 ? 3 : null;
    if (index) 
    {
        RankImage.style.backgroundImage = `url("file://{images}/custom_game/leaderboard/rating${index}.png")`;
        RankImage.style.backgroundSize = "100%" 
    }
    else 
    {
        RankImage.style.opacity = 1;
    }

    var Rank_number = $.CreatePanel("Label", RankImage, "");
    Rank_number.AddClass("Rank_number");
    Rank_number.text = number

    var AvatarNicknamePanel = $.CreatePanel("Panel", Line, "");
    AvatarNicknamePanel.AddClass("AvatarNicknamePanel");

    $.CreatePanel("DOTAAvatarImage", AvatarNicknamePanel, "AvatarLeaderboard", { style: "width:32px;height:32px;vertical-align:center;", accountid: steam_id });

    if (pve && full_data.hero_1)
    {
        let hero_icon = $.CreatePanel("Panel", AvatarNicknamePanel, "");
        hero_icon.AddClass("hero_icon");
        hero_icon.style.backgroundImage = 'url( "file://{images}/heroes/icons/' + full_data.hero_1 + '.png" );'
        hero_icon.style.backgroundSize = "100%"
    }

    $.CreatePanel("DOTAUserName", AvatarNicknamePanel, "NickNameLeaderboard", { style: "vertical-align:center;margin-left:10px;height: 20px;", accountid: steam_id });

    var Rating = $.CreatePanel("Label", Line, "");
    Rating.AddClass("RatingLabel");
    Rating.text = String(rating)

    if (pve)
    {
        Rating.style.color = "orange";
    } 
    
    if (!pve)
    {
        let games = $.CreatePanel("Label", Line, "");
        games.AddClass("RatingGamesLabel");
        games.text = full_data && full_data.games !== undefined ? String(Number(full_data.games) || 0) : "-"
    }

    CreateSeasonRewards(Line, "rating", Number(number))
}

function CreatePlayers(id1, id2, id3, id4, panel, number, full_data, board)
{
    var Line = $.CreatePanel("Panel", panel, "");
    Line.AddClass("LinePlayer");

    var RankPanel = $.CreatePanel("Panel", Line, "");
    RankPanel.AddClass("RankPanel");

    var RankImage = $.CreatePanel("Panel", RankPanel, "");
    RankImage.AddClass("RankImage");

    let index = number >= 1 && number <= 10 ? 1 : number <= 50 ? 2 : number <= 100 ? 3 : null;
    if (index) 
    {
        RankImage.style.backgroundImage = `url("file://{images}/custom_game/leaderboard/rating${index}.png")`;
        RankImage.style.backgroundSize = "100%" 
    }
    else 
    {
        RankImage.style.opacity = 1;
    }

    var Rank_number = $.CreatePanel("Label", RankImage, "");
    Rank_number.AddClass("Rank_number");
    Rank_number.text = number

    var AvatarNicknamePanel = $.CreatePanel("Panel", Line, "");
    AvatarNicknamePanel.AddClass("AvatarNicknamePanel");
    AvatarNicknamePanel.SetHasClass("Quad", Number(id4) != 0)
    var avatar_gap = Number(id4) != 0 ? 5 : 10

    if (Number(id1) != 0)
    {
        $.CreatePanel("DOTAAvatarImage", AvatarNicknamePanel, "AvatarLeaderboard", { style: "width:32px;height:32px;vertical-align:center;", accountid: id1 });
        if (full_data.hero_1)
        {
            let hero_icon = $.CreatePanel("Panel", AvatarNicknamePanel, "");
            hero_icon.AddClass("hero_icon");
            hero_icon.style.backgroundImage = 'url( "file://{images}/heroes/icons/' + full_data.hero_1 + '.png" );'
            hero_icon.style.backgroundSize = "100%"
        }
        if (Number(id2) == 0)
        {
            $.CreatePanel("DOTAUserName", AvatarNicknamePanel, "NickNameLeaderboard", { style: "vertical-align:center;margin-left:10px;height: 20px;", accountid: id1 });
        }
    }
    if (Number(id2) != 0)
    {
        $.CreatePanel("DOTAAvatarImage", AvatarNicknamePanel, "AvatarLeaderboard", { style: "width:32px;height:32px;vertical-align:center;margin-left:" + avatar_gap + "px;", accountid: id2 });
        if (full_data.hero_2)
        {
            let hero_icon = $.CreatePanel("Panel", AvatarNicknamePanel, "");
            hero_icon.AddClass("hero_icon");
            hero_icon.style.backgroundImage = 'url( "file://{images}/heroes/icons/' + full_data.hero_2 + '.png" );'
            hero_icon.style.backgroundSize = "100%"
        }
    }
    if (Number(id3) != 0)
    {
        $.CreatePanel("DOTAAvatarImage", AvatarNicknamePanel, "AvatarLeaderboard", { style: "width:32px;height:32px;vertical-align:center;margin-left:" + avatar_gap + "px;", accountid: id3 });
        if (full_data.hero_3)
        {
            let hero_icon = $.CreatePanel("Panel", AvatarNicknamePanel, "");
            hero_icon.AddClass("hero_icon");
            hero_icon.style.backgroundImage = 'url( "file://{images}/heroes/icons/' + full_data.hero_3 + '.png" );'
            hero_icon.style.backgroundSize = "100%"
        }
    }
    if (Number(id4) != 0)
    {
       $.CreatePanel("DOTAAvatarImage", AvatarNicknamePanel, "AvatarLeaderboard", { style: "width:32px;height:32px;vertical-align:center;margin-left:" + avatar_gap + "px;", accountid: id4 });
       if (full_data.hero_4)
        {
            let hero_icon = $.CreatePanel("Panel", AvatarNicknamePanel, "");
            hero_icon.AddClass("hero_icon");
            hero_icon.style.backgroundImage = 'url( "file://{images}/heroes/icons/' + full_data.hero_4 + '.png" );'
            hero_icon.style.backgroundSize = "100%"
        }
    }

    CreateArenaResult(Line, full_data)
    CreateArenaTime(Line, full_data)

    CreateSeasonRewards(Line, board, Number(number))
}

function ChangeRanKingPanel(mode)
{
    CURRENT_RANKING_TAB = mode
    $("#PanelButPVE").SetHasClass("ButtonRatActive", false)
    $("#PanelButPVP").SetHasClass("ButtonRatActive", false)
    $("#PvpInfo").style.visibility = "collapse"
    $("#PveInfo").style.visibility = "collapse"
    if (mode == "pvp")
    {
        $("#PanelButPVP").SetHasClass("ButtonRatActive", true)
        $("#PvpInfo").style.visibility = "visible"
    }
    if (mode == "pve")
    {
        $("#PanelButPVE").SetHasClass("ButtonRatActive", true)
        $("#PveInfo").style.visibility = "visible"
    }
    BuildVisibleLeaderboard()
}

function ChangeRankingPve(mode)
{
    CURRENT_PVE_TAB = mode
    for (let i = 0; i < ARENA_LEADERBOARD_TABS.length; i++)
    {
        $("#PanelButPVE_" + ARENA_LEADERBOARD_TABS[i]).SetHasClass("ButtonRatActive", false)
        $("#PlayersTablePVE" + ARENA_LEADERBOARD_TABS[i]).visible = false
    }
    $("#PanelButPVE_"+mode).SetHasClass("ButtonRatActive", true)
    $("#PlayersTablePVE"+mode).visible = true
    UpdateLocalArenaResult()
    BuildVisibleLeaderboard()
}

function SetTextInfo(panel, text)
{
    panel.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowTextTooltip', panel, $.Localize("#" + text)); });
        
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideTextTooltip', panel);
    });       
}

var REWARD_CURRENCY_ICONS =
{
    coins: "wodacoin",
    crystals: "wodacrystal",
    boss_souls: "boss_soul",
}

function GetSeasonRewardTier(board, rank)
{
    let rewards = TOP_RATING_LIST["season_rewards"]
    let tiers = rewards && rewards.boards && rewards.boards[board]
    if (!tiers)
    {
        return null
    }
    for (let i in tiers)
    {
        let tier = tiers[i]
        if (tier && rank >= Number(tier.from) && rank <= Number(tier.to))
        {
            return tier
        }
    }
    return null
}

function CreateSeasonRewards(Line, board, rank)
{
    let rewards_list = $.CreatePanel("Panel", Line, "");
    rewards_list.AddClass("rewards_list");

    let tier = GetSeasonRewardTier(board, rank)
    if (!tier)
    {
        return rewards_list
    }

    let rewards_inner = $.CreatePanel("Panel", rewards_list, "");
    rewards_inner.AddClass("rewards_inner");

    for (let i in tier.items)
    {
        CreateRewardItem(rewards_inner, tier.items[i])
    }
    for (let i in tier.currencies)
    {
        CreateRewardCurrency(rewards_inner, tier.currencies[i])
    }
    return rewards_list
}

function FindLeaderboardShopRow(item_id)
{
    let key = String(item_id)
    if (!(key in LEADERBOARD_SHOP_ROWS))
    {
        let found = FindShopItemRow(item_id)
        LEADERBOARD_SHOP_ROWS[key] = found ? {
            row: found.row,
            icon: GetShopRowIcon(found.row),
            tooltip: {
                item_id: item_id,
                name_key: found.row[4],
                desc_key: found.row[4] + "_description",
                rarity: GetShopRowRarity(found.row),
                icon: GetShopRowIcon(found.row),
            },
        } : null
    }
    return LEADERBOARD_SHOP_ROWS[key]
}

function CreateRewardItem(parent, reward)
{
    let found = reward && FindLeaderboardShopRow(reward.id)
    if (!found)
    {
        return
    }
    let item_icon = $.CreatePanel("Panel", parent, "");
    item_icon.AddClass("reward_item");
    item_icon.style.backgroundImage = 'url("' + found.icon + '")';
    item_icon.style.backgroundSize = "100%"
    SetItemTooltip(item_icon, found.tooltip)
    let open_preview = GameUI.CustomUIConfig().OpenCheckoutItemPreview
    if (open_preview)
    {
        open_preview(item_icon, found.row, true)
    }
}

function CreateRewardCurrency(parent, reward)
{
    let icon_name = reward && REWARD_CURRENCY_ICONS[reward.id]
    if (!icon_name)
    {
        return
    }
    let money_reward = $.CreatePanel("Panel", parent, "");
    money_reward.AddClass("money_reward");

    SetTextInfo(money_reward, "coin_reward_information_leaderboard")

    let coin_icon = $.CreatePanel("Panel", money_reward, "");
    coin_icon.AddClass("coin_icon");
    coin_icon.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + icon_name + '.png")';
    coin_icon.style.backgroundSize = "100%"

    let coin_number = $.CreatePanel("Label", money_reward, "");
    coin_number.AddClass("coin_number");
    coin_number.AddClass("reward_" + reward.id);
    coin_number.text = String(reward.count);
}

/*
function CreateHeroPanel(number, hero_data)
{
    let hero_name = hero_data.hero
    let player_id = hero_data.player_id
    let players = hero_data.players || {}
    let has_more_players = Object.keys(players).length > 1

    var HeroBlock = $.CreatePanel("Panel", $("#PlayersTablePVEhero"), "");
    HeroBlock.AddClass("HeroSoloBlock");

    var Line = $.CreatePanel("Panel", HeroBlock, "");
    Line.AddClass("LinePlayer");
    Line.AddClass("HeroSoloLine");

    var RankPanel = $.CreatePanel("Panel", Line, "");
    RankPanel.AddClass("RankPanel");

    var RankImage = $.CreatePanel("Panel", RankPanel, "");
    RankImage.AddClass("RankImage");

    let index = number >= 1 && number <= 10 ? 1 : number <= 50 ? 2 : number <= 100 ? 3 : null;
    if (index) 
    { 
        RankImage.style.backgroundImage = `url("file://{images}/custom_game/leaderboard/rating${index}.png")`;
        RankImage.style.backgroundSize = "100%" 
    }
    else 
    {
        RankImage.style.opacity = 1;
    }

    var Rank_number = $.CreatePanel("Label", RankImage, "");
    Rank_number.AddClass("Rank_number");
    Rank_number.text = number

    var AvatarNicknamePanel = $.CreatePanel("Panel", Line, "");
    AvatarNicknamePanel.AddClass("AvatarNicknamePanel");
    $.CreatePanel("DOTAAvatarImage", AvatarNicknamePanel, "AvatarLeaderboard", { style: "width:32px;height:32px;vertical-align:center;", accountid: player_id });

    let hero_icon = $.CreatePanel("Panel", AvatarNicknamePanel, "");
    hero_icon.AddClass("hero_icon");
    hero_icon.style.backgroundImage = 'url( "file://{images}/heroes/icons/' + hero_name + '.png" );'
    hero_icon.style.backgroundSize = "100%"

    $.CreatePanel("DOTAUserName", AvatarNicknamePanel, "NickNameLeaderboard", { style: "vertical-align:center;margin-left:10px;height: 20px;", accountid: player_id });

    CreateArenaResult(Line, hero_data)
    CreateArenaTime(Line, hero_data)

    CreateSeasonRewards(Line, "hero_best", 1)

    if (has_more_players)
    {
        HeroBlock.AddClass("HeroSoloExpandable");
        Line.SetPanelEvent('onactivate', function() { ToggleHeroSoloPlayers(HeroBlock, players, hero_name); });

        let expand = $.CreatePanel("Panel", Line, "");
        expand.AddClass("HeroSoloExpand");
        expand.hittest = false;

        let expand_arrow = $.CreatePanel("Panel", expand, "");
        expand_arrow.AddClass("HeroSoloArrow");
        expand_arrow.hittest = false;
    }
}

function ToggleHeroSoloPlayers(hero_block, players, hero_name)
{
    let players_panel = hero_block.hero_players_panel;
    if (!players_panel)
    {
        players_panel = $.CreatePanel("Panel", hero_block, "");
        players_panel.AddClass("HeroSoloPlayers");
        players_panel.visible = false;
        hero_block.hero_players_panel = players_panel;
        CreateHeroSoloPlayers(players, players_panel, hero_name);
    }

    let should_open = !players_panel.visible;
    if (OpenedHeroSoloPanel && OpenedHeroSoloPanel != players_panel)
    {
        OpenedHeroSoloPanel.visible = false;
        OpenedHeroSoloPanel.GetParent().SetHasClass("HeroSoloOpen", false);
    }

    players_panel.visible = should_open;
    hero_block.SetHasClass("HeroSoloOpen", should_open);
    OpenedHeroSoloPanel = should_open ? players_panel : null;
}

function CreateHeroSoloPlayers(players, panel, hero_name)
{
    if (!players)
    {
        return;
    }

    let players_list = [];
    for (let key in players)
    {
        if (players[key])
        {
            players_list.push(players[key]);
        }
    }

    players_list.shift();
    players_list.sort(CompareArenaResults);

    for (let i = 0; i < players_list.length && i + 1 < ARENA_HERO_TOP_PLAYERS; i++)
    {
        CreateHeroSoloPlayer(i + 2, players_list[i], panel, hero_name);
    }
}

function CreateHeroSoloPlayer(number, player_data, panel, hero_name)
{
    let steam_id = player_data.player_id
    var Line = $.CreatePanel("Panel", panel, "");
    Line.AddClass("LinePlayer");
    Line.AddClass("HeroSoloPlayerLine");

    var RankPanel = $.CreatePanel("Panel", Line, "");
    RankPanel.AddClass("RankPanel");

    var RankImage = $.CreatePanel("Panel", RankPanel, "");
    RankImage.AddClass("RankImage");
    RankImage.style.opacity = 1;

    var Rank_number = $.CreatePanel("Label", RankImage, "");
    Rank_number.AddClass("Rank_number");
    Rank_number.text = number;

    var AvatarNicknamePanel = $.CreatePanel("Panel", Line, "");
    AvatarNicknamePanel.AddClass("AvatarNicknamePanel");
    $.CreatePanel("DOTAAvatarImage", AvatarNicknamePanel, "AvatarLeaderboard", { style: "width:32px;height:32px;vertical-align:center;", accountid: steam_id });
    let hero_icon = $.CreatePanel("Panel", AvatarNicknamePanel, "");
    hero_icon.AddClass("hero_icon");
    hero_icon.style.backgroundImage = 'url( "file://{images}/heroes/icons/' + hero_name + '.png" );'
    hero_icon.style.backgroundSize = "100%"
    $.CreatePanel("DOTAUserName", AvatarNicknamePanel, "NickNameLeaderboard", { style: "vertical-align:center;margin-left:10px;height: 20px;", accountid: steam_id });

    CreateArenaResult(Line, player_data)
    CreateArenaTime(Line, player_data)
    CreateSeasonRewards(Line, "hero_best", number)
}
*/

// tp_effect_5
// tp_effect_6