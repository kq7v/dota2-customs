--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var first_time = false;
var current_tab
var PLAYER_DATA = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
var inventory_items_map_cache = null
var bp_reward_refs = []
var bp_list_built = {2025: false, 2026: false}
var bp_list_building = {2025: false, 2026: false}
var bp26_pending_empty_levels = []
var BP_BUILD_CHUNK = 40

// Серверная логика в configs/battlepass_data // lua

// Уникальный айди начинается для повторяющихся залупок - 20000

var bp_rewards =
[   
    [
        ["940", "940", "pet_160"],
        ["930", "emblem_103", "emblem_103"],
        ["946", "background_66", "background_66"],
        ["941", "tip", "tipped_941"],
        ["20000", "xsolla_packs/coins_1", "bp_coins_1150"],
    ],
    [
        ["20001", "double_token", "bp_double_token"],
    ],
    [],
    [
        ["958", "background_78", "background_78"],
    ],
    [
        ["20002", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20003", "double_token", "bp_double_token"],
    ],
    [],
    [
        ["945", "tip", "tipped_945"],
    ],
    [
        ["20004", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20005", "double_token", "bp_double_token"],
    ],
    [],
    [
        ["934", "emblem_107", "emblem_107"],
    ],
    [],
    [],
    [
        ["20006", "double_token", "bp_double_token"],
    ],
    [
        ["955", "background_75", "background_75"],
    ],
    [],
    [   
        ["20007", "xsolla_packs/coins_1", "bp_coins_25"],
        ["20008", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20009", "double_token", "bp_double_token"],
    ],
    [],
    [
        ["939", "939", "pet_159"],
    ],
    [],
    [
        ["931", "emblem_104", "emblem_104"],
    ],
    [
        ["20010", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [   
        ["20011", "xsolla_packs/coins_1", "bp_coins_25"],
        ["929","emblem_102", "emblem_102"],
    ],
    [],
    [
        ["20012", "double_token", "bp_double_token"],
    ],
    [],
    [
        ["951","background_71", "background_71"],
    ],
    [
        ["20013", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20014", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [   
        ["20015", "xsolla_packs/coins_1", "bp_coins_25"],
        ["932", "emblem_105", "emblem_105"],
    ],
    [],
    [
        ["20016", "double_token", "bp_double_token"],
        ["942","tip", "tipped_942"],
    ],
    [],
    [],
    [],
    [],
    [
        ["20017", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20018", "dp1", "bp_woda_plus"],
        ["20019", "xsolla_packs/coins_1", "bp_coins_25"],
        ["949", "background_69", "background_69"],
    ],
    [],
    [
        ["20020", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["933", "emblem_106", "emblem_106"],
    ],
    [],
    [
        ["20021", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20022", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20023", "double_token", "bp_double_token"],
    ],
    [],
    [
        ["953", "background_73", "background_73"],
    ],
    [
        ["20024", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20025", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20026", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20027", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20028", "double_token", "bp_double_token"],
        ["20029", "double_token", "bp_double_token"],
        ["20030", "double_token", "bp_double_token"],
        ["20031", "double_token", "bp_double_token"],
        ["20032", "double_token", "bp_double_token"],
    ],
    [],
    [
        ["20033", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [   
        ["20034", "xsolla_packs/coins_1", "bp_coins_25"],
        ["20035", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20036", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["952", "background_72", "background_72"],
    ],
    [],
    [
        ["20037", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20038", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20039", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20040", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20041", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20042", "xsolla_packs/coins_1", "bp_coins_100"],
        ["936", "emblem_109", "emblem_109"],
    ],
    [],
    [
        ["20043", "double_token", "bp_double_token"],
    ],
    [],
    [
        ["943", "tip", "tipped_943"],
    ],
    [],
    [],
    [
        ["20044", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20045", "xsolla_packs/coins_1", "bp_coins_25"],
        ["20046", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20047", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["959", "background_79", "background_79"],
    ],
    [],
    [
        ["20048", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20049", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20050", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20051", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20052", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20053", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20054", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["947", "background_67", "background_67"],
    ],
    [],
    [
        ["20055", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20056", "xsolla_packs/coins_1", "bp_coins_25"],
        ["20057", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20058", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [],
    [],
    [
        ["20059", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20060", "xsolla_packs/coins_1", "bp_coins_25"],
        ["928", "emblem_101", "emblem_101"],
    ],
    [],
    [
        ["20061", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20062", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20063", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20064", "xsolla_packs/coins_1", "bp_coins_25"],

    ],
    [],
    [
        ["20065", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [],
    [],
    [
        ["20066", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20067", "xsolla_packs/coins_1", "bp_coins_25"],
        ["20068", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20069", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20070", "double_token", "bp_double_token"],
        ["20071", "double_token", "bp_double_token"],
        ["20072", "double_token", "bp_double_token"],
        ["20073", "double_token", "bp_double_token"],
        ["20074", "double_token", "bp_double_token"],
    ],
    [],
    [
        ["20075", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20076", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20077", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20078", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20079", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20080", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20081", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [],
    [],
    [
        ["20082", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20083", "xsolla_packs/coins_1", "bp_coins_100"],
        ["20084", "dp1", "bp_woda_plus"],
        ["938", "938", "pet_158"],
    ],
    [],
    [
        ["20085", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["944", "tip", "tipped_944"],
    ],
    [],
    [
        ["20086", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20087", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20088", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20089", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20090", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20091", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20092", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["954", "background_74", "background_74"],
    ],
    [],
    [
        ["20093", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20094", "xsolla_packs/coins_1", "bp_coins_25"],
        ["20095", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20096", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [],
    [],
    [
        ["20097", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20098", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20099", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20100", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20101", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20102", "xsolla_packs/coins_1", "bp_coins_25"],
        ["937", "emblem_110", "emblem_110"],
    ],
    [],
    [
        ["20103", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [],
    [],
    [
        ["20104", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20105", "xsolla_packs/coins_1", "bp_coins_25"],
        ["20106", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20107", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [],
    [],
    [
        ["20108", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20109", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20110", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20111", "double_token", "bp_double_token"],
        ["20112", "double_token", "bp_double_token"],
        ["20113", "double_token", "bp_double_token"],
        ["20114", "double_token", "bp_double_token"],
        ["20115", "double_token", "bp_double_token"],
        ["20116", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20117", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20118", "xsolla_packs/coins_1", "bp_coins_25"],
    ],
    [],
    [
        ["20119", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [],
    [],
    [
        ["20120", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20121", "xsolla_packs/coins_1", "bp_coins_25"],
        ["20122", "dp1", "bp_woda_plus"],
    ],
    [],
    [
        ["20123", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [],
    [],
    [
        ["20124", "double_token", "bp_double_token"],
    ],
    [],
    [],
    [
        ["20125", "xsolla_packs/coins_1", "bp_coins_1150"],
    ]
]

var bp_rewards_2026 =
[
    [["30206", "xsolla_packs/coins_1", "bp_coins_500"], ["1017", "tip", "tipped_1017"], ["1050", "emblem_119", "emblem_119"], ["1029", "background_114", "background_114"], ["1005", "1005", "pet_180"], ["1011", "tp_effect_11", "tp_effect_11"]], //1
    [["30000", "double_token", "bp_double_token"]], //2
    [], //3
    [["1073", "background_130", "background_130"]], //4
    [["30001", "xsolla_packs/coins_1", "bp_coins_25"]], //5
    [], //6
    [["30002", "dp1", "bp_woda_plus"]], //7
    [["30237", "coal", "bp_coal_1"]], //8
    [], //9
    [["30003", "xsolla_packs/coins_1", "bp_coins_25"], ["1016", "five_14", "five_14"]], //10
    [], //11
    [["30004", "double_token", "bp_double_token"]], //12
    [["30238", "coal", "bp_coal_1"]], //13
    [], //14
    [["30005", "xsolla_packs/coins_1", "bp_coins_25"], ["30227", "boss_soul_big", "bp_boss_souls_3"]], //15
    [], //16
    [["30006", "dp1", "bp_woda_plus"]], //17
    [["30239", "coal", "bp_coal_1"]], //18
    [], //19
    [["30007", "xsolla_packs/coins_1", "bp_coins_25"], ["1048", "emblem_117", "emblem_117"]], //20
    [], //21
    [["30008", "double_token", "bp_double_token"]], //22
    [["30240", "coal", "bp_coal_1"]], //23
    [], //24
    [["1030", "background_115", "background_115"]], //25
    [], //26
    [["30009", "dp1", "bp_woda_plus"]], //27
    [["30241", "coal", "bp_coal_1"]], //28
    [], //29
    [["30010", "xsolla_packs/coins_1", "bp_coins_25"]], //30
    [], //31
    [["30011", "double_token", "bp_double_token"]], //32
    [["30212", "xsolla_packs/crystals_1", "bp_crystals_5"]], //33
    [], //34
    [["30012", "xsolla_packs/coins_1", "bp_coins_25"], ["30207", "rune_chest", "rune_chest_item"]], //35
    [], //36
    [["30013", "dp1", "bp_woda_plus"]], //37
    [["30242", "coal", "bp_coal_1"]], //38
    [], //39
    [["30014", "xsolla_packs/coins_1", "bp_coins_25"], ["1072", "emblem_121", "emblem_121"]], //40
    [], //41
    [["30015", "double_token", "bp_double_token"]], //42
    [["30243", "coal", "bp_coal_1"]], //43
    [], //44
    [["30016", "xsolla_packs/coins_1", "bp_coins_25"]], //45
    [], //46
    [["30017", "dp1", "bp_woda_plus"]], //47
    [["30244", "coal", "bp_coal_1"]], //48
    [], //49
    [["30018", "double_token", "bp_double_token"], ["30019", "double_token", "bp_double_token"], ["30020", "double_token", "bp_double_token"], ["30021", "double_token", "bp_double_token"], ["30022", "double_token", "bp_double_token"], ["1018", "tip", "tipped_1018"]], //50
    [], //51
    [["30023", "double_token", "bp_double_token"]], //52
    [["30245", "coal", "bp_coal_1"]], //53
    [], //54
    [["30024", "xsolla_packs/coins_1", "bp_coins_25"]], //55
    [], //56
    [["30025", "dp1", "bp_woda_plus"]], //57
    [["30246", "coal", "bp_coal_1"]], //58
    [], //59
    [["30026", "xsolla_packs/coins_1", "bp_coins_25"], ["1041", "background_126", "background_126"]], //60
    [], //61
    [["30027", "double_token", "bp_double_token"]], //62
    [["30247", "coal", "bp_coal_1"]], //63
    [], //64
    [["30028", "xsolla_packs/coins_1", "bp_coins_25"], ["30228", "boss_soul_big", "bp_boss_souls_3"]], //65
    [["30213", "xsolla_packs/crystals_1", "bp_crystals_5"]], //66
    [["30029", "dp1", "bp_woda_plus"]], //67
    [["30248", "coal", "bp_coal_1"]], //68
    [], //69
    [["30030", "xsolla_packs/coins_1", "bp_coins_25"]], //70
    [], //71
    [["30031", "double_token", "bp_double_token"]], //72
    [["30249", "coal", "bp_coal_1"]], //73
    [], //74
    [["1031", "background_116", "background_116"], ["1092", "tip", "tipped_1092"], ["1093", "tip", "tipped_1093"], ["1094", "tip", "tipped_1094"], ["1095", "tip", "tipped_1095"]], //75
    [], //76
    [["30032", "dp1", "bp_woda_plus"]], //77
    [["30250", "coal", "bp_coal_1"]], //78
    [], //79
    [["30033", "xsolla_packs/coins_1", "bp_coins_25"]], //80
    [], //81
    [["30034", "double_token", "bp_double_token"]], //82
    [["30251", "coal", "bp_coal_1"]], //83
    [], //84
    [["30035", "xsolla_packs/coins_1", "bp_coins_25"]], //85
    [], //86
    [["30036", "dp1", "bp_woda_plus"]], //87
    [["30252", "coal", "bp_coal_1"]], //88
    [], //89
    [["30037", "xsolla_packs/coins_1", "bp_coins_25"]], //90
    [], //91
    [["30038", "double_token", "bp_double_token"]], //92
    [["30253", "coal", "bp_coal_1"]], //93
    [], //94
    [["30039", "xsolla_packs/coins_1", "bp_coins_25"]], //95
    [], //96
    [["30040", "dp1", "bp_woda_plus"]], //97
    [], //98
    [["30214", "xsolla_packs/crystals_1", "bp_crystals_5"]], //99
    [["1019", "tip", "tipped_1019"], ["1045", "emblem_114", "emblem_114"], ["1014", "five_12", "five_12"]], //100
    [], //101
    [["30041", "double_token", "bp_double_token"]], //102
    [["30254", "coal", "bp_coal_1"]], //103
    [], //104
    [["30042", "xsolla_packs/coins_1", "bp_coins_25"]], //105
    [], //106
    [["30043", "dp1", "bp_woda_plus"]], //107
    [["30255", "coal", "bp_coal_1"]], //108
    [], //109
    [["30044", "xsolla_packs/coins_1", "bp_coins_25"]], //110
    [], //111
    [["30045", "double_token", "bp_double_token"]], //112
    [["30256", "coal", "bp_coal_1"]], //113
    [], //114
    [["30046", "xsolla_packs/coins_1", "bp_coins_25"], ["30229", "boss_soul_big", "bp_boss_souls_3"]], //115
    [], //116
    [["30047", "dp1", "bp_woda_plus"]], //117
    [["30257", "coal", "bp_coal_1"]], //118
    [], //119
    [["30048", "xsolla_packs/coins_1", "bp_coins_25"]], //120
    [], //121
    [["30049", "double_token", "bp_double_token"]], //122
    [["30258", "coal", "bp_coal_1"]], //123
    [], //124
    [["1032", "background_117", "background_117"], ["1007", "1007", "pet_182"]], //125
    [], //126
    [["30050", "dp1", "bp_woda_plus"]], //127
    [["30259", "coal", "bp_coal_1"]], //128
    [], //129
    [["30051", "xsolla_packs/coins_1", "bp_coins_25"]], //130
    [], //131
    [["30052", "double_token", "bp_double_token"], ["30215", "xsolla_packs/crystals_1", "bp_crystals_5"]], //132
    [["30260", "coal", "bp_coal_1"]], //133
    [], //134
    [["30053", "xsolla_packs/coins_1", "bp_coins_25"], ["30208", "rune_chest", "rune_chest_item"]], //135
    [], //136
    [["30054", "dp1", "bp_woda_plus"]], //137
    [["30261", "coal", "bp_coal_1"]], //138
    [], //139
    [["30055", "xsolla_packs/coins_1", "bp_coins_25"]], //140
    [], //141
    [["30056", "double_token", "bp_double_token"]], //142
    [["30262", "coal", "bp_coal_1"]], //143
    [], //144
    [["30057", "xsolla_packs/coins_1", "bp_coins_25"]], //145
    [], //146
    [["30058", "dp1", "bp_woda_plus"]], //147
    [["30263", "coal", "bp_coal_1"]], //148
    [], //149
    [["30059", "double_token", "bp_double_token"], ["30060", "double_token", "bp_double_token"], ["30061", "double_token", "bp_double_token"], ["30062", "double_token", "bp_double_token"], ["30063", "double_token", "bp_double_token"], ["1021", "tip", "tipped_1021"]], //150
    [], //151
    [["30064", "double_token", "bp_double_token"]], //152
    [["30264", "coal", "bp_coal_1"]], //153
    [], //154
    [["30065", "xsolla_packs/coins_1", "bp_coins_25"]], //155
    [], //156
    [["30066", "dp1", "bp_woda_plus"]], //157
    [["30265", "coal", "bp_coal_1"]], //158
    [], //159
    [["30067", "xsolla_packs/coins_1", "bp_coins_25"], ["1042", "background_127", "background_127"]], //160
    [], //161
    [["30068", "double_token", "bp_double_token"]], //162
    [["30266", "coal", "bp_coal_1"]], //163
    [], //164
    [["30069", "xsolla_packs/coins_1", "bp_coins_25"], ["30216", "xsolla_packs/crystals_1", "bp_crystals_5"], ["30230", "boss_soul_big", "bp_boss_souls_3"]], //165
    [], //166
    [["30070", "dp1", "bp_woda_plus"]], //167
    [["30267", "coal", "bp_coal_1"]], //168
    [], //169
    [["30071", "xsolla_packs/coins_1", "bp_coins_25"]], //170
    [], //171
    [["30072", "double_token", "bp_double_token"]], //172
    [["30268", "coal", "bp_coal_1"]], //173
    [], //174
    [["1033", "background_118", "background_118"]], //175
    [], //176
    [["30073", "dp1", "bp_woda_plus"]], //177
    [["30269", "coal", "bp_coal_1"]], //178
    [], //179
    [["30074", "xsolla_packs/coins_1", "bp_coins_25"]], //180
    [], //181
    [["30075", "double_token", "bp_double_token"]], //182
    [["30270", "coal", "bp_coal_1"]], //183
    [], //184
    [["30076", "xsolla_packs/coins_1", "bp_coins_25"]], //185
    [], //186
    [["30077", "dp1", "bp_woda_plus"]], //187
    [["30271", "coal", "bp_coal_1"]], //188
    [], //189
    [["30078", "xsolla_packs/coins_1", "bp_coins_25"]], //190
    [], //191
    [["30079", "double_token", "bp_double_token"]], //192
    [["30272", "coal", "bp_coal_1"]], //193
    [], //194
    [["30080", "xsolla_packs/coins_1", "bp_coins_25"]], //195
    [], //196
    [["30081", "dp1", "bp_woda_plus"]], //197
    [["30217", "xsolla_packs/crystals_1", "bp_crystals_5"]], //198
    [], //199
    [["1022", "tip", "tipped_1022"], ["1046", "emblem_115", "emblem_115"]], //200
    [], //201
    [["30082", "double_token", "bp_double_token"]], //202
    [["30273", "coal", "bp_coal_1"]], //203
    [], //204
    [["30083", "xsolla_packs/coins_1", "bp_coins_25"]], //205
    [], //206
    [["30084", "dp1", "bp_woda_plus"]], //207
    [["30274", "coal", "bp_coal_1"]], //208
    [], //209
    [["30085", "xsolla_packs/coins_1", "bp_coins_25"]], //210
    [], //211
    [["30086", "double_token", "bp_double_token"]], //212
    [["30275", "coal", "bp_coal_1"]], //213
    [], //214
    [["30087", "xsolla_packs/coins_1", "bp_coins_25"], ["30231", "boss_soul_big", "bp_boss_souls_3"]], //215
    [], //216
    [["30088", "dp1", "bp_woda_plus"]], //217
    [["30276", "coal", "bp_coal_1"]], //218
    [], //219
    [["30089", "xsolla_packs/coins_1", "bp_coins_25"]], //220
    [], //221
    [["30090", "double_token", "bp_double_token"]], //222
    [["30277", "coal", "bp_coal_1"]], //223
    [], //224
    [["1034", "background_119", "background_119"], ["1008", "1008", "pet_183"]], //225
    [], //226
    [["30091", "dp1", "bp_woda_plus"]], //227
    [["30278", "coal", "bp_coal_1"]], //228
    [], //229
    [["30092", "xsolla_packs/coins_1", "bp_coins_25"]], //230
    [["30218", "xsolla_packs/crystals_1", "bp_crystals_5"]], //231
    [["30093", "double_token", "bp_double_token"]], //232
    [["30279", "coal", "bp_coal_1"]], //233
    [], //234
    [["30094", "xsolla_packs/coins_1", "bp_coins_25"], ["30209", "rune_chest", "rune_chest_item"]], //235
    [], //236
    [["30095", "dp1", "bp_woda_plus"]], //237
    [["30280", "coal", "bp_coal_1"]], //238
    [], //239
    [["30096", "xsolla_packs/coins_1", "bp_coins_25"]], //240
    [], //241
    [["30097", "double_token", "bp_double_token"]], //242
    [["30281", "coal", "bp_coal_1"]], //243
    [], //244
    [["30098", "xsolla_packs/coins_1", "bp_coins_25"]], //245
    [], //246
    [["30099", "dp1", "bp_woda_plus"]], //247
    [["30282", "coal", "bp_coal_1"]], //248
    [], //249
    [["30100", "double_token", "bp_double_token"], ["30101", "double_token", "bp_double_token"], ["30102", "double_token", "bp_double_token"], ["30103", "double_token", "bp_double_token"], ["30104", "double_token", "bp_double_token"], ["1023", "tip", "tipped_1023"]], //250
    [], //251
    [["30105", "double_token", "bp_double_token"]], //252
    [["30283", "coal", "bp_coal_1"]], //253
    [], //254
    [["30106", "xsolla_packs/coins_1", "bp_coins_25"]], //255
    [], //256
    [["30107", "dp1", "bp_woda_plus"]], //257
    [["30284", "coal", "bp_coal_1"]], //258
    [], //259
    [["30108", "xsolla_packs/coins_1", "bp_coins_25"], ["1043", "background_128", "background_128"]], //260
    [], //261
    [["30109", "double_token", "bp_double_token"]], //262
    [], //263
    [["30219", "xsolla_packs/crystals_1", "bp_crystals_5"]], //264
    [["30110", "xsolla_packs/coins_1", "bp_coins_25"], ["30232", "boss_soul_big", "bp_boss_souls_3"]], //265
    [], //266
    [["30111", "dp1", "bp_woda_plus"]], //267
    [["30285", "coal", "bp_coal_1"]], //268
    [], //269
    [["30112", "xsolla_packs/coins_1", "bp_coins_25"]], //270
    [], //271
    [["30113", "double_token", "bp_double_token"]], //272
    [["30286", "coal", "bp_coal_1"]], //273
    [], //274
    [["1035", "background_120", "background_120"]], //275
    [], //276
    [["30114", "dp1", "bp_woda_plus"]], //277
    [["30287", "coal", "bp_coal_1"]], //278
    [], //279
    [["30115", "xsolla_packs/coins_1", "bp_coins_25"]], //280
    [], //281
    [["30116", "double_token", "bp_double_token"]], //282
    [["30288", "coal", "bp_coal_1"]], //283
    [], //284
    [["30117", "xsolla_packs/coins_1", "bp_coins_25"]], //285
    [], //286
    [["30118", "dp1", "bp_woda_plus"]], //287
    [["30289", "coal", "bp_coal_1"]], //288
    [], //289
    [["30119", "xsolla_packs/coins_1", "bp_coins_25"]], //290
    [], //291
    [["30120", "double_token", "bp_double_token"]], //292
    [["30290", "coal", "bp_coal_1"]], //293
    [], //294
    [["30121", "xsolla_packs/coins_1", "bp_coins_25"]], //295
    [], //296
    [["30122", "dp1", "bp_woda_plus"], ["30220", "xsolla_packs/crystals_1", "bp_crystals_5"]], //297
    [["30291", "coal", "bp_coal_1"]], //298
    [], //299
    [["1024", "tip", "tipped_1024"], ["1047", "emblem_116", "emblem_116"], ["1013", "five_11", "five_11"]], //300
    [], //301
    [["30123", "double_token", "bp_double_token"]], //302
    [["30292", "coal", "bp_coal_1"]], //303
    [], //304
    [["30124", "xsolla_packs/coins_1", "bp_coins_25"]], //305
    [], //306
    [["30125", "dp1", "bp_woda_plus"]], //307
    [["30293", "coal", "bp_coal_1"]], //308
    [], //309
    [["30126", "xsolla_packs/coins_1", "bp_coins_25"]], //310
    [], //311
    [["30127", "double_token", "bp_double_token"]], //312
    [["30294", "coal", "bp_coal_1"]], //313
    [], //314
    [["30128", "xsolla_packs/coins_1", "bp_coins_25"], ["30233", "boss_soul_big", "bp_boss_souls_3"]], //315
    [], //316
    [["30129", "dp1", "bp_woda_plus"]], //317
    [["30295", "coal", "bp_coal_1"]], //318
    [], //319
    [["30130", "xsolla_packs/coins_1", "bp_coins_25"]], //320
    [], //321
    [["30131", "double_token", "bp_double_token"]], //322
    [["30296", "coal", "bp_coal_1"]], //323
    [], //324
    [["1036", "background_121", "background_121"], ["1009", "1009", "pet_184"]], //325
    [], //326
    [["30132", "dp1", "bp_woda_plus"]], //327
    [["30297", "coal", "bp_coal_1"]], //328
    [], //329
    [["30133", "xsolla_packs/coins_1", "bp_coins_25"], ["30221", "xsolla_packs/crystals_1", "bp_crystals_5"]], //330
    [], //331
    [["30134", "double_token", "bp_double_token"]], //332
    [["30298", "coal", "bp_coal_1"]], //333
    [], //334
    [["30135", "xsolla_packs/coins_1", "bp_coins_25"], ["30210", "rune_chest", "rune_chest_item"]], //335
    [], //336
    [["30136", "dp1", "bp_woda_plus"]], //337
    [["30299", "coal", "bp_coal_1"]], //338
    [], //339
    [["30137", "xsolla_packs/coins_1", "bp_coins_25"]], //340
    [], //341
    [["30138", "double_token", "bp_double_token"]], //342
    [["30300", "coal", "bp_coal_1"]], //343
    [], //344
    [["30139", "xsolla_packs/coins_1", "bp_coins_25"]], //345
    [], //346
    [["30140", "dp1", "bp_woda_plus"]], //347
    [["30301", "coal", "bp_coal_1"]], //348
    [], //349
    [["30141", "double_token", "bp_double_token"], ["30142", "double_token", "bp_double_token"], ["30143", "double_token", "bp_double_token"], ["30144", "double_token", "bp_double_token"], ["30145", "double_token", "bp_double_token"], ["1025", "tip", "tipped_1025"]], //350
    [], //351
    [["30146", "double_token", "bp_double_token"]], //352
    [["30302", "coal", "bp_coal_1"]], //353
    [], //354
    [["30147", "xsolla_packs/coins_1", "bp_coins_25"]], //355
    [], //356
    [["30148", "dp1", "bp_woda_plus"]], //357
    [["30303", "coal", "bp_coal_1"]], //358
    [], //359
    [["30149", "xsolla_packs/coins_1", "bp_coins_25"], ["1044", "background_129", "background_129"]], //360
    [], //361
    [["30150", "double_token", "bp_double_token"]], //362
    [["30222", "xsolla_packs/crystals_1", "bp_crystals_5"]], //363
    [], //364
    [["30151", "xsolla_packs/coins_1", "bp_coins_25"], ["30234", "boss_soul_big", "bp_boss_souls_3"]], //365
    [], //366
    [["30152", "dp1", "bp_woda_plus"]], //367
    [["30304", "coal", "bp_coal_1"]], //368
    [], //369
    [["30153", "xsolla_packs/coins_1", "bp_coins_25"]], //370
    [], //371
    [["30154", "double_token", "bp_double_token"]], //372
    [["30305", "coal", "bp_coal_1"]], //373
    [], //374
    [["1037", "background_122", "background_122"]], //375
    [], //376
    [["30155", "dp1", "bp_woda_plus"]], //377
    [["30306", "coal", "bp_coal_1"]], //378
    [], //379
    [["30156", "xsolla_packs/coins_1", "bp_coins_25"]], //380
    [], //381
    [["30157", "double_token", "bp_double_token"]], //382
    [["30307", "coal", "bp_coal_1"]], //383
    [], //384
    [["30158", "xsolla_packs/coins_1", "bp_coins_25"]], //385
    [], //386
    [["30159", "dp1", "bp_woda_plus"]], //387
    [["30308", "coal", "bp_coal_1"]], //388
    [], //389
    [["30160", "xsolla_packs/coins_1", "bp_coins_25"]], //390
    [], //391
    [["30161", "double_token", "bp_double_token"]], //392
    [["30309", "coal", "bp_coal_1"]], //393
    [], //394
    [["30162", "xsolla_packs/coins_1", "bp_coins_25"]], //395
    [["30223", "xsolla_packs/crystals_1", "bp_crystals_5"]], //396
    [["30163", "dp1", "bp_woda_plus"]], //397
    [["30310", "coal", "bp_coal_1"]], //398
    [], //399
    [["1026", "tip", "tipped_1026"], ["1015", "five_13", "five_13"]], //400
    [], //401
    [["30164", "double_token", "bp_double_token"]], //402
    [["30311", "coal", "bp_coal_1"]], //403
    [], //404
    [["30165", "xsolla_packs/coins_1", "bp_coins_25"]], //405
    [], //406
    [["30166", "dp1", "bp_woda_plus"]], //407
    [["30312", "coal", "bp_coal_1"]], //408
    [], //409
    [["30167", "xsolla_packs/coins_1", "bp_coins_25"]], //410
    [], //411
    [["30168", "double_token", "bp_double_token"]], //412
    [["30313", "coal", "bp_coal_1"]], //413
    [], //414
    [["30169", "xsolla_packs/coins_1", "bp_coins_25"], ["30235", "boss_soul_big", "bp_boss_souls_3"]], //415
    [], //416
    [["30170", "dp1", "bp_woda_plus"]], //417
    [["30314", "coal", "bp_coal_1"]], //418
    [], //419
    [["30171", "xsolla_packs/coins_1", "bp_coins_25"]], //420
    [], //421
    [["30172", "double_token", "bp_double_token"]], //422
    [["30315", "coal", "bp_coal_1"]], //423
    [], //424
    [["1038", "background_123", "background_123"], ["1010", "1010", "pet_185"]], //425
    [], //426
    [["30173", "dp1", "bp_woda_plus"]], //427
    [], //428
    [["30224", "xsolla_packs/crystals_1", "bp_crystals_5"]], //429
    [["30174", "xsolla_packs/coins_1", "bp_coins_25"]], //430
    [], //431
    [["30175", "double_token", "bp_double_token"]], //432
    [["30316", "coal", "bp_coal_1"]], //433
    [], //434
    [["30176", "xsolla_packs/coins_1", "bp_coins_25"], ["30211", "rune_chest", "rune_chest_item"]], //435
    [], //436
    [["30177", "dp1", "bp_woda_plus"]], //437
    [["30317", "coal", "bp_coal_1"]], //438
    [], //439
    [["30178", "xsolla_packs/coins_1", "bp_coins_25"]], //440
    [], //441
    [["30179", "double_token", "bp_double_token"]], //442
    [["30318", "coal", "bp_coal_1"]], //443
    [], //444
    [["30180", "xsolla_packs/coins_1", "bp_coins_25"]], //445
    [], //446
    [["30181", "dp1", "bp_woda_plus"]], //447
    [["30319", "coal", "bp_coal_1"]], //448
    [], //449
    [["30182", "double_token", "bp_double_token"], ["30183", "double_token", "bp_double_token"], ["30184", "double_token", "bp_double_token"], ["30185", "double_token", "bp_double_token"], ["30186", "double_token", "bp_double_token"], ["1027", "tip", "tipped_1027"]], //450
    [], //451
    [["30187", "double_token", "bp_double_token"]], //452
    [["30320", "coal", "bp_coal_1"]], //453
    [], //454
    [["30188", "xsolla_packs/coins_1", "bp_coins_25"]], //455
    [], //456
    [["30189", "dp1", "bp_woda_plus"]], //457
    [["30321", "coal", "bp_coal_1"]], //458
    [], //459
    [["30190", "xsolla_packs/coins_1", "bp_coins_25"], ["1071", "emblem_120", "emblem_120"]], //460
    [], //461
    [["30191", "double_token", "bp_double_token"], ["30225", "xsolla_packs/crystals_1", "bp_crystals_5"]], //462
    [["30322", "coal", "bp_coal_1"]], //463
    [], //464
    [["30192", "xsolla_packs/coins_1", "bp_coins_25"], ["30236", "boss_soul_big", "bp_boss_souls_3"]], //465
    [], //466
    [["30193", "dp1", "bp_woda_plus"]], //467
    [["30323", "coal", "bp_coal_1"]], //468
    [], //469
    [["30194", "xsolla_packs/coins_1", "bp_coins_25"]], //470
    [], //471
    [["30195", "double_token", "bp_double_token"]], //472
    [["30324", "coal", "bp_coal_1"]], //473
    [], //474
    [["1039", "background_124", "background_124"]], //475
    [], //476
    [["30196", "dp1", "bp_woda_plus"]], //477
    [["30325", "coal", "bp_coal_1"]], //478
    [], //479
    [["30197", "xsolla_packs/coins_1", "bp_coins_25"]], //480
    [], //481
    [["30198", "double_token", "bp_double_token"]], //482
    [["30326", "coal", "bp_coal_1"]], //483
    [], //484
    [["30199", "xsolla_packs/coins_1", "bp_coins_25"]], //485
    [], //486
    [["30200", "dp1", "bp_woda_plus"]], //487
    [["30327", "coal", "bp_coal_1"]], //488
    [], //489
    [["30201", "xsolla_packs/coins_1", "bp_coins_25"]], //490
    [], //491
    [["30202", "double_token", "bp_double_token"]], //492
    [["30328", "coal", "bp_coal_1"]], //493
    [], //494
    [["30203", "xsolla_packs/coins_1", "bp_coins_25"], ["30226", "xsolla_packs/crystals_1", "bp_crystals_5"]], //495
    [], //496
    [["30204", "dp1", "bp_woda_plus"]], //497
    [["30329", "coal", "bp_coal_1"]], //498
    [], //499
    [["30205", "xsolla_packs/coins_1", "bp_coins_500"], ["1028", "tip", "tipped_1028"], ["1049", "emblem_118", "emblem_118"], ["1040", "background_125", "background_125"], ["1006", "1006", "pet_181"], ["1012", "tp_effect_12", "tp_effect_12"]] //500
];

for (let bp_num in bp_rewards)
{
    let reward_data = bp_rewards[bp_num]
    if (reward_data.length > 0)
    {
        for (let reward_info in reward_data) 
        {
            if (reward_data[reward_info][2] == "bp_coins_1150")
            {
                //$.Msg("["+reward_data[reward_info][0]+"] = " + '{"coins", ' + 1150 + '},')
            }
            if (reward_data[reward_info][2] == "bp_coins_100")
            {
                //$.Msg("["+reward_data[reward_info][0]+"] = " + '{"coins", ' + 100 + '},')
            }
            if (reward_data[reward_info][2] == "bp_coins_25")
            {
                //$.Msg("["+reward_data[reward_info][0]+"] = " + '{"coins", ' + 25 + '},')
            }
            if (reward_data[reward_info][2] == "bp_double_token")
            {
                //$.Msg("["+reward_data[reward_info][0]+"] = " + '{"double_token", ' + 1 + '},')
            }
            if (reward_data[reward_info][2] == "bp_woda_plus")
            {
                //$.Msg("["+reward_data[reward_info][0]+"] = " + '{"plus", ' + 1 + '},')
            }
        }
    }
}

Game.SubscribeCustomTableListener("woda_player_data", UpdatePlayerData );
function UpdatePlayerData(table, key, data) 
{
	if (table == "woda_player_data") 
	{
        if (key == String(Players.GetLocalPlayer()) || key == Players.GetLocalPlayer())
        {
            PLAYER_DATA = data;
            inventory_items_map_cache = null
            UpdateIconButton()
            if ($("#DonateShopWindow").BHasClass("setvisible"))
            {
                InitData()
                UpdateStoreBackground()
            }
            CheckoutEveryReward()
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
    }
    InitData()
    UpdateStoreBackground()
    if (current_tab != tab)
    {
        SwitchTab(tab, button)
        SetDonateWindowVisible(true)
    }
    else
    {
        SetDonateWindowVisible(!$("#DonateShopWindow").BHasClass("setvisible"))
    }
    if ($("#DonateShopWindow").BHasClass("setvisible"))
    {
        EnsureRewardList(current_tab)
        ScrollBattlePassToCurrentLevel()
    }
    if (GameUI.CustomUIConfig().CloseShopGlobal)
    {
        GameUI.CustomUIConfig().CloseShopGlobal()
    }
    if (GameUI.CustomUIConfig().CloseWPlusGlobal)
    {
        GameUI.CustomUIConfig().CloseWPlusGlobal()
    }
}

function ToggleDonateButtonCloseW() 
{
    SetDonateWindowVisible(false)
}

GameUI.CustomUIConfig().CloseBattlePassGlobal = ToggleDonateButtonCloseW

function SwitchTab(tab, button) 
{
    if (current_tab != tab)
    {
        Game.EmitSound("ui_topmenu_select")
    }
    for (menu_panel of $("#NavigationMenu").Children())
    {
        menu_panel.SetHasClass( "DonateNewMenuButtonSelected2", false );
        if (menu_panel.id == button)
        {
            menu_panel.SetHasClass( "DonateNewMenuButtonSelected2", true );
        }
    }
    for (menu_panel of $("#SubsPanels").Children())
    {
        menu_panel.visible = false
        if (menu_panel.id == tab)
        {
            menu_panel.visible = true
        }
    }
    current_tab = tab
    EnsureRewardList(tab)
}

function GetRewardListYear(tab)
{
    return tab == "MainPanel" ? 2025 : 2026
}

function EnsureRewardList(tab)
{
    var year = GetRewardListYear(tab)
    if (bp_list_built[year] || bp_list_building[year])
    {
        return
    }
    bp_list_building[year] = true
    var rewards = year == 2025 ? bp_rewards : bp_rewards_2026
    var line = $(year == 2025 ? "#BattlePassRewardsLine" : "#BattlePassRewardsLineNew")
    if (line)
    {
        line.RemoveAndDeleteChildren()
    }
    if (year == 2026)
    {
        bp26_pending_empty_levels = []
    }
    var total = rewards.length
    var index = 0
    var step = function()
    {
        var stop = Math.min(index + BP_BUILD_CHUNK, total)
        for (; index < stop; index++)
        {
            if (year == 2025)
            {
                CreateRewardBlock(index + 1, rewards[index])
            }
            else
            {
                CreateRewardBlockNew(index + 1, rewards[index])
            }
        }
        if (index < total)
        {
            $.Schedule(0.0, step)
            return
        }
        if (year == 2026)
        {
            FlushBattlePassEmptyLevels()
        }
        bp_list_building[year] = false
        bp_list_built[year] = true
        RefreshRewardStates()
        if (year == 2026)
        {
            ScrollBattlePassToCurrentLevel()
        }
    }
    step()
}

function RefreshRewardStates()
{
    var localplayer_data = PLAYER_DATA
    if (!localplayer_data) { return }
    var level_2025 = Number(localplayer_data.battlepass_level) || 0
    var level_2026 = Number(localplayer_data.battlepass_level_2026) || 0
    var has_2025 = localplayer_data.has_battlepass === 1
    var has_2026 = localplayer_data.has_battlepass_2026 === 1
    for (var i = 0; i < bp_reward_refs.length; i++)
    {
        var ref = bp_reward_refs[i]
        if (!ref.block.IsValid()) { continue }
        var reach = ref.year == 2025 ? (has_2025 && level_2025 >= ref.level) : (has_2026 && level_2026 >= ref.level)
        ref.block.SetHasClass("ActiveReach", reach)
        if (!ref.claim) { continue }
        var owned = ref.claimed || HasItemInventory(ref.reward_id)
        if (owned != ref.owned_state)
        {
            ref.owned_state = owned
            ref.claim.SetHasClass("ClaimRewardSuccess", owned)
            ref.claim_label.text = $.Localize(owned ? "#woda_quest_claim_reward_sucess" : "#woda_quest_claim_reward")
        }
        var can_claim = reach && !owned
        if (can_claim != ref.bound)
        {
            ref.bound = can_claim
            if (can_claim)
            {
                BindRewardClaim(ref)
            }
            else
            {
                ref.claim.ClearPanelEvent("onactivate")
            }
        }
    }
}

function BindRewardClaim(ref)
{
    ref.claim.SetPanelEvent("onactivate", function()
    {
        ref.claim.ClearPanelEvent("onactivate")
        ref.bound = false
        var payload = {reward_id : ref.reward_id, level : ref.level}
        if (ref.year == 2026)
        {
            payload.battlepass_2026 = true
        }
        GameEvents.SendCustomGameEventToServer_custom("battlepass_get_player_reward", payload)
        ref.claimed = true
        ref.owned_state = true
        ref.claim.SetHasClass("ClaimRewardSuccess", true)
        ref.claim_label.text = $.Localize("#woda_quest_claim_reward_sucess")
    })
}

function InitData()
{
    TopMenuInfo_Load()
    var localplayer_data = PLAYER_DATA;
    if (localplayer_data)
    {
        TopMenuInfo_Find("CoinLabelCount").text = String(localplayer_data.coins)
        TopMenuInfo_Find("CrystalLabelCount").text = String(localplayer_data.crystals || 0)
        TopMenuInfo_Find("WodaplusLabelCount").text = String(localplayer_data.plus_days)
        TopMenuInfo_Find("BattlePassLabelCount").text = String(localplayer_data.battlepass_level_2026)
        $("#LevelCircleLabel").text = String(localplayer_data.battlepass_level)
        $("#ExpLineFXUp").style.width = String(localplayer_data.battlepass_coins / 20 * 100) + "%"
        $("#ExpCounter").text = String(localplayer_data.battlepass_coins) + " / 20"
        $("#LevelCircleLabelNew").text = String(localplayer_data.battlepass_level_2026)
        $("#ExpLineFXUpNew").style.width = String(localplayer_data.battlepass_coins_2026 / 20 * 100) + "%"
        $("#ExpCounterNew").text = String(localplayer_data.battlepass_coins_2026) + " / 20"
        TopMenuInfo_Find("DoubleTokensLabelCount").text = String(localplayer_data.double_tokens)
        TopMenuInfo_Update(localplayer_data)
    }
    if (localplayer_data.has_battlepass !== 1)
    {
        $("#MenuProfie").visible = false
        $("#MenuBlockBody").SetHasClass("BlockBodyWithoutButton", true)
    }
    TopMenuInfo_SetTooltips()
    $("#ButtonBuyBP").SetPanelEvent("onactivate", function()
    {
        GameUI.CustomUIConfig().GoToSiteStore('battlepass')
    });
    RefreshRewardStates()
}

function ScrollBattlePassToCurrentLevel()
{
    var localplayer_data = PLAYER_DATA;
    if (!localplayer_data) return;
    var level = Number(localplayer_data.battlepass_level_2026) || 1;
    $.Schedule(0.1, function()
    {
        var line = $("#BattlePassRewardsLineNew");
        if (!line) return;
        var block = line.FindChildTraverse("BattlePassRewardBlock_" + level);
        if (block)
        {
            block.ScrollParentToMakePanelFit(3, false);
        }
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

function UpdateIconButton()
{
    if ((PLAYER_DATA && PLAYER_DATA.games >= 1) || Game.IsInToolsMode())
    {
        $("#DonateButton").visible = true
    }
    else
    {
        $("#DonateButton").visible = false
    }
}

UpdateIconButton()

function UpdateStoreBackground()
{
    let PlayerBackground = $("#PlayerBackground")
    let WodaPlusBG = $("#WodaPlusBG")
    if (PLAYER_DATA && PLAYER_DATA.background_id)
    {
        PlayerBackground.style.backgroundImage = 'url("' + Background_Images[PLAYER_DATA.background_id] + '")'
        PlayerBackground.style.backgroundSize = "100%"
        PlayerBackground.style.opacity = "1";
        WodaPlusBG.style.opacity = "0"
    }
    else
    {
        PlayerBackground.style.opacity = "0";
        WodaPlusBG.style.opacity = "1"
    }
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

function HasItemInventory(item_id)
{
    return GetInventoryItemsMap()[String(item_id)] === true
}

function CreateRewardBlock(level, reward_data)
{
    let BattlePassRewardsLine = $("#BattlePassRewardsLine")

    let BattlePassRewardBlock = $.CreatePanel("Panel", BattlePassRewardsLine, "BattlePassRewardBlock_" + level)
    BattlePassRewardBlock.AddClass("BattlePassRewardBlock")

    let BPRewardLevelBlock = $.CreatePanel("Panel", BattlePassRewardBlock, "BPRewardLevelBlock_" + level)
    BPRewardLevelBlock.AddClass("BPRewardLevelBlock")

    let BPRewardLevel = $.CreatePanel("Label", BPRewardLevelBlock, "BPRewardLevel_" + level)
    BPRewardLevel.text = level

    let BattlePassRewardsLineList = $.CreatePanel("Panel", BattlePassRewardBlock, "BattlePassRewardsLineList_" + level)
    BattlePassRewardsLineList.AddClass("BattlePassRewardsLineList")

    if (reward_data.length > 0)
    {
        for (let reward_info in reward_data)
        {
            let BattlePassRewardBlockFuture = $.CreatePanel("Panel", BattlePassRewardsLineList, "")
            BattlePassRewardBlockFuture.AddClass("BattlePassRewardBlockFuture")
            
            let BPRewardImage = $.CreatePanel("Panel", BattlePassRewardBlockFuture, "")
            BPRewardImage.AddClass("BPRewardImage")
            BPRewardImage.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + reward_data[reward_info][1] + '.png")'
            BPRewardImage.style.backgroundSize = "100%"
            ApplyRarityGlow(BPRewardImage, GetItemRarityById(reward_data[reward_info][0]))
            BPRewardImage.SetHasClass("TipImage", reward_data[reward_info][1] == "tip")
            SetItemTooltip(BPRewardImage, {item_id: reward_data[reward_info][0], name_key: reward_data[reward_info][2], desc_key: reward_data[reward_info][2] + "_description", rarity: GetItemRarityById(reward_data[reward_info][0]), icon: "file://{images}/custom_game/shop/" + reward_data[reward_info][1] + ".png"})
            if (GameUI.CustomUIConfig().OpenCheckoutItemPreview && (reward_data[reward_info][1].indexOf("background") === 0 || reward_data[reward_info][1].indexOf("emblem") === 0 || reward_data[reward_info][1].indexOf("five_") === 0 || reward_data[reward_info][1].indexOf("tp_effect") === 0))
            {
                BPRewardImage.AddClass("HoverBPReward", true)
                GameUI.CustomUIConfig().OpenCheckoutItemPreview(BPRewardImage, [reward_data[reward_info][0], null, null, reward_data[reward_info][1], reward_data[reward_info][2], null], true)
            }

            let BPRewardTextBlock = $.CreatePanel("Panel", BattlePassRewardBlockFuture, "")
            BPRewardTextBlock.AddClass("BPRewardTextBlock")

            let BPRewardText = $.CreatePanel("Label", BPRewardTextBlock, "")
            BPRewardText.AddClass("BPRewardText")
            BPRewardText.text = $.Localize("#" + reward_data[reward_info][2])

            let BPRewardClaimBlock = $.CreatePanel("Panel", BattlePassRewardBlockFuture, "")
            BPRewardClaimBlock.AddClass("BPRewardClaimBlock")

            let BPRewardClaim = $.CreatePanel("Label", BPRewardClaimBlock, "")
            BPRewardClaim.text = $.Localize("#woda_quest_claim_reward")

            bp_reward_refs.push({year: 2025, level: level, reward_id: reward_data[reward_info][0], block: BattlePassRewardBlock, claim: BPRewardClaimBlock, claim_label: BPRewardClaim, owned_state: null, bound: false, claimed: false})
        }
    }
    else
    {
        BattlePassRewardBlock.AddClass("Empty")
        bp_reward_refs.push({year: 2025, level: level, reward_id: null, block: BattlePassRewardBlock, claim: null, claim_label: null, owned_state: null, bound: false, claimed: false})
    }
}

function CheckoutEveryReward(is_fast) 
{
    let has_reward = false;
    if (PLAYER_DATA?.has_battlepass > 0) 
    {
        for (let bp_num in bp_rewards)
        {
            let reward_data = bp_rewards[bp_num]
            let reward_level = Number(bp_num)+1
            if (PLAYER_DATA?.battlepass_level >= reward_level && reward_data[0])
            {
                for (let reward_info in reward_data)
                {
                    if (!HasItemInventory(reward_data[reward_info][0]))
                    {
                        has_reward = true;
                        break;
                    }
                }
                if (has_reward) { break }
            }
        }
    }

    if (PLAYER_DATA?.has_battlepass_2026 > 0) 
    {
        for (let bp_num in bp_rewards_2026)
        {
            let reward_data = bp_rewards_2026[bp_num]
            let reward_level = Number(bp_num)+1
            if (PLAYER_DATA?.battlepass_level_2026 >= reward_level && reward_data[0])
            {
                for (let reward_info in reward_data)
                {
                    if (!HasItemInventory(reward_data[reward_info][0]))
                    {
                        has_reward = true;
                        break;
                    }
                }
                if (has_reward) { break }
            }
        }
    }

    $("#DonateButton").SetHasClass("HasReward", !is_fast && has_reward);
}

function CreateBattlePassLevelBlock(row, level, is_empty)
{
    let block = $.CreatePanel("Panel", row, is_empty ? "BattlePassRewardBlock_" + level : "BPRewardLevelBlock_" + level)
    block.AddClass("BPRewardLevelBlock")
    block.SetHasClass("BPRewardLevelBlockEmpty", is_empty)
    let label = $.CreatePanel("Label", block, "BPRewardLevel_" + level)
    label.text = level
    if (is_empty)
    {
        bp_reward_refs.push({year: 2026, level: level, reward_id: null, block: block, claim: null, claim_label: null, owned_state: null, bound: false, claimed: false})
    }
    return block
}

function FlushBattlePassEmptyLevels()
{
    if (bp26_pending_empty_levels.length == 0) { return }
    let BattlePassRewardsLine = $("#BattlePassRewardsLineNew")
    if (!BattlePassRewardsLine) { return }
    let row = $.CreatePanel("Panel", BattlePassRewardsLine, "")
    row.AddClass("BattlePassRewardBlock")
    for (let i = 0; i < bp26_pending_empty_levels.length; i++)
    {
        CreateBattlePassLevelBlock(row, bp26_pending_empty_levels[i], true)
    }
    bp26_pending_empty_levels = []
}

function CreateRewardBlockNew(level, reward_data)
{
    if (!reward_data || reward_data.length == 0)
    {
        bp26_pending_empty_levels.push(level)
        return
    }

    let BattlePassRewardsLine = $("#BattlePassRewardsLineNew")

    let BattlePassRewardBlock = $.CreatePanel("Panel", BattlePassRewardsLine, "BattlePassRewardBlock_" + level)
    BattlePassRewardBlock.AddClass("BattlePassRewardBlock")

    for (let e = 0; e < bp26_pending_empty_levels.length; e++)
    {
        CreateBattlePassLevelBlock(BattlePassRewardBlock, bp26_pending_empty_levels[e], true)
    }
    bp26_pending_empty_levels = []

    let BPRewardLevelBlock = CreateBattlePassLevelBlock(BattlePassRewardBlock, level, false)

    let BattlePassRewardsLineList = $.CreatePanel("Panel", BattlePassRewardBlock, "BattlePassRewardsLineList_" + level)
    BattlePassRewardsLineList.AddClass("BattlePassRewardsLineList")

    if (reward_data.length > 0)
    {
        for (let reward_info in reward_data)
        {
            let BattlePassRewardBlockFuture = $.CreatePanel("Panel", BattlePassRewardsLineList, "")
            BattlePassRewardBlockFuture.AddClass("BattlePassRewardBlockFuture")
            
            let BPRewardImage = $.CreatePanel("Panel", BattlePassRewardBlockFuture, "")
            BPRewardImage.AddClass("BPRewardImage")
            BPRewardImage.style.backgroundImage = 'url("file://{images}/custom_game/shop/' + reward_data[reward_info][1] + '.png")'
            BPRewardImage.style.backgroundSize = "100%"
            ApplyRarityGlow(BPRewardImage, GetItemRarityById(reward_data[reward_info][0]))
            BPRewardImage.SetHasClass("TipImage", reward_data[reward_info][1] == "tip")
            SetItemTooltip(BPRewardImage, {item_id: reward_data[reward_info][0], name_key: reward_data[reward_info][2], desc_key: reward_data[reward_info][2] + "_description", rarity: GetItemRarityById(reward_data[reward_info][0]), icon: "file://{images}/custom_game/shop/" + reward_data[reward_info][1] + ".png"})
            if (GameUI.CustomUIConfig().OpenCheckoutItemPreview && (reward_data[reward_info][1].indexOf("background") === 0 || reward_data[reward_info][1].indexOf("emblem") === 0 || reward_data[reward_info][1].indexOf("five_") === 0 || reward_data[reward_info][1].indexOf("tp_effect") === 0))
            {
                BPRewardImage.AddClass("HoverBPReward", true)
                GameUI.CustomUIConfig().OpenCheckoutItemPreview(BPRewardImage, [reward_data[reward_info][0], null, null, reward_data[reward_info][1], reward_data[reward_info][2], null], true)
            }

            let BPRewardTextBlock = $.CreatePanel("Panel", BattlePassRewardBlockFuture, "")
            BPRewardTextBlock.AddClass("BPRewardTextBlock")

            let BPRewardText = $.CreatePanel("Label", BPRewardTextBlock, "")
            BPRewardText.AddClass("BPRewardText")
            BPRewardText.text = $.Localize("#" + reward_data[reward_info][2])

            let BPRewardClaimBlock = $.CreatePanel("Panel", BattlePassRewardBlockFuture, "")
            BPRewardClaimBlock.AddClass("BPRewardClaimBlock")

            let BPRewardClaim = $.CreatePanel("Label", BPRewardClaimBlock, "")
            BPRewardClaim.text = $.Localize("#woda_quest_claim_reward")

            bp_reward_refs.push({year: 2026, level: level, reward_id: reward_data[reward_info][0], block: BattlePassRewardBlock, claim: BPRewardClaimBlock, claim_label: BPRewardClaim, owned_state: null, bound: false, claimed: false})
        }
    }
}

CheckoutEveryReward()