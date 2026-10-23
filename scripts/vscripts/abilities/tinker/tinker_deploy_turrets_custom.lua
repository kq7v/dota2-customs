--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_tinker_deploy_turrets_custom_tracker",
	"abilities/tinker/tinker_deploy_turrets_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_deploy_turrets_custom",
	"abilities/tinker/tinker_deploy_turrets_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_deploy_turrets_custom_unit",
	"abilities/tinker/tinker_deploy_turrets_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_deploy_turrets_custom_legendary_stack",
	"abilities/tinker/tinker_deploy_turrets_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_matrix_7"
)
LinkLuaModifier(
	"modifier_tinker_deploy_turrets_custom_legendary",
	"abilities/tinker/tinker_deploy_turrets_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_deploy_turrets_custom_legendary_speed",
	"abilities/tinker/tinker_deploy_turrets_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_matrix_7"
)
LinkLuaModifier(
	"modifier_tinker_deploy_turrets_custom_legendary_aura",
	"abilities/tinker/tinker_deploy_turrets_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_deploy_turrets_custom_knock_cd",
	"abilities/tinker/tinker_deploy_turrets_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_deploy_turrets_custom_root",
	"abilities/tinker/tinker_deploy_turrets_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_matrix_4"
)

tinker_deploy_turrets_custom = class({})
tinker_deploy_turrets_custom.talents = {}

function tinker_deploy_turrets_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_defense_matrix_pulse.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_defense_matrix_cast.vpcf", context)
	PrecacheResource("particle", "particles/zeus/bolt_disarm.vpcf", context)
	PrecacheResource("particle", "particles/tinker/matrix_legendary_laser.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_blink_starta0.vpcf", context)
	PrecacheResource("particle", "particles/tinker/matrix_legendary_red.vpcf", context)
	PrecacheResource("particle", "particles/tinker/matrix_legendary.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/razor/razor_arcana/razor_arcana_static_link_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_turret_drop.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_turret_spawn.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_turret_drop_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_linear_missile.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/turret_death_explosion.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/turret_missile_explosion.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/chain_lightning.vpcf", context)
	PrecacheResource("particle", "particles/tinker/laser_stun.vpcf", context)
	PrecacheResource("particle", "particles/tinker/stun_stack.vpcf", context)

	PrecacheResource("model", "models/heroes/tinker/tinker_turret.vmdl", context)
end

function tinker_deploy_turrets_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage = 0,
			e1_attack = 0,
			e1_base = 0,
			e1_chance = caster:GetTalentValue("modifier_tinker_matrix_1", "chance", true),
			e1_chance_turret = caster:GetTalentValue("modifier_tinker_matrix_1", "chance_turret", true),
			e1_damage_type = caster:GetTalentValue("modifier_tinker_matrix_1", "damage_type", true),

			e2_move = 0,

			has_e4 = 0,
			e4_range = caster:GetTalentValue("modifier_tinker_matrix_4", "range", true),
			e4_health = caster:GetTalentValue("modifier_tinker_matrix_4", "health", true) / 100,
			e4_root = caster:GetTalentValue("modifier_tinker_matrix_4", "root", true),
			e4_talent_cd = caster:GetTalentValue("modifier_tinker_matrix_4", "talent_cd", true),

			has_e7 = 0,
			e7_heal = caster:GetTalentValue("modifier_tinker_matrix_7", "heal", true) / 100,
			e7_radius = caster:GetTalentValue("modifier_tinker_matrix_7", "radius", true),
			e7_duration = caster:GetTalentValue("modifier_tinker_matrix_7", "duration", true),
			e7_effect_duration = caster:GetTalentValue("modifier_tinker_matrix_7", "effect_duration", true),
			e7_attacks = caster:GetTalentValue("modifier_tinker_matrix_7", "attacks", true),
			e7_attacks_turret = caster:GetTalentValue("modifier_tinker_matrix_7", "attacks_turret", true),
			e7_speed = caster:GetTalentValue("modifier_tinker_matrix_7", "speed", true),
			e7_stack_duration = caster:GetTalentValue("modifier_tinker_matrix_7", "stack_duration", true),
			e7_talent_cd = caster:GetTalentValue("modifier_tinker_matrix_7", "talent_cd", true),
			e7_turrets_interval = caster:GetTalentValue("modifier_tinker_matrix_7", "turrets_interval", true),

			w2_speed = 0,
		}
	end

	if caster:HasTalent("modifier_tinker_matrix_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_tinker_matrix_1", "damage") / 100
		self.talents.e1_attack = caster:GetTalentValue("modifier_tinker_matrix_1", "attack") / 100
		self.talents.e1_base = caster:GetTalentValue("modifier_tinker_matrix_1", "base")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_tinker_matrix_2") then
		self.talents.e2_move = caster:GetTalentValue("modifier_tinker_matrix_2", "move")
	end

	if caster:HasTalent("modifier_tinker_matrix_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_tinker_matrix_7") then
		self.talents.has_e7 = 1
		caster:AddProc(self.tracker, { name = "hit", land = true })
		caster:AddLifesteal(self.tracker, {
			name = "modifier_tinker_matrix_7",
			value = function()
				return caster:HasModifier("modifier_tinker_deploy_turrets_custom_legendary_speed")
						and self.talents.e7_heal
					or 0
			end,
		})
	end

	if caster:HasTalent("modifier_tinker_march_2") then
		self.talents.w2_speed = caster:GetTalentValue("modifier_tinker_march_2", "speed") / 100
	end
end

function tinker_deploy_turrets_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_tinker_deploy_turrets_custom_tracker"
end

function tinker_deploy_turrets_custom:GetAOERadius()
	return (self.drop_aoe_radius or 0)
end

function tinker_deploy_turrets_custom:OnSpellStart()
	local point = self:GetCursorPosition()
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_tinker_deploy_turrets_custom",
		{},
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

function tinker_deploy_turrets_custom:OnProjectileHit_ExtraData(target, vLocation, table)
	if not IsServer() then
		return
	end
	if not target then
		return
	end

	local nParticleIndex = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_tinker/turret_missile_explosion.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		nParticleIndex,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(nParticleIndex)
	target:EmitSound("Hero_TinkerTurret.Target")

	local damage = (self.missile_damage + self.missile_damage_attack * self.caster:GetAverageTrueAttackDamage(nil))
		* (1 + self.talents.e1_attack)
	local damageTable = { attacker = self.caster, ability = self, damage_type = DAMAGE_TYPE_PHYSICAL }

	for _, aoe_target in pairs(self.caster:FindTargets(self.radius_explosion, target:GetAbsOrigin())) do
		local target_damage = damage
		if aoe_target ~= target then
			target_damage = target_damage * self.splash_pct
		end
		damageTable.victim = aoe_target
		damageTable.damage = target_damage
		DoDamage(damageTable)
	end

	local attacker = EntIndexToHScript(table.attacker)
	if IsValid(attacker) then
		self:ProcDamage(target, attacker)
	end

	if
		self.talents.has_e4 == 1
		and not target:IsDebuffImmune()
		and target:CheckCd("tinker_e4", self.talents.e4_talent_cd)
	then
		target:EmitSound("Tinker.March_root")
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_tinker_deploy_turrets_custom_root",
			{ duration = (1 - target:GetStatusResistance()) * self.talents.e4_root }
		)
	end

	self:LegendaryStack(target, 1)

	if IsValid(self.caster.march_ability) then
		self.caster.march_ability:ProcEffects(target)
	end

	return true
end

function tinker_deploy_turrets_custom:ProcDamage(target, attacker, is_proc)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e1 == 0 then
		return
	end
	if not is_proc and not RollPseudoRandomPercentage(self.talents.e1_chance_turret, 15031, self.parent) then
		return
	end

	local nParticleIndex =
		ParticleManager:CreateParticle("particles/items_fx/chain_lightning.vpcf", PATTACH_POINT_FOLLOW, attacker)
	ParticleManager:SetParticleControlEnt(
		nParticleIndex,
		0,
		attacker,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		attacker:GetAbsOrigin(),
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

	target:EmitSound("Item.Maelstrom.Chain_Lightning")
	DoDamage(
		{
			victim = target,
			attacker = self.parent,
			ability = self,
			damage_type = self.talents.e1_damage_type,
			damage = self.talents.e1_base + self.parent:GetIntellect(false) * self.talents.e1_damage,
		},
		"modifier_tinker_matrix_1"
	)
end

function tinker_deploy_turrets_custom:LegendaryStack(target, is_turret)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e7 == 0 then
		return
	end
	if not target:IsRealHero() then
		return
	end
	if target:HasCd("tinker_e7", self.talents.e7_talent_cd) then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_tinker_deploy_turrets_custom_legendary_stack",
		{ duration = self.talents.e7_stack_duration, is_turret = is_turret }
	)
end

modifier_tinker_deploy_turrets_custom = class(mod_hidden)
function modifier_tinker_deploy_turrets_custom:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.point = self.parent:GetAbsOrigin()
	self.radius = self.ability.drop_aoe_radius
	self.place_radius = self.ability.turret_placement_radius
	self.range = self.ability.missile_target_range
		+ (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_range or 0)
	self.missile_range = self.ability.missile_range
		+ (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_range or 0)

	self.parent:EmitSound("Hero_TinkerTurret.Cast")
	self.parent:EmitSound("Hero_Tinker.Turret.Deploy")

	self.state = 0
	self.turrets = {}
	self.interval = 0.05
	self.target = nil
	self.base_interval = self.ability.missile_spawn_interval
	self.proj_speed = self.ability.missile_speed * (1 + self.ability.talents.w2_speed)

	self.effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_tinker/tinker_turret_drop.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(self.effect, 0, self.point)
	ParticleManager:SetParticleControl(self.effect, 1, Vector(self.radius, 1, 1))
	ParticleManager:SetParticleControl(self.effect, 3, Vector(self.place_radius, 1, 1))
	self:AddParticle(self.effect, false, false, -1, false, false)

	self.damageTable = {
		attacker = self.caster,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_PHYSICAL,
		damage = self.ability.drop_damage,
	}

	self.info = {
		EffectName = "particles/units/heroes/hero_tinker/tinker_linear_missile.vpcf",
		Ability = self.ability,
		fStartRadius = self.ability.missile_width,
		fEndRadius = self.ability.missile_width,
		fDistance = self.missile_range,
		iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY,
		iUnitTargetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		iUnitTargetFlags = DOTA_UNIT_TARGET_FLAG_NONE,
		bProvidesVision = true,
		bDeleteOnHit = true,
		iVisionTeamNumber = self.caster:GetTeamNumber(),
		iVisionRadius = self.ability.missile_width * 2,
	}

	self:StartIntervalThink(self.ability.drop_delay)
end

function modifier_tinker_deploy_turrets_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.state == 0 then
		self.parent:EmitSound("Hero_TinkerTurret.Impact")
		ParticleManager:DestroyParticle(self.effect, true)
		ParticleManager:ReleaseParticleIndex(self.effect)

		local hit_effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_tinker/tinker_turret_drop_impact.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(hit_effect, 0, self.point)
		ParticleManager:ReleaseParticleIndex(hit_effect)

		local targets = self.caster:FindTargets(self.radius, self.point)
		if (self.caster:GetAbsOrigin() - self.point):Length2D() <= self.radius and not self.caster:IsInvulnerable() then
			table.insert(targets, self.caster)
		end
		for _, target in pairs(targets) do
			local vec = (target:GetAbsOrigin() - self.point):Normalized()
			if target:GetAbsOrigin() == self.point then
				vec = target:GetForwardVector()
			end
			FindClearSpaceForUnit(target, target:GetAbsOrigin(), false)

			local dist = self.ability.drop_knockback_distance
			local duration = self.ability.drop_knockback_duration
			if self.caster == target then
				dist = self.ability.drop_knockback_distance_tinker
				duration = self.ability.drop_knockback_duration_tinker
			else
				self.damageTable.victim = target
				DoDamage(self.damageTable)
			end
			target:AddNewModifier(self.caster, self.ability, "modifier_generic_knockback", {
				direction_x = vec.x,
				direction_y = vec.y,
				distance = dist,
				height = 0,
				duration = duration,
				IsStun = false,
				IsFlail = true,
				Purgable = 1,
			})
		end

		self.max = self.ability.turrets_per_drop
		local line_position = self.point + self.place_radius * Vector(0, 1, 0)

		local duration = self.ability.turret_duration + 0.3

		for i = 1, self.max do
			line_position = RotatePosition(self.point, QAngle(0, 360 / self.max, 0), line_position)

			local effect = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_tinker/tinker_turret_spawn.vpcf",
				PATTACH_WORLDORIGIN,
				nil
			)
			ParticleManager:SetParticleControl(effect, 0, line_position)
			ParticleManager:ReleaseParticleIndex(effect)

			local turret = CreateUnitByName(
				"npc_dota_tinker_turret_custom",
				line_position,
				true,
				nil,
				nil,
				self.caster:GetTeamNumber()
			)
			turret:SetControllableByPlayer(self.caster:GetId(), false)
			turret:SetAbsOrigin(line_position)
			turret:SetOwner(self.caster)

			turret.owner = self.caster
			turret:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_tinker_deploy_turrets_custom_unit",
				{ duration = duration }
			)
			turret:AddNewModifier(self.caster, self.ability, "modifier_kill", { duration = duration })
			self.turrets[turret] = self.ability.activation_time + i * 0.25
		end
		self.state = 1
	end

	if self.state ~= 1 then
		return
	end

	self.target = self.caster:RandomTarget(self.range, self.point)
	local no_turrets = true
	for turret, _ in pairs(self.turrets) do
		if IsValid(turret) and turret:IsAlive() then
			no_turrets = false
			if IsValid(self.target) then
				local vec = self.target:GetAbsOrigin() - turret:GetAbsOrigin()
				turret:SetForceAttackTarget(self.target)
				local attack_interval = self.base_interval
				if self.caster:HasModifier("modifier_tinker_deploy_turrets_custom_legendary_speed") then
					attack_interval = attack_interval / self.ability.talents.e7_turrets_interval
				end

				if self.turrets[turret] > 0 then
					local interval = self.interval + 0.01
					self.turrets[turret] = self.turrets[turret] - interval
				end

				if self.turrets[turret] <= 0 then
					self.turrets[turret] = attack_interval
					turret:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 1 / attack_interval)

					if IsValid(self.caster.march_ability) then
						self.caster.march_ability:ProcAuto(self.target, turret)
					end

					self.info.Source = turret
					self.info.vVelocity = vec:Normalized() * self.proj_speed
					self.info.vSpawnOrigin = turret:GetAttachmentOrigin(turret:ScriptLookupAttachment("attach_attack1"))
					self.info.ExtraData = { attacker = turret:entindex() }
					turret:EmitSound("Hero_TinkerTurret.Attack")
					ProjectileManager:CreateLinearProjectile(self.info)
				end
			end
		else
			self.turrets[turret] = nil
		end
	end

	if no_turrets then
		self:Destroy()
		return
	end

	self:StartIntervalThink(self.interval)
end

modifier_tinker_deploy_turrets_custom_unit = class(mod_hidden)
function modifier_tinker_deploy_turrets_custom_unit:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.health = self.ability.health * (1 + (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_health or 0))

	self.parent:SetPhysicalArmorBaseValue(self.ability.armor)
	self.parent:SetBaseMagicalResistanceValue(self.ability.magic)
	self.parent:SetBaseMaxHealth(self.health)
	self.parent:SetMaxHealth(self.health)
	self.parent:SetHealth(self.health)

	self.parent:StartGesture(ACT_DOTA_SPAWN)
end

function modifier_tinker_deploy_turrets_custom_unit:OnDestroy()
	if not IsServer() then
		return
	end
	if self:GetRemainingTime() <= 0.1 then
		return
	end

	self.parent:GenericParticle("particles/units/heroes/hero_tinker/turret_death_explosion.vpcf")
end

function modifier_tinker_deploy_turrets_custom_unit:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_DEBUFF_IMMUNE] = true,
		[MODIFIER_STATE_DISARMED] = true,
	}
end

modifier_tinker_deploy_turrets_custom_tracker = class(mod_hidden)
function modifier_tinker_deploy_turrets_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.turret_ability = self.ability

	self.ability.drop_aoe_radius = self.ability:GetSpecialValueFor("drop_aoe_radius")
	self.ability.turret_placement_radius = self.ability:GetSpecialValueFor("turret_placement_radius")
	self.ability.drop_delay = self.ability:GetSpecialValueFor("drop_delay")
	self.ability.drop_knockback_duration = self.ability:GetSpecialValueFor("drop_knockback_duration")
	self.ability.drop_knockback_duration_tinker = self.ability:GetSpecialValueFor("drop_knockback_duration_tinker")
	self.ability.drop_knockback_distance = self.ability:GetSpecialValueFor("drop_knockback_distance")
	self.ability.drop_knockback_distance_tinker = self.ability:GetSpecialValueFor("drop_knockback_distance_tinker")
	self.ability.turrets_per_drop = self.ability:GetSpecialValueFor("turrets_per_drop")
	self.ability.drop_damage = self.ability:GetSpecialValueFor("drop_damage")
	self.ability.missile_damage = self.ability:GetSpecialValueFor("missile_damage")
	self.ability.missile_damage_attack = self.ability:GetSpecialValueFor("missile_damage_attack") / 100
	self.ability.missile_speed = self.ability:GetSpecialValueFor("missile_speed")
	self.ability.missile_target_range = self.ability:GetSpecialValueFor("missile_target_range")
	self.ability.missile_range = self.ability:GetSpecialValueFor("missile_range")
	self.ability.missile_width = self.ability:GetSpecialValueFor("missile_width")
	self.ability.turret_duration = self.ability:GetSpecialValueFor("turret_duration")
	self.ability.missile_spawn_interval = self.ability:GetSpecialValueFor("missile_spawn_interval")
	self.ability.radius_explosion = self.ability:GetSpecialValueFor("radius_explosion")
	self.ability.splash_pct = self.ability:GetSpecialValueFor("splash_pct") / 100
	self.ability.activation_time = self.ability:GetSpecialValueFor("activation_time")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.magic = self.ability:GetSpecialValueFor("magic")
	self.ability.armor = self.ability:GetSpecialValueFor("armor")
	self.ability.health = self.ability:GetSpecialValueFor("health")
end

function modifier_tinker_deploy_turrets_custom_tracker:OnRefresh()
	self.ability.drop_damage = self.ability:GetSpecialValueFor("drop_damage")
	self.ability.missile_damage = self.ability:GetSpecialValueFor("missile_damage")
	self.ability.missile_damage_attack = self.ability:GetSpecialValueFor("missile_damage_attack") / 100
	self.ability.missile_target_range = self.ability:GetSpecialValueFor("missile_target_range")
	self.ability.missile_range = self.ability:GetSpecialValueFor("missile_range")
	self.ability.health = self.ability:GetSpecialValueFor("health")
end

function modifier_tinker_deploy_turrets_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.ability.talents.e1_chance
end

function modifier_tinker_deploy_turrets_custom_tracker:AttackProc(params, name)
	if name == "hit" then
		self.ability:LegendaryStack(params.target)
		return
	end

	self.ability:ProcDamage(params.target, self.parent, true)
end

function modifier_tinker_deploy_turrets_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_tinker_deploy_turrets_custom_tracker:GetModifierAttackRangeBonus()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_range
end

function modifier_tinker_deploy_turrets_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.e2_move
end

modifier_tinker_deploy_turrets_custom_legendary = class(mod_hidden)
function modifier_tinker_deploy_turrets_custom_legendary:IsAura()
	return true
end
function modifier_tinker_deploy_turrets_custom_legendary:GetAuraDuration()
	return 0
end
function modifier_tinker_deploy_turrets_custom_legendary:GetAuraRadius()
	return self.radius * 1.1
end
function modifier_tinker_deploy_turrets_custom_legendary:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_tinker_deploy_turrets_custom_legendary:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_tinker_deploy_turrets_custom_legendary:GetModifierAura()
	return "modifier_tinker_deploy_turrets_custom_legendary_aura"
end
function modifier_tinker_deploy_turrets_custom_legendary:OnCreated(params)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = self.ability.talents.e7_radius
	if not IsServer() then
		return
	end

	self.origin = self.parent:GetAbsOrigin()
	self.target = EntIndexToHScript(params.target)
	self.parent:EmitSound("Tinker.Matrix_legendary_start")
	self.parent:EmitSound("Tinker.Matrix_legendary_loop")

	local line_position = self.origin + Vector(1, 0, 0) * self.radius
	local max = 5
	for i = 1, max do
		local qangle = QAngle(0, 360 / max, 0)
		line_position = RotatePosition(self.origin, qangle, line_position)

		local cast_particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf",
			PATTACH_POINT_FOLLOW,
			self.caster
		)
		ParticleManager:SetParticleControlEnt(
			cast_particle,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_attack1",
			self.caster:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(cast_particle, 1, line_position + Vector(0, 0, 80))
		ParticleManager:SetParticleControlEnt(
			cast_particle,
			2,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_attack1",
			self.caster:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(cast_particle)
	end

	local effect_cast =
		ParticleManager:CreateParticle("particles/tinker/matrix_legendary.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, 1, 1))
	self:AddParticle(effect_cast, false, false, -1, false, false)

	self.interval = 0.1
	self.effect_interval = 0.2
	self.effect_count = 0

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_tinker_deploy_turrets_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.target) or not self.target:IsAlive() then
		self:Destroy()
		return
	end

	if
		not self.target:IsInvulnerable()
		and not self.target:HasModifier("modifier_tinker_deploy_turrets_custom_knock_cd")
	then
		local radius = self.radius * 0.9
		local dir = (self.target:GetAbsOrigin() - self.origin)

		if dir:Length2D() > radius then
			self.target:GenericParticle(
				"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf"
			)
			self.target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_tinker_deploy_turrets_custom_knock_cd",
				{ duration = 0.2 }
			)
			self.target:InterruptMotionControllers(false)
			local point = self.origin + dir:Normalized() * (radius * 0.8)
			if dir:Length2D() > radius * 1.4 then
				FindClearSpaceForUnit(self.target, point, true)
			else
				self.target:EmitSound("Tinker.Matrix_knock")
				local duration = 0.2
				local distance = (self.target:GetAbsOrigin() - point):Length2D()
				local knockbackProperties = {
					target_x = point.x,
					target_y = point.y,
					distance = distance,
					speed = distance / duration,
					height = 0,
					fix_end = true,
					isStun = true,
					activity = ACT_DOTA_FLAIL,
				}
				self.target:AddNewModifier(
					self.caster,
					self.caster:BkbAbility(nil, true),
					"modifier_generic_arc",
					knockbackProperties
				)
			end
		end
	end

	self.effect_count = self.effect_count + self.interval
	if self.effect_count >= self.effect_interval then
		self.effect_count = 0

		local count = RandomInt(1, 2)
		for i = 1, count do
			local point = self.origin + RandomVector(RandomInt(150, self.radius))
			local nParticleIndex = ParticleManager:CreateParticle(
				"particles/items_fx/chain_lightning.vpcf",
				PATTACH_POINT_FOLLOW,
				self.target
			)
			ParticleManager:SetParticleControlEnt(
				nParticleIndex,
				0,
				self.target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.target:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControl(nParticleIndex, 1, point)
			ParticleManager:ReleaseParticleIndex(nParticleIndex)
		end
	end
end

function modifier_tinker_deploy_turrets_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Tinker.Matrix_legendary_loop")
end

function modifier_tinker_deploy_turrets_custom_legendary:GetAuraEntityReject(hEntity)
	return hEntity ~= self.target
end

modifier_tinker_deploy_turrets_custom_knock_cd = class(mod_hidden)

modifier_tinker_deploy_turrets_custom_legendary_aura = class(mod_hidden)
function modifier_tinker_deploy_turrets_custom_legendary_aura:GetStatusEffectName()
	return "particles/status_fx/status_effect_mjollnir_shield.vpcf"
end
function modifier_tinker_deploy_turrets_custom_legendary_aura:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_tinker_deploy_turrets_custom_legendary_aura:OnCreated()
	self.parent = self:GetParent()
	if not IsServer() then
		return
	end
	self.particle = self.parent:GenericParticle(
		"particles/econ/items/razor/razor_arcana/razor_arcana_static_link_debuff.vpcf",
		self
	)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(100, 0, 0))
end

modifier_tinker_deploy_turrets_custom_legendary_speed = class(mod_hidden)
function modifier_tinker_deploy_turrets_custom_legendary_speed:GetStatusEffectName()
	return "particles/status_fx/status_effect_mjollnir_shield.vpcf"
end
function modifier_tinker_deploy_turrets_custom_legendary_speed:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_tinker_deploy_turrets_custom_legendary_speed:IsAura()
	return IsServer() and self.parent:IsAlive() and self.is_caster
end
function modifier_tinker_deploy_turrets_custom_legendary_speed:GetAuraDuration()
	return 0
end
function modifier_tinker_deploy_turrets_custom_legendary_speed:GetAuraRadius()
	return 2000
end
function modifier_tinker_deploy_turrets_custom_legendary_speed:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_tinker_deploy_turrets_custom_legendary_speed:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_tinker_deploy_turrets_custom_legendary_speed:GetModifierAura()
	return "modifier_tinker_deploy_turrets_custom_legendary_speed"
end
function modifier_tinker_deploy_turrets_custom_legendary_speed:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.e7_speed
	self.is_caster = self.parent == self.caster

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/generic_gameplay/rune_doubledamage_owner.vpcf", self)

	if not self.is_caster then
		return
	end
	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_tinker_deploy_turrets_custom_legendary_speed:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({
		max_time = self.ability.talents.e7_effect_duration,
		time = self:GetRemainingTime(),
		stack = self:GetRemainingTime(),
		active = 1,
		use_zero = 1,
		priority = 2,
		style = "TinkerMatrix",
	})
end

function modifier_tinker_deploy_turrets_custom_legendary_speed:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.is_caster then
		return
	end
	self.parent:UpdateUIshort({ hide = 1, priority = 2, style = "TinkerMatrix" })
end

function modifier_tinker_deploy_turrets_custom_legendary_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_tinker_deploy_turrets_custom_legendary_speed:GetModifierModelScale()
	if not self.is_caster then
		return
	end
	return 20
end

function modifier_tinker_deploy_turrets_custom_legendary_speed:GetModifierAttackSpeedBonus_Constant()
	if not self.is_caster then
		return
	end
	return self.speed
end

function modifier_tinker_deploy_turrets_custom_legendary_speed:GetAuraEntityReject(hEntity)
	return not hEntity:HasModifier("modifier_tinker_deploy_turrets_custom_unit") or self.caster ~= hEntity.owner
end

modifier_tinker_deploy_turrets_custom_legendary_stack = class(mod_visible)
function modifier_tinker_deploy_turrets_custom_legendary_stack:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e7_attacks
	self.turret_max = self.ability.talents.e7_attacks_turret
	self.count = 0
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh(table)
end

function modifier_tinker_deploy_turrets_custom_legendary_stack:OnRefresh(table)
	if not IsServer() then
		return
	end

	if table.is_turret then
		self.count = self.count + 1
		if self.count < self.turret_max then
			return
		end
		self.count = 0
	end

	self:IncrementStackCount()

	if not self.particle then
		self.particle = self.parent:GenericParticle("particles/tinker/stun_stack.vpcf", self, true)
	end
	ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))

	if self:GetStackCount() < self.max then
		return
	end
	self.parent:CheckCd("tinker_e7", self.ability.talents.e7_talent_cd)
	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_tinker_deploy_turrets_custom_legendary_speed",
		{ duration = self.ability.talents.e7_effect_duration }
	)
	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_generic_debuff_immune",
		{ duration = self.ability.talents.e7_duration, effect = 2 }
	)
	CreateModifierThinker(
		self.caster,
		self.ability,
		"modifier_tinker_deploy_turrets_custom_legendary",
		{ target = self.parent:entindex(), duration = self.ability.talents.e7_duration },
		self.parent:GetAbsOrigin(),
		self.caster:GetTeamNumber(),
		false
	)
	self:Destroy()
end

modifier_tinker_deploy_turrets_custom_root = class(mod_hidden)
function modifier_tinker_deploy_turrets_custom_root:IsPurgable()
	return true
end
function modifier_tinker_deploy_turrets_custom_root:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.particle = self.parent:GenericParticle("particles/tinker/laser_stun.vpcf", self)
end

function modifier_tinker_deploy_turrets_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end