--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_black_king_bar_custom", "abilities/items/item_black_king_bar", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_item_black_king_bar_custom_active",
	"abilities/items/item_black_king_bar",
	LUA_MODIFIER_MOTION_NONE
)

item_black_king_bar_custom = class({})

function item_black_king_bar_custom:GetIntrinsicModifierName()
	return "modifier_item_black_king_bar_custom"
end

function item_black_king_bar_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items_fx/black_king_bar_avatar.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_avatar.vpcf", context)
end

function item_black_king_bar_custom:Spawn()
	self.duration = self:GetSpecialValueFor("duration")
	self.duration_duo = self:GetSpecialValueFor("duration_duo")
	self.magic_resist = self:GetSpecialValueFor("magic_resist")
	self.armor = self:GetSpecialValueFor("armor")
	self.AbilityCooldown = self:GetSpecialValueFor("AbilityCooldown")
	self.bonus_strength = self:GetSpecialValueFor("bonus_strength")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.model_scale = self:GetSpecialValueFor("model_scale")
end

function item_black_king_bar_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) / self:GetCaster():GetCooldownReduction()
end

function item_black_king_bar_custom:OnSpellStart()
	local caster = self:GetCaster()

	if dota1x6:IsCustomRules("no_bkb") then
		return
	end

	local duration = self.duration

	if not IsSoloMode() then
		duration = self.duration_duo
	end

	caster:EmitSound("DOTA_Item.BlackKingBar.Activate")
	caster:Purge(false, true, false, false, false)
	caster:AddNewModifier(caster, self, "modifier_item_black_king_bar_custom_active", { duration = duration })
	caster:AddNewModifier(
		caster,
		self,
		"modifier_generic_debuff_immune",
		{ magic_damage = self.magic_resist, duration = duration }
	)
	self:EndCd(0)
	self:StartCooldown(self.AbilityCooldown)
end

modifier_item_black_king_bar_custom = class(mod_hidden)
function modifier_item_black_king_bar_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_black_king_bar_custom:OnCreated()
	self.ability = self:GetAbility()
end

function modifier_item_black_king_bar_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_item_black_king_bar_custom:GetModifierBonusStats_Strength()
	return self.ability.bonus_strength
end

function modifier_item_black_king_bar_custom:GetModifierPreAttack_BonusDamage()
	return self.ability.bonus_damage
end

modifier_item_black_king_bar_custom_active = class(mod_visible)
function modifier_item_black_king_bar_custom_active:GetEffectName()
	return "particles/items_fx/black_king_bar_avatar.vpcf"
end
function modifier_item_black_king_bar_custom_active:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_item_black_king_bar_custom_active:GetStatusEffectName()
	return "particles/status_fx/status_effect_avatar.vpcf"
end
function modifier_item_black_king_bar_custom_active:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_item_black_king_bar_custom_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	if not self.ability then
		self:Destroy()
	end

	self.RemoveForDuel = true
end

function modifier_item_black_king_bar_custom_active:OnRefresh()
	if not IsServer() then
		return
	end
	self:OnCreated()
end

function modifier_item_black_king_bar_custom_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_item_black_king_bar_custom_active:GetModifierModelScale()
	if self.parent:HasModifier("modifier_primal_beast_innate_custom") then
		return
	end
	return self.ability.model_scale
end

function modifier_item_black_king_bar_custom_active:GetModifierPhysicalArmorBonus()
	return self.ability.armor
end