--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_monkey_king_primal_spring_custom",
	"abilities/monkey_king/monkey_king_primal_spring_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_primal_spring_custom_tracker",
	"abilities/monkey_king/monkey_king_primal_spring_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_primal_spring_custom_banana",
	"abilities/monkey_king/monkey_king_primal_spring_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_primal_spring_custom_legendary",
	"abilities/monkey_king/monkey_king_primal_spring_custom.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_tree_7"
)
LinkLuaModifier(
	"modifier_monkey_king_primal_spring_custom_bonus",
	"abilities/monkey_king/monkey_king_primal_spring_custom.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_hero_2"
)
LinkLuaModifier(
	"modifier_monkey_king_primal_spring_custom_heal_reduce",
	"abilities/monkey_king/monkey_king_primal_spring_custom.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_tree_2"
)
LinkLuaModifier(
	"modifier_monkey_king_primal_spring_custom_delay",
	"abilities/monkey_king/monkey_king_primal_spring_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_primal_spring_custom_shield_cd",
	"abilities/monkey_king/monkey_king_primal_spring_custom.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_tree_4"
)

monkey_king_primal_spring_custom = class({})
monkey_king_primal_spring_custom.talents = {}
monkey_king_primal_spring_custom.bananas = 0

function monkey_king_primal_spring_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_spring_channel.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_spring_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_spring.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_jump_trail.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_spring_slow.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_monkey_king_spring_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_disguise.vpcf", context)
	PrecacheResource("particle", "particles/alchemist/alch_stun_legendary.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/mk_buff_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/primal_double.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/tree_shield.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/mk_heal_red_1.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/strike_refresh.vpcf", context)
end

function monkey_king_primal_spring_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if caster.owner then
		caster = caster.owner
	end

	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_damage = 0,
			w1_spell = 0,
			w1_base = 0,
			w1_creeps = 0,

			has_w2 = 0,
			w2_cd = 0,
			w2_heal_reduce = 0,
			w2_duration = caster:GetTalentValue("modifier_monkey_king_tree_2", "duration", true),

			has_w3 = 0,
			w3_damage = 0,
			w3_cdr = 0,
			w3_delay = caster:GetTalentValue("modifier_monkey_king_tree_3", "delay", true),
			w3_stun = caster:GetTalentValue("modifier_monkey_king_tree_3", "stun", true),
			w3_radius = caster:GetTalentValue("modifier_monkey_king_tree_3", "radius", true),

			has_w4 = 0,
			w4_cast = caster:GetTalentValue("modifier_monkey_king_tree_4", "cast", true) / 100,
			w4_base = caster:GetTalentValue("modifier_monkey_king_tree_4", "base", true),
			w4_talent_cd = caster:GetTalentValue("modifier_monkey_king_tree_4", "talent_cd", true),
			w4_shield = caster:GetTalentValue("modifier_monkey_king_tree_4", "shield", true) / 100,

			has_w7 = 0,
			w7_legendary = caster:GetTalentValue("modifier_monkey_king_tree_7", "legendary", true),
			w7_radius = caster:GetTalentValue("modifier_monkey_king_tree_7", "radius", true),
			w7_bonus_1 = caster:GetTalentValue("modifier_monkey_king_tree_7", "bonus_1", true),
			w7_max = caster:GetTalentValue("modifier_monkey_king_tree_7", "max", true),
			w7_refresh_cd = caster:GetTalentValue("modifier_monkey_king_tree_7", "refresh_cd", true),
			w7_gold = caster:GetTalentValue("modifier_monkey_king_tree_7", "gold", true),
			w7_gold_inc = caster:GetTalentValue("modifier_monkey_king_tree_7", "gold_inc", true),
			w7_exp = caster:GetTalentValue("modifier_monkey_king_tree_7", "exp", true),
			w7_exp_inc = caster:GetTalentValue("modifier_monkey_king_tree_7", "exp_inc", true),
			w7_blue = caster:GetTalentValue("modifier_monkey_king_tree_7", "blue", true),
			w7_blue_inc = caster:GetTalentValue("modifier_monkey_king_tree_7", "blue_inc", true),
			w7_charge = caster:GetTalentValue("modifier_monkey_king_tree_7", "charge", true),
			w7_vision = caster:GetTalentValue("modifier_monkey_king_tree_7", "vision", true),
			w7_mana = caster:GetTalentValue("modifier_monkey_king_tree_7", "mana", true) / 100,
			w7_cd = caster:GetTalentValue("modifier_monkey_king_tree_7", "cd", true),
			w7_chance = caster:GetTalentValue("modifier_monkey_king_tree_7", "chance", true),
			w7_duration = caster:GetTalentValue("modifier_monkey_king_tree_7", "duration", true),
			w7_damage = caster:GetTalentValue("modifier_monkey_king_tree_7", "damage", true) / 100,
			w7_bonus_2 = caster:GetTalentValue("modifier_monkey_king_tree_7", "bonus_2", true),
			w7_tower_radius = caster:GetTalentValue("modifier_monkey_king_tree_7", "tower_radius", true),

			has_h2 = 0,
			h2_evasion = 0,
			h2_move = 0,
			h2_bonus = caster:GetTalentValue("modifier_monkey_king_hero_2", "bonus", true),
			h2_duration = caster:GetTalentValue("modifier_monkey_king_hero_2", "duration", true),

			has_h5 = 0,
			h5_speed = caster:GetTalentValue("modifier_monkey_king_hero_5", "speed", true) / 100,
			h5_silence = caster:GetTalentValue("modifier_monkey_king_hero_5", "silence", true),
			h5_talent_cd = caster:GetTalentValue("modifier_monkey_king_hero_5", "talent_cd", true),

			has_r7 = 0,
			r7_cd_spring = caster:GetTalentValue("modifier_monkey_king_command_7", "cd_spring", true),
		}
	end

	if caster:HasTalent("modifier_monkey_king_tree_1") then
		self.talents.has_w1 = 1
		self.talents.w1_damage = caster:GetTalentValue("modifier_monkey_king_tree_1", "damage") / 100
		self.talents.w1_creeps = caster:GetTalentValue("modifier_monkey_king_tree_1", "creeps")
		self.talents.w1_spell = caster:GetTalentValue("modifier_monkey_king_tree_1", "spell")
		self.talents.w1_base = caster:GetTalentValue("modifier_monkey_king_tree_1", "base")
	end

	if not self.caster:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier") then
		if caster:HasTalent("modifier_monkey_king_tree_2") then
			self.talents.has_w2 = 1
			self.talents.w2_cd = caster:GetTalentValue("modifier_monkey_king_tree_2", "cd")
			self.talents.w2_heal_reduce = caster:GetTalentValue("modifier_monkey_king_tree_2", "heal_reduce")
		end

		if caster:HasTalent("modifier_monkey_king_tree_4") then
			self.talents.has_w4 = 1
			if IsServer() and not self.w4_init then
				self.w4_init = true
				self.tracker:StartIntervalThink(1)
			end
		end

		if caster:HasTalent("modifier_monkey_king_tree_7") then
			self.talents.has_w7 = 1
			if IsServer() and not self.w7_init then
				self.w7_init = true
				self.tracker:StartIntervalThink(1)
				if dota1x6.current_wave >= upgrade_orange then
					caster:AddNewModifier(
						caster,
						self,
						"modifier_monkey_king_primal_spring_custom_legendary",
						{ stack = self.talents.w7_legendary }
					)
				end
			end
		end

		if caster:HasTalent("modifier_monkey_king_hero_2") then
			self.talents.has_h2 = 1
			self.talents.h2_evasion = caster:GetTalentValue("modifier_monkey_king_hero_2", "evasion")
			self.talents.h2_move = caster:GetTalentValue("modifier_monkey_king_hero_2", "move")
		end

		if caster:HasTalent("modifier_monkey_king_command_7") then
			self.talents.has_r7 = 1
		end
	end

	if caster:HasTalent("modifier_monkey_king_tree_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_monkey_king_tree_3", "damage") / 100
		self.talents.w3_cdr = caster:GetTalentValue("modifier_monkey_king_tree_3", "cdr")
	end

	if caster:HasTalent("modifier_monkey_king_hero_5") then
		self.talents.has_h5 = 1
	end
end

function monkey_king_primal_spring_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_monkey_king_primal_spring_custom_tracker"
end

function monkey_king_primal_spring_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "monkey_king_primal_spring", self)
end

function monkey_king_primal_spring_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level) * (1 + (self.talents.has_w7 == 1 and self.talents.w7_mana or 0))
end

function monkey_king_primal_spring_custom:GetChannelTime()
	local bonus = 1
	if self.caster:HasModifier("modifier_monkey_king_tree_dance_custom") then
		bonus = 1 + (self.tree_cast or 0)
	end
	return (self.AbilityChannelTime or 0) * (1 + (self.talents.has_w4 == 1 and self.talents.w4_cast or 0)) * bonus
end

function monkey_king_primal_spring_custom:GetAOERadius()
	return self.impact_radius or 0
end

function monkey_king_primal_spring_custom:GetBehavior()
	if self.caster:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier") then
		return DOTA_ABILITY_BEHAVIOR_POINT
	end
	return DOTA_ABILITY_BEHAVIOR_POINT
		+ DOTA_ABILITY_BEHAVIOR_AOE
		+ DOTA_ABILITY_BEHAVIOR_CHANNELLED
		+ DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
		+ DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE
end

function monkey_king_primal_spring_custom:GetCastRange(location, target)
	if IsServer() then
		return 99999
	end
	return self:GetRange()
end

function monkey_king_primal_spring_custom:GetRange()
	local bonus = 0
	if self.caster:HasModifier("modifier_monkey_king_tree_dance_custom") then
		bonus = self.tree_range or 0
	end
	return (self.max_distance or 0) + bonus
end

function monkey_king_primal_spring_custom:GetCd()
	return (self.AbilityChargeRestoreTime or 0)
		+ (self.talents.w2_cd or 0)
		+ (self.talents.has_r7 == 1 and self.talents.r7_cd_spring or 0)
end

function monkey_king_primal_spring_custom:GetAbilityChargeRestoreTime(iLevel)
	return self:GetCd()
end

function monkey_king_primal_spring_custom:OnSpellStart()
	self.point = self.caster:CastPosition(self:GetCursorPosition())
	local max_distance = self:GetRange() + self.caster:GetCastRangeBonus()
	local radius = self.impact_radius
	local origin = self.caster:GetAbsOrigin()

	local direction = (self.point - origin)

	direction.z = 0
	if direction:Length2D() > max_distance then
		self.point = self.caster:GetOrigin() + direction:Normalized() * max_distance
		self.point.z = GetGroundHeight(self.point, self.caster)
	end

	if self.parent:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier") then
		self:OnChannelFinish()
		return
	end

	AddFOWViewer(self.caster:GetTeamNumber(), self.point, radius, 2, false)

	self.caster:RemoveGesture(ACT_DOTA_MK_SPRING_END)
	self.caster:StartGesture(ACT_DOTA_MK_SPRING_CAST)

	if not self.caster:HasModifier("modifier_monkey_king_tree_dance_custom") then
		self.caster:SetOrigin(origin + Vector(0, 0, 50))
	end

	local particle_cast = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_monkey_king/monkey_king_spring_channel.vpcf",
		self
	)
	local particle_cast2 = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_monkey_king/monkey_king_spring_cast.vpcf",
		self
	)

	self.effect_cast1 = ParticleManager:CreateParticle(particle_cast, PATTACH_ABSORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControlEnt(
		self.effect_cast1,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)

	self.effect_cast2 = ParticleManager:CreateParticleForTeam(
		particle_cast2,
		PATTACH_WORLDORIGIN,
		self.caster,
		self.caster:GetTeamNumber()
	)
	ParticleManager:SetParticleControl(self.effect_cast2, 0, self.point)
	ParticleManager:SetParticleControl(self.effect_cast2, 4, self.point)

	EmitSoundOnLocationWithCaster(self.point, "Hero_MonkeyKing.Spring.Channel", self.caster)

	if IsValid(self.caster.spring_ability_stop) then
		self.caster:SwapAbilities(
			"monkey_king_primal_spring_custom",
			"monkey_king_primal_spring_early_custom",
			false,
			true
		)
	end
end

function monkey_king_primal_spring_custom:OnChannelFinish(bInterrupted)
	self.caster:FadeGesture(ACT_DOTA_MK_SPRING_CAST)
	self.caster:FadeGesture(ACT_DOTA_MK_SPRING_END)
	self.parent:RemoveModifierByName("modifier_monkey_king_innate_custom")

	local origin = self.caster:GetAbsOrigin()
	local channel_pct =
		math.min(1, (GameRules:GetGameTime() - self:GetChannelStartTime()) / self:GetChannelTime() + 0.01)
	if self.caster.spring_charge then
		channel_pct = self.caster.spring_charge
	end

	self.parent:RemoveModifierByName("modifier_monkey_king_tree_dance_custom")

	local direction = (self.point - origin)
	local distance = direction:Length2D()

	self.caster:SetOrigin(origin + Vector(0, 0, -50))

	local speed = self.speed * (1 + (self.talents.has_h5 == 1 and self.talents.h5_speed or 0))
	local ground = GetGroundPosition(origin, nil)
	local perch_height = -1 * (origin.z - ground.z)

	local height = 160
	if distance < 80 then
		height = 0
	end

	self.caster:FacePoint(self.point)

	if IsValid(self.caster.command_ability) and IsValid(self.caster.command_ability.legendary_soldier) then
		local mod = self.caster.command_ability.legendary_soldier:FindModifierByName(
			"modifier_monkey_king_wukongs_command_custom_soldier_active"
		)
		if mod then
			mod:SpellEvent({ unit = self.caster, ability = self, spring_charge = channel_pct, point = self.point })
		end
	end

	local arc = self.caster:AddNewModifier(self.caster, self, "modifier_generic_arc", {
		target_x = self.point.x,
		target_y = self.point.y,
		distance = distance,
		speed = speed,
		height = height,
		fix_end = false,
		isStun = true,
		activity = ACT_DOTA_MK_SPRING_SOAR,
		end_offset = perch_height,
		end_anim = ACT_DOTA_MK_SPRING_END,
	})

	if IsValid(self.caster.spring_ability_stop) then
		self.caster:SwapAbilities(
			"monkey_king_primal_spring_custom",
			"monkey_king_primal_spring_early_custom",
			true,
			false
		)
	end

	if self.effect_cast1 then
		ParticleManager:DestroyParticle(self.effect_cast1, false)
		ParticleManager:ReleaseParticleIndex(self.effect_cast1)
		self.effect_cast1 = nil
	end

	if self.effect_cast2 then
		ParticleManager:DestroyParticle(self.effect_cast2, false)
		ParticleManager:ReleaseParticleIndex(self.effect_cast2)
		self.effect_cast2 = nil
	end

	if not arc then
		return
	end

	self.caster:GenericParticle("particles/units/heroes/hero_monkey_king/monkey_king_jump_trail.vpcf", arc)
	self.caster:EmitSound("Hero_MonkeyKing.TreeJump.Cast")

	arc:SetEndCallback(function()
		local dir = self.caster:GetForwardVector()
		dir.z = 0

		if (self.caster:GetAbsOrigin() - self.point):Length2D() > 200 then
			FindClearSpaceForUnit(self.caster, self.caster:GetAbsOrigin(), false)
			return
		end

		FindClearSpaceForUnit(self.caster, self.point, false)
		self.caster:SetForwardVector(dir)

		if self.talents.has_h2 == 1 then
			self.caster:AddNewModifier(
				self.caster,
				self,
				"modifier_monkey_king_primal_spring_custom_bonus",
				{ duration = self.talents.h2_duration }
			)
		end

		self:DealDamage(self.point, channel_pct)
	end)
end

function monkey_king_primal_spring_custom:DealDamage(point, channel_pct, new_radius)
	local radius = new_radius and new_radius or self.impact_radius
	local damage = self.impact_damage
	local slow = self.impact_movement_slow * channel_pct
	local duration = self.impact_slow_duration
	local silence = self.talents.h5_silence
	local damage_ability = nil
	local damage_k = 1
	local legendary_k = 1
	local enemies = self.caster:FindTargets(radius, point)

	local mod = self.caster:FindOwner():FindModifierByName("modifier_monkey_king_primal_spring_custom_legendary")
	if mod then
		legendary_k = mod.damage * mod:GetStackCount() + 1
	end

	if not new_radius then
		if self.talents.has_w3 == 1 then
			CreateModifierThinker(
				self.caster,
				self,
				"modifier_monkey_king_primal_spring_custom_delay",
				{ duration = self.talents.w3_delay, damage_k = channel_pct },
				point,
				self.caster:GetTeamNumber(),
				false
			)
		end

		if self.talents.has_w4 == 1 and self.ability.tracker and #enemies > 0 then
			self.ability.tracker:CheckShield(true)
		end
	else
		damage_k = self.talents.w3_damage
		damage_ability = "modifier_monkey_king_tree_3"
	end

	local damageTable = { attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }
	local scepter_target = nil

	for _, enemy in pairs(enemies) do
		local target_damage = damage
		if self.talents.has_w1 == 1 then
			target_damage = target_damage
				+ (
					enemy:IsCreep() and self.talents.w1_creeps
					or (self.talents.w1_base + self.talents.w1_damage * enemy:GetMaxHealth())
				)
		end

		damageTable.damage = target_damage * channel_pct * damage_k * legendary_k
		damageTable.victim = enemy
		DoDamage(damageTable, damage_ability)

		if not new_radius then
			if self.caster:GetQuest() == "Monkey.Quest_6" and channel_pct > 0.98 and enemy:IsRealHero() then
				self.caster:UpdateQuest(1)
			end

			if self.talents.has_h5 == 1 and enemy:CheckCd("monkey_h5", self.talents.h5_talent_cd) then
				enemy:AddNewModifier(
					self.caster,
					self,
					"modifier_generic_silence",
					{ sound = "SF.Raze_silence", duration = (1 - enemy:GetStatusResistance()) * silence }
				)
			end

			if self.talents.has_w2 == 1 then
				enemy:AddNewModifier(
					self.caster,
					self,
					"modifier_monkey_king_primal_spring_custom_heal_reduce",
					{ duration = self.talents.w2_duration }
				)
			end

			if not scepter_target or (scepter_target:IsCreep() and enemy:IsHero()) then
				scepter_target = enemy
			end

			enemy:RemoveModifierByName("modifier_monkey_king_primal_spring_custom")
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_monkey_king_primal_spring_custom",
				{ duration = duration, slow = slow }
			)
		else
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_stunned",
				{ duration = self.talents.w3_stun * (1 - enemy:GetStatusResistance()) }
			)
		end
	end

	local scepter_owner = self.caster:FindOwner()
	if scepter_owner:HasScepter() and scepter_target and IsValid(scepter_owner.command_ability) then
		scepter_owner.command_ability:SpawnSoldier(scepter_target:GetAbsOrigin() + RandomVector(150))
	end

	if IsValid(self.caster.mastery_buff) and self.caster.mastery_buff.is_magic then
		self.caster.mastery_buff:ProcDamage(enemies)
	end

	local particle_cast = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_monkey_king/monkey_king_spring.vpcf",
		self
	)
	local sound_cast = wearables_system:GetSoundReplacement(self.caster, "Hero_MonkeyKing.Spring.Impact", self)

	local effect_cast = ParticleManager:CreateParticle(particle_cast, PATTACH_WORLDORIGIN, self.caster)
	ParticleManager:SetParticleControl(effect_cast, 0, point)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(radius, radius, radius))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	EmitSoundOnLocationWithCaster(point, sound_cast, self.caster)
end

modifier_monkey_king_primal_spring_custom = class(mod_visible)
function modifier_monkey_king_primal_spring_custom:IsPurgable()
	return true
end
function modifier_monkey_king_primal_spring_custom:GetStatusEffectName()
	return "particles/status_fx/status_effect_monkey_king_spring_slow.vpcf"
end
function modifier_monkey_king_primal_spring_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_monkey_king_primal_spring_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_monkey_king/monkey_king_spring_slow.vpcf", self)
	self:SetStackCount(table.slow)
end

function modifier_monkey_king_primal_spring_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_monkey_king_primal_spring_custom:GetModifierMoveSpeedBonus_Percentage()
	return -self:GetStackCount()
end

modifier_monkey_king_primal_spring_custom_tracker = class(mod_hidden)
function modifier_monkey_king_primal_spring_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.is_clone = self.parent:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")

	if not self.is_clone then
		self.parent.spring_ability = self.ability
		self.parent.spring_ability_stop = self.parent:FindAbilityByName("monkey_king_primal_spring_early_custom")
	end

	self.ability.impact_damage = self.ability:GetSpecialValueFor("impact_damage")
	self.ability.impact_movement_slow = self.ability:GetSpecialValueFor("impact_movement_slow")
	self.ability.impact_slow_duration = self.ability:GetSpecialValueFor("impact_slow_duration")
	self.ability.impact_radius = self.ability:GetSpecialValueFor("impact_radius")
	self.ability.max_distance = self.ability:GetSpecialValueFor("max_distance")
	self.ability.speed = self.ability:GetSpecialValueFor("speed")
	self.ability.AbilityChannelTime = self.ability:GetSpecialValueFor("AbilityChannelTime")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.tree_cast = self.ability:GetSpecialValueFor("tree_cast") / 100
	self.ability.tree_range = self.ability:GetSpecialValueFor("tree_range")
	self.ability.AbilityChargeRestoreTime = self.ability:GetSpecialValueFor("AbilityChargeRestoreTime")
end

function modifier_monkey_king_primal_spring_custom_tracker:OnRefresh()
	self.ability.impact_damage = self.ability:GetSpecialValueFor("impact_damage")
	self.ability.impact_movement_slow = self.ability:GetSpecialValueFor("impact_movement_slow")
end

function modifier_monkey_king_primal_spring_custom_tracker:CheckShield(force_refresh)
	if not IsServer() then
		return
	end
	if self.is_clone then
		return
	end

	if force_refresh then
		if IsValid(self.shield_mod) then
			self.shield_mod.forced = true
			self.shield_mod:Destroy()
			self.shield_mod = nil
		end
		local mod = self.parent:FindModifierByName("modifier_monkey_king_primal_spring_custom_shield_cd")
		if mod then
			mod.forced = true
			mod:Destroy()
		end
	end

	if
		IsValid(self.shield_mod)
		or self.parent:HasModifier("modifier_monkey_king_primal_spring_custom_shield_cd")
		or not self.parent:IsAlive()
	then
		return
	end

	self.shield_mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield", {
		max_shield = self.ability.talents.w4_base + self.ability.talents.w4_shield * self.parent:GetMaxHealth(),
		start_full = 1,
		shield_talent = "modifier_monkey_king_tree_4",
		refresh_timer = self.ability.talents.w4_talent_cd,
	})

	if self.shield_mod then
		self.parent:EmitSound("MK.Tree_shield")
		self.particle =
			ParticleManager:CreateParticle("particles/monkey_king/tree_shield.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
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

		self.shield_mod:SetEndFunction(function()
			if not self.shield_mod.forced then
				self.parent:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_monkey_king_primal_spring_custom_shield_cd",
					{ duration = self.ability.talents.w4_talent_cd }
				)
			end
		end)
	end
end

function modifier_monkey_king_primal_spring_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.is_clone then
		return
	end

	if self.ability.talents.has_w4 == 1 then
		self:CheckShield()
	end

	if self.ability.talents.has_w7 == 0 then
		return
	end

	if not self.count then
		self.count = self.ability.talents.w7_cd - 10
	end

	self.count = self.count + 1

	local time = math.max(0, (self.ability.talents.w7_cd - self.count))
	local min = tostring(math.floor(time / 60))
	local sec = time - 60 * math.floor(time / 60)
	if sec < 10 then
		sec = "0" .. tostring(sec)
	else
		sec = tostring(sec)
	end

	self.parent:UpdateUIlong({ override_stack = min .. ":" .. sec, no_min = 1, style = "MonkeyBanana" })

	if self.count < self.ability.talents.w7_cd then
		return
	end

	self.count = 0

	local point
	repeat
		point = Vector(RandomInt(-6600, 6600), RandomInt(-6600, 6600), 215)
	until self:IsValidPoint(point)

	local banana = CreateUnitByName("npc_monkey_king_banana", point, true, nil, nil, self.parent:GetTeamNumber())

	banana:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_monkey_king_primal_spring_custom_banana",
		{ duration = self.ability.talents.w7_duration - self.ability.talents.w7_cd, original = 1 }
	)
	GameRules:ExecuteTeamPing(self.parent:GetTeamNumber(), point.x, point.y, self.parent, 0)

	FindClearSpaceForUnit(banana, banana:GetAbsOrigin(), false)
end

function modifier_monkey_king_primal_spring_custom_tracker:IsValidPoint(point)
	if not IsServer() then
		return
	end

	for _, tower in pairs(towers) do
		if
			tower:GetTeamNumber() ~= self.parent:GetTeamNumber()
			and (tower:GetAbsOrigin() - point):Length2D() <= self.ability.talents.w7_tower_radius
		then
			return false
		end
	end

	return true
end

function modifier_monkey_king_primal_spring_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_EVASION_CONSTANT,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL,
		MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL_VALUE,
	}
end

function modifier_monkey_king_primal_spring_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.w1_spell
end

function modifier_monkey_king_primal_spring_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	if not IsValid(self.parent) then
		return
	end
	if self.is_clone then
		return
	end
	return self.ability.talents.h2_move
		* (
			self.parent:HasModifier("modifier_monkey_king_primal_spring_custom_bonus")
				and self.ability.talents.h2_bonus
			or 1
		)
end

function modifier_monkey_king_primal_spring_custom_tracker:GetModifierEvasion_Constant()
	if not IsValid(self.parent) then
		return
	end
	if self.is_clone then
		return
	end
	return self.ability.talents.h2_evasion
		* (
			self.parent:HasModifier("modifier_monkey_king_primal_spring_custom_bonus")
				and self.ability.talents.h2_bonus
			or 1
		)
end

function modifier_monkey_king_primal_spring_custom_tracker:GetModifierPercentageCooldown()
	return self.ability.talents.w3_cdr
end

function modifier_monkey_king_primal_spring_custom_tracker:GetModifierOverrideAbilitySpecial(data)
	if self.is_clone then
		return
	end
	if not self.parent:HasModifier("modifier_monkey_king_primal_spring_custom_legendary") then
		return
	end
	if data.ability ~= self.ability then
		return
	end
	if data.ability_special_value ~= "AbilityCharges" then
		return
	end
	if
		self.parent:GetUpgradeStack("modifier_monkey_king_primal_spring_custom_legendary")
		< self.ability.talents.w7_bonus_1
	then
		return
	end

	return 1
end

function modifier_monkey_king_primal_spring_custom_tracker:GetModifierOverrideAbilitySpecialValue(data)
	if self.is_clone then
		return
	end
	if not self.parent:HasModifier("modifier_monkey_king_primal_spring_custom_legendary") then
		return
	end
	if data.ability ~= self.ability then
		return
	end
	if data.ability_special_value ~= "AbilityCharges" then
		return
	end
	if
		self.parent:GetUpgradeStack("modifier_monkey_king_primal_spring_custom_legendary")
		< self.ability.talents.w7_bonus_1
	then
		return
	end

	return self.ability.talents.w7_charge
end

modifier_monkey_king_primal_spring_custom_banana = class(mod_hidden)
function modifier_monkey_king_primal_spring_custom_banana:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.original = table.original
	self.expire_timer = self.ability.talents.w7_cd
	self.radius = self.ability.talents.w7_radius
	self.vision = self.ability.talents.w7_vision

	if self.original and self.original == 1 then
		local part = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_disguise.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(part, 0, self.parent:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(part)

		self.parent:EmitSound("Hero_MonkeyKing.Transform.On")
	end

	self.particle_ally_fx = ParticleManager:CreateParticleForTeam(
		"particles/alchemist/alch_stun_legendary.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent,
		self.parent:GetTeamNumber()
	)
	ParticleManager:SetParticleControl(self.particle_ally_fx, 0, self.parent:GetAbsOrigin())
	self:AddParticle(self.particle_ally_fx, false, false, -1, false, false)

	self:StartIntervalThink(0.2)
end

function modifier_monkey_king_primal_spring_custom_banana:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
	}
end

function modifier_monkey_king_primal_spring_custom_banana:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), self.vision, 0.2, false)

	if (self.parent:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D() > self.radius then
		return
	end
	if not self.caster:IsAlive() then
		return
	end

	self.caster:EmitSound("MK.Tree_legendary_buff")
	self.caster:GenericParticle("particles/monkey_king/mk_buff_start.vpcf")

	local count = self.ability.bananas
	self.caster:GiveGold(
		self.ability.talents.w7_gold + self.ability.talents.w7_gold_inc * count,
		true,
		nil,
		"modifier_monkey_king_tree_7"
	)
	self.caster:AddExperience(
		self.ability.talents.w7_exp + self.ability.talents.w7_exp_inc * count,
		DOTA_ModifyXP_Unspecified,
		false,
		false
	)
	self.caster:AddPoints(
		"blue",
		self.ability.talents.w7_blue + self.ability.talents.w7_blue_inc * count,
		"modifier_monkey_king_tree_7"
	)
	self.ability.bananas = count + 1

	self.caster:AddNewModifier(self.caster, self.ability, "modifier_monkey_king_primal_spring_custom_legendary", {})

	self.caster:EmitSound("MK.Tree_bounty")
	self:Destroy()
end

function modifier_monkey_king_primal_spring_custom_banana:OnDestroy()
	if not IsServer() then
		return
	end

	local abs = self.parent:GetAbsOrigin()

	UTIL_Remove(self.parent)

	if self.original and self.original == 1 and self:GetRemainingTime() <= 0.1 then
		local banana =
			CreateUnitByName("npc_monkey_king_banana_expire", abs, true, nil, nil, self.caster:GetTeamNumber())
		banana:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_monkey_king_primal_spring_custom_banana",
			{ duration = self.expire_timer, original = 0 }
		)
	else
		local part = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_disguise.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(part, 0, abs)
		ParticleManager:ReleaseParticleIndex(part)
		EmitSoundOnLocationWithCaster(abs, "Hero_MonkeyKing.Transform.On", self.caster)
	end
end

modifier_monkey_king_primal_spring_custom_legendary = class(mod_visible)
function modifier_monkey_king_primal_spring_custom_legendary:RemoveOnDeath()
	return false
end
function modifier_monkey_king_primal_spring_custom_legendary:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.talents.w7_damage
	self.bonus = self.ability.talents.w7_bonus_1
	self.bonus_2 = self.ability.talents.w7_bonus_2
	self.max = self.ability.talents.w7_max

	if not IsServer() then
		return
	end
	self:OnRefresh(table)
end

function modifier_monkey_king_primal_spring_custom_legendary:OnRefresh(table)
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

	local effect = false

	if self:GetStackCount() == self.bonus then
		self.ability:RefreshCharges()
		effect = true
	end

	if self:GetStackCount() == self.bonus_2 then
		effect = true
	end

	if effect then
		self.parent:EmitSound("BS.Thirst_legendary_active")
		self.parent:GenericParticle("particles/monkey_king/mk_buff_start.vpcf")
	end
end

function modifier_monkey_king_primal_spring_custom_legendary:GetRefreshChance()
	if self:GetStackCount() < self.bonus_2 then
		return 0
	end
	if self.ability:GetCurrentAbilityCharges() >= self.ability.talents.w7_charge then
		return 0
	end
	if self.parent:HasCd("monkey_w7", self.ability.talents.w7_refresh_cd) then
		return 0
	end
	return self.ability.talents.w7_chance
end

function modifier_monkey_king_primal_spring_custom_legendary:ChargeRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() < self.bonus_2 then
		return
	end
	if self.ability:GetCurrentAbilityCharges() >= self.ability.talents.w7_charge then
		return
	end
	if not self.parent:CheckCd("monkey_w7", self.ability.talents.w7_refresh_cd) then
		return
	end

	self.ability:AddCharge(1, "particles/monkey_king/strike_refresh.vpcf", "MK.Strike_refresh")
end

function modifier_monkey_king_primal_spring_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_monkey_king_primal_spring_custom_legendary:OnTooltip()
	return self:GetStackCount() * self.damage * 100
end

modifier_monkey_king_primal_spring_custom_bonus = class(mod_hidden)
function modifier_monkey_king_primal_spring_custom_bonus:GetEffectName()
	return "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf"
end
function modifier_monkey_king_primal_spring_custom_bonus:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end

modifier_monkey_king_primal_spring_custom_heal_reduce = class(mod_hidden)
function modifier_monkey_king_primal_spring_custom_heal_reduce:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.heal_reduce = self.ability.talents.w2_heal_reduce

	if not IsServer() then
		return
	end
	self.particle =
		ParticleManager:CreateParticle("particles/monkey_king/mk_heal_red_1.vpcf", PATTACH_POINT_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)
end

function modifier_monkey_king_primal_spring_custom_heal_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_monkey_king_primal_spring_custom_heal_reduce:GetModifierHealChange()
	return self.heal_reduce
end

function modifier_monkey_king_primal_spring_custom_heal_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce
end

modifier_monkey_king_primal_spring_custom_delay = class(mod_hidden)
function modifier_monkey_king_primal_spring_custom_delay:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.radius = self.ability.impact_radius + self.ability.talents.w3_radius
	self.time = self:GetRemainingTime()
	self.damage_k = table.damage_k

	self.particle = ParticleManager:CreateParticle(
		"particles/monkey_king/primal_double.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.radius, 0, -self.radius / self.time))
	ParticleManager:SetParticleControl(self.particle, 2, Vector(self.time, 0, 0))
	self:AddParticle(self.particle, false, false, -1, false, false)
end

function modifier_monkey_king_primal_spring_custom_delay:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:DealDamage(self.parent:GetAbsOrigin(), self.damage_k, self.radius)
end

modifier_monkey_king_primal_spring_custom_shield_cd = class(mod_cd)
function modifier_monkey_king_primal_spring_custom_shield_cd:GetTexture()
	return "buffs/monkey_king/tree_4"
end
function modifier_monkey_king_primal_spring_custom_shield_cd:OnCreated()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true
end

function modifier_monkey_king_primal_spring_custom_shield_cd:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.ability.tracker then
		return
	end
	if self.forced then
		return
	end
	self.ability.tracker:CheckShield()
end

monkey_king_primal_spring_early_custom = class({})
function monkey_king_primal_spring_early_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "monkey_king_primal_spring", self)
end

function monkey_king_primal_spring_early_custom:OnSpellStart()
	if not IsValid(self.caster.spring_ability) then
		return
	end
	self.caster.spring_ability:EndChannel(true)
end