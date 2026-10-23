--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_bloodseeker_bloodrage_custom",
	"abilities/bloodseeker/bloodseeker_bloodrage_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_bloodseeker_bloodrage_custom_tracker",
	"abilities/bloodseeker/bloodseeker_bloodrage_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bloodseeker_bloodrage_custom_blood",
	"abilities/bloodseeker/bloodseeker_bloodrage_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bloodseeker_bloodrage_3"
)
LinkLuaModifier(
	"modifier_bloodseeker_bloodrage_custom_slow",
	"abilities/bloodseeker/bloodseeker_bloodrage_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bloodseeker_bloodrage_2"
)
LinkLuaModifier(
	"modifier_bloodseeker_bloodrage_custom_shard_cd",
	"abilities/bloodseeker/bloodseeker_bloodrage_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Shard" }
)

bloodseeker_bloodrage_custom = class({})
bloodseeker_bloodrage_custom.talents = {}

function bloodseeker_bloodrage_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/bloodseeker/thirst_legendary.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/bloodseeker_bloodrage_base.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/bloodrage_stack_main.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/sange_maim.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_beserkers_call.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/bloodrage_reduction.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/bloodseeker/bloodseeker_ti7/bloodseeker_ti7_thirst_owner.vpcf",
		context
	)
	PrecacheResource("particle", "particles/bloodseeker/bs_root.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/shard_damage.vpcf", context)
end

function bloodseeker_bloodrage_custom:CreateTalent()
	self.caster:RemoveModifierByName("modifier_bloodseeker_bloodrage_custom")
end

function bloodseeker_bloodrage_custom:UpdateTalents()
	local caster = self:GetCaster()

	if not self.init then
		self.init = true
		self.talents = {
			q1_speed = 0,
			q1_range = 0,

			has_q2 = 0,
			q2_slow_stack = 0,
			q2_damage_reduce_stack = 0,
			q2_max = caster:GetTalentValue("modifier_bloodseeker_bloodrage_2", "max", true),
			q2_duration = caster:GetTalentValue("modifier_bloodseeker_bloodrage_2", "duration", true),

			h1_magic = 0,
			h1_status = 0,
			h1_bonus = caster:GetTalentValue("modifier_bloodseeker_hero_1", "bonus", true),
			h1_health = caster:GetTalentValue("modifier_bloodseeker_hero_1", "health", true),

			has_q3 = 0,
			q3_damage_sec = 0,
			q3_heal = caster:GetTalentValue("modifier_bloodseeker_bloodrage_3", "heal", true) / 100,
			q3_interval = caster:GetTalentValue("modifier_bloodseeker_bloodrage_3", "interval", true),
			q3_duration = caster:GetTalentValue("modifier_bloodseeker_bloodrage_3", "duration", true),
			q3_damage_type = caster:GetTalentValue("modifier_bloodseeker_bloodrage_3", "damage_type", true),

			has_q4 = 0,
			q4_damage_reduce = caster:GetTalentValue("modifier_bloodseeker_bloodrage_4", "damage_reduce", true),
			q4_health = caster:GetTalentValue("modifier_bloodseeker_bloodrage_4", "health", true),
			q4_heal = caster:GetTalentValue("modifier_bloodseeker_bloodrage_4", "heal", true),

			has_q7 = 0,
			q7_cost = caster:GetTalentValue("modifier_bloodseeker_bloodrage_7", "cost", true) / 100,
			q7_bonus = caster:GetTalentValue("modifier_bloodseeker_bloodrage_7", "bonus", true),
			q7_health = caster:GetTalentValue("modifier_bloodseeker_bloodrage_7", "health", true),
			q7_cd = caster:GetTalentValue("modifier_bloodseeker_bloodrage_7", "cd", true),

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_bloodseeker_bloodrage_1") then
		self.talents.q1_speed = caster:GetTalentValue("modifier_bloodseeker_bloodrage_1", "speed")
		self.talents.q1_range = caster:GetTalentValue("modifier_bloodseeker_bloodrage_1", "range")
	end

	if caster:HasTalent("modifier_bloodseeker_bloodrage_2") then
		self.talents.has_q2 = 1
		self.talents.q2_slow_stack = caster:GetTalentValue("modifier_bloodseeker_bloodrage_2", "slow")
			/ self.talents.q2_max
		self.talents.q2_damage_reduce_stack = caster:GetTalentValue("modifier_bloodseeker_bloodrage_2", "damage_reduce")
			/ self.talents.q2_max
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_bloodseeker_hero_1") then
		self.talents.h1_status = caster:GetTalentValue("modifier_bloodseeker_hero_1", "status")
		self.talents.h1_magic = caster:GetTalentValue("modifier_bloodseeker_hero_1", "magic")
	end

	if caster:HasTalent("modifier_bloodseeker_bloodrage_3") then
		self.talents.has_q3 = 1
		self.talents.q3_damage_sec = caster:GetTalentValue("modifier_bloodseeker_bloodrage_3", "damage")
			/ self.talents.q3_duration
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_bloodseeker_bloodrage_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_bloodseeker_bloodrage_7") then
		self.talents.has_q7 = 1
		self.tracker:UpdateUI()
	end

	if caster:HasTalent("modifier_bloodseeker_thirst_7") then
		self.talents.has_e7 = 1
	end
end

function bloodseeker_bloodrage_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "bloodseeker_bloodrage", self)
end

function bloodseeker_bloodrage_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_bloodseeker_bloodrage_custom_tracker"
end

function bloodseeker_bloodrage_custom:GetBehavior()
	if self.talents.has_q7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
			+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			+ DOTA_ABILITY_BEHAVIOR_TOGGLE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL
end

function bloodseeker_bloodrage_custom:GetCooldown(iLevel)
	if self.talents.has_q7 == 1 then
		return self.talents.q7_cd
	end
	return self.BaseClass.GetCooldown(self, iLevel)
end

function bloodseeker_bloodrage_custom:OnSpellStart()
	self:Activate()
end

function bloodseeker_bloodrage_custom:OnToggle()
	local modifier = self.caster:FindModifierByName("modifier_bloodseeker_bloodrage_custom")

	if modifier then
		modifier:Destroy()
		self:StartCd()
	else
		self:Activate()
	end
end

function bloodseeker_bloodrage_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if IsValid(self.tracker) then
		self.tracker:InitShard()
	end
end

function bloodseeker_bloodrage_custom:Activate()
	local duration = self.duration

	if self.talents.has_q7 == 1 then
		duration = nil
	end

	local slark_mod = self.caster:FindModifierByName("modifier_slark_essence_shift_custom_legendary_steal")
	if slark_mod then
		duration = slark_mod:GetRemainingTime()
	end

	self.caster:EmitSound("hero_bloodseeker.bloodRage")
	self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_1)
	self.caster:AddNewModifier(self.caster, self, "modifier_bloodseeker_bloodrage_custom", { duration = duration })
end

function bloodseeker_bloodrage_custom:GetLegendaryBonus(ignore_talent)
	if self.talents.has_q7 == 0 and not ignore_talent then
		return 0
	end
	if not self.caster:HasModifier("modifier_bloodseeker_bloodrage_custom") and not ignore_talent then
		return 0
	end

	local health_percent = self.caster:GetHealthPercent()
	health_percent = math.max(self.talents.q7_health, math.min(100, health_percent))
	local bonus = (ignore_talent and 100 or self.talents.q7_bonus)
		* (1 - (health_percent - self.talents.q7_health) / (100 - self.talents.q7_health))
	return bonus
end

function bloodseeker_bloodrage_custom:ProcShard(target)
	if not IsServer() then
		return
	end
	if not self.caster:HasShard() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if target:HasModifier("modifier_bloodseeker_bloodrage_custom_shard_cd") then
		return
	end
	if not self.caster:HasModifier("modifier_bloodseeker_bloodrage_custom") then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_bloodseeker_bloodrage_custom_shard_cd",
		{ duration = self.shard_cd }
	)

	local effect_cast =
		ParticleManager:CreateParticle("particles/bloodseeker/shard_damage.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_cast)

	local damage = self.shard_damage * target:GetHealth()
	if target:IsCreep() then
		damage = math.min(damage, self.shard_max_creeps)
	end
	local real_damage = DoDamage(
		{
			attacker = self.caster,
			victim = target,
			damage_type = DAMAGE_TYPE_PURE,
			ability = self,
			damage = damage,
			damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
		},
		"shard"
	)
	local result = self.caster:CanLifesteal(target)
	if result then
		self.caster:GenericHeal(real_damage * self.shard_heal * result, self, true, "", "shard")
	end

	target:SendNumber(4, real_damage)
end

modifier_bloodseeker_bloodrage_custom = class(mod_visible)
function modifier_bloodseeker_bloodrage_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage_pct = self.ability.damage_pct
	self.legendary_model = 30

	if self.ability.talents.has_q7 == 1 then
		self.damage_pct = self.ability.talents.q7_cost
	end

	if not IsServer() then
		return
	end

	local pfx = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/bloodseeker/bloodseeker_bloodrage_base.vpcf",
		self
	)
	self.parent:GenericParticle(pfx, self, pfx == "particles/bloodseeker/bloodseeker_bloodrage_immortal.vpcf")

	if IsValid(self.ability.tracker) then
		self.ability.tracker:UpdateUI()
	end

	self.interval = 0.5
	self:StartIntervalThink(self.interval)
end

function modifier_bloodseeker_bloodrage_custom:OnRefresh(kv)
	self.damage_pct = self.ability.talents.has_q7 == 1 and self.ability.talents.q7_cost or self.ability.damage_pct

	if not IsServer() then
		return
	end
	if IsValid(self.ability.tracker) then
		self.ability.tracker:UpdateUI()
	end
end

function modifier_bloodseeker_bloodrage_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.parent:IsInvulnerable() then
		return
	end
	if self.parent:GetHealth() <= 1 then
		return
	end

	if self.ability.talents.has_q7 == 1 then
		local low_health = self.parent:GetHealthPercent() <= 50

		if low_health and not self.legendary_particle then
			self.legendary_particle = ParticleManager:CreateParticle(
				"particles/bloodseeker/thirst_legendary.vpcf",
				PATTACH_CUSTOMORIGIN,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				self.legendary_particle,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				self.legendary_particle,
				1,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_attack1",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				self.legendary_particle,
				2,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_attack2",
				self.parent:GetAbsOrigin(),
				true
			)
			self:AddParticle(self.legendary_particle, false, false, -1, false, false)
		end
		if not low_health and self.legendary_particle then
			ParticleManager:Delete(self.legendary_particle, 2)
			self.legendary_particle = nil
		end
	end

	if self.ability.talents.has_q4 == 1 then
		local low_health = self.parent:GetHealthPercent() <= self.ability.talents.q4_health
		if low_health and not self.lowhp_particle then
			self.lowhp_particle = self.parent:GenericParticle("particles/bloodseeker/bloodrage_reduction.vpcf", self)
			self.parent:EmitSound("BS.Bloodrage_bva")
		end
		if self.parent:GetHealthPercent() > (self.ability.talents.q4_health + 5) and self.lowhp_particle then
			ParticleManager:Delete(self.lowhp_particle, 2)
			self.lowhp_particle = nil
		end
		if low_health then
			return
		end
	end

	local self_damage = self.parent:GetMaxHealth() * (self.damage_pct * self.interval)

	if self.ability.talents.has_q7 == 1 then
		self.parent:SetHealth(math.max(1, self.parent:GetHealth() - self_damage))
	else
		DoDamage({
			attacker = self.parent,
			victim = self.parent,
			damage_type = DAMAGE_TYPE_PURE,
			ability = self.ability,
			damage = self_damage,
			damage_flags = DOTA_DAMAGE_FLAG_NO_DAMAGE_MULTIPLIERS
				+ DOTA_DAMAGE_FLAG_NON_LETHAL
				+ DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
		})
	end
end

function modifier_bloodseeker_bloodrage_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_bloodseeker_bloodrage_custom:GetModifierHealthRegenPercentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.q4_health then
		return
	end
	return self.ability.talents.q4_heal
end

function modifier_bloodseeker_bloodrage_custom:GetModifierModelScale()
	if self.ability.talents.has_q7 == 0 then
		return
	end
	return self.legendary_model * self.ability:GetLegendaryBonus() / 100
end

function modifier_bloodseeker_bloodrage_custom:GetModifierSpellAmplify_Percentage()
	return self.ability.spell_amp * (1 + self.ability:GetLegendaryBonus() / 100)
end

function modifier_bloodseeker_bloodrage_custom:GetModifierAttackSpeedBonus_Constant()
	return (self.ability.attack_speed + self.ability.talents.q1_speed) * (1 + self.ability:GetLegendaryBonus() / 100)
end

modifier_bloodseeker_bloodrage_custom_tracker = class(mod_hidden)
function modifier_bloodseeker_bloodrage_custom_tracker:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.bloodrage_ability = self.ability

	self.ability.attack_speed = self.ability:GetSpecialValueFor("attack_speed")
	self.ability.spell_amp = self.ability:GetSpecialValueFor("spell_amp")
	self.ability.damage_pct = self.ability:GetSpecialValueFor("damage_pct") / 100
	self.ability.duration = self.ability:GetSpecialValueFor("duration")

	self.ability.shard_damage = self.ability:GetSpecialValueFor("shard_damage") / 100
	self.ability.shard_heal = self.ability:GetSpecialValueFor("shard_heal") / 100
	self.ability.shard_max_creeps = self.ability:GetSpecialValueFor("shard_max_creeps")
	self.ability.shard_cd = self.ability:GetSpecialValueFor("shard_cd")

	self:InitShard()
end

function modifier_bloodseeker_bloodrage_custom_tracker:OnRefresh()
	self.ability.attack_speed = self.ability:GetSpecialValueFor("attack_speed")
	self.ability.spell_amp = self.ability:GetSpecialValueFor("spell_amp")
end

function modifier_bloodseeker_bloodrage_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_bloodseeker_bloodrage_custom_tracker:InitShard()
	if not IsServer() then
		return
	end
	if self.init_shard then
		return
	end
	if not self.parent:HasShard() then
		return
	end

	self.init_shard = true
	self.parent:AddProc(self, { land = true })
end

function modifier_bloodseeker_bloodrage_custom_tracker:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	return self.ability.talents.q4_damage_reduce * self.ability:GetLegendaryBonus(true) / 100
end

function modifier_bloodseeker_bloodrage_custom_tracker:GetModifierMagicalResistanceBonus()
	return self.parent:GetHealthPercent() <= self.ability.talents.h1_health
			and self.ability.talents.h1_magic * self.ability.talents.h1_bonus
		or self.ability.talents.h1_magic
end

function modifier_bloodseeker_bloodrage_custom_tracker:GetModifierStatusResistanceStacking()
	return self.parent:GetHealthPercent() <= self.ability.talents.h1_health
			and self.ability.talents.h1_status * self.ability.talents.h1_bonus
		or self.ability.talents.h1_status
end

function modifier_bloodseeker_bloodrage_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.q1_range
end

function modifier_bloodseeker_bloodrage_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if self.ability.talents.has_e7 == 1 then
		return
	end

	local max = self.ability.talents.q7_bonus
	local stack = math.floor(self.ability:GetLegendaryBonus())
	local mod = self.parent:FindModifierByName("modifier_bloodseeker_bloodrage_custom")
	local active = 0

	if mod then
		active = 1
		self:StartIntervalThink(0.2)
	else
		self:StartIntervalThink(-1)
	end

	self.parent:UpdateUIlong({
		max = max,
		stack = stack,
		override_stack = tostring(stack) .. "%",
		active = active,
		priority = 1,
		no_min = 1,
		style = "BloodseekerRage",
	})
end

function modifier_bloodseeker_bloodrage_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:UpdateUI()
end

function modifier_bloodseeker_bloodrage_custom_tracker:GetProcChance()
	return 100
end

function modifier_bloodseeker_bloodrage_custom_tracker:AttackProc(params, name)
	local target = params.target
	local mod = self.parent:HasModifier("modifier_bloodseeker_bloodrage_custom")

	if self.ability.talents.has_q3 == 1 and mod then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_bloodseeker_bloodrage_custom_blood",
			{ duration = self.ability.talents.q3_duration }
		)
	end

	if self.ability.talents.has_q2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_bloodseeker_bloodrage_custom_slow",
			{ duration = self.ability.talents.q2_duration }
		)
	end

	if mod and self.parent:HasShard() then
		self.ability:ProcShard(target)
	end
end

modifier_bloodseeker_bloodrage_custom_blood = class(mod_visible)
function modifier_bloodseeker_bloodrage_custom_blood:GetTexture()
	return "buffs/bloodseeker/bloodrage_3"
end
function modifier_bloodseeker_bloodrage_custom_blood:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = self.ability.talents.q3_interval
	self.damage = self.ability.talents.q3_damage_sec * self.interval
	self.heal = self.ability.talents.q3_heal

	self.table = {
		attacker = self.caster,
		victim = self.parent,
		damage_type = self.ability.talents.q3_damage_type,
		ability = self.ability,
	}

	for i = 1, 2 do
		self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
	end

	self:StartIntervalThink(self.interval)

	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_bloodseeker_bloodrage_custom_blood:OnRefresh()
	if not IsServer() then
		return
	end

	Timers:CreateTimer(self.ability.talents.q3_duration, function()
		if self and not self:IsNull() then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)

	self:IncrementStackCount()
end

function modifier_bloodseeker_bloodrage_custom_blood:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.table.damage = self.damage * self:GetStackCount()
	local damage = DoDamage(self.table, "modifier_bloodseeker_bloodrage_3")

	if not self.caster:IsAlive() then
		return
	end
	self.caster:GenericHeal(damage * self.heal, self.ability, true, "", "modifier_bloodseeker_bloodrage_3")
end

modifier_bloodseeker_bloodrage_custom_slow = class(mod_visible)
function modifier_bloodseeker_bloodrage_custom_slow:IsPurgable()
	return true
end
function modifier_bloodseeker_bloodrage_custom_slow:GetTexture()
	return "buffs/bloodseeker/bloodrage_2"
end
function modifier_bloodseeker_bloodrage_custom_slow:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q2_max
	self.move = self.ability.talents.q2_slow_stack
	self.damage_reduce = self.ability.talents.q2_damage_reduce_stack

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_bloodseeker_bloodrage_custom_slow:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("DOTA_Item.Maim")
	end
end

function modifier_bloodseeker_bloodrage_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_bloodseeker_bloodrage_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.move * self:GetStackCount()
end

function modifier_bloodseeker_bloodrage_custom_slow:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce * self:GetStackCount()
end

function modifier_bloodseeker_bloodrage_custom_slow:GetModifierSpellAmplify_Percentage()
	return self.damage_reduce * self:GetStackCount()
end

modifier_bloodseeker_bloodrage_custom_shard_cd = class(mod_cd)