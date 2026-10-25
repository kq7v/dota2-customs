--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


// shop variables
var first_time = false;
var PROMO_COOLDOWN = false
var timer_loading = -1
var current_tab
var current_tab_shop = "ShopMenuButtonPlus"
var PLAYER_DATA = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
var QUEST_DATA_TABLE = Game.GetCustomTable("quest_data", "quest_data")
var quest_tab_by_id = {}
var OTHER_PLAYER_DATA = {}
var video_preview = null
var inventory_items_map_cache = null
var items_counter_cache = {}
var profile_items_percent_cache = null
var rune_spin_in_progress = false
var rune_pending_result = null
var rune_spin_timeout = -1
var rune_spin_skipped = false
var rune_spin_track = null
var rune_spin_stop_offset = 0
var rune_equip_update_pending = false
var RUNE_SPIN_COST = 250
var RUNE_MAX_LEVEL = 5
var RUNE_MAX_EQUIPPED = 5
var RUNE_BUY_COST = 75
var RUNE_SLOT_BONUS_DIFFICULTY = 5
var RUNE_ROULETTE_VIEWPORT_WIDTH = 1100
var RUNE_ROULETTE_ITEM_WIDTH = 104
var RUNE_ROULETTE_ITEM_MARGIN_LEFT = -4
var RUNE_ROULETTE_ITEM_STEP = 112
var RUNE_CHEST_COST = 250
var RUNE_CHEST_BUY_MAX = 10
var RUNE_CARD_MAX_LAYOUT = "wide_bar"
var RUNE_GOLD_THEME = true
var rune_buy_confirm_id = null
var CHEST_PRAYER_LIST =
[
    {id: "normal", name_key: "#shop_chest_prayer_normal", currency: "crystal", cost: 10},
    {id: "boss", name_key: "#shop_chest_prayer_boss", currency: "soul", cost: 1},
]
var chest_prayer_selected = "normal"
var SUBSCRIPTION_PLUS_REWARDS = ["subscription_plus_reward_1", "subscription_plus_reward_2", "subscription_plus_reward_3", "subscription_plus_reward_4"]
var SUBSCRIPTION_PLUS_INSTANT = ["subscription_plus_reward_5"]
var SUBSCRIPTION_PREMIUM_REWARDS = ["subscription_premium_reward_1", "subscription_premium_reward_2", "subscription_premium_reward_3"]
var SUBSCRIPTION_PREMIUM_INSTANT = ["subscription_premium_reward_4", "subscription_premium_reward_5"]
var talent_buy_confirm_row = null
var smelter_melt_in_progress = false
var SMELTER_EXP_BY_RARITY = {E: 15, C: 50, B: 100, A: 150, S: 500, R: 1000, U: 5}
var SMELTER_RUNE_EXP = 25
var SMELTER_MAX_LEVEL = 100
var SMELTER_LEVEL_EXP_STEP = 50
// votes variables
var HERO_VOTES_TABLE_MAX_COUNT = 450000 // max count votes

if (!/^(arena|1_player|4_player)$/.test(Game.GetMapInfo().map_display_name))
{
    $("#DonateButtonRunes").visible = false
}

Game.SubscribeCustomTableListener("woda_player_data", UpdatePlayerData );
function UpdatePlayerData(table, key, data) 
{
	if (table == "woda_player_data")
	{
        if (key == String(Players.GetLocalPlayer()) || key == Players.GetLocalPlayer())
        {
            PLAYER_DATA = data;
            ResetItemsProgressCache()
            if (talent_buy_confirm_row && $("#BuyItemPanelMain").style.visibility == "visible")
            {
                RefreshTalentPointBuyConfirm()
            }
            if ($("#DonateShopWindow").BHasClass("setvisible"))
            {
                if (current_tab == "ProfileWindow")
                {
                    InitData()
                }
                else if (current_tab == "HeroesWindow")
                {
                    RefreshHeroTabData()
                }
                else if (current_tab == "ShopWindow" && current_tab_shop == "ShopMenuButtonHeroVotes")
                {
                    InitHeroVotes()
                }
                else if (current_tab == "ShopWindow")
                {
                    shop_visual_update_pending = false
                    RefreshShopItemsVisual()
                    RefreshShopItemsCounter()
                }
                else if (current_tab == "AchievementsWindow")
                {
                    RefreshAchievementsVisual()
                }
                else if (current_tab == "ChestWindow")
                {
                    if (chest_stage_panel && chest_stage_panel.IsValid())
                    {
                        RefreshChestPool()
                        UpdateChestOpenButtons()
                    }
                    else if (!chest_spin_in_progress)
                    {
                        InitChest()
                    }
                }
                else if (current_tab == "SmelterWindow")
                {
                    if (!smelter_melt_in_progress)
                    {
                        if ($("#SmelterList"))
                        {
                            RefreshSmelterStorage()
                            UpdateSmelterProgress()
                        }
                        else
                        {
                            InitSmelter()
                        }
                    }
                }
                else if (current_tab == "RunesWindow")
                {
                    if (rune_equip_update_pending)
                    {
                        rune_equip_update_pending = false
                        RefreshRunesVisualOnly()
                    }
                    else if (!rune_spin_in_progress)
                    {
                        RefreshRunesListOnly()
                        UpdateRuneSpinButton()
                    }
                }
                else
                {
                    InitData()
                }
            }
            UpdateTopData()
            CheckoutEveryReward()
            UpdateStoreBackground()
        }
	}
}

var donate_window_hide_schedule = -1

function SetDonateWindowVisible(visible)
{
    var donate_window = $("#DonateShopWindow")
    if (donate_window_hide_schedule != -1)
    {
        $.CancelScheduled(donate_window_hide_schedule)
        donate_window_hide_schedule = -1
    }
    if (visible)
    {
        donate_window.style.visibility = "visible"
    }
    donate_window.SetHasClass("setvisible", visible)
    if (!visible)
    {
        donate_window_hide_schedule = $.Schedule(0.25, function()
        {
            donate_window_hide_schedule = -1
            if (!donate_window.BHasClass("setvisible"))
            {
                donate_window.style.visibility = "collapse"
            }
        })
    }
}

$("#DonateShopWindow").style.visibility = "collapse"

function ToggleDonateButton(tab, button) 
{
    if (!first_time)
    {
        first_time = true;
        InitShopMenu()
        InitData()
        UpdateStoreBackground()
        SwitchTab(tab, button)
    }
    if (current_tab != tab)
    {
        SwitchTab(tab, button)
        SetDonateWindowVisible(true)
    }
    else
    {
        SetDonateWindowVisible(!$("#DonateShopWindow").BHasClass("setvisible"))
        if (!$("#DonateShopWindow").BHasClass("setvisible"))
        {
            GameEvents.SendCustomGameEventToServer_custom( "update_player_items_list_server", {} );
        }
    }
    if (GameUI.CustomUIConfig().CloseBattlePassGlobal)
    {
        GameUI.CustomUIConfig().CloseBattlePassGlobal()
    }
    UpdatePlayerCoinBase()
}

function ToggleDonateButtonClose() 
{
    SetDonateWindowVisible(false)
    GameEvents.SendCustomGameEventToServer_custom( "update_player_items_list_server", {} );
}

GameUI.CustomUIConfig().CloseShopGlobal = ToggleDonateButtonClose

function InitData()
{
    TopMenuInfo_Load()
    var localplayer_data = PLAYER_DATA;
    if (localplayer_data)
    {
        TopMenuInfo_Find("CoinLabelCount").text = String(localplayer_data.coins)
        TopMenuInfo_Find("CrystalLabelCount").text = String(localplayer_data.crystals || 0)
        TopMenuInfo_Find("WodaplusLabelCount").text = String(localplayer_data.plus_days)
        TopMenuInfo_Find("WodaPremiumLabelCount").text = String(localplayer_data.premium_days || 0)
        TopMenuInfo_Find("BossSoulsLabelCount").text = String(localplayer_data.boss_souls || 0)
        TopMenuInfo_Find("BattlePassLabelCount").text = String(localplayer_data.battlepass_level_2026)
        TopMenuInfo_Find("DoubleTokensLabelCount").text = String(localplayer_data.double_tokens)
        Profile_Refresh(localplayer_data)
        if (localplayer_data.games >= 1 || Game.IsInToolsMode())
        {
            if ($("#ShopMenuButtonCurrency"))
            {
                $("#ShopMenuButtonCurrency").style.visibility = "visible"
            }
        }
        let items_collection_percent = GetPercentItemsInProfile()
        $("#ItemsCollectionLiner").style.width = items_collection_percent + "%"
        $("#ItemsCollectionPercent").text = items_collection_percent + "%"
        $("#TestAccountResetPanel").SetHasClass("Visible", Game.IsInToolsMode())
    }

    UpdateFreeReward()
    SetFreeRewardTooltip()
    TopMenuInfo_SetTooltips()
}

function UpdateTopData()
{
    TopMenuInfo_Load()
    var localplayer_data = PLAYER_DATA;
    if (localplayer_data)
    {
        Profile_UpdateAccount(localplayer_data)
        TopMenuInfo_Find("CrystalLabelCount").text = String(localplayer_data.crystals || 0)
        TopMenuInfo_Find("WodaplusLabelCount").text = String(localplayer_data.plus_days)
        TopMenuInfo_Find("WodaPremiumLabelCount").text = String(localplayer_data.premium_days || 0)
        TopMenuInfo_Find("BossSoulsLabelCount").text = String(localplayer_data.boss_souls || 0)
        TopMenuInfo_Find("BattlePassLabelCount").text = String(localplayer_data.battlepass_level_2026)
        TopMenuInfo_Find("DoubleTokensLabelCount").text = String(localplayer_data.double_tokens)
    }
    UpdateRunesChestBadge()
}

function GetBossSoulsCount()
{
    if (!PLAYER_DATA) { return 0 }
    return Math.max(0, Number(PLAYER_DATA.boss_souls) || 0)
}

function OnBossSoulDrop(data)
{
    if (PLAYER_DATA && data && data.boss_souls != null)
    {
        PLAYER_DATA.boss_souls = Number(data.boss_souls) || 0
    }
    var label = TopMenuInfo_Find("BossSoulsLabelCount")
    if (label)
    {
        label.text = String(GetBossSoulsCount())
    }
    if (current_tab == "ChestWindow")
    {
        UpdateChestOpenButtons()
    }
}

GameEvents.Subscribe_custom("woda_boss_soul_drop", OnBossSoulDrop)

function GetRuneChestsCount()
{
    if (!PLAYER_DATA) { return 0 }
    return Math.max(0, Number(PLAYER_DATA.rune_chests) || 0)
}

function UpdateRunesChestBadge()
{
    SetMenuCountBadge("MenuRunesChestCount", GetRuneChestsCount())
    SetMenuCountBadge("MenuSmelterCount", GetStorageTotalCount())
    SetMenuCountBadge("MenuAchievementsCount", GetClaimableQuestCount())
}

function SetMenuCountBadge(id, count)
{
    var badge = $("#" + id)
    if (!badge) { return }
    count = Math.max(0, Number(count) || 0)
    badge.text = String(count)
    badge.SetHasClass("Visible", count > 0)
}

function GetStorageTotalCount()
{
    if (!PLAYER_DATA) { return 0 }
    var total = 0
    var buckets = [PLAYER_DATA.storage_items, PLAYER_DATA.storage_runes]
    for (var b = 0; b < buckets.length; b++)
    {
        var storage = buckets[b]
        if (!storage) { continue }
        for (var key in storage)
        {
            total += Math.max(0, Number(storage[key]) || 0)
        }
    }
    return total
}

function GetClaimableQuestCount()
{
    if (typeof GetAllQuestsList !== "function") { return 0 }
    var quests = GetAllQuestsList()
    var count = 0
    for (var i = 0; i < quests.length; i++)
    {
        if (GetQuestState(quests[i]) == 0)
        {
            count++
        }
    }
    return count
}

GameUI.CustomUIConfig().GoToSiteStore = function(category)
{
    var localplayer_data = PLAYER_DATA;
    if (localplayer_data.games >= 1 || Game.IsInToolsMode())
    {
        xsolla_store_category = category || null
        XsollaOpenProducts()
    }
}

// Обновление бесплатной награды
function UpdateFreeReward(fast)
{
    let panel = $("#FreeReward")
    if (fast)
    {
        panel.SetHasClass("free_reward_accepted", true)
        panel.SetHasClass("GetReward", false)
        panel.SetPanelEvent("onactivate", function() {} );
    } 
    else 
    {
        var localplayer_data = PLAYER_DATA;
        if (localplayer_data)
        {
            if (localplayer_data.free_reward == 1)
            {
                panel.SetHasClass("free_reward_accepted", true)
                panel.SetHasClass("GetReward", false)
                panel.SetPanelEvent("onactivate", function() {} );
            } 
            else 
            {
                panel.SetHasClass("free_reward_accepted", false)
                panel.SetHasClass("GetReward", true)
                panel.SetPanelEvent("onactivate", function() 
                { 
                    GetFreeReward()
                });
            }
        }
    }
    CheckoutEveryReward(fast)
}

function GetFreeReward()
{
    LoadingCreated()
    GameEvents.SendCustomGameEventToServer_custom( "donate_shop_get_free_reward", {} );
    UpdateFreeReward(true)
    $.Schedule( 0.5, function()
    {
        UpdateFreeReward()
    })
}

function InitShopMenu()
{
    let ShopMenu = $("#ShopMenu")
    for (menu_id in SHOP_BUTTONS_CATEGORY)
    {
        let menu_info = SHOP_BUTTONS_CATEGORY[menu_id]
        CreateMenuButton(ShopMenu, menu_info)
    }
}

function CreateMenuButton(parent, info)
{
    let ShopMenuButton = $.CreatePanel("Panel", parent, info[0])
    ShopMenuButton.AddClass("ShopMenuButton")
    if (info[2] != null)
    {
        ShopMenuButton.AddClass(info[2])
    }
    let ShopMenuButtonLabel = $.CreatePanel("Label", ShopMenuButton, "")
    ShopMenuButtonLabel.AddClass("ShopMenuButtonLabel")
    ShopMenuButtonLabel.text = $.Localize("#"+info[1])
    if (info[0] == "ShopMenuButtonCurrency")
    {
        ShopMenuButton.SetPanelEvent("onactivate", function()
        {
            GameUI.CustomUIConfig().GoToSiteStore('coins')
        });
    }
    else
    {
        ShopMenuButton.SetPanelEvent("onactivate", function() 
        { 
            SwitchTabShop(info[0])
        });
    }
}

function SwitchTabShop(button) 
{
    if (current_tab_shop != button)
    {
        Game.EmitSound("ui_topmenu_select")
    }
    for (menu_panel of $("#ShopMenu").Children())
    {
        menu_panel.SetHasClass( "DonateNewMenuButtonSelected", false );
    }
    current_tab_shop = button
    $("#" + button).SetHasClass( "DonateNewMenuButtonSelected", true );
    var is_plus = button == "ShopMenuButtonWodaPlus"
    var is_votes = button == "ShopMenuButtonHeroVotes"
    $("#ShopItemsWindow").style.visibility = (is_plus || is_votes) ? "collapse" : "visible"
    $("#ShopInfoBuyItemsCounter").style.visibility = (is_plus || is_votes) ? "collapse" : "visible"
    $("#ShopPlusWindow").style.visibility = is_plus ? "visible" : "collapse"
    $("#HeroVotesWindow").style.visibility = is_votes ? "visible" : "collapse"
    if (is_plus)
    {
        InitPlusWindow()
    }
    else if (is_votes)
    {
        InitHeroVotes()
    }
    else
    {
        InitItems()
        $('#ShopItemsWindow').ScrollToTop()
    }
}

function SwitchTab(tab, button) 
{
    if (current_tab != tab)
    {
        Game.EmitSound("ui_topmenu_select")
    }

    current_tab = tab

    // collapse panels
    $("#ProfileWindow").style.visibility = "collapse";
    $("#HeroesWindow").style.visibility = "collapse";
    $("#ShopWindow").style.visibility = "collapse";
    $("#AchievementsWindow").style.visibility = "collapse";
    $("#RunesWindow").style.visibility = "collapse";
    $("#ChestWindow").style.visibility = "collapse";
    $("#SmelterWindow").style.visibility = "collapse";

    // styles
    $("#MenuProfie").SetHasClass( "DonateNewMenuButtonSelected2", false );
    $("#MenuAchievements").SetHasClass( "DonateNewMenuButtonSelected2", false );
    $("#MenuHeroes").SetHasClass( "DonateNewMenuButtonSelected2", false );
    $("#MenuShop").SetHasClass( "DonateNewMenuButtonSelected2", false );
    $("#MenuRunes").SetHasClass( "DonateNewMenuButtonSelected2", false );
    $("#MenuChest").SetHasClass( "DonateNewMenuButtonSelected2", false );
    $("#MenuSmelter").SetHasClass( "DonateNewMenuButtonSelected2", false );

    if (tab == "ProfileWindow")
    {
        InitData()
    }
    else if (tab == "HeroesWindow")
    {
        InitHeroes()
    }
    else if (tab == "ShopWindow")
    {
        if (current_tab_shop == "ShopMenuButtonHeroVotes")
        {
            InitHeroVotes()
        }
        else
        {
            InitItems()
        }
    }
    else if (tab == "AchievementsWindow")
    {
        InitAchievements()
    }
    else if (tab == "RunesWindow")
    {
        InitRunes()
    }
    else if (tab == "ChestWindow")
    {
        InitChest()
    }
    else if (tab == "SmelterWindow")
    {
        InitSmelter()
    }

    $("#" + button).SetHasClass( "DonateNewMenuButtonSelected2", true );
    $("#" + tab).style.visibility = "visible";
}

function InitItems() 
{
    if (current_tab_shop == "ShopMenuButtonWodaPlus")
    {
        return
    }
    let table_items = Items_plus
    let updater = false
    $('#ShopItemsWindow').RemoveAndDeleteChildren()
    if (current_tab_shop == "ShopMenuButtonPets")
    {
        table_items = Items_pets
        updater = true
    }
    if (current_tab_shop == "ShopMenuButtonEmblems")
    {
        table_items = Items_emblems
        updater = true
    }
    if (current_tab_shop == "ShopMenuButtonHeads")
    {
        table_items = Items_heads
        updater = true
    }
    if (current_tab_shop == "ShopMenuButtonTips")
    {
        table_items = Items_tips
        updater = true
    }
    if (current_tab_shop == "ShopMenuButtonFive")
    {
        table_items = Items_Five
        updater = true
    }
    if (current_tab_shop == "ShopMenuButtonBG")
    {
        table_items = Items_Backround
        updater = true
    }
    if (current_tab_shop == "ShopMenuButtonTeleport")
    {
        table_items = Items_tpscroll
        updater = true
    }
    if (current_tab_shop == "ShopMenuButtonUpgrades")
    {
        table_items = Items_upgrades
    }
    let how_much_items = HowMuchItemsInTab(table_items)
    if (!updater)
    {
        $("#ShopInfoBuyItemsCounter").text = ""
    }
    else
    {
        $("#ShopInfoBuyItemsCounter").text = how_much_items[1] + " / " + how_much_items[0]
    }
    if (shop_arena_filter_tab != current_tab_shop)
    {
        shop_arena_filter_tab = current_tab_shop
        shop_arena_filter = "all"
    }
    var arena_stats = updater ? GetShopArenaStats(table_items) : []
    if (arena_stats.indexOf(shop_arena_filter) == -1)
    {
        shop_arena_filter = "all"
    }
    if (arena_stats.length > 0)
    {
        CreateShopArenaFilters($('#ShopItemsWindow'), arena_stats)
    }
    var order = []
    for (var i = 0; i < table_items.length; i++) 
    {
        if (ShopItemMatchesArenaFilter(table_items[i]))
        {
            order.push(i)
        }
    }
    if (updater)
    {
        order.sort(function(a, b)
        {
            return (HasItemInventory(table_items[b][0]) ? 1 : 0) - (HasItemInventory(table_items[a][0]) ? 1 : 0)
        })
    }
    for (var k = 0; k < order.length; k++) 
    {
        CreateItemInShop($('#ShopItemsWindow'), table_items, order[k])
    }
}

var shop_arena_filter = "all"
var shop_arena_filter_tab = null

function GetShopArenaStats(table_items)
{
    var seen = {}
    var stats = []
    for (var i = 0; i < table_items.length; i++)
    {
        var bonus = ITEM_ARENA_BONUS[String(table_items[i][0])]
        if (bonus && !seen[bonus[0]])
        {
            seen[bonus[0]] = true
            stats.push(bonus[0])
        }
    }
    stats.sort(function(a, b)
    {
        return ARENA_STAT_ORDER.indexOf(a) - ARENA_STAT_ORDER.indexOf(b)
    })
    return stats
}

function ShopItemMatchesArenaFilter(item)
{
    if (shop_arena_filter == "all") { return true }
    var bonus = ITEM_ARENA_BONUS[String(item[0])]
    return bonus != null && bonus[0] == shop_arena_filter
}

function CreateShopArenaFilters(parent, stats)
{
    var bar = $.CreatePanel("Panel", parent, "ShopArenaFilters")
    bar.AddClass("AchievementsFilters")
    bar.AddClass("ShopArenaFilters")
    CreateShopArenaFilterButton(bar, "all", $.Localize("#achievements_filter_all"))
    for (var i = 0; i < stats.length; i++)
    {
        CreateShopArenaFilterButton(bar, stats[i], $.Localize("#shop_filter_" + stats[i]))
    }
}

function CreateShopArenaFilterButton(bar, filter, text)
{
    var button = $.CreatePanel("Panel", bar, "")
    button.AddClass("AchievementsFilterButton")
    button.SetHasClass("Active", shop_arena_filter == filter)
    var label = $.CreatePanel("Label", button, "")
    label.AddClass("AchievementsFilterLabel")
    label.text = text
    button.SetPanelEvent("onactivate", function()
    {
        if (shop_arena_filter == filter) { return }
        shop_arena_filter = filter
        Game.EmitSound("ui_topmenu_select")
        InitItems()
        $("#ShopItemsWindow").ScrollToTop()
    })
}

function IsShopItemNew(item_id)
{
    if (typeof SHOP_NEW_ITEMS === "undefined" || item_id === undefined || item_id === null) { return false }
    var date = SHOP_NEW_ITEMS[String(item_id)]
    if (!date) { return false }
    var parts = String(date).split("-")
    var start = Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
    if (isNaN(start)) { return false }
    return Date.now() < start + SHOP_NEW_ITEMS_DAYS * 86400000
}

function AddShopNewBadge(panel, item_id)
{
    if (!IsShopItemNew(item_id)) { return }
    var badge = $.CreatePanel("Label", panel, "")
    badge.AddClass("MenuCountBadge")
    badge.AddClass("MenuCountBadgeBlue")
    badge.AddClass("ShopNewBadge")
    badge.AddClass("Visible")
    badge.hittest = false
    badge.text = "NEW"
}

function CreateItemInShop(panel, table, i)
{
    if (table[i][0] == "subscribe_plus_1" || table[i][0] == "battle_pass_1")
    {
        let close_item = true
        if (PLAYER_DATA && (PLAYER_DATA.games >= 1 || Game.IsInToolsMode()))
        {
            close_item = false
        }
        if (close_item) { return }
    }

    if (table[i][5] && !Game.IsInToolsMode() && !HasItemInventory(table[i][0])) { return }

    var Recom_item = $.CreatePanel("Panel", panel, GetShopItemPanelId(table[i][0]));
    Recom_item.AddClass("ItemShop");

    var ItemImage = $.CreatePanel("Panel", Recom_item, "");
    ItemImage.AddClass("ItemImage");

    if (table[i][4].indexOf("pet_") !== 0) 
    {
        ItemImage.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + table[i][3] + '.png")';
        ItemImage.style.backgroundSize = "100%"
    }
    else
    {
        ItemImage.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + table[i][0] + '.png")';
        ItemImage.style.backgroundSize = "100%"
    }
    if (GetShopItemType(table))
    {
        ApplyRarityGlow(ItemImage, GetShopRowRarity(table[i]))
        SetShopItemTooltip(Recom_item, table[i][0])
    }
    else if (FindShopItemRow(table[i][0]))
    {
        ApplyRarityGlow(ItemImage, GetItemRarityById(table[i][0]))
        SetShopItemTooltip(Recom_item, table[i][0])
    }
    ItemImage.SetHasClass("TipImage", GetShopItemType(table) == "Items_tips")
    AddShopNewBadge(Recom_item, table[i][0])

    var ItemNamePanels = $.CreatePanel("Panel", Recom_item, "ItemNamePanels");
    ItemNamePanels.AddClass("ItemNamePanels");

    var ItemName = $.CreatePanel("Label", ItemNamePanels, "ItemName");
    ItemName.AddClass("ItemName");
    ItemName.text = $.Localize( "#" + table[i][4] )

    if (IsUpgradeCounterItem(table[i][0]))
    {
        Recom_item.AddClass("HasCounter")

        var CounterBar = $.CreatePanel("Panel", Recom_item, "")
        CounterBar.AddClass("UpgradeCounterBar")

        var CounterFill = $.CreatePanel("Panel", CounterBar, "UpgradeCounterFill_" + table[i][0])
        CounterFill.AddClass("UpgradeCounterFill")

        var CounterLabel = $.CreatePanel("Label", CounterBar, "UpgradeCounterLabel_" + table[i][0])
        CounterLabel.AddClass("UpgradeCounterLabel")

        UpdateUpgradeCounterVisual(table[i][0])
    }

    var BuyItemPanel = $.CreatePanel("Panel", Recom_item, "BuyItemPanel");
    BuyItemPanel.AddClass("BuyItemPanel");

    var ItemPrice = $.CreatePanel("Panel", BuyItemPanel, "ItemPrice");
    ItemPrice.AddClass("ItemPrice");

    var PriceLabel = $.CreatePanel("Label", ItemPrice, "PriceLabel");
    PriceLabel.AddClass("PriceLabel");

    if (table[i][1] != "")
    {
        var PriceIcon = $.CreatePanel("Panel", ItemPrice, "PriceIcon");
    }

    if (HasItemInventory(table[i][0]) || IsUpgradeOwned(table[i][0]))
    {
        Recom_item.AddClass("Owned")
        if (PriceIcon)
        {
            PriceIcon.DeleteAsync( 0 );
        }
        var item_type = GetShopItemType(table)
        if (item_type)
        {
            SetShopItemActivateFunction(Recom_item, table[i], item_type)
            UpdateInventoryItemVisual(Recom_item, table[i], item_type)
        }
        else
        {
            Recom_item.SetPanelEvent("onactivate", function() {} );
            BuyItemPanel.style.saturation = "0"
            PriceLabel.text = $.Localize( "#shop_bought" )
        }
    }
    else
    {
        if (table[i][0] == "subscribe_plus_1" || table[i][0] == "battle_pass_1")
        {
            var site_category = table[i][0] == "battle_pass_1" ? "battlepass" : "plus"
            PriceLabel.text = $.Localize("#donate_button_leaderboard")
            Recom_item.SetPanelEvent("onactivate", function()
            {
                GameUI.CustomUIConfig().GoToSiteStore(site_category)
            });
        }
        else
        {
            PriceIcon.AddClass("PriceIcon" + table[i][1]);
            PriceLabel.text = $.Localize(table[i][2])
            SetItemBuyFunction(Recom_item, table[i])
            if (IsUpgradeCounterItem(table[i][0]))
            {
                var talent_row = table[i]
                Recom_item.SetPanelEvent("onactivate", function()
                {
                    OpenTalentPointBuyConfirm(talent_row)
                })
            }
        }
    }
}

function SetItemBuyFunction(panel, item_info, no_buy)
{
    panel.SetPanelEvent("onactivate", function() 
    {
        talent_buy_confirm_row = null
        rune_buy_confirm_id = null
        $("#BuyItemPanelInfo").RemoveAndDeleteChildren()
        $("#BuyItemPanelName").text = $.Localize( "#" + item_info[4] )

        var ItemImage = $.CreatePanel("Panel", $("#BuyItemPanelInfo"), "");
        ItemImage.AddClass("ItemImageBuy");
        ItemImage.SetHasClass("TipImage", item_info[3] == "tip")

        if (item_info[4].indexOf("background") === 0)
        {
            ItemImage.style.backgroundImage = 'url("' + Background_Images[item_info[0]] + '")';
            ItemImage.style.backgroundSize = "100%"
        }
        else if (item_info[4].indexOf("emblem_") === 0 || item_info[4].indexOf("five_") === 0 || item_info[4].indexOf("tp_effect") === 0)
        {
            ItemImage.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + item_info[3] + '_open.png")';
            ItemImage.style.backgroundSize = "100%"
            video_preview = $.CreatePanel("MoviePanel", ItemImage, "ItemPreview", { 
                src: "file://{resources}/videos/shop/" + item_info[3] + "_open.webm", 
                repeat:"true", 
                autoplay:"onload",
                style:"width: 100%;height: 100%;z-index:-1; opacity:1;transition-property:opacity;transition-duration:0.3s;saturation:1;brightness:1;" 
            });
        }
        else if (item_info[0] == "rune_chest_item")
        {
            ItemImage.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + item_info[3] + '_open.png")';
            ItemImage.style.backgroundSize = "100%"
        }
        else if (item_info[4].indexOf("pet_") !== 0)
        {
            ItemImage.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + item_info[3] + '_open.png")';
            ItemImage.style.backgroundSize = "100%"
        }
        else
        {
            ItemImage.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + item_info[0] + '_open.png")';
            ItemImage.style.backgroundSize = "100%"
        }

        $("#BuyItemPanelMain").SetHasClass("ProfileBGPreview", item_info[4].indexOf("background") == 0 || item_info[4].indexOf("emblem_") == 0 || item_info[4].indexOf("five_") == 0 || item_info[4].indexOf("tp_effect") == 0);
        $("#BuyItemPanelMain").SetHasClass("RunePanel", false)
        $("#BuyItemPanelMain").SetHasClass("RuneGold", false)

        var ItemInfoAndBuyButton = $.CreatePanel("Panel", $("#BuyItemPanelInfo"), "");
        ItemInfoAndBuyButton.AddClass("ItemInfoAndBuyButton");

        var ItemDescription = $.CreatePanel("Label", ItemInfoAndBuyButton, "");
        ItemDescription.html = true
        ItemDescription.AddClass("ItemDescription");
        ItemDescription.text = $.Localize( "#" + item_info[4]+"_description" )
        ItemDescription.html = true

        if (!no_buy)
        {
            var button_buy_item = $.CreatePanel("Panel", ItemInfoAndBuyButton, "");
            button_buy_item.AddClass("button_buy_item");

            var button_buy_item_center = $.CreatePanel("Panel", button_buy_item, "");
            button_buy_item_center.AddClass("button_buy_item_center");

            var button_buy_item_label = $.CreatePanel("Label", button_buy_item_center, "");
            button_buy_item_label.AddClass("button_buy_item_label");
            button_buy_item_label.text = String(item_info[2])

            var valuteicon = $.CreatePanel("Panel", button_buy_item_center, "");
            valuteicon.AddClass("valuteicon");
            valuteicon.style.backgroundImage = 'url("file://{images}/custom_game/shop/woda' + item_info[1] + '.png")';
            valuteicon.style.backgroundSize = "100%"

            button_buy_item.SetPanelEvent("onactivate", function()
            {
                BuyItemToServer(item_info);
                if (item_info[0] != "rune_chest_item")
                {
                    CloseBuyItemPanel();
                }
            });
        }

        $("#BuyItemPanelMain").style.visibility = "visible"
    }); 
}

GameUI.CustomUIConfig().OpenCheckoutItemPreview = SetItemBuyFunction

function CloseBuyItemPanel()
{
    rune_buy_confirm_id = null
    talent_buy_confirm_row = null
    $("#BuyItemPanelMain").style.visibility = "collapse"
    if (video_preview)
    {
        video_preview.DeleteAsync(0)
        video_preview = null
    }
}

function BuyItemToServer(item_info)
{
    var player_table = PLAYER_DATA
    if (item_info[0] == "rune_chest_item")
    {
        RequestRuneChestBuy(1)
        return
    }
    if (player_table)
    {
        if ((typeof player_table.coins !== 'undefined'))
        {
            if (item_info[1] == "crystal") 
            {
                GameEvents.SendCustomGameEventToServer_custom( "donate_shop_buy_item", {item_id : item_info[0], price : item_info[2], currency : item_info[1], } );
                LoadingCreated()
            }
            else if (item_info[1] == "coin") 
            {
                GameEvents.SendCustomGameEventToServer_custom( "donate_shop_buy_item", {item_id : item_info[0], price : item_info[2], currency : item_info[1], } );
                LoadingCreated()
            }
        }
    }
}

/////////////////////////////////
///// Герои
////////////////////////////////

 

function ShowHero(panel, hero, buy) 
{
    panel.SetPanelEvent('onmouseover', function()
    {
        if (panel.FindChild('portrait_' + hero))
        {
            return
        }
        let vid = $.CreatePanel("MoviePanel", panel, 'portrait_' + hero, {
            class: "hero_portrait_hover",
            src: "file://{resources}/videos/heroes/" + hero + ".webm",
            repeat: "true",
            hittest: "false",
            autoplay: "onload"
        });
    });
    panel.SetPanelEvent('onmouseout', function() {
        var children = panel.Children()
        for (var i = 0; i < children.length; i++)
        {
            if (children[i].id == 'portrait_' + hero)
            {
                children[i].DeleteAsync(0)
            }
        }
    })
}

/////////////////////////////////
///// Профиль
////////////////////////////////

function PromocodeUse()
{
    if (PROMO_COOLDOWN)
    {
        return
    }
    var promo = $("#PromoEntryID").text
    $("#PromoEntryID").text = ""
    PROMO_COOLDOWN = true
    $.Schedule( 2, function()
    {
        PROMO_COOLDOWN = false
    })
    if (promo == "") 
    {
        return
    }
    LoadingCreated()
    GameEvents.SendCustomGameEventToServer_custom( "donate_promocode", { promo : promo } );
}

/////////////////////////////////
///// Голосование
////////////////////////////////

var HERO_VOTES_PER_ROW = 9
var hero_votes_signature = ""

function InitHeroVotes()
{
    GameEvents.SendCustomGameEventToServer_custom( "donate_shop_get_hero_votes", {} );
}

GameEvents.Subscribe_custom( 'donate_shop_set_hero_votes', donate_shop_set_hero_votes );
function donate_shop_set_hero_votes(data)
{
    let list = $("#HeroListVotes1")
    if (!list) { return }
    let heroes_table = GenerateTableVotes(data)
    let heroesArray = [];
    for (let hero_id in HERO_VOTES_TABLE)
    {
        let heroName = HERO_VOTES_TABLE[hero_id];
        heroesArray.push({name: heroName, votes: heroes_table[heroName] || 0});
    }
    heroesArray.sort((a, b) => b.votes - a.votes);
    let signature = heroesArray.map((hero) => hero.name + ":" + hero.votes).join(",")
    if (signature == hero_votes_signature && list.GetChildCount() > 0) { return }
    hero_votes_signature = signature
    list.RemoveAndDeleteChildren()
    let row = null
    for (let i = 0; i < heroesArray.length; i++)
    {
        if (i % HERO_VOTES_PER_ROW == 0)
        {
            row = $.CreatePanel("Panel", list, "")
            row.AddClass("HeroVotesRow")
        }
        CreateHeroPanelVotes(row, heroesArray[i].name, heroesArray[i].votes);
    }
}

function GenerateTableVotes(heroes_votes)
{
    let vot_table = {}
    for (var i = 0; i <= Object.keys(heroes_votes).length; i++) 
    {
        if (heroes_votes[i])
        {
            vot_table[heroes_votes[i].hero_name] = heroes_votes[i].votes
        }
    }
    return vot_table
}

function CreateHeroPanelVotes(panel, hero_name, votes) 
{
    var HeroVoteMainPanel = $.CreatePanel("Panel", panel, "");
    HeroVoteMainPanel.AddClass("HeroVotePanel");

    var HeroImage = $.CreatePanel(`DOTAHeroImage`, HeroVoteMainPanel, 'portrait_' + hero_name, {scaling: "stretch-to-cover-preserve-aspect", heroname : String(hero_name), tabindex : "auto", class: "hero_portrait_hover_votes", heroimagestyle : "portrait"});
    ShowHero(HeroImage, hero_name) 

    let panel_votes_count = $.CreatePanel("Panel", HeroVoteMainPanel, "");
    panel_votes_count.AddClass("panel_votes_count")

    let panel_votes_count_background = $.CreatePanel("Panel", panel_votes_count, "");
    panel_votes_count_background.AddClass("panel_votes_count_background")

    let panel_votes_count_frontground = $.CreatePanel("Panel", panel_votes_count, "");
    panel_votes_count_frontground.AddClass("panel_votes_count_frontground")

    let panel_votes_count_label = $.CreatePanel("Label", panel_votes_count, "");
    panel_votes_count_label.AddClass("panel_votes_count_label")
    panel_votes_count_label.text = votes + " / " + HERO_VOTES_TABLE_MAX_COUNT

    var percent = ((HERO_VOTES_TABLE_MAX_COUNT-votes )*100)/HERO_VOTES_TABLE_MAX_COUNT
    if (percent >= 0)
    {
        panel_votes_count_frontground.style['width'] = (100 - percent) +'%';
    } 
    else 
    {
        panel_votes_count_frontground.style['width'] = '0%';
    }

    let panel_votes_count_buy_votes = $.CreatePanel("Panel", HeroVoteMainPanel, "");
    let panel_votes_count_buy_votes_content = $.CreatePanel("Panel", panel_votes_count_buy_votes, "");
    panel_votes_count_buy_votes_content.AddClass("HeroVoteBuyContent")
    let panel_votes_count_buy_votes_label = $.CreatePanel("Label", panel_votes_count_buy_votes_content, "");
    panel_votes_count_buy_votes_label.AddClass("panel_votes_count_buy_votes_label")

    if (votes < HERO_VOTES_TABLE_MAX_COUNT)
    {
        panel_votes_count_buy_votes_label.text = $.Localize("#hero_buy_vote")
        panel_votes_count_buy_votes.AddClass("panel_votes_count_buy_votes")
        let panel_votes_count_buy_votes_coin = $.CreatePanel("Panel", panel_votes_count_buy_votes_content, "");
        panel_votes_count_buy_votes_coin.AddClass("PriceIconcoin")
        CreateEventBuyHeroes(panel_votes_count_buy_votes, hero_name)
    }
    else
    {
        panel_votes_count_buy_votes_label.text = $.Localize("#hero_in_work")
        panel_votes_count_buy_votes.AddClass("panel_votes_count_buy_votes_created")
    }
} 


function CreateEventBuyHeroes(panel, heroname)
{
    panel.SetPanelEvent("onactivate", function() 
    {
        OpenHeroBuy(heroname)
    }); 
}

function CloseBuyHeroPanel()
{
    $("#BuyHeroPanel").style.visibility = "collapse"
}

function OpenHeroBuy(heroname)
{   
    $("#HeroBuyInfo").RemoveAndDeleteChildren()

    $("#HeroNameBuy").text = $.Localize("#"+heroname)

    $.CreatePanel("MoviePanel", $("#HeroBuyInfo"), 'portrait_' + heroname, {class: "hero_portrait_buying",src: "file://{resources}/videos/heroes/" + heroname + ".webm",repeat: "true",hittest: "false",autoplay: "onload"});

    var hero_buy_info_all = $.CreatePanel("Panel", $("#HeroBuyInfo"), "");
    hero_buy_info_all.AddClass("hero_buy_info_all");

    var hero_buy_info_all_description = $.CreatePanel("Label", hero_buy_info_all, "");
    hero_buy_info_all_description.html = true
    hero_buy_info_all_description.AddClass("hero_buy_info_all_description");
    hero_buy_info_all_description.text = $.Localize("#hero_buy_info_all_description")
    
    var panel_votes_number = $.CreatePanel("Panel", hero_buy_info_all, "");
    panel_votes_number.AddClass("panel_votes_number");

    var button_buy_votes_panel = $.CreatePanel("Panel", panel_votes_number, "");
    button_buy_votes_panel.AddClass("button_buy_votes_panel");

    var button_buy_votes_content = $.CreatePanel("Panel", button_buy_votes_panel, "");
    button_buy_votes_content.AddClass("HeroVoteBuyContent");

    var button_buy_hero_label = $.CreatePanel("Label", button_buy_votes_content, "");
    button_buy_hero_label.AddClass("button_buy_hero_label");
    button_buy_hero_label.text = $.Localize("#hero_buy_vote")

    var button_buy_votes_coin = $.CreatePanel("Panel", button_buy_votes_content, "");
    button_buy_votes_coin.AddClass("PriceIconcoin");

    let number_entry = $.CreatePanel(`NumberEntry`, panel_votes_number, "NumberEntryBuyVotes", {value : 1, min : 1, max : 50000});

    $("#BuyHeroPanel").style.visibility = "visible"

    button_buy_votes_panel.SetPanelEvent("onactivate", function() 
    {
        BuyVotesToHero(heroname, number_entry)
    }); 
}

function BuyVotesToHero(heroname, number_entry)
{
    var player_table = PLAYER_DATA
    let votes = 0
    if (number_entry)
	{
		let text_entry = number_entry.FindChildTraverse("TextEntry")
		if (text_entry)
		{
			votes = text_entry.text
		}
	}
    if (player_table)
    {
        GameEvents.SendCustomGameEventToServer_custom( "donate_shop_buy_hero_votes", {hero_name : heroname, votes : votes} );
        LoadingCreated()
    }
    CloseBuyHeroPanel()
    $.Schedule( 0.25, function()
    {
        InitHeroVotes()
    })
}

/////////////////////////////////
///// ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
////////////////////////////////
function UpdatePlayerCoinBase()
{
    GameEvents.SendCustomGameEventToServer_custom( "web_update_player_coin_base", {});
}

function SetItemDescription(panel, text)
{
    panel.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowTextTooltip', panel, $.Localize("#" + text + "_description")); });
        
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideTextTooltip', panel);
    });       
}

function SetTextInfo(panel, text)
{
    panel.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowTextTooltip', panel, $.Localize("#" + text)); });
        
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideTextTooltip', panel);
    });       
}

function SetTextInfo2(panel, text)
{
    panel.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowTextTooltip', panel, $.Localize(text)); });
        
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideTextTooltip', panel);
    });       
}

function SetTextInfo3(panel, text)
{
    panel.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowTextTooltip', panel, text); });
        
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideTextTooltip', panel);
    });       
}

function SetTextInfoSeason(panel, text)
{
    panel.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowTextTooltip', panel, text); });
        
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideTextTooltip', panel);
    });       
}

function SetCurrency(data) 
{
    TopMenuInfo_Load()
    if (data) 
    {
        if (typeof data.coin !== 'undefined') 
        {
            TopMenuInfo_Find("CoinLabelCount").text =  String(data.coin)   
        }
        if (typeof data.crystall !== 'undefined')
        {
            TopMenuInfo_Find("CrystalLabelCount").text = String(data.crystall)
            $("#CrystalsBuyCount").text = ProfileFormatNumber(data.crystall)
        }
        if (typeof data.boss_souls !== 'undefined')
        {
            if (PLAYER_DATA) { PLAYER_DATA.boss_souls = Number(data.boss_souls) || 0 }
            TopMenuInfo_Find("BossSoulsLabelCount").text = String(data.boss_souls)
        }
    }
}

function GetLevelByCoins(coins)
{
    let full_sum = 0
    let level_end = 30
    for (var cc = 0; cc <= Object.keys(levels).length; cc++) 
    {
        full_sum = full_sum + levels[cc]
        if (coins < full_sum)
        {
            level_end = cc - 1
            break
        }
    } 
    return level_end
}

function GetProgressByCoins(lvl) 
{
    if (levels[lvl])
    {
        return levels[lvl]
    }
    return levels[levels.length]
}

function GetProgressByCoins22(lvl) 
{
    let full_sum = 0
    for (var cc = 0; cc <= Object.keys(levels).length; cc++) {
        full_sum = full_sum + levels[cc]
        if (cc == lvl) 
        {
            return full_sum
        }
    }
}

function GetHeroInformation(hero) 
{
    let woda_player_data = PLAYER_DATA
    if (woda_player_data) 
    {
        for (var i = 1; i <= Object.keys(woda_player_data.heroes_level).length; i++) 
        {
            if (woda_player_data.heroes_level[i]["hero"] == hero) 
            {
                return woda_player_data.heroes_level[i]
            }
        }
    }
    return null
}

function GetHeroRankIcon(level) 
{
    if (level >= 30) 
    {
        return "rank_6"
    } else if (level >= 25) 
    {
        return "rank_5"
    } else if (level >= 18) 
    {
        return "rank_4"
    } else if (level >= 12) 
    {
        return "rank_3"
    } else if (level >= 6) 
    {
        return "rank_2"
    } else if (level >= 1) 
    {
        return "rank_1"
    } else 
    {
        return "rank_0"
    }
}

function HasItemInventory(item_id)
{
    var inventory_items_map = GetInventoryItemsMap()
    if (inventory_items_map[String(item_id)])
    {
        return true
    }
    // if (Game.IsInToolsMode())
    // {
    //     return true
    // }
	return false
}

function GetInventoryItemsMap()
{
    if (inventory_items_map_cache != null)
    {
        return inventory_items_map_cache
    }

    inventory_items_map_cache = {}
	if (PLAYER_DATA && PLAYER_DATA.donate_items)
	{
        for (var item_slot in PLAYER_DATA.donate_items)
        {
            if (PLAYER_DATA.donate_items[item_slot])
            {
                inventory_items_map_cache[String(PLAYER_DATA.donate_items[item_slot])] = true
            }
        }
	}
    return inventory_items_map_cache
}

function ResetItemsProgressCache()
{
    inventory_items_map_cache = null
    items_counter_cache = {}
    profile_items_percent_cache = null
}

GameEvents.Subscribe_custom( 'shop_error_notification', ErrorCreated );
GameEvents.Subscribe_custom( 'shop_accept_notification', AcceptCreated );
GameEvents.Subscribe_custom( 'shop_set_currency', SetCurrency );

function UpdateInventoryItemVisual(panel, table, item_type)
{
    var BuyItemPanel = panel.FindChildTraverse("BuyItemPanel")
    var PriceLabel = panel.FindChildTraverse("PriceLabel")
    if (!BuyItemPanel || !PriceLabel)
    {
        return
    }

    BuyItemPanel.style.backgroundColor = "gradient(linear, 0% 0%, 0% 100%, from(#60862d), to(#3d5f1c))"
    PriceLabel.text = $.Localize( "#shop_activate" )

    if (IsInventoryItemActive(table[0], item_type))
    {
        BuyItemPanel.style.backgroundColor = "gradient( linear, 0% 0%, 0% 100%, from( #84302C ), to( #60321D ))"
        PriceLabel.text = $.Localize( "#shop_deactivate" )
    }
}

function IsInventoryItemActive(item_id, item_type)
{
    if (!PLAYER_DATA)
    {
        return false
    }
    if (item_type == "Items_pets")
    {
        return Number(PLAYER_DATA.pet_id) == Number(item_id)
    }
    if (item_type == "Items_Five")
    {
        return Number(PLAYER_DATA.five_id) == Number(item_id)
    }
    if (item_type == "Items_emblems")
    {
        return Number(PLAYER_DATA.effect_id) == Number(item_id)
    }
    if (item_type == "Items_heads")
    {
        return Number(PLAYER_DATA.head_id) == Number(item_id)
    }
    if (item_type == "Items_Backround")
    {
        return Number(PLAYER_DATA.background_id) == Number(item_id)
    }
    if (item_type == "Items_tpscroll")
    {
        return Number(PLAYER_DATA.teleport_id) == Number(item_id)
    }
    if (item_type == "Items_tips" && PLAYER_DATA.tips)
    {
        for (var f = 1; f <= Object.keys(PLAYER_DATA.tips).length; f++) 
        {
            if (Number(PLAYER_DATA.tips[f]) == Number(item_id))
            {
                return true
            }
        }
    }
    return false
}

function SetPetInventory(panel, table) 
{
    panel.SetPanelEvent("onactivate", function() 
    { 
        SelectCourier(table[0])
    });
}

function SetEmblemInventory(panel, table) 
{
    panel.SetPanelEvent("onactivate", function() 
    { 
        SelectEmblem(table[0])
    });
}

function SetFiveInventory(panel, table) 
{
    panel.SetPanelEvent("onactivate", function() 
    { 
        SelectFive(table[0])
    });
}

function SetTipInventory(panel, table) 
{
    panel.SetPanelEvent("onactivate", function() 
    { 
        SelectTip(table[0])
    });
}

function SetBGInventory(panel, table) 
{
    panel.SetPanelEvent("onactivate", function() 
    { 
        SelectBG(table[0])
    });
}

function SetTpInventory(panel, table) 
{
    panel.SetPanelEvent("onactivate", function() 
    { 
        SelectTeleport(table[0])
    });
}

function SelectTip(num)
{
    GameEvents.SendCustomGameEventToServer_custom( "change_premium_tip", {tip: num} );
}

function SelectCourier(num)
{
    GameEvents.SendCustomGameEventToServer_custom( "change_premium_pet", {pet_id: num} );
}

function SelectEmblem(num)
{
    GameEvents.SendCustomGameEventToServer_custom( "change_premium_emblem", {effect: num} );
}

function SelectHead(num)
{
    GameEvents.SendCustomGameEventToServer_custom( "change_premium_head", {head_id: num} );
}

function SelectFive(num)
{
    GameEvents.SendCustomGameEventToServer_custom( "change_premium_five", {five_id: num} );
}

function SelectBG(num)
{
    GameEvents.SendCustomGameEventToServer_custom( "change_premium_bg", {background_id: num} );
}

function SelectTeleport(num)
{
    GameEvents.SendCustomGameEventToServer_custom( "change_premium_tp", {teleport_id: num} );
}

function InitRunes()
{
    var root = $("#RunesWindow")
    if (!root) { return }

    root.RemoveAndDeleteChildren()
    root.AddClass("RunesWindowContent")

    var main = $.CreatePanel("Panel", root, "RunesMain")
    main.AddClass("RunesMain")

    var description = $.CreatePanel("Label", main, "")
    description.AddClass("RunesDescription")
    description.html = true
    description.text = $.Localize("#shop_runes_description")

    CreateRunesRoulette(main)

    var list_header = $.CreatePanel("Panel", main, "")
    list_header.AddClass("RunesListHeader")

    var list_title = $.CreatePanel("Label", list_header, "")
    list_title.AddClass("RunesListTitle")
    list_title.text = $.Localize("#shop_all_runes")

    var equipped_counter = $.CreatePanel("Label", list_header, "RunesEquippedCounter")
    equipped_counter.AddClass("RunesEquippedCounter")
    equipped_counter.text = GetOwnedRunesCount() + " / " + Items_Runes.length

    var equipped_counter_2 = $.CreatePanel("Label", list_header, "RunesEquippedCounter2")
    equipped_counter_2.AddClass("RunesEquippedCounter_2")
    equipped_counter_2.text = $.Localize("#shop_runes_activated") + GetEquippedRunesCount() + " / " + GetRuneMaxEquipped()

    var list = $.CreatePanel("Panel", main, "RunesList")
    list.AddClass("RunesList")

    var sorted_runes = GetRunesSortedForDisplay()
    runes_list_signature = GetRunesListSignature(sorted_runes)
    for (var i = 0; i < sorted_runes.length; i++)
    {
        CreateRuneCard(list, sorted_runes[i], false)
    }
}

function GetRunesListSignature(sorted_runes)
{
    var signature_parts = []
    for (var i = 0; i < sorted_runes.length; i++)
    {
        signature_parts.push(sorted_runes[i].id)
    }
    return signature_parts.join(",")
}

function CreateRunesRoulette(parent)
{
    var roulette = $.CreatePanel("Panel", parent, "RunesRoulette")
    roulette.AddClass("RunesRoulette")

    var viewport = $.CreatePanel("Panel", roulette, "RunesRouletteViewport")
    viewport.AddClass("RunesRouletteViewport")

    var track = $.CreatePanel("Panel", viewport, "RunesRouletteTrack")
    track.AddClass("RunesRouletteTrack")

    var marker = $.CreatePanel("Panel", viewport, "")
    marker.AddClass("RunesRouletteMarker")

    viewport.SetPanelEvent("onactivate", function()
    {
        SkipRuneSpin()
    })

    BuildIdleRuneTrack(track)

    var footer = $.CreatePanel("Panel", roulette, "")
    footer.AddClass("RunesRouletteFooter")
    footer.AddClass("RunesRouletteFooterWide")

    var status = $.CreatePanel("Label", footer, "RunesRouletteStatus")
    status.AddClass("RunesRouletteStatus")

    var spacer_left = $.CreatePanel("Panel", footer, "")
    spacer_left.AddClass("RunesFooterSpacer")

    var button = $.CreatePanel("Panel", footer, "RunesOpenButton")
    button.AddClass("RunesOpenButton")

    var button_content = $.CreatePanel("Panel", button, "")
    button_content.AddClass("RunesOpenButtonContent")

    var coin = $.CreatePanel("Panel", button_content, "RunesOpenButtonCoin")
    coin.AddClass("RunesOpenButtonCoin")
    coin.style.marginRight = "0px"
    coin.style.marginLeft = "6px"

    var button_price = $.CreatePanel("Label", button_content, "RunesOpenButtonPriceLabel")
    button_price.AddClass("RunesOpenButtonPriceLabel")
    button_price.text = String(RUNE_CHEST_COST)

    var open_label = $.CreatePanel("Label", button_content, "RunesOpenButtonOpenLabel")
    open_label.AddClass("RunesOpenButtonLabel")

    var spacer_right = $.CreatePanel("Panel", footer, "")
    spacer_right.AddClass("RunesFooterSpacer")

    UpdateRuneSpinButton()

    button.SetPanelEvent("onactivate", function()
    {
        if (CanSkipRuneSpin())
        {
            SkipRuneSpin()
            return
        }
        if (button.BHasClass("Locked"))
        {
            return
        }
        if (GetRuneChestsCount() <= 0)
        {
            RequestRuneChestBuy(1)
            return
        }
        RequestRuneSpin()
    })
}

function CanSkipRuneSpin()
{
    return rune_spin_in_progress && rune_pending_result != null && !rune_spin_skipped
}

function SkipRuneSpin()
{
    if (!CanSkipRuneSpin())
    {
        return
    }
    rune_spin_skipped = true
    if (rune_spin_track && rune_spin_track.IsValid())
    {
        rune_spin_track.style.transitionDuration = "0.0s"
        rune_spin_track.style.transform = "translateX(" + String(rune_spin_stop_offset + 0.5) + "px)"
    }
    UpdateRuneSpinButton()
    GameEvents.SendCustomGameEventToServer_custom("woda_rune_spin_request", {skip: 1})
}

function RequestRuneChestBuy(count)
{
    count = Math.max(1, Math.min(Number(count) || 1, RUNE_CHEST_BUY_MAX))
    if (PLAYER_DATA && Number(PLAYER_DATA.coins) < RUNE_CHEST_COST * count && !Game.IsInToolsMode())
    {
        ErrorCreated({error_name: "shop_error_no_coins"})
        return
    }
    Game.EmitSound("ui.pick_select")
    GameEvents.SendCustomGameEventToServer_custom("woda_rune_chest_buy_request", {count: count})
}

function OnRuneChestBuyComplete(data)
{
    if (PLAYER_DATA)
    {
        PLAYER_DATA.rune_chests = Number(data.rune_chests) || 0
    }
    Game.EmitSound("ui.treasure_02")
    AcceptCreated({})
    UpdateRunesChestBadge()
    UpdateRuneSpinButton()
}

function BuildIdleRuneTrack(track)
{
    track.style.transitionDuration = "0.0s"
    track.RemoveAndDeleteChildren()
    track.style.transform = "translateX(0px)"
    var available_runes = GetAvailableRunes()
    if (available_runes.length <= 0)
    {
        available_runes = Items_Runes
    }
    var last_rune_id = null
    for (var i = 0; i < 14; i++)
    {
        var rune = GetRandomRuneFromList(available_runes, last_rune_id)
        last_rune_id = rune ? rune.id : null
        CreateRuneWheelItem(track, rune)
    }
}

function RequestRuneSpin()
{
    if (rune_spin_in_progress || AreAllRunesMaxed())
    {
        if (AreAllRunesMaxed())
        {
            //RuneNotice("Коллекция завершена", "Все руны уже имеют 3 уровень.", null)
        }
        return
    }
    if (GetRuneChestsCount() <= 0)
    {
        return
    }
    var track = $("#RunesRouletteTrack")
    if (track)
    {
        BuildIdleRuneTrack(track)
    }
    rune_spin_in_progress = true
    rune_spin_skipped = false
    rune_spin_track = null
    $("#RunesOpenButton").SetHasClass("Locked", true)
    $("#RunesRouletteStatus").text = ""//$.Localize("#shop_rullet_spinning")
    GameEvents.SendCustomGameEventToServer_custom("woda_rune_spin_request", {})
    if (rune_spin_timeout != -1)
    {
        $.CancelScheduled(rune_spin_timeout)
    }
    rune_spin_timeout = $.Schedule(3.0, function()
    {
        if (!rune_spin_in_progress || rune_pending_result != null)
        {
            return
        }
        rune_spin_in_progress = false
        rune_spin_timeout = -1
        if (current_tab == "RunesWindow")
        {
            InitRunes()
        }
    })
}

function OnRuneSpinStart(data)
{
    if (rune_spin_timeout != -1)
    {
        $.CancelScheduled(rune_spin_timeout)
        rune_spin_timeout = -1
    }
    rune_pending_result = data.rune_id
    rune_spin_skipped = false
    rune_spin_track = null
    if (PLAYER_DATA && data.rune_chests != null)
    {
        PLAYER_DATA.rune_chests = Number(data.rune_chests) || 0
        UpdateRunesChestBadge()
    }
    var track = $("#RunesRouletteTrack")
    if (!track) { return }

    track.RemoveAndDeleteChildren()
    track.style.transitionDuration = "0.0s"
    track.style.transform = "translateX(0px)"

    var stop_index = 34
    var available_runes = GetAvailableRunes()
    var result_rune = GetRuneInfo(data.rune_id)
    var result_in_available = false
    for (var check = 0; check < available_runes.length; check++)
    {
        if (available_runes[check].id == data.rune_id)
        {
            result_in_available = true
            break
        }
    }
    if (!result_in_available && result_rune)
    {
        available_runes.push(result_rune)
    }
    var last_rune_id = null
    for (var i = 0; i < 44; i++)
    {
        var rune = GetRandomRuneFromList(available_runes, last_rune_id)
        if (i == stop_index)
        {
            rune = result_rune || rune
        }
        last_rune_id = rune ? rune.id : null
        CreateRuneWheelItem(track, rune)
    }

    rune_spin_track = track
    rune_spin_stop_offset = GetRuneRouletteStopOffset(stop_index)
    UpdateRuneSpinButton()

    Game.EmitSound("ui.treasure_01")
    $.Schedule(0.05, function()
    {
        if (rune_spin_skipped || !track.IsValid())
        {
            return
        }
        track.style.transitionDuration = "4.5s"
        track.style.transform = "translateX(" + String(GetRuneRouletteStopOffset(stop_index)) + "px)"
        $("#RunesRouletteStatus").text = ""
    })
}

function OnRuneSpinComplete(data)
{
    rune_spin_in_progress = false
    rune_pending_result = null
    rune_spin_skipped = false
    rune_spin_track = null
    UpdateRuneSpinButton()
    var rune = GetRuneInfo(data.rune_id)
    if (rune)
    {
        ShowRuneReward(rune, data.level, Number(data.duplicate) == 1)
        Game.EmitSound("ui.treasure_02")
    }
    RefreshRunesListOnly()
}

function OnRuneSpinDenied(data)
{
    rune_spin_in_progress = false
    rune_pending_result = null
    rune_spin_skipped = false
    rune_spin_track = null
    if (rune_spin_timeout != -1)
    {
        $.CancelScheduled(rune_spin_timeout)
        rune_spin_timeout = -1
    }
    if (data.reason == "all_max")
    {
        // RuneNotice("Коллекция завершена", "Все руны уже имеют 3 уровень.", null)
    }
    else if (data.reason == "no_data")
    {
        // RuneNotice("Нет данных", "Данные игрока еще не загрузились. Попробуйте через пару секунд.", null)
    }
    if (current_tab == "RunesWindow")
    {
        InitRunes()
    }
}

function UpdateRuneSpinButton()
{
    var button = $("#RunesOpenButton")
    var status = $("#RunesRouletteStatus")
    var all_maxed = AreAllRunesMaxed()
    var chests = GetRuneChestsCount()
    var can_skip = CanSkipRuneSpin()

    if (button)
    {
        button.SetHasClass("Locked", !can_skip && (rune_spin_in_progress || all_maxed))
        button.SetHasClass("SkipMode", can_skip)
    }
    var open_label = $("#RunesOpenButtonOpenLabel")
    var price_label = $("#RunesOpenButtonPriceLabel")
    var coin_icon = $("#RunesOpenButtonCoin")
    if (open_label && price_label && coin_icon)
    {
        if (can_skip)
        {
            open_label.text = $.Localize("#shop_rune_skip_spin")
            price_label.visible = false
            coin_icon.visible = false
        }
        else if (chests > 0)
        {
            open_label.text = $.Localize("#shop_rune_open_chest") + " (" + chests + ")"
            price_label.visible = false
            coin_icon.visible = false
        }
        else
        {
            open_label.text = $.Localize("#shop_rune_buy_chest") + ": "
            price_label.text = String(RUNE_CHEST_COST)
            price_label.visible = true
            coin_icon.visible = true
        }
    }

    if (status)
    {
        if (all_maxed)
        {
            status.text = $.Localize("#shop_player_has_all_runes")
        }
        else if (!rune_spin_in_progress)
        {
            status.text = ""
        }
    }
}

function OnRuneEquipDenied(data)
{
    rune_equip_update_pending = false
    if (data.reason == "max_equipped")
    {
        ErrorCreated({error_name: "shop_error_rune_max_equipped"})
    }
}

function CreateRuneWheelItem(parent, rune)
{
    if (!rune) { return }

    var item = $.CreatePanel("Panel", parent, "")
    item.AddClass("RuneWheelItem")
    item.style.border = "1px solid " + rune.color

    var icon = $.CreatePanel("Panel", item, "")
    icon.AddClass("RuneIcon")
    icon.style.backgroundImage = "url('file://{images}/custom_game/runes/" + rune.id + ".png')"
    icon.style.backgroundSize = "100%"
    ApplyRarityGlow(icon, GetRuneRarity(rune.id))
    SetRuneTooltip(item, rune.id)

    var text = $.CreatePanel("Label", icon, "")
    text.AddClass("RuneIconText")
}

function GetRandomRuneFromList(runes, previous_rune_id)
{
    if (!runes || runes.length <= 0)
    {
        return null
    }
    if (runes.length == 1)
    {
        return runes[0]
    }

    var rune = runes[Math.floor(Math.random() * runes.length)]
    for (var i = 0; i < 4; i++)
    {
        if (rune.id != previous_rune_id)
        {
            break
        }
        rune = runes[Math.floor(Math.random() * runes.length)]
    }
    return rune
}

function GetRuneRouletteStopOffset(stop_index)
{
    var viewport_center = RUNE_ROULETTE_VIEWPORT_WIDTH / 2
    var item_center = RUNE_ROULETTE_ITEM_MARGIN_LEFT + RUNE_ROULETTE_ITEM_WIDTH / 2
    return viewport_center - (stop_index * RUNE_ROULETTE_ITEM_STEP + item_center)
}

function CreateRuneCard(parent, rune)
{
    var level = GetRuneLevel(rune.id)
    var equipped = IsRuneEquipped(rune.id)

    var card = $.CreatePanel("Panel", parent, "RuneCard_" + rune.id)
    card.AddClass("RuneCard")
    card.SetHasClass("Owned", level > 0)
    card.SetHasClass("Equipped", equipped)
    card.SetHasClass("MaxLevel", level >= RUNE_MAX_LEVEL)
    card.SetHasClass("MaxLayoutBigIcon", RUNE_CARD_MAX_LAYOUT == "big_icon")
    card.SetHasClass("ThemeGold", RUNE_GOLD_THEME)
    SetRuneTooltip(card, rune.id)
    card.SetPanelEvent("onactivate", function()
    {
        if (GetRuneLevel(rune.id) <= 0)
        {
            return
        }
        rune_equip_update_pending = true
        GameEvents.SendCustomGameEventToServer_custom("woda_rune_toggle_equip", {rune_id: rune.id})
    })

    var top = $.CreatePanel("Panel", card, "")
    top.AddClass("RuneCardTop")

    var icon = $.CreatePanel("Panel", top, "")
    icon.AddClass("RuneCardIcon")
    icon.style.backgroundImage = "url('file://{images}/custom_game/runes/" + rune.id + ".png')"
    icon.style.backgroundSize = "100%"
    ApplyRarityGlow(icon, GetRuneRarity(rune.id))
    
    var short = $.CreatePanel("Label", icon, "")
    short.AddClass("RuneCardIconText")

    var info = $.CreatePanel("Panel", top, "")
    info.AddClass("RuneCardInfo")

    var name_center = $.CreatePanel("Panel", info, "")
    name_center.AddClass("RuneCardNameCenter")

    var name = $.CreatePanel("Label", name_center, "")
    name.AddClass("RuneCardName")
    name.text = $.Localize("#"+rune.id)

    var bottom = $.CreatePanel("Panel", card, "")
    bottom.AddClass("RuneCardBottom")

    var progress = $.CreatePanel("Panel", bottom, "")
    progress.AddClass("RuneProgress")

    var progress_fill = $.CreatePanel("Panel", progress, "RuneProgressFill_" + rune.id)
    progress_fill.AddClass("RuneProgressFill")
    progress_fill.style.width = (level / RUNE_MAX_LEVEL) * 100 + "%"

    var progress_label = $.CreatePanel("Label", progress, "RuneProgressLabel_" + rune.id)
    progress_label.AddClass("RuneProgressLabel")
    progress_label.text = level + "/" + RUNE_MAX_LEVEL

    var buy_button = $.CreatePanel("Panel", bottom, "RuneCardBuy_" + rune.id)
    buy_button.AddClass("RuneCardBuyButton")
    buy_button.SetPanelEvent("onactivate", function()
    {
        OpenRuneBuyConfirm(rune)
    })
    var buy_content = $.CreatePanel("Panel", buy_button, "")
    buy_content.AddClass("RuneCardBuyContent")

    var buy_label = $.CreatePanel("Label", buy_content, "")
    buy_label.AddClass("RuneCardBuyLabel")
    buy_label.text = String(RUNE_BUY_COST)

    var buy_crystal = $.CreatePanel("Panel", buy_content, "")
    buy_crystal.AddClass("RuneCardBuyCrystal")

    AddShopNewBadge(card, rune.id)
}

function GetRuneMaxEquipped()
{
    var max_equipped = RUNE_MAX_EQUIPPED
    if (PLAYER_DATA)
    {
        if (Number(PLAYER_DATA.rune_slot_bonus) > 0)
        {
            max_equipped++
        }
        if (Number(PLAYER_DATA.arena_max_difficulty) >= RUNE_SLOT_BONUS_DIFFICULTY)
        {
            max_equipped++
        }
    }
    return max_equipped
}

function RequestRuneBuy(rune_id)
{
    if (rune_spin_in_progress)
    {
        return
    }
    if (GetRuneLevel(rune_id) >= RUNE_MAX_LEVEL)
    {
        return
    }
    if (PLAYER_DATA && Number(PLAYER_DATA.crystals) < RUNE_BUY_COST && !Game.IsInToolsMode())
    {
        ErrorCreated({error_name: "shop_error_no_crystals"})
        return
    }
    LoadingCreated()
    GameEvents.SendCustomGameEventToServer_custom("woda_rune_buy_request", {rune_id: rune_id})
}

function OnRuneBuyComplete(data)
{
    if (!data || !data.rune_id)
    {
        return
    }
    AcceptCreated()
    if (PLAYER_DATA && data.level != null)
    {
        PLAYER_DATA.runes = PLAYER_DATA.runes || {}
        PLAYER_DATA.runes[String(data.rune_id)] = Number(data.level) || 0
    }
    if (rune_buy_confirm_id == String(data.rune_id) && $("#BuyItemPanelMain").style.visibility == "visible")
    {
        if (GetRuneLevel(data.rune_id) >= RUNE_MAX_LEVEL)
        {
            CloseBuyItemPanel()
        }
        else
        {
            OpenRuneBuyConfirm(GetRuneInfo(data.rune_id))
        }
    }
}

function GetRuneInfo(rune_id)
{
    for (var i = 0; i < Items_Runes.length; i++)
    {
        if (Items_Runes[i].id == rune_id)
        {
            return Items_Runes[i]
        }
    }
    return null
}

function GetRuneLevel(rune_id)
{
    if (!PLAYER_DATA || !PLAYER_DATA.runes)
    {
        return 0
    }
    var direct_level = PLAYER_DATA.runes[String(rune_id)]
    if (direct_level != null && typeof direct_level != "object")
    {
        return Number(direct_level) || 0
    }
    for (var key in PLAYER_DATA.runes)
    {
        var rune_data = PLAYER_DATA.runes[key]
        if (rune_data == null)
        {
            continue
        }
        if (typeof rune_data == "object")
        {
            var data_id = rune_data.id || rune_data.rune_id || rune_data.name
            if (String(data_id) == String(rune_id))
            {
                return Number(rune_data.level || rune_data.count || rune_data.value || 1) || 1
            }
        }
        else if (String(rune_data) == String(rune_id))
        {
            return 1
        }
    }
    return 0
}

function IsRuneEquipped(rune_id)
{
    if (!PLAYER_DATA || !PLAYER_DATA.equipped_runes)
    {
        return false
    }
    for (var key in PLAYER_DATA.equipped_runes)
    {
        if (String(PLAYER_DATA.equipped_runes[key]) == String(rune_id))
        {
            return true
        }
    }
    return false
}

function GetEquippedRunesCount()
{
    if (!PLAYER_DATA || !PLAYER_DATA.equipped_runes)
    {
        return 0
    }
    var count = 0
    for (var key in PLAYER_DATA.equipped_runes)
    {
        if (PLAYER_DATA.equipped_runes[key])
        {
            count++
        }
    }
    return count
}

function GetOwnedRunesCount()
{
    var count = 0
    for (var i = 0; i < Items_Runes.length; i++)
    {
        if (GetRuneLevel(Items_Runes[i].id) > 0)
        {
            count++
        }
    }
    return count
}

function GetRunesSortedForDisplay()
{
    var owned_runes = []
    var locked_runes = []
    for (var i = 0; i < Items_Runes.length; i++)
    {
        if (GetRuneLevel(Items_Runes[i].id) > 0)
        {
            owned_runes.push(Items_Runes[i])
        }
        else
        {
            locked_runes.push(Items_Runes[i])
        }
    }
    return owned_runes.concat(locked_runes)
}

function RefreshRunesVisualOnly()
{
    for (var i = 0; i < Items_Runes.length; i++)
    {
        UpdateRuneCardVisual(Items_Runes[i])
    }
    RefreshRunesCounter()
}

function UpdateRuneCardVisual(rune)
{
    var level = GetRuneLevel(rune.id)
    var equipped = IsRuneEquipped(rune.id)
    var card = $("#RuneCard_" + rune.id)
    if (!card)
    {
        return
    }

    card.SetHasClass("Owned", level > 0)
    card.SetHasClass("Equipped", equipped)
    card.SetHasClass("MaxLevel", level >= RUNE_MAX_LEVEL)

    var progress_fill = $("#RuneProgressFill_" + rune.id)
    if (progress_fill)
    {
        progress_fill.style.width = (level / RUNE_MAX_LEVEL) * 100 + "%"
    }

    var progress_label = $("#RuneProgressLabel_" + rune.id)
    if (progress_label)
    {
        progress_label.text = level + "/" + RUNE_MAX_LEVEL
    }
}

function RefreshRunesCounter()
{
    var counter = $("#RunesEquippedCounter")
    if (counter)
    {
        counter.text = GetOwnedRunesCount() + " / " + Items_Runes.length
    }
    var counter2 = $("#RunesEquippedCounter2")
    if (counter2)
    {
        counter2.text = $.Localize("#shop_runes_activated") + GetEquippedRunesCount() + " / " + GetRuneMaxEquipped()
    }
}

var runes_list_signature = ""

function RefreshRunesListOnly()
{
    var list = $("#RunesList")
    if (list)
    {
        var sorted_runes = GetRunesSortedForDisplay()
        var signature = GetRunesListSignature(sorted_runes)
        if (signature == runes_list_signature && list.GetChildCount() > 0)
        {
            for (var u = 0; u < sorted_runes.length; u++)
            {
                UpdateRuneCardVisual(sorted_runes[u])
            }
            RefreshRunesCounter()
            return
        }
        runes_list_signature = signature
        list.RemoveAndDeleteChildren()
        for (var i = 0; i < sorted_runes.length; i++)
        {
            CreateRuneCard(list, sorted_runes[i], false)
        }
    }
    RefreshRunesCounter()
}

GameEvents.Subscribe_custom("woda_rune_spin_start", OnRuneSpinStart)
GameEvents.Subscribe_custom("woda_rune_spin_complete", OnRuneSpinComplete)
GameEvents.Subscribe_custom("woda_rune_spin_denied", OnRuneSpinDenied)
GameEvents.Subscribe_custom("woda_rune_equip_denied", OnRuneEquipDenied)
GameEvents.Subscribe_custom("woda_rune_buy_complete", OnRuneBuyComplete)
GameEvents.Subscribe_custom("woda_rune_chest_buy_complete", OnRuneChestBuyComplete)

function UpdateStoreBackground()
{
    let PlayerBackground = $("#PlayerBackground")
    
    if (PLAYER_DATA && PLAYER_DATA.background_id)
    {
        PlayerBackground.style.backgroundImage = 'url("' + Background_Images[PLAYER_DATA.background_id] + '")'
        PlayerBackground.style.backgroundSize = "100%"
        PlayerBackground.style.opacity = "1";
    }
    else
    {
        PlayerBackground.style.opacity = "0";
    }

    if (GameUI.CustomUIConfig().GlobalUpdateBGHS)
    {
        GameUI.CustomUIConfig().GlobalUpdateBGHS()
    }
}

function HowMuchItemsInTab(table_items)
{
    let cache_key = GetItemsCounterCacheKey(table_items)
    if (cache_key != null && items_counter_cache[cache_key])
    {
        return items_counter_cache[cache_key]
    }

    let counter = table_items.length
    let items_has = 0
    for (var i = 0; i < table_items.length; i++) 
    {
        if (table_items[i])
        {
            if (HasItemInventory(table_items[i][0]) && !table_items[i][5])
            {
                items_has = items_has + 1
            }
            if (table_items[i][5])
            {
                counter = counter - 1
            }
        }
    } 
    let result = [counter, items_has]
    if (cache_key != null)
    {
        items_counter_cache[cache_key] = result
    }
    return result
}

function GetItemsCounterCacheKey(table_items)
{
    if (table_items == Items_pets) { return "Items_pets" }
    if (table_items == Items_emblems) { return "Items_emblems" }
    if (table_items == Items_heads) { return "Items_heads" }
    if (table_items == Items_tips) { return "Items_tips" }
    if (table_items == Items_Five) { return "Items_Five" }
    if (table_items == Items_Backround) { return "Items_Backround" }
    if (table_items == Items_tpscroll) { return "Items_tpscroll" }
    return null
}

function GetPercentItemsInProfile()
{
    if (profile_items_percent_cache != null)
    {
        return profile_items_percent_cache
    }

    let Items_pets_counter = HowMuchItemsInTab(Items_pets)
    let Items_emblems_counter = HowMuchItemsInTab(Items_emblems)
    let Items_heads_counter = HowMuchItemsInTab(Items_heads)
    let Items_tips_counter = HowMuchItemsInTab(Items_tips)
    let Items_Five_counter = HowMuchItemsInTab(Items_Five)
    let Items_Backround_counter = HowMuchItemsInTab(Items_Backround)
    let Items_Teleports_counter = HowMuchItemsInTab(Items_tpscroll)
    let all_items_counter = Items_pets_counter[0] + Items_emblems_counter[0] + Items_heads_counter[0] + Items_tips_counter[0] + Items_Five_counter[0] + Items_Backround_counter[0] + Items_Teleports_counter[0]
    let has_items_counter = Items_pets_counter[1] + Items_emblems_counter[1] + Items_heads_counter[1] + Items_tips_counter[1] + Items_Five_counter[1] + Items_Backround_counter[1] + Items_Teleports_counter[1]
    profile_items_percent_cache = Math.floor(has_items_counter / all_items_counter * 100)
    return profile_items_percent_cache
}



function GetHeroInformationOther(hero, player_id) {
    // Проверяем и загружаем данные игрока, если их нет в кэше
    if (!OTHER_PLAYER_DATA[player_id]) {
        OTHER_PLAYER_DATA[player_id] = Game.GetCustomTable("woda_player_data", String(player_id));
    }
    const playerData = OTHER_PLAYER_DATA[player_id];
    if (!playerData?.heroes_level) return null;
    // Используем Object.values для более чистого кода и find для поиска
    return Object.values(playerData.heroes_level).find(
        heroData => heroData.hero === hero
    ) || null;
}

const level_colors = ['#edb96e','#d5edf3','#feeb44',"#c4eaff",'#d1ce89','#d1ce89']

var level_timer_icon = null
var level_timer_label = null
var level_timer_badge = null
var level_timer_applied = null

function GetLevelTimerPanel(panel, id)
{
    if (panel && panel.IsValid())
    {
        return panel
    }
    return FindDotaHudElement(id)
}

function check_level_timer()
{
    let hero_id = Players.GetLocalPlayerPortraitUnit()
    if (!hero_id) { 
        $.Schedule( 0.1, check_level_timer)
        return 
    }
    if (hero_id == -1) { 
        $.Schedule( 0.1, check_level_timer)
        return 
    }
    let hero = Entities.GetUnitName(hero_id)
    let player_id = Entities.GetPlayerOwnerID( hero_id )
    let level_icon_img = null
    if (GetHeroInformationOther(hero, player_id) != null) 
    {
        let info = GetHeroInformationOther(hero, player_id)
        let hero_lvl = GetLevelByCoins(info.coins)
        level_icon_img = GetHeroRankIcon(hero_lvl)
    }
    let level_icon = GetLevelTimerPanel(level_timer_icon, "level_icon_custom")
    let hero_label = GetLevelTimerPanel(level_timer_label, "UnitNameLabel");
    let dota_level = GetLevelTimerPanel(level_timer_badge, 'unitbadge')
    if (dota_level)
    {
        dota_level.style.opacity = '0';
    }
    if (!level_icon)
    {
        level_icon =  $.CreatePanel("Panel", $.GetContextPanel(), "level_icon_custom")
        level_icon.AddClass("level_icon_custom")
        level_icon.SetParent(dota_level.GetParent())
    }
    let applied_key = String(level_icon_img)
    if (level_icon !== level_timer_icon || hero_label !== level_timer_label || applied_key !== level_timer_applied)
    {
        if (level_icon_img && level_icon_img != "rank_0")
        {
            hero_label.style.color = level_colors[Number(level_icon_img.replace("rank_", ""))-1];
            level_icon.style.backgroundImage = 'url("s2r://panorama/images/hud/portrait_hero_badge_frame_tier_' + level_icon_img.replace("rank_", "") + '_psd.vtex")';
            level_icon.style.opacity = "1";
        }
        else
        {
            hero_label.style.color = 'white';
            level_icon.style.opacity = "0";
        }
    }
    level_timer_icon = level_icon
    level_timer_label = hero_label
    level_timer_badge = dota_level
    level_timer_applied = applied_key
    $.Schedule( 0.1, check_level_timer)
}

check_level_timer()

//function StopSoundBlock()
//{
//    var videos = 
//    [
//        "https://www.youtube.com/watch?v=E5Vi2kue_zE",
//        "https://www.youtube.com/watch?v=JXNgF5KjKh4",
//        "https://www.youtube.com/watch?v=G2HdCqL6kJI",
//        "https://www.youtube.com/watch?v=YV9HEyGNRFU",
//        "https://www.youtube.com/watch?v=lQZCtLCNip4",
//        "https://www.youtube.com/watch?v=mZMg3e2ZbA0",
//        "https://www.youtube.com/watch?v=FpD531bislA",
//        "https://www.youtube.com/watch?v=r6g_1yYl4_A",
//        "https://www.youtube.com/watch?v=1vAj4WXnjh8",
//        "https://www.youtube.com/watch?v=3rtoQDG0V64",
//        "https://www.youtube.com/watch?v=NJZjhB1MRXo",
//        "https://www.youtube.com/watch?v=AYQnLRh8D3w",
//        "https://www.youtube.com/watch?v=Wc9cz51DN30",
//        "https://www.youtube.com/watch?v=3lXG8jLinBo",
//        "https://www.youtube.com/watch?v=vWFJ-yn76pU",
//        "https://www.youtube.com/watch?v=YYxykzscQn4",
//        "https://www.youtube.com/watch?v=UECw6JYoZFI",
//
//        
//    ]
//    let YoutubeMusic = $.GetContextPanel().FindChildTraverse("YoutubeMusic")
//    if (YoutubeMusic == null)
//    {
//        YoutubeMusic = $.CreatePanel("DOTAHTMLPanel", $.GetContextPanel(), "YoutubeMusic", {style:"width:1%;height:1%;align:center center;transform:TranslateX(10000px);", url:videos[Math.floor(Math.random() * videos.length)], volume:0, muted:true})
//        //YoutubeMusic = $.CreatePanel("DOTAHTMLPanel", $.GetContextPanel(), "YoutubeMusic", {style:"width:25%;height:25%;align:center center;", url:videos[Math.floor(Math.random() * videos.length)], volume:0, muted:true})
//    }
//    YoutubeMusic.RunJavascript("var video = document.querySelector('video');if (!video.muted) { var muteButton = document.querySelector('.ytp-mute-button');muteButton.click(); };")
//    YoutubeMusic.RunJavascript("function muteMe(elem) {elem.muted = true;elem.volume=0;} function mutePage() { document.querySelectorAll('video, audio').forEach((elem) => muteMe(elem));} mutePage()")
//    $.Schedule( 0.1, StopSoundBlock)
//}
//
//StopSoundBlock()

var shop_visual_update_pending = false
var plus_window_initialized = false
var PLUS_REWARD_CARDS =
[
    ["pass_reward_1", "s2r://panorama/images/dota_plus/thumb_progression_psd.vtex", "s2r://panorama/images/dota_plus/upsell_progression_psd.vtex"],
    ["pass_reward_2", "s2r://panorama/images/dota_plus/thumb_assistant_psd.vtex", "s2r://panorama/images/dota_plus/upsell_assistant_psd.vtex"],
    ["pass_reward_3", "s2r://panorama/images/dota_plus/thumb_battle_report_psd.vtex", "s2r://panorama/images/dota_plus/upsell_battle_report_psd.vtex"],
    ["pass_reward_4", "s2r://panorama/images/dota_plus/thumb_perks_psd.vtex", "s2r://panorama/images/dota_plus/upsell_perks_psd.vtex"],
]

function GetShopItemType(table)
{
    if (table === Items_pets) { return "Items_pets" }
    if (table === Items_Five) { return "Items_Five" }
    if (table === Items_emblems) { return "Items_emblems" }
    if (table === Items_heads) { return "Items_heads" }
    if (table === Items_tips) { return "Items_tips" }
    if (table === Items_Backround) { return "Items_Backround" }
    if (table === Items_tpscroll) { return "Items_tpscroll" }
    return null
}

function GetShopItemPanelId(item_id)
{
    return "item_shop_" + item_id
}

function SetShopItemActivateFunction(panel, item, item_type)
{
    panel.SetPanelEvent("onactivate", function()
    {
        shop_visual_update_pending = true
        if (item_type == "Items_pets") { SelectCourier(item[0]) }
        else if (item_type == "Items_Five") { SelectFive(item[0]) }
        else if (item_type == "Items_emblems") { SelectEmblem(item[0]) }
        else if (item_type == "Items_heads") { SelectHead(item[0]) }
        else if (item_type == "Items_tips") { SelectTip(item[0]) }
        else if (item_type == "Items_Backround") { SelectBG(item[0]) }
        else if (item_type == "Items_tpscroll") { SelectTeleport(item[0]) }
    })
}

var smelter_storage_signature = ""

function GetShopTabItemsTable()
{
    if (current_tab_shop == "ShopMenuButtonPets") { return Items_pets }
    if (current_tab_shop == "ShopMenuButtonEmblems") { return Items_emblems }
    if (current_tab_shop == "ShopMenuButtonHeads") { return Items_heads }
    if (current_tab_shop == "ShopMenuButtonTips") { return Items_tips }
    if (current_tab_shop == "ShopMenuButtonFive") { return Items_Five }
    if (current_tab_shop == "ShopMenuButtonBG") { return Items_Backround }
    if (current_tab_shop == "ShopMenuButtonTeleport") { return Items_tpscroll }
    return null
}

function RefreshShopItemsCounter()
{
    var counter = $("#ShopInfoBuyItemsCounter")
    if (!counter) { return }
    var table_items = GetShopTabItemsTable()
    if (!table_items)
    {
        counter.text = ""
        return
    }
    ResetItemsProgressCache()
    var how_much_items = HowMuchItemsInTab(table_items)
    counter.text = how_much_items[1] + " / " + how_much_items[0]
}

function UpdateStorageCardCount(entry)
{
    var card = $("#StorageCard_" + entry.kind + "_" + entry.id)
    if (!card) { return }
    var label = card.FindChildTraverse("StorageCardCount_" + entry.kind + "_" + entry.id)
    if (entry.count > 1)
    {
        if (!label)
        {
            label = $.CreatePanel("Label", card, "StorageCardCount_" + entry.kind + "_" + entry.id)
            label.AddClass("StorageCardCount")
        }
        label.text = "x" + entry.count
        label.visible = true
    }
    else if (label)
    {
        label.visible = false
    }
}

function UpdateSmelterStorageFooter(entries)
{
    var melt_all = $("#SmelterMeltAllButton")
    if (melt_all)
    {
        melt_all.SetHasClass("Locked", entries.length == 0 || smelter_melt_in_progress)
    }
    var melt_all_exp = $("#SmelterMeltAllExp")
    if (melt_all_exp)
    {
        melt_all_exp.text = "+" + GetStorageTotalExp(entries) + " " + $.Localize("#shop_smelter_exp")
    }
}

function RefreshAchievementsVisual()
{
    var container = $("#AchievementsQuestContainer")
    if (!container)
    {
        InitAchievements()
        return
    }
    var quests = GetAllQuestsList()
    for (var i = 0; i < quests.length; i++)
    {
        UpdateQuestPanelState(quests[i])
    }
    var counter = $("#AchievementsCounter")
    if (counter)
    {
        var done = 0
        var total = 0
        for (var q = 0; q < quests.length; q++)
        {
            if (!QuestMatchesFilter(quests[q])) { continue }
            total++
            if (GetQuestState(quests[q]) == 2) { done++ }
        }
        counter.text = done + " / " + total
    }
}

function UpdateQuestPanelState(quest)
{
    var refs = achievement_panel_refs[quest[3]]
    if (!refs || !refs.panel.IsValid()) { return }
    var panel = refs.panel
    var progress = GetQuestProgress(quest)
    var claimed = HasItemInventory(quest[0])
    panel.SetHasClass("QuestClaimed", claimed)
    refs.bar.style.width = (progress.value / progress.required) * 100 + "%"
    refs.label.text = GetQuestProgressText(quest, progress)
    var claim = refs.claim
    var claim_label = refs.claim_label
    claim_label.text = claimed ? $.Localize("#woda_quest_claim_reward_sucess") : $.Localize("#woda_quest_claim_reward")
    var can_claim = !claimed && progress.value >= progress.required
    claim.SetHasClass("activate", can_claim)
    if (can_claim)
    {
        BindQuestClaim(panel, quest, claim, claim_label)
    }
    else
    {
        claim.ClearPanelEvent("onactivate")
    }
}

function BindQuestClaim(panel, quest, claim, claim_label)
{
    claim.SetPanelEvent("onactivate", function()
    {
        claim.ClearPanelEvent("onactivate")
        GameEvents.SendCustomGameEventToServer_custom("woda_plus_get_player_reward", {reward_id: quest[0], quest_id: quest[3]})
        LoadingCreated()
    })
}

function UpdateUpgradeCounterVisual(item_id)
{
    var fill = $("#UpgradeCounterFill_" + item_id)
    var label = $("#UpgradeCounterLabel_" + item_id)
    if (!fill || !label) { return }
    var offset = GetUpgradeCounterDisplayOffset(item_id)
    var bought = GetUpgradeCounterBought(item_id)
    var max = GetUpgradeCounterMax(item_id)
    fill.style.width = (max > 0 ? (bought / max) * 100 : 0) + "%"
    label.text = (bought + offset) + " / " + (max + offset)
}

function RefreshUpgradeCounters()
{
    for (var item_id in UPGRADE_COUNTER_FIELDS)
    {
        UpdateUpgradeCounterVisual(item_id)
        MarkUpgradeCardOwned(item_id)
    }
}

function MarkUpgradeCardOwned(item_id)
{
    if (!IsUpgradeOwned(item_id)) { return }
    var window = $("#ShopItemsWindow")
    var card = window ? window.FindChildTraverse(GetShopItemPanelId(item_id)) : null
    if (!card || card.BHasClass("Owned")) { return }
    card.AddClass("Owned")
    card.SetPanelEvent("onactivate", function() {})
    var icon = card.FindChildTraverse("PriceIcon")
    if (icon)
    {
        icon.DeleteAsync(0)
    }
    var buy = card.FindChildTraverse("BuyItemPanel")
    if (buy)
    {
        buy.style.saturation = "0"
    }
    var label = card.FindChildTraverse("PriceLabel")
    if (label)
    {
        label.text = $.Localize("#shop_bought")
    }
}

function RefreshShopItemsVisual()
{
    RefreshUpgradeCounters()
    var tables = [Items_pets, Items_Five, Items_emblems, Items_heads, Items_tips, Items_Backround, Items_tpscroll]
    for (var t = 0; t < tables.length; t++)
    {
        var table = tables[t]
        var item_type = GetShopItemType(table)
        for (var i = 0; i < table.length; i++)
        {
            var panel = $("#ShopItemsWindow").FindChild(GetShopItemPanelId(table[i][0]))
            if (panel && HasItemInventory(table[i][0]))
            {
                if (!panel.BHasClass("Owned"))
                {
                    InitItems()
                    return
                }
                UpdateInventoryItemVisual(panel, table[i], item_type)
            }
        }
    }
}

function InitPlusWindow()
{
    if (plus_window_initialized)
    {
        return
    }
    plus_window_initialized = true
    FillSubscriptionRewards($("#SubscriptionPlusRewards"), SUBSCRIPTION_PLUS_REWARDS, SUBSCRIPTION_PLUS_INSTANT)
    FillSubscriptionRewards($("#SubscriptionPremiumRewards"), SUBSCRIPTION_PREMIUM_REWARDS, SUBSCRIPTION_PREMIUM_INSTANT)
}

function CreateSubscriptionRewardRow(container, key, instant)
{
    var row = $.CreatePanel("Panel", container, "")
    row.AddClass("SubscriptionRewardRow")
    row.SetHasClass("Instant", instant)
    var mark = $.CreatePanel("Panel", row, "")
    mark.AddClass("SubscriptionRewardMark")
    var label = $.CreatePanel("Label", row, "")
    label.AddClass("SubscriptionRewardLabel")
    label.html = true
    label.text = $.Localize("#" + key)
}

function FillSubscriptionRewards(container, keys, instant_keys)
{
    if (!container) { return }
    container.RemoveAndDeleteChildren()
    for (var i = 0; i < keys.length; i++)
    {
        CreateSubscriptionRewardRow(container, keys[i], false)
    }
    if (instant_keys && instant_keys.length > 0)
    {
        var divider = $.CreatePanel("Panel", container, "")
        divider.AddClass("SubscriptionRewardDivider")
        var line_left = $.CreatePanel("Panel", divider, "")
        line_left.AddClass("SubscriptionRewardDividerLine")
        var caption = $.CreatePanel("Label", divider, "")
        caption.AddClass("SubscriptionRewardDividerLabel")
        caption.text = $.Localize("#subscription_instant_title")
        var line_right = $.CreatePanel("Panel", divider, "")
        line_right.AddClass("SubscriptionRewardDividerLine")
        for (var j = 0; j < instant_keys.length; j++)
        {
            CreateSubscriptionRewardRow(container, instant_keys[j], true)
        }
    }
}

function CreatePlusRewardCard(parent, card)
{
    var block = $.CreatePanel("Panel", parent, card[0])
    block.AddClass("pass_reward_block")
    block.style.backgroundImage = 'url("' + card[1] + '")'
    block.style.backgroundSize = "100%"

    var label = $.CreatePanel("Label", block, "")
    label.AddClass("pass_reward_block_label")
    label.text = $.Localize("#" + card[0])

    var image = $.CreatePanel("Panel", block, "")
    image.AddClass("pass_image_block")

    block.SetPanelEvent("onactivate", function()
    {
        ChangePlusRewardInfo(card)
    })
}

function ChangePlusRewardInfo(card)
{
    for (var child of $("#ContentSlider").Children())
    {
        child.SetHasClass("active_reward_info", child.id == card[0])
    }
    $("#ContentHeaderLabel").text = $.Localize("#" + card[0])
    $("#ContentDescriptionLabel").text = $.Localize("#" + card[0] + "_description")
    $("#ContentImage").style.backgroundImage = 'url("' + card[2] + '")'
    $("#ContentImage").style.backgroundSize = "contain"
    $("#ContentImage").style.backgroundRepeat = "no-repeat"
    $("#ContentImage").style.backgroundPosition = "center"
}

function OpenAchievements()
{
    SwitchTab("AchievementsWindow", "MenuAchievements")
}

var achievements_filter = "all"
var achievement_panel_refs = {}
var achievements_build_token = 0
var ACHIEVEMENTS_BUILD_CHUNK = 60
var ACHIEVEMENT_FILTERS =
[
    ["all", "#achievements_filter_all"],
    ["arena", "#achievements_filter_arena"],
    ["rating", "#achievements_filter_rating"],
    ["StrengthQuests", "#DOTA_Tooltip_Ability_item_power_treads_str"],
    ["AgilityQuests", "#DOTA_Tooltip_Ability_item_power_treads_agi"],
    ["IntellectQuests", "#DOTA_Tooltip_Ability_item_power_treads_int"],
    ["UniversalQuests", "#woda_universal"],
    ["ArenaRoomQuests", "#achievements_filter_arena_rooms"],
    ["ShopSpendQuests", "#achievements_filter_cashback"],
]

function GetAllQuestsList()
{
    var result = []
    for (var tab in QUEST_LIST_INFO)
    {
        for (var i = 0; i < QUEST_LIST_INFO[tab].length; i++)
        {
            quest_tab_by_id[QUEST_LIST_INFO[tab][i][3]] = tab
            result.push(QUEST_LIST_INFO[tab][i])
        }
    }
    return result
}

function QuestMatchesFilter(quest, filter)
{
    filter = filter || achievements_filter
    if (filter == "all")
    {
        return true
    }
    if (filter == "arena" || filter == "rating")
    {
        return GetQuestMode(quest[3]) == filter
    }
    return quest_tab_by_id[quest[3]] == filter
}

function HasClaimableQuestForFilter(filter)
{
    var quests = GetAllQuestsList()
    for (var i = 0; i < quests.length; i++)
    {
        if (QuestMatchesFilter(quests[i], filter) && GetQuestState(quests[i]) == 0)
        {
            return true
        }
    }
    return false
}

function SetAchievementsFilter(filter)
{
    achievements_filter = filter
    Game.EmitSound("ui_topmenu_select")
    InitAchievements()
}

function CreateAchievementsFilters(parent)
{
    var bar = $.CreatePanel("Panel", parent, "AchievementsFilters")
    bar.AddClass("AchievementsFilters")
    for (var i = 0; i < ACHIEVEMENT_FILTERS.length; i++)
    {
        CreateAchievementsFilterButton(bar, ACHIEVEMENT_FILTERS[i])
    }
}

function CreateAchievementsFilterButton(bar, filter)
{
    var button = $.CreatePanel("Panel", bar, "AchievementsFilter_" + filter[0])
    button.AddClass("AchievementsFilterButton")
    button.SetHasClass("Active", achievements_filter == filter[0])
    var label = $.CreatePanel("Label", button, "")
    label.AddClass("AchievementsFilterLabel")
    label.text = $.Localize(filter[1])
    var alert = $.CreatePanel("Panel", button, "")
    alert.AddClass("RedAlert")
    button.SetHasClass("HasReward", HasClaimableQuestForFilter(filter[0]))
    button.SetPanelEvent("onactivate", function()
    {
        SetAchievementsFilter(filter[0])
    })
}

function GetQuestProgress(quest)
{
    var required = 0
    if (QUEST_DATA_TABLE && QUEST_DATA_TABLE[quest[3]])
    {
        required = Number(QUEST_DATA_TABLE[quest[3]][1]) || 0
    }
    if (required <= 0 && quest[5] && quest[5].required)
    {
        required = Number(quest[5].required) || 0
    }
    if (required <= 0)
    {
        required = 1
    }
    var value = 0
    if (PLAYER_DATA && PLAYER_DATA.quest_data && PLAYER_DATA.quest_data[quest[3]])
    {
        value = Number(PLAYER_DATA.quest_data[quest[3]]) || 0
    }
    return {value: Math.min(value, required), required: required}
}

function GetQuestProgressText(quest, progress)
{
    if (quest[5] && quest[5].type == "shop_spend")
    {
        return FormatShopSpendProgress(progress.value, quest[5].usd)
    }
    return progress.value + "/" + progress.required
}

function GetQuestState(quest)
{
    var progress = GetQuestProgress(quest)
    var claimed = HasItemInventory(quest[0])
    if (claimed) { return 2 }
    if (progress.value >= progress.required) { return 0 }
    return 1
}

function InitAchievements()
{
    var root = $("#AchievementsWindow")
    if (!root)
    {
        return
    }
    QUEST_DATA_TABLE = Game.GetCustomTable("quest_data", "quest_data")
    root.RemoveAndDeleteChildren()

    var header = $.CreatePanel("Panel", root, "")
    header.AddClass("AchievementsHeader")

    var title = $.CreatePanel("Label", header, "")
    title.AddClass("AchievementsTitle")
    title.text = $.Localize("#shop_achievements") + ":"

    var all_quests = GetAllQuestsList()
    var quests = []
    var done = 0
    for (var i = 0; i < all_quests.length; i++)
    {
        if (!QuestMatchesFilter(all_quests[i]))
        {
            continue
        }
        quests.push(all_quests[i])
        if (GetQuestState(all_quests[i]) == 2)
        {
            done++
        }
    }

    var counter = $.CreatePanel("Label", header, "AchievementsCounter")
    counter.AddClass("AchievementsCounter")
    counter.text = done + " / " + quests.length

    CreateAchievementsFilters(root)

    var sort_keys = {}
    for (var s = 0; s < quests.length; s++)
    {
        var state = GetQuestState(quests[s])
        var progress = GetQuestProgress(quests[s])
        var bottom = quests[s][5] && quests[s][5].bottom && state != 0
        sort_keys[quests[s][3]] = {group: state == 0 ? 0 : (bottom ? 2 : 1), state: state, ratio: progress.value / progress.required, index: s}
    }
    quests.sort(function(a, b)
    {
        var key_a = sort_keys[a[3]]
        var key_b = sort_keys[b[3]]
        if (key_a.group != key_b.group) { return key_a.group - key_b.group }
        if (key_a.state != key_b.state) { return key_a.state - key_b.state }
        if (key_a.ratio != key_b.ratio) { return key_b.ratio - key_a.ratio }
        return key_a.index - key_b.index
    })

    var container = $.CreatePanel("Panel", root, "AchievementsQuestContainer")
    container.AddClass("quest_container")
    achievement_panel_refs = {}
    achievements_build_token++
    BuildAchievementsChunk(container, quests, 0, achievements_build_token)
}

function BuildAchievementsChunk(container, quests, start, token)
{
    if (token != achievements_build_token || !container.IsValid()) { return }
    var end = Math.min(start + ACHIEVEMENTS_BUILD_CHUNK, quests.length)
    for (var k = start; k < end; k++)
    {
        CreateQuestPanel(container, quests[k])
    }
    if (end < quests.length)
    {
        $.Schedule(0, function()
        {
            BuildAchievementsChunk(container, quests, end, token)
        })
    }
}

function GetQuestIconName(quest)
{
    return QUEST_ICON_WITHOUT_OPEN[quest[2]] ? quest[2] : quest[2] + "_open"
}

function SetQuestDescription(label, quest)
{
    var meta = quest[5]
    if (meta && meta.type == "hero_difficulty")
    {
        label.SetDialogVariableInt("difficulty", meta.difficulty)
        label.SetDialogVariable("hero", $.Localize("#" + quest[4]))
        label.text = $.Localize("#quest_arena_hero_difficulty", label)
    }
    else if (meta && meta.type == "arena_room")
    {
        label.SetDialogVariable("room", $.Localize("#arena_room_" + meta.room))
        label.SetDialogVariableInt("difficulty", meta.difficulty)
        label.SetDialogVariableInt("count", meta.count)
        label.text = $.Localize("#quest_arena_room_complete_times", label)
    }
    else if (meta && meta.type == "difficulty_repeat")
    {
        label.SetDialogVariableInt("difficulty", meta.difficulty)
        label.SetDialogVariableInt("count", meta.count)
        label.text = $.Localize("#quest_arena_difficulty_complete_times", label)
    }
    else if (meta && meta.type == "shop_spend")
    {
        label.SetDialogVariable("amount", FormatShopSpendAmount(meta.usd))
        label.text = $.Localize("#quest_shop_spend", label)
    }
    else if (meta && meta.type == "boss_kills")
    {
        label.SetDialogVariableInt("count", meta.count)
        label.text = $.Localize("#quest_arena_boss_kills", label)
    }
    else if (meta && meta.type == "difficulty")
    {
        label.SetDialogVariableInt("difficulty", meta.difficulty)
        label.text = $.Localize("#quest_arena_difficulty_complete", label)
    }
    else if (quest[4])
    {
        label.text = $.Localize("#quest_reach_top_1_for_hero") + " " + $.Localize("#" + quest[4])
    }
    else
    {
        label.text = $.Localize("#quest_id_" + quest[3])
    }
}

function CreateQuestPanel(parent, table)
{
    var progress = GetQuestProgress(table)
    var claimed = HasItemInventory(table[0])

    var quest_panel = $.CreatePanel("Panel", parent, "QuestPanel_" + table[3])
    quest_panel.AddClass("quest_panel")
    quest_panel.SetHasClass("QuestClaimed", claimed)

    var quest_reward_icon = $.CreatePanel("Panel", quest_panel, "")
    quest_reward_icon.AddClass("quest_reward_icon")
    quest_reward_icon.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + GetQuestIconName(table) + '.png")'
    quest_reward_icon.style.backgroundSize = "100%"
    quest_reward_icon.SetHasClass("TipImage", table[2] == "tip")
    if (!QUEST_ICON_NO_TOOLTIP[table[2]])
    {
        SetItemTooltip(quest_reward_icon, {item_id: table[0], name_key: table[1], desc_key: table[1] + "_description", rarity: GetItemRarityById(table[0]), icon: "file://{images}/custom_game/shop/" + table[2] + ".png"})
    }

    if (table[2].indexOf("background") === 0 || table[2].indexOf("emblem") === 0 || table[2].indexOf("five_") === 0 || table[2].indexOf("tp_effect") === 0)
    {
        quest_reward_icon.AddClass("quest_reward_icon_hover")
        SetItemBuyFunction(quest_reward_icon, [table[0], null, null, table[1], table[2], null], true)
    }

    var quest_reward_name = $.CreatePanel("Label", quest_panel, "")
    quest_reward_name.AddClass("quest_reward_name")
    quest_reward_name.text = $.Localize("#" + table[1])

    var quest_description = $.CreatePanel("Label", quest_panel, "")
    quest_description.AddClass("quest_description")
    SetQuestDescription(quest_description, table)

    var quest_progress_with_button_claim = $.CreatePanel("Panel", quest_panel, "")
    quest_progress_with_button_claim.AddClass("quest_progress_with_button_claim")

    var quest_progress_line = $.CreatePanel("Panel", quest_progress_with_button_claim, "")
    quest_progress_line.AddClass("quest_progress_line")

    var quest_progress_bar = $.CreatePanel("Panel", quest_progress_line, "QuestProgressBar_" + table[3])
    quest_progress_bar.AddClass("quest_progress_bar")
    quest_progress_bar.style.width = (progress.value / progress.required) * 100 + "%"

    var quest_progress_label = $.CreatePanel("Label", quest_progress_line, "QuestProgressLabel_" + table[3])
    quest_progress_label.AddClass("quest_progress_label")
    quest_progress_label.text = GetQuestProgressText(table, progress)

    var quest_button_claim = $.CreatePanel("Panel", quest_progress_with_button_claim, "QuestClaim_" + table[3])
    quest_button_claim.AddClass("quest_button_claim")

    var quest_button_claim_label = $.CreatePanel("Label", quest_button_claim, "QuestClaimLabel_" + table[3])
    quest_button_claim_label.AddClass("quest_button_claim_label")
    quest_button_claim_label.text = claimed ? $.Localize("#woda_quest_claim_reward_sucess") : $.Localize("#woda_quest_claim_reward")

    achievement_panel_refs[table[3]] = {panel: quest_panel, bar: quest_progress_bar, label: quest_progress_label, claim: quest_button_claim, claim_label: quest_button_claim_label}

    if (!claimed && progress.value >= progress.required)
    {
        quest_button_claim.AddClass("activate")
        quest_button_claim.SetPanelEvent("onactivate", function()
        {
            quest_button_claim.ClearPanelEvent("onactivate")
            GameEvents.SendCustomGameEventToServer_custom("woda_plus_get_player_reward", {reward_id: table[0], quest_id: table[3]})
            LoadingCreated()
        })
    }
}

function HasClaimableQuest()
{
    var quests = GetAllQuestsList()
    for (var i = 0; i < quests.length; i++)
    {
        if (GetQuestState(quests[i]) == 0)
        {
            return true
        }
    }
    return false
}

function CheckoutEveryReward(free_reward_claimed)
{
    var has_free_reward = !free_reward_claimed && PLAYER_DATA && PLAYER_DATA.free_reward != 1
    var has_quest_reward = HasClaimableQuest()
    $("#DonateButton").SetHasClass("HasReward", !!has_free_reward || has_quest_reward)
    var achievements_button = $("#MenuAchievements")
    if (achievements_button)
    {
        achievements_button.SetHasClass("HasReward", has_quest_reward)
    }
    SetMenuCountBadge("MenuAchievementsCount", GetClaimableQuestCount())
    RefreshAchievementsFilterBadges()
}

function RefreshAchievementsFilterBadges()
{
    for (var i = 0; i < ACHIEVEMENT_FILTERS.length; i++)
    {
        var button = $("#AchievementsFilter_" + ACHIEVEMENT_FILTERS[i][0])
        if (button)
        {
            button.SetHasClass("HasReward", HasClaimableQuestForFilter(ACHIEVEMENT_FILTERS[i][0]))
        }
    }
}

var chest_spin_in_progress = false
var chest_pending_result = null
var chest_spin_timeout = -1
var CHEST_SPIN_COST = 10
var CHEST_OPEN_TEN_COUNT = 11
var CHEST_OPEN_TEN_PAID = 10
var chest_last_result = null
var chest_result_prayer = null
var chest_last_request = null
var chest_busy_retries = 0
var chest_pool_visible = false
var chest_stage_panel = null
var chest_pool_button = null
var chest_pool_panel = null
var chest_pool_cards = {}
var CHEST_RARITY_RANK = {E: 0, C: 1, B: 2, A: 3, S: 4, R: 5, U: 6}
var CHEST_RARITY_ORDER = ["U", "R", "S", "A", "B", "C", "E"]
var CHEST_PRAYER_RULES =
{
    normal: {exclude_types: {Items_tips: true}, exclude_ids: {"866": true, special_coins_10: true, special_double_token: true}, only_ids_by_rarity: {}},
    boss: {exclude_types: {Items_tpscroll: true, Items_Five: true}, exclude_ids: {special_coins_100: true}, only_ids_by_rarity: {R: {"866": true}}},
}
var SMELTER_COAL_EXP = 1
var CHEST_SPECIAL_REWARDS =
{
    special_coins_10: {icon: "xsolla_packs/coins_1", name: "chest_reward_coins_10", rarity: "U"},
    special_coins_25: {icon: "xsolla_packs/coins_1", name: "chest_reward_coins_25", rarity: "U"},
    special_coins_50: {icon: "xsolla_packs/coins_1", name: "chest_reward_coins_50", rarity: "U"},
    special_coins_100: {icon: "xsolla_packs/coins_1", name: "chest_reward_coins_100", rarity: "U"},
    special_plus_day: {icon: "dp1", name: "chest_reward_plus_day", rarity: "U"},
    special_double_token: {icon: "double_token", name: "chest_reward_double_token", rarity: "U"},
    coal: {icon: "coal", name: "chest_reward_coal", rarity: "U"},
}
var chest_pool_signature = ""

function GetChestStagePanel()
{
    if (chest_stage_panel && chest_stage_panel.IsValid())
    {
        return chest_stage_panel
    }
    return $("#ChestGachaStage")
}

function GetChestPoolButton()
{
    if (chest_pool_button && chest_pool_button.IsValid())
    {
        return chest_pool_button
    }
    return $("#ChestPoolButton")
}
var UPGRADE_TALENT_POINTS_MAX = 20
var UPGRADE_START_LEVEL_MAX = 29
var UPGRADE_CURSE_MAX = 30

function IsUpgradeOwned(item_id)
{
    if (!PLAYER_DATA)
    {
        return false
    }
    if (item_id == "upgrade_rune_slot")
    {
        return Number(PLAYER_DATA.rune_slot_bonus) > 0
    }
    if (item_id == "upgrade_talent_point")
    {
        return Number(PLAYER_DATA.talent_points_bonus) >= UPGRADE_TALENT_POINTS_MAX
    }
    if (item_id == "upgrade_backpack")
    {
        return Number(PLAYER_DATA.backpack_bonus) > 0
    }
    if (item_id == "upgrade_start_level")
    {
        return Number(PLAYER_DATA.start_level_bonus) >= UPGRADE_START_LEVEL_MAX
    }
    if (item_id == "upgrade_auto_midas")
    {
        return Number(PLAYER_DATA.auto_midas_bonus) > 0
    }
    if (item_id == "upgrade_curse_armor")
    {
        return Number(PLAYER_DATA.curse_armor_bonus) >= UPGRADE_CURSE_MAX
    }
    if (item_id == "upgrade_curse_magic")
    {
        return Number(PLAYER_DATA.curse_magic_bonus) >= UPGRADE_CURSE_MAX
    }
    return false
}

function GetChestPoolTables()
{
    return [[Items_pets, "Items_pets"], [Items_Five, "Items_Five"], [Items_emblems, "Items_emblems"], [Items_heads, "Items_heads"], [Items_tips, "Items_tips"], [Items_Backround, "Items_Backround"], [Items_tpscroll, "Items_tpscroll"]]
}

function MakeChestItemInfo(row, item_type)
{
    return {
        id: row[0],
        icon: row[4].indexOf("pet_") === 0 ? row[0] : row[3],
        name: row[4],
        row: row,
        type: item_type,
    }
}

function GetChestItemInfo(item_id)
{
    var tables = GetChestPoolTables()
    for (var t = 0; t < tables.length; t++)
    {
        var table = tables[t][0]
        for (var i = 0; i < table.length; i++)
        {
            if (String(table[i][0]) == String(item_id))
            {
                return MakeChestItemInfo(table[i], tables[t][1])
            }
        }
    }
    var special = CHEST_SPECIAL_REWARDS[String(item_id)]
    if (special)
    {
        return {id: String(item_id), icon: special.icon, name: special.name, row: null, type: "special", rarity: special.rarity, special: true}
    }
    return null
}

function GetChestItemRarity(item)
{
    if (!item) { return "E" }
    if (item.rarity) { return item.rarity }
    return (item.row ? GetShopRowRarity(item.row) : null) || "E"
}

function SetChestItemTooltip(panel, item)
{
    if (item.special)
    {
        SetItemTooltip(panel, {name_key: item.name, desc_key: item.name + "_description", rarity: item.rarity, icon: "file://{images}/custom_game/shop/" + item.icon + ".png"})
    }
    else
    {
        SetShopItemTooltip(panel, item.id)
    }
}

function IsChestItemAllowedForPrayer(item)
{
    var rules = CHEST_PRAYER_RULES[chest_prayer_selected]
    if (!rules || !item) { return true }
    if (rules.exclude_types[item.type]) { return false }
    if (rules.exclude_ids[String(item.id)]) { return false }
    var only_ids = rules.only_ids_by_rarity[GetChestItemRarity(item)]
    if (only_ids && !only_ids[String(item.id)]) { return false }
    return true
}

function GetChestPool(only_unowned)
{
    var pool = []
    var tables = GetChestPoolTables()
    for (var t = 0; t < tables.length; t++)
    {
        var table = tables[t][0]
        for (var i = 0; i < table.length; i++)
        {
            var row = table[i]
            if (row[1] != "coin" || row[5])
            {
                continue
            }
            if (!/^\d+$/.test(String(row[0])))
            {
                continue
            }
            if (only_unowned && HasItemInventory(row[0]))
            {
                continue
            }
            var item = MakeChestItemInfo(row, tables[t][1])
            if (IsChestItemAllowedForPrayer(item))
            {
                pool.push(item)
            }
        }
    }
    for (var special_id in CHEST_SPECIAL_REWARDS)
    {
        var special = GetChestItemInfo(special_id)
        if (IsChestItemAllowedForPrayer(special))
        {
            pool.push(special)
        }
    }
    return pool
}

function InitChest()
{
    var root = $("#ChestWindow")
    if (!root) { return }

    root.RemoveAndDeleteChildren()
    root.AddClass("RunesWindowContent")

    var main = $.CreatePanel("Panel", root, "ChestMain")
    main.AddClass("RunesMain")

    var description = $.CreatePanel("Label", main, "")
    description.AddClass("RunesDescription")
    description.html = true
    description.text = $.Localize("#shop_chest_description")

    CreateChestGacha(main)
}

function ToggleChestPool()
{
    Game.EmitSound("ui_topmenu_select")
    chest_pool_visible = !chest_pool_visible
    RenderChestStage()
}

function RenderChestStage()
{
    var stage = GetChestStagePanel()
    if (!stage) { return }
    var pool_button = GetChestPoolButton()
    if (pool_button)
    {
        pool_button.SetHasClass("Active", chest_pool_visible)
        var pool_label = pool_button.GetChild(0)
        if (pool_label)
        {
            pool_label.text = $.Localize(chest_pool_visible ? "#shop_chest_back" : "#shop_chest_possible_rewards")
        }
    }
    if (chest_pool_panel && chest_pool_panel.IsValid())
    {
        chest_pool_panel.visible = chest_pool_visible
    }
    var footer_counter = $("#ChestPoolCounter")
    if (footer_counter)
    {
        footer_counter.visible = chest_pool_visible
    }
    stage.visible = !chest_pool_visible
    if (chest_pool_visible)
    {
        RefreshChestPool()
        return
    }
    if (stage.GetChildCount() > 0)
    {
        return
    }
    if (chest_last_result && chest_last_result.length > 0)
    {
        var row = CreateChestStageRow(stage)
        for (var i = 0; i < chest_last_result.length; i++)
        {
            var card = CreateChestRevealCard(row, chest_last_result[i])
            if (card)
            {
                card.AddClass("Show")
            }
        }
        if (!chest_spin_in_progress)
        {
            ShowChestAcceptButton()
        }
    }
    else
    {
        BuildChestIdleStage(stage)
    }
}

function GetChestPoolSorted()
{
    var pool = GetChestPool(false)
    var entries = []
    for (var i = 0; i < pool.length; i++)
    {
        var item = pool[i]
        var rarity = GetChestItemRarity(item)
        entries.push({
            item: item,
            id: String(item.id),
            owned: item.special ? false : HasItemInventory(item.id),
            rarity: rarity,
            rank: CHEST_RARITY_RANK[rarity] || 0,
            name: $.Localize("#" + item.name),
        })
    }
    entries.sort(function(a, b)
    {
        if (a.rank != b.rank) { return b.rank - a.rank }
        if (a.owned != b.owned) { return a.owned ? -1 : 1 }
        return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)
    })
    return entries
}

function GetChestRarityChances(entries)
{
    var table = Game.GetCustomTable("chest_prayers", "chances")
    var prayer_chances = table ? table[chest_prayer_selected] : null
    var chances = {}
    for (var i = 0; i < entries.length; i++)
    {
        var rarity = entries[i].rarity
        chances[rarity] = prayer_chances ? (Number(prayer_chances[rarity]) || 0) : 0
    }
    return chances
}

function FormatChestChance(chance)
{
    chance = Number(chance) || 0
    if (chance <= 0) { return "0" }
    var decimals = 1
    if (chance < 10) { decimals = 2 }
    if (chance < 1) { decimals = Math.min(8, Math.ceil(-Math.log(chance) / Math.LN10) + 1) }
    var text = chance.toFixed(decimals)
    if (text.indexOf(".") >= 0)
    {
        text = text.replace(/0+$/, "").replace(/\.$/, "")
    }
    return text
}

function RefreshChestPool()
{
    if (!chest_pool_panel || !chest_pool_panel.IsValid()) { return }
    var list = chest_pool_panel.FindChildTraverse("ChestPoolList")
    if (!list) { return }
    var entries = GetChestPoolSorted()
    var signature_parts = []
    var owned_count = 0
    var items_count = 0
    for (var i = 0; i < entries.length; i++)
    {
        signature_parts.push(entries[i].id + (entries[i].owned ? "+" : "-"))
        if (!entries[i].item.special)
        {
            items_count++
            if (entries[i].owned) { owned_count++ }
        }
    }
    var signature = signature_parts.join(",")
    if (signature != chest_pool_signature || list.GetChildCount() == 0)
    {
        chest_pool_signature = signature
        list.RemoveAndDeleteChildren()
        var chances = GetChestRarityChances(entries)
        for (var r = 0; r < CHEST_RARITY_ORDER.length; r++)
        {
            var rarity = CHEST_RARITY_ORDER[r]
            var group = []
            for (var e = 0; e < entries.length; e++)
            {
                if (entries[e].rarity == rarity) { group.push(entries[e]) }
            }
            if (group.length == 0) { continue }
            CreateChestPoolGroupHeader(list, rarity, chances[rarity] || 0)
            for (var g = 0; g < group.length; g++)
            {
                CreateChestPoolCard(list, group[g].item)
            }
        }
    }
    var counter = $("#ChestPoolCounter")
    if (counter)
    {
        counter.text = owned_count + " / " + items_count
    }
}

function CreateChestPoolGroupHeader(parent, rarity, chance)
{
    var header = $.CreatePanel("Panel", parent, "")
    header.AddClass("ChestPoolGroupHeader")
    var line_left = $.CreatePanel("Panel", header, "")
    line_left.AddClass("ChestPoolGroupLine")
    var name_row = $.CreatePanel("Panel", header, "")
    name_row.AddClass("ChestPoolGroupNameRow")
    var name_prefix = $.CreatePanel("Label", name_row, "")
    name_prefix.AddClass("ChestPoolGroupName")
    name_prefix.AddClass("ChestPoolGroupPrefix")
    name_prefix.text = $.Localize("#rarity_label") + ":"
    var name = $.CreatePanel("Label", name_row, "")
    name.AddClass("ChestPoolGroupName")
    name.AddClass("ChestPoolGroupValue")
    name.AddClass("RarityText_" + rarity)
    name.text = $.Localize("#rarity_" + rarity)
    var chance_label = $.CreatePanel("Label", header, "")
    chance_label.AddClass("ChestPoolGroupChance")
    chance_label.text = $.Localize("#shop_chest_chance_label") + " " + FormatChestChance(chance) + "%"
    var line_right = $.CreatePanel("Panel", header, "")
    line_right.AddClass("ChestPoolGroupLine")
}

function CreateChestPoolCard(parent, item)
{
    var card = $.CreatePanel("Panel", parent, "ChestPoolCard_" + item.id)
    card.AddClass("ChestPoolCard")
    card.SetHasClass("Owned", !item.special && HasItemInventory(item.id))

    var icon = $.CreatePanel("Panel", card, "")
    icon.AddClass("ChestPoolIcon")
    icon.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + item.icon + '.png")'
    icon.style.backgroundSize = "100%"
    ApplyRarityGlow(icon, GetChestItemRarity(item))
    icon.SetHasClass("TipImage", item.type == "Items_tips")
    SetChestItemTooltip(card, item)

    var name_panel = $.CreatePanel("Panel", card, "")
    name_panel.AddClass("ChestPoolNamePanel")

    var name = $.CreatePanel("Label", name_panel, "")
    name.AddClass("ChestPoolName")
    name.text = $.Localize("#" + item.name)

    if (IsChestItemPreviewable(item))
    {
        SetItemBuyFunction(card, item.row, true)
    }
    return card
}

function CreateChestGacha(parent)
{
    var gacha = $.CreatePanel("Panel", parent, "ChestGacha")
    gacha.AddClass("ChestGacha")

    var stage = $.CreatePanel("Panel", gacha, "ChestGachaStage")
    stage.AddClass("ChestGachaStage")
    chest_stage_panel = stage

    var pool_panel = $.CreatePanel("Panel", gacha, "ChestPoolInline")
    pool_panel.AddClass("ChestPoolInline")
    pool_panel.visible = false
    chest_pool_panel = pool_panel
    chest_pool_cards = {}
    var pool_list = $.CreatePanel("Panel", pool_panel, "ChestPoolList")
    pool_list.AddClass("RunesList")
    pool_list.AddClass("ChestPoolInlineList")
    RefreshChestPool()

    var footer = $.CreatePanel("Panel", gacha, "ChestGachaFooter")
    footer.AddClass("ChestGachaFooter")

    var status = $.CreatePanel("Label", footer, "ChestGachaStatus")
    status.AddClass("ChestGachaStatus")

    var pool_counter = $.CreatePanel("Label", footer, "ChestPoolCounter")
    pool_counter.AddClass("ChestPoolFooterCounter")

    var pool_button = $.CreatePanel("Panel", footer, "ChestPoolButton")
    pool_button.AddClass("ChestPoolButton")
    chest_pool_button = pool_button
    var pool_label = $.CreatePanel("Label", pool_button, "")
    pool_label.AddClass("ChestPoolButtonLabel")
    pool_label.text = $.Localize("#shop_chest_possible_rewards")
    pool_button.SetPanelEvent("onactivate", function()
    {
        ToggleChestPool()
    })

    var buttons_row = $.CreatePanel("Panel", footer, "ChestGachaButtons")
    buttons_row.AddClass("ChestGachaButtons")

    CreateChestOpenButton(buttons_row, "ChestOpenOneButton", 1, CHEST_SPIN_COST, $.Localize("#shop_chest_open_one"), "")
    CreateChestOpenButton(buttons_row, "ChestOpenTenButton", CHEST_OPEN_TEN_PAID, CHEST_SPIN_COST * CHEST_OPEN_TEN_PAID, $.Localize("#shop_chest_open_ten"), $.Localize("#shop_chest_gift_hint"))

    RenderChestStage()

    UpdateChestOpenButtons()
}

function CreateChestOpenButton(parent, id, count, price, label_text, hint_text)
{
    var wrap = $.CreatePanel("Panel", parent, "")
    wrap.AddClass("ChestOpenButtonWrap")

    var button = $.CreatePanel("Panel", wrap, id)
    button.AddClass("ChestOpenButton")

    var content = $.CreatePanel("Panel", button, "")
    content.AddClass("ChestOpenButtonContent")

    var label = $.CreatePanel("Label", content, "")
    label.AddClass("ChestOpenButtonLabel")
    label.text = label_text

    var divider = $.CreatePanel("Panel", content, "")
    divider.AddClass("ChestOpenButtonDivider")

    var price_row = $.CreatePanel("Panel", content, "")
    price_row.AddClass("ChestOpenButtonPriceRow")

    var price_label = $.CreatePanel("Label", price_row, id + "_Price")
    price_label.AddClass("RunesOpenButtonPriceLabel")
    price_label.text = String(price)

    var crystal = $.CreatePanel("Panel", price_row, id + "_Icon")
    crystal.AddClass("RunesOpenButtonCrystal")
    crystal.style.marginRight = "0px"
    crystal.style.marginLeft = "6px"

    if (hint_text != "")
    {
        var hint = $.CreatePanel("Label", wrap, "")
        hint.AddClass("ChestOpenButtonHint")
        hint.text = hint_text
    }

    button.SetPanelEvent("onactivate", function()
    {
        if (button.BHasClass("Locked"))
        {
            return
        }
        RequestChestOpen(count, GetChestPrayerCost() * count)
    })
    return button
}

function CreateChestRevealFx(card)
{
    var icon = card.FindChildTraverse("ChestRevealIcon")
    var center_y = 151
    if (icon && icon.actuallayoutheight > 0 && icon.actualuiscale_y > 0)
    {
        center_y = (icon.actualyoffset + icon.actuallayoutheight / 2) / icon.actualuiscale_y
    }
    var fx = $.CreatePanel("DOTAParticleScenePanel", card, "",
    {
        class: "ChestRevealFx",
        particleName: "particles/shop_fx/chest_card_reveal.vpcf",
        particleonly: "true",
        startActive: "true",
        cameraOrigin: "0 0 40",
        lookAt: "0 0 0",
        fov: "64",
        squarePixels: "true",
        hittest: "false"
    })
    fx.style.height = Math.round(center_y * 2) + "px"
    fx.DeleteAsync(2.5)
}

function CreateChestStageRow(stage)
{
    stage.RemoveAndDeleteChildren()
    stage.AddClass("ChestPrayerIdle")
    stage.SetHasClass("BossPrayer", (chest_result_prayer || chest_prayer_selected) == "boss")
    var row = $.CreatePanel("Panel", stage, "ChestGachaRow")
    row.AddClass("ChestGachaRow")
    return row
}

function GetChestPrayerInfo(prayer_id)
{
    for (var i = 0; i < CHEST_PRAYER_LIST.length; i++)
    {
        if (CHEST_PRAYER_LIST[i].id == prayer_id)
        {
            return CHEST_PRAYER_LIST[i]
        }
    }
    return CHEST_PRAYER_LIST[0]
}

function SelectChestPrayer(prayer_id)
{
    if (chest_prayer_selected == prayer_id) { return }
    chest_prayer_selected = prayer_id
    Game.EmitSound("ui_topmenu_select")
    var stage = GetChestStagePanel()
    if (stage)
    {
        BuildChestIdleStage(stage)
    }
    RefreshChestPool()
    UpdateChestOpenButtons()
}

function GetChestPrayerCost()
{
    return Number(GetChestPrayerInfo(chest_prayer_selected).cost) || CHEST_SPIN_COST
}

function IsChestPrayerSoul()
{
    return GetChestPrayerInfo(chest_prayer_selected).currency == "soul"
}

function GetChestPrayerBalance()
{
    if (!PLAYER_DATA) { return 0 }
    return IsChestPrayerSoul() ? GetBossSoulsCount() : (Number(PLAYER_DATA.crystals) || 0)
}

function CreateChestPrayerCard(parent, prayer, selected)
{
    var card = $.CreatePanel("Panel", parent, "ChestPrayerCard_" + prayer.id)
    card.AddClass("ChestPrayerCard")
    card.SetHasClass("Selected", selected)
    card.SetHasClass("BossPrayer", prayer.id == "boss")
    if (!selected)
    {
        card.SetPanelEvent("onactivate", function()
        {
            SelectChestPrayer(prayer.id)
        })
    }

    var icon = $.CreatePanel("Panel", card, "")
    icon.AddClass("ChestPrayerIcon")

    var name = $.CreatePanel("Label", card, "")
    name.AddClass("ChestPrayerName")
    name.text = $.Localize(prayer.name_key)
    return card
}

function BuildChestIdleStage(stage)
{
    stage.RemoveAndDeleteChildren()
    stage.AddClass("ChestPrayerIdle")
    stage.SetHasClass("BossPrayer", chest_prayer_selected == "boss")
    var idle = $.CreatePanel("Panel", stage, "")
    idle.AddClass("ChestGachaIdle")

    var selected_row = $.CreatePanel("Panel", idle, "")
    selected_row.AddClass("ChestPrayerSelectedRow")
    CreateChestPrayerCard(selected_row, GetChestPrayerInfo(chest_prayer_selected), true)

    var others = $.CreatePanel("Panel", idle, "")
    others.AddClass("ChestPrayerOthers")
    for (var i = 0; i < CHEST_PRAYER_LIST.length; i++)
    {
        if (CHEST_PRAYER_LIST[i].id == chest_prayer_selected) { continue }
        CreateChestPrayerCard(others, CHEST_PRAYER_LIST[i], false)
    }
}

function CreateChestRevealCard(stage, result)
{
    var item = GetChestItemInfo(result.item_id)
    if (!item) { return null }
    var rarity = GetChestItemRarity(item)
    var card = $.CreatePanel("Panel", stage, "")
    card.AddClass("ChestRevealCard")
    card.AddClass("ChestRarity_" + rarity)
    card.SetHasClass("Duplicate", result.duplicate == 1)
    SetChestItemTooltip(card, item)

    var glow = $.CreatePanel("Panel", card, "")
    glow.AddClass("ChestRevealGlow")

    var bg = $.CreatePanel("Panel", card, "")
    bg.AddClass("ChestRevealBG")

    var frame = $.CreatePanel("Panel", card, "")
    frame.AddClass("ChestRevealFrame")

    var content = $.CreatePanel("Panel", card, "")
    content.AddClass("ChestRevealContent")

    var tier = $.CreatePanel("Label", content, "")
    tier.AddClass("ChestRevealTier")
    tier.text = rarity

    var icon = $.CreatePanel("Panel", content, "ChestRevealIcon")
    icon.AddClass("ChestRevealIcon")
    icon.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + item.icon + '.png")'
    icon.style.backgroundSize = "100%"
    icon.SetHasClass("TipImage", item.type == "Items_tips")

    var name = $.CreatePanel("Label", content, "")
    name.AddClass("ChestRevealName")
    name.text = $.Localize("#" + item.name)

    var tag = $.CreatePanel("Label", content, "")
    tag.AddClass("ChestRevealTag")
    if (item.special)
    {
        tag.text = result.duplicate == 1 ? $.Localize("#shop_chest_coal_short") : $.Localize("#shop_chest_reward_short")
    }
    else
    {
        tag.text = result.duplicate == 1 ? $.Localize("#shop_chest_duplicate_short") : $.Localize("#shop_chest_new_short")
    }
    if (IsChestItemPreviewable(item))
    {
        card.AddClass("Previewable")
        SetItemBuyFunction(card, item.row, true)
    }
    return card
}

function IsChestItemPreviewable(item)
{
    if (!item || item.special || !item.row) { return false }
    return item.type == "Items_emblems" || item.type == "Items_heads" || item.type == "Items_Five" || item.type == "Items_Backround" || item.type == "Items_tpscroll"
}

function RequestChestOpen(count, price)
{
    if (chest_spin_in_progress)
    {
        return
    }
    chest_last_request = {count: count, price: price}
    if (GetChestPool(false).length == 0)
    {
        return
    }
    if (PLAYER_DATA && GetChestPrayerBalance() < price && !Game.IsInToolsMode())
    {
        ErrorCreated({error_name: IsChestPrayerSoul() ? "shop_error_no_boss_souls" : "shop_error_no_crystals"})
        return
    }
    chest_spin_in_progress = true
    UpdateChestOpenButtons()
    var status = $("#ChestGachaStatus")
    if (status) { status.text = "" }
    GameEvents.SendCustomGameEventToServer_custom("woda_chest_open_request", {count: count, prayer: chest_prayer_selected})
    if (chest_spin_timeout != -1)
    {
        $.CancelScheduled(chest_spin_timeout)
    }
    chest_spin_timeout = $.Schedule(3.0, function()
    {
        chest_spin_timeout = -1
        if (!chest_spin_in_progress || chest_pending_result != null)
        {
            return
        }
        chest_spin_in_progress = false
        UpdateChestOpenButtons()
    })
}

function OnChestOpenResult(data)
{
    if (chest_spin_timeout != -1)
    {
        $.CancelScheduled(chest_spin_timeout)
        chest_spin_timeout = -1
    }
    var results = []
    if (data && data.items)
    {
        for (var key in data.items)
        {
            var entry = data.items[key]
            if (entry && entry.item_id != null)
            {
                results.push({item_id: entry.item_id, duplicate: Number(entry.duplicate) || 0, special: Number(entry.special) || 0})
            }
        }
    }
    chest_last_result = results
    chest_result_prayer = data && data.prayer ? String(data.prayer) : chest_prayer_selected
    chest_pending_result = results
    chest_busy_retries = 0
    chest_pool_visible = false
    if (chest_pool_panel && chest_pool_panel.IsValid())
    {
        chest_pool_panel.visible = false
    }
    var stage = GetChestStagePanel()
    if (stage)
    {
        stage.visible = true
    }
    if (!stage || results.length == 0)
    {
        chest_spin_in_progress = false
        chest_pending_result = null
        UpdateChestOpenButtons()
        RefreshChestPool()
        return
    }
    var pool_button = GetChestPoolButton()
    if (pool_button)
    {
        pool_button.SetHasClass("Active", false)
        var pool_label = pool_button.GetChild(0)
        if (pool_label)
        {
            pool_label.text = $.Localize("#shop_chest_possible_rewards")
        }
    }
    var row = CreateChestStageRow(stage)
    Game.EmitSound("ui.treasure_01")
    var step = results.length > 1 ? 0.35 : 0.2
    for (var i = 0; i < results.length; i++)
    {
        ScheduleChestReveal(row, results[i], i, step, i == results.length - 1)
    }
}

function ScheduleChestReveal(stage, result, index, step, is_last)
{
    $.Schedule(0.25 + index * step, function()
    {
        if (chest_pending_result != chest_last_result || !stage.IsValid())
        {
            chest_spin_in_progress = false
            chest_pending_result = null
            UpdateChestOpenButtons()
            return
        }
        var card = CreateChestRevealCard(stage, result)
        if (card)
        {
            $.Schedule(0.03, function()
            {
                if (card.IsValid())
                {
                    card.AddClass("Show")
                    CreateChestRevealFx(card)
                }
            })
            Game.EmitSound("ui_topmenu_select")
        }
        if (is_last)
        {
            $.Schedule(0.5, function()
            {
                Game.EmitSound("ui.treasure_02")
                chest_spin_in_progress = false
                chest_pending_result = null
                UpdateChestOpenButtons()
                RefreshChestPool()
                ShowChestAcceptButton()
            })
        }
    })
}

function ShowChestAcceptButton()
{
    var stage = GetChestStagePanel()
    if (!stage || !chest_last_result || chest_last_result.length == 0) { return }
    var existing = stage.FindChildTraverse("ChestAcceptButton")
    if (existing) { return }

    var button = $.CreatePanel("Panel", stage, "ChestAcceptButton")
    button.AddClass("ChestOpenButton")
    button.AddClass("ChestAcceptButton")
    var is_boss_result = (chest_result_prayer || chest_prayer_selected) == "boss"
    button.SetHasClass("PrayerHeaven", !is_boss_result)
    button.SetHasClass("PrayerHell", is_boss_result)

    var content = $.CreatePanel("Panel", button, "")
    content.AddClass("ChestOpenButtonContent")

    var label = $.CreatePanel("Label", content, "")
    label.AddClass("ChestOpenButtonLabel")
    label.AddClass("ChestAcceptButtonLabel")
    label.text = $.Localize("#shop_rune_accept")

    button.SetPanelEvent("onactivate", function()
    {
        AcceptChestResult()
    })

    $.Schedule(0.03, function()
    {
        if (button.IsValid())
        {
            button.AddClass("Show")
        }
    })
}

function AcceptChestResult()
{
    if (chest_spin_in_progress) { return }
    Game.EmitSound("ui_topmenu_select")
    chest_last_result = null
    chest_pending_result = null
    var stage = GetChestStagePanel()
    if (stage)
    {
        BuildChestIdleStage(stage)
    }
    UpdateChestOpenButtons()
}

function OnChestOpenDenied(data)
{
    chest_spin_in_progress = false
    chest_pending_result = null
    if (chest_spin_timeout != -1)
    {
        $.CancelScheduled(chest_spin_timeout)
        chest_spin_timeout = -1
    }
    UpdateChestOpenButtons()
    if (data && data.reason == "busy" && chest_last_request && chest_busy_retries < 3)
    {
        chest_busy_retries++
        var retry = chest_last_request
        $.Schedule(0.4, function()
        {
            if (!chest_spin_in_progress && current_tab == "ChestWindow")
            {
                RequestChestOpen(retry.count, retry.price)
            }
        })
        return
    }
    chest_busy_retries = 0
}

function UpdateChestOpenButtons()
{
    var all_owned = GetChestPool(false).length == 0
    var buttons = ["ChestOpenOneButton", "ChestOpenTenButton"]
    var counts = [1, CHEST_OPEN_TEN_PAID]
    var is_soul = IsChestPrayerSoul()
    for (var i = 0; i < buttons.length; i++)
    {
        var button = $("#" + buttons[i])
        if (button)
        {
            button.SetHasClass("Locked", chest_spin_in_progress || all_owned)
            button.SetHasClass("PrayerHeaven", !is_soul)
            button.SetHasClass("PrayerHell", is_soul)
        }
        var price_label = $("#" + buttons[i] + "_Price")
        if (price_label)
        {
            price_label.text = String(GetChestPrayerCost() * counts[i])
        }
        var icon = $("#" + buttons[i] + "_Icon")
        if (icon)
        {
            icon.SetHasClass("BossSoulIcon", is_soul)
        }
    }
    var status = $("#ChestGachaStatus")
    if (status)
    {
        status.text = all_owned ? $.Localize("#shop_chest_all_owned") : ""
    }
}

GameEvents.Subscribe_custom("woda_chest_open_result", OnChestOpenResult)
GameEvents.Subscribe_custom("woda_chest_open_denied", OnChestOpenDenied)

function GetSmelterExpForLevel(level)
{
    level = Math.max(0, Math.floor(Number(level) || 0))
    return SMELTER_LEVEL_EXP_STEP * level * (level + 1) / 2
}

function GetSmelterLevelByExp(exp)
{
    exp = Number(exp) || 0
    var level = 0
    while (level < SMELTER_MAX_LEVEL && exp >= GetSmelterExpForLevel(level + 1))
    {
        level++
    }
    return level
}

function GetSmelterExp()
{
    if (!PLAYER_DATA) { return 0 }
    return Math.max(0, Number(PLAYER_DATA.smelter_exp) || 0)
}

function GetStorageItemExp(kind, item_id)
{
    if (kind == "rune")
    {
        return SMELTER_RUNE_EXP
    }
    if (String(item_id) == "coal")
    {
        return SMELTER_COAL_EXP
    }
    var found = FindShopItemRow(item_id)
    var rarity = found ? GetShopRowRarity(found.row) : null
    return SMELTER_EXP_BY_RARITY[rarity] || SMELTER_EXP_BY_RARITY.E
}

function GetStorageEntries()
{
    var entries = []
    if (!PLAYER_DATA) { return entries }
    var items = PLAYER_DATA.storage_items || {}
    for (var item_id in items)
    {
        var count = Number(items[item_id]) || 0
        if (count <= 0) { continue }
        var info = GetChestItemInfo(item_id)
        if (!info) { continue }
        entries.push({
            kind: "item",
            id: String(item_id),
            count: count,
            icon: "file://{images}/custom_game/shop/" + info.icon + ".png",
            name: $.Localize("#" + info.name),
            is_tip: info.type == "Items_tips",
            rarity: GetChestItemRarity(info),
            exp: GetStorageItemExp("item", item_id),
        })
    }
    var runes = PLAYER_DATA.storage_runes || {}
    for (var rune_id in runes)
    {
        var rune_count = Number(runes[rune_id]) || 0
        if (rune_count <= 0) { continue }
        var rune = GetRuneInfo(rune_id)
        if (!rune) { continue }
        entries.push({
            kind: "rune",
            id: String(rune_id),
            count: rune_count,
            icon: "file://{images}/custom_game/runes/" + rune_id + ".png",
            name: $.Localize("#" + rune_id),
            is_tip: false,
            rarity: GetRuneRarity(rune_id),
            exp: GetStorageItemExp("rune", rune_id),
        })
    }
    entries.sort(function(a, b)
    {
        if (a.exp != b.exp) { return b.exp - a.exp }
        return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)
    })
    return entries
}

function InitSmelter()
{
    var root = $("#SmelterWindow")
    if (!root) { return }

    root.RemoveAndDeleteChildren()
    root.AddClass("RunesWindowContent")

    var main = $.CreatePanel("Panel", root, "SmelterMain")
    main.AddClass("SmelterMain")

    var storage_column = $.CreatePanel("Panel", main, "SmelterStorageColumn")
    storage_column.AddClass("SmelterStorageColumn")

    var list = $.CreatePanel("Panel", storage_column, "SmelterList")
    list.AddClass("RunesList")
    list.AddClass("SmelterList")

    var side = $.CreatePanel("Panel", main, "SmelterSideColumn")
    side.AddClass("SmelterSideColumn")

    var icon_frame = $.CreatePanel("Panel", side, "")
    icon_frame.AddClass("SmelterIconFrame")
    var icon_glow = $.CreatePanel("Panel", icon_frame, "")
    icon_glow.AddClass("SmelterIconGlow")
    var icon = $.CreatePanel("Panel", icon_frame, "")
    icon.AddClass("SmelterIcon")

    var howto = $.CreatePanel("Panel", side, "")
    howto.AddClass("SmelterHowToRow")
    var howto_icon = $.CreatePanel("Panel", howto, "")
    howto_icon.AddClass("SmelterHowToIcon")
    var howto_label = $.CreatePanel("Label", howto, "")
    howto_label.AddClass("SmelterHowToLabel")
    howto_label.text = $.Localize("#shop_smelter_howto_title")
    SetSmelterHowToTooltip(howto)

    var bar = $.CreatePanel("Panel", side, "")
    bar.AddClass("SmelterBar")
    var bar_frame = $.CreatePanel("Panel", bar, "")
    bar_frame.AddClass("SmelterBarFrame")
    var level_badge = $.CreatePanel("Panel", bar, "")
    level_badge.AddClass("SmelterLevelBadge")
    var bar_line = $.CreatePanel("Panel", bar, "")
    bar_line.AddClass("SmelterBarLine")
    var exp_fill = $.CreatePanel("Panel", bar_line, "SmelterExpFill")
    exp_fill.AddClass("SmelterExpFill")
    var exp_text = $.CreatePanel("Label", bar_line, "SmelterExpText")
    exp_text.AddClass("SmelterExpText")
    var level_badge = $.CreatePanel("Panel", bar, "")
    level_badge.AddClass("SmelterLevelBadge")
    var level_value = $.CreatePanel("Label", level_badge, "SmelterLevelValue")
    level_value.AddClass("SmelterLevelValue")

    var melt_all = $.CreatePanel("Panel", side, "SmelterMeltAllButton")
    melt_all.AddClass("ChestOpenButton")
    melt_all.AddClass("SmelterMeltAllButton")
    var melt_all_content = $.CreatePanel("Panel", melt_all, "")
    melt_all_content.AddClass("ChestOpenButtonContent")
    var melt_all_label = $.CreatePanel("Label", melt_all_content, "")
    melt_all_label.AddClass("ChestOpenButtonLabel")
    melt_all_label.text = $.Localize("#shop_smelter_melt_all")
    melt_all.SetPanelEvent("onactivate", function()
    {
        if (melt_all.BHasClass("Locked"))
        {
            return
        }
        RequestSmelterMelt("item", null, 1)
    })

    var stats_title = $.CreatePanel("Label", side, "")
    stats_title.AddClass("SmelterStatsTitle")
    stats_title.text = $.Localize("#shop_smelter_bonuses_title")
    var stats_box = $.CreatePanel("Panel", side, "SmelterStatsBox")
    stats_box.AddClass("SmelterStatsBox")
    for (var bonus_index = 0; bonus_index < SMELTER_BONUS_ORDER.length; bonus_index++)
    {
        var stat_row = CreateSmelterStatRow(stats_box, "SmelterStat_" + SMELTER_BONUS_ORDER[bonus_index])
        stat_row.SetHasClass("TwoLines", SMELTER_BONUS_ORDER[bonus_index] == "ignore_reduction")
    }

    RefreshSmelterStorage()
    UpdateSmelterProgress()
}

var SMELTER_TOOLTIP_ID = "woda_smelter_tooltip"
var SMELTER_TOOLTIP_LAYOUT = "file://{resources}/layout/custom_game/tooltips/smelter_tooltip/smelter_tooltip.xml"

function CreateSmelterStatRow(parent, id)
{
    var row = $.CreatePanel("Panel", parent, "")
    row.AddClass("SmelterStatPanel")
    var center = $.CreatePanel("Panel", row, "")
    center.AddClass("SmelterStatCenter")
    var value = $.CreatePanel("Label", center, id)
    value.AddClass("SmelterStatLabel2")
    value.text = ""
    return row
}

function SetSmelterHowToTooltip(panel)
{
    panel.SetPanelEvent("onmouseover", function()
    {
        var level = GetSmelterLevelByExp(GetSmelterExp())
        var exp_parts = []
        for (var rarity in SMELTER_EXP_BY_RARITY)
        {
            exp_parts.push(rarity + ":" + SMELTER_EXP_BY_RARITY[rarity])
        }
        exp_parts.push("rune:" + SMELTER_RUNE_EXP)
        exp_parts.push("coal:" + SMELTER_COAL_EXP)
        var bonus_parts = []
        for (var b = 0; b < SMELTER_BONUS_ORDER.length; b++)
        {
            bonus_parts.push(SMELTER_BONUS_ORDER[b] + ":" + SMELTER_BONUS_PER_LEVEL[SMELTER_BONUS_ORDER[b]])
        }
        var params = "level=" + level + "&max=" + SMELTER_MAX_LEVEL + "&exp=" + exp_parts.join(",") + "&bonus=" + bonus_parts.join(",")
        $.DispatchEvent("UIShowCustomLayoutParametersTooltip", panel, SMELTER_TOOLTIP_ID, SMELTER_TOOLTIP_LAYOUT, params)
    })
    panel.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("UIHideCustomLayoutTooltip", panel, SMELTER_TOOLTIP_ID)
    })
}

function RefreshSmelterStorage()
{
    var list = $("#SmelterList")
    if (!list) { return }
    var entries = GetStorageEntries()
    var signature_parts = []
    for (var sig = 0; sig < entries.length; sig++)
    {
        signature_parts.push(entries[sig].kind + entries[sig].id)
    }
    var signature = signature_parts.join(",")
    if (signature == smelter_storage_signature && list.GetChildCount() > 0)
    {
        for (var u = 0; u < entries.length; u++)
        {
            UpdateStorageCardCount(entries[u])
        }
        UpdateSmelterStorageFooter(entries)
        return
    }
    smelter_storage_signature = signature
    list.RemoveAndDeleteChildren()
    var total_count = 0
    for (var i = 0; i < entries.length; i++)
    {
        total_count += entries[i].count
        CreateStorageCard(list, entries[i])
    }
    if (entries.length == 0)
    {
        var empty = $.CreatePanel("Label", list, "")
        empty.AddClass("SmelterEmptyLabel")
        empty.text = $.Localize("#shop_smelter_storage_empty")
    }
    var counter = $("#SmelterStorageCounter")
    if (counter)
    {
        counter.text = String(total_count)
    }
    var melt_all = $("#SmelterMeltAllButton")
    if (melt_all)
    {
        melt_all.SetHasClass("Locked", entries.length == 0 || smelter_melt_in_progress)
    }
}

function UpdateSmelterProgress()
{
    var exp = GetSmelterExp()
    var level = GetSmelterLevelByExp(exp)
    var level_value = $("#SmelterLevelValue")
    if (level_value)
    {
        level_value.text = String(level)
    }
    var exp_fill = $("#SmelterExpFill")
    var exp_text = $("#SmelterExpText")
    if (level >= SMELTER_MAX_LEVEL)
    {
        if (exp_fill) { exp_fill.style.width = "100%" }
        if (exp_text) { exp_text.text = $.Localize("#shop_smelter_max_level") }
    }
    else
    {
        var start = GetSmelterExpForLevel(level)
        var need = GetSmelterExpForLevel(level + 1) - start
        var progress = exp - start
        if (exp_fill) { exp_fill.style.width = (need > 0 ? Math.min(progress / need, 1) * 100 : 0) + "%" }
        if (exp_text) { exp_text.text = progress + " / " + need }
    }
    var bonus_stats = GetSmelterBonusStats(level)
    for (var i = 0; i < SMELTER_BONUS_ORDER.length; i++)
    {
        var key = SMELTER_BONUS_ORDER[i]
        var stat_label = $("#SmelterStat_" + key)
        if (stat_label)
        {
            stat_label.text = LocalizeArenaStat(stat_label, key, bonus_stats[key])
            stat_label.SetHasClass("SmelterStatActive", bonus_stats[key] > 0)
        }
    }
}

function CreateStorageCard(parent, entry)
{
    var card = $.CreatePanel("Panel", parent, "StorageCard_" + entry.kind + "_" + entry.id)
    card.AddClass("ItemShop")
    card.AddClass("StorageCard")

    var image = $.CreatePanel("Panel", card, "")
    image.AddClass("ItemImage")
    image.style.backgroundImage = 'url("' + entry.icon + '")'
    image.style.backgroundSize = "100%"
    image.SetHasClass("TipImage", entry.is_tip)
    ApplyRarityGlow(image, entry.rarity)
    if (entry.kind == "rune")
    {
        SetRuneTooltip(card, entry.id)
    }
    else
    {
        var chest_info = GetChestItemInfo(entry.id)
        if (chest_info)
        {
            SetChestItemTooltip(card, chest_info)
        }
        else
        {
            SetShopItemTooltip(card, entry.id)
        }
    }

    if (entry.count > 1)
    {
        var count = $.CreatePanel("Label", card, "StorageCardCount_" + entry.kind + "_" + entry.id)
        count.AddClass("StorageCardCount")
        count.text = "x" + entry.count
    }

    var name_panel = $.CreatePanel("Panel", card, "ItemNamePanels")
    name_panel.AddClass("ItemNamePanels")
    name_panel.AddClass("StorageCardNamePanel")
    var name = $.CreatePanel("Label", name_panel, "ItemName")
    name.AddClass("ItemName")
    name.text = entry.name
    var exp = $.CreatePanel("Label", name_panel, "")
    exp.AddClass("StorageCardExp")
    exp.text = "+" + entry.exp + " " + $.Localize("#shop_smelter_exp")

    var melt = $.CreatePanel("Panel", card, "BuyItemPanel")
    melt.AddClass("BuyItemPanel")
    melt.AddClass("StorageCardMeltButton")
    var price = $.CreatePanel("Panel", melt, "ItemPrice")
    price.AddClass("ItemPrice")
    var melt_label = $.CreatePanel("Label", price, "PriceLabel")
    melt_label.AddClass("PriceLabel")
    melt_label.text = $.Localize("#shop_smelter_melt_one")
    melt.SetPanelEvent("onactivate", function()
    {
        RequestSmelterMelt(entry.kind, entry.id, 0)
    })
}

var SMELTER_MELT_ANIMATION_TIME = 0.35

function PlaySmelterMeltAnimation(kind, id, all)
{
    var list = $("#SmelterList")
    if (!list) { return }
    if (all)
    {
        for (var card of list.Children())
        {
            card.AddClass("Melting")
        }
        return
    }
    var single = $("#StorageCard_" + kind + "_" + id)
    if (single)
    {
        single.AddClass("Melting")
    }
}

function ClearSmelterMeltAnimation()
{
    var list = $("#SmelterList")
    if (!list) { return }
    for (var card of list.Children())
    {
        card.RemoveClass("Melting")
    }
}

function RequestSmelterMelt(kind, id, all)
{
    if (smelter_melt_in_progress)
    {
        return
    }
    smelter_melt_in_progress = true
    Game.EmitSound("ui.pick_select")
    PlaySmelterMeltAnimation(kind, id, all)
    var payload = {kind: kind, all: all ? 1 : 0}
    if (id != null)
    {
        payload.id = id
        payload.count = 1
    }
    GameEvents.SendCustomGameEventToServer_custom("woda_smelter_melt_request", payload)
    $.Schedule(2.0, function()
    {
        if (smelter_melt_in_progress)
        {
            smelter_melt_in_progress = false
            if (current_tab == "SmelterWindow")
            {
                ClearSmelterMeltAnimation()
                RefreshSmelterStorage()
                UpdateSmelterProgress()
            }
        }
    })
}

function OnSmelterMeltComplete(data)
{
    smelter_melt_in_progress = false
    if (PLAYER_DATA)
    {
        PLAYER_DATA.smelter_exp = Number(data.exp) || 0
        PLAYER_DATA.storage_items = (data.storage_items && typeof data.storage_items == "object") ? data.storage_items : {}
        PLAYER_DATA.storage_runes = (data.storage_runes && typeof data.storage_runes == "object") ? data.storage_runes : {}
    }
    Game.EmitSound(Number(data.level_up) == 1 ? "ui.treasure_02" : "ui.treasure_01")
    UpdateRunesChestBadge()
    if (current_tab != "SmelterWindow")
    {
        return
    }
    UpdateSmelterProgress()
    $.Schedule(SMELTER_MELT_ANIMATION_TIME, function()
    {
        if (current_tab != "SmelterWindow")
        {
            return
        }
        ClearSmelterMeltAnimation()
        RefreshSmelterStorage()
    })
}

function OnSmelterMeltDenied(data)
{
    smelter_melt_in_progress = false
    if (current_tab == "SmelterWindow")
    {
        ClearSmelterMeltAnimation()
        RefreshSmelterStorage()
        UpdateSmelterProgress()
    }
}

GameEvents.Subscribe_custom("woda_smelter_melt_complete", OnSmelterMeltComplete)
GameEvents.Subscribe_custom("woda_smelter_melt_denied", OnSmelterMeltDenied)

var hero_tab_selected = null
var hero_tab_filters = {0: true, 1: true, 2: true, 3: true}
var hero_tab_talent_attribute = "Str"
var hero_tab_talent_classes = {Str: null, Agi: null, Int: null}
var HERO_LEVEL_CRYSTAL_COST = 10
var HERO_EXP_PER_PURCHASE = 100
var HERO_MAX_LEVEL = 30
var HERO_TAB_ATTRIBUTES =
[
    {index: 0, icon: "str1", name: "#DOTA_Tooltip_Ability_item_power_treads_str"},
    {index: 1, icon: "agi1", name: "#DOTA_Tooltip_Ability_item_power_treads_agi"},
    {index: 2, icon: "int1", name: "#DOTA_Tooltip_Ability_item_power_treads_int"},
    {index: 3, icon: "all", name: "#woda_universal"},
]
var HERO_TAB_TALENT_TABS = [["Str", "str", 1, "str1"], ["Agi", "agi", 2, "agi1"], ["Int", "int", 3, "int1"]]

function InitHeroes()
{
    var root = $("#HeroesWindow")
    if (!root) { return }
    var table_heroes = Game.GetCustomTable("custom_pick", "hero_list")
    if (!table_heroes) { return }

    root.RemoveAndDeleteChildren()

    var left = $.CreatePanel("Panel", root, "HeroTabLeft")
    left.AddClass("HeroTabPanel")
    left.AddClass("HeroTabLeft")

    var filters = $.CreatePanel("Panel", left, "HeroTabFilters")
    filters.AddClass("HeroTabFilters")
    for (var f = 0; f < HERO_TAB_ATTRIBUTES.length; f++)
    {
        CreateHeroTabFilter(filters, HERO_TAB_ATTRIBUTES[f])
    }

    var list = $.CreatePanel("Panel", left, "HeroTabList")
    list.AddClass("HeroTabList")

    var center = $.CreatePanel("Panel", root, "HeroTabCenter")
    center.AddClass("HeroTabCenter")

    var model = $.CreatePanel("Panel", center, "HeroTabModel")
    model.AddClass("HeroTabModel")

    var info = $.CreatePanel("Panel", center, "HeroTabInfo")
    info.AddClass("HeroTabInfo")

    var howto = $.CreatePanel("Panel", info, "HeroTabHowTo")
    howto.AddClass("HeroTabHowToRow")

    var howto_icon = $.CreatePanel("Panel", howto, "")
    howto_icon.AddClass("SmelterHowToIcon")

    var howto_label = $.CreatePanel("Label", howto, "")
    howto_label.AddClass("SmelterHowToLabel")
    howto_label.text = $.Localize("#shop_hero_level_howto_title")

    var name_row = $.CreatePanel("Panel", info, "")
    name_row.AddClass("HeroTabNameRow")

    var rank = $.CreatePanel("Panel", name_row, "HeroTabRank")
    rank.AddClass("HeroTabRank")

    var rank_number = $.CreatePanel("Label", rank, "HeroTabRankNumber")
    rank_number.AddClass("HeroTabRankNumber")

    var name_block = $.CreatePanel("Panel", name_row, "")
    name_block.AddClass("HeroTabNameBlock")

    var name = $.CreatePanel("Label", name_block, "HeroTabName")
    name.AddClass("HeroTabName")

    var xp_row = $.CreatePanel("Panel", info, "")
    xp_row.AddClass("HeroTabXpRow")

    var xp_block = $.CreatePanel("Panel", xp_row, "")
    xp_block.AddClass("HeroTabXpBlock")

    var xp_title = $.CreatePanel("Label", xp_block, "HeroTabXpTitle")
    xp_title.AddClass("HeroTabXpTitle")

    var xp_bar = $.CreatePanel("Panel", xp_block, "HeroTabXpBar")
    xp_bar.AddClass("HeroTabXpBar")

    var xp_fill = $.CreatePanel("Panel", xp_bar, "HeroTabXpFill")
    xp_fill.AddClass("HeroTabXpFill")

    var xp_text = $.CreatePanel("Label", xp_bar, "HeroTabXpText")
    xp_text.AddClass("HeroTabXpText")

    var level_up = $.CreatePanel("Panel", xp_row, "HeroTabLevelUp")
    level_up.AddClass("HeroTabLevelUp")
    level_up.SetPanelEvent("onactivate", function()
    {
        RequestHeroLevelUp()
    })
    SetTextInfo3(level_up, $.Localize("#shop_hero_level_up_tooltip"))

    var level_up_content = $.CreatePanel("Panel", level_up, "")
    level_up_content.AddClass("HeroTabLevelUpContent")

    var level_up_label = $.CreatePanel("Label", level_up_content, "")
    level_up_label.AddClass("HeroTabLevelUpLabel")
    level_up_label.text = HERO_EXP_PER_PURCHASE + " " + $.Localize("#shop_hero_level_up_exp")

    var level_up_divider = $.CreatePanel("Panel", level_up_content, "")
    level_up_divider.AddClass("ChestOpenButtonDivider")

    var level_up_price = $.CreatePanel("Panel", level_up_content, "")
    level_up_price.AddClass("HeroTabLevelUpPrice")

    var level_up_price_label = $.CreatePanel("Label", level_up_price, "")
    level_up_price_label.AddClass("HeroTabLevelUpPriceLabel")
    level_up_price_label.text = String(HERO_LEVEL_CRYSTAL_COST)

    var level_up_crystal = $.CreatePanel("Panel", level_up_price, "")
    level_up_crystal.AddClass("HeroTabLevelUpCrystal")

    var abilities = $.CreatePanel("Panel", center, "HeroTabAbilities")
    abilities.AddClass("HeroTabAbilities")

    var right = $.CreatePanel("Panel", root, "HeroTabRight")
    right.AddClass("HeroTabPanel")
    right.AddClass("HeroTabRight")

    var talent_buttons = $.CreatePanel("Panel", right, "HeroTabTalentButtons")
    talent_buttons.AddClass("HeroTabTalentButtons")
    for (var t = 0; t < HERO_TAB_TALENT_TABS.length; t++)
    {
        CreateHeroTabTalentButton(talent_buttons, HERO_TAB_TALENT_TABS[t])
    }

    var talent_windows = $.CreatePanel("Panel", right, "HeroTabTalentWindows")
    talent_windows.AddClass("HeroTabTalentWindows")
    for (var w = 0; w < HERO_TAB_TALENT_TABS.length; w++)
    {
        var talent_window = $.CreatePanel("Panel", talent_windows, "HeroTabTalent" + HERO_TAB_TALENT_TABS[w][0])
        talent_window.AddClass("HeroTabTalentWindow")
    }

    var difficulties = $.CreatePanel("Panel", right, "HeroTabDifficulties")
    difficulties.AddClass("HeroTabDifficulties")

    BuildHeroTabList()
    SelectHeroTab(hero_tab_selected)
}

function CreateHeroTabFilter(parent, attribute)
{
    var button = $.CreatePanel("Panel", parent, "HeroTabFilter_" + attribute.index)
    button.AddClass("HeroTabFilter")
    button.style.backgroundImage = 'url("file://{images}/custom_game/talents/' + attribute.icon + '.png")'
    button.style.backgroundSize = "100%"
    SetTextInfo3(button, $.Localize(attribute.name))
    button.SetPanelEvent("onactivate", function()
    {
        hero_tab_filters[attribute.index] = !hero_tab_filters[attribute.index]
        Game.EmitSound("ui_topmenu_select")
        UpdateHeroTabFilterVisuals()
        BuildHeroTabList()
    })
    UpdateHeroTabFilterVisuals()
}

function UpdateHeroTabFilterVisuals()
{
    for (var key in hero_tab_filters)
    {
        var button = $("#HeroTabFilter_" + key)
        if (button)
        {
            button.SetHasClass("Active", hero_tab_filters[key])
        }
    }
}

function IsHeroTabFilterEmpty()
{
    for (var key in hero_tab_filters)
    {
        if (hero_tab_filters[key])
        {
            return false
        }
    }
    return true
}

function GetHeroTabSortedHeroes()
{
    var table_heroes = Game.GetCustomTable("custom_pick", "hero_list")
    if (!table_heroes) { return [] }
    var names = Object.keys(table_heroes).sort()
    var result = []
    for (var i = 0; i < names.length; i++)
    {
        var attribute = Number(table_heroes[names[i]])
        if (hero_tab_filters[attribute])
        {
            result.push({name: names[i], attribute: attribute})
        }
    }
    return result
}

function GetHeroTabLevel(hero_name)
{
    var info = GetHeroInformation(hero_name)
    return GetLevelByCoins(info ? Number(info.coins) : 0)
}

function SetHeroTabAbilityTooltip(panel, ability)
{
    panel.SetPanelEvent("onmouseover", function()
    {
        $.DispatchEvent("DOTAShowAbilityTooltip", panel, ability)
    })
    panel.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("DOTAHideAbilityTooltip", panel)
    })
}

function SetHeroTabInnateTooltip(panel, hero_name)
{
    panel.SetPanelEvent("onmouseover", function()
    {
        if (WODA_HEROES_ID[hero_name])
        {
            $.DispatchEvent("DOTAShowInnateTooltip", panel, WODA_HEROES_ID[hero_name], 0)
        }
    })
    panel.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("DOTAHideInnateTooltip", panel)
    })
}

function CreateHeroTabTalentButton(parent, tab)
{
    var button = $.CreatePanel("Panel", parent, "HeroTabTalentButton" + tab[0])
    button.AddClass("HeroTabTalentButton")
    button.SetHasClass("SelectTalentButton", hero_tab_talent_attribute == tab[0])
    button.style.backgroundImage = 'url("file://{images}/custom_game/talents/' + tab[3] + '.png")'
    button.style.backgroundSize = "100%"
    button.SetPanelEvent("onactivate", function()
    {
        Game.EmitSound("ui_topmenu_select")
        SelectHeroTabTalentTab(tab[0])
    })
}

function SelectHeroTabTalentTab(tab_name)
{
    hero_tab_talent_attribute = tab_name
    for (var t = 0; t < HERO_TAB_TALENT_TABS.length; t++)
    {
        var name = HERO_TAB_TALENT_TABS[t][0]
        var button = $("#HeroTabTalentButton" + name)
        var window_panel = $("#HeroTabTalent" + name)
        if (button)
        {
            button.SetHasClass("SelectTalentButton", name == tab_name)
        }
        if (window_panel)
        {
            window_panel.style.visibility = name == tab_name ? "visible" : "collapse"
        }
    }
}

function UpdateHeroTabTalents(hero_name)
{
    var heroestalent = Game.GetCustomTable("herotalents", hero_name)
    for (var t = 0; t < HERO_TAB_TALENT_TABS.length; t++)
    {
        var tab = HERO_TAB_TALENT_TABS[t]
        var window_panel = $("#HeroTabTalent" + tab[0])
        if (!window_panel) { continue }
        window_panel.RemoveAndDeleteChildren()
        if (hero_tab_talent_classes[tab[0]])
        {
            window_panel.RemoveClass(hero_tab_talent_classes[tab[0]])
        }
        hero_tab_talent_classes[tab[0]] = String(hero_name) + "_" + tab[1]
        window_panel.AddClass(hero_tab_talent_classes[tab[0]])
        if (!heroestalent || !heroestalent[tab[2]]) { continue }
        for (var line = 0; line < 7; line++)
        {
            var talent_line = $.CreatePanel("Panel", window_panel, "")
            talent_line.AddClass("talent_line")
            for (var block = 0; block < 5; block++)
            {
                var talent_info = heroestalent[tab[2]][line + 1] ? heroestalent[tab[2]][line + 1][block + 1] : null
                if (!talent_info) { continue }
                var talent_block = $.CreatePanel("Panel", talent_line, "")
                talent_block.AddClass("talent_block")
                var talent_block_image = $.CreatePanel("Panel", talent_block, "")
                talent_block_image.AddClass("talent_block_image")
                if (String(talent_info[1]).indexOf("empty") == -1)
                {
                    talent_block_image.style.backgroundImage = 'url("file://{images}/custom_game/talents/' + talent_info[4] + '.png")'
                    talent_block_image.style.backgroundSize = "100%"
                    SetTextInfo3(talent_block_image, $.Localize(talent_info[2] + "_0"))
                }
            }
        }
    }
    SelectHeroTabTalentTab(hero_tab_talent_attribute)
}

function RequestHeroLevelUp()
{
    if (!hero_tab_selected) { return }
    if (GetHeroTabLevel(hero_tab_selected) >= HERO_MAX_LEVEL) { return }
    if (PLAYER_DATA && Number(PLAYER_DATA.crystals) < HERO_LEVEL_CRYSTAL_COST && !Game.IsInToolsMode())
    {
        ErrorCreated({error_name: "shop_error_no_crystals"})
        return
    }
    LoadingCreated()
    GameEvents.SendCustomGameEventToServer_custom("donate_shop_buy_hero_level", {hero: hero_tab_selected})
}

var shop_toast_timers = {}

function ErrorCreated(data)
{
    Game.EmitSound("Relic.Received")
    LoadingClose()
    if (data && data.error_name)
    {
        $("#donate_error_label").text = $.Localize("#" + data.error_name)
    }
    else
    {
        $("#donate_error_label").text = $.Localize("#donate_shop_error")
    }
    ShopToastShow("donate_error_window", 1.8)
}

function ErrorClose()
{
    ShopToastHide("donate_error_window")
}

function AcceptCreated(data)
{
    Game.EmitSound("ui.trophy_levelup")
    LoadingClose()
    $("#donate_accept_label").text = $.Localize("#donate_shop_aceept")
    $("#donate_accept_label").style.color = "#16eb02"
    ShopToastShow("donate_accept_window", 1.4)
}

function AcceptClose()
{
    ShopToastHide("donate_accept_window")
}

function LoadingCreated()
{
    ShopToastShow("donate_loading_window", 10)
}

function LoadingClose()
{
    ShopToastHide("donate_loading_window")
    timer_loading = -1
}

function RuneNotice(title, text, rune)
{
    var label = $("#donate_accept_label")
    if (!label) { return }
    label.text = title + " " + text
    label.style.color = rune ? rune.color : "#16eb02"
    ShopToastShow("donate_accept_window", 2.2)
}

var UPGRADE_COUNTER_FIELDS =
{
    upgrade_talent_point: "talent_points_bonus",
    upgrade_start_level: "start_level_bonus",
    upgrade_rune_slot: "rune_slot_bonus",
    upgrade_backpack: "backpack_bonus",
    upgrade_auto_midas: "auto_midas_bonus",
    upgrade_curse_armor: "curse_armor_bonus",
    upgrade_curse_magic: "curse_magic_bonus",
}

function IsUpgradeCounterItem(item_id)
{
    return UPGRADE_COUNTER_FIELDS[item_id] !== undefined
}

function GetUpgradeCounterMax(item_id)
{
    if (item_id == "upgrade_start_level") { return UPGRADE_START_LEVEL_MAX }
    if (item_id == "upgrade_rune_slot") { return 1 }
    if (item_id == "upgrade_backpack") { return 1 }
    if (item_id == "upgrade_auto_midas") { return 1 }
    if (item_id == "upgrade_curse_armor" || item_id == "upgrade_curse_magic") { return UPGRADE_CURSE_MAX }
    return UPGRADE_TALENT_POINTS_MAX
}

function GetUpgradeCounterBought(item_id)
{
    var field = UPGRADE_COUNTER_FIELDS[item_id]
    return PLAYER_DATA && field ? (Number(PLAYER_DATA[field]) || 0) : 0
}

function GetUpgradeCounterDisplayOffset(item_id)
{
    return item_id == "upgrade_start_level" ? 1 : 0
}

function RefreshTalentPointBuyConfirm()
{
    if (!talent_buy_confirm_row) { return }
    if (GetUpgradeCounterBought(talent_buy_confirm_row[0]) >= GetUpgradeCounterMax(talent_buy_confirm_row[0]))
    {
        CloseBuyItemPanel()
        return
    }
    OpenTalentPointBuyConfirm(talent_buy_confirm_row)
}

function OpenTalentPointBuyConfirm(item_info)
{
    if (!item_info) { return }
    var bought = GetUpgradeCounterBought(item_info[0])
    var bought_max = GetUpgradeCounterMax(item_info[0])
    if (bought >= bought_max) { return }

    $("#BuyItemPanelInfo").RemoveAndDeleteChildren()
    $("#BuyItemPanelName").text = $.Localize("#" + item_info[4])
    $("#BuyItemPanelMain").SetHasClass("ProfileBGPreview", false)
    $("#BuyItemPanelMain").SetHasClass("RunePanel", true)
    $("#BuyItemPanelMain").SetHasClass("RuneGold", false)

    var ItemImage = $.CreatePanel("Panel", $("#BuyItemPanelInfo"), "")
    ItemImage.AddClass("ItemImageBuy")
    ItemImage.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + item_info[3] + '_open.png")'
    ItemImage.style.backgroundSize = "100%"

    var offset = GetUpgradeCounterDisplayOffset(item_info[0])
    UpdateBuyLevelBar(bought + offset, bought_max + offset, bought_max > 0 ? bought / bought_max : 0)

    var ItemInfoAndBuyButton = $.CreatePanel("Panel", $("#BuyItemPanelInfo"), "")
    ItemInfoAndBuyButton.AddClass("ItemInfoAndBuyButton")

    var ItemDescription = $.CreatePanel("Label", ItemInfoAndBuyButton, "")
    ItemDescription.AddClass("ItemDescription")
    ItemDescription.html = true
    ItemDescription.text = $.Localize("#" + item_info[4] + "_description")

    var button_buy_item = $.CreatePanel("Panel", ItemInfoAndBuyButton, "")
    button_buy_item.AddClass("button_buy_item")

    var button_buy_item_center = $.CreatePanel("Panel", button_buy_item, "")
    button_buy_item_center.AddClass("button_buy_item_center")

    var button_buy_item_label = $.CreatePanel("Label", button_buy_item_center, "")
    button_buy_item_label.AddClass("button_buy_item_label")
    button_buy_item_label.text = String(item_info[2])

    var valuteicon = $.CreatePanel("Panel", button_buy_item_center, "")
    valuteicon.AddClass("valuteicon")
    valuteicon.style.backgroundImage = 'url("file://{images}/custom_game/shop/woda' + item_info[1] + '.png")'
    valuteicon.style.backgroundSize = "100%"

    button_buy_item.SetPanelEvent("onactivate", function()
    {
        if (PLAYER_DATA && Number(PLAYER_DATA.crystals) < Number(item_info[2]) && !Game.IsInToolsMode())
        {
            ErrorCreated({error_name: "shop_error_no_crystals"})
            return
        }
        BuyItemToServer(item_info)
    })

    rune_buy_confirm_id = null
    talent_buy_confirm_row = item_info
    $("#BuyItemPanelMain").style.visibility = "visible"
}

function UpdateBuyLevelBar(value, max, fraction)
{
    var fill = $("#BuyRuneLevelFill")
    if (fill)
    {
        fill.style.width = Math.max(0, Math.min(1, fraction)) * 100 + "%"
    }
    var label = $("#BuyRuneLevelLabel")
    if (label)
    {
        label.text = value + " / " + max
    }
}

function OpenRuneBuyConfirm(rune)
{
    if (!rune) { return }
    talent_buy_confirm_row = null
    var level = GetRuneLevel(rune.id)
    if (level >= RUNE_MAX_LEVEL) { return }

    $("#BuyItemPanelInfo").RemoveAndDeleteChildren()
    $("#BuyItemPanelName").text = $.Localize("#" + rune.id)
    $("#BuyItemPanelMain").SetHasClass("ProfileBGPreview", false)
    $("#BuyItemPanelMain").SetHasClass("RunePanel", true)
    $("#BuyItemPanelMain").SetHasClass("RuneGold", RUNE_GOLD_THEME)

    var ItemImage = $.CreatePanel("Panel", $("#BuyItemPanelInfo"), "")
    ItemImage.AddClass("ItemImageBuy")
    ItemImage.style.backgroundImage = 'url("file://{images}/custom_game/runes/' + rune.id + '.png")'
    ItemImage.style.backgroundSize = "100%"

    UpdateBuyLevelBar(level, RUNE_MAX_LEVEL, RUNE_MAX_LEVEL > 0 ? level / RUNE_MAX_LEVEL : 0)

    var ItemInfoAndBuyButton = $.CreatePanel("Panel", $("#BuyItemPanelInfo"), "")
    ItemInfoAndBuyButton.AddClass("ItemInfoAndBuyButton")

    var ItemDescription = $.CreatePanel("Label", ItemInfoAndBuyButton, "")
    ItemDescription.AddClass("ItemDescription")
    ItemDescription.html = true
    ItemDescription.text = FormatRuneDescription(rune.id, Math.max(1, level))

    var button_buy_item = $.CreatePanel("Panel", ItemInfoAndBuyButton, "")
    button_buy_item.AddClass("button_buy_item")

    var button_buy_item_center = $.CreatePanel("Panel", button_buy_item, "")
    button_buy_item_center.AddClass("button_buy_item_center")

    var button_buy_item_label = $.CreatePanel("Label", button_buy_item_center, "")
    button_buy_item_label.AddClass("button_buy_item_label")
    button_buy_item_label.text = String(RUNE_BUY_COST)

    var valuteicon = $.CreatePanel("Panel", button_buy_item_center, "")
    valuteicon.AddClass("valuteicon")
    valuteicon.style.backgroundImage = 'url("file://{images}/custom_game/shop/wodacrystal.png")'
    valuteicon.style.backgroundSize = "100%"

    button_buy_item.SetPanelEvent("onactivate", function()
    {
        RequestRuneBuy(rune.id)
    })

    rune_buy_confirm_id = rune.id
    $("#BuyItemPanelMain").style.visibility = "visible"
}

function BuildHeroTabList()
{
    var list = $("#HeroTabList")
    if (!list) { return }
    list.RemoveAndDeleteChildren()
    var heroes = GetHeroTabSortedHeroes()
    var selected_visible = false
    var row = null
    for (var i = 0; i < heroes.length; i++)
    {
        if (i % 3 == 0)
        {
            row = $.CreatePanel("Panel", list, "")
            row.AddClass("HeroTabRow")
        }
        CreateHeroTabCard(row, heroes[i].name)
        if (heroes[i].name == hero_tab_selected)
        {
            selected_visible = true
        }
    }
    if (!selected_visible && heroes.length > 0)
    {
        SelectHeroTab(heroes[0].name)
    }
}

function CreateHeroTabCard(row, hero_name)
{
    var card = $.CreatePanel("Panel", row, "HeroTabCard_" + hero_name)
    card.AddClass("HeroTabCard")
    card.SetHasClass("Selected", hero_name == hero_tab_selected)

    $.CreatePanel("DOTAHeroImage", card, "", {scaling: "stretch-to-cover-preserve-aspect", heroname: String(hero_name), heroimagestyle: "portrait", class: "HeroTabCardImage", hittest: "false"})

    var badge = $.CreatePanel("Panel", card, "HeroTabBadge_" + hero_name)
    badge.AddClass("HeroTabCardBadge")

    var badge_label = $.CreatePanel("Label", badge, "HeroTabBadgeLabel_" + hero_name)
    badge_label.AddClass("HeroTabCardBadgeLabel")

    UpdateHeroTabCardBadge(hero_name)

    card.SetPanelEvent("onactivate", function()
    {
        Game.EmitSound("UI.Click_Hero")
        SelectHeroTab(hero_name)
    })
}

function UpdateHeroTabCardBadge(hero_name)
{
    var badge = $("#HeroTabBadge_" + hero_name)
    var badge_label = $("#HeroTabBadgeLabel_" + hero_name)
    if (!badge || !badge_label) { return }
    var level = GetHeroTabLevel(hero_name)
    badge.style.backgroundImage = 'url("file://{images}/custom_game/hero_rank/' + GetHeroRankIcon(level) + '.png")'
    badge.style.backgroundSize = "100%"
    badge_label.text = level > 0 ? String(level) : ""
}

function SelectHeroTab(hero_name)
{
    if (!hero_name)
    {
        var heroes = GetHeroTabSortedHeroes()
        if (heroes.length == 0) { return }
        hero_name = heroes[0].name
    }
    hero_tab_selected = hero_name

    var list = $("#HeroTabList")
    if (list)
    {
        for (var row of list.Children())
        {
            for (var card of row.Children())
            {
                card.SetHasClass("Selected", card.id == "HeroTabCard_" + hero_name)
            }
        }
    }

    var model = $("#HeroTabModel")
    if (model)
    {
        model.RemoveAndDeleteChildren()
        $.CreatePanel("DOTAScenePanel", model, "hero_tab_model", {style: "width:100%;height:100%;", drawbackground: false, unit: hero_name, particleonly: "false", antialias: "false", allowrotation: "true"})
    }

    var abilities_panel = $("#HeroTabAbilities")
    if (abilities_panel)
    {
        abilities_panel.RemoveAndDeleteChildren()
        var innate = Game.GetCustomTable("custom_pick", hero_name + "_innate")
        if (innate)
        {
            var innate_block = $.CreatePanel("Panel", abilities_panel, "")
            innate_block.AddClass("HeroTabAbility")
            var innate_icon = $.CreatePanel("Panel", innate_block, "")
            innate_icon.AddClass("HeroTabAbilityIcon")
            innate_icon.AddClass("HeroTabInnateIcon")
            SetHeroTabInnateTooltip(innate_icon, hero_name)
        }
        var abilities = Game.GetCustomTable("custom_pick", hero_name)
        if (abilities)
        {
            var index = 0
            while (true)
            {
                index++
                if (!abilities[index]) { break }
                var ability_block = $.CreatePanel("Panel", abilities_panel, "")
                ability_block.AddClass("HeroTabAbility")
                var ability_icon = $.CreatePanel("DOTAAbilityImage", ability_block, "hero_tab_ability_" + index)
                ability_icon.abilityname = abilities[index]
                ability_icon.AddClass("HeroTabAbilityIcon")
                SetHeroTabAbilityTooltip(ability_icon, abilities[index])
            }
        }
    }

    UpdateHeroTabInfo(hero_name)
    UpdateHeroTabTalents(hero_name)
    UpdateHeroTabDifficulties(hero_name)
}

function UpdateHeroTabDifficulties(hero_name)
{
    var block = $("#HeroTabDifficulties")
    if (!block || !hero_name) { return }
    block.RemoveAndDeleteChildren()
    var rows = $.CreatePanel("Panel", block, "")
    rows.AddClass("HeroTabDifficultyRows")
    var per_row = Math.ceil(ARENA_DIFFICULTY_QUESTS_COUNT / 2)
    var row = null
    for (var difficulty = 1; difficulty <= ARENA_DIFFICULTY_QUESTS_COUNT; difficulty++)
    {
        if ((difficulty - 1) % per_row == 0)
        {
            row = $.CreatePanel("Panel", rows, "")
            row.AddClass("HeroTabDifficultyRow")
        }
        var done = IsArenaHeroDifficultyDone(PLAYER_DATA, hero_name, difficulty)
        var cell = $.CreatePanel("Panel", row, "")
        cell.AddClass("HeroTabDifficultyCell")
        cell.SetHasClass("Done", done)
        var number = $.CreatePanel("Label", cell, "")
        number.AddClass("HeroTabDifficultyNumber")
        number.text = String(difficulty)
        SetHeroTabDifficultyTooltip(cell, difficulty, done)
    }
}

function SetHeroTabDifficultyTooltip(panel, difficulty, done)
{
    if (done)
    {
        return
    }
    panel.SetDialogVariableInt("difficulty", difficulty)
    var text = $.Localize("#hero_tab_difficulty_todo", panel)
    panel.SetPanelEvent("onmouseover", function()
    {
        $.DispatchEvent("DOTAShowTextTooltip", panel, text)
    })
    panel.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("DOTAHideTextTooltip", panel)
    })
}

var HERO_RANK_TOOLTIP_ID = "woda_hero_rank_tooltip"
var HERO_RANK_TOOLTIP_LAYOUT = "file://{resources}/layout/custom_game/tooltips/hero_rank_tooltip/hero_rank_tooltip.xml"

function SetHeroRankTooltip(panel, level, hero_name)
{
    panel.SetPanelEvent("onmouseover", function()
    {
        $.DispatchEvent("UIShowCustomLayoutParametersTooltip", panel, HERO_RANK_TOOLTIP_ID, HERO_RANK_TOOLTIP_LAYOUT, "level=" + level + "&max=" + HERO_MAX_LEVEL + "&hero=" + (hero_name || ""))
    })
    panel.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("UIHideCustomLayoutTooltip", panel, HERO_RANK_TOOLTIP_ID)
    })
}

function UpdateHeroTabInfo(hero_name)
{
    if (!hero_name || !$("#HeroTabName")) { return }
    var table_heroes = Game.GetCustomTable("custom_pick", "hero_list")
    var attribute = table_heroes ? Number(table_heroes[hero_name]) : 0
    var info = GetHeroInformation(hero_name)
    var coins = info ? Number(info.coins) : 0
    var level = GetLevelByCoins(coins)
    var progress = coins - GetProgressByCoins22(level)
    var progress_max = GetProgressByCoins(level + 1)
    var rank = GetHeroRankIcon(level)

    $("#HeroTabName").text = $.Localize("#" + hero_name)

    var rank_panel = $("#HeroTabRank")
    rank_panel.style.backgroundImage = 'url("file://{images}/custom_game/hero_rank/' + rank + '.png")'
    rank_panel.style.backgroundSize = "100%"
    SetHeroRankTooltip(rank_panel, level, hero_name)
    var howto_row = $("#HeroTabHowTo")
    if (howto_row)
    {
        SetHeroRankTooltip(howto_row, level, hero_name)
    }
    $("#HeroTabRankNumber").text = level > 0 ? String(level) : ""

    $("#HeroTabXpTitle").text = $.Localize("#shop_hero_tab_level") + " " + level + " / " + HERO_MAX_LEVEL

    var xp_fill = $("#HeroTabXpFill")
    var level_up_button = $("#HeroTabLevelUp")
    for (var r = 0; r <= 6; r++)
    {
        xp_fill.SetHasClass("Rank_" + r, rank == "rank_" + r)
        level_up_button.SetHasClass("Rank_" + r, rank == "rank_" + r)
    }
    if (level >= HERO_MAX_LEVEL)
    {
        $("#HeroTabXpFill").style.width = "100%"
        $("#HeroTabXpText").text = $.Localize("#shop_hero_tab_max_level")
    }
    else
    {
        $("#HeroTabXpFill").style.width = (progress_max > 0 ? Math.min(progress / progress_max, 1) * 100 : 0) + "%"
        $("#HeroTabXpText").text = progress + " / " + progress_max
    }
    $("#HeroTabLevelUp").SetHasClass("Hidden", level >= HERO_MAX_LEVEL)
}

function RefreshHeroTabData()
{
    if (!$("#HeroTabList"))
    {
        InitHeroes()
        return
    }
    var heroes = GetHeroTabSortedHeroes()
    for (var i = 0; i < heroes.length; i++)
    {
        UpdateHeroTabCardBadge(heroes[i].name)
    }
    UpdateHeroTabInfo(hero_tab_selected)
    UpdateHeroTabDifficulties(hero_tab_selected)
}

var shop_toast_show_timers = {}
var shop_toast_tokens = {}

function ShopToastCancel(id)
{
    if (shop_toast_timers[id])
    {
        $.CancelScheduled(shop_toast_timers[id])
        shop_toast_timers[id] = null
    }
    if (shop_toast_show_timers[id])
    {
        $.CancelScheduled(shop_toast_show_timers[id])
        shop_toast_show_timers[id] = null
    }
}

function ShopToastShow(id, duration)
{
    var panel = $("#" + id)
    if (!panel) { return }
    ShopToastCancel(id)
    var token = (shop_toast_tokens[id] || 0) + 1
    shop_toast_tokens[id] = token
    panel.RemoveClass("Show")
    panel.style.visibility = "visible"
    shop_toast_show_timers[id] = $.Schedule(0.02, function()
    {
        shop_toast_show_timers[id] = null
        if (shop_toast_tokens[id] != token) { return }
        panel.AddClass("Show")
    })
    if (duration)
    {
        shop_toast_timers[id] = $.Schedule(duration, function()
        {
            shop_toast_timers[id] = null
            ShopToastHide(id)
        })
    }
}

function ShopToastHide(id)
{
    var panel = $("#" + id)
    if (!panel) { return }
    ShopToastCancel(id)
    var token = (shop_toast_tokens[id] || 0) + 1
    shop_toast_tokens[id] = token
    panel.RemoveClass("Show")
    $.Schedule(0.3, function()
    {
        if (shop_toast_tokens[id] != token) { return }
        panel.style.visibility = "collapse"
    })
}
function GetAvailableRunes()
{
    var available_runes = []
    for (var i = 0; i < Items_Runes.length; i++)
    {
        available_runes.push(Items_Runes[i])
    }
    return available_runes
}

function AreAllRunesMaxed()
{
    return false
}

function ShowRuneReward(rune, level, duplicate)
{
    if (!rune) { return }
    var rune_level = Number(level) || GetRuneLevel(rune.id)
    var description = FormatRuneDescription(rune.id, rune_level)
    if (duplicate)
    {
        description = "<font color='#f3df9c'>" + $.Localize("#shop_rune_duplicate_to_storage") + "</font><br><br>" + description
    }
    ShowRewardPanel("file://{images}/custom_game/runes/" + rune.id + ".png", $.Localize("#" + rune.id), description, rune_level)
}

function ShowRewardPanel(icon_url, name_text, description_html, rune_level)
{
    var panel = $("#RuneRewardPanel")
    if (!panel) { return }
    var has_level = rune_level !== undefined && rune_level !== null
    panel.SetHasClass("RunePanel", has_level)
    panel.SetHasClass("RuneGold", has_level && RUNE_GOLD_THEME)
    if (has_level)
    {
        var level = Math.max(0, Math.min(Number(rune_level) || 0, RUNE_MAX_LEVEL))
        $("#RewardRuneLevelFill").style.width = (level / RUNE_MAX_LEVEL) * 100 + "%"
        $("#RewardRuneLevelLabel").text = level + " / " + RUNE_MAX_LEVEL
    }
    $("#RewardPanelTitle").text = name_text
    var icon = $("#RuneRewardIcon")
    icon.style.backgroundImage = 'url("' + icon_url + '")'
    icon.style.backgroundSize = "100%"
    icon.SetHasClass("TipImage", String(icon_url).indexOf("/tip_open.png") >= 0 || String(icon_url).indexOf("/tip.png") >= 0)
    $("#RuneRewardDescription").text = description_html || ""
    panel.style.visibility = "visible"
    $.Msg("[woda reward] panel opened: " + name_text + " icon=" + icon_url)
}

function ShowChestReward(item, duplicate)
{
    if (!item) { return }
    var icon_url = "file://{images}/custom_game/shop/" + item.icon + "_open.png"
    if (item.name.indexOf("background") === 0 && Background_Images[item.id])
    {
        icon_url = Background_Images[item.id]
    }
    else if (item.name.indexOf("pet_") === 0)
    {
        icon_url = "file://{images}/custom_game/shop/" + item.id + "_open.png"
    }
    var description_key = "#" + item.name + "_description"
    var description = $.Localize(description_key)
    if (description == description_key || description == item.name + "_description")
    {
        description = ""
    }
    if (duplicate)
    {
        description = "<font color='#f3df9c'>" + $.Localize("#shop_chest_duplicate_to_storage") + "</font>" + (description != "" ? "<br><br>" + description : "")
    }
    ShowRewardPanel(icon_url, $.Localize("#" + item.name), description)
}

function RuneRewardAccept()
{
    Game.EmitSound("ui_topmenu_select")
    $("#RuneRewardPanel").style.visibility = "collapse"
}

var FREE_REWARD_COINS = 10
var FREE_REWARD_PLUS_CRYSTALS = 5

function SetFreeRewardTooltip()
{
    var panel = $("#FreeReward")
    if (!panel) { return }
    panel.SetPanelEvent("onmouseover", function()
    {
        var has_plus = PLAYER_DATA && (Number(PLAYER_DATA.plus_days) > 0 || Game.IsInToolsMode())
        var claimed = PLAYER_DATA && Number(PLAYER_DATA.free_reward) == 1
        var params = "coins=" + FREE_REWARD_COINS + "&crystals=" + FREE_REWARD_PLUS_CRYSTALS + "&has_plus=" + (has_plus ? 1 : 0) + "&claimed=" + (claimed ? 1 : 0)
        $.DispatchEvent("UIShowCustomLayoutParametersTooltip", panel, "woda_free_reward_tooltip", "file://{resources}/layout/custom_game/tooltips/free_reward_tooltip/free_reward_tooltip.xml", params)
    })
    panel.SetPanelEvent("onmouseout", function()
    {
        $.DispatchEvent("UIHideCustomLayoutTooltip", panel, "woda_free_reward_tooltip")
    })
}

CheckoutEveryReward()
WodaTrackTextEntry($("#PromoEntryID"))

function TestAccountReset()
{
    if (!Game.IsInToolsMode()) { return }
    GameEvents.SendCustomGameEventToServer_custom("woda_cheat_action", { action: "account_reset" })
    Game.EmitSound("ui_generic_button_click")
    $("#TestAccountResetLabel").text = $.Localize("#test_account_reset_again")
}