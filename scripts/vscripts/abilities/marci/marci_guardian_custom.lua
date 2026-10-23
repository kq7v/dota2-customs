--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_marci_guardian_custom_tracker",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_armor",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_marci_sidekick_1"
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_damage_reduce",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_marci_sidekick_2"
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_block",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_crit",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_marci_sidekick_3" }
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_crit_damage",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_marci_sidekick_3"
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_legendary_unit",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_legendary_unit_passive",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_legendary_speed",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_legendary_tether_wisp",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_legendary_tether_speed",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_guardian_custom_legendary_tether_teleport",
	"abilities/marci/marci_guardian_custom",
	LUA_MODIFIER_MOTION_NONE
)

marci_guardian_custom = class({})
marci_guardian_custom.talents = {}

function marci_guardian_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "marci_guardian", self)
end

function marci_guardian_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_sven/sven_spell_great_cleave.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_marci_sidekick.vpcf", context)
	PrecacheResource("particle", "particles/marci/bodyguard_shield.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_sidekick_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", context)
	PrecacheResource("particle", "particles/marci/marci_wave.vpcf", context)
	PrecacheResource("particle", "particles/marci/marci_heal.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_dispose_debuff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_troll_warlord/troll_warlord_bersekers_net.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_wisp/wisp_overcharge.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_parry.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_wisp/wisp_base_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_wisp/wisp_ambient.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_wisp/wisp_tether.vpcf", context)
end

function marci_guardian_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_armor = 0,
			e1_armor_reduce = 0,
			e1_duration = caster:GetTalentValue("modifier_marci_sidekick_1", "duration", true),
			e1_radius = caster:GetTalentValue("modifier_marci_sidekick_1", "radius", true),

			has_e2 = 0,
			e2_heal = 0,
			e2_damage_reduce_legendary = 0,
			e2_damage_reduce = 0,
			e2_duration = caster:GetTalentValue("modifier_marci_sidekick_2", "duration", true),

			has_e3 = 0,
			e3_damage = 0,
			e3_crit = 0,
			e3_duration = caster:GetTalentValue("modifier_marci_sidekick_3", "duration", true),
			e3_attacks = caster:GetTalentValue("modifier_marci_sidekick_3", "attacks", true),
			e3_max = caster:GetTalentValue("modifier_marci_sidekick_3", "max", true),
			e3_effect_duration = caster:GetTalentValue("modifier_marci_sidekick_3", "effect_duration", true),

			has_e4 = 0,
			e4_duration = caster:GetTalentValue("modifier_marci_sidekick_4", "duration", true),
			e4_cd_inc = caster:GetTalentValue("modifier_marci_sidekick_4", "cd_inc", true) / 100,
			e4_cd_inc_legendary = caster:GetTalentValue("modifier_marci_sidekick_4", "cd_inc_legendary", true) / 100,
			e4_damage_reduce = caster:GetTalentValue("modifier_marci_sidekick_4", "damage_reduce", true) / 100,

			has_e7 = 0,
			e7_heal = caster:GetTalentValue("modifier_marci_sidekick_7", "heal", true) / 100,
			e7_duration = caster:GetTalentValue("modifier_marci_sidekick_7", "duration", true),
			e7_speed = caster:GetTalentValue("modifier_marci_sidekick_7", "speed", true),
			e7_movespeed = caster:GetTalentValue("modifier_marci_sidekick_7", "movespeed", true),
			e7_range = caster:GetTalentValue("modifier_marci_sidekick_7", "range", true),
			e7_damage = caster:GetTalentValue("modifier_marci_sidekick_7", "damage", true),

			h2_shield = 0,
			h2_status = 0,

			w3_heal = 0,

			has_q7 = 0,

			has_w7 = 0,
		}
	end

	if caster:HasTalent("modifier_marci_sidekick_1") then
		self.talents.has_e1 = 1
		self.talents.e1_armor = caster:GetTalentValue("modifier_marci_sidekick_1", "armor")
		self.talents.e1_armor_reduce = caster:GetTalentValue("modifier_marci_sidekick_1", "armor_reduce")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_marci_sidekick_2") then
		self.talents.has_e2 = 1
		self.talents.e2_heal = caster:GetTalentValue("modifier_marci_sidekick_2", "heal") / 100
		self.talents.e2_damage_reduce_legendary =
			caster:GetTalentValue("modifier_marci_sidekick_2", "damage_reduce_legendary")
		self.talents.e2_damage_reduce = caster:GetTalentValue("modifier_marci_sidekick_2", "damage_reduce")
	end

	if caster:HasTalent("modifier_marci_sidekick_3") then
		self.talents.has_e3 = 1
		self.talents.e3_damage = caster:GetTalentValue("modifier_marci_sidekick_3", "damage")
		self.talents.e3_crit = caster:GetTalentValue("modifier_marci_sidekick_3", "crit")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_marci_sidekick_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_marci_sidekick_7") then
		self.talents.has_e7 = 1
		caster:AddDamageEvent_out(self.tracker, true)
		caster:AddLifesteal(self.tracker, {
			name = "modifier_marci_sidekick_7",
			type = 2,
			value = function(params)
				if params.attack_damage_flag ~= "marci_e7" then
					return 0
				end
				return self.talents.e7_heal
			end,
		})
		if not self.e7_init and IsServer() then
			self.e7_init = true
			caster:SwapAbilities("marci_summon_custom_wisp", "marci_dispose_hits", true, false)
			caster:AddSpellEvent(self.tracker, true)
		end
	end

	if caster:HasTalent("modifier_marci_hero_2") then
		self.talents.h2_shield = caster:GetTalentValue("modifier_marci_hero_2", "shield") / 100
		self.talents.h2_status = caster:GetTalentValue("modifier_marci_hero_2", "status")
	end

	if caster:HasTalent("modifier_marci_rebound_3") then
		self.talents.w3_heal = caster:GetTalentValue("modifier_marci_rebound_3", "heal") / 100
	end

	if caster:HasTalent("modifier_marci_dispose_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_marci_rebound_7") then
		self.talents.has_w7 = 1
	end
end

function marci_guardian_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_marci_guardian_custom_tracker"
end

function marci_guardian_custom:OnSpellStart()
	self.caster:EmitSound("Hero_Marci.Guardian.Applied")

	if IsValid(self.caster.unleash_ability) then
		self.caster.unleash_ability:Pulse(self.caster:GetAbsOrigin(), true)
	end

	local targets = { self.caster }
	if IsValid(self.caster.marci_wisp) then
		table.insert(targets, self.caster.marci_wisp)
	end

	for mod, _ in pairs(self.shield_mods) do
		if IsValid(mod) then
			mod:Destroy()
		end
		self.shield_mods[mod] = nil
	end

	for _, target in pairs(targets) do
		if IsValid(target) then
			local mod = target:AddNewModifier(self.caster, self, "modifier_generic_shield", {
				duration = self.buff_duration,
				start_full = 1,
				max_shield = self.shield + self.talents.h2_shield * self.caster:GetMaxHealth(),
				status_effect = "particles/status_fx/status_effect_marci_sidekick.vpcf",
				dont_destroy = 1,
			})

			if self.talents.has_e4 == 1 then
				target:AddNewModifier(
					self.caster,
					self,
					"modifier_marci_guardian_custom_block",
					{ duration = self.talents.e4_duration }
				)
			end

			if mod then
				target.bodyguard_shield = mod

				mod:SetReduceDamage(function(params)
					local caster = params.caster
					if caster:HasModifier("modifier_marci_guardian_custom_block") then
						if RandomInt(1, 2) == 1 then
							caster:EmitSound("Juggernaut.Parry")
							local particle = ParticleManager:CreateParticle(
								"particles/juggernaut/jugg_parry.vpcf",
								PATTACH_ABSORIGIN_FOLLOW,
								caster
							)
							ParticleManager:SetParticleControlEnt(
								particle,
								0,
								caster,
								PATTACH_POINT_FOLLOW,
								"attach_hitloc",
								caster:GetAbsOrigin(),
								true
							)
							ParticleManager:SetParticleControl(particle, 1, caster:GetAbsOrigin())
							ParticleManager:ReleaseParticleIndex(particle)
						end
						return 1 + self.talents.e4_damage_reduce
					end
				end)

				local particle = ParticleManager:CreateParticle(
					wearables_system:GetParticleReplacementAbility(
						self.caster,
						"particles/marci/bodyguard_shield.vpcf",
						self
					),
					PATTACH_OVERHEAD_FOLLOW,
					target
				)
				ParticleManager:SetParticleControl(particle, 1, target:GetOrigin())
				ParticleManager:SetParticleControl(particle, 2, Vector(1, 0, 0))
				mod:AddParticle(particle, false, false, 1, false, true)
				self.shield_mods[mod] = true
			end
		end
	end
end

function marci_guardian_custom:ProcCd(reason)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e4 == 0 then
		return
	end

	local allow = false
	local cd = self.talents.e4_cd_inc
	if reason == 1 and self.talents.has_e7 == 0 and self.talents.has_q7 == 0 and self.talents.has_w7 == 0 then
		allow = true
	end
	if reason == 2 and (self.talents.has_q7 == 1 or self.talents.has_w7 == 1) and self.talents.has_e7 == 0 then
		allow = true
	end
	if reason == 3 and self.talents.has_e7 == 1 then
		allow = true
		cd = self.talents.e4_cd_inc_legendary
	end

	if not allow then
		return
	end
	self.caster:CdAbility(self, nil, cd, "modifier_marci_sidekick_4")
end

modifier_marci_guardian_custom_tracker = class(mod_hidden)
function modifier_marci_guardian_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability.shield_mods = {}
	self.ability:UpdateTalents()

	self.parent.bodyguard_ability = self.ability
	self.parent.marci_combat_timer = 0

	self.parent.bodyguard_legendary_ability = self.parent:FindAbilityByName("marci_summon_custom_wisp")

	if IsValid(self.parent.bodyguard_legendary_ability) then
		if IsServer() and not self.parent.bodyguard_legendary_ability:IsTrained() then
			self.parent.bodyguard_legendary_ability:SetLevel(1)
		end
		self.parent.bodyguard_legendary_ability:UpdateTalents()
	end

	self.parent.bodyguard_tether_ability = self.parent:FindAbilityByName("marci_summon_custom_wisp_tether")

	if IsValid(self.parent.bodyguard_tether_ability) then
		if IsServer() and not self.parent.bodyguard_tether_ability:IsTrained() then
			self.parent.bodyguard_tether_ability:SetLevel(1)
		end
		self.parent.bodyguard_tether_ability:UpdateTalents()
	end

	self.ability.shield = self.ability:GetSpecialValueFor("shield")
	self.ability.lifesteal_pct = self.ability:GetSpecialValueFor("lifesteal_pct") / 100
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.cleave_damage = self.ability:GetSpecialValueFor("cleave_damage") / 100
	self.ability.buff_duration = self.ability:GetSpecialValueFor("buff_duration")

	self.parent:AddProc(self, { land = true })
	self.parent:AddLifesteal(self, {
		proc = "LifestealShield",
		value = function(params)
			if params.inflictor == self.ability then
				return 0
			end
			if params.inflictor then
				return self.ability.lifesteal_pct + self.ability.talents.w3_heal
			end
			return self.ability.lifesteal_pct + self.ability.talents.e2_heal
		end,
	})
end

function modifier_marci_guardian_custom_tracker:OnRefresh(table)
	self.ability.shield = self.ability:GetSpecialValueFor("shield")
	self.ability.lifesteal_pct = self.ability:GetSpecialValueFor("lifesteal_pct") / 100
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.cleave_damage = self.ability:GetSpecialValueFor("cleave_damage") / 100
end

function modifier_marci_guardian_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_e1 == 1 then
		local targets = { self.parent }
		if IsValid(self.parent.marci_wisp) then
			table.insert(targets, self.parent.marci_wisp)
		end

		for _, target in pairs(targets) do
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_marci_guardian_custom_armor",
				{ duration = self.ability.talents.e1_duration }
			)
		end
		for _, target in pairs(self.parent:FindTargets(self.ability.talents.e1_radius)) do
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_marci_guardian_custom_armor",
				{ duration = self.ability.talents.e1_duration }
			)
		end
	end

	if self.ability.talents.has_e3 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_marci_guardian_custom_crit",
			{ duration = self.ability.talents.e3_effect_duration }
		)
	end

	if self.ability.talents.has_e7 == 1 and IsValid(self.parent.marci_wisp) then
		self.parent.marci_wisp:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_marci_guardian_custom_legendary_speed",
			{ duration = self.ability.talents.e7_duration }
		)
	end
end

function modifier_marci_guardian_custom_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if params.inflictor and params.inflictor == self.ability then
		return
	end

	self.parent.marci_combat_timer = GameRules:GetDOTATime(false, false)
end

function modifier_marci_guardian_custom_tracker:LifestealShield(params, heal)
	for mod, _ in pairs(self.ability.shield_mods) do
		if IsValid(mod) then
			mod:AddShield(heal)
		end
	end
end

function modifier_marci_guardian_custom_tracker:GetProcChance()
	return 100
end

function modifier_marci_guardian_custom_tracker:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_e7 == 0 then
		if self.ability.talents.has_e2 == 1 then
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_marci_guardian_custom_damage_reduce",
				{ duration = self.ability.talents.e2_duration }
			)
		end
		self.ability:ProcCd(2)
	end

	if params.no_attack_cooldown then
		return
	end
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

function modifier_marci_guardian_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_marci_guardian_custom_tracker:GetModifierStatusResistanceStacking()
	return self.ability.talents.h2_status
end

function modifier_marci_guardian_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if not self.parent.marci_e7_attack then
		return
	end
	return self.ability.talents.e7_damage - 100
end

function modifier_marci_guardian_custom_tracker:GetModifierDamageOutgoing_Percentage()
	return self.ability.bonus_damage
end

modifier_marci_guardian_custom_armor = class(mod_hidden)
function modifier_marci_guardian_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.armor = self.ability.talents.e1_armor
	if self.caster:GetTeamNumber() ~= self.parent:GetTeamNumber() then
		self.armor = self.ability.talents.e1_armor_reduce
		self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	end
end

function modifier_marci_guardian_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_marci_guardian_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

modifier_marci_guardian_custom_damage_reduce = class(mod_hidden)
function modifier_marci_guardian_custom_damage_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage_reduce = self.ability.talents.has_e7 == 1 and self.ability.talents.e2_damage_reduce_legendary
		or self.ability.talents.e2_damage_reduce
end

function modifier_marci_guardian_custom_damage_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_marci_guardian_custom_damage_reduce:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce
end

function modifier_marci_guardian_custom_damage_reduce:GetModifierSpellAmplify_Percentage()
	return self.damage_reduce
end

modifier_marci_guardian_custom_block = class(mod_hidden)
function modifier_marci_guardian_custom_block:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.buff_particles = {}

	self.buff_particles[1] = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_buff.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.buff_particles[1],
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		false
	)
	self:AddParticle(self.buff_particles[1], false, false, -1, true, false)
	ParticleManager:SetParticleControl(self.buff_particles[1], 3, Vector(255, 255, 255))

	self.buff_particles[2] = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_egg.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.buff_particles[2],
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		false
	)
	self:AddParticle(self.buff_particles[2], false, false, -1, true, false)

	self.buff_particles[3] = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_streaks.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.buff_particles[3],
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		false
	)
	self:AddParticle(self.buff_particles[3], false, false, -1, true, false)
end

modifier_marci_guardian_custom_crit = class(mod_visible)
function modifier_marci_guardian_custom_crit:GetTexture()
	return "buffs/marci/sidekick_3"
end
function modifier_marci_guardian_custom_crit:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.record = nil
	self.crit = self.ability.talents.e3_crit

	self.parent:AddProc(self, { land = true, sync = true })
	self:OnRefresh()
end

function modifier_marci_guardian_custom_crit:OnRefresh()
	if not IsServer() then
		return
	end
	self:SetStackCount(self.ability.talents.e3_attacks)
end

function modifier_marci_guardian_custom_crit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_marci_guardian_custom_crit:GetCritDamage()
	return self.crit
end

function modifier_marci_guardian_custom_crit:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self:GetStackCount() <= 0 then
		return
	end

	self.record = params.record
	return self.crit
end

function modifier_marci_guardian_custom_crit:GetProcChance()
	return 100
end

function modifier_marci_guardian_custom_crit:AttackProc(params)
	if params.record ~= self.record then
		return
	end
	local target = params.target

	self.record = nil
	target:EmitSound("DOTA_Item.Daedelus.Crit")
	self:DecrementStackCount()

	if self:GetStackCount() <= 0 then
		if target:IsRealHero() then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_marci_guardian_custom_crit_damage",
				{ duration = self.ability.talents.e3_duration }
			)
		end
		self:Destroy()
	end
end

modifier_marci_guardian_custom_crit_damage = class(mod_visible)
function modifier_marci_guardian_custom_crit_damage:GetTexture()
	return "buffs/marci/sidekick_3"
end
function modifier_marci_guardian_custom_crit_damage:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e3_max
	self.damage = self.ability.talents.e3_damage
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_marci_guardian_custom_crit_damage:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_marci_guardian_custom_crit_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_marci_guardian_custom_crit_damage:GetModifierDamageOutgoing_Percentage()
	return self.damage * self:GetStackCount()
end

modifier_marci_guardian_custom_legendary_speed = class(mod_hidden)
function modifier_marci_guardian_custom_legendary_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.e7_speed
	if not IsServer() then
		return
	end

	self.parent:EmitSound("Hero_Wisp.Overcharge")

	self.effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_wisp/wisp_overcharge.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	self:AddParticle(self.effect, false, false, -1, true, false)
end

function modifier_marci_guardian_custom_legendary_speed:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Hero_Wisp.Overcharge")
end

function modifier_marci_guardian_custom_legendary_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_marci_guardian_custom_legendary_speed:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

marci_summon_custom_wisp = class({})
marci_summon_custom_wisp.talents = {}

function marci_summon_custom_wisp:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e2 = 0,
			e2_duration = caster:GetTalentValue("modifier_marci_sidekick_2", "duration", true),

			e7_range = caster:GetTalentValue("modifier_marci_sidekick_7", "range", true),
			e7_heal = caster:GetTalentValue("modifier_marci_sidekick_7", "heal", true) / 100,
			e7_health = caster:GetTalentValue("modifier_marci_sidekick_7", "health", true) / 100,
			e7_talent_cd = caster:GetTalentValue("modifier_marci_sidekick_7", "talent_cd", true),
			e7_armor = caster:GetTalentValue("modifier_marci_sidekick_7", "armor", true),
			e7_magic = caster:GetTalentValue("modifier_marci_sidekick_7", "magic", true),
			e7_bva = caster:GetTalentValue("modifier_marci_sidekick_7", "bva", true),
			e7_slow_resist = caster:GetTalentValue("modifier_marci_sidekick_7", "slow_resist", true),

			r2_speed_legendary = 0,
		}
	end

	if caster:HasTalent("modifier_marci_sidekick_2") then
		self.talents.has_e2 = 1
	end

	if caster:HasTalent("modifier_marci_unleash_2") then
		self.talents.r2_speed_legendary = caster:GetTalentValue("modifier_marci_unleash_2", "speed_legendary")
	end
end

function marci_summon_custom_wisp:GetCooldown()
	return self.talents.e7_talent_cd or 0
end

function marci_summon_custom_wisp:OnAbilityPhaseStart()
	self.caster:EmitSound("Hero_Marci.SpecialDelivery.Cast")
	return true
end

function marci_summon_custom_wisp:OnAbilityPhaseInterrupted()
	self.caster:StopSound("Hero_Marci.SpecialDelivery.Cast")
end

function marci_summon_custom_wisp:OnSpellStart()
	local point = self.caster:GetAbsOrigin() - self.caster:GetForwardVector() * (self.talents.e7_range / 3)

	local unit =
		CreateUnitByName("npc_marci_summon_wisp", point, true, self.caster, self.caster, self.caster:GetTeamNumber())
	unit:SetControllableByPlayer(self.caster:GetPlayerOwnerID(), true)
	unit:SetOwner(self.caster)

	unit.owner = self.caster
	unit:EmitSound("Marci.Sidekick_summon")

	unit:AddNewModifier(self.caster, self, "modifier_marci_guardian_custom_legendary_unit", {})
	unit:AddNewModifier(self.caster, self, "modifier_marci_guardian_custom_legendary_unit_passive", {})
end

function marci_summon_custom_wisp:OnProjectileHit(target, vLocation)
	if not IsServer() then
		return
	end
	if not target then
		return
	end

	self.parent.marci_e7_attack = true
	self.parent:PerformAttack(target, true, true, true, true, false, false, true, { damage = "marci_e7" })
	self.parent.marci_e7_attack = false
	target:EmitSound("Marci.Wisp_attack_end")

	local ability = self.parent.bodyguard_ability
	if IsValid(ability) then
		if self.talents.has_e2 == 1 then
			target:AddNewModifier(
				self.parent,
				ability,
				"modifier_marci_guardian_custom_damage_reduce",
				{ duration = self.talents.e2_duration }
			)
		end
		ability:ProcCd(3)
	end
end

modifier_marci_guardian_custom_legendary_unit = class(mod_hidden)
function modifier_marci_guardian_custom_legendary_unit:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		self.effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_wisp/wisp_ambient.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			self.effect,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			self.effect,
			1,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			false
		)
		self:AddParticle(self.effect, false, false, -1, true, false)
		return
	end

	self.caster.marci_wisp = self.parent

	self.ability:EndCd()
	self.tether = self.caster.bodyguard_tether_ability
	if not self.ability:IsHidden() and IsValid(self.tether) and self.tether:IsHidden() then
		self.tether:ToggleAbility()
		self.caster:SwapAbilities(self.ability:GetName(), self.tether:GetName(), false, true)
	end

	self.parent:EmitSound("wisp_levelup")
	self.parent:EmitSound("Hero_Wisp.IdleLoop")

	self.range = 1000
	self.info = {
		EffectName = "particles/units/heroes/hero_wisp/wisp_base_attack.vpcf",
		Ability = self.ability,
		iMoveSpeed = self.parent:GetProjectileSpeed(),
		Source = self.parent,
		bDodgeable = false,
		bProvidesVision = false,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
	}

	self.caster:AddDamageEvent_inc(self, true)
	self.parent:AddDamageEvent_inc(self, true)
	self.caster:AddLifesteal(self, {
		name = "modifier_marci_sidekick_7",
		type = 2,
		heal_unit = self.parent,
		value = function(params)
			if params.attack_damage_flag ~= "marci_e7" then
				return 0
			end
			return self.ability.talents.e7_heal
		end,
	})

	self.interval = 0.1
	self:StartIntervalThink(self.interval)
end

function modifier_marci_guardian_custom_legendary_unit:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.caster ~= params.unit and self.parent ~= params.unit then
		return
	end
	if self.caster:GetTeamNumber() == params.attacker:GetTeamNumber() then
		return
	end

	self.caster.marci_combat_timer = GameRules:GetDOTATime(false, false)
end

function modifier_marci_guardian_custom_legendary_unit:OnIntervalThink()
	if not IsServer() then
		return
	end

	local interval = self.interval
	if
		self.parent:HasModifier("modifier_smoke_of_deceit") and not self.caster:HasModifier("modifier_smoke_of_deceit")
	then
		self.parent:RemoveModifierByName("modifier_smoke_of_deceit")
	end

	if
		(self.caster:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() <= self.range
		and not self.parent:IsStunned()
		and not self.parent:IsHexed()
		and not self.parent:IsInvisible()
	then
		local target = self.parent:RandomTarget(self.parent:Script_GetAttackRange())
		if
			target and (target:IsHero() or (GameRules:GetDOTATime(false, false) - self.caster.marci_combat_timer) <= 3)
		then
			self.parent:EmitSound("Marci.Wisp_attack_start")
			self.info.Target = target
			ProjectileManager:CreateTrackingProjectile(self.info)

			interval = math.min(self.ability.talents.e7_bva, 1 / self.parent:GetAttacksPerSecond(true))
		end
	end

	self:StartIntervalThink(interval)
end

function modifier_marci_guardian_custom_legendary_unit:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	self.parent:EmitSound("wisp_death")
	self.parent:StopSound("Hero_Wisp.IdleLoop")

	if IsValid(self.tether) and self.ability:IsHidden() and not self.tether:IsHidden() then
		if self.tether:GetToggleState() then
			self.tether:ToggleAbility()
		end
		self.caster:SwapAbilities(self.ability:GetName(), self.tether:GetName(), true, false)
	end

	self.caster.marci_wisp = nil
end

modifier_marci_guardian_custom_legendary_unit_passive = class(mod_hidden)
function modifier_marci_guardian_custom_legendary_unit_passive:RemoveOnDeath()
	return false
end
function modifier_marci_guardian_custom_legendary_unit_passive:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.magic = self.ability.talents.e7_magic
	self.armor = self.ability.talents.e7_armor
	self.bva = self.ability.talents.e7_bva
	self.slow_resist = self.ability.talents.e7_slow_resist
	self.range = self.ability.talents.e7_range

	if not IsServer() then
		return
	end

	self.creep_health = 0
	self:OnIntervalThink(true)
end

function modifier_marci_guardian_custom_legendary_unit_passive:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
	}
end

function modifier_marci_guardian_custom_legendary_unit_passive:OnIntervalThink(init)
	if not IsServer() then
		return
	end

	if not self.caster:IsAlive() then
		self.parent:Kill(nil, nil)
		return
	end

	if not self.parent:IsAlive() then
		return
	end

	local caster_health = math.max(1, self.caster:GetMaxHealth() * self.ability.talents.e7_health)

	if caster_health ~= self.creep_health then
		self.creep_health = caster_health
		self.parent:SetBaseMaxHealth(self.creep_health)
		self.parent:SetMaxHealth(self.creep_health)
		if init then
			self.parent:SetHealth(self.creep_health)
		end
	end

	self:StartIntervalThink(0.5)
end

function modifier_marci_guardian_custom_legendary_unit_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_ATTACK_RANGE_BASE_OVERRIDE,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_marci_guardian_custom_legendary_unit_passive:GetModifierAttackRangeOverride()
	return self.range
end

function modifier_marci_guardian_custom_legendary_unit_passive:GetModifierBaseAttackTimeConstant()
	return self.bva
end

function modifier_marci_guardian_custom_legendary_unit_passive:GetModifierPhysicalArmorBonus()
	return self.armor
end

function modifier_marci_guardian_custom_legendary_unit_passive:GetModifierMagicalResistanceBonus()
	return self.magic
end

function modifier_marci_guardian_custom_legendary_unit_passive:GetModifierSlowResistance_Stacking()
	return self.slow_resist
end

function modifier_marci_guardian_custom_legendary_unit_passive:GetModifierAttackSpeedBonus_Constant()
	if not self.caster:HasModifier("modifier_marci_unleash_custom") then
		return
	end
	return self.ability.talents.r2_speed_legendary
end

marci_summon_custom_wisp_tether = class({})
marci_summon_custom_wisp_tether.talents = {}

function marci_summon_custom_wisp_tether:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e7_range = caster:GetTalentValue("modifier_marci_sidekick_7", "range", true),
			e7_movespeed = caster:GetTalentValue("modifier_marci_sidekick_7", "movespeed", true),
		}
	end
end

function marci_summon_custom_wisp_tether:OnToggle()
	if not IsValid(self.caster.marci_wisp) then
		return
	end

	if self:GetToggleState() then
		self.caster.marci_wisp:AddNewModifier(
			self.caster,
			self,
			"modifier_marci_guardian_custom_legendary_tether_wisp",
			{}
		)
	else
		self.caster.marci_wisp:RemoveModifierByName("modifier_marci_guardian_custom_legendary_tether_wisp")
	end
end

modifier_marci_guardian_custom_legendary_tether_wisp = class(mod_hidden)
function modifier_marci_guardian_custom_legendary_tether_wisp:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		self.effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_wisp/wisp_tether.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			self.effect,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			self.effect,
			1,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			false
		)
		self:AddParticle(self.effect, false, false, -1, true, false)
		return
	end

	self.teleport_range = 1600
	self.flight_speed = 1000
	self.flight_range = 700
	self.flight = false

	self.range = self.ability.talents.e7_range / 3
	self.caster:AddNewModifier(self.caster, self.ability, "modifier_marci_guardian_custom_legendary_tether_speed", {})
	self.parent:AddOrderFilter(self)

	self.caster:EmitSound("Hero_Wisp.Tether.Target")
	self.caster:EmitSound("Hero_Wisp.Tether")
	self.interval = 0.1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_marci_guardian_custom_legendary_tether_wisp:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:ApplyHorizontalMotionController()
end

function modifier_marci_guardian_custom_legendary_tether_wisp:OrderFilter(params)
	if params.order_type ~= DOTA_UNIT_ORDER_MOVE_TO_POSITION then
		return
	end
	self:Destroy()
end

function modifier_marci_guardian_custom_legendary_tether_wisp:UpdateHorizontalMotion(me, dt)
	if me:HasModifier("modifier_marci_guardian_custom_legendary_tether_teleport") then
		return
	end
	if self.parent:IsRooted() or self.parent:IsStunned() or self.parent:IsHexed() then
		return
	end

	local point = self.caster:GetAbsOrigin() - self.caster:GetForwardVector() * self.range
	local speed = self.caster:GetMoveSpeedModifier(self.caster:GetBaseMoveSpeed(), false)

	local vec = (point - me:GetAbsOrigin())
	local dir = vec:Normalized()
	local length = vec:Length2D()
	local caster_length = (me:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D()

	if caster_length >= self.teleport_range then
		me:AddNewModifier(
			me,
			self.ability,
			"modifier_marci_guardian_custom_legendary_tether_teleport",
			{ x = point.x, y = point.y, duration = 0.2 }
		)
		return
	end

	if caster_length >= self.flight_range then
		self.flight = true
	elseif caster_length <= (self.range + 50) then
		self.flight = false
	end

	if length > 25 then
		if self.flight then
			speed = self.flight_speed
		end
		me:SetAbsOrigin(me:GetAbsOrigin() + dir * speed * dt)
	end
end

function modifier_marci_guardian_custom_legendary_tether_wisp:OnDestroy()
	if not IsServer() then
		return
	end
	self.caster:RemoveModifierByName("modifier_marci_guardian_custom_legendary_tether_speed")
	self.caster:StopSound("Hero_Wisp.Tether")
	self.caster:EmitSound("Hero_Wisp.Tether.Stop")

	if self.ability:GetToggleState() then
		self.ability:ToggleAbility()
	end
end

function modifier_marci_guardian_custom_legendary_tether_wisp:CheckState()
	return {
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_marci_guardian_custom_legendary_tether_wisp:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
	}
end

function modifier_marci_guardian_custom_legendary_tether_wisp:GetModifierMoveSpeed_Absolute()
	return 0.1
end

modifier_marci_guardian_custom_legendary_tether_speed = class(mod_visible)
function modifier_marci_guardian_custom_legendary_tether_speed:GetTexture()
	return "wisp_tether"
end
function modifier_marci_guardian_custom_legendary_tether_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.movespeed = self.ability.talents.e7_movespeed
end

function modifier_marci_guardian_custom_legendary_tether_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_marci_guardian_custom_legendary_tether_speed:GetModifierMoveSpeedBonus_Percentage()
	return self.movespeed
end

modifier_marci_guardian_custom_legendary_tether_teleport = class(mod_hidden)
function modifier_marci_guardian_custom_legendary_tether_teleport:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.point = GetGroundPosition(Vector(params.x, params.y, 0), nil)
	self.parent:AddNoDraw()

	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Marci.Sidekick_summon", self.parent)
	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_lone_druid/lone_druid_bear_blink_start.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	self:StartIntervalThink(0.1)
end

function modifier_marci_guardian_custom_legendary_tether_teleport:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
	}
end

function modifier_marci_guardian_custom_legendary_tether_teleport:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:SetAbsOrigin(self.point)
	self:StartIntervalThink(-1)
end

function modifier_marci_guardian_custom_legendary_tether_teleport:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveNoDraw()

	self.parent:EmitSound("Marci.Sidekick_summon")
	self.parent:GenericParticle("particles/units/heroes/hero_lone_druid/lone_druid_bear_blink_end.vpcf")
end