--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_bfury_custom", "abilities/items/item_bfury_custom", LUA_MODIFIER_MOTION_NONE)

item_bfury_custom = class({})

function item_bfury_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items_fx/battlefury_cleave_custom.vpcf", context)
end

function item_bfury_custom:GetIntrinsicModifierName()
	return "modifier_item_bfury_custom"
end

function item_bfury_custom:Spawn()
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.bonus_health_regen = self:GetSpecialValueFor("bonus_health_regen")
	self.bonus_mana_regen = self:GetSpecialValueFor("bonus_mana_regen")
	self.quelling_bonus = self:GetSpecialValueFor("quelling_bonus")
	self.quelling_bonus_ranged = self:GetSpecialValueFor("quelling_bonus_ranged")
	self.cleave_starting_width = self:GetSpecialValueFor("cleave_starting_width")
	self.cleave_ending_width = self:GetSpecialValueFor("cleave_ending_width")
	self.cleave_distance = self:GetSpecialValueFor("cleave_distance")
	self.gold_bonus = self:GetSpecialValueFor("gold_bonus")
	self.blue_bonus = self:GetSpecialValueFor("blue_bonus")
	self.cleave_damage_percent = self:GetSpecialValueFor("cleave_damage_percent")
	self.cleave_damage_percent_creep = self:GetSpecialValueFor("cleave_damage_percent_creep")
end

function item_bfury_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	GridNav:DestroyTreesAroundPoint(target:GetAbsOrigin(), 10, true)
end

modifier_item_bfury_custom = class(mod_hidden)
function modifier_item_bfury_custom:AllowIllusionDuplicate()
	return false
end
function modifier_item_bfury_custom:RemoveOnDeath()
	return false
end
function modifier_item_bfury_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_bfury_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.parent:AddProc(self, { land = true, group = "modifier_item_bfury_custom_" .. self.ability:entindex() })

	self.damage_bonus = self.ability.bonus_damage
	self.hp_regen = self.ability.bonus_health_regen
	self.mp_regen = self.ability.bonus_mana_regen
	self.damage_bonus_creep_quelling = self.ability.quelling_bonus

	self.damage_bonus_creep_quelling_ranged = self.ability.quelling_bonus_ranged

	self.start_width = self.ability.cleave_starting_width
	self.end_width = self.ability.cleave_ending_width
	self.cleave_distance = self.ability.cleave_distance
	self.gold_bonus = self.ability.gold_bonus / 100
	self.blue_bonus = self.ability.blue_bonus / 100
end

function modifier_item_bfury_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
	}
end

function modifier_item_bfury_custom:GetModifierPreAttack_BonusDamage()
	return self.damage_bonus
end

function modifier_item_bfury_custom:GetModifierProcAttack_BonusDamage_Physical(params)
	if not IsServer() then
		return
	end
	if not params.target then
		return
	end
	if params.target:IsHero() then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if params.target:IsBuilding() then
		return
	end
	if params.target:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if self.parent:IsRangedAttacker() then
		return self.damage_bonus_creep_quelling_ranged
	else
		return self.damage_bonus_creep_quelling
	end
end

function modifier_item_bfury_custom:GetModifierConstantManaRegen()
	return self.mp_regen
end

function modifier_item_bfury_custom:GetModifierConstantHealthRegen()
	return self.hp_regen
end

function modifier_item_bfury_custom:GetProcChance()
	return 100
end

function modifier_item_bfury_custom:AttackProc(params, name)
	if not IsValid(self.ability) then
		return
	end
	if self.parent:HasModifier("modifier_tidehunter_anchor_smash_caster") then
		return
	end
	if self.parent:HasModifier("modifier_no_cleave") then
		return
	end
	if self.parent:IsRangedAttacker() then
		return
	end
	if params.no_cleave_flag then
		return
	end
	if self.parent.fake_attack then
		return
	end

	local k = self.ability.cleave_damage_percent
	if params.target:IsCreep() then
		k = self.ability.cleave_damage_percent_creep
	end

	DoCleaveAttack(
		self.parent,
		params.target,
		self.ability,
		params.damage * k / 100,
		self.start_width,
		self.end_width,
		self.cleave_distance,
		"particles/items_fx/battlefury_cleave_custom.vpcf",
		"DOTA_Item.BattleFury"
	)
end