--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


ErrorTracking = ErrorTracking or {}
ErrorTracking.collected_errors = ErrorTracking.collected_errors or {}
ErrorTracking.request_delay = ERROR_TRACKING_REQUEST_DELAY
ErrorTracking.known_immediate_errors = {}
-- status: complete, untested

ErrorTracking.traceback_enabled = not IsInToolsMode() and debug and debug.traceback

if ErrorTracking.traceback_enabled then
	print("[Error Tracking] applied traceback override")
	debug.old_traceback = debug.old_traceback or debug.traceback
	debug.traceback = function(...)
		local stack = debug.old_traceback(...)
		ErrorTracking.Process(stack)

		return stack
	end
end

function ErrorTracking.Process(stack)
	ErrorTracking.Collect(stack)

	for player_id = 0, 23 do
		if PlayerResource:IsValidPlayerID(player_id) and GameMode:IsDeveloper(player_id) then
			local player = PlayerResource:GetPlayer(player_id)
			if player then
				CustomGameEventManager:Send_ServerToPlayer(player, "server_print", { message = stack })
			end
		end
	end
end

function ErrorTracking.Collect(stack)
	stack = stack:gsub(": at 0x%x+", ": at 0x")
	ErrorTracking.collected_errors[stack] = (ErrorTracking.collected_errors[stack] or 0) + 1
	return stack
end

local function handle_error(_error)
	local error_text = _error:gsub(": at 0x%x+", ": at 0x")
	GameRules:GetGameModeEntity():SetContextThink(DoUniqueString("emitError"), function()
		error(error_text, 0)
	end, 0)
	ErrorTracking.Process(error_text)

	return _error
end

local error_handler = ErrorTracking.traceback_enabled and debug.traceback or handle_error

function ErrorTracking.Try(callback, ...)
	return xpcall(callback, error_handler, ...)
end

--- Attempts to call function, catching any errors risen and sending them to backend immediately
--- If those errors weren't encountered before
---@param callback function
function ErrorTracking.TryImmediate(callback, ...)
	return xpcall(callback, function(error)
		local error_text = error:gsub(": at 0x%x+", ": at 0x")
		DebugMessage("[Error Tracking] caught error with TryImmediate:\n", error_text)

		if ErrorTracking.known_immediate_errors[error_text] then
			return
		end

		ErrorTracking.known_immediate_errors[error_text] = true

		WebApi:Send("api/lua/match/script_errors", {
			errors = {
				[error_text] = 1,
			},
		})
	end, ...)
end

Timers:CreateTimer({
	useGameTime = false,
	callback = function()
		if next(ErrorTracking.collected_errors) ~= nil then
			WebApi:Send("api/lua/match/script_errors", {
				errors = ErrorTracking.collected_errors,
			})
			ErrorTracking.collected_errors = {}
		end
		return ErrorTracking.request_delay
	end,
})