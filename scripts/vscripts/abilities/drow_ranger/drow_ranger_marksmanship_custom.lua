--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_drow_ranger_marksmanship_custom_tracker",
	"abilities/drow_ranger/drow_ranger_marksmanship_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_drow_ranger_marksmanship_custom_agi_bonus",
	"abilities/drow_ranger/drow_ranger_marksmanship_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_drow_marksman_3"
)
LinkLuaModifier(
	"modifier_drow_ranger_marksmanship_custom_proc_armor",
	"abilities/drow_ranger/drow_ranger_marksmanship_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_drow_ranger_marksmanship_custom_legendary_active",
	"abilities/drow_ranger/drow_ranger_marksmanship_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_drow_marksman_7" }
)
LinkLuaModifier(
	"modifier_drow_ranger_marksmanship_custom_legendary_stack",
	"abilities/drow_ranger/drow_ranger_marksmanship_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_drow_marksman_7"
)
LinkLuaModifier(
	"modifier_drow_ranger_marksmanship_custom_gust_spell",
	"abilities/drow_ranger/drow_ranger_marksmanship_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_drow_gust_7"
)
LinkLuaModifier(
	"modifier_drow_ranger_marksmanship_custom_perma",
	"abilities/drow_ranger/drow_ranger_marksmanship_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_drow_marksman_1"
)

drow_ranger_marksmanship_custom = class({})
drow_ranger_marksmanship_custom.talents = {}
drow_ranger_marksmanship_custom.visual_max = 5

function drow_ranger_marksmanship_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_drow/drow_marksmanship.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_drow/drow_marksmanship_start.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/shard_effect.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/mark_legendary_stack.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/drow/drow_arcana/drow_arcana_crit_or_marksmanship_proc_frost.vpcf",
		context
	)
	PrecacheResource("particle", "particles/drow_ranger/frost_cleave.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/silence_legendary_damage.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/multi_refresh.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/multi_armor.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/frost_heal.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_shield_active.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/drow/drow_ti9_immortal/status_effect_drow_ti9_frost_arrow.vpcf",
		context
	)
end

function drow_ranger_marksmanship_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_speed = 0,
			r1_damage = 0,
			r1_max = caster:GetTalentValue("modifier_drow_marksman_1", "max", true),

			has_r2 = 0,
			r2_heal = 0,
			r2_range = 0,

			has_r3 = 0,
			r3_damage_alt = 0,
			r3_damage = 0,
			r3_bonus = 0,
			r3_max = caster:GetTalentValue("modifier_drow_marksman_3", "max", true),
			r3_duration_creeps = caster:GetTalentValue("modifier_drow_marksman_3", "duration_creeps", true),
			r3_duration = caster:GetTalentValue("modifier_drow_marksman_3", "duration", true),

			has_r7 = 0,
			r7_max = caster:GetTalentValue("modifier_drow_marksman_7", "max", true),
			r7_chance = caster:GetTalentValue("modifier_drow_marksman_7", "chance", true),
			r7_duration = caster:GetTalentValue("modifier_drow_marksman_7", "duration", true),
			r7_stack_duration = caster:GetTalentValue("modifier_drow_marksman_7", "stack_duration", true),
			r7_talent_cd = caster:GetTalentValue("modifier_drow_marksman_7", "talent_cd", true),
			r7_radius = caster:GetTalentValue("modifier_drow_marksman_7", "radius", true),
			r7_status = caster:GetTalentValue("modifier_drow_marksman_7", "status", true),

			has_w7 = 0,
			w7_spell = caster:GetTalentValue("modifier_drow_gust_7", "spell", true),
			w7_duration = caster:GetTalentValue("modifier_drow_gust_7", "duration", true),
			w7_cd_inc = caster:GetTalentValue("modifier_drow_gust_7", "cd_inc", true) / 100,
			w7_damage_type = caster:GetTalentValue("modifier_drow_gust_7", "damage_type", true),

			has_q7 = 0,
		}
	end

	if caster:HasTalent("modifier_drow_marksman_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_drow_marksman_1", "damage")
		self.talents.r1_speed = caster:GetTalentValue("modifier_drow_marksman_1", "speed")
	end

	if caster:HasTalent("modifier_drow_marksman_2") then
		self.talents.has_r2 = 1
		self.talents.r2_heal = caster:GetTalentValue("modifier_drow_marksman_2", "heal") / 100
		self.talents.r2_range = caster:GetTalentValue("modifier_drow_marksman_2", "range")
	end

	if caster:HasTalent("modifier_drow_marksman_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_drow_marksman_3", "damage") / 100
		self.talents.r3_bonus = caster:GetTalentValue("modifier_drow_marksman_3", "bonus")
		self.talents.r3_damage_alt = caster:GetTalentValue("modifier_drow_marksman_3", "damage_alt") / 100
	end

	if caster:HasTalent("modifier_drow_marksman_7") then
		self.talents.has_r7 = 1
		self.tracker:UpdateUI()
	end

	if caster:HasTalent("modifier_drow_gust_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_drow_frost_7") then
		self.talents.has_q7 = 1
	end
end

function drow_ranger_marksmanship_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "drow_ranger_marksmanship", self)
end

function drow_ranger_marksmanship_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_drow_ranger_marksmanship_custom_tracker"
end

function drow_ranger_marksmanship_custom:GetCastRange()
	return (self.range or 0) - self.caster:GetCastRangeBonus()
end

function drow_ranger_marksmanship_custom:GetCooldown(iLevel)
	return self.talents.has_r7 == 1 and self.talents.r7_talent_cd or 0
end

function drow_ranger_marksmanship_custom:GetBehavior()
	if self.talents.has_r7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function drow_ranger_marksmanship_custom:GetCastAnimation()
	if self.talents.has_r7 == 0 then
		return
	end
	return ACT_DOTA_CAST_ABILITY_3
end

function drow_ranger_marksmanship_custom:GetProj()
	return wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_drow/drow_marksmanship_attack.vpcf",
		self
	)
end

function drow_ranger_marksmanship_custom:OnAbilityPhaseStart()
	if self.talents.has_r7 == 0 then
		return
	end

	local mod = self.caster:FindModifierByName("modifier_drow_ranger_marksmanship_custom_legendary_stack")
	if not mod or mod:GetStackCount() <= 0 then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.caster:GetId()),
			"CreateIngameErrorMessage",
			{ message = "#arc_no_charges" }
		)
		return false
	end
	return true
end

function drow_ranger_marksmanship_custom:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_drow_ranger_marksmanship_custom_legendary_stack")

	if not mod or mod:GetStackCount() <= 0 then
		return
	end

	local stack = mod:GetStackCount()
	self.caster:EmitSound("Drow.Shard_active1")
	self.caster:EmitSound("Drow.Shard_active2")

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_drow_ranger_marksmanship_custom_legendary_active",
		{ duration = stack * self.talents.r7_duration }
	)
	mod:Destroy()
end

function drow_ranger_marksmanship_custom:LegendaryStack()
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r7 == 0 then
		return
	end
	if self:GetCooldownTimeRemaining() > 0 then
		return
	end
	if not self.caster:HasModifier("modifier_drow_ranger_innate_custom_active") then
		return
	end
	if self.caster:HasModifier("modifier_drow_ranger_marksmanship_custom_legendary_active") then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_drow_ranger_marksmanship_custom_legendary_stack",
		{ duration = self.talents.r7_stack_duration }
	)
end

function drow_ranger_marksmanship_custom:HasProc()
	if not self:IsTrained() then
		return false
	end
	if not IsValid(self.tracker) then
		return false
	end
	return self.tracker.proc ~= nil and self.tracker.proc.armed == true
end

modifier_drow_ranger_marksmanship_custom_tracker = class(mod_hidden)
function modifier_drow_ranger_marksmanship_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.marksmanship_ability = self.ability

	self.ability.range = self.ability:GetSpecialValueFor("disable_range")
	self.ability.damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.armor = self.ability:GetSpecialValueFor("armor") / 100
	self.ability.cleave_damage = self.ability:GetSpecialValueFor("cleave_damage") / 100
	self.ability.cleave_radius = self.ability:GetSpecialValueFor("cleave_radius")
	self.ability.chance = self.ability:GetSpecialValueFor("chance")

	self.damageTable = {
		attacker = self.parent,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_PHYSICAL,
		damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
	}
	self.GustTable =
		{ attacker = self.parent, ability = self.ability, damage_type = self.ability.talents.w7_damage_type }

	self.proc = self.parent:AddProc(self, { current = true, accuracy = true })
	self.parent:AddProc(self, { name = "extra" })
	self.parent:AddAttackStartEvent_out(self)
end

function modifier_drow_ranger_marksmanship_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.chance = self.ability:GetSpecialValueFor("chance")
end

function modifier_drow_ranger_marksmanship_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end

	local stack = 0
	local override = nil
	local interval = -1
	local active = 0
	local zero = nil
	local max = self.ability.talents.r7_max
	local mod = self.parent:FindModifierByName("modifier_drow_ranger_marksmanship_custom_legendary_stack")
	local active_mod = self.parent:FindModifierByName("modifier_drow_ranger_marksmanship_custom_legendary_active")

	if (mod or active_mod) and self.particle then
		ParticleManager:DestroyParticle(self.particle, true)
		ParticleManager:ReleaseParticleIndex(self.particle)
		self.particle = nil
	end

	if self.ability:GetCooldownTimeRemaining() > 0 then
		override = self.ability:GetCooldownTimeRemaining()
		interval = 0.1
		zero = 1
	else
		if mod then
			stack = mod:GetStackCount()
		elseif active_mod then
			max = self.ability.talents.r7_duration * self.ability.talents.r7_max
			stack = active_mod:GetRemainingTime()
			override = active_mod:GetRemainingTime()
			zero = 1
			interval = 0.1
			active = 1
		else
			if not self.particle then
				self.particle =
					self.parent:GenericParticle("particles/drow_ranger/mark_legendary_stack.vpcf", self, true)
				for i = 1, self.ability.visual_max do
					ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
				end
			end
		end
	end

	self.parent:UpdateUIlong({
		stack = stack,
		max = max,
		override_stack = override,
		active = active,
		use_zero = zero,
		style = "DrowMark",
	})
	self:StartIntervalThink(interval)
end

function modifier_drow_ranger_marksmanship_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:UpdateUI()
end

function modifier_drow_ranger_marksmanship_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROJECTILE_NAME,
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_drow_ranger_marksmanship_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.r1_speed
end

function modifier_drow_ranger_marksmanship_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.r2_range
end

function modifier_drow_ranger_marksmanship_custom_tracker:GetProcChance(params, name)
	if not self.parent:HasModifier("modifier_drow_ranger_innate_custom_active") then
		return 0
	end
	if name == "extra" and not params.no_attack_cooldown then
		return 0
	end
	return self.parent:HasModifier("modifier_drow_ranger_marksmanship_custom_legendary_active")
			and self.ability.talents.r7_chance
		or self.ability.chance
end

function modifier_drow_ranger_marksmanship_custom_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local target = params.target

	if params.procs and params.procs[self] then
		if self.parent:HasModifier("modifier_drow_ranger_marksmanship_custom_legendary_active") then
			self.parent:EmitSound("Drow.Mark_legendary_attack")
		end

		if self.ability.talents.has_r2 == 1 then
			self.parent:GenericHeal(
				self.ability.talents.r2_heal * self.parent:GetMaxHealth(),
				self.ability,
				false,
				"particles/drow_ranger/frost_heal.vpcf",
				"modifier_drow_marksman_2"
			)
		end

		if
			self.ability.talents.has_w7 == 1
			and params.procs[self].default
			and IsValid(self.parent.gust_ability)
			and self.parent.gust_ability:GetCooldownTimeRemaining() > 0
			and self.parent.gust_ability.can_legendary_cd
		then
			self.parent.gust_ability.can_legendary_cd = false
			self.parent:CdAbility(self.parent.gust_ability, nil, self.ability.talents.w7_cd_inc, "modifier_drow_gust_7")
			self.parent:EmitSound("Drow.Gust_legendary_cd")

			local particle = ParticleManager:CreateParticle(
				"particles/drow_ranger/multi_refresh.vpcf",
				PATTACH_CUSTOMORIGIN,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(particle)
		end

		if self.parent.current_model == "models/items/drow/drow_arcana/drow_arcana.vmdl" then
			self.parent:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK_SPECIAL, self.parent:GetAttackSpeed(true))
		end

		if self.parent:GetQuest() == "Drow.Quest_8" and not self.parent:QuestCompleted() and target:IsRealHero() then
			self.parent:UpdateQuest(1)
		end
	end

	if params.no_attack_cooldown then
		return
	end
	self.ability:LegendaryStack()
end

function modifier_drow_ranger_marksmanship_custom_tracker:GetModifierProcAttack_BonusDamage_Physical(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if not self.parent:IsProc(self, params.record) and not self.parent:IsProc(self, params.record, "extra") then
		return
	end

	local target = params.target
	local effect = "particles/drow_ranger/frost_cleave.vpcf"
	local damage = self.ability.damage

	if self.ability.talents.has_r3 == 1 then
		if self.ability.talents.has_q7 == 0 then
			damage = damage + self.ability.talents.r3_damage * self.parent:GetAgility()
		else
			damage = damage + self.ability.talents.r3_damage_alt * self.parent:GetAverageTrueAttackDamage(nil)
		end
	end

	self.damageTable.damage = (params.damage + damage) * self.ability.cleave_damage

	if self.ability.talents.has_w7 == 1 then
		effect = "particles/drow_ranger/silence_legendary_damage.vpcf"
		self.GustTable.damage = damage
		self.damageTable.damage = params.damage * self.ability.cleave_damage
	end

	for _, aoe_target in pairs(self.parent:FindTargets(self.ability.cleave_radius, target:GetAbsOrigin())) do
		if self.ability.talents.has_w7 == 1 then
			aoe_target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_drow_ranger_marksmanship_custom_gust_spell",
				{ duration = self.ability.talents.w7_duration }
			)
			self.GustTable.victim = aoe_target
			DoDamage(self.GustTable, "modifier_drow_gust_7")
		end
		if target ~= aoe_target then
			self.damageTable.victim = aoe_target
			DoDamage(self.damageTable)
		end
	end

	local particle = ParticleManager:CreateParticle(effect, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(250, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)

	if self.ability.talents.has_r3 == 1 then
		local duration = target:IsCreep() and self.ability.talents.r3_duration_creeps
			or self.ability.talents.r3_duration
		local mod = self.parent:FindModifierByName("modifier_drow_ranger_marksmanship_custom_agi_bonus")
		if mod then
			duration = math.max(duration, mod:GetRemainingTime())
		end
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_drow_ranger_marksmanship_custom_agi_bonus",
			{ duration = duration }
		)
	end

	if target:IsRealHero() then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_drow_ranger_marksmanship_custom_perma", {})
	end

	if self.ability.talents.has_w7 == 1 then
		return
	end

	if self.parent.current_model == "models/items/drow/drow_arcana/drow_arcana.vmdl" then
		local vec = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		local mark_crit_arcana = ParticleManager:CreateParticle(
			"particles/econ/items/drow/drow_arcana/drow_arcana_crit_or_marksmanship_proc_frost.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			mark_crit_arcana,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControl(mark_crit_arcana, 1, target:GetOrigin())
		ParticleManager:SetParticleControlForward(mark_crit_arcana, 1, -vec)
		ParticleManager:ReleaseParticleIndex(mark_crit_arcana)
	end

	target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_drow_ranger_marksmanship_custom_proc_armor",
		{ duration = FrameTime() }
	)
	return damage
end

function modifier_drow_ranger_marksmanship_custom_tracker:GetPriority()
	if not self.parent:HasModifier("modifier_drow_ranger_frost_arrows_custom_tracker") and self.ability:HasProc() then
		return MODIFIER_PRIORITY_SUPER_ULTRA
	end
	return MODIFIER_PRIORITY_LOW
end

function modifier_drow_ranger_marksmanship_custom_tracker:GetModifierProjectileName()
	if not self.parent:HasModifier("modifier_drow_ranger_frost_arrows_custom_tracker") and self.ability:HasProc() then
		return self.ability:GetProj()
	end
end

modifier_drow_ranger_marksmanship_custom_agi_bonus = class(mod_visible)
function modifier_drow_ranger_marksmanship_custom_agi_bonus:GetTexture()
	return "buffs/drow_ranger/marksman_3"
end
function modifier_drow_ranger_marksmanship_custom_agi_bonus:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	self.bonus = self.ability.talents.r3_bonus / self.max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_drow_ranger_marksmanship_custom_agi_bonus:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_drow_ranger_marksmanship_custom_agi_bonus:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_drow_ranger_marksmanship_custom_agi_bonus:OnTooltip()
	return self.bonus * self:GetStackCount()
end

modifier_drow_ranger_marksmanship_custom_proc_armor = class(mod_hidden)
function modifier_drow_ranger_marksmanship_custom_proc_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.armor = self.parent:GetPhysicalArmorBaseValue() * self.ability.armor * -1
end

function modifier_drow_ranger_marksmanship_custom_proc_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_drow_ranger_marksmanship_custom_proc_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

modifier_drow_ranger_marksmanship_custom_legendary_active = class(mod_visible)
function modifier_drow_ranger_marksmanship_custom_legendary_active:GetStatusEffectName()
	return "particles/econ/items/drow/drow_ti9_immortal/status_effect_drow_ti9_frost_arrow.vpcf"
end
function modifier_drow_ranger_marksmanship_custom_legendary_active:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_drow_ranger_marksmanship_custom_legendary_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.ability:EndCd()

	self.ground_particle =
		ParticleManager:CreateParticle("particles/drow_ranger/shard_effect.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.ground_particle,
		0,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.ground_particle,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.ground_particle,
		5,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.ground_particle, false, false, -1, true, false)
end

function modifier_drow_ranger_marksmanship_custom_legendary_active:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
end

function modifier_drow_ranger_marksmanship_custom_legendary_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_drow_ranger_marksmanship_custom_legendary_active:GetModifierStatusResistanceStacking()
	return self.ability.talents.r7_status
end

modifier_drow_ranger_marksmanship_custom_legendary_stack = class(mod_hidden)
function modifier_drow_ranger_marksmanship_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max = self.ability.talents.r7_max
	self.radius = self.ability.talents.r7_radius
	self.duration = self.ability.talents.r7_stack_duration

	if not IsServer() then
		return
	end
	self.mod = self.ability.tracker
	self.particle = self.parent:GenericParticle("particles/drow_ranger/mark_legendary_stack.vpcf", self, true)

	self:OnRefresh()
	self:StartIntervalThink(0.5)
end

function modifier_drow_ranger_marksmanship_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.mod then
		self.mod:UpdateUI()
	end

	if not self.particle then
		return
	end

	for i = 1, self.ability.visual_max do
		if i <= math.floor(self:GetStackCount() / (self.max / self.ability.visual_max)) then
			ParticleManager:SetParticleControl(self.particle, i, Vector(1, 0, 0))
		else
			ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
		end
	end
end

function modifier_drow_ranger_marksmanship_custom_legendary_stack:OnIntervalThink()
	if not IsServer() then
		return
	end
	local targets = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)

	if #targets > 0 then
		self:SetDuration(self.duration, true)
	end
end

function modifier_drow_ranger_marksmanship_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.mod then
		return
	end
	self.mod:UpdateUI()
end

modifier_drow_ranger_marksmanship_custom_gust_spell = class(mod_visible)
function modifier_drow_ranger_marksmanship_custom_gust_spell:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.spell = self.ability.talents.w7_spell

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:EmitSound("Drow.Silence_legendary_damage")
	self.parent:EmitSound("Drow.Silence_legendary_damage2")
	self.parent:GenericParticle("particles/drow_ranger/multi_armor.vpcf", self, true)
end

function modifier_drow_ranger_marksmanship_custom_gust_spell:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_drow_ranger_marksmanship_custom_gust_spell:GetModifierIncomingDamage_Percentage(params)
	if not IsServer() then
		return self.spell
	end
	if not params.attacker then
		return
	end
	if params.attacker:FindOwner() ~= self.caster then
		return
	end
	if not params.inflictor then
		return
	end

	return self.spell
end

modifier_drow_ranger_marksmanship_custom_perma = class({})
function modifier_drow_ranger_marksmanship_custom_perma:IsHidden()
	return self.ability.talents.has_r1 == 0 or self:GetStackCount() >= self.ability.talents.r1_max
end
function modifier_drow_ranger_marksmanship_custom_perma:IsPurgable()
	return false
end
function modifier_drow_ranger_marksmanship_custom_perma:RemoveOnDeath()
	return false
end
function modifier_drow_ranger_marksmanship_custom_perma:GetTexture()
	return "buffs/drow_ranger/marksman_1"
end
function modifier_drow_ranger_marksmanship_custom_perma:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r1_max

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
	self:IncrementStackCount()
end

function modifier_drow_ranger_marksmanship_custom_perma:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_drow_ranger_marksmanship_custom_perma:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r1 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/crystal_maiden/maiden_shield_active.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_drow_ranger_marksmanship_custom_perma:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
	}
end

function modifier_drow_ranger_marksmanship_custom_perma:GetModifierBaseAttack_BonusDamage()
	if self.ability.talents.has_r1 == 0 then
		return
	end
	return (self.ability.talents.r1_damage / self.max) * self:GetStackCount()
end