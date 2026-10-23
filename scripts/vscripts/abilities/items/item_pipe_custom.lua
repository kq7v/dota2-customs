--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_pipe_custom", "abilities/items/item_pipe_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_pipe_custom_aura", "abilities/items/item_pipe_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_pipe_custom_active", "abilities/items/item_pipe_custom", LUA_MODIFIER_MOTION_NONE)

item_pipe_custom = class({})

function item_pipe_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items2_fx/pipe_of_insight_launch.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/pipe_of_insight_v2.vpcf", context)
end

function item_pipe_custom:GetIntrinsicModifierName()
	return "modifier_item_pipe_custom"
end

function item_pipe_custom:Spawn()
	self.barrier_radius = self:GetSpecialValueFor("barrier_radius")
	self.barrier_duration = self:GetSpecialValueFor("barrier_duration")
	self.aura_radius = self:GetSpecialValueFor("aura_radius")
	self.health_regen = self:GetSpecialValueFor("health_regen")
	self.magic_resistance = self:GetSpecialValueFor("magic_resistance")
	self.aura_armor = self:GetSpecialValueFor("aura_armor")
	self.magic_resistance_aura = self:GetSpecialValueFor("magic_resistance_aura")
	self.barrier_block = self:GetSpecialValueFor("barrier_block")
	self.barrier_health = self:GetSpecialValueFor("barrier_health") / 100
end

function item_pipe_custom:OnSpellStart()
	if not IsServer() then
		return
	end
	local radius = self.barrier_radius

	self:GetCaster():EmitSound("DOTA_Item.Pipe.Activate")

	local particle = ParticleManager:CreateParticle(
		"particles/items2_fx/pipe_of_insight_launch.vpcf",
		PATTACH_ABSORIGIN,
		self:GetCaster()
	)
	ParticleManager:ReleaseParticleIndex(particle)

	local units = self:GetCaster():FindFriends(radius, nil, nil, DOTA_UNIT_TARGET_FLAG_INVULNERABLE)

	for _, unit in pairs(units) do
		unit:RemoveModifierByName("modifier_item_pipe_custom_active")
		unit:AddNewModifier(
			self:GetCaster(),
			self,
			"modifier_item_pipe_custom_active",
			{ duration = self.barrier_duration }
		)
	end
end

modifier_item_pipe_custom = class(mod_hidden)
function modifier_item_pipe_custom:RemoveOnDeath()
	return false
end
function modifier_item_pipe_custom:IsAura()
	return true
end
function modifier_item_pipe_custom:IsAuraActiveOnDeath()
	return false
end
function modifier_item_pipe_custom:GetAuraRadius()
	return self.ability.aura_radius
end
function modifier_item_pipe_custom:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE
end
function modifier_item_pipe_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_item_pipe_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_item_pipe_custom:GetModifierAura()
	return "modifier_item_pipe_custom_aura"
end
function modifier_item_pipe_custom:GetUniqueStat()
	return self.ability.magic_resistance
end
function modifier_item_pipe_custom:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.parent:AddUniqueStat(self, "magic_resist")
end

function modifier_item_pipe_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_item_pipe_custom:GetModifierConstantHealthRegen()
	return self.ability.health_regen
end

function modifier_item_pipe_custom:GetModifierMagicalResistanceBonus()
	return self.parent:UniqueStat(self, "magic_resist")
end

function modifier_item_pipe_custom:GetAuraEntityReject(hEntity)
	return (hEntity:IsRealHero() and not hEntity:HasModifier("modifier_life_stealer_infest_custom_legendary_creep"))
		or not hEntity.owner
		or hEntity.owner ~= self.caster
end

modifier_item_pipe_custom_aura = class(mod_visible)
function modifier_item_pipe_custom_aura:OnCreated(params)
	self.ability = self:GetAbility()

	self.aura_armor = self.ability.aura_armor
	self.magic_resistance_aura = self.ability.magic_resistance_aura
end

function modifier_item_pipe_custom_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_item_pipe_custom_aura:GetModifierPhysicalArmorBonus()
	return self.aura_armor
end

function modifier_item_pipe_custom_aura:GetModifierMagicalResistanceBonus()
	return self.magic_resistance_aura
end

modifier_item_pipe_custom_active = class(mod_visible)
function modifier_item_pipe_custom_active:IsDebuff()
	return false
end
function modifier_item_pipe_custom_active:IsPurgeException()
	return false
end
function modifier_item_pipe_custom_active:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.max_shield = math.floor(self.ability.barrier_block + self.caster:GetMaxHealth() * self.ability.barrier_health)
	self:SetStackCount(self.max_shield)

	self.particle = ParticleManager:CreateParticle(
		"particles/items2_fx/pipe_of_insight_v2.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		self.particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_origin",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(self.particle, 2, Vector(self.parent:GetModelRadius() * 1.1, 0, 0))
	self:AddParticle(self.particle, false, false, -1, false, false)

	self:SetHasCustomTransmitterData(true)
	self:SendBuffRefreshToClients()
end

function modifier_item_pipe_custom_active:OnRefresh()
	if not IsServer() then
		return
	end
	self.max_shield = math.floor(self.ability.barrier_block + self.caster:GetMaxHealth() * self.ability.barrier_health)
	self:SetStackCount(self.max_shield)
	self:SendBuffRefreshToClients()
end

function modifier_item_pipe_custom_active:AddCustomTransmitterData()
	return {
		max_shield = self.max_shield,
	}
end

function modifier_item_pipe_custom_active:HandleCustomTransmitterData(data)
	self.max_shield = data.max_shield
end

function modifier_item_pipe_custom_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_SPELL_DAMAGE_CONSTANT,
	}
end

function modifier_item_pipe_custom_active:GetModifierIncomingSpellDamageConstant(params)
	if IsClient() then
		if params.report_max then
			return self.max_shield
		else
			return self:GetStackCount()
		end
	end

	if not IsServer() then
		return
	end
	if self:GetStackCount() == 0 then
		return
	end

	local damage = math.min(params.damage, self:GetStackCount())
	self.parent:AddShieldInfo({ shield_mod = self, healing = damage, healing_type = "shield" })

	self:SetStackCount(self:GetStackCount() - damage)
	if self:GetStackCount() <= 0 then
		self:Destroy()
	end

	return -damage
end