--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


"use strict";

const ability_tooltip_hud = (() =>
{
	let panel = $.GetContextPanel()

	while (panel && panel.id !== "DotaHud")
		panel = panel.GetParent()

	return panel
})()

const ability_tooltip_damage = {1: "DamageTypePhysical", 2: "DamageTypeMagical", 4: "DamageTypePure"}

const ability_tooltip_stats =
{
	IsStatPhysicalDamage: "DamageTypePhysical",
	IsStatPhysicalDamagePercentage: "DamageTypePhysical",
	IsStatMagicalDamage: "DamageTypeMagical",
	IsStatMagicalDamagePercentage: "DamageTypeMagical",
	IsStatPureDamage: "DamageTypePure",
	IsStatHealthPercentageAsPureDamage: "DamageTypePure",
}

const ability_tooltip_attributes = {str: true, agi: true, int: true, stats: true}

const ability_tooltip_block_icons = {Diff: "dota", Features: "dota", Buildings: "buildings"}

const ability_tooltip_costs = ["AbilityCooldown", "AbilityManaCost", "AbilityHealthCost", "AbilityCastPoint", "AbilityCastRange"]

const ability_tooltip_fields =
{
	abilityduration: "AbilityDuration",
	abilitycastpoint: "AbilityCastPoint",
	abilitycastrange: "AbilityCastRange",
	abilitychargerestoretime: "AbilityChargeRestoreTime",
}

const ability_tooltip_status =
{
	aghs: {native: "DOTAHUDAghsStatusTooltip", show: "DOTAShowAghsStatusDisplayTooltip", hide: "DOTAHideAghsStatusDisplayTooltip"},
	innate: {native: "DOTAHUDInnateStatusTooltip", show: "DOTAShowInnateDisplayTooltip", hide: "DOTAHideInnateDisplayTooltip"},
	stats: {native: "DOTAHUDDamageArmorTooltip", show: "DOTAHUDShowDamageArmorTooltip", hide: "DOTAHUDHideDamageArmorTooltip"},
}

const item_tooltip_target = ["CastType", "DamageType", "SpellImmunityType", "DispelType", "Breakable"]

const item_tooltip_groups = {cdr: "item_octarine_core_custom", magic_resist: "item_cloak_custom", boots: "item_boots", kaya: "item_kaya_custom", sange: "item_sange_custom", yasha: "item_yasha_custom"}

const ability_tooltip_branches = (() =>
{
	let result = []

	for (let mask = 1; mask < 16; mask++)
		result.push(["q", "w", "e", "r"].filter((branch, index) => mask & (1 << index)).join(""))

	return result
})()

let ability_tooltip_schedule = null
let ability_tooltip_panel = null
let ability_tooltip_range = null
let ability_tooltip_attack_range = null
let ability_tooltip_stretch = 0
let ability_tooltip_reveal = 0
let ability_tooltip_tooltips = null
let ability_tooltip_colors = {}
let ability_tooltip_status_schedule = {}
let item_tooltip_sell = 0

function AbilityTooltipNative(id)
{
	if (!ability_tooltip_tooltips || !ability_tooltip_tooltips.IsValid())
		ability_tooltip_tooltips = ability_tooltip_hud.FindChildTraverse("Tooltips")

	return ability_tooltip_tooltips ? ability_tooltip_tooltips.FindChildTraverse(id) : null
}

function AbilityTooltipCancel()
{
	if (!ability_tooltip_schedule)
		return

	$.CancelScheduled(ability_tooltip_schedule)
	ability_tooltip_schedule = null
}

function AbilityTooltipShow(panel, ability_name, unit)
{
	AbilityTooltipCancel()
	AbilityTooltipHide()

	let native = AbilityTooltipNative("DOTAAbilityTooltip")
	let entity = unit !== -1 ? Entities.GetAbilityByName(unit, ability_name) : -1
	let custom = entity !== -1 && panel.id !== "ItemImage" && !Abilities.IsItem(entity)
	let shop = entity === -1 && (ability_name || "").startsWith("item_") && (panel.paneltype === "DOTAShopItem" || panel.id === "ItemImage" && !!panel.GetParent() && panel.GetParent().paneltype === "DOTAShopItem")

	if (native)
		native.style.opacity = custom || shop ? "0" : null

	if (shop)
	{
		ability_tooltip_panel = panel
		AbilityTooltipOpen(panel, "mode=item&entity=-1&item=" + ability_name)
		return
	}

	if (!custom)
		return

	ability_tooltip_panel = panel

	let caster = Abilities.GetCaster(entity)
	let owner = Entities.GetPlayerOwnerID(caster)
	let range = Abilities.GetCastRange(entity) + (Players.GetPlayerHeroEntityIndex(owner) === caster ? (Game.player_stats[owner] || {}).cast_range || 0 : 0)

	if (range > 0)
	{
		ability_tooltip_range = Particles.CreateParticle("particles/ui_mouseactions/range_display.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, caster)
		Particles.SetParticleControl(ability_tooltip_range, 1, [range, 0, 0])
	}

	AbilityTooltipOpen(panel, "entity=" + entity + "&ability=" + ability_name)
}

function ItemTooltipShow(panel, unit, slot)
{
	AbilityTooltipCancel()
	AbilityTooltipHide()

	let item = Entities.GetItemInSlot(unit, slot)
	let native = AbilityTooltipNative("DOTAAbilityTooltip")

	if (item === -1)
		return

	if (native)
		native.style.opacity = "0"

	ability_tooltip_panel = panel
	Game.item_tooltip = item
	AbilityTooltipOpen(panel, "mode=item&entity=" + item)
}

function AbilityTooltipOpen(panel, params)
{
	ability_tooltip_schedule = $.Schedule(0, () =>
	{
		ability_tooltip_schedule = null
		$.DispatchEvent("UIShowCustomLayoutParametersTooltip", panel, "ability_tooltip", "file://{resources}/layout/custom_game/ability_tooltip/ability_tooltip.xml", params)
	})
}

function AbilityTooltipLeave(panel)
{
	if (panel && ability_tooltip_panel && panel !== ability_tooltip_panel)
		return

	AbilityTooltipCancel()
	AbilityTooltipHide()
}

function AbilityTooltipHide()
{
	if (!ability_tooltip_panel)
		return

	if (ability_tooltip_panel.IsValid())
		$.DispatchEvent("UIHideCustomLayoutTooltip", ability_tooltip_panel, "ability_tooltip")

	if (ability_tooltip_range !== null)
	{
		Particles.DestroyParticleEffect(ability_tooltip_range, true)
		Particles.ReleaseParticleIndex(ability_tooltip_range)
		ability_tooltip_range = null
	}

	let native = AbilityTooltipNative("DOTAAbilityTooltip")

	if (native)
		native.style.opacity = null

	ability_tooltip_panel = null
	Game.item_tooltip = -1
	Game.item_tooltip_fill = null
}

function AbilityTooltipNumber(value)
{
	return String(Number(value.toFixed(2)))
}

function AbilityTooltipActive(count, level, max, orb)
{
	if (count === 1)
		return 0

	if (orb)
		return orb.active

	return count === max ? level - 1 : -1
}

function AbilityTooltipOrbs(caster, keys)
{
	let result = {}
	let orbs = {}
	let extra = null

	for (let key in keys)
	{
		let levelkey = keys[key]

		if (levelkey === "dynamic" || levelkey === "sum")
			continue

		if (!(levelkey in orbs))
		{
			if (extra === null)
				extra = Number(Game.GetTalentValue("modifier_invoker_invoke_4", "level", Entities.GetPlayerOwnerID(caster), true)) || 0

			let orb = Entities.GetAbilityByName(caster, "invoker_" + levelkey.replace("level", "") + "_custom")
			orbs[levelkey] = orb !== -1 ? {count: Abilities.GetMaxLevel(orb) + extra, active: Abilities.GetLevel(orb) - 1 + extra} : null
		}

		if (orbs[levelkey])
			result[key] = orbs[levelkey]
	}

	return result
}

function AbilityTooltipSpans(values, active, damage)
{
	let type = damage ? " " + damage : ""
	let spans = values.map((value, index) => "<span class='GameplayValues" + type + (index === active ? " GameplayVariable" : "") + "'>" + value + "</span>")

	return spans.join("<span class='GameplayValues'> / </span>")
}

function AbilityTooltipKey(text)
{
	return text.replace(/<[^>]*>/g, "").replace(/^[%+$\-]+/, "").replace(/:\s*$/, "").trim().toUpperCase()
}

function AbilityTooltipCopy(details, id, visible, target_id = id)
{
	let source = details.FindChildTraverse(id)
	let target = $("#" + target_id)
	let show = visible && source !== null && !source.BHasClass("Hidden") && source.text !== "" && source.text !== "0"

	target.SetHasClass("Hidden", !show)

	if (show)
		target.text = source.text

	return show
}

function AbilityTooltipCost(details, id, level, max, current, fallback)
{
	let target = $("#" + id)

	if (!AbilityTooltipCopy(details, id, true))
	{
		if (level === 0 || !fallback)
			return

		target.text = AbilityTooltipSpans([AbilityTooltipNumber(fallback)], 0, "")
		target.SetHasClass("Hidden", false)
		return
	}

	let values = target.text.split(" / ")
	let active = AbilityTooltipActive(values.length, level, max)

	if (current && active >= 0)
		target.text = AbilityTooltipSpans([values[active]], 0, "")
	else
		target.text = AbilityTooltipSpans(values, active, "")
}

function AbilityTooltipStat(caster, player_id, stat)
{
	if (stat === "max_health")
		return Entities.GetMaxHealth(caster)

	if (stat === "max_mana")
		return Entities.GetMaxMana(caster)

	if (stat === "attack")
		return (Entities.GetDamageMin(caster) + Entities.GetDamageMax(caster))/2 + Entities.GetDamageBonus(caster)

	let stats = Game.player_stats[player_id]

	if (!stats)
		return undefined

	return stat === "stats" ? stats.str + stats.agi + stats.int : stats[stat]
}

function AbilityTooltipBonus(entity, ability_name)
{
	let caster = Abilities.GetCaster(entity)
	let hero = Entities.GetUnitName(caster)
	let player_id = Entities.GetPlayerOwnerID(caster)
	let talents = Game.talents_values[hero]
	let spells = Game.spells_by_number[hero]
	let ability_keys = (CustomNetTables.GetTableValue("custom_pick", "ability_keys_" + hero) || {})[ability_name] || {}
	let bonus = {value: {}, percent: {}, all: {}, replace: {}, changed: {}, talents: {}, levels: {}, keys: ability_keys, orbs: AbilityTooltipOrbs(caster, ability_keys)}

	if (!talents || !spells)
		return bonus

	for (let name in talents)
	{
		let data = talents[name]

		if (!data.tooltip && !data.tooltip_damage)
			continue

		if (!Game.HasTalent(player_id, name))
			continue

		let spell = spells[data.skill_number]

		if (data.tooltip_damage && spell && spell.name === ability_name)
			bonus.damage = data.tooltip_damage

		let rules = data.alt_talent && Game.HasTalent(player_id, data.alt_talent) ? data.tooltip_alt : data.tooltip

		if (!rules)
			continue

		let keys = rules[ability_name] || (spell && spell.name === ability_name ? rules.default : undefined)

		if (!keys)
			continue

		let talent = {hero: hero, icon: data.mini_icon, rarity: data.rarity}
		let buff = data.mod_name ? Game.FindModifier(caster, data.mod_name) : -1
		let stacks = buff !== -1 ? Buffs.GetStackCount(caster, buff) : 0

		for (let key in keys)
		{
			let penalty = keys[key].trim().startsWith("~")
			let expression = keys[key].trim().replace(/^~/, "")

			let marker = ability_tooltip_costs.includes(key) || expression === "icon"
			let add = 0
			let percent = 0
			let all = 0
			let replace = marker && expression === "=0" ? 0 : undefined
			let plain = false

			for (let term of marker ? [] : expression.split("+"))
			{
				if (term.trim() === "")
				{
					plain = true
					continue
				}

				let parts = term.trim().replace(/^=/, "").split("*")
				let mult = parts.length > 1 ? parts.pop() : (!plain && ability_tooltip_attributes[parts[0]] ? parts[0] : undefined)
				plain = false
				let value = parts.reduce((result, part) =>
				{
					let field = part.replace(/%$/, "")
					let number = Number(field)

					if (field === "stacks")
						number = stacks
					else if (isNaN(number))
						number = Number(Game.GetTalentValue(name, field, player_id, true))

					return result*(part.endsWith("%") ? number/100 : number)
				}, 1)

				if (term.trim().startsWith("="))
				{
					replace = value
					continue
				}

				if (mult === "kv")
				{
					percent += value
					continue
				}

				if (mult === "all")
				{
					all += value
					continue
				}

				if (mult === "perma")
					value = Math.round(value*stacks/data.max)
				else if (mult)
				{
					let stat_value = AbilityTooltipStat(caster, player_id, mult)

					if (stat_value === undefined)
						continue

					value = Math.round(value*stat_value/100)
				}

				add += value
			}

			if (!marker && add === 0 && percent === 0 && all === 0 && replace === undefined)
				continue

			if (replace !== undefined)
				bonus.replace[key] = replace

			if (!marker)
				bonus.changed[key] = true

			bonus.value[key] = (bonus.value[key] || 0) + add
			bonus.percent[key] = (bonus.percent[key] || 0) + percent
			bonus.all[key] = (bonus.all[key] || 0) + all

			if (!penalty)
				(bonus.talents[key] = bonus.talents[key] || []).push(talent)
		}
	}

	return bonus
}

function AbilityTooltipTalentIcon(parent, talent)
{
	let icon = $.CreatePanel("Panel", parent, "")
	icon.AddClass("AbilityTalentIcon")
	icon.AddClass("AbilityTalentIcon_" + talent.rarity)

	let image = $.CreatePanel("Panel", icon, "")
	image.AddClass("AbilityTalentIconImage")
	image.style.backgroundImage = 'url("file://{images}/custom_game/icons/mini/' + talent.hero + '/' + talent.icon + '.png")'
	image.style.backgroundSize = "contain"

	return icon
}


function AbilityTooltipLevels(entity, key, max, bonus)
{
	if (bonus.levels[key])
		return bonus.levels[key]

	let name = ability_tooltip_fields[key] || key
	let orb = bonus.orbs[key]
	let values = []

	for (let i = 0; i < (orb ? orb.count : max); i++)
	{
		let base = bonus.replace[key] !== undefined ? bonus.replace[key] : entity !== -1 ? Abilities.GetLevelSpecialValueFor(entity, name, i) : 0
		values.push(AbilityTooltipNumber((base*(1 + (bonus.percent[key] || 0)/100) + (bonus.value[key] || 0))*(1 + (bonus.all[key] || 0)/100)))
	}

	if (values.every(value => value === values[0]))
		values = [values[0]]

	bonus.levels[key] = values

	return values
}

function AbilityTooltipValues(text, entity, level, max, bonus)
{
	text = text.replace(/%([A-Za-z0-9_]+)%(%%)?/g, (match, value_name, percent) =>
	{
		let values = AbilityTooltipLevels(entity, value_name, max, bonus).map(value => value.replace("-", "") + (percent ? "%" : ""))

		return AbilityTooltipSpans(values, AbilityTooltipActive(values.length, level, max, bonus.orbs[value_name]), "")
	})

	return text.replace(/%%/g, "%")
}

function AbilityTooltipDescription(entity, ability_name, level, max, bonus)
{
	let key = "#DOTA_Tooltip_ability_" + ability_name + "_Description"
	let text = $.Localize(key)

	if (text === key)
		return ""

	return AbilityTooltipValues(text, entity, level, max, bonus)
}

function AbilityTooltipLegendary(container, prefix, entity, level, max, bonus)
{
	let caster = Abilities.GetCaster(entity)
	let player_id = Entities.GetPlayerOwnerID(caster)
	let talents = Game.talents_values[Entities.GetUnitName(caster)] || {}
	let legendary = {}

	for (let name in talents)
	{
		let data = talents[name]
		let branch = ["q", "w", "e", "r"][data.skill_number - 1]

		if (data.rarity === "orange" && branch && !legendary[branch])
			legendary[branch] = {icon: data.skill_icon, build: data.build_type, taken: Game.HasTalent(player_id, name)}
	}

	let taken = Object.keys(legendary).some(branch => legendary[branch].taken)
	let variants = []
	container.RemoveAndDeleteChildren()

	for (let branches of ability_tooltip_branches)
	{
		let shown = branches.split("")
		let shown_taken = shown.some(branch => legendary[branch] && legendary[branch].taken)
		let build = shown.map(branch => legendary[branch] && legendary[branch].build).find(value => value) || 0

		for (let suffix of ["", "_only"])
		{
			let key = prefix + branches + suffix
			let text = $.Localize(key)

			if (text === key)
				continue

			if ((taken || suffix !== "") && !shown_taken)
				continue

			variants.push({shown: shown, build: build, text: text})
		}
	}

	variants.sort((a, b) => (a.build || 3) - (b.build || 3))

	for (let variant of variants)
	{
		let block = $.CreatePanel("Panel", container, "")
		block.AddClass("AbilityLegendaryBlock")
		block.AddClass("AbilityLegendaryBuild_" + variant.build)

		let header = $.CreatePanel("Panel", block, "")
		header.AddClass("AbilityLegendaryHeader")

		let title = $.CreatePanel("Label", header, "")
		title.AddClass("AbilityLegendaryTitle")
		title.text = $.Localize("#tooltip_ability_legendary")

		for (let index = 0; index < variant.shown.length; index++)
		{
			let branch = variant.shown[index]

			if (index > 0)
			{
				let or = $.CreatePanel("Label", header, "")
				or.AddClass("AbilityLegendaryTitle")
				or.AddClass("AbilityLegendaryOr")
				or.text = $.Localize("#tooltip_ability_or")
			}

			if (legendary[branch])
			{
				let icon = $.CreatePanel("Panel", header, "")
				icon.AddClass("AbilityLegendaryIcon")
				icon.style.backgroundImage = "url('file://{images}/custom_game/icons/skills/" + legendary[branch].icon + ".png')"
				icon.style.backgroundSize = "100% 100%"
				continue
			}

			let letter = $.CreatePanel("Label", header, "")
			letter.AddClass("AbilityLegendaryTitle")
			letter.text = branch.toUpperCase()
		}

		let separator = $.CreatePanel("Panel", block, "")
		separator.AddClass("AbilityLegendarySeparator")

		let label = $.CreatePanel("Label", block, "")
		label.html = true
		label.AddClass("AbilityLegendaryText")
		label.text = AbilityTooltipValues(variant.text, entity, level, max, bonus)
	}

	container.SetHasClass("Hidden", container.GetChildCount() === 0)
}

function AbilityTooltipExtra(details, details_v2, entity, ability_name, level, max, bonus)
{
	let source = details.FindChildTraverse("AbilityExtraAttributes")
	let stats = {}

	for (let row of details_v2.FindChildrenWithClassTraverse("StatRow"))
	{
		let label = row.FindChildrenWithClassTraverse("StatLabel")[0]

		if (!label)
			continue

		for (let name in ability_tooltip_stats)
		{
			if (row.BHasClass(name))
				stats[AbilityTooltipKey(label.text)] = bonus.damage ? ability_tooltip_damage[bonus.damage] : ability_tooltip_stats[name]
		}
	}

	let overrides = {}
	let sources = {}
	let row_orbs = {}
	let dynamic = {}
	let sums = []

	for (let key of new Set(Object.keys(bonus.talents).concat(Object.keys(bonus.changed), Object.keys(bonus.keys))))
	{
		let label_key = "#DOTA_Tooltip_ability_" + ability_name + "_" + key
		let label = $.Localize(label_key)

		if (label === label_key)
			continue

		let line_key = AbilityTooltipKey(label)
		let percent = label.trim().startsWith("%") ? "%" : ""

		if (bonus.keys[key] === "sum")
		{
			let terms = key.split("+")
			let levels = terms.map(term => AbilityTooltipLevels(entity, term.replace(/%$/, ""), max, bonus))
			let count = Math.max(...levels.map(values => values.length))

			overrides[line_key] = Array.from({length: count}, (value, index) => terms.map((term, number) => (levels[number][index] || levels[number][0]) + (term.endsWith("%") ? "%" : "")).join(" + "))
			sources[line_key] = terms.reduce((result, term) => result.concat(bonus.talents[term.replace(/%$/, "")] || []), []).filter((talent, index, list) => list.findIndex(other => other.icon === talent.icon) === index)
			sums.push({key: key, label: label.trim(), line_key: line_key})
			continue
		}

		if (bonus.orbs[key] || bonus.changed[key])
			overrides[line_key] = AbilityTooltipLevels(entity, key, max, bonus).map(value => value + percent)

		sources[line_key] = bonus.talents[key] || []
		row_orbs[line_key] = bonus.orbs[key]
		dynamic[line_key] = bonus.keys[key] === "dynamic"
	}

	let caster = Abilities.GetCaster(entity)
	let hero = Entities.GetUnitName(caster)

	let paint = text => text.replace(/\(([^)]+)\)/g, (match, word) =>
	{
		if (!ability_tooltip_colors[hero])
		{
			ability_tooltip_colors[hero] = {}

			for (let i = 0; i < Entities.GetAbilityCount(caster); i++)
			{
				let ability = Entities.GetAbility(caster, i)

				if (ability === -1)
					continue

				for (let color of $.Localize("#DOTA_Tooltip_ability_" + Abilities.GetAbilityName(ability) + "_Description").matchAll(/<font color='(#[0-9a-fA-F]+)'>([^<]+?):?<\/font>/g))
					ability_tooltip_colors[hero][color[2].trim().toUpperCase()] = color[1]
			}
		}

		let color = ability_tooltip_colors[hero][word.toUpperCase()]

		return color ? "(<font color='" + color + "'>" + word + "</font>)" : match
	})

	let container = $("#AbilityExtraAttributes")
	let lines = source.text.split("\n").filter(line => line.trim() !== "")
	let rows = []

	for (let index = 0; index < lines.length; index++)
	{
		let line = lines[index]
		let wrap = line.trim().endsWith(":") && index + 1 < lines.length && lines[index + 1].indexOf(":") === -1

		if (wrap)
			line = line.trim() + " " + lines[++index].trim()

		let split = line.indexOf(": ")
		rows.push({line: line, wrap: wrap, split: split, key: split === -1 ? "" : AbilityTooltipKey(line.substring(0, split + 1))})
	}

	sums.sort((a, b) => a.key < b.key ? -1 : 1)

	for (let sum of sums)
		rows.push({line: sum.label + " ", wrap: false, split: sum.label.length - 1, key: sum.line_key})

	container.RemoveAndDeleteChildren()

	for (let data of rows.filter(data => !dynamic[data.key]).concat(rows.filter(data => dynamic[data.key])))
	{
		let row = $.CreatePanel("Panel", container, "")
		row.AddClass("AbilityStatRow")

		let text = $.CreatePanel("Label", row, "")
		text.html = true
		text.AddClass("AbilityStatText")

		if (data.split === -1)
		{
			text.text = paint(data.line.replace(/-(?=\d)/g, ""))
			continue
		}

		let label = data.line.substring(0, data.split + 1)
		let values = (overrides[data.key] || data.line.substring(data.split + 2).split(" / ")).map(value => value.replace("-", ""))

		let spans = AbilityTooltipSpans(values, AbilityTooltipActive(values.length, level, max, row_orbs[data.key]), stats[data.key] || "")
		text.text = paint(label) + (data.wrap ? "" : " " + spans)

		if (data.wrap)
		{
			row = $.CreatePanel("Panel", container, "")
			row.AddClass("AbilityStatRow")
			text = $.CreatePanel("Label", row, "")
			text.html = true
			text.AddClass("AbilityStatText")
			text.text = spans
		}

		for (let talent of sources[data.key] || [])
			AbilityTooltipTalentIcon(row, talent)
	}

	return rows.length
}

function AbilityTooltipStretch(id, attempt)
{
	let header = $("#AbilityHeader")
	let description = $("#AbilityDescription")

	if (id !== ability_tooltip_stretch || !header.IsValid())
		return

	if (header.actuallayoutwidth === 0 && attempt < 10)
	{
		$.Schedule(0, () => AbilityTooltipStretch(id, attempt + 1))
		return
	}

	let scale = header.actualuiscale_x
	let extra = Math.floor((header.actuallayoutwidth - description.actuallayoutwidth)/scale) - 10

	if (description.BHasClass("Hidden") || extra <= 0)
		return

	for (let id of ["AbilityDescription", "AbilityDescriptionAfter", "AbilityLore"])
		$("#" + id).style.width = (330 + extra) + "px"

	for (let name of ["AbilityLegendaryBlock", "AbilityLegendaryText", "AbilityCreeps", "AbilityCreepsLine"])
	{
		for (let panel of $("#AbilityCard").FindChildrenWithClassTraverse(name))
			panel.style.width = (322 + extra) + "px"
	}

}

function AbilityTooltipBlocks(prefix, ability_name, entity, level, max, bonus)
{
	let blocks = {Diff: [], Features: [], Creeps: [], Buildings: []}
	let creeps_damage = AbilityTooltipLevels(entity, "creeps_damage", max, bonus)

	if (creeps_damage.some(value => value !== "0"))
	{
		let type = creeps_damage.some(value => value.startsWith("-")) ? "nerf" : "buff"
		blocks.Creeps.push(AbilityTooltipValues($.Localize("#tooltip_ability_creeps_damage_" + type), entity, level, max, bonus))
	}

	for (let group in blocks)
	{
		let block = blocks[group]

		for (let i = 1; ; i++)
		{
			let key = "#DOTA_Tooltip_ability_" + ability_name + "_" + group.toLowerCase() + i
			let text = $.Localize(key)

			if (text === key)
				break

			block.push(AbilityTooltipValues(text, entity, level, max, bonus))
		}

		let panel = $("#" + prefix + group)
		panel.SetHasClass("Hidden", block.length === 0)

		if (block.length > 0 && ability_tooltip_block_icons[group])
		{
			let icon = panel.FindChildrenWithClassTraverse("AbilityCreepsIcon")[0]
			icon.style.backgroundImage = "url('file://{images}/custom_game/icons/mini/info_table/" + ability_tooltip_block_icons[group] + ".png')"
			icon.style.backgroundSize = "contain"
		}

		let lines = $("#" + prefix + group + "Text")
		lines.RemoveAndDeleteChildren()

		for (let line of block)
		{
			let label = $.CreatePanel("Label", lines, "")
			label.html = true
			label.AddClass("AbilityCreepsLine")
			label.text = line
		}
	}

}

function AbilityTooltipBody(details, details_v2, entity, ability_name, level, max)
{
	AbilityTooltipCost(details, "AbilityCooldown", level, max, false, Abilities.GetCooldown(entity))
	AbilityTooltipCost(details, "AbilityManaCost", level, max, true, Abilities.GetManaCost(entity))
	AbilityTooltipCost(details, "AbilityHealthCost", level, max)
	AbilityTooltipCost(details, "AbilityCastRange", level, max)

	let immediate = (Abilities.GetBehavior(entity) & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IMMEDIATE) !== 0
	let cast_point = immediate ? 0 : Abilities.GetCastPoint(entity)
	$("#AbilityCastPoint").SetHasClass("Hidden", Abilities.IsPassive(entity) || level === 0)
	$("#AbilityCastPoint").text = AbilityTooltipSpans([AbilityTooltipNumber(cast_point)], 0, "")

	let bonus = AbilityTooltipBonus(entity, ability_name)
	let damage = ability_tooltip_damage[bonus.damage || Abilities.GetAbilityDamageType(entity)]
	let damage_label = $("#AbilityDamageType")
	let split = damage_label.text.indexOf(": ")

	if (damage && !damage_label.BHasClass("Hidden") && split !== -1)
	{
		let word = bonus.damage ? $.Localize("#DOTA_ToolTip_Damage_" + damage.replace("DamageType", "")).replace(/<[^>]*>/g, "") : damage_label.text.substring(split + 2)
		damage_label.text = damage_label.text.substring(0, split + 2) + "<span class='GameplayValues " + damage + "'>" + word + "</span>"
	}

	for (let id of ability_tooltip_costs)
	{
		let label = $("#" + id)

		if (label.BHasClass("Hidden") && bonus.replace[id] === 0 && level > 0)
		{
			label.text = AbilityTooltipSpans(["0"], 0, "")
			label.SetHasClass("Hidden", false)
		}

		let box = $("#" + id + "Talents")
		let talents = label.BHasClass("Hidden") ? [] : bonus.talents[id] || []
		box.RemoveAndDeleteChildren()
		box.SetHasClass("Hidden", talents.length === 0)

		for (let talent of talents)
			AbilityTooltipTalentIcon(box, talent).AddClass("AbilityCostTalent")
	}

	$("#AbilityCastPointIcon").SetHasClass("Hidden", $("#AbilityCastPoint").BHasClass("Hidden"))
	$("#AbilityCostsSeparator").SetHasClass("Hidden", ability_tooltip_costs.every(id => $("#" + id).BHasClass("Hidden")))

	let description = AbilityTooltipDescription(entity, ability_name, level, max, bonus).split(/(?:\s*<br>)*\s*\*legendary\*\s*(?:<br>\s*)*/)
	let after = description.slice(1).join("")

	$("#AbilityDescription").SetHasClass("Hidden", description[0] === "")
	$("#AbilityDescription").text = description[0]
	$("#AbilityDescriptionAfter").SetHasClass("Hidden", after === "")
	$("#AbilityDescriptionAfter").text = after

	AbilityTooltipLegendary($("#AbilityLegendary"), "#DOTA_Tooltip_ability_" + ability_name + "_legendary_", entity, level, max, bonus)
	AbilityTooltipBlocks("Ability", ability_name, entity, level, max, bonus)

	let extra = AbilityTooltipExtra(details, details_v2, entity, ability_name, level, max, bonus)
	$("#AbilityExtraAttributes").SetHasClass("Hidden", extra === 0)
	$("#AbilityCostsSeparator").SetHasClass("AfterText", extra === 0)

	return bonus
}

function AbilityTooltipLoaded()
{
	let reveal = ++ability_tooltip_reveal
	$.GetContextPanel().AddClass("TooltipPending")
	$.Schedule(0.06, () =>
	{
		if (reveal === ability_tooltip_reveal && $.GetContextPanel().IsValid())
			$.GetContextPanel().RemoveClass("TooltipPending")
	})

	let mode = $.GetContextPanel().GetAttributeString("mode", "")
	$.GetContextPanel().SetHasClass("AghsMode", mode === "aghs")
	$.GetContextPanel().SetHasClass("InnateMode", mode === "innate")
	$.GetContextPanel().SetHasClass("StatsMode", mode === "stats")
	$.GetContextPanel().SetHasClass("ItemMode", mode === "item")

	if (mode === "aghs")
	{
		AghsTooltipLoaded()
		return
	}

	if (mode === "innate")
	{
		InnateTooltipLoaded()
		return
	}

	if (mode === "stats")
	{
		StatsTooltipLoaded()
		return
	}

	if (mode === "item")
	{
		ItemTooltipLoaded()
		return
	}

	let entity = Number($.GetContextPanel().GetAttributeString("entity", "-1"))
	let ability_name = $.GetContextPanel().GetAttributeString("ability", "")
	let native = AbilityTooltipNative("DOTAAbilityTooltip")

	if (entity === -1 || !native)
		return

	for (let id of ["AbilityDescription", "AbilityDescriptionAfter", "AbilityLore", "AbilityDiff", "AbilityFeatures", "AbilityCreeps", "AbilityBuildings"])
		$("#" + id).style.width = null

	let stretch = ++ability_tooltip_stretch
	$.Schedule(0, () => AbilityTooltipStretch(stretch, 0))

	let details = native.FindChildTraverse("AbilityDetails")
	let details_v2 = native.FindChildTraverse("AbilityDetailsV2")
	let level = Abilities.GetLevel(entity)
	let max = Abilities.GetMaxLevel(entity)

	AbilityTooltipCopy(details, "AbilityName", true)
	AbilityTooltipCopy(details, "AbilitySpellImmunityType", true)
	AbilityTooltipCopy(details, "AbilityDispelType", true)
	AbilityTooltipCopy(details, "AbilityBreakable", details.BHasClass("is_breakable"))
	$("#AbilityLoreBox").SetHasClass("Hidden", !AbilityTooltipCopy(details, "AbilityLore", !details.BHasClass("HideLore")))

	AbilityTooltipCopy(details, "AbilityDamageType", true)

	let target = ["AbilityDamageType", "AbilitySpellImmunityType", "AbilityDispelType", "AbilityBreakable"].some(id => !$("#" + id).BHasClass("Hidden"))
	$("#AbilityTarget").SetHasClass("Hidden", !target)
	$("#AbilityDescription").SetHasClass("AfterHeader", !target)

	let cooldown = details.FindChildTraverse("AbilityCooldown")
	let cooldowns = cooldown && !cooldown.BHasClass("Hidden") ? cooldown.text.split(" / ") : []
	let current_cooldown = cooldowns[Math.min(Math.max(level, 1), cooldowns.length) - 1]

	$("#CurrentAbilityCooldown").SetHasClass("Hidden", !current_cooldown || current_cooldown === "0")
	$("#CurrentAbilityCooldown").text = current_cooldown || ""

	let charges = Abilities.UsesAbilityCharges(entity) ? Abilities.GetMaxAbilityCharges(entity) : 0
	let charges_form = charges % 10 === 1 && charges % 100 !== 11 ? 1 : charges % 10 >= 2 && charges % 10 <= 4 && (charges % 100 < 10 || charges % 100 >= 20) ? 2 : 5

	$("#CurrentAbilityCharges").SetHasClass("Hidden", charges <= 1)
	$("#CurrentAbilityCharges").text = charges + " " + $.Localize("#tooltip_ability_charges_" + charges_form)
	AbilityTooltipBody(details, details_v2, entity, ability_name, level, max)
}

if (!$.GetContextPanel().BHasClass("AbilityTooltip") && !$.DbgIsReloadingScript())
{
	$.RegisterEventHandler("DOTAShowAbilityTooltip", ability_tooltip_hud, (panel, ability_name) => AbilityTooltipShow(panel, ability_name, -1))
	$.RegisterEventHandler("DOTAShowAbilityTooltipForEntityIndex", ability_tooltip_hud, (panel, ability_name, unit) => AbilityTooltipShow(panel, ability_name, unit))
	$.RegisterEventHandler("DOTAHideAbilityTooltip", ability_tooltip_hud, panel => AbilityTooltipLeave(panel))
	$.RegisterEventHandler("DOTAShowAbilityInventoryItemTooltip", ability_tooltip_hud, (panel, unit, slot) => ItemTooltipShow(panel, unit, slot))
}

function StatusTooltipShow(panel, mode)
{
	let status = ability_tooltip_status[mode]
	let native = AbilityTooltipNative(status.native)

	if (native)
		native.style.opacity = "0"

	$.DispatchEvent(status.show, panel)

	if (mode === "stats" && ability_tooltip_attack_range === null)
	{
		let unit = Players.GetLocalPlayerPortraitUnit()

		ability_tooltip_attack_range = Particles.CreateParticle("particles/ui_mouseactions/range_display.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, unit)
		Particles.SetParticleControl(ability_tooltip_attack_range, 1, [Entities.GetAttackRange(unit), 0, 0])
	}

	if (ability_tooltip_status_schedule[mode])
		$.CancelScheduled(ability_tooltip_status_schedule[mode])

	ability_tooltip_status_schedule[mode] = $.Schedule(0, () =>
	{
		ability_tooltip_status_schedule[mode] = null

		let tooltip = AbilityTooltipNative(status.native)

		if (tooltip)
			tooltip.style.opacity = "0"

		$.DispatchEvent("UIShowCustomLayoutParametersTooltip", panel, mode + "_tooltip", "file://{resources}/layout/custom_game/ability_tooltip/ability_tooltip.xml", "mode=" + mode + "&unit=" + Players.GetLocalPlayerPortraitUnit())
	})
}

function StatusTooltipHide(panel, mode)
{
	let status = ability_tooltip_status[mode]

	if (ability_tooltip_status_schedule[mode])
	{
		$.CancelScheduled(ability_tooltip_status_schedule[mode])
		ability_tooltip_status_schedule[mode] = null
	}

	$.DispatchEvent("UIHideCustomLayoutTooltip", panel, mode + "_tooltip")
	$.DispatchEvent(status.hide, panel)

	if (ability_tooltip_attack_range !== null)
	{
		Particles.DestroyParticleEffect(ability_tooltip_attack_range, true)
		Particles.ReleaseParticleIndex(ability_tooltip_attack_range)
		ability_tooltip_attack_range = null
	}

	let native = AbilityTooltipNative(status.native)

	if (native)
		native.style.opacity = null
}

function StatusTooltipPanels(panel, id, result)
{
	if (panel.id === id)
		result.push(panel)

	for (let child of panel.Children())
		StatusTooltipPanels(child, id, result)

	return result
}

function StatusTooltipHook(mode, root, id, attempt)
{
	let parent = ability_tooltip_hud.FindChildTraverse(root)
	let panels = parent ? StatusTooltipPanels(parent, id, []) : []

	if (panels.length === 0)
	{
		if (attempt < 30)
			$.Schedule(1, () => StatusTooltipHook(mode, root, id, attempt + 1))

		return
	}

	for (let panel of panels)
	{
		panel.SetPanelEvent("onmouseover", () => StatusTooltipShow(panel, mode))
		panel.SetPanelEvent("onmouseout", () => StatusTooltipHide(panel, mode))
	}

}

function AghsTooltipText(card, text, prefix, entity, level, max, bonus)
{
	let parts = text.split(/(?:\s*<br>)*\s*\*legendary\*\s*(?:<br>\s*)*/)

	for (let index = 0; index < parts.length; index++)
	{
		if (index > 0)
		{
			let legendary = $.CreatePanel("Panel", card, "")
			legendary.AddClass("AghsLegendary")
			AbilityTooltipLegendary(legendary, prefix, entity, level, max, bonus)
		}

		if (parts[index] === "")
			continue

		let label = $.CreatePanel("Label", card, "")
		label.html = true
		label.AddClass("AghsCardText")
		label.text = parts[index]
	}

	if (parts.length > 1)
		return

	let legendary = $.CreatePanel("Panel", card, "")
	legendary.AddClass("AghsLegendary")
	AbilityTooltipLegendary(legendary, prefix, entity, level, max, bonus)
}

function AghsTooltipCard(cards, unit, kind, ability_name, granted, source)
{
	let entity = ability_name !== "" ? Entities.GetAbilityByName(unit, ability_name) : -1

	let card = $.CreatePanel("Panel", cards, "")
	card.AddClass("AghsCard")
	card.SetHasClass("AghsGranted", granted)

	let header = $.CreatePanel("Panel", card, "")
	header.AddClass("AghsCardHeader")

	if (ability_name !== "")
	{
		let icon = $.CreatePanel("DOTAAbilityImage", header, "")
		icon.AddClass("AghsCardIcon")
		icon.abilityname = ability_name

		if (entity !== -1)
			icon.contextEntityIndex = entity
	}

	let titles = $.CreatePanel("Panel", header, "")
	titles.AddClass("AghsCardTitles")

	let line = $.CreatePanel("Panel", card, "")
	line.AddClass("AghsCardSeparator")

	let info = $.CreatePanel("Panel", card, "")
	info.AddClass("AghsCardInfo")

	if (ability_name !== "")
	{
		let name = $.CreatePanel("Label", titles, "")
		name.AddClass("AghsCardName")
		name.text = $.Localize("#DOTA_Tooltip_ability_" + ability_name)
	}

	let tag = $.CreatePanel("Label", titles, "")
	tag.AddClass("AghsCardTag")
	tag.text = $.Localize(granted ? "#DOTA_AbilityTooltip_Aghs_New_Ability" : "#DOTA_AbilityTooltip_Upgrade")

	if (entity === -1)
	{
		let native = source ? source.FindChildrenWithClassTraverse("AbilityDescription")[0] : null
		let label = $.CreatePanel("Label", info, "")
		label.html = true
		label.AddClass("AghsCardText")
		label.AddClass("AghsCardLast")
		label.text = native ? native.text : ""
		return
	}

	let level = Abilities.GetLevel(entity)
	let max = Abilities.GetMaxLevel(entity)
	let bonus = AbilityTooltipBonus(entity, ability_name)
	let suffixes = granted ? ["_Description"] : kind === "Scepter" ? ["_scepter_description", "_aghanim_description"] : ["_shard_description"]
	let text = ""

	for (let suffix of suffixes)
	{
		let key = "#DOTA_Tooltip_ability_" + ability_name + suffix
		let value = $.Localize(key)

		if (value !== key)
		{
			text = value
			break
		}
	}

	let prefix = "#DOTA_Tooltip_ability_" + ability_name + (granted ? "_legendary_" : kind === "Scepter" ? "_scepter_legendary_" : "_shard_legendary_")
	AghsTooltipText(info, AbilityTooltipValues(text, entity, level, max, bonus), prefix, entity, level, max, bonus)

	let keys = source ? source.FindChildrenWithClassTraverse("AbilitySpecialKeys")[0] : null
	let lines = keys ? keys.text.split("\n").filter(line => line.trim() !== "") : []

	if (lines.length > 0)
	{
		let container = $.CreatePanel("Panel", info, "")
		container.AddClass("AghsCardKeys")

		for (let line of lines)
		{
			let row = $.CreatePanel("Label", container, "")
			row.html = true
			row.AddClass("AbilityStatText")

			let split = line.indexOf(": ")

			if (split === -1)
			{
				row.text = line
				continue
			}

			let values = line.substring(split + 2).split(" / ").map(value => value.replace("-", ""))
			row.text = line.substring(0, split + 1) + " " + AbilityTooltipSpans(values, AbilityTooltipActive(values.length, level, max), "")
		}
	}

	let separator = $.CreatePanel("Panel", info, "")
	separator.AddClass("AghsCardCostsSeparator")
	separator.SetHasClass("AfterText", lines.length === 0)

	let costs = $.CreatePanel("Panel", info, "")
	costs.AddClass("AghsCardCosts")

	for (let id of ["AbilityCooldown", "AbilityManaCost"])
	{
		let native = source ? source.FindChildTraverse(id) : null

		if (!native || !native.visible || native.BHasClass("Hidden") || native.text === "" || native.text === "0")
			continue

		let values = native.text.split(" / ")
		let label = $.CreatePanel("Label", costs, "")
		label.html = true
		label.AddClass(id === "AbilityCooldown" ? "Cooldown" : "ManaCost")
		label.text = AbilityTooltipSpans(values, AbilityTooltipActive(values.length, level, max), "")
	}

	costs.SetHasClass("Hidden", costs.GetChildCount() === 0)
	separator.SetHasClass("Hidden", costs.GetChildCount() === 0)

	let visible = info.Children().filter(child => !child.BHasClass("Hidden"))

	if (visible.length > 0)
		visible[visible.length - 1].AddClass("AghsCardLast")
}

function AghsTooltipLoaded()
{
	let unit = Number($.GetContextPanel().GetAttributeString("unit", "-1"))
	let native = AbilityTooltipNative(ability_tooltip_status.aghs.native)

	if (unit === -1 || !native)
		return

	let upgrades = CustomNetTables.GetTableValue("custom_pick", "aghs_" + Entities.GetUnitName(unit)) || {}

	for (let kind of ["Scepter", "Shard"])
	{
		let cards = $("#Aghs" + kind + "Cards")
		let listed = {}
		let innate = {}
		let entries = []
		cards.RemoveAndDeleteChildren()
		$("#Aghs" + kind + "Section").SetHasClass("AghsOwned", kind === "Scepter" ? Entities.HasScepter(unit) : Game.HasModifier(unit, "modifier_item_aghanims_shard"))

		for (let index = 1; index <= 3; index++)
		{
			let source = native.FindChildTraverse("Aghs" + kind + "Container" + index)

			if (!source || source.BHasClass("Hidden"))
				continue

			let image = source.FindChildTraverse("ScepterAbilityImage")
			let ability_name = image ? image.abilityname : ""

			if (Entities.GetAbilityByName(unit, ability_name) === -1)
				continue

			listed[ability_name] = true
			entries.push({name: ability_name, granted: source.FindChildrenWithClassTraverse("GrantedAbility").length > 0, source: source})
		}

		for (let index in upgrades)
		{
			let upgrade = upgrades[index]
			let type = upgrade[kind.toLowerCase()]
			innate[upgrade.name] = upgrade.innate === 1

			if (type > 0 && !listed[upgrade.name] && Entities.GetAbilityByName(unit, upgrade.name) !== -1)
				entries.push({name: upgrade.name, granted: type === 2, source: null})
		}

		entries.sort((a, b) => (innate[b.name] ? 1 : 0) - (innate[a.name] ? 1 : 0))

		for (let entry of entries)
			AghsTooltipCard(cards, unit, kind, entry.name, entry.granted, entry.source)

		if (cards.GetChildCount() > 0)
			continue

		let empty = $.CreatePanel("Label", cards, "")
		empty.AddClass("AghsEmpty")
		empty.text = $.Localize("#DOTA_AbilityTooltip_No_Aghs_Upgrade_Found")
	}

}

function InnateTooltipLegendary(unit)
{
	let legendary = Game.GetLocalLegendary()
	let talent = legendary[1]
	let hero = Entities.GetUnitName(unit)
	let talents = Game.talents_values[hero]
	let data = talent && talents ? talents[talent] : null

	$("#InnateLegendary").SetHasClass("InnateNoLegendary", !data)
	$("#InnateConnector").SetHasClass("InnateNoLegendary", !data)

	if (!data)
		return

	let spells = Game.spells_by_number[hero]
	let spell = spells ? spells[data.skill_number] : null
	let image = $("#InnateLegendaryImage")

	if (spell)
	{
		let ability = Entities.GetAbilityByName(Players.GetPlayerHeroEntityIndex(Entities.GetPlayerOwnerID(unit)), spell.name)

		if (ability !== -1)
			image.contextEntityIndex = ability

		image.abilityname = spell.name
	}

	$("#InnateLegendaryName").text = $.Localize("#DOTA_Tooltip_ability_" + legendary[2])
	$("#InnateLegendaryText").text = Game.ShowTalentValues("#upgrade_disc_" + talent, talent, 0, false, true, true)
}

function InnateTooltipLoaded()
{
	let unit = Number($.GetContextPanel().GetAttributeString("unit", "-1"))
	let native = AbilityTooltipNative(ability_tooltip_status.innate.native)

	if (unit === -1 || !native)
		return

	InnateTooltipLegendary(unit)

	let image = native.FindChildTraverse("InnateImage")
	let ability_name = image ? image.abilityname : ""
	let entity = ability_name !== "" ? Entities.GetAbilityByName(unit, ability_name) : -1

	if (entity === -1 && image && typeof image.contextEntityIndex === "number")
		entity = image.contextEntityIndex

	let empty = native.BHasClass("NoInnate") || ability_name === "" || typeof entity !== "number" || entity === -1
	$("#AbilityCard").SetHasClass("InnateEmpty", empty)

	if (empty)
		return

	let linked = !native.BHasClass("TrueInnateAbility")
	let icon = $("#InnateAbilityImage")
	icon.abilityname = ability_name
	icon.contextEntityIndex = entity

	$("#InnateLinkedImage").SetHasClass("Hidden", !linked)
	$("#InnateDefaultImage").SetHasClass("Hidden", linked)
	$("#InnateName").text = $.Localize("#DOTA_Tooltip_ability_" + ability_name)

	let details = native.FindChildTraverse("InnateAbilityDetails")
	let level = Abilities.GetLevel(entity)
	let max = Abilities.GetMaxLevel(entity)
	let bonus = AbilityTooltipBody(details, details, entity, ability_name, level, max)

	let dependency = details.FindChildTraverse("AbilityDependency")
	let dependency_text = dependency && !dependency.BHasClass("Hidden") ? dependency.text : ""
	let dependency_name = dependency_text.substring(dependency_text.indexOf(":") + 1).replace(/<[^>]*>/g, "").trim()
	$("#InnateDependency").text = dependency_text
	$("#InnateDependency").SetHasClass("Hidden", dependency_text.indexOf(":") === -1 || dependency_name === "" || dependency_name.includes("{"))

	let native_cooldown = details.FindChildTraverse("AbilityCooldown")
	let cooldowns = native_cooldown && !native_cooldown.BHasClass("Hidden") && native_cooldown.text !== "" ? native_cooldown.text.split(" / ") : []

	for (let key of ["cooldown", "cd"])
	{
		let label_key = "#DOTA_Tooltip_ability_" + ability_name + "_" + key
		let label = $.Localize(label_key)

		if (cooldowns.length > 0 || label === label_key)
			continue

		cooldowns = AbilityTooltipLevels(entity, key, max, bonus)

		let attributes = $("#AbilityExtraAttributes")
		let line_key = AbilityTooltipKey(label) + ":"

		for (let row of attributes.Children())
		{
			let text = row.GetChild(0)

			if (text && text.text.startsWith(line_key))
				row.AddClass("Hidden")
		}

		attributes.SetHasClass("Hidden", attributes.Children().every(row => row.BHasClass("Hidden")))
		$("#AbilityCostsSeparator").SetHasClass("AfterText", attributes.BHasClass("Hidden"))

		let cooldown = $("#AbilityCooldown")
		cooldown.text = AbilityTooltipSpans(cooldowns, AbilityTooltipActive(cooldowns.length, level, max), "")
		cooldown.SetHasClass("Hidden", false)
		$("#AbilityCostsSeparator").SetHasClass("Hidden", false)
	}

}

function StatsTooltipSigned(value, suffix = "")
{
	return (value > 0 ? "+" : "") + value + suffix
}

function StatsTooltipBonus(label, value, suffix = "")
{
	label.text = StatsTooltipSigned(value, suffix)
	label.SetHasClass("Hidden", value === 0)
	label.SetHasClass("StatsNegative", value < 0)
}

function StatsTooltipValue(id, base, bonus, suffix = "")
{
	$("#Stats" + id).text = base + suffix
	StatsTooltipBonus($("#Stats" + id + "Bonus"), bonus, suffix)
}

function StatsTooltipNoBonus(panel, root)
{
	for (; panel && panel !== root; panel = panel.GetParent())
		if (panel.BHasClass("NoBonus"))
			return true

	return root.BHasClass("NoBonus")
}

function StatsTooltipServer(data)
{
	let tooltip = Game.stats_tooltip

	if (!tooltip || tooltip.request !== data.request || !tooltip.panel.IsValid())
		return

	Game.stats_tooltip_cache = {unit: tooltip.unit, time: Date.now(), data: data}
	tooltip.fill(data)
}

function StatsTooltipCrit(damage)
{
	return "x" + Number((damage/100).toFixed(2))
}

function StatsTooltipData(data)
{
	let mana_cost = Number(data.mana_cost.toFixed(1))
	let heal = Number(data.heal.toFixed(1))
	let crits = Object.values(data.crits || {})
	let miss = 1
	let bonus = 0

	for (let crit of crits)
	{
		bonus += miss*crit.chance*(crit.damage - 100)/100
		miss *= 1 - crit.chance/100
	}

	$("#StatsCooldown").text = Number(data.cooldown.toFixed(1)) + "%"
	StatsTooltipValue("Mana", Math.round(data.mana), Math.round(data.mana_bonus))
	StatsTooltipValue("Health", Math.round(data.health), Math.round(data.health_bonus))
	for (let id in data.percent)
		StatsTooltipBonus($("#Stats" + id + "Percent"), Number(data.percent[id].toFixed(1)), "%")

	if (data.primary_damage > 0)
		$("#Stats" + data.primary + "Damage").text = "(+" + Math.round(data.primary_damage) + " " + $.Localize("#tooltip_stats_damage_bonus") + ")"

	StatsTooltipValue("AttackSpeed", Math.round(data.attack_speed), Math.round(data.attack_speed_bonus))
	$("#StatsManaCost").text = StatsTooltipSigned(mana_cost, "%")
	$("#StatsCastRange").text = StatsTooltipSigned(Math.round(data.cast_range))
	$("#StatsItemDamage").text = Math.round(data.item_damage) + "%"
	$("#StatsAttackLifesteal").text = Math.round(data.attack_lifesteal) + "%"
	$("#StatsSpellLifesteal").text = Math.round(data.spell_lifesteal) + "%"
	$("#StatsAccuracy").text = Math.round(data.accuracy) + "%"
	$("#StatsHeal").text = StatsTooltipSigned(heal, "%")
	$("#StatsHeal").SetHasClass("StatsNegative", heal < 0)
	$("#StatsCritChance").text = crits.length > 0 ? Number((100 - miss*100).toFixed(1)) + "%" : ""
	$("#StatsCritDamage").text = crits.length === 1 ? StatsTooltipCrit(crits[0].damage) : crits.length > 1 ? "~" : ""
	$("#StatsCritBonus").text = crits.length > 0 ? "+" + Math.round(bonus) + "% " + $.Localize("#tooltip_stats_damage_bonus") : "0%"
	$("#StatsCritBonus").SetHasClass("StatsCritEmpty", crits.length === 0)

	if (crits.length < 2)
		return

	for (let crit of crits)
	{
		let line = $.CreatePanel("Panel", $("#StatsCritList"), "")
		let chance = $.CreatePanel("Label", line, "")
		let damage = $.CreatePanel("Label", line, "")

		line.AddClass("StatsCritLine")
		chance.AddClass("StatsCritChance")
		chance.text = Number(crit.chance.toFixed(1)) + "%"
		damage.AddClass("StatsCritDamage")
		damage.text = StatsTooltipCrit(crit.damage)
		$.CreatePanel("Label", line, "").AddClass("StatsCritBonus")
	}

}

function StatsTooltipLoaded()
{
	let unit = Number($.GetContextPanel().GetAttributeString("unit", "-1"))
	let native = AbilityTooltipNative(ability_tooltip_status.stats.native)

	if (unit === -1 || !native)
		return

	let previous = Game.stats_tooltip
	let cache = Game.stats_tooltip_cache
	let time = Date.now()
	let pending = previous && previous.unit === unit && time - previous.time < 500
	let tooltip = pending ? previous : {unit: unit, request: (previous ? previous.request : 0) + 1, time: time, fill: StatsTooltipData}

	tooltip.panel = $.GetContextPanel()
	Game.stats_tooltip = tooltip
	$("#StatsCritList").RemoveAndDeleteChildren()

	if (cache && cache.unit === unit && time - cache.time < 500)
		StatsTooltipData(cache.data)
	else
	{
		for (let label of $.GetContextPanel().FindChildrenWithClassTraverse("StatsServer"))
			label.text = ""

		if (!pending)
			$.Schedule(Math.max(0, (Game.stats_tooltip_sent || 0) + 500 - time)/1000, () =>
			{
				if (Game.stats_tooltip !== tooltip)
					return

				Game.stats_tooltip_sent = Date.now()
				GameEvents.SendCustomGameEventToServer_custom("stats_tooltip_request", {unit: unit, request: tooltip.request})
			})
	}

	let speed = Entities.GetBaseMoveSpeed(unit)
	let magic = Math.round(Entities.GetBaseMagicalResistanceValue(unit))

	$("#StatsDamage").text = String(Math.round((Entities.GetDamageMin(unit) + Entities.GetDamageMax(unit))/2 + Entities.GetDamageBonus(unit)))
	$("#StatsAttackTime").text = native.FindChildTraverse("AttacksPerSecond").text
	$("#StatsBat").text = String(Number(Entities.GetBaseAttackTime(unit).toFixed(2)))
	$("#StatsAttackRange").text = String(Math.round(Entities.GetAttackRange(unit)))
	$("#StatsSpellAmp").text = Math.round(parseFloat(native.FindChildTraverse("SpellAmp").text)) + "%"
	$("#StatsSpellAmp").SetHasClass("StatsNegative", parseFloat($("#StatsSpellAmp").text) < 0)
	$("#StatsStatusResist").text = Math.round(parseFloat(native.FindChildTraverse("StatusResist").text)) + "%"
	$("#StatsSlowResist").text = Math.round(parseFloat(native.FindChildTraverse("SlowResist").text)) + "%"
	$("#StatsEvasion").text = native.FindChildTraverse("Evasion").text
	$("#StatsArmor").text = Number(Entities.GetPhysicalArmorValue(unit).toFixed(1)) + " (" + native.FindChildTraverse("PhysicalResist").text + ")"
	StatsTooltipValue("MoveSpeed", Math.round(speed), Math.round(Entities.GetMoveSpeedModifier(unit, speed) - speed))
	StatsTooltipValue("MagicResist", magic, Math.round(Entities.GetMagicalArmorValue(unit)*100) - magic, "%")

	let hero = Entities.IsHero(unit)
	$("#StatsAttributes").SetHasClass("Hidden", !hero)

	if (!hero)
		return

	let gain_total = 0

	for (let attribute of ["Agility", "Intelligence", "Strength", "All"])
	{
		let container = native.FindChildTraverse(attribute + "Container")
		let primary = container.BHasClass("PrimaryAttribute")
		let column = $("#StatsColumn" + attribute)
		let gain = attribute === "All" ? gain_total : Number((container.FindChildrenWithClassTraverse("AttributeGain")[0].text.match(/\d+(\.\d+)?/) || [0])[0])
		let bonus = container.FindChildrenWithClassTraverse("BonusAttributeValue")[0]

		gain_total += gain
		column.SetHasClass("StatsPrimary", primary)
		column.SetHasClass("Hidden", attribute === "All" && !primary)
		$("#Stats" + attribute + "Gain").text = "+" + Number(gain.toFixed(1))
		StatsTooltipValue(attribute, container.FindChildrenWithClassTraverse("BaseAttributeValue")[0].text, StatsTooltipNoBonus(bonus, native) ? 0 : Math.round(Number(bonus.text.replace(/\s/g, "")) || 0))
	}

	$("#StatsAttributes").SetHasClass("StatsFour", !$("#StatsColumnAll").BHasClass("Hidden"))
}

function ItemTooltipSell(text, plain, end, entity, id)
{
	if (id !== item_tooltip_sell || Game.item_tooltip !== entity || !$.GetContextPanel().IsValid())
		return

	let left = Math.ceil(end - Game.GetGameTime())
	let label = $("#ItemSellPriceTime")

	if (left <= 0)
	{
		label.SetHasClass("Hidden", true)
		$("#ItemSellPrice").text = plain
		$("#ItemSellPrice").SetHasClass("Hidden", false)
		return
	}

	label.text = text.replace(/\d+:\d{2}/, Math.floor(left/60) + ":" + String(left % 60).padStart(2, "0"))
	$.Schedule(0.3, () => ItemTooltipSell(text, plain, end, entity, id))
}

function ItemTooltipAttributes(source, name, level, max, keys)
{
	let labels = {}

	for (let key of keys)
	{
		let match = $.Localize("#DOTA_Tooltip_ability_" + name + "_" + key).match(/^%?[+-](.*)$/)

		if (!match)
			continue

		let raw = match[1].trim()
		let text = raw.replace(/^!/, "").replace(/^\$(\w+)/, (all, variable) => $.Localize("#dota_ability_variable_" + (variable === "selected_attribute" ? "selected_attrib" : variable)))

		if (raw.startsWith("!"))
			text = "<font color='#53ea48'>" + text + "</font>"

		labels[text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()] = text
		labels[raw] = text
	}

	let lines = (source && !source.BHasClass("Hidden") ? source.text : "").split("\n").filter(line => line.trim() !== "").map(line =>
	{
		let match = line.trim().match(/^([+-])\s*([\d.,]+%?(?:\s*\/\s*[\d.,]+%?)*)\s*(.*)$/)

		if (!match)
			return line

		let values = match[2].split("/").map(value => value.trim())
		let text = match[3].replace(/\s+/g, " ").trim()

		return match[1] + " " + AbilityTooltipSpans(values, AbilityTooltipActive(values.length, level, max), "") + " " + (labels[text] || text)
	})

	let label = $("#ItemAttributes")
	label.text = lines.join("<br>")
	label.SetHasClass("Hidden", lines.length === 0)
}

function ItemTooltipKeys(data)
{
	let tooltip = Game.item_tooltip_fill

	Game.item_tooltip_data[data.item] = {keys: data.keys || {}, damage: data.damage || 0}

	if (!tooltip || tooltip.item !== data.item || !tooltip.panel.IsValid())
		return

	tooltip.fill()
	tooltip.panel.RemoveClass("TooltipPending")
}

function ItemTooltipLoaded()
{
	let entity = Number($.GetContextPanel().GetAttributeString("entity", "-1"))
	let name = entity !== -1 ? Abilities.GetAbilityName(entity) : $.GetContextPanel().GetAttributeString("item", "")
	let native = AbilityTooltipNative("DOTAAbilityTooltip")

	if (name === "" || !native)
		return

	Game.item_tooltip_data = Game.item_tooltip_data || {}

	let data = Game.item_tooltip_data[name]
	let details = native.FindChildTraverse("AbilityDetails")
	let attributes = details.FindChildTraverse("AbilityAttributes")
	let item = $("#ItemDetails")
	let image = $("#ItemImage")
	let level = entity !== -1 ? Abilities.GetLevel(entity) : 0
	let bonus = entity !== -1 ? AbilityTooltipBonus(entity, name) : {value: {}, percent: {}, all: {}, replace: {}, changed: {}, talents: {}, levels: {}, keys: {}, orbs: {}}

	if (entity === -1)
	{
		let server = data ? data.keys : {}
		let tokens = [...$.Localize("#DOTA_Tooltip_ability_" + name + "_Description").matchAll(/%([A-Za-z0-9_]+)%/g)].map(match => match[1])

		for (let key of Object.keys(server).concat(tokens))
		{
			let levels = String(server[key] || server[key.toLowerCase()] || "0").trim().split(/\s+/).map(value => AbilityTooltipNumber(Number(value)))
			bonus.levels[key] = levels.every(value => value === levels[0]) ? [levels[0]] : levels
		}
	}

	let max = entity !== -1 ? Math.max(Abilities.GetMaxLevel(entity), 1) : Math.max(1, ...Object.values(bonus.levels).map(levels => levels.length))

	image.itemname = name
	image.contextEntityIndex = entity
	item.SetHasClass("Consumable", details.BHasClass("Consumable"))
	item.SetHasClass("HideLore", details.BHasClass("HideLore"))

	AbilityTooltipCopy(details, "AbilityName", true, "ItemName")
	AbilityTooltipCopy(details, "AbilityLevel", true, "ItemLevel")
	AbilityTooltipCopy(details, "BuyCostLabel", details.BHasClass("ShowItemCost"), "ItemBuyCost")
	AbilityTooltipCopy(details, "BuyCostDeficit", details.BHasClass("NotEnoughGold"), "ItemBuyCostDeficit")
	AbilityTooltipCopy(details, "RestockTime", details.BHasClass("OutOfStock"), "ItemRestockTime")
	AbilityTooltipCopy(details, "StockAmount", details.BHasClass("ShowStockAmount"), "ItemStockAmount")
	AbilityTooltipCopy(details, "CostToComplete", details.BHasClass("ShowCostToComplete"), "ItemCostToComplete")
	$("#ItemCost").SetHasClass("Hidden", $("#ItemBuyCost").BHasClass("Hidden"))
	$("#ItemSubHeader").SetHasClass("Hidden", $("#ItemSubHeader").Children().every(child => child.BHasClass("Hidden")))

	for (let id of item_tooltip_target)
		AbilityTooltipCopy(details, "Ability" + id, id !== "Breakable" || details.BHasClass("is_breakable"), "Item" + id)

	$("#ItemTarget").SetHasClass("Hidden", item_tooltip_target.every(id => $("#Item" + id).BHasClass("Hidden")))

	let damage = ability_tooltip_damage[entity !== -1 ? Abilities.GetAbilityDamageType(entity) : data ? data.damage : 0]
	let damage_label = $("#ItemDamageType")
	let split = damage_label.text.indexOf(": ")

	if (damage && !damage_label.BHasClass("Hidden") && split !== -1)
		damage_label.text = damage_label.text.substring(0, split + 2) + "<span class='GameplayValues " + damage + "'>" + damage_label.text.substring(split + 2) + "</span>"

	Game.item_tooltip_fill = {item: name, panel: $.GetContextPanel(), fill: ItemTooltipLoaded}
	ItemTooltipAttributes(attributes, name, level, max, data ? Object.keys(data.keys) : [])

	if (data === undefined)
	{
		Game.item_tooltip_data[name] = null
		GameEvents.SendCustomGameEventToServer_custom("item_tooltip_request", {item: name})
	}

	if (!data && entity === -1)
	{
		let reveal = ++ability_tooltip_reveal

		$.Schedule(0.5, () =>
		{
			if (reveal === ability_tooltip_reveal && $.GetContextPanel().IsValid())
				$.GetContextPanel().RemoveClass("TooltipPending")
		})
	}

	let costs = details.FindChildTraverse("CurrentItemCosts")
	let values = {}

	for (let id of ["Cooldown", "ManaCost", "HealthCost", "CastRange"])
	{
		let source = costs ? costs.FindChildrenWithClassTraverse(id)[0] : undefined

		if (source && details.BHasClass("Has" + id) && !details.BHasClass("IsRecipe") && source.text !== "")
			values[id] = source.text
	}

	$("#ItemCooldown").text = values.Cooldown || ""
	$("#ItemCooldown").SetHasClass("Hidden", !values.Cooldown)

	let description = $("#ItemDescription")
	let sections = details.FindChildTraverse("AbilityDescriptionContainer")
	let headers = (sections ? sections.Children() : []).filter(child => child.BHasClass("Header"))
	let target = Math.max(headers.findIndex(header => header.BHasClass("Active")), 0)
	let basher_player = entity !== -1 ? Entities.GetPlayerOwnerID(Abilities.GetCaster(entity)) : Players.GetLocalPlayer()
	let basher = Game.basher_items.includes(name) ? Game.GetBasherTalents(basher_player) : []
	let anchor = null
	let section = -1
	let bash = false
	description.RemoveAndDeleteChildren()

	for (let chunk of AbilityTooltipDescription(entity, name, level, max, bonus).split("\n"))
	{
		let parts = chunk.split(/<h1>(.*?)<\/h1>/)

		for (let index = 0; index < parts.length; index++)
		{
			let text = parts[index].replace(/^(?:\s|<br\s*\/?>)+|(?:\s|<br\s*\/?>)+$/g, "")
			let header = index % 2 === 1

			if (header)
			{
				section++
				bash = basher.length > 0 && text.includes("Bash")
			}

			if (text === "")
				continue

			let label = $.CreatePanel("Label", description, "")
			label.html = true
			label.SetHasClass("Header", header)
			label.SetHasClass("Active", index > 0 && !!headers[section] && headers[section].BHasClass("Active"))
			label.SetHasClass("BasherDisabled", bash)
			label.text = header ? "<h1>" + text + "</h1>" : bash ? $.Localize("#tooltip_item_basher_disabled") : text

			if (index > 0 && section === target)
				anchor = label
		}
	}

	let row_costs = ["ManaCost", "HealthCost", "CastRange"].filter(id => values[id])
	anchor = anchor || description.GetChild(description.GetChildCount() - 1)

	if (anchor && row_costs.length > 0)
	{
		let row = $.CreatePanel("Panel", description, "")
		row.AddClass("ItemSectionCosts")
		row.SetHasClass("Active", anchor.BHasClass("Active"))
		$.CreatePanel("Panel", row, "").AddClass("ItemSectionCostsSeparator")

		let line = $.CreatePanel("Panel", row, "")
		line.AddClass("ItemSectionCostsLine")

		for (let id of row_costs)
		{
			let label = $.CreatePanel("Label", line, "")
			label.html = true
			label.AddClass(id)
			label.text = AbilityTooltipSpans([values[id]], 0, "")
		}

		anchor.AddClass("ItemBeforeCosts")
		description.MoveChildAfter(row, anchor)
	}

	AbilityTooltipBlocks("Item", name, entity, level, max, bonus)

	let basher_block = $("#ItemBasher")
	basher_block.RemoveAndDeleteChildren()

	for (let talent of basher)
	{
		let header = $.CreatePanel("Panel", basher_block, "")
		header.AddClass("ItemGroupHeader")
		header.SetHasClass("ItemGroupNext", basher_block.GetChildCount() > 1)
		AbilityTooltipTalentIcon(header, talent).AddClass("ItemBasherIcon")

		let title = $.CreatePanel("Label", header, "")
		title.AddClass("ItemGroupTitle")
		title.text = $.Localize("#tooltip_item_basher_talent")

		$.CreatePanel("Panel", basher_block, "").AddClass("ItemGroupSeparator")

		let text = $.CreatePanel("Label", basher_block, "")
		text.html = true
		text.AddClass("ItemGroupDescription")
		text.text = Game.ShowTalentValues(Game.GetTalentTextKey("#upgrade_disc_" + talent.name, talent.name, talent.hero, basher_player), talent.name, Game.HasTalent(basher_player, talent.name, true), false, talent.rarity == "legendary", true, false, undefined, talent.hero, basher_player)
	}

	basher_block.SetHasClass("Hidden", basher.length === 0)

	let group_key = "#DOTA_Tooltip_ability_" + name + "_group"
	let group_text = $.Localize(group_key)
	let groups = $("#ItemGroups")
	groups.RemoveAndDeleteChildren()

	for (let group of group_text === group_key ? [] : group_text.trim().split(/\s+/))
	{
		let header = $.CreatePanel("Panel", groups, "")
		header.AddClass("ItemGroupHeader")
		header.SetHasClass("ItemGroupNext", groups.GetChildCount() > 1)
		$.CreatePanel("DOTAItemImage", header, "", {itemname: item_tooltip_groups[group]}).AddClass("ItemGroupIcon")

		let title = $.CreatePanel("Label", header, "")
		title.AddClass("ItemGroupTitle")
		title.text = $.Localize("#tooltip_item_group_" + group)

		$.CreatePanel("Panel", groups, "").AddClass("ItemGroupSeparator")

		let description = $.CreatePanel("Label", groups, "")
		description.html = true
		description.AddClass("ItemGroupDescription")
		description.text = $.Localize("#tooltip_item_group_" + group + "_Description")
	}

	groups.SetHasClass("Hidden", groups.GetChildCount() === 0)
	AbilityTooltipCopy(details, "AbilityCharges", details.BHasClass("UsesAbilityCharges"), "ItemCharges")
	AbilityTooltipCopy(details, "AbilityExtraAttributes", true, "ItemExtraAttributes")
	AbilityTooltipCopy(details, "AbilityLore", !details.BHasClass("HideLore"), "ItemLore")
	AbilityTooltipCopy(details, "OwnedBy", details.BHasClass("ShowOwnedBy"), "ItemOwnedBy")
	AbilityTooltipCopy(details, "ConsumableAbilityInfo", details.BHasClass("IsConsumableAbility"), "ItemConsumableInfo")
	AbilityTooltipCopy(details, "SellPriceLabel", details.BHasClass("ShowSellPrice"), "ItemSellPrice")
	AbilityTooltipCopy(details, "SellPriceTimeLabel", details.BHasClass("ShowSellPriceTime"), "ItemSellPriceTime")
	AbilityTooltipCopy(details, "DisassembleLabel", details.BHasClass("ShowDisassemble"), "ItemDisassemble")
	AbilityTooltipCopy(details, "DisassembleTimeLabel", details.BHasClass("ShowDisassembleTime"), "ItemDisassembleTime")

	let sell = $("#ItemSellPriceTime")
	let time = sell.text.match(/(\d+):(\d{2})/)
	let plain = details.FindChildTraverse("SellPriceLabel")
	item_tooltip_sell++

	if (!sell.BHasClass("Hidden") && time && plain)
		ItemTooltipSell(sell.text, plain.text.replace(/\d+/, price => Math.floor(Number(price)/2)), Game.GetGameTime() + Number(time[1])*60 + Number(time[2]), entity, item_tooltip_sell)
}

if (!$.GetContextPanel().BHasClass("AbilityTooltip"))
{
	if (Game.stats_tooltip_listener !== undefined)
		GameEvents.Unsubscribe(Game.stats_tooltip_listener)

	Game.stats_tooltip_listener = GameEvents.Subscribe_custom("stats_tooltip_data", StatsTooltipServer)

	if (Game.item_tooltip_listener !== undefined)
		GameEvents.Unsubscribe(Game.item_tooltip_listener)

	Game.item_tooltip_listener = GameEvents.Subscribe_custom("item_tooltip_keys", ItemTooltipKeys)
	StatusTooltipHook("aghs", "AbilitiesAndStatBranch", "AghsStatusContainer", 0)
	StatusTooltipHook("innate", "AbilitiesAndStatBranch", "InnateIcon", 0)
	StatusTooltipHook("stats", "stats_container", "stats_tooltip_region", 0)
}