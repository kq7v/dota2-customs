--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


--宝石TD
--@author lobster
if GemTD == nil then
	GemTD = class({})
end

--报错追踪
-- if __debug_trace_back_original__ == nil then
-- 	__debug_trace_back_original__ = debug.traceback
-- end
-- debug.traceback = function(thread, message, level)
-- 	local trace
-- 	if thread == nil and message == nil and level == nil then
-- 		trace = __debug_trace_back_original__()
-- 	else
-- 		trace = __debug_trace_back_original__(thread, message, level)
-- 	end
-- 	if thread ~= nil then
-- 		local e = tostring(thread)
-- 		print(e)
-- 		local err_encode = require('libs/base64').encode(e)

-- 		if _G.error_trace[err_encode] == nil then
-- 			_G.error_trace[err_encode] = e
-- 			local url = "http://gemtd.ppbizon.com/error/catch?err="..err_encode..'&game=gemtd&round='..(_G.battle_round or 0)..GetSendKey()
-- 			CreateHTTPRequestScriptVM("GET", url):Send(function (result) end)
-- 		end
-- 	end

-- 	return trace
-- end

--加载需要的模块
md5 = require("md5")
json = require("dkjson")
BASE_MODULES = {
	"pathfinder/core/heuristics",
	"pathfinder/core/node",
	"pathfinder/core/path",
	"pathfinder/grid",
	"pathfinder/pathfinder",
	"pathfinder/core/bheap",
	"pathfinder/search/astar",
	"pathfinder/search/bfs",
	"pathfinder/search/dfs",
	"pathfinder/search/dijkstra",
	"pathfinder/search/jps",
	"timer/Timers",
	"bit",
	"randomlua",
	"util",
	"barebones",
	"amhc_library/amhc",
	"Timers",
	"Physics",
	"drodo_library/util",
}
local function load_module(mod_name)
	local status, err_msg = pcall(function()
		require(mod_name)
	end)
	if status then
		print("Load module <" .. mod_name .. "> OK")
	else
		print("Load module <" .. mod_name .. "> FAILED: " .. err_msg)
	end
end
for i, mod_name in pairs(BASE_MODULES) do
	load_module(mod_name)
end

LinkLuaModifier("modifier_fall", "lua_modifier/fall.lua", LUA_MODIFIER_MOTION_VERTICAL)

--全局变量
time_tick = 0
-- userid2player = {}
-- isConnected = {}

--通用的
--预加载游戏资源
function Precache(context)
	-- --[[
	-- 	Precache things we know we'll use.  Possible file types include (but not limited to):
	-- 		PrecacheResource( "model", "*.vmdl", context )
	-- 		PrecacheResource( "soundfile", "*.vsndevts", context )
	-- 		PrecacheResource( "particle", "*.vpcf", context )
	-- 		PrecacheResource( "particle_folder", "particles/folder", context )
	-- ]]
	local zr = {
		"particles/units/heroes/hero_antimage/antimage_blink_start.vpcf",
		"particles/units/heroes/hero_antimage/antimage_blink_end.vpcf",
		"effect/crown_s3/1.vpcf",
		"effect/crown_s3/2.vpcf",
		"models/courier/mighty_boar/mighty_boar.vmdl",
		"models/props_stone/stone_column001a.vmdl",
		"models/props_gameplay/heart001.vmdl",
		"models/props_structures/good_barracks_melee002.vmdl",
		"models/courier/frog/frog.vmdl",
		"models/courier/yak/yak.vmdl",
		"models/props_debris/riveredge_rocks_small001_snow.vmdl",
		"particles/econ/events/snowball/snowball_projectile.vpcf",
		"models/particle/ice_shards.vmdl",
		"models/props_debris/candles003.vmdl",
		"particles/units/heroes/hero_jakiro/jakiro_base_attack_fire.vpcf",
		"models/props_destruction/lava_flow_clump.vmdl",
		"particles/units/heroes/hero_templar_assassin/templar_assassin_base_attack.vpcf",
		"particles/units/heroes/hero_lina/lina_base_attack.vpcf",
		"models/particle/green_rocks.vmdl",
		"particles/units/heroes/hero_phoenix/phoenix_base_attack.vpcf",
		"particles/base_attacks/ranged_goodguy_trail.vpcf",
		"models/particle/snowball.vmdl",
		"models/particle/skull.vmdl",
		"models/particle/sealife.vmdl",
		"models/particle/tormented_spike.vmdl",
		"models/props_mines/mine_tool_plate001.vmdl",
		"models/props_magic/bad_crystals002.vmdl",
		"models/props_nature/lily_flower00.vmdl",
		"models/buildings/building_racks_melee_reference.vmdl",
		"particles/units/heroes/hero_leshrac/leshrac_base_attack.vpcf",
		"particles/units/heroes/hero_vengeful/vengeful_base_attack.vpcf",
		"particles/units/heroes/hero_venomancer/venomancer_base_attack.vpcf",
		"models/props_winter/egg.vmdl",
		"models/items/wards/tide_bottom_watcher/tide_bottom_watcher.vmdl",
		"models/items/wards/skywrath_sentinel/skywrath_sentinel.vmdl",
		"models/items/wards/fairy_dragon/fairy_dragon.vmdl",
		"models/items/wards/echo_bat_ward/echo_bat_ward.vmdl",
		"models/items/wards/esl_wardchest_four_armed_observer/esl_wardchest_four_armed_observer.vmdl",
		"models/items/wards/crystal_maiden_ward/crystal_maiden_ward.vmdl",
		"models/items/wards/esl_wardchest_jungleworm_sentinel/esl_wardchest_jungleworm_sentinel.vmdl",
		"models/items/wards/jinnie_v2/jinnie_v2.vmdl",
		"models/items/wards/venomancer_ward/venomancer_ward.vmdl",
		"models/items/wards/frozen_formation/frozen_formation.vmdl",
		"models/items/wards/deep_observer/deep_observer.vmdl",
		"models/items/wards/eyeofforesight/eyeofforesight.vmdl",
		"models/courier/courier_mech/courier_mech.vmdl",
		"models/courier/badger/courier_badger_flying.vmdl",
		"particles/econ/items/crystal_maiden/crystal_maiden_maiden_of_icewrack/maiden_freezing_field_explosion_white_b_arcana1.vpcf",
		"particles/econ/courier/courier_greevil_green/courier_greevil_green_ambient_3.vpcf",
		"models/items/wards/esl_wardchest_ward_of_foresight/esl_wardchest_ward_of_foresight.vmdl",
		"models/items/wards/esl_wardchest_rockshell_terrapin/esl_wardchest_rockshell_terrapin.vmdl",
		"particles/units/heroes/hero_terrorblade/terrorblade_metamorphosis_base_attack.vpcf",
		"models/courier/tegu/tegu.vmdl",
		"models/courier/stump/stump.vmdl",
		"models/items/courier/itsy/itsy.vmdl",
		"models/items/courier/duskie/duskie.vmdl",
		"models/courier/juggernaut_dog/juggernaut_dog.vmdl",
		"models/items/wards/deadwatch_ward/deadwatch_ward.vmdl",
		"models/items/wards/enchantedvision_ward/enchantedvision_ward.vmdl",
		"models/items/wards/esl_wardchest_sibling_spotter/esl_wardchest_sibling_spotter.vmdl",
		"models/courier/defense3_sheep/defense3_sheep.vmdl",
		"models/items/courier/livery_llama_courier/livery_llama_courier.vmdl",
		"models/items/courier/gnomepig/gnomepig.vmdl",
		"models/items/courier/butch_pudge_dog/butch_pudge_dog.vmdl",
		"models/items/courier/captain_bamboo/captain_bamboo_flying.vmdl",
		"models/courier/imp/imp.vmdl",
		"models/items/courier/mighty_chicken/mighty_chicken.vmdl",
		"models/items/courier/bajie_pig/bajie_pig.vmdl",
		"models/items/courier/arneyb_rabbit/arneyb_rabbit.vmdl",
		"models/items/courier/shagbark/shagbark.vmdl",
		"particles/econ/items/shadow_fiend/sf_fire_arcana/sf_fire_arcana_shadowraze.vpcf",
		"models/items/wards/d2lp_4_ward/d2lp_4_ward.vmdl",
		"models/items/wards/jakiro_pyrexae_ward/jakiro_pyrexae_ward.vmdl",
		"models/items/wards/esl_wardchest_radling_ward/esl_wardchest_radling_ward.vmdl",
		"models/items/wards/dragon_ward/dragon_ward.vmdl",
		"particles/units/heroes/hero_enchantress/enchantress_base_attack.vpcf",
		"particles/base_attacks/ranged_tower_good_glow_b.vpcf",
		"models/items/wards/gazing_idol_ward/gazing_idol_ward.vmdl",
		"models/items/wards/chinese_ward/chinese_ward.vmdl",
		"particles/units/heroes/hero_slardar/slardar_amp_damage.vpcf",
		"particles/econ/items/effigies/status_fx_effigies/base_statue_destruction_gold_model.vpcf",
		"particles/showcase_fx/showcase_fx_base_3_b.vpcf",
		"particles/items_fx/aura_shivas_ring.vpcf",
		"particles/hw_fx/gravehands_grab_1_ground.vpcf",
		"particles/econ/courier/courier_trail_winter_2012/courier_trail_winter_2012_drifts.vpcf",
		"particles/econ/items/lone_druid/lone_druid_cauldron/lone_druid_bear_entangle_ground_soil_cauldron.vpcf",
		"particles/econ/items/earthshaker/earthshaker_gravelmaw/earthshaker_fissure_ground_b_gravelmaw.vpcf",
		"particles/units/heroes/hero_tusk/tusk_ice_shards_ground_burst.vpcf",
		"effect/omniwings/omni.vpcf",
		"particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_buff_circle.vpcf",
		"particles/units/heroes/hero_slardar/slardar_amp_damage.vpcf",
		"particles/units/heroes/hero_winter_wyvern/wyvern_winters_curse_status_ice.vpcf",
		"models/items/courier/deathripper/deathripper.vmdl",
		"models/courier/lockjaw/lockjaw.vmdl",
		"models/courier/trapjaw/trapjaw.vmdl",
		"models/courier/mechjaw/mechjaw.vmdl",
		"models/items/courier/corsair_ship/corsair_ship.vmdl",
		"models/items/courier/courier_mvp_redkita/courier_mvp_redkita.vmdl",
		"models/items/courier/lgd_golden_skipper/lgd_golden_skipper_flying.vmdl",
		"models/items/courier/ig_dragon/ig_dragon_flying.vmdl",
		"models/items/courier/vigilante_fox_red/vigilante_fox_red_flying.vmdl",
		"models/courier/drodo/drodo_flying.vmdl",
		"particles/units/heroes/hero_ursa/ursa_fury_swipes_debuff.vpcf",
		"models/items/wards/augurys_guardian/augurys_guardian.vmdl",
		"particles/neutral_fx/skeleton_spawn.vpcf",
		"particles/units/heroes/hero_earth_spirit/espirit_spawn_ground.vpcf",
		"particles/econ/items/luna/luna_lucent_ti5/luna_eclipse_impact_moonfall.vpcf",
		"particles/econ/items/luna/luna_lucent_ti5_gold/luna_eclipse_impact_moonfall_gold.vpcf",
		"particles/radiant_fx/tower_good3_dest_beam.vpcf",
		"particles/units/unit_greevil/loot_greevil_death.vpcf",
		"particles/units/heroes/hero_zuus/zuus_arc_lightning_head.vpcf",
		"models/items/wards/blood_seeker_ward/bloodseeker_ward.vmdl",
		"particles/units/heroes/hero_zuus/zuus_base_attack.vpcf",
		"models/items/wards/alliance_ward/alliance_ward.vmdl",
		"particles/units/heroes/hero_razor/razor_static_link_projectile_a.vpcf",
		"particles/econ/items/natures_prophet/natures_prophet_weapon_scythe_of_ice/natures_prophet_scythe_of_ice.vpcf",
		"particles/units/heroes/hero_tinker/tinker_laser.vpcf",
		"particles/gem/team_0.vpcf",
		"particles/unit_team/unit_team_player1.vpcf",
		"particles/unit_team/unit_team_player2.vpcf",
		"particles/unit_team/unit_team_player3.vpcf",
		"particles/unit_team/unit_team_player4.vpcf",
		"particles/unit_team/unit_team_player0_a.vpcf",
		"particles/unit_team/unit_team_player1_a.vpcf",
		"particles/unit_team/unit_team_player2_a.vpcf",
		"particles/unit_team/unit_team_player3_a.vpcf",
		"particles/unit_team/unit_team_player4_a.vpcf",
		"models/items/wards/esl_wardchest_living_overgrowth/esl_wardchest_living_overgrowth.vmdl",
		"models/items/wards/mothers_eye/mothers_eye.vmdl",
		"models/items/wards/esl_one_jagged_vision/esl_one_jagged_vision.vmdl",
		"particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt_birds.vpcf",
		"particles/units/heroes/hero_phoenix/phoenix_sunray_tgt.vpcf",
		"models/items/wards/jakiro_pyrexae_ward/jakiro_pyrexae_ward.vmdl",
		"particles/units/heroes/hero_phoenix/phoenix_supernova_scepter_f.vpcf",
		"particles/tinker_laser2.vpcf",
		"models/items/wards/jimoward_omij/jimoward_omij.vmdl",
		"models/items/courier/corsair_ship/corsair_ship_flying.vmdl",
		"particles/items3_fx/star_emblem_brokenshield_caster.vpcf",
		"models/props_gameplay/heart001.vmdl",
		"soundevents/hehe.vsndevts",
		"models/items/wards/tink/tink.vmdl",
		"models/items/wards/warding_guise/warding_guise.vmdl",
		"models/courier/smeevil_magic_carpet/smeevil_magic_carpet_flying.vmdl",
		"models/items/courier/bookwyrm/bookwyrm.vmdl",
		"models/items/courier/kanyu_shark/kanyu_shark.vmdl",
		"models/items/courier/pw_zombie/pw_zombie.vmdl",
		"models/courier/huntling/huntling_flying.vmdl",
		"particles/kunkka_hehe.vpcf",
		"models/items/courier/jin_yin_black_fox/jin_yin_black_fox_flying.vmdl",
		"models/items/courier/jin_yin_white_fox/jin_yin_white_fox_flying.vmdl",
		"particles/units/heroes/hero_lion/lion_spell_mana_drain.vpcf",
		"particles/units/heroes/hero_pugna/pugna_life_drain.vpcf",
		"particles/units/heroes/hero_wisp/wisp_tether.vpcf",
		"models/items/courier/mei_nei_rabbit/mei_nei_rabbit_flying.vmdl",
		"models/items/courier/gama_brothers/gama_brothers_flying.vmdl",
		"models/courier/smeevil_mammoth/smeevil_mammoth_flying.vmdl",
		"models/items/courier/baekho/baekho.vmdl",
		"models/items/courier/green_jade_dragon/green_jade_dragon_flying.vmdl", --翠玉小龙
		"models/items/courier/jumo/jumo.vmdl",
		"models/items/courier/jumo_dire/jumo_dire.vmdl",
		"models/items/courier/lilnova/lilnova.vmdl",
		"models/items/courier/blue_lightning_horse/blue_lightning_horse.vmdl", --蔚蓝之霆
		"models/items/courier/amphibian_kid/amphibian_kid_flying.vmdl", --两栖鱼孩
		"models/items/wards/chicken_hut_ward/chicken_hut_ward.vmdl",
		"models/courier/greevil/gold_greevil_flying.vmdl",
		"models/items/courier/g1_courier/g1_courier_flying.vmdl",
		"models/items/courier/boooofus_courier/boooofus_courier_flying.vmdl",
		"models/items/courier/mlg_courier_wraith/mlg_courier_wraith_flying.vmdl",
		"particles/units/heroes/hero_shadowshaman/shadowshaman_ether_shock.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_shadowshaman.vsndevts",
		"particles/units/heroes/hero_huskar/huskar_burning_spear.vpcf",
		"particles/items_fx/desolator_projectile.vpcf",
		"particles/units/heroes/hero_enchantress/enchantress_untouchable.vpcf",
		"models/items/wards/knightstatue_ward/knightstatue_ward.vmdl",
		"particles/units/heroes/hero_lina/lina_spell_laguna_blade.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_dragon_knight.vsndevts",
		"particles/units/heroes/hero_dragon_knight/dragon_knight_elder_dragon_frost_explosion.vpcf",
		"models/props_structures/pumpkin003.vmdl",
		"models/props_gameplay/pumpkin_bucket.vmdl",
		"models/items/courier/pumpkin_courier/pumpkin_courier_flying.vmdl",
		"particles/units/heroes/hero_abaddon/abaddon_borrowed_time.vpcf",
		"sounds/weapons/hero/abaddon/borrowed_time.vsnd",
		"particles/units/heroes/hero_phantom_assassin/guai_shanbi.vpcf",
		"models/items/wards/f2p_ward/f2p_ward.vmdl",
		"models/items/wards/fairy_dragon/fairy_dragon.vmdl",
		"particles/econ/items/puck/puck_alliance_set/puck_base_attack_aproset.vpcf",
		"particles/econ/items/crystal_maiden/crystal_maiden_maiden_of_icewrack/maiden_freezing_field_casterribbons_arcana1.vpcf",
		"models/props_teams/logo_dire_fall_medium.vmdl",
		"models/props_teams/logo_radiant_medium.vmdl",
		"models/props/traps/spiketrap/spiketrap.vmdl",
		"models/items/courier/azuremircourierfinal/azuremircourierfinal.vmdl",
		"models/items/courier/kupu_courier/kupu_courier_flying.vmdl",
		"models/items/wards/esl_wardchest_jungleworm/esl_wardchest_jungleworm.vmdl",
		"models/items/wards/esl_wardchest_direling_ward/esl_wardchest_direling_ward.vmdl",
		"particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_buff.vpcf",
		"particles/econ/items/meepo/meepo_colossal_crystal_chorus/meepo_ambient_crystal_chorus_magic.vpcf",
		"models/items/courier/basim/basim_flying.vmdl",
		"models/props_teams/logo_radiant_winter_medium.vmdl",
		"models/creeps/nian/nian_creep.vmdl",
		"models/items/courier/mok/mok_flying.vmdl",
		"particles/units/heroes/hero_ogre_magi/ogre_magi_unr_fireblast.vpcf",
		"particles/units/heroes/hero_ogre_magi/ogre_magi_unr_fireblast_ring_fire.vpcf",
		"particles/econ/items/crystal_maiden/crystal_maiden_cowl_of_ice/maiden_crystal_nova_cowlofice.vpcf",
		"particles/gem/screen_arcane_drop.vpcf",
		"particles/gem/immunity_sphere_buff.vpcf",
		"particles/gem/immunity_sphere.vpcf",
		"particles/gem/omniknight_guardian_angel_wings_buff.vpcf",
		"particles/generic_gameplay/screen_damage_indicator.vpcf",
		"particles/generic_gameplay/screen_arcane_drop.vpcf",
		"particles/items2_fx/refresher.vpcf",
		"particles/units/heroes/hero_vengeful/vengeful_nether_swap_target.vpcf",
		"particles/units/heroes/hero_medusa/medusa_base_attack.vpcf",
		"particles/units/heroes/hero_silencer/silencer_base_attack.vpcf",
		"particles/econ/items/ancient_apparition/aa_blast_ti_5/ancient_apparition_ice_blast_explode_ti5.vpcf",
		"models/props_debris/shop_set_seat001.vmdl",
		"particles/econ/items/ancient_apparition/aa_blast_ti_5/ancient_apparition_ice_blast_sphere_final_explosion_smoke_ti5.vpcf",
		"particles/units/heroes/hero_siren/naga_siren_portrait.vpcf",
		"particles/units/heroes/hero_chen/chen_teleport.vpcf",
		"particles/units/heroes/hero_chen/chen_teleport_flash_main.vpcf",
		"particles/radiant_fx/radiant_tower002_destruction_a2.vpcf",
		"particles/generic_gameplay/screen_damage_indicator.vpcf",
		"models/items/wards/sea_dogs_watcher/sea_dogs_watcher.vmdl",
		"models/items/wards/portal_ward/portal_ward.vmdl",
		"particles/units/heroes/hero_stormspirit/stormspirit_electric_vortex_debuff.vpcf",
		"models/items/courier/coral_furryfish/coral_furryfish.vmdl",
		"models/items/courier/shroomy/shroomy.vmdl",
		"models/items/courier/bts_chirpy/bts_chirpy_flying.vmdl",
		"models/items/courier/boris_baumhauer/boris_baumhauer_flying.vmdl",
		"models/items/courier/green_jade_dragon/green_jade_dragon.vmdl",
		"models/courier/mech_donkey/mech_donkey.vmdl",
		"models/items/wards/esl_wardchest_toadstool/esl_wardchest_toadstool.vmdl",
		"models/courier/flopjaw/flopjaw.vmdl",
		"models/courier/donkey_trio/mesh/donkey_trio.vmdl",
		"models/items/courier/carty/carty_flying.vmdl",
		"models/items/courier/axolotl/axolotl_flying.vmdl",
		"models/courier/seekling/seekling_flying.vmdl",
		"models/items/courier/shibe_dog_cat/shibe_dog_cat_flying.vmdl",
		"models/items/courier/krobeling/krobeling.vmdl",
		"models/items/courier/snaggletooth_red_panda/snaggletooth_red_panda_flying.vmdl",
		"particles/items2_fx/refresher.vpcf",
		"particles/units/heroes/hero_lion/lion_spell_finger_of_death.vpcf",
		"models/items/wards/phoenix_ward/phoenix_ward.vmdl",
		"particles/econ/items/enchantress/enchantress_virgas/ench_impetus_virgas.vpcf",
		"sm/2014.vpcf",
		"particles/econ/courier/courier_trail_divine/courier_divine_ambient.vpcf",
		"sm/ruby.vpcf",
		"particles/econ/courier/courier_trail_fireworks/courier_trail_fireworks.vpcf",
		"particles/econ/courier/courier_crystal_rift/courier_ambient_crystal_rift.vpcf",
		"particles/econ/courier/courier_trail_cursed/courier_cursed_ambient.vpcf",
		"particles/econ/courier/courier_trail_04/courier_trail_04.vpcf",
		"particles/econ/courier/courier_trail_hw_2012/courier_trail_hw_2012.vpcf",
		"particles/econ/courier/courier_trail_hw_2013/courier_trail_hw_2013.vpcf",
		"particles/econ/courier/courier_trail_spirit/courier_trail_spirit.vpcf",
		"particles/units/heroes/hero_skeletonking/wraith_king_ghosts_ambient.vpcf",
		"particles/econ/courier/courier_polycount_01/courier_trail_polycount_01.vpcf",
		"particles/econ/wards/bane/bane_ward/bane_ward_ambient.vpcf",
		"sm/mogu.vpcf",
		"sm/2012trail_international_2012.vpcf",
		"sm/2013.vpcf",
		"particles/econ/courier/courier_trail_05/courier_trail_05.vpcf",
		"sm/ambient.vpcf",
		"particles/econ/items/crystal_maiden/crystal_maiden_maiden_of_icewrack/maiden_arcana_ground_ambient.vpcf",
		"sm/grass/03.vpcf",
		"sm/lianhua.vpcf",
		"sm/bingxueecon/courier/courier_trail_winter_2012/courier_trail_winter_2012.vpcf",
		"particles/econ/courier/courier_trail_lava/courier_trail_lava.vpcf",
		"sm/rongyanroushan.vpcf",
		"sm/bingroushan.vpcf",
		"sm/jinroushanambient.vpcf",
		"sm/lizizhiqiambient.vpcf",
		"particles/econ/courier/courier_trail_earth/courier_trail_earth.vpcf",
		"sm/hapi.vpcf",
		"sm/baoshiguangze.vpcf",
		"particles/econ/items/crystal_maiden/crystal_maiden_maiden_of_icewrack/maiden_freezing_field_snow_b_arcana1.vpcf",
		"sm/nihonghudieblue.vpcf",
		"particles/econ/events/ti6/radiance_owner_ti6.vpcf",
		"particles/econ/events/ti6/fountain_regen_ribbon_lvl3_a.vpcf",
		"sm/xianqichanrao.vpcf",
		"sm/ziyuanpurple/courier_greevil_purple_ambient_3.vpcf",
		"sm/xuehua.vpcf",
		"sm/xiehuodefault.vpcf",
		"sm/jinbijinbigold.vpcf",
		"sm/guanghuisuiyue.vpcf",
		"sm/zisexingyunsecondary.vpcf",
		"particles/econ/items/silencer/silencer_ti6/silencer_last_word_status_ti6.vpcf",
		"sm/xingxingold.vpcf",
		"particles/generic_gameplay/dropped_item_rapier.vpcf",
		"models/items/courier/boooofus_courier/boooofus_courier.vmdl",
		"models/courier/donkey_crummy_wizard_2014/donkey_crummy_wizard_2014.vmdl",
		"models/items/courier/bts_chirpy/bts_chirpy_flying.vmdl",
		"models/courier/drodo/drodo.vmdl",
		"models/courier/baby_rosh/babyroshan_flying.vmdl",
		"models/items/courier/little_fraid_the_courier_of_simons_retribution/little_fraid_the_courier_of_simons_retribution.vmdl",
		"models/items/wards/monty_ward/monty_ward.vmdl",
		"models/items/courier/wabbit_the_mighty_courier_of_heroes/wabbit_the_mighty_courier_of_heroes_flying.vmdl",
		"soundevents/game_sounds_heroes/game_sounds_medusa.vsndevts",
		"models/items/wards/stonebound_ward/stonebound_ward.vmdl",
		"particles/units/heroes/hero_visage/visage_base_attack.vpcf",
		"particles/units/heroes/hero_kunkka/kunkka_spell_tidebringer.vpcf",
		"particles/events/ti6_teams/teleport_start_ti6_lvl3_mvp_phoenix.vpcf",
		"sounds/misc/crowd_lv_01.vsnd",
		"models/items/wards/the_monkey_sentinel/the_monkey_sentinel.vmdl",
		"particles/dev/library/base_linear_projectile_model.vpcf",
		"particles/items2_fx/skadi_projectile.vpcf",
		"particles/units/heroes/hero_lina/lina_spell_laguna_blade.vpcf",
		"particles/units/heroes/hero_medusa/medusa_mystic_snake_projectile.vpcf",
		"particles/econ/events/ti5/dagon_ti5.vpcf",
		"effects/bianpaofireworks.vpcf",
		"particles/econ/courier/courier_polycount_01/courier_trail_polycount_01a.vpcf",
		"particles/econ/courier/courier_axolotl_ambient/courier_axolotl_ambient.vpcf",
		"particles/vr/player_light_godray.vpcf",
		"particles/econ/events/killbanners/screen_killbanner_compendium14_doublekill.vpcf",
		"particles/econ/events/killbanners/screen_killbanner_compendium14_firstblood.vpcf",
		"particles/econ/events/killbanners/screen_killbanner_compendium16_triplekill.vpcf",
		"particles/econ/events/killbanners/screen_killbanner_compendium14_rampage_swipe1.vpcf",
		"particles/econ/events/killbanners/screen_killbanner_compendium14_triplekill.vpcf",
		"particles/units/heroes/hero_venomancer/venomancer_venomous_gale.vpcf",
		"particles/gem/dove.vpcf",
		"particles/units/heroes/hero_enchantress/enchantress_death_butterfly.vpcf",
		"particles/units/heroes/hero_beastmaster/beastmaster_call_bird.vpcf",
		"particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt_birds.vpcf",
		"models/props_teams/logo_radiant_winter_medium.vmdl",
		"particles/units/heroes/hero_siren/siren_net_main.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_naga_siren.vsndevts",
		"materials/youbushiban.vmdl",
		"materials/zhangqishiban.vmdl",
		"materials/zuzhoushiban.vmdl",
		"materials/hongliushiban.vmdl",
		"soundevents/game_sounds_heroes/game_sounds_witchdoctor.vsndevts",
		"soundevents/game_sounds_heroes/game_sounds_venomancer.vsndevts",
		"soundevents/game_sounds_heroes/game_sounds_kunkka.vsndevts",
		"materials/stone.vmdl",
		"materials/new_stone.vmdl",
		"soundevents/game_sounds_heroes/game_sounds_lycan.vsndevts",
		"particles/units/heroes/hero_axe/axe_battle_hunger.vpcf",
		"particles/econ/items/winter_wyvern/winter_wyvern_ti7/wyvern_cold_embrace_ti7buff.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_phantom_assassin.vsndevts",
		"particles/units/heroes/hero_tusk/tusk_snowball_ground_frost.vpcf",
		"sounds/weapons/hero/gyrocopter/call_down_cast.vsnd",
		"sounds/weapons/hero/gyrocopter/call_down_impact.vsnd",
		"particles/units/heroes/hero_gyrocopter/gyro_calldown_marker.vpcf",
		"particles/econ/items/gyrocopter/hero_gyrocopter_gyrotechnics/gyro_calldown_first.vpcf",
		"particles/econ/items/gyrocopter/hero_gyrocopter_gyrotechnics/gyro_calldown_second.vpcf",
		"particles/units/heroes/hero_witchdoctor/witchdoctor_cask.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_witchdoctor.vsndevts",
		"soundevents/game_sounds_heroes/game_sounds_gyrocopter.vsndevts",
		"particles/econ/items/rubick/rubick_force_ambient/rubick_telekinesis_force.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_rubick.vsndevts",
		"effect/lianhua/lianhua.vpcf",
		"effect/xuehua/xuehua.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_earthshaker.vsndevts",
		"particles/econ/items/earthshaker/earthshaker_totem_ti6/earthshaker_totem_ti6_leap_impact.vpcf",
		"particles/units/heroes/hero_dazzle/dazzle_weave_circle_ray.vpcf",
		"particles/econ/items/kunkka/divine_anchor/hero_kunkka_dafx_skills/kunkka_spell_torrent_bubbles_swirl_center_fxset.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_furion.vsndevts",
		"particles/econ/items/tinker/boots_of_travel/teleport_end_bots_b.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_tinker.vsndevts",
		"particles/econ/items/invoker/invoker_ti7/invoker_ti7_alacrity_buff_dark.vpcf",
		"models/items/wards/sylph_ward/sylph_ward.vmdl",
		"particles/units/heroes/hero_omniknight/omniknight_purification.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_omniknight.vsndevts",
		"models/props_magic/bad_magic_tower001.vmdl",
		"models/particle/snowball.vmdl",
		"models/items/crystal_maiden/snowman/crystal_maiden_snowmaiden.vmdl",
		"models/items/winter_wyvern/winter_wyvern_ti7_immortal/winter_wyvern_ti7_immortal_ice_shards.vmdl",
		"models/items/wards/eye_of_avernus_ward/eye_of_avernus_ward.vmdl",
		"particles/units/heroes/hero_warlock/warlock_fatal_bonds_icon.vpcf",
		"particles/units/heroes/hero_warlock/warlock_fatal_bonds_base.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_templar_assassin.vsndevts",
		"soundevents/game_sounds_heroes/game_sounds_axe.vsndevts",
		"soundevents/game_sounds_heroes/game_sounds_antimage.vsndevts",

		"models/courier/donkey_ti7/donkey_ti7.vmdl",
		"models/courier/otter_dragon/otter_dragon.vmdl",
		"models/courier/skippy_parrot/skippy_parrot_flying_sailboat.vmdl",
		"models/items/courier/echo_wisp/echo_wisp_flying.vmdl",
		"models/items/courier/g1_courier/g1_courier_flying.vmdl",
		"models/items/courier/hermit_crab/hermit_crab.vmdl",
		"models/items/courier/white_the_crystal_courier/white_the_crystal_courier_flying.vmdl",
		"models/courier/defense3_sheep/defense3_sheep.vmdl",
		"models/items/courier/courier_faun/courier_faun.vmdl",
		"particles/units/heroes/hero_siren/siren_net_projectile.vpcf",
		"particles/units/heroes/hero_siren/siren_net.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_vengefulspirit.vsndevts",
		"particles/units/heroes/hero_dark_willow/dark_willow_bramble_projectile.vpcf",
		"particles/units/heroes/hero_dark_willow/dark_willow_wisp_spell_debuff.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_pugna.vsndevts",
		"particles/units/heroes/hero_pugna/pugna_decrepify.vpcf",
		"models/items/courier/mole_messenger/mole_messenger_lvl6_flying.vmdl",
		"particles/econ/items/vengeful/vs_ti8_immortal_shoulder/vs_ti8_immortal_magic_missle.vpcf",
		"particles/econ/items/phantom_assassin/pa_ti8_immortal_head/pa_ti8_immortal_stifling_dagger.vpcf",
		"particles/econ/items/bristleback/ti7_head_nasal_goo/bristleback_ti7_nasal_goo_proj.vpcf",
		"particles/units/heroes/hero_razor/razor_static_link.vpcf",
		"effect/u/u1.vpcf",
		"effect/u2/2.vpcf",
		"effect/dakongque/hantomlancer_spiritlance_projectile.vpcf",
		"effect/dabaiyin/tinker_laser.vpcf",
		"particles/econ/items/necrolyte/necronub_death_pulse/necrolyte_pulse_ka_enemy.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_zuus.vsndevts",
		"effect/merge/ui/plus/ui_hero_level_4_icon_ambient.vpcf",

		"particles/units/heroes/hero_witchdoctor/witchdoctor_maledict_tick.vpcf",
		"particles/econ/items/necrolyte/necrophos_sullen/necro_sullen_pulse_enemy.vpcf",
		"particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf",

		"models/courier/mighty_boar/mighty_boar_wings.vmdl",
		"models/courier/yak/yak_flying.vmdl",
		"models/courier/courier_mech/courier_mech_flying.vmdl",
		"models/courier/stump/stump_flying.vmdl",
		"models/courier/tegu/tegu_flying.vmdl",
		"models/items/courier/itsy/itsy_flying.vmdl",
		"models/items/courier/duskie/duskie_flying.vmdl",
		"models/items/courier/courier_faun/courier_faun_flying.vmdl",
		"models/items/courier/livery_llama_courier/livery_llama_courier_flying.vmdl",
		"models/items/courier/gnomepig/gnomepig_flying.vmdl",
		"models/items/courier/butch_pudge_dog/butch_pudge_dog_flying.vmdl",
		"models/courier/imp/imp_flying.vmdl",
		"models/items/courier/mighty_chicken/mighty_chicken_flying.vmdl",
		"models/items/courier/bajie_pig/bajie_pig_flying.vmdl",
		"models/items/courier/arneyb_rabbit/arneyb_rabbit_flying.vmdl",
		"models/courier/donkey_trio/mesh/donkey_trio_flying.vmdl",
		"models/items/courier/deathripper/deathripper_flying.vmdl",
		"models/items/courier/hermit_crab/hermit_crab_flying.vmdl",
		"models/courier/lockjaw/lockjaw_flying.vmdl",
		"models/courier/trapjaw/trapjaw_flying.vmdl",
		"models/courier/flopjaw/flopjaw_flying.vmdl",
		"models/courier/mechjaw/mechjaw_flying.vmdl",
		"models/courier/mech_donkey/mech_donkey_flying.vmdl",
		"models/items/courier/courier_mvp_redkita/courier_mvp_redkita_flying.vmdl",
		"models/items/courier/bookwyrm/bookwyrm_flying.vmdl",
		"models/courier/otter_dragon/otter_dragon_flying.vmdl",
		"models/items/courier/kanyu_shark/kanyu_shark_flying.vmdl",
		"models/items/courier/pw_zombie/pw_zombie_flying.vmdl",
		"models/items/courier/krobeling/krobeling_flying.vmdl",
		"models/items/courier/jumo/jumo_flying.vmdl",
		"models/items/courier/jumo_dire/jumo_dire_flying.vmdl",
		"models/items/courier/baekho/baekho_flying.vmdl",
		"models/items/courier/lilnova/lilnova_flying.vmdl",
		"models/items/courier/azuremircourierfinal/azuremircourierfinal_flying.vmdl",
		"models/items/courier/green_jade_dragon/green_jade_dragon_flying.vmdl",
		"models/items/courier/coral_furryfish/coral_furryfish_flying.vmdl",
		"models/items/courier/shroomy/shroomy_flying.vmdl",
		"models/items/courier/boooofus_courier/boooofus_courier_flying.vmdl",
		"models/courier/donkey_crummy_wizard_2014/donkey_crummy_wizard_2014_flying.vmdl",
		"models/courier/donkey_ti7/donkey_ti7_flying.vmdl",
		"models/courier/drodo/drodo_flying.vmdl",
		"particles/generic_gameplay/generic_stunned_old.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_alchemist.vsndevts",
		"particles/neutral_fx/gnoll_poison_debuff.vpcf",
		"particles/econ/items/viper/viper_ti7_immortal/viper_poison_crimson_debuff_ti7.vpcf",
		"particles/econ/courier/courier_trail_01/courier_trail_01.vpcf",
		"models/props_structures/radiant_statue002_destruction.vmdl",
		"particles/econ/items/enchantress/enchantress_virgas/ench_impetus_virgas.vpcf",
		"effect/bottle/2_concoction_projectile.vpcf",

		"sounds/items/medallion_of_courage.vsnd",
		"particles/dire_fx/bad_ancient002_destruction_rings.vpcf",
		"particles/items2_fx/rod_of_atos_attack.vpcf",
		"sounds/items/rune_dd.vsnd",
		"particles/generic_gameplay/rune_doubledamage.vpcf",
		"particles/econ/items/axe/axe_cinder/axe_cinder_battle_hunger.vpcf",
		"models/props_gameplay/quelling_blade.vmdl",
		"models/props_gameplay/bottle_rejuvenation.vmdl",
		"particles/econ/items/bounty_hunter/bounty_hunter_hunters_hoard/bounty_hunter_hoard_shield_mark.vpcf",
		"particles/econ/items/slark/slark_ti6_blade/slark_ti6_pounce_start_gold_spiral.vpcf",
		"particles/items_fx/abyssal_blade_jugger.vpcf",
		"particles/units/heroes/hero_abaddon/abaddon_borrowed_time_heal.vpcf",
		"soundevents/game_sounds_heroes/game_sounds_omniknight.vsndevts",
		"effect/bottle2/1_concoction_projectile.vpcf",
		"particles/units/heroes/hero_vengeful/vengeful_nether_swap.vpcf",
		"particles/ui_mouseactions/range_finder_cp_color_creep.vpcf",
		"soundevents/game_sounds_ambient.vsndevts",
		"soundevents/voscripts/game_sounds_vo_announcer_diretide_2012.vsndevts",
		"sounds/music/stingers/halloween_stingers/roshan_sugar_rush.vsnd",
		"soundevents/music/game_sounds_stingers_diretide.vsndevts",
		"soundevents/game_sounds_greevils.vsndevts",
		"particles/econ/items/riki/riki_head_ti8_gold/riki_smokebomb_ti8_gold_model.vpcf",

		"materials/new_stone.vmdl",
		"models/pumpkin.vmdl",
		"models/shop_set_seat001.vmdl",
		"models/particle/snowball.vmdl",
		"models/props_gameplay/cheese_04.vmdl",
		"models/egg.vmdl",
		"models/darkreef_shellbig_001.vmdl",
		"models/mushroom_inkycap_04.vmdl",
		"maps/cavern_assets/models/statues/geode_radiant.vmdl",
		"maps/reef_assets/models/props/naga_city/darkreef_naga_statue001.vmdl",
		"models/creeps/greevil_shopkeeper/greevil_shopkeeper.vmdl",
		"models/creeps/roshan/roshan.vmdl",
		"models/props/ice_biome/buildings/tuskhouse01.vmdl",
		"models/props_generic/tent_01a.vmdl",
		"models/props_gameplay/pumpkin_bucket.vmdl",
		"models/props_structures/radiant_statue002.vmdl",
		"models/props_structures/radiant_statue002_destruction.vmdl",
		"soundevents/game_sounds_hero_pick.vsndevts",
		"particles/econ/items/ogre_magi/ogre_ti8_immortal_weapon/ogre_ti8_immortal_bloodlust_buff_circle_outer_pulse.vpcf",
		"soundevents/game_sounds_items.vsndevts",
		"particles/winter_fx/winter_present_projectile.vpcf",
		"models/items/courier/blue_lightning_horse/blue_lightning_horse.vmdl",
		"models/courier/smeevil_crab/smeevil_crab_flying.vmdl",
		"models/items/courier/mok/mok_flying.vmdl",
		"models/courier/baby_rosh/babyroshan_winter18_flying.vmdl",
		"particles/winter_fx/winter_present_projectile.vpcf",
		"models/items/courier/nian_courier/nian_courier_flying.vmdl",
		"effect/crown/1.vpcf",
		"effect/crown/2.vpcf",
		"soundevents/custom_sounds.vsndevts",
		"models/props_frostivus/frostivus_ancient/frostivus_ancient.vmdl",
		"materials/models/snow/snow_wall.vmdl",
		"maps/jungle_assets/temple/temple_statue_01.vmdl",
		"models/journe_01_stump.vmdl",
		"particles/world_environmental_fx/artifact_table_godray.vpcf",
		"particles/dev/library/base_dust_hit_shockwave.vpcf",
		"particles/gem/team_0.vpcf",
		"particles/gem/team_1.vpcf",
		"particles/gem/team_2.vpcf",
		"particles/gem/team_3.vpcf",
		"particles/gem/team_4.vpcf",
	}

	print("Precache...")
	local t = #zr
	for i = 1, t do
		if string.find(zr[i], "vpcf") then
			PrecacheResource("particle", zr[i], context)
		end
		if string.find(zr[i], "vmdl") then
			PrecacheResource("model", zr[i], context)
		end
		if string.find(zr[i], "vsndevts") then
			PrecacheResource("soundfile", zr[i], context)
		end
	end

	print("[precache]=============units_kv=============")
	local units_kv = LoadKeyValues("scripts/npc/npc_units_custom.txt")
	for k, v in pairs(units_kv) do
		-- if k ~= "Version" and string.find(k,'chess_') == nil then
		if k ~= "Version" then
			print(k)
			PrecacheUnitByNameSync(k, context)
		end
	end

	PrecacheUnitByNameSync("npc_dota_hero_gyrocopter", context)
	PrecacheUnitByNameSync("npc_dota_hero_lich", context)

	print("Precache OK")
end
--初始化1
function Activate()
	print("GemTD START!")
	_G.AddonTemplate = GemTD()
	_G.AddonTemplate:InitGameMode()

	--监听全局定时器事件
	GameRules:GetGameModeEntity():SetThink("OnThink", self, "GlobalThink", 0.5)
	CustomGameEventManager:RegisterListener(
		"player_request_choose_hero",
		Dynamic_Wrap(GemTD, "OnPlayerRequestChooseHero")
	)
	CustomGameEventManager:RegisterListener("player_start_team_select", Dynamic_Wrap(GemTD, "OnPlayerStartTeamSelect"))
	--队伍选择界面：开始/取消开始（任何玩家都能点）
	CustomGameEventManager:RegisterListener("request_start_game", Dynamic_Wrap(GemTD, "OnRequestStartGame"))
	CustomGameEventManager:RegisterListener("request_cancel_start", Dynamic_Wrap(GemTD, "OnRequestCancelStart"))
	CustomGameEventManager:RegisterListener("request_proxy", Dynamic_Wrap(GemTD, "OnRequestProxy"))

	CustomGameEventManager:RegisterListener("left_click", Dynamic_Wrap(GemTD, "OnLeftClick"))
end
function InitVaribles()
	_G.START_TIME = 0
	GameRules:SetPreGameTime(0)

	GameRules:GetGameModeEntity():SetAnnouncerDisabled(true)
	if GetMapName() == "gemtd_race" then
		GameRules:GetGameModeEntity():SetPauseEnabled(false)
	else
		GameRules:GetGameModeEntity():SetPauseEnabled(true)
	end
	GameRules:GetGameModeEntity():SetFogOfWarDisabled(false)
	GameRules:GetGameModeEntity():SetUnseenFogOfWarEnabled(false)
	GameRules:GetGameModeEntity():DisableHudFlip(true)

	_G.is_heros_get_sended = nil
	_G.error_trace = {}
	_G.pcount = ""
	_G.playerid2hero = {}
	_G.choose_hero_info = {
		[0] = nil,
		[1] = nil,
		[2] = nil,
		[3] = nil,
	}

	_G.q111 = {}
	_G.item_fanbei = {
		[0] = 0,
		[1] = 0,
		[2] = 0,
		[3] = 0,
	}
	_G.item_moshuhe = {
		[0] = 0,
		[1] = 0,
		[2] = 0,
		[3] = 0,
	}
	_G.extra_kill = 0
	_G.zaotui_table = {
		[0] = 0,
		[1] = 0,
		[2] = 0,
		[3] = 0,
	}
	_G.is_game_really_started = false
	_G.show_damage = false
	_G.level = 1
	_G.guangzhudaobiao_race = {}
	GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_BADGUYS, 0)
	GameRules:SetHeroRespawnEnabled(false)
	GameRules:GetGameModeEntity():SetBuybackEnabled(false)
	GameRules:SetSameHeroSelectionEnabled(true)
	GameRules:SetGoldPerTick(0)
	--游戏结束后不显示默认的胜利消息(夜魇/天辉胜利横幅)
	GameRules:SetCustomVictoryMessageDuration(0)
	--结束游戏出现后不再等待，点击立刻退出地图
	GameRules:SetCustomGameEndDelay(2)
	GameRules:GetGameModeEntity():SetUseCustomHeroLevels(true)
	GameRules:GetGameModeEntity():SetCustomHeroMaxLevel(5)
	_G.top_runner = nil
	_G.is_maze_guide_show = false
	_G.last_mvp = {}
	_G.enemy_table = {}
	_G.enemy_table_race = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	_G.stat_table = {}
	_G.stat_table_race = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}

	_G.build_curr = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	_G.gemtd_pool = {}
	_G.gemtd_pool_race = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	_G.gemtd_pool_can_merge = {}
	_G.gemtd_pool_can_merge_race = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	_G.gemtd_pool_can_merge_1 = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	_G.gemtd_pool_can_merge_shiban = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	_G.gemtd_pool_can_merge_all = {}
	_G.gemtd_pool_can_merge_all_race = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	_G.usermaze = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	GameRules:GetGameModeEntity():SetCustomXPRequiredToReachNextLevel({
		[1] = 0,
		[2] = 250,
		[3] = 650,
		[4] = 1200,
		[5] = 1900,
	})
	_G.DROP_PER = 1
	_G.playerInfoReceived = {}
	_G.death_stack = ""
	_G.race_stat = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	_G.maze_guide = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	_G.playerid2hero = {}
	_G.quest = {}
	_G.wave_enemy_count = 10
	_G.win_streak = 0
	_G.kuangbao_time = 0
	_G.win_streak_time = 0
	_G.perfect_this_level = true
	_G.last_g_time = 0
	GameRules:SetUseCustomHeroXPValues(true)
	_G.navi = RandomInt(1000, 9999)
	_G.hero = {}
	_G.online_player_count = 0
	_G.shiban_index = {}
	_G.is_build_ready = {
		[0] = true,
		[1] = true,
		[2] = true,
		[3] = true,
	}
	_G.build_ready_wave = {
		[0] = 0,
		[1] = 0,
		[2] = 0,
		[3] = 0,
	}
	_G.enemy_live_count = {
		[0] = 0,
		[1] = 0,
		[2] = 0,
		[3] = 0,
	}
	_G.damage = {}
	_G.damage_race = {
		[0] = {},
		[1] = {},
		[2] = {},
		[3] = {},
	}
	_G.enemy_spawned_wave = 0

	_G.is_boss_entered = false
	_G.quest_status = {
		q101 = true,
		q102 = true,
		q103 = true,
		q104 = false, --deleted
		q105 = false,
		q106 = true,
		q107 = true, --deleted
		q108 = false, --deleted
		q109 = false, --new
		q110 = false, --new
		q111 = false, --特定英雄

		q201 = true,
		q202 = true,
		q203 = true,
		q204 = true,
		q205 = true,
		q206 = true,
		q207 = true,
		q208 = true,
		q209 = false,
		q210 = false, --new
		q211 = true, --new

		q301 = true, --deleted
		q302 = false,
		q303 = false, --deleted
		q304 = false, --new
		q399 = false,
	}
	_G.gem_hero = {
		[0] = nil,
		[1] = nil,
		[2] = nil,
		[3] = nil,
	}
	_G.crab = nil
	_G.guangzhudaobiao = nil
	_G.hero_sea = {
		h101 = "npc_dota_hero_enchantress",
		h102 = "npc_dota_hero_puck",
		h103 = "npc_dota_hero_omniknight",
		h104 = "npc_dota_hero_wisp",
		h105 = "npc_dota_hero_ogre_magi",
		h106 = "npc_dota_hero_lion",
		h107 = "npc_dota_hero_keeper_of_the_light",
		h108 = "npc_dota_hero_rubick",
		h109 = "npc_dota_hero_jakiro",
		h110 = "npc_dota_hero_sand_king",
		h111 = "npc_dota_hero_ancient_apparition", --new
		h112 = "npc_dota_hero_earth_spirit", --new

		h201 = "npc_dota_hero_crystal_maiden",
		h202 = "npc_dota_hero_death_prophet",
		h203 = "npc_dota_hero_templar_assassin",
		h204 = "npc_dota_hero_lina",
		h205 = "npc_dota_hero_tidehunter",
		h206 = "npc_dota_hero_naga_siren",
		h207 = "npc_dota_hero_phoenix",
		h208 = "npc_dota_hero_dazzle",
		h209 = "npc_dota_hero_warlock",
		h210 = "npc_dota_hero_necrolyte",
		h211 = "npc_dota_hero_lich",
		h212 = "npc_dota_hero_furion",
		h213 = "npc_dota_hero_venomancer",
		h214 = "npc_dota_hero_kunkka",
		h215 = "npc_dota_hero_axe",
		h216 = "npc_dota_hero_slark",
		h217 = "npc_dota_hero_viper",
		h218 = "npc_dota_hero_tusk",
		h219 = "npc_dota_hero_abaddon",
		h220 = "npc_dota_hero_winter_wyvern", --new
		h221 = "npc_dota_hero_ember_spirit", --new

		h301 = "npc_dota_hero_windrunner",
		h302 = "npc_dota_hero_phantom_assassin",
		h303 = "npc_dota_hero_sniper",
		h304 = "npc_dota_hero_sven",
		h305 = "npc_dota_hero_luna",
		h306 = "npc_dota_hero_mirana",
		h307 = "npc_dota_hero_nevermore",
		h308 = "npc_dota_hero_queenofpain",
		h309 = "npc_dota_hero_juggernaut",
		h310 = "npc_dota_hero_pudge",
		h311 = "npc_dota_hero_shredder",
		h312 = "npc_dota_hero_slardar",
		h313 = "npc_dota_hero_antimage",
		h314 = "npc_dota_hero_bristleback",
		h315 = "npc_dota_hero_lycan",
		h316 = "npc_dota_hero_lone_druid",
		h317 = "npc_dota_hero_storm_spirit", --new
		h318 = "npc_dota_hero_obsidian_destroyer", --new
		h319 = "npc_dota_hero_grimstroke", --天涯墨客

		h401 = "npc_dota_hero_vengefulspirit",
		h402 = "npc_dota_hero_invoker",
		h403 = "npc_dota_hero_alchemist",
		h404 = "npc_dota_hero_spectre",
		h405 = "npc_dota_hero_morphling",
		h406 = "npc_dota_hero_techies",
		h407 = "npc_dota_hero_chaos_knight",
		h408 = "npc_dota_hero_faceless_void",
		h409 = "npc_dota_hero_legion_commander",
		h410 = "npc_dota_hero_monkey_king",
		h411 = "npc_dota_hero_razor",
		h412 = "npc_dota_hero_tinker",
		h413 = "npc_dota_hero_pangolier",
		h414 = "npc_dota_hero_dark_willow",
		h415 = "npc_dota_hero_terrorblade", --new
		h416 = "npc_dota_hero_enigma", --new
	}
	_G.ability_sea = {
		a101 = "gemtd_hero_huichun", --OK
		a102 = "gemtd_hero_shanbi", --OK
		a103 = "gemtd_hero_shouhu", --OK
		a105 = "gemtd_hero_beishuiyizhan", --OK

		a201 = "gemtd_hero_lanse", --OK
		a202 = "gemtd_hero_danbai", --OK
		a203 = "gemtd_hero_baise", --OK
		a204 = "gemtd_hero_hongse", --OK
		a205 = "gemtd_hero_lvse", --OK
		a206 = "gemtd_hero_fense", --OK
		a207 = "gemtd_hero_huangse", --OK
		a208 = "gemtd_hero_zise", --OK
		a210 = "gemtd_hero_putong", --OK
		a211 = "gemtd_hero_qingyi", --OK
		a212 = "gemtd_hero_shitou", --OK

		a301 = "gemtd_hero_kuaisusheji", --OK
		a302 = "gemtd_hero_baoji", --OK
		a303 = "gemtd_hero_miaozhun", --OK
		a304 = "gemtd_hero_fengbaozhichui", --OK
		a305 = "gemtd_hero_wuxia", --OK
		a306 = "gemtd_hero_huidaoguoqu", --OK
		a307 = "gemtd_hero_lianjie", --OK
		a308 = "gemtd_hero_xuanfeng", --OK

		a401 = "gemtd_hero_yixinghuanwei", --OK
		a402 = "gemtd_hero_wanmei", --OK
		a403 = "gemtd_hero_guangzhudaobiao",

		a1001 = "tt1",
		a1002 = "tt2",
		a1003 = "tt3",
		a1004 = "tt4",
		a1005 = "tt5",
		a1006 = "tt6",
		a1007 = "tt7",
		a1008 = "tt8",
	}
	_G.toy_sea = {
		t401 = "roshan",
		t402 = "greevil",
		t403 = "shell",
		t301 = "pumpkin",
		pumpkin = "pumpkin",
		t302 = "snow",
		t303 = "beach",
		t304 = "mushroom",
	}
	--石头样式
	_G.stone_style_list = {
		default = {
			stone_model = "materials/new_stone.vmdl",
			stone_scale = 1,
			castle_model = "models/props_structures/radiant_statue002.vmdl",
			castle_broken_model = "models/props_structures/radiant_statue002_destruction.vmdl",
			castle_scale = 2,
		},
		jungle = {
			stone_model = "models/journe_01_stump.vmdl",
			stone_scale = 3.7,
			castle_model = "maps/jungle_assets/temple/temple_statue_01.vmdl",
			castle_broken_model = "",
			castle_scale = 1.5,
			castle_forward = Vector(0, -1, 0),
		},
		pumpkin = {
			stone_model = "models/pumpkin.vmdl",
			stone_scale = 2.5,
			castle_model = "models/props_gameplay/pumpkin_bucket.vmdl",
			castle_broken_model = "",
			castle_scale = 3,
		},
		beach = {
			stone_model = "models/shop_set_seat001.vmdl",
			stone_scale = 2,
			castle_model = "models/props_generic/tent_01a.vmdl",
			castle_broken_model = "",
			castle_scale = 1.2,
		},
		snow = {
			stone_model = "materials/models/snow/snow_wall.vmdl",
			-- rgb = {
			-- 	r = 64,
			-- 	g = 64,
			-- 	b = 64,
			-- },
			stone_scale = 0.6,
			castle_model = "models/props_frostivus/frostivus_ancient/frostivus_ancient.vmdl", --"models/props_tree/frostivus_tree.vmdl",--"models/props/ice_biome/buildings/tuskhouse01.vmdl",
			castle_broken_model = "models/props_frostivus/frostivus_ancient/frostivus_ancient_destruction.vmdl",
			castle_scale = 1,
		},
		roshan = {
			stone_model = "models/props_gameplay/cheese_04.vmdl",
			stone_scale = 1.3,
			castle_model = "models/creeps/roshan/roshan.vmdl",
			castle_broken_model = "",
			castle_scale = 1.3,
		},
		greevil = {
			stone_model = "models/egg.vmdl",
			stone_scale = 2.5,
			castle_model = "models/creeps/greevil_shopkeeper/greevil_shopkeeper.vmdl",
			castle_broken_model = "",
			castle_scale = 4,
		},
		shell = {
			stone_model = "models/darkreef_shellbig_001.vmdl",
			stone_scale = 1.3,
			castle_model = "maps/reef_assets/models/props/naga_city/darkreef_naga_statue001.vmdl",
			castle_broken_model = "",
			castle_scale = 1.5,
		},
		mushroom = {
			stone_model = "models/mushroom_inkycap_04.vmdl", --没hitbox
			stone_scale = 0.6,
			castle_model = "maps/cavern_assets/models/statues/geode_radiant.vmdl",
			castle_broken_model = "",
			castle_scale = 1.0,
		},
		fishcoin = {
			stone_model = "mod/fish_coins/gold/fish_coins2g_lod0.vmdl,mod/fish_coins/gold/fish_coins3g_lod0.vmdl,mod/fish_coins/silver/fish_coins2s_lod0.vmdl,mod/fish_coins/silver/fish_coins3s_lod0.vmdl", --没hitbox
			stone_scale = 0.95,
			stone_random_forward = true,
			castle_model = "models/items/juggernaut/ward/fortunes_tout/fortunes_tout.vmdl",
			castle_broken_model = "",
			castle_scale = 3.0,
		},
	}
	_G.stealable_ability_pool = {
		"tower_slow1",
		"tower_slow2",
		"tower_slow3",
		"tower_slow4",
		"tower_slow5",
		"tower_slow6",
		"tower_speed_aura1",
		"tower_speed_aura2",
		"tower_speed_aura3",
		"tower_speed_aura4",
		"tower_speed_aura5",
		"tower_speed_aura6",
		"tower_speed_aura_guichu",
		"tower_jianshe1",
		"tower_jianshe2",
		"tower_jianshe3",
		"tower_jianshe4",
		"tower_jianshe5",
		"tower_jianshe6",
		"tower_ranjin",
		"tower_du1",
		"tower_du2",
		"tower_du3",
		"tower_du4",
		"tower_du5",
		"tower_du6",
		"tower_fenliejian",
		"tower_fenliejian_xianyan",
		"tower_jianjia1",
		"tower_jianjia2",
		"tower_jianjia3",
		"tower_jianjia4",
		"tower_jianjia5",
		"tower_jianjia6",
		"tower_huiyao",
		"tower_huiyao2",
		"tower_huiyao3",
		"tower_fenzheng",
		"tower_zheyi",
		"tower_zheyi2",
		"tower_zheyi3",
		"tower_bixi",
		"tower_bixi2",
		"tower_baoji1",
		"tower_lanbaoshi",
		"tower_jihan",
		"tower_jingzhun",
		"tower_10jiyun",
		"tower_5shihua",
		"tower_maoyan",
		"tower_jin",
		"tower_jin2",
		"tower_shandianlian",
		"tower_chazhuangshandian",
		"tower_fenliejian_you",
		"tower_chenmoguanghuan",
		"tower_lanbaoshi2",
		"tower_aojiao",
		"tower_attack1",
		"tower_attack2",
		"tower_attack3",
		"tower_attack4",
		"tower_attack5",
		"tower_attack6",
		"tower_attack7",
		"tower_speed1",
		"tower_speed2",
		"tower_chain_frost",

		"tower_shechengguanghuan",
		"tower_shihua_new",
		"tower_huichun_aura",
		"tower_tanlan",
	}
	_G.sm_hero_list = {
		h001 = "models/props_gameplay/donkey.vmdl",
		h002 = "models/props_gameplay/donkey_dire.vmdl",
		--普通信使 beginner
		h101 = "models/courier/skippy_parrot/skippy_parrot.vmdl",
		h102 = "models/courier/smeevil_mammoth/smeevil_mammoth.vmdl",
		h103 = "models/items/courier/arneyb_rabbit/arneyb_rabbit.vmdl",
		h104 = "models/items/courier/axolotl/axolotl.vmdl",
		h105 = "models/items/courier/coco_the_courageous/coco_the_courageous.vmdl",
		h106 = "models/items/courier/coral_furryfish/coral_furryfish.vmdl",
		h107 = "models/items/courier/corsair_ship/corsair_ship.vmdl",
		h108 = "models/items/courier/duskie/duskie.vmdl",
		h109 = "models/items/courier/itsy/itsy.vmdl",
		h110 = "models/items/courier/jumo/jumo.vmdl",
		h111 = "models/items/courier/mighty_chicken/mighty_chicken.vmdl",
		h112 = "models/items/courier/nexon_turtle_05_green/nexon_turtle_05_green.vmdl",
		h113 = "models/items/courier/pumpkin_courier/pumpkin_courier.vmdl",
		h114 = "models/items/courier/pw_ostrich/pw_ostrich.vmdl",
		h115 = "models/items/courier/scuttling_scotty_penguin/scuttling_scotty_penguin.vmdl",
		h116 = "models/items/courier/shagbark/shagbark.vmdl",
		h117 = "models/items/courier/snaggletooth_red_panda/snaggletooth_red_panda.vmdl",
		h118 = "models/items/courier/snail/courier_snail.vmdl",
		h119 = "models/items/courier/teron/teron.vmdl",
		h120 = "models/items/courier/xianhe_stork/xianhe_stork.vmdl",
		h121 = "models/items/courier/starladder_grillhound/starladder_grillhound.vmdl",
		h122 = "models/items/courier/pw_zombie/pw_zombie.vmdl",
		h123 = "models/items/courier/raiq/raiq.vmdl",
		h124 = "models/courier/frog/frog.vmdl",
		h125 = "models/courier/godhorse/godhorse.vmdl",
		h126 = "models/courier/imp/imp.vmdl",
		h127 = "models/courier/mighty_boar/mighty_boar.vmdl",
		h128 = "models/items/courier/onibi_lvl_03/onibi_lvl_03.vmdl",
		h129 = "models/items/courier/echo_wisp/echo_wisp.vmdl", --蠕行水母
		h130 = "models/courier/sw_donkey/sw_donkey.vmdl", --驴法师new
		h131 = "models/items/courier/gnomepig/gnomepig.vmdl", --丰臀公主new
		h132 = "models/items/furion/treant/ravenous_woodfang/ravenous_woodfang.vmdl", --焚牙树精new
		h133 = "models/courier/mechjaw/mechjaw.vmdl", --机械咬人箱new
		h134 = "models/items/courier/mole_messenger/mole_messenger.vmdl", --1级矿车老鼠
		h135 = "models/items/courier/jumo_dire/jumo_dire.vmdl",
		h136 = "models/items/courier/courier_ti9/courier_ti9.vmdl",
		h137 = "models/items/courier/courier_ti9/courier_ti9_lvl2/courier_ti9_lvl2.vmdl",
		h138 = "models/props_gameplay/donkey.vmdl",

		h199 = "models/gezi/ge.vmdl",

		--小英雄信使 ameteur
		h201 = "models/courier/doom_demihero_courier/doom_demihero_courier.vmdl",
		h202 = "models/courier/huntling/huntling.vmdl",
		h203 = "models/courier/minipudge/minipudge.vmdl",
		h204 = "models/courier/seekling/seekling.vmdl",
		h205 = "models/items/courier/baekho/baekho.vmdl",
		h206 = "models/items/courier/basim/basim.vmdl",
		h207 = "models/items/courier/devourling/devourling.vmdl",
		h208 = "models/items/courier/faceless_rex/faceless_rex.vmdl",
		h209 = "models/items/courier/tinkbot/tinkbot.vmdl",
		h210 = "models/items/courier/lilnova/lilnova.vmdl",
		h211 = "models/items/courier/amphibian_kid/amphibian_kid.vmdl",
		h212 = "models/courier/venoling/venoling.vmdl",
		h213 = "models/courier/juggernaut_dog/juggernaut_dog.vmdl",
		h214 = "models/courier/otter_dragon/otter_dragon.vmdl",
		h215 = "models/items/courier/boooofus_courier/boooofus_courier.vmdl",
		h216 = "models/courier/baby_winter_wyvern/baby_winter_wyvern.vmdl",
		h217 = "models/courier/yak/yak.vmdl",
		h218 = "models/items/furion/treant/eternalseasons_treant/eternalseasons_treant.vmdl",
		h219 = "models/items/courier/blue_lightning_horse/blue_lightning_horse.vmdl",
		h220 = "models/items/courier/waldi_the_faithful/waldi_the_faithful.vmdl",
		h221 = "models/items/courier/bajie_pig/bajie_pig.vmdl",
		h222 = "models/items/courier/courier_faun/courier_faun.vmdl",
		h223 = "models/items/courier/livery_llama_courier/livery_llama_courier.vmdl",
		h224 = "models/items/courier/onibi_lvl_10/onibi_lvl_10.vmdl",
		h225 = "models/items/courier/little_fraid_the_courier_of_simons_retribution/little_fraid_the_courier_of_simons_retribution.vmdl", --胆小南瓜人
		h226 = "models/items/courier/hermit_crab/hermit_crab.vmdl", --螃蟹1
		h227 = "models/items/courier/hermit_crab/hermit_crab_boot.vmdl", --螃蟹2
		h228 = "models/items/courier/hermit_crab/hermit_crab_shield.vmdl", --螃蟹3
		h229 = "models/courier/donkey_unicorn/donkey_unicorn.vmdl", --竭智法师new
		h230 = "models/items/courier/white_the_crystal_courier/white_the_crystal_courier.vmdl", --蓝心白隼new
		h231 = "models/items/furion/treant/furion_treant_nelum_red/furion_treant_nelum_red.vmdl", --莲花人new
		h232 = "models/courier/beetlejaws/mesh/beetlejaws.vmdl", --甲虫咬人箱new
		h233 = "models/courier/smeevil_bird/smeevil_bird.vmdl",
		h234 = "models/items/courier/mole_messenger/mole_messenger_lvl4.vmdl", --蜡烛头矿车老鼠
		h235 = "models/items/courier/chocobo/chocobo.vmdl", --迅捷陆行鸟
		h236 = "models/items/courier/flightless_dod/flightless_dod.vmdl", --嘟嘟鸟
		h237 = "models/items/courier/frostivus2018_courier_serac_the_seal/frostivus2018_courier_serac_the_seal.vmdl",
		h238 = "models/items/courier/pangolier_squire/pangolier_squire.vmdl",
		h239 = "models/hujing_wangyu/hujing.vmdl",
		h240 = "models/items/courier/courier_ti9/courier_ti9_lvl3/courier_ti9_lvl3.vmdl",
		h241 = "models/items/courier/axolotl/axolotl.vmdl",
		h242 = "models/items/courier/snaggletooth_red_panda/snaggletooth_red_panda.vmdl",
		h243 = "models/items/courier/xianhe_stork/xianhe_stork.vmdl",
		h244 = "models/hy/huya.vmdl",
		h245 = "models/daxiang/daxiang.vmdl",

		--珍藏信使 pro
		h301 = "models/items/courier/bookwyrm/bookwyrm.vmdl",
		h302 = "models/items/courier/captain_bamboo/captain_bamboo.vmdl",
		h303 = "models/items/courier/kanyu_shark/kanyu_shark.vmdl",
		h304 = "models/items/courier/tory_the_sky_guardian/tory_the_sky_guardian.vmdl",
		h305 = "models/items/courier/shroomy/shroomy.vmdl",
		h306 = "models/items/courier/courier_janjou/courier_janjou.vmdl",
		h307 = "models/items/courier/green_jade_dragon/green_jade_dragon.vmdl",
		h308 = "models/courier/drodo/drodo.vmdl",
		h309 = "models/courier/mech_donkey/mech_donkey.vmdl",
		h310 = "models/courier/donkey_crummy_wizard_2014/donkey_crummy_wizard_2014.vmdl",
		h311 = "models/courier/octopus/octopus.vmdl",
		h312 = "models/items/courier/scribbinsthescarab/scribbinsthescarab.vmdl",
		h313 = "models/courier/defense3_sheep/defense3_sheep.vmdl",
		h314 = "models/items/courier/snapjaw/snapjaw.vmdl",
		h315 = "models/items/courier/g1_courier/g1_courier.vmdl",
		h316 = "models/courier/donkey_trio/mesh/donkey_trio.vmdl",
		h317 = "models/items/courier/boris_baumhauer/boris_baumhauer.vmdl",
		h318 = "models/courier/baby_rosh/babyroshan.vmdl",
		h319 = "models/items/courier/bearzky/bearzky.vmdl",
		h320 = "models/items/courier/defense4_radiant/defense4_radiant.vmdl",
		h321 = "models/items/courier/defense4_dire/defense4_dire.vmdl",
		h322 = "models/items/courier/onibi_lvl_20/onibi_lvl_20.vmdl",
		h323 = "models/items/juggernaut/ward/fortunes_tout/fortunes_tout.vmdl", --招财猫
		h324 = "models/items/courier/hermit_crab/hermit_crab_necro.vmdl", --螃蟹4
		h325 = "models/items/courier/hermit_crab/hermit_crab_travelboot.vmdl", --螃蟹5
		h326 = "models/items/courier/hermit_crab/hermit_crab_lotus.vmdl", --螃蟹6
		h327 = "models/courier/donkey_ti7/donkey_ti7.vmdl",
		h328 = "models/items/courier/shibe_dog_cat/shibe_dog_cat.vmdl", --天猫地狗new
		h329 = "models/items/furion/treant/hallowed_horde/hallowed_horde.vmdl", --万圣树群new
		h330 = "models/courier/flopjaw/flopjaw.vmdl", --大嘴咬人箱new
		h331 = "models/courier/lockjaw/lockjaw.vmdl", --咬人箱洛克new
		h332 = "models/items/courier/butch_pudge_dog/butch_pudge_dog.vmdl", --布狗new
		h333 = "models/courier/turtle_rider/turtle_rider.vmdl",
		h334 = "models/courier/smeevil_crab/smeevil_crab.vmdl",
		h335 = "models/items/courier/mole_messenger/mole_messenger_lvl6.vmdl", --绿钻头矿车老鼠
		h336 = "models/items/courier/amaterasu/amaterasu.vmdl", --天照大神
		h337 = "models/qie/qie.vmdl",
		h338 = "models/courier/f2p_courier/f2p_courier.vmdl",
		h339 = "models/items/courier/azuremircourierfinal/azuremircourierfinal.vmdl",
		h340 = "models/items/courier/courier_ti9/courier_ti9_lvl6/courier_ti9_lvl6.vmdl",
		h341 = "models/bilibilitv/model/tv.vmdl",
		h342 = "models/courier/baby_rosh/babyroshan.vmdl",
		h343 = "models/courier/baby_rosh/babyroshan.vmdl",
		h344 = "models/courier/baby_rosh/babyroshan.vmdl",
		h345 = "models/courier/baby_winter_wyvern/baby_winter_wyvern.vmdl",
		h346 = "models/courier/beetlejaws/mesh/beetlejaws.vmdl",
		h347 = "models/courier/doom_demihero_courier/doom_demihero_courier.vmdl",
		h348 = "models/courier/huntling/huntling.vmdl",
		h349 = "models/courier/minipudge/minipudge.vmdl",
		h350 = "models/courier/seekling/seekling.vmdl",
		h351 = "models/courier/venoling/venoling.vmdl",
		h352 = "models/items/courier/axolotl/axolotl.vmdl",
		h353 = "models/items/courier/devourling/devourling.vmdl",
		h354 = "models/courier/baby_rosh/babyroshan_elemental.vmdl",
		h355 = "models/courier/baby_rosh/babyroshan_elemental.vmdl",
		h356 = "models/hujing_wangyu/hujing.vmdl",
		h357 = "models/rongyanquan/rongyanquan.vmdl",

		h398 = "models/guge/guge.vmdl",
		h397 = "models/guge/guge.vmdl",
		h399 = "models/courier/baby_rosh/babyroshan_winter18.vmdl", --姜饼肉山

		--战队信使 master
		h401 = "models/courier/navi_courier/navi_courier.vmdl",
		h402 = "models/items/courier/courier_mvp_redkita/courier_mvp_redkita.vmdl",
		h403 = "models/items/courier/ig_dragon/ig_dragon.vmdl",
		h404 = "models/items/courier/lgd_golden_skipper/lgd_golden_skipper.vmdl",
		h405 = "models/items/courier/vigilante_fox_red/vigilante_fox_red.vmdl",
		h406 = "models/items/courier/virtus_werebear_t3/virtus_werebear_t3.vmdl",
		h407 = "models/items/courier/throe/throe.vmdl",
		h408 = "models/items/courier/vaal_the_animated_constructradiant/vaal_the_animated_constructradiant.vmdl",
		h409 = "models/items/courier/vaal_the_animated_constructdire/vaal_the_animated_constructdire.vmdl",
		h410 = "models/items/courier/carty/carty.vmdl",
		h411 = "models/items/courier/carty_dire/carty_dire.vmdl",
		h412 = "models/items/courier/dc_angel/dc_angel.vmdl",
		h413 = "models/items/courier/dc_demon/dc_demon.vmdl",
		h414 = "models/items/courier/vigilante_fox_green/vigilante_fox_green.vmdl",
		h415 = "models/items/courier/bts_chirpy/bts_chirpy.vmdl",
		h416 = "models/items/courier/krobeling/krobeling.vmdl",
		h417 = "models/items/courier/jin_yin_black_fox/jin_yin_black_fox.vmdl",
		h418 = "models/items/courier/jin_yin_white_fox/jin_yin_white_fox.vmdl",
		h419 = "models/items/courier/fei_lian_blue/fei_lian_blue.vmdl",
		h420 = "models/items/courier/gama_brothers/gama_brothers.vmdl",
		h421 = "models/items/courier/onibi_lvl_21/onibi_lvl_21.vmdl",
		h422 = "models/items/courier/wabbit_the_mighty_courier_of_heroes/wabbit_the_mighty_courier_of_heroes.vmdl", --小飞侠
		h423 = "models/items/courier/hermit_crab/hermit_crab_octarine.vmdl", --螃蟹7
		h424 = "models/items/courier/hermit_crab/hermit_crab_skady.vmdl", --螃蟹8
		h425 = "models/items/courier/hermit_crab/hermit_crab_aegis.vmdl", --螃蟹9
		h426 = "models/items/furion/treant_flower_1.vmdl", --绽放树精new
		h427 = "models/courier/smeevil_magic_carpet/smeevil_magic_carpet.vmdl",
		h428 = "models/items/courier/mole_messenger/mole_messenger_lvl7.vmdl", --绿钻头金矿车老鼠
		h499 = "models/items/courier/krobeling_gold/krobeling_gold.vmdl", --金dp
		h429 = "models/items/courier/nilbog/nilbog.vmdl", --贪小疯魔
		h430 = "models/courier/frull/frull_courier.vmdl", --灵犀弗拉尔
		h431 = "models/items/courier/sltv_10_courier/sltv_10_courier.vmdl", --黄油小生
		h432 = "models/items/courier/nian_courier/nian_courier.vmdl", --年兽宝宝
		h433 = "models/courier/baby_rosh/babyroshan_ti9.vmdl",
		h434 = "models/items/courier/courier_ti9/courier_ti9_lvl7/courier_ti9_lvl7.vmdl",
		h435 = "models/shudaixiong/model/shudaixiong/shudaixiong.vmdl",
		h436 = "models/courier/baby_rosh/babyroshan.vmdl",
		h437 = "models/courier/baby_rosh/babyroshan.vmdl",
		h438 = "models/courier/baby_winter_wyvern/baby_winter_wyvern.vmdl",
		h439 = "models/courier/flopjaw/flopjaw.vmdl",
		h440 = "models/courier/juggernaut_dog/juggernaut_dog.vmdl",
		h441 = "models/courier/smeevil_crab/smeevil_crab.vmdl",
		h442 = "models/items/courier/axolotl/axolotl.vmdl",
		h443 = "models/items/courier/fei_lian_blue/fei_lian_blue.vmdl",
		h444 = "models/items/courier/wabbit_the_mighty_courier_of_heroes/wabbit_the_mighty_courier_of_heroes.vmdl",
		h445 = "models/items/courier/wabbit_the_mighty_courier_of_heroes/wabbit_the_mighty_courier_of_heroes.vmdl",
		h446 = "models/items/courier/wabbit_the_mighty_courier_of_heroes/wabbit_the_mighty_courier_of_heroes.vmdl",
		h447 = "models/jieke/jieke.vmdl",
	}

	_G.sm_hero_list_skin = {
		h138 = 1,
		h436 = 1,
		h437 = 2,
		h342 = 3,
		h343 = 4,
		h344 = 5,
		h354 = 1,
		h355 = 2,
		h345 = 1,
		h438 = 2,
		h346 = 1,
		h347 = 1,
		h348 = 1,
		h440 = 1,
		h349 = 1,
		h350 = 1,
		h441 = 1,
		h351 = 1,

		h241 = 1,
		h352 = 2,
		h442 = 3,
		h353 = 1,
		h242 = 1,
		h444 = 1,
		h445 = 2,
		h446 = 3,
		h243 = 1,
		h443 = 1,
		h439 = 1,
		h356 = 1,
		h397 = 1,
	}

	_G.sm_hero_size = {
		h001 = 1,
		h002 = 1,
		--普通信使 beginner
		h101 = 1.1,
		h102 = 1.1,
		h103 = 1.1,
		h104 = 1,
		h105 = 1,
		h106 = 1,
		h107 = 1.2,
		h108 = 1,
		h109 = 1.1,
		h110 = 1.1,
		h111 = 1.1,
		h112 = 1.2,
		h113 = 1,
		h114 = 1.2,
		h115 = 1.2,
		h116 = 1,
		h117 = 1.3,
		h118 = 1.1,
		h119 = 1.3,
		h120 = 1.3,
		h121 = 1.1,
		h122 = 1.1,
		h123 = 1.2,
		h124 = 1,
		h125 = 1,
		h126 = 1,
		h127 = 1,
		h128 = 1.1,
		h129 = 1.2, --蠕行水母
		h130 = 1, --驴法师new
		h131 = 1, --丰臀公主new
		h132 = 0.7, --焚牙树精new
		h133 = 1.1, --机械咬人箱new
		h134 = 1.1, --1级矿车老鼠
		h135 = 1.1,
		h136 = 1.1,
		h137 = 1.15,
		h138 = 1.15,

		h199 = 1.5,
		--小英雄信使 ameteur
		h201 = 1.2,
		h202 = 1.2,
		h203 = 1.2,
		h204 = 1.2,
		h205 = 1.2,
		h206 = 1.2,
		h207 = 1.2,
		h208 = 1.3,
		h209 = 1.2,
		h210 = 1.25,

		h211 = 1.2,
		h212 = 1.1,
		h213 = 1,
		h214 = 1.25,
		h215 = 1.2,
		h216 = 1.25,
		h217 = 1.2,
		h218 = 1.1,
		h219 = 1.2,
		h220 = 1.25,
		h221 = 1.25,
		h222 = 1.3,
		h223 = 1.15,
		h224 = 1.25,
		h225 = 1.3, --胆小南瓜人
		h226 = 1.3, --螃蟹1
		h227 = 1.3, --螃蟹2
		h228 = 1.2, --螃蟹3

		h229 = 1.2, --竭智法师new
		h230 = 1.3, --蓝心白隼new
		h231 = 0.8, --莲花人new
		h232 = 1.2, --甲虫咬人箱new
		h233 = 1.2,
		h234 = 1.2, --蜡烛头矿车老鼠
		h235 = 1.2, --迅捷陆行鸟
		h236 = 1.2, --嘟嘟鸟
		h237 = 1.2,
		h238 = 0.8,
		h239 = 1.4,
		h240 = 1.25,
		h241 = 1.1,
		h242 = 1.4,
		h243 = 1.4,
		h244 = 2.5,
		h245 = 0.9,

		--珍藏信使 pro
		h301 = 1.3,
		h302 = 1.3,
		h303 = 1.3,
		h304 = 1.35,
		h305 = 1.3,
		h306 = 1.3,
		h307 = 1.3,
		h308 = 1.3,
		h309 = 1.2,

		h310 = 1.2,
		h311 = 1.25,
		h312 = 1.3,
		h313 = 1.3,
		h314 = 1.3,
		h315 = 1.25,
		h316 = 1.3,
		h317 = 1.4,
		h318 = 1.3,
		h319 = 1.3,
		h320 = 1.3,
		h321 = 1.3,
		h322 = 1.3,
		h323 = 1.1, --招财猫
		h324 = 1.3, --螃蟹4
		h325 = 1.25, --螃蟹5
		h326 = 1.25, --螃蟹6
		h327 = 1.25,

		h328 = 1.3, --天猫地狗new
		h329 = 0.9, --万圣树群new
		h330 = 1.3, --大嘴咬人箱new
		h331 = 1.25, --咬人箱洛克new
		h332 = 1.3, --布狗new
		h333 = 1.3,
		h334 = 1.3,
		h335 = 1.1, --绿钻头矿车老鼠
		h336 = 1.15, --天照大神
		h337 = 1.4,
		h338 = 1.3,
		h339 = 1.4,
		h340 = 1.3,
		h341 = 2.3,
		h342 = 1.3,
		h343 = 1.3,
		h344 = 1.3,
		h354 = 1.3,
		h355 = 1.3,
		h345 = 1.35,
		h346 = 1.3,
		h347 = 1.3,
		h348 = 1.3,
		h349 = 1.3,
		h350 = 1.3,
		h351 = 1.2,
		h352 = 1.2,
		h353 = 1.3,
		h356 = 1.45,
		h357 = 1.3,

		h399 = 1.2, --姜饼肉山

		--战队信使 master
		h401 = 1.4,
		h402 = 1.4,
		h403 = 1.4,
		h404 = 1.55,
		h405 = 1.4,
		h406 = 1.5,
		h407 = 1.3,

		h408 = 1.35,
		h409 = 1.35,
		h410 = 1.3,
		h411 = 1.3,
		h412 = 1.3,
		h413 = 1.3,
		h414 = 1.4,
		h415 = 1.35,
		h416 = 1.4,
		h417 = 1.4,
		h418 = 1.4,
		h419 = 1.4,
		h420 = 1.2,
		h421 = 1.35,
		h422 = 1.4, --小飞侠
		h423 = 1.3, --螃蟹7
		h424 = 1.3, --螃蟹8
		h425 = 1.35, --螃蟹9

		h426 = 1.1, --绽放树精new
		h427 = 1.55,
		h428 = 1.2, --绿钻头金矿车老鼠

		h499 = 1.55, --金dp
		h429 = 1.3, --贪小疯魔

		h430 = 1.3, --灵犀弗拉尔
		h431 = 1.2, --黄油小生
		h432 = 1.3, --年兽宝宝
		h433 = 1.35,
		h434 = 1.4,
		h435 = 1.0,
		h438 = 1.45,
		h439 = 1.35,
		h440 = 1.2,
		h441 = 1.4,
		h442 = 1.3,
		h444 = 1.4,
		h445 = 1.4,
		h446 = 1.4,
		h443 = 1.4,
		h436 = 1.4,
		h437 = 1.4,
		h447 = 1.2,
		h398 = 1.15,
		h397 = 1.15,
	}
	_G.is_crazy = false
	_G.heroindex = {}
	_G.gem_difficulty = {
		[1] = 0.69,
		[2] = 2.91,
		[3] = 5.17,
		[4] = 7.81,
	}
	_G.gem_difficulty_speed = {
		[1] = 0.69,
		[2] = 1.01,
		[3] = 1.19,
		[4] = 1.42,
	}
	_G.gem_difficulty_race = 1.32
	_G.gem_difficulty_speed_race = 0.55

	_G.gem_path_show = {}
	_G.table_bubbles = {}
	_G.gem_boss_damage_all = 0
	_G.kills = 0
	_G.default_stone = {
		[1] = {
			[1] = { x = 1, y = 19 },
			[2] = { x = 2, y = 19 },
			[3] = { x = 3, y = 19 },
			[4] = { x = 4, y = 19 },
			[5] = { x = 37, y = 19 },
			[6] = { x = 36, y = 19 },
			[7] = { x = 35, y = 19 },
			[8] = { x = 34, y = 19 },
			[9] = { x = 19, y = 1 },
			[10] = { x = 19, y = 2 },
			[11] = { x = 19, y = 3 },
			[12] = { x = 19, y = 4 },
			[13] = { x = 19, y = 37 },
			[14] = { x = 19, y = 36 },
			[15] = { x = 19, y = 35 },
			[16] = { x = 19, y = 34 },
			[17] = { x = 6, y = 19 },
			[18] = { x = 7, y = 19 },
			[19] = { x = 8, y = 19 },
			[20] = { x = 9, y = 19 },
			[21] = { x = 32, y = 19 },
			[22] = { x = 31, y = 19 },
			[23] = { x = 30, y = 19 },
			[24] = { x = 29, y = 19 },
			[25] = { x = 19, y = 6 },
			[26] = { x = 19, y = 7 },
			[27] = { x = 19, y = 8 },
			[28] = { x = 19, y = 9 },
			[29] = { x = 19, y = 32 },
			[30] = { x = 19, y = 31 },
			[31] = { x = 19, y = 30 },
			[32] = { x = 19, y = 29 },
		},
		[2] = {
			[1] = { x = 1, y = 19 },
			[2] = { x = 2, y = 19 },
			[3] = { x = 3, y = 19 },
			[4] = { x = 4, y = 19 },
			[5] = { x = 37, y = 19 },
			[6] = { x = 36, y = 19 },
			[7] = { x = 35, y = 19 },
			[8] = { x = 34, y = 19 },
			[9] = { x = 19, y = 1 },
			[10] = { x = 19, y = 2 },
			[11] = { x = 19, y = 3 },
			[12] = { x = 19, y = 4 },
			[13] = { x = 19, y = 37 },
			[14] = { x = 19, y = 36 },
			[15] = { x = 19, y = 35 },
			[16] = { x = 19, y = 34 },
		},
		[3] = {
			[1] = { x = 1, y = 19 },
			[2] = { x = 2, y = 19 },
			[3] = { x = 37, y = 19 },
			[4] = { x = 36, y = 19 },
			[5] = { x = 19, y = 1 },
			[6] = { x = 19, y = 2 },
			[7] = { x = 19, y = 37 },
			[8] = { x = 19, y = 36 },
		},
		[4] = {},
	}
	_G.default_stone_race = {}
	_G.is_default_builded = false
	_G.gem_nandu = 0
	_G.is_debug = false
	_G.gem_path = {
		{},
		{},
		{},
		{},
		{},
		{},
	}
	_G.gem_path_race = {
		[0] = { {}, {}, {}, {}, {}, {} },
		[1] = { {}, {}, {}, {}, {}, {} },
		[2] = { {}, {}, {}, {}, {}, {} },
		[3] = { {}, {}, {}, {}, {}, {} },
	}

	_G.gem_path_all = {}
	_G.gem_path_all_race = { {}, {}, {}, {} }
	_G.game_status = 0 --0 = 准备时间, 1 = 建造时间, 2 = 刷怪时间
	_G.gem_is_shuaguaiing = false
	_G.guai_count = 10
	_G.guai_count_speed = { 10, 10, 10, 10 }
	_G.guai_live_count = 0
	_G.guai_live_count_speed = { 0, 0, 0, 0 }

	_G.gem_player_count = 0
	_G.gem_hero_count = 0
	_G.gem_maze_length = 0
	_G.gem_maze_length_race = {
		[0] = 0,
		[1] = 0,
		[2] = 0,
		[3] = 0,
	}
	_G.team_gold = 0
	_G.team_gold_race = {
		[0] = 0,
		[1] = 0,
		[2] = 0,
		[3] = 0,
	}
	_G.gem_swap = {}
	_G.is_passed = false
	_G.is_cheat = false
	_G.check_cheat_interval = 5
	_G.max_xy = 40
	_G.max_grids = _G.max_xy * _G.max_xy
	_G.random_seed_levels = 1
	_G.online_player_count = 0
	_G.connect_full_player_count = 0
	_G.is_server_game_started = false
	_G.guai = {
		[1] = "gemtd_kuangbaoyezhu",
		[2] = "gemtd_kuaidiqingwatiaotiao",
		[3] = "gemtd_zhongchenggaoshanmaoniu",
		[4] = "gemtd_moluokedejixiezhushou",
		[5] = "gemtd_wuweizhihuan_fly",
		[105] = "gemtd_xiaohongmao_fly",
		[6] = "gemtd_shudunziranzhizhu",
		[7] = "gemtd_chaomengjuxi",
		[8] = "gemtd_mengzhu",
		[9] = "gemtd_dashiqi",
		[10] = "gemtd_buquzhanquan_boss",
		[11] = "gemtd_maorongrongdefeiyangyang",
		[12] = "gemtd_caonimalama",
		[13] = "gemtd_fengtungongzhu",
		[14] = "gemtd_bugou",
		[15] = "gemtd_banzhuduizhang_fly",
		[115] = "gemtd_tianmaodigou_fly",
		[16] = "gemtd_xunjiemotong",
		[17] = "gemtd_yonggandexiaoji",
		[18] = "gemtd_xiaobajie",
		[19] = "gemtd_shentu",
		[119] = "gemtd_yaobaidelvgemi",
		-- [20] = "gemtd_kongxinnanguaren_boss",
		[20] = "gemtd_huxiaotao_boss",
		[21] = "gemtd_siwangsiliezhe",
		[121] = "gemtd_xiexiaowo",
		[22] = "gemtd_yaorenxiangluoke",
		[23] = "gemtd_tiezuiyaorenxiang",
		[123] = "gemtd_dazuiyaorenxiang",
		[24] = "gemtd_jixieyaorenxiang",
		[124] = "gemtd_jixiezhanlv",
		[25] = "gemtd_fengbaozhizikesaier_fly",
		[125] = "gemtd_huoxingche_fly",
		[26] = "gemtd_niepanhuolieniao",
		[27] = "gemtd_lgddejinmengmeng_fly",
		[127] = "gemtd_ruxingshuimu_fly",
		[28] = "gemtd_youniekesizhinu_fly",
		[128] = "gemtd_xiaofamuji_fly",
		[29] = "gemtd_feihuxia_fly",
		[129] = "gemtd_yingwuchuanfu_fly",
		[30] = "gemtd_mofafeitanxiaoemo_boss_fly",
		-- [30] = "gemtd_nianshou_boss_fly",
		[31] = "gemtd_modianxiaolong",
		[131] = "gemtd_talongaosiji",
		[32] = "gemtd_xiaoshayu",
		[33] = "gemtd_feijiangxiaobao",
		[133] = "gemtd_siwangxianzhi",
		[34] = "gemtd_shangjinbaobao_fly",
		[134] = "gemtd_xuemobaobao_fly",
		[35] = "gemtd_jinyinhuling_fly",
		[36] = "gemtd_cuihua",
		[37] = "gemtd_xiaobaihu",
		[38] = "gemtd_xiaoxingyue",
		[39] = "gemtd_liangqiyuhai_fly",
		[139] = "gemtd_fennenrongyuan_fly",
		-- [40] = "gemtd_nanguaren_boss_fly",
		[40] = "gemtd_guixiaoxieling_boss_fly",

		[41] = "gemtd_weilanlong",
		[141] = "gemtd_cuiyuxiaolong",
		[42] = "gemtd_saodiekupu_fly",
		[43] = "gemtd_maomaoyu",
		[44] = "gemtd_xiaomogu",
		[45] = "gemtd_jiujiu_fly",
		--[46] = "gemtd_juniaoduoduo_tester"
		[46] = "gemtd_siwangxintu",
		[47] = "gemtd_jilamofashi",
		[147] = "gemtd_xunjieyuanzumaolv",
		[48] = "gemtd_xiaofeixia_fly",
		[148] = "gemtd_jiwanghaidao_fly",
		[49] = "gemtd_juniaoduoduo",
		[50] = "gemtd_roushan_boss_fly",
	}
	_G.guai_ability = {
		[1] = {},
		[2] = {},
		[3] = {},
		[4] = {},
		[5] = {},
		[6] = {},
		[7] = {},
		[8] = {},
		[9] = { "guai_shanbi" },
		[10] = {},
		[11] = {},
		[12] = { "guai_jiaoxieguanghuan" },
		[13] = {},
		[14] = { "enemy_zheguang" },
		[15] = {},
		[16] = {},
		[17] = { "enemy_bukeqinfan" },
		[18] = { "guai_jiaoxieguanghuan" },
		[19] = { "runrunrun" },
		[20] = {},
		[21] = {},
		[22] = { "enemy_high_armor" },
		[23] = { "enemy_zheguang" },
		[24] = { "mars_bulwark" },
		[25] = { "enemy_high_armor" },
		[26] = {},
		[27] = { "enemy_bukeqinfan" },
		[28] = { "mars_bulwark" },
		[29] = { "guai_shanbi", "enemy_zheguang" },
		[30] = {},
		[31] = { "enemy_zheguang" },
		[32] = { "enemy_recharge" },
		[33] = { "enemy_shanshuo" },
		[34] = { "guai_shanbi" },
		[35] = {},
		[36] = {},
		[37] = { "enemy_shanshuo" },
		[38] = {},
		[39] = { "enemy_bukeqinfan", "tidehunter_blubber", "guai_shanbi" },
		[40] = { "tidehunter_blubber" },
		[41] = { "enemy_high_armor" },
		[42] = { "runrunrun" },
		[43] = { "enemy_bukeqinfan", "guai_shanbi", "enemy_recharge" },
		[44] = { "enemy_shanshuo" },
		[45] = { "guai_jiaoxieguanghuan" },
		[46] = {},
		[47] = { "enemy_bukeqinfan", "runrunrun" },
		[48] = { "guai_jiaoxieguanghuan", "guai_shanbi" },
		[49] = { "tidehunter_blubber", "enemy_recharge" },
		[50] = { "tidehunter_blubber" },
	}
	_G.guai_50_ability = {
		"enemy_bukeqinfan",
		"guai_shanbi",
		"guai_jiaoxieguanghuan",
		"tidehunter_blubber",
		"enemy_wumian",
		"enemy_momian",
		"enemy_zheguang",
		"enemy_shanshuo",
		"runrunrun",
		"enemy_thief",
		"enemy_high_armor",
		"enemy_jili",
		"mars_bulwark",
	}

	--精英BOSS列表
	_G.boss_update_list = {
		gemtd_buquzhanquan_boss = {
			[1] = "gemtd_junma_boss",
		},
		gemtd_huxiaotao_boss = {
			[1] = "gemtd_yuediyang_boss",
			[2] = "gemtd_kongxinnanguaren_boss",
		},
		gemtd_mofafeitanxiaoemo_boss_fly = {
			[1] = "gemtd_zard_boss_fly",
			[2] = "gemtd_crab_smeevil_fly",
			[3] = "gemtd_nianshou_boss_fly",
		},
		gemtd_guixiaoxieling_boss_fly = {
			[1] = "gemtd_gugubiao_boss_fly",
			[2] = "gemtd_nanguaren_boss_fly",
		},
		gemtd_roushan_boss_fly = {
			[1] = "gemtd_roushan_boss_fly_jin",
			[2] = "gemtd_roushan_boss_fly_bojin",
			[3] = "gemtd_roushan_boss_fly_huangsha",
			[4] = "gemtd_roushan_boss_fly_jiangbing",
		},
	}

	_G.shiban_ability_list = {
		gemtd_youbushiban = "new_youbu1",
		gemtd_youbushiban_yin = "new_youbu2",
		gemtd_youbushiban_jin = "new_youbu3",
		gemtd_zhangqishiban = "new_venomous_gale",
		gemtd_zhangqishiban_yin = "new_venomous_gale2",
		gemtd_zhangqishiban_jin = "new_venomous_gale3",
		gemtd_hongliushiban = "new_torrent",
		gemtd_hongliushiban_yin = "new_torrent2",
		gemtd_hongliushiban_jin = "new_torrent3",
		gemtd_haojiaoshiban = "new_haojiao",
		gemtd_haojiaoshiban_yin = "new_haojiao2",
		gemtd_haojiaoshiban_jin = "new_haojiao3",
		gemtd_suanwushiban = "new_acid_spray",
		gemtd_suanwushiban_yin = "new_acid_spray2",
		gemtd_suanwushiban_jin = "new_acid_spray3",
		gemtd_mabishiban = "new_cask",
		gemtd_mabishiban_yin = "new_cask2",
		gemtd_mabishiban_jin = "new_cask3",
		gemtd_kongheshiban = "new_konghe",
		gemtd_kongheshiban_yin = "new_konghe2",
		gemtd_kongheshiban_jin = "new_konghe3",
		gemtd_xuwushiban = "new_xuwu",
		gemtd_xuwushiban_yin = "new_xuwu2",
		gemtd_xuwushiban_jin = "new_xuwu3",
	}
	--合成配方
	_G.gemtd_merge = {
		--初级塔
		gemtd_baiyin = { "gemtd_b1", "gemtd_y1", "gemtd_d1" },
		gemtd_kongqueshi = { "gemtd_e1", "gemtd_q1", "gemtd_g1" },
		gemtd_xingcaihongbaoshi = { "gemtd_r11", "gemtd_r1", "gemtd_p1" },
		gemtd_yu = { "gemtd_g111", "gemtd_e111", "gemtd_b11" },
		gemtd_furongshi = { "gemtd_g1111", "gemtd_r111", "gemtd_p11" },

		--中级塔
		gemtd_heianfeicui = { "gemtd_g11111", "gemtd_b1111", "gemtd_y11" },
		gemtd_huangcailanbaoshi = { "gemtd_b11111", "gemtd_y1111", "gemtd_r1111" },
		gemtd_palayibabixi = { "gemtd_q11111", "gemtd_e1111", "gemtd_g11" },
		gemtd_heisemaoyanshi = { "gemtd_e11111", "gemtd_d1111", "gemtd_q111" },
		gemtd_jin = { "gemtd_p11111", "gemtd_p1111", "gemtd_d11" },
		gemtd_fenhongzuanshi = { "gemtd_d11111", "gemtd_y111", "gemtd_d111" },
		gemtd_jixueshi = { "gemtd_r11111", "gemtd_q1111", "gemtd_p111" },
		gemtd_you238 = { "gemtd_y11111", "gemtd_e11", "gemtd_b111" },
		gemtd_baiyinqishi = { "gemtd_baiyin", "gemtd_q11", "gemtd_r111" },
		gemtd_xianyandekongqueshi = { "gemtd_kongqueshi", "gemtd_d11", "gemtd_y111" },
		gemtd_xuehonghuoshan = { "gemtd_xingcaihongbaoshi", "gemtd_r1111", "gemtd_p111" },
		gemtd_shenhaizhenzhu = { "gemtd_q1111", "gemtd_d1111", "gemtd_e11" },
		gemtd_haiyangqingyu = { "gemtd_yu", "gemtd_b1111", "gemtd_q111" },

		--高级塔
		gemtd_jixiangdezhongguoyu = { "gemtd_yu", "gemtd_furongshi", "gemtd_g111" },
		gemtd_juxingfenhongzuanshi = { "gemtd_fenhongzuanshi", "gemtd_baiyinqishi", "gemtd_baiyin" },
		gemtd_you235 = { "gemtd_you238", "gemtd_xianyandekongqueshi", "gemtd_kongqueshi" },
		gemtd_jingxindiaozhuodepalayibabixi = { "gemtd_palayibabixi", "gemtd_heianfeicui", "gemtd_g11" },
		gemtd_gudaidejixueshi = { "gemtd_jixueshi", "gemtd_xuehonghuoshan", "gemtd_r11" },
		gemtd_mirendeqingjinshi = { "gemtd_furongshi", "gemtd_p1111", "gemtd_y11" },
		gemtd_aijijin = { "gemtd_jin", "gemtd_p11111", "gemtd_q11" },
		gemtd_hongshanhu = { "gemtd_heisemaoyanshi", "gemtd_shenhaizhenzhu", "gemtd_e1111" },
		gemtd_feicuimoxiang = { "gemtd_jin", "gemtd_heianfeicui", "gemtd_d111" },
		gemtd_huaguoshanxiandan = { "gemtd_haiyangqingyu", "gemtd_g1111", "gemtd_p11" },
		gemtd_tianranzumulv = { "gemtd_shenhaizhenzhu", "gemtd_g11111", "gemtd_d111" },
		gemtd_haibao = { "gemtd_huangcailanbaoshi", "gemtd_jixueshi", "gemtd_b11111" },

		--超级塔
		gemtd_keyinuoerguangmingzhishan = { "gemtd_juxingfenhongzuanshi", "gemtd_p111111", "gemtd_d111111" },
		gemtd_shuaibiankaipayou = { "gemtd_you235", "gemtd_q111111", "gemtd_y111111" },
		gemtd_heiwangzihuangguanhongbaoshi = { "gemtd_gudaidejixueshi", "gemtd_r111111", "gemtd_g111111" },
		gemtd_xingguanglanbaoshi = { "gemtd_huangcailanbaoshi", "gemtd_b111111", "gemtd_e111111" },
		gemtd_yijiazhishi = { "gemtd_hongshanhu", "gemtd_e111111", "gemtd_q111111" },
		gemtd_huguoshenyishi = { "gemtd_mirendeqingjinshi", "gemtd_y111111", "gemtd_r111111" },
		gemtd_jingangshikulinan = { "gemtd_huaguoshanxiandan", "gemtd_d111111", "gemtd_b111111" },
		gemtd_sililankazhixing = { "gemtd_jingxindiaozhuodepalayibabixi", "gemtd_g111111", "gemtd_p111111" },
	}
	_G.gemtd_merge_secret = {
		--8个home
		gemtd_keyinuoerguangmingzhishan = { "gemtd_p1", "gemtd_p11", "gemtd_p111", "gemtd_p1111", "gemtd_p11111" },
		gemtd_shuaibiankaipayou = { "gemtd_q1", "gemtd_q11", "gemtd_q111", "gemtd_q1111", "gemtd_q11111" },
		gemtd_heiwangzihuangguanhongbaoshi = { "gemtd_r1", "gemtd_r11", "gemtd_r111", "gemtd_r1111", "gemtd_r11111" },
		gemtd_xingguanglanbaoshi = { "gemtd_b1", "gemtd_b11", "gemtd_b111", "gemtd_b1111", "gemtd_b11111" },
		gemtd_yijiazhishi = { "gemtd_e1", "gemtd_e11", "gemtd_e111", "gemtd_e1111", "gemtd_e11111" },
		gemtd_huguoshenyishi = { "gemtd_y1", "gemtd_y11", "gemtd_y111", "gemtd_y1111", "gemtd_y11111" },
		gemtd_jingangshikulinan = { "gemtd_d1", "gemtd_d11", "gemtd_d111", "gemtd_d1111", "gemtd_d11111" },
		gemtd_sililankazhixing = { "gemtd_g1", "gemtd_g11", "gemtd_g111", "gemtd_g1111", "gemtd_g11111" },
		--其他
		gemtd_heiyaoshi = { "gemtd_b11111", "gemtd_y11111", "gemtd_d11111" },
		gemtd_manao = { "gemtd_q11111", "gemtd_e11111", "gemtd_g11111" },
		gemtd_xiameishi = { "gemtd_r11111", "gemtd_g11111", "gemtd_b11111" },
		gemtd_ranshaozhishi = { "gemtd_r11111", "gemtd_p11111", "gemtd_r1111", "gemtd_p1111" },
		gemtd_geluanshi = { "gemtd_b11111", "gemtd_g11111", "gemtd_b1111", "gemtd_g1111" },
	}
	_G.gemtd_merge_shiban = {
		gemtd_youbushiban = { "gemtd_y111", "gemtd_d11" }, --诱捕石板√ 单控
		gemtd_zhangqishiban = { "gemtd_g111", "gemtd_e11" }, --瘴气石板√ 群减速
		gemtd_hongliushiban = { "gemtd_b111", "gemtd_q11" }, --洪流石板√ 群控群减速
		gemtd_haojiaoshiban = { "gemtd_p111", "gemtd_r11" }, --嗥叫石板√ 加塔攻击力
		gemtd_suanwushiban = { "gemtd_q111", "gemtd_y11" }, --酸雾石板√ 减怪护甲
		gemtd_mabishiban = { "gemtd_r111", "gemtd_g11" }, --麻痹石板√ 群控
		gemtd_kongheshiban = { "gemtd_d111", "gemtd_p11" }, --恐吓石板 加速加伤害
		gemtd_xuwushiban = { "gemtd_e111", "gemtd_b11" }, --虚无石板 减速加魔法伤害
	}
	_G.gemtd_merge_shiban_update = {
		gemtd_youbushiban = "gemtd_youbushiban_yin",
		gemtd_zhangqishiban = "gemtd_zhangqishiban_yin",
		gemtd_hongliushiban = "gemtd_hongliushiban_yin",
		gemtd_haojiaoshiban = "gemtd_haojiaoshiban_yin",
		gemtd_suanwushiban = "gemtd_suanwushiban_yin",
		gemtd_mabishiban = "gemtd_mabishiban_yin",
		gemtd_kongheshiban = "gemtd_kongheshiban_yin",
		gemtd_xuwushiban = "gemtd_xuwushiban_yin",
		gemtd_youbushiban_yin = "gemtd_youbushiban_jin",
		gemtd_zhangqishiban_yin = "gemtd_zhangqishiban_jin",
		gemtd_hongliushiban_yin = "gemtd_hongliushiban_jin",
		gemtd_haojiaoshiban_yin = "gemtd_haojiaoshiban_jin",
		gemtd_suanwushiban_yin = "gemtd_suanwushiban_jin",
		gemtd_mabishiban_yin = "gemtd_mabishiban_jin",
		gemtd_kongheshiban_yin = "gemtd_kongheshiban_jin",
		gemtd_xuwushiban_yin = "gemtd_xuwushiban_jin",
	}
	_G.gem_gailv = {
		[1] = {},
		[2] = { [80] = "11" },
		[3] = { [60] = "11", [90] = "111" },
		[4] = { [40] = "11", [70] = "111", [90] = "1111" },
		[5] = { [10] = "11", [40] = "111", [70] = "1111", [90] = "11111" },
	}
	_G.gem_tower_basic = {
		[1] = "gemtd_b",
		[2] = "gemtd_d",
		[3] = "gemtd_q",
		[4] = "gemtd_e",
		[5] = "gemtd_g",
		[6] = "gemtd_y",
		[7] = "gemtd_r",
		[8] = "gemtd_p",
	}
	_G.pray_gailv = {
		[1] = 40,
		[2] = 55,
		[3] = 65,
		[4] = 70,
	}
	_G.build_index = {
		[0] = 0,
		[1] = 0,
		[2] = 0,
		[3] = 0,
	}

	_G.replced = {
		[0] = false,
		[1] = false,
		[2] = false,
		[3] = false,
	}
	_G.offset_maze = {
		[0] = { x = 0, y = 20 },
		[1] = { x = 20, y = 20 },
		[2] = { x = 0, y = 0 },
		[3] = { x = 20, y = 0 },
	}
	--创建宝石城堡
	_G.gem_castle_hp = 100
	_G.gem_castle_hp_max = 100
	_G.gem_castle_hp_race = { [0] = 100, [1] = 100, [2] = 100, [3] = 100 }
	_G.gem_castle = nil
	_G.gem_castle_race = { [0] = nil, [1] = nil, [2] = nil, [3] = nil }
	_G.is_precache_finished = {
		[0] = false,
		[1] = false,
		[2] = false,
		[3] = false,
	}
	local u = CreateUnitByName(
		"gemtd_castle",
		Entities:FindByName(nil, "path7"):GetAbsOrigin(),
		false,
		nil,
		nil,
		DOTA_TEAM_GOODGUYS
	)
	u.ftd = 2009
	u:AddAbility("no_hp_bar")
	u:FindAbilityByName("no_hp_bar"):SetLevel(1)
	u:RemoveModifierByName("modifier_invulnerable")
	u:SetHullRadius(1)
	u:SetForwardVector(Vector(-1, 0, 0))
	_G.gem_castle = u

	_G.guwu_enemy_count = 0

	if GetMapName() == "gemtd_race" then
		_G.gem_castle_race[0] = u

		local u = CreateUnitByName(
			"gemtd_castle",
			Entities:FindByName(nil, "path17"):GetAbsOrigin(),
			false,
			nil,
			nil,
			DOTA_TEAM_GOODGUYS
		)
		u.ftd = 2009
		u:AddAbility("no_hp_bar")
		u:FindAbilityByName("no_hp_bar"):SetLevel(1)
		u:RemoveModifierByName("modifier_invulnerable")
		u:SetHullRadius(1)
		u:SetForwardVector(Vector(-1, 0, 0))
		_G.gem_castle_race[1] = u

		local u = CreateUnitByName(
			"gemtd_castle",
			Entities:FindByName(nil, "path27"):GetAbsOrigin(),
			false,
			nil,
			nil,
			DOTA_TEAM_GOODGUYS
		)
		u.ftd = 2009
		u:AddAbility("no_hp_bar")
		u:FindAbilityByName("no_hp_bar"):SetLevel(1)
		u:RemoveModifierByName("modifier_invulnerable")
		u:SetHullRadius(1)
		u:SetForwardVector(Vector(-1, 0, 0))
		_G.gem_castle_race[2] = u

		local u = CreateUnitByName(
			"gemtd_castle",
			Entities:FindByName(nil, "path37"):GetAbsOrigin(),
			false,
			nil,
			nil,
			DOTA_TEAM_GOODGUYS
		)
		u.ftd = 2009
		u:AddAbility("no_hp_bar")
		u:FindAbilityByName("no_hp_bar"):SetLevel(1)
		u:RemoveModifierByName("modifier_invulnerable")
		u:SetHullRadius(1)
		u:SetForwardVector(Vector(-1, 0, 0))
		_G.gem_castle_race[3] = u
	end

	_G.maze_race0 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	_G.maze_race1 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0 },
		{ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0 },
		{ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0 },
		{ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	_G.maze_race2 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 },
		{ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0 },
		{ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0 },
		{ 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0 },
		{ 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0 },
		{ 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	_G.maze_race3 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0 },
		{ 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0 },
		{ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
	}

	_G.maze_coop0 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	_G.maze_coop1 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	-- _G.maze_coop1 = {
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- 	{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
	-- }
	_G.maze_coop2 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 },
		{ 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	_G.maze_coop3 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	_G.maze_coop4 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1 },
		{ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	_G.maze_coop5 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	_G.maze_coop6 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	_G.maze_coop7 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1 },
		{ 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
	_G.maze_coop8 = {
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
		{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
	}
end
function DetectCheatsThinker()
	if _G.myself ~= true and (GameRules:IsCheatMode() == true or Convars:GetBool("sv_cheats")) then
		zuobi()
		return nil
	end
	return _G.check_cheat_interval
end
--辅助功能——作弊提示
function zuobi()
	GameRules:SendCustomMessage("#text_cheat_detected", 0, 0)
	GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
	_G.is_cheat = true
end
--初始化2
function GemTD:InitGameMode()
	AMHCInit()

	Convars:RegisterCommand("drop_money", function(...)
		return self._GoldDropConsoleCommand(...)
	end, "Spawn a gold bag.", FCVAR_CHEAT)

	GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_GOODGUYS, 4)
	if GetMapName() == "gemtd_1p" then
		GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_GOODGUYS, 1)
	end
	InitVaribles()
	--设置玩家颜色
	PlayerResource:SetCustomPlayerColor(0, 255, 255, 0)
	PlayerResource:SetCustomPlayerColor(1, 64, 64, 255)
	PlayerResource:SetCustomPlayerColor(2, 255, 0, 0)
	PlayerResource:SetCustomPlayerColor(3, 255, 0, 255)

	--监听玩家成功连入游戏
	ListenToGameEvent("player_connect_full", Dynamic_Wrap(GemTD, "OnPlayerConnectFull"), self)
	--监听玩家断开连接
	ListenToGameEvent("player_disconnect", Dynamic_Wrap(GemTD, "OnPlayerDisconnect"), self)
	--监听玩家重新连接
	ListenToGameEvent("player_reconnected", Dynamic_Wrap(GemTD, "OnPlayerReconnected"), self)
	--监听玩家选择英雄事件
	ListenToGameEvent("dota_player_pick_hero", Dynamic_Wrap(GemTD, "OnPlayerPickHero"), self)
	--监听单位出生事件
	ListenToGameEvent("npc_spawned", Dynamic_Wrap(GemTD, "OnNPCSpawned"), self)
	--监听单位被击杀的事件
	ListenToGameEvent("entity_killed", Dynamic_Wrap(GemTD, "OnEntityKilled"), self)
	--监听玩家聊天事件
	ListenToGameEvent("player_chat", Dynamic_Wrap(GemTD, "OnPlayerSay"), self)
	--监听英雄升级事件
	ListenToGameEvent("dota_player_gained_level", Dynamic_Wrap(GemTD, "OnPlayerGainedLevel"), self)
	--ListenToGameEvent("dota_player_used_ability", Dynamic_Wrap(GemTD,"OnPlayerUseAbility"), self)

	ListenToGameEvent("dota_item_purchased", Dynamic_Wrap(GemTD, "OnItemPurchased"), self)

	CustomGameEventManager:RegisterListener("gather_steam_ids", Dynamic_Wrap(GemTD, "OnReceiveSteamIDs"))
	CustomGameEventManager:RegisterListener("player_share_map", Dynamic_Wrap(GemTD, "OnReceiveShareMap"))
	CustomGameEventManager:RegisterListener("gemtd_hero", Dynamic_Wrap(GemTD, "OnReceiveHeroInfo"))
	CustomGameEventManager:RegisterListener("gemtd_repick_hero", Dynamic_Wrap(GemTD, "OnRepickHero"))
	CustomGameEventManager:RegisterListener("lobster2", Dynamic_Wrap(GemTD, "OnLobster2"))
	CustomGameEventManager:RegisterListener("click_ggsimida", Dynamic_Wrap(GemTD, "OnGGsimida"))
	--结束面板(panel_end_game)的“退出游戏”按钮：直接判定游戏结束，不再重复结算
	CustomGameEventManager:RegisterListener("end_game_exit", Dynamic_Wrap(GemTD, "OnEndGameExit"))
	--贝壳商店：store_link_img 的扫码二维码
	CustomGameEventManager:RegisterListener("request_qr_code", Dynamic_Wrap(GemTD, "OnRequestQRCode"))
	CustomGameEventManager:RegisterListener("catch_crab", Dynamic_Wrap(GemTD, "OnCatchCrab"))
	CustomGameEventManager:RegisterListener("preview_effect", Dynamic_Wrap(GemTD, "OnPreviewEffect"))
	CustomGameEventManager:RegisterListener(
		"click_maze_guide_panel_coop",
		Dynamic_Wrap(GemTD, "OnClickMazeGuidePanelCOOP")
	)
	CustomGameEventManager:RegisterListener(
		"click_maze_guide_panel_race",
		Dynamic_Wrap(GemTD, "OnClickMazeGuidePanelRACE")
	)
	CustomGameEventManager:RegisterListener("save_maze", Dynamic_Wrap(GemTD, "OnSaveMaze"))
	CustomGameEventManager:RegisterListener("prt", Dynamic_Wrap(GemTD, "OnPrt"))
	CustomGameEventManager:RegisterListener("add_bush_ticket", Dynamic_Wrap(GemTD, "OnAddBushTicket"))
	CustomGameEventManager:RegisterListener("add_night_ticket", Dynamic_Wrap(GemTD, "OnAddNightTicket"))
	CustomGameEventManager:RegisterListener("confirm_use_bush_ticket", Dynamic_Wrap(GemTD, "OnConfirmUseBushTicket"))
	CustomGameEventManager:RegisterListener("confirm_use_night_ticket", Dynamic_Wrap(GemTD, "OnConfirmUseNightTicket"))
	CustomGameEventManager:RegisterListener("prt_localize", Dynamic_Wrap(GemTD, "OnPrtLocalize"))
	CustomGameEventManager:RegisterListener("request_pause_game", Dynamic_Wrap(GemTD, "OnPauseGame"))

	GameRules:GetGameModeEntity():SetDamageFilter(Dynamic_Wrap(GemTD, "DamageFilter"), GemTD)
	-- GameRules:GetGameModeEntity():SetHealingFilter(Dynamic_Wrap(GemTD, "HealingFilter"), GemTD)
	-- GameRules:GetGameModeEntity():SetExecuteOrderFilter(Dynamic_Wrap(GemTD, 'ExecuteOrderFilter'), GemTD )
end

function GemTD:OnPrt(keys)
	prt("PLAYER " .. keys.player_id .. " : " .. keys.text)
end

--玩家连入游戏/重连
function GemTD:OnPlayerReconnected(keys)
	--重连的玩家
	local hero = _G.playerid2hero[keys.PlayerID]
	if hero == nil or hero:IsNull() == true then
		return
	end
	hero:RemoveAbility("silence_self")
	hero:RemoveModifierByName("modifier_tower_chenmo")

	if
		_G.game_state == 1
		and hero:FindAbilityByName("gemtd_build_stone"):IsActivated() == false
		and hero.build_level ~= _G.level
	then
		_G.is_build_ready[keys.PlayerID] = false

		hero:FindAbilityByName("gemtd_build_stone"):SetActivated(true)
		hero:FindAbilityByName("gemtd_remove"):SetActivated(true)

		hero.build_level = _G.level

		hero:SetMana(5.0)
	end

	if _G.is_debug == true then
		-- GameRules:SendCustomMessage("PlayerID="..keys.PlayerID.." 的玩家是断线重连的。", 0, 0)
	end

	--同步玩家金钱
	sync_player_gold(caster)

	--重连
	CustomNetTables:SetTableValue("game_state", "reconnect", { hehe = RandomInt(1, 10000) })
	show_maze_guide(keys.PlayerID, _G.usermaze[keys.PlayerID])

	if _G.word_object ~= nil then
		CustomGameEventManager:Send_ServerToAllClients("show_words", {
			name = _G.word_object["name"],
			expire = _G.word_object["expire"],
			word_next = _G.word_object["word_next"],
			hehe = RandomInt(1, 10000),
		})
	end
end

function concat_table_str(table)
	local str = ""
	for i, v in pairs(table) do
		str = str .. "key->" .. i .. " val->" .. v .. ","
	end
	return str
end
--玩家断开连接
function GemTD:OnPlayerDisconnect(keys)
	if keys.PlayerID == nil then
		return
	end
	CustomNetTables:SetTableValue(
		"game_state",
		"player_disconnect",
		{ id = keys.PlayerID, user_name = keys.name, hehe = RandomInt(1, 10000) }
	)
	_G.online_player_count = _G.online_player_count - 1
	if _G.is_debug == true then
		GameRules:SendCustomMessage("当前玩家总数: " .. _G.online_player_count, 0, 0)
	end
	local hero = _G.playerid2hero[keys.PlayerID]
	if hero == nil or hero:IsNull() == true then
		return
	end
	hero:AddAbility("silence_self")
	hero:FindAbilityByName("silence_self"):SetLevel(1)
	if _G.gem_castle_hp_race[keys.PlayerID] > 0 then
		_G.zaotui_table[keys.PlayerID] = 1
	end
	-- GameRules:SendCustomMessage(concat_table_str(_G.zaotui_table),0,0)

	if _G.dumiao_id ~= nil and keys.PlayerID == _G.dumiao_id and GetMapName() == "gemtd_race" then
		GemTD:OnGGsimida({
			player_id = _G.dumiao_id,
		})
	end
end

--游戏流程4——装扮玩家英雄
function GemTD:OnReceiveHeroInfo(keys)
	if keys["is_black"] == 1 then
		GameRules:SendCustomMessage("#text_black", 0, 0)
		GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
		return
	end

	local heroindex = tonumber(keys.heroindex)
	local steam_id = keys.steam_id
	local is_test_user = keys.is_test_user
	local onduty_hero = keys.onduty_hero.hero_id
	local onduty_hero_info = keys.onduty_hero
	local pet = keys.pet
	local pet2 = keys.pet2
	local pet3 = keys.pet3
	local my_maze = keys.my_maze
	local is_crown = keys.is_crown

	local heroindex_old = heroindex
	local hero = EntIndexToHScript(heroindex)
	local id = hero:GetPlayerID()

	local is_can_build = false
	if hero:FindAbilityByName("gemtd_build_stone") ~= nil then
		is_can_build = hero:FindAbilityByName("gemtd_build_stone"):IsActivated()
	end

	--切换英雄的宠物相关
	local change_pet = nil
	local change_pet_name = nil
	change_pet = hero.pet
	change_pet_name = hero.pet_name or pet
	local change_pet2 = nil
	local change_pet_name2 = nil
	change_pet2 = hero.pet2
	change_pet_name2 = hero.pet_name2 or pet2
	local change_pet3 = nil
	local change_pet_name3 = nil
	change_pet3 = hero.pet3
	change_pet_name3 = hero.pet_name3 or pet3

	PrecacheUnitByNameAsync(_G.hero_sea[onduty_hero], function()
		local pppp = hero:GetAbsOrigin()
		hero:SetAbsOrigin(Vector(0, 0, 0))
		if hero.ppp ~= nil then
			ParticleManager:DestroyParticle(hero.ppp, true)
		end
		if hero.pp ~= nil then
			ParticleManager:DestroyParticle(hero.pp, true)
		end

		local player = PlayerResource:GetPlayer(id)
		local hero_new = CreateHeroForPlayer(_G.hero_sea[onduty_hero], player)
		hero_new:SetPlayerID(id)
		hero_new:SetControllableByPlayer(id, true)
		hero_new:SetOwner(hero:GetOwner())
		player:SetAssignedHeroEntity(hero_new)
		hero:Destroy()

		-- local hero_new = PlayerResource:ReplaceHeroWith(id,_G.hero_sea[onduty_hero],PlayerResource:GetGold(id),0)

		-- hero_new:SetControllableByPlayer(0, true)
		-- hero_new:SetControllableByPlayer(1, true)
		-- hero_new:SetControllableByPlayer(2, true)
		-- hero_new:SetControllableByPlayer(3, true)

		-- local hero_new = hero
		-- hero_new:RemoveAbility("techies_suicide")
		-- hero_new:RemoveAbility("techies_focused_detonate")
		-- hero_new:RemoveAbility("techies_land_mines")
		-- hero_new:RemoveAbility("techies_remote_mines")
		-- hero_new:RemoveAbility("techies_remote_mines_self_detonate")
		-- hero_new:RemoveAbility("techies_stasis_trap")
		-- hero_new:RemoveAbility("techies_minefield_sign")
		if hero_new == nil or hero_new:IsNull() == true then
			return
		end
		hero_new:SetAbsOrigin(Entities:FindByName(nil, "center" .. id):GetAbsOrigin())
		FindClearSpaceForUnit(hero_new, Entities:FindByName(nil, "center" .. id):GetAbsOrigin(), false)

		_G.playerid2hero[hero_new:GetPlayerID()] = hero_new

		heroindex = hero_new:GetEntityIndex()

		hero_new:SetAbilityPoints(0)
		for i = 1, 16 do
			hero_new:RemoveAbility("empty" .. i)
		end

		for i = 0, 100 do
			if hero_new:GetAbilityByIndex(i) ~= nil then
				hero_new:RemoveAbilityByHandle(hero_new:GetAbilityByIndex(i))
			end
		end

		-- ShowAbility({
		-- 	target = hero_new
		-- })

		-- 万圣节打开
		-- SetHeroStoneStyle(hero_new,'pumpkin')

		if hero_new:HasModifier("modifier_enigma_event_horizon_aura") then
			hero_new:RemoveModifierByName("modifier_enigma_event_horizon_aura")
		end
		RemoveAbilityAndModifier(hero_new, "jakiro_liquid_fire")
		RemoveAbilityAndModifier(hero_new, "jakiro_liquid_ice")

		--存在一个table里
		_G.playerInfoReceived[heroindex] = {
			["heroindex"] = heroindex,
			["steam_id"] = steam_id,
			["onduty_hero"] = onduty_hero,
		}

		hero_new.steam_id = steam_id

		hero_new:SetModelScale(hero_new:GetModelScale() * 1.25)

		--加技能
		hero_new:RemoveAbility("gemtd_build_stone")
		hero_new:RemoveAbility("gemtd_remove")
		hero_new.build_level = _G.level

		AddAbilityAndSetLevel(hero_new, "gemtd_build_stone", 1, 0, is_can_build)
		AddAbilityAndSetLevel(hero_new, "gemtd_remove", 1, 0.1, is_can_build)

		-- hero_new:AddAbility("gemtd_build_stone")
		-- hero_new:FindAbilityByName("gemtd_build_stone"):SetLevel(1)
		-- hero_new:AddAbility("gemtd_remove")
		-- hero_new:FindAbilityByName("gemtd_remove"):SetLevel(1)
		-- hero_new:FindAbilityByName("gemtd_build_stone"):SetActivated(is_can_build)
		-- hero_new:FindAbilityByName("gemtd_remove"):SetActivated(is_can_build)

		local a_count = 0
		if onduty_hero_info.ability ~= nil and type(onduty_hero_info.ability) == "table" then
			--排序显示
			local key_test = {}
			-- print('=====================')
			-- DeepPrintTable(onduty_hero_info.ability)
			for i, v in pairs(onduty_hero_info.ability) do
				table.insert(key_test, i) --提取test1中的键值插入到key_test表中
			end
			table.sort(key_test)
			-- print('=====================')
			-- DeepPrintTable(key_test)

			for i, v in pairs(key_test) do
				a_count = a_count + 1
				local a = v
				local va = onduty_hero_info.ability[v]
				if _G.ability_sea[a] ~= nil then
					-- print(">>>>".._G.ability_sea[a])
					AddAbilityAndSetLevel(hero_new, _G.ability_sea[a], va, i * 0.2)
					-- hero_new:AddAbility(_G.ability_sea[a])
					-- hero_new:FindAbilityByName(_G.ability_sea[a]):SetLevel(va)
				end
			end
			hero_new.ability = onduty_hero_info.ability
		end
		local total_count = tonumber(string.sub(onduty_hero, 2, 2))
		if onduty_hero_info.extend == nil then
			onduty_hero_info.extend = 0
		end
		total_count = total_count + tonumber(onduty_hero_info.extend)
		local empty_count = total_count - a_count

		--送tp问题
		for slot = 0, 8 do
			if hero_new:GetItemInSlot(slot) ~= nil then
				hero_new:RemoveItem(hero_new:GetItemInSlot(slot))
			end
		end
		if GetMapName() == "gemtd_race" then
			hero_new:AddItemByName("item_hummer")
		end
		--灵纹包物品
		if keys.extend_tool ~= nil and tonumber(keys.extend_tool) ~= nil and tonumber(keys.extend_tool) >= 1 then
			hero_new:AddItemByName("item_extend")
			local extend_tool_count = tonumber(keys.extend_tool)
			for slot = 0, 8 do
				if
					hero_new:GetItemInSlot(slot) ~= nil
					and hero_new:GetItemInSlot(slot):GetAbilityName() == "item_extend"
				then
					hero_new:GetItemInSlot(slot):SetCurrentCharges(extend_tool_count)
				end
			end
		end
		--玩具物品
		if keys.items ~= nil then
			for toy, _ in pairs(keys.items) do
				if _G.toy_sea[toy] ~= nil then
					local toy_name = _G.toy_sea[toy]
					hero_new:AddItemByName("item_" .. toy_name)
					for slot = 0, 8 do
						if
							hero_new:GetItemInSlot(slot) ~= nil
							and hero_new:GetItemInSlot(slot):GetAbilityName() == "item_" .. toy_name
						then
							hero_new:GetItemInSlot(slot):SetCurrentCharges(1)
						end
					end
				end
			end
		end

		--丛林挑战门票
		if keys.quest.quest == "q399" and keys.quest.quest_expire == -2 then
			hero_new:AddItemByName("item_ticket_bush")
		end

		--调整技能顺序
		-- local temp_a = {}
		-- for iii,abi in pairs(hero_new.ability or {}) do
		-- 	table.insert(temp_a,iii)
		-- end
		-- for iii,abi in pairs(temp_a) do
		-- 	if hero_new:GetAbilityByIndex(iii+1):GetAbilityName()~= _G.ability_sea[abi] then
		-- 		hero_new:SwapAbilities(_G.ability_sea[abi],hero_new:GetAbilityByIndex(iii+1):GetAbilityName(),true,true)
		-- 	end
		-- end

		-- ShowAbility({
		-- 	target = hero_new
		-- })

		-- hero_new:AddAbility('no_hp_bar')
		-- hero_new:FindAbilityByName('no_hp_bar'):SetLevel(1)

		play_particle(
			"particles/radiant_fx/radiant_tower002_destruction_a2.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			hero_new,
			2
		)

		_G.hero[heroindex_old] = nil
		_G.hero[hero_new:GetEntityIndex()] = hero_new

		CustomNetTables:SetTableValue(
			"game_state",
			"repick_hero",
			{ old_index = heroindex_old, new_index = hero_new:GetEntityIndex() }
		)

		CustomNetTables:SetTableValue(
			"game_state",
			"select_hero1",
			{
				p1 = PlayerResource:GetSelectedHeroName(0),
				p2 = PlayerResource:GetSelectedHeroName(1),
				p3 = PlayerResource:GetSelectedHeroName(2),
				p4 = PlayerResource:GetSelectedHeroName(3),
			}
		)

		Timers:CreateTimer(1, function()
			SetHeroLevelShow(hero_new)

			if empty_count > 0 then
				for i = 1, empty_count do
					hero_new:AddAbility("empty" .. i)
					hero_new:FindAbilityByName("empty" .. i):SetLevel(1)
				end
			end

			if onduty_hero_info.effect ~= nil and onduty_hero_info.effect ~= "" then
				hero_new:AddAbility(onduty_hero_info.effect)
				hero_new:FindAbilityByName(onduty_hero_info.effect):SetLevel(1)
				hero_new.effect = onduty_hero_info.effect
			end

			--添加玩家颜色底盘
			local particle = ParticleManager:CreateParticle(
				"particles/gem/team_" .. (id + 1) .. ".vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				hero_new
			)
			hero_new.ppp = particle

			-- RefreshPets(hero_new,id,change_pet,change_pet_name,'')
			-- RefreshPets(hero_new,id,change_pet2,change_pet_name2,'2')
			-- RefreshPets(hero_new,id,change_pet3,change_pet_name3,'3')

			if is_crown == 1 then
				hero_new.is_crown = true
				ShowCrown(hero_new, 1)
			end

			_G.is_precache_finished[id] = true
			GameRules:SendCustomMessage("Player " .. id .. " READY", 0, 0)
		end)
		if my_maze ~= nil then
			my_maze = json.decode(my_maze)
		end
		_G.usermaze[id] = my_maze
		--迷宫指南
		show_maze_guide(id, my_maze)
	end, id)

	SaveOndutyHero({
		steamid = steam_id,
		hero = onduty_hero,
	})
end
function RefreshPets(hero_new, id, old_pet, new_pet_name, name_suffix)
	if old_pet ~= nil then
		old_pet:Destroy()
	end
	--生成宠物
	local pet = nil
	if new_pet_name ~= nil then
		pet = new_pet_name
	end
	if pet ~= nil and _G.sm_hero_list[pet] ~= nil then
		local my_pet = CreateUnitByName(
			"gemtd_pet",
			Entities:FindByName(nil, "center" .. id):GetAbsOrigin(),
			false,
			nil,
			nil,
			DOTA_TEAM_GOODGUYS
		)
		my_pet.ftd = 2009
		my_pet:SetOwner(hero_new)

		local onduty_pet_model = _G.sm_hero_list[pet]
		local onduty_pet_skin = _G.sm_hero_list_skin[pet] or 0
		my_pet:SetOriginalModel(onduty_pet_model)
		my_pet:SetModel(onduty_pet_model)
		my_pet:SetSkin(onduty_pet_skin)
		my_pet:SetModelScale(_G.sm_hero_size[pet] or 1)

		hero_new["pet" .. name_suffix] = my_pet
		hero_new["pet_name" .. name_suffix] = pet
		my_pet.owner = hero_new

		Timers:CreateTimer(1, function()
			if my_pet == nil or my_pet.owner == nil or my_pet:IsNull() == true or my_pet:IsAlive() == false then
				return 1
			end
			if (my_pet:GetAbsOrigin() - my_pet.owner:GetAbsOrigin()):Length2D() > 200 then
				local ran1 = RandomInt(50, 200)
				local ran11 = RandomInt(0, 1)
				if ran11 == 0 then
					ran1 = -ran1
				end
				local ran2 = RandomInt(50, 200)
				local ran22 = RandomInt(0, 1)
				if ran22 == 0 then
					ran2 = -ran2
				end
				my_pet:MoveToPosition(my_pet.owner:GetAbsOrigin() + Vector(ran1, ran2, 0))
				return 1
			else
				return 1
			end
		end)
	end
end
function show_maze_guide(id, custom_maze)
	if GetMapName() == "gemtd_race" then
		--竞速模式
		_G.maze_guide[id] = {
			[0] = _G.maze_race0,
			[1] = _G.maze_race1,
			[2] = _G.maze_race2,
			[3] = _G.maze_race3,
		}
		if custom_maze ~= nil then
			_G.maze_guide[id][0] = custom_maze
		end
		local r = RandomFloat(0, 1)

		Timers:CreateTimer(r, function()
			CustomNetTables:SetTableValue("game_maze", "show_maze_guide", {
				t = _G.maze_guide[id][0],
				map = "gemtd_race",
				maze_index = 0,
				player = id,
				hehe = RandomInt(1, 100000),
			})
			local t = 1
			Timers:CreateTimer(0.2, function()
				if t > table.maxn(_G.maze_guide[id]) then
					return
				end
				CustomNetTables:SetTableValue("game_maze", "show_maze_guide", {
					t = _G.maze_guide[id][t],
					map = "gemtd_race",
					maze_index = t,
					hehe = RandomInt(1, 100000),
				})
				t = t + 1
				return 0.2
			end)
		end)
	else
		--合作模式
		_G.maze_guide[id] = {
			[0] = _G.maze_coop0,
			[1] = _G.maze_coop1,
			[2] = _G.maze_coop2,
			[3] = _G.maze_coop4,
		}
		if PlayerResource:GetPlayerCount() == 2 then
			_G.maze_guide[id] = {
				[0] = _G.maze_coop0,
				[1] = _G.maze_coop3,
				[2] = _G.maze_coop2,
				[3] = _G.maze_coop6,
			}
		end
		if PlayerResource:GetPlayerCount() == 3 then
			_G.maze_guide[id] = {
				[0] = _G.maze_coop0,
				[1] = _G.maze_coop5,
				[2] = _G.maze_coop6,
				[3] = _G.maze_coop8,
			}
		end
		if PlayerResource:GetPlayerCount() == 4 then
			_G.maze_guide[id] = {
				[0] = _G.maze_coop0,
				[1] = _G.maze_coop5,
				[2] = _G.maze_coop7,
				[3] = _G.maze_coop8,
			}
		end
		if custom_maze ~= nil then
			_G.maze_guide[id][0] = custom_maze
		end
		local r = RandomFloat(0, 1)

		Timers:CreateTimer(r, function()
			CustomNetTables:SetTableValue("game_maze", "show_maze_guide", {
				t = _G.maze_guide[id][0],
				map = "gemtd_coop",
				player = id,
				maze_index = 0,
				hehe = RandomInt(1, 100000),
			})
			local t = 1
			Timers:CreateTimer(0.2, function()
				if t > table.maxn(_G.maze_guide[id]) then
					return
				end
				CustomNetTables:SetTableValue("game_maze", "show_maze_guide", {
					t = _G.maze_guide[id][t],
					map = "gemtd_coop",
					maze_index = t,
					hehe = RandomInt(1, 100000),
				})
				t = t + 1
				return 0.2
			end)
		end)
	end
end
function GemTD:OnClickMazeGuidePanelCOOP(keys)
	local player_id = keys.player_id
	local maze_index = keys.maze_index
	if maze_index == nil or _G.maze_guide[player_id] == nil or _G.maze_guide[player_id][maze_index] == nil then
		return
	end
	click_maze_guide_coop(_G.maze_guide[player_id][maze_index], player_id)
end
function GemTD:OnClickMazeGuidePanelRACE(keys)
	local player_id = keys.player_id
	local maze_index = keys.maze_index

	click_maze_guide_race(_G.maze_guide[player_id][maze_index], player_id)
end
function click_maze_guide_race(table, player_id)
	local keytable = {}
	local keycount = 1
	if table == nil then
		return
	end
	for i, v in pairs(table) do
		for ii, vv in pairs(v) do
			if vv == 1 then
				local xxx = (ii - 19) * 128
				local yyy = (18 - i - 19) * 128
				if player_id ~= nil then
					xxx = (ii - 19 + _G.offset_maze[player_id].x) * 128
					yyy = (18 - i - 19 + _G.offset_maze[player_id].y) * 128
				end
				local p = Vector(xxx, yyy, 128)
				keytable[keycount] = p
				keycount = keycount + 1
			end
		end
	end
	CustomNetTables:SetTableValue(
		"game_state",
		"vectors_race",
		{ t = keytable, player = player_id, hehe = RandomInt(1, 100000) }
	)
end
function click_maze_guide_coop(t, player_id)
	if _G.is_maze_guide_show == true then
		CustomNetTables:SetTableValue("game_state", "vectors_coop_hide", { hehe = RandomInt(1, 100000) })
		_G.is_maze_guide_show = false
		return
	end
	if t == nil then
		return
	end
	local keytable = {}
	local keycount = 1
	local keytablecount = 1
	for i, v in pairs(t) do
		for ii, vv in pairs(v) do
			if vv == 1 then
				local xxx = (ii - 19) * 128
				local yyy = (18 - i - 19) * 128
				if player_id ~= nil then
					xxx = (ii - 19) * 128
					yyy = (38 - i - 19) * 128
				end
				local p = Vector(xxx, yyy, 128)
				if keytable[i % 5] == nil then
					keytable[i % 5] = {}
				end
				table.insert(keytable[i % 5], p)
				keycount = keycount + 1
			end
		end
	end

	_G.is_maze_guide_show = true
	local loop = 0
	Timers:CreateTimer(function()
		CustomNetTables:SetTableValue(
			"game_state",
			"vectors_coop",
			{ loop = loop, t = keytable[loop], hehe = RandomInt(1, 100000) }
		)
		loop = loop + 1
		if loop > 4 then
			return
		end
		return 0.01
	end)
end
function GemTD:OnSaveMaze(keys)
	local player_id = keys.player_id
	local steam_id = keys.steam_id
	local maze_str = {}
	local game_mode = ""
	if _G.gem_map == nil then
		return
	end
	if GetMapName() == "gemtd_race" then
		game_mode = "race"
		local race_range = {
			[0] = { x1 = 1, x2 = 17, y1 = 37, y2 = 21 },
			[1] = { x1 = 21, x2 = 37, y1 = 37, y2 = 21 },
			[2] = { x1 = 1, x2 = 17, y1 = 17, y2 = 1 },
			[3] = { x1 = 21, x2 = 37, y1 = 17, y2 = 1 },
		}
		for i = race_range[player_id].y1, race_range[player_id].y2, -1 do
			local row = {}
			for j = race_range[player_id].x1, race_range[player_id].x2, 1 do
				row[j - race_range[player_id].x1 + 1] = _G.gem_map[i][j]
			end
			maze_str[race_range[player_id].y1 - i + 1] = row
		end
	else
		for i = 37, 1, -1 do
			local row = {}
			for j = 1, 37, 1 do
				row[j] = _G.gem_map[i][j]
			end
			maze_str[38 - i] = row
		end
		game_mode = "" .. PlayerResource:GetPlayerCount() .. "p"
	end
	--打印
	for u = 1, table.maxn(maze_str) do
		local str = ""
		for v = 1, table.maxn(maze_str[u]) do
			str = str .. maze_str[u][v]
		end
	end

	maze_str = json.encode(maze_str)
	if steam_id == nil then
		return
	end
	--发送服务器
	local r = RandomFloat(0, 1)
	local url = "http://gemtd.ppbizon.com/gemtd/maze/save/@"
		.. steam_id
		.. "@"
		.. game_mode
		.. "@"
		.. maze_str
		.. "?hehe="
		.. RandomInt(1, 100000)

	Timers:CreateTimer(r, function()
		local req = CreateHTTPRequestScriptVM("GET", url)
		req:SetHTTPRequestAbsoluteTimeoutMS(20000)
		req:Send(function(result)
			print(result["Body"])
			CustomNetTables:SetTableValue(
				"game_state",
				"save_maze_cb",
				{ crab = result["Body"], player = player_id, hehe = RandomInt(1, 100000) }
			)

			CustomNetTables:SetTableValue("game_maze", "show_maze_guide", {
				t = json.decode(maze_str),
				map = "gemtd_" .. game_mode,
				maze_index = 0,
				player = player_id,
				hehe = RandomInt(1, 100000),
			})
		end)
	end)
end

--游戏流程5——全局定时器事件（游戏计时、刷怪、撞击城堡）
function OnThink()
	time_tick = time_tick + 1
	for i = 0, 3 do
		if PlayerResource:GetPlayer(i) ~= nil and PlayerResource:GetPlayer(i):GetAssignedHero() ~= nil then
			FindClearSpaceForUnit(
				PlayerResource:GetPlayer(i):GetAssignedHero(),
				PlayerResource:GetPlayer(i):GetAssignedHero():GetAbsOrigin(),
				false
			)
		end
	end

	if GameRules:State_Get() == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
		EndRoundIfNoEnemyAlive()

		--超时加狂暴
		local time_this_level = 0
		if _G.stop_watch == nil then
			time_this_level = 0
		else
			time_this_level = math.floor(GameRules:GetGameTime() - _G.stop_watch)
		end

		if _G.stop_watch ~= nil then
			_G.kuangbao_time = PlayerResource:GetPlayerCount() * 120 + 60
			_G.win_streak_time = _G.kuangbao_time / 2

			--触发狂暴
			if time_this_level > _G.kuangbao_time and not _G.is_crazy == true then
				_G.is_crazy = true
				GameRules:SendCustomMessage("#text_enemy_crazy", 0, 0)
				EmitGlobalSound("diretide_eventstart_Stinger")

				_G.gem_castle:AddAbility("enemy_crazy")
				_G.gem_castle:FindAbilityByName("enemy_crazy"):SetLevel(1)
			end
		end

		local game_mode = "1P"
		local is_race = false
		if GetMapName() == "gemtd_race" then
			game_mode = "RACE"
			is_race = true
		end
		if GetMapName() == "gemtd_coop" then
			game_mode = "COOP"
		end

		--发送当前游戏时间给客户端
		if _G.game_time ~= nil then
			WinStreakAdjust()
			-- print(GameRules:GetGameTime())

			CustomGameEventManager:Send_ServerToAllClients("show_time", {
				total_time = math.floor(GameRules:GetGameTime() - _G.game_time),
				wave_time = time_this_level,
				win_streak = _G.win_streak,
				kuangbao_time = _G.kuangbao_time,
				win_streak_time = _G.win_streak_time,
				is_race = is_race,
				game_mode = game_mode,
				hehe = RandomInt(1, 10000),
				enemy_count = _G.wave_enemy_count,
				p = PlayerResource:GetPlayerCount(),
			})
		end

		if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
			--刷怪

			if _G.gem_is_shuaguaiing == true and not GameRules:IsGamePaused() then
				local ShuaGuai_entity = Entities:FindByName(nil, "path1")
				local position = ShuaGuai_entity:GetAbsOrigin()
				position.z = 150

				_G.is_passed = false
				UpdateGuaiLevel()
				if _G.level > 50 then
					_G.is_passed = true
				end

				local u = nil

				local guai_name = _G.guai[_G.guai_level]

				--有些关卡有特殊刷怪逻辑
				if _G.guai_level == 35 and RandomInt(1, 100) > 50 then
					guai_name = guai_name .. "1"
				end
				if _G.guai_level == 36 and RandomInt(1, 100) > 50 then
					guai_name = guai_name .. "1"
				end
				if _G.guai_level == 38 and RandomInt(1, 100) > 50 then
					guai_name = guai_name .. "1"
				end

				u = CreateUnitByName(guai_name, position, true, nil, nil, DOTA_TEAM_BADGUYS)
				u.ftd = 2009

				table.insert(_G.enemy_table, u)

				if _G.is_debug == true then
					GameRules:SendCustomMessage(
						"PlayerResource里的玩家数: " .. PlayerResource:GetPlayerCount(),
						0,
						0
					)
				end

				if _G.gem_nandu <= PlayerResource:GetPlayerCount() then
					_G.gem_nandu = PlayerResource:GetPlayerCount()
				end

				--    if _G.is_debug == true then
				--     GameRules:SendCustomMessage("难度等级： ".._G.gem_nandu, 0, 0)
				--     GameRules:SendCustomMessage("难度系数： ".._G.gem_difficulty[_G.gem_nandu], 0, 0)
				-- end

				if _G.gem_difficulty[_G.gem_nandu] == nil then
					GameRules:SendCustomMessage("BUG le", 0, 0)
				end

				--添加技能
				for ab, abab in pairs(_G.guai_ability[_G.guai_level]) do
					u:AddAbility(abab)
					u:FindAbilityByName(abab):SetLevel(_G.gem_nandu)
				end

				local random_hit = 1
				if (not string.find(guai_name, "boss")) and (not string.find(guai_name, "tester")) then
					if RandomInt(1, 400) <= 1 then
						GameRules:SendCustomMessage("#text_a_elite_enemy_is_coming", 0, 0)
						EmitGlobalSound("DOTA_Item.ClarityPotion.Activate")
						random_hit = elite_hp()
						u:SetModelScale(u:GetModelScale() * 2.0)
						u:SetRenderColor(255, 255, 128)
						u.is_jingying = true
					end
				end

				local maxhealth = u:GetBaseMaxHealth() * _G.gem_difficulty[_G.gem_nandu] * random_hit

				local speed_t = 1.0
				if _G.is_passed == true then --50关以后
					if string.find(guai_name, "fly") then
						maxhealth = maxhealth / 3
					end

					u:SetModelScale(u:GetModelScale() * 2)

					if _G.word_object == nil or _G.word_object["name"] == nil then
						--随机给2个技能
						for iiii = 1, 2 do
							local random_a = RandomInt(1, table.maxn(_G.guai_50_ability))
							local aaaaa = _G.guai_50_ability[random_a]
							if aaaaa == "enemy_momian" then
								maxhealth = maxhealth / 5
							end
							if aaaaa == "enemy_wumian" then
								maxhealth = maxhealth / 3
							end
							if u:FindAbilityByName(aaaaa) == nil then
								u:AddAbility(aaaaa)
								u:FindAbilityByName(aaaaa):SetLevel(_G.gem_nandu)
							end
						end
					else
						--给一个本周无尽试炼主题技能，再随机2个技能
						local word_ability_name = "enemy_word_" .. _G.word_object["name"]

						if word_ability_name == "enemy_word_guwu" then
							--鼓舞，每N个怪加一次技能
							local guwu_table = {
								[1] = 10,
								[2] = 8,
								[3] = 7,
								[4] = 6,
							}
							local max_enemy_count = guwu_table[PlayerResource:GetPlayerCount() or 1] or 10
							_G.guwu_enemy_count = _G.guwu_enemy_count + 1
							if _G.guwu_enemy_count >= max_enemy_count then
								u:AddAbility(word_ability_name)
								u:FindAbilityByName(word_ability_name):SetLevel(1)
								_G.guwu_enemy_count = 0
							end
						else
							u:AddAbility(word_ability_name)
							u:FindAbilityByName(word_ability_name):SetLevel(_G.gem_nandu)
						end

						for iiii = 1, 2 do
							local random_a = RandomInt(1, table.maxn(_G.guai_50_ability))
							local aaaaa = _G.guai_50_ability[random_a]
							if aaaaa == "enemy_momian" then
								maxhealth = maxhealth / 5
							end
							if aaaaa == "enemy_wumian" then
								maxhealth = maxhealth / 3
							end
							if u:FindAbilityByName(aaaaa) == nil then
								u:AddAbility(aaaaa)
								u:FindAbilityByName(aaaaa):SetLevel(_G.gem_nandu)
							end
						end
					end

					if maxhealth > 10000 then
						maxhealth = 999999999
					else
						maxhealth = maxhealth * 100000
					end

					speed_t = speed_t * 1.8
				end

				if _G.is_ticket_night == true then
					AddAbilityAndSetLevel(u, "enemy_word_anye")
					-- u:AddAbility("enemy_word_anye")
					-- u:FindAbilityByName("enemy_word_anye"):SetLevel(_G.gem_nandu)
				end

				u:SetBaseMaxHealth(maxhealth)
				u:SetMaxHealth(maxhealth)
				u:SetHealth(maxhealth)

				u:AddNewModifier(u, nil, "modifier_bloodseeker_thirst", nil)
				u:SetBaseMoveSpeed(u:GetBaseMoveSpeed() * _G.gem_difficulty_speed[_G.gem_nandu] * speed_t)

				u:SetHullRadius(1)

				u:AddAbility("no_pengzhuang")
				u:FindAbilityByName("no_pengzhuang"):SetLevel(1)

				u:SetContextNum("step", 1, 0)
				if _G.level < 10 then
					u.damage = 1 + RandomInt(0, 2)
					u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (3 - 1) + 0.7))
				elseif _G.level > 10 and _G.level < 20 then
					u.damage = 1 + RandomInt(0, 6)
					u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (7 - 1) + 0.7))
				elseif _G.level > 20 and _G.level < 30 then
					u.damage = 1 + RandomInt(0, 10)
					u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (11 - 1) + 0.7))
				elseif _G.level > 30 and _G.level < 40 then
					u.damage = 1 + RandomInt(0, 14)
					u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (15 - 1) + 0.7))
				elseif _G.level > 40 and _G.level < 50 then
					u.damage = 1 + RandomInt(0, 18)
					u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (19 - 1) + 0.7))
				elseif _G.level > 50 and _G.level < 60 then
					u.damage = 1 + RandomInt(0, 26)
					u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (27 - 1) + 0.7))
				elseif _G.level > 60 and _G.level < 70 then
					u.damage = 1 + RandomInt(0, 34)
					u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (35 - 1) + 0.7))
				elseif _G.level > 70 and _G.level < 80 then
					u.damage = 1 + RandomInt(0, 42)
					u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (43 - 1) + 0.7))
				elseif _G.level > 80 and _G.level < 90 then
					u.damage = 1 + RandomInt(0, 50)
					u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (51 - 1) + 0.7))
				elseif _G.level > 90 and _G.level < 100 then
					u.damage = 1 + RandomInt(0, 58)
					u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (59 - 1) + 0.7))
				end

				if _G.level == 10 then
					u.damage = 100
				end
				if _G.level == 20 then
					u.damage = 100
				end
				if _G.level == 30 then
					u.damage = 100
				end
				if _G.level == 40 then
					u.damage = 100
				end
				if _G.level == 50 then
					u.damage = 100
				end
				if _G.level == 60 then
					u.damage = 100
				end
				if _G.level == 70 then
					u.damage = 100
				end
				if _G.level == 80 then
					u.damage = 100
				end
				if _G.level == 90 then
					u.damage = 100
				end
				if _G.level == 100 then
					u.damage = 100
				end

				u:SetBaseDamageMin(u.damage)
				u:SetBaseDamageMax(u.damage)

				u.position = u:GetAbsOrigin()

				_G.guai_count = _G.guai_count - 1
				_G.guai_live_count = _G.guai_live_count + 1

				if string.find(guai_name, "boss") then
					--PrecacheResource( "soundfile",  zr[i], context)
					_G.guai_count = _G.guai_count - 100

					-- u:AddAbility("e_snow")
					-- u:FindAbilityByName("e_snow"):SetLevel(1)
				end

				if string.find(guai_name, "tester") then
					--PrecacheResource( "soundfile",  zr[i], context)
					_G.guai_count = _G.guai_count - 100
				end

				StatEnemyCountAndShow()

				--u是刚刷的怪
				--目标点数组：_G.gem_path_all

				--命令移动
				Timers:CreateTimer(0.1, function()
					if (u:IsNull()) or (not u:IsAlive()) then
						--GameRules:SendCustomMessage(u:GetUnitName().."死亡了", 0, 0)
						return nil
					end

					AdjustBossAttackDamage(u)

					if u.target == nil then --无目标点
						u.target = 1
						u:MoveToPosition(_G.gem_path_all[u.target] + Vector(RandomInt(-5, 5), RandomInt(-5, 5), 0))
						return 0.1
					else --有目标点
						if
							_G.gem_path_all[u.target] ~= nil
							and (u:GetAbsOrigin() - _G.gem_path_all[u.target]):Length2D() < 32
						then
							--走到了，决定下一个动作

							--走到路径点了
							local path_point = IsEnemyOnPath(u)
							if u.path_point == nil then
								if _G.guangzhudaobiao ~= nil then
									u.path_point = 0
								else
									u.path_point = 1
								end
							end
							if path_point ~= nil and u.path_point + 1 == path_point then
								u.path_point = path_point

								if u:FindAbilityByName("enemy_jili") ~= nil then
									JiliEnemy(u)
								end

								local path_xishu_table = {
									[1] = 0.02,
									[2] = 0.00,
									[3] = 0.05,
									[4] = 0.10,
									[5] = 0.20,
									[6] = 0.40,
								}
								local xishu = path_xishu_table[path_point]
								-- prt(path_point..'-->'..xishu)
								_G.win_streak = _G.win_streak - u.damage * xishu

								WinStreakAdjust()

								--判断窃贼
								if u:FindAbilityByName("enemy_thief") ~= nil then
									local steal_count = math.floor(_G.team_gold * 0.01)
									local gold_count = math.floor(_G.team_gold * 0.99)

									_G.team_gold = gold_count
									for i = 0, PlayerResource:GetPlayerCount() - 1 do
										PlayerResource:SetGold(i, _G.team_gold, true)
									end

									CustomNetTables:SetTableValue(
										"game_state",
										"gem_team_gold",
										{ gold = _G.team_gold, hehe = RandomInt(1, 1000000) }
									)

									-- local ii = 0
									-- for ii = 0, 20 do
									-- 	PlayerResource:SetGold(ii, gold_count, true)
									-- end
									-- _G.team_gold = gold_count
									-- CustomNetTables:SetTableValue( "game_state", "gem_team_gold", { gold = gold_count } );
									--窃贼特效
									AMHC:CreateNumberEffect(u, steal_count, 5, AMHC.MSG_ORIT, "yellow", 9)
									EmitGlobalSound("Item.CrimsonGuard.Cast")
								end
							end

							if u:IsNull() == ture or u:IsAlive() == false then
								return
							end

							--主动技能
							if
								u.target > 1
								and u:FindAbilityByName("enemy_zheguang") ~= nil
								and u:FindModifierByName("modifier_damage_absorb") == nil
								and RandomInt(1, 100) <= 20
							then
								if u:FindAbilityByName("templar_assassin_refraction_new") == nil then
									u:AddAbility("templar_assassin_refraction_new")
									u:FindAbilityByName("templar_assassin_refraction_new")
										:SetLevel(u:FindAbilityByName("enemy_zheguang"):GetLevel())
								end
								local newOrder = {
									UnitIndex = u:entindex(),
									OrderType = DOTA_UNIT_ORDER_CAST_NO_TARGET,
									TargetIndex = nil, --Optional.  Only used when targeting units
									AbilityIndex = u:FindAbilityByName("templar_assassin_refraction_new"):entindex(), --Optional.  Only used when casting abilities
									Position = nil, --Optional.  Only used when targeting the ground
									Queue = 0, --Optional.  Used for queueing up abilities
								}
								ExecuteOrderFromTable(newOrder)

								return 0.1
							elseif
								u.target > 1
								and u:FindAbilityByName("enemy_shanshuo") ~= nil
								and (u:FindAbilityByName("antimage_blink_new") == nil or u:FindAbilityByName(
									"antimage_blink_new"
								):IsCooldownReady())
								and RandomInt(1, 100) <= 10
							then
								if u:FindAbilityByName("antimage_blink_new") == nil then
									u:AddAbility("antimage_blink_new")
									u:FindAbilityByName("antimage_blink_new")
										:SetLevel(u:FindAbilityByName("enemy_shanshuo"):GetLevel())
								end
								local shanshuo_steps = math.ceil(table.maxn(_G.gem_path_all) / 35)
								u.target = u.target + shanshuo_steps
								if u.target > table.maxn(_G.gem_path_all) then
									u.target = table.maxn(_G.gem_path_all)
								end
								u.target_position = _G.gem_path_all[u.target]
									+ Vector(RandomInt(-5, 5), RandomInt(-5, 5), 0)
								local newOrder = {
									UnitIndex = u:entindex(),
									OrderType = DOTA_UNIT_ORDER_CAST_POSITION,
									TargetIndex = nil, --Optional.  Only used when targeting units
									AbilityIndex = u:FindAbilityByName("antimage_blink_new"):entindex(), --Optional.  Only used when casting abilities
									Position = u.target_position, --Optional.  Only used when targeting the ground
									Queue = 0, --Optional.  Used for queueing up abilities
								}
								ExecuteOrderFromTable(newOrder)

								return 0.5
							elseif
								u.target > 1
								and u:FindAbilityByName("runrunrun") ~= nil
								and u:FindModifierByName("modifier_runrunrun") == nil
								and RandomInt(1, 100) <= 20
							then
								local newOrder = {
									UnitIndex = u:entindex(),
									OrderType = DOTA_UNIT_ORDER_CAST_NO_TARGET,
									TargetIndex = nil, --Optional.  Only used when targeting units
									AbilityIndex = u:FindAbilityByName("runrunrun"):entindex(), --Optional.  Only used when casting abilities
									Position = nil, --Optional.  Only used when targeting the ground
									Queue = 0, --Optional.  Used for queueing up abilities
								}
								ExecuteOrderFromTable(newOrder)
								return 0.1
							else
								--继续走
								u.target = u.target + 1
								if u.target > table.maxn(_G.gem_path_all) then
									u.target = table.maxn(_G.gem_path_all)
								end
								if _G.gem_path_all[u.target] ~= nil then
									u:MoveToPosition(
										_G.gem_path_all[u.target] + Vector(RandomInt(-5, 5), RandomInt(-5, 5), 0)
									)
								end
								return 0.1
							end
						else
							if u:IsNull() == true or u:IsAlive() == false then
								return
							end
							if _G.gem_path_all[u.target] ~= nil then
								u:MoveToPosition(
									_G.gem_path_all[u.target] + Vector(RandomInt(-5, 5), RandomInt(-5, 5), 0)
								)
							end
							return 0.1
						end
					end
				end)

				if _G.guai_count <= 0 then
					_G.gem_is_shuaguaiing = false
				end
			end

			--判断是否有怪到达城堡
			local ShuaGuai_entity = Entities:FindByName(nil, "path7")
			local position = ShuaGuai_entity:GetAbsOrigin()
			local direUnits = FindUnitsInRadius(
				DOTA_TEAM_BADGUYS,
				position,
				nil,
				400,
				DOTA_UNIT_TARGET_TEAM_FRIENDLY,
				DOTA_UNIT_TARGET_ALL,
				DOTA_UNIT_TARGET_FLAG_NONE,
				FIND_ANY_ORDER,
				false
			)
			for aaa, unit in pairs(direUnits) do
				--对城堡造成伤害

				local damage = unit.damage

				if string.find(unit:GetUnitName(), "boss") or string.find(unit:GetUnitName(), "tester") then
					_G.is_boss_entered = true
				end

				-- 判断闪避
				if _G.gem_castle.shanbi ~= nil then
					if RandomInt(0, 100) < tonumber(_G.gem_castle.shanbi) then
						EmitGlobalSound("n_creep_ghost.Death")
						damage = 0
						local particle = ParticleManager:CreateParticle(
							"particles/gem/immunity_sphere.vpcf",
							PATTACH_ABSORIGIN_FOLLOW,
							_G.gem_castle
						)

						Timers:CreateTimer(2, function()
							ParticleManager:DestroyParticle(particle, true)
						end)
					end
				end
				-- 判断格挡
				if _G.gem_castle.shouhu ~= nil then
					EmitGlobalSound("Item.LotusOrb.Destroy")
					damage = damage - tonumber(_G.gem_castle.shouhu)
					if damage < 0 then
						damage = 0
					end
				end

				_G.gem_castle_hp = _G.gem_castle_hp - damage
				SyncHP()

				if damage > 0 then
					_G.win_streak = _G.win_streak - damage * 3.0
					WinStreakAdjust()
					_G.perfect_this_level = false

					EmitGlobalSound("DOTA_Item.Maim")

					play_particle(
						"particles/econ/items/ancient_apparition/aa_blast_ti_5/ancient_apparition_ice_blast_sphere_final_explosion_smoke_ti5.vpcf",
						PATTACH_OVERHEAD_FOLLOW,
						_G.gem_castle,
						2
					)
					AMHC:CreateNumberEffect(_G.gem_castle, damage, 5, AMHC.MSG_DAMAGE, "red", 3)
				end

				PlayerResource:IncrementDeaths(0, 1)
				PlayerResource:IncrementDeaths(1, 1)
				PlayerResource:IncrementDeaths(2, 1)
				PlayerResource:IncrementDeaths(3, 1)

				AddStat("unkill", 1)
				UpdateKillStat()

				--城堡被摧毁则游戏结束
				if _G.gem_castle_hp <= 0 then
					_G.game_status = 3

					--城堡破碎动画
					local ss = _G.stone_style_list[_G.gem_castle.stone_style]
					if ss ~= nil and ss["castle_broken_model"] ~= nil and ss["castle_broken_model"] ~= "" then
						_G.gem_castle:SetOriginalModel(ss["castle_broken_model"])
						_G.gem_castle:SetModel(ss["castle_broken_model"])
					end

					unit:Destroy()
					-- ShowCenterMessage("failed", 5)
					--3秒后判定胜负并进入结束界面(end.xml)，输赢按是否过了50关
					Timers:CreateTimer(3, function()
						if _G.level > 50 then
							GameRules:SetGameWinner(DOTA_TEAM_GOODGUYS)
						else
							GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
						end
					end)

					send_ranking()
					return
				end

				unit.is_entered = true
				local u_index = unit:entindex()
				GemTD:OnEntityKilled({
					entindex_killed = u_index,
					entindex_attacker = u_index,
				})
				unit:Destroy()

				StatEnemyCountAndShow()
			end
		end
	elseif GameRules:State_Get() >= DOTA_GAMERULES_STATE_POST_GAME then
		return nil
	end
	return 1
end
function spawn_one_enemy(playerid, guai_name)
	-- not GameRules:IsGamePaused()
	-- 	_G.guai_count = _G.guai_count -1
	-- _G.guai_live_count = _G.guai_live_count + 1
	local ShuaGuai_entity = nil
	if playerid ~= nil then
		ShuaGuai_entity = Entities:FindByName(nil, "path" .. (playerid * 10 + 1))
	else
		ShuaGuai_entity = Entities:FindByName(nil, "path1")
	end

	local position = ShuaGuai_entity:GetAbsOrigin()
	position.z = 150
	local u = CreateUnitByName(guai_name, position, true, nil, nil, DOTA_TEAM_BADGUYS)
	u.ftd = 2009

	if _G.gem_nandu <= PlayerResource:GetPlayerCount() then
		_G.gem_nandu = PlayerResource:GetPlayerCount()
	end

	--添加技能
	for ab, abab in pairs(_G.guai_ability[_G.guai_level]) do
		if playerid ~= nil and abab == "enemy_shanshuo" then
			abab = "runrunrun"
		end
		u:AddAbility(abab)
		u:FindAbilityByName(abab):SetLevel(1) --竞速模式怪技能等级都是1
	end

	--精英怪
	local random_hit = 1
	if (not string.find(guai_name, "boss")) and (not string.find(guai_name, "tester")) then
		if PlayerResource:GetPlayer(playerid) ~= nil then
			if _G.playerid2hero[playerid].jingying_zuzhou ~= nil and _G.playerid2hero[playerid].jingying_zuzhou > 0 then
				if playerid == nil then
					GameRules:SendCustomMessage("#text_a_elite_enemy_is_coming", 0, 0)
					EmitGlobalSound("DOTA_Item.ClarityPotion.Activate")
				end
				random_hit = elite_hp()
				u:SetModelScale(u:GetModelScale() * 2.0)
				u:SetRenderColor(255, 255, 0)
				u.is_jingying = true
				_G.playerid2hero[playerid].jingying_zuzhou = _G.playerid2hero[playerid].jingying_zuzhou - 1
			elseif RandomInt(1, 400) <= 1 then
				if playerid == nil then
					GameRules:SendCustomMessage("#text_a_elite_enemy_is_coming", 0, 0)
					EmitGlobalSound("DOTA_Item.ClarityPotion.Activate")
				end
				random_hit = elite_hp()
				u:SetModelScale(u:GetModelScale() * 2.0)
				u:SetRenderColor(255, 255, 0)
				u.is_jingying = true
			end
		end
	end

	--堕落天使之翼变的飞行怪
	if (not string.find(guai_name, "boss")) and (not string.find(guai_name, "tester")) then
		if PlayerResource:GetPlayer(playerid) ~= nil then
			if _G.playerid2hero[playerid].fly_zuzhou ~= nil and _G.playerid2hero[playerid].fly_zuzhou > 0 then
				--变成飞行模型
				local m = u:GetModelName()
				if not string.find(m, "flying") then
					u.is_flying = true
					_G.playerid2hero[playerid].fly_zuzhou = _G.playerid2hero[playerid].fly_zuzhou - 1

					local new_m = string.sub(m, 1, string.len(m) - 5) .. "_flying.vmdl"
					if m == "models/courier/mighty_boar/mighty_boar.vmdl" then
						new_m = "models/courier/mighty_boar/mighty_boar_wings.vmdl"
					end
					if m == "models/courier/yak/yak.vmdl" then
						new_m = "models/courier/yak/yak_wings.vmdl"
					end

					u:SetOriginalModel(new_m)
					u:SetModel(new_m)
					u:SetMoveCapability(DOTA_UNIT_CAP_MOVE_FLY)
					u:SetModelScale(u:GetModelScale() * 1.25)
					AddAbilityAndSetLevel(u, "enemy_fly")
				end
			end
		end
	end

	local maxhealth = u:GetBaseMaxHealth() * _G.gem_difficulty_race * random_hit

	local speed_t = 1.0
	if _G.is_passed == true then --50关以后
		if string.find(guai_name, "fly") then
			maxhealth = maxhealth * 0.4
		end

		u:SetModelScale(u:GetModelScale() * 2)

		if _G.word_object == nil or _G.word_object["name"] == nil then
			--随机给2个技能
			for iiii = 1, 2 do
				local random_a = RandomInt(1, table.maxn(_G.guai_50_ability))
				local aaaaa = _G.guai_50_ability[random_a]
				if aaaaa == "enemy_momian" then
					maxhealth = maxhealth / 5
				end
				if aaaaa == "enemy_wumian" then
					maxhealth = maxhealth / 3
				end
				if u:FindAbilityByName(aaaaa) == nil then
					u:AddAbility(aaaaa)
					u:FindAbilityByName(aaaaa):SetLevel(_G.gem_nandu)
				end
			end
		else
			--给一个本周无尽试炼主题技能，再随机一个技能
			local word_ability_name = "enemy_word_" .. _G.word_object["name"]
			u:AddAbility(word_ability_name)
			u:FindAbilityByName(word_ability_name):SetLevel(_G.gem_nandu)

			local random_a = RandomInt(1, table.maxn(_G.guai_50_ability))
			local aaaaa = _G.guai_50_ability[random_a]
			if aaaaa == "enemy_momian" then
				maxhealth = maxhealth / 5
			end
			if aaaaa == "enemy_wumian" then
				maxhealth = maxhealth / 3
			end
			if u:FindAbilityByName(aaaaa) == nil then
				u:AddAbility(aaaaa)
				u:FindAbilityByName(aaaaa):SetLevel(_G.gem_nandu)
			end
		end

		if maxhealth > 10000 then
			maxhealth = 999999999
		else
			maxhealth = maxhealth * 100000
		end

		speed_t = speed_t * 1.8
	end

	u:SetBaseMaxHealth(maxhealth)
	u:SetMaxHealth(maxhealth)
	u:SetHealth(maxhealth)

	u:AddNewModifier(u, nil, "modifier_bloodseeker_thirst", nil)
	u:SetBaseMoveSpeed(u:GetBaseMoveSpeed() * _G.gem_difficulty_speed_race * speed_t)

	u:SetHullRadius(1)

	u:AddAbility("no_pengzhuang")
	u:FindAbilityByName("no_pengzhuang"):SetLevel(1)

	u:SetContextNum("step", 1, 0)
	if _G.level < 10 then
		u.damage = 1 + RandomInt(0, 2)
		u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (3 - 1) + 0.7))
	elseif _G.level > 10 and _G.level < 20 then
		u.damage = 1 + RandomInt(0, 6)
		u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (7 - 1) + 0.7))
	elseif _G.level > 20 and _G.level < 30 then
		u.damage = 1 + RandomInt(0, 10)
		u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (11 - 1) + 0.7))
	elseif _G.level > 30 and _G.level < 40 then
		u.damage = 1 + RandomInt(0, 14)
		u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (15 - 1) + 0.7))
	elseif _G.level > 40 and _G.level < 50 then
		u.damage = 1 + RandomInt(0, 18)
		u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (19 - 1) + 0.7))
	elseif _G.level > 50 and _G.level < 60 then
		u.damage = 1 + RandomInt(0, 26)
		u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (27 - 1) + 0.7))
	elseif _G.level > 60 and _G.level < 70 then
		u.damage = 1 + RandomInt(0, 34)
		u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (35 - 1) + 0.7))
	elseif _G.level > 70 and _G.level < 80 then
		u.damage = 1 + RandomInt(0, 42)
		u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (43 - 1) + 0.7))
	elseif _G.level > 80 and _G.level < 90 then
		u.damage = 1 + RandomInt(0, 50)
		u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (51 - 1) + 0.7))
	elseif _G.level > 90 and _G.level < 100 then
		u.damage = 1 + RandomInt(0, 58)
		u:SetModelScale(u:GetModelScale() * ((u.damage - 1) * 0.6 / (59 - 1) + 0.7))
	end

	if _G.level == 10 then
		u.damage = 100
	end
	if _G.level == 20 then
		u.damage = 100
	end
	if _G.level == 30 then
		u.damage = 100
	end
	if _G.level == 40 then
		u.damage = 100
	end
	if _G.level == 50 then
		u.damage = 100
	end
	if _G.level == 60 then
		u.damage = 100
	end
	if _G.level == 70 then
		u.damage = 100
	end
	if _G.level == 80 then
		u.damage = 100
	end
	if _G.level == 90 then
		u.damage = 100
	end
	if _G.level == 100 then
		u.damage = 100
	end

	u:SetBaseDamageMin(u.damage)
	u:SetBaseDamageMax(u.damage)

	u.position = u:GetAbsOrigin()

	if playerid ~= nil then
		u.player = playerid
	end

	if playerid ~= nil then
		u.target_path = playerid * 10 + 2
	else
		u.target_path = 2
	end
	if _G.guangzhudaobiao_race[playerid] ~= nil and u.candypassed == nil then
		u.target_path = "gemtd_guangzhudaobiao"
		u.candypassed = true
		u.path_position = _G.guangzhudaobiao_race[playerid]:GetAbsOrigin()
	end

	--命令移动
	Timers:CreateTimer(0.1, function()
		if u == nil or (u:IsNull()) or (not u:IsAlive()) then
			return nil
		end

		AdjustBossAttackDamage(u)

		local bite = bite_castle(u)
		if bite == true then
			return
		end

		if u.target == nil then --无目标点
			enemy_go(u)
			return 0.1
		else --有目标点
			if u.target ~= nil and (u:GetAbsOrigin() - u.target):Length2D() < 32 then
				--走到了，决定下一个动作
				if u == nil or u:IsNull() == true or u:IsAlive() == false then
					return
				end

				--主动技能
				if
					u:FindAbilityByName("enemy_zheguang") ~= nil
					and u:FindModifierByName("modifier_damage_absorb") == nil
					and RandomInt(1, 100) <= 2
				then
					if u:FindAbilityByName("templar_assassin_refraction_new") == nil then
						u:AddAbility("templar_assassin_refraction_new")
						u:FindAbilityByName("templar_assassin_refraction_new")
							:SetLevel(u:FindAbilityByName("enemy_zheguang"):GetLevel())
					end
					local newOrder = {
						UnitIndex = u:entindex(),
						OrderType = DOTA_UNIT_ORDER_CAST_NO_TARGET,
						TargetIndex = nil, --Optional.  Only used when targeting units
						AbilityIndex = u:FindAbilityByName("templar_assassin_refraction_new"):entindex(), --Optional.  Only used when casting abilities
						Position = nil, --Optional.  Only used when targeting the ground
						Queue = 0, --Optional.  Used for queueing up abilities
					}
					ExecuteOrderFromTable(newOrder)

					return 0.1
				elseif
					u:FindAbilityByName("runrunrun") ~= nil
					and u:FindModifierByName("modifier_runrunrun") == nil
					and RandomInt(1, 100) <= 2
				then
					local newOrder = {
						UnitIndex = u:entindex(),
						OrderType = DOTA_UNIT_ORDER_CAST_NO_TARGET,
						TargetIndex = nil, --Optional.  Only used when targeting units
						AbilityIndex = u:FindAbilityByName("runrunrun"):entindex(), --Optional.  Only used when casting abilities
						Position = nil, --Optional.  Only used when targeting the ground
						Queue = 0, --Optional.  Used for queueing up abilities
					}
					ExecuteOrderFromTable(newOrder)
					return 0.1
				else
					--走到path了
					if u.target_path == "gemtd_guangzhudaobiao" and (u.target - u.path_position):Length2D() < 48 then
						--走到光柱道标了
						if playerid ~= nil then
							u.target_path = playerid * 10 + 2
						else
							u.target_path = 2
						end

						--判断窃贼
						if u:FindAbilityByName("enemy_thief") ~= nil then
							local steal_count = math.floor(PlayerResource:GetGold(playerid) * 0.01)
							local gold_count = math.floor(PlayerResource:GetGold(playerid) * 0.99)
							PlayerResource:SetGold(playerid, gold_count, true)
							CustomGameEventManager:Send_ServerToPlayer(
								PlayerResource:GetPlayer(playerid),
								"show_money",
								{
									money = gold_count,
								}
							)
							--窃贼特效
							AMHC:CreateNumberEffect(u, steal_count, 5, AMHC.MSG_ORIT, "yellow", 9)
							EmitSoundOn("Item.CrimsonGuard.Cast", u)
						end
					elseif
						u.target_path ~= nil
						and u.target_path ~= "gemtd_guangzhudaobiao"
						and (u.target - Entities:FindByName(nil, "path" .. u.target_path):GetAbsOrigin()):Length2D()
							< 48
					then
						--走到非光柱道标的path了
						u.target_path = u.target_path + 1
						if u:FindAbilityByName("enemy_jili") ~= nil then
							JiliEnemy(u)
						end

						--判断窃贼
						if u:FindAbilityByName("enemy_thief") ~= nil then
							local steal_count = math.floor(PlayerResource:GetGold(playerid) * 0.01)
							local gold_count = math.floor(PlayerResource:GetGold(playerid) * 0.99)
							PlayerResource:SetGold(playerid, gold_count, true)
							CustomGameEventManager:Send_ServerToPlayer(
								PlayerResource:GetPlayer(playerid),
								"show_money",
								{
									money = gold_count,
								}
							)
							--窃贼特效
							AMHC:CreateNumberEffect(u, steal_count, 5, AMHC.MSG_ORIT, "yellow", 9)
							EmitSoundOn("Item.CrimsonGuard.Cast", u)
						end
					end
					if Entities:FindByName(nil, "path" .. u.target_path) ~= nil then
						--GO!
						enemy_go(u)
						return 0.1
					elseif u.target_path == "gemtd_guangzhudaobiao" then
						enemy_go(u)
						return 0.1
					else
						return
					end
				end
			else
				--还没走到target
				if u == nil or u:IsNull() == ture or u:IsAlive() == false then
					return
				end
				if u.target ~= nil then
					if (rasterize_vector(u:GetAbsOrigin()) - u.start):Length2D() > 150 then
						enemy_go(u)
					end
				end
				return 0.1
			end
		end
	end)
end

function enemy_go(u)
	--GO!
	if u.target_path == "gemtd_guangzhudaobiao" then
		if string.find(u:GetUnitName(), "fly") or u.is_flying == true then
			u.target = u.path_position
			u.start = rasterize_vector(u:GetAbsOrigin())
			u:MoveToPosition(u.path_position)
		else
			u.target = find_path_one(u:GetAbsOrigin(), u.path_position) + Vector(RandomInt(-1, 1), RandomInt(-1, 1), 0)
			u.start = rasterize_vector(u:GetAbsOrigin())
			u:MoveToPosition(u.target)
			print(u.target)
		end
	else
		if string.find(u:GetUnitName(), "fly") or u.is_flying == true then
			u.target = Entities:FindByName(nil, "path" .. u.target_path):GetAbsOrigin()
			u.start = rasterize_vector(u:GetAbsOrigin())
			u:MoveToPosition(Entities:FindByName(nil, "path" .. u.target_path):GetAbsOrigin())
		else
			u.target = find_path_one(u:GetAbsOrigin(), Entities:FindByName(nil, "path" .. u.target_path):GetAbsOrigin())
				+ Vector(RandomInt(-1, 1), RandomInt(-1, 1), 0)
			u.start = rasterize_vector(u:GetAbsOrigin())
			u:MoveToPosition(u.target)
		end
	end
end
function bite_castle(u)
	if u == nil or u.player == nil then
		return false
	end
	--判断怪是否到达城堡
	local c = _G.gem_castle_race[u.player]
	if c == nil then
		return false
	end

	local u_player = u.player
	local u_index = u:entindex()

	if (u:GetAbsOrigin() - c:GetAbsOrigin()):Length2D() < 96 then
		--撞上了！
		local damage = u.damage

		GemTD:OnEntityKilled({
			entindex_killed = u_index,
			entindex_attacker = u_index,
		})
		u:Destroy()

		-- 判断闪避
		if _G.gem_castle_race[u_player].shanbi ~= nil then
			if RandomInt(0, 100) < tonumber(_G.gem_castle_race[u_player].shanbi) then
				EmitGlobalSound("n_creep_ghost.Death")
				damage = 0
				local particle = ParticleManager:CreateParticle(
					"particles/gem/immunity_sphere.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					_G.gem_castle_race[u_player]
				)

				Timers:CreateTimer(2, function()
					ParticleManager:DestroyParticle(particle, true)
				end)
			end
		end
		-- 判断格挡
		if _G.gem_castle_race[u_player].shouhu ~= nil then
			EmitGlobalSound("Item.LotusOrb.Destroy")
			damage = damage - tonumber(_G.gem_castle_race[u_player].shouhu)
			if damage < 0 then
				damage = 0
			end
		end

		_G.gem_castle_hp_race[u_player] = _G.gem_castle_hp_race[u_player] - damage

		CustomNetTables:SetTableValue(
			"game_state",
			"gem_life_race",
			{ player = u_player, gem_life = _G.gem_castle_hp_race[u_player] }
		)

		c:SetHealth(_G.gem_castle_hp_race[u_player])
		PlayerResource:IncrementDeaths(u_player, 1)
		AddStat("unkill", 1, u_player)
		UpdateKillStat()

		--显示伤害
		if damage > 0 then
			EmitSoundOn("DOTA_Item.Maim", c)
			-- EmitSoundOn("Frostivus.PointScored.Enemy",c)
			play_particle(
				"particles/econ/items/ancient_apparition/aa_blast_ti_5/ancient_apparition_ice_blast_sphere_final_explosion_smoke_ti5.vpcf",
				PATTACH_OVERHEAD_FOLLOW,
				c,
				2
			)
			AMHC:CreateNumberEffect(_G.playerid2hero[u_player], damage, 5, AMHC.MSG_DAMAGE, "red", 3)
		end
		--城堡被摧毁
		if _G.gem_castle_hp_race[u_player] <= 0 then
			if _G.playerid2hero[u_player]:IsAlive() == true then
				--城堡破碎动画
				local ss = _G.stone_style_list[_G.gem_castle_race[u_player].stone_style]
				if ss ~= nil and ss["castle_broken_model"] ~= nil and ss["castle_broken_model"] ~= "" then
					_G.gem_castle_race[u_player]:SetOriginalModel(ss["castle_broken_model"])
					_G.gem_castle_race[u_player]:SetModel(ss["castle_broken_model"])
				end
				race_player_fail(u_player)
			end
		end

		if _G.playerid2hero[u_player]:IsAlive() == true then
			_G.playerid2hero[u_player]:SetHealth(_G.gem_castle_hp_race[u_player])
		end

		return true
	else
		return false
	end
end

function race_player_fail(player_id)
	local hero_index = _G.playerid2hero[player_id]:GetEntityIndex()
	local steam_id = _G.playerInfoReceived[hero_index].steam_id

	if not string.find(_G.death_stack, steam_id) then
		_G.death_stack = steam_id .. "," .. _G.death_stack
	end

	-- GameRules:SendCustomMessage('death_stack:'.._G.death_stack,0,0)
	_G.playerid2hero[player_id]:ForceKill(false)

	--添加死亡玩家的统计数据
	_G.race_stat[player_id]["steam_id"] = steam_id
	_G.race_stat[player_id]["hero"] = _G.playerid2hero[player_id]:GetUnitName()
	_G.race_stat[player_id]["wave"] = _G.level
	_G.race_stat[player_id]["kills"] = PlayerResource:GetKills(player_id)
	_G.race_stat[player_id]["miss"] = PlayerResource:GetDeaths(player_id)
	_G.race_stat[player_id]["game_time"] = math.floor(GameRules:GetGameTime() - (_G.game_time or 0))

	--是不是所有人都挂了？ 游戏结束？
	local is_all_dead = true
	local live_player_count = 0
	local last_live_player_id = nil
	for i = 1, PlayerResource:GetPlayerCount() do
		if _G.gem_castle_hp_race[i - 1] > 0 then
			is_all_dead = false
			live_player_count = live_player_count + 1
			last_live_player_id = i - 1
		end
	end

	if live_player_count == 1 then
		_G.dumiao_id = last_live_player_id
		CustomNetTables:SetTableValue(
			"game_state",
			"show_ggsimida_race",
			{ player = last_live_player_id, hehe = RandomInt(1, 10000) }
		)
	end

	local game_duration = math.floor(GameRules:GetGameTime() - (_G.game_time or 0))

	if is_all_dead == true then
		--全部挂了，是时候结束游戏了
		if PlayerResource:GetPlayerCount() > 1 and game_duration > 180 then
			--玩家人数大于1，就提交mmr成绩
			if _G.is_posted_game == true then
				GameRules:SendCustomMessage("成绩已经提交过了，不再重复提交。", 0, 0)
				return
			end
			_G.is_posted_game = true
			local url = "http://gemtd.ppbizon.com/gemtd/202408/race/ranking/save/@"
				.. _G.death_stack
				.. "?hehe="
				.. RandomInt(1, 100000)
				.. "&duration="
				.. game_duration
				.. "&wave="
				.. _G.level

			url = url .. GetSendKey()

			local bad_string = nil
			for q, vq in pairs(_G.zaotui_table) do
				if vq == 1 then
					if bad_string == nil then
						bad_string = _G.playerInfoReceived[_G.playerid2hero[q]:GetEntityIndex()].steam_id
					else
						bad_string = bad_string
							.. ","
							.. _G.playerInfoReceived[_G.playerid2hero[q]:GetEntityIndex()].steam_id
					end
				end
			end
			if bad_string ~= nil then
				url = url .. "&badplayers=" .. bad_string
			end
			local req = CreateHTTPRequestScriptVM("GET", url)
			req:SetHTTPRequestAbsoluteTimeoutMS(20000)
			req:Send(function(result)
				local t = json.decode(result["Body"])

				if t == nil or t["err"] == nil or t["err"] ~= 0 then
					GameRules:SendCustomMessage("Connect Server ERROR", 0, 0)
					-- GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
					return
				end

				local re = t["mmr_info"]
				for i, j in pairs(re) do
					-- GameRules:SendCustomMessage(i..'-->'..j.mmr,0,0)

					for u, v in pairs(_G.race_stat) do
						if v.steam_id == i then
							_G.race_stat[u]["mmr"] = j.mmr
							_G.race_stat[u]["mmr_level"] = j.race_level
						end
					end
				end
				--把战绩表发给pui展示
				CustomNetTables:SetTableValue(
					"game_state",
					"race_gameover_show",
					{ stat = _G.race_stat, hehe = RandomInt(1, 10000) }
				)
			end)
		else
			--单人，也把战绩表发给pui展示
			CustomNetTables:SetTableValue(
				"game_state",
				"race_gameover_show",
				{ stat = _G.race_stat, hehe = RandomInt(1, 10000) }
			)
		end

		Timers:CreateTimer(30, function()
			GameRules:SetGameWinner(DOTA_TEAM_GOODGUYS)
		end)
	end
end

function spawn_one_wave()
	_G.is_passed = false
	UpdateGuaiLevel()
	if _G.level > 50 then
		_G.is_passed = true
	end

	local guai_name = _G.guai[_G.guai_level]

	ShowCenterMessage(_G.guai[_G.guai_level], 5, _G.level, 10)

	CustomNetTables:SetTableValue(
		"game_state",
		"victory_condition",
		{ kills_to_win = _G.level, enemy_show = _G.guai[_G.guai_level] }
	)

	_G.enemy_spawned_wave = _G.level
	local my_guai_name = {}

	for i = 1, PlayerResource:GetPlayerCount() do
		if _G.gem_castle_hp_race[i - 1] > 0 then
			if string.find(guai_name, "boss") then
				_G.enemy_live_count[i - 1] = _G.enemy_live_count[i - 1] + 1
				my_guai_name[i] = guai_name
				--如果中了惊奇魔术盒
				if _G.item_moshuhe[i - 1] > 0 then
					_G.item_moshuhe[i - 1] = _G.item_moshuhe[i - 1] - 1

					if _G.boss_update_list[guai_name] ~= nil then
						local up = _G.boss_update_list[guai_name]
						local random = RandomInt(1, table.maxn(up))
						if up[random] ~= nil then
							my_guai_name[i] = up[random]
						end
					end
				end
				for j = 1, 1 do
					Timers:CreateTimer(j + 1, function()
						spawn_one_enemy(i - 1, my_guai_name[i])
						return
					end)
				end
			else
				local enemy_in_level = 10
				-- if _G.item_fanbei[i-1] > 0 then
				-- 	_G.item_fanbei[i-1] = _G.item_fanbei[i-1] - 1
				-- 	enemy_in_level = 20
				-- end
				_G.enemy_live_count[i - 1] = _G.enemy_live_count[i - 1] + enemy_in_level
				for j = 1, enemy_in_level do
					Timers:CreateTimer(j + 1, function()
						guai_name = _G.guai[_G.guai_level]
						--有些关卡有特殊刷怪逻辑
						if _G.guai_level == 35 and RandomInt(1, 100) > 50 then
							guai_name = guai_name .. "1"
						end
						if _G.guai_level == 36 and RandomInt(1, 100) > 50 then
							guai_name = guai_name .. "1"
						end
						if _G.guai_level == 38 and RandomInt(1, 100) > 50 then
							guai_name = guai_name .. "1"
						end
						spawn_one_enemy(i - 1, guai_name)
						return
					end)
				end
			end
			CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(i - 1), "show_enemy_count", {
				count = _G.enemy_live_count[i - 1],
				hehe = RandomFloat(0, 100),
			})
		end
	end
end
--游戏流程6——结束游戏，发送成绩
function send_ranking()
	-- if _G.myself == false then
	-- 	--不让外人提交测试榜单
	-- 	GameRules:SendCustomMessage('游戏结束，测试版本暂时不可以提交合作模式的成绩。',0,0)
	-- 	return
	-- end

	if _G.is_cheat == 2 then
		GameRules:SendCustomMessage("#text_no_upload_because_cheat", 0, 0)
	else
		if _G.is_posted_game == true then
			GameRules:SendCustomMessage("成绩已经提交过了，不再重复提交。", 0, 0)
			return
		end
		_G.is_posted_game = true
		local t = {}

		local g_time = GameRules:GetGameTime() - _G.game_time

		--统计任务完成情况
		if g_time / 60 <= 65 then
			_G.quest_status["q105"] = true
			show_quest()
		end
		if g_time / 60 <= 55 then
			_G.quest_status["q209"] = true
			show_quest()
		end
		if g_time / 60 <= 45 then
			_G.quest_status["q302"] = true
			show_quest()
		end

		if _G.gem_castle_hp >= 100 then
			_G.quest_status["q107"] = true
			show_quest()
		else
			_G.quest_status["q107"] = false
			show_quest()
		end

		local no_color_count = 0
		if _G.quest_status["q201"] == true then
			no_color_count = no_color_count + 1
		end
		if _G.quest_status["q202"] == true then
			no_color_count = no_color_count + 1
		end
		if _G.quest_status["q203"] == true then
			no_color_count = no_color_count + 1
		end
		if _G.quest_status["q204"] == true then
			no_color_count = no_color_count + 1
		end
		if _G.quest_status["q205"] == true then
			no_color_count = no_color_count + 1
		end
		if _G.quest_status["q206"] == true then
			no_color_count = no_color_count + 1
		end
		if _G.quest_status["q207"] == true then
			no_color_count = no_color_count + 1
		end
		if _G.quest_status["q208"] == true then
			no_color_count = no_color_count + 1
		end

		local finishd_quest = ""
		if _G.level > 50 then
			EmitGlobalSound("announcer_diretide_2012_announcer_victory_rad_02")
			if _G.is_ticket_bush == true then
				SetQuest("q399", true)
			end
			for m, n in pairs(_G.quest) do
				if _G.quest_status[m] == true then
					finishd_quest = finishd_quest .. m .. ","
				end
			end
		else
			EmitGlobalSound("announcer_diretide_2012_announcer_victory_dire_01")
		end

		--统计towers
		local towers = {}
		for u, v in pairs(_G.gemtd_pool) do
			if v ~= nil and v:IsNull() == false and v:GetUnitName() ~= nil then
				local t_name = v:GetUnitName()
				if string.find(t_name, "1") == nil then
					if towers[t_name] == nil then
						towers[t_name] = 1
					else
						towers[t_name] = towers[t_name] + 1
					end
				end
			end
		end
		local towers_str = ""
		for u, v in pairs(towers) do
			towers_str = towers_str .. u .. ":" .. v .. ","
		end

		_G.gem_maze_length = math.floor(_G.gem_maze_length)

		towers_str = towers_str
			.. "|"
			.. _G.level
			.. "|"
			.. g_time
			.. "|"
			.. _G.team_gold
			.. "|"
			.. _G.extra_kill
			.. "|"
			.. _G.gem_maze_length

		local heros = ""
		for datauser, datainfo in pairs(_G.playerInfoReceived) do
			heros = heros .. datainfo.onduty_hero
		end
		print(finishd_quest)

		CustomNetTables:SetTableValue("game_state", "send_ranking", {
			level = _G.level,
			kills = _G.kills,
			player_ids = _G.steam_ids_only,
			player_count = PlayerResource:GetPlayerCount(),
			seed = _G.navi,
			time_cost = g_time,
			finishd_quest = finishd_quest,
			towers = towers_str,
			gold = _G.team_gold,
			extra_kill = _G.extra_kill,
			maze_length = _G.gem_maze_length,
		})

		-- SendCoopRanking({
		-- 	level = _G.level,
		-- 	kills = _G.kills,
		-- 	player_ids = _G.steam_ids_only,
		-- 	player_count = PlayerResource:GetPlayerCount(),
		-- 	seed = _G.navi,
		-- 	time_cost = g_time,
		-- 	finishd_quest = finishd_quest,
		-- 	towers = towers_str,
		-- 	gold = _G.team_gold,
		-- 	extra_kill = _G.extra_kill,
		-- 	maze_length = _G.gem_maze_length,
		-- })
	end
end

--游戏循环1——开始建造（加建造技能）
function start_build()
	_G.game_status = 1

	_G.gem_castle:RemoveAbility("enemy_crazy")
	_G.gem_castle:RemoveModifierByName("modifier_enemy_crazy")

	_G.is_crazy = false
	_G.is_boss_entered = false

	if GetMapName() ~= "gemtd_race" then
		if _G.guangzhudaobiao ~= nil then
			_G.guangzhudaobiao:ForceKill(false)
			_G.guangzhudaobiao:Destroy()
			_G.guangzhudaobiao = nil
		end
	else
		for i, vi in pairs(_G.guangzhudaobiao_race) do
			if vi ~= nil then
				if vi:IsNull() == false then
					vi:ForceKill(false)
					vi:Destroy()
				end
				_G.guangzhudaobiao_race[i] = nil
			end
		end
	end

	if _G.level > table.maxn(_G.guai) + 1 then
		return
	end

	if _G.level > 50 then
		if _G.word_object["name"] == "aojiao" then
			LetAllMvpTowerAoJiao()
		end
		--50关以后没有建造阶段了
		_G.game_status = 2
		if GetMapName() == "gemtd_race" then
			GameRules:SetTimeOfDay(0.8)
			_G.stop_watch = GameRules:GetGameTime()
			EmitGlobalSound("GameStart.RadiantAncient")
			spawn_one_wave()
		else
			start_shuaguai()
		end
		return
	end
	-- Timers:CreateTimer(1,function()
	_G.stop_watch = nil
	-- end)

	if _G.is_debug == true then
		GameRules:SendCustomMessage(PlayerResource:GetSelectedHeroName(0), 0, 0)
		GameRules:SendCustomMessage(PlayerResource:GetSelectedHeroName(1), 0, 0)
		GameRules:SendCustomMessage(PlayerResource:GetSelectedHeroName(2), 0, 0)
		GameRules:SendCustomMessage(PlayerResource:GetSelectedHeroName(3), 0, 0)
	end

	if PlayerResource:GetSelectedHeroName(0) ~= nil then
		CustomNetTables:SetTableValue(
			"game_state",
			"select_hero1",
			{
				p1 = PlayerResource:GetSelectedHeroName(0),
				p2 = PlayerResource:GetSelectedHeroName(1),
				p3 = PlayerResource:GetSelectedHeroName(2),
				p4 = PlayerResource:GetSelectedHeroName(3),
			}
		)
	end

	--第一关，创建初始的石头
	if _G.level == 1 and _G.is_default_builded == false then
		_G.gem_map = {}
		for i = 1, 37 do
			_G.gem_map[i] = {}
			for j = 1, 37 do
				_G.gem_map[i][j] = 0
			end
		end
		_G.gem_item = {}
		for i = 1, 37 do
			_G.gem_item[i] = {}
			for j = 1, 37 do
				_G.gem_item[i][j] = 0
			end
		end
		local defult = _G.default_stone[PlayerResource:GetPlayerCount()]
		if GetMapName() == "gemtd_race" then
			defult = _G.default_stone_race

			for x = 1, 37 do
				_G.gem_map[19][x] = 1
				_G.gem_map[18][x] = 1
				_G.gem_map[20][x] = 1
			end
			for y = 1, 37 do
				_G.gem_map[y][18] = 1
				_G.gem_map[y][19] = 1
				_G.gem_map[y][20] = 1
			end
		end

		for i = 1, table.maxn(defult) do
			--网格化坐标
			local x = defult[i].x
			local y = defult[i].y
			local xxx = (x - 19) * 128
			local yyy = (y - 19) * 128

			if _G.gem_map[y][x] == 0 then
				_G.gem_map[y][x] = 1

				local p = Vector(xxx, yyy, 128)
				p.z = 1400
				local u2 = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
				u2.ftd = 2009
				u2:SetOwner(_G.gem_castle)
				ChangeStoneStyle(u2)
				u2:SetControllableByPlayer(0, true)
				u2:SetForwardVector(Vector(-1, 0, 0))

				u2:AddAbility("no_hp_bar")
				u2:FindAbilityByName("no_hp_bar"):SetLevel(1)
				u2:RemoveModifierByName("modifier_invulnerable")
				u2:SetHullRadius(1)

				fall(u2)
			end
		end

		_G.is_default_builded = true
	end

	FindEnemyPath()

	GameRules:SetTimeOfDay(0.3)

	EmitGlobalSound("Loot_Drop_Stinger_Legendary")
	-- EmitGlobalSound("FrostivusGameStart.RadiantSide")
	-- EmitGlobalSound("diretide_select_target_Stinger")

	--给所有英雄建造和拆除的技能
	local ii = 0
	for ii = 0, 20 do
		if PlayerResource:IsValidPlayer(ii) then
			local player = PlayerResource:GetPlayer(ii)
			if player ~= nil then
				local h = player:GetAssignedHero()
				if h ~= nil and _G.is_build_ready[ii] == true then
					_G.is_build_ready[ii] = false
					h.build_level = _G.level

					h:FindAbilityByName("gemtd_build_stone"):SetActivated(true)
					h:FindAbilityByName("gemtd_remove"):SetActivated(true)
					h:SetMana(5.0)

					--只有建造阶段能用的技能
					SetAbilityActiveStatus(h, true)

					set_build_hummer(ii, _G.level - _G.build_ready_wave[ii])
				end
			end
		end
	end

	for i = 0, 3 do
		local h = _G.gem_hero[i]
		if h ~= nil and h:IsNull() == false and _G.is_build_ready[i] == true then
			_G.is_build_ready[i] = false
			h.build_level = _G.level
			if h:FindAbilityByName("gemtd_build_stone") ~= nil then
				h:FindAbilityByName("gemtd_build_stone"):SetActivated(true)
			end
			if h:FindAbilityByName("gemtd_remove") ~= nil then
				h:FindAbilityByName("gemtd_remove"):SetActivated(true)
			end

			h:SetMana(5.0)
			SetAbilityActiveStatus(h, true)
		end
	end
end
function SetAbilityActiveStatus(h, is_build_status)
	local build_a_list = {
		"gemtd_hero_shitou",
		"gemtd_hero_lanse",
		"gemtd_hero_danbai",
		"gemtd_hero_baise",
		"gemtd_hero_hongse",
		"gemtd_hero_lvse",
		"gemtd_hero_fense",
		"gemtd_hero_huangse",
		"gemtd_hero_zise",
		"gemtd_hero_putong",
		"gemtd_hero_wuxia",
		"gemtd_hero_wanmei",
		"gemtd_hero_guangzhudaobiao",
		"gemtd_hero_huidaoguoqu",
	}

	local shuaguai_a_list = {
		"gemtd_hero_shanbi",
		"gemtd_hero_shouhu",
		"gemtd_hero_beishuiyizhan",
		"gemtd_hero_kuaisusheji",
		"gemtd_hero_baoji",
		"gemtd_hero_miaozhun",
		"gemtd_hero_lianjie",
	}

	if is_build_status == true then
		for u, i in pairs(build_a_list) do
			if h:FindAbilityByName(i) ~= nil then
				h:FindAbilityByName(i):SetActivated(true)
			end
		end
		for u, j in pairs(shuaguai_a_list) do
			if h:FindAbilityByName(j) ~= nil then
				h:FindAbilityByName(j):SetActivated(false)
			end
		end
	else
		for u, i in pairs(build_a_list) do
			if h:FindAbilityByName(i) ~= nil then
				h:FindAbilityByName(i):SetActivated(false)
			end
		end
		for u, j in pairs(shuaguai_a_list) do
			if h:FindAbilityByName(j) ~= nil then
				h:FindAbilityByName(j):SetActivated(true)
			end
		end
	end
end
--游戏循环2——建造石头（建完5个就判断能否一回合合成）
function gemtd_build_stone(keys)
	local caster = keys.caster
	CustomNetTables:SetTableValue(
		"game_state",
		"disable_repick",
		{ heroindex = caster:GetEntityIndex(), hehe = RandomInt(1, 10000) }
	)
	local owner = caster:GetOwner()
	if owner == nil then
		return
	end
	local player_id = owner:GetPlayerID()
	local ability = keys.ability
	local p = keys.target_points[1] or ability:GetCursorPosition() or caster.target_position
	local hero_level = caster:GetLevel()

	_G.is_game_really_started = true

	--网格化坐标
	local xxx = math.floor((p.x + 64) / 128) + 19
	local yyy = math.floor((p.y + 64) / 128) + 19
	p.x = math.floor((p.x + 64) / 128) * 128
	p.y = math.floor((p.y + 64) / 128) * 128

	if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
		if xxx >= 29 and yyy <= 9 then
			CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
				text = "text_mima_cannot_build_here",
			})
			return
		end
		if xxx <= 9 and yyy >= 29 then
			CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
				text = "text_mima_cannot_build_here",
			})
			return
		end
	end

	--竞速模式，不能在别人的区域建造
	if GetMapName() == "gemtd_race" then
		if check_area(player_id, p) == false then
			CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
				text = "text_mima_cannot_build_here",
			})
			return false
		end
	end

	--50关以后不能造
	if _G.level > 50 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_build_here",
		})
		return
	end

	--附近有怪，不能造
	local uu = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		p,
		nil,
		64,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_ANY_ORDER,
		false
	)
	if table.getn(uu) > 0 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_build_here",
		})
		return
	end

	--附近有友军单位了，不能造
	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		p,
		nil,
		32,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS,
		FIND_ANY_ORDER,
		false
	)
	local is_block = false
	for i = 1, table.maxn(uuu) do
		if uuu[i] ~= nil and uuu[i]:GetUnitName() == "gemtd_stone" then
			uuu[i]:Destroy()
		elseif uuu[i] ~= nil and uuu[i]:IsHero() == false then
			is_block = true
		end
	end

	if is_block == true then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_build_here",
		})
		return false
	end

	--路径点，不能造
	if GetMapName() ~= "gemtd_race" then
		for i = 1, 7 do
			local p1 = Entities:FindByName(nil, "path" .. i):GetAbsOrigin()
			local xxx1 = math.floor((p1.x + 64) / 128) + 19
			local yyy1 = math.floor((p1.y + 64) / 128) + 19
			if xxx == xxx1 and yyy == yyy1 then
				CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
					text = "text_mima_cannot_build_here",
				})
				return
			end
		end
	end
	if GetMapName() == "gemtd_race" then
		for j = 0, 3 do
			for i = 1, 7 do
				local p1 = Entities:FindByName(nil, "path" .. ((10 * j) + i)):GetAbsOrigin()
				local xxx1 = math.floor((p1.x + 64) / 128) + 19
				local yyy1 = math.floor((p1.y + 64) / 128) + 19
				if xxx == xxx1 and yyy == yyy1 then
					CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
						text = "text_mima_cannot_build_here",
					})
					return
				end
			end
		end
	end

	--地图范围外，不能造
	if xxx < 1 or xxx > 37 or yyy < 1 or yyy > 37 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_build_here",
		})
		return
	end

	if _G.gem_map == nil then
		_G.gem_map = {}
		for i = 1, 37 do
			_G.gem_map[i] = {}
			for j = 1, 37 do
				_G.gem_map[i][j] = 0
			end
		end
	end

	_G.gem_map[yyy][xxx] = 1

	if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
		--合作模式判断堵路
		find_all_path()
		--路完全堵死了，不能造
		for i = 1, 6 do
			if table.maxn(_G.gem_path[i]) < 1 then
				CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
					text = "text_mima_cannot_block_maze",
				})
				--回退地图，重新寻路
				_G.gem_map[yyy][xxx] = 0

				find_all_path()
				return
			end
		end
	else
		--竞速模式判断堵路
		find_all_path_race(player_id)
		--路完全堵死了，不能造
		for i = 1, 6 do
			if table.maxn(_G.gem_path_race[player_id][i]) < 1 then
				CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
					text = "text_mima_cannot_block_maze",
				})
				--回退地图，重新寻路
				_G.gem_map[yyy][xxx] = 0
				find_all_path_race(player_id)
				return
			end
		end

		--判断是否所有我的怪都能走到他的target_path
		local pathok = true
		local vv = FindUnitsInRadius(
			DOTA_TEAM_BADGUYS,
			p,
			nil,
			9999,
			DOTA_UNIT_TARGET_TEAM_FRIENDLY,
			DOTA_UNIT_TARGET_ALL,
			DOTA_UNIT_TARGET_FLAG_NONE,
			FIND_ANY_ORDER,
			false
		)
		for k, vk in pairs(vv) do
			if vk.player == player_id then
				if string.find(vk:GetUnitName(), "fly") == nil then
					local targetp = nil
					if
						vk.target_path ~= nil
						and vk.target_path == "gemtd_guangzhudaobiao"
						and _G.guangzhudaobiao_race ~= nil
						and _G.guangzhudaobiao_race[player_id] ~= nil
					then
						targetp = _G.guangzhudaobiao_race[player_id]:GetAbsOrigin()
					elseif vk.target_path ~= nil then
						targetp = Entities:FindByName(nil, "path" .. vk.target_path):GetAbsOrigin()
					end
					local check_result = check_path_race(vk:GetAbsOrigin(), targetp)
					if check_result == false then
						pathok = false
						break
					end
				end
			end
		end
		if pathok == false then
			CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
				text = "text_mima_cannot_block_maze",
			})
			--回退地图，重新寻路
			_G.gem_map[yyy][xxx] = 0
			find_all_path_race(player_id)
			return
		end
	end

	---------------------------------------------------------------------
	--至此验证ok了，可以正式开始建造石头了
	--------------------------------------------------------------------

	local ran = RandomInt(1, 100)
	local stone_level = "1"
	local curr_per = 0
	if _G.gem_gailv[hero_level] ~= nil then
		for per, lv in pairs(_G.gem_gailv[hero_level]) do
			if ran > per and curr_per <= per then
				curr_per = per
				stone_level = lv
			end
		end
	end
	if caster.pray_level ~= nil and GetMapName() ~= "gemtd_race" and _G.perfected ~= true then
		if RandomInt(1, 100) < tonumber(caster.pray_l) then
			stone_level = tonumber(caster.pray_level)
			_G.perfected = true
		end
	end
	if caster.pray_level ~= nil and GetMapName() == "gemtd_race" and caster.perfected ~= true then
		if RandomInt(1, 100) < tonumber(caster.pray_l) then
			stone_level = tonumber(caster.pray_level)
			caster.perfected = true
		end
	end
	caster.pray_level = nil
	caster.pray_l = nil

	--随机决定石头种类
	local ran = RandomInt(1, table.maxn(_G.gem_tower_basic))
	if caster.pray ~= nil then
		if RandomInt(1, 100) < tonumber(caster.pray) then
			ran = tonumber(caster.pray_color)
		end
	end
	caster.pray_color = nil
	caster.pray = nil

	local create_stone_name = _G.gem_tower_basic[ran] .. stone_level

	if _G.crab ~= nil then
		create_stone_name = "gemtd_" .. _G.crab
		_G.crab = nil
	end

	--创建石头
	u = CreateUnitByName(create_stone_name, p, false, nil, nil, DOTA_TEAM_GOODGUYS)

	-- u:SetRangedProjectileName("particles/econ/items/enchantress/enchantress_virgas/ench_impetus_virgas.vpcf")

	u.ftd = 2009
	u:SetOwner(caster)
	u:SetControllableByPlayer(player_id, true)
	u:SetForwardVector(Vector(0, -1, 0))
	u:AddAbility("no_hp_bar")
	u:FindAbilityByName("no_hp_bar"):SetLevel(1)
	u:AddAbility("gemtd_tower_new")
	u:FindAbilityByName("gemtd_tower_new"):SetLevel(1)

	EmitGlobalSound("Item.DropWorld")
	--添加玩家颜色底盘
	local particle =
		ParticleManager:CreateParticle("particles/gem/team_" .. (player_id + 1) .. ".vpcf", PATTACH_ABSORIGIN_FOLLOW, u)
	u.ppp = particle

	u:RemoveModifierByName("modifier_invulnerable")
	u:SetHullRadius(1)

	_G.build_curr[player_id][_G.build_index[player_id]] = u
	_G.build_index[player_id] = _G.build_index[player_id] + 1
	send_merge_board(player_id)

	caster:SetMana(5 - _G.build_index[player_id])
	--已经建完5个了
	if _G.build_index[player_id] >= 5 then
		_G.build_index[player_id] = 0

		caster:FindAbilityByName("gemtd_build_stone"):SetActivated(false)
		caster:FindAbilityByName("gemtd_remove"):SetActivated(false)

		--判断能不能合并成+1 +2级的
		for i = 0, 4 do
			if _G.build_curr[player_id][i] ~= nil and _G.build_curr[player_id][i]:IsNull() == false then
				local curr_name = _G.build_curr[player_id][i]:GetUnitName()
				local repeat_count = 0
				for j = 0, 4 do
					if _G.build_curr[player_id][j] ~= nil and _G.build_curr[player_id][j]:IsNull() == false then
						local curr_name2 = _G.build_curr[player_id][j]:GetUnitName()
						if curr_name == curr_name2 then
							repeat_count = repeat_count + 1
						end
					end
				end
				local unit_name = _G.build_curr[player_id][i]:GetUnitName()
				local string_length = string.len(unit_name)
				local count_1 = 0
				for i = 1, string_length do
					local index = string_length + 1 - i
					if string.sub(unit_name, index, index) == "1" then
						count_1 = count_1 + 1
					end
				end

				if count_1 >= 2 then
					_G.build_curr[player_id][i]:AddAbility("gemtd_downgrade_stone")
					_G.build_curr[player_id][i]:FindAbilityByName("gemtd_downgrade_stone"):SetLevel(1)
					--风暴之锤
					if caster:FindAbilityByName("gemtd_hero_fengbaozhichui") ~= nil then
						local fengbaozhichui_level = caster:FindAbilityByName("gemtd_hero_fengbaozhichui"):GetLevel()
						_G.build_curr[player_id][i]:AddAbility("gemtd_downgrade_stone_fengbaozhichui")
						_G.build_curr[player_id][i]
							:FindAbilityByName("gemtd_downgrade_stone_fengbaozhichui")
							:SetLevel(fengbaozhichui_level)
					end
				end

				_G.build_curr[player_id][i]:AddAbility("gemtd_choose_stone")
				_G.build_curr[player_id][i]:FindAbilityByName("gemtd_choose_stone"):SetLevel(1)

				if repeat_count >= 4 then
					_G.build_curr[player_id][i]:AddAbility("gemtd_choose_update_stone")
					_G.build_curr[player_id][i]:FindAbilityByName("gemtd_choose_update_stone"):SetLevel(1)
					_G.build_curr[player_id][i]:AddAbility("gemtd_choose_update_update_stone")
					_G.build_curr[player_id][i]:FindAbilityByName("gemtd_choose_update_update_stone"):SetLevel(1)

					if caster.effect ~= nil and caster.effect ~= "" then
						_G.build_curr[player_id][i]:AddAbility(caster.effect)
						_G.build_curr[player_id][i]:FindAbilityByName(caster.effect):SetLevel(1)
						_G.build_curr[player_id][i].effect = caster.effect
					end
				elseif repeat_count >= 2 then
					_G.build_curr[player_id][i]:AddAbility("gemtd_choose_update_stone")
					_G.build_curr[player_id][i]:FindAbilityByName("gemtd_choose_update_stone"):SetLevel(1)
				end
			end
		end

		--检查能否一回合合成高级塔
		for h, h_merge in pairs(_G.gemtd_merge) do
			local can_merge = true
			local merge_pool = {}

			for k, k_unitname in pairs(h_merge) do
				local have_merge = false
				for c, c_unit in pairs(_G.build_curr[player_id]) do
					if c_unit ~= nil and c_unit:IsNull() == false and c_unit:GetUnitName() == k_unitname then
						--有这个合成配方
						have_merge = true
						table.insert(merge_pool, c_unit)
					end
				end
				if have_merge == false then
					can_merge = false
				end
			end

			if can_merge == true then
				--可以合成，给它们增加技能
				_G.gemtd_pool_can_merge_1[h] = {}

				for a, a_unit in pairs(merge_pool) do
					a_unit:AddAbility(h .. "1")
					a_unit:FindAbilityByName(h .. "1"):SetLevel(1)
					--GameRules:SendCustomMessage("可以合成"..h, 0, 0)

					if caster.effect ~= nil and caster.effect ~= "" then
						a_unit:AddAbility(caster.effect)
						a_unit:FindAbilityByName(caster.effect):SetLevel(1)
						a_unit.effect = caster.effect
					end

					table.insert(_G.gemtd_pool_can_merge_1[player_id], a_unit)
				end
			end
		end

		--检查能否一回合合成隐藏塔
		for h, h_merge in pairs(_G.gemtd_merge_secret) do
			local can_merge = true
			local merge_pool = {}

			for k, k_unitname in pairs(h_merge) do
				local have_merge = false
				for c, c_unit in pairs(_G.build_curr[player_id]) do
					if c_unit ~= nil and c_unit:IsNull() == false and c_unit:GetUnitName() == k_unitname then
						--有这个合成配方
						have_merge = true
						table.insert(merge_pool, c_unit)
					end
				end
				if have_merge == false then
					can_merge = false
				end
			end

			if can_merge == true then
				--可以合成，给它们增加技能
				_G.gemtd_pool_can_merge_1[h] = {}

				for a, a_unit in pairs(merge_pool) do
					a_unit:AddAbility(h .. "1")
					a_unit:FindAbilityByName(h .. "1"):SetLevel(1)
					--GameRules:SendCustomMessage("可以合成"..h, 0, 0)

					if caster.effect ~= nil and caster.effect ~= "" then
						a_unit:AddAbility(caster.effect)
						a_unit:FindAbilityByName(caster.effect):SetLevel(1)
						a_unit.effect = caster.effect
					end

					table.insert(_G.gemtd_pool_can_merge_1[player_id], a_unit)
				end
			end
		end

		--检查能否一回合合成石板
		for h, h_merge in pairs(_G.gemtd_merge_shiban) do
			local can_merge = true
			local merge_pool = {}

			for k, k_unitname in pairs(h_merge) do
				local have_merge = false
				for c, c_unit in pairs(_G.build_curr[player_id]) do
					if c_unit ~= nil and c_unit:IsNull() == false and c_unit:GetUnitName() == k_unitname then
						--有这个合成配方
						have_merge = true
						table.insert(merge_pool, c_unit)
					end
				end
				if have_merge == false then
					can_merge = false
				end
			end

			if can_merge == true then
				--可以合成，给它们增加技能
				_G.gemtd_pool_can_merge_shiban[h] = {}

				for a, a_unit in pairs(merge_pool) do
					a_unit:AddAbility(h .. "_sb")
					a_unit:FindAbilityByName(h .. "_sb"):SetLevel(1)
					--GameRules:SendCustomMessage("可以合成"..h, 0, 0)

					if caster.effect ~= nil and caster.effect ~= "" then
						a_unit:AddAbility(caster.effect)
						a_unit:FindAbilityByName(caster.effect):SetLevel(1)
						a_unit.effect = caster.effect
					end

					table.insert(_G.gemtd_pool_can_merge_shiban[player_id], a_unit)
				end
			end
		end
	end
end
function merge_shiban(shiban_name, shiban_ability, shiban_cd, caster)
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()

	local p = owner:GetAbsOrigin()
	--网格化坐标
	local xxx = math.floor((p.x + 64) / 128) + 19
	local yyy = math.floor((p.y + 64) / 128) + 19
	p.x = math.floor((p.x + 64) / 128) * 128
	p.y = math.floor((p.y + 64) / 128) * 128

	if GetMapName() ~= "gemtd_race" then
		--path1和path7附近 不能造
		if xxx >= 29 and yyy <= 9 then
			EmitGlobalSound("ui.crafting_gem_drop")
			return
		end

		if xxx <= 9 and yyy >= 29 then
			EmitGlobalSound("ui.crafting_gem_drop")
			return
		end
	end
	if GetMapName() == "gemtd_race" and check_area(player_id, p) == false then
		EmitGlobalSound("ui.crafting_gem_drop")
		return
	end
	--附近有怪，不能造
	local uu = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		p,
		nil,
		192,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_ANY_ORDER,
		false
	)
	if table.getn(uu) > 0 then
		EmitGlobalSound("ui.crafting_gem_drop")
		-- GameRules:SendCustomMessage('附近有怪不能造',0,0)
		return
	end
	--附近有友军单位了，不能造
	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		p,
		nil,
		58,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS,
		FIND_ANY_ORDER,
		false
	)
	if table.getn(uuu) > 0 then
		EmitGlobalSound("ui.crafting_gem_drop")
		return
	end
	--路径点，不能造
	if GetMapName() ~= "gemtd_race" then
		for i = 1, 7 do
			local p1 = Entities:FindByName(nil, "path" .. i):GetAbsOrigin()
			local xxx1 = math.floor((p1.x + 64) / 128) + 19
			local yyy1 = math.floor((p1.y + 64) / 128) + 19
			if xxx == xxx1 and yyy == yyy1 then
				EmitGlobalSound("ui.crafting_gem_drop")
				return
			end
		end
	end
	if GetMapName() == "gemtd_race" then
		for j = 0, 3 do
			for i = 1, 7 do
				local p1 = Entities:FindByName(nil, "path" .. ((10 * j) + i)):GetAbsOrigin()
				local xxx1 = math.floor((p1.x + 64) / 128) + 19
				local yyy1 = math.floor((p1.y + 64) / 128) + 19
				if xxx == xxx1 and yyy == yyy1 then
					EmitGlobalSound("ui.crafting_gem_drop")
					return
				end
			end
		end
	end
	--地图范围外，不能造
	if xxx < 1 or xxx > 37 or yyy < 1 or yyy > 37 then
		EmitGlobalSound("ui.crafting_gem_drop")
		return
	end
	--建造石板
	local u = CreateUnitByName(shiban_name, p, false, nil, nil, DOTA_TEAM_GOODGUYS)
	u.ftd = 2009

	--发弹幕
	ShowCombat({
		t = "combine",
		player = player_id,
		text = shiban_name,
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = shiban_name, hehe = RandomInt(1,100000)})

	_G.shiban_index[xxx .. "_" .. yyy] = u
	u:SetOwner(owner)
	u:SetControllableByPlayer(player_id, true)

	u:AddAbility("no_hp_bar")
	u:FindAbilityByName("no_hp_bar"):SetLevel(1)
	u:RemoveModifierByName("modifier_invulnerable")
	u:SetHullRadius(1)
	table.insert(_G.gemtd_pool, u)
	table.insert(_G.gemtd_pool_race[player_id], u)

	u:SetForwardVector(Vector(1, 0, 0))
	u.is_merged = true
	u.kill_count = 0

	play_merge_particle(u)
	EmitGlobalSound("Loot_Drop_Stinger_Rare")
	start_shiban_timer(u, shiban_ability, shiban_cd)

	for i = 0, 4 do
		local p = _G.build_curr[player_id][i]:GetAbsOrigin()
		--删除玩家颜色底盘
		if _G.build_curr[player_id][i].ppp then
			ParticleManager:DestroyParticle(_G.build_curr[player_id][i].ppp, true)
		end
		_G.build_curr[player_id][i]:Destroy()
		--用普通石头代替
		p.z = 1400
		local u = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
		u.ftd = 2009

		u:SetOwner(owner)
		ChangeStoneStyle(u)
		u:SetControllableByPlayer(player_id, true)
		u:SetForwardVector(Vector(-1, 0, 0))

		u:AddAbility("no_hp_bar")
		u:FindAbilityByName("no_hp_bar"):SetLevel(1)
		u:RemoveModifierByName("modifier_invulnerable")
		u:SetHullRadius(1)
	end
	_G.build_curr[player_id] = {}
	_G.is_build_ready[player_id] = true
	SetAbilityActiveStatus(owner, false)

	finish_build(player_id)
	--检测能否合成高级石板
	Timers:CreateTimer(1, function()
		merge_shiban_update(xxx, yyy)
	end)

	send_merge_board(player_id)
end
--竞速模式检查是否在自己的合法建造区域
function check_area(player_id, p)
	local xxx = math.floor((p.x + 64) / 128) + 19
	local yyy = math.floor((p.y + 64) / 128) + 19
	if player_id == 0 and (xxx > 17 or yyy < 20) then
		return false
	end
	if player_id == 1 and (xxx < 20 or yyy < 20) then
		return false
	end
	if player_id == 2 and (xxx > 17 or yyy > 17) then
		return false
	end
	if player_id == 3 and (xxx < 20 or yyy > 17) then
		return false
	end
	if
		Entities:FindByName(nil, "path1") ~= nil
		and (Entities:FindByName(nil, "path1"):GetAbsOrigin() - p):Length2D() < 128 * 1.5
	then
		return false
	end
	if
		Entities:FindByName(nil, "path11") ~= nil
		and (Entities:FindByName(nil, "path11"):GetAbsOrigin() - p):Length2D() < 128 * 1.5
	then
		return false
	end
	if
		Entities:FindByName(nil, "path21") ~= nil
		and (Entities:FindByName(nil, "path21"):GetAbsOrigin() - p):Length2D() < 128 * 1.5
	then
		return false
	end
	if
		Entities:FindByName(nil, "path31") ~= nil
		and (Entities:FindByName(nil, "path31"):GetAbsOrigin() - p):Length2D() < 128 * 1.5
	then
		return false
	end
	if
		Entities:FindByName(nil, "path7") ~= nil
		and (Entities:FindByName(nil, "path7"):GetAbsOrigin() - p):Length2D() < 128 * 1.5
	then
		return false
	end
	if
		Entities:FindByName(nil, "path17") ~= nil
		and (Entities:FindByName(nil, "path17"):GetAbsOrigin() - p):Length2D() < 128 * 1.5
	then
		return false
	end
	if
		Entities:FindByName(nil, "path27") ~= nil
		and (Entities:FindByName(nil, "path27"):GetAbsOrigin() - p):Length2D() < 128 * 1.5
	then
		return false
	end
	if
		Entities:FindByName(nil, "path37") ~= nil
		and (Entities:FindByName(nil, "path37"):GetAbsOrigin() - p):Length2D() < 128 * 1.5
	then
		return false
	end
	return true
end
function DestroyUnit(target)
	if target ~= nil and target:IsNull() == false then
		target:AddNoDraw()
		-- target:SetAbsOrigin(Vector(0,0,0))
		target:ForceKill(false)
		local children = target:GetChildren()
		for k, child in pairs(children) do
			if
				child
				and child:IsNull() == false
				and (child:GetClassname() == "dota_item_wearable" or child:GetClassname() == "prop_dynamic")
			then
				child:RemoveSelf()
			end
		end
	end
end
--移除石头
function gemtd_remove(keys)
	-- for k,_ in pairs(keys) do
	-- 	print(k)
	-- end
	local caster = keys.caster
	local target = keys.target
	-- print(target:GetUnitName())
	local owner = caster:GetOwner()
	if target == nil or target:IsNull() == true then
		return
	end
	if target:GetUnitName() ~= "gemtd_stone" then
		return
	end
	if check_area(caster:GetPlayerID(), target:GetAbsOrigin()) == false and GetMapName() == "gemtd_race" then
		EmitGlobalSound("ui.crafting_gem_drop")
		return
	end
	local xxx = math.floor((target:GetAbsOrigin().x + 64) / 128) + 19
	local yyy = math.floor((target:GetAbsOrigin().y + 64) / 128) + 19

	_G.gem_map[yyy][xxx] = 0

	if target.ppp then
		ParticleManager:DestroyParticle(target.ppp, true)
	end
	-- target:Destroy()
	DestroyUnit(target)

	EmitGlobalSound("ui.browser_click_right")
	find_all_path()
end
--游戏循环3——选择留下石头5种情况
function choose_stone(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()

	caster:RemoveAbility("gemtd_choose_stone")
	caster:RemoveAbility("gemtd_choose_update_stone")
	caster:RemoveAbility("gemtd_choose_update_update_stone")
	for i = 0, 4 do
		if
			_G.build_curr ~= nil
			and _G.build_curr[player_id] ~= nil
			and _G.build_curr[player_id][i] ~= nil
			and _G.build_curr[player_id][i] ~= caster
		then
			if _G.build_curr[player_id][i]:IsNull() == true then
				return
			end
			--移除其他的石头
			local p = _G.build_curr[player_id][i]:GetAbsOrigin()
			--删除玩家颜色底盘
			if _G.build_curr[player_id][i].ppp then
				ParticleManager:DestroyParticle(_G.build_curr[player_id][i].ppp, true)
			end
			_G.build_curr[player_id][i]:Destroy()
			--用普通石头代替
			p.z = 1400
			local u = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
			u.ftd = 2009

			u:SetOwner(owner)
			ChangeStoneStyle(u)
			u:SetControllableByPlayer(player_id, true)
			u:SetForwardVector(Vector(-1, 0, 0))

			u:AddAbility("no_hp_bar")
			u:FindAbilityByName("no_hp_bar"):SetLevel(1)

			u:RemoveModifierByName("modifier_invulnerable")
			u:SetHullRadius(1)
		end
	end

	--移除caster，用同级的代替
	local unit_name = caster:GetUnitName()
	local p = caster:GetAbsOrigin()
	local caster_died = caster
	--删除玩家颜色底盘
	if caster.ppp then
		ParticleManager:DestroyParticle(caster.ppp, true)
	end
	caster:Destroy()

	EmitGlobalSound("ui.npe_objective_given")

	stone_quest(unit_name)

	local u = CreateUnitByName(unit_name, p, false, nil, nil, DOTA_TEAM_GOODGUYS)
	-- u:SetRangedProjectileName("particles/econ/items/enchantress/enchantress_virgas/ench_impetus_virgas.vpcf")
	u.ftd = 2009

	u:SetOwner(owner)
	u:SetControllableByPlayer(player_id, true)
	u:SetForwardVector(Vector(0, -1, 0))

	u:AddAbility("no_hp_bar")
	u:FindAbilityByName("no_hp_bar"):SetLevel(1)
	u:AddAbility("gemtd_tower_base")
	u:FindAbilityByName("gemtd_tower_base"):SetLevel(1)
	u:AddAbility("gemtd_tower_select")
	u:FindAbilityByName("gemtd_tower_select"):SetLevel(1)

	-- 特效测试
	-- local blood_pfx = ParticleManager:CreateParticle("particles/gem/screen_arcane_drop.vpcf", PATTACH_EYES_FOLLOW, u)

	-- 添加玩家颜色底盘
	local particle = ParticleManager:CreateParticle("particles/gem/team_0.vpcf", PATTACH_ABSORIGIN_FOLLOW, u)
	u.ppp = particle

	u:RemoveModifierByName("modifier_invulnerable")
	u:SetHullRadius(1)

	table.insert(_G.gemtd_pool, u)
	table.insert(_G.gemtd_pool_race[player_id], u)

	_G.build_curr[player_id] = {}
	_G.is_build_ready[player_id] = true
	SetAbilityActiveStatus(owner, false)

	finish_build(player_id)

	send_merge_board(player_id)
end
function choose_update_stone(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()

	--GameRules:SendCustomMessage("选择了石头", 0, 0)
	caster:RemoveAbility("gemtd_choose_stone")
	caster:RemoveAbility("gemtd_choose_update_stone")
	caster:RemoveAbility("gemtd_choose_update_update_stone")
	for i = 0, 4 do
		if
			_G.build_curr ~= nil
			and _G.build_curr[player_id] ~= nil
			and _G.build_curr[player_id][i]
			and _G.build_curr[player_id][i] ~= caster
		then
			if _G.build_curr[player_id][i]:IsNull() == true then
				return
			end
			--移除其他的石头
			local p = _G.build_curr[player_id][i]:GetAbsOrigin()
			--删除玩家颜色底盘
			if _G.build_curr[player_id][i].ppp then
				ParticleManager:DestroyParticle(_G.build_curr[player_id][i].ppp, true)
			end
			_G.build_curr[player_id][i]:Destroy()
			--用普通石头代替
			p.z = 1400
			local u = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
			u.ftd = 2009

			u:SetOwner(owner)
			ChangeStoneStyle(u)
			u:SetControllableByPlayer(player_id, true)
			u:SetForwardVector(Vector(-1, 0, 0))

			u:AddAbility("no_hp_bar")
			u:FindAbilityByName("no_hp_bar"):SetLevel(1)
			u:RemoveModifierByName("modifier_invulnerable")
			u:SetHullRadius(1)
		end
	end

	--移除caster，用高一级的代替
	local unit_name = caster:GetUnitName() .. "1"
	local p = caster:GetAbsOrigin()
	local caster_died = caster
	--删除玩家颜色底盘
	if caster.ppp then
		ParticleManager:DestroyParticle(caster.ppp, true)
	end
	caster:Destroy()

	EmitGlobalSound("ui.npe_objective_given")

	stone_quest(unit_name)

	local u = CreateUnitByName(unit_name, p, false, nil, nil, DOTA_TEAM_GOODGUYS)
	u.ftd = 2009

	u:SetOwner(owner)
	u:SetControllableByPlayer(player_id, true)
	u:SetForwardVector(Vector(0, -1, 0))

	u:AddAbility("no_hp_bar")
	u:FindAbilityByName("no_hp_bar"):SetLevel(1)
	u:AddAbility("gemtd_tower_select")
	u:FindAbilityByName("gemtd_tower_select"):SetLevel(1)

	--添加玩家颜色底盘
	local particle = ParticleManager:CreateParticle("particles/gem/team_0.vpcf", PATTACH_ABSORIGIN_FOLLOW, u)
	u.ppp = particle

	u:RemoveModifierByName("modifier_invulnerable")

	u:SetHullRadius(1)

	table.insert(_G.gemtd_pool, u)
	table.insert(_G.gemtd_pool_race[player_id], u)

	--AMHC:CreateNumberEffect(u,1,2,AMHC.MSG_DAMAGE,"yellow",0)

	_G.build_curr[player_id] = {}
	_G.is_build_ready[player_id] = true
	SetAbilityActiveStatus(owner, false)

	send_merge_board(player_id)

	finish_build(player_id)
end
function choose_update_update_stone(keys)
	--print("------------------------")
	--DeepPrintTable(keys)

	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()

	--GameRules:SendCustomMessage("选择了石头", 0, 0)
	caster:RemoveAbility("gemtd_choose_stone")
	caster:RemoveAbility("gemtd_choose_update_stone")
	caster:RemoveAbility("gemtd_choose_update_update_stone")

	for i = 0, 4 do
		if _G.build_curr[player_id][i] ~= caster then
			--移除其他的石头
			local p = _G.build_curr[player_id][i]:GetAbsOrigin()
			--删除玩家颜色底盘
			if _G.build_curr[player_id][i].ppp then
				ParticleManager:DestroyParticle(_G.build_curr[player_id][i].ppp, true)
			end
			_G.build_curr[player_id][i]:Destroy()
			--用普通石头代替
			p.z = 1400
			local u = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
			u.ftd = 2009

			u:SetOwner(owner)
			ChangeStoneStyle(u)
			u:SetControllableByPlayer(player_id, true)
			u:SetForwardVector(Vector(-1, 0, 0))

			u:AddAbility("no_hp_bar")
			u:FindAbilityByName("no_hp_bar"):SetLevel(1)
			u:RemoveModifierByName("modifier_invulnerable")
			u:SetHullRadius(1)
		end
	end

	--移除caster，用高两级的代替
	local unit_name = caster:GetUnitName()
	if
		unit_name == "gemtd_y11111"
		or unit_name == "gemtd_p11111"
		or unit_name == "gemtd_b11111"
		or unit_name == "gemtd_r11111"
		or unit_name == "gemtd_g11111"
		or unit_name == "gemtd_d11111"
		or unit_name == "gemtd_q11111"
		or unit_name == "gemtd_e11111"
	then
		unit_name = "gemtd_zhenjiazhishi"
	else
		unit_name = unit_name .. "11"
	end
	local p = caster:GetAbsOrigin()
	local caster_died = caster
	--删除玩家颜色底盘
	if caster.ppp then
		ParticleManager:DestroyParticle(caster.ppp, true)
	end
	caster:Destroy()

	EmitGlobalSound("ui.npe_objective_given")

	stone_quest(unit_name)

	local u = CreateUnitByName(unit_name, p, false, nil, nil, DOTA_TEAM_GOODGUYS)
	u.ftd = 2009
	PlayCombineSound(u)

	--发弹幕
	ShowCombat({
		t = "combine",
		player = player_id,
		text = unit_name,
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = unit_name, hehe = RandomInt(1,100000)})

	u:SetOwner(owner)
	u:SetControllableByPlayer(player_id, true)
	u:SetForwardVector(Vector(0, -1, 0))

	u:AddAbility("no_hp_bar")
	u:FindAbilityByName("no_hp_bar"):SetLevel(1)
	play_merge_particle(u)

	--添加玩家颜色底盘
	local particle = ParticleManager:CreateParticle("particles/gem/team_0.vpcf", PATTACH_ABSORIGIN_FOLLOW, u)
	u.ppp = particle

	u:RemoveModifierByName("modifier_invulnerable")
	u:SetHullRadius(1)

	table.insert(_G.gemtd_pool, u)
	table.insert(_G.gemtd_pool_race[player_id], u)

	--AMHC:CreateNumberEffect(u,1,2,AMHC.MSG_DAMAGE,"yellow",0)

	_G.build_curr[player_id] = {}
	_G.is_build_ready[player_id] = true
	SetAbilityActiveStatus(owner, false)

	send_merge_board(player_id)

	finish_build(player_id)
end
function gemtd_downgrade_stone(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()

	caster:RemoveAbility("gemtd_choose_stone")
	caster:RemoveAbility("gemtd_choose_stone_fengbaozhichui")
	caster:RemoveAbility("gemtd_choose_update_stone")
	caster:RemoveAbility("gemtd_choose_update_update_stone")

	for i = 0, 4 do
		if _G.build_curr[player_id][i] ~= caster then
			--移除其他的石头
			local p = _G.build_curr[player_id][i]:GetAbsOrigin()
			--删除玩家颜色底盘
			if _G.build_curr[player_id][i].ppp then
				ParticleManager:DestroyParticle(_G.build_curr[player_id][i].ppp, true)
			end
			_G.build_curr[player_id][i]:Destroy()
			--用普通石头代替
			p.z = 1400
			local u = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
			u.ftd = 2009

			u:SetOwner(owner)
			ChangeStoneStyle(u)
			u:SetControllableByPlayer(player_id, true)
			u:SetForwardVector(Vector(-1, 0, 0))

			u:AddAbility("no_hp_bar")
			u:FindAbilityByName("no_hp_bar"):SetLevel(1)

			u:RemoveModifierByName("modifier_invulnerable")
			u:SetHullRadius(1)
		end
	end

	--移除caster，用降级的代替
	local unit_name = caster:GetUnitName()

	--处理成 随机降级
	local string_length = string.len(unit_name)
	local count_1 = 0
	for i = 1, string_length do
		local index = string_length + 1 - i
		if string.sub(unit_name, index, index) == "1" then
			count_1 = count_1 + 1
		end
	end

	--GameRules:SendCustomMessage("count_1:"..count_1, 0, 0)

	if count_1 >= 2 then
		local del_count = RandomInt(1, count_1 - 1)

		if count_1 == 2 then
			del_count = 1
		elseif count_1 == 3 then
			local r = RandomInt(1, 100)
			if r > 66 then
				del_count = 2
			else
				del_count = 1
			end
		elseif count_1 == 4 then
			local r = RandomInt(1, 100)
			if r > 80 then
				del_count = 3
			elseif r > 50 then
				del_count = 2
			else
				del_count = 1
			end
		elseif count_1 == 5 then
			local r = RandomInt(1, 100)
			if r > 90 then
				del_count = 4
			elseif r > 75 then
				del_count = 3
			elseif r > 50 then
				del_count = 2
			else
				del_count = 1
			end
		end

		--GameRules:SendCustomMessage("del_count:"..del_count, 0, 0)
		unit_name = string.sub(unit_name, 1, string_length - del_count)
	end

	--同步玩家金钱
	sync_player_gold(caster)

	local p = caster:GetAbsOrigin()
	local caster_died = caster
	--删除玩家颜色底盘
	if caster.ppp then
		ParticleManager:DestroyParticle(caster.ppp, true)
	end
	caster:Destroy()

	EmitGlobalSound("DOTA_Item.Buckler.Activate")

	stone_quest(unit_name)

	local u = CreateUnitByName(unit_name, p, false, nil, nil, DOTA_TEAM_GOODGUYS)
	u.ftd = 2009

	u:SetOwner(owner)
	u:SetControllableByPlayer(player_id, true)
	u:SetForwardVector(Vector(0, -1, 0))

	u:AddAbility("no_hp_bar")
	u:FindAbilityByName("no_hp_bar"):SetLevel(1)
	u:AddAbility("gemtd_tower_base")
	u:FindAbilityByName("gemtd_tower_base"):SetLevel(1)
	u:AddAbility("gemtd_tower_select")
	u:FindAbilityByName("gemtd_tower_select"):SetLevel(1)

	--添加玩家颜色底盘
	local particle = ParticleManager:CreateParticle("particles/gem/team_0.vpcf", PATTACH_ABSORIGIN_FOLLOW, u)
	u.ppp = particle

	u:RemoveModifierByName("modifier_invulnerable")
	u:SetHullRadius(1)

	table.insert(_G.gemtd_pool, u)
	table.insert(_G.gemtd_pool_race[player_id], u)

	_G.build_curr[player_id] = {}
	_G.is_build_ready[player_id] = true
	SetAbilityActiveStatus(owner, false)

	send_merge_board(player_id)

	finish_build(player_id)
end
function gemtd_downgrade_stone_fengbaozhichui(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()

	caster:RemoveAbility("gemtd_choose_stone")
	caster:RemoveAbility("gemtd_choose_stone_fengbaozhichui")
	caster:RemoveAbility("gemtd_choose_update_stone")
	caster:RemoveAbility("gemtd_choose_update_update_stone")

	for i = 0, 4 do
		if _G.build_curr[player_id][i] ~= caster then
			--移除其他的石头
			local p = _G.build_curr[player_id][i]:GetAbsOrigin()
			--删除玩家颜色底盘
			if _G.build_curr[player_id][i].ppp then
				ParticleManager:DestroyParticle(_G.build_curr[player_id][i].ppp, true)
			end
			_G.build_curr[player_id][i]:Destroy()
			--用普通石头代替
			p.z = 1400
			local u = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
			u.ftd = 2009

			u:SetOwner(owner)
			ChangeStoneStyle(u)
			u:SetControllableByPlayer(player_id, true)
			u:SetForwardVector(Vector(-1, 0, 0))

			u:AddAbility("no_hp_bar")
			u:FindAbilityByName("no_hp_bar"):SetLevel(1)

			u:RemoveModifierByName("modifier_invulnerable")
			u:SetHullRadius(1)
		end
	end

	--移除caster，用降级的代替
	local unit_name = caster:GetUnitName()

	--处理成 随机降级
	local string_length = string.len(unit_name)
	local count_1 = 0
	for i = 1, string_length do
		local index = string_length + 1 - i
		if string.sub(unit_name, index, index) == "1" then
			count_1 = count_1 + 1
		end
	end

	if count_1 >= 2 then
		local del_count = 1

		unit_name = string.sub(unit_name, 1, string_length - del_count)
	end

	--同步玩家金钱
	sync_player_gold(caster)

	local p = caster:GetAbsOrigin()
	local caster_died = caster
	--删除玩家颜色底盘
	if caster.ppp then
		ParticleManager:DestroyParticle(caster.ppp, true)
	end
	caster:Destroy()

	EmitGlobalSound("DOTA_Item.Buckler.Activate")

	stone_quest(unit_name)

	local u = CreateUnitByName(unit_name, p, false, nil, nil, DOTA_TEAM_GOODGUYS)
	u.ftd = 2009
	u:SetOwner(owner)
	u:SetControllableByPlayer(player_id, true)
	u:SetForwardVector(Vector(0, -1, 0))

	u:AddAbility("no_hp_bar")
	u:FindAbilityByName("no_hp_bar"):SetLevel(1)
	u:AddAbility("gemtd_tower_base")
	u:FindAbilityByName("gemtd_tower_base"):SetLevel(1)
	u:AddAbility("gemtd_tower_select")
	u:FindAbilityByName("gemtd_tower_select"):SetLevel(1)

	--添加玩家颜色底盘
	local particle = ParticleManager:CreateParticle("particles/gem/team_0.vpcf", PATTACH_ABSORIGIN_FOLLOW, u)
	u.ppp = particle

	u:RemoveModifierByName("modifier_invulnerable")
	u:SetHullRadius(1)

	table.insert(_G.gemtd_pool, u)
	table.insert(_G.gemtd_pool_race[player_id], u)

	_G.build_curr[player_id] = {}
	_G.is_build_ready[player_id] = true
	SetAbilityActiveStatus(owner, false)

	--特效
	play_particle("particles/items_fx/abyssal_blade_jugger.vpcf", PATTACH_OVERHEAD_FOLLOW, u, 3)

	send_merge_board(player_id)

	finish_build(player_id)
end
--游戏循环4——完成建造，调用开始刷怪
function finish_build(player_id)
	_G.build_ready_wave[player_id] = _G.build_ready_wave[player_id] + 1

	--合作模式: 所有玩家都建造就绪了，开始刷怪
	if
		_G.is_build_ready[0] == true
		and _G.is_build_ready[1] == true
		and _G.is_build_ready[2] == true
		and _G.is_build_ready[3] == true
		and GetMapName() ~= "gemtd_race"
	then
		_G.game_status = 2
		start_shuaguai()

		--在_G.gemtd_pool中检查能否合成高级塔
		for h, h_merge in pairs(_G.gemtd_merge) do
			local can_merge = true
			local merge_pool = {}

			for k, k_unitname in pairs(h_merge) do
				local have_merge = false
				for c, c_unit in pairs(_G.gemtd_pool) do
					if c_unit ~= nil and c_unit:IsNull() == false and c_unit:GetUnitName() == k_unitname then
						--有这个合成配方
						have_merge = true
						table.insert(merge_pool, c_unit)
					end
				end
				if have_merge == false then
					can_merge = false
				end
			end

			if can_merge == true then
				--可以合成，给它们增加技能
				_G.gemtd_pool_can_merge[h] = {}

				for a, a_unit in pairs(merge_pool) do
					a_unit:RemoveAbility(h)
					a_unit:AddAbility(h)
					a_unit:FindAbilityByName(h):SetLevel(1)
					play_particle(
						"effect/merge/ui/plus/ui_hero_level_4_icon_ambient.vpcf",
						PATTACH_OVERHEAD_FOLLOW,
						a_unit,
						10
					)

					table.insert(_G.gemtd_pool_can_merge[h], a_unit)

					table.insert(_G.gemtd_pool_can_merge_all, h)
				end
			end
		end
	end

	--竞速模式: 最快的玩家本回合建造就绪了，开始刷怪
	if GetMapName() == "gemtd_race" then
		_G.playerid2hero[player_id].perfected = false
		--在_G.gemtd_pool_race[player_id]中检查能否合成高级塔
		for h, h_merge in pairs(_G.gemtd_merge) do
			local can_merge = true
			local merge_pool = {}

			for k, k_unitname in pairs(h_merge) do
				local have_merge = false
				for c, c_unit in pairs(_G.gemtd_pool_race[player_id]) do
					if c_unit ~= nil and c_unit:IsNull() == false and c_unit:GetUnitName() == k_unitname then
						--有这个合成配方
						have_merge = true
						table.insert(merge_pool, c_unit)
					end
				end
				if have_merge == false then
					can_merge = false
				end
			end

			if can_merge == true then
				--可以合成，给它们增加技能
				_G.gemtd_pool_can_merge_race[player_id][h] = {}

				for a, a_unit in pairs(merge_pool) do
					a_unit:RemoveAbility(h)
					a_unit:AddAbility(h)
					a_unit:FindAbilityByName(h):SetLevel(1)
					play_particle(
						"effect/merge/ui/plus/ui_hero_level_4_icon_ambient.vpcf",
						PATTACH_OVERHEAD_FOLLOW,
						a_unit,
						10
					)

					table.insert(_G.gemtd_pool_can_merge_race[player_id][h], a_unit)

					table.insert(_G.gemtd_pool_can_merge_all_race[player_id], h)
				end
			end
		end

		-- log('player'..player_id..' build_ready_wave:'.._G.build_ready_wave[player_id]..',level:'.._G.level)

		if _G.build_ready_wave[player_id] == _G.level then
			--建完是当前关，出怪
			set_build_hummer(player_id, 0)

			if _G.enemy_spawned_wave < _G.level then
				-- GameRules:SendCustomMessage('敌人即将来袭，wave '.._G.level,0,0)

				ShowCombat({
					t = "wave",
					text = _G.level,
				})

				GameRules:SetTimeOfDay(0.8)
				_G.stop_watch = GameRules:GetGameTime()

				EmitGlobalSound("GameStart.RadiantAncient")
				spawn_one_wave()
			end
		else
			--建完的不是当前关的，再给建造机会
			if _G.level <= 50 then
				set_build_hummer(player_id, _G.level - _G.build_ready_wave[player_id])

				local h = _G.playerid2hero[player_id]

				SetAbilityActiveStatus(h, true)
				_G.is_build_ready[player_id] = false
				h.build_level = _G.level

				h:FindAbilityByName("gemtd_build_stone"):SetActivated(true)
				h:FindAbilityByName("gemtd_remove"):SetActivated(true)
				h:SetMana(5.0)
			end
		end
	end
end
function set_build_hummer(player_id, count)
	local h = _G.playerid2hero[player_id]
	for i = 0, 5 do
		if h:GetItemInSlot(i) ~= nil and h:GetItemInSlot(i):GetAbilityName() == "item_hummer" then
			h:GetItemInSlot(i):SetCurrentCharges(count)
		end
	end
end
--游戏循环5——开始刷怪
function start_shuaguai()
	_G.damage = {}
	_G.perfect_this_level = true

	if _G.level == 51 then
		CustomNetTables:SetTableValue("game_state", "show_ggsimida", { hehe = RandomInt(1, 10000) })
	end

	CustomNetTables:SetTableValue("game_state", "disable_all_repick", { hehe = RandomInt(1, 10000) })

	for q, tf in pairs(_G.quest) do
		if string.find(q, "q111") then
			local keys_arr = string.split(q, "_")
			for user, info in pairs(_G.playerInfoReceived) do
				if info.onduty_hero == keys_arr[2] then
					SetQuest(q, true)
				end
			end
		end
	end

	ShowCombat({
		t = "wave",
		text = _G.level,
	})

	GameRules:SetTimeOfDay(0.8)
	_G.stop_watch = GameRules:GetGameTime()
	EmitGlobalSound("GameStart.RadiantAncient")

	--如果本关有备选怪，就随机
	if _G.guai[_G.level + 100] ~= nil then
		if RandomInt(1, 2) == 1 then
			_G.guai[_G.level] = _G.guai[_G.level + 100]
		end
	end

	local date = tonumber(string.split(GetSystemDate(), "/")[2]) or 1
	local month = tonumber(string.split(GetSystemDate(), "/")[1]) or 1
	local days_of_month = {
		[1] = 31,
		[2] = 28,
		[3] = 31,
		[4] = 30,
		[5] = 31,
		[6] = 30,
		[7] = 31,
		[8] = 31,
		[9] = 30,
		[10] = 31,
		[11] = 30,
		[12] = 31,
	}

	if _G.level == 20 and date < days_of_month[month] and (RandomInt(1, 100) > 90 or date > 20) then
		_G.guai[_G.level] = "gemtd_yuediyang_boss"
	end
	-- if (_G.level ==30 and RandomInt(1,100)>80 ) then
	-- 	_G.guai[_G.level] = "gemtd_nianshou_boss_fly"
	-- end
	if _G.level == 30 and RandomInt(1, 100) > 90 then
		_G.guai[_G.level] = "gemtd_zard_boss_fly"
	end
	if _G.level == 40 and RandomInt(1, 100) > 90 then
		_G.guai[_G.level] = "gemtd_gugubiao_boss_fly"
	end
	if _G.level == 50 and RandomInt(1, 100) > 80 then
		_G.guai[_G.level] = "gemtd_roushan_boss_fly_jin"
	end
	if _G.level == 50 and RandomInt(1, 100) > 90 then
		_G.guai[_G.level] = "gemtd_roushan_boss_fly_bojin"
	end

	UpdateGuaiLevel()

	if _G.level > 100 then
		_G.game_status = 3
		send_ranking()
		--3秒后判定胜利并进入结束界面(end.xml)
		Timers:CreateTimer(3, function()
			GameRules:SetGameWinner(DOTA_TEAM_GOODGUYS)
		end)
	end

	ShowCenterMessage(_G.guai[_G.guai_level], 5, _G.level, _G.wave_enemy_count)

	CustomNetTables:SetTableValue(
		"game_state",
		"victory_condition",
		{ kills_to_win = _G.level, enemy_show = _G.guai[_G.guai_level] }
	)

	_G.gem_is_shuaguaiing = true
	_G.guai_live_count = 0
	_G.guai_count = _G.wave_enemy_count

	local guai_name = _G.guai[_G.guai_level]
	FindEnemyPath()
	if string.find(guai_name, "boss") then
		GameRules:SendCustomMessage("BOSS", 0, 0)
	end
	--清空pray
	local i = 0
	for i = 0, 20 do
		if PlayerResource:IsValidPlayer(i) then
			local player = PlayerResource:GetPlayer(i)
			if player ~= nil then
				local h = player:GetAssignedHero()
				if h ~= nil then
					h.pray = nil
					h.pray_color = nil

					h.pray_count = 0
				end
			end
		end
	end
	_G.perfected = false
end
--游戏循环6——怪物死亡、加钱、判断过关
function GemTD:OnEntityKilled(keys)
	if keys ~= nil then
		local killed_unit = EntIndexToHScript(keys.entindex_killed)
		--不算击杀的死亡
		if
			killed_unit:GetUnitName() == "gemtd_feicuimoxiang_yinxing"
			or killed_unit:GetUnitName() == "gemtd_guangzhudaobiao"
			or killed_unit:GetUnitName() == "gemtd_pet"
			or killed_unit:GetUnitName() == "gemtd_yinhun"
		then
			return
		end
		if killed_unit:IsHero() == true then
			return
		end
		if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
			StatEnemyCountAndShow()
			if keys.entindex_killed ~= keys.entindex_attacker then
				--单人模式和合作模式
				if
					(string.find(killed_unit:GetUnitName(), "boss") or string.find(killed_unit:GetUnitName(), "tester"))
					and _G.is_boss_entered == false
				then
					_G.kills = _G.kills + 10
					for k = 1, 10 do
						PlayerResource:IncrementKills(0, 1)
						PlayerResource:IncrementKills(1, 1)
						PlayerResource:IncrementKills(2, 1)
						PlayerResource:IncrementKills(3, 1)
					end
					AddStat("kill", 10)
					UpdateKillStat()

					if
						killed_unit:GetUnitName() == "gemtd_zard_boss_fly"
						or killed_unit:GetUnitName() == "gemtd_kongxinnanguaren_boss"
						or killed_unit:GetUnitName() == "gemtd_yuediyang_boss"
						or killed_unit:GetUnitName() == "gemtd_gugubiao_boss_fly"
						or killed_unit:GetUnitName() == "gemtd_nianshou_boss_fly"
						or killed_unit:GetUnitName() == "gemtd_nanguaren_boss_fly"
					then
						_G.kills = _G.kills + 3
						_G.extra_kill = _G.extra_kill + 3
						for k = 1, 3 do
							PlayerResource:IncrementKills(0, 1)
							PlayerResource:IncrementKills(1, 1)
							PlayerResource:IncrementKills(2, 1)
							PlayerResource:IncrementKills(3, 1)
						end
						AddStat("kill", 3)
						UpdateKillStat()
					end

					if
						killed_unit:GetUnitName() == "gemtd_roushan_boss_fly_jin"
						or killed_unit:GetUnitName() == "gemtd_roushan_boss_fly_bojin"
					then
						_G.kills = _G.kills + 5
						_G.extra_kill = _G.extra_kill + 5
						for k = 1, 5 do
							PlayerResource:IncrementKills(0, 1)
							PlayerResource:IncrementKills(1, 1)
							PlayerResource:IncrementKills(2, 1)
							PlayerResource:IncrementKills(3, 1)
						end
						AddStat("kill", 5)
						UpdateKillStat()
					end
					GameRules:SendCustomMessage("#text_you_killed_the_boss", 0, 0)
					_G.is_boss_entered = true

					if killed_unit:GetUnitName() == "gemtd_zard_boss_fly" then
						_G.quest_status["q104"] = true
						show_quest()
					end
					if killed_unit:GetUnitName() == "gemtd_roushan_boss_fly_jin" then
						_G.quest_status["q303"] = true
						show_quest()
					end
				end
				if killed_unit.is_jingying == true then
					_G.kills = _G.kills + 2
					_G.extra_kill = _G.extra_kill + 1
					for k = 1, 2 do
						PlayerResource:IncrementKills(0, 1)
						PlayerResource:IncrementKills(1, 1)
						PlayerResource:IncrementKills(2, 1)
						PlayerResource:IncrementKills(3, 1)
					end
					AddStat("kill", 2)
					UpdateKillStat()

					if _G.is_debug == true then
						GameRules:SendCustomMessage("kills: " .. _G.kills, 0, 0)
					end
				end
				if not (string.find(killed_unit:GetUnitName(), "boss")) and (not killed_unit.is_jingying == true) then
					_G.kills = _G.kills + 1
					for k = 1, 1 do
						PlayerResource:IncrementKills(0, 1)
						PlayerResource:IncrementKills(1, 1)
						PlayerResource:IncrementKills(2, 1)
						PlayerResource:IncrementKills(3, 1)
					end
					AddStat("kill", 1)
					UpdateKillStat()

					if _G.is_debug == true then
						GameRules:SendCustomMessage("kills: " .. _G.kills, 0, 0)
					end
				end
				if keys.entindex_attacker ~= nil then
					local killer_unit = EntIndexToHScript(keys.entindex_attacker)
					local killer_owner = killer_unit:GetOwner()
				end
				if killed_unit ~= nil and not killed_unit.is_entered == true then
					--增加win_streak
					if string.find(killed_unit:GetUnitName(), "boss") then
						--BOSS
						_G.win_streak = _G.win_streak + 10 --80*0.15
					elseif killed_unit.is_jingying == true then
						_G.win_streak = _G.win_streak + 1.5
					else
						_G.win_streak = _G.win_streak + 0.75 --killed_unit.damage*0.15
					end

					WinStreakAdjust()

					--给玩家经验
					local exp_count = 5
					if _G.level == 10 then
						exp_count = 300
					end
					if _G.level == 20 then
						exp_count = 300
					end
					if _G.level == 30 then
						exp_count = 300
					end
					if _G.level == 40 then
						exp_count = 300
					end
					if _G.level == 50 then
						exp_count = 300
					end
					if _G.level >= 11 and _G.level <= 19 then
						exp_count = 10
					end
					if _G.level >= 21 and _G.level <= 29 then
						exp_count = 15
					end
					if _G.level >= 31 and _G.level <= 39 then
						exp_count = 20
					end
					if _G.level >= 41 and _G.level <= 49 then
						exp_count = 25
					end
					local exp_percent = 1

					exp_count = exp_count * exp_percent
					if killed_unit ~= nil and killed_unit.is_jingying == true then
						exp_count = exp_count * 10
					end

					local i = 0
					for i = 0, 20 do
						if PlayerResource:IsValidPlayer(i) then
							local player = PlayerResource:GetPlayer(i)
							if player ~= nil then
								local h = player:GetAssignedHero()
								if h ~= nil then
									h:AddExperience(exp_count, 0, false, false)
								end
							end
						end
					end

					--给玩家团队金钱
					if exp_count >= 100 then
						exp_count = exp_count / 2
					end
					if keys.entindex_attacker ~= nil then
						local killer_unit = EntIndexToHScript(keys.entindex_attacker)
						local killer_owner = killer_unit:GetOwner()

						--埃及金：概率加钱
						if
							killer_unit ~= nil
							and killer_unit:FindModifierByName("modifier_tower_tanlan") ~= nil
							and RandomInt(1, 100) <= 5
						then
							exp_count = exp_count * 10
						end

						--中国玉：概率加血
						if
							killer_unit ~= nil
							and killer_unit:FindModifierByName("modifier_tower_huichun_aura") ~= nil
							and RandomInt(1, 100) <= 3
						then
							HuichunAura({
								caster = killer_unit,
								hp_add = killed_unit.damage or 1,
							})
						end
						-- if killer_unit ~= nil then
						-- 	PlayerResource:SetGold(0, PlayerResource:GetGold(0)+exp_count, true)
						-- 	--同步玩家金钱
						-- 	sync_player_gold()
						-- end
					end
					AMHC:CreateNumberEffect(killed_unit, exp_count, 5, AMHC.MSG_GOLD, "yellow", 0)
					if exp_count >= 100 then
						EmitGlobalSound("General.CoinsBig")
					else
						EmitGlobalSound("General.Coins")
					end

					--给玩家金钱
					_G.team_gold = math.floor(_G.team_gold + exp_count)
					for i = 0, PlayerResource:GetPlayerCount() - 1 do
						PlayerResource:SetGold(i, _G.team_gold, true)
					end

					CustomNetTables:SetTableValue(
						"game_state",
						"gem_team_gold",
						{ gold = _G.team_gold, hehe = RandomInt(1, 1000000) }
					)
				end
			end
			_G.guai_live_count = _G.guai_live_count - 1
		elseif GetMapName() == "gemtd_race" then
			--竞速模式
			local player_id = killed_unit.player

			if keys.entindex_killed ~= keys.entindex_attacker then
				--先算好应该给多少击杀数、钱、经验
				local kills_add = 1
				local money_add = 5

				if _G.level >= 11 and _G.level <= 19 then
					money_add = 10
				end
				if _G.level >= 21 and _G.level <= 29 then
					money_add = 15
				end
				if _G.level >= 31 and _G.level <= 39 then
					money_add = 20
				end
				if _G.level >= 41 and _G.level <= 49 then
					money_add = 25
				end
				if string.find(killed_unit:GetUnitName(), "boss") then
					money_add = 300
					kills_add = 10
					if
						killed_unit:GetUnitName() == "gemtd_zard_boss_fly"
						or killed_unit:GetUnitName() == "gemtd_kongxinnanguaren_boss"
						or killed_unit:GetUnitName() == "gemtd_yuediyang_boss"
						or killed_unit:GetUnitName() == "gemtd_gugubiao_boss_fly"
						or killed_unit:GetUnitName() == "gemtd_nianshou_boss_fly"
						or killed_unit:GetUnitName() == "gemtd_nanguaren_boss_fly"
					then
						kills_add = 15
					end
					if
						killed_unit:GetUnitName() == "gemtd_roushan_boss_fly_jin"
						or killed_unit:GetUnitName() == "gemtd_roushan_boss_fly_bojin"
					then
						kills_add = 20
					end
				end
				if killed_unit.is_jingying == true then
					kills_add = kills_add * 4
					money_add = money_add * 10
				end

				if _G.enemy_spawned_wave - _G.build_ready_wave[player_id] >= 2 then
					--如果依然有至少2次建造次数没用完，击杀收益减半
					money_add = math.floor(money_add / 2)
				end

				--增加击杀数
				for k = 1, kills_add do
					PlayerResource:IncrementKills(player_id, 1)
				end
				AddStat("kill", kills_add, player_id)
				UpdateKillStat()

				--增加经验
				if PlayerResource:GetPlayer(player_id) ~= nil then
					_G.playerid2hero[player_id]:AddExperience(money_add, 0, false, false)

					--增加金钱
					if money_add >= 100 then
						money_add = math.floor(money_add / 2)
					end
					if keys.entindex_attacker ~= nil then
						local killer_unit = EntIndexToHScript(keys.entindex_attacker)
						local killer_owner = killer_unit:GetOwner()

						if
							killer_unit ~= nil
							and killer_unit:FindModifierByName("modifier_tower_tanlan") ~= nil
							and RandomInt(1, 100) <= 5
						then
							money_add = money_add * 10
						end
					end

					--给玩家金钱
					AMHC:CreateNumberEffect(killed_unit, money_add, 5, AMHC.MSG_GOLD, "yellow", 0)
					if money_add >= 100 then
						EmitSoundOn("General.CoinsBig", killed_unit)
					else
						EmitSoundOn("General.Coins", killed_unit)
					end

					_G.team_gold_race[player_id] = math.floor(_G.team_gold_race[player_id] + money_add)
					PlayerResource:SetGold(player_id, _G.team_gold_race[player_id], true)
					CustomGameEventManager:Send_ServerToPlayer(
						PlayerResource:GetPlayer(player_id),
						"show_money",
						{ money = _G.team_gold_race[player_id] }
					)

					-- PlayerResource:SetGold(player_id, PlayerResource:GetGold(player_id)+money_add, true)

					-- CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(player_id),"show_money",{
					-- 	money = PlayerResource:GetGold(player_id),
					-- })
				end
			end

			--存活怪数-1
			_G.enemy_live_count[player_id] = _G.enemy_live_count[player_id] - 1

			CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(player_id), "show_enemy_count", {
				count = _G.enemy_live_count[player_id],
				hehe = RandomFloat(0, 100),
			})

			--有玩家杀完了
			if _G.enemy_live_count[player_id] <= 0 then
				--过关啦！！！
				if _G.enemy_spawned_wave == _G.level then
					--只有第一个过关的玩家会触发
					if killed_unit ~= nil and string.find(killed_unit:GetUnitName(), "boss") then
						GameRules:SendCustomMessage("#text_enemy_is_stonger", 0, 0)
					end

					_G.top_runner = player_id
					CustomNetTables:SetTableValue(
						"game_state",
						"gem_top_runner",
						{ player = player_id, hehe = RandomInt(1, 10000) }
					)

					--统计本关mvp
					if _G.level <= 50 then
						stat_mvp_race()
					end
					_G.level = _G.level + 1
					UpdateGuaiLevel()

					for p = 0, PlayerResource:GetPlayerCount() - 1 do
						if _G.gem_castle_hp_race[p] > 0 then
							PlayerResource:IncrementAssists(p, 1)
						end
					end
					--检查是否还有活着的玩家！没有就不开始建造了...
					local is_all_dead = true
					for i = 1, PlayerResource:GetPlayerCount() do
						if _G.gem_castle_hp_race[i - 1] > 0 then
							is_all_dead = false
						end
					end
					if is_all_dead == false then
						--开始建造！！！
						start_build()
					end
				end
			end
			dropItem(killed_unit:GetAbsOrigin())
		end
	end
end

--掉宝
function dropItem(p)
	--掉率
	if RandomInt(1, 100) > _G.DROP_PER then
		return
	end
	--找到一个空位置
	local pp = find_empty_grid(p)
	if pp == nil then
		return
	end

	local ITEM_LIST = {
		[1] = "item_jingying",
		[2] = "item_huichun",
		[3] = "item_fog",
		[4] = "item_fly",
		[5] = "item_aojiao",
		[6] = "item_qianggong",
	}
	local ITEM_SCALE = {
		item_jingying = 1.3,
		item_fly = 1.3,
		item_aojiao = 1.4,
	}
	local item = ITEM_LIST[RandomInt(1, table.maxn(ITEM_LIST))]
	local newItem = CreateItem(item, nil, nil)
	local drop = CreateItemOnPositionForLaunch(p, newItem)

	newItem:LaunchLootInitialHeight(false, 0, RandomInt(200, 700), 1, pp)
	newItem:GetContainer():SetModelScale(ITEM_SCALE[item] or 1.5)
	Timers:CreateTimer(300, function()
		if newItem ~= nil and newItem:IsNull() == false then
			newItem:GetContainer():Destroy()
		end
	end)
end
function find_empty_grid(p)
	local pp = p + RandomVector(400)
	local is_empty = false
	local times = 0
	local xxx = math.floor((pp.x + 64) / 128) + 19
	local yyy = math.floor((pp.y + 64) / 128) + 19
	while is_empty == false and times < 50 do
		if
			_G.gem_map ~= nil
			and _G.gem_map[yyy] ~= nil
			and _G.gem_map[yyy][xxx] == 0
			and is_path_grid(xxx, yyy) == false
		then
			is_empty = true
		else
			pp = p + RandomVector(400)
			xxx = math.floor((pp.x + 64) / 128) + 19
			yyy = math.floor((pp.y + 64) / 128) + 19
			times = times + 1
		end
	end
	if is_empty == false then
		return nil
	end
	pp.x = math.floor((pp.x + 64) / 128) * 128
	pp.y = math.floor((pp.y + 64) / 128) * 128
	return pp
end
function is_path_grid(xxx, yyy)
	for j = 0, 3 do
		for i = 1, 7 do
			local p1 = Entities:FindByName(nil, "path" .. ((10 * j) + i)):GetAbsOrigin()
			local xxx1 = math.floor((p1.x + 64) / 128) + 19
			local yyy1 = math.floor((p1.y + 64) / 128) + 19
			if xxx == xxx1 and yyy == yyy1 then
				return true
			end
		end
	end
	return false
end
function stat_mvp_race()
	--统计本关mvp
	for i = 0, PlayerResource:GetPlayerCount() - 1 do
		local mvp_tower_id = 0
		local mvp_tower_damage = 0
		if _G.damage_race[i] ~= nil then
			for mvp_i, mvp_v in pairs(_G.damage_race[i]) do
				local u = EntIndexToHScript(mvp_i)
				if u ~= nil and not u:IsNull() and u:GetTeam() ~= 3 then
					if u.level == nil then
						u.level = 0
					end
					if mvp_v > mvp_tower_damage and u.level < 10 then
						mvp_tower_id = mvp_i
						mvp_tower_damage = mvp_v
					end
				end
			end
			if mvp_tower_id > 0 then
				_G.last_mvp[i] = mvp_tower_id
				local mvp_tower = EntIndexToHScript(mvp_tower_id)
				if
					mvp_tower ~= nil
					and mvp_tower:IsNull() == false
					and mvp_tower:GetClassname() == "npc_dota_creature"
				then
					play_particle(
						"particles/events/ti6_teams/teleport_start_ti6_lvl3_mvp_phoenix.vpcf",
						PATTACH_ABSORIGIN_FOLLOW,
						mvp_tower,
						5
					)
					RemindSelect({
						caster = mvp_tower,
						big_duration = 4.5,
					})

					EmitSoundOn("crowd.lv_01", mvp_tower)

					-- print('mvp_tower:GetUnitName()='..mvp_tower:GetUnitName())

					CustomNetTables:SetTableValue(
						"game_state",
						"victory_condition_race",
						{ kills_to_win = _G.level, enemy_show = mvp_tower:GetUnitName(), player = i }
					)

					level_up(mvp_tower, 1)
				end
			end
			_G.damage_race[i] = {}
		end
	end
end

function level_up(u, lv)
	if lv == nil then
		lv = 1
	end
	if lv > 10 then
		lv = 10
	end

	if u.level == nil then
		u.level = 0
	end

	u:RemoveAbility("tower_mvp" .. u.level)
	u:RemoveModifierByName("modifier_mvp" .. u.level)

	u.level = u.level + lv
	if u.level > 10 then
		u.level = 10
	end

	AddAbilityAndSetLevel(u, "tower_mvp" .. u.level, u.level)

	if GetMapName() ~= "gemtd_race" then
		--统计有多少个mvp max了
		local mvp_max_count = 0
		for _, unit in pairs(_G.gemtd_pool) do
			if unit:FindAbilityByName("tower_mvp10") ~= nil then
				mvp_max_count = mvp_max_count + 1
			end
		end
		if mvp_max_count >= 5 then
			SetQuest("q304", true)
		end
	end
end

--寻路算法
--寻找所有路径
function find_all_path()
	if GetMapName() == "gemtd_race" then
		return
	end
	_G.gem_maze_length = 0

	if _G.guangzhudaobiao == nil then
		_G.gem_path = {
			{},
			{},
			{},
			{},
			{},
			{},
		}
		local p1 = Entities:FindByName(nil, "path1"):GetAbsOrigin()
		local p2 = Entities:FindByName(nil, "path2"):GetAbsOrigin()
		find_path(p1, p2, 1)
		local p3 = Entities:FindByName(nil, "path3"):GetAbsOrigin()
		find_path(p2, p3, 2)
		local p4 = Entities:FindByName(nil, "path4"):GetAbsOrigin()
		find_path(p3, p4, 3)
		local p5 = Entities:FindByName(nil, "path5"):GetAbsOrigin()
		find_path(p4, p5, 4)
		local p6 = Entities:FindByName(nil, "path6"):GetAbsOrigin()
		find_path(p5, p6, 5)
		local p7 = Entities:FindByName(nil, "path7"):GetAbsOrigin()
		find_path(p6, p7, 6)

		CustomNetTables:SetTableValue(
			"game_state",
			"gem_maze_length",
			{ length = math.modf(_G.gem_maze_length), hehe = RandomInt(1, 10000) }
		)

		_G.gem_path_all = {}
		for i = 1, 6 do
			for j = 1, table.maxn(_G.gem_path[i]) - 1 do
				table.insert(_G.gem_path_all, _G.gem_path[i][j])
			end
		end
		table.insert(_G.gem_path_all, p7)
	else
		_G.gem_path = {
			{},
			{},
			{},
			{},
			{},
			{},
			{},
		}
		local p1 = Entities:FindByName(nil, "path1"):GetAbsOrigin()
		local p0 = _G.guangzhudaobiao:GetAbsOrigin()
		find_path(p1, p0, 1)
		local p2 = Entities:FindByName(nil, "path2"):GetAbsOrigin()
		find_path(p0, p2, 2)
		local p3 = Entities:FindByName(nil, "path3"):GetAbsOrigin()
		find_path(p2, p3, 3)
		local p4 = Entities:FindByName(nil, "path4"):GetAbsOrigin()
		find_path(p3, p4, 4)
		local p5 = Entities:FindByName(nil, "path5"):GetAbsOrigin()
		find_path(p4, p5, 5)
		local p6 = Entities:FindByName(nil, "path6"):GetAbsOrigin()
		find_path(p5, p6, 6)
		local p7 = Entities:FindByName(nil, "path7"):GetAbsOrigin()
		find_path(p6, p7, 7)

		CustomNetTables:SetTableValue(
			"game_state",
			"gem_maze_length",
			{ length = math.modf(_G.gem_maze_length), hehe = RandomInt(1, 10000) }
		)

		_G.gem_path_all = {}
		for i = 1, 7 do
			for j = 1, table.maxn(_G.gem_path[i]) - 1 do
				table.insert(_G.gem_path_all, _G.gem_path[i][j])
			end
		end
		table.insert(_G.gem_path_all, p7)
	end
end
function find_all_path_race(player_id)
	_G.gem_maze_length_race[player_id] = 0
	if _G.guangzhudaobiao_race[player_id] ~= nil then
		_G.gem_path_race[player_id] = {
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
		}
		local p1 = Entities:FindByName(nil, "path" .. (player_id * 10 + 1) .. ""):GetAbsOrigin()
		local p0 = _G.guangzhudaobiao_race[player_id]:GetAbsOrigin()
		find_path_race(p1, p0, 1, player_id)
		local p2 = Entities:FindByName(nil, "path" .. (player_id * 10 + 2) .. ""):GetAbsOrigin()
		find_path_race(p0, p2, 2, player_id)
		local p3 = Entities:FindByName(nil, "path" .. (player_id * 10 + 3) .. ""):GetAbsOrigin()
		find_path_race(p2, p3, 3, player_id)
		local p4 = Entities:FindByName(nil, "path" .. (player_id * 10 + 4) .. ""):GetAbsOrigin()
		find_path_race(p3, p4, 4, player_id)
		local p5 = Entities:FindByName(nil, "path" .. (player_id * 10 + 5) .. ""):GetAbsOrigin()
		find_path_race(p4, p5, 5, player_id)
		local p6 = Entities:FindByName(nil, "path" .. (player_id * 10 + 6) .. ""):GetAbsOrigin()
		find_path_race(p5, p6, 6, player_id)
		local p7 = Entities:FindByName(nil, "path" .. (player_id * 10 + 7) .. ""):GetAbsOrigin()
		find_path_race(p6, p7, 7, player_id)

		CustomNetTables:SetTableValue(
			"game_state",
			"gem_maze_length_race",
			{ player = player_id, length = math.modf(_G.gem_maze_length_race[player_id]), hehe = RandomInt(1, 10000) }
		)

		_G.race_stat[player_id]["maze_length"] = math.modf(_G.gem_maze_length_race[player_id])

		_G.gem_path_all_race[player_id] = {}
		for i = 1, 7 do
			for j = 1, table.maxn(_G.gem_path_race[player_id][i]) - 1 do
				table.insert(_G.gem_path_all_race[player_id], _G.gem_path_race[player_id][i][j])
			end
		end
		table.insert(_G.gem_path_all_race[player_id], p7)
	else
		_G.gem_path_race[player_id] = {
			{},
			{},
			{},
			{},
			{},
			{},
			{},
		}
		local p1 = Entities:FindByName(nil, "path" .. (player_id * 10 + 1) .. ""):GetAbsOrigin()
		local p2 = Entities:FindByName(nil, "path" .. (player_id * 10 + 2) .. ""):GetAbsOrigin()
		find_path_race(p1, p2, 1, player_id)
		local p3 = Entities:FindByName(nil, "path" .. (player_id * 10 + 3) .. ""):GetAbsOrigin()
		find_path_race(p2, p3, 2, player_id)
		local p4 = Entities:FindByName(nil, "path" .. (player_id * 10 + 4) .. ""):GetAbsOrigin()
		find_path_race(p3, p4, 3, player_id)
		local p5 = Entities:FindByName(nil, "path" .. (player_id * 10 + 5) .. ""):GetAbsOrigin()
		find_path_race(p4, p5, 4, player_id)
		local p6 = Entities:FindByName(nil, "path" .. (player_id * 10 + 6) .. ""):GetAbsOrigin()
		find_path_race(p5, p6, 5, player_id)
		local p7 = Entities:FindByName(nil, "path" .. (player_id * 10 + 7) .. ""):GetAbsOrigin()
		find_path_race(p6, p7, 6, player_id)

		CustomNetTables:SetTableValue(
			"game_state",
			"gem_maze_length_race",
			{ player = player_id, length = math.modf(_G.gem_maze_length_race[player_id]), hehe = RandomInt(1, 10000) }
		)

		_G.race_stat[player_id]["maze_length"] = math.modf(_G.gem_maze_length_race[player_id])

		_G.gem_path_all_race[player_id] = {}
		for i = 1, 6 do
			for j = 1, table.maxn(_G.gem_path_race[player_id][i]) - 1 do
				table.insert(_G.gem_path_all_race[player_id], _G.gem_path_race[player_id][i][j])
			end
		end
		table.insert(_G.gem_path_all_race[player_id], p7)
	end
end
--寻找所有路径
function find_all_path_fly()
	if _G.guangzhudaobiao == nil then
		local p1 = Entities:FindByName(nil, "path1"):GetAbsOrigin()
		local p2 = Entities:FindByName(nil, "path2"):GetAbsOrigin()
		local p3 = Entities:FindByName(nil, "path3"):GetAbsOrigin()
		local p4 = Entities:FindByName(nil, "path4"):GetAbsOrigin()
		local p5 = Entities:FindByName(nil, "path5"):GetAbsOrigin()
		local p6 = Entities:FindByName(nil, "path6"):GetAbsOrigin()
		local p7 = Entities:FindByName(nil, "path7"):GetAbsOrigin()

		_G.gem_path = {
			{ p1, p2 },
			{ p2, p3 },
			{ p3, p4 },
			{ p4, p5 },
			{ p5, p6 },
			{ p6, p7 },
		}

		_G.gem_path_all = {}
		for i = 1, 6 do
			for j = 1, table.maxn(_G.gem_path[i]) - 1 do
				table.insert(_G.gem_path_all, _G.gem_path[i][j])
			end
		end
		table.insert(_G.gem_path_all, p7)
	else
		local p0 = _G.guangzhudaobiao:GetAbsOrigin()
		local p1 = Entities:FindByName(nil, "path1"):GetAbsOrigin()
		local p2 = Entities:FindByName(nil, "path2"):GetAbsOrigin()
		local p3 = Entities:FindByName(nil, "path3"):GetAbsOrigin()
		local p4 = Entities:FindByName(nil, "path4"):GetAbsOrigin()
		local p5 = Entities:FindByName(nil, "path5"):GetAbsOrigin()
		local p6 = Entities:FindByName(nil, "path6"):GetAbsOrigin()
		local p7 = Entities:FindByName(nil, "path7"):GetAbsOrigin()

		_G.gem_path = {
			{ p1, p0 },
			{ p0, p2 },
			{ p2, p3 },
			{ p3, p4 },
			{ p4, p5 },
			{ p5, p6 },
			{ p6, p7 },
		}

		_G.gem_path_all = {}
		for i = 1, 7 do
			for j = 1, table.maxn(_G.gem_path[i]) - 1 do
				table.insert(_G.gem_path_all, _G.gem_path[i][j])
			end
		end
		table.insert(_G.gem_path_all, p7)
	end
end
--调用寻路算法
function find_path(p1, p2, step)
	-- Value for walkable tiles
	local walkable = 0

	-- Library setup
	local Grid = require("pathfinder/grid") -- The grid class
	local Pathfinder = require("pathfinder/pathfinder") -- The pathfinder lass

	-- Creates a grid object
	local grid = nil

	grid = Grid(_G.gem_map)
	--grid = Grid(map)

	-- Creates a pathfinder object using Jump Point Search
	local myFinder = nil
	myFinder = Pathfinder(grid, "JPS", walkable)

	local xxx1 = math.floor((p1.x + 64) / 128) + 19
	local yyy1 = math.floor((p1.y + 64) / 128) + 19
	local xxx2 = math.floor((p2.x + 64) / 128) + 19
	local yyy2 = math.floor((p2.y + 64) / 128) + 19

	-- Define start and goal locations coordinates
	local startx, starty = xxx1, yyy1
	local endx, endy = xxx2, yyy2

	--local startx, starty = 2,2
	--local endx, endy = 9,9

	-- Calculates the path, and its length
	local path, length = myFinder:getPath(startx, starty, endx, endy)

	if path then
		--这部分算法待优化
		local dx = 0
		local dy = 0
		local lastx = -100
		local lasty = -100
		local lastdx = -100
		local lastdy = -100
		local lastd = -100
		local d = 0

		--print(('Path found! Length: %.2f'):format(length))
		_G.gem_maze_length = _G.gem_maze_length + length

		for node, count in path:iter() do
			dx = node.x - lastx
			dy = node.y - lasty

			if dy == 0 then
				d = 999
			else
				d = dx / dy
			end

			--print(('Step%d - %d,%d'):format(count, node.x, node.y))

			local lastindex = table.maxn(_G.gem_path[step])

			if d ~= lastd or lastindex <= 1 then
				local xxx = (node.x - 19) * 128
				local yyy = (node.y - 19) * 128
				local p = Vector(xxx, yyy, 137)
				table.insert(_G.gem_path[step], p)
			else
				local xxx = (node.x - 19) * 128
				local yyy = (node.y - 19) * 128
				local p = Vector(xxx, yyy, 137)

				_G.gem_path[step][lastindex] = p
			end
			lastdx = dx
			lastdy = dy
			lastx = node.x
			lasty = node.y
			lastd = d
		end
	else
		_G.gem_path[step] = {}
	end
end
function check_path_race(p1, p2)
	-- Value for walkable tiles
	local walkable = 0

	-- Library setup
	local Grid = require("pathfinder/grid") -- The grid class
	local Pathfinder = require("pathfinder/pathfinder") -- The pathfinder lass

	-- Creates a grid object
	local grid = nil

	grid = Grid(_G.gem_map)
	--grid = Grid(map)

	-- Creates a pathfinder object using Jump Point Search
	local myFinder = nil
	myFinder = Pathfinder(grid, "JPS", walkable)

	local xxx1 = math.floor((p1.x + 64) / 128) + 19
	local yyy1 = math.floor((p1.y + 64) / 128) + 19
	local xxx2 = math.floor((p2.x + 64) / 128) + 19
	local yyy2 = math.floor((p2.y + 64) / 128) + 19

	-- Define start and goal locations coordinates
	local startx, starty = xxx1, yyy1
	local endx, endy = xxx2, yyy2

	--local startx, starty = 2,2
	--local endx, endy = 9,9

	-- Calculates the path, and its length
	local path, length = myFinder:getPath(startx, starty, endx, endy)

	if path then
		return true
	else
		return false
	end
end
function find_path_race(p1, p2, step, playerid)
	-- Value for walkable tiles
	local walkable = 0

	-- Library setup
	local Grid = require("pathfinder/grid") -- The grid class
	local Pathfinder = require("pathfinder/pathfinder") -- The pathfinder lass

	-- Creates a grid object
	local grid = nil

	grid = Grid(_G.gem_map)
	--grid = Grid(map)

	-- Creates a pathfinder object using Jump Point Search
	local myFinder = nil
	myFinder = Pathfinder(grid, "JPS", walkable)

	local xxx1 = math.floor((p1.x + 64) / 128) + 19
	local yyy1 = math.floor((p1.y + 64) / 128) + 19
	local xxx2 = math.floor((p2.x + 64) / 128) + 19
	local yyy2 = math.floor((p2.y + 64) / 128) + 19

	-- Define start and goal locations coordinates
	local startx, starty = xxx1, yyy1
	local endx, endy = xxx2, yyy2

	--local startx, starty = 2,2
	--local endx, endy = 9,9

	-- Calculates the path, and its length
	local path, length = myFinder:getPath(startx, starty, endx, endy)

	if path then
		--这部分算法待优化
		local dx = 0
		local dy = 0
		local lastx = -100
		local lasty = -100
		local lastdx = -100
		local lastdy = -100
		local lastd = -100
		local d = 0

		--print(('Path found! Length: %.2f'):format(length))
		_G.gem_maze_length_race[playerid] = _G.gem_maze_length_race[playerid] + length

		for node, count in path:iter() do
			dx = node.x - lastx
			dy = node.y - lasty

			if dy == 0 then
				d = 999
			else
				d = dx / dy
			end

			--print(('Step%d - %d,%d'):format(count, node.x, node.y))

			local lastindex = table.maxn(_G.gem_path_race[playerid][step])

			if d ~= lastd or lastindex <= 1 then
				local xxx = (node.x - 19) * 128
				local yyy = (node.y - 19) * 128
				local p = Vector(xxx, yyy, 137)
				table.insert(_G.gem_path_race[playerid][step], p)
			else
				local xxx = (node.x - 19) * 128
				local yyy = (node.y - 19) * 128
				local p = Vector(xxx, yyy, 137)

				_G.gem_path_race[playerid][step][lastindex] = p
			end
			lastdx = dx
			lastdy = dy
			lastx = node.x
			lasty = node.y
			lastd = d
		end
	else
		_G.gem_path_race[playerid][step] = {}
	end
end
function find_path_one(p1, p2)
	-- Value for walkable tiles
	local walkable = 0

	-- Library setup
	local Grid = require("pathfinder/grid") -- The grid class
	local Pathfinder = require("pathfinder/pathfinder") -- The pathfinder lass

	-- Creates a grid object
	local grid = nil

	grid = Grid(_G.gem_map)
	--grid = Grid(map)

	-- Creates a pathfinder object using Jump Point Search
	local myFinder = nil
	myFinder = Pathfinder(grid, "JPS", walkable)

	local xxx1 = math.floor((p1.x + 64) / 128) + 19
	local yyy1 = math.floor((p1.y + 64) / 128) + 19
	local xxx2 = math.floor((p2.x + 64) / 128) + 19
	local yyy2 = math.floor((p2.y + 64) / 128) + 19

	-- Define start and goal locations coordinates
	local startx, starty = xxx1, yyy1
	local endx, endy = xxx2, yyy2

	--local startx, starty = 2,2
	--local endx, endy = 9,9

	-- Calculates the path, and its length
	local path, length = myFinder:getPath(startx, starty, endx, endy)

	if path then
		--这部分算法待优化
		local dx = 0
		local dy = 0
		local lastx = -100
		local lasty = -100
		local lastdx = -100
		local lastdy = -100
		local lastd = -100
		local d = 0

		_G.gem_maze_length = _G.gem_maze_length + length

		for node, count in path:iter() do
			local xxx = (node.x - 19) * 128
			local yyy = (node.y - 19) * 128
			local p = Vector(xxx, yyy, 137)
			if (p - p2):Length2D() < 32 or (p - p1):Length2D() >= 100 then
				return p
			end
		end
		return nil
	else
		return nil
	end
end

--英雄操作1——手动换英雄
function GemTD:OnRepickHero(keys)
	local player = EntIndexToHScript(keys.player)
	local heroindex = keys.heroindex
	local steam_id = keys.steam_id
	local repick_hero = tonumber(keys.repick_hero)
	local repipck_hero_level = tonumber(keys.repipck_hero_level)

	local hero = _G.hero[heroindex]
	local id = hero:GetPlayerID()
	_G.playerid2hero[player:GetPlayerID()] = EntIndexToHScript(heroindex)

	if GetMapName() == "gemtd_race" then
		CustomNetTables:SetTableValue("game_state", "disable_all_repick", { hehe = RandomInt(1, 10000) })
	end

	PrecacheUnitByNameAsync(_G.hero_sea[repick_hero], function()
		if hero.ppp ~= nil then
			ParticleManager:DestroyParticle(hero.ppp, true)
		end

		local player = PlayerResource:GetPlayer(id)
		local hero_new = CreateHeroForPlayer(_G.hero_sea[repick_hero], player)
		hero_new:SetPlayerID(id)
		hero_new:SetControllableByPlayer(id, true)
		hero_new:SetOwner(hero:GetOwner())
		player:SetAssignedHeroEntity(hero_new)
		hero:Destroy()

		-- local hero_new = PlayerResource:ReplaceHeroWith(id,_G.hero_sea[repick_hero],PlayerResource:GetGold(id),0)
		_G.replced[id] = true

		_G.hero[heroindex] = nil
		_G.hero[hero_new:GetEntityIndex()] = hero_new

		CustomNetTables:SetTableValue(
			"game_state",
			"repick_hero",
			{ old_index = heroindex, new_index = hero_new:GetEntityIndex() }
		)

		CustomNetTables:SetTableValue(
			"game_state",
			"select_hero1",
			{
				p1 = PlayerResource:GetSelectedHeroName(0),
				p2 = PlayerResource:GetSelectedHeroName(1),
				p3 = PlayerResource:GetSelectedHeroName(2),
				p4 = PlayerResource:GetSelectedHeroName(3),
			}
		)

		hero_new:RemoveAbility("gemtd_build_stone")
		hero_new:RemoveAbility("gemtd_remove")

		hero_new:AddAbility("gemtd_build_stone")
		hero_new.build_level = _G.level
		hero_new:FindAbilityByName("gemtd_build_stone"):SetLevel(1)
		hero_new:AddAbility("gemtd_remove")
		hero_new:FindAbilityByName("gemtd_remove"):SetLevel(1)

		local a = _G.ability_sea[repick_hero]
		hero_new:AddAbility(a)
		hero_new:FindAbilityByName(a):SetLevel(repipck_hero_level)
		hero_new.ability = a
		hero_new.ability_level = repipck_hero_level

		--添加玩家颜色底盘
		local particle = ParticleManager:CreateParticle(
			"particles/gem/team_" .. (id + 1) .. ".vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			hero_new
		)
		hero_new.ppp = particle

		SetHeroLevelShow(hero_new)
	end, id)
end

function ShowAbility(keys)
	local target = keys.target

	if target == nil then
		return
	end

	print("---" .. target:GetUnitName() .. "---")

	for i = 0, 100 do
		if target:GetAbilityByIndex(i) ~= nil then
			print(
				i
					.. "-->"
					.. target:GetAbilityByIndex(i):GetAbilityName()
					.. "-->"
					.. target:GetAbilityByIndex(i):GetLevel()
			)
		end
	end

	local all_modifier = target:FindAllModifiers()
	for _, m in pairs(all_modifier) do
		print(m:GetName())
	end
end

--英雄操作2——英雄升级
function GemTD:OnPlayerGainedLevel(keys)
	local i = 0
	for i = 0, 9 do
		if PlayerResource:IsValidPlayer(i) then
			local player = PlayerResource:GetPlayer(i)
			if player ~= nil then
				local h = player:GetAssignedHero()
				if h ~= nil and h:GetAbilityPoints() ~= 0 then
					SetHeroLevelShow(h)
					CustomNetTables:SetTableValue("game_state", "gem_team_level", { level = h:GetLevel() })
				end
			end
		end
	end
end
--英雄操作3——显示英雄头上的建造几率图标
function SetHeroLevelShow(hero_new)
	hero_new:SetAbilityPoints(0)
	hero_new:RemoveAbility("hero_level_show_1")
	hero_new:RemoveAbility("hero_level_show_2")
	hero_new:RemoveAbility("hero_level_show_3")
	hero_new:RemoveAbility("hero_level_show_4")
	hero_new:RemoveAbility("hero_level_show_5")
	hero_new:RemoveModifierByName("modifier_hero_level_show_1")
	hero_new:RemoveModifierByName("modifier_hero_level_show_2")
	hero_new:RemoveModifierByName("modifier_hero_level_show_3")
	hero_new:RemoveModifierByName("modifier_hero_level_show_4")
	hero_new:RemoveModifierByName("modifier_hero_level_show_5")
	hero_new:AddAbility("hero_level_show_" .. hero_new:GetLevel())
	hero_new:FindAbilityByName("hero_level_show_" .. hero_new:GetLevel()):SetLevel(hero_new:GetLevel())
end
--英雄操作4——同步金钱
function sync_player_gold(caster)
	--同步玩家金钱
	-- if GetMapName() == 'gemtd_1p' or GetMapName() == 'gemtd_coop' then
	-- 	local gold_one = PlayerResource:GetGold(0)
	-- 	if caster ~= nil then
	-- 		caster_player_id = caster:GetOwner():GetPlayerID()
	-- 		gold_one = PlayerResource:GetGold(caster_player_id)
	-- 	end
	-- 	for player_id=0, PlayerResource:GetPlayerCount()-1 do
	-- 		PlayerResource:SetGold(player_id, gold_one, true)
	-- 	end
	-- 	_G.team_gold = gold_one
	-- 	CustomNetTables:SetTableValue( "game_state", "gem_team_gold", { gold = gold_one } );
	-- else
	-- 	for player_id=0, PlayerResource:GetPlayerCount()-1 do
	-- 		CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(player_id),"show_money",{ money = PlayerResource:GetGold(player_id),})
	-- 	end
	-- end
end
-- function share_player_gold()
-- 	if GetMapName() == 'gemtd_1p' or GetMapName() == 'gemtd_coop' then
-- 		local gold_total =0
-- 		for player_id=0, PlayerResource:GetPlayerCount()-1 do
-- 			gold_total = gold_total + PlayerResource:GetGold(player_id)
-- 		end
-- 		local gold_one = math.floor(gold_total/PlayerResource:GetPlayerCount())
-- 		for player_id=0, PlayerResource:GetPlayerCount()-1 do
-- 			PlayerResource:SetGold(player_id, gold_one, true)
-- 		end
-- 		_G.team_gold = gold_one
-- 		CustomNetTables:SetTableValue( "game_state", "gem_team_gold", { gold = gold_one } );
-- 	else
-- 		return
-- 	end
-- end

--界面操作1——共享地图
function GemTD:OnReceiveShareMap(keys)
	_G.map = keys.map

	if _G.map ~= nil then
		GameRules:SendCustomMessage("#show_maze_pic", 0, 0)
		CustomNetTables:SetTableValue("game_state", "show_maze_map", { map = _G.map })
	end
end
--界面操作2——玩家主动结束游戏
function GemTD:OnGGsimida(keys)
	if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
		_G.game_status = 3
		send_ranking()
		--3秒后判定胜负并进入结束界面(end.xml)，输赢按是否过了50关
		Timers:CreateTimer(3, function()
			if _G.level > 50 then
				GameRules:SetGameWinner(DOTA_TEAM_GOODGUYS)
			else
				GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
			end
		end)
	else
		--竞速模式
		_G.gem_castle_hp_race[keys.player_id] = 0
		race_player_fail(keys.player_id)
	end
end
--结束面板(panel_end_game)的“退出游戏”按钮：直接判定游戏结束，不再重复结算(不调用 send_ranking)
function GemTD:OnEndGameExit(keys)
	--按当局胜负判定胜者：通关(等级>50，与结算面板 is_win 的判定一致) -> GOODGUYS，失败 -> BADGUYS
	local winner = DOTA_TEAM_BADGUYS
	if _G.level > 50 or _G.is_passed == true then
		winner = DOTA_TEAM_GOODGUYS
	end
	GameRules:SetGameWinner(winner)
end

-- 贝壳商店：点 store_link_img 时，把 当前玩家steamid + 时间戳 拼起来做 base64，
-- 二维码内容 = https://www.dota2zizouqi.cn/pc/index.html?game=gemtd&info=<base64>
-- 再用 quickchart 生成二维码 png 地址发回给该玩家（逻辑与 dac 商城的加号按钮一致）
function GemTD:OnRequestQRCode(keys)
	local player_id = keys.PlayerID
	local base64 = require("libs/base64")

	local steam_id = nil
	local ok_sid, sid = pcall(function()
		return tostring(PlayerResource:GetSteamID(player_id))
	end)
	if ok_sid and sid ~= nil and sid ~= "" and sid ~= "0" then
		steam_id = sid
	end
	if steam_id == nil then
		--兜底：用账号id
		local ok_id, account_id = pcall(function()
			return PlayerResource:GetSteamAccountID(player_id)
		end)
		if ok_id and account_id ~= nil then
			steam_id = tostring(account_id)
		end
	end
	if steam_id == nil then
		steam_id = ""
	end

	local timestamp = nil
	local ok_t, t = pcall(function()
		return os.time()
	end)
	if ok_t then
		timestamp = t
	end
	if timestamp == nil then
		timestamp = math.floor(GameRules:GetGameTime())
	end
	timestamp = tostring(timestamp)

	local qr_text = "https://www.dota2zizouqi.cn/pc/index.html?game=gemtd&info="
		.. base64.encode(tostring(steam_id) .. timestamp)
	--整个 text 做 url 编码（其中的 + / = ? : 等会破坏 url 参数）
	local text_url = string.gsub(qr_text, "([^%w%-_%.~])", function(c)
		return string.format("%%%02X", string.byte(c))
	end)
	local url = "https://quickchart.io/qr?text=" .. text_url .. "&size=300"

	print("[QR] steamid = " .. tostring(steam_id) .. ", timestamp = " .. timestamp)
	print("[QR] text = " .. qr_text)
	print("[QR] url = " .. url)

	--把结果发回给点图标的玩家，客户端用它显示二维码弹窗
	local function send_qr_result(status_code)
		local player = PlayerResource:GetPlayer(player_id)
		if player == nil then
			return
		end
		CustomGameEventManager:Send_ServerToPlayer(player, "show_qr_code", {
			url = url,
			text = qr_text,
			status_code = status_code,
		})
	end
	local req = CreateHTTPRequestScriptVM("GET", url)
	if req == nil then
		print("[QR] CreateHTTPRequestScriptVM FAILED!")
		send_qr_result(0)
		return
	end
	req:SetHTTPRequestAbsoluteTimeoutMS(20000)
	req:Send(function(res)
		if res == nil then
			print("[QR] HTTP FAILED! response = nil")
			send_qr_result(0)
			return
		end
		print("[QR] StatusCode = " .. tostring(res.StatusCode))
		send_qr_result(res.StatusCode or 0)
	end)
end

-- 队伍选择界面：开始游戏。任何玩家点了都走这里，由服务器统一锁队伍并开始倒计时。
-- 对应客户端原来只对主机生效的 Game.SetTeamSelectionLocked/SetAutoLaunchEnabled/SetRemainingSetupTime。
function GemTD:OnRequestStartGame(keys)
	-- 锁队伍，之后不能再换队
	if GameRules.LockCustomGameSetupTeamAssignment then
		pcall(function()
			GameRules:LockCustomGameSetupTeamAssignment(true)
		end)
	end
	-- 关掉自动开始
	if GameRules.EnableCustomGameSetupAutoLaunch then
		pcall(function()
			GameRules:EnableCustomGameSetupAutoLaunch(false)
		end)
	end
	-- 剩余准备时间设为 4 秒，倒计时结束引擎自动开
	if GameRules.SetCustomGameSetupRemainingTime then
		local ok = pcall(function()
			GameRules:SetCustomGameSetupRemainingTime(4)
		end)
		if ok then
			return
		end
	end
	-- 兜底：直接开始
	pcall(function()
		GameRules:FinishCustomGameSetup()
	end)
end

-- 队伍选择界面：取消开始。解锁队伍并停掉倒计时。
function GemTD:OnRequestCancelStart(keys)
	if GameRules.LockCustomGameSetupTeamAssignment then
		pcall(function()
			GameRules:LockCustomGameSetupTeamAssignment(false)
		end)
	end
	if GameRules.SetCustomGameSetupRemainingTime then
		pcall(function()
			GameRules:SetCustomGameSetupRemainingTime(-1)
		end)
	end
end
--界面操作3——玩家说话
function GemTD:OnPlayerSay(keys)
	local player_id = keys.playerid
	if player_id == nil or PlayerResource:GetPlayer(player_id) == nil then
		return
	end
	local hero = _G.playerid2hero[player_id]
	if hero == nil or hero:IsNull() == true then
		return
	end
	-- local player = userid2player[keys.userid]
	local heroindex = hero:GetEntityIndex()
	if heroindex == nil or _G.playerInfoReceived[heroindex] == nil then
		return
	end
	local steam_id = _G.playerInfoReceived[heroindex].steam_id
	local tokens = string.split(string.trim(string.lower(keys.text)))
	if
		tokens[1] == "-lvlup"
		or tokens[1] == "-createhero"
		or tokens[1] == "-item"
		or tokens[1] == "-refresh"
		or tokens[1] == "-startgame"
		or tokens[1] == "-killcreeps"
		or tokens[1] == "-wtf"
		or tokens[1] == "-disablecreepspawn"
		or tokens[1] == "-gold"
		or tokens[1] == "-lvlup"
		or tokens[1] == "-refresh"
		or tokens[1] == "-respawn"
		or tokens[1] == "dota_create_unit"
	then
		if GetMapName() == "gemtd_race" then
			GemTD:OnGGsimida({
				player_id = hero:GetPlayerID(),
			})
		else
			zuobi()
			GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
		end
	elseif tokens[1] == "-ggsimida" then
		GemTD:OnGGsimida({
			player_id = hero:GetPlayerID(),
		})
	elseif tokens[1] == "-tp" and GetMapName() ~= "gemtd_race" then
		hero:SetAbsOrigin(Vector(0, 0, 0))
	elseif tokens[1] == "-showggsimida" then
		CustomNetTables:SetTableValue(
			"game_state",
			"show_ggsimida_race",
			{ player = hero:GetPlayerID(), hehe = RandomInt(1, 10000) }
		)
	elseif tokens[1] == "-money" and _G.myself == true then
		prt('你获得了<font color="#ffff00">海量金币</font>！')
		PlayerResource:SetGold(hero:GetPlayerID(), 9999, true)
		EmitGlobalSound("General.CoinsBig")
		_G.team_gold = 9999
		_G.team_gold_race[hero:GetPlayerID()] = 9999
		CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(hero:GetPlayerID()), "show_money", {
			money = PlayerResource:GetGold(hero:GetPlayerID()),
		})
	elseif tokens[1] == "-crab" and _G.myself == true then
		_G.crab = tokens[2]
		prt("你施放了克莱伯祈祷：|gemtd_" .. tokens[2])
	elseif tokens[1] == "-spawn" and _G.myself == true then
		_G.stop_watch = GameRules:GetGameTime()
		spawn_one_wave()
	elseif tokens[1] == "-choose" and _G.myself == true then
		_G.level = tonumber(tokens[2])
		prt("你施放了关卡跳跃：" .. _G.level)
		CustomNetTables:SetTableValue(
			"game_state",
			"victory_condition",
			{ kills_to_win = _G.level, enemy_show = "gemtd_stone" }
		)
		-- _G.build_ready_wave[hero:GetPlayerID()] = tonumber(tokens[2])
	elseif tokens[1] == "-error" and _G.myself == true then
		GameRules:SendCustomMessage("人造报错", 0, 0)
		i:GetGameModeEntity().is_debug = true
	elseif tokens[1] == "-debug" and _G.myself == true then
		_G.is_debug = true
		GameRules:SendCustomMessage("开启调试信息", 0, 0)
	elseif tokens[1] == "-undebug" and _G.myself == true then
		_G.is_debug = false
		GameRules:SendCustomMessage("关闭调试信息", 0, 0)
	elseif tokens[1] == "-testdrop" and _G.myself == true then
		_G.DROP_PER = 50
		GameRules:SendCustomMessage("开启50%掉宝测试", 0, 0)
	elseif tokens[1] == "-toy" and _G.myself == true then
		prt("你获得了物品：|item_" .. tokens[2])
		GemTD:OnAddItem({ player_id = player, hero = hero, item = tokens[2] })
	elseif (tokens[1] == "-ability" or tokens[1] == "-a") and _G.myself == true then
		local level = tonumber(tokens[3]) or 4
		prt("你获得了技能：|DOTA_Tooltip_ability_" .. tokens[2] .. "| Lv" .. level)
		hero:AddAbility(tokens[2])
		hero:FindAbilityByName(tokens[2]):SetLevel(level)
	elseif tokens[1] == "-stone" and _G.myself == true then
		prt("你设置了石头样式：" .. tokens[2])
		if _G.stone_style_list[tokens[2]] == nil then
			prt('<font color="#ff0000">不存在这个石头样式！</font>')
		else
			SetHeroStoneStyle(hero, tokens[2])
		end
	elseif tokens[1] == "-word" and _G.myself == true then
		_G.word_object["name"] = tokens[2]
		prt("你设置了无尽试炼主题：|text_words_" .. tokens[2])
		CustomGameEventManager:Send_ServerToAllClients("show_words", {
			name = _G.word_object["name"],
			expire = _G.word_object["expire"],
			word_next = _G.word_object["word_next"],
			hehe = RandomInt(1, 10000),
		})
	elseif tokens[1] == "-damage" and _G.myself == true then
		prt("TEST CODE: SHOW DAMAGE")
		_G.show_damage = true
	elseif tokens[1] == "-undamage" and _G.myself == true then
		prt("TEST CODE: HIDE DAMAGE")
		_G.show_damage = false
	elseif tokens[1] == "-drop" and _G.myself == true then
		local i = "item_" .. tokens[2]
		local newItem = CreateItem(i, hero, hero)
		local drop = CreateItemOnPositionForLaunch(hero:GetAbsOrigin(), newItem)
		local dropRadius = RandomFloat(50, 200)
		newItem:LaunchLootInitialHeight(false, 0, 200, 0.75, hero:GetAbsOrigin() + RandomVector(dropRadius))
	elseif tokens[1] == "-crown" and _G.myself == true then
		local crown_level = tonumber(tokens[2] or 1)
		prt("TEST CODE: CROWN = " .. crown_level)
		hero.is_crown = true
		ShowCrown(hero, crown_level)
	elseif tokens[1] == "-maze" and _G.myself == true then
		prt("TEST CODE: BUILD MAZE")
		build_maze()
	elseif tokens[1] == "-add_enemy" and _G.myself == true then
		prt("TEST CODE: ADD ENEMY " .. tokens[2])
		_G.win_streak = _G.win_streak + (tonumber(tokens[2]) * 50)
		WinStreakAdjust()
	elseif tokens[1] == "-evade" and _G.myself == true then
		prt("TEST CODE: 100% EVADE")
		_G.gem_castle.shanbi = 100
	end

	CustomNetTables:SetTableValue(
		"game_state",
		"say_bubble",
		{ text = keys.text, unit = heroindex, hehe = RandomInt(1, 10000) }
	)

	if string.find(keys.text, "^%w%w%w%w%w%p%w%w%w%w%w%p%w%w%w%w%w$") ~= nil then
		local key = string.upper(keys.text)
		--GameRules:SendCustomMessage("玩家heroindex="..hero:entindex().."激活码: "..key, 0, 0)
		CustomNetTables:SetTableValue(
			"game_state",
			"cdkey",
			{ user = hero:entindex(), steam_id = steam_id, text = key, hehe = RandomInt(1, 10000) }
		)
		return
	end

	--特效测试
	if string.find(keys.text, "^e%w%w%w$") ~= nil and _G.myself == true then
		GameRules:SendCustomMessage("特效:" .. keys.text, 0, 0)
		if hero.effect ~= nil then
			hero:RemoveAbility(hero.effect)
			hero:RemoveModifierByName("modifier_texiao_star")
		end
		hero:AddAbility(keys.text)
		hero:FindAbilityByName(keys.text):SetLevel(1)
		hero.effect = keys.text
	end
end
--界面操作4——特效预览
function GemTD:OnPreviewEffect(keys)
	local h = EntIndexToHScript(keys.hero_index)
	local e = keys.effect

	if h.effect ~= nil then
		h:RemoveAbility(h.effect)
		h:RemoveModifierByName("modifier_texiao_star")
	end
	h:AddAbility(e)
	h:FindAbilityByName(e):SetLevel(1)

	Timers:CreateTimer(5, function()
		h:RemoveAbility(e)
		h:RemoveModifierByName("modifier_texiao_star")
		if h.effect ~= nil then
			h:AddAbility(h.effect)
			h:FindAbilityByName(h.effect):SetLevel(1)
		end
	end)
end
--界面操作5——显示任务完成状态
function show_quest()
	if GetMapName() == "gemtd_race" then
		return
	end
	local quest_status_send = {}
	for m, n in pairs(_G.quest) do
		if _G.quest_status[m] == true then
			quest_status_send[m] = true
		else
			quest_status_send[m] = false
		end
	end

	CustomNetTables:SetTableValue("game_state", "show_quest", quest_status_send)
end
function SetQuest(q, tf)
	_G.quest_status[q] = tf
	show_quest()
end

--辅助功能——防止作弊
function GemTD:OnNPCSpawned(keys)
	local spawned_unit = EntIndexToHScript(keys.entindex)

	local spawned_unit_name = spawned_unit:GetUnitName()

	--英雄出生
	if spawned_unit:IsHero() then
		spawned_unit.ftd = 2009
		local owner = spawned_unit:GetOwner()
		if owner == nil then
			return
		end
		local player_id = owner:GetPlayerID()

		spawned_unit:SetHullRadius(1)

		-- _G.gem_hero[player_id] = spawned_unit

		-- print(player_id..' ---> '..spawned_unit_name)

		GameRules:SetTimeOfDay(0.8)
	end

	Timers:CreateTimer(0.5, function()
		if (spawned_unit:IsNull()) or (not spawned_unit:IsAlive()) then
			return nil
		end

		if
			spawned_unit.ftd ~= 2009
			and spawned_unit:GetUnitName() ~= "npc_dota_thinker"
			and spawned_unit:GetUnitName() ~= "npc_dota_companion"
			and spawned_unit:GetUnitName() ~= nil
			and string.len(spawned_unit:GetUnitName()) > 0
			and (not string.find(spawned_unit:GetUnitName(), "_dota_phantomassassin_gravestone"))
		then
			if spawned_unit:GetAttackDamage() > 2 or spawned_unit:GetHullRadius() > 10 then
				zuobi()
				GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
				GameRules:SendCustomMessage("非法单位: " .. spawned_unit:GetUnitName(), 0, 0)
				-- end
			end
			return nil
		end
	end)
end

--辅助功能——播放特效
function play_particle(p, pos, u, d)
	local pp = ParticleManager:CreateParticle(p, pos, u)
	Timers:CreateTimer(d, function()
		ParticleManager:DestroyParticle(pp, true)
	end)
end
--辅助功能——不留石头的任务状态改变
function stone_quest(s)
	if
		s == "gemtd_d1"
		or s == "gemtd_d11"
		or s == "gemtd_d111"
		or s == "gemtd_d1111"
		or s == "gemtd_d11111"
		or s == "gemtd_d111111"
	then
		_G.quest_status["q202"] = false
		show_quest()
	end
	if
		s == "gemtd_b1"
		or s == "gemtd_b11"
		or s == "gemtd_b111"
		or s == "gemtd_b1111"
		or s == "gemtd_b11111"
		or s == "gemtd_b111111"
	then
		_G.quest_status["q203"] = false
		show_quest()
	end
	if
		s == "gemtd_r1"
		or s == "gemtd_r11"
		or s == "gemtd_r111"
		or s == "gemtd_r1111"
		or s == "gemtd_r11111"
		or s == "gemtd_r111111"
	then
		_G.quest_status["q204"] = false
		show_quest()
	end
	if
		s == "gemtd_y1"
		or s == "gemtd_y11"
		or s == "gemtd_y111"
		or s == "gemtd_y1111"
		or s == "gemtd_y11111"
		or s == "gemtd_y111111"
	then
		_G.quest_status["q205"] = false
		show_quest()
	end
	if
		s == "gemtd_p1"
		or s == "gemtd_p11"
		or s == "gemtd_p111"
		or s == "gemtd_p1111"
		or s == "gemtd_p11111"
		or s == "gemtd_p111111"
	then
		_G.quest_status["q206"] = false
		show_quest()
	end
	if
		s == "gemtd_q1"
		or s == "gemtd_q11"
		or s == "gemtd_q111"
		or s == "gemtd_q1111"
		or s == "gemtd_q11111"
		or s == "gemtd_q111111"
	then
		_G.quest_status["q207"] = false
		show_quest()
	end
	if
		s == "gemtd_g1"
		or s == "gemtd_g11"
		or s == "gemtd_g111"
		or s == "gemtd_g1111"
		or s == "gemtd_g11111"
		or s == "gemtd_g111111"
	then
		_G.quest_status["q208"] = false
		show_quest()
	end
end
--辅助功能——创建隐藏单位施法
function InvisibleUnitCast(keys)
	local shiban = keys.caster
	local shiban_ability = keys.ability
	local ability_level = keys.level
	local unluckydog = keys.unluckydog
	local position = keys.position

	local uu =
		CreateUnitByName("gemtd_feicuimoxiang_yinxing", shiban:GetAbsOrigin(), false, nil, nil, DOTA_TEAM_GOODGUYS)
	uu.ftd = 2009
	uu.father = shiban
	uu:SetOwner(shiban)

	uu:AddAbility(shiban_ability)
	uu:FindAbilityByName(shiban_ability):SetLevel(ability_level)

	Timers:CreateTimer(0.05, function()
		if uu:FindAbilityByName(shiban_ability):GetBehavior() == DOTA_ABILITY_BEHAVIOR_UNIT_TARGET then
			local newOrder = {
				UnitIndex = uu:entindex(),
				OrderType = DOTA_UNIT_ORDER_CAST_TARGET,
				TargetIndex = unluckydog:entindex(), --Optional.  Only used when targeting units
				AbilityIndex = uu:FindAbilityByName(shiban_ability):entindex(), --Optional.  Only used when casting abilities
				Position = nil, --Optional.  Only used when targeting the ground
				Queue = 0, --Optional.  Used for queueing up abilities
			}
			ExecuteOrderFromTable(newOrder)
		elseif uu:FindAbilityByName(shiban_ability):GetBehavior() == DOTA_ABILITY_BEHAVIOR_NO_TARGET then
			local newOrder = {
				UnitIndex = uu:entindex(),
				OrderType = DOTA_UNIT_ORDER_CAST_NO_TARGET,
				TargetIndex = unluckydog:entindex(), --Optional.  Only used when targeting units
				AbilityIndex = uu:FindAbilityByName(shiban_ability):entindex(), --Optional.  Only used when casting abilities
				Position = nil, --Optional.  Only used when targeting the ground
				Queue = 0, --Optional.  Used for queueing up abilities
			}
			ExecuteOrderFromTable(newOrder)
		else
			uu.target_position = unluckydog:GetAbsOrigin()
			local newOrder = {
				UnitIndex = uu:entindex(),
				OrderType = DOTA_UNIT_ORDER_CAST_POSITION,
				TargetIndex = unluckydog:entindex(), --Optional.  Only used when targeting units
				AbilityIndex = uu:FindAbilityByName(shiban_ability):entindex(), --Optional.  Only used when casting abilities
				Position = unluckydog:GetAbsOrigin(), --Optional.  Only used when targeting the ground
				Queue = 0, --Optional.  Used for queueing up abilities
			}
			ExecuteOrderFromTable(newOrder)
		end
		Timers:CreateTimer(10, function()
			if uu ~= nil and uu:IsNull() ~= true then
				uu:ForceKill(false)
			end
			if uu ~= nil and uu:IsNull() ~= true then
				uu:Destroy()
			end
		end)
	end)
end
function InvisibleEnemyCastFog(keys)
	local player_id = keys.player_id
	local p = Entities:FindByName(nil, "center" .. player_id):GetAbsOrigin()
		+ Vector(RandomInt(-400, 400), RandomInt(-400, 400), 0)

	local uu = CreateUnitByName("gemtd_feicuimoxiang_yinxing", p, false, nil, nil, DOTA_TEAM_BADGUYS)
	uu.ftd = 2009

	uu:AddAbility("riki_smoke_screen")
	uu:FindAbilityByName("riki_smoke_screen"):SetLevel(4)
	Timers:CreateTimer(0.05, function()
		uu.target_position = p
		local newOrder = {
			UnitIndex = uu:entindex(),
			OrderType = DOTA_UNIT_ORDER_CAST_POSITION,
			TargetIndex = nil, --Optional.  Only used when targeting units
			AbilityIndex = uu:FindAbilityByName("riki_smoke_screen"):entindex(), --Optional.  Only used when casting abilities
			Position = p, --Optional.  Only used when targeting the ground
			Queue = 0, --Optional.  Used for queueing up abilities
		}
		ExecuteOrderFromTable(newOrder)

		Timers:CreateTimer(20, function()
			if uu ~= nil and uu:IsNull() ~= true then
				uu:ForceKill(false)
			end
			if uu ~= nil and uu:IsNull() ~= true then
				uu:Destroy()
			end
		end)
	end)
end
--辅助功能——在屏幕中央上方显示大字
function ShowCenterMessage(msg, dur, wave, count)
	if msg == nil then
		return
	end
	if wave == nil then
		wave = 0
	end
	if count == nil then
		count = 0
	end

	-- local msg = {
	-- 	message = msg,
	-- 	duration = dur
	-- }
	--print( "Sending message to all clients." )
	-- FireGameEvent("show_center_message",msg)

	if msg == "youwin" then
		CustomNetTables:SetTableValue(
			"game_state",
			"show_top_tips",
			{ text = msg, time = dur, hehe = RandomInt(1, 10000) }
		)
		play_particle(
			"particles/econ/events/killbanners/screen_killbanner_compendium16_triplekill.vpcf",
			PATTACH_EYES_FOLLOW,
			_G.gem_castle,
			8
		)
	elseif msg == "youwin_race" then
		CustomNetTables:SetTableValue(
			"game_state",
			"show_top_tips",
			{ text = msg, time = dur, hehe = RandomInt(1, 10000) }
		)
		play_particle(
			"particles/econ/events/killbanners/screen_killbanner_compendium16_triplekill.vpcf",
			PATTACH_EYES_FOLLOW,
			_G.gem_castle,
			8
		)
	elseif string.find(msg, "boss") then
		-- EmitGlobalSound("diretide_select_target_Stinger")
		CustomNetTables:SetTableValue(
			"game_state",
			"show_top_tips",
			{ text = msg, time = dur, wave = wave, count = 1, hehe = RandomInt(1, 10000) }
		)
		play_particle(
			"particles/econ/events/killbanners/screen_killbanner_compendium14_triplekill.vpcf",
			PATTACH_EYES_FOLLOW,
			_G.gem_castle,
			5
		)
		-- play_particle("particles/econ/events/killbanners/screen_killbanner_compendium14_firstblood.vpcf",PATTACH_EYES_FOLLOW, _G.gem_castle,5)
	else
		CustomNetTables:SetTableValue(
			"game_state",
			"show_top_tips",
			{ text = msg, time = dur, wave = wave, count = count, hehe = RandomInt(1, 10000) }
		)
		play_particle(
			"particles/econ/events/killbanners/screen_killbanner_compendium14_rampage_swipe1.vpcf",
			PATTACH_EYES_FOLLOW,
			_G.gem_castle,
			5
		)
	end
end
--辅助功能——伤害显示
function show_damage(keys)
	-- local caster = keys.caster
	-- local attacker = keys.attacker
	-- if attacker == nil or attacker:IsNull() == true or attacker:IsAlive() == false or attacker:IsHero() then
	-- 	return
	-- end
	-- local player_id = nil
	-- if attacker.father ~= nil then
	-- 	if attacker.father:GetOwner() == nil then
	-- 		return
	-- 	end
	-- 	player_id = attacker.father:GetOwner():GetPlayerID()
	-- 	local owner = attacker.father:GetOwner()
	-- 	if owner == nil then
	-- 		return
	-- 	end
	-- else
	-- 	if attacker:GetOwner() == nil then
	-- 		return
	-- 	end
	-- 	player_id = attacker:GetOwner():GetPlayerID()
	-- 	local owner = attacker:GetOwner()
	-- 	if owner == nil then
	-- 		return
	-- 	end
	-- end

	-- local damage = math.floor(keys.DamageTaken)
	-- if damage<=0 then
	-- 	damage = 0
	-- end

	-- print('show_damage:'..math.floor(keys.DamageTaken))

	-- -- if damage >= (_G.level*2) then
	-- 	-- AMHC:CreateNumberEffect(caster,damage,2,AMHC.MSG_DAMAGE,"red",3)
	-- -- end

	-- --伤害统计
	-- local attacker_id = attacker:GetEntityIndex()

	-- if attacker.father ~= nil then
	-- 	attacker_id = attacker.father:GetEntityIndex()
	-- end

	-- if GetMapName() == 'gemtd_1p' or GetMapName() == 'gemtd_coop' then
	-- 	local curr_damage = _G.damage[attacker_id]
	-- 	if curr_damage == nil then
	-- 		curr_damage = 0
	-- 	end
	-- 	curr_damage = curr_damage + damage
	-- 	_G.damage[attacker_id] = curr_damage

	-- 	local g_time = GameRules:GetGameTime() - _G.game_time
	-- 	if _G.last_g_time == nil then
	-- 		_G.last_g_time = 0
	-- 	end
	-- 	local time_this_level = math.floor(GameRules:GetGameTime() - _G.stop_watch)
	-- 	if g_time - _G.last_g_time > 1 then
	-- 		_G.last_g_time = g_time
	-- 		CustomNetTables:SetTableValue( "game_state", "damage_stat", { level = _G.level, damage_table = _G.damage , time_this_level = time_this_level, hehe = RandomInt(1,100000) } )
	-- 	end
	-- elseif GetMapName() == 'gemtd_race' then
	-- 	local curr_damage = _G.damage_race[player_id][attacker_id]
	-- 	if curr_damage == nil then
	-- 		curr_damage = 0
	-- 	end
	-- 	curr_damage = curr_damage + damage
	-- 	_G.damage_race[player_id][attacker_id] = curr_damage

	-- 	local g_time = GameRules:GetGameTime() - _G.game_time
	-- 	if GameRules:GetGameModeEntity()['last_g_time'..player_id] == nil then
	-- 		GameRules:GetGameModeEntity()['last_g_time'..player_id] = 0
	-- 	end
	-- 	local time_this_level = math.floor(GameRules:GetGameTime() - _G.stop_watch)
	-- 	if g_time - GameRules:GetGameModeEntity()['last_g_time'..player_id] > 1 then
	-- 		GameRules:GetGameModeEntity()['last_g_time'..player_id] = g_time
	-- 		CustomNetTables:SetTableValue( "game_state", "damage_stat_race", { level = _G.level, damage_table = _G.damage_race , time_this_level = time_this_level, hehe = RandomInt(1,100000) } )
	-- 	end

	-- end
end
--辅助功能——咩子的维修工具
function FixTool(keys)
	local u = keys.target

	play_particle("particles/econ/items/tinker/boots_of_travel/teleport_end_bots_b.vpcf", PATTACH_OVERHEAD_FOLLOW, u, 1)

	local timer_count = 20
	Timers:CreateTimer(function()
		timer_count = timer_count - 1
		if timer_count <= 0 then
			return
		end
		local random_count = 0
		local a = RandomInt(0, 23)
		local b = RandomInt(0, 23)
		while
			(
				u:GetAbilityByIndex(a) == nil
				or u:GetAbilityByIndex(b) == nil
				or u:GetAbilityByIndex(a):IsHidden() == true
				or u:GetAbilityByIndex(b):IsHidden() == true
				or u:GetAbilityByIndex(a):GetAbilityName() == "gemtd_build_stone"
				or u:GetAbilityByIndex(b):GetAbilityName() == "gemtd_build_stone"
				or u:GetAbilityByIndex(a):GetAbilityName() == "gemtd_remove"
				or u:GetAbilityByIndex(b):GetAbilityName() == "gemtd_remove"
			) and random_count < 100
		do
			a = RandomInt(0, 23)
			b = RandomInt(0, 23)
			random_count = random_count + 1
		end
		if random_count < 100 then
			u:SwapAbilities(
				u:GetAbilityByIndex(a):GetAbilityName(),
				u:GetAbilityByIndex(b):GetAbilityName(),
				true,
				true
			)
		end
		return 0.02
	end)
end
--辅助功能——捕捉一只螃蟹，发回pui
function GemTD:OnCatchCrab(keys)
	local url = keys.url
	local cb = keys.cb
	if url == null or cb == null then
		return
	end
	local user = keys.user

	url = string.gsub(url, "gemtd/ranking/add/", "gemtd/202408/ranking/add/")
	url = url .. GetSendKey()

	local r = RandomFloat(0, 1)
	Timers:CreateTimer(r, function()
		local req = CreateHTTPRequestScriptVM("GET", url)
		req:SetHTTPRequestAbsoluteTimeoutMS(20000)
		req:Send(function(result)
			-- local t = json.decode(result["Body"])
			CustomNetTables:SetTableValue(
				"game_state",
				cb,
				{ crab = result["Body"], user = user, hehe = RandomInt(1, 100000) }
			)
		end)
	end)
end
--栅格化坐标
function rasterize_vector(pp)
	local xxx = math.floor((pp.x + 64) / 128) + 19
	local yyy = math.floor((pp.y + 64) / 128) + 19
	pp.x = math.floor((pp.x + 64) / 128) * 128
	pp.y = math.floor((pp.y + 64) / 128) * 128
	return pp
end
--把现有的塔发送到pui的合成面板显示
function send_merge_board(player_id)
	if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
		--合作模式
		local send_pool = {}
		for c, c_unit in pairs(_G.gemtd_pool) do
			if c_unit ~= nil then
				if c_unit ~= nil and c_unit:IsNull() == false then
					table.insert(send_pool, c_unit:GetUnitName())
				end
			end
		end
		CustomNetTables:SetTableValue("game_state", "gem_merge_board", send_pool)

		--发送merge_board_curr
		local send_pool = {}

		for c, c_unit in pairs(_G.build_curr[0]) do
			if IsValidEntity(c_unit) then
				table.insert(send_pool, c_unit:GetUnitName())
			end
		end
		for c, c_unit in pairs(_G.build_curr[1]) do
			if IsValidEntity(c_unit) then
				table.insert(send_pool, c_unit:GetUnitName())
			end
		end
		for c, c_unit in pairs(_G.build_curr[2]) do
			if IsValidEntity(c_unit) then
				table.insert(send_pool, c_unit:GetUnitName())
			end
		end
		for c, c_unit in pairs(_G.build_curr[3]) do
			if IsValidEntity(c_unit) then
				table.insert(send_pool, c_unit:GetUnitName())
			end
		end
		CustomNetTables:SetTableValue("game_state", "gem_merge_board_curr", send_pool)
	elseif GetMapName() == "gemtd_race" then
		--竞速模式
		local send_pool = {}
		for c, c_unit in pairs(_G.gemtd_pool_race[player_id]) do
			if c_unit ~= nil and c_unit:IsNull() == false then
				table.insert(send_pool, c_unit:GetUnitName())
			end
		end
		CustomNetTables:SetTableValue(
			"game_state",
			"gem_merge_board_race",
			{ pool = send_pool, player = player_id, hehe = RandomInt(1, 100000) }
		)

		local send_pool = {}
		for c, c_unit in pairs(_G.build_curr[player_id]) do
			table.insert(send_pool, c_unit:GetUnitName())
		end
		CustomNetTables:SetTableValue(
			"game_state",
			"gem_merge_board_curr_race",
			{ pool = send_pool, player = player_id, hehe = RandomInt(1, 100000) }
		)
	end
end

--玩家技能
--小鹿-回春
function gemtd_jidihuixue(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	if owner == nil then
		return
	end
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_huichun"):GetLevel()
	--花钱
	-- local cost_gold_result = CostGold({
	-- 	caster = keys.caster,
	-- 	gold_cost = keys.gold_cost
	-- })
	-- if cost_gold_result == false then
	-- 	return
	-- end
	SetQuest("q211", false)

	local huixue_max = {
		[1] = 10,
		[2] = 13,
		[3] = 15,
		[4] = 16,
	}

	local hp_count = RandomInt(1, huixue_max[level])
	EmitGlobalSound("DOTAMusic_Stinger.004")
	--同步玩家金钱
	-- sync_player_gold(caster)
	if GetMapName() ~= "gemtd_race" then
		Timers:CreateTimer(0.1, function()
			_G.gem_castle_hp = _G.gem_castle_hp + hp_count
			-- if _G.gem_castle_hp > _G.gem_castle_hp_max then
			-- 	_G.gem_castle_hp_max = _G.gem_castle_hp
			-- end
			-- 不能超过上限
			if _G.gem_castle_hp > _G.gem_castle:GetMaxHealth() then
				_G.gem_castle_hp = _G.gem_castle:GetMaxHealth()
			end
			SyncHP("gemtd_jidihuixue")
		end)

		AMHC:CreateNumberEffect(caster, hp_count, 5, AMHC.MSG_MISS, "green", 0)
	else
		_G.gem_castle_hp_race[player_id] = _G.gem_castle_hp_race[player_id] + hp_count
		local castle = _G.gem_castle_race[player_id]
		-- 不能超过上限
		if _G.gem_castle_hp_race[player_id] > castle:GetMaxHealth() then
			_G.gem_castle_hp_race[player_id] = castle:GetMaxHealth()
		end

		if castle then
			castle:SetHealth(_G.gem_castle_hp_race[player_id])

			CustomNetTables:SetTableValue("game_state", "gem_life_race", {
				player = player_id,
				gem_life = _G.gem_castle_hp_race[player_id],
				gem_life_max = castle:GetMaxHealth(),
			})
		end
		if PlayerResource:GetPlayer(player_id) ~= nil then
			local h = PlayerResource:GetPlayer(player_id):GetAssignedHero()
			h:SetHealth(_G.gem_castle_hp_race[player_id])
		end

		AMHC:CreateNumberEffect(caster, hp_count, 5, AMHC.MSG_MISS, "green", 0)
	end
end
--帕克-闪避
function gemtd_hero_shanbi(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_shanbi"):GetLevel()

	-- --花钱
	-- local cost_gold_result = CostGold({
	-- 	caster = keys.caster,
	-- 	gold_cost = keys.gold_cost
	-- })
	-- if cost_gold_result == false then
	-- 	return
	-- end
	SetQuest("q211", false)

	--同步玩家金钱
	-- sync_player_gold(caster)
	if GetMapName() ~= "gemtd_race" then
		--为宝石基地增加闪避buff
		_G.gem_castle.shanbi = level * 5 + 5

		EmitGlobalSound("n_creep_ghost.Death")

		if _G.gem_castle.shanbi_particle ~= nil then
			ParticleManager:DestroyParticle(_G.gem_castle.shanbi_particle, true)
		end
		local particle = ParticleManager:CreateParticle(
			"particles/gem/immunity_sphere_buff.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			_G.gem_castle
		)
		_G.gem_castle.shanbi_particle = particle

		Timers:CreateTimer(60, function()
			_G.gem_castle.shanbi = 0
			ParticleManager:DestroyParticle(_G.gem_castle.shanbi_particle, true)
		end)
	else
		--为宝石基地增加闪避buff
		_G.gem_castle_race[player_id].shanbi = level * 5 + 5

		EmitGlobalSound("n_creep_ghost.Death")

		if _G.gem_castle_race[player_id].shanbi_particle ~= nil then
			ParticleManager:DestroyParticle(_G.gem_castle_race[player_id].shanbi_particle, true)
		end
		local particle = ParticleManager:CreateParticle(
			"particles/gem/immunity_sphere_buff.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			_G.gem_castle_race[player_id]
		)
		_G.gem_castle_race[player_id].shanbi_particle = particle

		Timers:CreateTimer(60, function()
			_G.gem_castle_race[player_id].shanbi = 0
			ParticleManager:DestroyParticle(_G.gem_castle_race[player_id].shanbi_particle, true)
		end)
	end
end
--全能-守护
function gemtd_hero_shouhu(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_shouhu"):GetLevel()

	--花钱
	-- local cost_gold_result = CostGold({
	-- 	caster = keys.caster,
	-- 	gold_cost = keys.gold_cost
	-- })
	-- if cost_gold_result == false then
	-- 	return
	-- end
	SetQuest("q211", false)

	--同步玩家金钱
	-- sync_player_gold(caster)
	if GetMapName() ~= "gemtd_race" then
		--为宝石基地增加守护buff
		_G.gem_castle.shouhu = level

		EmitGlobalSound("Item.CrimsonGuard.Cast")

		if _G.gem_castle.shouhu_particle ~= nil then
			ParticleManager:DestroyParticle(_G.gem_castle.shouhu_particle, true)
		end
		local particle =
			ParticleManager:CreateParticle("effect/omniwings/omni.vpcf", PATTACH_ABSORIGIN_FOLLOW, _G.gem_castle)
		_G.gem_castle.shouhu_particle = particle

		Timers:CreateTimer(60, function()
			_G.gem_castle.shouhu = 0
			ParticleManager:DestroyParticle(_G.gem_castle.shouhu_particle, true)
		end)
	else
		--为宝石基地增加守护buff
		_G.gem_castle_race[player_id].shouhu = level

		EmitGlobalSound("Item.CrimsonGuard.Cast")

		if _G.gem_castle_race[player_id].shouhu_particle ~= nil then
			ParticleManager:DestroyParticle(_G.gem_castle_race[player_id].shouhu_particle, true)
		end
		local particle = ParticleManager:CreateParticle(
			"effect/omniwings/omni.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			_G.gem_castle_race[player_id]
		)
		_G.gem_castle_race[player_id].shouhu_particle = particle

		Timers:CreateTimer(60, function()
			_G.gem_castle_race[player_id].shouhu = 0
			ParticleManager:DestroyParticle(_G.gem_castle_race[player_id].shouhu_particle, true)
		end)
	end
end
--回到过去
function gemtd_hero_huidaoguoqu(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	if owner == nil then
		return
	end
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_huidaoguoqu"):GetLevel()
	SetQuest("q211", false)
	--同步玩家金钱
	sync_player_gold(caster)

	if _G.game_status ~= 1 then
		EmitGlobalSound("General.CastFail_NoMana")
		return
	end

	if _G.is_build_ready[player_id] == true then
		EmitGlobalSound("General.CastFail_NoMana")
		return
	end

	--开始回到过去
	for m, vm in pairs(_G.build_curr[player_id]) do
		local xxx = math.floor((vm:GetAbsOrigin().x + 64) / 128) + 19
		local yyy = math.floor((vm:GetAbsOrigin().y + 64) / 128) + 19

		_G.gem_map[yyy][xxx] = 0

		if vm.ppp then
			ParticleManager:DestroyParticle(vm.ppp, true)
		end
		vm:Destroy()
	end
	find_all_path()

	_G.build_curr[player_id] = {}

	_G.build_index[player_id] = 0
	send_merge_board(player_id)

	caster:FindAbilityByName("gemtd_build_stone"):SetActivated(true)
	caster:FindAbilityByName("gemtd_remove"):SetActivated(true)
	--只有建造阶段能用的技能
	SetAbilityActiveStatus(caster, true)
	caster.build_level = _G.level
	play_particle("particles/items2_fx/refresher.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster, 2)
	EmitGlobalSound("DOTA_Item.Refresher.Activate")
end
--各种颜色的祈祷
function gemtd_hero_lanse(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_lanse"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")
	play_particle("particles/gem/blue_pray.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster, 5)

	--增加几率
	caster.pray_color = 1
	caster.pray = _G.pray_gailv[level]
end
function gemtd_hero_danbai(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_danbai"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")
	play_particle("particles/gem/opal_pray.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster, 5)

	--增加几率
	caster.pray_color = 4
	caster.pray = _G.pray_gailv[level]
end
function gemtd_hero_baise(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_baise"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")
	play_particle("particles/gem/white_pray.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster, 5)
	--增加几率
	caster.pray_color = 2
	caster.pray = _G.pray_gailv[level]
end
function gemtd_hero_hongse(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	if owner == nil then
		return
	end
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_hongse"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")
	play_particle("particles/gem/red_pray.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster, 5)

	--增加几率
	caster.pray_color = 7
	caster.pray = _G.pray_gailv[level]
end
function gemtd_hero_zise(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_zise"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")
	play_particle("particles/gem/purple_pray.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster, 5)

	--增加几率
	caster.pray_color = 8
	caster.pray = _G.pray_gailv[level]
end
function gemtd_hero_lvse(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_lvse"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")
	play_particle("particles/gem/green_pray.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster, 5)

	--增加几率
	caster.pray_color = 5
	caster.pray = _G.pray_gailv[level]
end
function gemtd_hero_fense(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_fense"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")
	play_particle("particles/gem/sea_pray.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster, 5)

	--增加几率
	caster.pray_color = 3
	caster.pray = _G.pray_gailv[level]
end
function gemtd_hero_huangse(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_huangse"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")
	play_particle("particles/gem/yellow_pray.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster, 5)

	--增加几率
	caster.pray_color = 6
	caster.pray = _G.pray_gailv[level]
end
function gemtd_hero_putong(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_putong"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")

	--增加几率
	caster.pray_level = "111"
	local gailv_putong = {
		[1] = 50,
		[2] = 65,
		[3] = 75,
		[4] = 80,
	}
	caster.pray_l = gailv_putong[level]
end
function gemtd_hero_wuxia(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_wuxia"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")

	--增加几率
	caster.pray_level = "1111"
	local gailv_wuxia = {
		[1] = 29,
		[2] = 41,
		[3] = 47,
		[4] = 50,
	}
	caster.pray_l = gailv_wuxia[level]
end
function gemtd_hero_wanmei(keys)
	local caster = keys.caster
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local level = caster:FindAbilityByName("gemtd_hero_wanmei"):GetLevel()

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	EmitGlobalSound("Item.DropGemShop")

	--增加几率
	caster.pray_level = "11111"
	local gailv_wanmei = {
		[1] = 6,
		[2] = 14,
		[3] = 18,
		[4] = 20,
	}
	caster.pray_l = gailv_wanmei[level]
end

--VS换
function gemtd_hero_yixinghuanwei(keys)
	local caster = keys.caster
	local target = keys.target
	local ability = keys.ability
	local owner = caster:GetOwner()
	if owner == nil then
		return
	end
	local player_id = owner:GetPlayerID()
	local level = ability:GetLevel()

	if
		string.find(target:GetUnitName(), "shiban")
		or target:IsHero() == true
		or caster:GetTeam() ~= target:GetTeam()
	then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_no_attack_damage",
		})
		ability:EndCooldown()
		return
	end

	local cost_gold_result = CostGold({
		caster = keys.caster,
		gold_cost = keys.gold_cost,
	})
	if cost_gold_result == false then
		return
	end

	SetQuest("q211", false)

	--同步玩家金钱
	sync_player_gold(caster)

	if target == nil or target:IsNull() == true then
		return
	end
	if target:GetUnitName() == "gemtd_castle" then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_at_it",
		})
		return
	end

	if GetMapName() == "gemtd_race" and target:GetOwner():GetPlayerID() ~= caster:GetPlayerID() then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_at_it",
		})
		return
	end

	--换的是石头，不花钱
	-- if target:GetUnitName() == "gemtd_stone" and target.is_streetlight ~= true then
	-- 	local yixinghuanwei_cost = {
	-- 		[1] = 375,
	-- 		[2] = 275,
	-- 		[3] = 225,
	-- 		[4] = 200,
	-- 	}
	-- 	local ability_level = caster:FindAbilityByName("gemtd_hero_yixinghuanwei"):GetLevel()
	-- 	local cost = yixinghuanwei_cost[ability_level] or 0

	-- 	if GetMapName()=="gemtd_race" then
	-- 		--竞速模式
	-- 		if _G.team_gold_race[player_id] == nil then
	-- 			_G.team_gold_race[player_id] = 0
	-- 		end
	-- 		_G.team_gold_race[player_id] = math.floor(_G.team_gold_race[player_id] + cost)
	-- 		PlayerResource:SetGold(player_id, _G.team_gold_race[player_id], true)

	-- 		CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(player_id),"show_money",{ money = _G.team_gold_race[player_id],})
	-- 	end

	-- 	if GetMapName()=="gemtd_coop" or GetMapName()=="gemtd_1p" then
	-- 		--合作/单人模式
	-- 		if _G.team_gold == nil then
	-- 			_G.team_gold = 0
	-- 		end

	-- 		_G.team_gold = math.floor(_G.team_gold + cost)
	-- 		for i=0, PlayerResource:GetPlayerCount()-1 do
	-- 			PlayerResource:SetGold(i, _G.team_gold, true)
	-- 		end

	-- 		CustomNetTables:SetTableValue( "game_state", "gem_team_gold", { gold = _G.team_gold, hehe = RandomInt(1,1000000)} )
	-- 	end
	-- end

	--go!
	if _G.gem_swap[player_id] == nil or _G.gem_swap[player_id]:IsNull() == true then
		--存
		play_particle(
			"particles/units/heroes/hero_vengeful/vengeful_nether_swap.vpcf",
			PATTACH_OVERHEAD_FOLLOW,
			target,
			2
		)
		_G.gem_swap[player_id] = target
		EmitGlobalSound("DOTA_Item.Daedelus.Crit")
	else
		--换
		local p = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_vengeful/vengeful_nether_swap.vpcf",
			PATTACH_CUSTOMORIGIN,
			target
		)
		ParticleManager:SetParticleControlEnt(p, 0, target, 5, "attach_hitloc", target:GetOrigin(), true)
		ParticleManager:SetParticleControlEnt(
			p,
			1,
			_G.gem_swap[player_id],
			5,
			"attach_hitloc",
			_G.gem_swap[player_id]:GetOrigin(),
			true
		)
		Timers:CreateTimer(1, function()
			ParticleManager:DestroyParticle(p, true)
		end)

		EmitGlobalSound("DOTA_Item.Daedelus.Crit")
		local u1 = _G.gem_swap[player_id]
		local u2 = target
		local p1 = u1:GetAbsOrigin()
		local p2 = u2:GetAbsOrigin()
		u1:SetAbsOrigin(Vector(5000, 5000, 0))
		u2:SetAbsOrigin(p1)
		u1:SetAbsOrigin(p2)

		_G.gem_swap[player_id] = nil
	end
end
--小挪移
function gemtd_hero_qingyi(keys)
	local caster = keys.caster
	local ability = keys.ability
	local target = keys.target
	if target == nil then
		return
	end
	if target:GetAttackDamage() < 1 or string.find(target:GetUnitName(), "shiban") then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_no_attack_damage",
		})
		ability:EndCooldown()
		return
	end
	if GetMapName() == "gemtd_race" and player_id ~= target:GetOwner():GetPlayerID() then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_at_it",
		})
		ability:EndCooldown()
		return
	end
	if target:GetUnitName() == "gemtd_castle" then
		EmitGlobalSound("General.InvalidTarget_Invulnerable")
		GameRules:SendCustomMessage("#cannot_swap_gem_castle", 0, 0)
		ability:EndCooldown()
		return
	end

	local cost_gold_result = CostGold({
		caster = keys.caster,
		gold_cost = keys.gold_cost or 100,
	})
	if cost_gold_result == false then
		ability:EndCooldown()
		return
	end

	SetQuest("q211", false)
	--同步玩家金钱
	sync_player_gold(caster)

	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		target:GetAbsOrigin(),
		nil,
		192,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_ANY_ORDER,
		false
	)
	if table.getn(uuu) > 0 then
		for i, v in pairs(uuu) do
			if v:GetUnitName() == "gemtd_stone" then
				play_particle(
					"particles/units/heroes/hero_vengeful/vengeful_nether_swap_target.vpcf",
					PATTACH_OVERHEAD_FOLLOW,
					target,
					2
				)
				EmitGlobalSound("DOTA_Item.Daedelus.Crit")
				local u1 = v
				local u2 = target
				local p1 = u1:GetAbsOrigin()
				local p2 = u2:GetAbsOrigin()
				u1:SetAbsOrigin(Vector(5000, 5000, 0))
				u2:SetAbsOrigin(p1)
				u1:SetAbsOrigin(p2)
				break
			end
		end
	end
end
--巨石阵
function gemtd_hero_shitou(keys)
	local caster = keys.caster
	local level = caster:FindAbilityByName("gemtd_hero_shitou"):GetLevel()

	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	--同步玩家金钱
	sync_player_gold(caster)

	SetQuest("q211", false)

	--制造石头
	local max_stone_count = level * 2 + 2
	local pp = caster:GetAbsOrigin()
	--网格化坐标
	local xxx = math.floor((pp.x + 64) / 128) + 19
	local yyy = math.floor((pp.y + 64) / 128) + 19
	pp.x = math.floor((pp.x + 64) / 128) * 128
	pp.y = math.floor((pp.y + 64) / 128) * 128

	local d = caster:GetForwardVector():Normalized() * 128
	local last_stone = nil

	Timers:CreateTimer(function()
		--移动1格
		pp = pp + d
		pp.x = math.floor((pp.x + 64) / 128) * 128
		pp.y = math.floor((pp.y + 64) / 128) * 128
		--建！
		local r, stone_block = build_1_stone({
			p = pp,
			caster = caster,
			can_remove_stone = false,
		})
		max_stone_count = max_stone_count - 1
		-- if max_stone_count <= 0 then
		-- 	return
		-- end
		if (not r) and stone_block ~= nil and stone_block:GetUnitName() == "gemtd_stone" then
			--随机造一个石头并保留！
			local hero_level = caster:GetLevel()
			local ran = RandomInt(1, 100)
			local stone_level = "1"
			local curr_per = 0
			if _G.gem_gailv[hero_level] ~= nil then
				for per, lv in pairs(_G.gem_gailv[hero_level]) do
					if ran > per and curr_per <= per then
						curr_per = per
						stone_level = lv
					end
				end
			end
			local ran = RandomInt(1, table.maxn(_G.gem_tower_basic))
			local create_stone_name = _G.gem_tower_basic[ran] .. stone_level

			local r, random_stone = build_1_stone({
				p = stone_block:GetAbsOrigin(),
				caster = caster,
				stone_name = create_stone_name,
			})
			if random_stone ~= nil then
				-- 添加玩家颜色底盘
				local particle =
					ParticleManager:CreateParticle("particles/gem/team_0.vpcf", PATTACH_ABSORIGIN_FOLLOW, random_stone)
				random_stone.ppp = particle

				random_stone:RemoveModifierByName("modifier_invulnerable")
				random_stone:SetHullRadius(1)

				table.insert(_G.gemtd_pool, random_stone)
				table.insert(_G.gemtd_pool_race[player_id], random_stone)
			end
			return
		elseif not r then
			return
		elseif max_stone_count <= 0 then
			return
		else
			return 0.2
		end
	end)
end
function build_1_stone(keys)
	local p = keys.p
	local caster = keys.caster
	local xxx = math.floor((p.x + 64) / 128) + 19
	local yyy = math.floor((p.y + 64) / 128) + 19
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local can_remove_stone = true
	if keys.can_remove_stone ~= nil and keys.can_remove_stone == false then
		can_remove_stone = false
	end

	--网格化坐标
	p.x = math.floor((p.x + 64) / 128) * 128
	p.y = math.floor((p.y + 64) / 128) * 128

	if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
		if xxx >= 29 and yyy <= 9 then
			EmitGlobalSound("ui.crafting_gem_drop")
			return
		end
		if xxx <= 9 and yyy >= 29 then
			EmitGlobalSound("ui.crafting_gem_drop")
			return
		end
	end

	--附近有怪，不能造
	local uu = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		p,
		nil,
		96,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_ANY_ORDER,
		false
	)
	if table.getn(uu) > 0 then
		EmitGlobalSound("ui.crafting_gem_drop")
		return
	end

	--附近有友军单位了，不能造
	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		p,
		nil,
		58,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS,
		FIND_ANY_ORDER,
		false
	)
	if table.getn(uuu) == 1 and uuu[1]:GetUnitName() == "gemtd_stone" and can_remove_stone then
		uuu[1]:Destroy()
	elseif table.getn(uuu) > 0 then
		EmitGlobalSound("ui.crafting_gem_drop")
		return false, uuu[1]
	end

	--路径点，不能造
	if GetMapName() ~= "gemtd_race" then
		for i = 1, 7 do
			local p1 = Entities:FindByName(nil, "path" .. i):GetAbsOrigin()
			local xxx1 = math.floor((p1.x + 64) / 128) + 19
			local yyy1 = math.floor((p1.y + 64) / 128) + 19
			if xxx == xxx1 and yyy == yyy1 then
				EmitGlobalSound("ui.crafting_gem_drop")
				return
			end
		end
	end
	if GetMapName() == "gemtd_race" then
		for j = 0, 3 do
			for i = 1, 7 do
				local p1 = Entities:FindByName(nil, "path" .. ((10 * j) + i)):GetAbsOrigin()
				local xxx1 = math.floor((p1.x + 64) / 128) + 19
				local yyy1 = math.floor((p1.y + 64) / 128) + 19
				if xxx == xxx1 and yyy == yyy1 then
					EmitGlobalSound("ui.crafting_gem_drop")
					return
				end
			end
		end
	end

	--地图范围外，不能造
	if xxx < 1 or xxx > 37 or yyy < 1 or yyy > 37 then
		EmitGlobalSound("ui.crafting_gem_drop")
		return
	end

	if _G.gem_map == nil then
		_G.gem_map = {}
		for i = 1, 37 do
			_G.gem_map[i] = {}
			for j = 1, 37 do
				_G.gem_map[i][j] = 0
			end
		end
	end

	--竞速模式，不能在别人的区域建造
	if GetMapName() == "gemtd_race" then
		if check_area(player_id, p) == false then
			EmitGlobalSound("ui.crafting_gem_drop")
			return false
		end
	end

	_G.gem_map[yyy][xxx] = 1

	if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
		--合作模式判断堵路
		find_all_path()
		--路完全堵死了，不能造
		for i = 1, 6 do
			if table.maxn(_G.gem_path[i]) < 1 then
				EmitGlobalSound("ui.crafting_gem_drop")
				--回退地图，重新寻路
				_G.gem_map[yyy][xxx] = 0

				find_all_path()
				return false
			end
		end
	else
		--竞速模式判断堵路
		find_all_path_race(player_id)
		--路完全堵死了，不能造
		for i = 1, 6 do
			if table.maxn(_G.gem_path_race[player_id][i]) < 1 then
				EmitGlobalSound("ui.crafting_gem_drop")
				--回退地图，重新寻路
				_G.gem_map[yyy][xxx] = 0
				find_all_path_race(player_id)
				return false
			end
		end
	end

	---------------------------------------------------------------------
	--至此验证ok了，可以正式开始建造石头了
	---------------------------------------------------------------------
	local u = CreateUnitByName((keys.stone_name or "gemtd_stone"), p, false, nil, nil, DOTA_TEAM_GOODGUYS)
	u.ftd = 2009
	u:SetOwner(caster)
	if u:GetUnitName() == "gemtd_stone" then
		ChangeStoneStyle(u)
	end
	u:SetControllableByPlayer(player_id, true)
	u:SetForwardVector(Vector(0, -1, 0))
	u:AddAbility("no_hp_bar")
	u:FindAbilityByName("no_hp_bar"):SetLevel(1)

	u:RemoveModifierByName("modifier_invulnerable")
	u:SetHullRadius(1)
	if keys.stone_name then
		EmitSoundOn("Hero_EarthShaker.Fissure", u)
		play_particle(
			"particles/econ/items/earthshaker/earthshaker_totem_ti6/earthshaker_totem_ti6_leap_impact.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			u,
			2
		)
	end

	FindEnemyPath()

	return true, u
end
function gemtd_hero_xuanfeng(keys)
	local caster = keys.caster
	local level = caster:FindAbilityByName("gemtd_hero_xuanfeng"):GetLevel()
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	local ability = keys.ability
	local p = keys.target_points[1] or ability:GetCursorPosition() or caster.target_position

	--花钱
	-- local cost_gold_result = CostGold({
	-- 	caster = keys.caster,
	-- 	gold_cost = keys.gold_cost
	-- })
	-- if cost_gold_result == false then
	-- 	return
	-- end

	SetQuest("q211", false)

	--同步玩家金钱
	-- sync_player_gold(caster)

	--新版旋风方案
	--网格化坐标
	local x = math.floor((p.x + 64) / 128) + 19
	local y = math.floor((p.y + 64) / 128) + 19
	p.x = math.floor((p.x + 64) / 128) * 128
	p.y = math.floor((p.y + 64) / 128) * 128

	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		p,
		nil,
		192,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_ANY_ORDER,
		false
	)

	if table.getn(uuu) > 0 then
		local xuanfeng_index = {}
		for i, v in pairs(uuu) do
			if
				v:GetUnitName() ~= "gemtd_castle"
				and v:GetUnitName() ~= "gemtd_pet"
				and v:IsHero() == false
				and (not string.find(v:GetUnitName(), "shiban"))
				and v:GetUnitName() ~= "gemtd_guangzhudaobiao"
			then
				if GetMapName() == "gemtd_race" and player_id ~= v:GetOwner():GetPlayerID() then
					--不允许换别人的
					return
				end

				--不允许换树
				if v:GetUnitName() == "gemtd_tree" then
				else
					local vp = v:GetAbsOrigin()
					local vx = math.floor((vp.x + 64) / 128) + 19
					local vy = math.floor((vp.y + 64) / 128) + 19
					xuanfeng_index[vx .. "_" .. vy] = v:entindex()
				end
			end
		end

		local xuanfeng_count = 1
		local xuanfeng_units = {}
		local xuanfeng_positions = {}

		--按逆时针顺序填入数组
		y = y + 1
		x = x - 1
		if xuanfeng_index[x .. "_" .. y] ~= nil then
			xuanfeng_units[xuanfeng_count] = xuanfeng_index[x .. "_" .. y]
			xuanfeng_positions[xuanfeng_count] = EntIndexToHScript(xuanfeng_units[xuanfeng_count]):GetAbsOrigin()
			xuanfeng_count = xuanfeng_count + 1
		end
		y = y - 1
		if xuanfeng_index[x .. "_" .. y] ~= nil then
			xuanfeng_units[xuanfeng_count] = xuanfeng_index[x .. "_" .. y]
			xuanfeng_positions[xuanfeng_count] = EntIndexToHScript(xuanfeng_units[xuanfeng_count]):GetAbsOrigin()
			xuanfeng_count = xuanfeng_count + 1
		end
		y = y - 1
		if xuanfeng_index[x .. "_" .. y] ~= nil then
			xuanfeng_units[xuanfeng_count] = xuanfeng_index[x .. "_" .. y]
			xuanfeng_positions[xuanfeng_count] = EntIndexToHScript(xuanfeng_units[xuanfeng_count]):GetAbsOrigin()
			xuanfeng_count = xuanfeng_count + 1
		end
		x = x + 1
		if xuanfeng_index[x .. "_" .. y] ~= nil then
			xuanfeng_units[xuanfeng_count] = xuanfeng_index[x .. "_" .. y]
			xuanfeng_positions[xuanfeng_count] = EntIndexToHScript(xuanfeng_units[xuanfeng_count]):GetAbsOrigin()
			xuanfeng_count = xuanfeng_count + 1
		end
		x = x + 1
		if xuanfeng_index[x .. "_" .. y] ~= nil then
			xuanfeng_units[xuanfeng_count] = xuanfeng_index[x .. "_" .. y]
			xuanfeng_positions[xuanfeng_count] = EntIndexToHScript(xuanfeng_units[xuanfeng_count]):GetAbsOrigin()
			xuanfeng_count = xuanfeng_count + 1
		end
		y = y + 1
		if xuanfeng_index[x .. "_" .. y] ~= nil then
			xuanfeng_units[xuanfeng_count] = xuanfeng_index[x .. "_" .. y]
			xuanfeng_positions[xuanfeng_count] = EntIndexToHScript(xuanfeng_units[xuanfeng_count]):GetAbsOrigin()
			xuanfeng_count = xuanfeng_count + 1
		end
		y = y + 1
		if xuanfeng_index[x .. "_" .. y] ~= nil then
			xuanfeng_units[xuanfeng_count] = xuanfeng_index[x .. "_" .. y]
			xuanfeng_positions[xuanfeng_count] = EntIndexToHScript(xuanfeng_units[xuanfeng_count]):GetAbsOrigin()
			xuanfeng_count = xuanfeng_count + 1
		end
		x = x - 1
		if xuanfeng_index[x .. "_" .. y] ~= nil then
			xuanfeng_units[xuanfeng_count] = xuanfeng_index[x .. "_" .. y]
			xuanfeng_positions[xuanfeng_count] = EntIndexToHScript(xuanfeng_units[xuanfeng_count]):GetAbsOrigin()
			xuanfeng_count = xuanfeng_count + 1
		end

		xuanfeng_count = xuanfeng_count - 1
		if xuanfeng_units[xuanfeng_count] ~= nil then
			local uu = EntIndexToHScript(xuanfeng_units[xuanfeng_count])
			Timers:CreateTimer(0.3, function()
				uu:SetAbsOrigin(Vector(5000, 5000, 0))

				if xuanfeng_count > 1 then
					local r = xuanfeng_count
					Timers:CreateTimer(0.01, function()
						local r2 = r - 1
						if r2 < 1 then
							r2 = xuanfeng_count
						end
						if xuanfeng_units[r] ~= nil and xuanfeng_units[r2] ~= nil then
							local u1 = EntIndexToHScript(xuanfeng_units[r2])
							local p2 = xuanfeng_positions[r]

							u1:SetAbsOrigin(p2)
							r = r - 1
							if r < 1 then
								uu:SetAbsOrigin(xuanfeng_positions[1])
								return
							end
							return 0.01
						end
						r = r - 1
						if r < 1 then
							uu:SetAbsOrigin(xuanfeng_positions[1])
							return
						end
						return 0.01
					end)
				else
					Timers:CreateTimer(0.01, function()
						uu:SetAbsOrigin(xuanfeng_positions[1])
					end)
				end
			end)
		end
	end
end
function SwapUnitPosition(u1, u2)
	local p1 = u1:GetAbsOrigin()
	local p2 = u2:GetAbsOrigin()
	u1:SetAbsOrigin(Vector(5000, 5000, 0))
	u2:SetAbsOrigin(p1)
	u1:SetAbsOrigin(p2)
end

--光柱道标
function guangzhudaobiao(keys)
	local caster = keys.caster
	local level = caster:FindAbilityByName("gemtd_hero_guangzhudaobiao"):GetLevel()
	local ability = keys.ability
	local p = keys.target_points[1] or ability:GetCursorPosition() or caster.target_position

	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()
	--同步玩家金钱
	sync_player_gold(caster)

	SetQuest("q211", false)

	--网格化坐标
	local xxx = math.floor((p.x + 64) / 128) + 19
	local yyy = math.floor((p.y + 64) / 128) + 19
	p.x = math.floor((p.x + 64) / 128) * 128
	p.y = math.floor((p.y + 64) / 128) * 128

	--path1和path7附近 不能造
	if GetMapName() ~= "gemtd_race" then
		--path1和path7附近 不能造
		if xxx >= 29 and yyy <= 9 then
			CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
				text = "text_mima_cannot_build_here",
			})
			return
		end

		if xxx <= 9 and yyy >= 29 then
			CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
				text = "text_mima_cannot_build_here",
			})
			return
		end
	end
	if GetMapName() == "gemtd_race" and check_area(player_id, p) == false then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_build_here",
		})
		return
	end

	--附近有怪，不能造
	local uu = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		p,
		nil,
		192,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_ANY_ORDER,
		false
	)
	if table.getn(uu) > 0 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_build_here",
		})
		return
	end

	--附近有友军单位了，不能造
	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		p,
		nil,
		58,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS,
		FIND_ANY_ORDER,
		false
	)
	if table.getn(uuu) > 0 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_build_here",
		})
		return
	end

	--路径点，不能造
	if GetMapName() ~= "gemtd_race" then
		for i = 1, 7 do
			local p1 = Entities:FindByName(nil, "path" .. i):GetAbsOrigin()
			local xxx1 = math.floor((p1.x + 64) / 128) + 19
			local yyy1 = math.floor((p1.y + 64) / 128) + 19
			if xxx == xxx1 and yyy == yyy1 then
				CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
					text = "text_mima_cannot_build_here",
				})
				return
			end
		end
	end
	if GetMapName() == "gemtd_race" then
		for j = 0, 3 do
			for i = 1, 7 do
				local p1 = Entities:FindByName(nil, "path" .. ((10 * j) + i)):GetAbsOrigin()
				local xxx1 = math.floor((p1.x + 64) / 128) + 19
				local yyy1 = math.floor((p1.y + 64) / 128) + 19
				if xxx == xxx1 and yyy == yyy1 then
					CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
						text = "text_mima_cannot_build_here",
					})
					return
				end
			end
		end
	end

	--地图范围外，不能造
	if xxx < 1 or xxx > 37 or yyy < 1 or yyy > 37 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_build_here",
		})
		return
	end
	if GetMapName() ~= "gemtd_race" then
		if _G.guangzhudaobiao ~= nil then
			_G.guangzhudaobiao:ForceKill(false)
			_G.guangzhudaobiao:Destroy()
			_G.guangzhudaobiao = nil
		end
	else
		if _G.guangzhudaobiao_race[player_id] ~= nil then
			if _G.guangzhudaobiao_race[player_id]:IsNull() ~= false then
				_G.guangzhudaobiao_race[player_id]:ForceKill(false)
				_G.guangzhudaobiao_race[player_id]:Destroy()
			end
			_G.guangzhudaobiao_race[player_id] = nil
		end
	end

	--创建道标
	u = CreateUnitByName("gemtd_guangzhudaobiao", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
	u.ftd = 2009
	--u = AMHC:CreateUnit( create_stone_name,p,270,caster,caster:GetTeamNumber())
	u:SetOwner(caster)
	--u:SetParent(caster,caster:GetUnitName())
	u:SetControllableByPlayer(player_id, true)
	u:SetForwardVector(Vector(0, -1, 0))
	if GetMapName() ~= "gemtd_race" then
		_G.guangzhudaobiao = u
		--尝试寻找路径
		FindEnemyPath()

		--路完全堵死了，不能造
		for i = 1, 7 do
			if table.maxn(_G.gem_path[i]) < 1 then
				CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
					text = "text_mima_cannot_block_maze",
				})

				--回退地图，重新寻路
				_G.guangzhudaobiao:ForceKill(false)
				_G.guangzhudaobiao:Destroy()
				_G.guangzhudaobiao = nil

				FindEnemyPath()
				return
			end
		end
	else
		_G.guangzhudaobiao_race[player_id] = u
		--尝试寻找路径
		find_all_path_race(player_id)
		--路完全堵死了，不能造
		for i = 1, 7 do
			if table.maxn(_G.gem_path_race[player_id][i]) < 1 then
				CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
					text = "text_mima_cannot_block_maze",
				})
				--回退地图，重新寻路
				_G.guangzhudaobiao_race[player_id]:ForceKill(false)
				_G.guangzhudaobiao_race[player_id]:Destroy()
				_G.guangzhudaobiao_race[player_id] = nil

				find_all_path_race(player_id)
				return
			end
		end
	end
end

--合成塔
function merge_tower(tower_name, caster)
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()

	if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
		--合作模式
		if _G.game_status ~= 2 then
			return
		end

		--辅助table，用来缩小can merge的范围
		local merge_helper = {}
		local total_level = 0

		--优先标记caster
		caster.merge_mark = 1
		merge_helper[caster:GetUnitName()] = 1

		--遍历第一遍，标记要合并的石头
		for i, i_unit in pairs(_G.gemtd_pool_can_merge[tower_name]) do
			if i_unit ~= nil and i_unit:IsNull() == false and i_unit ~= caster then
				local i_name = i_unit:GetUnitName()
				if merge_helper[i_name] == 1 then
					--如果这种配件有了，这一个不作为合成的配件，直接删除合成技能
					i_unit:RemoveAbility(tower_name)
				else
					--没有的话，标记一下，一会儿把它替换成普通石头
					i_unit.merge_mark = 1
					merge_helper[i_name] = 1

					if i_unit.level == nil then
						i_unit.level = 0
					end

					if i_unit.level ~= nil and i_unit.level > 0 then
						total_level = total_level + i_unit.level
					end
				end
			end
		end

		--遍历第二遍，执行合并
		for i, i_unit in pairs(_G.gemtd_pool_can_merge[tower_name]) do
			if i_unit ~= nil and i_unit:IsNull() == false and i_unit ~= caster and i_unit.merge_mark == 1 then
				local p = i_unit:GetAbsOrigin()

				--从宝石池删除
				local delete_index = nil
				for j, j_unit in pairs(_G.gemtd_pool) do
					if j_unit ~= nil and j_unit:IsNull() == false and j_unit:entindex() == i_unit:entindex() then
						table.remove(_G.gemtd_pool, j)
					end
				end

				--删除玩家颜色底盘
				if i_unit.ppp then
					ParticleManager:DestroyParticle(i_unit.ppp, true)
				end
				RemoveDamageStat(i_unit:entindex())
				i_unit:Destroy()
				p.z = 1400
				local u = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
				u.ftd = 2009

				u:SetOwner(owner)
				ChangeStoneStyle(u)
				u:SetControllableByPlayer(player_id, true)
				u:SetForwardVector(Vector(-1, 0, 0))

				u:AddAbility("no_hp_bar")
				u:FindAbilityByName("no_hp_bar"):SetLevel(1)
				u:RemoveModifierByName("modifier_invulnerable")
				u:SetHullRadius(1)
			end
		end

		--替换caster
		local p = caster:GetAbsOrigin()

		for j, j_unit in pairs(_G.gemtd_pool) do
			if j_unit ~= nil and j_unit:IsNull() == false and j_unit:entindex() == caster:entindex() then
				table.remove(_G.gemtd_pool, j)
			end
		end

		--删除玩家颜色底盘
		if caster.ppp then
			ParticleManager:DestroyParticle(caster.ppp, true)
		end

		if caster.level == nil then
			caster.level = 0
		end

		if caster.level ~= nil and caster.level > 0 then
			total_level = total_level + caster.level
		end
		RemoveDamageStat(caster:entindex())
		caster:Destroy()

		local u = CreateUnitByName(tower_name, p, false, nil, nil, DOTA_TEAM_GOODGUYS)
		u.ftd = 2009

		--发弹幕
		ShowCombat({
			t = "combine",
			player = player_id,
			text = tower_name,
		})
		-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = tower_name, hehe = RandomInt(1,100000)})

		if tower_name == "gemtd_huguoshenyishi" then
			local random_attack = GaussRandom()
			u:SetBaseDamageMin(random_attack)
			u:SetBaseDamageMax(random_attack)
			GameRules:SendCustomMessage("-random: " .. random_attack, 0, 0)
		end

		u:SetOwner(owner)
		u:SetControllableByPlayer(player_id, true)
		u:SetForwardVector(Vector(0, -1, 0))

		u.is_merged = true
		u.level = 0

		u:AddAbility("no_hp_bar")
		u:FindAbilityByName("no_hp_bar"):SetLevel(1)
		-- EmitGlobalSound("Loot_Drop_Stinger_Mythical")

		play_merge_particle(u)
		PlayCombineSound(u)

		--天然祖母绿，获取技能
		if tower_name == "gemtd_tianranzumulv" then
			local uuu = FindUnitsInRadius(
				DOTA_TEAM_GOODGUYS,
				u:GetAbsOrigin(),
				nil,
				220,
				DOTA_UNIT_TARGET_TEAM_FRIENDLY,
				DOTA_UNIT_TARGET_ALL,
				DOTA_UNIT_TARGET_FLAG_RANGED_ONLY,
				FIND_ANY_ORDER,
				false
			)
			if table.maxn(uuu) > 0 then
				local luckydog = uuu[RandomInt(1, table.maxn(uuu))]
				local times = 0
				while (luckydog == nil or luckydog:GetUnitName() == "gemtd_tianranzumulv") and times < 500 do
					luckydog = uuu[RandomInt(1, table.maxn(uuu))]
					times = times + 1
				end
				--偷攻击
				-- GameRules:SendCustomMessage('attack--> '..luckydog:GetUnitName(),0,0)
				-- GameRules:SendCustomMessage('attack1--> '..luckydog:GetBaseDamageMin(),0,0)
				-- GameRules:SendCustomMessage('attack2--> '..luckydog:GetBaseDamageMax(),0,0)

				-- u:SetBaseAttackRange(luckydog:GetBaseAttackRange())
				-- u:SetBaseAttackTime(luckydog:GetBaseAttackTime())
				-- u:SetProjectileSpeed(luckydog:GetProjectileSpeed())

				-- u:SetBaseDamageMin(luckydog:GetBaseDamageMin())
				-- u:SetBaseDamageMax(luckydog:GetBaseDamageMax())
				u:SetRangedProjectileName(luckydog:GetRangedProjectileName())

				--偷3个技能
				local steal_table = {}
				for uuuuu, vvvvv in pairs(uuu) do
					for uuuu, vvvv in pairs(_G.stealable_ability_pool) do
						if vvvvv:HasAbility(vvvv) then
							if vvvvv:GetUnitName() ~= "gemtd_tianranzumulv" then
								table.insert(steal_table, vvvv)
							end
						end
					end
				end

				if table.maxn(steal_table) < 1 then
					return
				end

				local random_count = 0
				local ability_count = 0
				while random_count < 100 and ability_count < 3 do
					local random_a = steal_table[RandomInt(1, table.maxn(steal_table))]
					if u:HasAbility(random_a) == false then
						u:AddAbility(random_a)
						u:FindAbilityByName(random_a):SetLevel(1)
						ability_count = ability_count + 1
						-- GameRules:SendCustomMessage('ability--> '..random_a,0,0)
					end
					random_count = random_count + 1
				end

				play_particle(
					"particles/econ/items/rubick/rubick_force_ambient/rubick_telekinesis_force.vpcf",
					PATTACH_OVERHEAD_FOLLOW,
					u,
					3
				)
				EmitGlobalSound("Hero_Rubick.SpellSteal.Cast")
			end
		end

		--合并等级！
		if total_level > 0 then
			level_up(u, total_level)
		end

		u:RemoveModifierByName("modifier_invulnerable")
		u:SetHullRadius(1)

		table.insert(_G.gemtd_pool, u)
		table.insert(_G.gemtd_pool_race[player_id], u)

		_G.gemtd_pool_can_merge[tower_name] = {}
		send_merge_board(player_id)

		--先清空合成技能
		for i, j in pairs(_G.gemtd_pool_can_merge_all) do
			for k, i_unit in pairs(_G.gemtd_pool_can_merge[j]) do
				if (not i_unit:IsNull()) and (i_unit:IsAlive()) then
					i_unit:RemoveAbility(j)
				end
			end
		end
		_G.gemtd_pool_can_merge_all = {}

		--检查能否合成高级塔
		for h, h_merge in pairs(_G.gemtd_merge) do
			local can_merge = true
			local merge_pool = {}

			for k, k_unitname in pairs(h_merge) do
				local have_merge = false
				for c, c_unit in pairs(_G.gemtd_pool) do
					if c_unit:GetUnitName() == k_unitname then
						--有这个合成配方
						have_merge = true
						table.insert(merge_pool, c_unit)
					end
				end
				if have_merge == false then
					can_merge = false
				end
			end

			if can_merge == true then
				--可以合成，给它们增加技能
				_G.gemtd_pool_can_merge[h] = {}

				for a, a_unit in pairs(merge_pool) do
					a_unit:RemoveAbility(h)
					a_unit:AddAbility(h)
					a_unit:FindAbilityByName(h):SetLevel(1)
					play_particle(
						"effect/merge/ui/plus/ui_hero_level_4_icon_ambient.vpcf",
						PATTACH_OVERHEAD_FOLLOW,
						a_unit,
						10
					)

					table.insert(_G.gemtd_pool_can_merge[h], a_unit)

					table.insert(_G.gemtd_pool_can_merge_all, h)
				end
			end
		end
	elseif GetMapName() == "gemtd_race" then
		--竞速模式
		--辅助table，用来缩小can merge的范围
		local merge_helper = {}
		local total_level = 0

		--优先标记caster
		caster.merge_mark = 1
		merge_helper[caster:GetUnitName()] = 1

		--遍历第一遍，标记要合并的石头
		for i, i_unit in pairs(_G.gemtd_pool_can_merge_race[player_id][tower_name]) do
			if IsValidEntity(i_unit) and i_unit ~= caster then
				local i_name = i_unit:GetUnitName()
				if merge_helper[i_name] == 1 then
					--如果这种配件有了，这一个不作为合成的配件，直接删除合成技能
					i_unit:RemoveAbility(tower_name)
				else
					--没有的话，标记一下，一会儿把它替换成普通石头
					i_unit.merge_mark = 1
					merge_helper[i_name] = 1

					if i_unit.level == nil then
						i_unit.level = 0
					end

					if i_unit.level ~= nil and i_unit.level > 0 then
						total_level = total_level + i_unit.level
					end
				end
			end
		end

		--遍历第二遍，执行合并
		for i, i_unit in pairs(_G.gemtd_pool_can_merge_race[player_id][tower_name]) do
			if IsValidEntity(i_unit) and i_unit ~= caster and i_unit.merge_mark == 1 then
				local p = i_unit:GetAbsOrigin()

				--从宝石池删除
				local delete_index = nil
				for j, j_unit in pairs(_G.gemtd_pool_race[player_id]) do
					if IsValidEntity(j_unit) and j_unit:entindex() == i_unit:entindex() then
						table.remove(_G.gemtd_pool_race[player_id], j)
					end
				end

				--删除玩家颜色底盘
				if i_unit.ppp then
					ParticleManager:DestroyParticle(i_unit.ppp, true)
				end

				i_unit:Destroy()
				p.z = 1400
				local u = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
				u.ftd = 2009

				u:SetOwner(owner)
				ChangeStoneStyle(u)
				u:SetControllableByPlayer(player_id, true)
				u:SetForwardVector(Vector(-1, 0, 0))

				u:AddAbility("no_hp_bar")
				u:FindAbilityByName("no_hp_bar"):SetLevel(1)
				u:RemoveModifierByName("modifier_invulnerable")
				u:SetHullRadius(1)
			end
		end

		--替换caster
		local p = caster:GetAbsOrigin()

		for j, j_unit in pairs(_G.gemtd_pool_race[player_id]) do
			if j_unit:entindex() == caster:entindex() then
				table.remove(_G.gemtd_pool_race[player_id], j)
			end
		end

		--删除玩家颜色底盘
		if caster.ppp then
			ParticleManager:DestroyParticle(caster.ppp, true)
		end

		if caster.level == nil then
			caster.level = 0
		end

		if caster.level ~= nil and caster.level > 0 then
			total_level = total_level + caster.level
		end
		caster:Destroy()

		local u = CreateUnitByName(tower_name, p, false, nil, nil, DOTA_TEAM_GOODGUYS)
		u.ftd = 2009

		--发弹幕
		ShowCombat({
			t = "combine",
			player = player_id,
			text = tower_name,
		})
		-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = tower_name, hehe = RandomInt(1,100000)})

		if tower_name == "gemtd_huguoshenyishi" then
			local random_attack = GaussRandom()
			u:SetBaseDamageMin(random_attack)
			u:SetBaseDamageMax(random_attack)
			GameRules:SendCustomMessage("-random: " .. random_attack, 0, 0)
		end

		u:SetOwner(owner)
		u:SetControllableByPlayer(player_id, true)
		u:SetForwardVector(Vector(0, -1, 0))

		u.is_merged = true
		u.level = 0

		u:AddAbility("no_hp_bar")
		u:FindAbilityByName("no_hp_bar"):SetLevel(1)
		-- EmitGlobalSound("Loot_Drop_Stinger_Mythical")

		play_merge_particle(u)
		PlayCombineSound(u)

		--天然祖母绿，获取技能
		if tower_name == "gemtd_tianranzumulv" then
			local uuu = FindUnitsInRadius(
				DOTA_TEAM_GOODGUYS,
				u:GetAbsOrigin(),
				nil,
				220,
				DOTA_UNIT_TARGET_TEAM_FRIENDLY,
				DOTA_UNIT_TARGET_ALL,
				DOTA_UNIT_TARGET_FLAG_RANGED_ONLY,
				FIND_ANY_ORDER,
				false
			)
			if table.maxn(uuu) > 0 then
				local luckydog = uuu[RandomInt(1, table.maxn(uuu))]
				local times = 0
				while (luckydog == nil or luckydog:GetUnitName() == "gemtd_tianranzumulv") and times < 500 do
					luckydog = uuu[RandomInt(1, table.maxn(uuu))]
					times = times + 1
				end
				--偷攻击
				-- GameRules:SendCustomMessage('attack--> '..luckydog:GetUnitName(),0,0)
				-- GameRules:SendCustomMessage('attack1--> '..luckydog:GetBaseDamageMin(),0,0)
				-- GameRules:SendCustomMessage('attack2--> '..luckydog:GetBaseDamageMax(),0,0)

				-- u:SetBaseAttackRange(luckydog:GetBaseAttackRange())
				-- u:SetBaseAttackTime(luckydog:GetBaseAttackTime())
				-- u:SetProjectileSpeed(luckydog:GetProjectileSpeed())

				-- u:SetBaseDamageMin(luckydog:GetBaseDamageMin())
				-- u:SetBaseDamageMax(luckydog:GetBaseDamageMax())
				u:SetRangedProjectileName(luckydog:GetRangedProjectileName())

				--偷3个技能
				local steal_table = {}
				for uuuuu, vvvvv in pairs(uuu) do
					for uuuu, vvvv in pairs(_G.stealable_ability_pool) do
						if vvvvv:HasAbility(vvvv) then
							if vvvvv:GetUnitName() ~= "gemtd_tianranzumulv" then
								table.insert(steal_table, vvvv)
							end
						end
					end
				end

				if table.maxn(steal_table) < 1 then
					return
				end

				local random_count = 0
				local ability_count = 0
				while random_count < 100 and ability_count < 3 do
					local random_a = steal_table[RandomInt(1, table.maxn(steal_table))]
					if u:HasAbility(random_a) == false then
						u:AddAbility(random_a)
						u:FindAbilityByName(random_a):SetLevel(1)
						ability_count = ability_count + 1
						-- GameRules:SendCustomMessage('ability--> '..random_a,0,0)
					end
					random_count = random_count + 1
				end

				play_particle(
					"particles/econ/items/rubick/rubick_force_ambient/rubick_telekinesis_force.vpcf",
					PATTACH_OVERHEAD_FOLLOW,
					u,
					3
				)
				EmitGlobalSound("Hero_Rubick.SpellSteal.Cast")
			end
		end

		--合并等级！
		if total_level > 0 then
			level_up(u, total_level)
		end

		u:RemoveModifierByName("modifier_invulnerable")
		u:SetHullRadius(1)

		table.insert(_G.gemtd_pool, u)
		table.insert(_G.gemtd_pool_race[player_id], u)

		_G.gemtd_pool_can_merge_race[player_id][tower_name] = {}
		send_merge_board(player_id)

		--先清空合成技能
		for i, j in pairs(_G.gemtd_pool_can_merge_all_race[player_id]) do
			for k, i_unit in pairs(_G.gemtd_pool_can_merge_race[player_id][j]) do
				if (not i_unit:IsNull()) and (i_unit:IsAlive()) then
					i_unit:RemoveAbility(j)
				end
			end
		end
		_G.gemtd_pool_can_merge_all_race[player_id] = {}

		--检查能否合成高级塔
		for h, h_merge in pairs(_G.gemtd_merge) do
			----GameRules:SendCustomMessage(h, 0, 0)
			local can_merge = true
			local merge_pool = {}

			for k, k_unitname in pairs(h_merge) do
				local have_merge = false
				for c, c_unit in pairs(_G.gemtd_pool_race[player_id]) do
					if c_unit:GetUnitName() == k_unitname then
						--有这个合成配方
						have_merge = true
						table.insert(merge_pool, c_unit)
						--GameRules:SendCustomMessage("有"..k_unitname, 0, 0)
					end
				end
				if have_merge == false then
					can_merge = false
				end
			end

			if can_merge == true then
				--可以合成，给它们增加技能
				_G.gemtd_pool_can_merge_race[player_id][h] = {}

				for a, a_unit in pairs(merge_pool) do
					a_unit:RemoveAbility(h)
					a_unit:AddAbility(h)
					a_unit:FindAbilityByName(h):SetLevel(1)
					play_particle(
						"effect/merge/ui/plus/ui_hero_level_4_icon_ambient.vpcf",
						PATTACH_OVERHEAD_FOLLOW,
						a_unit,
						10
					)
					--GameRules:SendCustomMessage("可以合成"..h, 0, 0)

					table.insert(_G.gemtd_pool_can_merge_race[player_id][h], a_unit)

					table.insert(_G.gemtd_pool_can_merge_all_race[player_id], h)
				end
			end
		end
	end
end
function merge_tower1(tower_name, caster)
	local owner = caster:GetOwner()
	local player_id = owner:GetPlayerID()

	--GameRules:SendCustomMessage("选择了石头", 0, 0)
	caster:RemoveAbility(tower_name .. "1")

	for i = 0, 4 do
		if
			_G.build_curr ~= nil
			and _G.build_curr[player_id] ~= nil
			and _G.build_curr[player_id][i] ~= nil
			and _G.build_curr[player_id][i]:IsNull() ~= true
			and _G.build_curr[player_id][i] ~= caster
		then
			--移除其他的石头
			local p = _G.build_curr[player_id][i]:GetAbsOrigin()
			--删除玩家颜色底盘
			if _G.build_curr[player_id][i].ppp then
				ParticleManager:DestroyParticle(_G.build_curr[player_id][i].ppp, true)
			end
			_G.build_curr[player_id][i]:Destroy()
			--用普通石头代替
			p.z = 1400
			local u = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
			u.ftd = 2009

			u:SetOwner(owner)
			ChangeStoneStyle(u)
			u:SetControllableByPlayer(player_id, true)
			u:SetForwardVector(Vector(-1, 0, 0))

			u:AddAbility("no_hp_bar")
			u:FindAbilityByName("no_hp_bar"):SetLevel(1)
			u:RemoveModifierByName("modifier_invulnerable")
			u:SetHullRadius(1)
		end
	end

	--移除caster，用高两级的代替
	local unit_name = tower_name
	local p = caster:GetAbsOrigin()
	local caster_died = caster
	--删除玩家颜色底盘
	if caster.ppp then
		ParticleManager:DestroyParticle(caster.ppp, true)
	end
	caster:Destroy()

	local u = CreateUnitByName(unit_name, p, false, nil, nil, DOTA_TEAM_GOODGUYS)
	u.ftd = 2009

	-- PlayCombineSound(u)

	--发弹幕
	ShowCombat({
		t = "combine_onewave",
		player = player_id,
		text = unit_name,
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = unit_name, hehe = RandomInt(1,100000)})

	if unit_name == "gemtd_huguoshenyishi" then
		local random_attack = GaussRandom()
		u:SetBaseDamageMin(random_attack)
		u:SetBaseDamageMax(random_attack)
		GameRules:SendCustomMessage("-random: " .. random_attack, 0, 0)
	end

	u:SetOwner(owner)
	u:SetControllableByPlayer(player_id, true)
	u:SetForwardVector(Vector(0, -1, 0))

	u.is_merged = true
	u.kill_count = 0

	u:AddAbility("no_hp_bar")
	u:FindAbilityByName("no_hp_bar"):SetLevel(1)
	play_merge_particle(u)
	PlayCombineSound(u)
	-- EmitGlobalSound("Loot_Drop_Stinger_Mythical")

	--添加玩家颜色底盘
	local particle = ParticleManager:CreateParticle("particles/gem/team_0.vpcf", PATTACH_ABSORIGIN_FOLLOW, u)
	u.ppp = particle

	u:RemoveModifierByName("modifier_invulnerable")
	u:SetHullRadius(1)

	table.insert(_G.gemtd_pool, u)
	table.insert(_G.gemtd_pool_race[player_id], u)
	--AMHC:CreateNumberEffect(u,1,2,AMHC.MSG_DAMAGE,"yellow",0)

	_G.build_curr[player_id] = {}
	_G.is_build_ready[player_id] = true
	SetAbilityActiveStatus(owner, false)
	send_merge_board(player_id)

	finish_build(player_id)
end
function gemtd_baiyin(keys)
	local caster = keys.caster
	merge_tower("gemtd_baiyin", caster)

	_G.quest_status["q101"] = false
	show_quest()
end
function gemtd_baiyinqishi(keys)
	local caster = keys.caster
	merge_tower("gemtd_baiyinqishi", caster)
end
function gemtd_kongqueshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_kongqueshi", caster)

	_G.quest_status["q102"] = false
	show_quest()
end
function gemtd_xianyandekongqueshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_xianyandekongqueshi", caster)
end
function gemtd_xingcaihongbaoshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_xingcaihongbaoshi", caster)

	_G.quest_status["q103"] = false
	show_quest()
end
function gemtd_xuehonghuoshan(keys)
	local caster = keys.caster
	merge_tower("gemtd_xuehonghuoshan", caster)
end
function gemtd_yu(keys)
	local caster = keys.caster
	merge_tower("gemtd_yu", caster)

	_G.quest_status["q201"] = false
	show_quest()
end
function gemtd_jixiangdezhongguoyu(keys)
	local caster = keys.caster
	merge_tower("gemtd_jixiangdezhongguoyu", caster)
end
function gemtd_furongshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_furongshi", caster)
end
function gemtd_mirendeqingjinshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_mirendeqingjinshi", caster)
end
function gemtd_heianfeicui(keys)
	local caster = keys.caster
	merge_tower("gemtd_heianfeicui", caster)
end
function gemtd_feicuimoxiang(keys)
	local caster = keys.caster
	merge_tower("gemtd_feicuimoxiang", caster)
end
function gemtd_huangcailanbaoshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_huangcailanbaoshi", caster)
end
function gemtd_palayibabixi(keys)
	local caster = keys.caster
	merge_tower("gemtd_palayibabixi", caster)
end
function gemtd_heisemaoyanshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_heisemaoyanshi", caster)
end
function gemtd_hongshanhu(keys)
	local caster = keys.caster
	merge_tower("gemtd_hongshanhu", caster)
end
function gemtd_huaguoshanxiandan(keys)
	local caster = keys.caster
	merge_tower("gemtd_huaguoshanxiandan", caster)
end
function gemtd_jin(keys)
	local caster = keys.caster
	merge_tower("gemtd_jin", caster)
end
function gemtd_aijijin(keys)
	local caster = keys.caster
	merge_tower("gemtd_aijijin", caster)
end
function gemtd_shenhaizhenzhu(keys)
	local caster = keys.caster
	merge_tower("gemtd_shenhaizhenzhu", caster)

	_G.quest_status["q301"] = false
	show_quest()
end
function gemtd_haiyangqingyu(keys)
	local caster = keys.caster
	merge_tower("gemtd_haiyangqingyu", caster)
end
function gemtd_fenhongzuanshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_fenhongzuanshi", caster)
end
function gemtd_jixueshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_jixueshi", caster)
end
function gemtd_gudaidejixueshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_gudaidejixueshi", caster)
end
function gemtd_you238(keys)
	local caster = keys.caster
	merge_tower("gemtd_you238", caster)
end
function gemtd_you235(keys)
	local caster = keys.caster
	merge_tower("gemtd_you235", caster)
end
function gemtd_juxingfenhongzuanshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_juxingfenhongzuanshi", caster)
end
function gemtd_jingxindiaozhuodepalayibabixi(keys)
	local caster = keys.caster
	merge_tower("gemtd_jingxindiaozhuodepalayibabixi", caster)
end
function gemtd_tianranzumulv(keys)
	local caster = keys.caster
	merge_tower("gemtd_tianranzumulv", caster)
end
function gemtd_keyinuoerguangmingzhishan(keys)
	local caster = keys.caster
	merge_tower("gemtd_keyinuoerguangmingzhishan", caster)
	SetQuest("q210", true)
end
function gemtd_shuaibiankaipayou(keys)
	local caster = keys.caster
	merge_tower("gemtd_shuaibiankaipayou", caster)
	SetQuest("q210", true)
end
function gemtd_heiwangzihuangguanhongbaoshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_heiwangzihuangguanhongbaoshi", caster)
	SetQuest("q210", true)
end
function gemtd_xingguanglanbaoshi(keys)
	local caster = keys.caster
	merge_tower("gemtd_xingguanglanbaoshi", caster)
	SetQuest("q210", true)
end
function gemtd_haibao(keys)
	local caster = keys.caster
	merge_tower("gemtd_haibao", caster)
end

function gemtd_yijiazhishi(keys)
	local caster = keys.caster
	merge_tower("gemtd_yijiazhishi", caster)
	SetQuest("q210", true)
end
function gemtd_huguoshenyishi(keys)
	local caster = keys.caster
	merge_tower("gemtd_huguoshenyishi", caster)
	SetQuest("q210", true)
end
function gemtd_jingangshikulinan(keys)
	local caster = keys.caster
	merge_tower("gemtd_jingangshikulinan", caster)
	SetQuest("q210", true)
end
function gemtd_sililankazhixing(keys)
	local caster = keys.caster
	merge_tower("gemtd_sililankazhixing", caster)
	SetQuest("q210", true)
end

function gemtd_baiyin1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_baiyin", caster)

	_G.quest_status["q101"] = false
	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_baiyinqishi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_baiyinqishi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_kongqueshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_kongqueshi", caster)

	_G.quest_status["q102"] = false
	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_xianyandekongqueshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_xianyandekongqueshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_xingcaihongbaoshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_xingcaihongbaoshi", caster)

	_G.quest_status["q103"] = false
	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_xuehonghuoshan1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_xuehonghuoshan", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_yu1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_yu", caster)

	_G.quest_status["q106"] = false
	_G.quest_status["q201"] = false
	show_quest()
end
function gemtd_jixiangdezhongguoyu1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_jixiangdezhongguoyu", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_furongshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_furongshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_mirendeqingjinshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_mirendeqingjinshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_heianfeicui1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_heianfeicui", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_feicuimoxiang1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_feicuimoxiang", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_huangcailanbaoshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_huangcailanbaoshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_palayibabixi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_palayibabixi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_heisemaoyanshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_heisemaoyanshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_hongshanhu1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_hongshanhu", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_jin1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_jin", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_aijijin1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_aijijin", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_shenhaizhenzhu1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_shenhaizhenzhu", caster)

	_G.quest_status["q106"] = false
	_G.quest_status["q301"] = false
	show_quest()
end
function gemtd_haiyangqingyu1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_haiyangqingyu", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_fenhongzuanshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_fenhongzuanshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_jixueshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_jixueshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_gudaidejixueshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_gudaidejixueshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_you2381(keys)
	local caster = keys.caster
	merge_tower1("gemtd_you238", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_you2351(keys)
	local caster = keys.caster
	merge_tower1("gemtd_you235", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_juxingfenhongzuanshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_juxingfenhongzuanshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_jingxindiaozhuodepalayibabixi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_jingxindiaozhuodepalayibabixi", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_huaguoshanxiandan1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_huaguoshanxiandan", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_tianranzumulv1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_tianranzumulv", caster)

	_G.quest_status["q106"] = false
	show_quest()
end
function gemtd_keyinuoerguangmingzhishan1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_keyinuoerguangmingzhishan", caster)

	_G.quest_status["q106"] = false
	show_quest()
	SetQuest("q210", true)
end
function gemtd_shuaibiankaipayou1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_shuaibiankaipayou", caster)

	_G.quest_status["q106"] = false
	show_quest()
	SetQuest("q210", true)
end
function gemtd_heiwangzihuangguanhongbaoshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_heiwangzihuangguanhongbaoshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
	SetQuest("q210", true)
end
function gemtd_xingguanglanbaoshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_xingguanglanbaoshi", caster)

	_G.quest_status["q106"] = false
	show_quest()
	SetQuest("q210", true)
end
function gemtd_haibao1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_haibao", caster)
end
--隐藏的
function gemtd_yijiazhishi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_yijiazhishi", caster)

	_G.quest_status["q106"] = false
	_G.quest_status["q108"] = true
	show_quest()
	SetQuest("q210", true)
end
function gemtd_huguoshenyishi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_huguoshenyishi", caster)

	_G.quest_status["q106"] = false
	_G.quest_status["q108"] = true
	show_quest()
	SetQuest("q210", true)
end
function gemtd_jingangshikulinan1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_jingangshikulinan", caster)

	_G.quest_status["q106"] = false
	_G.quest_status["q108"] = true
	show_quest()
	SetQuest("q210", true)
end
function gemtd_sililankazhixing1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_sililankazhixing", caster)

	_G.quest_status["q106"] = false
	_G.quest_status["q108"] = true
	show_quest()
	SetQuest("q210", true)
end
function gemtd_geluanshi1(keys)
	local caster = keys.caster
	-- if RandomInt(1,5) <= 1 then
	merge_tower1("gemtd_geluanshi", caster)
	-- else
	-- 	merge_tower1( "gemtd_stone", caster )
	-- 	GameRules:SendCustomMessage("鸽了。", 0, 0)
	-- end

	_G.quest_status["q106"] = false
	_G.quest_status["q108"] = true
	show_quest()
end
function gemtd_heiyaoshi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_heiyaoshi", caster)

	_G.quest_status["q106"] = false
	_G.quest_status["q108"] = true
	show_quest()
end
function gemtd_manao1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_manao", caster)

	_G.quest_status["q106"] = false
	_G.quest_status["q108"] = true
	show_quest()
end
function gemtd_ranshaozhishi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_ranshaozhishi", caster)

	_G.quest_status["q106"] = false
	_G.quest_status["q108"] = true
	show_quest()
end
function gemtd_xiameishi1(keys)
	local caster = keys.caster
	merge_tower1("gemtd_xiameishi", caster)

	_G.quest_status["q106"] = false
	_G.quest_status["q108"] = true
	show_quest()
end
--石板
function gemtd_youbushiban_sb(keys)
	local caster = keys.caster
	merge_shiban("gemtd_youbushiban", _G.shiban_ability_list["gemtd_youbushiban"], 10, caster)
end
function gemtd_zhangqishiban_sb(keys)
	local caster = keys.caster
	merge_shiban("gemtd_zhangqishiban", _G.shiban_ability_list["gemtd_zhangqishiban"], 10, caster)
end
function gemtd_hongliushiban_sb(keys)
	local caster = keys.caster
	merge_shiban("gemtd_hongliushiban", _G.shiban_ability_list["gemtd_hongliushiban"], 10, caster)
end
function gemtd_haojiaoshiban_sb(keys)
	local caster = keys.caster
	merge_shiban("gemtd_haojiaoshiban", _G.shiban_ability_list["gemtd_haojiaoshiban"], 10, caster)
end
function gemtd_suanwushiban_sb(keys)
	local caster = keys.caster
	merge_shiban("gemtd_suanwushiban", _G.shiban_ability_list["gemtd_suanwushiban"], 10, caster)
end
function gemtd_mabishiban_sb(keys)
	local caster = keys.caster
	merge_shiban("gemtd_mabishiban", _G.shiban_ability_list["gemtd_mabishiban"], 10, caster)
end
function gemtd_kongheshiban_sb(keys)
	local caster = keys.caster
	merge_shiban("gemtd_kongheshiban", _G.shiban_ability_list["gemtd_kongheshiban"], 10, caster)
end
function gemtd_xuwushiban_sb(keys)
	local caster = keys.caster
	merge_shiban("gemtd_xuwushiban", _G.shiban_ability_list["gemtd_xuwushiban"], 10, caster)
end
function Youbu1(keys)
	local target = keys.target
	local caster = keys.caster
	local target_count = 1
	if target == nil or target:IsNull() == true or target:IsAlive() == false then
		return
	end
	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		target:GetAbsOrigin(),
		nil,
		192,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	if table.maxn(uuu) > 0 then
		local unluckydog_count = table.maxn(uuu)
		if unluckydog_count > target_count then
			unluckydog_count = target_count
		end
		for i = 1, unluckydog_count do
			local unluckydog = uuu[i]
			--对unluckydog施暴
			Timers:CreateTimer(RandomInt(1, 50) / 100, function()
				InvisibleUnitCast({
					caster = caster,
					ability = "new_youbu_sub",
					level = caster:FindAbilityByName("new_youbu1"):GetLevel(),
					unluckydog = unluckydog,
					position = unluckydog:GetAbsOrigin(),
				})
			end)
		end
	end
end
function Youbu2(keys)
	local target = keys.target
	local caster = keys.caster
	local target_count = 8
	if target == nil or target:IsNull() == true or target:IsAlive() == false then
		return
	end
	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		target:GetAbsOrigin(),
		nil,
		1024,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	if table.maxn(uuu) > 0 then
		local unluckydog_count = table.maxn(uuu)
		if unluckydog_count > target_count then
			unluckydog_count = target_count
		end
		for i = 1, unluckydog_count do
			local unluckydog = uuu[i]
			--对unluckydog施暴
			Timers:CreateTimer(RandomInt(1, 50) / 100, function()
				InvisibleUnitCast({
					caster = caster,
					ability = "new_youbu_sub",
					level = caster:FindAbilityByName("new_youbu2"):GetLevel(),
					unluckydog = unluckydog,
					position = unluckydog:GetAbsOrigin(),
				})
			end)
		end
	end
end
function Youbu3(keys)
	local target = keys.target
	local caster = keys.caster
	local target_count = 64
	if target == nil or target:IsNull() == true or target:IsAlive() == false then
		return
	end
	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		target:GetAbsOrigin(),
		nil,
		9999,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	if table.maxn(uuu) > 0 then
		local unluckydog_count = table.maxn(uuu)
		if unluckydog_count > target_count then
			unluckydog_count = target_count
		end
		for i = 1, unluckydog_count do
			local unluckydog = uuu[i]
			--对unluckydog施暴
			Timers:CreateTimer(RandomInt(1, 50) / 100, function()
				InvisibleUnitCast({
					caster = caster,
					ability = "new_youbu_sub",
					level = caster:FindAbilityByName("new_youbu3"):GetLevel(),
					unluckydog = unluckydog,
					position = unluckydog:GetAbsOrigin(),
				})
			end)
		end
	end
end
function Cask2(keys)
	local target = keys.target
	local caster = keys.caster
	local target_count = 3
	if target == nil or target:IsNull() == true or target:IsAlive() == false then
		return
	end
	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		target:GetAbsOrigin(),
		nil,
		512,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	if table.maxn(uuu) > 0 then
		local unluckydog_count = table.maxn(uuu)
		if unluckydog_count > target_count then
			unluckydog_count = target_count
		end
		for i = 1, unluckydog_count do
			local unluckydog = uuu[i]
			--对unluckydog施暴
			Timers:CreateTimer(RandomInt(1, 50) / 100, function()
				InvisibleUnitCast({
					caster = caster,
					ability = "new_cask_sub2",
					level = caster:FindAbilityByName("new_cask2"):GetLevel(),
					unluckydog = unluckydog,
					position = unluckydog:GetAbsOrigin(),
				})
			end)
		end
	end
end
function Cask3(keys)
	local target = keys.target
	local caster = keys.caster
	local target_count = 9
	if target == nil or target:IsNull() == true or target:IsAlive() == false then
		return
	end
	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		target:GetAbsOrigin(),
		nil,
		1024,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	if table.maxn(uuu) > 0 then
		local unluckydog_count = table.maxn(uuu)
		if unluckydog_count > target_count then
			unluckydog_count = target_count
		end
		for i = 1, unluckydog_count do
			local unluckydog = uuu[i]
			--对unluckydog施暴
			Timers:CreateTimer(RandomInt(1, 50) / 100, function()
				InvisibleUnitCast({
					caster = caster,
					ability = "new_cask_sub3",
					level = caster:FindAbilityByName("new_cask3"):GetLevel(),
					unluckydog = unluckydog,
					position = unluckydog:GetAbsOrigin(),
				})
			end)
		end
	end
end
--开启石板的计时器
function start_shiban_timer(shiban, shiban_ability, shiban_cd)
	Timers:CreateTimer(0.1, function()
		if shiban == nil or shiban:IsNull() == true or shiban:IsAlive() == false then
			return
		end

		local uuu = FindUnitsInRadius(
			DOTA_TEAM_GOODGUYS,
			shiban:GetAbsOrigin(),
			nil,
			128,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_BASIC,
			DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
			FIND_ANY_ORDER,
			false
		)
		if table.maxn(uuu) > 0 then
			local unluckydog = uuu[1]
			--对unluckydog施暴

			local a_level = 5 - PlayerResource:GetPlayerCount()
			if GetMapName() == "gemtd_race" then
				a_level = 4
			end

			shiban.target_position = unluckydog:GetAbsOrigin()

			InvisibleUnitCast({
				caster = shiban,
				ability = shiban_ability,
				level = a_level,
				unluckydog = unluckydog,
				position = shiban.target_position,
			})

			RemindSelect({
				caster = shiban,
			})

			local shiban_level = 1
			if string.find(shiban:GetUnitName(), "_yin") then
				shiban_level = 2
			end
			if string.find(shiban:GetUnitName(), "_jin") then
				shiban_level = 3
			end

			TriggerShiban(unluckydog, shiban_level)
			return shiban_cd
		else
			return 0.1
		end
	end)
end
--石板自动合成
function merge_shiban_update(xxx, yyy)
	local x1 = xxx - 1
	local x2 = xxx + 1
	local y1 = yyy - 1
	local y2 = yyy + 1
	if x1 < 1 then
		x1 = 1
	end
	if y1 < 1 then
		y1 = 1
	end
	if x2 > 37 then
		x2 = 37
	end
	if y2 > 37 then
		y2 = 37
	end

	for i = x1, x2 do
		for j = y1, y2 do
			local curr_shiban = _G.shiban_index[i .. "_" .. j]
			if curr_shiban ~= nil then
				shiban_update_one(curr_shiban, i, j)
			end
		end
	end
end
function shiban_update_one(shiban, i, j)
	local loop_table = {
		[1] = { x = 1, y = 1 },
		[2] = { x = 1, y = 0 },
		[3] = { x = 0, y = 1 },
		[4] = { x = -1, y = 1 },
	}
	local shiban_name = shiban:GetUnitName()
	local p = shiban:GetAbsOrigin()
	local owner = shiban:GetOwner()
	local player_id = shiban:GetOwner():GetPlayerID()

	for u, v in pairs(loop_table) do
		local u1 = _G.shiban_index[(i + v.x) .. "_" .. (j + v.y)]
		local u2 = _G.shiban_index[(i - v.x) .. "_" .. (j - v.y)]
		if u1 ~= nil and u2 ~= nil and u1:GetUnitName() == shiban_name and u2:GetUnitName() == shiban_name then
			--合成
			local shengji_shiban = _G.gemtd_merge_shiban_update[shiban_name]
			if shengji_shiban ~= nil then
				SetQuest("q110", true)
				--移除三个石板
				_G.shiban_index[(i + v.x) .. "_" .. (j + v.y)] = nil
				_G.shiban_index[(i - v.x) .. "_" .. (j - v.y)] = nil
				if GetMapName() ~= "gemtd_race" then
					for jj, j_unit in pairs(_G.gemtd_pool) do
						if j_unit:entindex() == shiban:entindex() then
							table.remove(_G.gemtd_pool, jj)
						end
					end
					for jj, j_unit in pairs(_G.gemtd_pool) do
						if j_unit:entindex() == u1:entindex() then
							table.remove(_G.gemtd_pool, jj)
						end
					end
					for jj, j_unit in pairs(_G.gemtd_pool) do
						if j_unit:entindex() == u2:entindex() then
							table.remove(_G.gemtd_pool, jj)
						end
					end
				else
					for jj, j_unit in pairs(_G.gemtd_pool_race[player_id]) do
						if j_unit:entindex() == shiban:entindex() then
							table.remove(_G.gemtd_pool_race[player_id], jj)
						end
					end
					for jj, j_unit in pairs(_G.gemtd_pool_race[player_id]) do
						if j_unit:entindex() == u1:entindex() then
							table.remove(_G.gemtd_pool_race[player_id], jj)
						end
					end
					for jj, j_unit in pairs(_G.gemtd_pool_race[player_id]) do
						if j_unit:entindex() == u2:entindex() then
							table.remove(_G.gemtd_pool_race[player_id], jj)
						end
					end
				end

				shiban:Destroy()
				u1:Destroy()
				u2:Destroy()

				--造高级石板
				local u = CreateUnitByName(shengji_shiban, p, false, nil, nil, DOTA_TEAM_GOODGUYS)
				u.ftd = 2009
				_G.shiban_index[i .. "_" .. j] = u

				--发弹幕
				ShowCombat({
					t = "combine",
					player = player_id,
					text = shengji_shiban,
				})
				-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = shengji_shiban, hehe = RandomInt(1,100000)})

				u:SetOwner(owner)
				u:SetControllableByPlayer(player_id, true)

				u:AddAbility("no_hp_bar")
				u:FindAbilityByName("no_hp_bar"):SetLevel(1)
				u:RemoveModifierByName("modifier_invulnerable")
				u:SetHullRadius(1)

				table.insert(_G.gemtd_pool, u)
				table.insert(_G.gemtd_pool_race[player_id], u)

				u:SetForwardVector(Vector(1, 0, 0))

				u.is_merged = true
				u.kill_count = 0

				play_merge_particle(u)
				EmitGlobalSound("Loot_Drop_Stinger_Rare")

				--检测能否合成高级石板
				Timers:CreateTimer(1, function()
					merge_shiban_update(i, j)
				end)

				--开高级石板的计时器
				start_shiban_timer(u, _G.shiban_ability_list[shengji_shiban], 10)
			end
		end
	end
end
function TriggerShiban(dog, level)
	if level == nil then
		level = 1
	end
	local uuu = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		dog:GetAbsOrigin(),
		nil,
		500,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	local count = 1
	local p = ({ 15, 30, 60 })[level or 1]

	if table.maxn(uuu) > 0 then
		for u, v in pairs(uuu) do
			if v:FindAbilityByName("tower_chain_frost") ~= nil then
				if RandomInt(1, 100 * count) <= p then
					ChainFrost(v, dog)
					return
				else
					count = count + 1
				end
			end
		end
	end
end
--塔的技能
function ChainFrost(u, t)
	local uu = CreateUnitByName("gemtd_feicuimoxiang_yinxing", u:GetAbsOrigin(), false, nil, nil, DOTA_TEAM_GOODGUYS)
	uu.father = u
	uu:SetOwner(u)
	uu.ftd = 2009
	uu:AddAbility("chain_frost")
	uu:FindAbilityByName("chain_frost"):SetLevel(1)
	Timers:CreateTimer(0.05, function()
		local newOrder = {
			UnitIndex = uu:entindex(),
			OrderType = DOTA_UNIT_ORDER_CAST_TARGET,
			TargetIndex = t:entindex(), --Optional.  Only used when targeting units
			AbilityIndex = uu:FindAbilityByName("chain_frost"):entindex(), --Optional.  Only used when casting abilities
			Position = nil, --Optional.  Only used when targeting the ground
			Queue = 0, --Optional.  Used for queueing up abilities
		}
		ExecuteOrderFromTable(newOrder)

		Timers:CreateTimer(200, function()
			uu:ForceKill(false)
			uu:Destroy()
		end)
	end)
end
--石化
function shihua(keys)
	local caster = keys.caster

	local u =
		CreateUnitByName("gemtd_feicuimoxiang_yinxing", caster:GetAbsOrigin(), false, nil, nil, DOTA_TEAM_GOODGUYS)
	u.ftd = 2009
	u:AddAbility("medusa_stone_gaze")
	u:FindAbilityByName("medusa_stone_gaze"):SetLevel(1)
	Timers:CreateTimer(0.1, function()
		local newOrder = {
			UnitIndex = u:entindex(),
			OrderType = DOTA_UNIT_ORDER_CAST_NO_TARGET,
			TargetIndex = nil, --Optional.  Only used when targeting units
			AbilityIndex = u:FindAbilityByName("medusa_stone_gaze"):entindex(), --Optional.  Only used when casting abilities
			Position = nil, --Optional.  Only used when targeting the ground
			Queue = 0, --Optional.  Used for queueing up abilities
		}
		ExecuteOrderFromTable(newOrder)
		Timers:CreateTimer(20, function()
			u:ForceKill(false)
			u:Destroy()
		end)
	end)
end

function gazeNew(keys)
	local caster = keys.caster
	local gaze_count = 5
	local ability = keys.ability
	if ability:IsCooldownReady() == false then
		return
	end

	if caster.level then
		gaze_count = gaze_count + math.floor((caster.level or 0) / 2)
	end

	ability:StartCooldown(5.0)

	--发射gaze_count条蛇形弹道
	local pj_count = 0
	local enemies = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		caster:GetAbsOrigin(),
		nil,
		9999,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_CLOSEST,
		false
	)

	if table.maxn(enemies) > 0 then
		EmitSoundOn("snake_shoot", caster)
	end

	for i = 1, table.maxn(enemies) do
		if pj_count < gaze_count then
			local target = enemies[i]
			local info = {
				Target = target,
				Source = caster,
				Ability = ability,
				EffectName = "particles/units/heroes/hero_medusa/medusa_mystic_snake_projectile.vpcf",
				bDodgeable = false,
				iMoveSpeed = 2000,
				bProvidesVision = false,
				iVisionRadius = 0,
				iVisionTeamNumber = caster:GetTeamNumber(),
				iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
			}
			projectile = ProjectileManager:CreateTrackingProjectile(info)
			pj_count = pj_count + 1
		end
	end
end
function gazeNewHit(keys)
	local caster = keys.caster
	local target = keys.target
	EmitSoundOn("Hero_Tiny.CraggyExterior", target)
	-- target:AddNewModifier(target,nil,"modifier_stunned",{ duration = 3 })
	target:AddNewModifier(target, nil, "modifier_medusa_stone_gaze_stone", { duration = 2.5 })
end

function jianshe1(keys)
	local caster = keys.caster
	local target = keys.target

	local direUnits = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		target:GetAbsOrigin(),
		nil,
		300,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	for aaa, unit in pairs(direUnits) do
		--获取攻击伤害
		local attack_damage = keys.Damage
		local damage = attack_damage * 0.3
		local damageTable = {
			victim = unit,
			attacker = caster,
			damage_type = DAMAGE_TYPE_PURE,
			damage = damage,
		}
		ApplyDamage(damageTable)

		-- print(damage)
	end
end
function jianshe2(keys)
	local caster = keys.caster
	local target = keys.target

	local direUnits = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		target:GetAbsOrigin(),
		nil,
		350,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	for aaa, unit in pairs(direUnits) do
		--获取攻击伤害
		local attack_damage = keys.Damage
		local damage = attack_damage * 0.4
		local damageTable = {
			victim = unit,
			attacker = caster,
			damage_type = DAMAGE_TYPE_PURE,
			damage = damage,
		}
		ApplyDamage(damageTable)
	end
end
function jianshe3(keys)
	local caster = keys.caster
	local target = keys.target

	local direUnits = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		target:GetAbsOrigin(),
		nil,
		400,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	for aaa, unit in pairs(direUnits) do
		--获取攻击伤害
		local attack_damage = keys.Damage
		local damage = attack_damage * 0.5
		local damageTable = {
			victim = unit,
			attacker = caster,
			damage_type = DAMAGE_TYPE_PURE,
			damage = damage,
		}
		ApplyDamage(damageTable)
	end
end
function jianshe4(keys)
	local caster = keys.caster
	local target = keys.target

	local direUnits = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		target:GetAbsOrigin(),
		nil,
		450,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	for aaa, unit in pairs(direUnits) do
		--获取攻击伤害
		local attack_damage = keys.Damage
		local damage = attack_damage * 0.6
		local damageTable = {
			victim = unit,
			attacker = caster,
			damage_type = DAMAGE_TYPE_PURE,
			damage = damage,
		}
		ApplyDamage(damageTable)
	end
end
function jianshe5(keys)
	local caster = keys.caster
	local target = keys.target

	local direUnits = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		target:GetAbsOrigin(),
		nil,
		500,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	for aaa, unit in pairs(direUnits) do
		--获取攻击伤害
		local attack_damage = keys.Damage
		local damage = attack_damage * 0.7
		local damageTable = {
			victim = unit,
			attacker = caster,
			damage_type = DAMAGE_TYPE_PURE,
			damage = damage,
		}
		ApplyDamage(damageTable)
	end
end
function jianshe6(keys)
	local caster = keys.caster
	local target = keys.target

	local direUnits = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		target:GetAbsOrigin(),
		nil,
		700,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)
	for aaa, unit in pairs(direUnits) do
		--获取攻击伤害
		local attack_damage = keys.Damage
		local damage = attack_damage
		local damageTable = {
			victim = unit,
			attacker = caster,
			damage_type = DAMAGE_TYPE_PURE,
			damage = damage,
		}
		ApplyDamage(damageTable)
	end
end
function ranjin(keys)
	local caster = keys.caster
	local target = keys.target
	local ability = caster:FindAbilityByName("tower_ranjin")
	if ability == nil then
		return
	end

	if RandomInt(1, 100) < 15 then
		--判断cd
		-- if ability:IsCooldownReady() == false then
		-- 	return
		-- end

		--计算伤害
		local damage = keys.Damage * 20.0
		play_particle("particles/base_destruction_fx/gensmoke.vpcf", PATTACH_ABSORIGIN_FOLLOW, target, 3)

		-- local damageTable = {
		-- 	victim=target,
		-- 	attacker=caster,
		-- 	damage_type=DAMAGE_TYPE_MAGICAL,
		-- 	damage=damage
		-- }
		-- ApplyDamage(damageTable)

		local direUnits = FindUnitsInRadius(
			DOTA_TEAM_BADGUYS,
			target:GetAbsOrigin(),
			nil,
			400,
			DOTA_UNIT_TARGET_TEAM_FRIENDLY,
			DOTA_UNIT_TARGET_ALL,
			DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
			FIND_ANY_ORDER,
			false
		)
		for aaa, unit in pairs(direUnits) do
			local damage = damage
			local damageTable = {
				victim = unit,
				attacker = caster,
				damage_type = DAMAGE_TYPE_MAGICAL,
				damage = damage,
			}
			ApplyDamage(damageTable)
			-- ability:ApplyDataDrivenModifier(unit,unit,'modifier_tower_ranjin_debuff',{
			-- 	duration = 10
			-- })
		end
	end
end

function decodeURI(s)
	s = string.gsub(s, "%%(%x%x)", function(h)
		return string.char(tonumber(h, 16))
	end)
	return s
end
function encodeURI(s)
	s = string.gsub(s, "([^%w%.%- ])", function(c)
		return string.format("%%%02X", string.byte(c))
	end)
	return string.gsub(s, " ", "+")
end
function string.trim(s)
	return s:match("^%s*(.-)%s*$")
end
function string.starts(String, Start)
	return string.sub(String, 1, string.len(Start)) == Start
end
function string.split(s, sep)
	if sep == nil then
		sep = "%s"
	end
	local t = {}
	i = 1
	for str in string.gmatch(s, "([^" .. sep .. "]+)") do
		t[i] = str
		i = i + 1
	end
	return t
end
function hash32(s)
	local h = md5.sumhexa(s)
	h = h.sub(h, -8)
	return tonumber("0x" .. h)
end

--搞破坏
function ItemJingYing(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	local p = keys.target_entities[1]:GetAbsOrigin()
	--发弹幕
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_jingying",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_jingying', hehe = RandomInt(1,100000)})

	--随机一个还活着的unluckydog玩家
	local unluckydog = nil
	local try_times = 0
	while unluckydog == nil and try_times < 50 do
		local r = RandomInt(0, PlayerResource:GetPlayerCount() - 1)
		if _G.gem_castle_hp_race[r] > 0 and r ~= player_id then
			unluckydog = r
			break
		end
		try_times = try_times + 1
	end

	if unluckydog ~= nil then
		local hero = _G.playerid2hero[unluckydog]

		local info = {
			Target = hero,
			Source = caster,
			Ability = nil,
			EffectName = "particles/econ/items/necrolyte/necrophos_sullen/necro_sullen_pulse_enemy.vpcf",
			bDodgeable = false,
			iMoveSpeed = 1000,
			bProvidesVision = false,
			iVisionRadius = 0,
			iVisionTeamNumber = caster:GetTeamNumber(),
			iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
		}
		projectile = ProjectileManager:CreateTrackingProjectile(info)

		local delay_time = (hero:GetAbsOrigin() - caster:GetAbsOrigin()):Length2D() / 1000
		Timers:CreateTimer(delay_time, function()
			if hero.jingying_zuzhou == nil then
				hero.jingying_zuzhou = 1
			else
				hero.jingying_zuzhou = hero.jingying_zuzhou + 1
			end
		end)
	end
end

function ItemHuichun(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	local p = keys.target_entities[1]:GetAbsOrigin()
	--发弹幕
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_huichun",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_huichun', hehe = RandomInt(1,100000)})

	for r = 0, PlayerResource:GetPlayerCount() - 1 do
		if _G.gem_castle_hp_race[r] > 0 then
			local hero = _G.playerid2hero[r]
			local hp_count = RandomInt(-4, 10)
			play_particle(
				"particles/econ/items/omniknight/hammer_ti6_immortal/omniknight_pu_ti6_heal_hammers.vpcf",
				PATTACH_OVERHEAD_FOLLOW,
				hero,
				2
			)
			EmitSoundOn("DOTAMusic_Stinger.004", hero)

			if hp_count <= 0 then
				hp_count = hp_count - 1
			end

			_G.gem_castle_hp_race[r] = _G.gem_castle_hp_race[r] + hp_count
			if _G.gem_castle_hp_race[r] > 100 then
				_G.gem_castle_hp_race[r] = 100
			end
			if _G.gem_castle_hp_race[r] < 1 then
				_G.gem_castle_hp_race[r] = 1
			end
			_G.gem_castle_race[r]:SetHealth(_G.gem_castle_hp_race[r])
			Timers:CreateTimer(RandomFloat(0, 2), function()
				CustomNetTables:SetTableValue(
					"game_state",
					"gem_life_race",
					{ player = r, gem_life = _G.gem_castle_hp_race[r], hehe = RandomInt(1, 10000) }
				)
			end)

			if hp_count <= 0 then
				AMHC:CreateNumberEffect(hero, -hp_count, 5, AMHC.MSG_DAMAGE, "red", 3)
			else
				AMHC:CreateNumberEffect(hero, hp_count, 5, AMHC.MSG_MISS, "green", 0)
			end

			hero:SetHealth(_G.gem_castle_hp_race[r])
		end
	end
end
function ItemFog(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	--发弹幕
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_fog",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_fog', hehe = RandomInt(1,100000)})

	--随机一个还活着的unluckydog玩家
	local unluckydog = nil
	local try_times = 0
	while unluckydog == nil and try_times < 50 do
		local r = RandomInt(0, PlayerResource:GetPlayerCount() - 1)
		if _G.gem_castle_hp_race[r] > 0 and r ~= player_id then
			unluckydog = r
			break
		end
		try_times = try_times + 1
	end
	if unluckydog ~= nil then
		local hero = _G.playerid2hero[unluckydog]

		local info = {
			Target = hero,
			Source = caster,
			Ability = nil,
			EffectName = "effect/bottle/2_concoction_projectile.vpcf",
			bDodgeable = false,
			iMoveSpeed = 800,
			bProvidesVision = false,
			iVisionRadius = 0,
			iVisionTeamNumber = caster:GetTeamNumber(),
			iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
		}
		projectile = ProjectileManager:CreateTrackingProjectile(info)

		local delay_time = (hero:GetAbsOrigin() - caster:GetAbsOrigin()):Length2D() / 1000
		Timers:CreateTimer(delay_time, function()
			InvisibleEnemyCastFog({ player_id = unluckydog })
			for i = 1, 9 do
				Timers:CreateTimer(RandomInt(1, 25), function()
					InvisibleEnemyCastFog({ player_id = unluckydog })
				end)
			end
		end)
	end

	-- if _G.top_runner ~= nil then
	-- 	InvisibleEnemyCastFog({player_id = _G.top_runner})
	-- 	for i=1,9 do
	-- 		Timers:CreateTimer(RandomInt(1,25),function()
	-- 			InvisibleEnemyCastFog({player_id = _G.top_runner})
	-- 		end)
	-- 	end
	-- end
end
function ItemAoJiao(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	--发弹幕
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_aojiao",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_aojiao', hehe = RandomInt(1,100000)})
	for i = 0, PlayerResource:GetPlayerCount() - 1 do
		if i ~= player_id then
			if _G.last_mvp[i] ~= nil then
				local unluckydog = EntIndexToHScript(_G.last_mvp[i])
				local info = {
					Target = unluckydog,
					Source = caster,
					Ability = nil,
					EffectName = "effect/bottle/1_concoction_projectile.vpcf",
					bDodgeable = false,
					iMoveSpeed = 800,
					bProvidesVision = false,
					iVisionRadius = 0,
					iVisionTeamNumber = caster:GetTeamNumber(),
					iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
				}
				projectile = ProjectileManager:CreateTrackingProjectile(info)

				if
					unluckydog ~= nil
					and unluckydog:IsNull() == false
					and caster:GetClassname() == "npc_dota_creature"
					and unluckydog:FindAbilityByName("tower_aojiao") == nil
				then
					local delay_time = (unluckydog:GetAbsOrigin() - caster:GetAbsOrigin()):Length2D() / 800
					Timers:CreateTimer(delay_time, function()
						unluckydog:AddAbility("tower_aojiao")
						unluckydog:FindAbilityByName("tower_aojiao"):SetLevel(1)
						Timers:CreateTimer(120, function()
							unluckydog:RemoveAbility("tower_aojiao")
							unluckydog:RemoveModifierByName("modifier_tower_buaojiao")
						end)
					end)
				end
			end
		end
	end
end
function ItemFly(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	local p = keys.target_entities[1]:GetAbsOrigin()
	--发弹幕
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_fly",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_fly', hehe = RandomInt(1,100000)})

	--随机一个还活着的unluckydog玩家
	local unluckydog = nil
	local try_times = 0
	while unluckydog == nil and try_times < 50 do
		local r = RandomInt(0, PlayerResource:GetPlayerCount() - 1)
		if _G.gem_castle_hp_race[r] > 0 and r ~= player_id then
			unluckydog = r
			break
		end
		try_times = try_times + 1
	end

	if unluckydog ~= nil then
		local hero = _G.playerid2hero[unluckydog]

		local info = {
			Target = hero,
			Source = caster,
			Ability = nil,
			EffectName = "particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf",
			bDodgeable = false,
			iMoveSpeed = 1000,
			bProvidesVision = false,
			iVisionRadius = 0,
			iVisionTeamNumber = caster:GetTeamNumber(),
			iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
		}
		projectile = ProjectileManager:CreateTrackingProjectile(info)

		local delay_time = (hero:GetAbsOrigin() - caster:GetAbsOrigin()):Length2D() / 1000
		Timers:CreateTimer(delay_time, function()
			if hero.fly_zuzhou == nil then
				hero.fly_zuzhou = 1
			else
				hero.fly_zuzhou = hero.fly_zuzhou + 1
			end
		end)
	end
end
-- function ItemFanbei(keys)
-- 	local caster = keys.caster
-- 	local player_id = caster:GetPlayerID()
-- 	local p = keys.target_entities[1]:GetAbsOrigin()
-- 	--发弹幕
-- 	ShowCombat({
-- 		t = 'item',
-- 		player = player_id,
-- 		text = 'item_fanbei'
-- 	})
-- 	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_fanbei', hehe = RandomInt(1,100000)})

-- 	--随机一个还活着的unluckydog玩家
-- 	local unluckydog = nil
-- 	local try_times = 0
-- 	while unluckydog == nil and try_times < 50 do
-- 		local r = RandomInt(0,PlayerResource:GetPlayerCount()-1)
-- 		if _G.gem_castle_hp_race[r] > 0 and r ~= player_id then
-- 			unluckydog = r
-- 			break
-- 		end
-- 		try_times = try_times + 1
-- 	end
-- 	if unluckydog ~= nil then

-- 		local hero = PlayerResource:GetPlayer(unluckydog):GetAssignedHero()

-- 		local info =
-- 	    {
-- 	        Target = hero,
-- 	        Source = caster,
-- 	        Ability = nil,
-- 	        EffectName = "effect/bottle2/1_concoction_projectile.vpcf",
-- 	        bDodgeable = false,
-- 	        iMoveSpeed = 1000,
-- 	        bProvidesVision = false,
-- 	        iVisionRadius = 0,
-- 	        iVisionTeamNumber = caster:GetTeamNumber(),
-- 	        iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1
-- 	    }
-- 	    projectile = ProjectileManager:CreateTrackingProjectile(info)

-- 	    local delay_time = (hero:GetAbsOrigin() - caster:GetAbsOrigin()):Length2D() / 1000
-- 	    Timers:CreateTimer(delay_time,function()
-- 	    	if _G.item_fanbei[unluckydog] == nil then
-- 				_G.item_fanbei[unluckydog] = 0
-- 			end
-- 			_G.item_fanbei[unluckydog] = _G.item_fanbei[unluckydog] + 1
-- 	    end)
-- 	end
-- end
function ItemQianggong(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	--发弹幕
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_qianggong",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_qianggong', hehe = RandomInt(1,100000)})
	for i = 0, PlayerResource:GetPlayerCount() - 1 do
		if i == player_id then
			if _G.last_mvp[i] ~= nil then
				local unluckydog = EntIndexToHScript(_G.last_mvp[i])
				if unluckydog ~= nil and unluckydog:IsNull() == false and IsValidEntity(unluckydog) then
					local info = {
						Target = unluckydog,
						Source = caster,
						Ability = nil,
						EffectName = "particles/econ/items/axe/axe_cinder/axe_cinder_battle_hunger.vpcf",
						bDodgeable = false,
						iMoveSpeed = 800,
						bProvidesVision = false,
						iVisionRadius = 0,
						iVisionTeamNumber = caster:GetTeamNumber(),
						iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
					}
					projectile = ProjectileManager:CreateTrackingProjectile(info)
					if unluckydog:FindAbilityByName("tower_fanbei") == nil then
						local delay_time = (unluckydog:GetAbsOrigin() - caster:GetAbsOrigin()):Length2D() / 800
						Timers:CreateTimer(delay_time, function()
							unluckydog:AddAbility("tower_qianggong")
							unluckydog:FindAbilityByName("tower_qianggong"):SetLevel(1)
							Timers:CreateTimer(30, function()
								unluckydog:RemoveAbility("tower_qianggong")
								unluckydog:RemoveModifierByName("modifier_tower_fanbei")
							end)
						end)
					end
				end
			end
		end
	end
end

function play_merge_particle(u)
	local pp = ParticleManager:CreateParticle(
		"particles/units/unit_greevil/loot_greevil_death.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		u
	)
	ParticleManager:SetParticleControl(pp, 0, u:GetAbsOrigin())
	ParticleManager:SetParticleControl(pp, 1, u:GetAbsOrigin())
	ParticleManager:SetParticleControl(pp, 3, u:GetAbsOrigin())
	Timers:CreateTimer(5, function()
		ParticleManager:DestroyParticle(pp, true)
	end)
end

function elite_hp()
	local beishu = _G.level
	if beishu > 50 then
		beishu = 50
	end

	return (51 - beishu) / 50 * 6 + 2
end

function log(t)
	if _G.is_debug == true then
		GameRules:SendCustomMessage(t, 0, 0)
	end
end
function prt(t)
	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(0), "prt_localize", {
		text = t,
	})
end

--增加技能扩展槽
function ItemExtend(keys)
	local caster = keys.caster
	if GetMapName() == "gemtd_race" and PlayerResource:GetPlayerCount() > 1 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_in_racemode",
		})
		return
	end
	if _G.is_game_really_started == true then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_now",
		})
		return
	end
	if _G.gem_map == nil then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_now",
		})
		return
	end
	--通知pui弹出确认框
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(caster:GetPlayerID()),
		"show_use_extend",
		{ player_id = caster:GetPlayerID() }
	)
end
--使用丛林挑战门票
function TicketBush(keys)
	local caster = keys.caster
	if GetMapName() == "gemtd_race" then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_in_racemode",
		})
		return
	end
	if _G.is_game_really_started == true then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_now",
		})
		return
	end
	if _G.is_ticket_bush == true then
		return
	end
	if _G.gem_map == nil then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_now",
		})
		return
	end
	--通知pui弹出确认框
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(caster:GetPlayerID()),
		"show_use_bush_ticket",
		{ player_id = caster:GetPlayerID() }
	)
end
function GemTD:OnConfirmUseBushTicket(keys)
	local caster = _G.playerid2hero[keys.player_id]

	if caster.steam_id == nil then
		prt("FAILED: NO STEAM ID.")
		return
	end
	--通知服务器，门票被用了
	local url = "http://gemtd.ppbizon.com/gemtd/quest/begin/@"
		.. caster.steam_id
		.. "@q399?hehe="
		.. RandomInt(1, 10000)
	local req = CreateHTTPRequestScriptVM("GET", url)
	req:SetHTTPRequestAbsoluteTimeoutMS(20000)
	req:Send(function(result)
		local object = json.decode(result["Body"])

		if object["err"] == nil or object["err"] ~= 0 then
			GameRules:SendCustomMessage("Connect Server ERROR: " .. object["err"], 0, 0)
			return
		end

		_G.is_ticket_bush = true

		SetQuest("q399", true)
		_G.quest["q399"] = false
		show_quest()
		--移除物品
		for slot = 0, 10 do
			if
				caster:GetItemInSlot(slot) ~= nil
				and caster:GetItemInSlot(slot):GetAbilityName() == "item_ticket_bush"
			then
				caster:RemoveItem(caster:GetItemInSlot(slot))
			end
		end
		--播放特效
		AMHC:CreateParticle(
			"particles/units/heroes/hero_treant/treant_overgrowth_cast_tree.vpcf",
			PATTACH_OVERHEAD_FOLLOW,
			false,
			caster,
			2
		)
		--播放音效
		-- EmitGlobalSound("Ambient.hwn_coffin_skeleton")
		EmitGlobalSound("diretide_sugarrush_Stinger")

		for bush = 1, 8 + PlayerResource:GetPlayerCount() * 2 do
			RandomBlock(bush)
		end
		prt("#text_start_tips_bush_ticket")
	end)
end

function RandomBlock(bush)
	local p = PlayerResource:GetPlayerCount()
	local start_x = RandomInt(12 - 2 * p, 26 + 2 * p)
	local start_y = RandomInt(12 - 2 * p, 26 + 2 * p)

	if bush == 1 then
		start_x = 19
		start_y = 19
	end

	if RandomInt(1, 100) > 50 then
		--条
		local d = DIRECT_LIST_LINE[RandomInt(1, 4)]
		local l = RandomInt(3, 8)

		for i = 0, l - 1 do
			BuildABlock(start_x + d.x * i, start_y + d.y * i)
		end
	else
		--块
		local d = DIRECT_LIST_BLOCK[RandomInt(1, 4)]
		local w = RandomInt(2, 4)
		local h = RandomInt(2, 4)
		for i = 0, w - 1 do
			for j = 0, h - 1 do
				BuildABlock(start_x + d.x * i, start_y + d.y * j)
			end
		end
	end
end

function BuildABlock(x, y)
	if x < 1 or x > 37 or y < 1 or y > 37 then
		return
	end
	--path1和path7附近 不能造
	if x >= 29 and y <= 9 then
		return
	end

	if x <= 9 and y >= 29 then
		return
	end
	for i = 1, 7 do
		local p1 = Entities:FindByName(nil, "path" .. i):GetAbsOrigin()
		local xxx1 = math.floor((p1.x + 64) / 128) + 19
		local yyy1 = math.floor((p1.y + 64) / 128) + 19
		if x == xxx1 and y == yyy1 then
			return
		end
	end
	--网格化坐标
	local xxx = (x - 19) * 128
	local yyy = (y - 19) * 128

	if _G.gem_map[y][x] == 0 then
		_G.gem_map[y][x] = 1
		--判断是否堵路了
		find_all_path()
		--路完全堵死了，不能造
		for i = 1, 6 do
			if table.maxn(_G.gem_path[i]) < 1 then
				--回退地图，重新寻路
				_G.gem_map[y][x] = 0

				find_all_path()
				return
			end
		end

		Timers:CreateTimer(RandomFloat(0, 5), function()
			local p = Vector(xxx, yyy, 128)
			p.z = 1400
			local u2 = CreateUnitByName("gemtd_tree", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
			u2.ftd = 2009

			u2:SetOwner(PlayerResource:GetPlayer(0):GetAssignedHero())
			u2:SetControllableByPlayer(0, true)
			u2:SetForwardVector(Vector(0, -1, 0))

			u2:AddAbility("no_hp_bar")
			u2:FindAbilityByName("no_hp_bar"):SetLevel(1)
			u2:AddAbility("no_selectable")
			u2:FindAbilityByName("no_selectable"):SetLevel(1)
			u2:RemoveModifierByName("modifier_invulnerable")
			u2:SetHullRadius(1)

			EmitSoundOn("Hero_EarthShaker.Fissure", u)
			play_particle("particles/dev/library/base_dust_hit_shockwave.vpcf", PATTACH_ABSORIGIN_FOLLOW, u2, 2)

			-- u2:SetModelScale(0.000001)
			-- AMHC:CreateParticle("particles/world_destruction_fx/tree_oak_00.vpcf",PATTACH_ABSORIGIN_FOLLOW,false,u2,1)
			-- Timers:CreateTimer(1,function()
			-- 	u2:SetModelScale(1.2)
			-- end)
			-- u2:SetModelScale(1.3)
		end)
	end
end

function BuildAStreetLight(x, y)
	if x < 1 or x > 37 or y < 1 or y > 37 then
		return
	end
	--path1和path7附近 不能造
	if x >= 29 and y <= 9 then
		return
	end

	if x <= 9 and y >= 29 then
		return
	end
	for i = 1, 7 do
		local p1 = Entities:FindByName(nil, "path" .. i):GetAbsOrigin()
		local xxx1 = math.floor((p1.x + 64) / 128) + 19
		local yyy1 = math.floor((p1.y + 64) / 128) + 19
		if x == xxx1 and y == yyy1 then
			return
		end
	end
	--网格化坐标
	local xxx = (x - 19) * 128
	local yyy = (y - 19) * 128

	if _G.gem_map[y][x] == 0 then
		_G.gem_map[y][x] = 1
		--判断是否堵路了
		find_all_path()
		--路完全堵死了，不能造
		for i = 1, 6 do
			if table.maxn(_G.gem_path[i]) < 1 then
				--回退地图，重新寻路
				_G.gem_map[y][x] = 0

				find_all_path()
				return
			end
		end

		Timers:CreateTimer(0.5, function()
			local p = Vector(xxx, yyy, 128)
			p.z = 1400
			local u2 = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
			u2.ftd = 2009

			u2:SetOwner(PlayerResource:GetPlayer(0):GetAssignedHero())
			u2:SetControllableByPlayer(0, true)
			u2:SetForwardVector(Vector(0, -1, 0))

			u2:AddAbility("no_hp_bar")
			u2:FindAbilityByName("no_hp_bar"):SetLevel(1)
			-- u2:AddAbility("no_selectable")
			-- u2:FindAbilityByName("no_selectable"):SetLevel(1)
			u2:RemoveModifierByName("modifier_invulnerable")
			u2:SetHullRadius(1)

			AddAbilityAndSetLevel(u2, "streetlight")
			local new_m = "models/props_gameplay/default_ward.vmdl" --"models/props_debris/chinese_lantern002.vmdl"--
			u2:SetOriginalModel(new_m)
			u2:SetModel(new_m)
			u2:SetModelScale(2)
			u2.is_streetlight = true
			EmitSoundOn("Hero_EarthShaker.Fissure", u)
			play_particle("particles/dev/library/base_dust_hit_shockwave.vpcf", PATTACH_ABSORIGIN_FOLLOW, u2, 2)

			-- u2:SetModelScale(0.000001)
			-- AMHC:CreateParticle("particles/world_destruction_fx/tree_oak_00.vpcf",PATTACH_ABSORIGIN_FOLLOW,false,u2,1)
			-- Timers:CreateTimer(1,function()
			-- 	u2:SetModelScale(1.2)
			-- end)
			-- u2:SetModelScale(1.3)
		end)
	end
end

DIRECT_LIST_LINE = {
	[1] = { x = 1, y = 0 },
	[2] = { x = -1, y = 0 },
	[3] = { x = 0, y = 1 },
	[4] = { x = 0, y = -1 },
}
DIRECT_LIST_BLOCK = {
	[1] = { x = 1, y = 1 },
	[2] = { x = -1, y = 1 },
	[3] = { x = 1, y = -1 },
	[4] = { x = -1, y = -1 },
}

function GemTD:OnAddBushTicket(keys)
	local hero = _G.playerid2hero[keys.player_id]
	if hero == nil or hero:IsNull() == true then
		return
	end
	if hero:GetUnitName() == "npc_dota_hero_riki" then
		Timers:CreateTimer(1, function()
			GemTD:OnAddBushTicket({
				player_id = keys.player_id,
			})
		end)
	else
		--有了就不加新的了
		for slot = 0, 8 do
			if hero:GetItemInSlot(slot) ~= nil and hero:GetItemInSlot(slot):GetAbilityName() == "item_ticket_bush" then
				return
			end
		end
		hero:AddItemByName("item_ticket_bush")
		_G.quest["q399"] = false
		show_quest()
	end
end
function GemTD:OnAddNightTicket(keys)
	local hero = _G.playerid2hero[keys.player_id]
	if hero == nil or hero:IsNull() == true then
		return
	end

	if hero:GetUnitName() == "npc_dota_hero_riki" then
		Timers:CreateTimer(1, function()
			GemTD:OnAddNightTicket({
				player_id = keys.player_id,
			})
		end)
	else
		--有了就不加新的了
		for slot = 0, 8 do
			if hero:GetItemInSlot(slot) ~= nil and hero:GetItemInSlot(slot):GetAbilityName() == "item_ticket_night" then
				return
			end
		end
		hero:AddItemByName("item_ticket_night")
		_G.quest["q398"] = false
		show_quest()
	end
end

--判断怪是否位于路径点(合作模式)
function IsEnemyOnPath(unit)
	for i = 2, 6 do
		if (unit:GetAbsOrigin() - Entities:FindByName(nil, "path" .. i):GetAbsOrigin()):Length2D() < 64 then
			-- if unit.path_point == nil and i == 2 then
			-- 	return i
			-- elseif unit.path_point + 1 == i then
			return i
			-- end
		end
	end

	if _G.guangzhudaobiao ~= nil then
		if (unit:GetAbsOrigin() - _G.guangzhudaobiao:GetAbsOrigin()):Length2D() < 64 then
			return 1
		end
	end
	return nil
end

function WinStreakAdjust()
	local up_down = 0
	if _G.win_streak >= 50 then
		GameRules:SendCustomMessage("#text_win_streak_up", 0, 0)
		EmitGlobalSound("Frostivus.PointScored.Team")

		_G.win_streak = _G.win_streak - 50
		_G.wave_enemy_count = _G.wave_enemy_count + 1
		if _G.wave_enemy_count >= 20 then
			SetQuest("q109", true)
		end
		up_down = 1
	end
	if _G.win_streak <= -50 then
		GameRules:SendCustomMessage("#text_win_streak_down", 0, 0)
		EmitGlobalSound("Frostivus.PointScored.Enemy")

		_G.win_streak = _G.win_streak + 50
		_G.wave_enemy_count = _G.wave_enemy_count - 1

		if _G.wave_enemy_count < 5 then
			_G.wave_enemy_count = 5
		end
		up_down = -1
	end

	CustomGameEventManager:Send_ServerToAllClients("show_time", {
		win_streak = _G.win_streak,
		hehe = RandomInt(1, 10000),
		up_down = up_down,
		enemy_count = _G.wave_enemy_count,
	})
end

function JiliEnemy(u)
	if u:FindModifierByName("modifier_tower_jihan_buff") ~= nil then
		return
	end

	local max_health = u:GetMaxHealth()
	local recover_health = math.floor(max_health * 0.2)

	if string.find(u:GetUnitName(), "fly") then
		recover_health = recover_health / 2
	end
	local health = u:GetHealth()
	health = health + recover_health
	if health > max_health then
		health = max_health
	end

	u:SetHealth(health)
	play_particle("particles/units/heroes/hero_abaddon/abaddon_borrowed_time_heal.vpcf", PATTACH_OVERHEAD_FOLLOW, u, 3)
	EmitSoundOn("Hero_Omniknight.GuardianAngel", u)
end

function GemTD:OnAddItem(keys)
	local hero = keys.hero or _G.playerid2hero[keys.player_id]
	--有了就不加新的了
	for slot = 0, 8 do
		if hero:GetItemInSlot(slot) ~= nil and hero:GetItemInSlot(slot):GetAbilityName() == "item_" .. keys.item then
			return
		end
	end
	hero:AddItemByName("item_" .. keys.item)
end

--使用玩具：胆小南瓜人的头部
function ItemPumpkin(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	if caster == nil or player_id == nil then
		return
	end

	--音效特效弹幕
	EmitGlobalSound("gemtd.item.pumpkin")
	play_particle(
		"particles/econ/items/riki/riki_head_ti8_gold/riki_smokebomb_ti8_gold_model.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		caster,
		3
	)
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_pumpkin",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = "item_pumpkin", hehe = RandomInt(1,100000)})

	SetHeroStoneStyle(caster, "pumpkin")
end

--通用方法：改变一个英雄的石头样式
function SetHeroStoneStyle(hero, stone_style)
	hero.stone_style = stone_style
	ChangeCastleStyle(hero:GetPlayerID(), stone_style)
	ChangeAllStoneStyle(hero:GetPlayerID(), stone_style)
	if _G.gem_castle ~= nil then
		_G.gem_castle.stone_style = stone_style
	end
end
function ChangeStoneStyle(unit)
	-- local player = unit:GetOwner():GetPlayerID()
	local hero = unit:GetOwner()
	if hero == nil then
		return
	end
	if unit.is_streetlight == true then
		return
	end
	if hero.stone_style ~= nil then
		local ss = _G.stone_style_list[hero.stone_style]
		if ss == nil then
			return
		end

		ss_model = ss["stone_model"]
		if string.find(ss_model, ",") then
			ss_array = string.split(ss_model, ",")
			local ran = RandomInt(1, table.maxn(ss_array))
			ss_model = ss_array[ran]
		end

		unit:SetOriginalModel(ss_model)
		unit:SetModel(ss_model)
		unit:SetModelScale(ss["stone_scale"])

		if ss["stone_random_forward"] == true then
			unit:SetForwardVector(Vector(RandomFloat(-100, 100), RandomFloat(-100, 100), 0))
		end

		if ss[rgb] ~= nil then
			unit:SetRenderColor(ss[rgb][r], ss[rgb][g], ss[rgb][b])
		end
	end
end
function ChangeAllStoneStyle(player_id, stone_style)
	if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
		--合作的
		for i = 0, 3 do
			if _G.gem_hero[i] ~= nil then
				local h = _G.gem_hero[i]
				h.stone_style = stone_style
				print("==" .. i .. "==" .. h:GetUnitName())
			end
		end
		local all_units = FindUnitsInRadius(
			DOTA_TEAM_GOODGUYS,
			Vector(0, 0, 0),
			nil,
			9999,
			DOTA_UNIT_TARGET_TEAM_BOTH,
			DOTA_UNIT_TARGET_ALL,
			DOTA_UNIT_TARGET_FLAG_NONE,
			FIND_ANY_ORDER,
			false
		)
		if table.maxn(all_units) > 0 then
			for _, unit in pairs(all_units) do
				if unit:GetUnitName() == "gemtd_stone" then
					ChangeStoneStyle(unit)
				end
			end
		end
	else
		--竞速的
		local all_units = FindUnitsInRadius(
			DOTA_TEAM_GOODGUYS,
			Vector(0, 0, 0),
			nil,
			9999,
			DOTA_UNIT_TARGET_TEAM_FRIENDLY,
			DOTA_UNIT_TARGET_ALL,
			DOTA_UNIT_TARGET_FLAG_NONE,
			FIND_ANY_ORDER,
			false
		)
		if table.maxn(all_units) > 0 then
			for _, unit in pairs(all_units) do
				if unit:GetUnitName() == "gemtd_stone" and unit:GetOwner():GetPlayerID() == player_id then
					ChangeStoneStyle(unit)
				end
			end
		end
	end
end
function ChangeCastleStyle(player_id, stone_style)
	if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
		--合作模式
		if _G.gem_castle ~= nil then
			_G.gem_castle.stone_style = stone_style
			local ss = _G.stone_style_list[stone_style]
			_G.gem_castle:SetOriginalModel(ss["castle_model"])
			_G.gem_castle:SetModel(ss["castle_model"])
			_G.gem_castle:SetModelScale(ss["castle_scale"])
			AddAbilityAndSetLevel(_G.gem_castle, "act_idle")
			if ss["castle_forward"] ~= nil then
				_G.gem_castle:SetForwardVector(ss["castle_forward"])
			end
		end
	else
		--竞速模式
		if _G.gem_castle_race[player_id] ~= nil then
			_G.gem_castle_race[player_id].stone_style = stone_style
			local ss = _G.stone_style_list[stone_style]
			_G.gem_castle_race[player_id]:SetOriginalModel(ss["castle_model"])
			_G.gem_castle_race[player_id]:SetModel(ss["castle_model"])
			_G.gem_castle_race[player_id]:SetModelScale(ss["castle_scale"])
			AddAbilityAndSetLevel(_G.gem_castle_race[player_id], "act_idle")
			if ss["castle_forward"] ~= nil then
				_G.gem_castle_race[player_id]:SetForwardVector(ss["castle_forward"])
			end
		end
	end
end

function AdjustBossAttackDamage(u)
	if string.find(u:GetUnitName(), "boss") then
		local boss_damage_per = math.ceil(u:GetHealth() / u:GetMaxHealth() * 100)
		u.damage = boss_damage_per
		u:SetBaseDamageMin(u.damage)
		u:SetBaseDamageMax(u.damage)
	end
end
function GetAbilityKV(ability, key)
	if ability == nil then
		return
	end
	local level = ability:GetLevel() or 1
	return ability:GetLevelSpecialValueFor(key, level - 1)
end

function YinHun(keys)
	local caster = keys.caster
	local attacker = keys.attacker
	local ability = keys.ability
	local ability_level = keys.ability:GetLevel()
	local channel_time = GetAbilityKV(keys.ability, "AbilityChannelTime") or 48
	local time_table = {
		[1] = 8,
		[2] = 16,
		[3] = 32,
		[4] = 48,
	}
	channel_time = time_table[ability_level] or 48

	local uu = CreateUnitByName("gemtd_yinhun", caster:GetAbsOrigin(), false, nil, nil, DOTA_TEAM_BADGUYS)
	uu.ftd = 2009

	-- uu:AddAbility("bane_fiends_grip")
	-- uu:FindAbilityByName("bane_fiends_grip"):SetLevel(ability_level)

	Timers:CreateTimer(0.05, function()
		uu.target_p = attacker:GetAbsOrigin() + Vector(RandomInt(-150, 150), RandomInt(-150, 150), 0)
		uu:MoveToPosition(uu.target_p)
		Timers:CreateTimer(0.1, function()
			if uu == nil or uu:IsNull() == true or uu:IsAlive() == false then
				return
			end

			if (uu:GetAbsOrigin() - uu.target_p):Length2D() < 16 then
				-- local newOrder = {
				-- 	UnitIndex = uu:entindex(),
				-- 	OrderType = DOTA_UNIT_ORDER_CAST_TARGET,
				-- 	TargetIndex = attacker:entindex(), --Optional.  Only used when targeting units
				-- 	AbilityIndex = uu:FindAbilityByName("bane_fiends_grip"):entindex(), --Optional.  Only used when casting abilities
				-- 	Position = nil, --Optional.  Only used when targeting the ground
				-- 	Queue = 0 --Optional.  Used for queueing up abilities
				-- }
				-- ExecuteOrderFromTable(newOrder)

				attacker:AddNewModifier(uu, ability, "modifier_bane_fiends_grip", { duration = channel_time })

				Timers:CreateTimer(channel_time + 2, function()
					FadeOutKill(uu)
				end)

				return
			end

			return 0.1
		end)
	end)
end

function FadeOutKill(u)
	local base_scale = u:GetModelScale()
	local a = 0.99
	Timers:CreateTimer(0.01, function()
		u:SetModelScale(base_scale * a)
		a = a - 0.01
		if a <= 0 then
			u:ForceKill(false)
			u:Destroy()
			return
		end
		return 0.01
	end)
end

function LetAllMvpTowerAoJiao()
	local all_units = FindUnitsInRadius(
		DOTA_TEAM_GOODGUYS,
		Vector(0, 0, 0),
		nil,
		9999,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_ANY_ORDER,
		false
	)
	if table.maxn(all_units) > 0 then
		for _, unit in pairs(all_units) do
			if
				unit:FindAbilityByName("tower_mvp1") ~= nil
				or unit:FindAbilityByName("tower_mvp2") ~= nil
				or unit:FindAbilityByName("tower_mvp3") ~= nil
				or unit:FindAbilityByName("tower_mvp4") ~= nil
				or unit:FindAbilityByName("tower_mvp5") ~= nil
				or unit:FindAbilityByName("tower_mvp6") ~= nil
				or unit:FindAbilityByName("tower_mvp7") ~= nil
				or unit:FindAbilityByName("tower_mvp8") ~= nil
				or unit:FindAbilityByName("tower_mvp9") ~= nil
				or unit:FindAbilityByName("tower_mvp10") ~= nil
				or unit:FindAbilityByName("tower_mvp") ~= nil
			then
				if unit == nil or unit:IsNull() == true or unit:IsAlive() == false then
					return
				end
				if
					unit:FindAbilityByName("tower_aojiao") == nil
					and unit:FindAbilityByName("tower_aojiao_word") == nil
				then
					unit:AddAbility("tower_aojiao_word")
					unit:FindAbilityByName("tower_aojiao_word"):SetLevel(PlayerResource:GetPlayerCount())
					prt(unit:GetUnitName() .. "|" .. '<font color="#ff8888">|text_start_aojiao|</font>')
				end
			end
		end
	end
end

function PrtLocalize(text)
	GemTD:OnPrtLocalize({
		text = text,
	})
end

function GemTD:OnPrtLocalize(keys)
	GameRules:SendCustomMessage("" .. keys.text, 0, 0)
end

function BaonuThink(keys)
	local caster = keys.caster
	local hp = caster:GetHealth()
	local hp_max = caster:GetMaxHealth()

	if caster:FindAbilityByName("enemy_momian") ~= nil then
		return
	end

	if hp / hp_max <= 0.1 and caster:FindAbilityByName("enemy_word_baonu_buff") == nil then
		caster:SetBaseMaxHealth(hp_max * 1.5)
		caster:SetMaxHealth(hp_max * 1.5)
		caster:SetRenderColor(128, 0, 0)
		caster.damage = math.floor(caster.damage * 1.5)
		caster:SetBaseDamageMin(caster.damage)
		caster:SetBaseDamageMax(caster.damage)
		caster:SetModelScale(caster:GetModelScale() * 1.5)
		EmitSoundOn("Hero_Beastmaster.Pick", caster)
		if caster:FindModifierByName("modifier_tower_jihan_buff") == nil then
			caster:SetHealth(hp * 1.5)
		end
		caster:AddAbility("enemy_word_baonu_buff")
		caster:FindAbilityByName("enemy_word_baonu_buff"):SetLevel(1)
	end
end

--使用玩具
function ItemRoshan(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	if caster == nil or player_id == nil then
		return
	end

	--音效特效弹幕
	EmitGlobalSound("DireTideGameStart.DireSide")
	play_particle(
		"particles/econ/items/riki/riki_head_ti8_gold/riki_smokebomb_ti8_gold_model.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		caster,
		3
	)
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_roshan",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = "item_roshan", hehe = RandomInt(1,100000)})

	SetHeroStoneStyle(caster, "roshan")
end
function ItemGreevil(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	if caster == nil or player_id == nil then
		return
	end

	--音效特效弹幕
	EmitGlobalSound("gemtd.item.greevil")
	play_particle(
		"particles/econ/items/riki/riki_head_ti8_gold/riki_smokebomb_ti8_gold_model.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		caster,
		3
	)
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_greevil",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = "item_greevil", hehe = RandomInt(1,100000)})

	SetHeroStoneStyle(caster, "greevil")
end
function ItemShell(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	if caster == nil or player_id == nil then
		return
	end

	--音效特效弹幕
	EmitGlobalSound("gemtd.item.shell")
	play_particle(
		"particles/econ/items/riki/riki_head_ti8_gold/riki_smokebomb_ti8_gold_model.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		caster,
		3
	)
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_shell",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = "item_shell", hehe = RandomInt(1,100000)})

	SetHeroStoneStyle(caster, "shell")
end
function ItemSnow(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	if caster == nil or player_id == nil then
		return
	end

	--音效特效弹幕
	EmitGlobalSound("gemtd.item.snow")
	play_particle(
		"particles/econ/items/riki/riki_head_ti8_gold/riki_smokebomb_ti8_gold_model.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		caster,
		3
	)
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_snow",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = "item_snow", hehe = RandomInt(1,100000)})

	SetHeroStoneStyle(caster, "snow")
end
function ItemBeach(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	if caster == nil or player_id == nil then
		return
	end

	--音效特效弹幕
	EmitGlobalSound("gemtd.item.beach")
	play_particle(
		"particles/econ/items/riki/riki_head_ti8_gold/riki_smokebomb_ti8_gold_model.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		caster,
		3
	)
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_beach",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = "item_beach", hehe = RandomInt(1,100000)})

	SetHeroStoneStyle(caster, "beach")
end
function ItemMushroom(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	if caster == nil or player_id == nil then
		return
	end

	--音效特效弹幕
	EmitGlobalSound("gemtd.item.mushroom")
	play_particle(
		"particles/econ/items/riki/riki_head_ti8_gold/riki_smokebomb_ti8_gold_model.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		caster,
		3
	)
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_mushroom",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = "item_mushroom", hehe = RandomInt(1,100000)})

	SetHeroStoneStyle(caster, "mushroom")
end

function WordJiLi(keys)
	local caster = keys.caster
	local all_units = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		caster:GetAbsOrigin(),
		nil,
		2000,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_CLOSEST,
		false
	)
	if table.maxn(all_units) > 0 then
		for _, luckydog in pairs(all_units) do
			if
				luckydog ~= nil
				and luckydog:IsNull() == false
				and luckydog:entindex() ~= caster:entindex()
				and luckydog:IsAlive() == true
			then
				local hp = luckydog:GetHealth()
				local hp_max = luckydog:GetMaxHealth()

				if hp_max > 500000000 then
					hp_max = 500000000
				end

				luckydog:SetBaseMaxHealth(hp_max * 1.3)
				luckydog:SetMaxHealth(hp_max * 1.3)
				luckydog:SetHealth(hp * 1.3)

				local damage = luckydog.damage * 1.3
				if damage > 100 then
					damage = 100
				end
				luckydog.damage = math.floor(damage)
				luckydog:SetBaseDamageMin(math.floor(luckydog.damage))
				luckydog:SetBaseDamageMax(math.floor(luckydog.damage))
				luckydog:SetModelScale(luckydog:GetModelScale() * 1.2)

				play_particle(
					"particles/econ/items/ogre_magi/ogre_ti8_immortal_weapon/ogre_ti8_immortal_bloodlust_buff_circle_outer_pulse.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					luckydog,
					2
				)
				EmitSoundOn("Rune.Bounty", luckydog)
				return
			end
		end
	end
end

function ItemHuaBingxie(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	local p = keys.target_entities[1]:GetAbsOrigin()
	--发弹幕
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_huabingxie",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_huabingxie', hehe = RandomInt(1,100000)})
end

function ItemQiongguidun(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	local p = keys.target_entities[1]:GetAbsOrigin()
	--发弹幕
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_qiongguidun",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_qiongguidun', hehe = RandomInt(1,100000)})
end

function ItemMoBang(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	local p = keys.target_entities[1]:GetAbsOrigin()
	--发弹幕
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_mobang",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_mobang', hehe = RandomInt(1,100000)})
end

function ItemMoshuhe(keys)
	local caster = keys.caster
	local player_id = caster:GetPlayerID()
	local p = keys.target_entities[1]:GetAbsOrigin()
	--发弹幕
	ShowCombat({
		t = "item",
		player = player_id,
		text = "item_moshuhe",
	})
	-- CustomNetTables:SetTableValue( "game_state", "bullet", {player_id = player_id, text = 'item_moshuhe', hehe = RandomInt(1,100000)})

	--随机一个还活着的unluckydog玩家
	local unluckydog = nil
	local try_times = 0
	while unluckydog == nil and try_times < 50 do
		local r = RandomInt(0, PlayerResource:GetPlayerCount() - 1)
		if _G.gem_castle_hp_race[r] > 0 and r ~= player_id then
			unluckydog = r
			break
		end
		try_times = try_times + 1
	end

	if unluckydog ~= nil then
		local hero = _G.playerid2hero[unluckydog]

		local info = {
			Target = hero,
			Source = caster,
			Ability = nil,
			EffectName = "particles/winter_fx/winter_present_projectile.vpcf",
			bDodgeable = false,
			iMoveSpeed = 1000,
			bProvidesVision = false,
			iVisionRadius = 0,
			iVisionTeamNumber = caster:GetTeamNumber(),
			iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
		}
		projectile = ProjectileManager:CreateTrackingProjectile(info)

		local delay_time = (hero:GetAbsOrigin() - caster:GetAbsOrigin()):Length2D() / 1000
		Timers:CreateTimer(delay_time, function()
			if _G.item_moshuhe[unluckydog] == nil then
				_G.item_moshuhe[unluckydog] = 0
			end
			_G.item_moshuhe[unluckydog] = _G.item_moshuhe[unluckydog] + 1
		end)
	end
end

--type = round_pve/round_pvp/combine/battle/say/notice
--text = 要显示的文字
--player = 玩家id
function ShowCombat(keys)
	local combat_type = keys.t
	local combat_text = keys.text
	local combat_num = keys.num
	local combat_player = keys.player
	local combat_player2 = keys.player2
	local gameEvent = {}

	if combat_player ~= nil then
		gameEvent["player_id"] = combat_player
	end
	if combat_player2 ~= nil then
		gameEvent["player_id2"] = combat_player2
	end
	if combat_text ~= nil then
		gameEvent["locstring_value"] = combat_text
	end
	if combat_num ~= nil then
		gameEvent["int_value"] = combat_num
	end
	gameEvent["teamnumber"] = -1
	gameEvent["message"] = "#text_combat_event_" .. combat_type
	FireGameEvent("dota_combat_event_message", gameEvent)
end

function ShowCrown(hero, crown_level)
	if crown_level == nil then
		crown_level = 1
	end
	if not IsUnitExist(hero) then
		return
	end
	if hero.crown_p ~= nil then
		ParticleManager:DestroyParticle(hero.crown_p, true)
	end
	if hero.is_crown ~= true then
		return
	end
	if crown_level == 1 then
		hero.crown_p = PlayParticleOnUnitUntilDeath({
			caster = hero,
			p = "effect/crown_s3/1.vpcf",
			pos = PATTACH_OVERHEAD_FOLLOW,
		})
	end
	if crown_level == 2 then
		hero.crown_p = PlayParticleOnUnitUntilDeath({
			caster = hero,
			p = "effect/crown_s3/2.vpcf",
			pos = PATTACH_OVERHEAD_FOLLOW,
		})
	end
end

function IsUnitExist(u)
	if u ~= nil and u:IsNull() == false and u:IsAlive() == true and u.is_removing ~= true then
		return true
	else
		return false
	end
end

function PlayParticleOnUnitUntilDeath(keys)
	local p = keys.p
	local u = keys.caster
	if u == nil then
		return
	end
	local pos = keys.pos or PATTACH_ABSORIGIN_FOLLOW
	local pp = ParticleManager:CreateParticle(p, pos, u)
	ParticleManager:SetParticleControlEnt(pp, 0, u, pos, nil, u:GetOrigin(), true)
	ParticleManager:SetParticleControlEnt(pp, 1, u, pos, nil, u:GetOrigin(), true)
	ParticleManager:SetParticleControlEnt(pp, 2, u, pos, nil, u:GetOrigin(), true)
	ParticleManager:SetParticleControlEnt(pp, 3, u, pos, nil, u:GetOrigin(), true)
	ParticleManager:SetParticleControlEnt(pp, 4, u, pos, nil, u:GetOrigin(), true)
	ParticleManager:SetParticleControlEnt(pp, 5, u, pos, nil, u:GetOrigin(), true)
	ParticleManager:SetParticleControlEnt(pp, 6, u, pos, nil, u:GetOrigin(), true)

	Timers:CreateTimer(0.1, function()
		if u == nil or u:IsNull() == true or u:IsAlive() == false then
			if pp ~= nil then
				ParticleManager:DestroyParticle(pp, true)
			end
			return
		end
		if pp == nil then
			return
		end
		return 0.1
	end)

	return pp
end

function PlayCombineSound(u)
	local level = u:GetLevel()
	if level == nil or level < 3 then
		level = 3
	end
	if level > 9 then
		level = 9
	end
	EmitSoundOn("dac.combine." .. level, u)
end

function CostGold(keys)
	local caster = keys.caster
	local player_id
	if keys.caster:GetOwner() == nil then
		player_id = keys.caster:GetPlayerID()
	else
		player_id = keys.caster:GetOwner():GetPlayerID()
	end

	local gold_cost = keys.gold_cost
	if player_id == nil or gold_cost == nil then
		return false
	end

	if GetMapName() == "gemtd_race" then
		--竞速模式
		if _G.team_gold_race[player_id] == nil then
			_G.team_gold_race[player_id] = 0
		end
		if _G.team_gold_race[player_id] < gold_cost then
			--金币不足
			CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(player_id), "mima", {
				text = "text_no_enough_gold",
			})
			keys.caster:Stop()
			return false
		end

		_G.team_gold_race[player_id] = math.floor(_G.team_gold_race[player_id] - gold_cost)
		PlayerResource:SetGold(player_id, _G.team_gold_race[player_id], true)

		if AMHC ~= nil then
			AMHC:CreateNumberEffect(caster, gold_cost, 3, AMHC.MSG_MISS, { 255, 255, 80 }, 9)
		end

		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(player_id),
			"show_money",
			{ money = _G.team_gold_race[player_id] }
		)
		return true
	end

	if GetMapName() == "gemtd_coop" or GetMapName() == "gemtd_1p" then
		--合作/单人模式
		if _G.team_gold == nil then
			_G.team_gold = 0
		end

		if _G.team_gold < gold_cost then
			--金币不足
			CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(player_id), "mima", {
				text = "text_no_enough_gold",
			})
			keys.caster:Stop()
			return false
		end

		_G.team_gold = math.floor(_G.team_gold - gold_cost)
		for i = 0, PlayerResource:GetPlayerCount() - 1 do
			PlayerResource:SetGold(i, _G.team_gold, true)
		end

		if AMHC ~= nil then
			AMHC:CreateNumberEffect(caster, gold_cost, 3, AMHC.MSG_MISS, { 255, 255, 80 }, 9)
		end

		CustomNetTables:SetTableValue(
			"game_state",
			"gem_team_gold",
			{ gold = _G.team_gold, hehe = RandomInt(1, 1000000) }
		)
		return true
	end
end

function GemTD:OnItemPurchased(keys)
	local curr_gold = PlayerResource:GetGold(keys.PlayerID)

	if curr_gold < _G.team_gold_race[keys.PlayerID] then
		_G.team_gold_race[keys.PlayerID] = curr_gold
	end
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(keys.PlayerID),
		"show_money",
		{ money = _G.team_gold_race[keys.PlayerID] }
	)
end

function build_maze(keys)
	local maze = _G.maze_coop1
	if GetMapName() == "gemtd_race" then
		maze = _G.maze_race1
	end

	for yy, r in pairs(maze) do
		for x, z in pairs(r) do
			if z == 1 then
				--网格化坐标
				y = 38 - yy

				local xxx = (x - 19) * 128
				local yyy = (y - 19) * 128

				if _G.gem_map[y][x] == 0 then
					_G.gem_map[y][x] = 1

					local p = Vector(xxx, yyy, 128)
					p.z = 1400
					local u2 = CreateUnitByName("gemtd_stone", p, false, nil, nil, DOTA_TEAM_GOODGUYS)
					u2.ftd = 2009
					u2:SetOwner(_G.gem_castle)
					ChangeStoneStyle(u2)
					u2:SetControllableByPlayer(0, true)
					u2:SetForwardVector(Vector(-1, 0, 0))

					u2:AddAbility("no_hp_bar")
					u2:FindAbilityByName("no_hp_bar"):SetLevel(1)
					u2:RemoveModifierByName("modifier_invulnerable")
					u2:SetHullRadius(1)
				end
			end
		end
	end
end

function NewXieTong(keys)
	local caster = keys.caster
	local friendUnits = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		caster:GetAbsOrigin(),
		nil,
		384,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_ANY_ORDER,
		false
	)
	local p = PlayerResource:GetPlayerCount()
	if GetMapName() == "gemtd_race" then
		p = 1
	end
	local level = table.maxn(friendUnits)
	if friendUnits ~= nil and level > 0 then
		if level > 8 then
			level = 8
		end
		AddAbilityAndSetLevel(caster, "enemy_word_xietong_buff_" .. p, level)
	else
		RemoveAbilityAndModifier(caster, "enemy_word_xietong_buff_" .. p)
	end
end

--通用方法之添加技能
function RemoveAbilityAndModifier(u, a)
	if u == nil or u:IsNull() == true then
		return
	end
	if u:FindAbilityByName(a) ~= nil then
		u:RemoveAbility(a)
		u:RemoveModifierByName("modifier_" .. a)
	end
end

function GaussRandom()
	local ranbase = 9999
	while ranbase > 4 or ranbase < -4 do
		local u = RandomInt(1, 10000) / 10000
		local v = RandomInt(1, 10000) / 10000
		ranbase = math.sqrt(-2 * math.log(u)) * math.cos(2 * math.pi * v)
	end
	local ranresult = math.ceil(ranbase * 128 + 512)

	if ranresult < 30 then
		ranresult = 30
	end

	return ranresult
end

function JiHan(keys)
	local ability = keys.ability
	local duration = keys.duration or 10
	local radius = keys.radius or 800
	local caster = keys.caster
	play_particle("particles/econ/events/ti7/shivas_guard_active_ti7.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster, 5)
	EmitSoundOn("DOTA_Item.ShivasGuard.Activate", caster)

	-- local units = FindUnitsInRadiusByTeam({
	-- 	team = caster:GetTeam(),
	-- 	role = 2,
	-- 	radius = radius,
	-- 	position = caster:GetAbsOrigin()
	-- })

	local units = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		caster:GetAbsOrigin(),
		nil,
		radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_ANY_ORDER,
		false
	)

	for _, unluckydog in pairs(units) do
		if unluckydog:GetUnitName() ~= "gemtd_stone" then
			local delay = 1.0 * (unluckydog:GetAbsOrigin() - caster:GetAbsOrigin()):Length2D() / 350
			ItemJiHanOne(delay, keys.caster, unluckydog, ability, duration)
		end
	end
end
function ItemJiHanOne(delay, caster, unluckydog, ability, duration)
	Timers:CreateTimer(delay, function()
		ability:ApplyDataDrivenModifier(
			unluckydog,
			unluckydog,
			"modifier_enemy_word_jihan_debuff",
			{ duration = duration }
		)
		-- InvisibleUnitCast({
		-- 	caster = caster,
		-- 	ability = 'let_jihan',
		-- 	level = ability:GetLevel(),
		-- 	unluckydog = unluckydog,
		-- })
	end)
end
--高级选取单位，适应所有team
function FindUnitsInRadiusByTeam(keys)
	local team = keys.team
	local role = keys.role or 1 --1=队友,2=敌人,3=全部
	local radius = keys.radius or 500
	local position = keys.position or Vector(0, 0, 0)
	local units = {}

	local all_units = FindUnitsInRadius(
		DOTA_TEAM_BADGUYS,
		Vector(0, 0, 0),
		nil,
		9999,
		DOTA_UNIT_TARGET_TEAM_BOTH, --用BOTH可以选到所有team的单位
		DOTA_UNIT_TARGET_NONE,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_ANY_ORDER,
		false
	)

	for u, v in pairs(all_units) do
		if (v:GetAbsOrigin() - position):Length2D() <= radius then
			if role == 1 and v:GetTeam() == team then
				table.insert(units, v)
			end
			if role == 2 and v:GetTeam() ~= team then
				table.insert(units, v)
			end
			if role == 3 then
				table.insert(units, v)
			end
		end
	end

	return units
end

function GemTD:DamageFilter(keys)
	if keys.entindex_victim_const == nil then
		return
	end
	if keys.damage == nil or keys.damage <= 0 then
		return
	end
	local v = EntIndexToHScript(keys.entindex_victim_const)
	local a = EntIndexToHScript(keys.entindex_attacker_const or keys.entindex_victim_const)
	local t = keys.damagetype_const

	if a.father ~= nil then
		a = a.father
	end

	if v:IsHero() then
		return
	end

	if IsUnitExist(a) == false or a:GetUnitName() == "gemtd_feicuimoxiang_yinxing" then
		return
	end

	if IsUnitExist(v) and v:HasModifier("modifier_enemy_word_guwu_buff") then
		keys.damage = keys.damage / 2
	end

	if t == DAMAGE_TYPE_PHYSICAL and v:HasModifier("modifier_medusa_stone_gaze_stone") then
		keys.damage = keys.damage * 2.0
	end

	local damage_bonus = 0
	if IsUnitExist(a) then
		--MVP的伤害加成
		if a:HasModifier("modifier_mvp1") then
			damage_bonus = damage_bonus + 10
		end
		if a:HasModifier("modifier_mvp2") then
			damage_bonus = damage_bonus + 20
		end
		if a:HasModifier("modifier_mvp3") then
			damage_bonus = damage_bonus + 30
		end
		if a:HasModifier("modifier_mvp4") then
			damage_bonus = damage_bonus + 40
		end
		if a:HasModifier("modifier_mvp5") then
			damage_bonus = damage_bonus + 50
		end
		if a:HasModifier("modifier_mvp6") then
			damage_bonus = damage_bonus + 60
		end
		if a:HasModifier("modifier_mvp7") then
			damage_bonus = damage_bonus + 70
		end
		if a:HasModifier("modifier_mvp8") then
			damage_bonus = damage_bonus + 80
		end
		if a:HasModifier("modifier_mvp9") then
			damage_bonus = damage_bonus + 90
		end
		if a:HasModifier("modifier_mvp10") then
			damage_bonus = damage_bonus + 100
		end
		if a:HasModifier("modifier_mvp_aura_friend") then
			local modifier_table = a:FindAllModifiersByName("modifier_mvp_aura_friend")
			if modifier_table ~= nil and table.maxn(modifier_table) > 0 then
				damage_bonus = damage_bonus + (100 * table.maxn(modifier_table))
			end
		end

		if damage_bonus >= 500 then
			damage_bonus = 500
		end
	end

	if damage_bonus and damage_bonus > 0 then
		keys.damage = math.floor(keys.damage * (100 + damage_bonus) / 100)
	end

	if _G.show_damage == true and damage_bonus > 0 then
		if t == DAMAGE_TYPE_MAGICAL then
			AMHC:CreateNumberEffect(v, keys.damage, 3, AMHC.MSG_DAMAGE, { 128, 0, 255 }, 9)
		elseif t == DAMAGE_TYPE_PHYSICAL then
			AMHC:CreateNumberEffect(v, keys.damage, 3, AMHC.MSG_DAMAGE, { 255, 0, 0 }, 9)
		elseif t == DAMAGE_TYPE_PURE then
			AMHC:CreateNumberEffect(v, keys.damage, 3, AMHC.MSG_DAMAGE, { 255, 255, 255 }, 9)
		end
	end

	-- PrintKeys(keys)
	-- print('damage_filter:'..math.floor(keys.damage))

	DamageStat(a, v, keys.damage)

	return true
end

function PrintKeys(keys)
	print("----PrintKeys----")
	for i, _ in pairs(keys) do
		print(i)
	end
end

function RemoveOneKeyInTable(tbl, key)
	local max = table.maxn(tbl)
	for i = max, 1, -1 do
		if key == tbl[i] then
			table.remove(tbl, i)
			break
		end
	end
end

function AddDamageStat(attacker_id, damage)
	if damage == nil or damage <= 0 then
		return
	end
	damage = math.ceil(damage)
	local curr_damage = _G.damage[attacker_id]
	if curr_damage == nil then
		curr_damage = 0
	end
	curr_damage = curr_damage + damage
	_G.damage[attacker_id] = curr_damage
	return curr_damage
end

function RemoveDamageStat(attacker_id)
	local curr_damage = _G.damage[attacker_id]
	if curr_damage == nil then
		return 0
	end
	_G.damage[attacker_id] = nil
	return curr_damage
end

function GetDamageStat(attacker_id)
	local curr_damage = _G.damage[attacker_id]
	if curr_damage == nil then
		curr_damage = 0
	end
	return curr_damage
end

function DamageStat(attacker, victim, damage)
	if attacker == nil or attacker:GetOwner() == nil then
		return
	end

	if damage == nil or damage <= 0 then
		return
	end
	damage = math.ceil(damage)

	--伤害统计
	local attacker_id = attacker:GetEntityIndex()

	-- if not IsTower(attacker:GetUnitName()) then
	-- 	return
	-- end
	-- if attacker.father ~= nil then
	-- 	attacker_id = attacker.father:GetEntityIndex()
	-- end

	if GetMapName() == "gemtd_1p" or GetMapName() == "gemtd_coop" then
		AddDamageStat(attacker_id, damage)

		local g_time = GameRules:GetGameTime() - _G.game_time
		if _G.last_g_time == nil then
			_G.last_g_time = 0
		end
		if _G.stop_watch == nil then
			_G.stop_watch = GameRules:GetGameTime()
		end
		local time_this_level = math.floor(GameRules:GetGameTime() - _G.stop_watch)
		if g_time - _G.last_g_time > 1 then
			_G.last_g_time = g_time
			CustomNetTables:SetTableValue(
				"game_state",
				"damage_stat",
				{
					level = _G.level,
					damage_table = _G.damage,
					time_this_level = time_this_level,
					hehe = RandomInt(1, 100000),
				}
			)
		end
	elseif GetMapName() == "gemtd_race" then
		local player_id = attacker:GetOwner():GetPlayerID()
		-- if attacker.father ~= nil then
		-- 	player_id = attacker.father:GetOwner():GetPlayerID()
		-- end
		local curr_damage = _G.damage_race[player_id][attacker_id]
		if curr_damage == nil then
			curr_damage = 0
		end
		curr_damage = curr_damage + damage
		_G.damage_race[player_id][attacker_id] = curr_damage

		local g_time = GameRules:GetGameTime() - (_G.game_time or 0)
		if GameRules:GetGameModeEntity()["last_g_time" .. player_id] == nil then
			GameRules:GetGameModeEntity()["last_g_time" .. player_id] = 0
		end
		if _G.stop_watch == nil then
			_G.stop_watch = GameRules:GetGameTime()
		end
		local time_this_level = math.floor(GameRules:GetGameTime() - _G.stop_watch)
		if g_time - GameRules:GetGameModeEntity()["last_g_time" .. player_id] > 1 then
			GameRules:GetGameModeEntity()["last_g_time" .. player_id] = g_time
			CustomNetTables:SetTableValue(
				"game_state",
				"damage_stat_race",
				{
					level = _G.level,
					damage_table = _G.damage_race,
					time_this_level = time_this_level,
					hehe = RandomInt(1, 100000),
				}
			)
		end
	end
end

function UpdateMVP(keys)
	-- for i,v in pairs(keys) do
	-- 	print(i)
	-- 	-- if v ~= nil and GetUnitName(v) then
	-- 	-- 	print(GetUnitName(v))
	-- 	-- end
	-- end
	-- print(GetUnitName(keys.caster))
	-- print(GetUnitName(keys.target))

	local caster = keys.target
	local mvp_level = 0
	if IsUnitExist(caster) then
		if caster:HasModifier("modifier_mvp1") then
			mvp_level = mvp_level + 1
		end
		if caster:HasModifier("modifier_mvp2") then
			mvp_level = mvp_level + 2
		end
		if caster:HasModifier("modifier_mvp3") then
			mvp_level = mvp_level + 3
		end
		if caster:HasModifier("modifier_mvp4") then
			mvp_level = mvp_level + 4
		end
		if caster:HasModifier("modifier_mvp5") then
			mvp_level = mvp_level + 5
		end
		if caster:HasModifier("modifier_mvp6") then
			mvp_level = mvp_level + 6
		end
		if caster:HasModifier("modifier_mvp7") then
			mvp_level = mvp_level + 7
		end
		if caster:HasModifier("modifier_mvp8") then
			mvp_level = mvp_level + 8
		end
		if caster:HasModifier("modifier_mvp9") then
			mvp_level = mvp_level + 9
		end
		if caster:HasModifier("modifier_mvp10") then
			mvp_level = mvp_level + 10
		end
		if caster:HasModifier("modifier_mvp_aura_friend") then
			local modifier_table = caster:FindAllModifiersByName("modifier_mvp_aura_friend")
			if modifier_table ~= nil and table.maxn(modifier_table) > 0 then
				mvp_level = mvp_level + (10 * table.maxn(modifier_table))
			end
		end
		-- RemoveAbilityAndModifier(caster,"tower_mvp_show")
		-- caster:RemoveModifierByName("modifier_tower_mvp_cd")

		-- local modifier_table = caster:FindAllModifiersByName("modifier_tower_mvp_cd")
		-- for _,m in pairs(modifier_table) do
		-- 	m:Destroy()
		-- end

		if mvp_level <= 0 then
			return
		end

		local c = _G.gem_castle
		if GetMapName() == "gemtd_race" then
			c = _G.gem_castle_race[caster:GetOwner():GetPlayerID()]
		end

		AddAbilityAndSetLevel(c, "tower_mvp_show", mvp_level)
		-- for i=1,mvp_level do
		-- 	caster:FindAbilityByName("tower_mvp_show"):ApplyDataDrivenModifier(caster,caster,'modifier_tower_mvp_cd',{ })
		-- end
		c:FindAbilityByName("tower_mvp_show"):ApplyDataDrivenModifier(caster, caster, "modifier_tower_mvp_show", {})
		caster:FindModifierByName("modifier_tower_mvp_show"):SetStackCount(mvp_level)
	end
end

function GemTD:HealingFilter(keys)
	local t = EntIndexToHScript(keys.entindex_target_const)
	local h = keys.heal

	local heal_bonus = 0

	return true
end

function GemTD:ExecuteOrderFilter(keys)
	-- prt('----------------')
	-- for u,v in pairs(keys) do
	-- 	prt(u)
	-- end
	return true
end

function TicketNight(keys)
	local caster = keys.caster
	if GetMapName() == "gemtd_race" then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_in_racemode",
		})
		return
	end
	if _G.is_game_really_started == true then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_now",
		})
		return
	end
	if _G.is_ticket_night == true then
		return
	end
	if _G.gem_map == nil then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_cannot_use_now",
		})
		return
	end
	--通知pui弹出确认框
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(caster:GetPlayerID()),
		"show_use_night_ticket",
		{ player_id = caster:GetPlayerID() }
	)
end

function GemTD:OnConfirmUseNightTicket(keys)
	local caster = _G.playerid2hero[keys.player_id]

	if caster.steam_id == nil then
		prt("FAILED: NO STEAM ID.")
		return
	end
	--通知服务器，门票被用了
	local url = "http://gemtd.ppbizon.com/gemtd/quest/begin/@"
		.. caster.steam_id
		.. "@q398?hehe="
		.. RandomInt(1, 10000)
	local req = CreateHTTPRequestScriptVM("GET", url)
	req:SetHTTPRequestAbsoluteTimeoutMS(20000)
	req:Send(function(result)
		local object = json.decode(result["Body"])

		if object == nil or object["err"] == nil or object["err"] ~= 0 then
			GameRules:SendCustomMessage("Connect Server ERROR: " .. object["err"], 0, 0)
			return
		end

		_G.is_ticket_night = true
		SetQuest("q398", true)
		_G.quest["q398"] = false
		show_quest()
		--移除物品
		for slot = 0, 8 do
			if
				caster:GetItemInSlot(slot) ~= nil
				and caster:GetItemInSlot(slot):GetAbilityName() == "item_ticket_night"
			then
				caster:RemoveItem(caster:GetItemInSlot(slot))
			end
		end

		local p = PlayerResource:GetPlayerCount()
		local x = RandomInt(16 - 2 * p, 22 + 2 * p)
		local y = RandomInt(16 - 2 * p, 22 + 2 * p)
		BuildAStreetLight(x, y)
		prt("#text_start_tips_night_ticket")

		EmitGlobalSound("night.begin")
		Timers:CreateTimer(3, function()
			EmitGlobalSound("night.wolf")
		end)
		play_particle(
			"particles/units/heroes/hero_night_stalker/nightstalker_ulti.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			caster,
			3
		)

		for i = 0, 3 do
			if _G.gem_hero[i] ~= nil then
				local h = _G.gem_hero[i]

				AddAbilityAndSetLevel(h, "anye_debuff")
			end
		end
	end)
end

function AnyeBuff(keys)
	local caster = keys.caster
	if caster ~= nil and _G.gem_hero[0] ~= nil and caster:FindAbilityByName("enemy_word_anye") ~= nil then
		local h = _G.gem_hero[0]
		if not h:CanEntityBeSeenByMyTeam(caster) then
			if not caster:HasModifier("modifier_enemy_word_heiye_buff") then
				caster
					:FindAbilityByName("enemy_word_anye")
					:ApplyDataDrivenModifier(caster, caster, "modifier_enemy_word_heiye_buff", {})
			end
		else
			if caster:HasModifier("modifier_enemy_word_heiye_buff") then
				caster:RemoveModifierByName("modifier_enemy_word_heiye_buff")
			end
		end
	end
end

-- function ShowAbility(keys)
-- 	local target = keys.target
-- 	if target == nil then
-- 		return
-- 	end
-- 	prt(target:GetUnitName())
-- 	for i=0,23 do
-- 		if target:GetAbilityByIndex(i) ~= nil then
-- 			prt(i..'-->'..target:GetAbilityByIndex(i):GetAbilityName())
-- 		end
-- 	end
-- end

function StatEnemyCountAndShow()
	local enemy_count = 0

	if _G.enemy_table ~= nil and table.maxn(_G.enemy_table) >= 0 then
		for k, u in pairs(_G.enemy_table) do
			if IsUnitExist(u) == true then
				enemy_count = enemy_count + 1
			end
		end
	end

	CustomGameEventManager:Send_ServerToAllClients("show_enemy_count", {
		count = enemy_count,
		hehe = RandomFloat(0, 100),
	})

	return enemy_count
end

function EndRoundIfNoEnemyAlive()
	--判断是不是怪死光了
	if _G.game_status == 2 then
		_G.guai_live_count = StatEnemyCountAndShow()
		if _G.guai_live_count <= 0 and _G.gem_is_shuaguaiing == false then
			--过关了
			_G.game_status = 1

			_G.enemy_table = {}
			CustomGameEventManager:Send_ServerToAllClients("show_enemy_count", {
				count = 0,
				hehe = RandomFloat(0, 100),
			})

			Timers:CreateTimer(1, function()
				--统计过关时间，计算怪数量的增加
				local time_this_level = math.floor(GameRules:GetGameTime() - _G.stop_watch)

				CustomNetTables:SetTableValue(
					"game_state",
					"damage_stat",
					{
						level = _G.level,
						damage_table = _G.damage,
						time_this_level = time_this_level,
						hehe = RandomInt(1, 100000),
					}
				)

				if _G.level == 50 then
					GameRules:SendCustomMessage("#text_enemy_is_stonger2", 0, 0)
					ShowCenterMessage("youwin", 5)
					EmitGlobalSound("crowd.lv_03")

					Timers:CreateTimer(10, function()
						--傲娇词缀，全场mvp塔都获得傲娇
						if _G.word_object["name"] == "aojiao" then
							LetAllMvpTowerAoJiao()
						end
						--暗夜词缀，失去视野
						if _G.word_object["name"] == "anye" then
							EmitGlobalSound("night.begin")
							Timers:CreateTimer(3, function()
								EmitGlobalSound("night.wolf")
							end)

							for i = 0, 3 do
								if _G.gem_hero[i] ~= nil then
									local h = _G.gem_hero[i]
									AddAbilityAndSetLevel(h, "anye_debuff")
									play_particle(
										"particles/units/heroes/hero_night_stalker/nightstalker_ulti.vpcf",
										PATTACH_ABSORIGIN_FOLLOW,
										h,
										3
									)
								end
							end
						end
					end)

					Timers:CreateTimer(5, function()
						GameRules:SendCustomMessage("#text_enemy_is_stonger3", 0, 0)
						--EmitGlobalSound("diretide_eventstart_Stinger")
						EmitGlobalSound("diretide_sugarrush_Stinger")

						Timers:CreateTimer(5, function()
							_G.level = _G.level + 1
							UpdateGuaiLevel()
							PlayerResource:IncrementAssists(0, 1)
							PlayerResource:IncrementAssists(1, 1)
							PlayerResource:IncrementAssists(2, 1)
							PlayerResource:IncrementAssists(3, 1)

							_G.guai_count = 10
							_G.game_status = 1
							start_build()
							return nil
						end)
					end)
				else
					if _G.level % 10 == 0 then
						GameRules:SendCustomMessage("#text_enemy_is_stonger", 0, 0)
					end
					Timers:CreateTimer(0.1, function()
						_G.level = _G.level + 1
						UpdateGuaiLevel()
						PlayerResource:IncrementAssists(0, 1)
						PlayerResource:IncrementAssists(1, 1)
						PlayerResource:IncrementAssists(2, 1)
						PlayerResource:IncrementAssists(3, 1)
						_G.guai_count = 10
						_G.game_status = 1
						start_build()
						return nil
					end)
				end

				--评选mvp
				if _G.level <= 50 then
					--统计本关mvp
					local mvp_tower_id = 0
					local mvp_tower_damage = 0
					for mvp_i, mvp_v in pairs(_G.damage) do
						if mvp_i ~= nil and mvp_v ~= nil and type(mvp_v) == "number" and type(mvp_i) == "number" then
							local u = EntIndexToHScript(mvp_i)
							if IsUnitExist(u) and IsTower(u:GetUnitName()) then
								if u.level == nil then
									u.level = 0
								end
								if mvp_v > mvp_tower_damage and u:HasAbility("tower_mvp10") == false then
									mvp_tower_id = mvp_i
									mvp_tower_damage = mvp_v
								end
							end
						end
					end
					if mvp_tower_id > 0 then
						local mvp_tower = EntIndexToHScript(mvp_tower_id)
						if IsUnitExist(mvp_tower) then
							play_particle(
								"particles/events/ti6_teams/teleport_start_ti6_lvl3_mvp_phoenix.vpcf",
								PATTACH_ABSORIGIN_FOLLOW,
								mvp_tower,
								5
							)
							RemindSelect({
								caster = mvp_tower,
								big_duration = 4.5,
							})

							EmitGlobalSound("crowd.lv_01")

							CustomNetTables:SetTableValue(
								"game_state",
								"victory_condition",
								{ kills_to_win = _G.level, enemy_show = mvp_tower:GetUnitName() }
							)

							level_up(mvp_tower, 1)
						end
					end
				end

				_G.damage = {}
				_G.perfect_this_level = true
			end)
		end
	end
end

function AddStat(key, count, player_id)
	if GetMapName() == "gemtd_race" then
		--竞速模式
		if _G.stat_table_race[player_id] == nil then
			_G.stat_table_race[player_id] = {}
		end
		if _G.stat_table_race[player_id][key] == nil then
			_G.stat_table_race[player_id][key] = 0
		end
		_G.stat_table_race[player_id][key] = _G.stat_table_race[player_id][key] + (count or 1)
		return _G.stat_table_race[player_id][key]
	else
		--合作模式
		if _G.stat_table[key] == nil then
			_G.stat_table[key] = 0
		end
		_G.stat_table[key] = _G.stat_table[key] + (count or 1)
		return _G.stat_table[key]
	end
end
function GetStat(key, player_id)
	if GetMapName() == "gemtd_race" then
		--竞速模式
		if _G.stat_table_race[player_id][key] == nil then
			_G.stat_table_race[player_id][key] = 0
		end
		return _G.stat_table_race[player_id][key]
	else
		--合作模式
		if _G.stat_table[key] == nil then
			_G.stat_table[key] = 0
		end
		return _G.stat_table[key]
	end
end
function UpdateKillStat()
	if GetMapName() == "gemtd_race" then
		for i = 0, 3 do
			if _G.stat_table_race[i] == nil then
				_G.stat_table_race[i] = {}
			end
			CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(i), "show_kill_stat", {
				kill = _G.stat_table_race[i]["kill"] or 0,
				unkill = _G.stat_table_race[i]["unkill"] or 0,
				hehe = RandomFloat(0, 100),
			})
		end
	else
		CustomGameEventManager:Send_ServerToAllClients("show_kill_stat", {
			kill = _G.stat_table["kill"] or 0,
			unkill = _G.stat_table["unkill"] or 0,
			hehe = RandomFloat(0, 100),
		})
	end
end

function GemTD:_GoldDropConsoleCommand(cmdName, goldToDrop)
	local newItem = CreateItem("item_bag_of_gold", nil, nil)
	newItem:SetPurchaseTime(0)
	if goldToDrop == nil then
		goldToDrop = 100
	end
	newItem:SetCurrentCharges(goldToDrop)
	local spawnPoint = Vector(0, 0, 0)
	local heroEnt = PlayerResource:GetSelectedHeroEntity(0)
	if heroEnt ~= nil then
		spawnPoint = heroEnt:GetAbsOrigin()
	end
	local drop = CreateItemOnPositionSync(spawnPoint, newItem)
	newItem:LaunchLoot(true, 300, 0.75, spawnPoint + RandomVector(RandomFloat(50, 350)))
end

function fall(caster)
	-- prt(caster:GetUnitName())
	-- caster:AddNewModifier(caster,nil,"modifier_fall",{})
end

--寻路
function FindEnemyPath()
	local guai_name = _G.guai[_G.guai_level or 1]
	if string.find(guai_name, "fly") then
		find_all_path_fly()
	else
		find_all_path()
	end
end
function IsTower(unit_name)
	if unit_name == nil then
		return false
	end
	if unit_name == "gemtd_zhenjiazhishi" then
		return true
	end
	for i, v in pairs(_G.gemtd_merge) do
		if i == unit_name then
			return true
		else
			for _, vv in pairs(v) do
				if vv == unit_name then
					return true
				end
			end
		end
	end
	for i, v in pairs(_G.gemtd_merge_secret) do
		if i == unit_name then
			return true
		else
			for _, vv in pairs(v) do
				if vv == unit_name then
					return true
				end
			end
		end
	end
	return false
end

function UpdateGuaiLevel()
	if _G.level > 50 then
		_G.guai_level = _G.level - 50
	else
		_G.guai_level = _G.level
	end
	return _G.guai_level
end

function GetSendKey()
	return "&key="
		.. GetDedicatedServerKey("drodo")
		.. "&key2="
		.. GetDedicatedServerKeyV2("zzwdjs")
		.. "&key3="
		.. GetDedicatedServerKeyV2("xgnb")
		.. "&key4="
		.. GetDedicatedServerKeyV2("fgnb")
		.. "&key5="
		.. GetDedicatedServerKeyV2("bsl,bgbxh")
end

function GemTD:OnPlayerStartTeamSelect(keys)
	-- if _G.online_player_count >= PlayerResource:GetPlayerCount() and _G.is_heros_get_sended == nil then
	-- 	--所有玩家都连入游戏了，访问服务器获取玩家信息！
	-- 	_G.is_heros_get_sended = true

	_G.pcount = PlayerResource:GetPlayerCount() .. "p"
	if GetMapName() == "gemtd_race" then
		_G.pcount = "race"
	end

	local player_steamid_table = {}
	for i = 0, PlayerResource:GetPlayerCount() - 1 do
		table.insert(player_steamid_table, tostring(PlayerResource:GetSteamID(i)))
	end
	_G.steam_ids_only = JoinTableString(player_steamid_table)

	--http://gemtd.ppbizon.com/gemtd/201901/heros/get/@76561198090931971,76561198101849234,?ver=v1&compen_shell=2&hehe=

	local url = "http://gemtd.ppbizon.com/gemtd/202203/heros/get/@"
		.. _G.steam_ids_only
		.. "?ver=v1&compen_shell=2&pcount="
		.. _G.pcount
		.. "&award=true"
	url = url .. GetSendKey()

	local req = CreateHTTPRequestScriptVM("GET", url)
	req:SetHTTPRequestAbsoluteTimeoutMS(20000)

	req:Send(function(res)
		if res.StatusCode ~= 200 or not res.Body then
			print("GET HERO LIST FAILED!")
			return
		end

		local t = json.decode(res.Body)

		if t ~= nil and t.err == 0 then
			print("Connecting server OK")

			GameRules:SendCustomMessage("Connecting server OK", 0, 0)

			_G.heros_get_obj = t

			for steamid, player_info in pairs(t.data) do
				-- DeepPrintTable(t.data[steamid])
				print("放入玩家信息：" .. "player_info_" .. steamid)
				CustomNetTables:SetTableValue("player_info_table", "player_info_" .. steamid, t.data[steamid])

				--初始化随机任务
				if player_info.quest.quest ~= nil and player_info.quest.quest_expire == -2 then
					_G.quest[player_info.quest.quest] = _G.quest_status[player_info.quest.quest]
					if string.find(player_info.quest.quest, "q111") then
						_G.quest[player_info.quest.quest] = false
						_G.quest_status[player_info.quest.quest] = false
					end
				end
			end

			if t["word_object"] ~= nil then
				_G.word_object = t["word_object"]
			end

			-- CustomGameEventManager:Send_ServerToAllClients("set_all_courier_list",{
			-- 	key = GetClientKey(team_i),
			-- 	hehe = RandomInt(1,100000),
			-- 	all_courier_list = t.all_courier_list,
			-- })
		else
			if t ~= nil and t["err"] == 1200 and t["msg"] == "blocked" then
				prt("#text_black")
				GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
				return
			end

			if t ~= nil and t["err"] == nil and t["err"] ~= 0 then
				prt("Connect Server ERROR: " .. t["err"])
				GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
				return
			end
			if t ~= nil and t["err"] == nil then
				print("Connect Server ERROR: " .. t.err)
			else
				print("Connect Server ERROR: nil")
			end
		end
	end)
	-- end
end

function GemTD:OnPlayerRequestChooseHero(keys)
	-- print('OnPlayerRequestChooseHero, playerid='..keys.PlayerID..', hero='..keys.hero)
	local player_id = keys.PlayerID
	local steamid = tostring(PlayerResource:GetSteamID(player_id))

	local player_info_table = CustomNetTables:GetTableValue("player_info_table", "player_info_" .. steamid)

	local onduty_hero_info = player_info_table["hero_sea"][keys.hero]
	onduty_hero_info["hero_id"] = keys.hero

	player_info_table["onduty_hero"] = onduty_hero_info
	_G.choose_hero_info[player_id] = onduty_hero_info

	CustomGameEventManager:Send_ServerToAllClients("player_choose_hero", {
		player_id = player_id,
		onduty_hero_info = onduty_hero_info,
	})
end

function StartGame()
	_G.kuangbao_time = PlayerResource:GetPlayerCount() * 120 + 60
	_G.win_streak_time = _G.kuangbao_time / 2
	_G.START_TIME = GameRules:GetGameTime()

	show_quest()
	_G.is_lobster_ok = true
	if _G.myself ~= true then
		GameRules:GetGameModeEntity():SetThink("DetectCheatsThinker")
	end

	CustomNetTables:SetTableValue(
		"game_state",
		"victory_condition",
		{ kills_to_win = _G.level, enemy_show = "gemtd_stone" }
	)

	if GetMapName() == "gemtd_race" then
		CustomNetTables:SetTableValue("game_state", "disable_all_repick", { hehe = RandomInt(1, 10000) })
	end

	-- 使用
	-- if IsPlayerHost(0) then
	-- 	-- 房主执行逻辑
	-- 	prt('IS HOST!!!')
	-- end

	Timers:CreateTimer(1, function()
		local is_all_precache_finished = true
		for i = 0, PlayerResource:GetPlayerCount() - 1 do
			if _G.is_precache_finished[i] == false then
				is_all_precache_finished = false
			end
		end
		if is_all_precache_finished == true then
			GameRules:SendCustomMessage("GAME START", 0, 0)

			_G.is_server_game_started = true

			if GetMapName() == "gemtd_coop" then
				for i = 0, 3 do
					for j = 0, 3 do
						PlayerResource:SetUnitShareMaskForPlayer(i, j, 1, true)
						PlayerResource:SetUnitShareMaskForPlayer(i, j, 2, true)
					end
				end
				prt("SHARED CONTRL ENABLED.")
			end

			CustomGameEventManager:Send_ServerToAllClients("show_words", {
				name = _G.word_object["name"],
				expire = _G.word_object["expire"],
				word_next = _G.word_object["word_next"],
				hehe = RandomInt(1, 10000),
			})

			_G.game_time = GameRules:GetGameTime()
			_G.game_status = 1
			start_build()
			return
		end
		return 1
	end)
end

--游戏流程1——玩家选择英雄
function GemTD:OnPlayerPickHero(keys)
	local player = EntIndexToHScript(keys.player)
	local hero = EntIndexToHScript(keys.heroindex)
	hero.ftd = 2009

	if hero:GetUnitName() ~= "npc_dota_hero_riki" then
		print("---" .. hero:GetPlayerID() .. "---" .. hero:GetUnitName())
		_G.gem_hero[hero:GetPlayerID()] = hero
		return
	end
	SetHeroLevelShow(hero)

	-- if _G.replced[id] == true then
	-- 	return
	-- end

	for slot = 0, 8 do
		if hero:GetItemInSlot(slot) ~= nil then
			hero:RemoveItem(hero:GetItemInSlot(slot))
		end
	end

	--清空占位技能
	for i = 0, 23 do
		if hero:GetAbilityByIndex(i) ~= nil then
			hero:RemoveAbility(hero:GetAbilityByIndex(i):GetAbilityName())
		end
	end

	--将所有玩家的英雄存到一个数组
	local heroindex = keys.heroindex
	_G.hero[heroindex] = hero
	if hero:GetUnitName() == "npc_dota_hero_riki" then
		local pp = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_chen/chen_teleport.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			hero
		)
		hero.pp = pp
	end

	local player_id = hero:GetPlayerID()
	local steamid = tostring(PlayerResource:GetSteamID(player_id))
	local v = CustomNetTables:GetTableValue("player_info_table", "player_info_" .. steamid)

	if v == nil then
		GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
		return
	end

	GemTD:OnReceiveHeroInfo({
		heroindex = heroindex,
		is_test_user = v["is_test_user"],
		steam_id = steamid,
		hero_sea = v["hero_sea"],
		onduty_hero = _G.choose_hero_info[player_id] or v["onduty_hero"],
		is_black = v["is_black"],
		pet = v["pet"],
		pet2 = v["pet2"],
		pet3 = v["pet3"],
		my_maze = v["my_maze"],
		pcount = _G.pcount,
		quest = v["quest"],
		extend_tool = v["extend_tool"],
		items = v["items"],
		is_crown = v["is_crown"],
	})

	--判断是否所有的人都已经选择结束
	local playercount = 0
	for i, vi in pairs(_G.hero) do
		playercount = playercount + 1
	end

	if playercount == PlayerResource:GetPlayerCount() then
		Timers:CreateTimer(1, function()
			-- EmitGlobalSound("announcer_diretide_2012_announcer_welcome_0"..RandomInt(3,5))
			CustomNetTables:SetTableValue("game_state", "startgame", {
				map_name = GetMapName(),
				p = PlayerResource:GetPlayerCount(),
				hehe = RandomInt(1, 10000),
			})

			StartGame()
		end)
	end
end

--游戏流程3——游戏开始前的准备
function GemTD:OnLobster2(t)
	GameRules:SendCustomMessage("Make up player heros...", 0, 0)
	t["data"]["hehe"] = RandomInt(1, 10000)
end

function GemTD:OnRequestProxy(keys)
	local requestid = keys.requestid
	local url = keys.url
	-- 排查用日志：请求进来、发出、返回结果都打一条
	print(
		"[PROXY] recv id="
			.. tostring(requestid)
			.. " player="
			.. tostring(keys.PlayerID)
			.. " url="
			.. tostring(url):sub(1, 130)
	)
	if keys.PlayerID == nil or type(keys.PlayerID) ~= "number" then
		print("[PROXY] id=" .. tostring(requestid) .. " bad PlayerID")
		return
	end
	local player = PlayerResource:GetPlayer(keys.PlayerID)
	local req = CreateHTTPRequestScriptVM("GET", url)
	req:SetHTTPRequestAbsoluteTimeoutMS(20000)
	req:Send(function(result)
		print(
			"[PROXY] id="
				.. tostring(requestid)
				.. " status="
				.. tostring(result and result.StatusCode)
				.. " body_len="
				.. tostring(result and result["Body"] and #result["Body"] or 0)
		)
		if result ~= nil and result["Body"] then
			local t = json.decode(result["Body"])
			if t == nil then
				print(
					"[PROXY] id="
						.. tostring(requestid)
						.. " json.decode FAILED, body head="
						.. tostring(result["Body"]):sub(1, 200)
				)
				return
			end
			ResponseProxy({
				data_table = t,
				requestid = requestid,
				player = player,
			})
		else
			print("[PROXY] id=" .. tostring(requestid) .. " 没有 Body（请求失败或超时）")
		end
	end)
end
function ResponseProxy(keys)
	print("[PROXY] send response_proxy id=" .. tostring(keys.requestid))
	CustomGameEventManager:Send_ServerToPlayer(keys.player, "response_proxy", {
		data_table = keys.data_table,
		requestid = keys.requestid,
	})
end
function SaveOndutyHero(keys)
	local url = "http://gemtd.ppbizon.com/gemtd/hero/save/"
		.. keys.hero
		.. "@"
		.. keys.steamid
		.. "?hehe=1"
		.. GetSendKey()
	CreateHTTPRequestScriptVM("GET", url):Send(function(result) end)
end

-- function SendQuest(keys)

-- end

-- SendCoopRanking({
-- 	level = _G.level,
-- 	kills = _G.kills,
-- 	player_ids = _G.steam_ids_only,
-- 	player_count = PlayerResource:GetPlayerCount(),
-- 	seed = _G.navi,
-- 	time_cost = g_time,
-- 	finishd_quest = finishd_quest,
-- 	towers = towers_str,
-- 	gold = _G.team_gold,
-- 	extra_kill = _G.extra_kill,
-- 	maze_length = _G.gem_maze_length,
-- })

-- function SendCoopRanking(keys)
--     local url = 'http://gemtd.ppbizon.com/gemtd/ranking/add/@'..keys.time_cost..'@'..keys.level..'@'..keys.kills..'@'..keys.player_ids..'@'..(keys.finishd_quest or ',') + '@' + local_id + '?hehe=' + Math.random() + '&towers=' + data.towers + '&ac=20180827&gold=' + data.gold + '&extra_kill=' + data.extra_kill + '&maze_length=' + data.maze_length;

--     GameEvents.SendCustomGameEventToServer("catch_crab", { url: url, cb: 'send_ranking_cb', user: local_id });
-- end

function SyncHP(caller)
	_G.gem_castle:SetBaseMaxHealth(_G.gem_castle_hp_max)
	_G.gem_castle:SetMaxHealth(_G.gem_castle_hp_max)
	_G.gem_castle:SetHealth(_G.gem_castle_hp)

	--英雄同步血量(合作模式)
	local ii = 0
	for ii = 0, 20 do
		if PlayerResource:IsValidPlayer(ii) then
			local player = PlayerResource:GetPlayer(ii)
			if player ~= nil then
				local h = player:GetAssignedHero()
				if h ~= nil then
					h:SetBaseMaxHealth(_G.gem_castle_hp_max)
					h:SetMaxHealth(_G.gem_castle_hp_max)
					h:SetHealth(_G.gem_castle_hp)
				end
			end
		end
	end

	CustomNetTables:SetTableValue("game_state", "gem_life", {
		gem_life = _G.gem_castle_hp,
		gem_life_max = _G.gem_castle:GetMaxHealth(),
		p = PlayerResource:GetPlayerCount(),
	})
end

function HuichunAura(keys)
	local caster = keys.caster
	local player_id = caster:GetOwner():GetPlayerID()
	hp_count = keys.hp_add or 1
	if GetMapName() ~= "gemtd_race" then
		_G.gem_castle_hp = _G.gem_castle_hp + hp_count
		if _G.gem_castle_hp > _G.gem_castle_hp_max then
			_G.gem_castle_hp_max = _G.gem_castle_hp
		end
		SyncHP("HuichunAura")

		AMHC:CreateNumberEffect(caster, hp_count, 5, AMHC.MSG_MISS, "green", 0)
		EmitSoundOn("DOTAMusic_Stinger.004", caster)
	else
		_G.gem_castle_hp_race[player_id] = _G.gem_castle_hp_race[player_id] + hp_count
		--允许超过最大hp
		local castle = _G.gem_castle_race[player_id]
		if castle then
			if _G.gem_castle_hp_race[player_id] > castle:GetMaxHealth() then
				castle:SetBaseMaxHealth(_G.gem_castle_hp_race[player_id])
				castle:SetMaxHealth(_G.gem_castle_hp_race[player_id])
			end
			castle:SetHealth(_G.gem_castle_hp_race[player_id])

			CustomNetTables:SetTableValue("game_state", "gem_life_race", {
				player = player_id,
				gem_life = _G.gem_castle_hp_race[player_id],
				gem_life_max = castle:GetMaxHealth(),
			})
		end
		if PlayerResource:GetPlayer(player_id) ~= nil then
			local h = PlayerResource:GetPlayer(player_id):GetAssignedHero()
			if _G.gem_castle_hp_race[player_id] > h:GetMaxHealth() then
				h:SetBaseMaxHealth(_G.gem_castle_hp_race[player_id])
				h:SetMaxHealth(_G.gem_castle_hp_race[player_id])
			end
			h:SetHealth(_G.gem_castle_hp_race[player_id])
		end

		AMHC:CreateNumberEffect(caster, hp_count, 5, AMHC.MSG_MISS, "green", 0)
		EmitSoundOn("DOTAMusic_Stinger.004", caster)
	end
end

function GemTD:OnPauseGame(keys)
	local player_id = keys.playerid
	local hero = _G.playerid2hero[player_id]

	if IsUnitExist(hero) == false then
		return
	end

	--解除暂停
	if GameRules:IsGamePaused() then
		PauseGame(false)
		prt(keys.player_name .. " |" .. "text_unpause_game")
		return
	end

	if _G.START_TIME == nil then
		_G.START_TIME = GameRules:GetGameTime()
		return
	end

	local pause_time = math.floor(GameRules:GetGameTime() - _G.START_TIME)
	if
		hero.last_pause_time == nil
		or pause_time - hero.last_pause_time > 300
		or PlayerResource:GetPlayerCount() == 1
		or GetMapName() == "gemtd_1p"
		or GetMapName() == "gemtd_coop"
	then
		PauseGame(true)
		prt(keys.player_name .. " |" .. "text_pause_game")
		hero.last_pause_time = pause_time
	end
end

--在6格物品栏中找到指定的一个物品，返回item对象
function FindItemInInventory(unit, item_name)
	for i = 0, 5 do
		local item = unit:GetItemInSlot(i)
		if item and item:GetAbilityName() == item_name then
			return item
		end
	end
end

--通用方法之添加技能
function AddAbilityAndSetLevel(u, a, l, delay, is_active)
	Timers:CreateTimer(delay or 0, function()
		if l == nil then
			l = 1
		end
		if u == nil or u:IsNull() == true then
			return
		end
		if u:FindAbilityByName(a) == nil then
			u:AddAbility(a)
			if u:FindAbilityByName(a) ~= nil then
				u:FindAbilityByName(a):SetLevel(l)
			end
		else
			u:FindAbilityByName(a):SetLevel(l)
		end

		-- if index ~= nil then
		-- 	if u:GetAbilityByIndex(index+1) and u:GetAbilityByIndex(index+1):GetAbilityName() ~= a then
		-- 		u:SwapAbilities(a,hero_new:GetAbilityByIndex(index+1):GetAbilityName(),true,true)
		-- 	end
		-- end
		if is_active == nil then
			is_active = true
		end
		u:FindAbilityByName(a):SetActivated(is_active)
		-- print('---------------------')
		-- for iii=0,20 do
		-- 	if u:GetAbilityByIndex(iii) ~= nil then
		-- 		print("ability"..iii..": "..u:GetAbilityByIndex(iii):GetAbilityName())
		-- 	end
		-- end
	end)
end

--风行-快速射击
function gemtd_hero_kuaisusheji(keys)
	local caster = keys.caster
	local ability = keys.ability
	local target = keys.target
	if target == nil then
		return
	end
	if target:GetAttackDamage() < 1 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_no_attack_damage",
		})
		ability:EndCooldown()
		return
	end
	local cost_gold_result = CostGold({
		caster = keys.caster,
		gold_cost = keys.gold_cost or 100,
	})
	if cost_gold_result == false then
		ability:EndCooldown()
		return
	end
	--同步玩家金钱
	sync_player_gold(caster)

	local duration = GetAbilityKV(ability, "last_time")
	ability:ApplyDataDrivenModifier(caster, target, "modifier_gemtd_hero_kuaisusheji", {
		duration = duration,
	})

	SetQuest("q211", false)
end
--幻刺-暴击
function gemtd_hero_baoji(keys)
	local caster = keys.caster
	local ability = keys.ability
	local target = keys.target
	if target == nil then
		return
	end
	if target:GetAttackDamage() < 1 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_no_attack_damage",
		})
		ability:EndCooldown()
		return
	end
	local cost_gold_result = CostGold({
		caster = keys.caster,
		gold_cost = keys.gold_cost or 100,
	})
	if cost_gold_result == false then
		ability:EndCooldown()
		return
	end
	--同步玩家金钱
	sync_player_gold(caster)

	local duration = GetAbilityKV(ability, "last_time")
	ability:ApplyDataDrivenModifier(caster, target, "modifier_gemtd_hero_baoji", {
		duration = duration,
	})

	SetQuest("q211", false)
end

--火枪-瞄准
function gemtd_hero_miaozhun(keys)
	local caster = keys.caster
	local ability = keys.ability
	local target = keys.target
	if target == nil then
		return
	end
	if target:GetAttackDamage() < 1 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_no_attack_damage",
		})
		ability:EndCooldown()
		return
	end

	local cost_gold_result = CostGold({
		caster = keys.caster,
		gold_cost = keys.gold_cost or 100,
	})
	if cost_gold_result == false then
		ability:EndCooldown()
		return
	end
	--同步玩家金钱
	sync_player_gold(caster)

	local duration = GetAbilityKV(ability, "last_time")
	ability:ApplyDataDrivenModifier(caster, target, "modifier_gemtd_hero_miaozhun", {
		duration = duration,
	})
	SetQuest("q211", false)
end

--致命链接
function gemtd_zhiminglianjie(keys)
	local caster = keys.caster
	local ability = keys.ability
	local target = keys.target
	if target == nil then
		return
	end
	if target:GetAttackDamage() < 1 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_no_attack_damage",
		})
		ability:EndCooldown()
		return
	end

	local cost_gold_result = CostGold({
		caster = keys.caster,
		gold_cost = keys.gold_cost or 100,
	})
	if cost_gold_result == false then
		ability:EndCooldown()
		return
	end
	--同步玩家金钱
	sync_player_gold(caster)

	local duration = GetAbilityKV(ability, "last_time")
	ability:ApplyDataDrivenModifier(caster, target, "modifier_gemtd_hero_lianjie", {
		duration = duration,
	})
	SetQuest("q211", false)
end

--背水一战
function gemtd_hero_beishuiyizhan(keys)
	local caster = keys.caster
	local ability = keys.ability
	local target = keys.target
	local level = ability:GetLevel() or 1
	if target == nil then
		return
	end
	if target:GetAttackDamage() < 1 then
		CustomGameEventManager:Send_ServerToPlayer(caster:GetPlayerOwner(), "mima", {
			text = "text_mima_no_attack_damage",
		})
		ability:EndCooldown()
		return
	end

	local cost_gold_result = CostGold({
		caster = keys.caster,
		gold_cost = keys.gold_cost or 100,
	})
	if cost_gold_result == false then
		ability:EndCooldown()
		return
	end
	--同步玩家金钱
	sync_player_gold(caster)

	local beishui_level = (caster:GetMaxHealth() - caster:GetHealth()) / (caster:GetMaxHealth() / 5) + 1
	local u =
		CreateUnitByName("gemtd_feicuimoxiang_yinxing", target:GetAbsOrigin(), false, nil, nil, DOTA_TEAM_GOODGUYS)
	u.ftd = 2009
	u:AddAbility("gemtd_hero_beishuiyizhan_unit" .. level)
	u:FindAbilityByName("gemtd_hero_beishuiyizhan_unit" .. level):SetLevel(beishui_level)

	Timers:CreateTimer(0.1, function()
		local newOrder = {
			UnitIndex = u:entindex(),
			OrderType = DOTA_UNIT_ORDER_CAST_TARGET,
			TargetIndex = target:entindex(), --Optional.  Only used when targeting units
			AbilityIndex = u:FindAbilityByName("gemtd_hero_beishuiyizhan_unit" .. level):entindex(), --Optional.  Only used when casting abilities
			Position = nil, --Optional.  Only used when targeting the ground
			Queue = 0, --Optional.  Used for queueing up abilities
		}
		ExecuteOrderFromTable(newOrder)
		Timers:CreateTimer(20, function()
			if u ~= nil and u:IsNull() ~= true then
				u:ForceKill(false)
			end
			if u ~= nil and u:IsNull() ~= true then
				u:Destroy()
			end
		end)
	end)

	SetQuest("q211", false)
end

function GetAbilityKV(ability, key)
	if ability == nil then
		return
	end
	local level = ability:GetLevel() or 1
	return ability:GetLevelSpecialValueFor(key, level - 1)
end

function ShowAbility(keys)
	local target = keys.target

	if target == nil then
		return
	end
	print("")
	print("========" .. target:GetUnitName() .. " / " .. target:entindex() .. "========")
	for i = 0, 23 do
		if target:GetAbilityByIndex(i) ~= nil then
			print(
				"Ability"
					.. i
					.. " --> "
					.. target:GetAbilityByIndex(i):GetAbilityName()
					.. " (Lv."
					.. target:GetAbilityByIndex(i):GetLevel()
					.. ")"
			)
		end
	end

	print("----------modifiers----------")
	local all_modifier = target:FindAllModifiers()
	for _, m in pairs(all_modifier) do
		print(m:GetName())
	end

	if
		target.y ~= nil
		and target.x ~= nil
		and _G.mychess[target.at_team_id or target.team_id]["" .. target.y .. "_" .. target.x]
	then
		print("----------vchess----------")
		DeepPrintTable(_G.mychess[target.at_team_id or target.team_id]["" .. target.y .. "_" .. target.x])
	end
	print("----------propties----------")
	local prop_table = {
		"is_in_battle",
		"is_moving",
		"alreadywon",
		"transforming",
	}
	for _, v in pairs(prop_table) do
		print(v .. " = " .. tostring(target[v] or "nil"))
	end
end

function PlayerId2Hero(id)
	return _G.playerid2hero[id]
end

function GemTD:OnLeftClick(keys)
	local caster = PlayerId2Hero(keys.PlayerID)
	local target_pos = Vector(keys.x, keys.y, keys.z)
	local entity_index = keys.entity_index
	local unit = EntIndexToHScript(entity_index)
	unit.target_position = target_pos
end

-- function IsPlayerHost(nPlayerID)
--     if IsDedicatedServer() then
--         return false -- 专用服务器无房主
--     end
--     local hHost = GetListenServerHost()
--     if not hHost or hHost:IsNull() then
--         return false
--     end
--     return hHost:GetPlayerID() == nPlayerID
-- end

--有玩家连入游戏
function GemTD:OnPlayerConnectFull(keys)
	local playerID = keys.PlayerID

	-- SetPlayerConnectedInfo({
	--     PlayerID = playerID,
	--     PlayerName = PlayerResource:GetPlayerName(playerID),
	--     SteamID = tostring(PlayerResource:GetSteamID(playerID)),
	-- })

	-- DeepPrintTable(keys)
	--因为DOTA2的7.31版本更新后这里只能获得userid（没什么用）
	--干脆直接遍历全部的PlayerID
	--然而PlayerID后来加回来了。。但是已经不想再改回去了！

	local connected_player_count = 0
	local player_steamid_table = {}

	for i = 0, 20 do
		if PlayerResource:GetPlayer(i) then
			-- SetPlayerConnectedInfo({
			-- 	PlayerID = i,
			-- 	PlayerName = PlayerResource:GetPlayerName(i),
			-- 	SteamID = tostring(PlayerResource:GetSteamID(i)),
			-- })
			connected_player_count = connected_player_count + 1

			local steamid = tostring(PlayerResource:GetSteamID(i))
			if
				steamid == "76561198101849234"
				or steamid == "76561198090931971"
				or steamid == "76561198132023205"
				or steamid == "76561198079679584"
			then
				_G.myself = true
			end
			-- table.insert(player_steamid_table,steamid)

			if _G.zaotui_table[i] == 1 then
				_G.zaotui_table[i] = 0
			end

			--通知ui：玩家i连进来了，显示它的头像面板吧
			CustomNetTables:SetTableValue("game_state", "player_connect", { id = i, hehe = RandomInt(1, 10000) })

			--通知ui：玩家们分别选了什么英雄
			if PlayerResource:GetSelectedHeroName(0) ~= nil then
				CustomNetTables:SetTableValue(
					"game_state",
					"select_hero1",
					{
						p1 = PlayerResource:GetSelectedHeroName(0),
						p2 = PlayerResource:GetSelectedHeroName(1),
						p3 = PlayerResource:GetSelectedHeroName(2),
						p4 = PlayerResource:GetSelectedHeroName(3),
					}
				)
			end
		end
	end

	-- local steamid_str = JoinTableString(player_steamid_table)
	-- _G.steam_ids_only = steamid_str

	_G.online_player_count = connected_player_count
	if _G.is_debug == true then
		GameRules:SendCustomMessage("当前玩家总数: " .. _G.online_player_count, 0, 0)
	end

	print("player connect: " .. _G.online_player_count .. "/" .. PlayerResource:GetPlayerCount())

	PlayerResource:SetCustomTeamAssignment(0, DOTA_TEAM_GOODGUYS)
	PlayerResource:SetCustomTeamAssignment(1, DOTA_TEAM_GOODGUYS)
	PlayerResource:SetCustomTeamAssignment(2, DOTA_TEAM_GOODGUYS)
	PlayerResource:SetCustomTeamAssignment(3, DOTA_TEAM_GOODGUYS)

	_G.connect_full_player_count = _G.connect_full_player_count + 1
	--判断是不是官方服务器/自建服务器/玩家主机
	local config = LoadKeyValues("gem_config.txt")
	if config.IsServer == 1 and _G.is_server_game_started == false then
		pcall(function()
			GameRules:ResetToCustomGameSetup()
		end)
		Timers:CreateTimer(1, function()
			GemTD:OnPlayerStartTeamSelect({})
		end)
	end
end