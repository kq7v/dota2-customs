--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var max_games = 5
var new_items =
{
    "npc_dota_hero_puck": true,
    "npc_dota_hero_kunkka": true,
    "npc_dota_hero_primal_beast": true,
}
var new_shop_items =
{
    34606 : true,
    34607 : true,
    34608 : true,
    34609 : true,
    34400 : true,
    34520 : true,
    34521 : true,
    34522 : true,
    35982 : true,
    34588 : true,
    34589 : true,
    34590 : true,
    34591 : true,
    34592 : true,
    34593 : true,
    34594 : true,
    33387 : true,
    33388 : true,
    33389 : true,
    33390 : true,
    33391 : true,
    33392 : true,
    31468 : true,
    31469 : true,
    31470 : true,
    31471 : true,
    33393 : true,
    34577 : true,
    34578 : true,
    34579 : true,
    34580 : true,
    33300 : true,
    33301 : true,
    33302 : true,
    33303 : true,
    33588 : true,
    33589 : true,
    33590 : true,
    33592 : true,
    33593 : true,
    33594 : true,
    33596 : true,
    31408 : true,
    31409 : true,
    31410 : true,
    31411 : true,
    31412 : true,
}
var WINDOWS_MAX_COUNTER = 6
var active_shard_sale = false
var active_sub_sale = false
var effects_icons =
{
    emblems : "file://{images}/custom_game/shop/effects/section/effects_emblems.png",
    effect_attack : "file://{images}/custom_game/shop/effects/section/attack.png",
    effect_regeneration : "file://{images}/custom_game/shop/effects/section/regeneration.png",
    effect_teleportation : "file://{images}/custom_game/shop/effects/section/effects_scroll.png",
    effect_blink : "file://{images}/custom_game/shop/effects/section/effects_blink.png",
    effect_eul : "file://{images}/custom_game/shop/effects/section/effects_eul.png",
    effect_force_staff : "file://{images}/custom_game/shop/effects/section/effects_pike.png",
    effect_phase_boots : "file://{images}/custom_game/shop/effects/section/effects_phase.png",
    effect_radiance : "file://{images}/custom_game/shop/effects/section/effects_radiance.png",
    effect_mekansm : "file://{images}/custom_game/shop/effects/section/effects_greaves.png",
    effect_shivas : "file://{images}/custom_game/shop/effects/section/effects_shiva.png",
    effect_mjollnir : "file://{images}/custom_game/shop/effects/section/effects_mjollnir.png",
    effect_dagon : "file://{images}/custom_game/shop/effects/section/dagon.png",
    effect_hex : "file://{images}/custom_game/shop/effects/section/hex.png",
}

var effects_items_icons =
{
    effect_regeneration : [],
    effect_teleportation : ["item_tpscroll_custom"],
    effect_blink : ["item_blink_custom", "item_arcane_blink_custom", "item_swift_blink_custom", "item_overwhelming_blink_custom"],
    effect_eul : ["item_cyclone_custom", "item_wind_waker_custom"],
    effect_force_staff : ["item_force_staff_custom", "item_hurricane_pike_custom", "item_harpoon_custom"],
    effect_phase_boots : ["item_phase_boots_custom"],
    effect_radiance : ["item_radiance_custom"],
    effect_mekansm : ["item_mekansm_custom", "item_guardian_greaves_custom"],
    effect_shivas : ["item_shivas_guard_custom"],
    effect_mjollnir : ["item_mjollnir_custom", "item_maelstrom_custom"],
    effect_dagon : ["item_dagon_custom"],
    effect_attack : [],
    effect_hex : ["item_sheepstick_custom"],
}