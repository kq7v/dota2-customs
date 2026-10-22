--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/privilege/privilege_myth_021"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__ArraySplice
local f = b.__TS__DecorateLegacy
local g = {}
local h = require("abilities.eom_privilege")
local i = h.EOMPrivilege
local j = h.PrivilegeValue
local k = h.RegisterPrivilege
local l = c()
l.name = "privilege_myth_021"
d(l, i)
function l.prototype.OnCreated(self)
	self.roomComplete = true
	self.moveDistance = 0
	self.summonList = {}
	local m = self:GetSpecialValueFor("sum_limit")
	local n = self:GetSpecialValueFor("radius")
	self.timeKey = Timer:GameTimer(0.2, function()
		local o = self:GetCaster()
		if not IsValid(o) or self.roomComplete or not self:IsCooldownReady() then
			self.moveDistance = 0
			return 0.2
		end
		do
			local p = #self.summonList - 1
			while p >= 0 do
				local q = self.summonList[p + 1]
				if not IsValid(q.ent) then
					self:StartThink(-1, q.thinkName)
					e(self.summonList, p, 1)
				end
				p = p - 1
			end
		end
		local r = o:GetAbsOrigin()
		if self.lastOrigin ~= nil then
			self.moveDistance = self.moveDistance + CalcDistance(self.lastOrigin, r)
		end
		self.lastOrigin = o:GetAbsOrigin()
		if self.moveDistance >= self.value then
			if #self.summonList >= m then
				self:RemoveSummon(self.summonList[1])
			end
			self:SummonSpore(o, self.lastOrigin, n)
			self.moveDistance = 0
			self:StartCooldown(self.cd)
		end
		return 0.2
	end)
end
function l.prototype.EventListener(self)
	return {
		dungeon_room_start = function(s, t)
			self.roomComplete = false
		end,
		dungeon_room_clear = function(s, t)
			self.roomComplete = true
			self.moveDistance = 0
			self.lastOrigin = nil
			self:ClearSummons()
		end,
		GameModeStarted = function(s, t)
			self.roomComplete = false
		end,
		GameModeExited = function(s, t)
			self.roomComplete = true
			self.moveDistance = 0
			self.lastOrigin = nil
			self:ClearSummons()
		end,
	}
end
function l.prototype.OnDestroy(self)
	if self.timeKey ~= nil then
		self:ClearSummons()
		Timer:StopTimer(self.timeKey)
	end
end
function l.prototype.SummonSpore(self, o, u, n)
	local v = VectorToAngles(o:GetForwardVector())
	local w = SpawnEntityFromTableSynchronous(
		"dota_prop_customtexture",
		{
			angles = ("0 " .. tostring(v.y)) .. " 0",
			model = "models/items/furion/treant/shroomling_treant/shroomling_treant.vmdl",
			scales = "0.7 0.7 0.7",
			origin = GetGroundPosition(u, o),
			StartingAnim = "ACT_DOTA_SPAWN",
			StartingAnimationLoopMode = "ANIM_LOOP_MODE_USE_SEQUENCE_SETTINGS",
			IdleAnim = "ACT_DOTA_IDLE",
			IdleAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING",
		}
	)
	local q = { ent = w, thinkName = DoUniqueString("toxic_spore") }
	local x = self.summonList
	x[#x + 1] = q
	self:StartThink(0.3, q.thinkName, function()
		self:SporeThink(q, n)
	end)
end
function l.prototype.SporeThink(self, q, n)
	local o = self:GetCaster()
	if not IsValid(o) or not IsValid(q.ent) then
		self:RemoveSummon(q)
		return
	end
	local u = q.ent:GetAbsOrigin()
	local y = FindEnemiesInRadius(o, u, n)
	if #y > 0 then
		local z = math.max(1, Bless:GetSuitLevel(o:GetPlayerOwnerID(), "Poison"))
		local A = Privilege:HasPrivilege("privilege_myth_022", o:GetPlayerOwnerID())
			and self:PRD(Privilege:GetPrivilegeSpecialValue("privilege_myth_022", 1, "value", o))
		for p, B in ipairs(y) do
			o:Poison(B, z)
			if A then
				B:TriggerPoison(o)
			end
		end
		local C = ParticleManager:CreateParticle("particles/abilities/judubaozi_blast.vpcf", PATTACH_CUSTOMORIGIN, o)
		ParticleManager:SetParticleControl(C, 0, u)
		ParticleManager:SetParticleControl(C, 1, Vector(325, 325, 325))
		ParticleManager:ReleaseParticleIndex(C)
		o:EmitSound("Hero_Pugna.NetherBlast", u)
		self:RemoveSummon(q)
		return
	end
end
function l.prototype.RemoveSummon(self, q)
	self:StartThink(-1, q.thinkName)
	ArrayRemove(self.summonList, q)
	if IsValid(q.ent) then
		q.ent:RemoveSelf()
	end
end
function l.prototype.ClearSummons(self)
	for s, q in ipairs(self.summonList) do
		self:StartThink(-1, q.thinkName)
		if IsValid(q.ent) then
			q.ent:RemoveSelf()
		end
	end
	self.summonList = {}
end
f({ j(nil) }, l.prototype, "value", nil)
f({ j(nil) }, l.prototype, "cd", nil)
l = f({ k(nil) }, l)
return g