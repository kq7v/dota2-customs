--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


"use strict"

const ability_targeting_interval = 1/144
const ability_targeting_world = ParticleAttachment_t.PATTACH_WORLDORIGIN
const ability_targeting_follow = ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW
const ability_targeting_vector_behavior = DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING
const ability_targeting_cast_click = CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_CAST
const ability_targeting_vector_click = CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_VECTOR_CAST
const ability_targeting_cone = "particles/ui_mouseactions/custom_range_finder_cone.vpcf"
const ability_targeting_cone_dual = "particles/ui_mouseactions/custom_range_finder_cone_dual.vpcf"
const ability_targeting_linear = "particles/ui_mouseactions/range_finder_linear.vpcf"
const ability_targeting_ring = "particles/slark/pounce_legendary_ui.vpcf"
const ability_targeting_circle = "particles/sand_king/stinger_target.vpcf"
const ability_targeting_charge = "particles/primal_beast/beast_charge.vpcf"
const ability_targeting_edge = 30
const ability_targeting_dash = 60
const ability_targeting_puck_points = 15
const ability_targeting_puck_step = 1/30
const ability_targeting_recheck = 100

let ability_targeting_schedule = null
let ability_targeting_session = null

const ability_targeting_active = new Map()
const ability_targeting_events = {}

function ability_targeting_hero()
{
	return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
}

function ability_targeting_direction(from, to)
{
	const x = to[0] - from[0]
	const y = to[1] - from[1]
	const length = Math.sqrt(x*x + y*y)

	if (length < 1)
		return null

	return [x/length, y/length, 0]
}

function ability_targeting_distance(from, to)
{
	return Math.sqrt((to[0] - from[0])**2 + (to[1] - from[1])**2)
}

function ability_targeting_point(origin, direction, length)
{
	return [origin[0] + direction[0]*length, origin[1] + direction[1]*length, origin[2]]
}

function ability_targeting_rotate(direction, angle)
{
	if (angle === 0)
		return direction

	const cos = Math.cos(angle)
	const sin = Math.sin(angle)
	return [direction[0]*cos - direction[1]*sin, direction[0]*sin + direction[1]*cos, 0]
}

function ability_targeting_particle(preview, name, attach, owner)
{
	const particle = Particles.CreateParticle(name, attach, owner)
	preview.particles.push(particle)
	return particle
}

function ability_targeting_clear(preview)
{
	for (const particle of preview.particles)
	{
		Particles.DestroyParticleEffect(particle, true)
		Particles.ReleaseParticleIndex(particle)
	}

	preview.particles = []
	preview.shown = false

	if (preview.origin_x !== undefined)
		ability_targeting_send_curve(preview)
}

function ability_targeting_send_curve(preview)
{
	GameEvents.SendCustomGameEventToServer_custom("send_cursor_position", {x: preview.origin_x, y: preview.origin_y, z: 0, start_x: preview.start[0], start_y: preview.start[1], end_x: preview.cursor_x, end_y: preview.cursor_y, ability: Abilities.GetAbilityName(preview.ability)})
	preview.origin_x = undefined
}

function ability_targeting_key(preview, ability, key)
{
	const bonuses = preview.bonuses || (preview.bonuses = {})
	const bonus = bonuses[ability] || (bonuses[ability] = AbilityTooltipBonus(ability, Abilities.GetAbilityName(ability)))
	const orb = bonus.orbs[key]
	const base = bonus.replace[key] !== undefined ? bonus.replace[key] : orb ? Abilities.GetLevelSpecialValueFor(ability, key, orb.active) : Abilities.GetSpecialValueFor(ability, key)

	return (base*(1 + (bonus.percent[key] || 0)/100) + (bonus.value[key] || 0))*(1 + (bonus.all[key] || 0)/100)
}

function ability_targeting_buff(preview, name)
{
	const buffs = preview.buffs || (preview.buffs = {})
	const cached = buffs[name]
	const now = Date.now()

	if (cached !== undefined && (cached.buff === -1 ? now < cached.time : Buffs.GetName(preview.caster, cached.buff) === name))
		return cached.buff

	const buff = Game.FindModifier(preview.caster, name)
	buffs[name] = {buff: buff, time: now + ability_targeting_recheck}
	return buff
}

function ability_targeting_has(preview, names)
{
	if (typeof names === "string")
		return ability_targeting_buff(preview, names) !== -1

	return names.some(name => ability_targeting_buff(preview, name) !== -1)
}

function ability_targeting_progress(preview, modifier)
{
	const buff = ability_targeting_buff(preview, modifier)
	return buff === -1 ? 0 : Math.min(1, Buffs.GetElapsedTime(preview.caster, buff)/Buffs.GetDuration(preview.caster, buff))
}

function ability_targeting_value(preview, spec)
{
	if (spec === undefined || typeof spec === "number")
		return spec

	if (typeof spec === "function")
		return spec(preview)

	if (spec === "cast_range")
		return Abilities.GetCastRange(preview.ability)

	if (spec === "cast_bonus")
		return (Game.player_stats[preview.player] || {}).cast_range || 0

	if (typeof spec === "string")
		return ability_targeting_key(preview, preview.ability, spec)

	if (Array.isArray(spec))
		return spec.reduce((sum, part) => sum + ability_targeting_value(preview, part), 0)

	let result = spec.scale === undefined ? 1 : spec.scale

	if (spec.key !== undefined)
		result *= ability_targeting_key(preview, spec.ability === undefined ? preview.ability : Entities.GetAbilityByName(preview.caster, spec.ability), spec.key)

	if (spec.data !== undefined)
		result *= preview.data[spec.data]

	if (spec.talent !== undefined)
		result *= Number(Game.GetTalentValue(spec.talent, spec.value, preview.player, true))

	if (spec.progress !== undefined)
		result *= ability_targeting_progress(preview, spec.progress)

	if (spec.percent !== undefined)
		result *= 1 + ability_targeting_value(preview, spec.percent)/100

	if (spec.add !== undefined)
		result += ability_targeting_value(preview, spec.add)

	return result
}

function ability_targeting_check(preview, rule)
{
	const when = rule.when || {}

	if (rule.event !== undefined && ability_targeting_events[rule.event] === undefined)
		return false

	if (when.target && preview.target === undefined)
		return false

	if (when.talent !== undefined && !Game.HasTalent(preview.player, when.talent))
		return false

	if (when.no_talent !== undefined && Game.HasTalent(preview.player, when.no_talent))
		return false

	if (when.modifier !== undefined && !ability_targeting_has(preview, when.modifier))
		return false

	if (when.no_modifier !== undefined && ability_targeting_has(preview, when.no_modifier))
		return false

	if (when.autocast && !Abilities.GetAutoCastState(preview.ability))
		return false

	return true
}

function ability_targeting_from(preview)
{
	if (preview.rule.from === "cursor")
		return preview.cursor

	if (preview.rule.from === "event" && Entities.IsValidEntity(preview.data.unit))
		return Entities.GetAbsOrigin(preview.data.unit)

	if (preview.target !== undefined)
		return Entities.GetAbsOrigin(preview.target)

	return preview.start === undefined ? preview.origin : preview.start
}

function ability_targeting_aim(preview, from)
{
	if (preview.rule.toward === "forward")
		return Entities.GetForward(preview.caster)

	const base = preview.rule.from === "cursor" ? preview.origin : from

	preview.direction = ability_targeting_direction(base, preview.cursor) || preview.direction || ability_targeting_direction(preview.origin, from) || Entities.GetForward(preview.caster)
	return preview.direction
}

function ability_targeting_beam(preview, particle, length)
{
	Particles.SetParticleControl(particle, 0, preview.origin)
	Particles.SetParticleControl(particle, 1, ability_targeting_point(preview.origin, preview.forward, length))
}

const ability_targeting_shapes =
{
	line:
	{
		start: preview =>
		{
			const rule = preview.rule
			let width = ability_targeting_value(preview, rule.width) || 125
			let width_end = rule.width_end === undefined ? width : ability_targeting_value(preview, rule.width_end)

			preview.linear = rule.particle === undefined && !preview.vector
			preview.count = rule.count === undefined ? 1 : ability_targeting_value(preview, rule.count)
			preview.length = rule.length === "cursor" ? null : ability_targeting_value(preview, rule.length)
			preview.reach = preview.linear && rule.sector === undefined && !rule.dual && rule.reach !== false ? width_end : 0

			if (rule.spread !== undefined)
				width_end = width + preview.length*Math.sin(ability_targeting_value(preview, rule.spread)*Math.PI/360)

			if (rule.sector !== undefined)
			{
				const half = ability_targeting_value(preview, rule.sector)*Math.PI/360
				width = 0
				width_end = preview.length*Math.sin(half)
				preview.length *= Math.cos(half)
			}

			preview.min = rule.min === undefined ? 0 : ability_targeting_value(preview, rule.min)
			preview.max = rule.max === undefined ? Infinity : ability_targeting_value(preview, rule.max)
			preview.offset = rule.offset === undefined ? 0 : ability_targeting_value(preview, rule.offset)
			preview.spread = preview.count > 1 ? ability_targeting_value(preview, rule.angle)*Math.PI/180 : 0
			preview.lines = []

			for (let index = 0; index < preview.count; index++)
			{
				if (preview.linear)
				{
					const line = ability_targeting_particle(preview, ability_targeting_linear, ability_targeting_world, -1)
					Particles.SetParticleControl(line, 2, [0, width, width_end])
					preview.lines.push(line)
					continue
				}

				const line = ability_targeting_particle(preview, rule.particle || (rule.dual ? ability_targeting_cone_dual : ability_targeting_cone), ability_targeting_world, -1)
				Particles.SetParticleControl(line, 3, [width_end, width, rule.arrow || 0])
				Particles.SetParticleControl(line, 4, [0, 255, 0])
				preview.lines.push(line)
			}

			preview.ring = undefined

			if (rule.ring !== undefined)
			{
				const radius = ability_targeting_value(preview, rule.ring)
				preview.ring = ability_targeting_particle(preview, ability_targeting_circle, ability_targeting_follow, preview.caster)
				Particles.SetParticleControl(preview.ring, 3, [radius, radius, radius])
			}
		},
		update: preview =>
		{
			const from = ability_targeting_from(preview)
			const direction = ability_targeting_rotate(ability_targeting_aim(preview, from), (preview.rule.turn || 0)*Math.PI/180)
			const length = preview.length === null ? Math.min(preview.max, Math.max(preview.min, ability_targeting_distance(from, preview.cursor))) : preview.length
			const middle = preview.rule.around ? 0 : (preview.lines.length - 1)/2

			preview.lines.forEach((line, index) =>
			{
				const turned = ability_targeting_rotate(direction, (index - middle)*preview.spread)
				const start = ability_targeting_point(from, turned, preview.linear && preview.rule.dual ? -length : preview.offset)

				if (preview.linear)
				{
					Particles.SetParticleControl(line, 0, start)
					Particles.SetParticleControl(line, 1, ability_targeting_point(from, turned, length + preview.reach))
					return
				}

				Particles.SetParticleControl(line, 1, [start[0], start[1], start[2] + 100])

				if (preview.rule.dual)
				{
					Particles.SetParticleControl(line, 7, ability_targeting_point(from, turned, length))
					Particles.SetParticleControl(line, 8, ability_targeting_point(from, turned, -length))
				}
				else
					Particles.SetParticleControl(line, 2, ability_targeting_point(from, turned, length))
			})

			if (preview.ring === undefined)
				return

			const center = preview.rule.dual ? from : ability_targeting_point(from, direction, length)

			for (let point = 0; point < 3; point++)
				Particles.SetParticleControl(preview.ring, point, center)
		},
	},

	area:
	{
		start: preview =>
		{
			const radius = ability_targeting_value(preview, preview.rule.radius)
			preview.area = ability_targeting_particle(preview, preview.rule.particle || ability_targeting_ring, ability_targeting_follow, preview.caster)
			Particles.SetParticleControl(preview.area, 3, [radius, radius, radius])
		},
		update: preview =>
		{
			const center = preview.rule.at === "cursor" ? preview.cursor : preview.origin

			for (let point = 0; point < 3; point++)
				Particles.SetParticleControl(preview.area, point, center)
		},
	},

	beam:
	{
		start: preview =>
		{
			const particle = preview.rule.particle
			preview.beam = ability_targeting_particle(preview, typeof particle === "function" ? particle(preview) : particle, ability_targeting_follow, preview.caster)
		},
		update: preview =>
		{
			const rule = preview.rule

			ability_targeting_beam(preview, preview.beam, ability_targeting_value(preview, rule.length))

			if (rule.radius_cp !== undefined)
				Particles.SetParticleControl(preview.beam, rule.radius_cp, [ability_targeting_value(preview, rule.radius), 0, 0])
		},
	},

	scatter:
	{
		start: preview =>
		{
			const reverse = ability_targeting_has(preview, "modifier_snapfire_scatterblast_custom_reverse")
			const width_start = reverse ? ability_targeting_value(preview, {talent: "modifier_snapfire_scatter_5", value: "width_start"}) : ability_targeting_value(preview, "blast_width_initial")
			const width_end = reverse ? ability_targeting_value(preview, {talent: "modifier_snapfire_scatter_5", value: "width_end"}) : ability_targeting_value(preview, "blast_width_end")
			const name = reverse ? "particles/snapfire/scatter_range.vpcf" : "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_range_finder_aoe.vpcf"

			preview.blank = ability_targeting_value(preview, "point_blank_range")
			preview.length = Abilities.GetCastRange(preview.ability) + width_end*(reverse ? 1.3 : 0.7)
			preview.blast = ability_targeting_particle(preview, name, ability_targeting_follow, preview.caster)

			if (reverse)
			{
				Particles.SetParticleControl(preview.blast, 2, [width_start, width_end, 0])
				Particles.SetParticleControl(preview.blast, 3, [width_start, width_end/2, 0])
			}
			else
			{
				Particles.SetParticleControl(preview.blast, 2, [width_start/2, width_end/2, 0])
				Particles.SetParticleControl(preview.blast, 3, [width_start/2, width_end*0.7/2, 0])
			}
		},
		update: preview =>
		{
			const direction = ability_targeting_aim(preview, preview.origin)

			Particles.SetParticleControl(preview.blast, 0, preview.origin)
			Particles.SetParticleControl(preview.blast, 1, ability_targeting_point(preview.origin, direction, preview.length))
			Particles.SetParticleControl(preview.blast, 6, ability_targeting_point(preview.origin, direction, preview.blank))
		},
	},

	reticle:
	{
		start: preview =>
		{
			const radius = ability_targeting_value(preview, "radius")

			preview.offset = radius - 120
			preview.reticle = ability_targeting_particle(preview, "particles/units/heroes/hero_muerta/muerta_calling_reticule_2.vpcf", ability_targeting_world, -1)

			Particles.SetParticleControl(preview.reticle, 1, [radius, radius, radius])
		},
		update: preview =>
		{
			const cursor = preview.cursor
			const offset = preview.offset
			const points = [[-offset, 0], [0, offset], [offset, 0], [0, -offset]]

			Particles.SetParticleControl(preview.reticle, 0, cursor)

			points.forEach((point, index) =>
			{
				const position = [cursor[0] + point[0], cursor[1] + point[1], cursor[2]]
				Particles.SetParticleControl(preview.reticle, 2 + index*2, position)
				Particles.SetParticleControl(preview.reticle, 3 + index*2, position)
			})
		},
	},

	jump:
	{
		start: preview =>
		{
			preview.radius = ability_targeting_value(preview, "landing_radius")
			preview.min = ability_targeting_value(preview, "min_jump_distance")
			preview.max = ability_targeting_value(preview, "max_jump_distance") - 50
			preview.range = Abilities.GetCastRange(preview.ability) - 50
			preview.landing = ability_targeting_particle(preview, "particles/ui_mouseactions/range_finder_generic_aoe_nocenter.vpcf", ability_targeting_world, -1)
			preview.dash = ability_targeting_particle(preview, "particles/ui_mouseactions/range_finder_line_moving_dash.vpcf", ability_targeting_world, -1)

			Particles.SetParticleControl(preview.landing, 3, [preview.radius, preview.radius, preview.radius])
		},
		update: preview =>
		{
			const origin = preview.origin
			const target = Entities.GetAbsOrigin(preview.target)
			const cursor = preview.cursor
			const distance = ability_targeting_distance(target, cursor)
			const direction = ability_targeting_direction(target, cursor) || ability_targeting_direction(origin, target) || [1, 0, 0]

			let landing = cursor
			let line = ability_targeting_point(target, direction, distance - preview.radius)

			if (distance >= preview.max)
			{
				landing = ability_targeting_point(target, direction, preview.max)
				line = ability_targeting_point(target, direction, preview.max - preview.radius)
			}
			else if (distance <= preview.min)
			{
				landing = ability_targeting_point(target, direction, preview.min)
				line = ability_targeting_point(target, direction, preview.min - preview.radius)

				const hovered = GameUI.FindScreenEntities(GameUI.GetCursorPosition())[0]

				if (hovered !== undefined && hovered.entityIndex === preview.target)
				{
					landing = ability_targeting_point(target, ability_targeting_direction(origin, target) || direction, preview.min)
					line = ability_targeting_point(target, ability_targeting_direction(origin, landing) || direction, preview.min - preview.radius)
				}
			}

			line[2] += 50

			Particles.SetParticleControl(preview.landing, 0, target)
			Particles.SetParticleControl(preview.landing, 1, target)
			Particles.SetParticleControl(preview.landing, 2, landing)
			Particles.SetParticleControl(preview.landing, 12, line)

			const back = ability_targeting_direction(target, origin)

			Particles.SetParticleControl(preview.dash, 0, origin)
			Particles.SetParticleControl(preview.dash, 1, back !== null && ability_targeting_distance(origin, target) >= preview.range ? ability_targeting_point(target, back, preview.range) : origin)
			Particles.SetParticleControl(preview.dash, 2, target)
		},
	},

	curve:
	{
		start: preview =>
		{
			preview.speed = ability_targeting_value(preview, "orb_speed")
			preview.length = ability_targeting_value(preview, "max_distance")
			preview.strength = Math.max(0, Math.min(0.9, ability_targeting_value(preview, "curve_strength")))
			preview.acceleration = ability_targeting_value(preview, "curve_orb_max_acceleration")
			preview.pullback = ability_targeting_value(preview, "curve_orb_pullback_bonus_launch_speed")
			preview.path_x = []
			preview.path_y = []
			preview.curve = ability_targeting_particle(preview, "particles/units/heroes/hero_puck/puck_orb_curve_path_prediction_preview.vpcf", ability_targeting_world, -1)

			Particles.SetParticleControl(preview.curve, 1, [ability_targeting_puck_points, 0, 0])
		},
		update: preview => ability_targeting_puck_curve(preview),
	},
}

const ability_targeting_deafening = {shape: "line", length: "travel_distance", width: {key: "radius_start", percent: {talent: "modifier_invoker_invoke_2", value: "radius"}}, width_end: {key: "radius_end", percent: {talent: "modifier_invoker_invoke_2", value: "radius"}}}
const ability_targeting_rebuke = {shape: "line", length: "radius", sector: "angle"}
const ability_targeting_hook = {shape: "line", length: ["cast_range", "cast_bonus"], width: "hook_width"}
const ability_targeting_fireblast = {shape: "line", length: [{talent: "modifier_ogremagi_blast_7", value: "range"}, "cast_bonus"], width: {talent: "modifier_ogremagi_blast_7", value: "width"}, when: {talent: "modifier_ogremagi_blast_7"}}
const ability_targeting_multishot = {shape: "line", length: ["cast_range", "cast_bonus"], width: "arrow_width"}

const ability_targeting_abilities =
{
	snapfire_scatterblast_custom: {shape: "scatter"},
	muerta_the_calling_custom: {shape: "reticle", when: {no_talent: "modifier_muerta_calling_7"}},
	sandking_scorpion_strike_custom: {shape: "area", particle: ability_targeting_circle, at: "cursor", radius: "inner_radius"},
	morphling_adaptive_strike_custom: {shape: "area", particle: ability_targeting_circle, at: "cursor", radius: {talent: "modifier_morphling_adaptive_7", value: "inner_radius"}, when: {talent: "modifier_morphling_adaptive_7"}},
	slark_pounce_custom_legendary: {shape: "area", radius: "min_dist"},
	life_stealer_unfettered_custom: {shape: "area", radius: "min_dist"},
	kunkka_ghostship_custom: {shape: "area", radius: "scepter_range_min", when: {modifier: "modifier_kunkka_ghostship_custom_scepter"}},
	primal_beast_rock_throw_custom: {shape: "area", radius: {data: "min_range"}, event: "ability_primal_beast_rock_throw"},

	void_spirit_aether_remnant_custom: {vector: true, shape: "line", length: "remnant_watch_distance", width: "start_radius", width_end: "end_radius", arrow: 1},
	custom_puck_illusory_barrier: {shape: "line", event: "ability_puck_orb", from: "event", send: true, particle: ability_targeting_cone, length: {ability: "custom_puck_illusory_orb", key: "max_distance"}, width: 80},
	invoker_ice_wall_custom: {vector: true, shape: "line", dual: true, length: preview => ability_targeting_value(preview, "wall_element_spacing")*ability_targeting_value(preview, "num_wall_elements")*0.9/2},
	pangolier_swashbuckle_custom: {vector: true, shape: "line", length: "range"},
	centaur_stampede_custom_legendary: {vector: true, shape: "line", particle: "particles/centaur/stampede_vector.vpcf", length: "distance", width: "width"},
	tinker_march_of_the_machines_custom: {vector: true, shape: "line", particle: "particles/tinker/march_vector.vpcf", length: {key: "distance", scale: 0.5}, width: {talent: "modifier_tinker_march_7", value: "width"}},
	broodmother_shard_ability_custom: {vector: true, shape: "line", target: "any", length: "range", when: {target: true}},
	muerta_dead_shot_custom: {vector: true, shape: "line", target: "unit", length: "range", width: {key: "ricochet_radius_start", percent: {talent: "modifier_muerta_dead_4", value: "width"}}, width_end: {key: "ricochet_radius_end", percent: {talent: "modifier_muerta_dead_4", value: "width"}}},
	marci_companion_run_custom: {vector: true, shape: "jump", target: "unit", when: {target: true}},

	lina_dragon_slave_custom: {shape: "line", length: ["dragon_slave_distance", "cast_bonus"], width: "dragon_slave_width_initial", width_end: "dragon_slave_width_end"},
	custom_queenofpain_sonic_wave: {shape: "line", length: "distance", width: "starting_aoe", width_end: "final_aoe"},
	jakiro_dual_breath_custom: {shape: "line", length: ["cast_range", "cast_bonus"], width: "start_radius", width_end: "end_radius"},
	jakiro_ice_path_custom: {shape: "line", length: ["cast_range", "cast_bonus"], width: "path_radius"},
	jakiro_macropyre_custom: {shape: "line", length: ["cast_range", "cast_bonus"], width: [{key: "path_width", scale: 0.5}, {talent: "modifier_jakiro_macropyre_4", value: "radius", scale: 0.5}], when: {no_talent: "modifier_jakiro_macropyre_7"}},
	invoker_deafening_blast_custom:
	[
		Object.assign({}, ability_targeting_deafening, {count: {talent: "modifier_invoker_hero_6", value: "count", add: 1}, angle: 30, around: true, when: {talent: "modifier_invoker_hero_6"}}),
		ability_targeting_deafening,
	],
	invoker_tornado_custom: {shape: "line", length: "travel_distance", width: "area_of_effect"},
	mars_spear_custom: {shape: "line", length: ["spear_range", "cast_bonus", {talent: "modifier_mars_spear_7", value: "distance"}], width: "spear_width"},
	mars_gods_rebuke_custom:
	[
		Object.assign({}, ability_targeting_rebuke, {toward: "forward", when: {no_talent: "modifier_mars_hero_5", modifier: ["modifier_mars_bulwark_custom_idle", "modifier_mars_spear_custom_legendary"]}}),
		Object.assign({}, ability_targeting_rebuke, {when: {no_talent: "modifier_mars_hero_5"}}),
	],
	custom_pudge_meat_hook:
	[
		Object.assign({}, ability_targeting_hook, {count: {talent: "modifier_pudge_hook_legendary", value: "count", add: 1}, angle: {talent: "modifier_pudge_hook_legendary", value: "angle"}, when: {talent: "modifier_pudge_hook_legendary"}}),
		ability_targeting_hook,
	],
	custom_puck_illusory_orb:
	[
		{vector: true, shape: "curve"},
		{shape: "line", length: "max_distance", width: "radius"},
	],
	nyx_assassin_impale_custom: {shape: "line", length: ["length", "cast_bonus"], width: "width"},
	morphling_waveform_custom: {shape: "line", length: "cursor", min: 100, max: ["cast_range", "cast_bonus"], width: "width"},
	sandking_burrowstrike_custom: {shape: "line", length: "cursor", max: ["cast_range", "cast_bonus"], width: "burrow_width"},
	sandking_burrowstrike_custom_reverse: {shape: "line", length: "cursor", max: ["cast_range", "cast_bonus"], width: {ability: "sandking_burrowstrike_custom", key: "burrow_width"}},
	monkey_king_boundless_strike_custom: {shape: "line", length: ["cast_range", "cast_bonus"], offset: {key: "strike_radius", scale: 0.5}, width: "strike_radius", when: {no_modifier: "modifier_monkey_king_boundless_strike_custom_legendary_caster"}},
	drow_ranger_wave_of_silence_custom: {shape: "line", length: "cast_range", width: "wave_width"},
	drow_ranger_wave_of_silence_custom_blink: {shape: "line", reach: false, length: {talent: "modifier_drow_gust_4", value: "range"}, width: ability_targeting_edge},
	drow_ranger_multishot_custom:
	[
		Object.assign({}, ability_targeting_multishot, {spread: [{key: "arrow_count_per_wave", scale: 8.33}, {key: "shard_count", scale: 8.33}], when: {modifier: "modifier_item_aghanims_shard"}}),
		Object.assign({}, ability_targeting_multishot, {spread: {key: "arrow_count_per_wave", scale: 8.33}}),
	],
	troll_warlord_whirling_axes_ranged_custom: {shape: "line", length: ["axe_range", "cast_bonus"], width: "axe_width", count: "axe_count", angle: preview => ability_targeting_value(preview, "axe_spread")/(preview.count - 1)},
	void_spirit_astral_step_custom: {shape: "line", length: "cursor", min: "min_travel_distance", max: ["max_travel_distance", "cast_bonus"], width: "radius"},
	snapfire_mortimer_kisses_custom: {shape: "area", radius: "min_range"},
	bristleback_quill_spray_custom_legendary: {shape: "line", length: {ability: "bristleback_quill_spray_custom", key: "radius"}, sector: {key: "activation_angle", scale: 2}},

	drow_ranger_frost_arrows_custom: {shape: "line", length: [{talent: "modifier_drow_frost_7", value: "range"}, "cast_bonus"], width: {talent: "modifier_drow_frost_7", value: "width"}, when: {talent: "modifier_drow_frost_7"}},
	custom_phantom_assassin_stifling_dagger_legendary: {shape: "line", length: ["cast_range", "cast_bonus"], width: {talent: "modifier_phantom_assassin_dagger_7", value: "width"}, width_end: [{talent: "modifier_phantom_assassin_dagger_7", value: "width"}, {talent: "modifier_phantom_assassin_dagger_7", value: "random_dist"}]},
	custom_juggernaut_whirling_blade_custom: {shape: "line", length: "cursor", max: ["cast_range", "cast_bonus"], width: {ability: "custom_juggernaut_blade_fury", key: "blade_fury_radius"}},
	custom_juggernaut_swift_slash: {shape: "line", length: "cursor", max: ["cast_range", "cast_bonus"], width: "width"},
	hoodwink_hunters_boomerang_custom: {shape: "line", length: ["cast_range", "cast_bonus"], width: "radius"},
	lina_scepter_custom: {shape: "line", reach: false, length: "range", width: ability_targeting_dash, ring: "radius"},
	lina_fiery_soul_custom: {shape: "line", reach: false, length: ["cast_range", "cast_bonus"], width: ability_targeting_dash, when: {talent: "modifier_lina_hero_5"}},
	axe_berserkers_call_custom: {shape: "line", length: "cursor", max: ["shard_range", "cast_bonus"], width: "radius"},
	antimage_blink_custom: {shape: "line", length: "cursor", min: {talent: "modifier_antimage_blink_7", value: "min_distance"}, max: {talent: "modifier_antimage_blink_7", value: "distance"}, width: 150, when: {talent: "modifier_antimage_blink_7"}},
	bloodseeker_thirst_custom: {shape: "line", length: "cursor", min: {talent: "modifier_bloodseeker_thirst_7", value: "min_range"}, max: [{talent: "modifier_bloodseeker_thirst_7", value: "range"}, "cast_bonus"], width: 170, when: {talent: "modifier_bloodseeker_thirst_7"}},
	muerta_dead_shot_custom_proc: {shape: "line", length: [{ability: "muerta_dead_shot_custom", key: "range"}, "cast_bonus"], width: {ability: "muerta_dead_shot_custom", key: "ricochet_radius_start", percent: {talent: "modifier_muerta_dead_4", value: "width"}}, width_end: {ability: "muerta_dead_shot_custom", key: "ricochet_radius_start", talent: "modifier_muerta_dead_7", value: "width", percent: {talent: "modifier_muerta_dead_4", value: "width"}}},
	muerta_gunslinger_custom: {shape: "line", reach: false, length: ["cast_range", "cast_bonus"], width: ability_targeting_dash, when: {talent: "modifier_muerta_gun_7"}},
	pangolier_lucky_shot_custom: {shape: "line", reach: false, length: {talent: "modifier_pangolier_lucky_4", value: "range"}, width: ability_targeting_dash, when: {talent: "modifier_pangolier_lucky_4"}},
	centaur_hoof_stomp_custom: {shape: "line", length: "cursor", max: [{talent: "modifier_centaur_stomp_7", value: "range"}, "cast_bonus"], width: {talent: "modifier_centaur_stomp_7", value: "hit_radius"}, when: {talent: "modifier_centaur_stomp_7"}},
	slark_pounce_custom: {shape: "line", length: ["cast_range", "cast_bonus"], width: 120},
	enigma_black_hole_custom_legendary: {shape: "line", length: [{talent: "modifier_enigma_blackhole_7", value: "range"}, "cast_bonus"], width: {talent: "modifier_enigma_blackhole_7", value: "radius", scale: 0.5}},
	nyx_assassin_burrow_custom: {shape: "line", length: "cursor", max: ["dash_range", "cast_bonus"], width: "radius"},
	night_stalker_midnight_feast_custom_charge: {shape: "line", reach: false, length: ["cast_range", "cast_bonus"], width: ability_targeting_dash},
	kunkka_torrent_custom: {shape: "line", length: "cursor", width: "radius", when: {talent: "modifier_kunkka_torrent_7"}},
	kunkka_tidal_wave_custom: {shape: "line", length: {talent: "modifier_kunkka_tidebringer_7", value: "distance"}, offset: {talent: "modifier_kunkka_tidebringer_7", value: "spawn_distance", scale: -1}, width: {talent: "modifier_kunkka_tidebringer_7", value: "width", scale: 0.5}},
	ogre_magi_fireblast_custom: ability_targeting_fireblast,
	ogre_magi_unrefined_fireblast_custom: ability_targeting_fireblast,
	invoker_emp_custom: {shape: "line", length: ["cast_range", "cast_bonus"], width: "area_of_effect", when: {talent: "modifier_invoker_wex_7"}},
	marci_dispose_hits: {shape: "line", length: [{talent: "modifier_marci_dispose_7", value: "range"}, "cast_bonus"], width: 200},
	crystal_maiden_arcane_aura_custom: {shape: "line", reach: false, length: "range", width: ability_targeting_dash},
	leshrac_split_earth_custom: {shape: "line", length: "cursor", max: ["cast_range", "cast_bonus"], width: 180, when: {talent: "modifier_leshrac_hero_4", autocast: true}},
	mars_wall_custom: {shape: "line", from: "cursor", turn: 90, dual: true, length: 140, width: ability_targeting_edge, ring: "radius"},
	sven_great_cleave_custom_legendary: {shape: "line", length: "cast_range", width: {talent: "modifier_sven_cleave_7", value: "width"}},
	sven_gods_strength_custom_legendary: {shape: "line", length: 450, sector: 100},
	sniper_assassinate_custom_legendary: {shape: "line", length: ["distance", "cast_bonus"], width: "projectile_width"},
}

const ability_targeting_default = [{vector: true, shape: "line", length: 800}]

const ability_targeting_states =
{
	ability_mars_spear: {shape: "beam", particle: "particles/mars/spear_legendary_rope.vpcf", length: {data: "range"}, radius: {data: "width"}, radius_cp: 3},
	ability_stalker_dark: {shape: "beam", particle: "particles/night_stalker/dark_legedary_vector.vpcf", length: {talent: "modifier_stalker_dark_7", value: "range"}},
	ability_primal_beast_onslaught: {shape: "beam", particle: ability_targeting_charge, length: {data: "range", progress: "modifier_primal_beast_onslaught_custom_cast"}, radius: {data: "radius"}, radius_cp: 2},
	ability_primal_beast_trample: {shape: "beam", particle: ability_targeting_charge, length: {data: "range"}, radius: {data: "radius"}, radius_cp: 2},
	ability_hoodwink_ulti: {shape: "beam", particle: preview => preview.data.has_blue_style == 1 ? "particles/econ/items/hoodwink/hoodwink_2022_immortal/hoodwink_sharpshooter_range_finder_blossom.vpcf" : "particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_range_finder.vpcf", length: {data: "range"}},
	ability_razor_current: {shape: "beam", particle: "particles/razor/surge_range.vpcf", length: {data: "range", progress: "modifier_razor_unstable_current_custom_legendary"}},
}

function ability_targeting_puck_curve(preview)
{
	const origin = preview.origin
	const cursor = preview.cursor

	if (Math.abs(origin[0] - preview.origin_x) < 1 && Math.abs(origin[1] - preview.origin_y) < 1 && Math.abs(cursor[0] - preview.cursor_x) < 1 && Math.abs(cursor[1] - preview.cursor_y) < 1)
		return

	preview.origin_x = origin[0]
	preview.origin_y = origin[1]
	preview.cursor_x = cursor[0]
	preview.cursor_y = cursor[1]

	let forward_x = preview.start[0] - origin[0]
	let forward_y = preview.start[1] - origin[1]
	let length = Math.sqrt(forward_x*forward_x + forward_y*forward_y)

	if (length < 0.1)
	{
		const forward = Entities.GetForward(preview.caster)
		length = 0.1
		forward_x = forward[0]
		forward_y = forward[1]
	}
	else
	{
		forward_x /= length
		forward_y /= length
	}

	let direction_x = cursor[0] - preview.start[0]
	let direction_y = cursor[1] - preview.start[1]
	const drag = Math.sqrt(direction_x*direction_x + direction_y*direction_y)

	if (drag < 0.1)
	{
		direction_x = forward_x
		direction_y = forward_y
	}
	else
	{
		direction_x /= drag
		direction_y /= drag
	}

	const cos = Math.max(-0.9999, Math.min(1, forward_x*direction_x + forward_y*direction_y))
	let side_x = forward_y
	let side_y = -forward_x

	if (direction_x*forward_y - direction_y*forward_x < 0)
	{
		side_x = -side_x
		side_y = -side_y
	}

	let side = 1
	let back = 0

	if (cos <= 0)
	{
		side = Math.sqrt(1 - cos*cos)
		back = -cos
	}

	let strength = preview.strength

	if (side < 0.2)
		strength = 0.5 + (strength - 0.5)*side/0.2

	const angle = Math.acos(Math.abs(cos))*strength
	const angle_sin = Math.sin(angle)
	const angle_cos = Math.cos(angle)
	const speed = preview.speed
	const launch = speed*(1 + preview.pullback*back)
	const accel = Math.min(preview.acceleration, 2*angle_sin*(angle_cos*side - angle_sin*back)/(length*side*side))*launch*launch
	const accel_x = (side_x*side - forward_x*back)*accel
	const accel_y = (side_y*side - forward_y*back)*accel
	let velocity_x = (forward_x*angle_cos - side_x*angle_sin)*launch
	let velocity_y = (forward_y*angle_cos - side_y*angle_sin)*launch

	const path_x = preview.path_x
	const path_y = preview.path_y
	let x = origin[0]
	let y = origin[1]
	let traveled = 0
	let count = 1

	path_x[0] = x
	path_y[0] = y

	while (count <= 1000 && traveled < preview.length)
	{
		const step = ability_targeting_puck_step

		velocity_x += accel_x*step
		velocity_y += accel_y*step
		let current = Math.sqrt(velocity_x*velocity_x + velocity_y*velocity_y)

		if (velocity_x*accel_x + velocity_y*accel_y > 0 && current > speed)
		{
			velocity_x *= speed/current
			velocity_y *= speed/current
			current = speed
		}

		x += velocity_x*step
		y += velocity_y*step
		traveled += current*step
		path_x[count] = x
		path_y[count] = y
		count++
	}

	for (let point = 0; point < ability_targeting_puck_points; point++)
	{
		const index = point*(count - 1)/(ability_targeting_puck_points - 1)
		const low = Math.floor(index)
		const high = Math.min(count - 1, low + 1)
		const fraction = index - low

		Particles.SetParticleControl(preview.curve, 10 + point, [path_x[low] + (path_x[high] - path_x[low])*fraction, path_y[low] + (path_y[high] - path_y[low])*fraction, origin[2]])
	}
}

function ability_targeting_rules(ability)
{
	const entry = ability_targeting_abilities[Abilities.GetAbilityName(ability)]
	const vector = (Abilities.GetBehavior(ability) & ability_targeting_vector_behavior) !== 0
	const rules = (Array.isArray(entry) ? entry : entry === undefined ? [] : [entry]).filter(rule => !!rule.vector === vector)

	if (rules.length > 0)
		return rules

	return vector ? ability_targeting_default : undefined
}

function ability_targeting_draw(preview)
{
	if (preview.target !== undefined && !Entities.IsValidEntity(preview.target))
		preview.target = undefined

	preview.origin = Entities.GetAbsOrigin(preview.caster)

	const rule = preview.rules.find(rule => ability_targeting_check(preview, rule))

	if (rule !== preview.rule)
	{
		if (preview.shown)
			ability_targeting_clear(preview)

		preview.rule = rule
	}

	if (rule === undefined)
		return

	if (rule.event !== undefined)
		preview.data = ability_targeting_events[rule.event]

	const shape = ability_targeting_shapes[rule.shape]

	if (!preview.shown)
	{
		shape.start(preview)
		preview.shown = true
	}

	shape.update(preview)
}

function ability_targeting_begin(preview, point)
{
	const entity = GameUI.FindScreenEntities(GameUI.GetCursorPosition())[0]
	const target = preview.rules[0].target

	if (preview.shown)
		ability_targeting_clear(preview)

	preview.ready = true
	preview.start = point
	preview.target = undefined
	preview.direction = undefined
	preview.rule = undefined

	if (entity !== undefined && (target === "any" || (target === "unit" && entity.entityIndex !== ability_targeting_hero())))
		preview.target = entity.entityIndex
}

function ability_targeting_update_session(preview)
{
	if ((preview.vector && preview.ready) ? !Abilities.IsDisplayedAbility(preview.ability) : Abilities.GetLocalPlayerActiveAbility() !== preview.ability)
		return false

	if (Abilities.IsHidden(preview.ability) || !Abilities.IsActivated(preview.ability))
	{
		if (Abilities.GetLocalPlayerActiveAbility() === preview.ability)
			Abilities.ExecuteAbility(preview.ability, preview.caster, false)

		return false
	}

	const cursor = GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition())

	if (cursor !== null)
		preview.cursor = cursor

	if (preview.cursor === undefined)
		return true

	if (!preview.ready)
	{
		if (GameUI.GetClickBehaviors() !== ability_targeting_vector_click)
			return true

		ability_targeting_begin(preview, preview.cursor)
	}

	if (preview.vector && Players.GetLocalPlayerPortraitUnit() !== preview.caster)
		GameUI.SelectUnit(preview.caster, false)

	ability_targeting_draw(preview)
	return true
}

function ability_targeting_tick()
{
	ability_targeting_schedule = null

	if (ability_targeting_session !== null && !ability_targeting_update_session(ability_targeting_session))
		ability_targeting_stop()

	for (const preview of ability_targeting_active.values())
	{
		preview.forward = Entities.GetForward(preview.caster)
		ability_targeting_draw(preview)
	}

	if (ability_targeting_session !== null || ability_targeting_active.size > 0)
		ability_targeting_run()
}

function ability_targeting_run()
{
	if (ability_targeting_schedule === null)
		ability_targeting_schedule = $.Schedule(ability_targeting_interval, ability_targeting_tick)
}

function ability_targeting_stop()
{
	if (ability_targeting_session === null)
		return

	ability_targeting_clear(ability_targeting_session)
	ability_targeting_session = null
}

function ability_targeting_activate(ability)
{
	if (ability_targeting_session !== null && ability_targeting_session.ability === ability)
		return

	const rules = ability_targeting_rules(ability)

	if (rules === undefined)
		return

	const caster = Abilities.GetCaster(ability)
	const vector = !!rules[0].vector

	ability_targeting_stop()
	ability_targeting_session = {rules: rules, vector: vector, ability: ability, caster: caster, player: Entities.GetPlayerOwnerID(caster), particles: [], shown: false, ready: !vector}
	ability_targeting_run()
}

function ability_targeting_event(name, data)
{
	ability_targeting_events[name] = data

	const rule = ability_targeting_states[name]

	if (rule === undefined)
		return

	const preview = ability_targeting_active.get(name)

	if (data.state === 2)
	{
		if (preview === undefined)
			return

		ability_targeting_clear(preview)
		ability_targeting_active.delete(name)
		return
	}

	if (preview !== undefined)
	{
		preview.data = data
		return
	}

	ability_targeting_active.set(name, {rules: [rule], caster: ability_targeting_hero(), player: Players.GetLocalPlayer(), data: data, particles: [], shown: false})
	ability_targeting_run()
}

function ability_targeting_panel_ability(panel)
{
	const parent = panel.GetParent()

	if (!parent || (parent.id !== "abilities" && parent.id !== "inventory_list"))
		return -1

	const image = panel.FindChildTraverse("AbilityImage")

	if (image && image.abilityname)
		return image.contextEntityIndex

	const item = panel.FindChildTraverse("ItemImage")
	return item ? item.contextEntityIndex : -1
}

$.RegisterForUnhandledEvent("StyleClassesChanged", panel =>
{
	if (panel === null || panel.paneltype !== "DOTAAbilityPanel")
		return

	const active = panel.BHasClass("is_active")

	if (!active && ability_targeting_session === null)
		return

	const ability = ability_targeting_panel_ability(panel)

	if (ability === -1)
		return

	if (active)
		ability_targeting_activate(ability)
	else if (ability_targeting_session.ability === ability)
		ability_targeting_stop()
})

GameUI.SetMouseCallback((event, button) =>
{
	const preview = ability_targeting_session

	if (event === "released" && button === 0 && preview !== null && preview.origin_x !== undefined)
	{
		const cursor = GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition())

		if (cursor !== null)
			preview.cursor = cursor

		ability_targeting_draw(preview)

		if (preview.origin_x !== undefined)
			ability_targeting_send_curve(preview)

		return false
	}

	if (event !== "pressed" || button !== 0 || preview === null || GameUI.GetClickBehaviors() !== ability_targeting_cast_click)
		return false

	const point = GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition())

	if (point === null)
		return false

	if (preview.vector)
		ability_targeting_begin(preview, point)
	else if (preview.rule !== undefined && preview.rule.send)
	{
		const from = ability_targeting_from(preview)
		GameEvents.SendCustomGameEventToServer_custom("send_cursor_position", {x: point[0], y: point[1], z: point[2], from_x: from[0], from_y: from[1], ability: Abilities.GetAbilityName(preview.ability)})
	}

	return false
})

new Set([...Object.keys(ability_targeting_states), ...Object.values(ability_targeting_abilities).reduce((all, entry) => all.concat(entry), []).map(rule => rule.event).filter(name => name !== undefined)])
	.forEach(name => GameEvents.Subscribe_custom(name, data => ability_targeting_event(name, data)))