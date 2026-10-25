--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var levels =
[
    0,

    10,
    20,
    30,
    40,
    50,

    60,
    70,
    80,
    90,
    100,
    110,

    120,
    130,
    140,
    150,
    160,
    170,

    180,
    190,
    200,
    210,
    220,
    230,

    240,
    250,
    260,
    270,
    280,
    290,

    300,
]

  
var Items_currency = 
[
    // ID ПРЕДМЕТА для проверки или для добавления в базу,ВАЛЮТА,СТОИМОСТЬ,ИКОНКА(именно название png файла),переменная названия в локализации, можно покупать много раз или один раз(проверка на покупку в базе)
    ["0", "", "#currency_1", "big_coin", "donate_change_crystals_1"], 
]

var Items_plus = 
[
    // ID ПРЕДМЕТА для проверки или для добавления в базу,ВАЛЮТА,СТОИМОСТЬ,ИКОНКА(именно название png файла),переменная названия в локализации, можно покупать много раз или один раз(проверка на покупку в базе)
    ["99991", "coin", "1", "new", "subscribe_plus_new"],
    ["battle_pass_1", "", "", "nydp8", "battle_pass_2"],
    ["double_rating_pack", "coin", "500", "double_token", "double_rating_pack"],
    ["1103", "coin", "1000", "new_logo_notext", "background_136"],
    //["1091", "coin", "1", "dark_carnival_pack", "dark_carnival_pack"],
    ["rune_chest_item", "coin", "250", "rune_chest", "rune_chest_item"],

    //["1051", "coin", "100", "nydp2", "nydp2"],
    //["1052", "coin", "500", "nydp3", "nydp3"],
    //["1053", "coin", "500", "nydp4", "nydp4"],
    //["1054", "coin", "500", "nydp5", "nydp5"],
    //["1055", "coin", "500", "nydp6", "nydp6"],
    //["1058", "coin", "3250", "nydp7", "nydp7"],
] 

// Последний юзабельный айди 1119

var Items_upgrades =
[
    ["upgrade_rune_slot", "crystal", "3000", "upgrade_rune_slot", "upgrade_rune_slot"],
    ["upgrade_talent_point", "crystal", "50", "upgrade_talent_point", "upgrade_talent_point"],
    ["upgrade_backpack", "crystal", "1500", "upgrade_backpack", "upgrade_backpack"],
    ["upgrade_start_level", "crystal", "25", "upgrade_start_level", "upgrade_start_level"],
    ["upgrade_auto_midas", "crystal", "100", "upgrade_auto_midas", "upgrade_auto_midas"],
    ["upgrade_curse_armor", "crystal", "25", "upgrade_curse_armor", "upgrade_curse_armor"],
    ["upgrade_curse_magic", "crystal", "25", "upgrade_curse_magic", "upgrade_curse_magic"],
]

var Items_Backround =
[
    ["889", "coin", "99999", "background_56", "background_56", true], // BP ONLY
    ["890", "coin", "99999", "background_37", "background_37", true], // BP ONLY
    ["891", "coin", "99999", "background_38", "background_38", true], // BP ONLY
    ["892", "coin", "99999", "background_39", "background_39", true], // BP ONLY
    ["893", "coin", "99999", "background_40", "background_40", true], // BP ONLY
    ["894", "coin", "99999", "background_41", "background_41", true], // BP ONLY
    ["895", "coin", "99999", "background_42", "background_42", true], // BP ONLY
    ["896", "coin", "99999", "background_43", "background_43", true], // BP ONLY
    ["901", "coin", "99999", "background_48", "background_48", true], // BP ONLY
    ["902", "coin", "99999", "background_49", "background_49", true], // BP ONLY
    ["903", "coin", "99999", "background_50", "background_50", true], // BP ONLY
    ["904", "coin", "99999", "background_51", "background_51", true], // BP ONLY
    ["905", "coin", "99999", "background_52", "background_52", true], // BP ONLY
    ["906", "coin", "99999", "background_53", "background_53", true], // BP ONLY
    ["907", "coin", "99999", "background_54", "background_54", true], // BP ONLY
    ["908", "coin", "99999", "background_55", "background_55", true], // BP ONLY

    ["1029", "coin", "99999", "background_114", "background_114", true], // BP ONLY 2026
    ["1030", "coin", "99999", "background_115", "background_115", true], // BP ONLY 2026
    ["1031", "coin", "99999", "background_116", "background_116", true], // BP ONLY 2026
    ["1032", "coin", "99999", "background_117", "background_117", true], // BP ONLY 2026
    ["1033", "coin", "99999", "background_118", "background_118", true], // BP ONLY 2026
    ["1034", "coin", "99999", "background_119", "background_119", true], // BP ONLY 2026
    ["1035", "coin", "99999", "background_120", "background_120", true], // BP ONLY 2026
    ["1036", "coin", "99999", "background_121", "background_121", true], // BP ONLY 2026
    ["1037", "coin", "99999", "background_122", "background_122", true], // BP ONLY 2026
    ["1038", "coin", "99999", "background_123", "background_123", true], // BP ONLY 2026
    ["1039", "coin", "99999", "background_124", "background_124", true], // BP ONLY 2026
    ["1040", "coin", "99999", "background_125", "background_125", true], // BP ONLY 2026
    ["1041", "coin", "99999", "background_126", "background_126", true], // BP ONLY 2026
    ["1042", "coin", "99999", "background_127", "background_127", true], // BP ONLY 2026
    ["1043", "coin", "99999", "background_128", "background_128", true], // BP ONLY 2026
    ["1044", "coin", "99999", "background_129", "background_129", true], // BP ONLY 2026
    ["1073", "coin", "99999", "background_130", "background_130", true], // BP ONLY 2026

    ["1086", "coin", "99999", "background_131", "background_131", true], // Идут в наборе
    ["1087", "coin", "99999", "background_132", "background_132", true], // Идут в наборе
    ["1088", "coin", "99999", "background_133", "background_133", true], // Идут в наборе
    ["1089", "coin", "99999", "background_134", "background_134", true], // Идут в наборе
    ["1090", "coin", "99999", "background_135", "background_135", true], // Идут в наборе
    ["1103", "coin", "1000", "new_logo_notext", "background_136", true],

    ["992", "coin", "1000", "background_111", "background_111"],
    ["993", "coin", "1000", "background_112", "background_112"],
    ["994", "coin", "1000", "background_113", "background_113"],
    ["917", "coin", "1000", "background_65", "background_65"],
    ["946", "coin", "1000", "background_66", "background_66"],
    ["947", "coin", "1000", "background_67", "background_67"],
    ["949", "coin", "1000", "background_69", "background_69"],
    ["951", "coin", "1000", "background_71", "background_71"],
    ["952", "coin", "1000", "background_72", "background_72"],
    ["953", "coin", "1000", "background_73", "background_73"],
    ["954", "coin", "1000", "background_74", "background_74"],
    ["955", "coin", "1000", "background_75", "background_75"],
    ["958", "coin", "1000", "background_78", "background_78"],
    ["959", "coin", "1000", "background_79", "background_79"],
    ["960", "coin", "1000", "background_80", "background_80"],
    ["963", "coin", "1000", "background_83", "background_83"],
    ["967", "coin", "1000", "background_87", "background_87"],
    ["969", "coin", "1000", "background_89", "background_89"],
    ["974", "coin", "1000", "background_94", "background_94"],
    ["979", "coin", "1000", "background_99", "background_99"],
    ["962", "coin", "1000", "background_82", "background_82"],
    ["964", "coin", "1000", "background_84", "background_84"],
    ["961", "coin", "1000", "background_81", "background_81"],
    ["965", "coin", "1000", "background_85", "background_85"],
    ["970", "coin", "1000", "background_90", "background_90"],
    ["966", "coin", "1000", "background_86", "background_86"],
    ["968", "coin", "1000", "background_88", "background_88"],
    ["971", "coin", "1000", "background_91", "background_91"],
    ["972", "coin", "1000", "background_92", "background_92"],
    ["973", "coin", "1000", "background_93", "background_93"],
    ["975", "coin", "1000", "background_95", "background_95"],
    ["976", "coin", "1000", "background_96", "background_96"],
    ["977", "coin", "1000", "background_97", "background_97"],
    ["978", "coin", "1000", "background_98", "background_98"],
    ["956", "coin", "1000", "background_76", "background_76"],
    ["957", "coin", "1000", "background_77", "background_77"],
    ["948", "coin", "1000", "background_68", "background_68"],
    ["950", "coin", "1000", "background_70", "background_70"],
    ["897", "coin", "1000", "background_44", "background_44"],
    ["898", "coin", "1000", "background_45", "background_45"],
    ["899", "coin", "1000", "background_46", "background_46"],
    ["900", "coin", "1000", "background_47", "background_47"],
    ["726", "coin", "1000", "background_1", "background_1"],
    ["727", "coin", "1000", "background_2", "background_2"],
    ["730", "coin", "1000", "background_3", "background_3"],
    ["731", "coin", "1000", "background_4", "background_4"],
    ["732", "coin", "1000", "background_5", "background_5"],
    ["733", "coin", "1000", "background_6", "background_6"],
    ["734", "coin", "1000", "background_7", "background_7"],
    ["735", "coin", "1000", "background_8", "background_8"],
    ["736", "coin", "1000", "background_9", "background_9"],
    ["737", "coin", "1000", "background_10", "background_10"],
    ["738", "coin", "1000", "background_11", "background_11"],
    ["739", "coin", "1000", "background_12", "background_12"],
    ["740", "coin", "1000", "background_13", "background_13"],
    ["741", "coin", "1000", "background_14", "background_14"],
    ["742", "coin", "1000", "background_15", "background_15"],
    ["743", "coin", "1000", "background_16", "background_16"],
    ["744", "coin", "1000", "background_17", "background_17"],
    ["745", "coin", "1000", "background_18", "background_18"],
    ["746", "coin", "1000", "background_19", "background_19"],
    ["763", "coin", "1000", "background_36", "background_36"],
    ["747", "coin", "1000", "background_20", "background_20"],
    ["748", "coin", "1000", "background_21", "background_21"],
    ["749", "coin", "1000", "background_22", "background_22"],
    ["750", "coin", "1000", "background_23", "background_23"],
    ["751", "coin", "1000", "background_24", "background_24"],
    ["752", "coin", "1000", "background_25", "background_25"],
    ["753", "coin", "1000", "background_26", "background_26"],
    ["754", "coin", "1000", "background_27", "background_27"],
    ["755", "coin", "1000", "background_28", "background_28"],
    ["756", "coin", "1000", "background_29", "background_29"],
    ["757", "coin", "1000", "background_30", "background_30"],
    ["758", "coin", "1000", "background_31", "background_31"],
    ["759", "coin", "1000", "background_32", "background_32"],
    ["760", "coin", "1000", "background_33", "background_33"],
    ["761", "coin", "1000", "background_34", "background_34"],
    ["762", "coin", "1000", "background_35", "background_35"],
    ["909", "coin", "1000", "background_57", "background_57"],
    ["910", "coin", "1000", "background_58", "background_58"],
    ["911", "coin", "1000", "background_59", "background_59"],
    ["912", "coin", "1000", "background_60", "background_60"],
    ["980", "coin", "1000", "background_101", "background_101"],
    ["981", "coin", "1000", "background_102", "background_102"],
    ["982", "coin", "1000", "background_103", "background_103"],
    ["983", "coin", "1000", "background_104", "background_104"],
    ["984", "coin", "1000", "background_105", "background_105"],
    ["985", "coin", "1000", "background_106", "background_106"],
    ["986", "coin", "1000", "background_107", "background_107"],
    ["987", "coin", "1000", "background_108", "background_108"],
    ["988", "coin", "1000", "background_109", "background_109"],
    ["989", "coin", "1000", "background_110", "background_110"],
    
    
    ["913", "coin", "5000", "background_61", "background_61"],
    ["914", "coin", "5000", "background_62", "background_62"],
    ["915", "coin", "5000", "background_63", "background_63"],
    ["916", "coin", "5000", "background_64", "background_64"],
    
]

var Background_Images =
{
    726 : "file://{images}/loadout_backgrounds/loadout_bg_field_001.jpg",
    727 : "file://{images}/loadout_backgrounds/loadout_bg_field_002.jpg",
    730 : "file://{images}/loadout_backgrounds/loadout_bg_field_003.jpg",
    731 : "file://{images}/loadout_backgrounds/loadout_bg_field_004.jpg",
    732 : "file://{images}/loadout_backgrounds/loadout_bg_fire_001.jpg",
    733 : "file://{images}/loadout_backgrounds/loadout_bg_fire_002.jpg",
    734 : "file://{images}/loadout_backgrounds/loadout_bg_fire_003.jpg",
    735 : "file://{images}/loadout_backgrounds/loadout_bg_fire_004.jpg",
    736 : "file://{images}/loadout_backgrounds/loadout_bg_forest_001.jpg",
    737 : "file://{images}/loadout_backgrounds/loadout_bg_forest_002.jpg",
    738 : "file://{images}/loadout_backgrounds/loadout_bg_forest_003.jpg",
    739 : "file://{images}/loadout_backgrounds/loadout_bg_forest_004.jpg",
    740 : "file://{images}/loadout_backgrounds/loadout_bg_ice_001.jpg",
    741 : "file://{images}/loadout_backgrounds/loadout_bg_ice_002.jpg",
    742 : "file://{images}/loadout_backgrounds/loadout_bg_ice_003.jpg",
    743 : "file://{images}/loadout_backgrounds/loadout_bg_ice_004.jpg",
    744 : "file://{images}/loadout_backgrounds/loadout_bg_jungle_001.jpg",
    745 : "file://{images}/loadout_backgrounds/loadout_bg_jungle_002.jpg",
    746 : "file://{images}/loadout_backgrounds/loadout_bg_jungle_004.jpg",
    747 : "file://{images}/loadout_backgrounds/loadout_bg_outworld_001.jpg",
    748 : "file://{images}/loadout_backgrounds/loadout_bg_outworld_002.jpg",
    749 : "file://{images}/loadout_backgrounds/loadout_bg_outworld_003.jpg",
    750 : "file://{images}/loadout_backgrounds/loadout_bg_outworld_004.jpg",
    751 : "file://{images}/loadout_backgrounds/loadout_bg_rocky_001.jpg",
    752 : "file://{images}/loadout_backgrounds/loadout_bg_rocky_002.jpg",
    753 : "file://{images}/loadout_backgrounds/loadout_bg_rocky_003.jpg",
    754 : "file://{images}/loadout_backgrounds/loadout_bg_rocky_004.jpg",
    755 : "file://{images}/loadout_backgrounds/loadout_bg_sky_001.jpg",
    756 : "file://{images}/loadout_backgrounds/loadout_bg_sky_002.jpg",
    757 : "file://{images}/loadout_backgrounds/loadout_bg_sky_003.jpg",
    758 : "file://{images}/loadout_backgrounds/loadout_bg_sky_004.jpg",
    759 : "file://{images}/loadout_backgrounds/loadout_bg_water_001.jpg",
    760 : "file://{images}/loadout_backgrounds/loadout_bg_water_002.jpg",
    761 : "file://{images}/loadout_backgrounds/loadout_bg_water_003.jpg",
    762 : "file://{images}/loadout_backgrounds/loadout_bg_water_004.jpg",
    763 : "file://{images}/loadout_backgrounds/ringmaster_background.png",
    889 : "file://{images}/custom_game/profile_bg/background_56.png",
    890 : "file://{images}/custom_game/profile_bg/background_37.png",
    891 : "file://{images}/custom_game/profile_bg/background_38.png",
    892 : "file://{images}/custom_game/profile_bg/background_39.png",
    893 : "file://{images}/custom_game/profile_bg/background_40.png",
    894 : "file://{images}/custom_game/profile_bg/background_41.png",
    895 : "file://{images}/custom_game/profile_bg/background_42.png",
    896 : "file://{images}/custom_game/profile_bg/background_43.png",
    897 : "file://{images}/custom_game/profile_bg/background_44.png",
    898 : "file://{images}/custom_game/profile_bg/background_45.png",
    899 : "file://{images}/custom_game/profile_bg/background_46.png",
    900 : "file://{images}/custom_game/profile_bg/background_47.png",
    901 : "file://{images}/custom_game/profile_bg/background_48.png",
    902 : "file://{images}/custom_game/profile_bg/background_49.png",
    903 : "file://{images}/custom_game/profile_bg/background_50.png",
    904 : "file://{images}/custom_game/profile_bg/background_51.png",
    905 : "file://{images}/custom_game/profile_bg/background_52.png",
    906 : "file://{images}/custom_game/profile_bg/background_53.png",
    907 : "file://{images}/custom_game/profile_bg/background_54.png",
    908 : "file://{images}/custom_game/profile_bg/background_55.png",
    909 : "file://{images}/custom_game/profile_bg/background_57.png",
    910 : "file://{images}/custom_game/profile_bg/background_58.png",
    911 : "file://{images}/custom_game/profile_bg/background_59.png",
    912 : "file://{images}/custom_game/profile_bg/background_60.png",
    913 : "file://{images}/custom_game/profile_bg/background_61.png",
    914 : "file://{images}/custom_game/profile_bg/background_62.png",
    915 : "file://{images}/custom_game/profile_bg/background_63.png",
    916 : "file://{images}/custom_game/profile_bg/background_64.png",
    917 : "file://{images}/custom_game/profile_bg/background_65.png",

    946 : "file://{images}/events/international_2025/backgrounds/galaxy_background_home.png",
    947 : "file://{images}/teamfancontent/season_12/9247354/wallpaper0.png",
    948 : "file://{images}/teamfancontent/season_12/9467224/wallpaper0.png",
    949 : "file://{images}/teamfancontent/season_12/8255888/wallpaper0.png",
    950 : "file://{images}/teamfancontent/season_12/9303484/wallpaper0.png",
    951 : "file://{images}/teamfancontent/season_12/7554697/wallpaper1.png",
    952 : "file://{images}/teamfancontent/season_12/9351740/wallpaper1.png",
    953 : "file://{images}/teamfancontent/season_12/2163/wallpaper1.png",
    954 : "file://{images}/teamfancontent/season_12/9691969/wallpaper1.png",
    955 : "file://{images}/teamfancontent/season_12/9691969/wallpaper0.png",
    956 : "s2r://panorama/images/loadingscreens/international_2025_ls_5/loadingscreen.vtex",
    957 : "s2r://panorama/images/loadingscreens/international_2025_ls_4/loadingscreen.vtex",
    958 : "s2r://panorama/images/loadingscreens/international_2025_team_ls_team_falcons/loadingscreen.vtex",
    959 : "s2r://panorama/images/loadingscreens/international_2025_team_ls_pvision/loadingscreen.vtex",

    960 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act3_10.tga",
    961 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act2_9.tga",
    962 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act2_3.tga",
    963 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act1_2.tga",
    964 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act1_3.tga",
    965 : "file://{images}/loadingscreens/frostivus_2023/loading_screen_frostivus_2023_001.vtex",
    966 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act3_8.tga",
    967 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act3_4.tga",
    968 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act3_3.tga",
    969 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act3_2.tga",
    970 : "file://{images}/loadingscreens/diretide_2022_candy_loading_screen/loadingscreen.vtex",
    971 : "file://{images}/loadingscreens/newbloom_2019_loadingscreen/loadingscreen.vtex",
    972 : "file://{images}/loadingscreens/ancient_rhythm_loading_screen/loadingscreen.tga",
    973 : "file://{images}/loadingscreens/circus_ursa_ls/loadingscreen.vtex",
    974 : "file://{images}/loadingscreens/international_2023_ls_3/loadingscreen.vtex",
    975 : "file://{images}/loadingscreens/aghs_2021_goat_loadingscreen/loadingscreen.vtex",
    976 : "file://{images}/loadingscreens/shibe_dog_cat_loadingscreen/loadingscreen.vtex",
    977 : "file://{images}/loadingscreens/lets_race_loading_screen/loadingscreen.tga",
    978 : "file://{images}/loadingscreens/3_heroes_loadingscreen/loadingscreen.tga",
    979 : "file://{images}/loadingscreens/esl_one_2014_loadingscreen/loadingscreen.tga",
    980 : "s2r://panorama/images/loadingscreens/frostivus2024/frostivus2024_ls_9.vtex",
    981 : "s2r://panorama/images/loadingscreens/frostivus2024/frostivus2024_ls_2.vtex",
    982 : "s2r://panorama/images/loadingscreens/frostivus2024/frostivus2024_ls_5.vtex",
    983 : "s2r://panorama/images/loadingscreens/frostivus2024/frostivus2024_ls_1.vtex",
    984 : "s2r://panorama/images/loadingscreens/frostivus2024/frostivus2024_ls_10.vtex",
    985 : "s2r://panorama/images/loadingscreens/frostivus2024/frostivus2024_ls_3.vtex",
    986 : "s2r://panorama/images/loadingscreens/frostivus2024/frostivus2024_ls_8.vtex",
    987 : "s2r://panorama/images/loadingscreens/frostivus2024/frostivus2024_ls_7.vtex",
    988 : "s2r://panorama/images/loadingscreens/frostivus2024/frostivus2024_ls_6.vtex",
    989 : "s2r://panorama/images/loadingscreens/frostivus2024/frostivus2024_ls_4.vtex",
    992 : "file://{images}/custom_game/profile_bg/largo_wallpaper_1.jpg",
    993 : "file://{images}/custom_game/profile_bg/largo_wallpaper_2.jpg",
    994 : "file://{images}/custom_game/profile_bg/largo_wallpaper_3.jpg",

    1029 : "file://{images}/loadingscreens/radiantancient_loadingscreen/loadingscreen.tga",
    1030 : "file://{images}/loadingscreens/direancient_loadingscreen/loadingscreen.tga",
    1031 : "s2r://panorama/images/loadingscreens/nemestice_2021_ls_5/loadingscreen.vtex",
    1032 : "s2r://panorama/images/loadingscreens/strangling_gloom_ls/loadingscreen.vtex",
    1033 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act1_1.tga",
    1034 : "s2r://panorama/images/loadingscreens/nemestice_2021_ls_3/loadingscreen.vtex",
    1035 : "s2r://panorama/images/loadingscreens/blazing_wing_loading_screen/loadingscreen.vtex",
    1036 : "s2r://panorama/images/loadingscreens/international_2024_ls_1/loadingscreen.vtex",
    1037 : "s2r://panorama/images/loadingscreens/manta_rayder_ti7_manta_rayder_loading_screen_v1/loadingscreen.vtex",
    1038 : "s2r://panorama/images/loadingscreens/compass_of_the_rising_gale_loading_screen/loadingscreen.vtex",
    1039 : "file://{images}/loadingscreens/immortal_warlord_loading_screen/loadingscreen.tga",
    1040 : "file://{images}/loadingscreens/crownfall_loadingscreen/crownfall_loadingscreen_act2_7.tga",
    1041 : "file://{images}/loadingscreens/esl_blossoming_harmony_loading_screen/loadingscreen.tga",
    1042 : "s2r://panorama/images/loadingscreens/ti11_magma/loadingscreen.vtex",
    1043 : "file://{images}/loadingscreens/mei_nei_rabbit_loading_screen/loadingscreen.tga",
    1044 : "s2r://panorama/images/loadingscreens/diabolical_fiend_loading_screen/loadingscreen.vtex",
    1073 : "s2r://panorama/images/loadingscreens/compendium2021_3_ls/loadingscreen.vtex",

    1086 : "file://{images}/loadingscreens/dark_carnival_loadingscreen/dark_carnival_loadingscreen_oracle.tga",
    1087 : "file://{images}/loadingscreens/dark_carnival_loadingscreen/dark_carnival_loadingscreen_morphling.tga",
    1088 : "file://{images}/loadingscreens/dark_carnival_loadingscreen/dark_carnival_loadingscreen_legioncommander.tga",
    1089 : "file://{images}/loadingscreens/dark_carnival_loadingscreen/dark_carnival_loadingscreen_bristleback.tga",
    1090 : "file://{images}/loadingscreens/dark_carnival_loadingscreen/dark_carnival_loadingscreen_axe.tga",
    1103 : "file://{images}/custom_game/profile_bg/new_logo_background_notext.png",
}

var Items_Five =
[
    ["707", "coin", "1500", "five_1", "five_1"],
    ["708", "coin", "1500", "five_2", "five_2"],
    ["709", "coin", "1500", "five_3", "five_3"],
    ["710", "coin", "1500", "five_4", "five_4"],
    ["711", "coin", "1500", "five_5", "five_5"],
    ["712", "coin", "1500", "five_6", "five_6"],
    ["713", "coin", "1500", "five_7", "five_7"],
    ["714", "coin", "1500", "five_8", "five_8"],
    ["715", "coin", "1500", "five_9", "five_9"],
    ["716", "coin", "1500", "five_10", "five_10"],
    ["1085", "coin", "1500", "five_15", "five_15"],
    
    

    ["1013", "coin", "99999", "five_11", "five_11", true], // BP ONLY 2026
    ["1014", "coin", "99999", "five_12", "five_12", true], // BP ONLY 2026
    ["1015", "coin", "99999", "five_13", "five_13", true], // BP ONLY 2026
    ["1016", "coin", "99999", "five_14", "five_14", true], // BP ONLY 2026
]

var Items_pets = 
[
    // ID ПРЕДМЕТА для проверки или для добавления в базу,ВАЛЮТА,СТОИМОСТЬ,ИКОНКА(именно название png файла),переменная названия в локализации, можно покупать много раз или один раз(проверка на покупку в базе)
    ["800", "coin", "99999", "0", "pet_157", true], // BP ONLY
    ["801", "coin", "99999", "0", "pet_126", true], // BP ONLY
    ["804", "coin", "99999", "0", "pet_129", true], // BP ONLY
    ["805", "coin", "99999", "0", "pet_130", true], // BP ONLY
    ["806", "coin", "99999", "0", "pet_131", true], // BP ONLY
    ["807", "coin", "99999", "0", "pet_132", true], // BP ONLY
    ["808", "coin", "99999", "0", "pet_133", true], // BP ONLY
    ["810", "coin", "99999", "0", "pet_135", true], // BP ONLY
    ["811", "coin", "99999", "0", "pet_136", true], // BP ONLY
    ["812", "coin", "99999", "0", "pet_137", true], // BP ONLY
    ["813", "coin", "99999", "0", "pet_138", true], // BP ONLY
    ["814", "coin", "99999", "0", "pet_139", true], // BP ONLY
    ["815", "coin", "99999", "0", "pet_140", true], // BP ONLY
    ["816", "coin", "99999", "0", "pet_141", true], // BP ONLY
    ["817", "coin", "99999", "0", "pet_142", true], // BP ONLY
    ["818", "coin", "99999", "0", "pet_143", true], // BP ONLY
    ["819", "coin", "99999", "0", "pet_144", true], // BP ONLY
    ["820", "coin", "99999", "0", "pet_145", true], // BP ONLY
    ["821", "coin", "99999", "0", "pet_146", true], // BP ONLY
    ["822", "coin", "99999", "0", "pet_147", true], // BP ONLY
    ["823", "coin", "99999", "0", "pet_148", true], // BP ONLY
    ["824", "coin", "99999", "0", "pet_149", true], // BP ONLY
    ["825", "coin", "99999", "0", "pet_150", true], // BP ONLY
    ["826", "coin", "99999", "0", "pet_151", true], // BP ONLY
    ["828", "coin", "99999", "0", "pet_153", true], // BP ONLY
    ["829", "coin", "99999", "0", "pet_154", true], // BP ONLY
    ["830", "coin", "99999", "0", "pet_155", true], // BP ONLY
    ["831", "coin", "99999", "0", "pet_156", true], // BP ONLY

    
    ["1005", "coin", "99999", "0", "pet_180", true], // BP ONLY 2026
    ["1006", "coin", "99999", "0", "pet_181", true], // BP ONLY 2026
    ["1007", "coin", "99999", "0", "pet_182", true], // BP ONLY 2026
    ["1008", "coin", "99999", "0", "pet_183", true], // BP ONLY 2026
    ["1009", "coin", "99999", "0", "pet_184", true], // BP ONLY 2026
    ["1010", "coin", "99999", "0", "pet_185", true], // BP ONLY 2026
    ["1096", "coin", "99999", "0", "pet_186", true],
    ["1097", "coin", "99999", "0", "pet_187", true],
    ["1098", "coin", "99999", "0", "pet_188", true],
    


    // 150
    ["701", "coin", "150", "0", "pet_124"],
    ["702", "coin", "150", "0", "pet_125"],
    ["940", "coin", "150", "0", "pet_160"],
    ["939", "coin", "150", "0", "pet_159"],
    ["938", "coin", "150", "0", "pet_158"],
    ["1", "coin", "150", "10012", "pet_1"],
    ["2", "coin", "150", "10026", "pet_2"],
    ["3", "coin", "150", "10028", "pet_3"],
    ["4", "coin", "150", "10027", "pet_4"],
    ["5", "coin", "150", "10025", "pet_5"],
    ["7", "coin", "150", "10017", "pet_7"],
    ["8", "coin", "150", "10024", "pet_8"],
    ["9", "coin", "150", "10011", "pet_9"],
    ["10", "coin", "150", "10281", "pet_10"],
    ["11", "coin", "150", "10318", "pet_11"],
    ["12", "coin", "150", "10920", "pet_12"],
    ["13", "coin", "150", "10524", "pet_13"],
    ["14", "coin", "150", "10386", "pet_14"],
    ["15", "coin", "150", "10167", "pet_15"],
    ["16", "coin", "150", "10375", "pet_16"],
    ["17", "coin", "150", "11383", "pet_17"],
    ["18", "coin", "150", "17664", "pet_18"],
    ["20", "coin", "150", "10833", "pet_20"],
    ["22", "coin", "150", "10194", "pet_22"],
    ["23", "coin", "150", "12866", "pet_23"],
    ["24", "coin", "150", "10170", "pet_24"],
    ["26", "coin", "150", "10163", "pet_26"],
    ["28", "coin", "150", "14218", "pet_28"],
    ["29", "coin", "150", "10195", "pet_29"],
    ["30", "coin", "150", "10193", "pet_30"],
    ["31", "coin", "150", "10703", "pet_31"],
    ["32", "coin", "150", "10703", "pet_32"],
    ["33", "coin", "150", "10896", "pet_33"],
    ["34", "coin", "150", "10758", "pet_34"],
    ["35", "coin", "150", "10172", "pet_35"],
    ["37", "coin", "150", "10171", "pet_37"],
    ["38", "coin", "150", "23519", "pet_38"],
    ["40", "coin", "150", "18408", "pet_40"],
    ["41", "coin", "150", "10834", "pet_41"],
    ["42", "coin", "150", "10147", "pet_42"],
    ["43", "coin", "150", "10041", "pet_43"],
    ["44", "coin", "150", "10918", "pet_44"],
    ["45", "coin", "150", "10158", "pet_45"],
    ["48", "coin", "150", "10350", "pet_48"],
    ["49", "coin", "150", "10433", "pet_49"],
    ["50", "coin", "150", "17257", "pet_50"],
    ["51", "coin", "150", "10750", "pet_51"],
    ["52", "coin", "150", "11143", "pet_52"],
    ["54", "coin", "150", "10192", "pet_54"],
    ["55", "coin", "150", "11368", "pet_55"],
    ["56", "coin", "150", "11130", "pet_56"],
    ["57", "coin", "150", "10664", "pet_57"],
    ["58", "coin", "150", "10169", "pet_58"],
    ["59", "coin", "150", "10663", "pet_59"],
    ["60", "coin", "150", "10164", "pet_60"],
    ["62", "coin", "150", "10295", "pet_62"],
    ["63", "coin", "150", "10376", "pet_63"],
    ["64", "coin", "150", "10395", "pet_64"],
    ["65", "coin", "150", "10395", "pet_65"],
    ["68", "coin", "150", "11899", "pet_68"],
    ["69", "coin", "150", "10298", "pet_69"],
    ["70", "coin", "150", "10323", "pet_70"],
    ["71", "coin", "150", "11438", "pet_71"],
    ["72", "coin", "150", "11278", "pet_72"],
    ["73", "coin", "150", "10938", "pet_73"],
    ["74", "coin", "150", "11425", "pet_74"],
    ["75", "coin", "150", "10845", "pet_75"],
    ["76", "coin", "150", "14032", "pet_76"],
    ["77", "coin", "150", "10456", "pet_77"],
   
    //1500
    ["78", "coin", "1500", "11521", "pet_78"],
    ["79", "coin", "1500", "11735", "pet_79"],
    ["80", "coin", "1500", "11091", "pet_80"],
    ["81", "coin", "1500", "11760", "pet_81"],
    ["82", "coin", "1500", "11866", "pet_82"],
    ["83", "coin", "1500", "10670", "pet_83"],
    ["85", "coin", "1500", "17774", "pet_85"],
    ["86", "coin", "1500", "10919", "pet_86"],
    ["87", "coin", "1500", "10872", "pet_87"],
    ["88", "coin", "1500", "19004", "pet_88"],
    ["89", "coin", "1500", "19004", "pet_89"],
    ["90", "coin", "1500", "19004", "pet_90"],
    ["91", "coin", "1500", "19004", "pet_91"],
    ["92", "coin", "1500", "19004", "pet_92"],
    ["93", "coin", "1500", "19328", "pet_93"],
    ["94", "coin", "1500", "19328", "pet_94"],
    ["95", "coin", "1500", "19328", "pet_95"],
    ["96", "coin", "1500", "19328", "pet_96"],
    ["97", "coin", "1500", "19328", "pet_97"],
    ["98", "coin", "1500", "13775", "pet_98"],
    ["99", "coin", "1500", "13775", "pet_99"],
    ["100", "coin", "1500", "13775", "pet_100"],
    ["101", "coin", "1500", "13775", "pet_101"],
    ["102", "coin", "1500", "13775", "pet_102"],
    ["103", "coin", "1500", "10091", "pet_103"],
    ["104", "coin", "1500", "10374", "pet_104"],
    ["105", "coin", "1500", "12007", "pet_105"],
    ["106", "coin", "1500", "12202", "pet_106"],
    ["107", "coin", "1500", "10478", "pet_107"],
    ["108", "coin", "1500", "10479", "pet_108"],
    ["109", "coin", "1500", "12994", "pet_109"],
    ["112", "coin", "1500", "12320", "pet_112"],
 
    // 15000
    ["113", "coin", "5000", "11522", "pet_113"],
    ["114", "coin", "5000", "11740", "pet_114"],
    ["115", "coin", "5000", "11092", "pet_115"],
    ["116", "coin", "5000", "11764", "pet_116"],
    ["117", "coin", "5000", "11865", "pet_117"],
    ["118", "coin", "5000", "10702", "pet_118"],
    ["119", "coin", "5000", "10143", "pet_119"],
    ["120", "coin", "5000", "19004", "pet_120"],
    ["121", "coin", "5000", "19328", "pet_121"],
    ["122", "coin", "5000", "13775", "pet_122"],
    ["123", "coin", "5000", "10096", "pet_123"],
]

var Items_tpscroll = 
[
    ["995", "coin", "5000", "tp_effect_1", "tp_effect_1"],
    ["996", "coin", "5000", "tp_effect_2", "tp_effect_2"],
    ["997", "coin", "5000", "tp_effect_3", "tp_effect_3"],
    ["998", "coin", "5000", "tp_effect_4", "tp_effect_4"],
    ["999", "coin", "99999", "tp_effect_5", "tp_effect_5", true],
    ["1000", "coin", "99999", "tp_effect_6", "tp_effect_6", true],
    ["1011", "coin", "99999", "tp_effect_11", "tp_effect_11", true], // BP ONLY 2026
    ["1012", "coin", "99999", "tp_effect_12", "tp_effect_12", true], // BP ONLY 2026

    ["1001", "coin", "5000", "tp_effect_7", "tp_effect_7"],
    ["1002", "coin", "5000", "tp_effect_8", "tp_effect_8"],
    ["1003", "coin", "5000", "tp_effect_9", "tp_effect_9"],
    ["1004", "coin", "5000", "tp_effect_10", "tp_effect_10"],
]

var Items_emblems = 
[
    // ID ПРЕДМЕТА для проверки или для добавления в базу,ВАЛЮТА,СТОИМОСТЬ,ИКОНКА(именно название png файла),переменная названия в локализации, можно покупать много раз или один раз(проверка на покупку в базе)
    
    

    ["832", "coin", "99999", "emblem_56", "emblem_56", true], // BP ONLY
    ["833", "coin", "99999", "emblem_57", "emblem_57", true], // BP ONLY
    ["834", "coin", "99999", "emblem_58", "emblem_58", true], // BP ONLY
    ["835", "coin", "99999", "emblem_59", "emblem_59", true], // BP ONLY
    ["836", "coin", "99999", "emblem_60", "emblem_60", true], // BP ONLY
    ["837", "coin", "99999", "emblem_61", "emblem_61", true], // BP ONLY
    ["838", "coin", "99999", "emblem_62", "emblem_62", true], // BP ONLY
    ["840", "coin", "99999", "emblem_64", "emblem_64", true], // BP ONLY
    ["842", "coin", "99999", "emblem_66", "emblem_66", true], // BP ONLY
    ["843", "coin", "99999", "emblem_67", "emblem_67", true], // BP ONLY
    ["844", "coin", "99999", "emblem_68", "emblem_68", true], // BP ONLY
    ["845", "coin", "99999", "emblem_69", "emblem_69", true], // BP ONLY
    ["846", "coin", "99999", "emblem_70", "emblem_70", true], // BP ONLY
    ["848", "coin", "99999", "emblem_72", "emblem_72", true], // BP ONLY
    ["849", "coin", "99999", "emblem_73", "emblem_73", true], // BP ONLY
    ["850", "coin", "99999", "emblem_74", "emblem_74", true], // BP ONLY
    ["852", "coin", "99999", "emblem_76", "emblem_76", true], // BP ONLY
    ["853", "coin", "99999", "emblem_77", "emblem_77", true], // BP ONLY
    ["854", "coin", "99999", "emblem_78", "emblem_78", true], // BP ONLY
    ["855", "coin", "99999", "emblem_79", "emblem_79", true], // BP ONLY
    ["856", "coin", "99999", "emblem_80", "emblem_80", true], // BP ONLY
    ["857", "coin", "99999", "emblem_81", "emblem_81", true], // BP ONLY
    ["859", "coin", "99999", "emblem_83", "emblem_83", true], // BP ONLY
    ["861", "coin", "99999", "emblem_85", "emblem_85", true], // BP ONLY
    ["862", "coin", "99999", "emblem_86", "emblem_86", true], // BP ONLY
    ["863", "coin", "99999", "emblem_87", "emblem_87", true], // WODA TOURNAMENT
    ["918", "coin", "99999", "emblem_92", "emblem_92", true], // SEASON REWARD
    ["924", "coin", "99999", "emblem_98", "emblem_98", true], // SEASON REWARD
    ["925", "coin", "99999", "emblem_99", "emblem_99", true], // SEASON REWARD
    ["927", "coin", "9999", "emblem_111", "emblem_111", true], // WODA TOURNAMENT


    ["1045", "coin", "99999", "emblem_114", "emblem_114", true], // BP ONLY 2026
    ["1046", "coin", "99999", "emblem_115", "emblem_115", true], // BP ONLY 2026
    ["1047", "coin", "99999", "emblem_116", "emblem_116", true], // BP ONLY 2026
    ["1048", "coin", "99999", "emblem_117", "emblem_117", true], // BP ONLY 2026
    ["1071", "coin", "99999", "emblem_120", "emblem_120", true], // BP ONLY 2026
    ["1072", "coin", "99999", "emblem_121", "emblem_121", true], // BP ONLY 2026
    ["1099", "coin", "99999", "emblem_141", "emblem_141", true],
    ["1100", "coin", "99999", "emblem_142", "emblem_142", true],
    ["1101", "coin", "99999", "emblem_143", "emblem_143", true],
    ["1102", "coin", "99999", "emblem_144", "emblem_144", true],
    

    ["178", "coin", "500", "emblem_15", "emblem_15"],
    ["179", "coin", "500", "emblem_16", "emblem_16"],
    ["182", "coin", "500", "emblem_19", "emblem_19"],
    ["181", "coin", "500", "emblem_18", "emblem_18"],
    ["196", "coin", "500", "emblem_33", "emblem_33"],
    ["198", "coin", "500", "emblem_35", "emblem_35"],
    ["199", "coin", "500", "emblem_36", "emblem_36"],
    ["728", "coin", "500", "emblem_55", "emblem_55"],
    ["847", "coin", "500", "emblem_71", "emblem_71"],
    ["851", "coin", "500", "emblem_75", "emblem_75"],
    ["919", "coin", "500", "emblem_93", "emblem_93"],
    ["920", "coin", "500", "emblem_94", "emblem_94"],
    ["921", "coin", "500", "emblem_95", "emblem_95"],
    ["176", "coin", "500", "emblem_13", "emblem_13"],
    ["841", "coin", "500", "emblem_65", "emblem_65"],
    ["930", "coin", "500", "emblem_103", "emblem_103"],
    ["934", "coin", "500", "emblem_107", "emblem_107"],
    ["931", "coin", "500", "emblem_104", "emblem_104"],
    ["933", "coin", "500", "emblem_106", "emblem_106"],
    ["1076", "coin", "1000", "emblem_132", "emblem_132"],
    ["1077", "coin", "1000", "emblem_133", "emblem_133"],
    ["1078", "coin", "1000", "emblem_134", "emblem_134"],
    ["1079", "coin", "1000", "emblem_135", "emblem_135"],
    ["1080", "coin", "1000", "emblem_136", "emblem_136"],
    ["1081", "coin", "1000", "emblem_137", "emblem_137"],
    ["1082", "coin", "1000", "emblem_138", "emblem_138"],
    ["1083", "coin", "1000", "emblem_139", "emblem_139"],
    ["860", "coin", "1500", "emblem_84", "emblem_84"],
    ["195", "coin", "1500", "emblem_32", "emblem_32"],
    ["201", "coin", "1500", "emblem_38", "emblem_38"],
    ["932", "coin", "1500", "emblem_105", "emblem_105"],
    ["126", "coin", "1500", "emblem_3", "emblem_3"],
    ["125", "coin", "1500", "emblem_2", "emblem_2"],
    ["127", "coin", "1500", "emblem_4", "emblem_4"],
    ["124", "coin", "1500", "emblem_1", "emblem_1"],
    ["129", "coin", "1500", "emblem_6", "emblem_6"],
    ["130", "coin", "1500", "emblem_7", "emblem_7"],
    ["128", "coin", "1500", "emblem_5", "emblem_5"],
    ["131", "coin", "1500", "emblem_8", "emblem_8"],
    ["133", "coin", "1500", "emblem_10", "emblem_10"],
    ["134", "coin", "1500", "emblem_11", "emblem_11"],
    ["132", "coin", "1500", "emblem_9", "emblem_9"],
    ["175", "coin", "1500", "emblem_12", "emblem_12"], 
    ["177", "coin", "1500", "emblem_14", "emblem_14"],  
    ["180", "coin", "1500", "emblem_17", "emblem_17"],
    ["183", "coin", "1500", "emblem_20", "emblem_20"],
    ["184", "coin", "1500", "emblem_21", "emblem_21"],
    ["185", "coin", "1500", "emblem_22", "emblem_22"],
    ["186", "coin", "1500", "emblem_23", "emblem_23"],
    ["187", "coin", "1500", "emblem_24", "emblem_24"],
    ["928", "coin", "1500", "emblem_101", "emblem_101"],
    ["929", "coin", "1500", "emblem_102", "emblem_102"],
    ["189", "coin", "1500", "emblem_26", "emblem_26"],
    ["190", "coin", "1500", "emblem_27", "emblem_27"],
    ["191", "coin", "1500", "emblem_28", "emblem_28"],
    ["192", "coin", "1500", "emblem_29", "emblem_29"],
    ["188", "coin", "1500", "emblem_25", "emblem_25"],
    ["203", "coin", "1500", "emblem_39", "emblem_39"],
    ["197", "coin", "1500", "emblem_34", "emblem_34"],
    ["208", "coin", "1500", "emblem_46", "emblem_46"],
	["209", "coin", "1500", "emblem_47", "emblem_47"],
    ["700", "coin", "1500", "emblem_48", "emblem_48"],
    ["207", "coin", "1500", "emblem_45", "emblem_45"],
    ["705", "coin", "1500", "emblem_49", "emblem_49"],
    ["991", "coin", "1500", "emblem_113", "emblem_113"], // BP ONLY
    ["990", "coin", "5000", "emblem_112", "emblem_112"], // BP ONLY
    ["193", "coin", "5000", "emblem_30", "emblem_30"],
    ["204", "coin", "5000", "emblem_40", "emblem_40"],
    ["194", "coin", "5000", "emblem_31", "emblem_31"],
    ["433", "coin", "5000", "emblem_42", "emblem_42"],
    ["434", "coin", "5000", "emblem_43", "emblem_43"],
    ["206", "coin", "5000", "emblem_44", "emblem_44"],
    ["706", "coin", "5000", "emblem_50", "emblem_50"],
    ["723", "coin", "5000", "emblem_52", "emblem_52"],
    ["922", "coin", "5000", "emblem_96", "emblem_96"],
    ["722", "coin", "5000", "emblem_51", "emblem_51"],
    ["923", "coin", "5000", "emblem_97", "emblem_97"],

    
    ["867", "coin", "5000", "emblem_91", "emblem_91"],
    ["858", "coin", "10000", "emblem_82", "emblem_82"],


    ["1074", "coin", "99999", "emblem_130", "emblem_130", true], // SEASON REWARD
    ["1075", "coin", "99999", "emblem_131", "emblem_131", true], // SEASON REWARD
    ["1084", "coin", "99999", "emblem_140", "emblem_140", true], // SEASON REWARD
]

var Items_heads = 
[
    ["839", "coin", "99999", "emblem_63", "emblem_63", true], // BP ONLY
    ["864", "coin", "99999", "emblem_88", "emblem_88", true], // BP ONLY
    ["865", "coin", "99999", "emblem_89", "emblem_89", true], // BP ONLY
    ["935", "coin", "9999", "emblem_108", "emblem_108", true], // WODA TOURNAMENT
    ["1049", "coin", "99999", "emblem_118", "emblem_118", true], // BP ONLY 2026
    ["1050", "coin", "99999", "emblem_119", "emblem_119", true], // BP ONLY 2026
    ["926", "coin", "500", "emblem_100", "emblem_100"],
    ["205", "coin", "500", "emblem_41", "emblem_41"],
    ["200", "coin", "500", "emblem_37", "emblem_37"],
    ["724", "coin", "1500", "emblem_53", "emblem_53"],
    ["725", "coin", "1500", "emblem_54", "emblem_54"],
    ["936", "coin", "5000", "emblem_109", "emblem_109"],
    ["937", "coin", "10000", "emblem_110", "emblem_110"],
    ["866", "coin", "10000", "emblem_90", "emblem_90"],
] 

var Items_tips = 
[
    ["868", "coin", "99999", "tip", "tipped_868", true], // BP ONLY
    ["869", "coin", "99999", "tip", "tipped_869", true], // BP ONLY
    ["870", "coin", "99999", "tip", "tipped_870", true], // BP ONLY
    ["871", "coin", "99999", "tip", "tipped_871", true], // BP ONLY
    ["872", "coin", "99999", "tip", "tipped_872", true], // BP ONLY
    ["873", "coin", "99999", "tip", "tipped_873", true], // BP ONLY
    ["874", "coin", "99999", "tip", "tipped_874", true], // BP ONLY
    ["875", "coin", "99999", "tip", "tipped_875", true], // BP ONLY
    ["876", "coin", "99999", "tip", "tipped_876", true], // BP ONLY
    ["877", "coin", "99999", "tip", "tipped_877", true], // BP ONLY
    ["878", "coin", "99999", "tip", "tipped_878", true], // BP ONLY
    ["879", "coin", "99999", "tip", "tipped_879", true], // BP ONLY
    ["880", "coin", "99999", "tip", "tipped_880", true], // BP ONLY
    ["881", "coin", "99999", "tip", "tipped_881", true], // BP ONLY
    ["882", "coin", "99999", "tip", "tipped_882", true], // BP ONLY
    ["883", "coin", "99999", "tip", "tipped_883", true], // BP ONLY

    ["1017", "coin", "99999", "tip", "tipped_1017", true], // BP ONLY 2026
    ["1018", "coin", "99999", "tip", "tipped_1018", true], // BP ONLY 2026
    ["1019", "coin", "99999", "tip", "tipped_1019", true], // BP ONLY 2026
    ["1021", "coin", "99999", "tip", "tipped_1021", true], // BP ONLY 2026
    ["1022", "coin", "99999", "tip", "tipped_1022", true], // BP ONLY 2026
    ["1023", "coin", "99999", "tip", "tipped_1023", true], // BP ONLY 2026
    ["1024", "coin", "99999", "tip", "tipped_1024", true], // BP ONLY 2026
    ["1025", "coin", "99999", "tip", "tipped_1025", true], // BP ONLY 2026
    ["1026", "coin", "99999", "tip", "tipped_1026", true], // BP ONLY 2026
    ["1027", "coin", "99999", "tip", "tipped_1027", true], // BP ONLY 2026
    ["1028", "coin", "99999", "tip", "tipped_1028", true], // BP ONLY 2026

    ["1092", "coin", "99999", "tip", "tipped_1092", true], // BP ONLY 2026
    ["1093", "coin", "99999", "tip", "tipped_1093", true], // BP ONLY 2026
    ["1094", "coin", "99999", "tip", "tipped_1094", true], // BP ONLY 2026
    ["1095", "coin", "99999", "tip", "tipped_1095", true], // BP ONLY 2026
    

    // ID ПРЕДМЕТА для проверки или для добавления в базу,ВАЛЮТА,СТОИМОСТЬ,ИКОНКА(именно название png файла),переменная названия в локализации, можно покупать много раз или один раз(проверка на покупку в базе)
    ["435", "coin", "150", "tip", "tipped_435"],
    ["436", "coin", "150", "tip", "tipped_436"],
    ["437", "coin", "150", "tip", "tipped_437"],
    ["438", "coin", "150", "tip", "tipped_438"],
    ["439", "coin", "150", "tip", "tipped_439"],
    ["440", "coin", "150", "tip", "tipped_440"],


    ["941", "coin", "150", "tip", "tipped_941"],
    ["942", "coin", "150", "tip", "tipped_942"],
    ["943", "coin", "150", "tip", "tipped_943"],
    ["944", "coin", "150", "tip", "tipped_944"],
    ["945", "coin", "150", "tip", "tipped_945"],
    ["441", "coin", "150", "tip", "tipped_441"],
    ["442", "coin", "150", "tip", "tipped_442"],
    ["443", "coin", "150", "tip", "tipped_443"],
    ["444", "coin", "150", "tip", "tipped_444"],
    ["445", "coin", "150", "tip", "tipped_445"],
    ["446", "coin", "150", "tip", "tipped_446"],
    ["447", "coin", "150", "tip", "tipped_447"],
    ["448", "coin", "150", "tip", "tipped_448"],
    ["449", "coin", "150", "tip", "tipped_449"],
    ["450", "coin", "150", "tip", "tipped_450"],

    ["451", "coin", "150", "tip", "tipped_451"],
    ["452", "coin", "150", "tip", "tipped_452"],
    ["453", "coin", "150", "tip", "tipped_453"],
    ["454", "coin", "150", "tip", "tipped_454"],
    ["455", "coin", "150", "tip", "tipped_455"],
    ["456", "coin", "150", "tip", "tipped_456"],
    ["457", "coin", "150", "tip", "tipped_457"],
    ["458", "coin", "150", "tip", "tipped_458"],
    ["459", "coin", "150", "tip", "tipped_459"],
    ["460", "coin", "150", "tip", "tipped_460"],
    ["461", "coin", "150", "tip", "tipped_461"],
    ["462", "coin", "150", "tip", "tipped_462"],

    ["475", "coin", "150", "tip", "tipped_475"],
    ["476", "coin", "150", "tip", "tipped_476"],
    ["477", "coin", "150", "tip", "tipped_477"],
    ["478", "coin", "150", "tip", "tipped_478"],
    ["479", "coin", "150", "tip", "tipped_479"],
    ["480", "coin", "150", "tip", "tipped_480"],
    ["481", "coin", "150", "tip", "tipped_481"],
    ["482", "coin", "150", "tip", "tipped_482"],

    ["463", "coin", "150", "tip", "tipped_463"],
    ["464", "coin", "150", "tip", "tipped_464"],
    ["465", "coin", "150", "tip", "tipped_465"],
    ["466", "coin", "150", "tip", "tipped_466"],
    ["467", "coin", "150", "tip", "tipped_467"],
    ["468", "coin", "150", "tip", "tipped_468"],
    ["469", "coin", "150", "tip", "tipped_469"],
    ["470", "coin", "150", "tip", "tipped_470"],
    ["471", "coin", "150", "tip", "tipped_471"],
    ["472", "coin", "150", "tip", "tipped_472"],
    ["473", "coin", "150", "tip", "tipped_473"],
    ["474", "coin", "150", "tip", "tipped_474"],

    ["405", "coin", "150", "tip", "tipped_405"],
    ["406", "coin", "150", "tip", "tipped_406"],
    ["407", "coin", "150", "tip", "tipped_407"],
    ["408", "coin", "150", "tip", "tipped_408"],
    ["409", "coin", "150", "tip", "tipped_409"],
    ["410", "coin", "150", "tip", "tipped_410"],
    ["411", "coin", "150", "tip", "tipped_411"],
    ["412", "coin", "150", "tip", "tipped_412"],
    ["413", "coin", "150", "tip", "tipped_413"],
    ["414", "coin", "150", "tip", "tipped_414"],
    ["415", "coin", "150", "tip", "tipped_415"],
    ["416", "coin", "150", "tip", "tipped_416"],  
    ["417", "coin", "150", "tip", "tipped_417"],
    ["418", "coin", "150", "tip", "tipped_418"],
    ["419", "coin", "150", "tip", "tipped_419"],
    ["420", "coin", "150", "tip", "tipped_420"],
    ["421", "coin", "150", "tip", "tipped_421"],
    ["422", "coin", "150", "tip", "tipped_422"],
    ["423", "coin", "150", "tip", "tipped_423"],
    ["424", "coin", "150", "tip", "tipped_424"],
    ["425", "coin", "150", "tip", "tipped_425"],
    ["426", "coin", "150", "tip", "tipped_426"],
    ["427", "coin", "150", "tip", "tipped_427"],
    ["428", "coin", "150", "tip", "tipped_428"],
    ["429", "coin", "150", "tip", "tipped_429"],
    ["430", "coin", "150", "tip", "tipped_430"],
    ["431", "coin", "150", "tip", "tipped_431"],
    ["432", "coin", "150", "tip", "tipped_432"],

    ["703", "coin", "150", "tip", "tipped_703"],
    ["704", "coin", "150", "tip", "tipped_704"],

    ["717", "coin", "150", "tip", "tipped_717"],
    ["718", "coin", "150", "tip", "tipped_718"],
    ["719", "coin", "150", "tip", "tipped_719"],
    ["720", "coin", "150", "tip", "tipped_720"],
    ["721", "coin", "150", "tip", "tipped_721"],

    ["884", "coin", "150", "tip", "tipped_884"],
    ["885", "coin", "150", "tip", "tipped_885"],
    ["886", "coin", "150", "tip", "tipped_886"],
    ["887", "coin", "150", "tip", "tipped_887"],

    ["1104", "coin", "150", "tip", "tipped_1104"],
    ["1105", "coin", "150", "tip", "tipped_1105"],
    ["1106", "coin", "150", "tip", "tipped_1106"],
    ["1107", "coin", "150", "tip", "tipped_1107"],
    ["1108", "coin", "150", "tip", "tipped_1108"],
    ["1109", "coin", "150", "tip", "tipped_1109"],
    ["1110", "coin", "150", "tip", "tipped_1110"],
    ["1111", "coin", "150", "tip", "tipped_1111"],
    ["1112", "coin", "150", "tip", "tipped_1112"],
    ["1113", "coin", "150", "tip", "tipped_1113"],
    ["1114", "coin", "150", "tip", "tipped_1114"],
    ["1115", "coin", "150", "tip", "tipped_1115"],
    ["1116", "coin", "150", "tip", "tipped_1116"],
    ["1117", "coin", "150", "tip", "tipped_1117"],
    ["1118", "coin", "150", "tip", "tipped_1118"],
]

var Items_Runes =
[
    {id: "rune_health", color: "#c84f4f"},
    {id: "rune_strength", color: "#b94738"},
    {id: "rune_regeneration", color: "#d46a4f"},
    {id: "rune_giant", color: "#a94d42"},
    {id: "rune_titan", color: "#9d6750"},
    {id: "rune_warrior", color: "#cb5d32"},
    {id: "rune_cast_range", color: "#d18a42"},
    {id: "rune_sentinel", color: "#8d7052"},
    {id: "rune_antimagic", color: "#7f6fc2"},
    {id: "rune_rebirth", color: "#d6b85a"},

    {id: "rune_knight", color: "#648f5a"},
    {id: "rune_agility", color: "#4f9e64"},
    {id: "rune_evasion", color: "#48a47d"},
    {id: "rune_rage", color: "#7aa646"},
    {id: "rune_monk", color: "#5ba986"},
    {id: "rune_berserker", color: "#8bb34f"},
    {id: "rune_hunter", color: "#52a0a0"},
    {id: "rune_vampire", color: "#7f4c67"},
    {id: "rune_speed", color: "#4c97c2"},
    {id: "rune_gold", color: "#d0a43f"},

    {id: "rune_sage", color: "#5688d0"},
    {id: "rune_intellect", color: "#5f73d9"},
    {id: "rune_restoration", color: "#4fa4ce"},
    {id: "rune_thought", color: "#6a83d8"},
    {id: "rune_curse", color: "#8c63be"},
    {id: "rune_spell", color: "#765bd6"},
    {id: "rune_cleansing", color: "#4eb7c4"},
    {id: "rune_sorcerer", color: "#9b63ca"},
    {id: "rune_barrier", color: "#5db4d2"},
    {id: "rune_creator", color: "#b68bd6"},

    {id: "rune_replenishment", color: "#d87f59"},
    {id: "rune_time", color: "#b8a060"},
    {id: "rune_radius", color: "#62b0bd"},

    {id: "rune_summoner", color: "#6f8fe0"},
    {id: "rune_druid", color: "#6fb56a"},
    {id: "rune_shaman", color: "#4fb0a8"},
    {id: "rune_necromancer", color: "#8a6fbf"},
    {id: "rune_dominator", color: "#c07a4a"},
    {id: "rune_farm", color: "#d4b04a"},
    {id: "rune_champion", color: "#d05a5a"},
]

var SHOP_BUTTONS_CATEGORY =
[
    ["ShopMenuButtonCurrency", "shop_button_currency", "FullYellow"],
    ["ShopMenuButtonWodaPlus", "shop_button_woda_plus", "FullBlue"],
    ["ShopMenuButtonUpgrades", "shop_button_upgrades", "FullPurple"],
    ["ShopMenuButtonHeroVotes", "shop_button_hero_votes", "FullGreen"],
    ["ShopMenuButtonPlus", "shop_button_subscribe", "DonateNewMenuButtonSelected"],
    ["ShopMenuButtonPets", "shop_button_pets", null],
    ["ShopMenuButtonEmblems", "shop_button_emblems", null],
    ["ShopMenuButtonHeads", "shop_button_heads", null],
    ["ShopMenuButtonTips", "shop_button_tips", null],
    ["ShopMenuButtonFive", "shop_button_five", null],
    ["ShopMenuButtonBG", "shop_button_bg", null],
    ["ShopMenuButtonTeleport", "shop_button_teleports", null],
]

var HERO_VOTES_TABLE = 
[
    "npc_dota_hero_largo",
    "npc_dota_hero_alchemist",
    "npc_dota_hero_bane",
    "npc_dota_hero_batrider",
    "npc_dota_hero_beastmaster",
    "npc_dota_hero_bloodseeker",
    "npc_dota_hero_brewmaster",
    "npc_dota_hero_broodmother",
    "npc_dota_hero_centaur",
    //"npc_dota_hero_chaos_knight",
    "npc_dota_hero_clinkz",
    "npc_dota_hero_rattletrap",
    "npc_dota_hero_dark_seer",
    "npc_dota_hero_dark_willow",
    //"npc_dota_hero_dawnbreaker",
    "npc_dota_hero_earth_spirit",
    "npc_dota_hero_elder_titan",
    "npc_dota_hero_ember_spirit",
    "npc_dota_hero_enchantress",
    "npc_dota_hero_enigma",
    "npc_dota_hero_grimstroke",
    "npc_dota_hero_gyrocopter",
    "npc_dota_hero_hoodwink",
    //"npc_dota_hero_keeper_of_the_light",
    "npc_dota_hero_leshrac",
    "npc_dota_hero_life_stealer",
    "npc_dota_hero_lycan",
    "npc_dota_hero_magnataur",
    "npc_dota_hero_mars",
    "npc_dota_hero_mirana",
    //"npc_dota_hero_monkey_king",
    //"npc_dota_hero_ogre_magi",
    "npc_dota_hero_obsidian_destroyer",
    "npc_dota_hero_phantom_lancer",
    "npc_dota_hero_primal_beast",
    "npc_dota_hero_puck",
    "npc_dota_hero_pugna",
    "npc_dota_hero_queenofpain",
    //"npc_dota_hero_riki",
    "npc_dota_hero_ringmaster",
    "npc_dota_hero_sand_king",
    "npc_dota_hero_shadow_demon",
    "npc_dota_hero_shadow_shaman",
    "npc_dota_hero_silencer",
    "npc_dota_hero_snapfire",
    "npc_dota_hero_storm_spirit",
    "npc_dota_hero_sven",
    "npc_dota_hero_templar_assassin",
    "npc_dota_hero_shredder",
    //"npc_dota_hero_tinker",
    "npc_dota_hero_treant",
    "npc_dota_hero_troll_warlord",
    "npc_dota_hero_tusk",
    "npc_dota_hero_abyssal_underlord",
    "npc_dota_hero_venomancer",
    "npc_dota_hero_viper",
    //"npc_dota_hero_visage",
]

var SHOP_NEW_ITEMS_DAYS = 14

var SHOP_NEW_ITEMS =
{
    "1104": "2026-10-24",
    "1105": "2026-10-24",
    "1106": "2026-10-24",
    "1107": "2026-10-24",
    "1108": "2026-10-24",
    "1109": "2026-10-24",
    "1110": "2026-10-24",
    "1111": "2026-10-24",
    "1112": "2026-10-24",
    "1113": "2026-10-24",
    "1114": "2026-10-24",
    "1115": "2026-10-24",
    "1116": "2026-10-24",
    "1117": "2026-10-24",
    "1118": "2026-10-24",
    "upgrade_auto_midas": "2026-10-24",
    "upgrade_curse_armor": "2026-10-24",
    "upgrade_curse_magic": "2026-10-24",
}
