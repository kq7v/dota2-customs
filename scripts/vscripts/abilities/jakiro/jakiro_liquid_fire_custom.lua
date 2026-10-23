--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_jakiro_liquid_fire_custom_tracker",
	"abilities/jakiro/jakiro_liquid_fire_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_liquid_fire_custom_proc",
	"abilities/jakiro/jakiro_liquid_fire_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_liquid_fire_custom_proc_ice",
	"abilities/jakiro/jakiro_liquid_fire_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_liquid_fire_custom_fire_debuff",
	"abilities/jakiro/jakiro_liquid_fire_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_jakiro_liquid_fire_custom_ice_debuff",
	"abilities/jakiro/jakiro_liquid_fire_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_liquid_fire_custom_speed",
	"abilities/jakiro/jakiro_liquid_fire_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_jakiro_liquid_3"
)
LinkLuaModifier(
	"modifier_jakiro_liquid_fire_custom_legendary_stack",
	"abilities/jakiro/jakiro_liquid_fire_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_jakiro_liquid_7"
)
LinkLuaModifier(
	"modifier_jakiro_liquid_fire_custom_legendary_acitve",
	"abilities/jakiro/jakiro_liquid_fire_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_jakiro_liquid_7" }
)

jakiro_liquid_fire_custom = class({})
jakiro_liquid_fire_custom.talents = {}

jakiro_liquid_frost_custom = class({})

function jakiro_liquid_fire_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_liquid_fire_explosion.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_liquid_ice_projectile.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_liquid_ice.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/liquid_legendary_active.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_dragon_knight/dragon_knight_transform_blue.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_dragon_knight/dragon_knight_transform_red.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/liquid_fire_legendary_timer.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_liquid_fire_debuff.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_brewmaster/brewmaster_void_astral_pull_statuseffect.vpcf",
		context
	)
end

function jakiro_liquid_fire_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_frost_damage = 0,
			e1_fire_damage = 0,

			e2_duration = 0,
			e2_heal = 0,

			has_e3 = 0,
			e3_speed = 0,
			e3_stats = 0,
			e3_max = caster:GetTalentValue("modifier_jakiro_liquid_3", "max", true),

			has_e4 = 0,
			e4_speed = caster:GetTalentValue("modifier_jakiro_liquid_4", "speed", true),
			e4_max = caster:GetTalentValue("modifier_jakiro_liquid_4", "max", true),
			e4_chance = caster:GetTalentValue("modifier_jakiro_liquid_4", "chance", true),
			e4_damage = caster:GetTalentValue("modifier_jakiro_liquid_4", "damage", true) / 100,

			has_e7 = 0,
			e7_max = caster:GetTalentValue("modifier_jakiro_liquid_7", "max", true),
			e7_duration = caster:GetTalentValue("modifier_jakiro_liquid_7", "duration", true),
			e7_delay = caster:GetTalentValue("modifier_jakiro_liquid_7", "delay", true),
			e7_damage_reduce = caster:GetTalentValue("modifier_jakiro_liquid_7", "damage_reduce", true) / 100,
			e7_effect_duration = caster:GetTalentValue("modifier_jakiro_liquid_7", "effect_duration", true),

			has_h1 = 0,
			h1_range = 0,

			has_w7 = 0,
		}
	end

	if caster:HasTalent("modifier_jakiro_liquid_1") then
		self.talents.has_e1 = 1
		self.talents.e1_frost_damage = caster:GetTalentValue("modifier_jakiro_liquid_1", "frost_damage") / 100
		self.talents.e1_fire_damage = caster:GetTalentValue("modifier_jakiro_liquid_1", "fire_damage") / 100
	end

	if caster:HasTalent("modifier_jakiro_liquid_2") then
		self.talents.e2_duration = caster:GetTalentValue("modifier_jakiro_liquid_2", "duration")
		self.talents.e2_heal = caster:GetTalentValue("modifier_jakiro_liquid_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_jakiro_liquid_2",
			value = function(params)
				if
					params.inflictor
					and params.inflictor ~= self
					and params.inflictor ~= caster.liquid_ability_frost
				then
					return 0
				end
				return self.talents.e2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_jakiro_liquid_3") then
		self.talents.has_e3 = 1
		self.talents.e3_speed = caster:GetTalentValue("modifier_jakiro_liquid_3", "speed")
		self.talents.e3_stats = caster:GetTalentValue("modifier_jakiro_liquid_3", "stats")
	end

	if caster:HasTalent("modifier_jakiro_liquid_4") then
		self.talents.has_e4 = 1
		if IsServer() then
			self.tracker.proc = caster:AddProc(self.tracker, { current = true })
		end
	end

	if caster:HasTalent("modifier_jakiro_liquid_7") then
		self.talents.has_e7 = 1
		if IsServer() and name == "modifier_jakiro_liquid_7" then
			self.tracker:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_jakiro_path_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_jakiro_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_range = caster:GetTalentValue("modifier_jakiro_hero_1", "range")
	end
end

function jakiro_liquid_fire_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_jakiro_liquid_fire_custom_tracker"
end

function jakiro_liquid_fire_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") then
		return "jakiro_liquid_both"
	end
	if self.caster:HasModifier("modifier_jakiro_innate_custom_active_frost") then
		return "jakiro_liquid_ice"
	end
	return "jakiro_liquid_fire"
end

function jakiro_liquid_fire_custom:GetManaCost(iLevel)
	return self:GetCost()
end

function jakiro_liquid_fire_custom:GetCost()
	return self.AbilityManaCost or 0
end

function jakiro_liquid_fire_custom:GetCastRange(vLocation, hTarget)
	return self.caster:Script_GetAttackRange()
		+ (self.attack_range or 0)
		- self.caster:GetCastRangeBonus()
		+ (self.talents.h1_range or 0)
end

function jakiro_liquid_fire_custom:GetAOERadius()
	if self.caster:HasModifier("modifier_jakiro_innate_custom_active_frost") then
		return
	end
	return self.fire_radius or 0
end

function jakiro_liquid_fire_custom:GetDuration()
	return (self.duration or 0) + (self.talents.e2_duration or 0)
end

modifier_jakiro_liquid_fire_custom_tracker = class(mod_hidden)
function modifier_jakiro_liquid_fire_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.liquid_ability = self.ability

	self.parent.liquid_ability_legendary = self.parent:FindAbilityByName("jakiro_liquid_fire_custom_legendary")
	if self.parent.liquid_ability_legendary then
		self.parent.liquid_ability_legendary:UpdateTalents()
	end

	self.parent.liquid_ability_frost = self.parent:FindAbilityByName("jakiro_liquid_frost_custom")

	self.ability.fire_damage = self.ability:GetSpecialValueFor("fire_damage")
	self.ability.fire_damage_creeps = self.ability:GetSpecialValueFor("fire_damage_creeps")
	self.ability.fire_damage_health = self.ability:GetSpecialValueFor("fire_damage_health") / 100
	self.ability.frost_damage = self.ability:GetSpecialValueFor("frost_damage")
	self.ability.frost_slow = self.ability:GetSpecialValueFor("frost_slow")
	self.ability.frost_slow_attack = self.ability:GetSpecialValueFor("frost_slow_attack")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.fire_radius = self.ability:GetSpecialValueFor("fire_radius")
	self.ability.tick_rate = self.ability:GetSpecialValueFor("tick_rate")
	self.ability.AbilityManaCost = self.ability:GetSpecialValueFor("AbilityManaCost")
	self.ability.attack_range = self.ability:GetSpecialValueFor("attack_range")

	self.parent:AddAttackRecordEvent_out(self)
	self.parent:AddAttackStartEvent_out(self)
	self.parent:AddOrderEvent(self)
	self.parent:AddProc(self, { name = "hit", land = true })
	self.parent:AddRecordDestroyEvent(self, true)

	self.records = {}
	self.cast = false
end

function modifier_jakiro_liquid_fire_custom_tracker:OnRefresh()
	self.ability.fire_damage = self.ability:GetSpecialValueFor("fire_damage")
	self.ability.fire_damage_health = self.ability:GetSpecialValueFor("fire_damage_health") / 100
	self.ability.frost_damage = self.ability:GetSpecialValueFor("frost_damage")
	self.ability.frost_slow = self.ability:GetSpecialValueFor("frost_slow")
	self.ability.frost_slow_attack = self.ability:GetSpecialValueFor("frost_slow_attack")
end

function modifier_jakiro_liquid_fire_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	if not self.parent.liquid_ability_legendary then
		return
	end

	local stack = 0
	local max = self.ability.talents.e7_max
	local interval = -1
	local mod = self.parent:FindModifierByName("modifier_jakiro_liquid_fire_custom_legendary_stack")
	local active_mod = self.parent:FindModifierByName("modifier_jakiro_liquid_fire_custom_legendary_acitve")
	local active = 0
	local use_zero = 0
	local override = nil

	if mod then
		stack = mod:GetStackCount()
	end

	if active_mod then
		max = self.ability.talents.e7_duration
		stack = active_mod:GetRemainingTime()
		active = 1
		use_zero = 1
	else
		self.parent.liquid_ability_legendary:SetActivated(mod and mod:GetStackCount() >= max or false)
	end

	if self.parent.liquid_ability_legendary:GetCooldownTimeRemaining() > 0 then
		interval = 0.1
		use_zero = 1
		stack = 0
		override = self.parent.liquid_ability_legendary:GetCooldownTimeRemaining()
	end

	if self.ability.talents.has_w7 == 0 then
		self.parent:UpdateUIlong({
			stack = stack,
			max = max,
			active = active,
			override_stack = override,
			use_zero = use_zero,
			priority = 1,
			style = "JakiroLiquid",
		})
	end

	self:StartIntervalThink(interval)
end

function modifier_jakiro_liquid_fire_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:UpdateUI()
end

function modifier_jakiro_liquid_fire_custom_tracker:IsOrbCast()
	return not self.parent:IsSilenced()
		and self.ability:IsFullyCastable()
		and (self.ability:GetAutoCastState() or self.cast)
end

function modifier_jakiro_liquid_fire_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	if self:IsOrbCast() then
		return 0
	end
	return self.ability.talents.e4_chance
end

function modifier_jakiro_liquid_fire_custom_tracker:ShouldLaunch(target)
	if not target:IsUnit() then
		return
	end
	if self:IsOrbCast() then
		return 0
	end
	if self.ability.talents.has_e4 == 0 then
		return false
	end

	local proc = self.proc and self.proc.armed
	if self.parent.jakiro_e7 then
		proc = RollPseudoRandomPercentage(
			self.ability.talents.e4_chance,
			"modifier_jakiro_liquid_fire_custom_tracker",
			self.parent
		)
	end
	return proc and 1 or false
end

function modifier_jakiro_liquid_fire_custom_tracker:CheckState()
	if
		not self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_proc")
		and not self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_proc_ice")
	then
		return
	end
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_jakiro_liquid_fire_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS,
	}
end

function modifier_jakiro_liquid_fire_custom_tracker:GetModifierProjectileSpeedBonus()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_speed
end

function modifier_jakiro_liquid_fire_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	local target = params.target
	if not self.records[params.record] then
		return
	end

	local radius = self.ability.fire_radius
	local result = self.records[params.record].result
	local is_attack = self.records[params.record].is_attack

	if
		self.ability.talents.has_e7 == 1
		and target:IsRealHero()
		and not is_attack
		and not self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve")
		and self.parent.liquid_ability_legendary:GetCooldownTimeRemaining() <= 0
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_jakiro_liquid_fire_custom_legendary_stack",
			{ duration = self.ability.talents.e7_effect_duration }
		)
	end

	if result == 0 or result == 2 then
		local effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_jakiro/jakiro_liquid_fire_explosion.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			effect,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControl(effect, 1, Vector(radius, radius, radius))
		ParticleManager:ReleaseParticleIndex(effect)

		for _, aoe_target in pairs(self.parent:FindTargets(radius, target:GetAbsOrigin())) do
			aoe_target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_jakiro_liquid_fire_custom_fire_debuff",
				{ duration = self.ability:GetDuration() }
			)
		end

		target:EmitSound("Hero_Jakiro.LiquidFire")
	end

	if result == 1 or result == 2 then
		target:RemoveModifierByName("modifier_jakiro_liquid_fire_custom_ice_debuff")
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_jakiro_liquid_fire_custom_ice_debuff",
			{ duration = self.ability:GetDuration() }
		)
		target:EmitSound("Hero_Jakiro.LiquidFrost")
	end
end

function modifier_jakiro_liquid_fire_custom_tracker:RecordDestroyEvent(params)
	self.records[params.record] = nil
end

function modifier_jakiro_liquid_fire_custom_tracker:OrderEvent(params)
	self.cast = params.ability and params.ability == self.ability
end

function modifier_jakiro_liquid_fire_custom_tracker:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	self.parent:RemoveModifierByName("modifier_jakiro_liquid_fire_custom_proc")

	local result = self:ShouldLaunch(params.target)

	if not result then
		return
	end

	local name = "modifier_jakiro_liquid_fire_custom_proc"
	if
		self.parent:HasModifier("modifier_jakiro_innate_custom_active_frost")
		and not self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve")
	then
		name = "modifier_jakiro_liquid_fire_custom_proc_ice"
	end

	local mod = self.parent:AddNewModifier(self.parent, self.ability, name, {})
	mod.is_attack = result
end

function modifier_jakiro_liquid_fire_custom_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if params.no_attack_cooldown and not self.parent.jakiro_e7 then
		return
	end

	local target = params.target
	local attacker = params.attacker

	if attacker ~= self.parent then
		return
	end
	if not target:IsUnit() then
		return
	end

	if
		self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") and not params.no_attack_cooldown
	then
		Timers:CreateTimer(self.ability.talents.e7_delay, function()
			if IsValid(target) then
				self.parent.jakiro_e7 = true
				self:AttackRecordEvent_out({ target = target, attacker = self.parent })
				self.parent:PerformAttack(target, true, true, true, false, true, false, false)
				self.parent.jakiro_e7 = false
			end
		end)
	end

	local result = false
	local is_attack = false

	local mod = self.parent:FindModifierByName("modifier_jakiro_liquid_fire_custom_proc")
	if mod then
		self.parent:EmitSound("Hero_Jakiro.LiquidFire")
		result = 0
		if mod.is_attack == 1 then
			is_attack = true
		end
	end

	mod = self.parent:FindModifierByName("modifier_jakiro_liquid_fire_custom_proc_ice")
	if self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_proc_ice") then
		self.parent:EmitSound("Hero_Jakiro.LiquidFrost")
		result = 1
		if mod.is_attack == 1 then
			is_attack = true
		end
	end

	if not result then
		return
	end

	self.parent:RemoveModifierByName("modifier_jakiro_liquid_fire_custom_proc")
	self.parent:RemoveModifierByName("modifier_jakiro_liquid_fire_custom_proc_ice")
	self.cast = false

	if not is_attack then
		if IsValid(self.parent.jakiro_innate) then
			self.parent.jakiro_innate:SpellCast(self.ability, result)
		end
		if IsValid(self.parent.path_ability) and self.parent.path_ability.tracker then
			self.parent.path_ability.tracker:SpellEvent({ unit = self.parent, ability = self.ability })
		end
		self.ability:UseResources(true, false, false, true)
	end

	if self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") then
		result = 2
		self.parent:EmitSound("Hero_Jakiro.LiquidFrost")
	end

	self.records[params.record] = { result = result, is_attack = is_attack }
end

modifier_jakiro_liquid_fire_custom_proc = class(mod_hidden)
modifier_jakiro_liquid_fire_custom_proc_ice = class(mod_hidden)

modifier_jakiro_liquid_fire_custom_fire_debuff = class(mod_visible)
function modifier_jakiro_liquid_fire_custom_fire_debuff:GetTexture()
	return "jakiro_liquid_fire"
end
function modifier_jakiro_liquid_fire_custom_fire_debuff:IsPurgable()
	return true
end
function modifier_jakiro_liquid_fire_custom_fire_debuff:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_jakiro/jakiro_liquid_fire_debuff.vpcf", self)

	self.interval = self.ability.tick_rate
	self.health_damage = self.ability.fire_damage_health
	self.base_damage = self.ability.fire_damage
	self.damage_creeps = self.ability.fire_damage_creeps

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self)
	end

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		custom_flag = "jakiro_fire",
	}
	self:StartIntervalThink(self.interval)

	self:SetStackCount(1)
end

function modifier_jakiro_liquid_fire_custom_fire_debuff:OnRefresh()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e4 == 0 then
		return
	end
	if self:GetStackCount() >= self.ability.talents.e4_max then
		return
	end

	self:IncrementStackCount()
end

function modifier_jakiro_liquid_fire_custom_fire_debuff:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self, true)
	end
end

function modifier_jakiro_liquid_fire_custom_fire_debuff:OnIntervalThink()
	if not IsServer() then
		return
	end

	local damage = self.base_damage + self.health_damage * (self.parent:GetMaxHealth() - self.parent:GetHealth())
	if self.parent:IsCreep() then
		damage = self.base_damage * self.damage_creeps
	end
	self.damageTable.damage = damage
		* self.interval
		* (1 + self.ability.talents.e1_fire_damage)
		* (1 + (self:GetStackCount() - 1) * self.ability.talents.e4_damage)

	DoDamage(self.damageTable)
end

modifier_jakiro_liquid_fire_custom_ice_debuff = class(mod_visible)
function modifier_jakiro_liquid_fire_custom_ice_debuff:GetTexture()
	return "jakiro_liquid_ice"
end
function modifier_jakiro_liquid_fire_custom_ice_debuff:IsPurgable()
	return true
end
function modifier_jakiro_liquid_fire_custom_ice_debuff:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_jakiro_liquid_fire_custom_ice_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_jakiro_liquid_fire_custom_ice_debuff:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.frost_slow
	self.attack_slow = self.ability.frost_slow_attack

	if not IsServer() then
		return
	end
	self.damage = self.ability.frost_damage
		+ self.ability.talents.e1_frost_damage * self.caster:GetAverageTrueAttackDamage(nil)
	self.parent:GenericParticle("particles/units/heroes/hero_jakiro/jakiro_liquid_ice.vpcf", self)

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self)
	end

	local damage_ability = IsValid(self.caster.liquid_ability_frost) and self.caster.liquid_ability_frost
		or self.ability

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = damage_ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		custom_flag = "jakiro_e",
	}
	self.parent:AddDamageEvent_inc(self, true)
end

function modifier_jakiro_liquid_fire_custom_ice_debuff:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self, true)
	end
end

function modifier_jakiro_liquid_fire_custom_ice_debuff:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.caster ~= params.attacker then
		return
	end
	if params.inflictor and params.inflictor:IsItem() then
		return
	end
	if params.custom_flag == "jakiro_e" then
		return
	end

	local damage = self.damage
	if self.caster:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") then
		damage = damage * (1 + self.ability.talents.e7_damage_reduce)
	end
	self.damageTable.damage = damage

	local real_damage = DoDamage(self.damageTable)
	self.parent:SendNumber(4, real_damage)
end

function modifier_jakiro_liquid_fire_custom_ice_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_jakiro_liquid_fire_custom_ice_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_jakiro_liquid_fire_custom_ice_debuff:GetModifierAttackSpeedBonus_Constant()
	return self.attack_slow
end

modifier_jakiro_liquid_fire_custom_speed = class(mod_visible)
function modifier_jakiro_liquid_fire_custom_speed:GetTexture()
	return "buffs/jakiro/liquid_3"
end
function modifier_jakiro_liquid_fire_custom_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e3_max
	self.stats = self.ability.talents.e3_stats / self.max
	self.speed = self.ability.talents.e3_speed / self.max
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_jakiro_liquid_fire_custom_speed:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_jakiro_liquid_fire_custom_speed:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_jakiro_liquid_fire_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_jakiro_liquid_fire_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self:GetStackCount() * self.speed
end

function modifier_jakiro_liquid_fire_custom_speed:GetModifierBonusStats_Agility()
	return self:GetStackCount() * self.stats
end

function modifier_jakiro_liquid_fire_custom_speed:GetModifierBonusStats_Strength()
	return self:GetStackCount() * self.stats
end

function modifier_jakiro_liquid_fire_custom_speed:GetModifierBonusStats_Intellect()
	return self:GetStackCount() * self.stats
end

modifier_jakiro_liquid_fire_custom_legendary_stack = class(mod_hidden)
function modifier_jakiro_liquid_fire_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e7_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.duration = self:GetRemainingTime()

	self:OnRefresh()
end

function modifier_jakiro_liquid_fire_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.ability.tracker then
		self.ability.tracker:UpdateUI()
	end
end

function modifier_jakiro_liquid_fire_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.ability.tracker then
		return
	end
	self.ability.tracker:UpdateUI()
end

jakiro_liquid_fire_custom_legendary = class({})
jakiro_liquid_fire_custom_legendary.talents = {}

function jakiro_liquid_fire_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e7_duration = caster:GetTalentValue("modifier_jakiro_liquid_7", "duration", true),
			e7_talent_cd = caster:GetTalentValue("modifier_jakiro_liquid_7", "talent_cd", true),
			e7_range = caster:GetTalentValue("modifier_jakiro_liquid_7", "range", true),
			e7_damage = caster:GetTalentValue("modifier_jakiro_liquid_7", "damage", true),
			e7_heal = caster:GetTalentValue("modifier_jakiro_liquid_7", "heal", true) / 100,

			has_w7 = 0,
		}
	end

	if caster:HasTalent("modifier_jakiro_path_7") then
		self.talents.has_w7 = 1
	end
end

function jakiro_liquid_fire_custom_legendary:GetCooldown(level)
	return self.talents.e7_talent_cd or 0
end

function jakiro_liquid_fire_custom_legendary:OnAbilityPhaseStart()
	local mod = self.caster:FindModifierByName("modifier_jakiro_liquid_fire_custom_legendary_stack")
	return mod and mod:GetStackCount() >= mod.max or false
end

function jakiro_liquid_fire_custom_legendary:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_jakiro_liquid_fire_custom_legendary_stack")
	if not mod then
		return
	end

	self.caster:GenericHeal(
		self.caster:GetMaxHealth() * self.talents.e7_heal,
		self,
		false,
		"",
		"modifier_jakiro_liquid_7"
	)

	mod:Destroy()
	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_jakiro_liquid_fire_custom_legendary_acitve",
		{ duration = self.talents.e7_duration }
	)
end

function jakiro_liquid_fire_custom_legendary:CreateTalent()
	self:SetHidden(false)
end

modifier_jakiro_liquid_fire_custom_legendary_acitve = class(mod_hidden)
function modifier_jakiro_liquid_fire_custom_legendary_acitve:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_jakiro_liquid_fire_custom_legendary_acitve:GetStatusEffectName()
	return "particles/units/heroes/hero_brewmaster/brewmaster_void_astral_pull_statuseffect.vpcf"
end
function modifier_jakiro_liquid_fire_custom_legendary_acitve:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.range = self.ability.talents.e7_range
	self.damage = self.ability.talents.e7_damage - 100

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.mod = nil
	if IsValid(self.parent.liquid_ability) and self.parent.liquid_ability.tracker then
		self.mod = self.parent.liquid_ability.tracker
	end

	self.ability:EndCd()
	if self.parent.jakiro_innate then
		self.parent.jakiro_innate:EndCd()
		self.parent:AddNewModifier(
			self.parent,
			self.parent.jakiro_innate,
			"modifier_jakiro_innate_custom_active_frost",
			{}
		)
		self.parent:AddNewModifier(
			self.parent,
			self.parent.jakiro_innate,
			"modifier_jakiro_innate_custom_active_fire",
			{}
		)
	end

	self.parent:EmitSound("Jakiro.Liquid_legendary_vo")
	self.parent:EmitSound("Jakiro.Liquid_legendary_start")
	self.parent:EmitSound("Jakiro.Liquid_legendary_start2")
	self.parent:EmitSound("Jakiro.Liquid_legendary_loop")
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_TELEPORT, 1.9)

	self.parent:GenericParticle("particles/jakiro/liquid_legendary_active.vpcf", self)
	self.parent:GenericParticle("particles/units/heroes/hero_dragon_knight/dragon_knight_transform_blue.vpcf")

	Timers:CreateTimer(0.2, function()
		self.parent:GenericParticle("particles/units/heroes/hero_dragon_knight/dragon_knight_transform_red.vpcf")
	end)

	self.number = -1
	self.interval = 0.1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_jakiro_liquid_fire_custom_legendary_acitve:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.anim_end and self:GetElapsedTime() >= 0.8 then
		self.anim_end = true
		self.parent:FadeGesture(ACT_DOTA_TELEPORT)
	end

	if self.ability.talents.has_w7 == 0 then
		local number = math.floor(self:GetRemainingTime())
		if number ~= self.number then
			self.number = number
			local number_1 = number + 1
			local double = math.floor(number_1 / 10)
			local number_2 = number_1 - double * 10

			if not self.timer then
				self.timer =
					self.parent:GenericParticle("particles/jakiro/liquid_fire_legendary_timer.vpcf", self, true)
			end
			ParticleManager:SetParticleControl(self.timer, 1, Vector(double, number_1, number_2))
		end
	end

	if not self.mod then
		return
	end
	self.mod:UpdateUI()
end

function modifier_jakiro_liquid_fire_custom_legendary_acitve:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:StopSound("Jakiro.Liquid_legendary_loop")
	self.parent:FadeGesture(ACT_DOTA_TELEPORT)
	self.ability:StartCd()

	if self.parent.jakiro_innate then
		self.parent.jakiro_innate:StartCd()
		self.parent:RemoveModifierByName("modifier_jakiro_innate_custom_active_frost")
	end

	if self.mod then
		self.mod:UpdateUI()
	end
end

function modifier_jakiro_liquid_fire_custom_legendary_acitve:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_jakiro_liquid_fire_custom_legendary_acitve:GetModifierModelScale()
	return 20
end

function modifier_jakiro_liquid_fire_custom_legendary_acitve:GetModifierTotalDamageOutgoing_Percentage(params)
	if self.parent.jakiro_w3 then
		return
	end
	if params.inflictor then
		return
	end
	return self.damage
end

function modifier_jakiro_liquid_fire_custom_legendary_acitve:GetModifierAttackRangeBonus()
	return self.range
end