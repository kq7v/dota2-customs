--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var boss_health_bar_stages_count = 0

GameEvents.Subscribe_custom("event_woda_boss_health_bar_start", BossHealthBarStart)
GameEvents.Subscribe_custom("event_woda_boss_health_bar_update", BossHealthBarUpdate)
GameEvents.Subscribe_custom("event_woda_boss_health_bar_end", BossHealthBarEnd)

var BOSS_HEALTH_BAR_HERO_ICONS =
{
	boss_9_pve: "nevermore",
	boss_cm_wolf_pve: "crystal_maiden",
	boss_mars_pve: "mars",
	boss_rubick_pve: "rubick",
	boss_lifestealer_pve: "life_stealer",
	boss_chen_pve: "chen",
	boss_beastmaster_pve: "beastmaster",
	boss_undying_pve: "undying",
	boss_skywrath_pve: "skywrath_mage",
	boss_brewmaster_pve: "brewmaster",
	boss_mirana_pve: "mirana",
	boss_treant_pve: "treant",
	boss_nyx_pve: "nyx_assassin",
	boss_snapfire_pve: "snapfire",
	boss_clockwerk_pve: "rattletrap",
	boss_shadow_shaman_pve: "shadow_shaman",
	boss_broodmother_pve: "broodmother",
	boss_primal_beast_pve: "primal_beast",
	boss_earth_spirit_pve: "earth_spirit",
	boss_elder_titan_pve: "elder_titan",
}

var BOSS_HEALTH_BAR_CUSTOM_ICONS =
{
	boss_cosmic_roshan_pve: "s2r://panorama/images/events/monster_hunter/heroes_icons/npc_dota_hero_roshan_psd.vtex",
}

function GetBossHealthBarIcon(unit_name)
{
	if (BOSS_HEALTH_BAR_CUSTOM_ICONS[unit_name])
	{
		return BOSS_HEALTH_BAR_CUSTOM_ICONS[unit_name]
	}
	if (BOSS_HEALTH_BAR_HERO_ICONS[unit_name])
	{
		return "s2r://panorama/images/heroes/icons/npc_dota_hero_" + BOSS_HEALTH_BAR_HERO_ICONS[unit_name] + "_png.vtex"
	}
	return "file://{images}/custom_game/talents/" + unit_name + ".png"
}

GameUI.CustomUIConfig().GetBossHealthBarIcon = GetBossHealthBarIcon

function BossHealthBarStart(data)
{
	$("#BossIcon").style.backgroundImage = 'url("' + GetBossHealthBarIcon(data.unit_name) + '")'
	$("#BossIcon").style.backgroundSize = "100%"
	$("#BossLabel").text = $.Localize("#" + data.unit_name)
	$("#BossHpLabel").text = data.health + " / " + data.max_health
	UpdateBossHealthBarStages(GetBossStagesCount(data))
	$("#BossHealthBarContainer").style.visibility = "visible"
}

function BossHealthBarUpdate(data)
{
	var stages_count = GetBossStagesCount(data)
	UpdateBossHealthBarStages(stages_count)

    $("#MultiplyCount").text = "x" + data.multiplier
    $("#MultiplyCount").visible = data.multiplier > 1

	for (var i = 1; i <= stages_count; i++)
	{
		var fill = $("#BossProgressBarFill_" + i)
		if (fill)
		{
			var value = Math.max(0, Math.min(1, GetBossStageValue(data, i)))
			fill.style.width = (value * 100) + "%"
			fill.style.backgroundColor = GetBossStageGradient(i, stages_count)
		}
	}

	$("#BossHpLabel").text = data.health + " / " + data.max_health
}

function BossHealthBarEnd(data)
{
	$("#BossHealthBarContainer").style.visibility = "collapse"

	for (var i = 1; i <= boss_health_bar_stages_count; i++)
	{
		var fill = $("#BossProgressBarFill_" + i)
		if (fill)
		{
			fill.style.width = "100%"
		}
	}
}

function UpdateBossHealthBarStages(stages_count)
{
	stages_count = Math.max(1, stages_count || 4)
	if (boss_health_bar_stages_count == stages_count)
	{
		return
	}

	var container = $("#BossProgressBars")
	container.RemoveAndDeleteChildren()
	boss_health_bar_stages_count = stages_count

	for (var i = stages_count; i >= 1; i--)
	{
		var bar = $.CreatePanel("Panel", container, "BossProgressBar_" + i)
		bar.AddClass("ProgressBarCustom")
		bar.hittest = false

		var fill = $.CreatePanel("Panel", bar, "BossProgressBarFill_" + i)
		fill.AddClass("BossProgressBarFill")
		fill.style.width = "100%"
		fill.style.backgroundColor = GetBossStageGradient(i, stages_count)
	}
}

function GetBossStagesCount(data)
{
	if (data && data.stages_count)
	{
		return Number(data.stages_count)
	}
	if (data && data.hp_stages)
	{
		return Object.keys(data.hp_stages).length
	}
	return 4
}

function GetBossStageValue(data, stage)
{
	if (data && data.hp_stages && data.hp_stages[stage] != null)
	{
		return Number(data.hp_stages[stage])
	}
	if (data && data.hp_stages && data.hp_stages[String(stage)] != null)
	{
		return Number(data.hp_stages[String(stage)])
	}
	if (data && data["hp_stage_" + stage] != null)
	{
		return Number(data["hp_stage_" + stage])
	}
	return 1
}

function GetBossStageGradient(stage, stages_count)
{
	var color = GetBossStageColor(stage, stages_count)
	var dark = ColorMix(color, [22, 18, 14], 0.34)
	var light = ColorMix(color, [255, 236, 184], 0.25)

	return "gradient( linear, 0% 0%, 100% 0%, from( " + ToRgba(dark, "00") + " ), color-stop( 0.0, " + ToRgba(dark, "ee") + " ), color-stop( 0.58, " + ToRgba(color, "e8") + " ), color-stop( 1.0, " + ToRgba(light, "aa") + " ), to( " + ToRgba(light, "00") + " ) )"
}

function GetBossStageColor(stage, stages_count)
{
	if (stages_count <= 1)
	{
		return [215, 47, 47]
	}

	var anchors = [
		[245, 211, 82],
		[132, 213, 77],
		[54, 203, 151],
		[62, 177, 224],
		[90, 118, 231],
		[153, 92, 222],
		[220, 78, 173],
		[225, 55, 55]
	]
	var t = (stage - 1) / (stages_count - 1)
	var position = t * (anchors.length - 1)
	var index = Math.floor(position)
	var local_t = position - index

	if (index >= anchors.length - 1)
	{
		return anchors[anchors.length - 1]
	}

	return ColorMix(anchors[index], anchors[index + 1], local_t)
}

function ColorMix(from, to, t)
{
	return [
		Math.round(from[0] + (to[0] - from[0]) * t),
		Math.round(from[1] + (to[1] - from[1]) * t),
		Math.round(from[2] + (to[2] - from[2]) * t)
	]
}

function ToRgba(color, alpha)
{
	return "#" + ToHex(color[0]) + ToHex(color[1]) + ToHex(color[2]) + alpha
}

function ToHex(value)
{
	var hex = Math.max(0, Math.min(255, value)).toString(16)
	return hex.length == 1 ? "0" + hex : hex
}