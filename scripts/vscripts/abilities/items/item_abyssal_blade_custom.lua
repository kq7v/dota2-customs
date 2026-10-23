--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_abyssal_blade_custom",
	"abilities/items/item_abyssal_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_abyssal_blade_custom = class({})

function item_abyssal_blade_custom:GetIntrinsicModifierName()
	return "modifier_item_abyssal_blade_custom"
end

function item_abyssal_blade_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/items_fx/abyssal_blade.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/abyssal_blade_crimson_jugger.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/abyssal_blade_jugger.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/abyssal_blade_jugger_golden.vpcf", context)
end

function item_abyssal_blade_custom:Spawn()
	self.stun_duration = self:GetSpecialValueFor("stun_duration")
	self.bash_cooldown = self:GetSpecialValueFor("bash_cooldown")
	self.bonus_str = self:GetSpecialValueFor("bonus_str")
	self.bonus_attack_damage = self:GetSpecialValueFor("bonus_attack_damage")
	self.heal_amp = self:GetSpecialValueFor("heal_amp")
	self.bash_chance_melee = self:GetSpecialValueFor("bash_chance_melee")
	self.bash_chance_ranged = self:GetSpecialValueFor("bash_chance_ranged")
	self.bash_duration = self:GetSpecialValueFor("bash_duration")
	self.bonus_chance_damage = self:GetSpecialValueFor("bonus_chance_damage")
	self.slow_resistance = self:GetSpecialValueFor("slow_resistance")
end

function item_abyssal_blade_custom:OnSpellStart()
	local caster = self:GetCaster()
	local target = self:GetCursorTarget()

	if target:TriggerSpellAbsorb(self) then
		return
	end

	local stun = self.stun_duration

	target:EmitSound("DOTA_Item.AbyssalBlade.Activate")
	local effect = wearables_system:GetParticleReplacementAbility(caster, "particles/items_fx/abyssal_blade.vpcf", self)

	target:GenericParticle(effect)
	target:AddNewModifier(caster, self, "modifier_bashed", { duration = (1 - target:GetStatusResistance()) * stun })
	caster:StartCd("proc_skull_basher")
end

modifier_item_abyssal_blade_custom = class(mod_hidden)
function modifier_item_abyssal_blade_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_abyssal_blade_custom:GetUniqueStat(name)
	return self[name]
end
function modifier_item_abyssal_blade_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.str = self.ability.bonus_str
	self.damage = self.ability.bonus_attack_damage
	self.heal_amp = self.ability.heal_amp

	self.bash_cd = self.ability.bash_cooldown
	self.chance_melee = self.ability.bash_chance_melee
	self.chance_range = self.ability.bash_chance_ranged
	self.bash_duration = self.ability.bash_duration
	self.bash_damage = self.ability.bonus_chance_damage
	self.slow_resistance = self.ability.slow_resistance
	self.parent:AddUniqueStat(self, "heal_amp", "slow_resistance")

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	if self.parent:IsTempestDouble() then
		return
	end
	self.parent:AddProc(
		self,
		{
			group = "skull_basher",
			priority = 1,
			cd = self.bash_cd,
			cd_name = "proc_skull_basher",
			land = true,
			property = true,
		}
	)
end

function modifier_item_abyssal_blade_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_item_abyssal_blade_custom:GetModifierBonusStats_Strength()
	return self.str
end

function modifier_item_abyssal_blade_custom:GetModifierPreAttack_BonusDamage()
	return self.damage
end

function modifier_item_abyssal_blade_custom:GetModifierSlowResistance_Stacking()
	return self.parent:UniqueStat(self, "slow_resistance")
end

function modifier_item_abyssal_blade_custom:GetModifierHealChange()
	return self.parent:UniqueStat(self, "heal_amp")
end

function modifier_item_abyssal_blade_custom:GetModifierHPRegenAmplify_Percentage()
	return self.parent:UniqueStat(self, "heal_amp")
end

function modifier_item_abyssal_blade_custom:GetProcChance(params)
	if self.parent.has_basher_talent == 1 then
		return 0
	end
	if params.ranged_attack then
		return self.chance_range
	end
	return self.chance_melee
end

function modifier_item_abyssal_blade_custom:GetModifierProcAttack_BonusDamage_Physical(params)
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