--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury_legendary_thinker",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury_legendary_fly",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury_legendary_pause",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury_legendary_damage",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_juggernaut_bladefury_7"
)
LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury_anim",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury_tracker",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury_slow",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_juggernaut_bladefury_4"
)
LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury_aura",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury_resist",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_juggernaut_bladefury_3"
)
LinkLuaModifier(
	"modifier_custom_juggernaut_blade_fury_resist_status",
	"abilities/juggernaut/custom_juggernaut_blade_fury.lua",
	LUA_MODIFIER_MOTION_NONE
)

custom_juggernaut_blade_fury = class({})
custom_juggernaut_blade_fury.talents = {}

function custom_juggernaut_blade_fury:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_juggernaut/juggernaut_blade_fury_tgt.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_juggernaut/juggernaut_blade_fury.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_small_fury.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/ember_slow.vpcf", context)
	PrecacheResource("particle", "particles/shadow_fiend/sf_refresh_a.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/bush_damage.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/bladefury_stack.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_charge_mark.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/vindicators_axe_armor.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_minotaur_horn.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_juggernaut/juggernaut_blade_fury_null.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/fury_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_omni_proc.vpcf", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_juggernaut", context)
end

function custom_juggernaut_blade_fury:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q1_heal = 0,
			q1_damage = 0,

			q2_cd = 0,
			q2_radius = 0,

			has_q3 = 0,
			q3_magic = 0,
			q3_heal_reduce = 0,
			q3_max = caster:GetTalentValue("modifier_juggernaut_bladefury_3", "max", true),
			q3_duration = caster:GetTalentValue("modifier_juggernaut_bladefury_3", "duration", true),

			has_q4 = 0,
			q4_slow = caster:GetTalentValue("modifier_juggernaut_bladefury_4", "slow", true),

			has_q7 = 0,
			q7_stack_init = caster:GetTalentValue("modifier_juggernaut_bladefury_7", "stack_init", true),
			q7_timer = caster:GetTalentValue("modifier_juggernaut_bladefury_7", "timer", true),
			q7_damage = caster:GetTalentValue("modifier_juggernaut_bladefury_7", "damage", true) / 100,
			q7_max = caster:GetTalentValue("modifier_juggernaut_bladefury_7", "max", true),

			has_h4 = 0,
			h4_duration = caster:GetTalentValue("modifier_juggernaut_hero_4", "duration", true),
			h4_damage_reduce = caster:GetTalentValue("modifier_juggernaut_hero_4", "damage_reduce", true),

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_juggernaut_bladefury_1") then
		self.talents.q1_heal = caster:GetTalentValue("modifier_juggernaut_bladefury_1", "heal") / 100
		self.talents.q1_damage = caster:GetTalentValue("modifier_juggernaut_bladefury_1", "damage")
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_juggernaut_bladefury_1", type = 1, value = self.talents.q1_heal }
		)
	end

	if caster:HasTalent("modifier_juggernaut_bladefury_2") then
		self.talents.q2_cd = caster:GetTalentValue("modifier_juggernaut_bladefury_2", "cd")
		self.talents.q2_radius = caster:GetTalentValue("modifier_juggernaut_bladefury_2", "radius")
	end

	if caster:HasTalent("modifier_juggernaut_bladefury_3") then
		self.talents.has_q3 = 1
		self.talents.q3_magic = caster:GetTalentValue("modifier_juggernaut_bladefury_3", "magic")
		self.talents.q3_heal_reduce = caster:GetTalentValue("modifier_juggernaut_bladefury_3", "heal_reduce")
	end

	if caster:HasTalent("modifier_juggernaut_bladefury_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_juggernaut_bladefury_7") then
		self.talents.has_q7 = 1
		if IsServer() then
			self.tracker:UpdateUI()
			if name == "modifier_juggernaut_bladefury_7" and dota1x6.current_wave >= upgrade_orange then
				caster:AddNewModifier(
					caster,
					self,
					"modifier_custom_juggernaut_blade_fury_legendary_damage",
					{ stack = self.talents.q7_stack_init }
				)
			end
		end
	end

	if caster:HasTalent("modifier_juggernaut_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_juggernaut_omnislash_7") then
		self.talents.has_r7 = 1
	end
end

function custom_juggernaut_blade_fury:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "juggernaut_blade_fury", self)
end

function custom_juggernaut_blade_fury:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_juggernaut_blade_fury_tracker"
end

function custom_juggernaut_blade_fury:GetRadius()
	return (self.blade_fury_radius or 0) + (self.talents.q2_radius or 0)
end

function custom_juggernaut_blade_fury:GetEffectDuration()
	return (self.duration or 0) + (self.talents.has_h4 == 1 and self.talents.h4_duration or 0)
end

function custom_juggernaut_blade_fury:GetManaCost(level)
	if self.talents.has_h4 == 1 and self.caster:HasModifier("modifier_custom_juggernaut_blade_fury") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function custom_juggernaut_blade_fury:GetCastRange(vLocation, hTarget)
	return self:GetRadius() - self.caster:GetCastRangeBonus()
end

function custom_juggernaut_blade_fury:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.q2_cd or 0)
end

function custom_juggernaut_blade_fury:OnSpellStart()
	if self.talents.has_h4 == 1 and self.caster:HasModifier("modifier_custom_juggernaut_blade_fury") then
		self.caster:RemoveModifierByName("modifier_custom_juggernaut_blade_fury")
		return
	end

	self.caster:RemoveModifierByName("modifier_custom_juggernaut_blade_fury")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_juggernaut_blade_fury",
		{ duration = self:GetEffectDuration() + 0.1, anim = 1 }
	)
end

modifier_custom_juggernaut_blade_fury = class(mod_visible)
function modifier_custom_juggernaut_blade_fury:IsAura()
	return IsServer() and not self.is_thinker and self.caster:IsAlive()
end
function modifier_custom_juggernaut_blade_fury:GetModifierAura()
	return "modifier_custom_juggernaut_blade_fury_aura"
end
function modifier_custom_juggernaut_blade_fury:GetAuraRadius()
	return self.radius
end
function modifier_custom_juggernaut_blade_fury:GetAuraDuration()
	return 0
end
function modifier_custom_juggernaut_blade_fury:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_custom_juggernaut_blade_fury:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_custom_juggernaut_blade_fury:OnCreated(table)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true

	self.tick = self.ability.interval
	self.damage = (self.ability.blade_fury_damage + self.ability.talents.q1_damage) * self.tick
	self.radius = self.ability:GetRadius()

	if not IsServer() then
		return
	end

	local mod = self.caster:FindModifierByName("modifier_custom_juggernaut_blade_fury_legendary_damage")
	if mod then
		self.damage = self.damage * (1 + mod:GetStackCount() * self.ability.talents.q7_damage)
	end

	self.max_count = self.ability:GetEffectDuration() / self.tick
	self.count = 0
	self.silence_targets = {}

	self.is_thinker = self.parent:HasModifier("modifier_custom_juggernaut_blade_fury_legendary_thinker")
	self.proced = false
	self.proc_timer = 0
	self.damage_ability = "modifier_juggernaut_bladefury_7"

	if not self.is_thinker then
		self.ability:EndCd()
		self.caster:Purge(false, true, false, false, false)
		self.caster:StartGesture(ACT_DOTA_OVERRIDE_ABILITY_1)
		self.damage_ability = nil
		self.bkb_mod = self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ magic_damage = self.ability.magic_resist }
		)

		if self.ability.talents.has_h4 == 1 then
			self.ability:SetActivated(true)
			self.ability:StartCooldown(0.5)
			self.parent:GenericParticle("particles/items2_fx/vindicators_axe_armor.vpcf", self)
		end
	end

	self.damageTable =
		{ attacker = self.caster, damage = self.damage, damage_type = DAMAGE_TYPE_MAGICAL, ability = self.ability }
	self.tgt_effect = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_juggernaut/juggernaut_blade_fury_tgt.vpcf",
		self.ability
	)

	self.sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Juggernaut.BladeFury.Impact", self.ability)
	self.sound_lp = wearables_system:GetSoundReplacement(self.caster, "Hero_Juggernaut.BladeFuryStart", self.ability)

	EmitSoundOn(self.sound_lp, self.parent)

	local particle_cast = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_juggernaut/juggernaut_blade_fury.vpcf",
		self.ability
	)
	local particle_cast_2 = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_juggernaut/juggernaut_blade_fury_null.vpcf",
		self
	)

	if self.is_thinker then
		local effect_cast = ParticleManager:CreateParticle(
			"particles/juggernaut/jugg_small_fury.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(effect_cast, 5, Vector(self.radius / 1.6, 0, 0))
		self:AddParticle(effect_cast, false, false, -1, false, false)
	end

	local effect_cast = ParticleManager:CreateParticle(particle_cast, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(effect_cast, 5, Vector(self.radius * 1.2, 0, 0))
	self:AddParticle(effect_cast, false, false, -1, false, false)

	if particle_cast_2 and not self.is_thinker then
		local effect_cast_2 = ParticleManager:CreateParticle(particle_cast_2, PATTACH_ABSORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControl(effect_cast_2, 5, Vector(self.radius, 0, 0))
		self:AddParticle(effect_cast_2, false, false, -1, false, false)
	end

	self:OnIntervalThink()
	self:StartIntervalThink(self.tick)
end

function modifier_custom_juggernaut_blade_fury:OnIntervalThink()
	if not IsServer() then
		return
	end

	local hit_hero = false
	local target_hit = nil
	local proc_crit = false
	self.count = self.count + 1

	for _, target in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
		if self.is_thinker and target:IsRealHero() then
			hit_hero = true
		end

		if not self.is_thinker or not target:HasModifier("modifier_custom_juggernaut_blade_fury_aura") then
			if not target_hit or (target_hit:IsCreep() and target:IsHero()) then
				target_hit = target
			end

			local particle = ParticleManager:CreateParticle(self.tgt_effect, PATTACH_CUSTOMORIGIN, target)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				target:GetOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(particle)

			target:EmitSound(self.sound)

			local real_damage = self.damage
			if IsValid(self.caster.bladedance_ability) then
				local crit = self.caster.bladedance_ability:GetCrit()
				if crit then
					proc_crit = true
					real_damage = real_damage * crit / 100
					target:SendNumber(2, real_damage)
					self.caster.bladedance_ability:ProcCrit(target)
				end
			end

			self.damageTable.damage = real_damage
			self.damageTable.victim = target
			DoDamage(self.damageTable, self.damage_ability)

			if IsValid(self.caster.healing_ward_ability) then
				self.caster.healing_ward_ability:ProcDamage(target, true)
			end

			if self.ability.talents.has_q3 == 1 then
				target:AddNewModifier(
					self.caster,
					self.ability,
					"modifier_custom_juggernaut_blade_fury_resist",
					{ duration = self.ability.talents.q3_duration }
				)
			end

			if self.ability.talents.has_q4 == 1 then
				target:AddNewModifier(
					self.caster,
					self.ability,
					"modifier_custom_juggernaut_blade_fury_slow",
					{ duration = self.tick * 2 }
				)
				if not self.is_thinker and not self.silence_targets[target] then
					self.silence_targets[target] = target:AddNewModifier(
						self.caster,
						self.ability,
						"modifier_generic_silence",
						{ duration = (1 - target:GetStatusResistance()) * self:GetRemainingTime() }
					)
					target:EmitSound("Juggernaut.Fury_silence")
				end
			end
		end
	end

	if proc_crit then
		self.caster.bladedance_ability:CasterProc(true)
	end

	if target_hit and IsValid(self.caster.bladeform_ability) then
		self.caster.bladeform_ability:AddStack(target_hit, 1)
	end

	if self.is_thinker then
		AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), self.radius, self.tick * 2, false)
		if hit_hero and not self.proced then
			self.proc_timer = self.proc_timer + self.tick
			if self.proc_timer >= self.ability.talents.q7_timer then
				self.proced = true
				self.caster:AddNewModifier(
					self.caster,
					self.ability,
					"modifier_custom_juggernaut_blade_fury_legendary_damage",
					{}
				)
			end
		end
		if not IsValid(self.caster) or not self.caster:IsAlive() then
			self:Destroy()
			return
		end
	else
		if self.count >= self.max_count then
			self:StartIntervalThink(-1)
			return
		end
	end
end

function modifier_custom_juggernaut_blade_fury:OnDestroy(kv)
	if not IsServer() then
		return
	end

	if IsValid(self.bkb_mod) then
		self.bkb_mod:Destroy()
	end

	if not self.is_thinker then
		self.ability:StartCd()
		self.parent:Purge(false, true, false, true, true)
		self.parent:RemoveGesture(ACT_DOTA_OVERRIDE_ABILITY_1)
	end

	for _, mod in pairs(self.silence_targets) do
		if IsValid(mod) then
			mod:Destroy()
		end
	end

	if not IsValid(self.parent) then
		return
	end

	StopSoundOn(self.sound_lp, self.parent)
	self.parent:EmitSound(wearables_system:GetSoundReplacement(self.caster, "Hero_Juggernaut.BladeFuryStop", self))
end

function modifier_custom_juggernaut_blade_fury:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_custom_juggernaut_blade_fury:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_damage_reduce
end

function modifier_custom_juggernaut_blade_fury:GetModifierProcAttack_BonusDamage_Physical(params)
	if params.no_attack_cooldown then
		return
	end
	return -params.damage
end

modifier_custom_juggernaut_blade_fury_slow = class(mod_hidden)
function modifier_custom_juggernaut_blade_fury_slow:IsPurgable()
	return true
end
function modifier_custom_juggernaut_blade_fury_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.slow = self.ability.talents.q4_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_terrorblade/ember_slow.vpcf", self)
end

function modifier_custom_juggernaut_blade_fury_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_custom_juggernaut_blade_fury_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_custom_juggernaut_blade_fury_tracker = class(mod_hidden)
function modifier_custom_juggernaut_blade_fury_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.fury_ability = self.ability

	self.parent.legendary_ability = self.parent:FindAbilityByName("custom_juggernaut_whirling_blade_custom")
	if self.parent.legendary_ability then
		self.parent.legendary_ability:UpdateTalents()
	end

	self.ability.interval = self.ability:GetSpecialValueFor("interval")
	self.ability.blade_fury_radius = self.ability:GetSpecialValueFor("blade_fury_radius")
	self.ability.blade_fury_damage = self.ability:GetSpecialValueFor("blade_fury_damage")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.magic_resist = self.ability:GetSpecialValueFor("magic_resist")
end

function modifier_custom_juggernaut_blade_fury_tracker:OnRefresh()
	self.ability.blade_fury_damage = self.ability:GetSpecialValueFor("blade_fury_damage")
end

function modifier_custom_juggernaut_blade_fury_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if self.ability.talents.has_r7 == 1 then
		return
	end

	local stack = 0
	local mod = self.parent:FindModifierByName("modifier_custom_juggernaut_blade_fury_legendary_damage")
	if mod then
		stack = mod:GetStackCount()
	end

	self.parent:UpdateUIlong({ stack = 0, max = 1, override_stack = stack, no_min = 1, style = "JuggernautFury" })
end

modifier_custom_juggernaut_blade_fury_aura = class(mod_hidden)

modifier_custom_juggernaut_blade_fury_resist = class(mod_visible)
function modifier_custom_juggernaut_blade_fury_resist:GetTexture()
	return "buffs/juggernaut/blade_fury_3"
end
function modifier_custom_juggernaut_blade_fury_resist:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q3_max
	self.magic = self.ability.talents.q3_magic / self.max
	self.heal_reduce = self.ability.talents.q3_heal_reduce / self.max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.stack_count = 0
	self.active_count = 0.5
	self.interval = 0.2
	self:StartIntervalThink(self.interval)
end

function modifier_custom_juggernaut_blade_fury_resist:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.active_count = 0.5
end

function modifier_custom_juggernaut_blade_fury_resist:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.active_count <= 0 then
		return
	end

	self.active_count = self.active_count - self.interval
	self.stack_count = self.stack_count + self.interval
	if self.stack_count < (1 - FrameTime()) then
		return
	end

	self.stack_count = 0
	if self:GetStackCount() >= self.max then
		return
	end

	if not self.effect_cast then
		self.effect_cast = self.parent:GenericParticle("particles/juggernaut/bladefury_stack.vpcf", self, true)
	end

	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Juggernaut.BladeFury_heal_reduce")
		self.parent:AddNewModifier(self.caster, self.ability, "modifier_custom_juggernaut_blade_fury_resist_status", {})
		self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)
		self:StartIntervalThink(-1)
	end

	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
end

function modifier_custom_juggernaut_blade_fury_resist:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_custom_juggernaut_blade_fury_resist_status")
end

function modifier_custom_juggernaut_blade_fury_resist:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_custom_juggernaut_blade_fury_resist:GetModifierMagicalResistanceBonus()
	return self.magic * self:GetStackCount()
end

function modifier_custom_juggernaut_blade_fury_resist:GetModifierHealChange()
	return self.heal_reduce * self:GetStackCount()
end

function modifier_custom_juggernaut_blade_fury_resist:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce * self:GetStackCount()
end

modifier_custom_juggernaut_blade_fury_resist_status = class(mod_hidden)
function modifier_custom_juggernaut_blade_fury_resist_status:GetStatusEffectName()
	return "particles/status_fx/status_effect_rupture.vpcf"
end
function modifier_custom_juggernaut_blade_fury_resist_status:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end

modifier_custom_juggernaut_blade_fury_legendary_damage = class(mod_visible)
function modifier_custom_juggernaut_blade_fury_legendary_damage:IsHidden()
	return self.ability.talents.has_r7 == 0
end
function modifier_custom_juggernaut_blade_fury_legendary_damage:RemoveOnDeath()
	return false
end
function modifier_custom_juggernaut_blade_fury_legendary_damage:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q7_max
	self.damage = self.ability.talents.q7_damage

	if not IsServer() then
		return
	end
	self:OnRefresh(table)
end

function modifier_custom_juggernaut_blade_fury_legendary_damage:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	if table.stack then
		self:SetStackCount(math.min(self.max, table.stack))
	else
		self:IncrementStackCount()
	end

	self.ability.tracker:UpdateUI()
	self.parent:GenericParticle("particles/juggernaut/fury_legendary_stack.vpcf")
	self.parent:GenericParticle("particles/juggernaut/jugg_omni_proc.vpcf")
	self.parent:EmitSound("Juggernaut.BladeFury_legendary_stack")
end

function modifier_custom_juggernaut_blade_fury_legendary_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_custom_juggernaut_blade_fury_legendary_damage:OnTooltip()
	return self.damage * self:GetStackCount() * 100
end

custom_juggernaut_whirling_blade_custom = class({})
custom_juggernaut_whirling_blade_custom.talents = {}
custom_juggernaut_whirling_blade_custom.active_thinker = {}

function custom_juggernaut_whirling_blade_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q7_speed = caster:GetTalentValue("modifier_juggernaut_bladefury_7", "speed", true),
			q7_talent_cd = caster:GetTalentValue("modifier_juggernaut_bladefury_7", "talent_cd", true),
			q7_cd_inc = caster:GetTalentValue("modifier_juggernaut_bladefury_7", "cd_inc", true) / 100,
			q7_duration = caster:GetTalentValue("modifier_juggernaut_bladefury_7", "duration", true),
		}
	end
end

function custom_juggernaut_whirling_blade_custom:GetCooldown(iLevel)
	local k = 1
	if self.caster:HasModifier("modifier_custom_juggernaut_blade_fury_legendary_damage") then
		k = 1
			+ (self.talents.q7_cd_inc or 0)
				* self.caster:GetUpgradeStack("modifier_custom_juggernaut_blade_fury_legendary_damage")
	end
	return (self.talents.q7_talent_cd or 0) * k
end

function custom_juggernaut_whirling_blade_custom:GetAOERadius()
	if not self.caster or not self.caster.fury_ability then
		return 0
	end
	return self.caster.fury_ability:GetRadius()
end

function custom_juggernaut_whirling_blade_custom:CreateTalent()
	self:SetHidden(false)
	self:SetLevel(1)
end

function custom_juggernaut_whirling_blade_custom:OnAbilityPhaseStart()
	if not self.caster:HasModifier("modifier_custom_juggernaut_blade_fury") then
		self.caster:AddNewModifier(self.caster, self, "modifier_custom_juggernaut_blade_fury_anim", {})
		self.caster:StartGesture(ACT_DOTA_ATTACK_EVENT)
	end
	return true
end

function custom_juggernaut_whirling_blade_custom:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(ACT_DOTA_ATTACK_EVENT)
	self.caster:RemoveModifierByName("modifier_custom_juggernaut_blade_fury_anim")
end

function custom_juggernaut_whirling_blade_custom:OnSpellStart()
	self.caster:RemoveModifierByName("modifier_custom_juggernaut_blade_fury_anim")
	if not self.caster.fury_ability then
		return
	end

	if IsValid(self.active_thinker) then
		self.active_thinker:RemoveModifierByName("modifier_custom_juggernaut_blade_fury_legendary_thinker")
	end

	self.caster:EmitSound("Juggernaut.Whirling_start")

	local point = self:GetCursorPosition()
	local thinker = CreateModifierThinker(
		self.caster,
		self,
		"modifier_custom_juggernaut_blade_fury_legendary_thinker",
		{},
		self.caster:GetAbsOrigin(),
		self.caster:GetTeamNumber(),
		false
	)
	thinker:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_juggernaut_blade_fury_legendary_fly",
		{ is_back = 0, x = point.x, y = point.y }
	)
	thinker:AddNewModifier(self.caster, self.caster.fury_ability, "modifier_custom_juggernaut_blade_fury", {})
end

modifier_custom_juggernaut_blade_fury_legendary_thinker = class(mod_hidden)
function modifier_custom_juggernaut_blade_fury_legendary_thinker:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.ability.active_thinker = self.parent
end

function modifier_custom_juggernaut_blade_fury_legendary_thinker:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability.active_thinker = nil
	self.parent:EmitSound(wearables_system:GetSoundReplacement(self.caster, "Hero_Juggernaut.BladeFuryStop", self))

	self.parent:RemoveModifierByName("modifier_custom_juggernaut_blade_fury_legendary_pause")
	self.parent:RemoveModifierByName("modifier_custom_juggernaut_blade_fury_legendary_fly")
	self.parent:RemoveModifierByName("modifier_custom_juggernaut_blade_fury")
end

modifier_custom_juggernaut_blade_fury_legendary_fly = class(mod_hidden)
function modifier_custom_juggernaut_blade_fury_legendary_fly:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.is_back = table.is_back

	self.point = self.caster:GetAbsOrigin()
	if self.is_back == 0 then
		self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	end

	self.speed = self.ability.talents.q7_speed
	self.interval = 0.05
	self:StartIntervalThink(self.interval)
end

function modifier_custom_juggernaut_blade_fury_legendary_fly:OnIntervalThink()
	if not IsServer() then
		return
	end

	local pos = self.point
	if self.is_back == 1 then
		pos = self.caster:GetAbsOrigin()
	end

	local direction = (pos - self.parent:GetAbsOrigin()):Normalized()
	self.parent:SetOrigin(self.parent:GetAbsOrigin() + direction * self.interval * self.speed)

	if (self.parent:GetAbsOrigin() - pos):Length2D() <= 50 then
		self:Destroy()
		return
	end
end

function modifier_custom_juggernaut_blade_fury_legendary_fly:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.parent) then
		return
	end

	if self.is_back == 0 then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_custom_juggernaut_blade_fury_legendary_pause",
			{ duration = self.ability.talents.q7_duration }
		)
	else
		self.parent:RemoveModifierByName("modifier_custom_juggernaut_blade_fury_legendary_thinker")
	end
end

modifier_custom_juggernaut_blade_fury_legendary_pause = class(mod_hidden)
function modifier_custom_juggernaut_blade_fury_legendary_pause:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
end

function modifier_custom_juggernaut_blade_fury_legendary_pause:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_custom_juggernaut_blade_fury_legendary_fly",
		{ is_back = 1 }
	)
end

modifier_custom_juggernaut_blade_fury_anim = class(mod_hidden)
function modifier_custom_juggernaut_blade_fury_anim:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_custom_juggernaut_blade_fury_anim:GetActivityTranslationModifiers()
	return "ti8"
end