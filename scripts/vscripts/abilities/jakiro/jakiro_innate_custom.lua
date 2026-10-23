--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_jakiro_innate_custom_tracker",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_innate_custom_active_frost",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_jakiro_innate_custom_active_fire",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_jakiro_innate_custom_active_last_spell",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_innate_custom_regen_mana",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_jakiro_hero_2"
)
LinkLuaModifier(
	"modifier_jakiro_innate_custom_regen_heal",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_jakiro_hero_2" }
)
LinkLuaModifier(
	"modifier_jakiro_innate_custom_move",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_jakiro_hero_5"
)
LinkLuaModifier(
	"modifier_jakiro_innate_custom_armor",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_jakiro_hero_5" }
)
LinkLuaModifier(
	"modifier_jakiro_innate_custom_scepter_cd",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_jakiro_innate_custom_scepter_ice",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_jakiro_innate_custom_scepter_fire",
	"abilities/jakiro/jakiro_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)

jakiro_innate_custom = class({})
jakiro_innate_custom.talents = {}

function jakiro_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/jakiro/innate_switch.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_liquid_fire_ready.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_liquid_ice_ready.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/path_legendary_proj_ice.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/path_legendary_proj_fire.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/macropyre_proc.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/fall_2022/phase_boots/phase_boots_fall_2022.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/spells_armor.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/orange_heal.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_ice.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_ice_start.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_arcane.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_ice_end.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_ice_stun.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_fire.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_fire_start.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_fire_end.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_fire_end_2.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_fire_status.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/drow/drow_arcana/drow_arcana_status_effect_frost_arrow.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_liquid_ice_projectile.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_base_attack_fire.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_base_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_base_attack_dual.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_jakiro.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_jakiro", context)
end

function jakiro_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q3 = 0,
			q3_ice_duration = caster:GetTalentValue("modifier_jakiro_dual_3", "ice_duration", true),
			q3_effect_duration = caster:GetTalentValue("modifier_jakiro_dual_3", "effect_duration", true),

			has_q4 = 0,
			q4_cd_items = caster:GetTalentValue("modifier_jakiro_dual_4", "cd_items", true) / 100,

			has_q7 = 0,
			q7_spell_timer = caster:GetTalentValue("modifier_jakiro_dual_7", "spell_timer", true),
			q7_cd = caster:GetTalentValue("modifier_jakiro_dual_7", "cd", true) / 100,

			has_w3 = 0,

			has_w7 = 0,
			w7_duration = caster:GetTalentValue("modifier_jakiro_path_7", "duration", true),
			w7_effect_duration = caster:GetTalentValue("modifier_jakiro_path_7", "effect_duration", true),

			has_e3 = 0,
			e3_duration_creeps = caster:GetTalentValue("modifier_jakiro_liquid_3", "duration_creeps", true),
			e3_duration = caster:GetTalentValue("modifier_jakiro_liquid_3", "duration", true),

			r3_damage = 0,
			r3_talent_cd = caster:GetTalentValue("modifier_jakiro_macropyre_3", "talent_cd", true),
			r3_chance = caster:GetTalentValue("modifier_jakiro_macropyre_3", "chance", true),
			r3_slow_duration = caster:GetTalentValue("modifier_jakiro_macropyre_3", "slow_duration", true),

			has_h2 = 0,
			h2_mana = 0,
			h2_heal = 0,
			h2_base = 0,
			h2_duration = caster:GetTalentValue("modifier_jakiro_hero_2", "duration", true),

			has_h3 = 0,
			h3_status = 0,
			h3_move = 0,

			has_h4 = 0,
			h4_silence = caster:GetTalentValue("modifier_jakiro_hero_4", "silence", true),
			h4_talent_cd = caster:GetTalentValue("modifier_jakiro_hero_4", "talent_cd", true),

			has_h5 = 0,
			h5_magic = caster:GetTalentValue("modifier_jakiro_hero_5", "magic", true),
			h5_armor = caster:GetTalentValue("modifier_jakiro_hero_5", "armor", true),
			h5_slow_resist = caster:GetTalentValue("modifier_jakiro_hero_5", "slow_resist", true),
			h5_move = caster:GetTalentValue("modifier_jakiro_hero_5", "move", true),
			h5_duration = caster:GetTalentValue("modifier_jakiro_hero_5", "duration", true),
		}
	end

	if caster:HasTalent("modifier_jakiro_dual_3") then
		self.talents.has_q3 = 1
	end

	if caster:HasTalent("modifier_jakiro_dual_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_jakiro_dual_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_jakiro_path_3") then
		self.talents.has_w3 = 1
	end

	if caster:HasTalent("modifier_jakiro_path_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_jakiro_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_mana = caster:GetTalentValue("modifier_jakiro_hero_2", "mana") / 100
		self.talents.h2_heal = caster:GetTalentValue("modifier_jakiro_hero_2", "heal") / 100
		self.talents.h2_base = caster:GetTalentValue("modifier_jakiro_hero_2", "base")
	end

	if caster:HasTalent("modifier_jakiro_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_status = caster:GetTalentValue("modifier_jakiro_hero_3", "status")
		self.talents.h3_move = caster:GetTalentValue("modifier_jakiro_hero_3", "move")
	end

	if caster:HasTalent("modifier_jakiro_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_jakiro_hero_5") then
		self.talents.has_h5 = 1
	end

	if caster:HasTalent("modifier_jakiro_liquid_3") then
		self.talents.has_e3 = 1
	end

	if caster:HasTalent("modifier_jakiro_macropyre_3") then
		self.talents.r3_damage = caster:GetTalentValue("modifier_jakiro_macropyre_3", "damage") / 100
		caster:AddDamageEvent_out(self.tracker, true)
	end
end

function jakiro_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_jakiro_innate_custom_tracker"
end

function jakiro_innate_custom:OnSpellStart()
	if not IsValid(self.tracker) then
		return
	end
	self.tracker:Switch()
end

function jakiro_innate_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if not self.caster:HasScepter() then
		return
	end
	if not self.tracker then
		return
	end

	self.tracker:ScepterInit()
end

function jakiro_innate_custom:SpellCast(ability, type)
	if not IsServer() then
		return
	end

	if self.talents.has_h2 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self,
			"modifier_jakiro_innate_custom_regen_mana",
			{ duration = self.talents.h2_duration }
		)
		if type == 1 or self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") then
			self.parent:AddNewModifier(
				self.parent,
				self,
				"modifier_jakiro_innate_custom_regen_heal",
				{ duration = self.talents.h2_duration }
			)
		end
	end

	if self.talents.has_h5 == 1 then
		if type == 0 then
			self.parent:RemoveModifierByName("modifier_jakiro_innate_custom_move")
			self.parent:AddNewModifier(
				self.parent,
				self,
				"modifier_jakiro_innate_custom_move",
				{ duration = self.talents.h5_duration }
			)
		end
		if type == 1 or self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") then
			self.parent:AddNewModifier(
				self.parent,
				self,
				"modifier_jakiro_innate_custom_armor",
				{ duration = self.talents.h5_duration }
			)
		end
	end

	if self.talents.has_w3 == 1 and IsValid(self.caster.path_ability) then
		local timer = 0
		if ability == self.caster.liquid_ability then
			timer = 0.15
		end
		Timers:CreateTimer(timer, function()
			self.caster.path_ability:AbilityAttacks(type)
		end)
	end

	if
		self.talents.has_w7 == 1
		and IsValid(self.caster.path_ability)
		and not self.caster:HasModifier("modifier_jakiro_ice_path_custom_legendary_active")
	then
		self.caster:AddNewModifier(
			self.caster,
			self.caster.path_ability,
			"modifier_jakiro_ice_path_custom_legendary_stack",
			{ duration = self.talents.w7_effect_duration }
		)
	end

	if self.talents.has_q7 == 0 then
		return 0
	end

	local new_spell = 0
	local mod = self.caster:FindModifierByName("modifier_jakiro_innate_custom_active_last_spell")
	if
		not mod
		or mod.is_ice ~= type
		or self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve")
	then
		new_spell = 1
	end

	if mod and new_spell == 1 and IsValid(self.caster.dual_ability) then
		self.caster:CdAbility(self.caster.dual_ability, nil, self.talents.q7_cd, "modifier_jakiro_dual_7")
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_jakiro_innate_custom_active_last_spell",
		{ duration = self.talents.q7_spell_timer, is_ice = type }
	)

	return new_spell
end

function jakiro_innate_custom:AbilityHit(target, ability, type)
	if not IsServer() then
		return
	end

	if
		self.talents.has_h4 == 1
		and ability == self.parent.dual_ability
		and target:CheckCd("jakiro_h4", self.talents.h4_talent_cd)
	then
		local mods = {}
		local alt_table

		if type == 1 then
			table.insert(mods, "modifier_jakiro_dual_breath_custom_disarm")
			alt_table = self.fire_mods
		else
			table.insert(mods, "modifier_generic_silence")
			alt_table = self.ice_mods
		end

		for mod_name, _ in pairs(alt_table) do
			if
				target:HasModifier(mod_name)
				or self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve")
			then
				if type == 1 then
					table.insert(mods, "modifier_generic_silence")
				else
					table.insert(mods, "modifier_jakiro_dual_breath_custom_disarm")
				end
				break
			end
		end
		for _, mod_name in pairs(mods) do
			target:AddNewModifier(
				self.parent,
				self.parent.dual_ability,
				mod_name,
				{ duration = (1 - target:GetStatusResistance()) * self.talents.h4_silence, use_sound = 1 }
			)
		end
	end
end

modifier_jakiro_innate_custom_tracker = class(mod_hidden)
function modifier_jakiro_innate_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.jakiro_innate = self.ability

	self.ability.fire_move = self.ability:GetSpecialValueFor("fire_move")
	self.ability.ice_reduce = self.ability:GetSpecialValueFor("ice_reduce")

	self.ability.scepter_shield = self.ability:GetSpecialValueFor("scepter_shield") / 100
	self.ability.scepter_duration = self.ability:GetSpecialValueFor("scepter_duration")
	self.ability.scepter_cd = self.ability:GetSpecialValueFor("scepter_cd")
	self.ability.scepter_radius = self.ability:GetSpecialValueFor("scepter_radius")
	self.ability.scepter_heal = self.ability:GetSpecialValueFor("scepter_heal") / 100
	self.ability.scepter_fire_damage = self.ability:GetSpecialValueFor("scepter_fire_damage") / 100
	self.ability.scepter_fire_duration = self.ability:GetSpecialValueFor("scepter_fire_duration")
	self.ability.scepter_fire_heal = self.ability:GetSpecialValueFor("scepter_fire_heal") / 100
	self.ability.scepter_fire_interval = self.ability:GetSpecialValueFor("scepter_fire_interval")
	self.ability.scepter_ice_stun = self.ability:GetSpecialValueFor("scepter_ice_stun")

	if not IsServer() then
		return
	end

	self.ability.fire_mods = {
		["modifier_jakiro_dual_breath_custom_fire_debuff"] = true,
		["modifier_jakiro_ice_path_custom_fire_debuff"] = true,
		["modifier_jakiro_liquid_fire_custom_fire_debuff"] = true,
		["modifier_jakiro_macropyre_custom_fire"] = true,
		["modifier_jakiro_innate_custom_scepter_fire"] = true,
	}

	self.ability.ice_mods = {
		["modifier_jakiro_dual_breath_custom_ice_debuff"] = true,
		["modifier_jakiro_ice_path_custom_frost_debuff"] = true,
		["modifier_jakiro_liquid_fire_custom_ice_debuff"] = true,
		["modifier_jakiro_macropyre_custom_frost"] = true,
	}

	self.active_mods = {}
	self.current_think = false
	self.interval = 1

	Timers:CreateTimer(0.2, function()
		self:Switch()
		self:ScepterInit()
	end)
end

function modifier_jakiro_innate_custom_tracker:ScepterInit()
	if not IsServer() then
		return
	end
	if self.scepter_init then
		return
	end
	if self.ability:IsStolen() then
		return
	end
	if not self.parent:HasScepter() then
		return
	end

	self.scepter_init = true
	self.parent:AddDamageEvent_inc(self, true)
end

function modifier_jakiro_innate_custom_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if not self.parent:HasScepter() then
		return
	end
	if not params.lethal_damage then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_jakiro_innate_custom_scepter_cd") then
		return
	end
	if IsValid(self.shield_mod) then
		return
	end

	local is_ice = self.parent:HasModifier("modifier_jakiro_innate_custom_active_frost")
	self.parent:Purge(false, true, false, true, true)

	self.shield_mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield_multiple", {
		duration = self.ability.scepter_duration,
		max_shield = self.parent:GetMaxHealth() * self.ability.scepter_shield,
		start_full = 1,
		shield_talent = "Scepter",
		status_effect = is_ice and "particles/econ/items/drow/drow_arcana/drow_arcana_status_effect_frost_arrow.vpcf"
			or "particles/jakiro/scepter_shield_fire_status.vpcf",
	})

	if self.shield_mod then
		if is_ice then
			self.shield_mod.is_ice = 1
			self.parent:EmitSound("Jakiro.Scepter_shield_ice")
			self.parent:EmitSound("Jakiro.Scepter_shield_ice2")

			self.parent:GenericParticle("particles/jakiro/scepter_shield_ice_start.vpcf", self.shield_mod)
			self.parent:GenericParticle("particles/crystal_maiden/maiden_arcane.vpcf")

			self.pfx = ParticleManager:CreateParticle(
				"particles/jakiro/scepter_shield_ice.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				self.pfx,
				1,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				false
			)
			ParticleManager:SetParticleControl(self.pfx, 2, Vector(90, 90, 90))
			self.shield_mod:AddParticle(self.pfx, false, false, -1, false, false)
		else
			self.particle = ParticleManager:CreateParticle(
				"particles/jakiro/scepter_shield_fire.vpcf",
				PATTACH_CUSTOMORIGIN,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				self.particle,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetOrigin(),
				true
			)
			self.shield_mod:AddParticle(self.particle, false, false, -1, false, false)

			self.parent:GenericParticle("particles/jakiro/scepter_shield_fire_start.vpcf", self.shield_mod)
			self.parent:EmitSound("Jakiro.Scepter_shield_fire")
			self.parent:EmitSound("Jakiro.Scepter_shield_fire2")
		end

		self.shield_mod:SetHitFunction(function(damage)
			self.parent:GenericHeal(damage * self.ability.scepter_heal, self.ability, true, "", "Scepter")
		end)

		self.shield_mod:SetEndFunction(function(killer)
			local point = self.parent:GetAbsOrigin()
			local targets = self.parent:FindTargets(self.ability.scepter_radius)
			if IsValid(killer) and (killer:GetAbsOrigin() - point):Length2D() > self.ability.scepter_radius then
				table.insert(targets, killer)
			end

			local mod_name
			local duration

			if self.shield_mod.is_ice == 1 then
				self.parent:EmitSound("Jakiro.Scepter_shield_end_ice")
				self.parent:EmitSound("Jakiro.Scepter_shield_end_ice2")
				mod_name = "modifier_jakiro_innate_custom_scepter_ice"
				duration = self.ability.scepter_ice_stun

				local effect_cast = ParticleManager:CreateParticle(
					"particles/jakiro/scepter_shield_ice_end.vpcf",
					PATTACH_WORLDORIGIN,
					nil
				)
				ParticleManager:SetParticleControl(effect_cast, 0, point)
				ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.ability.scepter_radius, 2, 1000))

				Timers:CreateTimer(2, function()
					ParticleManager:DestroyParticle(effect_cast, false)
					ParticleManager:ReleaseParticleIndex(effect_cast)
				end)
			else
				mod_name = "modifier_jakiro_innate_custom_scepter_fire"
				self.parent:EmitSound("Jakiro.Scepter_shield_end_fire")
				self.parent:EmitSound("Jakiro.Scepter_shield_end_fire2")

				local effect = ParticleManager:CreateParticle(
					"particles/jakiro/scepter_shield_fire_end_2.vpcf",
					PATTACH_CUSTOMORIGIN,
					self.parent
				)
				ParticleManager:SetParticleControlEnt(
					effect,
					0,
					self.parent,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					self.parent:GetOrigin(),
					true
				)
				ParticleManager:ReleaseParticleIndex(effect)

				local particle = ParticleManager:CreateParticle(
					"particles/jakiro/scepter_shield_fire_end.vpcf",
					PATTACH_WORLDORIGIN,
					nil
				)
				ParticleManager:SetParticleControl(particle, 0, point)
				ParticleManager:SetParticleControl(particle, 1, Vector(self.ability.scepter_radius * 0.8, 0, 0))
				ParticleManager:SetParticleControl(particle, 3, point)
				ParticleManager:ReleaseParticleIndex(particle)
			end

			for _, target in pairs(targets) do
				if self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") then
					target:AddNewModifier(self.parent, self.ability, "modifier_jakiro_innate_custom_scepter_fire", {})
				end
				target:AddNewModifier(self.parent, self.ability, mod_name, { duration = duration })
			end
		end)
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_jakiro_innate_custom_scepter_cd",
		{ duration = self.ability.scepter_cd }
	)
end

function modifier_jakiro_innate_custom_tracker:UpdateMod(mod, remove)
	if not IsServer() then
		return
	end
	if self.ability:IsStolen() then
		return
	end

	local target = mod.parent
	local ability = mod.ability

	if not target or not ability then
		return
	end

	if remove then
		self.active_mods[mod] = nil
	else
		self.active_mods[mod] = true
		if self.ability.talents.has_q3 == 1 and self.ability.ice_mods[mod:GetName()] then
			target:AddNewModifier(
				self.parent,
				self.parent.dual_ability,
				"modifier_jakiro_dual_breath_custom_heal_reduce",
				{ duration = self.ability.talents.q3_ice_duration }
			)
		end
	end

	local has_mod = false
	for check_mod, _ in pairs(self.active_mods) do
		if IsValid(check_mod) then
			has_mod = true
		else
			self.active_mods[check_mod] = nil
		end
	end

	if has_mod then
		if not self.current_think then
			self.current_think = true
			self:StartIntervalThink(self.interval)
		end
	else
		self.current_think = false
		self:StartIntervalThink(-1)
	end
end

function modifier_jakiro_innate_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	local proc_cd = false
	local magic_proced = {}
	local heal_proced = {}
	local has_liquid = false
	local proc_cdr = false

	for mod, _ in pairs(self.active_mods) do
		if IsValid(mod) and mod.parent and mod.ability then
			local target = mod.parent

			if target:IsRealHero() then
				if
					self.ability.talents.has_q4 == 1
					and (mod.ability == self.parent.dual_ability or mod.ability == self.parent.macropyre_ability)
				then
					proc_cd = true
				end
				if self.parent.macropyre_ability and mod.ability == self.parent.macropyre_ability then
					proc_cdr = true
				end
			end
			if self.parent.liquid_ability and mod.ability == self.parent.liquid_ability then
				if target:IsHero() then
					has_liquid = 1
				elseif has_liquid ~= 1 then
					has_liquid = 0
				end
			end
			if self.ability.talents.has_q3 == 1 then
				if self.ability.fire_mods[mod:GetName()] and not magic_proced[target] then
					magic_proced[target] = true
					target:AddNewModifier(
						self.parent,
						self.parent.dual_ability,
						"modifier_jakiro_dual_breath_custom_magic_reduce",
						{ duration = self.ability.talents.q3_effect_duration }
					)
				end
				if self.ability.ice_mods[mod:GetName()] and not heal_proced[target] then
					heal_proced[target] = true
					target:AddNewModifier(
						self.parent,
						self.parent.dual_ability,
						"modifier_jakiro_dual_breath_custom_heal_reduce",
						{ duration = self.ability.talents.q3_ice_duration }
					)
				end
			end
		end
	end

	if proc_cdr then
		self.parent:AddNewModifier(
			self.parent,
			self.parent.macropyre_ability,
			"modifier_jakiro_macropyre_custom_cdr",
			{}
		)
		if self.parent:GetQuest() == "Jakiro.Quest_8" and not self.parent:QuestCompleted() then
			self.parent:UpdateQuest(1)
		end
	end

	if proc_cd then
		self.parent:CdItems(self.interval * self.ability.talents.q4_cd_items, "modifier_jakiro_dual_4")
	end

	if has_liquid then
		if self.ability.talents.has_e3 == 1 then
			local duration = has_liquid == 1 and self.ability.talents.e3_duration
				or self.ability.talents.e3_duration_creeps
			local mod = self.parent:FindModifierByName("modifier_jakiro_liquid_fire_custom_speed")
			if mod then
				duration = math.max(mod:GetRemainingTime(), duration)
			end
			self.parent:AddNewModifier(
				self.parent,
				self.parent.liquid_ability,
				"modifier_jakiro_liquid_fire_custom_speed",
				{ duration = duration }
			)
		end
	end
end

function modifier_jakiro_innate_custom_tracker:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_jakiro_innate_custom_active_frost")
	self.parent:RemoveModifierByName("modifier_jakiro_innate_custom_active_fire")
end

function modifier_jakiro_innate_custom_tracker:Switch()
	if not IsServer() then
		return
	end

	if self.parent:HasModifier("modifier_jakiro_innate_custom_active_fire") then
		self.parent:RemoveModifierByName("modifier_jakiro_innate_custom_active_fire")
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_jakiro_innate_custom_active_frost", {})
	else
		self.parent:RemoveModifierByName("modifier_jakiro_innate_custom_active_frost")
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_jakiro_innate_custom_active_fire", {})
	end
end

function modifier_jakiro_innate_custom_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	local target = params.unit
	if not target:IsUnit() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not self.parent.macropyre_ability then
		return
	end
	if params.custom_flag ~= "jakiro_fire" then
		return
	end
	if not target:CheckCd("jakiro_r3", self.ability.talents.r3_talent_cd, self.ability.talents.r3_chance, 9121) then
		return
	end

	target:EmitSound("Jakiro.Macropyre_proc")

	local effect =
		ParticleManager:CreateParticle("particles/jakiro/macropyre_proc.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(effect)

	target:AddNewModifier(
		self.parent,
		self.parent.macropyre_ability,
		"modifier_jakiro_macropyre_custom_slow",
		{ duration = self.ability.talents.r3_slow_duration }
	)

	local damageTable = {
		victim = target,
		attacker = self.parent,
		ability = self.parent.macropyre_ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		damage = self.parent.macropyre_ability:GetDamage(target) * self.ability.talents.r3_damage,
	}
	DoDamage(damageTable, "modifier_jakiro_macropyre_3")
end

function modifier_jakiro_innate_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROJECTILE_NAME,
		MODIFIER_PROPERTY_MIN_HEALTH,
	}
end

function modifier_jakiro_innate_custom_tracker:GetMinHealth()
	if not IsServer() then
		return
	end
	if not self.scepter_init then
		return
	end
	if not self.parent:HasScepter() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if IsValid(self.shield_mod) then
		return
	end
	if self.parent:HasModifier("modifier_jakiro_innate_custom_scepter_cd") then
		return
	end
	return 1
end

function modifier_jakiro_innate_custom_tracker:GetPriority()
	if
		self.parent:HasModifier("modifier_jakiro_ice_path_custom_legendary_active")
		or self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_proc_ice")
		or self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_proc")
	then
		return MODIFIER_PRIORITY_SUPER_ULTRA
	end
	return MODIFIER_PRIORITY_LOW
end

function modifier_jakiro_innate_custom_tracker:GetModifierProjectileName()
	local mod = self.parent:FindModifierByName("modifier_jakiro_ice_path_custom_legendary_active")
	if mod then
		if mod.type == 1 then
			return "particles/jakiro/path_legendary_proj_ice.vpcf"
		end
		return "particles/jakiro/path_legendary_proj_fire.vpcf"
	end

	if self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_proc_ice") then
		return "particles/units/heroes/hero_jakiro/jakiro_liquid_ice_projectile.vpcf"
	end

	if self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_proc") then
		return "particles/units/heroes/hero_jakiro/jakiro_base_attack_fire.vpcf"
	end

	if self.parent:HasModifier("modifier_jakiro_innate_custom_active_frost") and not self.parent.jakiro_e7 then
		return "particles/units/heroes/hero_jakiro/jakiro_base_attack.vpcf"
	else
		return "particles/units/heroes/hero_jakiro/jakiro_base_attack_dual.vpcf"
	end
end

modifier_jakiro_innate_custom_active_frost = class(mod_hidden)
function modifier_jakiro_innate_custom_active_frost:RemoveOnDeath()
	return false
end
function modifier_jakiro_innate_custom_active_frost:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.parent:GenericParticle("particles/jakiro/innate_switch.vpcf")
	self.parent:EmitSound("Jakiro.Innate_switch_ice")

	local effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_jakiro/jakiro_liquid_ice_ready.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		false
	)
	self:AddParticle(effect, false, false, -1, false, false)
end

function modifier_jakiro_innate_custom_active_frost:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_jakiro_innate_custom_active_frost:GetModifierIncomingDamage_Percentage()
	return self.ability.ice_reduce
end

function modifier_jakiro_innate_custom_active_frost:GetModifierStatusResistanceStacking()
	return self.ability.talents.h3_status or 0
end

modifier_jakiro_innate_custom_active_fire = class(mod_hidden)
function modifier_jakiro_innate_custom_active_fire:RemoveOnDeath()
	return false
end
function modifier_jakiro_innate_custom_active_fire:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Jakiro.Innate_switch_fire")

	local effect_cast =
		ParticleManager:CreateParticle("particles/jakiro/innate_switch.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(1, 0, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	local effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_jakiro/jakiro_liquid_fire_ready.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.parent:GetAbsOrigin(),
		false
	)
	self:AddParticle(effect, false, false, -1, false, false)
end

function modifier_jakiro_innate_custom_active_fire:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
	}
end

function modifier_jakiro_innate_custom_active_fire:GetModifierMoveSpeedBonus_Constant()
	return self.ability.fire_move + (self.ability.talents.h3_move or 0)
end

modifier_jakiro_innate_custom_active_last_spell = class(mod_hidden)
function modifier_jakiro_innate_custom_active_last_spell:RemoveOnDeath()
	return false
end
function modifier_jakiro_innate_custom_active_last_spell:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true
	self.is_ice = table.is_ice
	self:CheckUI()
end

function modifier_jakiro_innate_custom_active_last_spell:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:OnCreated(table)
end

function modifier_jakiro_innate_custom_active_last_spell:OnDestroy()
	if not IsServer() then
		return
	end
	self:CheckUI()
end

function modifier_jakiro_innate_custom_active_last_spell:CheckUI()
	if not IsServer() then
		return
	end

	if self.ability.talents.has_q7 == 1 and IsValid(self.parent.dual_ability) and self.parent.dual_ability.tracker then
		self.parent.dual_ability.tracker:UpdateUI()
	end
end

modifier_jakiro_innate_custom_regen_mana = class(mod_visible)
function modifier_jakiro_innate_custom_regen_mana:GetTexture()
	return "buffs/jakiro/hero_2"
end
function modifier_jakiro_innate_custom_regen_mana:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.mana = (self.ability.talents.h2_base + self.parent:GetMaxMana() * self.ability.talents.h2_mana)
		/ self.ability.talents.h2_duration
end

function modifier_jakiro_innate_custom_regen_mana:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
	}
end

function modifier_jakiro_innate_custom_regen_mana:GetModifierConstantManaRegen()
	return self.mana
end

modifier_jakiro_innate_custom_regen_heal = class(mod_hidden)
function modifier_jakiro_innate_custom_regen_heal:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.heal = (self.ability.talents.h2_base + self.parent:GetMaxHealth() * self.ability.talents.h2_heal)
		/ self.ability.talents.h2_duration
end

function modifier_jakiro_innate_custom_regen_heal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_jakiro_innate_custom_regen_heal:GetModifierConstantHealthRegen()
	return self.heal
end

modifier_jakiro_innate_custom_move = class(mod_hidden)
function modifier_jakiro_innate_custom_move:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/econ/events/fall_2022/phase_boots/phase_boots_fall_2022.vpcf", self)
end

function modifier_jakiro_innate_custom_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_jakiro_innate_custom_move:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.h5_move
end

function modifier_jakiro_innate_custom_move:GetModifierSlowResistance_Stacking()
	return self.ability.talents.h5_slow_resist
end

modifier_jakiro_innate_custom_armor = class(mod_hidden)
function modifier_jakiro_innate_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/jakiro/spells_armor.vpcf", self)
end

function modifier_jakiro_innate_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_jakiro_innate_custom_armor:GetModifierMagicalResistanceBonus()
	return self.ability.talents.h5_magic
end

function modifier_jakiro_innate_custom_armor:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h5_armor
end

modifier_jakiro_innate_custom_scepter_cd = class(mod_cd)

modifier_jakiro_innate_custom_scepter_ice = class(mod_hidden)
function modifier_jakiro_innate_custom_scepter_ice:GetStatusEffectName()
	return "particles/econ/items/drow/drow_arcana/drow_arcana_status_effect_frost_arrow.vpcf"
end
function modifier_jakiro_innate_custom_scepter_ice:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_jakiro_innate_custom_scepter_ice:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Jakiro.Scepter_shield_ice_stun")
	self.parent:GenericParticle("particles/jakiro/scepter_shield_ice_stun.vpcf", self)
end

function modifier_jakiro_innate_custom_scepter_ice:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_FROZEN] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
	}
end

modifier_jakiro_innate_custom_scepter_fire = class(mod_hidden)
function modifier_jakiro_innate_custom_scepter_fire:GetStatusEffectName()
	return "particles/status_fx/status_effect_burn.vpcf"
end
function modifier_jakiro_innate_custom_scepter_fire:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_jakiro_innate_custom_scepter_fire:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = self.ability.scepter_fire_interval
	self.count = self.ability.scepter_fire_duration / self.interval
	self.damage = self.ability.scepter_fire_damage / self.ability.scepter_fire_duration
	self.heal = self.ability.scepter_fire_heal

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Jakiro.Scepter_fire_burn")

	self.parent:GenericParticle(
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		self
	)
	self.ability.tracker:UpdateMod(self)

	self.damageTable = {
		attacker = self.caster,
		victim = self.parent,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		custom_flag = "jakiro_fire",
	}

	self:OnIntervalThink(true)
	self:StartIntervalThink(self.interval)
end

function modifier_jakiro_innate_custom_scepter_fire:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability.tracker:UpdateMod(self, true)
	self.parent:StopSound("Jakiro.Scepter_fire_burn")
end

function modifier_jakiro_innate_custom_scepter_fire:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	local damage = self.parent:GetMaxHealth() * self.damage * self.interval
	if first then
		damage = self.parent:GetMaxHealth() * self.ability.scepter_fire_damage
	end
	self.damageTable.damage = damage
	local real_damage = DoDamage(self.damageTable, "Scepter")

	local result = self.caster:CanLifesteal(self.parent)
	if result then
		self.caster:GenericHeal(
			result * real_damage * self.heal,
			self.ability,
			true,
			"particles/jakiro/orange_heal.vpcf",
			"Scepter"
		)
	end

	if first then
		return
	end

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end