--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_witch_doctor_voodoo_restoration_custom_tracker",
	"abilities/witch_doctor/witch_doctor_voodoo_restoration_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_voodoo_restoration_custom",
	"abilities/witch_doctor/witch_doctor_voodoo_restoration_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_voodoo_restoration_custom_aura",
	"abilities/witch_doctor/witch_doctor_voodoo_restoration_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_voodoo_restoration_custom_legendary",
	"abilities/witch_doctor/witch_doctor_voodoo_restoration_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_voodoo_restoration_custom_shield_cd",
	"abilities/witch_doctor/witch_doctor_voodoo_restoration_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_witch_doctor_hero_4"
)
LinkLuaModifier(
	"modifier_witch_doctor_voodoo_restoration_custom_hex_timer",
	"abilities/witch_doctor/witch_doctor_voodoo_restoration_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_voodoo_restoration_custom_hex",
	"abilities/witch_doctor/witch_doctor_voodoo_restoration_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_witch_doctor_voodoo_4"
)
LinkLuaModifier(
	"modifier_witch_doctor_voodoo_restoration_custom_armor_bonus",
	"abilities/witch_doctor/witch_doctor_voodoo_restoration_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_voodoo_restoration_custom_damage_cd",
	"abilities/witch_doctor/witch_doctor_voodoo_restoration_custom",
	LUA_MODIFIER_MOTION_NONE
)

witch_doctor_voodoo_restoration_custom = class({})
witch_doctor_voodoo_restoration_custom.talents = {}

function witch_doctor_voodoo_restoration_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_witchdoctor/witchdoctor_voodoo_restoration.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/voodoo_legendary_delay.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/voodoo_legendary_damage.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/voodoo_shield.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/voodoo_stack.vpcf", context)
	PrecacheResource("model", "models/items/hex/sheep_hex/sheep_hex.vmdl", context)
	PrecacheResource("particle", "particles/units/heroes/hero_lina/lina_supercharge_buff.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/voodoo_proc.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/item_sheepstick.vpcf", context)
end

function witch_doctor_voodoo_restoration_custom:CreateTalent()
	if self:GetToggleState() then
		self:ToggleAbility()
	end
	self.caster:AddNewModifier(self.caster, self, "modifier_witch_doctor_voodoo_restoration_custom", {})
end

function witch_doctor_voodoo_restoration_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_base = 0,
			w1_heal = 0,
			w1_damage = 0,

			w2_heal = 0,
			w2_slow = 0,

			has_w3 = 0,
			w3_health = 0,
			w3_base = 0,
			w3_damage = 0,
			w3_talent_cd = caster:GetTalentValue("modifier_witch_doctor_voodoo_3", "talent_cd", true),
			w3_chance = caster:GetTalentValue("modifier_witch_doctor_voodoo_3", "chance", true),
			w3_damage_type = caster:GetTalentValue("modifier_witch_doctor_voodoo_3", "damage_type", true),

			has_w4 = 0,
			w4_cdr = caster:GetTalentValue("modifier_witch_doctor_voodoo_4", "cdr", true),
			w4_duration = caster:GetTalentValue("modifier_witch_doctor_voodoo_4", "duration", true),
			w4_chance = caster:GetTalentValue("modifier_witch_doctor_voodoo_4", "chance", true),
			w4_timer_max = caster:GetTalentValue("modifier_witch_doctor_voodoo_4", "timer_max", true),
			w4_hex = caster:GetTalentValue("modifier_witch_doctor_voodoo_4", "hex", true),
			w4_magic = caster:GetTalentValue("modifier_witch_doctor_voodoo_4", "magic", true),
			w4_timer = caster:GetTalentValue("modifier_witch_doctor_voodoo_4", "timer", true),

			has_w7 = 0,
			w7_delay = caster:GetTalentValue("modifier_witch_doctor_voodoo_7", "delay", true),
			w7_mana_return = caster:GetTalentValue("modifier_witch_doctor_voodoo_7", "mana_return", true) / 100,
			w7_talent_cd = caster:GetTalentValue("modifier_witch_doctor_voodoo_7", "talent_cd", true),
			w7_radius = caster:GetTalentValue("modifier_witch_doctor_voodoo_7", "radius", true),
			w7_damage = caster:GetTalentValue("modifier_witch_doctor_voodoo_7", "damage", true) / 100,
			w7_passive = caster:GetTalentValue("modifier_witch_doctor_voodoo_7", "passive", true) / 100,
			w7_heal = caster:GetTalentValue("modifier_witch_doctor_voodoo_7", "heal", true) / 100,
			w7_mana = caster:GetTalentValue("modifier_witch_doctor_voodoo_7", "mana", true) / 100,

			has_h2 = 0,
			h2_armor = 0,
			h2_move = 0,
			h2_move_alt = 0,
			h2_armor_alt = 0,
			h2_duration = caster:GetTalentValue("modifier_witch_doctor_hero_2", "duration", true),
			h2_bonus = caster:GetTalentValue("modifier_witch_doctor_hero_2", "bonus", true),

			h3_str = 0,
			h3_mana = 0,

			has_h4 = 0,
			h4_base = caster:GetTalentValue("modifier_witch_doctor_hero_4", "base", true),
			h4_status = caster:GetTalentValue("modifier_witch_doctor_hero_4", "status", true),
			h4_talent_cd = caster:GetTalentValue("modifier_witch_doctor_hero_4", "talent_cd", true),
			h4_health = caster:GetTalentValue("modifier_witch_doctor_hero_4", "health", true),
			h4_mana = caster:GetTalentValue("modifier_witch_doctor_hero_4", "mana", true) / 100,
			h4_shield = caster:GetTalentValue("modifier_witch_doctor_hero_4", "shield", true) / 100,
			h4_duration = caster:GetTalentValue("modifier_witch_doctor_hero_4", "duration", true),

			e2_radius_voodoo = 0,

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_witch_doctor_voodoo_1") then
		self.talents.w1_base = caster:GetTalentValue("modifier_witch_doctor_voodoo_1", "base")
		self.talents.w1_heal = caster:GetTalentValue("modifier_witch_doctor_voodoo_1", "heal") / 100
		self.talents.w1_damage = caster:GetTalentValue("modifier_witch_doctor_voodoo_1", "damage") / 100
	end

	if caster:HasTalent("modifier_witch_doctor_voodoo_2") then
		self.talents.w2_heal = caster:GetTalentValue("modifier_witch_doctor_voodoo_2", "heal") / 100
		self.talents.w2_slow = caster:GetTalentValue("modifier_witch_doctor_voodoo_2", "slow")
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_witch_doctor_voodoo_2", type = 1, value = self.talents.w2_heal }
		)
	end

	if caster:HasTalent("modifier_witch_doctor_voodoo_3") then
		self.talents.has_w3 = 1
		self.talents.w3_health = caster:GetTalentValue("modifier_witch_doctor_voodoo_3", "health")
		self.talents.w3_base = caster:GetTalentValue("modifier_witch_doctor_voodoo_3", "base")
		self.talents.w3_damage = caster:GetTalentValue("modifier_witch_doctor_voodoo_3", "damage") / 100
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_witch_doctor_voodoo_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_witch_doctor_voodoo_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_witch_doctor_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_armor = caster:GetTalentValue("modifier_witch_doctor_hero_2", "armor")
		self.talents.h2_move = caster:GetTalentValue("modifier_witch_doctor_hero_2", "move")
		self.talents.h2_move_alt = caster:GetTalentValue("modifier_witch_doctor_hero_2", "move_alt")
		self.talents.h2_armor_alt = caster:GetTalentValue("modifier_witch_doctor_hero_2", "armor_alt")
	end

	if caster:HasTalent("modifier_witch_doctor_hero_3") then
		self.talents.h3_str = caster:GetTalentValue("modifier_witch_doctor_hero_3", "str")
		self.talents.h3_mana = caster:GetTalentValue("modifier_witch_doctor_hero_3", "mana") / 100
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_witch_doctor_hero_3", heal = false, proc = "LifestealMana", value = self.talents.h3_mana }
		)
	end

	if caster:HasTalent("modifier_witch_doctor_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_witch_doctor_maledict_2") then
		self.talents.e2_radius_voodoo = caster:GetTalentValue("modifier_witch_doctor_maledict_2", "radius_voodoo")
		if
			IsServer()
			and name == "modifier_witch_doctor_maledict_2"
			and self.caster:HasModifier("modifier_witch_doctor_voodoo_restoration_custom")
		then
			self.caster:RemoveModifierByName("modifier_witch_doctor_voodoo_restoration_custom")
			self.caster:AddNewModifier(self.caster, self, "modifier_witch_doctor_voodoo_restoration_custom", {})
		end
	end

	if caster:HasTalent("modifier_witch_doctor_maledict_7") then
		self.talents.has_e7 = 1
	end
end

function witch_doctor_voodoo_restoration_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_witch_doctor_voodoo_restoration_custom_tracker"
end

function witch_doctor_voodoo_restoration_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "witch_doctor_voodoo_restoration", self)
end

function witch_doctor_voodoo_restoration_custom:GetBehavior()
	local base = self.talents.has_w7 == 1 and DOTA_ABILITY_BEHAVIOR_NO_TARGET or DOTA_ABILITY_BEHAVIOR_TOGGLE
	return base + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL
end

function witch_doctor_voodoo_restoration_custom:GetCooldown()
	if self.talents.has_w7 ~= 1 then
		return 0
	end
	return self.talents.w7_talent_cd or 0
end

function witch_doctor_voodoo_restoration_custom:GetManaCost(level)
	if self.talents.has_w7 == 1 then
		return self.caster:GetMaxMana() * (self.talents.w7_mana or 0)
	end
	return (self.mana_per_second or 0) + (self.mana_pct or 0) * self.caster:GetMaxMana()
end

function witch_doctor_voodoo_restoration_custom:GetCastRange(vector, hTarget)
	return (self.radius or 0) + (self.talents.e2_radius_voodoo or 0) - self.caster:GetCastRangeBonus()
end

function witch_doctor_voodoo_restoration_custom:GetDamage(passive)
	local result = self.damage + self.talents.w1_base + self.caster:GetMaxHealth() * self.talents.w1_damage
	if passive and self.talents.has_w7 == 1 then
		result = result * (1 + self.talents.w7_passive)
	end
	return result
end

function witch_doctor_voodoo_restoration_custom:GetHeal(passive)
	local result = self.heal + self.talents.w1_base + self.caster:GetMaxHealth() * self.talents.w1_heal
	if passive and self.talents.has_w7 == 1 then
		result = result * (1 + self.talents.w7_passive)
	end
	return result
end

function witch_doctor_voodoo_restoration_custom:OnSpellStart()
	self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_3_END)
	self.caster:EmitSound("WD.Voodoo_legendary_cast")
	self.caster:EmitSound("WD.Voodoo_legendary_cast2")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_witch_doctor_voodoo_restoration_custom_legendary",
		{ duration = self.talents.w7_delay }
	)
end

function witch_doctor_voodoo_restoration_custom:OnToggle()
	if self.talents.has_w7 == 1 then
		return
	end

	local mod = self.caster:FindModifierByName("modifier_witch_doctor_voodoo_restoration_custom")

	if mod and not self:GetToggleState() then
		mod:Destroy()
	elseif not mod and self:GetToggleState() then
		self.caster:AddNewModifier(self.caster, self, "modifier_witch_doctor_voodoo_restoration_custom", {})
	end
end

function witch_doctor_voodoo_restoration_custom:ProcDamage(target, is_proc)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end

	if not is_proc then
		if target:HasModifier("modifier_witch_doctor_voodoo_restoration_custom_damage_cd") then
			return
		end
		if not RollPseudoRandomPercentage(self.talents.w3_chance, 6899, self.caster) then
			return
		end
	end

	local damage = self.talents.w3_base + self.talents.w3_damage * self.caster:GetMaxHealth()
	local real_damage = DoDamage(
		{
			victim = target,
			attacker = self.caster,
			ability = self,
			damage_type = self.talents.w3_damage_type,
			damage = damage,
		},
		"modifier_witch_doctor_voodoo_3"
	)
	target:SendNumber(4, real_damage)
	target:EmitSound("WD.Voodoo_damage")
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_witch_doctor_voodoo_restoration_custom_damage_cd",
		{ duration = self.talents.w3_talent_cd }
	)

	local hit_effect =
		ParticleManager:CreateParticle("particles/witch_doctor/voodoo_proc.vpcf", PATTACH_CUSTOMORIGIN, target)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)
end

modifier_witch_doctor_voodoo_restoration_custom = class(mod_hidden)
function modifier_witch_doctor_voodoo_restoration_custom:RemoveOnDeath()
	return false
end
function modifier_witch_doctor_voodoo_restoration_custom:IsAura()
	return true
end
function modifier_witch_doctor_voodoo_restoration_custom:GetAuraDuration()
	return 0.2
end
function modifier_witch_doctor_voodoo_restoration_custom:GetAuraRadius()
	return self.radius
end
function modifier_witch_doctor_voodoo_restoration_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_BOTH
end
function modifier_witch_doctor_voodoo_restoration_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_witch_doctor_voodoo_restoration_custom:GetModifierAura()
	return "modifier_witch_doctor_voodoo_restoration_custom_aura"
end
function modifier_witch_doctor_voodoo_restoration_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.interval = self.ability.heal_interval
	self.radius = self.ability.radius + self.ability.talents.e2_radius_voodoo

	if not IsServer() then
		return
	end
	self.health_count = 0

	local visual_radius = self.radius * 0.9

	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_witchdoctor/witchdoctor_voodoo_restoration.vpcf",
		self
	)

	local mainParticle = ParticleManager:CreateParticle(pfx_name, PATTACH_POINT_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		mainParticle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(mainParticle, 1, Vector(visual_radius, visual_radius, visual_radius))
	ParticleManager:SetParticleControlEnt(
		mainParticle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_staff",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(mainParticle, false, false, -1, true, false)

	self.parent:EmitSound("Hero_WitchDoctor.Voodoo_Restoration")
	self.parent:EmitSound("Hero_WitchDoctor.Voodoo_Restoration.Loop")

	self:StartIntervalThink(self.interval)
end

function modifier_witch_doctor_voodoo_restoration_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	if
		self.ability.talents.has_h4 == 1
		and self.parent:GetHealthPercent() <= self.ability.talents.h4_health
		and not self.parent:PassivesDisabled()
		and not IsValid(self.shield_mod)
		and not self.parent:HasModifier("modifier_witch_doctor_voodoo_restoration_custom_shield_cd")
	then
		self.shield_mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield", {
			max_shield = self.ability.talents.h4_base + self.ability.talents.h4_shield * self.parent:GetMaxHealth(),
			start_full = 1,
			duration = self.ability.talents.h4_duration,
			shield_talent = "modifier_witch_doctor_hero_4",
		})

		if self.shield_mod then
			self.parent:EmitSound("WD.Voodoo_shield")

			local cast_effect = ParticleManager:CreateParticle(
				"particles/witch_doctor/voodoo_shield.vpcf",
				PATTACH_CUSTOMORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				cast_effect,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			self.shield_mod:AddParticle(cast_effect, false, false, -1, false, false)

			self.shield_mod:SetHitFunction(function(damage)
				local mana = damage * self.ability.talents.h4_mana
				self.parent:GiveMana(mana)
			end)

			self.shield_mod:SetEndFunction(function(damage)
				self.parent:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_witch_doctor_voodoo_restoration_custom_shield_cd",
					{ duration = self.ability.talents.h4_talent_cd }
				)
			end)
		end
	end

	if self.ability.talents.has_w7 == 1 then
		return
	end
	local mana = self.ability:GetEffectiveManaCost(self.ability:GetLevel()) * self.interval

	if self.parent:GetMana() < mana then
		if self.ability:GetToggleState() then
			self.ability:ToggleAbility()
		end
		return
	end

	self.parent:Script_ReduceMana(mana, self.ability)
end

function modifier_witch_doctor_voodoo_restoration_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
	}
end

function modifier_witch_doctor_voodoo_restoration_custom:GetModifierMoveSpeedBonus_Constant()
	if self.ability.talents.has_w7 == 1 then
		return self.ability.talents.h2_move_alt
			* (
				self.parent:HasModifier("modifier_witch_doctor_voodoo_restoration_custom_armor_bonus")
					and self.ability.talents.h2_bonus
				or 1
			)
	end
	return self.ability.talents.h2_move
end

function modifier_witch_doctor_voodoo_restoration_custom:GetModifierPhysicalArmorBonus()
	if self.ability.talents.has_w7 == 1 then
		return self.ability.talents.h2_armor_alt
			* (
				self.parent:HasModifier("modifier_witch_doctor_voodoo_restoration_custom_armor_bonus")
					and self.ability.talents.h2_bonus
				or 1
			)
	end
	return self.ability.talents.h2_armor
end

function modifier_witch_doctor_voodoo_restoration_custom:OnDestroy()
	if not IsServer() then
		return
	end
	if IsValid(self.shield_mod) then
		self.shield_mod:Destroy()
	end
	self.parent:EmitSound("Hero_WitchDoctor.Voodoo_Restoration.Off")
	self.parent:StopSound("Hero_WitchDoctor.Voodoo_Restoration.Loop")
end

modifier_witch_doctor_voodoo_restoration_custom_aura = class(mod_visible)
function modifier_witch_doctor_voodoo_restoration_custom_aura:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_witch_doctor_voodoo_restoration_custom_aura:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = self.ability.heal_interval
	self.is_enemy = self.parent:GetTeamNumber() ~= self.caster:GetTeamNumber()

	if not IsServer() then
		return
	end
	self.damageTable =
		{ attacker = self.caster, victim = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }
	self:StartIntervalThink(self.interval)
end

function modifier_witch_doctor_voodoo_restoration_custom_aura:GetStatusEffectName()
	if not self.is_enemy then
		return
	end
	return "particles/status_fx/status_effect_enchantress_shard_debuff.vpcf"
end

function modifier_witch_doctor_voodoo_restoration_custom_aura:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.is_enemy then
		local damage = self.ability:GetDamage(true, self.parent) * self.interval
		self.damageTable.damage = damage
		DoDamage(self.damageTable)
		self.ability:ProcDamage(self.parent)

		if
			self.ability.talents.has_w4 == 1
			and self.parent:IsHero()
			and not self.parent:HasModifier("modifier_witch_doctor_voodoo_restoration_custom_hex")
		then
			self.parent:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_witch_doctor_voodoo_restoration_custom_hex_timer",
				{ interval = self.interval, duration = self.ability.talents.w4_duration }
			)
		end
	else
		local heal = self.ability:GetHeal(true) * self.interval
		local real_heal = self.parent:GenericHeal(heal, self.ability, false, "")

		if self.parent:GetQuest() == "WitchDoctor.Quest_6" and real_heal > 0 then
			self.parent:UpdateQuest(real_heal)
		end
	end
end

function modifier_witch_doctor_voodoo_restoration_custom_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_witch_doctor_voodoo_restoration_custom_aura:GetModifierMoveSpeedBonus_Percentage()
	if not self.is_enemy then
		return
	end
	if self.parent:HasModifier("modifier_witch_doctor_maledict_custom") then
		return
	end
	return self.ability.talents.w2_slow
end

modifier_witch_doctor_voodoo_restoration_custom_tracker = class(mod_hidden)
function modifier_witch_doctor_voodoo_restoration_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.voodoo_ability = self.ability

	self.ability.mana_per_second = self.ability:GetSpecialValueFor("mana_per_second")
	self.ability.mana_pct = self.ability:GetSpecialValueFor("mana_pct") / 100
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.heal = self.ability:GetSpecialValueFor("heal")
	self.ability.heal_interval = self.ability:GetSpecialValueFor("heal_interval")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_witch_doctor_voodoo_restoration_custom_tracker:OnRefresh()
	self.ability.mana_per_second = self.ability:GetSpecialValueFor("mana_per_second")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.heal = self.ability:GetSpecialValueFor("heal")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")

	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end
	self.parent:RemoveModifierByName("modifier_witch_doctor_voodoo_restoration_custom")
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_witch_doctor_voodoo_restoration_custom", {})
end

function modifier_witch_doctor_voodoo_restoration_custom_tracker:LifestealMana(params, mana)
	self.parent:GiveMana(mana)
end

function modifier_witch_doctor_voodoo_restoration_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_witch_doctor_voodoo_restoration_custom_tracker:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_status
end

function modifier_witch_doctor_voodoo_restoration_custom_tracker:GetModifierExtraHealthPercentage()
	return self.ability.talents.w3_health
end

function modifier_witch_doctor_voodoo_restoration_custom_tracker:GetModifierBonusStats_Strength()
	return self.ability.talents.h3_str
end

function modifier_witch_doctor_voodoo_restoration_custom_tracker:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_magic
end

function modifier_witch_doctor_voodoo_restoration_custom_tracker:GetModifierPercentageCooldown()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_cdr
end

modifier_witch_doctor_voodoo_restoration_custom_legendary = class(mod_hidden)
function modifier_witch_doctor_voodoo_restoration_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.radius = self.ability.talents.w7_radius + self.ability.talents.e2_radius_voodoo
	self.mana = self.ability.talents.w7_mana_return * self.ability:GetEffectiveManaCost(self.ability:GetLevel())

	self.effect_cast = ParticleManager:CreateParticle(
		"particles/witch_doctor/voodoo_legendary_delay.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(
		self.effect_cast,
		1,
		Vector(self.radius, 0, -self.radius / self:GetRemainingTime())
	)
	ParticleManager:SetParticleControl(self.effect_cast, 2, Vector(self:GetRemainingTime(), 0, 0))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)
end

function modifier_witch_doctor_voodoo_restoration_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	local damageTable = { attacker = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	local targets = self.parent:FindTargets(self.radius)
	for _, target in pairs(targets) do
		local damage = self.ability:GetDamage(false, target) * self.ability.talents.w7_damage
		damageTable.victim = target
		damageTable.damage = damage
		DoDamage(damageTable, "modifier_witch_doctor_voodoo_7")
		self.ability:ProcDamage(target, true)
	end

	local particle = ParticleManager:CreateParticle(
		"particles/witch_doctor/voodoo_legendary_damage.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 1, 1))
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:EmitSound("WD.Voodoo_legendary_end")
	self.parent:EmitSound("WD.Voodoo_legendary_end2")

	if #targets > 0 then
		if self.ability.talents.has_h2 == 1 then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_witch_doctor_voodoo_restoration_custom_armor_bonus",
				{ duration = self.ability.talents.h2_duration }
			)
		end

		local heal = self.ability:GetHeal() * self.ability.talents.w7_heal
		self.parent:GiveMana(self.mana)
		local real_heal = self.parent:GenericHeal(heal, self.ability, false, false, "modifier_witch_doctor_voodoo_7")

		if self.parent:GetQuest() == "WitchDoctor.Quest_6" and real_heal > 0 then
			self.parent:UpdateQuest(real_heal)
		end
	end
end

modifier_witch_doctor_voodoo_restoration_custom_shield_cd = class(mod_cd)
function modifier_witch_doctor_voodoo_restoration_custom_shield_cd:GetTexture()
	return "buffs/witch_doctor/hero_4"
end

modifier_witch_doctor_voodoo_restoration_custom_hex_timer = class(mod_hidden)
function modifier_witch_doctor_voodoo_restoration_custom_hex_timer:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.min = self.ability.talents.w4_timer
	self.max = self.ability.talents.w4_timer_max
	self.chance = self.ability.talents.w4_chance

	if not IsServer() then
		return
	end
	self.count = 0
	self:OnRefresh(table)
end

function modifier_witch_doctor_voodoo_restoration_custom_hex_timer:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self.parent:IsDebuffImmune() then
		return
	end

	self.count = self.count + table.interval
	if self.count < 0.98 then
		return
	end
	self.count = 0
	self:IncrementStackCount()

	if self.ability.talents.has_e7 == 0 then
		if not self.particle then
			self.particle = self.parent:GenericParticle("particles/witch_doctor/voodoo_stack.vpcf", self, true)
		end
		if self.particle then
			ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
		end
	end

	if self:GetStackCount() < self.min then
		return
	end
	if self:GetStackCount() >= self.max or RollPseudoRandomPercentage(self.chance, 7914, self.parent) then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_witch_doctor_voodoo_restoration_custom_hex",
			{ duration = (1 - self.parent:GetStatusResistance()) * self.ability.talents.w4_hex }
		)
		self:Destroy()
	end
end

modifier_witch_doctor_voodoo_restoration_custom_hex = class(mod_hidden)
function modifier_witch_doctor_voodoo_restoration_custom_hex:OnCreated(data)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = -100

	if not IsServer() then
		return
	end
	self.parent:NoDraw(self, true)

	self.parent:EmitSound("WD.Voodoo_hex")
	self.parent:EmitSound("WD.Voodoo_hex2")
	self.parent:StartGesture(ACT_DOTA_SPAWN)
	local mainParticle =
		ParticleManager:CreateParticle("particles/items_fx/item_sheepstick.vpcf", PATTACH_POINT_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		mainParticle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(mainParticle)
end

function modifier_witch_doctor_voodoo_restoration_custom_hex:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:EndNoDraw(self)
end

function modifier_witch_doctor_voodoo_restoration_custom_hex:CheckState()
	return {
		[MODIFIER_STATE_HEXED] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_MUTED] = true,
	}
end

function modifier_witch_doctor_voodoo_restoration_custom_hex:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_MODEL_CHANGE,
	}
end

function modifier_witch_doctor_voodoo_restoration_custom_hex:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_witch_doctor_voodoo_restoration_custom_hex:GetModifierModelChange()
	return "models/items/hex/sheep_hex/sheep_hex.vmdl"
end

modifier_witch_doctor_voodoo_restoration_custom_armor_bonus = class(mod_hidden)
function modifier_witch_doctor_voodoo_restoration_custom_armor_bonus:OnCreated()
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

modifier_witch_doctor_voodoo_restoration_custom_damage_cd = class(mod_hidden)