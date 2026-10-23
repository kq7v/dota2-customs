--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_nyx_assassin_vendetta_custom_tracker",
	"abilities/nyx_assassin/nyx_assassin_vendetta_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_vendetta_custom",
	"abilities/nyx_assassin/nyx_assassin_vendetta_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_vendetta_custom_damage",
	"abilities/nyx_assassin/nyx_assassin_vendetta_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_nyx_assassin_vendetta_custom_legendary_armor",
	"abilities/nyx_assassin/nyx_assassin_vendetta_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_vendetta_7"
)
LinkLuaModifier(
	"modifier_nyx_assassin_vendetta_custom_shard",
	"abilities/nyx_assassin/nyx_assassin_vendetta_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Shard" }
)
LinkLuaModifier(
	"modifier_nyx_assassin_vendetta_custom_scarab",
	"abilities/nyx_assassin/nyx_assassin_vendetta_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_vendetta_custom_bonus",
	"abilities/nyx_assassin/nyx_assassin_vendetta_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_vendetta_custom_heal_reduce",
	"abilities/nyx_assassin/nyx_assassin_vendetta_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_vendetta_2"
)
LinkLuaModifier(
	"modifier_nyx_assassin_vendetta_custom_heal_reduce_bonus",
	"abilities/nyx_assassin/nyx_assassin_vendetta_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_nyx_vendetta_2" }
)
LinkLuaModifier(
	"modifier_nyx_assassin_vendetta_custom_bash_cd",
	"abilities/nyx_assassin/nyx_assassin_vendetta_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_vendetta_4"
)

nyx_assassin_vendetta_custom = class({})
nyx_assassin_vendetta_custom.talents = {}

function nyx_assassin_vendetta_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "nyx_assassin_vendetta", self)
end
nyx_assassin_vendetta_custom.legendary_target = nil

function nyx_assassin_vendetta_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_nyx_assassin/nyx_assassin_vendetta.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_nyx_assassin/nyx_assassin_vendetta_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_nyx_assassin/nyx_assassin_vendetta_speed.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_cleave.vpcf", context)
	PrecacheResource("particle", "particles/neutral_fx/skeleton_spawn.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/vendetta_bash.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_debuff.vpcf", context)
end

function nyx_assassin_vendetta_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r1_damage = 0,
			r1_speed = 0,
			r1_bonus = caster:GetTalentValue("modifier_nyx_vendetta_1", "bonus", true),
			r1_duration = caster:GetTalentValue("modifier_nyx_vendetta_1", "duration", true),

			has_r2 = 0,
			r2_heal_reduce = 0,
			r2_slow = 0,
			r2_bonus = caster:GetTalentValue("modifier_nyx_vendetta_2", "bonus", true),
			r2_duration = caster:GetTalentValue("modifier_nyx_vendetta_2", "duration", true),
			r2_slow_duration = caster:GetTalentValue("modifier_nyx_vendetta_2", "slow_duration", true),

			has_r3 = 0,
			r3_cd = 0,
			r3_cd_legendary = 0,
			r3_damage = 0,
			r3_bva = caster:GetTalentValue("modifier_nyx_vendetta_3", "bva", true),
			r3_duration = caster:GetTalentValue("modifier_nyx_vendetta_3", "duration", true),

			has_r4 = 0,
			r4_chance = caster:GetTalentValue("modifier_nyx_vendetta_4", "chance", true),
			r4_stun = caster:GetTalentValue("modifier_nyx_vendetta_4", "stun", true),
			r4_stun_legendary = caster:GetTalentValue("modifier_nyx_vendetta_4", "stun_legendary", true),
			r4_range = caster:GetTalentValue("modifier_nyx_vendetta_4", "range", true),
			r4_talent_cd = caster:GetTalentValue("modifier_nyx_vendetta_4", "talent_cd", true),

			has_r7 = 0,
			r7_cd = caster:GetTalentValue("modifier_nyx_vendetta_7", "cd", true),
			r7_attacks = caster:GetTalentValue("modifier_nyx_vendetta_7", "attacks", true),
			r7_armor = caster:GetTalentValue("modifier_nyx_vendetta_7", "armor", true) / 100,
			r7_armor_creeps = caster:GetTalentValue("modifier_nyx_vendetta_7", "armor_creeps", true),
			r7_duration = caster:GetTalentValue("modifier_nyx_vendetta_7", "duration", true),
			r7_linger = caster:GetTalentValue("modifier_nyx_vendetta_7", "linger", true),
			r7_cleave = caster:GetTalentValue("modifier_nyx_vendetta_7", "cleave", true) / 100,
			r7_damage = caster:GetTalentValue("modifier_nyx_vendetta_7", "damage", true) / 100,
			r7_break_duration = caster:GetTalentValue("modifier_nyx_vendetta_7", "break_duration", true),
			r7_bva = caster:GetTalentValue("modifier_nyx_vendetta_7", "bva", true),
			r7_heal = caster:GetTalentValue("modifier_nyx_vendetta_7", "heal", true) / 100,

			has_h4 = 0,
			h4_radius = caster:GetTalentValue("modifier_nyx_hero_4", "radius", true),

			q1_heal = 0,

			e2_heal = 0,
			e2_bonus = caster:GetTalentValue("modifier_nyx_carapace_2", "bonus", true),

			h1_mana = 0,
		}
	end

	if caster:HasTalent("modifier_nyx_impale_1") then
		self.talents.q1_heal = caster:GetTalentValue("modifier_nyx_impale_1", "heal") / 100
	end

	if caster:HasTalent("modifier_nyx_carapace_2") then
		self.talents.e2_heal = caster:GetTalentValue("modifier_nyx_carapace_2", "heal") / 100
	end

	if caster:HasTalent("modifier_nyx_hero_1") then
		self.talents.h1_mana = caster:GetTalentValue("modifier_nyx_hero_1", "mana") / 100
	end

	if caster:HasTalent("modifier_nyx_vendetta_1") then
		self.talents.r1_damage = caster:GetTalentValue("modifier_nyx_vendetta_1", "damage")
		self.talents.r1_speed = caster:GetTalentValue("modifier_nyx_vendetta_1", "speed")
	end

	if caster:HasTalent("modifier_nyx_vendetta_2") then
		self.talents.has_r2 = 1
		self.talents.r2_heal_reduce = caster:GetTalentValue("modifier_nyx_vendetta_2", "heal_reduce")
		self.talents.r2_slow = caster:GetTalentValue("modifier_nyx_vendetta_2", "slow")
	end

	if caster:HasTalent("modifier_nyx_vendetta_3") then
		self.talents.has_r3 = 1
		self.talents.r3_cd = caster:GetTalentValue("modifier_nyx_vendetta_3", "cd")
		self.talents.r3_cd_legendary = caster:GetTalentValue("modifier_nyx_vendetta_3", "cd_legendary")
		self.talents.r3_damage = caster:GetTalentValue("modifier_nyx_vendetta_3", "damage") / 100
	end

	if caster:HasTalent("modifier_nyx_vendetta_4") then
		self.talents.has_r4 = 1
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_nyx_vendetta_7") then
		self.talents.has_r7 = 1
		if IsServer() and not self.tracker.interval then
			self.tracker.interval = 0.1
			caster:RemoveModifierByName("modifier_nyx_assassin_vendetta_custom")
			self:EndCd(0)
			self:StartCooldown(1)
			self.tracker:StartIntervalThink(self.tracker.interval)
		end
		caster:AddAttackRecordEvent_out(self.tracker, true)
		caster:AddLifesteal(self.tracker, {
			name = "modifier_nyx_vendetta_7",
			type = 2,
			text = true,
			proc = "LifestealRecord",
			value = function(params)
				if not params.record then
					return 0
				end
				if params.record ~= self.tracker.record then
					return 0
				end
				return self.talents.r7_heal
			end,
		})
	end

	if caster:HasTalent("modifier_nyx_hero_4") then
		self.talents.has_h4 = 1
	end
end

function nyx_assassin_vendetta_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_nyx_assassin_vendetta_custom_tracker"
end

function nyx_assassin_vendetta_custom:GetCd(level)
	local base = self.BaseClass.GetCooldown(self, level)
	local bonus = self.talents.r3_cd or 0
	if self.talents.has_r7 == 1 then
		base = self.talents.r7_cd
		bonus = self.talents.r3_cd_legendary or 0
	end
	return base + bonus
end

function nyx_assassin_vendetta_custom:GetCooldown(level)
	local result = self:GetCd(level)
	if self.talents.has_r7 == 1 then
		result = result / self.caster:GetCooldownReduction()
	end
	return result
end

function nyx_assassin_vendetta_custom:GetManaCost(level)
	if self.talents.has_r7 == 1 then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function nyx_assassin_vendetta_custom:GetBehavior()
	local base = self.talents.has_r7 == 1 and DOTA_ABILITY_BEHAVIOR_PASSIVE or DOTA_ABILITY_BEHAVIOR_NO_TARGET
	return DOTA_ABILITY_BEHAVIOR_IMMEDIATE + base + DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL
end

function nyx_assassin_vendetta_custom:GetDamage()
	local result = self.bonus_damage
	if self.talents.has_r7 == 1 then
		result = result * self.talents.r7_damage
	end
	return result
end

function nyx_assassin_vendetta_custom:OnSpellStart()
	self.caster:RemoveModifierByName("modifier_nyx_assassin_burrow_custom")
	self.caster:AddNewModifier(self.caster, self, "modifier_nyx_assassin_vendetta_custom", { duration = self.duration })
end

function nyx_assassin_vendetta_custom:PlayEffect(target)
	if not IsServer() then
		return
	end
	target:EmitSound("Hero_NyxAssassin.Vendetta.Crit")

	local vec = (target:GetAbsOrigin() - self.caster:GetAbsOrigin()):Normalized()
	vec.z = 0
	local effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_nyx_assassin/nyx_assassin_vendetta.vpcf",
		PATTACH_ABSORIGIN,
		self.caster
	)
	ParticleManager:SetParticleControl(effect, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControlForward(effect, 0, vec)
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
end

function nyx_assassin_vendetta_custom:SpawnScarab(point)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r3 == 0 then
		return
	end

	local pos = point + RandomVector(220)

	local unit = CreateUnitByName(
		"npc_nyx_assassin_scarab_custom",
		pos,
		false,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)
	unit:AddNewModifier(self.caster, self, "modifier_nyx_assassin_vendetta_custom_scarab", {})
	unit:AddNewModifier(self.caster, self, "modifier_kill", { duration = self.talents.r3_duration })
	unit:GenericParticle("particles/neutral_fx/skeleton_spawn.vpcf")
	unit:StartGestureWithPlaybackRate(ACT_DOTA_SPAWN, 1.5)

	unit.owner = self.caster

	EmitSoundOnLocationWithCaster(unit:GetAbsOrigin(), "Nyx.Vendetta_scarab_spawn", self.caster)
	unit:SetAngles(0, 0, 0)
	unit:SetForwardVector(self.caster:GetForwardVector())
	FindClearSpaceForUnit(unit, unit:GetAbsOrigin(), true)
end

function nyx_assassin_vendetta_custom:ProcBash(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r4 == 0 then
		return
	end

	local effect =
		ParticleManager:CreateParticle("particles/nyx_assassin/vendetta_bash.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
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

	target:EmitSound("Nyx.Vendetta_bash")
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_bashed",
		{
			duration = (self.talents.has_r7 == 1 and self.talents.r4_stun_legendary or self.talents.r4_stun)
				* (1 - target:GetStatusResistance()),
		}
	)
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_nyx_assassin_vendetta_custom_bash_cd",
		{ duration = self.talents.r4_talent_cd }
	)
end

modifier_nyx_assassin_vendetta_custom_tracker = class(mod_hidden)
function modifier_nyx_assassin_vendetta_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.vendetta_ability = self.ability
	self.base_bva = self.parent:GetBaseAttackTime(false)

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.movement_speed = self.ability:GetSpecialValueFor("movement_speed")
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.attack_animation_bonus = self.ability:GetSpecialValueFor("attack_animation_bonus")
	self.ability.attack_range_bonus = self.ability:GetSpecialValueFor("attack_range_bonus")
	self.ability.break_duration = self.ability:GetSpecialValueFor("break_duration")

	self.ability.shard_max_move = self.ability:GetSpecialValueFor("shard_max_move")
	self.ability.shard_duration = self.ability:GetSpecialValueFor("shard_duration")
	self.ability.shard_move = self.ability:GetSpecialValueFor("shard_move")

	self.record = true
	self.parent:AddProc(self, { name = "hit", land = true, sync = true, ally = true, any = true })
end

function modifier_nyx_assassin_vendetta_custom_tracker:OnRefresh()
	self.ability.movement_speed = self.ability:GetSpecialValueFor("movement_speed")
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
end

function modifier_nyx_assassin_vendetta_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end

	local max = self.ability.talents.r7_duration
	local time = 0
	local stack = "0%"

	if IsValid(self.ability.legendary_target) then
		local mod =
			self.ability.legendary_target:FindModifierByName("modifier_nyx_assassin_vendetta_custom_legendary_armor")
		if mod then
			time = mod:GetRemainingTime()
			if self.ability.legendary_target:IsCreep() then
				stack = mod:GetStackCount() * mod.armor
			else
				stack = math.floor(mod:GetStackCount() * self.ability.talents.r7_armor * 100 + 0.5) .. "%"
			end
		else
			self.ability.legendary_target = nil
		end
	end

	self.parent:UpdateUIlong({ max = max, stack = time, override_stack = stack, style = "NyxVendetta" })

	if self.ability:GetCooldownTimeRemaining() > 0 then
		return
	end
	if self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom") then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_nyx_assassin_vendetta_custom", {})
end

function modifier_nyx_assassin_vendetta_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
	}
end

function modifier_nyx_assassin_vendetta_custom_tracker:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.r1_damage
		* (
			(
					self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom_bonus")
					or self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom")
				)
				and self.ability.talents.r1_bonus
			or 1
		)
end

function modifier_nyx_assassin_vendetta_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.r1_speed
		* (
			(
					self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom_bonus")
					or self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom")
				)
				and self.ability.talents.r1_bonus
			or 1
		)
end

function modifier_nyx_assassin_vendetta_custom_tracker:GetModifierAttackRangeBonus()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_range
end

function modifier_nyx_assassin_vendetta_custom_tracker:GetModifierBaseAttackTimeConstant()
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom_damage") then
		return
	end
	return self.base_bva + self.ability.talents.r7_bva
end

function modifier_nyx_assassin_vendetta_custom_tracker:LifestealRecord()
	self.record = nil
end

function modifier_nyx_assassin_vendetta_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	if params.target:HasModifier("modifier_nyx_assassin_vendetta_custom_bash_cd") then
		return 0
	end
	if not params.no_attack_cooldown and self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom") then
		return 0
	end
	return self.ability.talents.r4_chance
end

function modifier_nyx_assassin_vendetta_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	local target = params.target
	local bash_proc = false

	if not params.no_attack_cooldown then
		local mod = self.parent:FindModifierByName("modifier_nyx_assassin_vendetta_custom")
		local damage_mod = self.parent:FindModifierByName("modifier_nyx_assassin_vendetta_custom_damage")
		local has_legendary = self.ability.talents.has_r7 == 1

		if damage_mod then
			damage_mod:DecrementStackCount()
			self.ability:PlayEffect(target)

			if has_legendary then
				DoCleaveAttack(
					self.parent,
					target,
					self.ability,
					self.ability.talents.r7_cleave * params.damage,
					150,
					360,
					650,
					"particles/bloodseeker/thirst_cleave.vpcf"
				)
			end

			self.record = params.record

			if damage_mod:GetStackCount() <= 0 then
				damage_mod:Destroy()
				if has_legendary and target:IsUnit() then
					target:AddNewModifier(
						self.parent,
						self.ability,
						"modifier_nyx_assassin_vendetta_custom_legendary_armor",
						{ duration = self.ability.talents.r7_duration }
					)
				end
			end
		end

		if mod and not mod.ended then
			mod.ended = true
			mod:Destroy()

			if target:IsUnit() then
				if not has_legendary then
					local damageTable = {
						victim = target,
						attacker = self.parent,
						ability = self.ability,
						damage_type = DAMAGE_TYPE_PURE,
						damage = self.ability:GetDamage(),
					}
					local real_damage = DoDamage(damageTable)
					target:SendNumber(6, real_damage)
				end

				local break_duration = self.ability.break_duration
				if has_legendary then
					break_duration = break_duration / self.ability.talents.r7_break_duration
				end
				target:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_generic_break",
					{ duration = break_duration * (1 - target:GetStatusResistance()) }
				)

				self.parent:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_nyx_assassin_vendetta_custom_bonus",
					{ duration = self.ability.talents.r1_duration }
				)

				if self.ability.talents.has_r2 == 1 then
					target:AddNewModifier(
						self.parent,
						self.ability,
						"modifier_nyx_assassin_vendetta_custom_heal_reduce_bonus",
						{ duration = self.ability.talents.r2_duration }
					)
				end

				bash_proc = true
				self.ability:SpawnScarab(target:GetAbsOrigin())

				if IsValid(self.parent.carapace_ability) then
					self.parent.carapace_ability:SpeedStack()
				end

				if IsValid(self.parent.impale_ability) then
					self.parent.impale_ability:AbilityHit(target)
					self.parent.impale_ability:ProcCd()
				end
			end
		end
	end

	if not target:IsUnit() then
		return
	end

	if self.ability.talents.has_r2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_nyx_assassin_vendetta_custom_heal_reduce",
			{ duration = self.ability.talents.r2_slow_duration }
		)
	end

	if bash_proc or params.procs[self].default then
		self.ability:ProcBash(target)
	end
end

function modifier_nyx_assassin_vendetta_custom_tracker:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom") then
		return
	end

	self.ability:StartCd(self.ability:GetCd(self.ability:GetLevel()))
end

modifier_nyx_assassin_vendetta_custom = class(mod_visible)
function modifier_nyx_assassin_vendetta_custom:IsHidden()
	return self.ability.talents.has_r7 == 1
end
function modifier_nyx_assassin_vendetta_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.move_speed = self.ability.movement_speed + (self.parent:HasShard() and self.ability.shard_move or 0)
	self.anim = self.ability.attack_animation_bonus

	self.remove_limit = 0
	self.move_limit = nil

	if self.parent:HasShard() then
		self.remove_limit = 1
		self.move_limit = self.ability.shard_max_move
		if IsServer() then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_nyx_assassin_vendetta_custom_shard",
				{ duration = self.ability.shard_duration }
			)
		end
	end

	if not IsServer() then
		return
	end
	self.ability:EndCd()
	self.RemoveForDuel = true

	self.parent:RemoveModifierByName("modifier_nyx_assassin_vendetta_custom_damage")

	self.mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_nyx_assassin_vendetta_custom_damage", {})

	self.parent:EmitSound("Hero_NyxAssassin.Vendetta")

	local effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_nyx_assassin/nyx_assassin_vendetta_start.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect, 0, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(effect)

	self.parent:GenericParticle("particles/units/heroes/hero_nyx_assassin/nyx_assassin_vendetta_speed.vpcf", self)

	self.allow_abilities = {
		["nyx_assassin_spiked_carapace_custom"] = true,
	}

	self.parent:AddSpellEvent(self, true)

	if self.ability.talents.has_h4 == 0 then
		return
	end
	self.interval = 0.2
	self:StartIntervalThink(self.interval)
end

function modifier_nyx_assassin_vendetta_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	local min_dist = 999999
	local min_player = nil

	for _, player in pairs(players) do
		local dist = (player:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D()
		if
			player:IsAlive()
			and player:GetTeamNumber() ~= self.parent:GetTeamNumber()
			and dist <= self.ability.talents.h4_radius
			and min_dist > dist
		then
			min_dist = dist
			min_player = player
		end
	end

	if not min_player then
		return
	end
	AddFOWViewer(self.parent:GetTeamNumber(), min_player:GetAbsOrigin(), 50, self.interval * 2, false)
end

function modifier_nyx_assassin_vendetta_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_INVISIBILITY_LEVEL,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
	}
end

function modifier_nyx_assassin_vendetta_custom:GetModifierIgnoreMovespeedLimit(params)
	return self.remove_limit
end

function modifier_nyx_assassin_vendetta_custom:GetModifierMoveSpeed_Max(params)
	return self.move_limit
end

function modifier_nyx_assassin_vendetta_custom:GetModifierMoveSpeed_Limit()
	return self.move_limit
end

function modifier_nyx_assassin_vendetta_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.move_speed
end

function modifier_nyx_assassin_vendetta_custom:GetModifierAttackSpeedBonus_Constant()
	if IsClient() then
		return
	end
	return 300
end

function modifier_nyx_assassin_vendetta_custom:GetModifierInvisibilityLevel()
	return 1
end

function modifier_nyx_assassin_vendetta_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ended then
		return
	end
	if self.allow_abilities[params.ability:GetName()] then
		return
	end
	if params.unit ~= self.parent then
		return
	end

	self.ended = true
	self:Destroy()
end

function modifier_nyx_assassin_vendetta_custom:CheckState()
	return {
		[MODIFIER_STATE_INVISIBLE] = true,
		[MODIFIER_STATE_CANNOT_MISS] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_nyx_assassin_vendetta_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:RemoveModifierByName("modifier_nyx_assassin_vendetta_custom_shard")

	if IsValid(self.mod) then
		if self.ability.talents.has_r7 == 1 then
			self.mod:SetDuration(self.ability.talents.r7_linger, true)
		else
			self.mod:Destroy()
		end
	end
end

modifier_nyx_assassin_vendetta_custom_damage = class(mod_hidden)
function modifier_nyx_assassin_vendetta_custom_damage:IsHidden()
	return self.ability.talents.has_r7 == 0
end
function modifier_nyx_assassin_vendetta_custom_damage:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability:GetDamage()
	self.range = self.ability.attack_range_bonus

	if not IsServer() then
		return
	end
	local stack = 1

	if self.ability.talents.has_r7 == 1 then
		stack = self.ability.talents.r7_attacks
	end
	self:SetStackCount(stack)
end

function modifier_nyx_assassin_vendetta_custom_damage:CheckState()
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_nyx_assassin_vendetta_custom_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_nyx_assassin_vendetta_custom_damage:GetActivityTranslationModifiers()
	return "vendetta"
end

function modifier_nyx_assassin_vendetta_custom_damage:GetModifierAttackRangeBonus()
	return self.range
end

function modifier_nyx_assassin_vendetta_custom_damage:GetModifierPreAttack_BonusDamage(params)
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if IsServer() and not params.target then
		return
	end
	if self.parent:HasModifier("modifier_nyx_assassin_spiked_carapace_custom_attack") then
		return
	end
	return self.damage
end

modifier_nyx_assassin_vendetta_custom_legendary_armor = class(mod_visible)
function modifier_nyx_assassin_vendetta_custom_legendary_armor:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	self:SetHasCustomTransmitterData(true)
	self:OnRefresh()
end

function modifier_nyx_assassin_vendetta_custom_legendary_armor:OnRefresh()
	if not IsServer() then
		return
	end
	self.armor = self.parent:IsCreep() and self.ability.talents.r7_armor_creeps
		or self.parent:GetArmor(self) * self.ability.talents.r7_armor
	self:SendBuffRefreshToClients()
	self.parent:EmitSound("Nyx.Vendetta_legendary_armor")
	self:StartIntervalThink(0.1)
end

function modifier_nyx_assassin_vendetta_custom_legendary_armor:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
	self.ability.legendary_target = self.parent
	self:StartIntervalThink(-1)
end

function modifier_nyx_assassin_vendetta_custom_legendary_armor:AddCustomTransmitterData()
	return {
		armor = self.armor,
	}
end

function modifier_nyx_assassin_vendetta_custom_legendary_armor:HandleCustomTransmitterData(data)
	self.armor = data.armor
end

function modifier_nyx_assassin_vendetta_custom_legendary_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_nyx_assassin_vendetta_custom_legendary_armor:GetModifierPhysicalArmorBonus()
	if not self.armor then
		return
	end
	return self.armor * self:GetStackCount()
end

modifier_nyx_assassin_vendetta_custom_shard = class(mod_visible)
function modifier_nyx_assassin_vendetta_custom_shard:GetTexture()
	return "item_aghanims_shard"
end
function modifier_nyx_assassin_vendetta_custom_shard:CheckState()
	return {
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
	}
end

modifier_nyx_assassin_vendetta_custom_scarab = class(mod_hidden)
function modifier_nyx_assassin_vendetta_custom_scarab:GetStatusEffectName()
	return "particles/status_fx/status_effect_snapfire_slow.vpcf"
end
function modifier_nyx_assassin_vendetta_custom_scarab:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_nyx_assassin_vendetta_custom_scarab:GetEffectName()
	return "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_debuff.vpcf"
end
function modifier_nyx_assassin_vendetta_custom_scarab:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_nyx_assassin_vendetta_custom_scarab:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	local health = 100
	self.parent:SetBaseAttackTime(self.ability.talents.r3_bva)

	self.parent:SetBaseMaxHealth(health)

	self.vec = RandomVector(200)
	self.radius = 1000

	self.parent:AddLifesteal(self, {
		name = "modifier_nyx_impale_1",
		type = 1,
		heal_unit = self.caster,
		value = function()
			return self.ability.talents.q1_heal
		end,
	})
	self.parent:AddLifesteal(self, {
		name = "modifier_nyx_carapace_2",
		type = 2,
		heal_unit = self.caster,
		value = function()
			if self.caster:HasModifier("modifier_nyx_assassin_spiked_carapace_custom_heal_bonus") then
				return self.ability.talents.e2_heal * self.ability.talents.e2_bonus, nil, true
			end
			return self.ability.talents.e2_heal
		end,
	})
	self.parent:AddLifesteal(self, {
		name = "modifier_nyx_hero_1",
		heal_unit = self.caster,
		heal = false,
		proc = "LifestealMana",
		value = function()
			return self.ability.talents.h1_mana
		end,
	})

	self:OnIntervalThink()
	self:StartIntervalThink(0.5)
end

function modifier_nyx_assassin_vendetta_custom_scarab:LifestealMana(params, mana, target)
	target:GiveMana(mana)
end

function modifier_nyx_assassin_vendetta_custom_scarab:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE,
	}
end

function modifier_nyx_assassin_vendetta_custom_scarab:GetModifierOverrideAttackDamage()
	if not IsServer() then
		return
	end
	return self.ability.talents.r3_damage * self.caster:GetAverageTrueAttackDamage(nil)
end

function modifier_nyx_assassin_vendetta_custom_scarab:IsValidTarget(target)
	if not IsServer() then
		return
	end

	if
		not IsValid(target)
		or not target:IsAlive()
		or not target:IsUnit()
		or target:IsCourier()
		or ((target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.radius)
		or target:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")
	then
		return false
	end

	return true
end

function modifier_nyx_assassin_vendetta_custom_scarab:SetTarget(target)
	if not IsServer() then
		return
	end
	if not self:IsValidTarget(target) then
		return
	end
	if self.target == target then
		return
	end

	self.target = target
	self.parent:MoveToTargetToAttack(self.target)
	self.parent:SetForceAttackTarget(self.target)
end

function modifier_nyx_assassin_vendetta_custom_scarab:MoveToCaster()
	if not IsServer() then
		return
	end

	self.target = nil
	self.parent:SetForceAttackTarget(nil)

	local point = self.caster:GetAbsOrigin() + self.vec

	if (point - self.parent:GetAbsOrigin()):Length2D() > 50 then
		self.parent:MoveToPosition(self.caster:GetAbsOrigin() + self.vec)
	end
end

function modifier_nyx_assassin_vendetta_custom_scarab:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		self:StartIntervalThink(-1)
		return
	end

	if self.parent:GetAggroTarget() then
		self.target = self.parent:GetAggroTarget()
	end

	local heroes = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)
	local creeps = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)

	if self:IsValidTarget(self.target) and self.target:IsHero() then
		self:SetTarget(self.target)
		return
	end

	if (not self:IsValidTarget(self.target) or not self.target:IsHero()) and #heroes > 0 then
		for _, hero in pairs(heroes) do
			if self:IsValidTarget(hero) then
				self:SetTarget(hero)
				break
			end
		end
	end

	if not self:IsValidTarget(self.target) and #creeps > 0 then
		for _, creep in pairs(creeps) do
			if self:IsValidTarget(creep) then
				self:SetTarget(creep)
				break
			end
		end
	end

	if not self:IsValidTarget(self.target) then
		self:MoveToCaster()
	end
end

function modifier_nyx_assassin_vendetta_custom_scarab:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
	}
end

modifier_nyx_assassin_vendetta_custom_bonus = class(mod_hidden)

modifier_nyx_assassin_vendetta_custom_heal_reduce = class(mod_hidden)
function modifier_nyx_assassin_vendetta_custom_heal_reduce:IsPurgable()
	return true
end
function modifier_nyx_assassin_vendetta_custom_heal_reduce:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.heal_reduce = self.ability.talents.r2_heal_reduce
	self.slow = self.ability.talents.r2_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", self)
end

function modifier_nyx_assassin_vendetta_custom_heal_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_nyx_assassin_vendetta_custom_heal_reduce:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
		* (
			self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom_heal_reduce_bonus")
				and self.ability.talents.r2_bonus
			or 1
		)
end

function modifier_nyx_assassin_vendetta_custom_heal_reduce:GetModifierHealChange()
	return self.heal_reduce
		* (
			self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom_heal_reduce_bonus")
				and self.ability.talents.r2_bonus
			or 1
		)
end

function modifier_nyx_assassin_vendetta_custom_heal_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce
		* (
			self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom_heal_reduce_bonus")
				and self.ability.talents.r2_bonus
			or 1
		)
end

modifier_nyx_assassin_vendetta_custom_heal_reduce_bonus = class(mod_hidden)
function modifier_nyx_assassin_vendetta_custom_heal_reduce_bonus:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

modifier_nyx_assassin_vendetta_custom_bash_cd = class(mod_hidden)