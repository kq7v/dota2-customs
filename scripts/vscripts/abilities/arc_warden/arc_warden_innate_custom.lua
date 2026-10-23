--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_arc_warden_ancients_ally_custom",
	"abilities/arc_warden/arc_warden_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_ancients_ally_custom_runes",
	"abilities/arc_warden/arc_warden_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)

arc_warden_innate_custom = class({})
arc_warden_innate_custom.talents = {}

function arc_warden_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_arc_warden.vsndevts", context)
	PrecacheResource("particle", "particles/enigma/summon_perma.vpcf", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_arc_warden", context)
end

function arc_warden_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w3 = 0,
			w3_damage = 0,

			has_r2 = 0,
			r2_move = 0,
			r2_range = 0,
			r2_bonus = caster:GetTalentValue("modifier_arc_warden_double_2", "bonus", true),
		}
	end

	if caster:HasTalent("modifier_arc_warden_field_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_arc_warden_field_3", "damage") / 100
	end

	if caster:HasTalent("modifier_arc_warden_double_2") then
		self.talents.has_r2 = 1
		self.talents.r2_move = caster:GetTalentValue("modifier_arc_warden_double_2", "move")
		self.talents.r2_range = caster:GetTalentValue("modifier_arc_warden_double_2", "range")
	end
end

function arc_warden_innate_custom:GetIntrinsicModifierName()
	return "modifier_arc_warden_ancients_ally_custom"
end

modifier_arc_warden_ancients_ally_custom = class(mod_hidden)
function modifier_arc_warden_ancients_ally_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.attack_speed = self.ability:GetSpecialValueFor("attack_speed")
	self.spell_damage = self.ability:GetSpecialValueFor("spell_damage")
	self.ability.shard_max = self.ability:GetSpecialValueFor("shard_max")
	self.ability.shard_stats = self.ability:GetSpecialValueFor("shard_stats") / 100
	self.ability.shard_bonus = (self.ability:GetSpecialValueFor("shard_bonus") / 100) / self.ability.shard_max

	if not IsServer() then
		return
	end

	self:SetStackCount(2)
	self:StartIntervalThink(0.1)
end

function modifier_arc_warden_ancients_ally_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self:GetStackCount() ~= 2 then
		self:StartIntervalThink(-1)
		return
	end

	local base = dota1x6:GetBase(self.parent:GetTeamNumber())
	if IsRadiant(tostring(base)) then
		self:SetStackCount(0)
	end

	if IsDire(tostring(base)) then
		self:SetStackCount(1)
	end
end

function modifier_arc_warden_ancients_ally_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_arc_warden_ancients_ally_custom:GetModifierSpellAmplify_Percentage()
	if self:GetStackCount() ~= 0 then
		return
	end
	local bonus = self.spell_damage
	if self.parent:HasShard() then
		bonus = bonus
			* (
				1
				+ self.ability.shard_bonus
					* self.parent:GetUpgradeStack("modifier_arc_warden_ancients_ally_custom_runes")
			)
	end
	return bonus
end

function modifier_arc_warden_ancients_ally_custom:GetModifierAttackSpeedBonus_Constant()
	if self:GetStackCount() ~= 1 then
		return
	end
	local bonus = self.attack_speed
	if self.parent:HasShard() then
		bonus = bonus
			* (
				1
				+ self.ability.shard_bonus
					* self.parent:GetUpgradeStack("modifier_arc_warden_ancients_ally_custom_runes")
			)
	end
	return bonus
end

function modifier_arc_warden_ancients_ally_custom:GetModifierBaseAttack_BonusDamage()
	if not IsValid(self.parent) then
		return
	end
	return self.parent:GetAgility() * self.ability.talents.w3_damage
end

function modifier_arc_warden_ancients_ally_custom:GetModifierMoveSpeedBonus_Constant()
	if not IsValid(self.parent) then
		return
	end
	if self.ability.talents.has_r2 == 0 then
		return
	end
	return self.ability.talents.r2_move
		* (self.parent:HasModifier("modifier_arc_warden_tempest_double_custom") and self.ability.talents.r2_bonus or 1)
end

function modifier_arc_warden_ancients_ally_custom:GetModifierAttackRangeBonus()
	if not IsValid(self.parent) then
		return
	end
	if self.ability.talents.has_r2 == 0 then
		return
	end
	return self.ability.talents.r2_range
		* (self.parent:HasModifier("modifier_arc_warden_tempest_double_custom") and self.ability.talents.r2_bonus or 1)
end

modifier_arc_warden_ancients_ally_custom_runes = class(mod_visible)
function modifier_arc_warden_ancients_ally_custom_runes:RemoveOnDeath()
	return false
end
function modifier_arc_warden_ancients_ally_custom_runes:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max = self.ability.shard_max
	self.stats = self.ability.shard_stats
	self.bonus = self.ability.shard_bonus

	self.StackOnIllusion = true
	if not IsServer() then
		return
	end

	if not self.parent:IsRealHero() or self.parent:IsTempestDouble() then
		return
	end

	self:SetStackCount(1)
	self:StartIntervalThink(1)
end

function modifier_arc_warden_ancients_ally_custom_runes:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_arc_warden_ancients_ally_custom_runes:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end
	if not self.parent:HasShard() then
		return
	end

	self:OnStackCountChanged()
	self.parent:GenericParticle("particles/enigma/summon_perma.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_arc_warden_ancients_ally_custom_runes:OnStackCountChanged(iStackCount)
	if not IsServer() then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end
	if not self.parent:HasShard() then
		return
	end

	self.parent:AddPercentStat({ agi = self.stats, str = self.stats, int = self.stats }, self)
end

function modifier_arc_warden_ancients_ally_custom_runes:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_TOOLTIP2,
	}
end

function modifier_arc_warden_ancients_ally_custom_runes:OnTooltip()
	if not self.parent:HasShard() then
		return 0
	end
	return self.bonus * self:GetStackCount() * 100
end

function modifier_arc_warden_ancients_ally_custom_runes:OnTooltip2()
	if not self.parent:HasShard() then
		return 0
	end
	if self:GetStackCount() < self.max then
		return 0
	end
	return self.stats * 100
end