--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_legion_commander_duel_custom_buff",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_damage",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_hero_6"
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_linger",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_tracker",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_scepter_choosing",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_scepter_effect",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_scepter_win",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_legendary",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_legendary_unit",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_duel_7"
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_legendary_attack",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_armor",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_duel_1"
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_heal_cd",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_duel_4"
)
LinkLuaModifier(
	"modifier_legion_commander_duel_custom_damage_stack",
	"abilities/legion_commander/custom_legion_commander_duel",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_duel_3"
)

custom_legion_commander_duel = class({})
custom_legion_commander_duel.talents = {}

function custom_legion_commander_duel:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_legion_commander/legion_commander_duel_victory.vpcf",
		context
	)
	PrecacheResource("particle", "particles/status_fx/status_effect_legion_commander_duel.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/legion_duel_ring.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_omniknight/omniknight_hammer_of_purity_detonation.vpcf",
		context
	)
	PrecacheResource("particle", "particles/legion_commander/lc_press_heal.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_oracle/oracle_false_promise_heal.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_charge_mark.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_parry.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/scepter_duel.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_proc_.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/duel_legendary_attack.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_lowhp.vpcf", context)
end

function custom_legion_commander_duel:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_armor_legendary = 0,
			r1_armor = 0,
			r1_duration = caster:GetTalentValue("modifier_legion_duel_1", "duration", true),
			r1_max_legendary = caster:GetTalentValue("modifier_legion_duel_1", "max_legendary", true),
			r1_max = caster:GetTalentValue("modifier_legion_duel_1", "max", true),

			has_r2 = 0,
			r2_damage_reduce = 0,
			r2_heal = 0,

			r3_damage = 0,
			r3_duration = caster:GetTalentValue("modifier_legion_duel_3", "duration", true),
			r3_max = caster:GetTalentValue("modifier_legion_duel_3", "max", true),
			r3_radius = caster:GetTalentValue("modifier_legion_duel_3", "radius", true),

			has_r4 = 0,
			r4_duration = caster:GetTalentValue("modifier_legion_duel_4", "duration", true),
			r4_heal = caster:GetTalentValue("modifier_legion_duel_4", "heal", true) / 100,
			r4_talent_cd = caster:GetTalentValue("modifier_legion_duel_4", "talent_cd", true),
			r4_duration_legendary = caster:GetTalentValue("modifier_legion_duel_4", "duration_legendary", true),

			has_r7 = 0,
			r7_duration = caster:GetTalentValue("modifier_legion_duel_7", "duration", true),
			r7_interval = caster:GetTalentValue("modifier_legion_duel_7", "interval", true),
			r7_duration_inc = caster:GetTalentValue("modifier_legion_duel_7", "duration_inc", true),
			r7_duration_max = caster:GetTalentValue("modifier_legion_duel_7", "duration_max", true),
			r7_damage = caster:GetTalentValue("modifier_legion_duel_7", "damage", true),
			r7_radius = caster:GetTalentValue("modifier_legion_duel_7", "radius", true),

			has_h3 = 0,
			h3_cd = 0,
			h3_range = 0,

			has_h6 = 0,
			h6_max = caster:GetTalentValue("modifier_legion_hero_6", "max", true),
			h6_health = caster:GetTalentValue("modifier_legion_hero_6", "health", true),
			h6_cast = caster:GetTalentValue("modifier_legion_hero_6", "cast", true),
			h6_cdr = caster:GetTalentValue("modifier_legion_hero_6", "cdr", true),
			h6_bonus = caster:GetTalentValue("modifier_legion_hero_6", "bonus", true),

			has_q7 = 0,

			has_w7 = 0,
		}
	end

	if caster:HasTalent("modifier_legion_duel_1") then
		self.talents.has_r1 = 1
		self.talents.r1_armor_legendary = caster:GetTalentValue("modifier_legion_duel_1", "armor_legendary")
		self.talents.r1_armor = caster:GetTalentValue("modifier_legion_duel_1", "armor")
	end

	if caster:HasTalent("modifier_legion_duel_2") then
		self.talents.has_r2 = 1
		self.talents.r2_damage_reduce = caster:GetTalentValue("modifier_legion_duel_2", "damage_reduce")
		self.talents.r2_heal = caster:GetTalentValue("modifier_legion_duel_2", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_legion_duel_2", type = 2, value = self.talents.r2_heal })
	end

	if caster:HasTalent("modifier_legion_duel_3") then
		self.talents.r3_damage = caster:GetTalentValue("modifier_legion_duel_3", "damage")
		if IsServer() then
			self.tracker:StartIntervalThink(self.tracker.interval)
		end
	end

	if caster:HasTalent("modifier_legion_duel_4") then
		self.talents.has_r4 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_legion_duel_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_legion_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_cd = caster:GetTalentValue("modifier_legion_hero_3", "cd")
		self.talents.h3_range = caster:GetTalentValue("modifier_legion_hero_3", "range")
	end

	if caster:HasTalent("modifier_legion_hero_6") then
		self.talents.has_h6 = 1
		if IsServer() and name == "modifier_legion_hero_6" then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_legion_odds_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_legion_press_7") then
		self.talents.has_w7 = 1
	end
end

function custom_legion_commander_duel:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(
		self.caster,
		(self.talents.has_q7 == 1 or self.talents.has_w7 == 1) and "legion_commander_duel_magic"
			or "legion_commander_duel",
		self
	)
end

function custom_legion_commander_duel:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_legion_commander_duel_custom_tracker"
end

function custom_legion_commander_duel:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_h6 == 1 and self.talents.h6_cast or 0)
end

function custom_legion_commander_duel:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.has_h3 == 1 and self.talents.h3_cd or 0)
end

function custom_legion_commander_duel:CastFilterResultTarget(target)
	if not IsServer() then
		return
	end
	if (target:IsIllusion() or target:IsTempestDouble()) and self.talents.has_r7 == 1 then
		return UF_FAIL_ILLUSION
	end
	if not target:IsHero() and not target.lifestealer_creep then
		return UF_FAIL_CREEP
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return UF_FAIL_FRIENDLY
	end
	return UnitFilter(
		target,
		self:GetAbilityTargetTeam(),
		self:GetAbilityTargetType(),
		self:GetAbilityTargetFlags(),
		self.caster:GetTeamNumber()
	)
end

function custom_legion_commander_duel:OnSpellStart()
	local target = self:GetCursorTarget()
	self.caster:EmitSound(wearables_system:GetSoundReplacement(self.caster, "Hero_LegionCommander.Duel.Cast", self))

	if self.talents.has_r7 == 1 then
		target = target:FindOwner()
		local dir = target:GetAbsOrigin() - self.caster:GetAbsOrigin()
		local point = self.caster:GetAbsOrigin() + dir:Normalized() * (dir:Length2D() / 2)

		CreateModifierThinker(
			self.caster,
			self,
			"modifier_legion_commander_duel_custom_legendary",
			{ duration = self.talents.r7_duration, target = target:entindex() },
			point,
			self.caster:GetTeamNumber(),
			false
		)
		return
	end

	if target:TriggerSpellAbsorb(self) then
		return
	end

	local duration = self.duration + (self.talents.has_r4 == 1 and self.talents.r4_duration or 0)
	duration = duration * (1 - target:GetStatusResistance())

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_legion_commander_duel_custom_buff",
		{ duration = duration, target = target:entindex() }
	)
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_legion_commander_duel_custom_buff",
		{ duration = duration, target = self.caster:entindex() }
	)
end

function custom_legion_commander_duel:CheckDuel(dead, target)
	if not IsServer() then
		return
	end

	if self.parent == dead then
		self:WinDuel(target, self.parent)
		return true
	end

	if target == dead then
		self:WinDuel(self.parent, target)
		return true
	end

	return false
end

function custom_legion_commander_duel:WinDuel(winner, loser)
	if not IsServer() then
		return
	end
	if not IsValid(winner, loser) then
		return
	end

	if loser:IsIllusion() or loser:IsTempestDouble() then
		return
	end

	winner:AddNewModifier(winner, self, "modifier_legion_commander_duel_custom_damage", {})
	if winner:GetQuest() == "Legion.Quest_8" then
		winner:UpdateQuest(self.reward_damage)
	end

	winner:GenericParticle("particles/units/heroes/hero_legion_commander/legion_commander_duel_victory.vpcf", nil, true)
	winner:EmitSound("Hero_LegionCommander.Duel.Victory")
end

function custom_legion_commander_duel:ApplyArmor(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r1 == 0 then
		return
	end
	if target:IsAttackImmune() then
		return
	end
	if target:IsInvulnerable() then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_legion_commander_duel_custom_armor",
		{ duration = self.talents.r1_duration }
	)
end

modifier_legion_commander_duel_custom_buff = class(mod_visible)
function modifier_legion_commander_duel_custom_buff:IsDebuff()
	return true
end
function modifier_legion_commander_duel_custom_buff:GetStatusEffectName()
	return "particles/status_fx/status_effect_legion_commander_duel.vpcf"
end
function modifier_legion_commander_duel_custom_buff:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_legion_commander_duel_custom_buff:OnCreated(table)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.is_enemy = self.parent ~= self.caster
	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.ended = false
	self.target = EntIndexToHScript(table.target)

	if not self.is_enemy then
		self.parent:EmitSound("Hero_LegionCommander.Duel")

		local particle_name = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/legion_commander/legion_duel_ring.vpcf",
			self.ability
		)
		local dir = (self.caster:GetAbsOrigin() - self.target:GetAbsOrigin())
		local center_point = self.target:GetAbsOrigin() + dir:Normalized() * 80

		self.particle = ParticleManager:CreateParticle(particle_name, PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(self.particle, 0, center_point)
		ParticleManager:SetParticleControl(self.particle, 7, center_point)
		self:AddParticle(self.particle, false, false, -1, true, false)

		self.ability:EndCd()
		self.parent:AddDeathEvent(self)
		self.parent:AddOrderFilter(self)

		if IsValid(self.parent.legion_innate_ability) then
			self.str_bonus = self.parent:AddNewModifier(
				self.parent,
				self.parent.legion_innate_ability,
				"modifier_legion_commander_innate_custom_bonus",
				{}
			)
		end
	end

	self.interval = FrameTime() * 2
	self:OnIntervalThink(true)
	self:StartIntervalThink(self.interval)
end

function modifier_legion_commander_duel_custom_buff:DeathEvent(params)
	if not IsServer() then
		return
	end
	if self.ended then
		return
	end

	if self.ability:CheckDuel(params.unit, self.target) then
		self.ended = true
		self:Destroy()
		return
	end
end

function modifier_legion_commander_duel_custom_buff:OrderFilter(params)
	if params.order_type == DOTA_UNIT_ORDER_CAST_TARGET then
		return
	end
	if params.order_type == DOTA_UNIT_ORDER_CAST_NO_TARGET then
		return
	end
	if params.order_type == DOTA_UNIT_ORDER_CAST_POSITION then
		return
	end
	if params.order_type == DOTA_UNIT_ORDER_CAST_TOGGLE then
		return
	end

	return false
end

function modifier_legion_commander_duel_custom_buff:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	if not first then
		if
			not IsValid(self.target)
			or not self.target:IsAlive()
			or (self.parent:GetAbsOrigin() - self.target:GetAbsOrigin()):Length2D() > self.ability.victory_range
			or not self.target:HasModifier(self:GetName())
		then
			self:Destroy()
			return
		end
		local mod = self.parent:FindModifierByName("modifier_overwhelming_odds_custom_damage")
		if mod then
			mod:CheckDuel()
		end
	end

	if self.is_enemy then
		self.parent:SetForceAttackTarget(self.target)
		self.parent:MoveToTargetToAttack(self.target)
	else
		if
			not self.parent:GetCurrentActiveAbility()
			and (not self.parent:GetAttackTarget() or self.parent:GetAttackTarget() ~= self.target)
		then
			self.parent:MoveToTargetToAttack(self.target)
		end
	end
end

function modifier_legion_commander_duel_custom_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.caster:StopSound("Hero_LegionCommander.Duel")
	self.target:RemoveModifierByName(self:GetName())

	if self.parent:IsAlive() and self.is_enemy and IsValid(self.target) and self.target:IsAlive() then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_legion_commander_duel_custom_linger",
			{ duration = self.ability.linger_duration }
		)
	end

	if IsValid(self.str_bonus, self.parent.legion_innate_ability) then
		self.str_bonus:SetDuration(self.parent.legion_innate_ability.linger, true)
	end

	if self.is_enemy then
		self.parent:SetForceAttackTarget(nil)
	else
		self.ability:StartCd()
	end
end

function modifier_legion_commander_duel_custom_buff:CheckState()
	if not self.is_enemy then
		return {
			[MODIFIER_STATE_TAUNTED] = true,
			[MODIFIER_STATE_TETHERED] = true,
		}
	end
	return {
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_TAUNTED] = true,
		[MODIFIER_STATE_SILENCED] = true,
	}
end

modifier_legion_commander_duel_custom_legendary = class(mod_hidden)
function modifier_legion_commander_duel_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.ability:EndCd()

	self.target = EntIndexToHScript(table.target)
	self.caster:AddDeathEvent(self)
	self.caster:AddSpellEvent(self, true)

	self.max_time = self:GetRemainingTime()
	self.more_time = 0
	self.max_more_time = self.ability.talents.r7_duration_max - self.max_time
	self.time_inc = self.ability.talents.r7_duration_inc
		+ (self.ability.talents.has_r4 == 1 and self.ability.talents.r4_duration_legendary or 0)

	if IsValid(self.caster.legion_innate_ability) then
		self.str_bonus = self.caster:AddNewModifier(
			self.caster,
			self.caster.legion_innate_ability,
			"modifier_legion_commander_innate_custom_bonus",
			{}
		)
	end

	self.sound_timer = 0
	self.sound_max = 6.1

	self.attack_timer = 0
	self.attack_max = self.ability.talents.r7_interval

	self.parent:EmitSound("Lc.Duel_scepter_duel")
	self.parent:EmitSound("Lc.Duel_scepter_cast")

	self.point = self.parent:GetAbsOrigin()
	self.radius = self.ability.talents.r7_radius
	self.search_radius = 1500

	self.targets = {
		[self.target] = true,
		[self.caster] = true,
	}

	self.caster_mod = self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_legion_commander_duel_custom_legendary_unit",
		{ target = self.target:entindex() }
	)
	self.target:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_legion_commander_duel_custom_legendary_unit",
		{ target = self.caster:entindex() }
	)

	GridNav:DestroyTreesAroundPoint(self.parent:GetAbsOrigin(), self.radius + 200, true)

	self.particle =
		ParticleManager:CreateParticle("particles/legion_commander/scepter_duel.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle, 0, self.point)
	ParticleManager:SetParticleControl(self.particle, 2, Vector(self.radius, 0, 0))
	ParticleManager:SetParticleControl(self.particle, 7, self.point)
	self:AddParticle(self.particle, false, false, -1, true, false)

	self.interval = FrameTime() * 2

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_legion_commander_duel_custom_legendary:DeathEvent(params)
	if not IsServer() then
		return
	end

	if self.ability:CheckDuel(params.unit, self.target) then
		self:Destroy()
		return
	end
end

function modifier_legion_commander_duel_custom_legendary:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.caster ~= params.unit then
		return
	end
	if self.more_time >= self.max_more_time then
		return
	end

	self.more_time = self.more_time + self.time_inc
	self:SetDuration(self:GetRemainingTime() + self.time_inc, true)
end

function modifier_legion_commander_duel_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.caster_mod) then
		self:Destroy()
		return
	end

	self.sound_timer = self.sound_timer + self.interval
	if self.sound_timer >= self.sound_max then
		self.sound_timer = 0
		self.parent:StopSound("Lc.Duel_scepter_duel")
		self.parent:EmitSound("Lc.Duel_scepter_duel")
	end

	local need_attack = false
	self.attack_timer = self.attack_timer + self.interval
	if self.attack_timer >= self.attack_max - FrameTime() then
		self.attack_timer = 0
		need_attack = true
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_legion_commander_duel_custom_legendary_attack",
			{}
		)
	end

	local targets = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.point,
		nil,
		self.search_radius,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_CLOSEST,
		false
	)
	for _, target in pairs(targets) do
		if not self.targets[target] then
			self:CheckPos(target, need_attack)
		end
	end

	for unit, _ in pairs(self.targets) do
		self:CheckPos(unit, need_attack)
		if not IsValid(unit) or not unit:IsAlive() then
			self:Destroy()
			return
		end
	end

	if need_attack then
		self.caster:RemoveModifierByName("modifier_legion_commander_duel_custom_legendary_attack")
	end

	self.caster:UpdateUIshort({
		max_time = self.max_time + self.more_time,
		time = self:GetRemainingTime(),
		stack = self:GetRemainingTime(),
		use_zero = 1,
		priority = 2,
		style = "LegionDuel",
	})
end

function modifier_legion_commander_duel_custom_legendary:CheckPos(target, need_attack)
	if not IsServer() then
		return
	end
	if not IsValid(target) or not target:IsUnit() then
		return
	end

	local dir = (target:GetAbsOrigin() - self.point)

	if self.targets[target:FindOwner()] then
		if target:GetTeamNumber() ~= self.caster:GetTeamNumber() then
			local mod = target:FindModifierByName("modifier_overwhelming_odds_custom_damage")
			if mod then
				mod:CheckDuel()
			end
			if need_attack then
				target:EmitSound("Lc.Duel_legendary_attack")
				local particle = ParticleManager:CreateParticle(
					"particles/legion_commander/duel_legendary_attack.vpcf",
					PATTACH_WORLDORIGIN,
					nil
				)
				ParticleManager:SetParticleControl(particle, 0, (self.point + dir:Normalized() * self.radius * 0.8))
				ParticleManager:SetParticleControlForward(particle, 0, -dir:Normalized())
				ParticleManager:ReleaseParticleIndex(particle)

				self.caster:PerformAttack(target, true, true, true, true, false, false, true)
				self.ability:ApplyArmor(target)
			end
		end
		if dir:Length2D() <= self.radius * 0.95 then
			return
		end
	else
		if dir:Length2D() > self.radius then
			return
		end
	end

	if not target:CheckCd("lc_arena_knock", 0.2) then
		return
	end

	target:InterruptMotionControllers(false)

	local point
	local vec = dir:Normalized()
	if self.point == target:GetAbsOrigin() then
		vec = target:GetForwardVector()
	end

	if self.targets[target:FindOwner()] then
		point = self.point + vec * self.radius * 0.8
	else
		point = self.point + vec * self.radius * 1.2
	end

	local dist = (point - target:GetAbsOrigin()):Length2D()
	if dist >= self.radius * 0.9 then
		FindClearSpaceForUnit(target, point, true)
	else
		local distance = (target:GetAbsOrigin() - point):Length2D()
		local knockbackProperties = {
			target_x = point.x,
			target_y = point.y,
			distance = dist,
			speed = dist / 0.2,
			height = 0,
			fix_end = true,
			isStun = true,
			activity = ACT_DOTA_FLAIL,
		}
		target:AddNewModifier(
			target,
			target:BkbAbility(self.ability, true),
			"modifier_generic_arc",
			knockbackProperties
		)
	end
end

function modifier_legion_commander_duel_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:StopSound("Lc.Duel_scepter_duel")
	self.parent:StopSound("Lc.Duel_scepter_cast")
	self.caster:RemoveModifierByName("modifier_legion_commander_duel_custom_legendary_unit")
	self.target:RemoveModifierByName("modifier_legion_commander_duel_custom_legendary_unit")

	if IsValid(self.str_bonus, self.caster.legion_innate_ability) then
		self.str_bonus:SetDuration(self.caster.legion_innate_ability.linger, true)
	end

	if self.caster:IsAlive() and IsValid(self.target) and self.target:IsAlive() then
		self.target:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_legion_commander_duel_custom_linger",
			{ duration = self.ability.linger_duration }
		)
	end

	self.caster:UpdateUIshort({ hide = 1, hide_full = 1, priority = 2, style = "LegionDuel" })
end

modifier_legion_commander_duel_custom_legendary_attack = class(mod_hidden)
function modifier_legion_commander_duel_custom_legendary_attack:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.r7_damage - 100
end

function modifier_legion_commander_duel_custom_legendary_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_legion_commander_duel_custom_legendary_attack:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

modifier_legion_commander_duel_custom_legendary_unit = class(mod_hidden)
function modifier_legion_commander_duel_custom_legendary_unit:RemoveOnDeath()
	return false
end
function modifier_legion_commander_duel_custom_legendary_unit:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.RemoveForDuel = true
	self.target = EntIndexToHScript(table.target)
end

function modifier_legion_commander_duel_custom_legendary_unit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE,
		MODIFIER_PROPERTY_ABSORB_SPELL,
	}
end

function modifier_legion_commander_duel_custom_legendary_unit:NoDamage(attacker)
	if not IsServer() then
		return
	end
	if not attacker then
		return 0
	end
	if attacker:GetTeamNumber() == self.parent:GetTeamNumber() then
		return 0
	end
	if attacker:FindOwner() == self.target then
		return 0
	end
	return 1
end

function modifier_legion_commander_duel_custom_legendary_unit:GetAbsoluteNoDamagePhysical(params)
	return self:NoDamage(params.attacker)
end

function modifier_legion_commander_duel_custom_legendary_unit:GetAbsoluteNoDamageMagical(params)
	return self:NoDamage(params.attacker)
end

function modifier_legion_commander_duel_custom_legendary_unit:GetAbsoluteNoDamagePure(params)
	return self:NoDamage(params.attacker)
end

function modifier_legion_commander_duel_custom_legendary_unit:GetAbsorbSpell(params)
	if not IsServer() then
		return
	end
	if not params.ability then
		return
	end
	return self:NoDamage(params.ability:GetCaster())
end

modifier_legion_commander_duel_custom_linger = class(mod_hidden)
function modifier_legion_commander_duel_custom_linger:GetEffectName()
	return "particles/legion_commander/lc_odd_charge_mark.vpcf"
end
function modifier_legion_commander_duel_custom_linger:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_legion_commander_duel_custom_linger:RemoveOnDeath()
	return false
end
function modifier_legion_commander_duel_custom_linger:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.linger_slow
	if not IsServer() then
		return
	end
	self.parent:AddDeathEvent(self)
end

function modifier_legion_commander_duel_custom_linger:DeathEvent(params)
	if not IsServer() then
		return
	end

	if self.ability:CheckDuel(params.unit, self.parent) then
		self:Destroy()
		return
	end
end

function modifier_legion_commander_duel_custom_linger:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_legion_commander_duel_custom_linger:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_legion_commander_duel_custom_damage = class(mod_visible)
function modifier_legion_commander_duel_custom_damage:RemoveOnDeath()
	return false
end
function modifier_legion_commander_duel_custom_damage:GetTexture()
	return "legion_commander_duel"
end
function modifier_legion_commander_duel_custom_damage:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.is_enemy = self.ability:GetCaster() ~= self.parent

	if not IsServer() then
		return
	end
	self:SetHasCustomTransmitterData(true)
	self.spell = 0
	self.damage = 0
	self:OnRefresh()
end

function modifier_legion_commander_duel_custom_damage:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
	self.spell = math.min(self.ability.spell_max, self.spell + self.ability.reward_spell)
	self.damage = math.min(self.ability.damage_max, self.damage + self.ability.reward_damage)
	self:SendBuffRefreshToClients()
end

function modifier_legion_commander_duel_custom_damage:AddCustomTransmitterData()
	return {
		spell = self.spell,
		damage = self.damage,
	}
end

function modifier_legion_commander_duel_custom_damage:HandleCustomTransmitterData(data)
	self.spell = data.spell
	self.damage = data.damage
end

function modifier_legion_commander_duel_custom_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_TOOLTIP2,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_legion_commander_duel_custom_damage:OnTooltip()
	if self.is_enemy then
		return
	end
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_cdr
		* (
			1
			+ math.min(self:GetStackCount(), self.ability.talents.h6_max)
				/ self.ability.talents.h6_max
				* (self.ability.talents.h6_bonus - 1)
		)
end

function modifier_legion_commander_duel_custom_damage:OnTooltip2()
	if self.is_enemy then
		return
	end
	if self.ability.talents.has_q7 == 0 and self.ability.talents.has_w7 == 0 then
		return
	end
	return self.spell
end

function modifier_legion_commander_duel_custom_damage:GetModifierPreAttack_BonusDamage()
	if not self.is_enemy and (self.ability.talents.has_q7 == 1 or self.ability.talents.has_w7 == 1) then
		return
	end
	return self.damage
end

function modifier_legion_commander_duel_custom_damage:GetModifierSpellAmplify_Percentage(params)
	if not IsServer() then
		return
	end
	if params.inflictor and params.inflictor:IsItem() then
		return
	end
	return self:OnTooltip2()
end

modifier_legion_commander_duel_custom_tracker = class(mod_hidden)
function modifier_legion_commander_duel_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.interval = 0.5
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.duel_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.reward_damage = self.ability:GetSpecialValueFor("reward_damage")
	self.ability.damage_max = self.ability:GetSpecialValueFor("damage_max")
	self.ability.reward_spell = self.ability:GetSpecialValueFor("reward_spell")
	self.ability.spell_max = self.ability:GetSpecialValueFor("spell_max")
	self.ability.victory_range = self.ability:GetSpecialValueFor("victory_range")
	self.ability.linger_duration = self.ability:GetSpecialValueFor("linger_duration")
	self.ability.linger_slow = self.ability:GetSpecialValueFor("linger_slow")
end

function modifier_legion_commander_duel_custom_tracker:OnRefresh()
	self.ability.reward_damage = self.ability:GetSpecialValueFor("reward_damage")
	self.ability.reward_spell = self.ability:GetSpecialValueFor("reward_spell")
end

function modifier_legion_commander_duel_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	for _, player in pairs(players) do
		if
			player:IsAlive()
			and player:GetTeamNumber() ~= self.parent:GetTeamNumber()
			and (player:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() <= self.ability.talents.r3_radius
		then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_legion_commander_duel_custom_damage_stack",
				{ duration = self.ability.talents.r3_duration, interval = self.interval }
			)
			break
		end
	end
end

function modifier_legion_commander_duel_custom_tracker:CheckLethal()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	if
		not self.parent:HasModifier("modifier_legion_commander_duel_custom_buff")
		and not self.parent:HasModifier("modifier_legion_commander_duel_custom_legendary_unit")
		and not self.parent:HasModifier("modifier_duel_hero_thinker")
	then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_legion_commander_duel_custom_heal_cd") then
		return
	end
	return true
end

function modifier_legion_commander_duel_custom_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if not self:CheckLethal() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:GetHealth() > 3 then
		return
	end

	local effect_target = ParticleManager:CreateParticle(
		"particles/legion_commander/lc_press_heal.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect_target, 1, Vector(200, 100, 100))
	ParticleManager:ReleaseParticleIndex(effect_target)

	self.parent:GenericParticle("particles/units/heroes/hero_oracle/oracle_false_promise_heal.vpcf")
	self.parent:EmitSound("Lc.Duel_death_heal")
	self.parent:EmitSound("Lc.Press_Heal")

	self.parent:GenericHeal(
		self.parent:GetMaxHealth() * self.ability.talents.r4_heal,
		self.ability,
		false,
		"",
		"modifier_legion_duel_4"
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_legion_commander_duel_custom_heal_cd",
		{ duration = self.ability.talents.r4_talent_cd }
	)
end

function modifier_legion_commander_duel_custom_tracker:GetMinHealth()
	if not self:CheckLethal() then
		return
	end
	return 1
end

function modifier_legion_commander_duel_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_MIN_HEALTH,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_legion_commander_duel_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.h3_range
end

function modifier_legion_commander_duel_custom_tracker:GetHealthK()
	local stack = math.min(
		self.ability.talents.h6_max,
		self.parent:GetUpgradeStack("modifier_legion_commander_duel_custom_damage")
	)
	return (1 + stack / self.ability.talents.h6_max * (self.ability.talents.h6_bonus - 1))
end

function modifier_legion_commander_duel_custom_tracker:GetModifierPercentageCooldown()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_cdr * self:GetHealthK()
end

function modifier_legion_commander_duel_custom_tracker:GetModifierExtraHealthPercentage()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_health * self:GetHealthK()
end

function modifier_legion_commander_duel_custom_tracker:GetModifierIncomingDamage_Percentage(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r2 == 0 then
		return
	end
	if not params.attacker:IsUnit() then
		return
	end

	local vector = (self.parent:GetAbsOrigin() - params.attacker:GetAbsOrigin()):Normalized()
	local facing = (
		math.abs(AngleDiff(VectorToAngles(vector).y, VectorToAngles(self.parent:GetForwardVector()).y)) > 85
	)

	if not facing then
		return
	end

	if RandomInt(1, 4) == 1 then
		self.parent:EmitSound("Juggernaut.Parry")
		local particle = ParticleManager:CreateParticle(
			"particles/juggernaut/jugg_parry.vpcf",
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
		ParticleManager:SetParticleControl(particle, 1, self.parent:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(particle)
	end

	return self.ability.talents.r2_damage_reduce
end

modifier_legion_commander_duel_custom_damage_stack = class(mod_visible)
function modifier_legion_commander_duel_custom_damage_stack:GetTexture()
	return "buffs/legion_commander/duel_3"
end
function modifier_legion_commander_duel_custom_damage_stack:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	self.count = 0

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh(table)
end

function modifier_legion_commander_duel_custom_damage_stack:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self.count = self.count + table.interval
	if self.count < (1 - FrameTime()) then
		return
	end
	self.count = 0

	self:IncrementStackCount()
	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Lc.Courage_armor")
		self.parent:GenericParticle("particles/legion_commander/lc_lowhp.vpcf", self)
	end
end

function modifier_legion_commander_duel_custom_damage_stack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_legion_commander_duel_custom_damage_stack:GetModifierDamageOutgoing_Percentage()
	return self:GetStackCount() * self.ability.talents.r3_damage / self.max
end

modifier_legion_commander_duel_custom_armor = class(mod_visible)
function modifier_legion_commander_duel_custom_armor:GetTexture()
	return "buffs/legion_commander/duel_1"
end
function modifier_legion_commander_duel_custom_armor:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor = self.ability.talents.has_r7 == 1 and self.ability.talents.r1_armor_legendary
		or self.ability.talents.r1_armor
	self.max = self.ability.talents.has_r7 == 1 and self.ability.talents.r1_max_legendary or self.ability.talents.r1_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_legion_commander_duel_custom_armor:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Hoodwink.Acorn_armor")
		self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	end
end

function modifier_legion_commander_duel_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_legion_commander_duel_custom_armor:GetModifierPhysicalArmorBonus()
	return self:GetStackCount() * self.armor
end

modifier_legion_commander_duel_custom_heal_cd = class(mod_cd)
function modifier_legion_commander_duel_custom_heal_cd:GetTexture()
	return "buffs/legion_commander/duel_4"
end

custom_legion_commander_duel_scepter = class({})
custom_legion_commander_duel_scepter.talents = {}

function custom_legion_commander_duel_scepter:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	if IsServer() then
		self:SetLevel(1)
	end

	self.gold = self:GetLevelSpecialValueFor("gold", 1)
	self.delay = self:GetLevelSpecialValueFor("delay", 1)
	self.max = self:GetLevelSpecialValueFor("max", 1)
	self.damage = self:GetLevelSpecialValueFor("damage", 1)
	self.spell = self:GetLevelSpecialValueFor("spell", 1)
	self:UpdateTalents()
end

function custom_legion_commander_duel_scepter:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q7 = 0,
			has_w7 = 0,
		}
	end

	if caster:HasTalent("modifier_legion_odds_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_legion_press_7") then
		self.talents.has_w7 = 1
	end
end

function custom_legion_commander_duel_scepter:OnAbilityPhaseStart()
	return not self:IsStolen()
end

function custom_legion_commander_duel_scepter:OnSpellStart()
	local possible_heroes = {}

	local total_count = 0
	for _, hero in pairs(players) do
		if hero:GetTeamNumber() ~= self.caster:GetTeamNumber() then
			total_count = total_count + 1
		end
	end

	for _, hero in pairs(players) do
		if hero:GetTeamNumber() ~= self.caster:GetTeamNumber() and (self.last_target ~= hero or total_count <= 2) then
			table.insert(possible_heroes, hero)
		end
	end

	if #possible_heroes == 0 then
		return
	end

	if #possible_heroes == 1 then
		self:SetTarget(possible_heroes[1], self.caster)
	else
		local random_1 = RandomInt(1, #possible_heroes)
		local random_2 = random_1

		repeat
			random_2 = RandomInt(1, #possible_heroes)
		until random_2 ~= random_1

		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_legion_commander_duel_custom_scepter_choosing",
			{ hero_1 = possible_heroes[random_1]:entindex(), hero_2 = possible_heroes[random_2]:entindex() }
		)
	end
end

function custom_legion_commander_duel_scepter:SetTarget(target, opponent)
	if not IsServer() then
		return
	end

	if not IsValid(target, opponent) or not players[target:GetId()] or not players[opponent:GetId()] then
		self:SetActivated(true)
		return
	end

	self.last_target = target
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_legion_commander_duel_custom_scepter_effect",
		{ target = target:entindex(), opponent = opponent:entindex() }
	)
end

modifier_legion_commander_duel_custom_scepter_choosing = class(mod_hidden)
function modifier_legion_commander_duel_custom_scepter_choosing:RemoveOnDeath()
	return false
end
function modifier_legion_commander_duel_custom_scepter_choosing:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.ability:EndCd()

	self.heroes = {}
	self.heroes[1] = EntIndexToHScript(table.hero_1)
	self.heroes[2] = EntIndexToHScript(table.hero_2)
	self.picked = nil

	self:OnIntervalThink()
	self:StartIntervalThink(0.5)
end

function modifier_legion_commander_duel_custom_scepter_choosing:OnIntervalThink()
	if not IsServer() then
		return
	end
	local targets = {}

	for i, hero in pairs(self.heroes) do
		targets[i] = { hero = hero:GetUnitName() }
	end

	self.parent:UpdateUIpick({ mod = self, text = "#legion_pick_hero", targets = targets })
end

function modifier_legion_commander_duel_custom_scepter_choosing:EndPick(pick)
	if not IsServer() then
		return
	end
	self.picked = pick
	self:Destroy()
end

function modifier_legion_commander_duel_custom_scepter_choosing:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	EmitAnnouncerSoundForPlayer("Lc.Duel_target_end", self.parent:GetPlayerOwnerID())
	self.parent:UpdateUIpick({ hide = 1 })

	if not self.picked then
		return
	end
	local target
	local opponent

	for index, search_target in pairs(self.heroes) do
		if index == self.picked and not target then
			target = search_target
		end
		if index ~= self.picked and not opponent then
			opponent = search_target
		end
	end

	self.ability:SetTarget(target, opponent)
end

modifier_legion_commander_duel_custom_scepter_effect = class(mod_hidden)
function modifier_legion_commander_duel_custom_scepter_effect:RemoveOnDeath()
	return false
end
function modifier_legion_commander_duel_custom_scepter_effect:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.target = EntIndexToHScript(table.target)
	self.opponent = EntIndexToHScript(table.opponent)

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"generic_sound",
		{ sound = "Lc.Duel_target_effect_sound" }
	)
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"generic_sound",
		{ sound = "Lc.Duel_target_effect_voice" }
	)

	self.ability:EndCd()
	self.parent:AddDeathEvent(self, true)

	self.interval = 0.2
	self.count = test and self.ability.delay or 0
	self:OnIntervalThink(true)
	self:StartIntervalThink(self.interval)
end

function modifier_legion_commander_duel_custom_scepter_effect:DeathEvent(params)
	if not IsServer() then
		return
	end
	if self.count < self.ability.delay then
		return
	end

	local unit = params.unit
	if unit:IsReincarnating() then
		return
	end

	if unit == self.parent or unit == self.opponent then
		self:Destroy()
		return
	end

	if unit == self.target then
		self.win = true
		self:Destroy()
	end
end

function modifier_legion_commander_duel_custom_scepter_effect:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	if
		not IsValid(self.target, self.opponent)
		or not players[self.target:GetId()]
		or not players[self.opponent:GetId()]
	then
		self:Destroy()
		return
	end

	if not first and self.count < self.ability.delay then
		self.count = self.count + self.interval
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"legion_duel_status",
		{ hero_1 = self.target:GetUnitName(), hero_2 = self.opponent:GetUnitName() }
	)
	AddFOWViewer(self.parent:GetTeamNumber(), self.target:GetAbsOrigin(), 10, self.interval * 2, false)
end

function modifier_legion_commander_duel_custom_scepter_effect:OnDestroy()
	if not IsServer() then
		return
	end
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"legion_duel_status_end",
		{}
	)
	self.ability:StartCd()

	if not self.win then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
			"generic_sound",
			{ sound = "Lc.Duel_lose_effect_voice" }
		)
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
			"generic_sound",
			{ sound = "Lc.Duel_lose_effect" }
		)
		return
	end

	Timers:CreateTimer(1, function()
		if IsValid(self.parent) then
			self.parent:GenericParticle(
				"particles/units/heroes/hero_legion_commander/legion_commander_duel_victory.vpcf",
				nil,
				true
			)
			self.parent:EmitSound("Hero_LegionCommander.Duel.Victory")
			self.parent:EmitSound("Lc.Duel_double")
			self.parent:GiveGold(self.ability.gold, true, nil, self.ability)
		end
	end)

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_legion_commander_duel_custom_scepter_win", {})
end

modifier_legion_commander_duel_custom_scepter_win = class(mod_visible)
function modifier_legion_commander_duel_custom_scepter_win:RemoveOnDeath()
	return false
end
function modifier_legion_commander_duel_custom_scepter_win:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.max
	self.damage = self.ability.damage
	self.spell = self.ability.spell

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_legion_commander_duel_custom_scepter_win:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_legion_commander_duel_custom_scepter_win:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_legion_commander_duel_custom_scepter_win:GetModifierPreAttack_BonusDamage()
	if not self.parent:HasScepter() then
		return
	end
	if self.ability.talents.has_w7 == 1 or self.ability.talents.has_q7 == 1 then
		return
	end
	return self.damage * self:GetStackCount()
end

function modifier_legion_commander_duel_custom_scepter_win:GetModifierSpellAmplify_Percentage(params)
	if not IsServer() then
		return
	end
	if params.inflictor and params.inflictor:IsItem() then
		return
	end
	return self:OnTooltip()
end

function modifier_legion_commander_duel_custom_scepter_win:OnTooltip()
	if not self.parent:HasScepter() then
		return
	end
	if self.ability.talents.has_w7 == 0 and self.ability.talents.has_q7 == 0 then
		return
	end
	return self.spell * self:GetStackCount()
end