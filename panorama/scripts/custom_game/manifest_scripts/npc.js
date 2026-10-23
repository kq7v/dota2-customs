--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


"use strict";
/**
 * NPC管理系统
 * 统一管理NPC列表、实体索引、粒子特效等NPC相关功能
 * - 自动管理NPC列表变化
 * - 为NPC提供头顶粒子特效管理（通过SetRedPoint控制）
 * - 提供NPC查找API
 */
var NPC_RED_POINT_ROOT_MAP = {
    talent: "profile",
    collection: "cosmetic",
    forging: "equipment",
    encyclopedia: "book",
    fishpond: "aquarium",
    fisherman: "fishingitem",
    farmer: "explore",
};
var NPC_PARTICLE_RETRY_INTERVAL = 1;
var NPC_PARTICLE_MAX_RETRY_COUNT = 30;
var CNpcManager = /** @class */ (function () {
    function CNpcManager() {
        var _this = this;
        /** 已创建的粒子数据（key为npcName） */
        this.npcParticles = new Map();
        /** 当前所有NPC列表 */
        this.currentNpcList = {};
        /** 红点已开启、但客户端实体尚未就绪的NPC */
        this.pendingNpcParticles = new Map();
        /** 是否已经安排了重试任务 */
        this.retryScheduled = false;
        /** 当前连续重试次数 */
        this.retryCount = 0;
        /** NPC粒子配置表（为特定NPC定制配置） */
        this.npcConfigs = {
            // 邮件NPC：粒子位置偏移
            "mail": {
                particlePath: "particles/ui/game/ui_game_exclamation_point_01_fx.vpcf",
                positionOffset: [20, -10, 100],
                attachmentType: ParticleAttachment_t.PATTACH_OVERHEAD_FOLLOW,
            },
            // 在这里添加其他NPC的特殊配置
            "talent": {
                particlePath: "particles/ui/game/ui_game_exclamation_point_01_fx.vpcf",
                positionOffset: [0, 0, 200],
            },
            // 在这里添加其他NPC的特殊配置
            "encyclopedia": {
                particlePath: "particles/ui/game/ui_game_exclamation_point_01_fx.vpcf",
                positionOffset: [0, 120, 100],
            },
            "task_board": {
                particlePath: "particles/ui/game/ui_game_exclamation_point_01_fx.vpcf",
                positionOffset: [0, 0, 300],
            },
            "farmer": {
                particlePath: "particles/ui/game/ui_game_exclamation_point_01_fx.vpcf",
                positionOffset: [0, 0, 300],
                attachmentType: ParticleAttachment_t.PATTACH_ABSORIGIN,
            },
            "fisherman": {
                particlePath: "particles/ui/game/ui_game_exclamation_point_01_fx.vpcf",
                positionOffset: [0, 0, 250],
                attachmentType: ParticleAttachment_t.PATTACH_ABSORIGIN,
            },
            "collection": {
                particlePath: "particles/ui/game/ui_game_exclamation_point_01_fx.vpcf",
                positionOffset: [0, 0, 350],
                attachmentType: ParticleAttachment_t.PATTACH_ABSORIGIN,
            }
        };
        /** 默认粒子配置 */
        this.defaultConfig = {
            particlePath: "particles/ui/game/ui_game_exclamation_point_01_fx.vpcf",
            positionOffset: [0, 0, 100],
            attachmentType: ParticleAttachment_t.PATTACH_OVERHEAD_FOLLOW,
        };
        // 监听NPC列表变化
        CustomNetTables.SubscribeNetTableListener("common", function (tableName, key, value) {
            if (key === "npc" && value) {
                // 监听器声明没有把key和value建模成可辨识联合，运行时按key判断后在边界处收窄类型。
                _this.currentNpcList = value;
                _this.updateEntityListCache();
                _this.processNpcRedPoints();
            }
        });
        // 监听红点变化事件
        GameEvents.Subscribe("client_side_event", function (data) {
            if (data.event_name === "red_point_changed") {
                _this.onRedPointChanged(data.event_data);
            }
        });
        // 初始化时立即加载一次NPC列表
        this.loadNpcList();
        // 初始化已存在的红点粒子
        this.processNpcRedPoints();
        this.log("自动化红点系统初始化完成");
    }
    /** 日志辅助方法 */
    CNpcManager.prototype.log = function (message) {
        if (Game.IsInToolsMode()) {
            $.Msg("[NpcManager] ".concat(message));
        }
    };
    CNpcManager.prototype.getNpcRedPointState = function (npcName) {
        return CustomUIConfig.GetRedPoint(this.getNpcRedPointRoot(npcName));
    };
    CNpcManager.prototype.getNpcRedPointRoot = function (npcName) {
        var _a;
        return (_a = NPC_RED_POINT_ROOT_MAP[npcName]) !== null && _a !== void 0 ? _a : npcName;
    };
    /**
     * 加载NPC列表
     */
    CNpcManager.prototype.loadNpcList = function () {
        var npcList = CustomNetTables.GetTableValue("common", "npc");
        if (npcList) {
            this.currentNpcList = npcList;
            this.updateEntityListCache();
            var npcNames = Object.values(npcList).map(function (npc) { return npc.name; }).join(", ");
            this.log("\u52A0\u8F7DNPC\u5217\u8868\uFF0C\u5171 ".concat(Object.keys(npcList).length, " \u4E2ANPC: ").concat(npcNames));
            this.log("NPC\u8BE6\u60C5: ".concat(JSON.stringify(npcList)));
        }
    };
    /**
     * 处理NPC列表的红点状态
     * 统一方法：遍历NPC列表，根据红点状态创建/销毁粒子
     */
    CNpcManager.prototype.processNpcRedPoints = function () {
        // 创建当前NPC的名称集合（用于快速查找）
        var currentNpcNames = new Set(Object.values(this.currentNpcList).map(function (npc) { return npc.name; }));
        // 遍历所有NPC，更新粒子状态
        for (var _i = 0, _a = Object.entries(this.currentNpcList); _i < _a.length; _i++) {
            var _b = _a[_i], entIndex = _b[0], npcData = _b[1];
            var npcName = npcData.name;
            var entityIndex = Number(entIndex);
            var redPointState = this.getNpcRedPointState(npcName);
            this.updateParticle(npcName, entityIndex, redPointState);
        }
        // 清理已不存在的NPC的粒子
        for (var _c = 0, _d = this.npcParticles; _c < _d.length; _c++) {
            var _e = _d[_c], npcName = _e[0], data = _e[1];
            if (!currentNpcNames.has(npcName)) {
                // 先销毁粒子特效
                if (data.particleId !== undefined) {
                    Particles.DestroyParticleEffect(data.particleId, true);
                    this.log("\u6E05\u7406\u5DF2\u5220\u9664\u7684NPC\u7C92\u5B50: ".concat(npcName));
                }
                // 再从Map中删除
                this.npcParticles.delete(npcName);
            }
        }
        // 清理已不存在的NPC重试记录
        var pendingNpcParticles = this.getPendingNpcParticles();
        for (var _f = 0, _g = pendingNpcParticles.keys(); _f < _g.length; _f++) {
            var npcName = _g[_f];
            if (!currentNpcNames.has(npcName)) {
                pendingNpcParticles.delete(npcName);
            }
        }
    };
    /**
     * 更新实体索引列表缓存
     */
    CNpcManager.prototype.updateEntityListCache = function () {
        this.cachedEntityList = Object.keys(this.currentNpcList).map(function (key) { return Number(key); });
    };
    /**
     * 获取待重试NPC。兼容脚本热重载前已创建的单例。
     */
    CNpcManager.prototype.getPendingNpcParticles = function () {
        var _a;
        (_a = this.pendingNpcParticles) !== null && _a !== void 0 ? _a : (this.pendingNpcParticles = new Map());
        return this.pendingNpcParticles;
    };
    /**
     * 仅重试红点已开启、但客户端实体尚未就绪的NPC。
     */
    CNpcManager.prototype.schedulePendingNpcRetry = function () {
        var _this = this;
        var pendingNpcParticles = this.getPendingNpcParticles();
        if (this.retryScheduled === true || pendingNpcParticles.size === 0) {
            return;
        }
        this.retryScheduled = true;
        $.Schedule(NPC_PARTICLE_RETRY_INTERVAL, function () {
            var _a;
            _this.retryScheduled = false;
            if (pendingNpcParticles.size === 0) {
                _this.retryCount = 0;
                return;
            }
            _this.retryCount = ((_a = _this.retryCount) !== null && _a !== void 0 ? _a : 0) + 1;
            for (var _i = 0, pendingNpcParticles_1 = pendingNpcParticles; _i < pendingNpcParticles_1.length; _i++) {
                var _b = pendingNpcParticles_1[_i], npcName = _b[0], entityIndex = _b[1];
                var npcData = _this.currentNpcList[entityIndex];
                if ((npcData === null || npcData === void 0 ? void 0 : npcData.name) !== npcName || !_this.getNpcRedPointState(npcName)) {
                    pendingNpcParticles.delete(npcName);
                    continue;
                }
                if (_this.createParticle(npcName, entityIndex)) {
                    pendingNpcParticles.delete(npcName);
                }
            }
            if (pendingNpcParticles.size === 0) {
                _this.retryCount = 0;
            }
            else if (_this.retryCount >= NPC_PARTICLE_MAX_RETRY_COUNT) {
                _this.log("NPC\u7C92\u5B50\u91CD\u8BD5\u8FBE\u5230\u4E0A\u9650\uFF0C\u505C\u6B62\u91CD\u8BD5: ".concat(Array.from(pendingNpcParticles.keys()).join(", ")));
                pendingNpcParticles.clear();
                _this.retryCount = 0;
            }
            else {
                _this.schedulePendingNpcRetry();
            }
        });
    };
    /**
     * 红点状态变化回调
     */
    CNpcManager.prototype.onRedPointChanged = function (rootKey) {
        var _this = this;
        var npcNames = Object.values(this.currentNpcList)
            .map(function (npc) { return npc.name; })
            .filter(function (npcName) { return _this.getNpcRedPointRoot(npcName) === rootKey; });
        for (var _i = 0, npcNames_1 = npcNames; _i < npcNames_1.length; _i++) {
            var npcName = npcNames_1[_i];
            var entityIndex = this.GetNpcByName(npcName);
            if (entityIndex === undefined) {
                // NPC不存在，忽略（等NPC加载时会在 processNpcRedPoints 中处理）
                this.log("\u7EA2\u70B9\u53D8\u5316\u4F46NPC\u672A\u52A0\u8F7D\uFF0C\u7A0D\u540E\u5904\u7406: ".concat(npcName));
                continue;
            }
            var redPointState = this.getNpcRedPointState(npcName);
            this.log("\u7EA2\u70B9\u72B6\u6001\u53D8\u5316: ".concat(npcName, " = ").concat(redPointState));
            this.updateParticle(npcName, entityIndex, redPointState);
        }
    };
    /**
     * 根据NPC名称查找NPC实体索引
     * @param npcName NPC名称
     * @returns NPC实体索引，如果未找到则返回undefined
     */
    CNpcManager.prototype.GetNpcByName = function (npcName) {
        for (var _i = 0, _a = Object.entries(this.currentNpcList); _i < _a.length; _i++) {
            var _b = _a[_i], entIndex = _b[0], npcData = _b[1];
            if (npcData.name === npcName) {
                return Number(entIndex);
            }
        }
        return undefined;
    };
    /**
     * 根据实体索引获取NPC数据
     * @param index NPC实体索引
     * @returns NPC数据，如果未找到则返回undefined
     */
    CNpcManager.prototype.GetNpc = function (index) {
        var npcData = this.currentNpcList[index];
        return npcData;
    };
    /**
     * 获取所有NPC的实体索引列表（使用缓存优化性能）
     * @returns NPC实体索引数组
     */
    CNpcManager.prototype.GetNpcEntityList = function () {
        var _a;
        return (_a = this.cachedEntityList) !== null && _a !== void 0 ? _a : [];
    };
    /**
     * 获取完整NPC列表
     * @returns NPC列表对象
     */
    CNpcManager.prototype.GetNpcList = function () {
        return this.currentNpcList;
    };
    /**
     * 更新或创建粒子
     */
    CNpcManager.prototype.updateParticle = function (npcName, entityIndex, show) {
        var pendingNpcParticles = this.getPendingNpcParticles();
        if (show) {
            if (this.createParticle(npcName, entityIndex)) {
                pendingNpcParticles.delete(npcName);
            }
            else {
                // NetTable可能先于客户端实体就绪，只重试创建失败的NPC
                pendingNpcParticles.set(npcName, entityIndex);
                this.schedulePendingNpcRetry();
            }
        }
        else {
            pendingNpcParticles.delete(npcName);
            // 销毁粒子
            var data = this.npcParticles.get(npcName);
            if ((data === null || data === void 0 ? void 0 : data.particleId) !== undefined) {
                Particles.DestroyParticleEffect(data.particleId, true);
                this.npcParticles.delete(npcName); // 从Map中删除
                this.log("\u9500\u6BC1\u7C92\u5B50: ".concat(npcName));
            }
        }
    };
    /**
     * 创建粒子特效
     * @returns 粒子已存在或创建成功时返回true；客户端实体尚未就绪时返回false
     */
    CNpcManager.prototype.createParticle = function (npcName, entityIndex) {
        var _a;
        // 实体有效性检查
        if (!Entities.IsValidEntity(entityIndex)) {
            return false;
        }
        // 检查粒子是否已存在且有效
        var existing = this.npcParticles.get(npcName);
        if ((existing === null || existing === void 0 ? void 0 : existing.particleId) !== undefined && existing.entityIndex === entityIndex) {
            // 粒子已存在且实体索引相同，无需重复创建
            //this.log(`粒子已存在，跳过创建: ${npcName}, particle: ${existing.particleId}`);
            return true;
        }
        // 在创建粒子前确认实体位置已同步，避免创建后无法记录导致粒子泄漏
        var origin = Entities.GetAbsOrigin(entityIndex);
        if (!origin) {
            return false;
        }
        // 获取配置（特定配置或默认配置）
        var config = this.npcConfigs[npcName] || this.defaultConfig;
        // 如果旧粒子的实体索引不同，先销毁旧粒子
        if ((existing === null || existing === void 0 ? void 0 : existing.particleId) !== undefined) {
            Particles.DestroyParticleEffect(existing.particleId, true);
            this.log("\u9500\u6BC1\u65E7\u7C92\u5B50\uFF08\u5B9E\u4F53\u53D8\u5316\uFF09: ".concat(npcName, ", oldEntity: ").concat(existing.entityIndex, ", newEntity: ").concat(entityIndex));
        }
        // 创建新粒子
        var particleId = Particles.CreateParticle(config.particlePath, (_a = config.attachmentType) !== null && _a !== void 0 ? _a : ParticleAttachment_t.PATTACH_OVERHEAD_FOLLOW, entityIndex);
        // 设置粒子位置偏移
        var particlePosition = [
            origin[0] + config.positionOffset[0],
            origin[1] + config.positionOffset[1],
            origin[2] + config.positionOffset[2],
        ];
        Particles.SetParticleControl(particleId, 0, particlePosition);
        // 保存数据
        this.npcParticles.set(npcName, {
            entityIndex: entityIndex,
            particleId: particleId,
        });
        this.log("\u521B\u5EFA\u7C92\u5B50: ".concat(npcName, ", entity: ").concat(entityIndex, ", particle: ").concat(particleId));
        return true;
    };
    /**
     * 销毁所有粒子（场景切换时调用）
     */
    CNpcManager.prototype.DestroyAllParticles = function () {
        for (var _i = 0, _a = this.npcParticles; _i < _a.length; _i++) {
            var _b = _a[_i], npcName = _b[0], data = _b[1];
            if (data.particleId !== undefined) {
                Particles.DestroyParticleEffect(data.particleId, true);
            }
        }
        this.npcParticles.clear();
        this.getPendingNpcParticles().clear();
        this.retryCount = 0;
        this.log("销毁所有粒子");
    };
    return CNpcManager;
}());
// 智能单例模式：处理脚本热重载
var npcManager = CustomUIConfig.NpcManager;
if (npcManager !== undefined) {
    // 实例已存在（脚本重新加载），恢复原型链
    Object.setPrototypeOf(npcManager, CNpcManager.prototype);
    // 实例的状态（npcParticles、currentNpcList）已经保留，无需重新初始化
    // 监听器会自动重新注册
}
else {
    // 首次加载，创建新实例
    CustomUIConfig.NpcManager = new CNpcManager();
}
// if (Game.IsInToolsMode()) {
// 	$.Msg("[npc.ts] NPC管理系统加载完成");
// 	$.Msg("使用方法:");
// 	$.Msg("  1. 使用 CustomUIConfig.SetRedPoint(true, 'mail') 显示红点");
// 	$.Msg("  2. 使用 CustomUIConfig.SetRedPoint(false, 'mail') 隐藏红点");
// 	$.Msg("  3. 使用 CustomUIConfig.NpcManager.GetNpcByName('mail') 查找NPC实体");
// 	$.Msg("  4. 使用 CustomUIConfig.NpcManager.GetNpc(index) 获取NPC数据");
// 	$.Msg("  5. 使用 CustomUIConfig.NpcManager.GetNpcEntityList() 获取NPC实体列表（带缓存）");
// 	$.Msg("  6. 使用 CustomUIConfig.NpcManager.GetNpcList() 获取完整NPC列表");
// 	$.Msg("  7. 使用 CustomUIConfig.NpcManager.DestroyAllParticles() 销毁所有粒子");
// 	$.Msg("  8. NPC粒子配置在 npc.ts 的 npcConfigs 中定义");
// }