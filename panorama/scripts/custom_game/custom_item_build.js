--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


"use strict";

var items_ids = CustomNetTables.GetTableValue("items_ids", "items_ids")

function GetDotaHud()
{
    let hPanel = $.GetContextPanel();

    while ( hPanel && hPanel.id !== 'Hud')
    {
        hPanel = hPanel.GetParent();
    }

    if (!hPanel)
    {
        throw new Error('Could not find Hud root from panel with id: ' + $.GetContextPanel().id);
    }

    return hPanel;
}

function FindDotaHudElement(sId)
{
    return GetDotaHud().FindChildTraverse(sId);
}

function CustomItemBuildShopItem(panel)
{
    $.RegisterEventHandler("DOTAShowAbilityShopItemTooltip", panel, (shop_panel, item) => {
        $.DispatchEvent("DOTAShowAbilityTooltip", shop_panel, item);
    });
}

let itemBuild;

let retries = 0;

class CustomItemBuild {
    constructor() {
        this.playerId = Players.GetLocalPlayer();
        this.hero = Entities.GetUnitName( Players.GetPlayerHeroEntityIndex(this.playerId) )
        this.hasSubscription = false;
        this.heroAbilityImages = [];

        GameEvents.Subscribe_custom('UpdateInnatePanel', this.LegendaryUpdate)
        GameEvents.Subscribe_custom('buildResponse', this.buildResponse)
        this.sub_data = CustomNetTables.GetTableValue("sub_data",  Players.GetLocalPlayer());
        this.server_data = CustomNetTables.GetTableValue("server_data", String(Players.GetLocalPlayer()));
        let lang = $.Localize("#lang");
        let max_games = 5;
        
        this.chosenBuild = null;
        this.buildCooldown = null;
        this.cooldown = 0;
        this.freeItemBuilds = null;
        this.maxFreeItemBuilds = null;
        this.canUseFreeItemBuild = false;
        this.UpdateTables()

        if(this.sub_data)
        {
            this.standartBuild = [];
            this.standartBuildTitle = "";
            this.isViewingBuild = false;
            this.isViewingStandartBuild = false;
            if((this.server_data && this.server_data.total_games && this.server_data.total_games >= max_games) || lang == "rus")
                this.init()
        } 
        else {
            if(retries <= 3)
                $.Schedule(10, () => {
                    delete this;
                    retries++;
                    new CustomItemBuild()
                })
        }
    }
    init() {
        let self = this;
        globalThis.customItemBuild = this; // чтобы вызывать в LegendaryUpdate, т.к. там this = {}

        this.updateLabel()

        let ItemBuild = FindDotaHudElement("ItemBuild")

        let Children = ItemBuild.Children()
        if(!ItemBuild.FindChildTraverse("CustomItemBuildIcons"))
            $.GetContextPanel().FindChildTraverse("CustomItemBuildIcons").SetParent(ItemBuild)

        FindDotaHudElement("ShowBuildLabel").text = $.Localize("#OpenStandartItemBuild")
        
        if(!FindDotaHudElement("ItemBuildItems")) { // чтобы нормально расположить, я сначала добавляю кастомную панель выше, а потом создаю эту, чтобы туда переместить дотовскую хрень, тогда кастомная будет наверху, дотовская снизу
            let Panel = $.CreatePanel("Panel", ItemBuild, "ItemBuildItems")
            Children.forEach(child => {

                if(child.id == "BuildTitleContainer") 
                {
                    child.FindChildTraverse("BuildTitleRow").style.visibility = "collapse";
                    $.GetContextPanel().FindChildTraverse("CustomItemBuildHeroImage").heroname = this.hero

                    $.GetContextPanel().FindChildTraverse("CustomItemBuildTitle").SetParent(child);
                }
                child.SetParent(Panel)
            })

            let content = $.GetContextPanel().FindChildTraverse("ItemBuildContent")
            if (content)
            {
                content.SetParent(ItemBuild.GetParent().GetParent())
            }
        }

        if(this.hasSubscription) FindDotaHudElement("ButtonBuySubscribe").style.visibility = "collapse";


        let button = FindDotaHudElement("ButtonBuySubscribe") 
        let text = $.Localize("#BuildSubButton")

        button.SetPanelEvent("onmouseactivate", function() { 
            Game.EmitSound("UI.Click")
            GameEvents.SendCustomGameEventToServer_custom( "browser_subscribe", {item_name: "sub"})
        })


        button.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowTextTooltip', button, text) });
        
        button.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideTextTooltip', button); });

        let Categories = FindDotaHudElement("Categories").FindChildrenWithClassTraverse("ItemBuildCategory");
        let parent_panel = FindDotaHudElement("ItemBuild")
        let old_background = FindDotaHudElement("ItemBuildBackground")

        parent_panel.style.backgroundImage = 'url("s2r://panorama/images/hud/reborn/bg_shop_guide_psd.vtex");'
        parent_panel.style.backgroundSize = "100% 100%";

        old_background.style.visibility = "collapse";

        for(let i = 0; i < (Categories.length == 7 ? 5 : 4); i++) {
            let currentCategoryItems = [];
            Categories[i].FindChildTraverse("ItemList").Children().forEach(item => {
                currentCategoryItems.push(item.FindChildTraverse("ItemImage").itemname)
            })
            this.standartBuild.push(currentCategoryItems)
        }
      
        this.standartBuildTitle = GetDotaHud().FindChildrenWithClassTraverse("BuildTitle")[0].text;
        FindDotaHudElement("CustomItemBuildShowStandart").SetPanelEvent("onmouseactivate", function() {
            let text = FindDotaHudElement("ShowBuildLabel").text;
            Game.EmitSound("UI.Click")
            FindDotaHudElement("ShowBuildLabel").text=$.Localize(`#${text == $.Localize("#OpenStandartItemBuild") ? "CloseStandartItemBuild" : "OpenStandartItemBuild"}`);
            self.isViewingStandartBuild = !self.isViewingStandartBuild;
            self.updateLabel()
            self.updateStandartBuild();
        })


        this.hideBuild() // заныкать билд стандартный
        
       if (!self.hasSubscription && self.canUseFreeItemBuild && !self.chosenBuild) {
            FindDotaHudElement("FreeItemBuildsProgress").style.visibility = "visible";
            FindDotaHudElement("ItemBuildSeparator").style.visibility = "visible";
            FindDotaHudElement("SubscribeLabel").style.visibility = "visible";
        }
        
        let backPanel = FindDotaHudElement("CustomItemBuildBack") // кнопка назад
        let Label = FindDotaHudElement("CustomItemBuildLabel") // лэйбл с текстом над кнопками

        backPanel.SetPanelEvent("onmouseactivate", function() {
            Game.EmitSound("UI.Click")
            let panels = FindDotaHudElement("Icons").Children()
            panels.forEach(p => {
                p.RemoveClass("Hidden")
            })

            self.updateLabel()

            self.hideBuild() // спрятать текущий билд
            
            self.updateStandartBuild();
          // if (!self.hasSubscription && (self.canUseFreeItemBuild || self.chosenBuild)) {
          //     FindDotaHudElement("FreeItemBuildsProgress").style.visibility = "visible";
          //     FindDotaHudElement("ItemBuildSeparator").style.visibility = "visible";
          //     FindDotaHudElement("SubscribeLabel").style.visibility = "visible";
          // }

            backPanel.AddClass("Hidden") // спрятать кнопку назад
        })
        
        let TitleContainer = FindDotaHudElement("BuildTitleContainer")
        let CategoriesMain = FindDotaHudElement("Categories")

        if (TitleContainer)
        {
            TitleContainer.style.position = "0px 5px 0px"
            TitleContainer.style.paddingTop = "0px"
        }

        if (CategoriesMain)
        {
            CategoriesMain.style.paddingTop = "0px"
            CategoriesMain.style.position = "0px 45px 0px"
        }


    //    FindDotaHudElement("Categories").style.paddingTop = "25px";
     //   FindDotaHudElement("Categories").Children()[0].style.marginTop = "25px"
        FindDotaHudElement("BuildTitleRow").FindChildTraverse("EditButton").style.visibility = "collapse";
        // выше стили чтобы нормально расположить и ничего не наезжало





        let talent_table = []

        for (const name in Game.talents_values[this.hero])
        {
            let data = Game.talents_values[this.hero][name]
            if (data["rarity"] == "orange")
            {
                data["name"] = name
                talent_table.push(data)
            }
        }         

        if (talent_table)
        {
            talent_table = Object.values(talent_table)
            talent_table.sort((a, b) => (a["skill_number"] - b["skill_number"]))
            let i = 1;

            for (const data of talent_table) 
            {
                let rarity = data["rarity"]
                let icon = data["skill_icon"]
                let name = data["name"]

                if(rarity == "orange") 
                {
                    let image = 'url("file://{images}/custom_game/icons/mini/' + this.hero + '/' + icon + '.png")';
                    this.heroAbilityImages.push(image);

                    let Icon = FindDotaHudElement(`CustomItemBuild${i}`)
                    Icon.style.backgroundImage = image;
                    Icon.style.backgroundSize = "100% 100%";
                    this.updateLabel()
                    
                    Icon.SetPanelEvent("onmouseactivate", function() {
                        let currentPanelId = Icon.id.slice(15) // получить цифру кнопки(1-4)

                        if(self.isViewingBuild) self.hideBuild()

                        if(Icon.BHasClass("Inactive") || Icon.GetParent().BHasClass("Inactive")) return // если кнопка неактивна или если чел уже смотрит билд

                        Game.EmitSound("UI.Click")
                        self.isViewingBuild = true;
                        // disableOther = true;
                        Game.local_chosen_build = icon

                        // if(!self.hasSubscription && (!self.buildCooldown || self.freeItemBuilds <= self.maxFreeItemBuilds) && self.chosenBuild == null) {
                        //     if (self.canUseFreeItemBuild) {
                        //         self.hasUsedFreeItemBuild = true;
                        //         GameEvents.SendCustomGameEventToServer_custom("freeItemBuildsUsed", {
                        //             localPlayer: Players.GetLocalPlayer()
                        //         })
                        //     }

                        //     GameEvents.SendCustomGameEventToServer_custom( "buildChosen", {
                        //         chosenBuild: currentPanelId, // 1-4
                        //         hero: self.hero,
                        //         localPlayer: Players.GetLocalPlayer(),
                        //     } )
                        //     self.chosenBuild = currentPanelId;

                        //     $.Schedule(1, function() { 
                        //         self.UpdateTables() 
                        //         self.updateLabel()
                        //     })
                        // } // тоже вроде понятно
                        
                        self.getBuild(icon)
                    })
                    i++;
                }
            }

            FindDotaHudElement("Icons").style.visibility = "visible";
            let panels = FindDotaHudElement("Icons").Children()
            panels.forEach((p, i) => {

                let icon = FindDotaHudElement(`CustomItemBuild${i + 1}`)
                let has_build = this.chosenBuild && this.chosenBuild !== null

                if (this.hasSubscription)
                {
                    p.RemoveClass("Inactive")    
                }else
                {
                    if (has_build)
                    {
                        p.SetHasClass("Inactive", icon.style.backgroundImage.indexOf(this.chosenBuild) == -1)
                    }else
                    {
                        p.SetHasClass("Inactive", (this.buildCooldown && !this.canUseFreeItemBuild))
                    }
                }

            });
        }
    }
    buildResponse(data) {
        let self = globalThis.customItemBuild;
        function findTalentIndex(talents, target) {
            for (var key in talents) {
                if (talents[key] === target) {
                    return parseInt(key, 10);
                }
            }
            return -1;
        }

        let build = data.build;
        let talents = data.talents;

        let panelId = findTalentIndex(data.talents, Game.local_chosen_build);

        let hide = !self.hasSubscription;
        if(panelId > 0) {
            self.setBuild(panelId, build, hide)
        }
        $.Schedule(1, function() { 
            self.UpdateTables()
            self.updateLabel()
        })
    }
    getBuild(currentPanelId) {
        GameEvents.SendCustomGameEventToServer_custom("buildRequest", {
            chosenBuild: currentPanelId,
            hero: this.hero
        })
    }
    updateLabel() {
        let Label = FindDotaHudElement("CustomItemBuildLabel")
        let progressBar = FindDotaHudElement("ItemBuildProgress")
        let progressNumber = FindDotaHudElement("ItemBuildNumber")
        if (!this.hasSubscription && !this.chosenBuild) 
        {
            if (this.canUseFreeItemBuild) {
                progressBar.style.width = `${(this.freeItemBuilds / this.maxFreeItemBuilds) * 100}%`;
                progressNumber.text = `${this.freeItemBuilds}/${this.maxFreeItemBuilds}`;
                Label.text = $.Localize("#BuildFreItemBuild")
            }
            else if (!this.buildCooldown) {
                Label.text = $.Localize("#BuildNoSub")
            }
            else {
                Label.text = `${$.Localize("#BuildCooldown")} ${String(Math.max(1, Math.floor(this.cooldown / 3600)))} ${$.Localize("#BuildCooldownHour")}`;
            }
        }
    }
    updateStandartBuild() 
    {
        let self = globalThis.customItemBuild;
        let Categories = FindDotaHudElement("Categories").Children();
        if(self.isViewingStandartBuild){
            FindDotaHudElement("CustomItemBuildTitle").style.visibility = "visible";
            FindDotaHudElement("CustomBuildTitle").text = `${$.Localize('#' + this.hero)}`

            if(!this.hasSubscription) FindDotaHudElement("ButtonBuySubscribe").style.visibility = "collapse";
            FindDotaHudElement("Icons").RemoveClass("IconsBig");
            FindDotaHudElement("Icons").AddClass("IconsSmall");
            let icons = FindDotaHudElement("Icons").Children();
            icons.forEach((icon, index) => {
                let textPanel = FindDotaHudElement(`CustomItemBuild${index + 1}_Text`)
                textPanel.style.visibility = "collapse";
                icon.RemoveClass("CustomItemBuildPanel")
                icon.AddClass("ItemBuildButtonSmall")
            })
            FindDotaHudElement("Label").style.visibility = "collapse";
            FindDotaHudElement("CustomItemBuildAbilityImage").style.visibility = "collapse";
            FindDotaHudElement("CustomItemBuildLabel").style.visibility = "collapse";

            FindDotaHudElement("FreeItemBuildsProgress").style.visibility = "collapse";
            FindDotaHudElement("ItemBuildSeparator").style.visibility = "collapse";
            FindDotaHudElement("SubscribeLabel").style.visibility = "collapse";
            

            FindDotaHudElement("CustomItemBuildIconsTop_TextHeader").text = $.Localize("#StandartItemBuildsHeader")
            FindDotaHudElement("CustomItemBuildIconsTop_TextHeaderSmall").text = $.Localize("#StandartItemBuildsHeaderSmall")
            FindDotaHudElement("CustomItemBuildIconsTop_TextHeaderSmall").AddClass("CustomItemBuildIconsTop_TextHeaderSmall_Standart")
            FindDotaHudElement("CustomItemBuildIconsTop_TextHeaderSmall").RemoveClass("CustomItemBuildIconsTop_TextHeaderSmall")

            self.standartBuild.forEach((build, index) => {
                Categories[index].style.visibility = "visible"
                build.forEach(item => {
                    CustomItemBuildShopItem($.CreatePanel("DOTAShopItem", Categories[index].FindChildTraverse("ItemList"), `Item${items_ids[item]}`, {
                        style: "width: 42px; height: width-percentage( 72.7% ); margin-bottom: 5px; margin-right: 6px;",
                        itemname: item
                    }));
                })
            })
            Game.UpdateBasherBadges()
        }
        else {
            FindDotaHudElement("Icons").AddClass("IconsBig");
            FindDotaHudElement("Icons").RemoveClass("IconsSmall");
            if(!this.hasSubscription) FindDotaHudElement("ButtonBuySubscribe").style.visibility = "visible";
            let icons = FindDotaHudElement("Icons").Children();
            icons.forEach((icon, index) => {
                let textPanel = FindDotaHudElement(`CustomItemBuild${index + 1}_Text`)
                textPanel.style.visibility = "visible";
                icon.AddClass("CustomItemBuildPanel")
                icon.RemoveClass("ItemBuildButtonSmall")
            })
            FindDotaHudElement("Label").style.visibility = "visible";
            FindDotaHudElement("CustomItemBuildAbilityImage").style.visibility = "visible";

            FindDotaHudElement("CustomItemBuildIconsTop_TextHeader").text = $.Localize("#ItemBuildsHeader")
            FindDotaHudElement("CustomItemBuildIconsTop_TextHeaderSmall").text = $.Localize("#ItemBuildsHeaderSmall")
            FindDotaHudElement("CustomItemBuildIconsTop_TextHeaderSmall").RemoveClass("CustomItemBuildIconsTop_TextHeaderSmall_Standart")
            FindDotaHudElement("CustomItemBuildIconsTop_TextHeaderSmall").AddClass("CustomItemBuildIconsTop_TextHeaderSmall")
            self.hideBuild()
        }
    }
    setBuild(panelId, build, disableOther=false) {

        let Categories = FindDotaHudElement("Categories").Children()
        let backPanel = FindDotaHudElement("CustomItemBuildBack")

        if(FindDotaHudElement("ShowBuildLabel").text == $.Localize("#CloseStandartItemBuild")) this.hideBuild()
        if(!this.hasSubscription) FindDotaHudElement("ButtonBuySubscribe").style.visibility = "collapse";
        
        FindDotaHudElement("CustomItemBuildAbilityImage").style.visibility = "visible";
        FindDotaHudElement("CustomItemBuildShowStandart").style.visibility = "collapse";
        FindDotaHudElement("CustomItemBuildLabel").style.visibility = "collapse";

        FindDotaHudElement("FreeItemBuildsProgress").style.visibility = "collapse";
        FindDotaHudElement("ItemBuildSeparator").style.visibility = "collapse";
        FindDotaHudElement("SubscribeLabel").style.visibility = "collapse";

        let panels = FindDotaHudElement("Icons").Children()
        panels.forEach((p, i) => {
            p.AddClass("Hidden")
            if(i + 1 != panelId) {
                let _panel = FindDotaHudElement(`CustomItemBuild${i + 1}`).GetParent()
                if(disableOther) {
                    if(!_panel.BHasClass("Inactive")) _panel.AddClass("Inactive")
                    if(_panel.BHasClass("Anim"))_panel.RemoveClass("Anim")
                }
            }
        })
        FindDotaHudElement("Label").style.visibility = "collapse";
        
        FindDotaHudElement("CustomItemBuildTitle").style.visibility = "visible";

        FindDotaHudElement("CustomBuildTitle").text = $.Localize('#' + this.hero) + " " + ["Q", "W", "E", "R"][panelId - 1]
        
        FindDotaHudElement("CustomItemBuildAbilityImage").style.backgroundImage = this.heroAbilityImages[panelId - 1]
        FindDotaHudElement("CustomItemBuildAbilityImage").style.backgroundSize = "100% 100%";
        
        let CategoriesPanels = {
            "startItems": Categories[0].FindChildTraverse("ItemList"),
            "earlyItems": Categories[1].FindChildTraverse("ItemList"),
            "midItems": Categories[2].FindChildTraverse("ItemList"),
            "lateItems": Categories[3].FindChildTraverse("ItemList"),
        }

        for(let i = 0; i < 4; i++) 
            Categories[i].style.visibility = "visible"; // показать все категории
        
        let item_build = build;

        for(const [key, value] of Object.entries(item_build)){
            for(let j = 1; j <= 6; j++) {
                let item = value.items[j]
                if(item != "item_empty")
                    CustomItemBuildShopItem($.CreatePanel("DOTAShopItem", CategoriesPanels[key], `Item${items_ids[item]}`, {
                        style: "width: 42px; height: width-percentage( 72.7% ); margin-bottom: 5px; margin-right: 6px;",
                        itemname: item
                    }));
            }
            let items = [
                value.hasAghanimScepter ? "item_ultimate_scepter_2" : null,
                value.hasAghanimShard ? "item_aghanims_shard" : null
            ]; // если в категории если шард или блессинг, добавить их
            
            items.forEach(item => {
                if (item)
                    CustomItemBuildShopItem($.CreatePanel("DOTAShopItem", CategoriesPanels[key], `Item${items_ids[item]}`, {
                        style: "width: 42px; height: width-percentage(72.7%); margin-bottom: 5px; margin-right: 6px;",
                        itemname: item
                    }));
            });
        }
        Game.UpdateBasherBadges()
        backPanel.RemoveClass("Hidden")
    }
    LegendaryUpdate(kv) 
    {
        let legendary = kv.legendary
        let self = globalThis.customItemBuild;
    
        if (!self || !self.hasSubscription)
            return

        let talent_table = []

        for (const name in Game.talents_values[self.hero])
        {
            let data = Game.talents_values[self.hero][name]
            if (data["rarity"] == "orange")
            {
                data["name"] = name
                talent_table.push(data)
            }
        }         

        if (talent_table)
        {
            talent_table = Object.values(talent_table)
            talent_table.sort((a, b) => (a["skill_number"] - b["skill_number"]))
            let i = 1;
            for (const data of talent_table) 
            {
                if(data["skill_icon"] == legendary)
                {
                    if(!(self.isViewingBuild || self.isViewingStandartBuild))
                    {
                        Game.local_chosen_build = data["skill_icon"]
                        self.getBuild(data["skill_icon"])
                    }
                }
                i++
            }
        }
    }
    hideBuild() {

        FindDotaHudElement("CustomItemBuildShowStandart").style.visibility = "visible";
        FindDotaHudElement("Label").style.visibility = "visible";

        if(!this.hasSubscription) FindDotaHudElement("ButtonBuySubscribe").style.visibility = "visible";
        FindDotaHudElement("CustomItemBuildAbilityImage").style.visibility = "collapse";
        FindDotaHudElement("CustomItemBuildTitle").style.visibility = "collapse";

        GetDotaHud().FindChildrenWithClassTraverse("BuildTitle")[0].text = ""
        let Categories = FindDotaHudElement("Categories").Children()

        this.isViewingBuild = false;
        
        for(let i = 0; i < (Categories.length == 7 ? 5 : 4); i++) {
            Categories[i].style.visibility = "collapse"; // спрятать категорию
            Categories[i].FindChildTraverse("ItemList").RemoveAndDeleteChildren() // удалить из неё предметы
        }


        if(Categories.length == 6) Categories[Categories.length - 2].style.visibility = "collapse"; // спрятать категорию "рекомендуемые вещи"
    }
    UpdateTables()
    {
        this.sub_data = CustomNetTables.GetTableValue("sub_data",  Players.GetLocalPlayer());

        if (this.sub_data && this.sub_data.subscribed && this.sub_data.subscribed == 1)
            this.hasSubscription = true;

        if (this.sub_data.item_build_cd)
        {
            this.cooldown = this.sub_data.item_build_cd
        }
        this.buildCooldown = this.cooldown > 0;
        
        this.server_data = CustomNetTables.GetTableValue("server_data", String(Players.GetLocalPlayer()));
        if(this.server_data) {
            this.freeItemBuilds = this.server_data.free_item_builds;
            this.maxFreeItemBuilds = this.server_data.max_free_item_builds;
            this.canUseFreeItemBuild = this.server_data.can_use_free_build == 1

            //$.Msg(this.server_data.chosenBuild)
            this.chosenBuild = this.server_data.chosenBuild;
        }
    }
}

function func()
{
    GameEvents.Subscribe_custom("init_custom_item_build", new_constructor)
    GameEvents.Subscribe_custom("ItemBuildLoaded", new_constructor)
}

function new_constructor()
{
    if (itemBuild)
        return

    let ItemBuild = FindDotaHudElement("ItemBuild")    
    let Categories = FindDotaHudElement("Categories").FindChildrenWithClassTraverse("ItemBuildCategory");

    if (!ItemBuild || ItemBuild == undefined || ItemBuild == null || Categories == null || Categories.length <= 0)
    {
        $.Schedule( 0.5, function(){ 
            new_constructor()
        })
        return
    }

    $.Schedule( 0.5, function()
    { 
        if (!itemBuild)
            itemBuild = new CustomItemBuild()  
    })  
}

func()