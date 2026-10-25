--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameEvents.Subscribe_custom( "set_map_change_woda", ChangeMapPlayer )

function IsArenaMapWODA()
{
	return /^(arena|1_player|4_player)$/.test(Game.GetMapInfo().map_display_name)
}

function IsOverlayMapDisabled()
{
	return Game.GetMapInfo().map_display_name == "overthrow"
}

var OVERLAY_MAPS_WODA = ["OverlayMapWODA", "OverlayMapWODAArena", "OverlayMapWODAZoom7", "OverlayMapWODAZoom8"]
var OVERLAY_MAP_ZOOM_WODA = 0

function SetOverlayMapZoomWODA(data)
{
	OVERLAY_MAP_ZOOM_WODA = (data && data.zoom) ? (Number(data.zoom) || 0) : 0
}

function GetOverlayMapIdWODA()
{
	if (IsArenaMapWODA())
	{
		return "OverlayMapWODAArena"
	}
	if (OVERLAY_MAP_ZOOM_WODA > 0 && $("#OverlayMapWODAZoom" + OVERLAY_MAP_ZOOM_WODA))
	{
		return "OverlayMapWODAZoom" + OVERLAY_MAP_ZOOM_WODA
	}
	return "OverlayMapWODA"
}

function GetOverlayMapWODA()
{
	var active = GetOverlayMapIdWODA()
	for (var i = 0; i < OVERLAY_MAPS_WODA.length; i++)
	{
		var map = $("#" + OVERLAY_MAPS_WODA[i])
		if (map)
		{
			map.style.visibility = OVERLAY_MAPS_WODA[i] == active ? "visible" : "collapse"
		}
	}
	return $("#" + active)
}

function HideOverlayMapWODA()
{
	$.GetContextPanel().visible = false
	for (var i = 0; i < OVERLAY_MAPS_WODA.length; i++)
	{
		var map = $("#" + OVERLAY_MAPS_WODA[i])
		if (map)
		{
			map.style.visibility = "collapse"
		}
	}
	$("#OverlayMapWODABG").style.visibility = "collapse"
}

function GetHiddenHeroesWODA()
{
	var hidden = {}
	var data = CustomNetTables.GetTableValue("map_info", "hidden_heroes")
	if (data)
	{
		for (var name in data)
		{
			hidden[name] = true
			hidden[String(name).replace("npc_dota_hero_", "")] = true
			hidden["id_" + data[name]] = true
		}
	}
	return hidden
}

function IsHeroImageHiddenWODA(panel, hidden)
{
	var name = String(panel.heroname || "")
	if (name != "" && (hidden[name] || hidden[name.replace("npc_dota_hero_", "")]))
	{
		return true
	}
	return panel.heroid != null && hidden["id_" + panel.heroid] == true
}

function UpdateHeroImagesWODA(wisp_visible, overlay_ids)
{
	var hidden = GetHiddenHeroesWODA()
	if (wisp_visible == null && Object.keys(hidden).length == 0)
	{
		return
	}
	var ids = overlay_ids || OVERLAY_MAPS_WODA
	for (var i = 0; i < ids.length; i++)
	{
		var map = $("#" + ids[i])
		if (!map)
		{
			continue
		}
		for (var j = 0; j < map.GetChildCount(); j++)
		{
			var panel = map.GetChild(j)
			if (panel && panel.paneltype == "DOTAHeroImage")
			{
				if (IsHeroImageHiddenWODA(panel, hidden))
				{
					panel.style.opacity = "0"
				}
				else if (wisp_visible != null)
				{
					panel.style.opacity = String(wisp_visible)
				}
			}
		}
	}
}

function UpdateHiddenHeroesLoopWODA()
{
	if (IsOverlayMapDisabled() || IsArenaMapWODA())
	{
		return
	}
	UpdateHeroImagesWODA(null, [GetOverlayMapIdWODA()])
	$.Schedule(0.25, UpdateHiddenHeroesLoopWODA)
}

function ApplyMinimapBlockStyle(minimap_container)
{
	if (!minimap_container) { return }
	let minimap_block = minimap_container.FindChildTraverse("minimap_block")
	if (minimap_block)
	{
		minimap_block.style.backgroundImage = "url('file://{images}/custom_game/talents/map_bg.png')"
		minimap_block.hittest = true
		let minimap_bgs = minimap_container.FindChildTraverse("minimap_bgs")
		if (minimap_bgs)
		{
			minimap_bgs.style.opacity = "0"
		}
		minimap_block.style.opacity = "0"
	}
}

function ChangeMapPlayer(data)
{
	if (IsOverlayMapDisabled())
	{
		HideOverlayMapWODA()
		return
	} 

    $.Schedule(1, function()
    {
        ApplyMinimapBlockStyle(FindDotaHudElement("minimap_container"))
        let map = GetOverlayMapWODA()
        map.fixedoffsetenabled = true;
        map.minheightgroupbrightness = 1;
    })
 
	if (data)
	{
		SetOverlayMapZoomWODA(data)
		let map_now = GetOverlayMapWODA()
		map_now.fixedoffsetenabled = true;
		map_now.minheightgroupbrightness = 1;
		map_now.SetFixedOffset(data.x, data.y);
	}
}

GameEvents.Subscribe_custom( "set_map_hidden_wisp", set_map_hidden_wisp )

function set_map_hidden_wisp(data)
{
	if (IsOverlayMapDisabled())
	{
		HideOverlayMapWODA()
		return
	}
	UpdateHeroImagesWODA(data.visible, Number(data.visible) == 0 ? [GetOverlayMapIdWODA()] : null)
}

function SetMinimapReconnect()
{
	if (IsOverlayMapDisabled())
	{
		HideOverlayMapWODA()
		return
	}
	let data = CustomNetTables.GetTableValue("map_info", "map_coord")
	if (data && data.x && data.y)
	{
		let minimap_container = $.GetContextPanel().GetParent().GetParent().GetParent().FindChild("HUDElements").FindChildTraverse("minimap_container");
		ApplyMinimapBlockStyle(minimap_container)
		$("#OverlayMapWODABG").style.visibility = "visible"
		SetOverlayMapZoomWODA(data)
		let map = GetOverlayMapWODA()
		map.fixedoffsetenabled = true;
		map.SetFixedOffset(data.x, data.y);
        map.minheightgroupbrightness = 1;
	}
} 

$.Schedule(1, function()
{
    SetMinimapReconnect()
    UpdateHiddenHeroesLoopWODA()
})