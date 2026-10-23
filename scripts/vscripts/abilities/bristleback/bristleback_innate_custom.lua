--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_bristleback_innate_custom",
	"abilities/bristleback/bristleback_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bristleback_innate_custom_shield",
	"abilities/bristleback/bristleback_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_bristleback_innate_custom_shield_timer",
	"abilities/bristleback/bristleback_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bristleback_innate_custom_heal_reduce",
	"abilities/bristleback/bristleback_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bristle_spray_4"
)
LinkLuaModifier(
	"modifier_bristleback_innate_custom_proc_attack",
	"abilities/bristleback/bristleback_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bristleback_innate_custom_proc_cd",
	"abilities/bristleback/bristleback_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)

bristleback_innate_custom = class({})
bristleback_innate_custom.talents = {}

function bristleback_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("soundfile", "soundevents/vo_custom/bristleback_vo_custom.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_bristleback.vsndevts", context)
	PrecacheResource("particle", "particles/bristleback/back_shield.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/warpath_hit.vpcf", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_bristleback", context)
end

function bristleback_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w3 = 0,

			has_w4 = 0,
			w4_max = caster:GetTalentValue("modifier_bristle_spray_4", "max", true),
			w4_slow = caster:GetTalentValue("modifier_bristle_spray_4", "slow", true),
			w4_heal_reduce = caster:GetTalentValue("modifier_bristle_spray_4", "heal_reduce", true),
			w4_duration = caster:GetTalentValue("modifier_bristle_spray_4", "duration", true),
			w4_cd_items = caster:GetTalentValue("modifier_bristle_spray_4", "cd_items", true),

			h1_slow_resist = 0,
			h1_move = 0,

			h2_str = 0,
			h2_shield = 0,

			has_h4 = 0,
			h4_talent_cd = caster:GetTalentValue("modifier_bristle_hero_4", "talent_cd", true),
			h4_stun = caster:GetTalentValue("modifier_bristle_hero_4", "stun", true),
			h4_chance = caster:GetTalentValue("modifier_bristle_hero_4", "chance", true),
			h4_damage = caster:GetTalentValue("modifier_bristle_hero_4", "damage", true),
		}
	end

	if caster:HasTalent("modifier_bristle_hero_1") then
		self.talents.h1_move = caster:GetTalentValue("modifier_bristle_hero_1", "move")
		self.talents.h1_slow_resist = caster:GetTalentValue("modifier_bristle_hero_1", "slow_resist")
	end

	if caster:HasTalent("modifier_bristle_hero_2") then
		self.talents.h2_str = caster:GetTalentValue("modifier_bristle_hero_2", "str") / 100
		self.talents.h2_shield = caster:GetTalentValue("modifier_bristle_hero_2", "shield") / 100
		caster:AddPercentStat({ str = self.talents.h2_str }, self.tracker)
	end

	if caster:HasTalent("modifier_bristle_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_bristle_spray_3") then
		self.talents.has_w3 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_bristle_spray_4") then
		self.talents.has_w4 = 1
		caster:AddSpellEvent(self.tracker, true)
	end
end

function bristleback_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_bristleback_innate_custom"
end

function bristleback_innate_custom:ProcHit(target, is_passive)
	if not IsServer() then
		return
	end

	if self.talents.has_w4 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_bristleback_innate_custom_heal_reduce",
			{ duration = self.talents.w4_duration }
		)
	end

	if is_passive then
		return
	end
	if self.talents.has_h4 == 0 then
		return
	end
	if target:HasModifier("modifier_bristleback_innate_custom_proc_cd") then
		return
	end
	if not RollPseudoRandomPercentage(self.talents.h4_chance, 6668, self.caster) then
		return
	end
	if target:IsAttackImmune() then
		return
	end

	target:EmitSound("DOTA_Item.SkullBasher")
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_bristleback_innate_custom_proc_cd",
		{ duration = self.talents.h4_talent_cd }
	)
	target:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self, true),
		"modifier_bashed",
		{ duration = (1 - target:GetStatusResistance()) * self.talents.h4_stun }
	)

	target:EmitSound("BB.Warpath_attack")

	local particle =
		ParticleManager:CreateParticle("particles/bristleback/warpath_hit.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.caster:AddNewModifier(self.caster, self, "modifier_bristleback_innate_custom_proc_attack", {})
	self.caster:PerformAttack(target, true, true, true, true, false, false, true)
	self.caster:RemoveModifierByName("modifier_bristleback_innate_custom_proc_attack")
end

modifier_bristleback_innate_custom = class(mod_hidden)
function modifier_bristleback_innate_custom:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.bristleback_innate = self.ability

	self.ability.shield = self.ability:GetSpecialValueFor("shield") / 100
	self.ability.cd = self.ability:GetSpecialValueFor("cd")
	self.ability.back_angle = self.ability:GetSpecialValueFor("back_angle")
	self.ability.side_angle = self.ability:GetSpecialValueFor("side_angle")

	self.parent:AddDamageEvent_inc(self, true)
	self.interval = 0.3
	self:StartIntervalThink(self.interval)
end

function modifier_bristleback_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
	}
end

function modifier_bristleback_innate_custom:GetModifierSlowResistance_Stacking()
	return self.ability.talents.h1_slow_resist
end

function modifier_bristleback_innate_custom:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h1_move
end

function modifier_bristleback_innate_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_w4 == 1 then
		self.parent:CdItems(self.ability.talents.w4_cd_items, "modifier_bristle_spray_4")
	end

	if self.ability.talents.has_w3 == 1 and self.parent.spray_ability then
		self.parent.spray_ability:ProcDouble()
	end
end

function modifier_bristleback_innate_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:HasModifier("modifier_bristleback_innate_custom_shield") then
		return
	end
	if self.parent:HasModifier("modifier_bristleback_innate_custom_shield_timer") then
		return
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_bristleback_innate_custom_shield", {})
end

function modifier_bristleback_innate_custom:GetFacing(attacker)
	if not IsServer() then
		return
	end

	local forwardVector = self.parent:GetForwardVector()
	local forwardAngle = math.deg(math.atan2(forwardVector.x, forwardVector.y))

	local reverseEnemyVector = (self.parent:GetAbsOrigin() - attacker:GetAbsOrigin()):Normalized()
	local reverseEnemyAngle = math.deg(math.atan2(reverseEnemyVector.x, reverseEnemyVector.y))

	local difference = math.abs(forwardAngle - reverseEnemyAngle)

	if self.parent:HasModifier("modifier_bristleback_bristleback_custom_active") then
		return 1
	end

	if difference <= self.ability.back_angle or difference >= (360 - self.ability.back_angle) then
		return 1
	elseif difference <= self.ability.side_angle or difference >= (360 - self.ability.side_angle) then
		return 2
	else
		return 3
	end
end

function modifier_bristleback_innate_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:HasModifier("modifier_bristleback_innate_custom_shield") then
		return
	end
	if self:GetFacing(params.attacker) ~= 3 then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_bristleback_innate_custom_shield_timer",
		{ duration = self.ability.cd }
	)
end

function modifier_bristleback_innate_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_bristleback_innate_custom_shield")
end

modifier_bristleback_innate_custom_shield = class(mod_hidden)
function modifier_bristleback_innate_custom_shield:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("BB.Innate_shield")
	self.parent:EmitSound("BB.Innate_shield2")

	self.particle = ParticleManager:CreateParticle(
		"particles/bristleback/back_shield.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.mod = nil
	if self.parent.bristleback_ability and self.parent.bristleback_ability.tracker then
		self.mod = self.parent.bristleback_ability.tracker
	end
	self.tracker = self.ability.tracker

	self:SetHasCustomTransmitterData(true)

	self.max_shield = (self.ability.shield + self.ability.talents.h2_shield) * self.parent:GetMaxHealth()
	self.shield = self.max_shield
	self:SendBuffRefreshToClients()
end

function modifier_bristleback_innate_custom_shield:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT,
	}
end

function modifier_bristleback_innate_custom_shield:AddCustomTransmitterData()
	return {
		max_shield = self.max_shield,
		shield = self.shield,
	}
end

function modifier_bristleback_innate_custom_shield:HandleCustomTransmitterData(data)
	self.max_shield = data.max_shield
	self.shield = data.shield
end

function modifier_bristleback_innate_custom_shield:GetModifierIncomingDamageConstant(params)
	if IsClient() then
		if params.report_max then
			return self.max_shield
		else
			return self.shield
		end
	end

	if not IsServer() then
		return
	end
	local attacker = params.attacker
	if attacker and attacker == self.parent then
		return
	end
	if not self.tracker then
		return
	end

	local damage = params.damage
	local facing = self.tracker:GetFacing(attacker)
	local damage_k = 1

	if self.mod then
		damage_k = (1 + self.mod:GetReduction(facing) / 100)
	end

	local block_damage = math.min(damage, self.shield / damage_k)
	local real_damage = block_damage * damage_k

	if facing == 1 and self.mod then
		self.mod:IncStacks(real_damage, params.attacker)
	end

	self.parent:AddShieldInfo({ shield_mod = self, healing = real_damage, healing_type = "shield" })

	self.shield = self.shield - real_damage
	self:SendBuffRefreshToClients()

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_bristleback_innate_custom_shield_timer",
		{ duration = self.ability.cd }
	)
	if self.shield <= 0 then
		self:Destroy()
	end

	return -block_damage
end

modifier_bristleback_innate_custom_shield_timer = class(mod_cd)
function modifier_bristleback_innate_custom_shield_timer:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_bristleback_innate_custom_shield_timer:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_bristleback_innate_custom_shield")
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_bristleback_innate_custom_shield", {})
end

modifier_bristleback_innate_custom_heal_reduce = class(mod_hidden)
function modifier_bristleback_innate_custom_heal_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w4_max
	self.heal_reduce = self.ability.talents.w4_heal_reduce
	self.slow = self.ability.talents.w4_slow

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_bristleback_innate_custom_heal_reduce:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max / 2 and not self.particle then
		self.particle = self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
	end
end

function modifier_bristleback_innate_custom_heal_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_bristleback_innate_custom_heal_reduce:GetModifierMoveSpeedBonus_Percentage()
	return self.slow * self:GetStackCount()
end

function modifier_bristleback_innate_custom_heal_reduce:GetModifierHealChange()
	return self.heal_reduce * self:GetStackCount()
end

function modifier_bristleback_innate_custom_heal_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce * self:GetStackCount()
end

modifier_bristleback_innate_custom_proc_attack = class(mod_hidden)
function modifier_bristleback_innate_custom_proc_attack:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.h4_damage - 100
end

function modifier_bristleback_innate_custom_proc_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_bristleback_innate_custom_proc_attack:GetModifierDamageOutgoing_Percentage()
	if IsClient() then
		return
	end
	return self.damage
end

modifier_bristleback_innate_custom_proc_cd = class(mod_hidden)