--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_ogre_magi_dumb_luck_custom",
	"abilities/ogre_magi/ogre_magi_dumb_luck_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_dumb_luck_custom_cdr",
	"abilities/ogre_magi/ogre_magi_dumb_luck_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ogremagi_multi_4"
)

ogre_magi_dumb_luck_custom = class({})
ogre_magi_dumb_luck_custom.talents = {}

function ogre_magi_dumb_luck_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_ogre_magi.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/vo_custom/ogre_magi_vo_custom.vsndevts", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_proc_.vpcf", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_ogre_magi", context)
end

function ogre_magi_dumb_luck_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e2 = 0,
			e2_duration = caster:GetTalentValue("modifier_ogremagi_bloodlust_2", "duration", true),

			has_r3 = 0,
			r3_duration = caster:GetTalentValue("modifier_ogremagi_multi_3", "duration", true),

			has_r4 = 0,
			r4_max = caster:GetTalentValue("modifier_ogremagi_multi_4", "max", true),
			r4_gold = caster:GetTalentValue("modifier_ogremagi_multi_4", "gold", true),
			r4_cdr = caster:GetTalentValue("modifier_ogremagi_multi_4", "cdr", true),

			h3_str = 0,
			h3_mana = 0,
		}
	end

	if caster:HasTalent("modifier_ogremagi_bloodlust_2") then
		self.talents.has_e2 = 1
	end

	if caster:HasTalent("modifier_ogremagi_multi_3") then
		self.talents.has_r3 = 1
	end

	if caster:HasTalent("modifier_ogremagi_multi_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_ogremagi_hero_3") then
		self.talents.h3_str = caster:GetTalentValue("modifier_ogremagi_hero_3", "str") / 100
		self.talents.h3_mana = caster:GetTalentValue("modifier_ogremagi_hero_3", "mana")
		caster:AddPercentStat({ str = self.talents.h3_str }, self.tracker)
	end
end

function ogre_magi_dumb_luck_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_ogre_magi_dumb_luck_custom"
end

function ogre_magi_dumb_luck_custom:OnInventoryContentsChanged()
	if not self.tracker then
		return
	end
	self.tracker:OnIntervalThink()
end

function ogre_magi_dumb_luck_custom:AbilityTarget(target, ability)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if target:IsNull() or not target:IsBaseNPC() then
		return
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return
	end

	if IsValid(self.caster.bloodlust_ability) and self.talents.has_e2 == 1 and not ability:IsItem() then
		target:AddNewModifier(
			self.caster,
			self.caster.bloodlust_ability,
			"modifier_ogre_magi_bloodlust_custom_armor",
			{ duration = self.talents.e2_duration }
		)
	end

	if target:IsRealHero() then
		self.caster:AddNewModifier(self.caster, self, "modifier_ogre_magi_dumb_luck_custom_cdr", {})

		if self.caster:GetQuest() == "Ogre.Quest_8" then
			self.caster:UpdateQuest(1)
		end
	end

	if IsValid(self.caster.multicast_ability) and self.talents.has_r3 == 1 then
		target:AddNewModifier(
			self.caster,
			self.caster.multicast_ability,
			"modifier_ogre_magi_multicast_custom_fire",
			{ duration = self.talents.r3_duration }
		)
	end
end

modifier_ogre_magi_dumb_luck_custom = class(mod_hidden)
function modifier_ogre_magi_dumb_luck_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.ogre_innate = self.ability

	self.ability.mana_per_str = self.ability:GetSpecialValueFor("mana_per_str")
	self.ability.mana_regen_per_str = self.ability:GetSpecialValueFor("mana_regen_per_str")

	self.int = 0
	self.str = 0
	self.agi = 0

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
end

function modifier_ogre_magi_dumb_luck_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.int = 0
	self.int = self.parent:GetIntellect(false, true)

	self.str = self.int / 2
	self.agi = self.int / 2

	self.parent:CalculateStatBonus(true)
end

function modifier_ogre_magi_dumb_luck_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_MANA_BONUS,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
	}
end

function modifier_ogre_magi_dumb_luck_custom:GetModifierManaBonus()
	return self.parent:GetStrength() * (self.ability.mana_per_str + self.ability.talents.h3_mana)
end

function modifier_ogre_magi_dumb_luck_custom:GetModifierConstantManaRegen()
	return self.parent:GetStrength() * self.ability.mana_regen_per_str
end

function modifier_ogre_magi_dumb_luck_custom:GetModifierBonusStats_Intellect()
	return self.int * -1
end

function modifier_ogre_magi_dumb_luck_custom:GetModifierBonusStats_Strength()
	return self.str
end

function modifier_ogre_magi_dumb_luck_custom:GetModifierBonusStats_Agility()
	return self.agi
end

modifier_ogre_magi_dumb_luck_custom_cdr = class(mod_hidden)
function modifier_ogre_magi_dumb_luck_custom_cdr:IsHidden()
	return self.ability.talents.has_r4 == 0 or self:GetStackCount() >= self.max
end
function modifier_ogre_magi_dumb_luck_custom_cdr:RemoveOnDeath()
	return false
end
function modifier_ogre_magi_dumb_luck_custom_cdr:GetTexture()
	return "buffs/ogre_magi/multicast_4"
end
function modifier_ogre_magi_dumb_luck_custom_cdr:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r4_max
	self.gold = self.ability.talents.r4_gold / self.max
	self.save_gold = 0

	if not IsServer() then
		return
	end

	self:OnRefresh()
	self:StartIntervalThink(2)
end

function modifier_ogre_magi_dumb_luck_custom_cdr:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end

	if self.save_gold > 0 then
		self.parent:GiveGold(self.save_gold, true, nil, "modifier_ogremagi_multi_4")
		self.save_gold = 0
	end

	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/legion_commander/lc_odd_proc_.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")

	self:StartIntervalThink(-1)
end

function modifier_ogre_magi_dumb_luck_custom_cdr:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.ability.talents.has_r4 == 1 then
		self.parent:GiveGold(self.gold, nil, nil, "modifier_ogremagi_multi_4")
	else
		self.save_gold = self.save_gold + self.gold
	end
end

function modifier_ogre_magi_dumb_luck_custom_cdr:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_ogre_magi_dumb_luck_custom_cdr:GetModifierPercentageCooldown()
	if self.ability.talents.has_r4 == 0 then
		return 0
	end
	return self:GetStackCount() * self.ability.talents.r4_cdr / self.max
end