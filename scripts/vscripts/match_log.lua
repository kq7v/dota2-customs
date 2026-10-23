--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


if match_log == nil then
	_G.match_log = class({})
	match_log.active = false
	match_log.records = {}
	match_log.open = {}
	match_log.member = {}
	match_log.done = {}
	match_log.track = {}
	match_log.orders = {}
	match_log.packet = 0
	match_log.next_id = 0
	match_log.watch = setmetatable({}, { __mode = "k" })
	match_log.bars = setmetatable({}, { __mode = "k" })
	match_log.kinds = setmetatable({}, { __mode = "k" })
	match_log.mods = setmetatable({}, { __mode = "k" })
end

match_log.wrapped = match_log.wrapped or {}
match_log.child = match_log.child or {}
match_log.child_mem = match_log.child_mem or {}
match_log.alloc = match_log.alloc or {}
match_log.alloc_pre = match_log.alloc_pre or {}
match_log.calls = match_log.calls or {}
match_log.count = match_log.count or {}
match_log.engine_count = match_log.engine_count or {}
match_log.last_mem = match_log.last_mem or 0
match_log.alloc_total = match_log.alloc_total or 0
match_log.gc = rawget(_G, "collectgarbage") or function()
	return 0
end
match_log.depth = match_log.depth or 0
match_log.hitch_spent = match_log.hitch_spent or 0
match_log.hitch_max = match_log.hitch_max or 0
match_log.enabled = true
match_log.frame_time = 5
match_log.pre_time = 30
match_log.gap_time = 150
match_log.quiet_time = 20
match_log.far_range = 2000
match_log.tail_time = 20
match_log.min_time = 30
match_log.min_damage = 300
match_log.track_time = 5
match_log.send_time = 180
match_log.hitch_time = 0.05
match_log.alloc_time = 60
match_log.alloc_top = 10
match_log.calls_top = 80
match_log.wrap_state = IsInToolsMode()
match_log.wrap_getters = IsInToolsMode()
match_log.wrap_meta = IsInToolsMode()
match_log.gc_mode = "pace"
match_log.gc_mul = 1
match_log.gc_smooth = 0.2
match_log.gc_pause = 3
match_log.gc_late = 0.045
match_log.gc_push = 1.3
match_log.gc_limit = 5
match_log.gc_growth = 4
match_log.gc_floor = 49152
match_log.gc_cap = 204800
match_log.gc_setpause = 300
match_log.url = "/anal-gamelog"
match_log.states =
	{ "IsStunned", "IsSilenced", "IsRooted", "IsHexed", "IsDisarmed", "IsDebuffImmune", "IsInvisible", "IsTaunted" }
match_log.track_cols = {
	"id",
	"alive",
	"respawn",
	"hp",
	"mp",
	"x",
	"y",
	"fight",
	"nw",
	"rank",
	"lvl",
	"xp",
	"k",
	"d",
	"lh",
	"dmg_out",
	"dmg_in",
	"streak",
	"hunt",
	"duel",
	"buffs",
	"tower",
	"orders",
	"conn",
}
match_log.match_cols = { "wave", "timer", "max_timer", "players", "hunt", "final" }
match_log.engine_methods = {
	CDOTA_BaseNPC_Hero = { "CalculateStatBonus", "GetStrength_old", "GetAgility_old", "GetIntellect_old" },
	CDOTA_BaseNPC = {
		"CalculateStatBonus",
		"GetAttackSpeed",
		"GetIncreasedAttackSpeed",
		"GetDisplayAttackSpeed",
		"GetAttacksPerSecond",
		"GetSecondsPerAttack",
		"GetAverageTrueAttackDamage",
		"GetDamageMin",
		"GetDamageMax",
		"GetPhysicalArmorValue",
		"GetMagicalArmorValue",
		"GetIdealSpeed",
		"GetMoveSpeedModifier",
		"GetHealthRegen",
		"GetManaRegen",
		"GetEvasion",
		"GetStatusResistance_old",
		"GetSpellAmplification",
		"GetCooldownReduction",
		"GetCastRangeBonus",
	},
}

function match_log:Start()
	self.active = self.enabled and IsSoloMode()
	self.spent = 0
	self.spent_max = 0
	self.clock = Plat_FloatTime()
	self.frame = GetFrameCount()
	self.time = GameRules:GetGameTime()
	self.hitch_spent = 0
	self.hitch_max = 0
	self.memory = rawget(_G, "collectgarbage") and collectgarbage("count") or -1
	self.alloc = {}
	self.alloc_pre = {}
	self.calls = {}
	self.count = {}
	self.last_mem = self.gc("count")
	self.alloc_total = 0
	self.alloc_clock = Plat_FloatTime()
	self.queue_max = 0

	self.hitch_timer = Timers:CreateTimer(0, function()
		local clock = Plat_FloatTime()
		local frame = GetFrameCount()
		local time = GameRules:GetGameTime()
		local memory = rawget(_G, "collectgarbage") and collectgarbage("count") or -1
		local gap = clock - self.clock
		local paused = GameRules:IsGamePaused()
		local events = dota1x6.event_thinker_mod
		local queue = events and events.event_tail and events.event_tail - events.event_head + 1 or 0

		if memory > self.memory then
			self.alloc_total = self.alloc_total + memory - self.memory
		end

		if queue > self.queue_max then
			self.queue_max = queue
		end

		if gap > self.hitch_time and not paused then
			local ok, name, unit, source = pcall(function()
				local key = self:KeyName(self.hitch_name)

				if
					type(key) == "string"
					and not key:find(" ")
					and IsValid(self.hitch_obj)
					and self.hitch_obj.GetName
				then
					key = key .. " " .. self.hitch_obj:GetName()
				end

				local obj = self.hitch_obj
				local arg = self.hitch_arg
				local owner = IsValid(obj) and (obj.GetParent and obj:GetParent() or obj.GetCaster and obj:GetCaster())
				local inflictor = ""

				if type(arg) == "table" and IsValid(arg.attacker or arg.unit) then
					owner = arg.attacker or arg.unit
					if IsValid(arg.inflictor) then
						inflictor = arg.inflictor:GetAbilityName()
					end
				end

				return key or "", IsValid(owner) and owner.GetUnitName and owner:GetUnitName() or "", inflictor
			end)

			print(
				"SERVER HITCH",
				math.floor(gap * 1000),
				math.floor((time - self.time) * 1000),
				frame - self.frame,
				math.floor(GameRules:GetDOTATime(false, false)),
				math.floor(self.spent * 1000),
				self.spent_name or "",
				math.floor(self.spent_max * 1000),
				next(self.open) and 1 or 0,
				math.floor(self.hitch_spent * 1000),
				ok and name or "?",
				math.floor(self.hitch_max * 1000),
				ok and unit or "",
				ok and source or "",
				math.floor(self.memory),
				math.floor(memory)
			)
		end

		if clock - self.alloc_clock >= self.alloc_time then
			pcall(function()
				local list, sum = self:Top(self.alloc)
				local out = {
					"SERVER ALLOC",
					math.floor(GameRules:GetDOTATime(false, false)),
					math.floor(clock - self.alloc_clock),
					math.floor(self.alloc_total),
					math.floor(sum),
					queue,
					self.queue_max,
				}
				for i = 1, math.min(self.alloc_top, #list) do
					table.insert(out, self:KeyName(list[i][1]))
					table.insert(out, math.floor(list[i][2]))
				end
				print(table.concat(out, "\t"))

				local pre, pre_sum = self:Top(self.alloc_pre)
				local pre_out = {
					"SERVER ALLOC PRE",
					math.floor(GameRules:GetDOTATime(false, false)),
					math.floor(clock - self.alloc_clock),
					math.floor(pre_sum),
				}
				for i = 1, math.min(self.alloc_top, #pre) do
					table.insert(pre_out, self:KeyName(pre[i][1]))
					table.insert(pre_out, math.floor(pre[i][2]))
					table.insert(pre_out, self.calls[pre[i][1]] or 0)
				end
				print(table.concat(pre_out, "\t"))

				if self.wrap_getters then
					local calls, calls_sum = self:Top(self.count)
					local calls_out = {
						"SERVER CALLS",
						math.floor(GameRules:GetDOTATime(false, false)),
						math.floor(clock - self.alloc_clock),
						math.floor(calls_sum),
					}
					for i = 1, math.min(self.calls_top, #calls) do
						table.insert(calls_out, self:KeyName(calls[i][1]))
						table.insert(calls_out, calls[i][2])
						table.insert(calls_out, self.calls[calls[i][1]] or 0)
					end
					print(table.concat(calls_out, "\t"))

					local engine, engine_sum = self:Top(self.engine_count)
					local engine_out = {
						"SERVER ENGINE",
						math.floor(GameRules:GetDOTATime(false, false)),
						math.floor(clock - self.alloc_clock),
						math.floor(engine_sum),
					}
					for i = 1, math.min(self.calls_top, #engine) do
						table.insert(engine_out, engine[i][1])
						table.insert(engine_out, engine[i][2])
					end
					print(table.concat(engine_out, "\t"))
				end
			end)

			self.alloc = {}
			self.alloc_pre = {}
			self.calls = {}
			self.count = {}
			self.engine_count = {}
			self.alloc_total = 0
			self.alloc_clock = clock
			self.queue_max = 0
		end

		self.clock = clock
		self.frame = frame
		self.time = time
		self.memory = memory
		self.spent = 0
		self.spent_max = 0
		self.spent_name = nil
		self.depth = 0
		self.hitch_spent = 0
		self.hitch_max = 0
		self.hitch_name = nil
		self.hitch_obj = nil
		self.hitch_arg = nil
		return 0
	end)

	for name, timer in pairs(Timers.timers) do
		if name ~= self.hitch_timer then
			self:WrapTimer(timer)
		end
	end

	local create = Timers.CreateTimer
	Timers.CreateTimer = function(timers, ...)
		local name = create(timers, ...)
		if name and timers.timers[name] then
			self:WrapTimer(timers.timers[name])
		end
		return name
	end

	if self.wrap_getters and not self.wrapped.engine and rawget(_G, "debug") and debug.getinfo then
		self.wrapped.engine = true
		for class_name, methods in pairs(self.engine_methods) do
			local class = rawget(_G, class_name)
			for _, method in pairs(methods) do
				local func = type(class) == "table" and rawget(class, method)
				if type(func) == "function" then
					local level = method:find("_old$") and 3 or 2
					rawset(class, method, function(obj, ...)
						local info = debug.getinfo(level, "Sl")
						local key = method
							.. " "
							.. (info and tostring(info.short_src) .. ":" .. tostring(info.currentline) or "?")
						self.engine_count[key] = (self.engine_count[key] or 0) + 1
						return func(obj, ...)
					end)
				end
			end
		end
	end

	if self.gc_mode == "pause" and rawget(_G, "collectgarbage") then
		collectgarbage("setpause", self.gc_setpause)
		print("SERVER GC MODE", self.gc_mode, self.gc_setpause)
	end

	if self.gc_mode == "pace" and rawget(_G, "collectgarbage") then
		print("SERVER GC MODE", self.gc_mode, self.gc_pause, self.gc_mul)
		self.gc_stats = self:GcStats()
		self.gc_clock = Plat_FloatTime()
		self.gc_tick = Plat_FloatTime()
		self.gc_wait = nil
		self.gc_base = nil
		self.gc_first = nil
		self.gc_rate = 0
		self.gc_last = collectgarbage("count")
		self.gc_sweep = false
		self.gc_float = 0
		collectgarbage("stop")

		local step = function()
			if GameRules:State_Get() >= DOTA_GAMERULES_STATE_POST_GAME then
				return
			end
			local stats = self.gc_stats
			local memory = collectgarbage("count")
			local now = Plat_FloatTime()
			local late = now - self.gc_tick > self.gc_late
			self.gc_tick = now
			local alloc = math.max(memory - self.gc_last, 0)
			self.gc_rate = self.gc_rate + (alloc - self.gc_rate) * self.gc_smooth
			if self.gc_sweep then
				self.gc_float = self.gc_float + alloc
			end
			if memory > stats.peak then
				stats.peak = memory
			end

			if
				memory > self.gc_cap
				or (
					self.gc_base
					and (
						memory > self.gc_base * self.gc_limit
						or (self.gc_base > self.gc_first * self.gc_growth and self.gc_base > self.gc_floor)
					)
				)
			then
				print(
					"SERVER GC FALLBACK",
					math.floor(GameRules:GetDOTATime(false, false)),
					math.floor(self.gc_first or 0),
					math.floor(self.gc_base or 0),
					math.floor(memory)
				)
				return
			end

			local behind = not self.gc_base or memory > self.gc_base * self.gc_pause * self.gc_push
			if (not self.gc_wait or memory >= self.gc_wait) and late and not behind then
				stats.skip = stats.skip + 1
			elseif not self.gc_wait or memory >= self.gc_wait then
				local before = memory
				local start = Plat_FloatTime()
				local done = collectgarbage("step", math.ceil(self.gc_rate * self.gc_mul))
				collectgarbage("stop")
				local spent = Plat_FloatTime() - start
				stats.step = stats.step + spent
				if spent > stats.tick_max then
					stats.tick_max = spent
				end
				memory = collectgarbage("count")
				if memory < before then
					self.gc_sweep = true
				end
				self.gc_wait = nil
				if done then
					self.gc_base = math.max(memory - self.gc_float, 1024)
					self.gc_first = self.gc_first or self.gc_base
					self.gc_wait = self.gc_base * self.gc_pause
					self.gc_sweep = false
					self.gc_float = 0
					stats.cycles = stats.cycles + 1
				end
			end
			self.gc_last = memory

			local clock = Plat_FloatTime()
			if clock - self.gc_clock >= self.alloc_time then
				print(
					"SERVER GC",
					math.floor(GameRules:GetDOTATime(false, false)),
					math.floor(clock - self.gc_clock),
					math.floor(stats.step * 1000),
					math.floor(stats.tick_max * 1000),
					stats.cycles,
					math.floor(stats.peak),
					math.floor(self.gc_base or 0),
					math.floor(self.gc_rate),
					math.floor(memory),
					stats.skip
				)
				self.gc_stats = self:GcStats()
				self.gc_clock = clock
			end
			return true
		end

		GameRules:GetGameModeEntity():SetThink(function()
			local ok, result = pcall(step)
			if ok and result then
				return 0.01
			end
			collectgarbage("restart")
			if not ok then
				print("SERVER GC ERROR", tostring(result))
			end
			return -1
		end, "MatchLogGc", 0)
	end

	if not self.active then
		return
	end

	local rating = 0
	local count = 0
	for _, value in pairs(lobby_rating) do
		rating = rating + value
		count = count + 1
	end

	self.info = {
		date = GetSystemDate() .. " " .. GetSystemTime(),
		map = GetMapName(),
		rating = count > 0 and math.floor(rating / count + 0.5) or nil,
	}

	Timers:CreateTimer(self.track_time, function()
		return self:Call("Track")
	end)

	Timers:CreateTimer(self.send_time, function()
		return self:Call("Send")
	end)
end

function match_log:Call(name, ...)
	if not self.active then
		return
	end

	local clock = Plat_FloatTime()
	local ok, result = pcall(self[name], self, ...)
	local time = Plat_FloatTime() - clock
	self.spent = self.spent + time

	if time > self.spent_max then
		self.spent_max = time
		self.spent_name = name
	end

	if ok then
		return result
	end

	self.active = false

	if IsInToolsMode() then
		print(result)
	end

	HTTP.Request(
		"/http-errors",
		{ StatusCode = 600, Url = "/lua-errors", RequestBody = result, ResponseMessage = result }
	)
end

function match_log:WrapClass(name, all, obj)
	if self.wrapped[name] then
		return
	end
	self.wrapped[name] = true

	local class = rawget(_G, name)
	local check = false
	if type(class) ~= "table" and self.wrap_meta and obj then
		local meta = getmetatable(obj)
		class = type(meta) == "table" and rawget(meta, "__index")
		check = true
	end
	if type(class) ~= "table" then
		return
	end
	if check and not (rawget(_G, "debug") and debug.getinfo) then
		return
	end

	for method, func in pairs(class) do
		if
			type(method) == "string"
			and type(func) == "function"
			and not method:find("^__")
			and (all or method:find("^On") or method:find("Event") or method:find("Filter") or (self.wrap_state and method == "CheckState") or (self.wrap_getters and (method:find(
				"^Get"
			) or method:find("^Is"))))
			and (not check or debug.getinfo(func, "S").what == "Lua")
		then
			local key = method .. " " .. name
			rawset(class, method, function(obj, ...)
				return self:Measure(key, obj, ..., Plat_FloatTime(), self:Enter(key), func(obj, ...))
			end)
		end
	end
end

function match_log:WrapTimer(timer)
	local func = timer.callback
	timer.callback = function(...)
		return self:Measure(func, nil, nil, Plat_FloatTime(), self:Enter(func), func(...))
	end
end

function match_log:KeyName(key)
	if type(key) ~= "function" then
		return key
	end
	local info = rawget(_G, "debug") and debug.getinfo and debug.getinfo(key, "S")
	return info and tostring(info.short_src) .. ":" .. tostring(info.linedefined) or "timer"
end

function match_log:Top(data)
	local list = {}
	local sum = 0
	for key, value in pairs(data) do
		table.insert(list, { key, value })
		sum = sum + value
	end

	table.sort(list, function(a, b)
		return a[2] > b[2]
	end)
	return list, sum
end

function match_log:GcStats()
	return {
		step = 0,
		tick_max = 0,
		cycles = 0,
		peak = 0,
		skip = 0,
	}
end

function match_log:Enter(key)
	local memory = self.gc("count")
	if self.wrap_getters then
		self.count[key] = (self.count[key] or 0) + 1
	end
	if self.depth == 0 then
		self.calls[key] = (self.calls[key] or 0) + 1
		if memory > self.last_mem then
			self.alloc_pre[key] = (self.alloc_pre[key] or 0) + memory - self.last_mem
		end
	end

	self.depth = self.depth + 1
	self.child[self.depth] = 0
	self.child_mem[self.depth] = 0
	return memory
end

function match_log:MeasureQueue(key, obj, func)
	return self:Measure(key, obj, nil, Plat_FloatTime(), self:Enter(key), func())
end

function match_log:Measure(key, obj, arg, clock, memory, ...)
	local time = Plat_FloatTime() - clock
	local memory_now = self.gc("count")
	local used = memory_now - memory
	self.last_mem = memory_now
	local own = time - (self.child[self.depth] or 0)
	local own_used = used - (self.child_mem[self.depth] or 0)
	self.depth = self.depth - 1

	if self.depth > 0 then
		self.child[self.depth] = (self.child[self.depth] or 0) + time
		self.child_mem[self.depth] = (self.child_mem[self.depth] or 0) + math.max(used, 0)
	else
		self.hitch_spent = self.hitch_spent + time
	end

	if used > 0 and own_used > 0 then
		self.alloc[key] = (self.alloc[key] or 0) + own_used
	end

	if own > self.hitch_max then
		self.hitch_max = own
		self.hitch_name = key
		self.hitch_obj = obj
		self.hitch_arg = arg
	end

	return ...
end

function CDOTA_BaseNPC:LogProc(key, value, target)
	match_log:Call("Proc", self, "procs", key, value, target)
end

function CDOTA_BaseNPC:LogFight()
	return match_log.member[players[self:GetId()]]
end

function CDOTA_BaseNPC:LogWatch(key, holder, field, target)
	local fields = match_log.watch[holder] or {}
	fields[field] = { self, key, target }
	match_log.watch[holder] = fields
end

function match_log:Damage(attacker, target, source, damage)
	if not target then
		return
	end
	if attacker == target then
		return
	end

	local now = self:Now()
	local fight = self.member[attacker]

	if self:Stale(attacker, target) then
		if not fight then
			return
		end
		if self.member[target] ~= fight then
			return
		end
	else
		fight = self:Link(attacker, target, now)
		if target:IsAlive() then
			fight.away[target] = nil
		end
	end

	local a = fight.index[attacker]
	local b = fight.index[target]
	fight.members[a].out = fight.members[a].out + damage
	fight.members[b].inc = fight.members[b].inc + damage
	fight.t1 = now
	self:Add(fight.frame, "dmg", a .. ">" .. b .. ":" .. source, damage)
end

function match_log:Tower(tower, target, damage)
	if players[target:GetId()] ~= target then
		return
	end

	local team = tower:GetTeamNumber()
	for _, hero in pairs(players) do
		if hero:GetTeamNumber() == team then
			self:Damage(hero, target, "tower", damage)
			return
		end
	end
end

function match_log:Heal(hero, source, amount, heal_type)
	local fight = self.member[hero]
	if not fight then
		return
	end

	self:Add(fight.frame, heal_type == "shield" and "shield" or "heal", fight.index[hero] .. ":" .. source, amount)
end

function match_log:Cast(caster, ability, target)
	if players[caster:GetId()] ~= caster then
		return
	end

	if not IsValid(target) or not target.IsUnit or not target:IsUnit() then
		target = nil
	end

	local now = self:Now()
	local name = ability:GetName()
	self:Pre(caster, { now, "cast", name, target and target:GetUnitName() or "" })

	local fight = self.member[caster]
	if not fight then
		return
	end

	if target ~= caster and fight.index[target] then
		fight.away[caster] = nil
	end

	fight.frame.cast = fight.frame.cast or {}
	table.insert(
		fight.frame.cast,
		{ now, fight.index[caster], name, target and (fight.index[target] or target:GetUnitName()) or "" }
	)
end

function match_log:Attack(hero, attacker, target, hit)
	local fight = self.member[hero]
	if not fight then
		return
	end
	if attacker.fake_attack then
		return
	end
	if not fight.index[target] then
		return
	end

	fight.away[hero] = nil

	local key = fight.index[hero] .. ">" .. fight.index[target]
	local atk = fight.frame.atk or {}
	local data = atk[key] or { 0, 0 }
	local index = hit and 1 or 2
	data[index] = data[index] + 1
	atk[key] = data
	fight.frame.atk = atk
end

function match_log:Added(unit, mod)
	local mods = self.mods[unit]
	if not mods then
		return
	end

	mods[mod] = true
end

function match_log:Proc(unit, field, key, value, target)
	local hero = players[unit:GetId()]
	if not hero then
		return
	end
	if target and not self:IsHero(target) then
		return
	end

	value = self:Tenth(value or 0)

	local fight = self.member[hero]
	if not fight then
		self:Pre(hero, { self:Now(), field, key, value, target and target:GetUnitName() })
		return
	end

	local data = fight.frame[field] or {}
	key = self:Key(fight, hero, key, target)
	local sum = data[key] or { 0, 0 }
	sum[1] = sum[1] + 1
	sum[2] = sum[2] + value
	data[key] = sum
	fight.frame[field] = data
end

function match_log:Death(unit, killer)
	if players[unit:GetId()] ~= unit then
		return
	end

	local now = self:Now()
	local hero = players[killer:GetId()]

	if hero == unit then
		hero = nil
	end

	if hero and not self:Stale(hero, unit) then
		self:Link(hero, unit, now)
	end

	local fight = self.member[unit]
	if not fight then
		return
	end

	local by = hero and fight.index[hero] or (hero or killer):GetUnitName()
	local reinc = unit:IsReincarnating()
	table.insert(fight.deaths, { now, fight.index[unit], by, reinc and 1 or nil })

	if not reinc then
		fight.away[unit] = true
	end
end

function match_log:Died(unit, killer, inflictor)
	if players[unit:GetId()] ~= unit then
		return
	end

	local pos = unit:GetAbsOrigin()
	local tower = towers[unit:GetTeamNumber()]
	local streak = unit:FindModifierByName("modifier_player_main_custom")
	local fight = self.member[unit]
	local ability = inflictor and EntIndexToHScript(inflictor)

	self:Event(unit, {
		type = "death",
		x = math.floor(pos.x + 0.5),
		y = math.floor(pos.y + 0.5),
		by = killer:GetUnitName(),
		by_id = players[killer:GetId()] == killer and killer:GetId() or nil,
		src = IsValid(ability) and ability.GetAbilityName and ability:GetAbilityName() or nil,
		fight = fight and fight.id,
		duel = unit.died_on_duel and 1 or nil,
		hunt = IsValid(tower) and tower:HasModifier("modifier_the_hunt_custom_tower") and 1 or nil,
		respawn = math.ceil(unit:GetTimeUntilRespawn()),
		streak = streak and streak:GetStackCount(),
	})
end

function match_log:Buyback(hero)
	if players[hero:GetId()] ~= hero then
		return
	end

	self:Event(hero, { type = "buyback", respawn = math.ceil(hero:GetTimeUntilRespawn()) })
end

function match_log:Rune(hero, net_k, gold, exp, white)
	self:Event(hero, {
		type = "rune",
		net_k = math.floor(net_k * 100 + 0.5),
		gold = math.floor(gold + 0.5),
		exp = math.floor(exp + 0.5),
		white = math.floor(white + 0.5),
	})
end

function match_log:HuntStart(team, reason)
	local teams = dota1x6:GetTeamsNet()
	if #teams < 2 then
		return
	end

	local net_others = 0
	local kills_others = 0
	local target = nil

	for _, data in pairs(teams) do
		if data.team == team then
			target = data
		else
			net_others = net_others + data.gold
			kills_others = kills_others + data.kills
		end
	end

	if not target then
		return
	end

	local count = #teams - 1
	self.hunt_gold = 0

	for _, id in pairs(dota1x6:FindPlayers(team) or {}) do
		local hero = players[id]
		if hero then
			self:Event(hero, {
				type = "hunt",
				src = reason,
				net_k = math.floor(target.gold * count / math.max(net_others, 1) * 100 + 0.5),
				k_gap = self:Tenth(target.kills - kills_others / count),
			})
		end
	end
end

function match_log:HuntGold(gold)
	self.hunt_gold = (self.hunt_gold or 0) + gold
end

function match_log:HuntEnd(team, result, killer)
	for _, id in pairs(dota1x6:FindPlayers(team) or {}) do
		local hero = players[id]
		if hero then
			self:Event(hero, {
				type = "hunt_end",
				src = result,
				by_id = self:IsHero(killer) and killer:GetId() or nil,
				gold = math.floor((self.hunt_gold or 0) + 0.5),
			})
		end
	end

	self.hunt_gold = nil
end

function match_log:Buy(hero, item, cost)
	self:Event(hero, { type = "buy", item = item, cost = cost })
end

function match_log:Sell(id, item)
	local hero = players[id]
	if not hero then
		return
	end

	self:Event(hero, { type = "sell", item = item:GetName() })
end

function match_log:Order(id)
	self.orders[id] = (self.orders[id] or 0) + 1
end

function match_log:Bar(unit, params)
	if not params.style then
		return
	end

	local hero = players[unit:GetId()]
	if not hero then
		return
	end

	local bars = self.bars[hero] or {}
	self.bars[hero] = bars

	local bar = bars[params.style] or {}
	bars[params.style] = bar

	if params.hide == 1 then
		bar.value = nil
		return
	end

	bar.value = self:Tenth(self:Number(params.override_stack) or self:Number(params.stack) or 1)

	if self.member[hero] then
		bar.peak = math.max(bar.peak or bar.value, bar.value)
	end
end

function match_log:Leave(hero)
	local now = self:Now()
	local record = self:Record(hero)
	local id = hero:GetId()

	record.sum = {
		t = now,
		lvl = hero:GetLevel(),
		xp = hero:GetCurrentXP(),
		nw = math.floor(hero.networth + 0.5),
		k = hero.kills_done,
		d = PlayerResource:GetDeaths(id),
		lh = PlayerResource:GetLastHits(id),
		resource = self:Amounts(hero),
		orbs = { hero.gray, hero.blue, hero.purple, hero.orange_count },
		tal = {},
		legendary = hero.legendary_talent,
		priority = hero.priority_talent or "",
		items = self:Items(hero),
		perma = self:Perma(hero),
		runes = hero.bounty_runes_picked,
		patrols = hero.patrol_kills,
		obs = hero.obs_placed,
		obs_kills = hero.obs_kills,
		sentry_kills = hero.sentry_kills,
		towers = hero.towers_destroyed,
	}

	for key, level in pairs(hero.upgrades) do
		record.sum.tal[key] = level
	end

	local fight = self.member[hero]
	if not fight then
		return
	end

	fight.members[fight.index[hero]].left = now
end

function match_log:Track()
	local now = self:Now()
	local rows = {}
	local hunted = -1
	local hunted_team

	for team, tower in pairs(towers) do
		if IsValid(tower) and tower:HasModifier("modifier_the_hunt_custom_tower") then
			hunted_team = team
		end
	end

	for id, hero in pairs(players) do
		if IsValid(hero) then
			local hp, mp, _, pos = self:Snapshot(hero)
			local team = hero:GetTeamNumber()
			local tower = towers[team]
			local streak = hero:FindModifierByName("modifier_player_main_custom")
			local rank = 1
			local out = 0
			local inc = 0

			for _, other in pairs(players) do
				if IsValid(other) and other.networth > hero.networth then
					rank = rank + 1
				end
			end

			for _, data in pairs(hero.damage_out) do
				out = out + data.damage
			end

			for _, data in pairs(hero.damage_inc) do
				inc = inc + data.all_damage
			end

			if team == hunted_team then
				hunted = id
			end

			table.insert(
				rows,
				self:Columns(self.track_cols, {
					id = id,
					alive = hero:IsAlive() and 1 or 0,
					respawn = hero:IsAlive() and 0 or math.ceil(hero:GetTimeUntilRespawn()),
					hp = hp,
					mp = mp,
					x = pos[1],
					y = pos[2],
					fight = self.member[hero] and self.member[hero].id,
					nw = math.floor(hero.networth + 0.5),
					rank = rank,
					lvl = hero:GetLevel(),
					xp = hero:GetCurrentXP(),
					k = hero.kills_done,
					d = PlayerResource:GetDeaths(id),
					lh = PlayerResource:GetLastHits(id),
					dmg_out = math.floor(out + 0.5),
					dmg_in = math.floor(inc + 0.5),
					streak = streak and streak:GetStackCount(),
					hunt = hero:HasModifier("modifier_the_hunt_custom_hero") and 1,
					duel = hero:HasModifier("modifier_duel_hero_thinker") and 1,
					buffs = (hero:HasScepter() and 1 or 0) + (hero:HasShard() and 2 or 0),
					tower = IsValid(tower) and math.floor(tower:GetHealthPercent()),
					orders = self.orders[id],
					conn = PlayerResource:GetConnectionState(id),
				})
			)

			self.orders[id] = 0

			local record = self:Record(hero)
			if record.pending and hero:IsAlive() and not self.member[hero] and not self:Temp(hero)[1] then
				table.insert(record.stats, self:Stats(hero, record.pending, now))
				record.pending = nil
			end
		end
	end

	local time, max_time = dota1x6:GetWaveTimer()
	local info = self:Columns(self.match_cols, {
		wave = dota1x6.current_wave,
		timer = time,
		max_timer = max_time,
		players = #rows,
		hunt = hunted,
		final = dota1x6:FinalDuel() and 1,
	})

	table.insert(self.track, json.encode({ now, info, rows }))
	return self.track_time
end

function match_log:Wave(more_gold, low_net)
	local now = self:Now()
	local wave = dota1x6.current_wave

	if wave == self.wave then
		return
	end
	self.wave = wave

	for id, hero in pairs(players) do
		if IsValid(hero) then
			local record = self:Record(hero)
			local team = hero:GetTeamNumber()
			local amounts = self:Amounts(hero)
			local orbs = { hero.gray, hero.blue, hero.purple, hero.orange_count }
			local lh = PlayerResource:GetLastHits(id)
			local mark = record.mark or { resource = {}, orbs = { 0, 0, 0, 0 }, lh = 0 }
			local gained = {}

			for kind, sources in pairs(amounts) do
				for source, amount in pairs(sources) do
					local delta = amount - ((mark.resource[kind] or {})[source] or 0)
					if delta ~= 0 then
						gained[kind] = gained[kind] or {}
						gained[kind][source] = delta
					end
				end
			end

			if record.pending and hero:IsAlive() then
				local stats = self:Stats(hero, record.pending, now)
				local temp = self:Temp(hero)
				stats.temp = temp[1] and temp
				table.insert(record.stats, stats)
			elseif record.pending then
				table.insert(record.stats, { w = record.pending, t = now, dead = 1 })
			end

			record.pending = wave
			record.mark = { resource = amounts, orbs = orbs, lh = lh }

			local row = {
				w = wave,
				t = now,
				gold_pct = more_gold[team],
				lownet = low_net[team] and low_net_waves[wave] and 1 or nil,
				gained = next(gained) and gained,
				orbs = {
					orbs[1] - mark.orbs[1],
					orbs[2] - mark.orbs[2],
					orbs[3] - mark.orbs[3],
					orbs[4] - mark.orbs[4],
				},
				lh = lh - mark.lh,
				items = self:Items(hero),
				perma = self:Perma(hero),
			}

			table.insert(record.waves, row)
		end
	end
end

function match_log:Place(id, place)
	local record = self.records[id]
	if not record then
		return
	end

	record.place = place
end

function match_log:Send(final)
	self.packet = self.packet + 1

	local packet = self.packet
	local list = {}

	for id, record in pairs(self.records) do
		list[tostring(id)] = {
			hero = record.hero,
			place = record.place,
			pokes = record.pokes,
			pokes_damage = math.floor(record.pokes_damage + 0.5),
			waves = record.waves[1] and record.waves,
			stats = record.stats[1] and record.stats,
			ev = record.ev[1] and record.ev,
			sum = not record.sent and record.sum or nil,
		}
		record.sent = record.sent or record.sum ~= nil
		record.waves = {}
		record.stats = {}
		record.ev = {}
	end

	if final then
		self.info.duration = self:Now()
	end

	local data = {
		v = 1,
		n = packet,
		["end"] = final and 1 or 0,
		t = self:Now(),
		info = self.info,
		meta = {
			frame = self.frame_time,
			track = self.track_time * 10,
			pre = self.pre_time,
			gap = self.gap_time,
			quiet = self.quiet_time,
			far = self.far_range,
			min_damage = self.min_damage,
			min_time = self.min_time,
			track_cols = self.track_cols,
			match_cols = self.match_cols,
		},
		players = list,
	}

	local head = json.encode(data)
	local body = '{"match_id":'
		.. json.encode(HTTP.GetMatchId())
		.. ',"data":'
		.. head:sub(1, -2)
		.. ',"fights":['
		.. table.concat(self.done, ",")
		.. '],"track":['
		.. table.concat(self.track, ",")
		.. "]}}"

	self.done = {}
	self.track = {}

	local request = HTTP.serverData.isStatsMatch and CreateHTTPRequestScriptVM("POST", HTTP.STATS_HOST .. self.url)
	if request then
		request:SetHTTPRequestHeaderValue("dedicated-key", HTTP.KEY)
		request:SetHTTPRequestRawPostBody("application/json", body)
		request:SetHTTPRequestAbsoluteTimeoutMS(60000)
		request:Send(function(result)
			if tonumber(result.StatusCode) == 200 or self.failed then
				return
			end
			self.failed = true
			HTTP.Request(
				"/http-errors",
				{
					StatusCode = result.StatusCode,
					Url = self.url,
					RequestBody = "packet " .. packet,
					ResponseMessage = tostring(result.Body),
				}
			)
		end)
	end

	if final then
		return
	end
	return self.send_time
end

function match_log:Finish()
	local now = self:Now()

	for fight in pairs(self.open) do
		self:CloseFrame(fight, now)
		self:Close(fight)
	end

	self:Send(true)
	self.active = false
end

function match_log:Tick()
	local now = self:Now()
	local t = math.floor(now / self.frame_time + 0.5) * self.frame_time

	for fight in pairs(self.open) do
		self:CloseFrame(fight, t)

		local alive = 0
		for _, member in ipairs(fight.members) do
			if
				IsValid(member.unit)
				and (member.unit:IsAlive() or member.unit:IsReincarnating())
				and not fight.away[member.unit]
			then
				alive = alive + 1
			end
		end

		if now - fight.t1 >= (alive > 1 and self.gap_time or self.quiet_time) then
			self:Close(fight)
		end
	end

	if next(self.open) then
		return self.frame_time / 10
	end

	self.timer = nil
end

function match_log:Now()
	return math.floor(GameRules:GetDOTATime(false, false) * 10 + 0.5)
end

function match_log:Record(hero)
	local id = hero:GetId()
	if not self.records[id] then
		self.records[id] =
			{ hero = hero:GetUnitName(), pre = {}, ev = {}, waves = {}, stats = {}, pokes = 0, pokes_damage = 0 }
	end

	return self.records[id]
end

function match_log:Pre(hero, entry)
	local pre = self:Record(hero).pre
	table.insert(pre, entry)

	while pre[1][1] < entry[1] - self.pre_time do
		table.remove(pre, 1)
	end
end

function match_log:Event(hero, data)
	data.t = self:Now()
	table.insert(self:Record(hero).ev, data)
end

function match_log:IsHero(unit)
	return IsValid(unit) and players[unit:GetId()] == unit
end

function match_log:Key(fight, hero, key, target)
	local i = fight.index[hero]
	if not target then
		return i .. ":" .. key
	end

	return i .. ">" .. (fight.index[target] or target:GetUnitName()) .. ":" .. key
end

function match_log:Stale(hero, target)
	if not hero:IsAlive() then
		return true
	end

	return (hero:GetAbsOrigin() - target:GetAbsOrigin()):Length2D() >= self.far_range
end

function match_log:Link(a, b, now)
	local fight = self.member[a]
	local other = self.member[b]

	if fight and other and fight ~= other then
		if other.t0 < fight.t0 then
			fight, other = other, fight
		end

		local units = {}
		for _, member in ipairs(other.members) do
			table.insert(units, member.unit)
		end

		other.merged = fight.id
		self:CloseFrame(other, now)
		self:Close(other)

		for _, unit in ipairs(units) do
			if IsValid(unit) then
				self:Join(fight, unit, now)
				fight.away[unit] = other.away[unit]
			end
		end
	end

	fight = fight or other

	if not fight then
		self.next_id = self.next_id + 1
		local pos = a:GetAbsOrigin()
		fight = {
			id = self.next_id,
			t0 = now,
			t1 = now,
			kind = 0,
			wave = dota1x6.current_wave,
			pos = { math.floor(pos.x + 0.5), math.floor(pos.y + 0.5) },
			members = {},
			index = {},
			away = {},
			present = {},
			deaths = {},
			frame = {},
			frames = {},
		}

		if IsValid(a.field_invun_mod) then
			fight.kind = dota1x6:FinalDuel() and 2 or 1
		end

		self.open[fight] = true

		if not self.timer then
			local time = GameRules:GetDOTATime(false, false)
			local step = self.frame_time / 10
			self.timer = Timers:CreateTimer((math.floor(time / step) + 1) * step - time, function()
				return self:Call("Tick")
			end)
		end
	end

	self:Join(fight, a, now)
	self:Join(fight, b, now)
	return fight
end

function match_log:Join(fight, hero, now)
	if fight.index[hero] then
		return
	end

	if not self.mods[hero] then
		local mods = setmetatable({}, { __mode = "k" })
		for _, mod in pairs(hero:FindAllModifiers()) do
			mods[mod] = true
		end
		self.mods[hero] = mods
	end

	local member = {
		unit = hero,
		hero = hero:GetUnitName(),
		id = hero:GetId(),
		t_in = now,
		lvl = hero:GetLevel(),
		nw = math.floor(hero.networth + 0.5),
		str = hero:GetStrength(),
		agi = hero:GetAgility(),
		int = hero:GetIntellect(false),
		hp_max = hero:GetMaxHealth(),
		mp_max = hero:GetMaxMana(),
		damage = hero:GetAverageTrueAttackDamage(nil),
		attack_speed = math.floor(hero:GetDisplayAttackSpeed() + 0.5),
		spell_amp = math.floor(hero:GetSpellAmplification(false) * 100 + 0.5),
		scepter = hero:HasScepter() and 1 or nil,
		shard = hero:HasShard() and 1 or nil,
		tal = {},
		pre = {},
		out = 0,
		inc = 0,
	}

	member.hp0, member.mp0 = self:Snapshot(hero)

	for key, level in pairs(hero.upgrades) do
		member.tal[key] = level
	end

	for _, entry in ipairs(self:Record(hero).pre) do
		if entry[1] >= now - self.pre_time then
			table.insert(member.pre, entry)
		end
	end

	table.insert(fight.members, member)
	fight.index[hero] = #fight.members
	self.member[hero] = fight
end

function match_log:Add(frame, field, key, value)
	local data = frame[field] or {}
	data[key] = (data[key] or 0) + value
	frame[field] = data
end

function match_log:CloseFrame(fight, t)
	local frame = fight.frame
	fight.frame = {}

	if not next(frame) and t - fight.t1 > self.tail_time then
		return
	end

	frame.t = t
	frame.dmg = self:Round(frame.dmg)
	frame.heal = self:Round(frame.heal)
	frame.shield = self:Round(frame.shield)
	frame.hp = {}
	frame.mp = {}
	frame.st = {}
	frame.pos = {}

	local stk = {}

	for i, member in ipairs(fight.members) do
		frame.hp[i], frame.mp[i], frame.st[i], frame.pos[i] = self:Snapshot(member.unit)
		if IsValid(member.unit) then
			self:Scan(stk, member.unit, fight, i)
		end
	end

	local present = {}
	local on = {}
	local off = {}

	for key, value in pairs(stk) do
		present[key] = true
		if not fight.present[key] then
			table.insert(on, key)
		end
		if value == 0 then
			stk[key] = nil
		end
	end

	for key in pairs(fight.present) do
		if not present[key] then
			table.insert(off, key)
		end
	end

	fight.present = present
	frame.stk = next(stk) and stk
	frame.on = on[1] and on
	frame.off = off[1] and off

	local val = {}

	for holder, fields in pairs(self.watch) do
		if not IsValid(holder) then
			self.watch[holder] = nil
		else
			for field, data in pairs(fields) do
				local hero = IsValid(data[1]) and players[data[1]:GetId()]
				local i = hero and fight.index[hero]
				local talents = i and ingame_talents[fight.members[i].hero] or {}
				local taken = i and active_talents[fight.members[i].id] or {}
				if i and (not talents[data[2]] or taken[data[2]]) and (not data[3] or self:IsHero(data[3])) then
					local value = holder[field]
					if type(value) == "function" then
						value = value(holder)
					end
					if type(value) == "number" and value ~= 0 then
						local key = self:Key(fight, hero, data[2], data[3])
						value = self:Tenth(value)
						val[key] = math.max(val[key] or value, value)
					end
				end
			end
		end
	end

	frame.val = next(val) and val

	local bar = {}

	for i, member in ipairs(fight.members) do
		local bars = self.bars[member.unit] or {}
		for style, data in pairs(bars) do
			if data.peak or data.value then
				bar[i .. ":" .. style] = data.peak or data.value
			end
			data.peak = nil
			if not data.value then
				bars[style] = nil
			end
		end
	end

	frame.bar = next(bar) and bar

	table.insert(fight.frames, self:Encode(frame))
end

function match_log:Close(fight)
	self.open[fight] = nil

	local damage = 0

	for _, member in ipairs(fight.members) do
		if self.member[member.unit] == fight then
			self.member[member.unit] = nil
		end

		if IsValid(member.unit) then
			member.hp1, member.mp1 = self:Snapshot(member.unit)
		end

		member.unit = nil
		member.out = math.floor(member.out + 0.5)
		member.inc = math.floor(member.inc + 0.5)
		member.tal = next(member.tal) and member.tal
		member.pre = member.pre[1] and member.pre
		damage = damage + member.out
	end

	if
		not fight.merged
		and not fight.deaths[1]
		and damage < self.min_damage
		and fight.t1 - fight.t0 < self.min_time
	then
		for _, member in ipairs(fight.members) do
			local record = self.records[member.id]
			record.pokes = record.pokes + 1
			record.pokes_damage = record.pokes_damage + member.out + member.inc
		end
		return
	end

	local data = {
		id = fight.id,
		t0 = fight.t0,
		t1 = fight.t1,
		kind = fight.kind,
		wave = fight.wave,
		pos = fight.pos,
		merged = fight.merged,
		members = fight.members,
		deaths = fight.deaths[1] and fight.deaths,
	}

	local header = json.encode(data)
	table.insert(self.done, header:sub(1, -2) .. ',"frames":[' .. table.concat(fight.frames, ",") .. "]}")
end

function match_log:Round(data)
	if not data then
		return
	end

	for source, value in pairs(data) do
		data[source] = math.floor(value + 0.5)
	end

	return data
end

function match_log:Tenth(value)
	return math.floor(value * 10 + 0.5) / 10
end

function match_log:Number(value)
	if type(value) == "string" then
		value = tonumber(string.match(value, "%-?%d+%.?%d*"))
	end

	return type(value) == "number" and value or nil
end

function match_log:Columns(cols, data)
	local result = {}

	for index, name in ipairs(cols) do
		result[index] = data[name] or 0
	end

	return result
end

function match_log:Encode(value)
	local kind = type(value)

	if kind == "string" then
		return json.quotestring(value)
	end

	if kind ~= "table" then
		return kind == "number" and value % 1 == 0 and tostring(value) or json.encode(value)
	end

	local list = {}

	if value[1] ~= nil or next(value) == nil then
		for index, item in ipairs(value) do
			list[index] = self:Encode(item)
		end
		return "[" .. table.concat(list, ",") .. "]"
	end

	for key, item in pairs(value) do
		table.insert(list, json.quotestring(key) .. ":" .. self:Encode(item))
	end

	return "{" .. table.concat(list, ",") .. "}"
end

function match_log:Amounts(hero)
	local result = {}

	for kind, sources in pairs(hero.resource) do
		result[kind] = {}
		for source, data in pairs(sources) do
			result[kind][source] = self:Tenth(data.amount)
		end
	end

	return result
end

function match_log:Items(hero)
	local result = {}

	for slot = 0, 5 do
		local item = hero:GetItemInSlot(slot)
		table.insert(result, item and item:GetName() or "")
	end

	local neutral = hero:GetItemInSlot(16)
	table.insert(result, neutral and neutral:GetName() or "")
	return result
end

function match_log:Perma(hero)
	local result = {}

	for _, mod in pairs(hero:FindAllModifiers()) do
		if perma_mods[mod:GetName()] then
			local kind = self:Kind(mod)
			result[kind and kind[1] or mod:GetName()] = mod:GetStackCount()
		end
	end

	return next(result) and result
end

function match_log:Stats(hero, wave, now)
	local ok, magic = pcall(hero.Script_GetMagicalArmorValue, hero, nil)

	return {
		w = wave,
		t = now,
		str = hero:GetStrength(),
		agi = hero:GetAgility(),
		int = hero:GetIntellect(false),
		hp_max = hero:GetMaxHealth(),
		mp_max = hero:GetMaxMana(),
		armor = self:Tenth(hero:GetPhysicalArmorValue(false)),
		magic = ok and type(magic) == "number" and math.floor(magic * 100 + 0.5) or nil,
		damage = hero:GetAverageTrueAttackDamage(nil),
		attack_speed = math.floor(hero:GetDisplayAttackSpeed() + 0.5),
		move_speed = math.floor(hero:GetIdealSpeed() + 0.5),
		spell_amp = math.floor(hero:GetSpellAmplification(false) * 100 + 0.5),
		status = math.floor(hero:GetStatusResistance() * 100 + 0.5),
		evasion = math.floor(hero:GetEvasion() * 100 + 0.5),
		cdr = math.floor((1 - hero:GetCooldownReduction()) * 100 + 0.5),
	}
end

function match_log:Temp(hero)
	local result = {}

	for _, mod in pairs(hero:FindAllModifiers()) do
		local kind = self:Kind(mod)
		if kind and kind[2] == hero and mod:GetDuration() > 0 and not mod:IsDebuff() and self:Gate(kind) then
			table.insert(result, kind[1])
		end
	end

	return result
end

function match_log:Kind(mod)
	local kind = self.kinds[mod]
	if kind ~= nil then
		return kind
	end

	local caster = mod:GetCaster()
	local owner = IsValid(caster) and players[caster:GetId()]
	local talents = owner and ingame_talents[owner:GetUnitName()] or {}
	local mod_name = mod:GetName()
	local key = log_modifiers[mod_name]
	local gate

	if type(key) == "table" then
		gate = {}
		for index = 2, #key do
			table.insert(gate, key[index])
		end
		key = key[1]
	end

	if key == true then
		key = mod_name
	end

	if key and not gate and talents[key] then
		gate = { key }
	end

	local ok, attributes = pcall(mod.GetAttributes, mod)
	local multi = ok and type(attributes) == "number" and bit.band(attributes, MODIFIER_ATTRIBUTE_MULTIPLE) ~= 0

	kind = owner and key and { key, owner, owner:GetId(), mod_name, multi, gate } or false
	self.kinds[mod] = kind
	return kind
end

function match_log:Gate(kind)
	if not kind[6] then
		return true
	end

	local taken = active_talents[kind[3]] or {}
	for _, name in ipairs(kind[6]) do
		if taken[name] then
			return true
		end
		if name == "Scepter" and IsValid(kind[2]) and kind[2]:HasScepter() then
			return true
		end
		if name == "Shard" and IsValid(kind[2]) and kind[2]:HasShard() then
			return true
		end
	end

	return false
end

function match_log:Scan(result, unit, fight, j)
	local mods = self.mods[unit]
	local parts = {}

	for mod, kind in pairs(mods) do
		if not IsValid(mod) then
			kind = nil
		elseif kind == true then
			kind = self:Kind(mod)
			kind = kind and not perma_mods[kind[4]] and kind or nil
		end

		mods[mod] = kind

		local i = kind and fight.index[kind[2]]

		if i and self:Gate(kind) then
			local key = i == j and i .. ":" .. kind[1] or i .. ">" .. j .. ":" .. kind[1]
			local part = parts[key] or {}
			local stacks = mod:GetStackCount()
			part[kind[4]] = (part[kind[4]] or 0) + (kind[5] and math.max(1, stacks) or stacks)
			parts[key] = part
		end
	end

	for key, part in pairs(parts) do
		local value = 0
		for _, sum in pairs(part) do
			value = math.max(value, sum)
		end
		result[key] = value
	end
end

function match_log:Snapshot(unit)
	if not IsValid(unit) then
		return 0, 0, 0, { 0, 0 }
	end

	local mana = unit:GetMaxMana() > 0 and math.floor(unit:GetManaPercent() + 0.5) or 0
	local state = 0
	local flag = 1

	for _, method in ipairs(self.states) do
		if unit[method](unit) then
			state = state + flag
		end
		flag = flag * 2
	end

	local pos = unit:GetAbsOrigin()
	return unit:GetHealthPercent(), mana, state, { math.floor(pos.x + 0.5), math.floor(pos.y + 0.5) }
end