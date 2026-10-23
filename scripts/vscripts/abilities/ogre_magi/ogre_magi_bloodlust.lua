--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_buff",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_tracker",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_incoming",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ogremagi_hero_6"
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_quest",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_charge",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_str",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ogremagi_bloodlust_3"
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_armor",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE
)

LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_legendary",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ogremagi_bloodlust_7"
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_legendary_reroll",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_legendary_buff",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_legendary_1",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_ogremagi_bloodlust_7" }
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_legendary_2",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_ogremagi_bloodlust_7" }
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_legendary_3",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_ogremagi_bloodlust_7" }
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_legendary_4",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_ogremagi_bloodlust_7" }
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_legendary_slow",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_bloodlust_custom_legendary_move",
	"abilities/ogre_magi/ogre_magi_bloodlust",
	LUA_MODIFIER_MOTION_NONE
)

ogre_magi_bloodlust_custom = class({})
ogre_magi_bloodlust_custom.talents = {}
ogre_magi_bloodlust_custom.legendary_buffs = {
	["modifier_ogre_magi_bloodlust_custom_legendary_1"] = "particles/bristleback/brist_lowhp_.vpcf",
	["modifier_ogre_magi_bloodlust_custom_legendary_2"] = "particles/patrol/rare_orb_patrol.vpcf",
	["modifier_ogre_magi_bloodlust_custom_legendary_3"] = "particles/generic/patrol_refresh.vpcf",
	["modifier_ogre_magi_bloodlust_custom_legendary_4"] = "particles/legion_commander/lc_odd_proc_.vpcf",
}

function ogre_magi_bloodlust_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sven/sven_spell_great_cleave.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_buff.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/rune_arcane_owner.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/ogre_dd.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_primal_beast/primal_beast_onslaught_impact.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/blood_charge.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/invoker/invoker_ti7/status_effect_alacrity_ti7.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/vendetta_bash.vpcf", context)
	PrecacheResource("particle", "particles/troll_warlord/troll_hit.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_furion/furion_arboreal_might_buff.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/blood_resist.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_lowhp_.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_shard_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_multicast.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/chain_lightning.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/ogre_magichit.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/fire_shield.vpcf", context)
end

function ogre_magi_bloodlust_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e1_speed = 0,
			e1_range = 0,
			e1_speed_legendary = 0,

			e2_armor_reduce = 0,
			e2_armor = 0,

			has_e3 = 0,
			e3_str = 0,
			e3_damage = 0,
			e3_max = caster:GetTalentValue("modifier_ogremagi_bloodlust_3", "max", true),

			has_e4 = 0,
			e4_cd_inc = caster:GetTalentValue("modifier_ogremagi_bloodlust_4", "cd_inc", true),
			e4_knock_distance = caster:GetTalentValue("modifier_ogremagi_bloodlust_4", "knock_distance", true),
			e4_slow_resist = caster:GetTalentValue("modifier_ogremagi_bloodlust_4", "slow_resist", true),

			has_e7 = 0,
			e7_heal_max = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "heal_max", true) / 100,
			e7_bash_duration = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "bash_duration", true),
			e7_bash_slow = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "bash_slow", true),
			e7_heal_health = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "heal_health", true),
			e7_move_bonus = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "move_bonus", true),
			e7_bash_slow_duration = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "bash_slow_duration", true),
			e7_duration = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "duration", true),
			e7_move_max = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "move_max", true),
			e7_move_duration = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "move_duration", true),
			e7_move_status = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "move_status", true),
			e7_crit_chance = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "crit_chance", true),
			e7_effect_duration = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "effect_duration", true),
			e7_crit_damage = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "crit_damage", true),
			e7_crit_cleave = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "crit_cleave", true) / 100,
			e7_crit_radius = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "crit_radius", true),
			e7_bash_chance = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "bash_chance", true),
			e7_bash_cd = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "bash_cd", true),
			e7_cd = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "cd", true),

			h2_magic = 0,
			h2_move = 0,

			has_h6 = 0,
			h6_damage_reduce = caster:GetTalentValue("modifier_ogremagi_hero_6", "damage_reduce", true),
			h6_heal = caster:GetTalentValue("modifier_ogremagi_hero_6", "heal", true) / 100,
			h6_duration = caster:GetTalentValue("modifier_ogremagi_hero_6", "duration", true),
			h6_bonus = caster:GetTalentValue("modifier_ogremagi_hero_6", "bonus", true),

			has_w4 = 0,
			w4_max = caster:GetTalentValue("modifier_ogremagi_ignite_4", "max", true),
			w4_attacks = caster:GetTalentValue("modifier_ogremagi_ignite_4", "attacks", true),
		}
	end

	if caster:HasTalent("modifier_ogremagi_bloodlust_1") then
		self.talents.e1_speed = caster:GetTalentValue("modifier_ogremagi_bloodlust_1", "speed")
		self.talents.e1_range = caster:GetTalentValue("modifier_ogremagi_bloodlust_1", "range")
		self.talents.e1_speed_legendary = caster:GetTalentValue("modifier_ogremagi_bloodlust_1", "speed_legendary")
	end

	if caster:HasTalent("modifier_ogremagi_bloodlust_2") then
		self.talents.e2_armor_reduce = caster:GetTalentValue("modifier_ogremagi_bloodlust_2", "armor_reduce")
		self.talents.e2_armor = caster:GetTalentValue("modifier_ogremagi_bloodlust_2", "armor")
	end

	if caster:HasTalent("modifier_ogremagi_bloodlust_3") then
		self.talents.has_e3 = 1
		self.talents.e3_str = caster:GetTalentValue("modifier_ogremagi_bloodlust_3", "str")
		self.talents.e3_damage = caster:GetTalentValue("modifier_ogremagi_bloodlust_3", "damage")
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_ogremagi_bloodlust_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_ogremagi_bloodlust_7") then
		self.talents.has_e7 = 1
		self.tracker:UpdateUI()
		caster:AddLifesteal(self.tracker, {
			name = "modifier_ogremagi_bloodlust_7",
			type = 2,
			value = function()
				if not caster:HasModifier("modifier_ogre_magi_bloodlust_custom_legendary_3") then
					return 0
				end
				return (1 - caster:GetHealthPercent() / 100) * self.talents.e7_heal_max
			end,
		})
	end

	if caster:HasTalent("modifier_ogremagi_hero_2") then
		self.talents.h2_magic = caster:GetTalentValue("modifier_ogremagi_hero_2", "magic")
		self.talents.h2_move = caster:GetTalentValue("modifier_ogremagi_hero_2", "move")
	end

	if caster:HasTalent("modifier_ogremagi_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_ogremagi_ignite_4") then
		self.talents.has_w4 = 1
	end
end

function ogre_magi_bloodlust_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "ogre_magi_bloodlust", self)
end

function ogre_magi_bloodlust_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_ogre_magi_bloodlust_custom_tracker"
end

function ogre_magi_bloodlust_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK
		+ (self.talents.has_h6 == 1 and DOTA_ABILITY_BEHAVIOR_IMMEDIATE or 0)
end

function ogre_magi_bloodlust_custom:OnSpellStart()
	if self.talents.has_h6 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_ogre_magi_bloodlust_custom_incoming",
			{ duration = self.talents.h6_duration }
		)
		self.caster:GenericHeal(
			self.caster:GetMaxHealth() * self.talents.h6_heal,
			self.ability,
			false,
			"",
			"modifier_ogremagi_hero_6"
		)
	end

	local mod = self.caster:FindModifierByName("modifier_ogre_magi_bloodlust_custom_buff")
	if mod then
		mod:AddStack()
	else
		mod = self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_ogre_magi_bloodlust_custom_buff",
			{ duration = self.duration }
		)

		if self.caster:HasModifier("modifier_slark_saltwater_shiv_custom_legendary_steal") then
			local effect_cast = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_ogre_magi/ogre_magi_multicast.vpcf",
				PATTACH_OVERHEAD_FOLLOW,
				self.caster
			)
			ParticleManager:SetParticleControl(effect_cast, 1, Vector(2, 0, 0))
			ParticleManager:ReleaseParticleIndex(effect_cast)
			self.caster:EmitSound("Hero_OgreMagi.Fireblast.x2")
			mod:AddStack()
		end
	end

	self.caster:EmitSound("Hero_OgreMagi.Bloodlust.Cast")
end

function ogre_magi_bloodlust_custom:LegendaryProc(reroll)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e7 == 0 then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_ogre_magi_bloodlust_custom_legendary")
	if reroll and mod then
		mod.reroll = true
		mod:Destroy()
	end

	local buff_table = {}

	for name, particle in pairs(self.legendary_buffs) do
		if not self.caster:HasModifier(name) then
			buff_table[#buff_table + 1] = name
		end
	end

	if #buff_table == 0 then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self.caster.multicast_ability,
		"modifier_ogre_magi_bloodlust_custom_legendary_reroll",
		{ duration = self.talents.e7_duration + self.talents.e7_cd }
	)

	local name = buff_table[RandomInt(1, #buff_table)]
	if #buff_table == 1 then
		self.caster:EmitSound("Ogre.Blood_legendary_full")
	end

	self.caster:GenericParticle(self.legendary_buffs[name])
	self.caster:EmitSound("Ogre.Blood_legendary")
	self.caster:AddNewModifier(self.caster, self, name, {})

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_ogre_magi_bloodlust_custom_legendary",
		{ duration = self.talents.e7_effect_duration }
	)
end

modifier_ogre_magi_bloodlust_custom_buff = class(mod_visible)
function modifier_ogre_magi_bloodlust_custom_buff:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.model_scale = self.ability.modelscale
	self.speed_bonus = self.ability.self_bonus
	self.max = self.ability.max + (self.ability.talents.has_w4 == 1 and self.ability.talents.w4_max or 0)
	self.stack_bonus = self.ability.stack_bonus
	self.attack_count = 0

	if not IsServer() then
		return
	end

	self.particle_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_buff.vpcf",
		self
	)
	self.parent:GenericParticle(self.particle_name, self)
	self.RemoveForDuel = true

	self.ability:EndCd()

	if self.ability.talents.has_e4 == 1 and not self.ability:IsHidden() then
		self.parent:SwapAbilities(self.ability:GetName(), "ogre_magi_bloodlust_custom_charge", false, true)
	end

	self:AddStack()
end

function modifier_ogre_magi_bloodlust_custom_buff:OnRefresh(kv)
	if not IsServer() then
		return
	end
	self:AddStack()
end

function modifier_ogre_magi_bloodlust_custom_buff:AddStack()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() > 1 then
		self.parent:GenericParticle("particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_buff.vpcf", self)
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_cast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:EmitSound("Hero_OgreMagi.Bloodlust.Target")
	EmitSoundOnClient("Hero_OgreMagi.Bloodlust.Target.FP", self.parent:GetPlayerOwner())
end

function modifier_ogre_magi_bloodlust_custom_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	if self.ability.talents.has_e4 == 1 and self.ability:IsHidden() then
		self.parent:SwapAbilities(self.ability:GetName(), "ogre_magi_bloodlust_custom_charge", true, false)
	end
end

function modifier_ogre_magi_bloodlust_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_ogre_magi_bloodlust_custom_buff:GetStack()
	return (self:GetStackCount() + 1) * self.stack_bonus
end

function modifier_ogre_magi_bloodlust_custom_buff:GetModifierAttackSpeedBonus_Constant()
	return (self.speed_bonus + (self.ability.talents.has_e7 == 0 and self.ability.talents.e1_speed or 0))
		* self:GetStack()
end

function modifier_ogre_magi_bloodlust_custom_buff:GetModifierMoveSpeedBonus_Percentage()
	return (self.ability.bonus_movement_speed + self.ability.talents.h2_move) * self:GetStack()
end

function modifier_ogre_magi_bloodlust_custom_buff:GetModifierPhysicalArmorBonus()
	return self.ability.talents.e2_armor * self:GetStack()
end

function modifier_ogre_magi_bloodlust_custom_buff:GetModifierMagicalResistanceBonus()
	return self.ability.talents.h2_magic * self:GetStack()
end

function modifier_ogre_magi_bloodlust_custom_buff:GetModifierModelScale()
	return self.model_scale
end

modifier_ogre_magi_bloodlust_custom_tracker = class(mod_hidden)
function modifier_ogre_magi_bloodlust_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.bloodlust_ability = self.ability
	self.parent.bloodlust_charge_ability = self.parent:FindAbilityByName("ogre_magi_bloodlust_custom_charge")

	if IsValid(self.parent.bloodlust_charge_ability) then
		if IsServer() and not self.parent.bloodlust_charge_ability:IsTrained() then
			self.parent.bloodlust_charge_ability:SetLevel(1)
		end
		self.parent.bloodlust_charge_ability:UpdateTalents()
	end

	self.ability.bonus_movement_speed = self.ability:GetSpecialValueFor("bonus_movement_speed")
	self.ability.self_bonus = self.ability:GetSpecialValueFor("self_bonus")
	self.ability.cleave_damage = self.ability:GetSpecialValueFor("cleave_damage") / 100
	self.ability.modelscale = self.ability:GetSpecialValueFor("modelscale")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.max = self.ability:GetSpecialValueFor("max")
	self.ability.multicast_delay = self.ability:GetSpecialValueFor("multicast_delay")
	self.ability.stack_bonus = self.ability:GetSpecialValueFor("stack_bonus") / 100

	self.parent:AddProc(self, { land = true })
end

function modifier_ogre_magi_bloodlust_custom_tracker:OnRefresh()
	self.ability.bonus_movement_speed = self.ability:GetSpecialValueFor("bonus_movement_speed")
	self.ability.self_bonus = self.ability:GetSpecialValueFor("self_bonus")
	self.ability.cleave_damage = self.ability:GetSpecialValueFor("cleave_damage") / 100
end

function modifier_ogre_magi_bloodlust_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end

	local timer = 0
	local is_reroll = 0
	local mod = self.parent:FindModifierByName("modifier_ogre_magi_bloodlust_custom_legendary_reroll")
	if mod then
		is_reroll = 1
		timer = mod:GetRemainingTime()
	else
		mod = self.parent:FindModifierByName("modifier_ogre_magi_bloodlust_custom_legendary")
		if mod then
			timer = mod:GetRemainingTime()
		end
	end

	local data = {}
	data.buff_1 = self.parent:HasModifier("modifier_ogre_magi_bloodlust_custom_legendary_1")
	data.buff_2 = self.parent:HasModifier("modifier_ogre_magi_bloodlust_custom_legendary_2")
	data.buff_3 = self.parent:HasModifier("modifier_ogre_magi_bloodlust_custom_legendary_3")
	data.buff_4 = self.parent:HasModifier("modifier_ogre_magi_bloodlust_custom_legendary_4")
	data.is_reroll = is_reroll
	data.timer = timer

	self.parent:UpdateUIlong({ special_data = data, special_event = "ogremagi_bloodlust" })
end

function modifier_ogre_magi_bloodlust_custom_tracker:GetProcChance()
	return 100
end

function modifier_ogre_magi_bloodlust_custom_tracker:AttackProc(params, name)
	local target = params.target
	local mod = self.parent:FindModifierByName("modifier_ogre_magi_bloodlust_custom_buff")
	if mod then
		if not params.ranged_attack then
			target:EmitSound("Hero_Sven.GreatCleave")
			DoCleaveAttack(
				self.parent,
				target,
				self.ability,
				self.ability.cleave_damage * params.damage,
				150,
				360,
				500,
				"particles/units/heroes/hero_sven/sven_spell_great_cleave.vpcf"
			)
		end

		if self.ability.talents.has_w4 == 1 then
			mod.attack_count = mod.attack_count + 1
			if mod.attack_count >= self.ability.talents.w4_attacks then
				mod:OnRefresh()
				mod.attack_count = 0
			end
		end
	end

	if self.ability.talents.has_e4 == 1 and self.parent.bloodlust_charge_ability then
		self.parent:CdAbility(
			self.parent.bloodlust_charge_ability,
			self.ability.talents.e4_cd_inc,
			nil,
			"modifier_ogremagi_bloodlust_4"
		)
	end

	if self.parent:GetQuest() == "Ogre.Quest_7" and not self.parent:QuestCompleted() and target:IsRealHero() then
		target:AddNewModifier(self.parent, self.ability, "modifier_ogre_magi_bloodlust_custom_quest", { duration = 1 })
	end
end

function modifier_ogre_magi_bloodlust_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_ogre_magi_bloodlust_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.e1_range
end

function modifier_ogre_magi_bloodlust_custom_tracker:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_e3 == 0 then
		return
	end
	local bonus = self.ability.talents.e3_damage
	if self.ability.talents.has_e7 == 0 then
		bonus = bonus * (1 + self.parent:GetUpgradeStack("modifier_ogre_magi_bloodlust_custom_str"))
	end
	return bonus
end

function modifier_ogre_magi_bloodlust_custom_tracker:GetModifierBonusStats_Strength()
	if self.ability.talents.has_e3 == 0 then
		return
	end
	local bonus = self.ability.talents.e3_str
	if self.ability.talents.has_e7 == 0 then
		bonus = bonus * (1 + self.parent:GetUpgradeStack("modifier_ogre_magi_bloodlust_custom_str"))
	end
	return bonus
end

function modifier_ogre_magi_bloodlust_custom_tracker:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_damage_reduce
		* (
			self.parent:HasModifier("modifier_ogre_magi_bloodlust_custom_incoming")
				and self.ability.talents.h6_bonus
			or 1
		)
end

function modifier_ogre_magi_bloodlust_custom_tracker:GetModifierSlowResistance_Stacking()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_slow_resist
end

modifier_ogre_magi_bloodlust_custom_legendary = class(mod_hidden)
function modifier_ogre_magi_bloodlust_custom_legendary:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.duration = self.ability.talents.e7_effect_duration
	self.RemoveForDuel = true

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_ogre_magi_bloodlust_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.ability.tracker:UpdateUI()
end

function modifier_ogre_magi_bloodlust_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	for mod, _ in pairs(self.ability.legendary_buffs) do
		self.parent:RemoveModifierByName(mod)
	end

	if not self.reroll then
		Timers:CreateTimer(0.2, function()
			if IsValid(self.parent.multicast_ability) then
				self.parent.multicast_ability:StartCd()
			end
		end)
	end

	self.ability.tracker:UpdateUI()
end

modifier_ogre_magi_bloodlust_custom_legendary_reroll = class(mod_hidden)
function modifier_ogre_magi_bloodlust_custom_legendary_reroll:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.cd = self.ability.talents.e7_cd
	self.RemoveForDuel = true

	self.ability:StartCooldown(self.cd)
end

function modifier_ogre_magi_bloodlust_custom_legendary_reroll:OnRefresh()
	if not IsServer() then
		return
	end
	self.ability:StartCooldown(self.cd)
end

function modifier_ogre_magi_bloodlust_custom_legendary_reroll:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:EndCd()

	local mod = self.parent:FindModifierByName("modifier_ogre_magi_bloodlust_custom_legendary")
	if mod then
		mod:SetDuration(mod.duration, true)
	end
end

modifier_ogre_magi_bloodlust_custom_legendary_buff = class(mod_hidden)
function modifier_ogre_magi_bloodlust_custom_legendary_buff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetProcChance()
	return 100
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:AttackProc(params, name)
	if name ~= "hit" then
		return
	end
	local target = params.target

	if self.records and self.records[params.record] then
		target:EmitSound("DOTA_Item.Daedelus.Crit")

		local effect = ParticleManager:CreateParticle(
			"particles/nyx_assassin/vendetta_bash.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			target
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
		ParticleManager:SetParticleControlEnt(
			effect,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(effect)

		local particle =
			ParticleManager:CreateParticle("particles/troll_warlord/troll_hit.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
		ParticleManager:Delete(particle, 1)

		local damageTable = {
			attacker = self.parent,
			ability = self.ability,
			damage = params.damage * self.ability.talents.e7_crit_cleave,
			damage_type = DAMAGE_TYPE_PHYSICAL,
			damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
		}
		for _, aoe_target in pairs(self.parent:FindTargets(self.ability.talents.e7_crit_radius, target:GetAbsOrigin())) do
			if aoe_target ~= target then
				damageTable.victim = aoe_target
				DoDamage(damageTable, "modifier_ogremagi_bloodlust_7")
			end
		end
	end

	if self.bash_chance then
		target:AddNewModifier(
			self.parent,
			self.parent:BkbAbility(self.ability, true),
			"modifier_ogre_magi_bloodlust_custom_legendary_slow",
			{ duration = self.ability.talents.e7_bash_slow_duration }
		)

		if params.procs[self].default then
			target:EmitSound("Ogre.Blood_bash")
			target:EmitSound("Ogre.Blood_bash2")
			target:GenericParticle("particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf")

			local nParticleIndex = ParticleManager:CreateParticle(
				"particles/items_fx/chain_lightning.vpcf",
				PATTACH_POINT_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				nParticleIndex,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				nParticleIndex,
				1,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				target:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(nParticleIndex)

			target:AddNewModifier(
				self.parent,
				self.parent:BkbAbility(self.ability, true),
				"modifier_bashed",
				{ duration = self.ability.talents.e7_bash_duration * (1 - target:GetStatusResistance()) }
			)
		end
	end

	if self.move_max then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_ogre_magi_bloodlust_custom_legendary_move",
			{ duration = self.ability.talents.e7_move_duration }
		)
	end
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetCritChance()
	if not self.crit_damage then
		return 0
	end
	return self.ability.talents.e7_crit_chance
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetCritDamage()
	if not self.crit_damage then
		return
	end
	return self.crit_damage
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if not self.crit_damage then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local target = params.target
	if not target:IsUnit() then
		return
	end
	if not RollPseudoRandomPercentage(self:GetCritChance(), 8123, self.parent) then
		return
	end

	self.records[params.record] = true
	return self:GetCritDamage()
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetModifierBonusStats_Strength()
	return self.ability.talents.e3_str
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.e3_damage
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.e1_speed_legendary
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetModifierExtraHealthPercentage()
	if not self.health_bonus then
		return
	end
	return self.health_bonus
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetModifierIgnoreMovespeedLimit()
	if not self.move_max then
		return
	end
	return 1
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetModifierMoveSpeed_Max()
	if not self.move_max then
		return
	end
	return self.move_max
end

function modifier_ogre_magi_bloodlust_custom_legendary_buff:GetModifierMoveSpeed_Limit()
	if not self.move_max then
		return
	end
	return self.move_max
end

modifier_ogre_magi_bloodlust_custom_legendary_1 = class(modifier_ogre_magi_bloodlust_custom_legendary_buff)
function modifier_ogre_magi_bloodlust_custom_legendary_1:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.crit_damage = self.ability.talents.e7_crit_damage
	self.records = {}
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/ogre_magi/ogre_magichit.vpcf", self)
	self.parent:AddProc(self, { name = "hit", land = true })
	self.parent:AddRecordDestroyEvent(self, true)
end

function modifier_ogre_magi_bloodlust_custom_legendary_1:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	self.records[params.record] = nil
end

modifier_ogre_magi_bloodlust_custom_legendary_2 = class(modifier_ogre_magi_bloodlust_custom_legendary_buff)
function modifier_ogre_magi_bloodlust_custom_legendary_2:GetEffectName()
	return "particles/ogre_magi/ogre_dd.vpcf"
end
function modifier_ogre_magi_bloodlust_custom_legendary_2:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bash_chance = self.ability.talents.e7_bash_chance
	if not IsServer() then
		return
	end
	self.parent:AddProc(self, { name = "hit", land = true })
	self.parent:AddProc(self, { cd = self.ability.talents.e7_bash_cd, land = true })
end

function modifier_ogre_magi_bloodlust_custom_legendary_2:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.bash_chance
end

modifier_ogre_magi_bloodlust_custom_legendary_3 = class(modifier_ogre_magi_bloodlust_custom_legendary_buff)
function modifier_ogre_magi_bloodlust_custom_legendary_3:GetEffectName()
	return "particles/units/heroes/hero_furion/furion_arboreal_might_buff.vpcf"
end
function modifier_ogre_magi_bloodlust_custom_legendary_3:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.health_bonus = self.ability.talents.e7_heal_health

	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

modifier_ogre_magi_bloodlust_custom_legendary_4 = class(modifier_ogre_magi_bloodlust_custom_legendary_buff)
function modifier_ogre_magi_bloodlust_custom_legendary_4:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.move_max = self.ability.talents.e7_move_max
	if not IsServer() then
		return
	end
	self.parent:AddProc(self, { name = "hit", land = true })
end

modifier_ogre_magi_bloodlust_custom_legendary_slow = class(mod_hidden)
function modifier_ogre_magi_bloodlust_custom_legendary_slow:IsPurgable()
	return true
end
function modifier_ogre_magi_bloodlust_custom_legendary_slow:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.bloodlust_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.slow = self.ability.talents.e7_bash_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_zuus/zuus_shard_slow.vpcf", self)
end

function modifier_ogre_magi_bloodlust_custom_legendary_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_ogre_magi_bloodlust_custom_legendary_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_ogre_magi_bloodlust_custom_legendary_move = class(mod_hidden)
function modifier_ogre_magi_bloodlust_custom_legendary_move:GetEffectName()
	return "particles/ogre_magi/blood_resist.vpcf"
end
function modifier_ogre_magi_bloodlust_custom_legendary_move:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.move = self.ability.talents.e7_move_bonus
	self.status = self.ability.talents.e7_move_status
end

function modifier_ogre_magi_bloodlust_custom_legendary_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_ogre_magi_bloodlust_custom_legendary_move:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

function modifier_ogre_magi_bloodlust_custom_legendary_move:GetModifierStatusResistanceStacking()
	return self.status
end

modifier_ogre_magi_bloodlust_custom_incoming = class(mod_hidden)
function modifier_ogre_magi_bloodlust_custom_incoming:GetEffectName()
	return "particles/ogre_magi/fire_shield.vpcf"
end

modifier_ogre_magi_bloodlust_custom_quest = class(mod_hidden)
function modifier_ogre_magi_bloodlust_custom_quest:OnCreated(table)
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()

	self:SetStackCount(1)
end

function modifier_ogre_magi_bloodlust_custom_quest:OnRefresh(table)
	if not IsServer() then
		return
	end
	if not self.caster:GetQuest() then
		return
	end

	self:IncrementStackCount()

	if self:GetStackCount() >= self.caster.quest.number then
		self.caster:UpdateQuest(1)
		self:Destroy()
	end
end

modifier_ogre_magi_bloodlust_custom_str = class(mod_visible)
function modifier_ogre_magi_bloodlust_custom_str:GetTexture()
	return "buffs/ogre_magi/blooldust_3"
end
function modifier_ogre_magi_bloodlust_custom_str:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e3_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_ogre_magi_bloodlust_custom_str:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_ogre_magi_bloodlust_custom_str:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

modifier_ogre_magi_bloodlust_custom_armor = class(mod_hidden)
function modifier_ogre_magi_bloodlust_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor = self.ability.talents.e2_armor_reduce
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
end

function modifier_ogre_magi_bloodlust_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_ogre_magi_bloodlust_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

ogre_magi_bloodlust_custom_charge = class({})
ogre_magi_bloodlust_custom_charge.talents = {}

function ogre_magi_bloodlust_custom_charge:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e4_range = caster:GetTalentValue("modifier_ogremagi_bloodlust_4", "range", true),
			e4_talent_cd = caster:GetTalentValue("modifier_ogremagi_bloodlust_4", "talent_cd", true),
			e4_duration = caster:GetTalentValue("modifier_ogremagi_bloodlust_4", "duration", true),
			e4_radius = caster:GetTalentValue("modifier_ogremagi_bloodlust_4", "radius", true),
			e4_stun = caster:GetTalentValue("modifier_ogremagi_bloodlust_4", "stun", true),
		}
	end
end

function ogre_magi_bloodlust_custom_charge:GetRange()
	return self.talents.e4_range or 0
end

function ogre_magi_bloodlust_custom_charge:GetCastRange(vLocation, hTarget)
	return self:GetRange() - self.caster:GetCastRangeBonus()
end

function ogre_magi_bloodlust_custom_charge:GetCooldown(level)
	return self.talents.e4_talent_cd or 0
end

function ogre_magi_bloodlust_custom_charge:OnSpellStart()
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_ogre_magi_bloodlust_custom_charge",
		{ duration = self.talents.e4_duration }
	)
end

modifier_ogre_magi_bloodlust_custom_charge = class(mod_hidden)
function modifier_ogre_magi_bloodlust_custom_charge:GetEffectName()
	return "particles/ogre_magi/blood_charge.vpcf"
end
function modifier_ogre_magi_bloodlust_custom_charge:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_ogre_magi_bloodlust_custom_charge:GetStatusEffectName()
	return "particles/econ/items/invoker/invoker_ti7/status_effect_alacrity_ti7.vpcf"
end
function modifier_ogre_magi_bloodlust_custom_charge:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_ogre_magi_bloodlust_custom_charge:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:StartGesture(ACT_DOTA_FLAIL)

	self.angle = self.parent:GetForwardVector():Normalized()
	self.distance = self.ability.talents.e4_range / self:GetDuration()
	self.radius = self.ability.talents.e4_radius
	self.stun = self.ability.talents.e4_stun

	self.bkb = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_debuff_immune", {})

	self.targets = {}

	self.parent:EmitSound("Ogre.Blood_charge")
	self.parent:EmitSound("Ogre.Blood_charge2")

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_ogre_magi_bloodlust_custom_charge:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_SILENCED] = true,
	}
end

function modifier_ogre_magi_bloodlust_custom_charge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_ogre_magi_bloodlust_custom_charge:GetActivityTranslationModifiers()
	return "forcestaff_friendly"
end

function modifier_ogre_magi_bloodlust_custom_charge:GetModifierDisableTurning()
	return 1
end

function modifier_ogre_magi_bloodlust_custom_charge:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:InterruptMotionControllers(true)

	if IsValid(self.bkb) then
		self.bkb:Destroy()
	end

	self.parent:FadeGesture(ACT_DOTA_FLAIL)
	self.parent:StartGesture(ACT_DOTA_FORCESTAFF_END)

	ResolveNPCPositions(self.parent:GetAbsOrigin(), 128)
	self.parent:FacePoint()
end

function modifier_ogre_magi_bloodlust_custom_charge:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	local pos = self.parent:GetAbsOrigin()
	local next_pos = GetGroundPosition(pos + self.angle * self.distance * dt, self.parent)
	self.parent:SetAbsOrigin(next_pos)

	GridNav:DestroyTreesAroundPoint(pos, 120, false)

	for _, enemy in pairs(self.parent:FindTargets(self.radius)) do
		if not self.targets[enemy] then
			self.targets[enemy] = true

			local effect_cast = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_impact.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				enemy
			)
			ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, self.radius, self.radius))
			ParticleManager:ReleaseParticleIndex(effect_cast)
			enemy:EmitSound("Ogre.Blood_hit")

			if
				not enemy:IsCurrentlyHorizontalMotionControlled() and not enemy:IsCurrentlyVerticalMotionControlled()
			then
				local direction = enemy:GetOrigin() - self.parent:GetOrigin()
				direction.z = 0
				direction = direction:Normalized()

				local knockbackProperties = {
					center_x = self.parent:GetOrigin().x,
					center_y = self.parent:GetOrigin().y,
					center_z = self.parent:GetOrigin().z,
					duration = self.stun,
					knockback_duration = self.stun,
					knockback_distance = 80,
					knockback_height = 50,
					should_stun = true,
				}
				enemy:AddNewModifier(self.parent, self.ability, "modifier_knockback", knockbackProperties)
			end
		end
	end
end

function modifier_ogre_magi_bloodlust_custom_charge:OnHorizontalMotionInterrupted()
	self:Destroy()
end