--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_leshrac_pulse_nova_custom",
	"abilities/leshrac/leshrac_pulse_nova_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_leshrac_pulse_nova_custom_heal_reduce",
	"abilities/leshrac/leshrac_pulse_nova_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_nova_2"
)
LinkLuaModifier(
	"modifier_leshrac_pulse_nova_custom_health_reduce",
	"abilities/leshrac/leshrac_pulse_nova_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_nova_3"
)
LinkLuaModifier(
	"modifier_leshrac_pulse_nova_custom_legendary",
	"abilities/leshrac/leshrac_pulse_nova_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_leshrac_pulse_nova_custom_tracker",
	"abilities/leshrac/leshrac_pulse_nova_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_leshrac_pulse_nova_custom_bkb_cd",
	"abilities/leshrac/leshrac_pulse_nova_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_hero_6"
)

leshrac_pulse_nova_custom = class({})
leshrac_pulse_nova_custom.talents = {}

function leshrac_pulse_nova_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_leshrac/leshrac_pulse_nova_ambient.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_leshrac/leshrac_pulse_nova.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/ember_slow.vpcf", context)
	PrecacheResource("particle", "particles/heroes/leshrak_chakra.vpcf", context)
	PrecacheResource("particle", "particles/heroes/leshrak_chakra_end.vpcf", context)
	PrecacheResource("particle", "particles/heroes/leshrak_burst.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/outworld_devourer/od_shards_exile/od_shards_exile_prison_end.vpcf",
		context
	)
	PrecacheResource("particle", "particles/leshrac/leshrac_speed.vpcf", context)
	PrecacheResource("particle", "particles/puck/puck_blind.vpcf", context)
	PrecacheResource("particle", "particles/leshrac/nova_legendary_radius.vpcf", context)
end

function leshrac_pulse_nova_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_base = 0,
			r1_damage = 0,

			has_r2 = 0,
			r2_heal_reduce = 0,
			r2_heal = 0,
			r2_duration = caster:GetTalentValue("modifier_leshrac_nova_2", "duration", true),

			has_r3 = 0,
			r3_interval = 0,
			r3_health_reduce = 0,
			r3_max = caster:GetTalentValue("modifier_leshrac_nova_3", "max", true),
			r3_duration = caster:GetTalentValue("modifier_leshrac_nova_3", "duration", true),

			has_r4 = 0,
			r4_status = caster:GetTalentValue("modifier_leshrac_nova_4", "status", true),
			r4_heal = caster:GetTalentValue("modifier_leshrac_nova_4", "heal", true) / 100,

			has_r7 = 0,

			has_h2 = 0,
			h2_move = 0,
			h2_evasion = 0,
			h2_bonus = caster:GetTalentValue("modifier_leshrac_hero_2", "bonus", true),

			has_h6 = 0,
			h6_bkb = caster:GetTalentValue("modifier_leshrac_hero_6", "bkb", true),
			h6_damage_reduce = caster:GetTalentValue("modifier_leshrac_hero_6", "damage_reduce", true),
			h6_health = caster:GetTalentValue("modifier_leshrac_hero_6", "health", true),
			h6_talent_cd = caster:GetTalentValue("modifier_leshrac_hero_6", "talent_cd", true),

			h1_mana_loss = 0,

			has_q7 = 0,
		}
	end

	if caster:HasTalent("modifier_leshrac_nova_1") then
		self.talents.has_r1 = 1
		self.talents.r1_base = caster:GetTalentValue("modifier_leshrac_nova_1", "base")
		self.talents.r1_damage = caster:GetTalentValue("modifier_leshrac_nova_1", "damage") / 100
	end

	if caster:HasTalent("modifier_leshrac_nova_2") then
		self.talents.has_r2 = 1
		self.talents.r2_heal_reduce = caster:GetTalentValue("modifier_leshrac_nova_2", "heal_reduce")
		self.talents.r2_heal = caster:GetTalentValue("modifier_leshrac_nova_2", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_leshrac_nova_2", type = 1, value = self.talents.r2_heal })
	end

	if caster:HasTalent("modifier_leshrac_nova_3") then
		self.talents.has_r3 = 1
		self.talents.r3_interval = caster:GetTalentValue("modifier_leshrac_nova_3", "interval")
		self.talents.r3_health_reduce = caster:GetTalentValue("modifier_leshrac_nova_3", "health_reduce")
	end

	if caster:HasTalent("modifier_leshrac_nova_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_leshrac_nova_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_leshrac_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_move = caster:GetTalentValue("modifier_leshrac_hero_2", "move")
		self.talents.h2_evasion = caster:GetTalentValue("modifier_leshrac_hero_2", "evasion")
	end

	if caster:HasTalent("modifier_leshrac_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_leshrac_hero_1") then
		self.talents.h1_mana_loss = caster:GetTalentValue("modifier_leshrac_hero_1", "mana_loss") / 100
	end

	if caster:HasTalent("modifier_leshrac_earth_7") then
		self.talents.has_q7 = 1
	end

	if not IsServer() then
		return
	end

	local mod = caster:FindModifierByName("modifier_leshrac_pulse_nova_custom")
	if mod then
		mod:UpdateEvents()
	end
end

function leshrac_pulse_nova_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_leshrac_pulse_nova_custom_tracker"
end

function leshrac_pulse_nova_custom:GetRadius()
	return (self.radius or 0) + (IsValid(self.caster.leshrac_innate) and self.caster.leshrac_innate:GetRange() or 0)
end

function leshrac_pulse_nova_custom:GetCastRange(vLocation, hTarget)
	return self:GetRadius() - self.caster:GetCastRangeBonus()
end

function leshrac_pulse_nova_custom:GetMana()
	return (self.mana_cost_per_second + self.mana_cost_max * self.caster:GetMaxMana()) * (1 + self.talents.h1_mana_loss)
end

function leshrac_pulse_nova_custom:GetDamage()
	return self.damage
		+ self.talents.r1_base
		+ self.talents.r1_damage * (self.caster:GetMaxMana() - self.caster:GetMana())
end

function leshrac_pulse_nova_custom:OnToggle()
	if self:GetToggleState() then
		self.modifier = self.caster:AddNewModifier(self.caster, self, "modifier_leshrac_pulse_nova_custom", {})
		self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_4)
	else
		if IsValid(self.modifier) then
			self.modifier:Destroy()
		end
		self:StartCooldown(1)
	end
end

modifier_leshrac_pulse_nova_custom = class(mod_visible)
function modifier_leshrac_pulse_nova_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.interval = self.ability.interval
	self.radius = self.ability:GetRadius()

	if not IsServer() then
		return
	end

	self.damageTable = {
		attacker = self.parent,
		damage_type = self.ability.talents.has_q7 == 1 and DAMAGE_TYPE_PHYSICAL or DAMAGE_TYPE_MAGICAL,
		ability = self.ability,
	}

	self.parent:EmitSound("Hero_Leshrac.Pulse_Nova")
	self.parent:GenericParticle("particles/units/heroes/hero_leshrac/leshrac_pulse_nova_ambient.vpcf", self)

	self:UpdateEvents()

	self.radius_visual = ParticleManager:CreateParticleForPlayer(
		"particles/leshrac/nova_legendary_radius.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent,
		self.parent:GetPlayerOwner()
	)
	ParticleManager:SetParticleControl(self.radius_visual, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.radius_visual, 1, Vector(self.radius, 0, 0))
	self:AddParticle(self.radius_visual, false, false, -1, false, false)

	self:OnIntervalThink(true)
end

function modifier_leshrac_pulse_nova_custom:UpdateEvents()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h6 == 0 then
		return
	end

	self.parent:AddDamageEvent_inc(self, true)
end

function modifier_leshrac_pulse_nova_custom:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	if not first then
		local mana = self.parent:GetMana()
		local mana_cost = self.ability:GetMana()
		if mana < mana_cost then
			if self.ability:GetToggleState() then
				self.ability:ToggleAbility()
			end
			return
		end
		self.parent:SetMana(math.max(1, mana - mana_cost))
	end

	if self.shield_effect and self.parent:GetHealthPercent() > self.ability.talents.h6_health then
		ParticleManager:DestroyParticle(self.shield_effect, false)
		ParticleManager:ReleaseParticleIndex(self.shield_effect)
		self.shield_effect = nil
	end

	local enemies = self.parent:FindTargets(self.radius)
	self.damageTable.damage = self.ability:GetDamage()

	if #enemies > 0 then
		if self.ability.talents.has_r3 == 1 and self:GetStackCount() < self.ability.talents.r3_max then
			self:IncrementStackCount()
		end
	end

	local total = 0
	for _, enemy in pairs(enemies) do
		self.damageTable.victim = enemy

		if self.ability.talents.has_r2 == 1 then
			enemy:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_leshrac_pulse_nova_custom_heal_reduce",
				{ duration = self.ability.talents.r2_duration }
			)
		end

		if self.ability.talents.has_r3 == 1 then
			enemy:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_leshrac_pulse_nova_custom_health_reduce",
				{ duration = self.ability.talents.r3_duration }
			)
		end

		local real = DoDamage(self.damageTable)
		if self.ability.talents.has_r4 == 1 then
			local result = self.parent:CanLifesteal(enemy)
			if result then
				total = total + result * real
			end
		end

		local effect_cast = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_leshrac/leshrac_pulse_nova.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			enemy
		)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			0,
			enemy,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			enemy:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(effect_cast, 1, Vector(100, 0, 0))
		ParticleManager:ReleaseParticleIndex(effect_cast)
		enemy:EmitSound("Hero_Leshrac.Pulse_Nova_Strike")
	end

	if total > 0 and self.parent.edict_ability and IsValid(self.parent.edict_ability.shield_mod) then
		self.parent.edict_ability.shield_mod:AddShield(total * self.ability.talents.r4_heal)
	end

	self:StartIntervalThink(
		self.interval + self:GetStackCount() / self.ability.talents.r3_max * self.ability.talents.r3_interval
	)
end

function modifier_leshrac_pulse_nova_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.h6_health then
		return
	end

	if not self.shield_effect then
		self.shield_effect = self.parent:GenericParticle("particles/generic/generic_shield.vpcf", self, true)
	end

	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_leshrac_pulse_nova_custom_bkb_cd") then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_leshrac_pulse_nova_custom_bkb_cd",
		{ duration = self.ability.talents.h6_talent_cd }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_generic_debuff_immune",
		{ duration = self.ability.talents.h6_bkb, effect = 2, sound = 1 }
	)

	local rift_particle = ParticleManager:CreateParticle("particles/puck/puck_blind.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(rift_particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(rift_particle, 1, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(rift_particle, 2, Vector(400, 0, 0))
	ParticleManager:ReleaseParticleIndex(rift_particle)
end

function modifier_leshrac_pulse_nova_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_TOOLTIP2,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_leshrac_pulse_nova_custom:OnTooltip()
	return self.ability:GetDamage()
end

function modifier_leshrac_pulse_nova_custom:OnTooltip2()
	return self.ability:GetMana()
end

function modifier_leshrac_pulse_nova_custom:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_status
end

function modifier_leshrac_pulse_nova_custom:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	local health_percent = self.parent:GetHealthPercent()
	health_percent = math.max(self.ability.talents.h6_health, math.min(100, health_percent))
	local bonus = (1 - (health_percent - self.ability.talents.h6_health) / (100 - self.ability.talents.h6_health))
	return bonus * self.ability.talents.h6_damage_reduce
end

function modifier_leshrac_pulse_nova_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Hero_Leshrac.Pulse_Nova")
end

modifier_leshrac_pulse_nova_custom_heal_reduce = class(mod_hidden)
function modifier_leshrac_pulse_nova_custom_heal_reduce:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_leshrac_pulse_nova_custom_heal_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_leshrac_pulse_nova_custom_heal_reduce:GetModifierHealChange()
	return self.ability.talents.r2_heal_reduce
end

function modifier_leshrac_pulse_nova_custom_heal_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.r2_heal_reduce
end

modifier_leshrac_pulse_nova_custom_health_reduce = class(mod_visible)
function modifier_leshrac_pulse_nova_custom_health_reduce:GetTexture()
	return "buffs/leshrac/nova_3"
end
function modifier_leshrac_pulse_nova_custom_health_reduce:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	self.health = self.ability.talents.r3_health_reduce / self.max

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_leshrac_pulse_nova_custom_health_reduce:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	if self.parent:IsRealHero() then
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_leshrac_pulse_nova_custom_health_reduce:OnDestroy()
	if not IsServer() then
		return
	end
	if self.parent:IsHero() then
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_leshrac_pulse_nova_custom_health_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_leshrac_pulse_nova_custom_health_reduce:GetModifierExtraHealthPercentage()
	return self.health * self:GetStackCount()
end

modifier_leshrac_pulse_nova_custom_tracker = class(mod_hidden)
function modifier_leshrac_pulse_nova_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.pulse_ability = self.ability
	self.parent.pulse_ability_legendary = self.parent:FindAbilityByName("leshrac_pulse_nova_custom_legendary")
	if IsValid(self.parent.pulse_ability_legendary) then
		if IsServer() and not self.parent.pulse_ability_legendary:IsTrained() then
			self.parent.pulse_ability_legendary:SetLevel(1)
		end
		self.parent.pulse_ability_legendary:UpdateTalents()
	end

	self.ability.mana_cost_per_second = self.ability:GetSpecialValueFor("mana_cost_per_second")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.mana_cost_max = self.ability:GetSpecialValueFor("mana_cost_max") / 100
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.interval = self.ability:GetSpecialValueFor("interval")
end

function modifier_leshrac_pulse_nova_custom_tracker:OnRefresh()
	self.ability.mana_cost_per_second = self.ability:GetSpecialValueFor("mana_cost_per_second")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_leshrac_pulse_nova_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_FIXED_MANA_REGEN,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_EVASION_CONSTANT,
	}
end

function modifier_leshrac_pulse_nova_custom_tracker:GetModifierFixedManaRegen()
	if self.ability.talents.has_r7 == 0 then
		return
	end
	return -1
end

function modifier_leshrac_pulse_nova_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h2_move
		* (self.parent:HasModifier("modifier_leshrac_pulse_nova_custom") and self.ability.talents.h2_bonus or 1)
end

function modifier_leshrac_pulse_nova_custom_tracker:GetModifierEvasion_Constant()
	return self.ability.talents.h2_evasion
		* (self.parent:HasModifier("modifier_leshrac_pulse_nova_custom") and self.ability.talents.h2_bonus or 1)
end

modifier_leshrac_pulse_nova_custom_bkb_cd = class(mod_cd)
function modifier_leshrac_pulse_nova_custom_bkb_cd:GetTexture()
	return "buffs/leshrac/hero_6"
end

leshrac_pulse_nova_custom_legendary = class({})
leshrac_pulse_nova_custom_legendary.talents = {}

function leshrac_pulse_nova_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r7_damage = caster:GetTalentValue("modifier_leshrac_nova_7", "damage", true) / 100,
			r7_mana = caster:GetTalentValue("modifier_leshrac_nova_7", "mana", true) / 100,
			r7_cast = caster:GetTalentValue("modifier_leshrac_nova_7", "cast", true),
			r7_heal = caster:GetTalentValue("modifier_leshrac_nova_7", "heal", true) / 100,
			r7_radius = caster:GetTalentValue("modifier_leshrac_nova_7", "radius", true),
			r7_talent_cd = caster:GetTalentValue("modifier_leshrac_nova_7", "talent_cd", true),
		}
	end
end

function leshrac_pulse_nova_custom_legendary:CreateTalent()
	self:SetHidden(false)
	self:SetLevel(1)
	self:UpdateTalents()
end

function leshrac_pulse_nova_custom_legendary:GetCastPoint()
	return self.talents.r7_cast or 0
end

function leshrac_pulse_nova_custom_legendary:GetCooldown(iLevel)
	return self.talents.r7_talent_cd or 0
end

function leshrac_pulse_nova_custom_legendary:GetRadius()
	return (self.talents.r7_radius or 0)
		+ (IsValid(self.caster.leshrac_innate) and self.caster.leshrac_innate:GetRange() or 0)
end

function leshrac_pulse_nova_custom_legendary:GetCastRange()
	return self:GetRadius() - self.caster:GetCastRangeBonus()
end

function leshrac_pulse_nova_custom_legendary:OnAbilityPhaseStart()
	self.caster:AddNewModifier(self.caster, self, "modifier_leshrac_pulse_nova_custom_legendary", {})
	return true
end

function leshrac_pulse_nova_custom_legendary:OnAbilityPhaseInterrupted()
	self.caster:RemoveModifierByName("modifier_leshrac_pulse_nova_custom_legendary")
end

function leshrac_pulse_nova_custom_legendary:OnSpellStart()
	self.caster:RemoveModifierByName("modifier_leshrac_pulse_nova_custom_legendary")

	local radius = self:GetRadius()
	self.caster:EmitSound("Leshrac.Nova_legendary_blast")
	self.caster:EmitSound("Leshrac.Nova_legendary_blast2")

	local nUnburrowFX =
		ParticleManager:CreateParticle("particles/heroes/leshrak_chakra_end.vpcf", PATTACH_CUSTOMORIGIN, nil)
	ParticleManager:SetParticleControl(nUnburrowFX, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(nUnburrowFX, 1, Vector(radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(nUnburrowFX)

	local nFXIndex = ParticleManager:CreateParticle("particles/heroes/leshrak_burst.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(nFXIndex, 0, Vector(radius, 0, 0))
	ParticleManager:SetParticleControl(nFXIndex, 1, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(nFXIndex, 3, self.caster:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(nFXIndex)

	local mana = (self.caster:GetMaxMana() - self.caster:GetMana()) * self.talents.r7_mana
	self.caster:SetMana(math.min(self.caster:GetMaxMana(), self.caster:GetMana() + mana))

	local damage = mana * self.talents.r7_damage
	local heal = mana * self.talents.r7_heal

	local enemies = self.caster:FindTargets(radius)
	local damageTable = { attacker = self.caster, ability = self, damage_type = DAMAGE_TYPE_MAGICAL, damage = damage }

	for _, enemy in pairs(enemies) do
		damageTable.victim = enemy
		DoDamage(damageTable, "modifier_leshrac_nova_7")
		enemy:SendNumber(104, damage)
		enemy:GenericParticle("particles/econ/items/outworld_devourer/od_shards_exile/od_shards_exile_prison_end.vpcf")
	end

	if #enemies > 0 then
		self.caster:EmitSound("Leshrac.Nova_legendary_impact")
	end

	self.caster:GenericHeal(heal, self, false, "", "modifier_leshrac_nova_7")
end

modifier_leshrac_pulse_nova_custom_legendary = class(mod_hidden)
function modifier_leshrac_pulse_nova_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	local speed = 2.5 / (self.ability.talents.r7_cast * self.ability:GetCastPointModifier())
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_VICTORY, speed)

	self.parent:EmitSound("Leshrac.Nova_legendary_cast")
	self.parent:EmitSound("Leshrac.Nova_legendary_cast_start")

	self.nChannelFX =
		ParticleManager:CreateParticle("particles/heroes/leshrak_chakra.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.nChannelFX, 1, Vector(0, 0, 0))
	ParticleManager:SetParticleControl(self.nChannelFX, 4, Vector(0, 0, 0))
	self:AddParticle(self.nChannelFX, false, false, -1, false, false)
end

function modifier_leshrac_pulse_nova_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Leshrac.Nova_legendary_cast")
	self.parent:FadeGesture(ACT_DOTA_VICTORY)
end