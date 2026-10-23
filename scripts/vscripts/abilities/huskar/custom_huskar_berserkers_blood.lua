--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_huskar_berserkers_blood",
	"abilities/huskar/custom_huskar_berserkers_blood",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_huskar_berserkers_blood_legendary_attack",
	"abilities/huskar/custom_huskar_berserkers_blood",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_huskar_passive_7"
)
LinkLuaModifier(
	"modifier_custom_huskar_berserkers_blood_bonus",
	"abilities/huskar/custom_huskar_berserkers_blood",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_huskar_passive_1", "modifier_huskar_passive_3", "modifier_huskar_passive_4" }
)

custom_huskar_berserkers_blood = class({})
custom_huskar_berserkers_blood.talents = {}

function custom_huskar_berserkers_blood:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_huskar/huskar_berserkers_blood.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_lowhp.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_active.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_grave.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_oracle/oracle_false_promise_heal.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/sange_maim.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf", context)
end

function custom_huskar_berserkers_blood:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage = 0,
			e1_health = caster:GetTalentValue("modifier_huskar_passive_1", "health", true),
			e1_bonus = caster:GetTalentValue("modifier_huskar_passive_1", "bonus", true),
			e1_duration = caster:GetTalentValue("modifier_huskar_passive_1", "duration", true),

			e2_heal = 0,
			e2_regen = 0,

			has_e3 = 0,
			e3_crit = 0,
			e3_bva = 0,
			e3_health = caster:GetTalentValue("modifier_huskar_passive_3", "health", true),
			e3_chance = caster:GetTalentValue("modifier_huskar_passive_3", "chance", true),
			e3_duration = caster:GetTalentValue("modifier_huskar_passive_3", "duration", true),

			has_e4 = 0,
			e4_duration = caster:GetTalentValue("modifier_huskar_passive_4", "duration", true),
			e4_health = caster:GetTalentValue("modifier_huskar_passive_4", "health", true),
			e4_damage_reduce = caster:GetTalentValue("modifier_huskar_passive_4", "damage_reduce", true),
			e4_movespeed = caster:GetTalentValue("modifier_huskar_passive_4", "movespeed", true),
			e4_slow_resist = caster:GetTalentValue("modifier_huskar_passive_4", "slow_resist", true),

			has_e7 = 0,
			e7_talent_cd = caster:GetTalentValue("modifier_huskar_passive_7", "talent_cd", true),
			e7_heal = caster:GetTalentValue("modifier_huskar_passive_7", "heal", true) / 100,
			e7_cost = caster:GetTalentValue("modifier_huskar_passive_7", "cost", true) / 100,
			e7_duration = caster:GetTalentValue("modifier_huskar_passive_7", "duration", true),
			e7_damage = caster:GetTalentValue("modifier_huskar_passive_7", "damage", true),

			has_h2 = 0,
			h2_magic = 0,
			h2_armor = 0,

			has_h5 = 0,
			h5_mana = caster:GetTalentValue("modifier_huskar_hero_5", "mana", true) / 100,
			h5_health = caster:GetTalentValue("modifier_huskar_hero_5", "health", true),
		}
	end

	if caster:HasTalent("modifier_huskar_passive_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_huskar_passive_1", "damage")
		if IsServer() then
			self.tracker:StartIntervalThink(self.tracker.interval)
		end
	end

	if caster:HasTalent("modifier_huskar_passive_2") then
		self.talents.e2_heal = caster:GetTalentValue("modifier_huskar_passive_2", "heal") / 100
		self.talents.e2_regen = caster:GetTalentValue("modifier_huskar_passive_2", "regen") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_huskar_passive_2", type = 2, value = self.talents.e2_heal }
		)
	end

	if caster:HasTalent("modifier_huskar_passive_3") then
		self.talents.has_e3 = 1
		self.talents.e3_crit = caster:GetTalentValue("modifier_huskar_passive_3", "crit")
		self.talents.e3_bva = caster:GetTalentValue("modifier_huskar_passive_3", "bva")
		if IsServer() then
			self.tracker:StartIntervalThink(self.tracker.interval)
		end
	end

	if caster:HasTalent("modifier_huskar_passive_4") then
		self.talents.has_e4 = 1
		if IsServer() then
			self.tracker:StartIntervalThink(self.tracker.interval)
		end
	end

	if caster:HasTalent("modifier_huskar_passive_7") then
		self.talents.has_e7 = 1
		caster:AddLifesteal(
			self.tracker,
			{
				name = "modifier_huskar_passive_7",
				type = 2,
				heal = false,
				proc = "LifestealStack",
				value = self.talents.e7_heal,
			}
		)
	end

	if caster:HasTalent("modifier_huskar_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_magic = caster:GetTalentValue("modifier_huskar_hero_2", "magic")
		self.talents.h2_armor = caster:GetTalentValue("modifier_huskar_hero_2", "armor")
	end

	if caster:HasTalent("modifier_huskar_hero_5") then
		self.talents.has_h5 = 1
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_huskar_hero_5", heal = false, proc = "LifestealMana", value = self.talents.h5_mana }
		)
	end
end

function custom_huskar_berserkers_blood:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "huskar_berserkers_blood", self)
end

function custom_huskar_berserkers_blood:GetIntrinsicModifierName()
	return "modifier_custom_huskar_berserkers_blood"
end

function custom_huskar_berserkers_blood:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function custom_huskar_berserkers_blood:GetCooldown(iLevel)
	if self.talents.has_e7 ~= 1 then
		return 0
	end
	return self.talents.e7_talent_cd
end

function custom_huskar_berserkers_blood:GetHealthCost()
	if IsServer() then
		return
	end
	if self.talents.has_e7 ~= 1 then
		return
	end
	return self.talents.e7_cost * self.caster:GetHealth()
end

function custom_huskar_berserkers_blood:OnSpellStart()
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_huskar_berserkers_blood_legendary_attack",
		{ duration = self.talents.e7_duration }
	)
end

modifier_custom_huskar_berserkers_blood = class(mod_hidden)
function modifier_custom_huskar_berserkers_blood:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self

	self.interval = 0.1
	self.ability:UpdateTalents()

	self.ability.maximum_attack_speed = self.ability:GetSpecialValueFor("maximum_attack_speed")
	self.ability.maximum_health_regen = self.ability:GetSpecialValueFor("maximum_health_regen") / 100
	self.ability.hp_threshold_max = self.ability:GetSpecialValueFor("hp_threshold_max")
	self.max_size = 30

	if not IsServer() then
		return
	end

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_huskar/huskar_berserkers_blood.vpcf",
		self
	)
	self.particle = self.parent:GenericParticle(particle_name, self)
end

function modifier_custom_huskar_berserkers_blood:OnRefresh()
	self.ability.maximum_attack_speed = self.ability:GetSpecialValueFor("maximum_attack_speed")
	self.ability.maximum_health_regen = self.ability:GetSpecialValueFor("maximum_health_regen") / 100
end

function modifier_custom_huskar_berserkers_blood:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	if self.parent:GetHealthPercent() <= self.ability.talents.e1_health then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_huskar_berserkers_blood_bonus",
			{ duration = self.ability.talents.e1_duration }
		)
	end
end

function modifier_custom_huskar_berserkers_blood:LifestealMana(params, mana)
	self.parent:GiveMana(mana)
end

function modifier_custom_huskar_berserkers_blood:LifestealStack(params, stack)
	local mod = self.parent:FindModifierByName("modifier_custom_huskar_berserkers_blood_legendary_attack")
	if not mod then
		return
	end
	mod:SetStackCount(mod:GetStackCount() + stack)
end

function modifier_custom_huskar_berserkers_blood:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_custom_huskar_berserkers_blood:GetHealthK()
	if self.parent:PassivesDisabled() then
		return 0
	end
	local health = self.ability.hp_threshold_max
	if self.ability.talents.has_h5 == 1 then
		health = health + self.ability.talents.h5_health
	end
	local k = math.min(1, 1 - (self.parent:GetHealthPercent() - health) / (100 - health))
	return (k * k)
end

function modifier_custom_huskar_berserkers_blood:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.e1_damage
		* (
			self.parent:HasModifier("modifier_custom_huskar_berserkers_blood_bonus")
				and self.ability.talents.e1_bonus
			or 1
		)
end

function modifier_custom_huskar_berserkers_blood:GetModifierPhysicalArmorBonus()
	if self.ability.talents.has_h2 == 0 then
		return
	end
	return self.ability.talents.h2_armor * self:GetHealthK()
end

function modifier_custom_huskar_berserkers_blood:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_h2 == 0 then
		return
	end
	return self.ability.talents.h2_magic * self:GetHealthK()
end

function modifier_custom_huskar_berserkers_blood:GetModifierAttackSpeedBonus_Constant()
	return self.ability.maximum_attack_speed * self:GetHealthK()
end

function modifier_custom_huskar_berserkers_blood:GetModifierConstantHealthRegen()
	return self.parent:GetStrength()
		* (self.ability.talents.e2_regen + self.ability.maximum_health_regen)
		* self:GetHealthK()
end

function modifier_custom_huskar_berserkers_blood:GetModifierModelScale()
	if not IsServer() then
		return
	end
	local pct = self:GetHealthK()
	ParticleManager:SetParticleControl(self.particle, 1, Vector(pct * 100, 0, 0))
	self.parent:SetRenderColor(255, 255 * (1 - pct), 255 * (1 - pct))
	return self.max_size * pct
end

function modifier_custom_huskar_berserkers_blood:GetActivityTranslationModifiers()
	return "berserkers_blood"
end

function modifier_custom_huskar_berserkers_blood:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:SetRenderColor(255, 255, 255)
end

modifier_custom_huskar_berserkers_blood_legendary_attack = class(mod_visible)
function modifier_custom_huskar_berserkers_blood_legendary_attack:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	local cost = self.parent:GetHealth() * self.ability.talents.e7_cost
	if IsServer() then
		self.parent:SetHealth(math.max(1, self.parent:GetHealth() - cost))
	end

	self.damage = math.floor(
		self.ability.talents.e7_damage
			* (1 - self.parent:GetHealthPercent() / 100)
			* (1 - self.parent:GetHealthPercent() / 100)
	)

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Huskar.Passive_Active")
	self.parent:EmitSound("Huskar.Passive_Active_vo")

	self.time = self:GetRemainingTime()

	self.effect_cast =
		ParticleManager:CreateParticle("particles/huskar/huskar_active.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(self.time, 0, 0))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)
	self.ability:EndCd()

	self.interval = 0.1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_custom_huskar_berserkers_blood_legendary_attack:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({
		max_time = self.time,
		time = self:GetRemainingTime(),
		stack = "+" .. self.damage .. "%",
		priority = 3,
		style = "HuskarBlood",
	})
end

function modifier_custom_huskar_berserkers_blood_legendary_attack:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 3, style = "HuskarBlood" })

	if self:GetStackCount() <= 0 then
		return
	end
	self.parent:EmitSound("Huskar.Passive_Active_end")
	self.parent:GenericHeal(
		self:GetStackCount(),
		self.ability,
		false,
		"particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf",
		"modifier_huskar_passive_7"
	)
end

function modifier_custom_huskar_berserkers_blood_legendary_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_custom_huskar_berserkers_blood_legendary_attack:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

function modifier_custom_huskar_berserkers_blood_legendary_attack:GetModifierDamageOutgoing_Percentage()
	if IsServer() then
		return
	end
	return self.damage
end

modifier_custom_huskar_berserkers_blood_bonus = class(mod_visible)
function modifier_custom_huskar_berserkers_blood_bonus:GetTexture()
	return "buffs/huskar/berserkers_blood_3"
end
function modifier_custom_huskar_berserkers_blood_bonus:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bva = self.parent:GetBaseAttackTime(false) + self.ability.talents.e3_bva
	self.crit = self.ability.talents.e3_crit

	if not IsServer() then
		return
	end

	self.records = {}
	if self.ability.talents.has_e3 == 1 then
		self.parent:AddProc(self, { land = true })
		self.parent:AddRecordDestroyEvent(self, true)
	end

	self.parent:EmitSound("Huskar.Passive_LowHp")
	self.parent:GenericParticle("particles/huskar/huskar_lowhp.vpcf", self)
end

function modifier_custom_huskar_berserkers_blood_bonus:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_custom_huskar_berserkers_blood_bonus:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_damage_reduce
end

function modifier_custom_huskar_berserkers_blood_bonus:GetModifierMoveSpeedBonus_Percentage()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_movespeed
end

function modifier_custom_huskar_berserkers_blood_bonus:GetModifierSlowResistance_Stacking()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_slow_resist
end

function modifier_custom_huskar_berserkers_blood_bonus:GetModifierBaseAttackTimeConstant()
	if self.ability.talents.has_e3 == 0 then
		return
	end
	return self.bva
end

function modifier_custom_huskar_berserkers_blood_bonus:GetCritChance()
	if self.ability.talents.has_e3 == 0 then
		return 0
	end
	return self.ability.talents.e3_chance
end

function modifier_custom_huskar_berserkers_blood_bonus:GetCritDamage()
	return self.crit
end

function modifier_custom_huskar_berserkers_blood_bonus:GetModifierPreAttack_CriticalStrike(params)
	if self.ability.talents.has_e3 == 0 then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if not RollPseudoRandomPercentage(self:GetCritChance(), 9141, self.parent) then
		return
	end
	self.records[params.record] = true
	return self:GetCritDamage()
end

function modifier_custom_huskar_berserkers_blood_bonus:GetProcChance(params)
	return self.records[params.record] and 100 or 0
end

function modifier_custom_huskar_berserkers_blood_bonus:AttackProc(params)
	params.target:EmitSound("DOTA_Item.Daedelus.Crit")
end

function modifier_custom_huskar_berserkers_blood_bonus:RecordDestroyEvent(params)
	self.records[params.record] = nil
end