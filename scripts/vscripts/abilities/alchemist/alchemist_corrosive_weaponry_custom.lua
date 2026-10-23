--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_alchemist_corrosive_weaponry_custom",
	"abilities/alchemist/alchemist_corrosive_weaponry_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_alchemist_corrosive_weaponry_custom_debuff",
	"abilities/alchemist/alchemist_corrosive_weaponry_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_alchemist_corrosive_weaponry_custom_legendary",
	"abilities/alchemist/alchemist_corrosive_weaponry_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_alchemist_greed_legendary" }
)
LinkLuaModifier(
	"modifier_alchemist_corrosive_weaponry_custom_legendary_slow",
	"abilities/alchemist/alchemist_corrosive_weaponry_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_alchemist_corrosive_weaponry_custom_legendary_str",
	"abilities/alchemist/alchemist_corrosive_weaponry_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_alchemist_greed_legendary"
)
LinkLuaModifier(
	"modifier_alchemist_corrosive_weaponry_custom_silence_cd",
	"abilities/alchemist/alchemist_corrosive_weaponry_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_alchemist_greed_4"
)
LinkLuaModifier(
	"modifier_alchemist_corrosive_weaponry_custom_speed",
	"abilities/alchemist/alchemist_corrosive_weaponry_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_alchemist_greed_1"
)
LinkLuaModifier(
	"modifier_alchemist_corrosive_weaponry_custom_poison",
	"abilities/alchemist/alchemist_corrosive_weaponry_custom",
	LUA_MODIFIER_MOTION_NONE
)

alchemist_corrosive_weaponry_custom = class({})
alchemist_corrosive_weaponry_custom.talents = {}

function alchemist_corrosive_weaponry_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_alchemist/alchemist_corrosive_weaponry.vpcf", context)
	PrecacheResource("particle", "particles/alchemist/weapon_legendary_proj.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_venomancer/venomancer_venomous_gale_impact.vpcf", context)
	PrecacheResource("particle", "particles/sand_king/finale_legendary.vpcf", context)
	PrecacheResource("particle", "particles/sand_king/finale_legendary_poison.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", context)
	PrecacheResource("particle", "particles/alchemist/weaponry_proc.vpcf", context)
end

function alchemist_corrosive_weaponry_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_speed = 0,
			e1_duration = caster:GetTalentValue("modifier_alchemist_greed_1", "duration", true),

			e2_move_slow = 0,
			e2_range = 0,

			has_e3 = 0,
			e3_chance = 0,
			e3_damage = caster:GetTalentValue("modifier_alchemist_greed_3", "damage", true),
			e3_duration = caster:GetTalentValue("modifier_alchemist_greed_3", "duration", true),
			e3_interval = caster:GetTalentValue("modifier_alchemist_greed_3", "interval", true),
			e3_damage_type = caster:GetTalentValue("modifier_alchemist_greed_3", "damage_type", true),
			e3_talent_cd = caster:GetTalentValue("modifier_alchemist_greed_3", "talent_cd", true),
			e3_heal = caster:GetTalentValue("modifier_alchemist_greed_3", "heal", true) / 100,

			has_e4 = 0,
			e4_cd = caster:GetTalentValue("modifier_alchemist_greed_4", "cd", true),
			e4_silence = caster:GetTalentValue("modifier_alchemist_greed_4", "silence", true),

			has_e7 = 0,
			e7_talent_cd = caster:GetTalentValue("modifier_alchemist_greed_legendary", "talent_cd", true),
			e7_range = caster:GetTalentValue("modifier_alchemist_greed_legendary", "range", true),
			e7_duration = caster:GetTalentValue("modifier_alchemist_greed_legendary", "duration", true),
			e7_slow_duration = caster:GetTalentValue("modifier_alchemist_greed_legendary", "slow_duration", true),
			e7_linger = caster:GetTalentValue("modifier_alchemist_greed_legendary", "linger", true),
			e7_str = caster:GetTalentValue("modifier_alchemist_greed_legendary", "str", true),
		}
	end

	if caster:HasTalent("modifier_alchemist_greed_1") then
		self.talents.has_e1 = 1
		self.talents.e1_speed = caster:GetTalentValue("modifier_alchemist_greed_1", "speed")
		caster:AddAttackRecordEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_alchemist_greed_2") then
		self.talents.e2_move_slow = caster:GetTalentValue("modifier_alchemist_greed_2", "move_slow")
		self.talents.e2_range = caster:GetTalentValue("modifier_alchemist_greed_2", "range")
	end

	if caster:HasTalent("modifier_alchemist_greed_3") then
		self.talents.has_e3 = 1
		self.talents.e3_chance = caster:GetTalentValue("modifier_alchemist_greed_3", "chance")
		caster:AddProc(self.tracker, { cd = self.talents.e3_talent_cd, land = true })
	end

	if caster:HasTalent("modifier_alchemist_greed_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_alchemist_greed_legendary") then
		self.talents.has_e7 = 1
	end
end

function alchemist_corrosive_weaponry_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_alchemist_corrosive_weaponry_custom"
end

function alchemist_corrosive_weaponry_custom:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function alchemist_corrosive_weaponry_custom:GetCooldown(iLevel)
	return self.talents.has_e7 == 1 and self.talents.e7_talent_cd or 0
end

function alchemist_corrosive_weaponry_custom:GetCastRange(vLocation, hTarget)
	return self.talents.has_e7 == 1 and self.talents.e7_range or 0
end

function alchemist_corrosive_weaponry_custom:CastFilterResultTarget(target)
	if target:IsCreep() and not target:IsConsideredHero() then
		return UF_FAIL_CREEP
	end
	return UnitFilter(
		target,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_NONE,
		self.caster:GetTeamNumber()
	)
end

function alchemist_corrosive_weaponry_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	self.caster:EmitSound("Alchemist.Weapon_proj_cast")
	self.caster:EmitSound("Alchemist.Weapon_proj_cast2")
	self.caster:EmitSound("Alchemist.Weapon_proj_cast_vo")
	local info = {
		Target = target,
		Source = self.caster,
		Ability = self,
		EffectName = "particles/alchemist/weapon_legendary_proj.vpcf",
		iMoveSpeed = 1200,
		bReplaceExisting = false,
		bProvidesVision = true,
		bDodgeable = false,
		iVisionRadius = 30,
		iSourceAttachment = self.caster:ScriptLookupAttachment("attach_attack3"),
		iVisionTeamNumber = self.caster:GetTeamNumber(),
	}
	ProjectileManager:CreateTrackingProjectile(info)
end

function alchemist_corrosive_weaponry_custom:OnProjectileHitHandle(target, vLocation, iProjectileHandle)
	if not IsServer() then
		return
	end
	if not target then
		return
	end

	target:EmitSound("Alchemist.Weapon_proj_hit")
	target:EmitSound("Alchemist.Weapon_proj_hit2")

	self.caster:RemoveModifierByName("modifier_alchemist_corrosive_weaponry_custom_legendary_str")
	target:RemoveModifierByName("modifier_alchemist_corrosive_weaponry_custom_legendary_str")

	target:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self, true),
		"modifier_alchemist_corrosive_weaponry_custom_legendary_slow",
		{ duration = self.talents.e7_slow_duration }
	)
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_alchemist_corrosive_weaponry_custom_legendary",
		{ duration = self.talents.e7_duration }
	)
end

function alchemist_corrosive_weaponry_custom:AddStack(target, count)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end

	if not self.caster:PassivesDisabled() then
		for i = 1, count do
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_alchemist_corrosive_weaponry_custom_debuff",
				{ duration = self.debuff_duration }
			)
		end
	end
end

modifier_alchemist_corrosive_weaponry_custom = class(mod_hidden)
function modifier_alchemist_corrosive_weaponry_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.parent.corrosive_ability = self.ability
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.max_stacks = self.ability:GetSpecialValueFor("max_stacks")
	self.ability.debuff_duration = self.ability:GetSpecialValueFor("debuff_duration")
	self.ability.max_slow = self.ability:GetSpecialValueFor("max_slow")
	self.ability.attack_slow = self.ability:GetSpecialValueFor("attack_slow")
	self.ability.attack_stack = self.ability:GetSpecialValueFor("attack_stack")

	if not IsServer() then
		return
	end
	self.parent:AddProc(self, { name = "hit", land = true })
end

function modifier_alchemist_corrosive_weaponry_custom:OnRefresh()
	self.ability.max_slow = self.ability:GetSpecialValueFor("max_slow")
	self.ability.attack_slow = self.ability:GetSpecialValueFor("attack_slow")
end

function modifier_alchemist_corrosive_weaponry_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_alchemist_corrosive_weaponry_custom:GetModifierAttackRangeBonus()
	return self.ability.talents.e2_range
end

function modifier_alchemist_corrosive_weaponry_custom:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e1 == 0 then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local mod = params.target:FindModifierByName("modifier_alchemist_corrosive_weaponry_custom_debuff")
	local stack = mod and mod:GetStackCount() or 0

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_alchemist_corrosive_weaponry_custom_speed",
		{ duration = self.ability.talents.e1_duration, stack = stack }
	)
end

function modifier_alchemist_corrosive_weaponry_custom:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.ability.talents.e3_chance
end

function modifier_alchemist_corrosive_weaponry_custom:AttackProc(params, name)
	if name == "hit" then
		self.ability:AddStack(params.target, self.ability.attack_stack)
		return
	end

	params.target:EmitSound("Alchemist.Weapon_proc")
	params.target:AddNewModifier(self.parent, self.ability, "modifier_alchemist_corrosive_weaponry_custom_poison", {})
end

modifier_alchemist_corrosive_weaponry_custom_debuff = class(mod_visible)
function modifier_alchemist_corrosive_weaponry_custom_debuff:IsPurgable()
	return self.ability.talents.has_e4 == 0
end
function modifier_alchemist_corrosive_weaponry_custom_debuff:GetEffectName()
	return "particles/units/heroes/hero_alchemist/alchemist_corrosive_weaponry.vpcf"
end
function modifier_alchemist_corrosive_weaponry_custom_debuff:GetStatusEffectName()
	return "particles/status_fx/status_effect_alchemist_corrosive_weaponry.vpcf"
end
function modifier_alchemist_corrosive_weaponry_custom_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_LOW
end
function modifier_alchemist_corrosive_weaponry_custom_debuff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.max = self.ability.max_stacks
	self.slow = (self.ability.max_slow + self.ability.talents.e2_move_slow) / self.max
	self.attack_slow = self.ability.attack_slow / self.max

	self.silence_cd = self.ability.talents.e4_cd
	self.silence_duration = self.ability.talents.e4_silence

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_alchemist_corrosive_weaponry_custom_debuff:OnRefresh()
	if not IsServer() then
		return
	end

	if self:GetStackCount() < self.max then
		self:IncrementStackCount()
	end

	if self:GetStackCount() < self.max then
		return
	end
	if self.ability.talents.has_e4 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_alchemist_corrosive_weaponry_custom_silence_cd") then
		return
	end
	if self.parent:IsDebuffImmune() then
		return
	end

	self.parent:GenericParticle("particles/units/heroes/hero_venomancer/venomancer_venomous_gale_impact.vpcf")
	self.parent:EmitSound("Sf.Raze_Silence")
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_alchemist_corrosive_weaponry_custom_silence_cd",
		{ duration = self.silence_cd }
	)
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_generic_silence",
		{ duration = (1 - self.parent:GetStatusResistance()) * self.silence_duration }
	)
end

function modifier_alchemist_corrosive_weaponry_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_alchemist_corrosive_weaponry_custom_debuff:GetModifierAttackSpeedBonus_Constant()
	return self.attack_slow * self:GetStackCount()
end

function modifier_alchemist_corrosive_weaponry_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.slow * self:GetStackCount()
end

modifier_alchemist_corrosive_weaponry_custom_legendary = class(mod_hidden)
function modifier_alchemist_corrosive_weaponry_custom_legendary:GetEffectName()
	return "particles/sand_king/finale_legendary_poison.vpcf"
end
function modifier_alchemist_corrosive_weaponry_custom_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_poison_venomancer.vpcf"
end
function modifier_alchemist_corrosive_weaponry_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_alchemist_corrosive_weaponry_custom_legendary:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.ability:EndCd()

	self.RemoveForDuel = true
	self.parent:AddDamageEvent_inc(self, true)

	self.parent:EmitSound("Alchemist.Weapon_legerndary_loop")

	self.time = self.ability.talents.e7_duration
	self.str_linger = self.ability.talents.e7_linger

	self.parent:GenericParticle("particles/units/heroes/hero_venomancer/venomancer_venomous_gale_impact.vpcf")

	self.particle = ParticleManager:CreateParticle(
		"particles/sand_king/finale_legendary.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.time, self.time, self.time))
	ParticleManager:SetParticleControlEnt(
		self.particle,
		4,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_alchemist_corrosive_weaponry_custom_legendary:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.caster ~= params.attacker then
		return
	end
	if bit.band(params.damage_flags, DOTA_DAMAGE_FLAG_REFLECTION) == DOTA_DAMAGE_FLAG_REFLECTION then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self.ability, true),
		"modifier_alchemist_corrosive_weaponry_custom_legendary_str",
		{ duration = self.str_linger }
	)
	if self.parent:IsRealHero() then
		self.parent:AddNewModifier(
			self.caster,
			self.caster:BkbAbility(self.ability, true),
			"modifier_alchemist_corrosive_weaponry_custom_legendary_str",
			{ duration = self.str_linger }
		)
	end
	self.parent:EmitSound("Alchemist.Weapon_legerndary_attack")
end

function modifier_alchemist_corrosive_weaponry_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	local mod = self.parent:FindModifierByName("modifier_alchemist_corrosive_weaponry_custom_legendary_str")
	if not mod then
		mod = self.caster:FindModifierByName("modifier_alchemist_corrosive_weaponry_custom_legendary_str")
	end
	local stack = mod and mod:GetStackCount() or 0

	self.caster:UpdateUIshort({
		max_time = self.time,
		time = self:GetRemainingTime(),
		stack = stack,
		priority = 1,
		style = "AlchemistWeapon",
	})
end

function modifier_alchemist_corrosive_weaponry_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	self.caster:UpdateUIshort({ hide = 1, hide_full = 1, style = "AlchemistWeapon" })
	self.parent:StopSound("Alchemist.Weapon_legerndary_loop")
end

modifier_alchemist_corrosive_weaponry_custom_legendary_slow = class(mod_hidden)
function modifier_alchemist_corrosive_weaponry_custom_legendary_slow:OnCreated()
	self.slow = -100
end

function modifier_alchemist_corrosive_weaponry_custom_legendary_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_alchemist_corrosive_weaponry_custom_legendary_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_alchemist_corrosive_weaponry_custom_legendary_str = class(mod_visible)
function modifier_alchemist_corrosive_weaponry_custom_legendary_str:GetTexture()
	return "buffs/alchemist/corrosive_legendary"
end
function modifier_alchemist_corrosive_weaponry_custom_legendary_str:GetEffectName()
	return "particles/units/heroes/hero_alchemist/alchemist_corrosive_weaponry.vpcf"
end
function modifier_alchemist_corrosive_weaponry_custom_legendary_str:GetStatusEffectName()
	return "particles/status_fx/status_effect_alchemist_corrosive_weaponry.vpcf"
end
function modifier_alchemist_corrosive_weaponry_custom_legendary_str:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_alchemist_corrosive_weaponry_custom_legendary_str:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.str = self.caster.corrosive_ability.talents.e7_str
	if self.parent:GetTeamNumber() ~= self.caster:GetTeamNumber() then
		self.str = self.str * -1
	end

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_alchemist_corrosive_weaponry_custom_legendary_str:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_alchemist_corrosive_weaponry_custom_legendary_str:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	}
end

function modifier_alchemist_corrosive_weaponry_custom_legendary_str:GetModifierBonusStats_Strength()
	return self.str * self:GetStackCount()
end

modifier_alchemist_corrosive_weaponry_custom_silence_cd = class(mod_hidden)

modifier_alchemist_corrosive_weaponry_custom_speed = class(mod_visible)
function modifier_alchemist_corrosive_weaponry_custom_speed:GetTexture()
	return "buffs/alchemist/greed_3"
end
function modifier_alchemist_corrosive_weaponry_custom_speed:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.e1_speed

	if not IsServer() then
		return
	end
	self:SetStackCount(table.stack)
end

function modifier_alchemist_corrosive_weaponry_custom_speed:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:SetStackCount(table.stack)
end

function modifier_alchemist_corrosive_weaponry_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_alchemist_corrosive_weaponry_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self:GetStackCount() * self.speed
end

modifier_alchemist_corrosive_weaponry_custom_poison = class(mod_hidden)
function modifier_alchemist_corrosive_weaponry_custom_poison:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_alchemist_corrosive_weaponry_custom_poison:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	local interval = self.ability.talents.e3_interval
	self.count = self.ability.talents.e3_duration / interval
	local damage = self.ability.talents.e3_damage / self.count
	self.heal = self.ability.talents.e3_heal

	if not IsServer() then
		return
	end

	self.particle = ParticleManager:CreateParticle(
		"particles/alchemist/weaponry_proc.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(self.particle)

	self.parent:GenericParticle("particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", self)

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.e3_damage_type,
		damage = damage,
	}
	self:StartIntervalThink(interval)
end

function modifier_alchemist_corrosive_weaponry_custom_poison:OnIntervalThink()
	if not IsServer() then
		return
	end
	local real_damage = DoDamage(self.damageTable, "modifier_alchemist_greed_3")
	local result = self.caster:CanLifesteal(self.parent)
	if result then
		self.caster:GenericHeal(real_damage * self.heal * result, self.ability, true, "", "modifier_alchemist_greed_3")
	end

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
	end
end