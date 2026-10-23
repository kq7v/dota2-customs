--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_urn_of_shadows_custom_passive",
	"abilities/items/item_urn_of_shadows_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_urn_of_shadows_custom_passive_stacks",
	"abilities/items/item_urn_of_shadows_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_urn_of_shadows_custom_active_enemy",
	"abilities/items/item_urn_of_shadows_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_urn_of_shadows_custom_aoe",
	"abilities/items/item_urn_of_shadows_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_urn_of_shadows_custom_class = class({})

function item_urn_of_shadows_custom_class:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items2_fx/urn_of_shadows.vpcf", context)
	PrecacheResource("particle", "particles/items6_fx/essence_distiller.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/urn_of_shadows_damage.vpcf", context)
	PrecacheResource("particle", "particles/items6_fx/essence_distiller_damage.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/spirit_vessel_damage.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/spirit_vessel_cast.vpcf", context)
	PrecacheResource("particle", "particles/items6_fx/essence_distiller_heal.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/octarine_core_lifesteal.vpcf", context)
	PrecacheResource("particle", "particles/items6_fx/essence_distiller_wraith.vpcf", context)
end

function item_urn_of_shadows_custom_class:GetIntrinsicModifierName()
	return "modifier_item_urn_of_shadows_custom_passive"
end

function item_urn_of_shadows_custom_class:Spawn()
	self.bonus_lifesteal = self:GetSpecialValueFor("bonus_lifesteal") / 100
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.mana_regen = self:GetSpecialValueFor("mana_regen")
	self.bonus_all_stats = self:GetSpecialValueFor("bonus_all_stats")
	self.bonus_armor = self:GetSpecialValueFor("bonus_armor")
	self.damage_init = self:GetSpecialValueFor("damage_init")
	self.damage_health = self:GetSpecialValueFor("damage_health") / 100
	self.duration = self:GetSpecialValueFor("duration")
	self.radius = self:GetSpecialValueFor("radius")
	self.cast_radius = self:GetSpecialValueFor("cast_radius")
	self.damage_heal_reduce = self:GetSpecialValueFor("damage_heal_reduce")
	self.damage_heal = self:GetSpecialValueFor("damage_heal") / 100
	self.damage_inc = self:GetSpecialValueFor("damage_inc") / 100
	self.damage_max = self:GetSpecialValueFor("damage_max")
end

function item_urn_of_shadows_custom_class:GetAOERadius()
	return self.cast_radius and self.cast_radius or 0
end

function item_urn_of_shadows_custom_class:OnSpellStart()
	local caster = self:GetCaster()
	local target = self:GetCursorTarget()
	local point = self:GetCursorPosition()

	local effect = "particles/items2_fx/urn_of_shadows.vpcf"
	if self:GetName() == "item_essence_distiller_custom" then
		effect = "particles/items6_fx/essence_distiller.vpcf"
	elseif self:GetName() == "item_spirit_vessel_custom" then
		effect = "particles/items4_fx/spirit_vessel_cast.vpcf"
	end

	local particle_fx = ParticleManager:CreateParticle(effect, PATTACH_ABSORIGIN_FOLLOW, caster)
	ParticleManager:SetParticleControl(particle_fx, 0, caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle_fx, 1, target and target:GetAbsOrigin() or point)
	ParticleManager:ReleaseParticleIndex(particle_fx)

	if self.cast_radius and not target then
		EmitSoundOnLocationWithCaster(point, "item_essence_distiller.cast", caster)
		EmitSoundOnLocationWithCaster(point, "item_essence_distiller.enemy", caster)
		CreateModifierThinker(
			caster,
			self,
			"modifier_item_urn_of_shadows_custom_aoe",
			{ duration = self.duration },
			point,
			caster:GetTeamNumber(),
			false
		)
		return
	end

	target:EmitSound("DOTA_Item.UrnOfShadows.Activate")
	target:RemoveModifierByName("modifier_item_urn_of_shadows_custom_active_enemy")
	target:AddNewModifier(
		caster,
		self,
		"modifier_item_urn_of_shadows_custom_active_enemy",
		{ duration = self.duration + 0.2 }
	)
end

modifier_item_urn_of_shadows_custom_passive = class(mod_hidden)
function modifier_item_urn_of_shadows_custom_passive:RemoveOnDeath()
	return false
end
function modifier_item_urn_of_shadows_custom_passive:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end

	if self.ability.bonus_lifesteal > 0 then
		self.parent:AddLifesteal(self, {
			type = 1,
			value = function(params)
				if params.inflictor == self.ability then
					return self.ability.bonus_lifesteal + self.ability.damage_heal
				end
				return self.ability.bonus_lifesteal
			end,
		})
	end

	self.parent:AddDeathEvent(self, true)
end

function modifier_item_urn_of_shadows_custom_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_item_urn_of_shadows_custom_passive:GetModifierSpellAmplify_Percentage()
	return self.ability.bonus_damage
end

function modifier_item_urn_of_shadows_custom_passive:GetModifierConstantManaRegen()
	return self.ability.mana_regen
end

function modifier_item_urn_of_shadows_custom_passive:GetModifierPhysicalArmorBonus()
	return self.ability.bonus_armor
end

function modifier_item_urn_of_shadows_custom_passive:GetModifierBonusStats_Agility()
	return self.ability.bonus_all_stats
end

function modifier_item_urn_of_shadows_custom_passive:GetModifierBonusStats_Intellect()
	return self.ability.bonus_all_stats
end

function modifier_item_urn_of_shadows_custom_passive:GetModifierBonusStats_Strength()
	return self.ability.bonus_all_stats
end

function modifier_item_urn_of_shadows_custom_passive:DeathEvent(params)
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) then
		return
	end
	if not self.parent:IsRealHero() or self.parent:IsTempestDouble() then
		return
	end
	if not params.unit or not params.unit:IsValidKill(self.parent) then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	local attacker = params.attacker
	if attacker.owner then
		attacker = attacker.owner
	end

	if
		self.parent == attacker
		or (self.parent:GetAbsOrigin() - params.unit:GetAbsOrigin()):Length2D() <= self.ability.radius
	then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_item_urn_of_shadows_custom_passive_stacks", {})
	end
end

modifier_item_urn_of_shadows_custom_passive_stacks = class(mod_hidden)
function modifier_item_urn_of_shadows_custom_passive_stacks:IsHidden()
	return not self.parent:HasModifier("modifier_item_urn_of_shadows_custom_passive")
end
function modifier_item_urn_of_shadows_custom_passive_stacks:GetTexture()
	return "item_spirit_vessel"
end
function modifier_item_urn_of_shadows_custom_passive_stacks:RemoveOnDeath()
	return false
end
function modifier_item_urn_of_shadows_custom_passive_stacks:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage_inc = self.ability.damage_inc * 100
	self.max = self.ability.damage_max
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_item_urn_of_shadows_custom_passive_stacks:OnRefresh()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_item_urn_of_shadows_custom_passive_stacks:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_item_urn_of_shadows_custom_passive_stacks:OnTooltip()
	return self:GetStackCount() * self.damage_inc
end

modifier_item_urn_of_shadows_custom_aoe = class(mod_hidden)
function modifier_item_urn_of_shadows_custom_aoe:IsAura()
	return IsServer() and IsValid(self.ability)
end
function modifier_item_urn_of_shadows_custom_aoe:GetAuraDuration()
	return self.duration
end
function modifier_item_urn_of_shadows_custom_aoe:GetAuraRadius()
	return self.radius
end
function modifier_item_urn_of_shadows_custom_aoe:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_item_urn_of_shadows_custom_aoe:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_item_urn_of_shadows_custom_aoe:GetModifierAura()
	return "modifier_item_urn_of_shadows_custom_active_enemy"
end
function modifier_item_urn_of_shadows_custom_aoe:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.duration = 1
	self.interval = 0.2
	self.radius = self.ability.cast_radius
	self.point = self.parent:GetAbsOrigin()

	for i = 1, 2 do
		local particle_fx = ParticleManager:CreateParticle(
			"particles/items6_fx/essence_distiller_wraith.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(particle_fx, 0, self.point)
		ParticleManager:SetParticleControl(particle_fx, 1, Vector(self.radius, self.radius, self.radius))
		self:AddParticle(particle_fx, false, false, -1, false, false)
	end

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

modifier_item_urn_of_shadows_custom_active_enemy = class(mod_visible)
function modifier_item_urn_of_shadows_custom_active_enemy:IsPurgable()
	return true
end
function modifier_item_urn_of_shadows_custom_active_enemy:OnCreated(params)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.damage_heal_reduce = self.ability.damage_heal_reduce
	if not IsServer() then
		return
	end
	self.interval = 0.5

	self.damage_init = self.ability.damage_init
	self.damage_health = self.ability.damage_health
	self.damage_inc = 1
	self.creeps = 200

	local caster = self.caster.owner and self.caster.owner or self.caster
	local mod = caster:FindModifierByName("modifier_item_urn_of_shadows_custom_passive_stacks")
	if mod then
		self.damage_inc = 1 + mod:GetStackCount() * self.ability.damage_inc
	end

	local effect = "particles/items2_fx/urn_of_shadows_damage.vpcf"
	local heal_effect = nil
	if self.ability:GetName() == "item_essence_distiller_custom" then
		effect = "particles/items6_fx/essence_distiller_damage.vpcf"
		heal_effect = "particles/items6_fx/essence_distiller_heal.vpcf"
	elseif self.ability:GetName() == "item_spirit_vessel_custom" then
		effect = "particles/items4_fx/spirit_vessel_damage.vpcf"
		heal_effect = "particles/items6_fx/essence_distiller_heal.vpcf"
	end

	if self.parent:IsRealHero() and heal_effect then
		self.caster:GenericParticle(heal_effect, self)
	end
	self.parent:GenericParticle(effect, self)

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }
	self:StartIntervalThink(self.interval)
end

function modifier_item_urn_of_shadows_custom_active_enemy:OnIntervalThink()
	if not IsServer() then
		return
	end
	local damage = (self.damage_init + self.damage_health * self.parent:GetHealth()) * self.damage_inc
	if self.parent:IsCreep() then
		damage = math.min(self.creeps, damage)
	end
	self.damageTable.damage = damage * self.interval
	DoDamage(self.damageTable)
end

function modifier_item_urn_of_shadows_custom_active_enemy:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_item_urn_of_shadows_custom_active_enemy:GetModifierHPRegenAmplify_Percentage()
	return self.damage_heal_reduce
end

function modifier_item_urn_of_shadows_custom_active_enemy:GetModifierHealChange()
	return self.damage_heal_reduce
end

item_urn_of_shadows_custom = class(item_urn_of_shadows_custom_class)
item_essence_distiller_custom = class(item_urn_of_shadows_custom_class)
item_spirit_vessel_custom = class(item_urn_of_shadows_custom_class)