--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "modifiers/framework/modifier_hero"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__StringSubstring
local f = b.__TS__DecorateLegacy
local g = {}
local h = require("modifiers.eom_modifier.eom_modifier")
local i = h.EOMModifier
local j = h.registerEOMModifier
local k = c()
k.name = "modifier_hero"
d(k, i)
function k.prototype.____constructor(self, ...)
	i.prototype.____constructor(self, ...)
	self.overload = 0
	self.overloadSpell = 0
	self.overloadOther = 0
	self.voiceEnabled = true
	self.enableSound = true
	self.nickName = ""
	self.idleTime = 0
	self.idleVoiceGap = 15
	self.ultimateEnableTime = 0
	self.cosmeticIDs = {}
end
function k.prototype.GetNextIdleVoiceGap(self)
	return math.min(math.floor(self.idleVoiceGap * 1.35 + 8), 600)
end
function k.prototype.OnCreated(self, l)
	if IsServer() then
		self.playerID = self:GetParent():GetPlayerOwnerID()
		self:SetHasCustomTransmitterData(true)
		self:StartThink(0.5, function()
			self.overload = math.max(self.overload - 1, 0)
			self.overloadSpell = math.max(self.overloadSpell - 1, 0)
			self.overloadOther = math.max(self.overloadOther - 1, 0)
		end)
		local m = self:GetParent()
		local n = m:GetPlayerOwnerID()
		self:StartThink(1, "IdleTime", function()
			if m:IsIdle() then
				self.idleTime = self.idleTime + 1
				if self.idleTime >= 5 then
					self:EmitVoiceSound("idle", true)
					self.idleTime = -self.idleVoiceGap
					self.idleVoiceGap = self:GetNextIdleVoiceGap()
				end
			else
				self.idleTime = 0
				self.idleVoiceGap = 15
			end
		end)
		self:StartThink(AI_TIMER_TICK_TIME, "AutoPickup", function()
			if not (AbyssalHordeManager and AbyssalHordeManager:IsRunning()) then
				local o = Service:GetPlayerSetting(n, "setting_switch_auto_pick_drop_item", false)
				if DungeonManager ~= nil then
					DungeonManager:TryAutoPickupDropItem(m, o)
				end
				if Service:GetPlayerSetting(n, "setting_switch_auto_pick", true) then
					if DungeonManager ~= nil then
						DungeonManager:TryAutoPickupPreviewReward(m)
					end
				end
			end
		end)
		self.nickName = e(self:GetParent():GetUnitName(), 14)
	end
end
function k.prototype.EventListener(self)
	return {
		damage_event = function(p, q)
			if q.attacker == self:GetParent() and not BitAndEquals(q.damage_flags, EOM_DAMAGE_FLAGS.NO_MANA_REGEN) then
				local m = self:GetParent()
				local r = GetFuryAmplify(m)
				if q.is_crit then
					r = r + GetCritFuryAmplify(m)
				end
				if q.ability ~= nil and q.ability:GetAbilityTag() == AbilityTag.Skill then
					r = r + GetSkillFuryAmplify(m)
				end
				local s = q.ability
				local t = s and s:GetAbilityTag() or AbilityTag.None
				if t == AbilityTag.Attack then
					m:GiveMana((3 - self.overload * 0.2) * (1 + r * 0.01))
					self.overload = math.min(10, self.overload + 1)
				elseif
					t == AbilityTag.Skill
					or t == AbilityTag.Ultimate
					or t == AbilityTag.Dodge
					or t == AbilityTag.Defense
				then
					m:GiveMana((1.5 - self.overloadSpell * 0.15) * (1 + r * 0.01))
					self.overloadSpell = math.min(10, self.overloadSpell + 1)
				end
			elseif q.target == self:GetParent() then
				local m = self:GetParent()
				m:GiveMana(5)
				if q.damage > 0 then
					if q.target:IsAlive() then
						self:EmitVoiceSound("hurt", true)
					else
						if Player:GetHeart(q.target:GetPlayerOwnerID()) > 0 then
							self:EmitVoiceSound("killed", true)
						else
							self:EmitVoiceSound("die", true)
						end
					end
				end
			end
		end,
		ability_cast_complete = function(p, q)
			if q.caster == self:GetParent() then
				if q.abilityTag == AbilityTag.Skill then
					self:EmitVoiceSound("skill")
				elseif q.abilityTag == AbilityTag.Dodge then
					self:EmitVoiceSound("dash")
				elseif q.abilityTag == AbilityTag.Defense then
					self:EmitVoiceSound("defense")
				elseif q.abilityTag == AbilityTag.Ultimate and GameRules:GetGameTime() >= self.ultimateEnableTime then
					self.ultimateEnableTime = GameRules:GetGameTime() + 5
					self:EmitVoiceSound("ultimate", true)
				end
			end
		end,
		dungeon_room_start = function(p, q)
			local m = self:GetParent()
			local u = (GetHealRoomStart(m) + GetHealthCostRoomStart(m)) * m:GetMaxHealth() * 0.01
			if u ~= 0 then
				m:Heal(u, nil)
			end
		end,
		hero_respawn = function(p, q)
			if q.unit == self:GetParent() then
				self:EmitVoiceSound("respawn", true)
			end
		end,
		client_item_pickup = function(p, q)
			if q.playerID == self:GetParent():GetPlayerOwnerID() then
				self:EmitVoiceSound("pickup")
				local v = "Pickup.Item"
				local w = GetItemPropType(q.item_id)
				if w == "9" then
					local x = GetItemEquipmentPart(q.item_id)
					v = (x == "1" or x == "2") and "Pickup.Weapon" or "Pickup.Equip"
				end
				self:GetParent():EmitSound(v)
			end
		end,
		item_added = function(p, q)
			if q.unit == self:GetParent() then
				if q.item:GetName() == "item_boon_bless" then
					self:EmitVoiceSound("bless")
				end
			end
		end,
		hero_level_up = function(p, q)
			if q.unit == self:GetParent() then
				self:EmitVoiceSound("levelup")
			end
		end,
	}
end
function k.prototype.SetVoiceEnabled(self, y)
	self.voiceEnabled = y
	if y then
		self.enableSound = true
		return
	end
	if self.lastSoundName ~= nil then
		StopGlobalSound(self.lastSoundName)
		self.lastSoundName = nil
	end
end
function k.prototype.EmitVoiceSound(self, v, z)
	if z == nil then
		z = false
	end
	if not self.voiceEnabled or not Service:GetPlayerSetting(self.playerID, "setting_switch_hero_voice", true) then
		return false
	end
	v = (((self.nickName .. ".") .. PlayerData:GetHeroVoiceType(self.playerID)) .. ".") .. v
	if z or self.enableSound then
		self.enableSound = false
		if self.lastSoundName ~= nil then
			StopGlobalSound(self.lastSoundName)
		end
		EmitAnnouncerSoundForPlayer(v, self.playerID)
		self.lastSoundName = v
		self:StartThink(RandomInt(5, 7), "EnableSound", function()
			self.enableSound = true
			return -1
		end)
		return true
	else
		return false
	end
end
function k.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_MANA_REGEN_CONSTANT, MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS }
end
function k.prototype.GetModifierConstantManaRegen(self)
	return (GetFuryRegen(self:GetParent()) * 1 + GetFuryAmplify(self:GetParent()) * 0.01)
		* GetFinalGainMultiplier(nil, self:GetParent(), "fury_reduction_mul")
end
k = f(
	{
		j(
			a,
			{
				IsHidden = true,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				IsStunDebuff = false,
				AllowIllusionDuplicate = false,
				RemoveOnDeath = false,
			}
		),
	},
	k
)
function g.SetHeroVoiceEnabled(self, A, y)
	if not IsValid(A) then
		return false
	end
	local B = A:FindModifierByName("modifier_hero")
	if B == nil then
		B = A:AddNewModifier(A, nil, "modifier_hero", nil)
	end
	if B == nil then
		return false
	end
	B:SetVoiceEnabled(y)
	return true
end
return g