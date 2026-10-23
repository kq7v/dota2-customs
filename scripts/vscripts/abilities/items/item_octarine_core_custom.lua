--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_octarine_core_custom",
	"abilities/items/item_octarine_core_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_octarine_core_custom_active",
	"abilities/items/item_octarine_core_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_octarine_core_custom = class({})

function item_octarine_core_custom:GetIntrinsicModifierName()
	return "modifier_item_octarine_core_custom"
end

function item_octarine_core_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/leshrac/storm_refresh.vpcf", context)
	PrecacheResource("particle", "particles/items/bristle_cdr.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/rune_arcane_owner.vpcf", context)
end

function item_octarine_core_custom:Spawn()
	self.cdr_bonus = self:GetSpecialValueFor("cdr_bonus")
	self.item_damage = self:GetSpecialValueFor("item_damage")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.bonus_mana = self:GetSpecialValueFor("bonus_mana")
	self.mana_reduce = self:GetSpecialValueFor("mana_reduce")
	self.active_cdr = self:GetSpecialValueFor("active_cdr") / 100
	self.duration = self:GetSpecialValueFor("duration")
end

function item_octarine_core_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) / self:GetCaster():GetCooldownReduction()
end

function item_octarine_core_custom:OnSpellStart()
	local caster = self:GetCaster()
	caster:EmitSound("Item.Octarine.Start")
	caster:AddNewModifier(caster, self, "modifier_item_octarine_core_custom_active", { duration = self.duration })
end

modifier_item_octarine_core_custom = class(mod_hidden)
function modifier_item_octarine_core_custom:RemoveOnDeath()
	return false
end
function modifier_item_octarine_core_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not self.parent.cdr_items then
		self.parent.cdr_items = {}
	end
	self.parent.cdr_items[self] = self.ability.cdr_bonus

	self.bonus_health = self.ability.bonus_health
	self.bonus_mana = self.ability.bonus_mana
	self.mana_reduce = self.ability.mana_reduce
	self.item_damage = self.ability.item_damage
end

function modifier_item_octarine_core_custom:GetItemDamage()
	return self.item_damage
end

function modifier_item_octarine_core_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_MANA_BONUS,
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
	}
end

function modifier_item_octarine_core_custom:GetModifierPercentageManacostStacking()
	return self.mana_reduce
end

function modifier_item_octarine_core_custom:GetModifierHealthBonus()
	return self.bonus_health
end

function modifier_item_octarine_core_custom:GetModifierManaBonus()
	return self.bonus_mana
end

modifier_item_octarine_core_custom_active = class(mod_visible)
function modifier_item_octarine_core_custom_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.reduce = 100

	if not IsServer() then
		return
	end
	self.parent:AddSpellEvent(self, true)

	self.particle =
		ParticleManager:CreateParticle("particles/items/bristle_cdr.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.parent:GenericParticle("particles/generic_gameplay/rune_arcane_owner.vpcf", self)
end

function modifier_item_octarine_core_custom_active:SpellEvent(params)
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) then
		return
	end
	if self.used then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if not params.ability:IsItem() then
		return
	end
	if params.ability == self.ability then
		return
	end
	if NoCdItems[params.ability:GetName()] then
		return
	end
	self.used = true

	local effect =
		ParticleManager:CreateParticle("particles/leshrac/storm_refresh.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)
	self.parent:EmitSound("Item.Octarine.Activate")

	Timers:CreateTimer(0.1, function()
		if IsValid(self.parent, params.ability) then
			self.parent:CdAbility(params.ability, nil, self.ability.active_cdr, "item_octarine_core_custom")
		end
	end)
end

function modifier_item_octarine_core_custom_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
	}
end

function modifier_item_octarine_core_custom_active:GetModifierPercentageManacostStacking(params)
	return self.reduce
end