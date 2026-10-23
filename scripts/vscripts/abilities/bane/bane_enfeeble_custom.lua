--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_bane_enfeeble_custom", "abilities/bane/bane_enfeeble_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_bane_enfeeble_custom_tracker",
	"abilities/bane/bane_enfeeble_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bane_enfeeble_custom_legendary",
	"abilities/bane/bane_enfeeble_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bane_enfeeble_custom_legendary_effect",
	"abilities/bane/bane_enfeeble_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bane_enfeeble_7"
)
LinkLuaModifier(
	"modifier_bane_enfeeble_custom_legendary_caster",
	"abilities/bane/bane_enfeeble_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bane_enfeeble_7"
)
LinkLuaModifier(
	"modifier_bane_enfeeble_custom_root",
	"abilities/bane/bane_enfeeble_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bane_enfeeble_4"
)
LinkLuaModifier(
	"modifier_bane_enfeeble_custom_health",
	"abilities/bane/bane_enfeeble_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bane_enfeeble_1"
)

bane_enfeeble_custom = class({})
bane_enfeeble_custom.talents = {}
bane_enfeeble_custom.active_mod = nil

function bane_enfeeble_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_bane/bane_enfeeble.vpcf", context)
	PrecacheResource("particle", "particles/bane/enfeeble_legendary_aoe.vpcf", context)
	PrecacheResource("particle", "particles/bane/enfeeble_legendary_aoe_debuff.vpcf", context)
	PrecacheResource("particle", "particles/bane/enfeeble_damage.vpcf", context)
	PrecacheResource("particle", "particles/bane/enfeeble_root.vpcf", context)
	PrecacheResource("particle", "particles/void_spirit/shield_buff.vpcf", context)
end

function bane_enfeeble_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_health = 0,
			q1_armor = 0,
			q1_duration = caster:GetTalentValue("modifier_bane_enfeeble_1", "duration", true),

			has_q2 = 0,
			q2_speed_reduce = 0,
			q2_speed = 0,

			q3_damage = 0,
			q3_radius = caster:GetTalentValue("modifier_bane_enfeeble_3", "radius", true),
			q3_damage_type = caster:GetTalentValue("modifier_bane_enfeeble_3", "damage_type", true),
			q3_heal = caster:GetTalentValue("modifier_bane_enfeeble_3", "heal", true) / 100,
			q3_bonus = caster:GetTalentValue("modifier_bane_enfeeble_3", "bonus", true),
			q3_chance = caster:GetTalentValue("modifier_bane_enfeeble_3", "chance", true),

			has_q4 = 0,
			q4_range = caster:GetTalentValue("modifier_bane_enfeeble_4", "range", true) / 100,
			q4_root = caster:GetTalentValue("modifier_bane_enfeeble_4", "root", true),

			has_q7 = 0,
			q7_value = caster:GetTalentValue("modifier_bane_enfeeble_7", "value", true) / 100,
			q7_duration = caster:GetTalentValue("modifier_bane_enfeeble_7", "duration", true),
			q7_radius = caster:GetTalentValue("modifier_bane_enfeeble_7", "radius", true),
			q7_timer = caster:GetTalentValue("modifier_bane_enfeeble_7", "timer", true),
			q7_max = caster:GetTalentValue("modifier_bane_enfeeble_7", "max", true),

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_bane_enfeeble_1") then
		self.talents.has_q1 = 1
		self.talents.q1_health = caster:GetTalentValue("modifier_bane_enfeeble_1", "health") / 100
		self.talents.q1_armor = caster:GetTalentValue("modifier_bane_enfeeble_1", "armor")
	end

	if caster:HasTalent("modifier_bane_enfeeble_2") then
		self.talents.has_q2 = 1
		self.talents.q2_speed_reduce = caster:GetTalentValue("modifier_bane_enfeeble_2", "speed_reduce")
		self.talents.q2_speed = caster:GetTalentValue("modifier_bane_enfeeble_2", "speed")
	end

	if caster:HasTalent("modifier_bane_enfeeble_3") then
		self.talents.q3_damage = caster:GetTalentValue("modifier_bane_enfeeble_3", "damage") / 100
		caster:AddProc(self.tracker, { damage = true })
	end

	if caster:HasTalent("modifier_bane_enfeeble_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_bane_grip_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_bane_enfeeble_7") then
		self.talents.has_q7 = 1
		if IsServer() then
			self.tracker:UpdateUI()
		end
	end
end

function bane_enfeeble_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_bane_enfeeble_custom_tracker"
end

function bane_enfeeble_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level)
end

function bane_enfeeble_custom:GetCastRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
end

function bane_enfeeble_custom:GetAbilityTargetFlags()
	return DOTA_UNIT_TARGET_FLAG_NONE
end

function bane_enfeeble_custom:GetAOERadius()
	if self.talents.has_q7 == 1 then
		return self.talents.q7_radius
	end
	return self.radius or 0
end

function bane_enfeeble_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level)
end

function bane_enfeeble_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self)
end

function bane_enfeeble_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	local mod = self.caster:FindModifierByName("modifier_bane_enfeeble_custom_legendary_caster")
	if mod and (not mod.target or mod.target ~= target) then
		mod:Destroy()
	end

	if target:TriggerSpellAbsorb(self) then
		return
	end

	self.caster:EmitSound("Hero_Bane.Enfeeble.Cast")

	if self.talents.has_q4 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_bane_enfeeble_custom_root",
			{ duration = (1 - target:GetStatusResistance()) * self.talents.q4_root }
		)
	end

	if self.talents.has_q7 == 1 then
		CreateModifierThinker(
			self.caster,
			self,
			"modifier_bane_enfeeble_custom_legendary",
			{ target = target:entindex() },
			target:GetAbsOrigin(),
			self.caster:GetTeamNumber(),
			false
		)
	else
		for _, aoe_target in pairs(self.caster:FindTargets(self.radius, target:GetAbsOrigin())) do
			local is_main = aoe_target == target and 1 or 0
			local mod = aoe_target:FindModifierByName("modifier_bane_enfeeble_custom")
			if mod then
				mod:Destroy()
			end
			aoe_target:AddNewModifier(
				self.caster,
				self,
				"modifier_bane_enfeeble_custom",
				{ is_main = is_main, duration = self.duration }
			)
		end
	end
end

modifier_bane_enfeeble_custom = class(mod_visible)
function modifier_bane_enfeeble_custom:GetTexture()
	return "bane_enfeeble"
end
function modifier_bane_enfeeble_custom:IsPurgable()
	return self.ability.talents.has_q7 == 0
end
function modifier_bane_enfeeble_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.slow
	self.range_reduce = self.ability.talents.q4_range

	self.interval = self.ability.damage_tick_rate
	self.damage = self.ability.enfeeble_tick_damage
	self.damage_reduce = self.ability.damage_reduction
	self.range = 0

	if not IsServer() then
		return
	end
	self.max_damage = self.parent:GetAverageTrueAttackDamage(nil)
	self.range_max = self.parent:Script_GetAttackRange()

	self.is_main = table.is_main
	if self.is_main == 1 then
		self.ability:EndCd()
		self.ability.active_mod = self

		if self.ability.talents.has_q1 == 1 then
			self.caster:RemoveModifierByName("modifier_bane_enfeeble_custom_health")
			self.health_mod = self.caster:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_bane_enfeeble_custom_health",
				{ health = self.parent:GetMaxHealth() * self.ability.talents.q1_health }
			)
		end
	end

	if
		self.parent:IsRealHero()
		and IsValid(self.caster.bane_innate_ability)
		and IsValid(self.caster.bane_innate_ability.tracker)
	then
		self.caster.bane_innate_ability.tracker:UpdateMod(self)
	end

	self.parent:EmitSound("Hero_Bane.Enfeeble")
	self.parent:GenericParticle("particles/units/heroes/hero_bane/bane_enfeeble.vpcf", self, true)

	if self.ability.talents.has_q4 == 1 and self.is_main == 1 then
		self.vision = self.parent:AddNewModifier(self.caster, self.ability, "modifier_generic_vision", {})
	end

	self:SetHasCustomTransmitterData(true)

	self.damageTable = {
		attacker = self.caster,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_PURE,
		victim = self.parent,
		damage = self.damage,
	}
	self.count = -1

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval - 0.02)
end

function modifier_bane_enfeeble_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.count = self.count + 1

	if
		self.parent:IsRealHero()
		and self.caster:GetQuest()
		and self.caster:GetQuest() == "Bane.Quest_5"
		and not self.caster:QuestCompleted()
		and self:GetElapsedTime() > 0.1
	then
		self.caster:UpdateQuest(self.interval)
	end

	if self.ability.talents.has_q7 == 1 and self.is_main == 1 then
		self.caster:AddNewModifier(self.caster, self.ability, "modifier_bane_enfeeble_custom_legendary_caster", {
			target = self.parent:entindex(),
			duration = self.ability.talents.q7_duration,
			damage = self.max_damage * self.damage_reduce / 100,
			move = self.slow,
			range = self.ability.talents.has_q4 == 1 and self.range_max * self.range_reduce or 0,
		})
	end

	DoDamage(self.damageTable)

	if self.ability.talents.has_q4 == 1 then
		self.range = self.parent:Script_GetAttackRange() * self.range_reduce
		self:SendBuffRefreshToClients()
	end
end

function modifier_bane_enfeeble_custom:AddCustomTransmitterData()
	return {
		range = self.range,
	}
end

function modifier_bane_enfeeble_custom:HandleCustomTransmitterData(data)
	self.range = data.range
end

function modifier_bane_enfeeble_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_bane_enfeeble_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_bane_enfeeble_custom:GetModifierAttackRangeBonus()
	return self.range
end

function modifier_bane_enfeeble_custom:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce
end

function modifier_bane_enfeeble_custom:GetModifierPhysicalArmorBonus()
	return self.ability.talents.q1_armor
end

function modifier_bane_enfeeble_custom:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.q2_speed_reduce
end

function modifier_bane_enfeeble_custom:OnDestroy()
	if not IsServer() then
		return
	end

	if
		self.parent:IsRealHero()
		and IsValid(self.caster.bane_innate_ability)
		and IsValid(self.caster.bane_innate_ability.tracker)
	then
		self.caster.bane_innate_ability.tracker:UpdateMod(self, true)
	end

	if IsValid(self.health_mod) then
		self.health_mod:SetDuration(self.ability.talents.q1_duration, true)
	end

	if IsValid(self.vision) then
		self.vision:Destroy()
	end

	if not self.ability then
		return
	end
	if self.is_main == 0 then
		return
	end

	self.ability.active_mod = nil
	self.ability:StartCd()
end

modifier_bane_enfeeble_custom_tracker = class(mod_hidden)
function modifier_bane_enfeeble_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
	self.ability.damage_tick_rate = self.ability:GetSpecialValueFor("damage_tick_rate")
	self.ability.enfeeble_tick_damage = self.ability:GetSpecialValueFor("enfeeble_tick_damage")
	self.ability.damage_reduction = self.ability:GetSpecialValueFor("damage_reduction")

	self.damageTable =
		{ attacker = self.parent, ability = self.ability, damage_type = self.ability.talents.q3_damage_type }

	self:StartIntervalThink(3)
end

function modifier_bane_enfeeble_custom_tracker:OnRefresh()
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
	self.ability.enfeeble_tick_damage = self.ability:GetSpecialValueFor("enfeeble_tick_damage")
	self.ability.damage_reduction = self.ability:GetSpecialValueFor("damage_reduction")
end

function modifier_bane_enfeeble_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.ability:IsActivated() and (not self.ability.active_mod or self.ability.active_mod:IsNull()) then
		self.ability:StartCd()
	end
end

function modifier_bane_enfeeble_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_bane_enfeeble_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.q2_speed
end

function modifier_bane_enfeeble_custom_tracker:GetProcChance(params)
	return self.ability.talents.q3_chance
		* (params.target:HasModifier("modifier_bane_enfeeble_custom") and self.ability.talents.q3_bonus or 1)
end

function modifier_bane_enfeeble_custom_tracker:DamageProc(params, name)
	local target = params.target

	target:EmitSound("Bane.Enfeeble_end")
	target:EmitSound("Bane.Enfeeble_end_2")

	local effect_cast =
		ParticleManager:CreateParticle("particles/bane/enfeeble_damage.vpcf", PATTACH_WORLDORIGIN, target)
	ParticleManager:SetParticleControl(effect_cast, 0, target:GetAbsOrigin())
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.ability.talents.q3_radius * 0.7, 0, 0))
	ParticleManager:Delete(effect_cast, 0)

	local damage = params.damage * self.ability.talents.q3_damage

	if self.parent:IsAlive() then
		self.parent:GenericHeal(
			damage * self.ability.talents.q3_heal,
			self.ability,
			nil,
			nil,
			"modifier_bane_enfeeble_3"
		)
	end

	for _, enemy in pairs(self.parent:FindTargets(self.ability.talents.q3_radius, target:GetAbsOrigin())) do
		self.damageTable.victim = enemy
		self.damageTable.damage = damage
		local real_damage = DoDamage(self.damageTable, "modifier_bane_enfeeble_3")
		if enemy == target then
			target:SendNumber(6, real_damage)
		end
	end
end

function modifier_bane_enfeeble_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if self.ability.talents.has_r7 == 1 then
		return
	end

	local max = self.ability.talents.q7_max
	local stack = 0
	local override_stack = 0
	local mod = self.parent:FindModifierByName("modifier_bane_enfeeble_custom_legendary_caster")
	if mod then
		stack = mod:GetStackCount()
		override_stack = stack * (self.ability.talents.q7_value / max)
	end
	self.parent:UpdateUIlong({
		max = max,
		stack = stack,
		override_stack = math.floor(override_stack * 100) .. "%",
		style = "BaneEnfeeble",
	})
end

modifier_bane_enfeeble_custom_legendary = class(mod_hidden)
function modifier_bane_enfeeble_custom_legendary:IsAura()
	return true
end
function modifier_bane_enfeeble_custom_legendary:GetAuraDuration()
	return 0.1
end
function modifier_bane_enfeeble_custom_legendary:GetAuraRadius()
	return self.radius
end
function modifier_bane_enfeeble_custom_legendary:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_bane_enfeeble_custom_legendary:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_bane_enfeeble_custom_legendary:GetModifierAura()
	return "modifier_bane_enfeeble_custom_legendary_effect"
end
function modifier_bane_enfeeble_custom_legendary:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.center = self.parent:GetAbsOrigin()

	self.radius = self.ability.talents.q7_radius

	if not IsServer() then
		return
	end
	self.target = EntIndexToHScript(table.target)
	self.targets = {}

	for _, target in pairs(self.caster:FindTargets(self.radius, self.target:GetAbsOrigin())) do
		local is_main = target == self.target and 1 or 0
		local mod = target:FindModifierByName("modifier_bane_enfeeble_custom")
		if mod then
			mod:Destroy()
		end
		target:AddNewModifier(self.caster, self.ability, "modifier_bane_enfeeble_custom", { is_main = is_main })
		self.targets[target] = true
	end

	local particle =
		ParticleManager:CreateParticle("particles/bane/enfeeble_legendary_aoe.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, self.center)
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 0, 0))
	self:AddParticle(particle, false, false, -1, false, false)

	self.interval = 0.1
	self.count = 0

	self:StartIntervalThink(self.interval)
end

function modifier_bane_enfeeble_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.target) or not self.target:FindModifierByName("modifier_bane_enfeeble_custom") then
		self:Destroy()
		return
	end

	if self:GetElapsedTime() > 0.05 and not self.init_sound then
		self.init_sound = true
		self.parent:EmitSound("Bane.Enfeeble_legendary_loop")
	end

	for target, _ in pairs(self.targets) do
		if IsValid(target) and (target:GetAbsOrigin() - self.center):Length2D() > self.radius then
			target:RemoveModifierByName("modifier_bane_enfeeble_custom")
			self.targets[target] = nil
		end
	end
end

function modifier_bane_enfeeble_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	for target, _ in pairs(self.targets) do
		if IsValid(target) then
			target:RemoveModifierByName("modifier_bane_enfeeble_custom")
		end
	end

	self.parent:StopSound("Bane.Enfeeble_legendary_loop")
end

function modifier_bane_enfeeble_custom_legendary:GetAuraEntityReject(target)
	if target:IsFieldInvun(self.caster) then
		return true
	end
	return target ~= self.target
end

modifier_bane_enfeeble_custom_legendary_effect = class(mod_hidden)
function modifier_bane_enfeeble_custom_legendary_effect:GetEffectName()
	return "particles/bane/enfeeble_legendary_aoe_debuff.vpcf"
end
function modifier_bane_enfeeble_custom_legendary_effect:GetStatusEffectName()
	return "particles/status_fx/status_effect_nightmare.vpcf"
end
function modifier_bane_enfeeble_custom_legendary_effect:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end

modifier_bane_enfeeble_custom_legendary_caster = class(mod_visible)
function modifier_bane_enfeeble_custom_legendary_caster:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q7_max
	self.value = self.ability.talents.q7_value / self.max
	self.model = 30 / self.max

	self.speed = self.ability.talents.q2_speed_reduce * -1
	self.armor = self.ability.talents.q1_armor * -1

	if not IsServer() then
		return
	end
	self.target = EntIndexToHScript(table.target)

	self.RemoveForDuel = true

	self.damage = table.damage * -1
	self.move = table.move * -1
	self.range = table.range * -1

	self.parent:GenericParticle("particles/units/heroes/hero_bane/bane_enfeeble.vpcf", self, true)
	self:SetHasCustomTransmitterData(true)
end

function modifier_bane_enfeeble_custom_legendary_caster:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if IsValid(self.ability.tracker) then
		self.ability.tracker:UpdateUI()
	end

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/void_spirit/shield_buff.vpcf", self)
	end

	self:SendBuffRefreshToClients()
	self.parent:CalculateStatBonus(true)
end

function modifier_bane_enfeeble_custom_legendary_caster:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability.tracker) then
		return
	end
	self.ability.tracker:UpdateUI()
end

function modifier_bane_enfeeble_custom_legendary_caster:AddCustomTransmitterData()
	return {
		damage = self.damage,
		move = self.move,
		range = self.range,
	}
end

function modifier_bane_enfeeble_custom_legendary_caster:HandleCustomTransmitterData(data)
	self.damage = data.damage
	self.move = data.move
	self.range = data.range
end

function modifier_bane_enfeeble_custom_legendary_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_bane_enfeeble_custom_legendary_caster:GetModifierAttackRangeBonus()
	return self.range * (self:GetStackCount() * self.value)
end

function modifier_bane_enfeeble_custom_legendary_caster:GetModifierPreAttack_BonusDamage()
	return self.damage * (self:GetStackCount() * self.value)
end

function modifier_bane_enfeeble_custom_legendary_caster:GetModifierMoveSpeedBonus_Percentage()
	return self.move * (self:GetStackCount() * self.value)
end

function modifier_bane_enfeeble_custom_legendary_caster:GetModifierModelScale()
	return self.model * self:GetStackCount()
end

function modifier_bane_enfeeble_custom_legendary_caster:GetModifierAttackSpeedBonus_Constant()
	return self.speed * (self:GetStackCount() * self.value)
end

function modifier_bane_enfeeble_custom_legendary_caster:GetModifierPhysicalArmorBonus()
	return self.armor * (self:GetStackCount() * self.value)
end

modifier_bane_enfeeble_custom_root = class(mod_hidden)
function modifier_bane_enfeeble_custom_root:IsPurgable()
	return true
end
function modifier_bane_enfeeble_custom_root:OnCreated()
	self.parent = self:GetParent()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Bane.Enfeeble_root")
	self.parent:GenericParticle("particles/bane/enfeeble_root.vpcf", self)
end

function modifier_bane_enfeeble_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_bane_enfeeble_custom_health = class(mod_visible)
function modifier_bane_enfeeble_custom_health:GetTexture()
	return "buffs/bane/enfeeble_1"
end
function modifier_bane_enfeeble_custom_health:OnCreated(table)
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent = self:GetParent()
	self:SetStackCount(table.health)
end

function modifier_bane_enfeeble_custom_health:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_bane_enfeeble_custom_health:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_bane_enfeeble_custom_health:GetModifierHealthBonus()
	return self:GetStackCount()
end