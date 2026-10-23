--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_tracker",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_legendary_stack",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_march_7"
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_slow",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_matrix_2"
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_active",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_legendary_cd",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_tinker_march_7" }
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_legendary_armor",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_legendary_crit",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_attack_cd",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_attack_damage",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_auto_cd",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_armor",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_march_1"
)
LinkLuaModifier(
	"modifier_tinker_march_of_the_machines_custom_stats",
	"abilities/tinker/tinker_march_of_the_machines_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_matrix_3"
)

tinker_march_of_the_machines_custom = class({})
tinker_march_of_the_machines_custom.talents = {}
tinker_march_of_the_machines_custom.visual_max = 5

function tinker_march_of_the_machines_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_motm.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_machine.vpcf", context)
	PrecacheResource("particle", "particles/tinker/march_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_techies/techies_land_mine_explode.vpcf", context)
	PrecacheResource("particle", "particles/tinker/scepter_proc.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/ti10/phase_boots_ti10.vpcf", context)
	PrecacheResource(
		"particle",
		"amir4an/particles/heroes/tinker/amir4an_1x6/amir4an_1x6_tinker_march_ambient.vpcf",
		context
	)
	PrecacheResource("particle", "particles/hoodwink/bush_damage.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_shard_warp_start_b.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/blink_dagger_end.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", context)
	PrecacheResource("particle", "particles/tinker/march_vector.vpcf", context)
end

function tinker_march_of_the_machines_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_max = 0,
			w1_armor = 0,
			w1_stack = caster:GetTalentValue("modifier_tinker_march_1", "stack", true),
			w1_interval = caster:GetTalentValue("modifier_tinker_march_1", "interval", true),
			w1_speed = caster:GetTalentValue("modifier_tinker_march_1", "speed", true),
			w1_talent_cd = caster:GetTalentValue("modifier_tinker_march_1", "talent_cd", true),
			w1_duration = caster:GetTalentValue("modifier_tinker_march_1", "duration", true),

			w2_speed = 0,
			w2_heal = 0,

			has_w3 = 0,
			w3_duration = 0,
			w3_damage = 0,
			w3_talent_cd = caster:GetTalentValue("modifier_tinker_march_3", "talent_cd", true),
			w3_chance = caster:GetTalentValue("modifier_tinker_march_3", "chance", true),

			has_w4 = 0,
			w4_cast = caster:GetTalentValue("modifier_tinker_march_4", "cast", true),
			w4_armor = caster:GetTalentValue("modifier_tinker_march_4", "armor", true),
			w4_cd = caster:GetTalentValue("modifier_tinker_march_4", "cd", true),
			w4_distance = caster:GetTalentValue("modifier_tinker_march_4", "distance", true),

			has_w7 = 0,
			w7_range = caster:GetTalentValue("modifier_tinker_march_7", "range", true),
			w7_width = caster:GetTalentValue("modifier_tinker_march_7", "width", true),
			w7_cd = caster:GetTalentValue("modifier_tinker_march_7", "cd", true),
			w7_damage = caster:GetTalentValue("modifier_tinker_march_7", "damage", true),
			w7_damage_radius = caster:GetTalentValue("modifier_tinker_march_7", "damage_radius", true),
			w7_max = caster:GetTalentValue("modifier_tinker_march_7", "max", true),
			w7_radius = caster:GetTalentValue("modifier_tinker_march_7", "radius", true),
			w7_duration = caster:GetTalentValue("modifier_tinker_march_7", "duration", true),
			w7_hit_radius = caster:GetTalentValue("modifier_tinker_march_7", "hit_radius", true),
			w7_mana = caster:GetTalentValue("modifier_tinker_march_7", "mana", true) / 100,
			w7_stun = caster:GetTalentValue("modifier_tinker_march_7", "stun", true),
			w7_speed = caster:GetTalentValue("modifier_tinker_march_7", "speed", true),
			w7_armor = caster:GetTalentValue("modifier_tinker_march_7", "armor", true) / 100,

			has_e2 = 0,
			e2_slow = 0,
			e2_duration = caster:GetTalentValue("modifier_tinker_matrix_2", "duration", true),

			has_e3 = 0,
			e3_damage = 0,
			e3_stats = 0,
			e3_max = caster:GetTalentValue("modifier_tinker_matrix_3", "max", true),
			e3_duration = caster:GetTalentValue("modifier_tinker_matrix_3", "duration", true),
		}
	end

	if caster:HasTalent("modifier_tinker_march_1") then
		self.talents.has_w1 = 1
		self.talents.w1_max = caster:GetTalentValue("modifier_tinker_march_1", "max")
		self.talents.w1_armor = caster:GetTalentValue("modifier_tinker_march_1", "armor")
	end

	if caster:HasTalent("modifier_tinker_march_2") then
		self.talents.w2_speed = caster:GetTalentValue("modifier_tinker_march_2", "speed") / 100
		self.talents.w2_heal = caster:GetTalentValue("modifier_tinker_march_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_tinker_march_2",
			value = function(params)
				if params.inflictor and not (caster.turret_ability and params.inflictor == caster.turret_ability) then
					return 0
				end
				return self.talents.w2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_tinker_march_3") then
		self.talents.has_w3 = 1
		self.talents.w3_duration = caster:GetTalentValue("modifier_tinker_march_3", "duration")
		self.talents.w3_damage = caster:GetTalentValue("modifier_tinker_march_3", "damage")
	end

	if caster:HasTalent("modifier_tinker_march_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_tinker_march_7") then
		self.talents.has_w7 = 1
		if IsServer() then
			self.tracker:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_tinker_matrix_2") then
		self.talents.has_e2 = 1
		self.talents.e2_slow = caster:GetTalentValue("modifier_tinker_matrix_2", "slow")
	end

	if caster:HasTalent("modifier_tinker_matrix_3") then
		self.talents.has_e3 = 1
		self.talents.e3_damage = caster:GetTalentValue("modifier_tinker_matrix_3", "damage")
		self.talents.e3_stats = caster:GetTalentValue("modifier_tinker_matrix_3", "stats")
	end
end

function tinker_march_of_the_machines_custom:CreateTalent()
	self:ToggleAutoCast()
end

function tinker_march_of_the_machines_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "tinker_march_of_the_machines", self)
end

function tinker_march_of_the_machines_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_tinker_march_of_the_machines_custom_tracker"
end

function tinker_march_of_the_machines_custom:GetBehavior()
	local bonus = self.talents.has_w7 == 1 and DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING or 0
	return bonus + DOTA_ABILITY_BEHAVIOR_POINT + (self.talents.has_w4 == 1 and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0)
end

function tinker_march_of_the_machines_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_w7 == 1 then
		return self.talents.w7_range - self.caster:GetCastRangeBonus()
	end
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
end

function tinker_march_of_the_machines_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_w4 == 1 and self.talents.w4_cast or 0)
end

function tinker_march_of_the_machines_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level) * (1 + (self.talents.has_w7 == 1 and self.talents.w7_mana or 0))
end

function tinker_march_of_the_machines_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.has_w4 == 1 and self.talents.w4_cd or 0)
end

function tinker_march_of_the_machines_custom:OnSpellStart()
	if self.talents.has_w7 == 1 then
		return
	end
	self:Cast(self:GetCursorPosition())
end

function tinker_march_of_the_machines_custom:OnVectorCastStart(vStartLocation, vDirection)
	if self.talents.has_w7 == 0 then
		return
	end
	self:Cast(vStartLocation, vDirection)
end

function tinker_march_of_the_machines_custom:OnProjectileHit_ExtraData(target, location, extraData)
	if not target then
		return true
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return false
	end

	local damage = self.damage
	local radius = self.splash_radius
	local damage_ability = nil

	if extraData.is_legendary == 1 then
		radius = self.talents.w7_damage_radius
		self.caster:AddNewModifier(self.caster, self, "modifier_tinker_march_of_the_machines_custom_legendary_crit", {})

		EmitSoundOnLocationWithCaster(location, "Tinker.March_legendary_explosion", self.caster)
		EmitSoundOnLocationWithCaster(location, "Tinker.March_legendary_explosion2", self.caster)

		local nFXIndex = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_techies/techies_land_mine_explode.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(nFXIndex, 0, location)
		ParticleManager:SetParticleControl(nFXIndex, 1, Vector(1.0, 1.0, radius))
		ParticleManager:SetParticleControl(nFXIndex, 2, Vector(1.0, 1.0, radius))
		ParticleManager:ReleaseParticleIndex(nFXIndex)
	end

	if extraData.is_auto == 1 then
		damage_ability = "modifier_tinker_march_1"
	end

	local damageTable = {
		attacker = self.caster,
		damage = damage,
		damage_type = DAMAGE_TYPE_PHYSICAL,
		damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
		ability = self,
	}
	local enemies = self.caster:FindTargets(radius, location)
	for _, enemy in ipairs(enemies) do
		damageTable.victim = enemy
		if enemy:IsRealHero() then
			if
				self.talents.has_w7 == 1
				and not self.caster:HasModifier("modifier_tinker_march_of_the_machines_custom_legendary_cd")
			then
				self.caster:AddNewModifier(
					self.caster,
					self,
					"modifier_tinker_march_of_the_machines_custom_legendary_stack",
					{ duration = self.talents.w7_duration }
				)
			end
			if self.caster:GetQuest() == "Tinker.Quest_6" and not self.caster:QuestCompleted() then
				self.caster:UpdateQuest(1)
			end
		end

		if extraData.is_legendary == 1 then
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_stunned",
				{ duration = (1 - enemy:GetStatusResistance()) * self.talents.w7_stun }
			)
			if not enemy:IsCreep() then
				enemy:AddNewModifier(
					self.caster,
					self.caster:BkbAbility(self, true),
					"modifier_tinker_march_of_the_machines_custom_legendary_armor",
					{}
				)
			end
			self.caster:PerformAttack(enemy, true, true, true, true, false, false, true)
			enemy:RemoveModifierByName("modifier_tinker_march_of_the_machines_custom_legendary_armor")
		else
			self:ProcEffects(enemy)
			DoDamage(damageTable, damage_ability)
		end
	end

	self.caster:RemoveModifierByName("modifier_tinker_march_of_the_machines_custom_legendary_crit")
	return true
end

function tinker_march_of_the_machines_custom:Cast(cast_point, dir)
	local point = self.caster:CastPosition(cast_point)

	if
		self.talents.has_w4 == 1
		and self:GetAutoCastState()
		and not self.caster:IsLeashed()
		and not self.caster:IsRooted()
	then
		local blink_dir = self.caster:GetForwardVector() * -1
		local blink_point = self.caster:GetAbsOrigin() + blink_dir * self.talents.w4_distance

		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_tinker/tinker_shard_warp_start_b.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControlForward(particle, 0, blink_dir)
		ParticleManager:ReleaseParticleIndex(particle)

		self.caster:Teleport(blink_point, true, nil, "particles/items_fx/blink_dagger_end.vpcf", "Tinker.Matrix_blink")
	end

	local direction = (point - self.caster:GetOrigin()):Normalized()
	if dir then
		direction = dir
	end
	direction.z = 0

	local duration = self.duration + self.talents.w3_duration

	if self.talents.has_w7 == 0 then
		point = point - direction * self.distance / 2
	else
		point = point - direction * 200
		AddFOWViewer(self.caster:GetTeamNumber(), point, self.talents.w7_width * 2, duration, false)
	end

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_tinker/tinker_motm.vpcf",
		self
	)
	local sound_name = wearables_system:GetSoundReplacement(self.caster, "Hero_Tinker.March_of_the_Machines.Cast", self)
	local sound_effect = wearables_system:GetSoundReplacement(self.caster, "Hero_Tinker.March_of_the_Machines", self)
	if
		particle_name == "particles/econ/items/tinker/tinker_cosmic/tinker_cosmic_mom.vpcf"
		or sound_effect ~= "Hero_Tinker.March_of_the_Machines"
	then
		EmitSoundOnLocationForAllies(self.caster:GetOrigin(), "Hero_Tinker.March_of_the_Machines.Cosmic", self.caster)
	end

	local particle = ParticleManager:CreateParticle(particle_name, PATTACH_CUSTOMORIGIN, self.caster)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.caster,
		PATTACH_ABSORIGIN,
		nil,
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	EmitSoundOnLocationForAllies(self.caster:GetOrigin(), sound_name, self.caster)

	local use_legendary = 0
	local legendary_mod = self.caster:FindModifierByName("modifier_tinker_march_of_the_machines_custom_legendary_stack")
	if legendary_mod and legendary_mod:GetStackCount() >= self.talents.w7_max then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_tinker_march_of_the_machines_custom_legendary_cd",
			{ duration = self.talents.w7_cd }
		)
		legendary_mod:Destroy()
		use_legendary = 1
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_tinker_march_of_the_machines_custom_active",
		{ duration = duration + 2 }
	)
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_tinker_march_of_the_machines_custom",
		{ x = direction.x, y = direction.y, legendary = use_legendary, duration = duration },
		GetGroundPosition(point, nil),
		self.caster:GetTeamNumber(),
		false
	)
end

function tinker_march_of_the_machines_custom:ProcEffects(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end

	if self.talents.has_e2 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_tinker_march_of_the_machines_custom_slow",
			{ duration = self.talents.e2_duration }
		)
	end

	if self.talents.has_e3 == 1 and target:IsRealHero() then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_tinker_march_of_the_machines_custom_stats",
			{ duration = self.talents.e3_duration }
		)
	end

	if self.talents.has_w1 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_tinker_march_of_the_machines_custom_armor",
			{ duration = self.talents.w1_duration }
		)
	end

	if self.talents.has_w3 == 0 then
		return
	end
	if target:HasModifier("modifier_tinker_march_of_the_machines_custom_attack_cd") then
		return
	end
	if not RollPseudoRandomPercentage(self.talents.w3_chance, 7350, self.caster) then
		return
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_tinker_march_of_the_machines_custom_attack_damage", {})
	self.caster:PerformAttack(target, true, true, true, true, false, false, true)
	self.caster:RemoveModifierByName("modifier_tinker_march_of_the_machines_custom_attack_damage")
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_tinker_march_of_the_machines_custom_attack_cd",
		{ duration = self.talents.w3_talent_cd }
	)
	target:GenericParticle("particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf")
	target:EmitSound("Tinker.Rearm_damage")
end

function tinker_march_of_the_machines_custom:ProcAuto(target, source)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w1 == 0 then
		return
	end
	if self.caster:HasModifier("modifier_tinker_march_of_the_machines_custom_auto_cd") then
		return
	end
	if not target:IsUnit() then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_tinker_march_of_the_machines_custom_auto_cd",
		{ duration = self.talents.w1_talent_cd }
	)

	local direction = (target:GetAbsOrigin() - source:GetAbsOrigin()):Normalized()
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_tinker_march_of_the_machines_custom",
		{ x = direction.x, y = direction.y, legendary = 0, is_auto = 1, duration = 1 },
		source:GetAbsOrigin(),
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_tinker_march_of_the_machines_custom = class(mod_hidden)
function modifier_tinker_march_of_the_machines_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.use_legendary = table.legendary
	self.is_auto = table.is_auto == 1 and 1 or 0
	self.auto_count = 0

	local interval = 1 / self.ability.machines_per_sec
	self.collision_radius = self.ability.collision_radius
	self.spawn_radius = self.ability.talents.has_w7 == 1 and self.ability.talents.w7_width or self.ability.radius

	if self.is_auto == 1 then
		self.spawn_radius = 35
		interval = self.ability.talents.w1_interval
	end

	self.direction = Vector(table.x, table.y, 0)
	self.parent:SetForwardVector(self.direction)
	self.centerSpawn = self.parent:GetOrigin()
	self.centerVector = self.parent:GetLeftVector()

	self.projectileInfo = {
		Source = self.caster,
		Ability = self.ability,
		iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY,
		iUnitTargetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		fDistance = self.ability.distance,
		ExtraData = {},
	}

	self.effect_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_tinker/tinker_machine.vpcf",
		self
	)

	self:OnIntervalThink()
	self:StartIntervalThink(interval)

	self.parent:EmitSound("Hero_Tinker.March_of_the_Machines")
end

function modifier_tinker_march_of_the_machines_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	local spawn = self.centerSpawn + self.centerVector * RandomInt(-self.spawn_radius, self.spawn_radius)
	local effect_name = self.effect_name

	local data = {}
	data.is_legendary = 0
	local speed = self.ability.speed

	local width = self.collision_radius
	if self.use_legendary == 1 then
		self.use_legendary = 0
		data.is_legendary = 1
		speed = speed + self.ability.talents.w7_speed
		effect_name = "amir4an/particles/heroes/tinker/amir4an_1x6/amir4an_1x6_tinker_march_ambient.vpcf"
		spawn = self.centerSpawn + self.centerVector
		width = self.ability.talents.w7_hit_radius
		EmitSoundOnLocationWithCaster(spawn, "Tinker.March_legendary_start", self.caster)
	end

	speed = speed * (1 + self.ability.talents.w2_speed)

	if self.is_auto == 1 then
		self.auto_count = self.auto_count + 1
		data.is_auto = 1
		speed = self.ability.talents.w1_speed
	end

	self.projectileInfo.vVelocity = self.direction * speed
	self.projectileInfo.fStartRadius = width
	self.projectileInfo.fEndRadius = width
	self.projectileInfo.ExtraData = data
	self.projectileInfo.vSpawnOrigin = spawn
	self.projectileInfo.EffectName = effect_name
	ProjectileManager:CreateLinearProjectile(self.projectileInfo)

	if self.is_auto == 1 and self.auto_count >= self.ability.talents.w1_max then
		self:Destroy()
		return
	end
end

function modifier_tinker_march_of_the_machines_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Hero_Tinker.March_of_the_Machines")
	UTIL_Remove(self.parent)
end

function modifier_tinker_march_of_the_machines_custom:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

modifier_tinker_march_of_the_machines_custom_tracker = class(mod_hidden)
function modifier_tinker_march_of_the_machines_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.march_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.damage_attack = self.ability:GetSpecialValueFor("damage_attack")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.splash_radius = self.ability:GetSpecialValueFor("splash_radius")
	self.ability.distance = self.ability:GetSpecialValueFor("distance")
	self.ability.speed = self.ability:GetSpecialValueFor("speed")
	self.ability.machines_per_sec = self.ability:GetSpecialValueFor("machines_per_sec")
	self.ability.collision_radius = self.ability:GetSpecialValueFor("collision_radius")
end

function modifier_tinker_march_of_the_machines_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.damage_attack = self.ability:GetSpecialValueFor("damage_attack")
end

function modifier_tinker_march_of_the_machines_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end

	local stack = 0
	local active = 0
	local zero = false
	local override_stack = nil
	local max = self.ability.talents.w7_max

	local mod = self.parent:FindModifierByName("modifier_tinker_march_of_the_machines_custom_legendary_stack")

	if mod then
		stack = mod:GetStackCount()
		if mod:GetStackCount() >= self.ability.talents.w7_max then
			active = 1
		end
		if self.particle then
			ParticleManager:DestroyParticle(self.particle, true)
			ParticleManager:ReleaseParticleIndex(self.particle)
			self.particle = nil
		end
	else
		if not self.particle then
			self.particle = self.parent:GenericParticle("particles/tinker/march_legendary_stack.vpcf", self, true)
			for i = 1, self.ability.visual_max do
				ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
			end
		end
	end

	local cd_mod = self.parent:FindModifierByName("modifier_tinker_march_of_the_machines_custom_legendary_cd")
	if cd_mod then
		active = 0
		stack = 0
		override_stack = cd_mod:GetRemainingTime()
		zero = true
		max = self.ability.talents.w7_cd
		self:StartIntervalThink(0.1)
	else
		self:StartIntervalThink(-1)
	end

	self.parent:UpdateUIlong({
		stack = stack,
		max = max,
		override_stack = override_stack,
		active = active,
		use_zero = zero,
		style = "TinkerMarch",
	})
end

function modifier_tinker_march_of_the_machines_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:UpdateUI()
end

modifier_tinker_march_of_the_machines_custom_legendary_stack = class(mod_hidden)
function modifier_tinker_march_of_the_machines_custom_legendary_stack:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max = self.ability.talents.w7_max
	self.radius = self.ability.talents.w7_radius
	self.duration = self.ability.talents.w7_duration

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.mod = self.ability.tracker

	self.visual_max = self.ability.visual_max
	self.particle = self.parent:GenericParticle("particles/tinker/march_legendary_stack.vpcf", self, true)

	self:OnRefresh()
	self:StartIntervalThink(0.3)
end

function modifier_tinker_march_of_the_machines_custom_legendary_stack:OnRefresh(params)
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

	for i = 1, self.visual_max do
		if i <= math.floor(self:GetStackCount() / (self.max / self.visual_max)) then
			ParticleManager:SetParticleControl(self.particle, i, Vector(1, 0, 0))
		else
			ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
		end
	end
end

function modifier_tinker_march_of_the_machines_custom_legendary_stack:OnIntervalThink()
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

function modifier_tinker_march_of_the_machines_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.mod then
		return
	end
	self.mod:UpdateUI()
end

modifier_tinker_march_of_the_machines_custom_slow = class(mod_hidden)
function modifier_tinker_march_of_the_machines_custom_slow:IsPurgable()
	return true
end
function modifier_tinker_march_of_the_machines_custom_slow:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.slow = self.ability.talents.e2_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", self)
end

function modifier_tinker_march_of_the_machines_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_tinker_march_of_the_machines_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_tinker_march_of_the_machines_custom_active = class(mod_visible)
function modifier_tinker_march_of_the_machines_custom_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.damage_attack
end

function modifier_tinker_march_of_the_machines_custom_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_tinker_march_of_the_machines_custom_active:GetModifierPreAttack_BonusDamage()
	return self.damage
end

function modifier_tinker_march_of_the_machines_custom_active:GetModifierPhysicalArmorBonus()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_armor
end

modifier_tinker_march_of_the_machines_custom_legendary_crit = class(mod_hidden)
function modifier_tinker_march_of_the_machines_custom_legendary_crit:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.crit = self.ability.talents.w7_damage
end

function modifier_tinker_march_of_the_machines_custom_legendary_crit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_tinker_march_of_the_machines_custom_legendary_crit:GetCritDamage()
	return self.crit
end

function modifier_tinker_march_of_the_machines_custom_legendary_crit:GetModifierPreAttack_CriticalStrike()
	return self.crit
end

modifier_tinker_march_of_the_machines_custom_attack_damage = class(mod_hidden)
function modifier_tinker_march_of_the_machines_custom_attack_damage:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.w3_damage - 100
end

function modifier_tinker_march_of_the_machines_custom_attack_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_tinker_march_of_the_machines_custom_attack_damage:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

modifier_tinker_march_of_the_machines_custom_legendary_cd = class(mod_hidden)
modifier_tinker_march_of_the_machines_custom_attack_cd = class(mod_hidden)
modifier_tinker_march_of_the_machines_custom_auto_cd = class(mod_hidden)

modifier_tinker_march_of_the_machines_custom_stats = class(mod_visible)
function modifier_tinker_march_of_the_machines_custom_stats:GetTexture()
	return "buffs/tinker/matrix_3"
end
function modifier_tinker_march_of_the_machines_custom_stats:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e3_max
	self.stats = self.ability.talents.e3_stats / self.max
	self.damage = self.ability.talents.e3_damage / self.max

	if not IsServer() then
		return
	end
	self:OnRefresh(table)
	self.RemoveForDuel = true
end

function modifier_tinker_march_of_the_machines_custom_stats:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_tinker_march_of_the_machines_custom_stats:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_tinker_march_of_the_machines_custom_stats:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_tinker_march_of_the_machines_custom_stats:GetModifierPreAttack_BonusDamage()
	return self:GetStackCount() * self.damage
end

function modifier_tinker_march_of_the_machines_custom_stats:GetModifierBonusStats_Agility()
	return self:GetStackCount() * self.stats
end

function modifier_tinker_march_of_the_machines_custom_stats:GetModifierBonusStats_Strength()
	return self:GetStackCount() * self.stats
end

function modifier_tinker_march_of_the_machines_custom_stats:GetModifierBonusStats_Intellect()
	return self:GetStackCount() * self.stats
end

modifier_tinker_march_of_the_machines_custom_armor = class(mod_visible)
function modifier_tinker_march_of_the_machines_custom_armor:GetTexture()
	return "buffs/tinker/march_1"
end
function modifier_tinker_march_of_the_machines_custom_armor:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w1_stack
	self.armor = self.ability.talents.w1_armor / self.max

	if not IsServer() then
		return
	end
	self:OnRefresh(table)
	self.RemoveForDuel = true
end

function modifier_tinker_march_of_the_machines_custom_armor:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Hoodwink.Acorn_armor")
		self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)
	end
end

function modifier_tinker_march_of_the_machines_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_tinker_march_of_the_machines_custom_armor:GetModifierPhysicalArmorBonus()
	return self:GetStackCount() * self.armor
end

modifier_tinker_march_of_the_machines_custom_legendary_armor = class(mod_hidden)
function modifier_tinker_march_of_the_machines_custom_legendary_armor:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.march_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.armor = self.parent:GetArmor(self) * self.ability.talents.w7_armor
end

function modifier_tinker_march_of_the_machines_custom_legendary_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_tinker_march_of_the_machines_custom_legendary_armor:GetModifierPhysicalArmorBonus()
	if not IsServer() then
		return
	end
	return self.armor
end