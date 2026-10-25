--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var minimap_container = FindDotaHudElement("minimap_container")
if (minimap_container)
{
    if (minimap_container.FindChildTraverse("talent_buttons"))
    {
        $("#talent_buttons").DeleteAsync( 0 );
    } 
    else 
    {
        $("#talent_buttons").SetParent(minimap_container);
    }
}
let AbilitiesAndStatBranch = FindDotaHudElement("AbilitiesAndStatBranch");
let LeftRightFlow = AbilitiesAndStatBranch.FindChildrenWithClassTraverse("LeftRightFlow")[0]
if (LeftRightFlow.FindChildTraverse("talent_buttons_all"))
{
    $("#talent_buttons_all").DeleteAsync( 0 );
} 
else 
{
    $("#talent_buttons_all").SetParent(LeftRightFlow);
}
LeftRightFlow.MoveChildBefore(AbilitiesAndStatBranch.FindChildTraverse("talent_buttons_all"), AbilitiesAndStatBranch.FindChildTraverse("StatBranch"))
let courierHud = FindDotaHudElement("ShopCourierControls");
if (courierHud.FindChildTraverse("arena_points_line"))
{
    $("#arena_points_line").DeleteAsync( 0 );
} 
else 
{
    $("#arena_points_line").SetParent(courierHud);
}

var points_panel = courierHud.FindChildTraverse("arena_points_line").FindChildTraverse("arena_points_line_up")
var points_text = courierHud.FindChildTraverse("arena_points_line").FindChildTraverse("arena_points_text")
var general_panel = courierHud.FindChildTraverse("arena_points_line")
var talents_buttons_all = AbilitiesAndStatBranch.FindChildTraverse("talent_buttons_all_off")
var talents_buttons = AbilitiesAndStatBranch.FindChildTraverse("talent_buttons_all")
var toggle_str = false;
var cooldown_panel_str = false;
var first_time_talants = false;
let text_points = $.Localize("#points_panel_text")
MouseOver(general_panel, text_points)
var toggle_agi = false;
var cooldown_panel_agi = false
var toggle_int = false;
var cooldown_panel_int = false
var talent_click = true
var line_level_info = 
{
    0 : 0,
    1 : 4,
    2 : 8,
    3 : 12,
    4 : 16,
    5 : 20,
    6 : 24,
}

function OpenTalentsStr() 
{
    let hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
    if (hero == null || hero == -1) { return }
    if (toggle_str === false) {
    	if (cooldown_panel_str == false) { 
        	toggle_str = true;
	        if (first_time_talants === false) {
				InitTalentStr()
				InitTalentAgi()
				InitTalentInt()
				updatereconnect()
	            first_time_talants = true;
	        }
	        if ($("#talent_str_panel").BHasClass("sethidden")) {
	            $("#talent_str_panel").RemoveClass("sethidden");
	        }
	        $("#talent_str_panel").AddClass("setvisible");
	        $("#talent_str_panel").style.visibility = "visible"
	        cooldown_panel_str = true
	        $.Schedule( 0.303, function(){
	        	cooldown_panel_str = false
	        	SwapLowbar()
	        })
	    }
    } else {
    	if (cooldown_panel_str == false) {
	        toggle_str = false;
	        if ($("#talent_str_panel").BHasClass("setvisible")) {
	            $("#talent_str_panel").RemoveClass("setvisible");
	        }
	        $("#talent_str_panel").AddClass("sethidden");
	        cooldown_panel_str = true
	        $.Schedule( 0.303, function(){
	        	cooldown_panel_str = false
	        	SwapLowbar()
	        	$("#talent_str_panel").style.visibility = "collapse"
			})
	    }
    }
}

function OpenTalentsAgi() 
{
    let hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
    if (hero == null || hero == -1) { return }
    if (toggle_agi === false) {
    	if (cooldown_panel_agi == false) { 
        	toggle_agi = true;
	        if (first_time_talants === false) {
	        	InitTalentStr()
				InitTalentAgi()
				InitTalentInt()
	        	updatereconnect()
	            first_time_talants = true;
	        }
	        if ($("#talent_agi_panel").BHasClass("sethidden")) {
	            $("#talent_agi_panel").RemoveClass("sethidden");
	        }
	        $("#talent_agi_panel").AddClass("setvisible");
	        $("#talent_agi_panel").style.visibility = "visible"
	        cooldown_panel_agi = true
	        $.Schedule( 0.303, function(){
	        	cooldown_panel_agi = false
	        	SwapLowbar()
	        })
	    }
    } else {
    	if (cooldown_panel_agi == false) {
	        toggle_agi = false;
	        if ($("#talent_agi_panel").BHasClass("setvisible")) {
	            $("#talent_agi_panel").RemoveClass("setvisible");
	        }
	        $("#talent_agi_panel").AddClass("sethidden");
	        cooldown_panel_agi = true
	        $.Schedule( 0.303, function(){
	        	cooldown_panel_agi = false
	        	SwapLowbar()
	        	$("#talent_agi_panel").style.visibility = "collapse"
			})
	    }
    }
}

function OpenTalentsInt() 
{
    let hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
    if (hero == null || hero == -1) { return }
    if (toggle_int === false) {
    	if (cooldown_panel_int == false) { 
        	toggle_int = true;
	        if (first_time_talants === false) {
	            first_time_talants = true;
	            InitTalentStr()
				InitTalentAgi()
				InitTalentInt()
	        	updatereconnect()
	        }
	        if ($("#talent_int_panel").BHasClass("sethidden")) {
	            $("#talent_int_panel").RemoveClass("sethidden");
	        }
	        $("#talent_int_panel").AddClass("setvisible");
	        $("#talent_int_panel").style.visibility = "visible"
	        cooldown_panel_int = true
	        $.Schedule( 0.303, function(){
	        	cooldown_panel_int = false
	        	SwapLowbar()
	        })
	    }
    } else {
    	if (cooldown_panel_int == false) {
	        toggle_int = false;
	        if ($("#talent_int_panel").BHasClass("setvisible")) {
	            $("#talent_int_panel").RemoveClass("setvisible");
	        }
	        $("#talent_int_panel").AddClass("sethidden");
	        cooldown_panel_int = true
	        $.Schedule( 0.303, function(){
	        	cooldown_panel_int = false
	        	SwapLowbar()
	        	$("#talent_int_panel").style.visibility = "collapse"
			})
	    }
    }
}

function OpenTalentsAll() 
{
	if (toggle_int === true && toggle_agi === true && toggle_str === true) 
    {
		OpenTalentsInt()
		OpenTalentsAgi()
		OpenTalentsStr()
	} else if (toggle_int === true && toggle_agi === false && toggle_str === false) 
    {
		OpenTalentsInt()
	} else if (toggle_int === false && toggle_agi === true && toggle_str === false) 
    {
		OpenTalentsAgi()	
	} else if (toggle_int === false && toggle_agi === false && toggle_str === true) 
    {
		OpenTalentsStr()	
	} else if (toggle_int === true && toggle_agi === true && toggle_str === false) 
    {
		OpenTalentsInt()
		OpenTalentsAgi()	
	} else if (toggle_int === true && toggle_agi === false && toggle_str === true) 
    {
		OpenTalentsInt()
		OpenTalentsStr()		
	} else if (toggle_int === false && toggle_agi === true && toggle_str === true) 
    {
		OpenTalentsAgi()
		OpenTalentsStr()		
	} else if (toggle_int === false && toggle_agi === false && toggle_str === false) 
    {
		OpenTalentsInt()
		OpenTalentsAgi()
		OpenTalentsStr()		
	}
}

function SwapLowbar() 
{
	if (toggle_str === true && toggle_agi === false && toggle_int === false) 
    {
		$("#talent_lowbar_free_str").style.visibility="visible"
		$("#talent_lowbar_count_str").style.visibility="visible"
		$("#talent_lowbar_free_agi").style.visibility="collapse"
		$("#talent_lowbar_count_agi").style.visibility="collapse"
		$("#talent_lowbar_free_int").style.visibility="collapse"
		$("#talent_lowbar_count_int").style.visibility="collapse"
	} else if (toggle_str === false && toggle_agi === true && toggle_int === false) 
    {
		$("#talent_lowbar_free_str").style.visibility="collapse"
		$("#talent_lowbar_count_str").style.visibility="collapse"
		$("#talent_lowbar_free_agi").style.visibility="visible"
		$("#talent_lowbar_count_agi").style.visibility="visible"
		$("#talent_lowbar_free_int").style.visibility="collapse"
		$("#talent_lowbar_count_int").style.visibility="collapse"
	} else if (toggle_str === false && toggle_agi === false && toggle_int === true) 
    {
		$("#talent_lowbar_free_str").style.visibility="collapse"
		$("#talent_lowbar_count_str").style.visibility="collapse"
		$("#talent_lowbar_free_agi").style.visibility="collapse"
		$("#talent_lowbar_count_agi").style.visibility="collapse"
		$("#talent_lowbar_free_int").style.visibility="visible"
		$("#talent_lowbar_count_int").style.visibility="visible"
	} else if (toggle_str === true && toggle_agi === true && toggle_int === true) 
    {
		$("#talent_lowbar_free_str").style.visibility="visible"
		$("#talent_lowbar_count_str").style.visibility="visible"
		$("#talent_lowbar_free_agi").style.visibility="collapse"
		$("#talent_lowbar_count_agi").style.visibility="collapse"
		$("#talent_lowbar_free_int").style.visibility="collapse"
		$("#talent_lowbar_count_int").style.visibility="collapse"
	} else if (toggle_str === false && toggle_agi === false && toggle_int === false) 
    {
		$("#talent_lowbar_free_str").style.visibility="collapse"
		$("#talent_lowbar_count_str").style.visibility="collapse"
		$("#talent_lowbar_free_agi").style.visibility="collapse"
		$("#talent_lowbar_count_agi").style.visibility="collapse"
		$("#talent_lowbar_free_int").style.visibility="collapse"
		$("#talent_lowbar_count_int").style.visibility="collapse"
	} else if (toggle_str === true && toggle_agi === true && toggle_int === false) 
    {
		$("#talent_lowbar_free_str").style.visibility="visible"
		$("#talent_lowbar_count_str").style.visibility="visible"
		$("#talent_lowbar_free_agi").style.visibility="collapse"
		$("#talent_lowbar_count_agi").style.visibility="collapse"
		$("#talent_lowbar_free_int").style.visibility="collapse"
		$("#talent_lowbar_count_int").style.visibility="collapse"
	} else if (toggle_str === true && toggle_agi === false && toggle_int === true) 
    {
		$("#talent_lowbar_free_str").style.visibility="visible"
		$("#talent_lowbar_count_str").style.visibility="visible"
		$("#talent_lowbar_free_agi").style.visibility="collapse"
		$("#talent_lowbar_count_agi").style.visibility="collapse"
		$("#talent_lowbar_free_int").style.visibility="collapse"
		$("#talent_lowbar_count_int").style.visibility="collapse"
	} else if (toggle_str === false && toggle_agi === true && toggle_int === true) 
    {
		$("#talent_lowbar_free_str").style.visibility="collapse"
		$("#talent_lowbar_count_str").style.visibility="collapse"
		$("#talent_lowbar_free_agi").style.visibility="visible"
		$("#talent_lowbar_count_agi").style.visibility="visible"
		$("#talent_lowbar_free_int").style.visibility="collapse"
		$("#talent_lowbar_count_int").style.visibility="collapse"
	} 
}

Game.SubscribeCustomTableListener("playerstalents",updatetalent)

function updatetalent(table,key,data) 
{
	if (key == String(Players.GetLocalPlayer())) {
		let hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
		let heroname = Entities.GetUnitName(hero)
		let heroestalent = Game.GetCustomTable("herotalents", heroname)

		if (first_time_talants == true) 
        {
			for ( var line = 0; line < 7; line++ ) 
            {
				for ( var block = 0; block < 5; block++) 
                {
                    let talent_info_str = heroestalent[1][line + 1][block + 1]
                    let talent_info_agi = heroestalent[2][line + 1][block + 1]
                    let talent_info_int = heroestalent[3][line + 1][block + 1]
                    UpdateTalentBlock(talent_info_str, line, block, "str", data)
                    UpdateTalentBlock(talent_info_agi, line, block, "agi", data)
                    UpdateTalentBlock(talent_info_int, line, block, "int", data)
				}
			}
		}

		if (data["str"]) 
        {
			$("#talent_values_str").text = $.Localize("#namestr") + ": " + data["str"]
		} 
        else 
        {
			$("#talent_values_str").text = $.Localize("#namestr") + ": " + "0"
		}
		if (data["agi"]) 
        {
			$("#talent_values_agi").text = $.Localize("#nameagi") + ": " + data["agi"]
		} 
        else 
        {
			$("#talent_values_agi").text = $.Localize("#nameagi") + ": " + "0"
		}
		if (data["int"]) 
        {
			$("#talent_values_int").text = $.Localize("#nameint") + ": " + data["int"]
		} 
        else 
        {
			$("#talent_values_int").text = $.Localize("#nameint") + ": " + "0"
		}

		$("#talent_lowbar_count_str").text = $.Localize("#talantall") + ": " + ((data["str"] || 0) + (data["agi"] || 0) + (data["int"] || 0))
		$("#talent_lowbar_count_agi").text = $.Localize("#talantall") + ": " + ((data["str"] || 0) + (data["agi"] || 0) + (data["int"] || 0))
		$("#talent_lowbar_count_int").text = $.Localize("#talantall") + ": " + ((data["str"] || 0) + (data["agi"] || 0) + (data["int"] || 0))

		$("#talent_lowbar_free_str").text = $.Localize("#talantfree") + ": " + (data["talantpoints"] || 0)
		$("#talent_lowbar_free_agi").text = $.Localize("#talantfree") + ": " + (data["talantpoints"] || 0)
		$("#talent_lowbar_free_int").text = $.Localize("#talantfree") + ": " + (data["talantpoints"] || 0)

		if (data["talantpoints"] > 0) 
        {
			talents_buttons.SetHasClass("haspoints", true)
		} else {
			talents_buttons.SetHasClass("haspoints", false)
		}

		let percentage_allpoints = 100 - (((data["str"] || 0) + (data["agi"] || 0) + (data["int"] || 0)) * 100 / 45)
		talents_buttons_all.style.height = (percentage_allpoints || 100) + "%"
		let text_points = $.Localize("#points_panel_text")

		text_points = text_points.replace("[!s:value]", data["maxpoints"] || 0)

		MouseOver(general_panel, text_points)

		if (points_panel) 
        {
			if (data["hasmax"]) {
				points_panel.style.width = "100%"
				points_text.text = "MAX"
			} else {
				let haspoints = (data["points"] || 0)
				let percentage = (haspoints * 100) / 10
				points_panel.style.width = (percentage || 0) + "%"
				points_text.text = haspoints + "/10"
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////
////// Инициализация талантов в силе
/////////////////////////////////////////////////////////////////////////////////////

function InitTalentStr() 
{
	let hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
	let heroname = Entities.GetUnitName(hero)
	let heroestalent = Game.GetCustomTable("herotalents", heroname)
	$("#talent_choose_str").AddClass(String(heroname)+"_str")

	if (heroestalent) 
    {
		for ( var line = 0; line < 7; line++ ) 
        {
			TalentCreateLine($("#talent_choose_str"), line, heroestalent, 1, "str")
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////
////// Инициализация талантов в ловкости
/////////////////////////////////////////////////////////////////////////////////////

function InitTalentAgi() 
{
	let hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
	let heroname = Entities.GetUnitName(hero)
	let heroestalent = Game.GetCustomTable("herotalents", heroname)
	$("#talent_choose_agi").AddClass(String(heroname)+"_agi")

	if (heroestalent) 
    {
		for ( var line = 0; line < 7; line++ ) 
        {
			TalentCreateLine($("#talent_choose_agi"), line, heroestalent, 2, "agi")
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////
////// Инициализация талантов в интеллекте
/////////////////////////////////////////////////////////////////////////////////////

function InitTalentInt() 
{
	let hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
	let heroname = Entities.GetUnitName(hero)
	let heroestalent = Game.GetCustomTable("herotalents", heroname)
	$("#talent_choose_int").AddClass(String(heroname)+"_int")

	if (heroestalent) 
    {
		for ( var line = 0; line < 7; line++ ) 
        {
			TalentCreateLine($("#talent_choose_int"), line, heroestalent, 3, "int")
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////
////// Дополнительные функции
/////////////////////////////////////////////////////////////////////////////////////

function UpdateTalentBlock(talent_info, line, block, attribute, data)
{
	let talent_name = talent_info[1]
	if (!IsTalentEmpty(talent_name)) 
	{
        let talent_description = talent_info[2]
        let talent_block = $("#talent_all_panel").FindChildTraverse(talent_name).GetChild(0)
		if ( (data["talantpoints"] > 0) && (data[attribute] || 0) >= line_level_info[line] )
		{
			if (line == 0)
			{
				talent_block.AddClass("talent_lvlup")
				TalentClick(talent_block, talent_name, attribute, talent_description)
			} 
			else
			{
                MouseOver(talent_block, $.Localize(talent_description + "_0"))
				let unique = talent_info[5][1] || ""
				if (unique == "" || (data[unique] && data[unique]["level"] && data[unique]["level"] == talent_info[5][2])) 
				{
					talent_block.AddClass("talent_lvlup")
					TalentClick(talent_block, talent_name, attribute, talent_description)
				}
                if ( unique != "" && ((data[unique] && data[unique]["level"] && data[unique]["level"] < talent_info[5][2]) || data[unique] == null)   ) 
				{
					MouseOver(talent_block, $.Localize(talent_description + "_0") + "<br><br>" + " " + $.Localize("#how_to_upgrade_talent_unique"))
				}
			}
		}
        else 
        {
            let talent_block = $("#talent_all_panel").FindChildTraverse(talent_name).GetChild(0)
            let talent_description = talent_info[2]
            if (line != 0)
            {
                let unique = talent_info[5][1] || ""
                if ( unique != "" && ((data[unique] && data[unique]["level"] && data[unique]["level"] < talent_info[5][2]) || data[unique] == null)   ) 
				{
                    if ((data[attribute] || 0) >= line_level_info[line] )
                    {
                        MouseOver(talent_block, $.Localize(talent_description + "_0") + "<br><br>" + " " + $.Localize("#how_to_upgrade_talent_unique"))
                    } else {
                        MouseOver(talent_block, $.Localize(talent_description + "_0") + "<br><br>" + $.Localize("#how_to_upgrade_talent") + " " + line_level_info[line] + " " + $.Localize("#how_to_upgrade_"+attribute) + "<br><br>" + " " + $.Localize("#how_to_upgrade_talent_unique"))
                    }
				} else {
                    if ((data[attribute] || 0) >= line_level_info[line] )
                    {
                        MouseOver(talent_block, $.Localize(talent_description + "_0"))
                    } else {
                        MouseOver(talent_block, $.Localize(talent_description + "_0") + "<br><br>" + $.Localize("#how_to_upgrade_talent") + " " + line_level_info[line] + " " + $.Localize("#how_to_upgrade_"+attribute))
                    }
                }
            }
            talent_block.RemoveClass("talent_lvlup")
            talent_block.SetPanelEvent("onactivate", function() {});
        }
        if (data[talent_name]) 
        {
            talent_block.RemoveClass("talent_nolvl")
            let percent = data[talent_name]["level"] / talent_info[3] * 100
            $("#talent_all_panel").FindChildTraverse(talent_name).GetChild(1).style.width = percent + "%"
            MouseOver(talent_block, $.Localize(talent_info[2] + "_" + (data[talent_name]["level"] || 0)))
            if (data[talent_name]["level"] == talent_info[3]) 
            {
                talent_block.SetPanelEvent("onactivate", function() {});
                talent_block.RemoveClass("talent_lvlup")
            }
        }
	}
}

function TalentClick(panel,talentname,attribute,name) 
{
    panel.SetPanelEvent("onactivate", function() 
    { 
    	if (Game.IsGamePaused())
    	{
    		return
    	}
    	if (talent_click)
    	{
    		if (IsTalentLocked(talentname))
    		{
    			return
    		}
    		talent_click = false

	    	GameEvents.SendCustomGameEventToServer_custom("talent_learn", {talentname:talentname,attribute:attribute,})

	    	$.Schedule( 0.2, function() 
	    	{
    			talent_click = true
    		})

	    	let hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
			let heroname = Entities.GetUnitName(hero)
			let heroestalent = Game.GetCustomTable("herotalents", heroname)
			let playerstalents = Game.GetCustomTable("playerstalents", String(Players.GetLocalPlayer()))
			if (heroestalent && playerstalents && playerstalents[talentname]) 
			{
	    		UpdateToolTip($("#talent_all_panel").FindChildTraverse(talentname).GetChild(0),$.Localize(name + "_" + (playerstalents[talentname]["level"] + 1 || 0)))
	    	}
	    	else {
	    		UpdateToolTip($("#talent_all_panel").FindChildTraverse(talentname).GetChild(0),$.Localize(name + "_1"))
	    	}
		}
    });
}

// Создать линию талантов
function TalentCreateLine(parent, line, heroestalent, attribute, attribute_name)
{
    let talent_line = $.CreatePanel("Panel", parent, "")
    talent_line.AddClass("talent_line")
    for ( var block = 0; block < 5; block++) 
    {
        TalentCreateBlock(talent_line, line, block, heroestalent, attribute, attribute_name)
    }
}

function TalentCreateBlock(parent, line, block, heroestalent, attribute, attribute_name)
{
    let talent_info = heroestalent[attribute][line + 1][block + 1]
    let talent_name = talent_info[1]
    let talent_image = talent_info[4]
    let talent_description = talent_info[2]

    // Блок
    let talent_block = $.CreatePanel("Panel", parent, talent_name)
    talent_block.AddClass("talent_block")
    // Картинка
    let talent_block_image = $.CreatePanel("Panel", talent_block, "")
    talent_block_image.AddClass("talent_block_image")
    
    // Если талант не пустой
    if (IsTalentNoEmpty(talent_name)) 
    {
        talent_block_image.style.backgroundImage = 'url("file://{images}/custom_game/talents/' + talent_image + '.png")';
        talent_block_image.style.backgroundSize = "100%";
        if (line == 0) 
        {
            talent_block_image.AddClass("talent_lvlup")
            TalentClick(talent_block_image, talent_name, attribute_name, talent_description)
            MouseOver(talent_block_image,$.Localize(talent_description + "_0"))
        } else {
            let unique = talent_info[5][1] || ""
            if ( unique != "") 
            {
                MouseOver(talent_block_image, $.Localize(talent_description + "_0") + "<br><br>" + $.Localize("#how_to_upgrade_talent") + " " + line_level_info[line] + " " + $.Localize("#how_to_upgrade_"+attribute_name) + "<br>" + " " + $.Localize("#how_to_upgrade_talent_unique"))
            } else {
                MouseOver(talent_block_image, $.Localize(talent_description + "_0") + "<br><br>" + $.Localize("#how_to_upgrade_talent") + " " + line_level_info[line] + " " + $.Localize("#how_to_upgrade_"+attribute_name))
            }
        }
    }

    let talent_level_image = $.CreatePanel("Panel", talent_block, "")
    talent_level_image.AddClass("talent_level_image")
    
    // Если талант пустой, то не отображать его
    if (IsTalentEmpty(talent_name)) 
    {
        talent_block.style.opacity = "0"
    }

    talent_level_image.style.width = "0%"
    talent_block_image.AddClass("talent_nolvl")
}

function IsTalentLocked(talentname)
{
    let heroname = Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))
    let locked = Game.GetCustomTable("lockedtalents", heroname)
    let playerstalents = Game.GetCustomTable("playerstalents", String(Players.GetLocalPlayer()))
    if (!locked || !locked[talentname] || !playerstalents)
    {
        return false
    }
    for (let key in locked[talentname])
    {
        if (playerstalents[locked[talentname][key]])
        {
            return true
        }
    }
    return false
}

function IsTalentNoEmpty(name)
{
    if (name.indexOf("empty") == -1)
    {
        return true
    }
    return false
}

function IsTalentEmpty(name)
{
    if (name.indexOf("empty") == 0)
    {
        return true
    }
    return false
}

//////////////////////////////////////////////////////////////////////////////////////
////// Вывести текст при наведении
/////////////////////////////////////////////////////////////////////////////////////

function MouseOver(panel, text) 
{
    panel.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowTextTooltip', panel, text)
    });
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideTextTooltip', panel);
    });
}

//////////////////////////////////////////////////////////////////////////////////////
////// Обновить описание при прокачке
/////////////////////////////////////////////////////////////////////////////////////

function UpdateToolTip(panel, text) 
{
	$.DispatchEvent('DOTAHideTextTooltip', panel)
    $.DispatchEvent('DOTAShowTextTooltip', panel, text)
}

//////////////////////////////////////////////////////////////////////////////////////
////// Кейбинды
/////////////////////////////////////////////////////////////////////////////////////

function GetGameKeybind(command) 
{
	return Game.GetKeybindForCommand(command);
}

function open_talents(data)
{	
	if (Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID()))
	{
		if (Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())) == "")
		{
			return
		}
	}
	OpenTalentsAll()
}

function open_talents_str(data)
{	
	if (Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID()))
	{
		if (Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())) == "")
		{
			return
		}
	}
	OpenTalentsStr()
}

function open_talents_agi(data)
{	
	if (Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID()))
	{
		if (Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())) == "")
		{
			return
		}
	}
	OpenTalentsAgi()	
}

function open_talents_int(data)
{	
	if (Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID()))
	{
		if (Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())) == "")
		{
			return
		}
	}
	OpenTalentsInt()	
}

function DeleteInspect(data)
{	
	
}

(function() 
{
	const name_bind_1 = "open_talents" + Math.floor(Math.random() * 99999999);
	if ((GetGameKeybind(DOTAKeybindCommand_t.DOTA_KEYBIND_LEARN_STATS)) == "") {
		Game.CreateCustomKeyBind("U", name_bind_1);
		Game.AddCommand(name_bind_1, open_talents, "", 0);
	} else {
		Game.CreateCustomKeyBind(GetGameKeybind(DOTAKeybindCommand_t.DOTA_KEYBIND_LEARN_STATS), name_bind_1);
		Game.AddCommand(name_bind_1, open_talents, "", 0);
	}
	const name_bind_2 = "open_talents_str" + Math.floor(Math.random() * 99999999);
	Game.CreateCustomKeyBind(GetGameKeybind(DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP8), name_bind_2);
	Game.AddCommand(name_bind_2, open_talents_str, "", 0);
	const name_bind_3 = "open_talents_agi" + Math.floor(Math.random() * 99999999);
	Game.CreateCustomKeyBind(GetGameKeybind(DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP9), name_bind_3);
	Game.AddCommand(name_bind_3, open_talents_agi, "", 0);
	const name_bind_4 = "open_talents_int" + Math.floor(Math.random() * 99999999);
	Game.CreateCustomKeyBind(GetGameKeybind(DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP10), name_bind_4);
	Game.AddCommand(name_bind_4, open_talents_int, "", 0);
	minimap_container.FindChildTraverse("talent_buttons_key_label_str").text = GetGameKeybind(DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP8)
	minimap_container.FindChildTraverse("talent_buttons_key_label_agi").text = GetGameKeybind(DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP9)
	minimap_container.FindChildTraverse("talent_buttons_key_label_int").text = GetGameKeybind(DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP10)
})();

function updatereconnect() 
{ 
	let hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
	let heroname = Entities.GetUnitName(hero)
	let heroestalent = Game.GetCustomTable("herotalents", heroname)
	let playerstalents = Game.GetCustomTable("playerstalents", String(Players.GetLocalPlayer()))
	$("#talent_values_str").text = $.Localize("#namestr") + ": " + "0"
	$("#talent_values_agi").text = $.Localize("#nameagi") + ": " + "0"
	$("#talent_values_int").text = $.Localize("#nameint") + ": " + "0"
	$("#talent_lowbar_count_str").text = $.Localize("#talantall") + ": " + "0"
	$("#talent_lowbar_count_agi").text = $.Localize("#talantall") + ": " + "0"
	$("#talent_lowbar_count_int").text = $.Localize("#talantall") + ": " + "0"
	$("#talent_lowbar_free_str").text = $.Localize("#talantfree") + ": " + "0"
	$("#talent_lowbar_free_agi").text = $.Localize("#talantfree") + ": " + "0"
	$("#talent_lowbar_free_int").text = $.Localize("#talantfree") + ": " + "0"

	if (playerstalents) 
    {
		let text_points = $.Localize("#points_panel_text")
		text_points = text_points.replace("[!s:value]", playerstalents["maxpoints"] || 0)
		MouseOver(general_panel, text_points)
		if (points_panel) 
        {
			if (playerstalents["hasmax"]) {
				points_panel.style.width = "100%"
				points_text.text = "MAX"
			} else {
				let haspoints = (playerstalents["points"] || 0)
				let percentage = (haspoints * 100) / 10
				points_panel.style.width = (percentage || 0) + "%"
				points_text.text = haspoints + "/10"
			}
		}

		$("#talent_values_str").text = $.Localize("#namestr") + ": " + (playerstalents["str"] || 0)
		$("#talent_values_agi").text = $.Localize("#nameagi") + ": " + (playerstalents["agi"] || 0)
		$("#talent_values_int").text = $.Localize("#nameint") + ": " + (playerstalents["int"] || 0)
		$("#talent_lowbar_count_str").text = $.Localize("#talantall") + ": " + ((playerstalents["str"] || 0) + (playerstalents["agi"] || 0) + (playerstalents["int"] || 0))
		$("#talent_lowbar_count_agi").text = $.Localize("#talantall") + ": " + ((playerstalents["str"] || 0) + (playerstalents["agi"] || 0) + (playerstalents["int"] || 0))
		$("#talent_lowbar_count_int").text = $.Localize("#talantall") + ": " + ((playerstalents["str"] || 0) + (playerstalents["agi"] || 0) + (playerstalents["int"] || 0))
		$("#talent_lowbar_free_str").text = $.Localize("#talantfree") + ": " + (playerstalents["talantpoints"] || 0)
		$("#talent_lowbar_free_agi").text = $.Localize("#talantfree") + ": " + (playerstalents["talantpoints"] || 0)
		$("#talent_lowbar_free_int").text = $.Localize("#talantfree") + ": " + (playerstalents["talantpoints"] || 0)

		if (playerstalents["talantpoints"] > 0) 
        {
			talents_buttons.SetHasClass("haspoints", true)
		} else {
			talents_buttons.SetHasClass("haspoints", false)
		}

		let percentage_allpoints = 100 - (((playerstalents["str"] || 0) + (playerstalents["agi"] || 0) + (playerstalents["int"] || 0)) * 100 / 45)
		talents_buttons_all.style.height = (percentage_allpoints || 100) + "%"

		for ( var line = 0; line < 7; line++ ) 
        {
			for ( var block = 0; block < 5; block++) 
            {
				let talent = heroestalent[1][line + 1][block + 1][1]

                let talent_info_str = heroestalent[1][line + 1][block + 1]
                let talent_info_agi = heroestalent[2][line + 1][block + 1]
                let talent_info_int = heroestalent[3][line + 1][block + 1]
                UpdateTalentBlock(talent_info_str, line, block, "str", playerstalents)
                UpdateTalentBlock(talent_info_agi, line, block, "agi", playerstalents)
                UpdateTalentBlock(talent_info_int, line, block, "int", playerstalents)
			}
		}
		if (playerstalents["str"]) 
        {
			$("#talent_values_str").text = $.Localize("#namestr") + ": " + playerstalents["str"]
		} 
        else 
        {
			$("#talent_values_str").text = $.Localize("#namestr") + ": " + "0"
		}
		if (playerstalents["agi"]) 
        {
			$("#talent_values_agi").text = $.Localize("#nameagi") + ": " + playerstalents["agi"]
		} 
        else 
        {
			$("#talent_values_agi").text = $.Localize("#nameagi") + ": " + "0"
		}
		if (playerstalents["int"]) 
        {
			$("#talent_values_int").text = $.Localize("#nameint") + ": " + playerstalents["int"]
		} 
        else 
        {
			$("#talent_values_int").text = $.Localize("#nameint") + ": " + "0"
		}
		$("#talent_lowbar_count_str").text = $.Localize("#talantall") + ": " + ((playerstalents["str"] || 0) + (playerstalents["agi"] || 0) + (playerstalents["int"] || 0))
		$("#talent_lowbar_count_agi").text = $.Localize("#talantall") + ": " + ((playerstalents["str"] || 0) + (playerstalents["agi"] || 0) + (playerstalents["int"] || 0))
		$("#talent_lowbar_count_int").text = $.Localize("#talantall") + ": " + ((playerstalents["str"] || 0) + (playerstalents["agi"] || 0) + (playerstalents["int"] || 0))
	}
}

CURRENT_SELECT_ID = null

GameUI.CustomUIConfig().CheckEnemyTalent = function ChangeEnemiesPanel(id, hero_name)
{
    $.RegisterEventHandler("InputFocusLost", $("#EnemiesTalentsCheck"), function() { cancelenemies() });
    $("#EnemiesTalentsCheck").RemoveAndDeleteChildren()
    if (CURRENT_SELECT_ID == String(id) || CURRENT_SELECT_ID == null)
    {
        if ($("#EnemiesTalentsCheck").style.opacity == 0 || CURRENT_SELECT_ID == null)
        {
            $("#EnemiesTalentsCheck").style.opacity = 1
            $("#EnemiesTalentsCheck").SetAcceptsFocus(true)
	        $("#EnemiesTalentsCheck").SetFocus()
	        $("#EnemiesTalentsCheck").UpdateFocusInContext()
        } else {
            $("#EnemiesTalentsCheck").style.opacity = 0
            CURRENT_SELECT_ID = null
            return
        }
    }
    hero_name = GetPortraitHero(hero_name)
    AddNewTalents($("#EnemiesTalentsCheck"), id, hero_name)
    CURRENT_SELECT_ID = String(id)
}

function cancelenemies()
{
    $("#EnemiesTalentsCheck").style.opacity = 0 
    CURRENT_SELECT_ID = null
}

function AddNewTalents(panel, id, hero_name)
{
    let playerstalents = Game.GetCustomTable("playerstalents", String(id))
    if (playerstalents) 
    {
        for ( var i = 0; i < Object.keys(playerstalents).length; i++ ) 
        {
            let talent_name = Object.keys(playerstalents)[i]
            if (IsValidTalent(talent_name))
            {
                let talent_info = playerstalents[talent_name]
                let talent_level = talent_info && typeof talent_info == "object" ? Number(talent_info["level"]) || 0 : 0
                TalentCreateBlockEnemy(panel, talent_name, hero_name, talent_level)
            }
        }
    }

    let arena_stones = Game.GetCustomTable("arena_stones", String(id))
    if (arena_stones) 
    {
        for (let rune_id of Object.keys(arena_stones)) 
        {
            let rune_level = arena_stones[rune_id]
            RuneCreateBlockEnemy(panel, rune_id, rune_level)
        }
    }

    let arena_upgrades = Game.GetCustomTable("arena_upgrades", String(id))
    if (arena_upgrades)
    {
        for (let upgrade_id of Object.keys(arena_upgrades))
        {
            let count = Number(arena_upgrades[upgrade_id]) || 0
            if (count > 0)
            {
                UpgradeCreateBlockEnemy(panel, upgrade_id, count, id)
            }
        }
    }
}

function GetHeroRankIndexByLevel(level)
{
    level = Number(level) || 0
    if (level >= 30) { return 6 }
    if (level >= 25) { return 5 }
    if (level >= 18) { return 4 }
    if (level >= 12) { return 3 }
    if (level >= 6) { return 2 }
    if (level >= 1) { return 1 }
    return 0
}

function UpgradeCreateBlockEnemy(panel, upgrade_id, count, player_id)
{
    if (upgrade_id == "smelter_level")
    {
        let badge = $.CreatePanel("Panel", panel, "")
        badge.AddClass("talent_block_image_enemy")
        badge.AddClass("SmelterLevelEnemy")
        let badge_label = $.CreatePanel("Label", badge, "")
        badge_label.AddClass("SmelterLevelEnemyLabel")
        badge_label.text = String(count)
        WodaSetTitleTooltip(badge, $.Localize("#arena_upgrade_smelter_level") + " (" + count + ")", BuildArenaStatsTextGold(badge, GetSmelterBonusStats(count)))
        return
    }
    if (upgrade_id == "hero_level")
    {
        let rank_index = GetHeroRankIndexByLevel(count)
        let level_block = $.CreatePanel("Panel", panel, "")
        level_block.AddClass("talent_block_image_enemy")
        level_block.AddClass("HeroLevelEnemy")
        level_block.style.backgroundImage = 'url("file://{images}/custom_game/hero_rank/rank_' + rank_index + '.png")'
        level_block.style.backgroundSize = "100%"
        let level_label = $.CreatePanel("Label", level_block, "")
        level_label.AddClass("SmelterLevelEnemyLabel")
        level_label.text = String(count)
        level_block.SetDialogVariableInt("bonus", count)
        level_block.SetDialogVariableInt("damage", rank_index * 5)
        WodaSetTitleTooltip(level_block, $.Localize("#arena_upgrade_hero_level") + " (" + count + ") - " + $.Localize("#level_bonus_rank_" + rank_index), WodaGoldNumber($.Localize("#item_tooltip_arena_bonus", level_block)) + "<br>" + WodaGoldNumber($.Localize("#hero_rank_tt_damage_short", level_block)))
        return
    }
    if (upgrade_id == "items_bonus")
    {
        let items_block = $.CreatePanel("Panel", panel, "")
        items_block.AddClass("talent_block_image_enemy")
        items_block.AddClass("ItemsBonusEnemy")
        let items_stats = Game.GetCustomTable("arena_item_stats", String(player_id))
        WodaSetTitleTooltip(items_block, $.Localize("#arena_upgrade_items_bonus") + " (" + count + ")", BuildArenaStatsTextGold(items_block, items_stats))
        return
    }
    let talent_block_image = $.CreatePanel("Panel", panel, "")
    talent_block_image.AddClass("talent_block_image_enemy")
    talent_block_image.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + upgrade_id + '.png")';
    talent_block_image.style.backgroundSize = "100%";
    let title = $.Localize("#" + upgrade_id)
    if (upgrade_id == "upgrade_talent_point" || upgrade_id == "upgrade_start_level" || upgrade_id == "upgrade_curse_armor" || upgrade_id == "upgrade_curse_magic")
    {
        title = title + " (" + count + ")"
    }
    if (upgrade_id == "upgrade_curse_armor" || upgrade_id == "upgrade_curse_magic")
    {
        talent_block_image.SetDialogVariableInt("value", count)
        WodaSetTitleTooltip(talent_block_image, title, WodaGoldNumber($.Localize("#" + upgrade_id + "_level_description", talent_block_image)))
        return
    }
    WodaSetTitleTooltip(talent_block_image, title, WodaGoldNumber($.Localize("#" + upgrade_id + "_description")))
}

function RuneCreateBlockEnemy(panel, rune_id, rune_level)
{
    let talent_block_image = $.CreatePanel("Panel", panel, "")
    talent_block_image.AddClass("talent_block_image_enemy")
    talent_block_image.style.backgroundImage = 'url("file://{images}/custom_game/runes/' + rune_id + '.png")';
    talent_block_image.style.backgroundSize = "100%";
    WodaSetTitleTooltip(talent_block_image, $.Localize("#"+rune_id) + " (" + rune_level + ")", FormatRuneDescription(rune_id, rune_level))
}

function TalentCreateBlockEnemy(panel, talent_name, hero_name, talent_level)
{
    let talent_orign = talent_name
    talent_name = talent_name.replace("modifier_" + hero_name + "_", '')
    let talent_block_image = $.CreatePanel("Panel", panel, "")
    talent_block_image.AddClass("talent_block_image_enemy")
    talent_block_image.style.backgroundImage = 'url("file://{images}/custom_game/talents/' + hero_name  + '/' + talent_name + '.png")';
    talent_block_image.style.backgroundSize = "100%";
    let level_key = talent_orign + "_" + (talent_level || 0)
    let description = $.Localize("#" + level_key)
    if (description == level_key || description == "#" + level_key)
    {
        description = $.Localize("#" + talent_orign + "_0")
    }
    let title = talent_level > 0 ? $.Localize("#enemy_tooltip_talent_level").replace("{n}", String(talent_level)) : $.Localize("#enemy_tooltip_talent")
    WodaSetTitleTooltip(talent_block_image, title, description)
}

function IsValidTalent(name)
{
    let invalid = 
    {
        "modifier_woda_talent_hp1" : true,
        "modifier_woda_talent_regenhp1" : true,
        "modifier_woda_talent_attack1" : true,
        "modifier_woda_talent_str3" : true,
        "modifier_woda_talent_cloak" : true,
        "modifier_woda_talent_quickhp" : true,
        "modifier_woda_talent_str4" : true,
        "modifier_woda_talent_hp2" : true,
        "modifier_woda_talent_sliver" : true,
        "modifier_woda_talent_sasha" : true,
        "modifier_woda_talent_armor2" : true,
        "modifier_woda_talent_regenhp2" : true,
        "modifier_woda_talent_str5" : true,
        "modifier_woda_talent_octar" : true,
        "modifier_woda_talent_str6" : true,
        "modifier_woda_talent_armor1" : true,
        "modifier_woda_talent_speed1" : true,
        "modifier_woda_talent_attackspeed1" : true,
        "modifier_woda_talent_agi3" : true,
        "modifier_woda_talent_miss1" : true,
        "modifier_woda_talent_mask1" : true,
        "modifier_woda_talent_agi4" : true,
        "modifier_woda_talent_speed2" : true,
        "modifier_woda_talent_grovebow" : true,
        "modifier_woda_talent_yasha" : true,
        "modifier_woda_talent_attack2" : true,
        "modifier_woda_talent_attackspeed2" : true,
        "modifier_woda_talent_agi5" : true,
        "modifier_woda_talent_miss2" : true,
        "modifier_woda_talent_agi6" : true,
        "modifier_woda_talent_mp1" : true,
        "modifier_woda_talent_regenmp1" : true,
        "modifier_woda_talent_spell" : true,
        "modifier_woda_talent_int3" : true,
        "modifier_woda_talent_fairy" : true,
        "modifier_woda_talent_mask2" : true,
        "modifier_woda_talent_int4" : true,
        "modifier_woda_talent_mp2" : true,
        "modifier_woda_talent_blood" : true,
        "modifier_woda_talent_kaya" : true,
        "modifier_woda_talent_spellprism" : true,
        "modifier_woda_talent_regenmp2" : true,
        "modifier_woda_talent_int5" : true,
        "modifier_woda_talent_timeless" : true,
        "modifier_woda_talent_int6" : true,
    }
    if (name.indexOf("modifier_") == 0 && invalid[name] == null)
    {
        return true
    }
    return false
}

GameEvents.Subscribe_custom("woda_cheat_talents_reinit", CheatReinitTalents)

function CheatReinitTalents(data)
{
    if (first_time_talants !== true) { return }
    let hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
    if (hero == null || hero == -1) { return }
    let old_hero = data && data.old_hero ? String(data.old_hero) : ""
    let panels = { str: $("#talent_choose_str"), agi: $("#talent_choose_agi"), int: $("#talent_choose_int") }
    for (let attribute in panels)
    {
        if (old_hero != "")
        {
            panels[attribute].RemoveClass(old_hero + "_" + attribute)
        }
        panels[attribute].RemoveAndDeleteChildren()
    }
    InitTalentStr()
    InitTalentAgi()
    InitTalentInt()
    updatereconnect()
}