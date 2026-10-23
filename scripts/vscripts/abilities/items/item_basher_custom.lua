--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_basher_custom", "abilities/items/item_basher_custom", LUA_MODIFIER_MOTION_NONE)

item_basher_custom = class({})

function item_basher_custom:GetIntrinsicModifierName()
	return "modifier_item_basher_custom"
end

function item_basher_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource(
		"particle",
		"particles/econ/items/troll_warlord/troll_warlord_ti7_axe/troll_ti7_axe_bash_explosion.vpcf",
		context
	)
end

function item_basher_custom:Spawn()
	self.bonus_strength = self:GetSpecialValueFor("bonus_strength")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.bash_chance_melee = self:GetSpecialValueFor("bash_chance_melee")
	self.bash_chance_ranged = self:GetSpecialValueFor("bash_chance_ranged")
	self.bash_duration = self:GetSpecialValueFor("bash_duration")
	self.bonus_chance_damage = self:GetSpecialValueFor("bonus_chance_damage")
end

modifier_item_basher_custom = class(mod_hidden)
function modifier_item_basher_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_basher_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.str = self.ability.bonus_strength
	self.damage = self.ability.bonus_damage
	self.chance_melee = self.ability.bash_chance_melee
	self.chance_range = self.ability.bash_chance_ranged
	self.bash_duration = self.ability.bash_duration
	self.bash_damage = self.ability.bonus_chance_damage

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	if self.parent:IsTempestDouble() then
		return
	end
	self.parent:AddProc(self, { group = "skull_basher", cd = true, land = true, property = true })
end

function modifier_item_basher_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
	}
end

function modifier_item_basher_custom:GetModifierBonusStats_Strength()
	return self.str
end

function modifier_item_basher_custom:GetModifierPreAttack_BonusDamage()
	return self.damage
end

function modifier_item_basher_custom:GetProcChance(params)
	if self.parent.has_basher_talent == 1 then
		return 0
	end
	if params.ranged_attack then
		return self.chance_range
	end
	return self.chance_melee
end

function modifier_item_basher_custom:GetModifierProcAttack_BonusDamage_Physical(params)
	if not IsServer() then
		return
	end
	self.parent:LandProcs(params, true)
	if not self.parent:IsProc(self, params.record) then
		return
	end

	local target = params.target

	target:EmitSound("DOTA_Item.SkullBasher")
	target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_bashed",
		{ duration = (1 - target:GetStatusResistance()) * self.bash_duration }
	)
	target:SendNumber(4, self.bash_damage)

	local troll_bash = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/generic_gameplay/generic_minibash.vpcf",
		self,
		"troll_warlord_berserkers_rage_custom"
	)

	if troll_bash ~= "particles/generic_gameplay/generic_minibash.vpcf" then
		local immortal_particle = ParticleManager:CreateParticle(troll_bash, PATTACH_OVERHEAD_FOLLOW, target)
		ParticleManager:SetParticleControl(immortal_particle, 0, target:GetAbsOrigin())
		ParticleManager:SetParticleControl(immortal_particle, 1, self.parent:GetAbsOrigin())
		ParticleManager:Delete(immortal_particle, 1)
	end

	return self.bash_damage
end