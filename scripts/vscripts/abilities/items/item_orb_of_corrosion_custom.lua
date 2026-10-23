--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_orb_of_corrosion_custom",
	"abilities/items/item_orb_of_corrosion_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_orb_of_corrosion_custom_active_slow",
	"abilities/items/item_orb_of_corrosion_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_orb_of_corrosion_custom_passive_slow",
	"abilities/items/item_orb_of_corrosion_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_orb_of_corrosion_custom = class({})

function item_orb_of_corrosion_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items/corrosion_custom.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_poison_dazzle.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_dazzle/dazzle_poison_debuff.vpcf", context)
end

function item_orb_of_corrosion_custom:GetIntrinsicModifierName()
	return "modifier_item_orb_of_corrosion_custom"
end

function item_orb_of_corrosion_custom:Spawn()
	self.duration = self:GetSpecialValueFor("duration")
	self.max_slow = self:GetSpecialValueFor("max_slow")
	self.total_damage = self:GetSpecialValueFor("total_damage")
	self.melee_slow = self:GetSpecialValueFor("melee_slow")
	self.ranged_slow = self:GetSpecialValueFor("ranged_slow")
	self.armor_reduce = self:GetSpecialValueFor("armor_reduce")
	self.heal_reduction = self:GetSpecialValueFor("heal_reduction")
	self.agi_bonus = self:GetSpecialValueFor("agi_bonus")
	self.duration_passive = self:GetSpecialValueFor("duration_passive")
end

function item_orb_of_corrosion_custom:OnSpellStart()
	if not IsServer() then
		return
	end

	self:GetCaster():EmitSound("Item.Paintball.Cast")

	local info = {
		Target = self:GetCursorTarget(),
		Source = self:GetCaster(),
		Ability = self,
		EffectName = "particles/items/corrosion_custom.vpcf",
		iMoveSpeed = 900,
		bReplaceExisting = false,
		bProvidesVision = true,
		iVisionRadius = 30,
		iVisionTeamNumber = self:GetCaster():GetTeamNumber(),
	}
	ProjectileManager:CreateTrackingProjectile(info)
end

function item_orb_of_corrosion_custom:OnProjectileHit(hTarget, vLocation)
	if not IsServer() then
		return
	end
	if hTarget == nil then
		return
	end
	if hTarget:IsInvulnerable() then
		return
	end
	if hTarget:IsMagicImmune() then
		return
	end

	hTarget:AddNewModifier(
		self:GetCaster(),
		self,
		"modifier_item_orb_of_corrosion_custom_active_slow",
		{ duration = self.duration }
	)
	hTarget:EmitSound("Item.Paintball.Target")
	hTarget:EmitSound("Corrosion.Target")
end

modifier_item_orb_of_corrosion_custom_active_slow = class(mod_visible)
function modifier_item_orb_of_corrosion_custom_active_slow:IsPurgable()
	return true
end
function modifier_item_orb_of_corrosion_custom_active_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_poison_dazzle.vpcf"
end
function modifier_item_orb_of_corrosion_custom_active_slow:GetEffectName()
	return "particles/units/heroes/hero_dazzle/dazzle_poison_debuff.vpcf"
end
function modifier_item_orb_of_corrosion_custom_active_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_item_orb_of_corrosion_custom_active_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max_slow = self.ability.max_slow
	self.tick = self.max_slow / self:GetRemainingTime()
	self.damage = self.ability.total_damage / (self.ability.duration + 1)
	self.damageTable = {
		attacker = self.caster,
		victim = self.parent,
		damage = self.damage,
		damage_type = DAMAGE_TYPE_PHYSICAL,
		ability = self.ability,
	}

	if not IsServer() then
		return
	end
	self:OnIntervalThink()
	self:StartIntervalThink(1)
end

function modifier_item_orb_of_corrosion_custom_active_slow:OnIntervalThink()
	DoDamage(self.damageTable)
	self.parent:SendNumber(4, self.damage)
	self:IncrementStackCount()
end

function modifier_item_orb_of_corrosion_custom_active_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_item_orb_of_corrosion_custom_active_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.tick * self:GetStackCount()
end

modifier_item_orb_of_corrosion_custom_passive_slow = class(mod_visible)
function modifier_item_orb_of_corrosion_custom_passive_slow:IsPurgable()
	return true
end
function modifier_item_orb_of_corrosion_custom_passive_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.slow = self.ability.melee_slow
	if self.parent:IsRangedAttacker() then
		self.slow = self.ability.ranged_slow
	end

	self.armor = self.ability.armor_reduce
	self.heal_reduction = self.ability.heal_reduction
end

function modifier_item_orb_of_corrosion_custom_passive_slow:OnRefresh(table)
	self.slow = self.ability.melee_slow
	if self.parent:IsRangedAttacker() then
		self.slow = self.ability.ranged_slow
	end
end

function modifier_item_orb_of_corrosion_custom_passive_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_item_orb_of_corrosion_custom_passive_slow:GetModifierPhysicalArmorBonus()
	return self.armor
end

function modifier_item_orb_of_corrosion_custom_passive_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_item_orb_of_corrosion_custom_passive_slow:GetModifierLifestealRegenAmplify_Percentage()
	return self.heal_reduction
end

function modifier_item_orb_of_corrosion_custom_passive_slow:GetModifierHealChange()
	return self.heal_reduction
end

function modifier_item_orb_of_corrosion_custom_passive_slow:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduction
end

modifier_item_orb_of_corrosion_custom = class(mod_hidden)
function modifier_item_orb_of_corrosion_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:AddProc(self, { land = true })
	self.agility = self.ability.agi_bonus
	self.duration = self.ability.duration_passive
end

function modifier_item_orb_of_corrosion_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
	}
end

function modifier_item_orb_of_corrosion_custom:GetModifierBonusStats_Agility()
	return self.agility
end

function modifier_item_orb_of_corrosion_custom:GetProcChance()
	return 100
end

function modifier_item_orb_of_corrosion_custom:AttackProc(params, name)
	if not IsValid(self.ability) then
		return
	end
	if self.parent:HasModifier("modifier_item_orb_of_venom") then
		return
	end

	params.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_item_orb_of_corrosion_custom_passive_slow",
		{ duration = self.duration }
	)
end