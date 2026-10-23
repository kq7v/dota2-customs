--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_bristleback_quillspray_thinker",
	"abilities/bristleback/bristleback_quill_spray_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_bristleback_quill_spray",
	"abilities/bristleback/bristleback_quill_spray_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_bristleback_quill_spray_tracker",
	"abilities/bristleback/bristleback_quill_spray_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_bristleback_quill_spray_autocast",
	"abilities/bristleback/bristleback_quill_spray_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_bristle_back_7" }
)
LinkLuaModifier(
	"modifier_custom_bristleback_quill_spray_double",
	"abilities/bristleback/bristleback_quill_spray_custom",
	LUA_MODIFIER_MOTION_NONE
)

bristleback_quill_spray_custom = class({})
bristleback_quill_spray_custom.talents = {}

function bristleback_quill_spray_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_bristleback/bristleback_quill_spray_conical.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_bristleback/bristleback_quill_spray.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bristleback/bristleback_quill_spray_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bristleback/bristleback_quill_spray_hit.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_bristleback/bristleback_quill_spray_hit_creep.vpcf",
		context
	)
	PrecacheResource("particle", "particles/legion_commander/lc_lowhp.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_proc.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/spray_double.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/spray_legendary_damage.vpcf", context)
end

function bristleback_quill_spray_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_damage = 0,
			w1_damage_max = caster:GetTalentValue("modifier_bristle_spray_1", "damage_max", true) / 100,

			w2_radius = 0,
			w2_cd = 0,

			has_w3 = 0,
			w3_damage = 0,
			w3_heal = 0,
			w3_chance_inc = caster:GetTalentValue("modifier_bristle_spray_3", "chance_inc", true),
			w3_interval = caster:GetTalentValue("modifier_bristle_spray_3", "interval", true),
			w3_chance = caster:GetTalentValue("modifier_bristle_spray_3", "chance", true),
			w3_max = caster:GetTalentValue("modifier_bristle_spray_3", "max", true),
			w3_min = caster:GetTalentValue("modifier_bristle_spray_3", "min", true),

			has_w7 = 0,
			w7_mana = caster:GetTalentValue("modifier_bristle_spray_7", "mana", true) / 100,
			w7_thresh = caster:GetTalentValue("modifier_bristle_spray_7", "thresh", true),
			w7_damage = caster:GetTalentValue("modifier_bristle_spray_7", "damage", true) / 100,

			has_e7 = 0,
			e7_cost = caster:GetTalentValue("modifier_bristle_back_7", "cost", true) / 100,
			e7_cd = caster:GetTalentValue("modifier_bristle_back_7", "cd", true) / 100,

			has_e2 = 0,
			e2_heal = 0,
			e2_base = 0,
			e2_heal_reduce = caster:GetTalentValue("modifier_bristle_back_2", "heal_reduce", true),
		}
	end

	if caster:HasTalent("modifier_bristle_spray_1") then
		self.talents.w1_damage = caster:GetTalentValue("modifier_bristle_spray_1", "damage") / 100
	end

	if caster:HasTalent("modifier_bristle_spray_2") then
		self.talents.w2_radius = caster:GetTalentValue("modifier_bristle_spray_2", "radius")
		self.talents.w2_cd = caster:GetTalentValue("modifier_bristle_spray_2", "cd")
	end

	if caster:HasTalent("modifier_bristle_spray_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_bristle_spray_3", "damage") / 100
		self.talents.w3_heal = caster:GetTalentValue("modifier_bristle_spray_3", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_bristle_spray_3", type = 1, value = self.talents.w3_heal })
	end

	if caster:HasTalent("modifier_bristle_spray_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_bristle_back_2") then
		self.talents.has_e2 = 1
		self.talents.e2_heal = caster:GetTalentValue("modifier_bristle_back_2", "heal") / 100
		self.talents.e2_base = caster:GetTalentValue("modifier_bristle_back_2", "base")
	end

	if caster:HasTalent("modifier_bristle_back_7") then
		self.talents.has_e7 = 1
	end
end

function bristleback_quill_spray_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "bristleback_quill_spray", self)
end

function bristleback_quill_spray_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_bristleback_quill_spray_tracker"
end

function bristleback_quill_spray_custom:GetRadius()
	return (self.radius or 0) + (self.talents.w2_radius or 0)
end

function bristleback_quill_spray_custom:GetCastRange(vLocation, hTarget)
	return self:GetRadius() - self.caster:GetCastRangeBonus()
end

function bristleback_quill_spray_custom:GetHealthCost(level)
	if self.talents.has_e7 == 0 then
		return
	end
	if not self.caster:HasModifier("modifier_custom_bristleback_quill_spray_autocast") then
		return
	end
	return (self.talents.e7_cost or 0) * self.caster:GetMaxHealth()
end

function bristleback_quill_spray_custom:GetManaCost(level)
	if self.talents.has_w7 == 1 then
		return self.caster:GetMaxMana() * self.talents.w7_mana
	end
	return self.BaseClass.GetManaCost(self, level)
end

function bristleback_quill_spray_custom:GetCooldown(iLevel)
	local bonus = 1
	if self.talents.has_e7 == 1 and self.caster:HasModifier("modifier_custom_bristleback_quill_spray_autocast") then
		bonus = 1 + self.talents.e7_cd
	end
	return (self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w2_cd or 0)) * bonus
end

function bristleback_quill_spray_custom:GetAbilityTargetFlags()
	return DOTA_UNIT_TARGET_FLAG_NONE
end

function bristleback_quill_spray_custom:OnSpellStart()
	self:MakeSpray(nil)
end

function bristleback_quill_spray_custom:ProcHeal(is_back)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e2 == 0 then
		return
	end

	local heal = self.talents.e2_base + self.talents.e2_heal * (self.caster:GetMaxHealth() - self.caster:GetHealth())
	local hide = false
	if is_back then
		hide = true
		heal = heal / self.talents.e2_heal_reduce
	end
	self.caster:GenericHeal(heal, self, hide, "", "modifier_bristle_back_2")
end

function bristleback_quill_spray_custom:MakeSpray(location, is_passive, is_legendary, is_double)
	local sound_name = wearables_system:GetSoundReplacement(self.caster, "Hero_Bristleback.QuillSpray.Cast", self)
	if not location then
		self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_2)
		self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_2)
		local bristleback_head = self.caster:GetItemWearableHandle("head")
		if bristleback_head then
			bristleback_head:StartGesture(ACT_DOTA_CAST_ABILITY_2)
		end
	end

	local cone = is_legendary and 1 or 0
	local passive = is_passive and 1 or 0
	local double = is_double and 1 or 0
	local shard = location and 1 or 0
	local x = location and location.x or nil
	local y = location and location.y or nil

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_bristleback_quillspray_thinker",
		{ x = x, y = y, passive = passive, double = double, cone = cone, shard = shard }
	)

	if location then
		EmitSoundOnLocationWithCaster(location, sound_name, self.caster)
	else
		self.caster:EmitSound(sound_name)
	end
end

function bristleback_quill_spray_custom:ProcDouble()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end
	if not RollPseudoRandomPercentage(self.talents.w3_chance, 8001, self.caster) then
		return
	end
	self.caster:AddNewModifier(self.caster, self, "modifier_custom_bristleback_quill_spray_double", {})
end

modifier_custom_bristleback_quillspray_thinker = class(mod_hidden)
function modifier_custom_bristleback_quillspray_thinker:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_custom_bristleback_quillspray_thinker:OnCreated(table)
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.back = self.caster.bristleback_ability
	self.radius = self.ability:GetRadius()

	local bonus = self.ability.talents.w1_damage * self.caster:GetIntellect(false)

	self.quill_base_damage = self.ability.quill_base_damage + bonus
	self.quill_stack_damage = self.ability.quill_stack_damage
	self.quill_stack_duration = self.ability.quill_stack_duration
	self.max_damage = self.ability.max_damage + bonus * self.ability.talents.w1_damage_max
	if not IsServer() then
		return
	end

	self.hit_type = 0

	self.cast_point = self.parent:GetAbsOrigin()
	if table.x and table.y then
		self.cast_point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	end

	self.speed = self.ability.projectile_speed
	self.current_radius = 0

	self.duration = self:GetRemainingTime()
	self.passive = table.passive
	self.shard = table.shard
	self.cone = table.cone
	self.double = table.double
	self.direction = self.caster:GetForwardVector()
	self.angle = 0

	if self.cone == 1 then
		self.legendary_ability = self.caster.spray_legendary_ability
		if self.legendary_ability then
			self.angle = self.legendary_ability.activation_angle
		end
		self.direction = self.direction * -1
		self.caster:GenericParticle(
			"particles/units/heroes/hero_bristleback/bristleback_quill_spray_conical.vpcf",
			self
		)
	else
		local pfx_name = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_bristleback/bristleback_quill_spray.vpcf",
			self
		)
		self.particle = ParticleManager:CreateParticle(pfx_name, PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(self.particle, 0, self.cast_point)
		self:AddParticle(self.particle, false, false, -1, false, false)
	end

	self.direction.z = 0
	self.hit_enemies = {}
	self.interval = 0.1
	self:StartIntervalThink(self.interval)
end

function modifier_custom_bristleback_quillspray_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.current_radius = math.min(self.radius, self.current_radius + self.speed * self.interval)
	local cast_angle = VectorToAngles(self.direction).y
	for _, enemy in pairs(self.caster:FindTargets(self.current_radius, self.cast_point)) do
		local enemy_direction = (enemy:GetOrigin() - self.cast_point):Normalized()
		local enemy_angle = VectorToAngles(enemy_direction).y
		local angle_diff = math.abs(AngleDiff(cast_angle, enemy_angle))

		if (angle_diff <= self.angle or self.cone == 0) and enemy:IsUnit() and not self.hit_enemies[enemy] then
			self.hit_enemies[enemy] = true

			local mod = enemy:FindModifierByName("modifier_custom_bristleback_quill_spray")
			local stack = mod and mod:GetStackCount() or 0
			local damage = math.min(self.max_damage, self.quill_base_damage + stack * self.quill_stack_damage)

			local ability = self.ability
			local damage_ability = nil
			local damage_type = DAMAGE_TYPE_PHYSICAL
			local damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK
			local number = false
			if self.ability.talents.has_w7 == 1 then
				damage_flags = 0
				damage_type = DAMAGE_TYPE_MAGICAL
				if self.caster:GetManaPercent() <= self.ability.talents.w7_thresh then
					damage = damage * self.ability.talents.w7_damage
					number = true

					local particle = ParticleManager:CreateParticle(
						"particles/bristleback/spray_legendary_damage.vpcf",
						PATTACH_ABSORIGIN_FOLLOW,
						enemy
					)
					ParticleManager:SetParticleControlEnt(
						particle,
						0,
						enemy,
						PATTACH_POINT_FOLLOW,
						"attach_hitloc",
						enemy:GetAbsOrigin(),
						true
					)
					ParticleManager:ReleaseParticleIndex(particle)
				end
			end

			if self.passive == 1 then
				damage_flags = damage_flags + DOTA_DAMAGE_FLAG_REFLECTION
				ability = self.back
			end

			if self.cone == 1 then
				ability = self.legendary_ability
			end

			if self.double == 1 then
				damage_ability = "modifier_bristle_spray_3"
				damage = damage * self.ability.talents.w3_damage
			end

			local damageTable = {
				victim = enemy,
				damage = damage,
				damage_type = damage_type,
				damage_flags = damage_flags,
				attacker = self.caster,
				ability = ability,
			}
			local real_damage = DoDamage(damageTable, damage_ability)

			if IsValid(self.back) then
				self.back:ProcSlow(enemy)
			end

			if self.caster.bristleback_innate then
				self.caster.bristleback_innate:ProcHit(enemy, self.passive == 1)
			end

			if number then
				enemy:SendNumber(6, real_damage)
			end

			local particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_bristleback/bristleback_quill_spray_impact.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				enemy
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				1,
				enemy,
				PATTACH_ABSORIGIN_FOLLOW,
				"attach_hitloc",
				enemy:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(particle)

			enemy:EmitSound("Hero_Bristleback.QuillSpray.Target")
			enemy:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_custom_bristleback_quill_spray",
				{ duration = self.quill_stack_duration }
			)

			if enemy:IsHero() then
				self.hit_type = 2
			elseif self.hit_type == 0 then
				self.hit_type = 1
			end
		end
	end

	if self.current_radius >= self.radius then
		self:Destroy()
		return
	end
end

function modifier_custom_bristleback_quillspray_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	if self.hit_type == 0 then
		return
	end
	if self.shard == 1 then
		return
	end

	if self.passive == 0 and self.double == 0 then
		self.ability:ProcHeal()
	end

	if self.caster.warpath_ability and self.caster.warpath_ability.tracker then
		self.caster.warpath_ability.tracker:AddStack(self.hit_type == 2)
	end
end

modifier_custom_bristleback_quill_spray = class(mod_visible)
function modifier_custom_bristleback_quill_spray:OnCreated()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()

	self.RemoveForDuel = true

	if IsClient() then
		local particle_name = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_bristleback/bristleback_quill_spray_hit.vpcf",
			self
		)
		if self.parent:IsCreep() then
			particle_name = wearables_system:GetParticleReplacementAbility(
				self.caster,
				"particles/units/heroes/hero_bristleback/bristleback_quill_spray_hit_creep.vpcf",
				self
			)
		end

		self.particle = ParticleManager:CreateParticle(particle_name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControlEnt(
			self.particle,
			0,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			self.particle,
			1,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(self.particle, false, false, -1, false, false)
	end

	if not IsServer() then
		return
	end

	self.duration = self:GetRemainingTime()
	self:AddStack()
end

function modifier_custom_bristleback_quill_spray:OnRefresh()
	if not IsServer() then
		return
	end
	self:AddStack()
end

function modifier_custom_bristleback_quill_spray:AddStack()
	if not IsServer() then
		return
	end

	Timers:CreateTimer(self.duration, function()
		if IsValid(self) then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)

	self:IncrementStackCount()
end

modifier_custom_bristleback_quill_spray_tracker = class(mod_hidden)
function modifier_custom_bristleback_quill_spray_tracker:RemoveOnDeath()
	return false
end
function modifier_custom_bristleback_quill_spray_tracker:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.spray_ability = self.ability

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.quill_base_damage = self.ability:GetSpecialValueFor("quill_base_damage")
	self.ability.quill_stack_damage = self.ability:GetSpecialValueFor("quill_stack_damage")
	self.ability.quill_stack_duration = self.ability:GetSpecialValueFor("quill_stack_duration")
	self.ability.max_damage = self.ability:GetSpecialValueFor("max_damage")
	self.ability.projectile_speed = self.ability:GetSpecialValueFor("projectile_speed")
end

function modifier_custom_bristleback_quill_spray_tracker:OnRefresh()
	self.ability.quill_base_damage = self.ability:GetSpecialValueFor("quill_base_damage")
end

function modifier_custom_bristleback_quill_spray_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.parent:HasModifier("modifier_custom_bristleback_quill_spray_autocast") then
		self:StartIntervalThink(-1)
		return
	end

	if
		self.parent:IsAlive()
		and not self.parent:IsSilenced()
		and not self.parent:IsFeared()
		and not self.parent:IsChanneling()
		and not self.parent:IsStunned()
		and not self.parent:IsHexed()
		and self.ability:IsFullyCastable()
	then
		self.ability:OnSpellStart()
		self.ability:UseResources(true, true, false, true)
		if dota1x6.event_thinker then
			local mod = dota1x6.event_thinker:FindModifierByName("modifier_event_thinker")
			if mod then
				local data = {
					unit = self.parent,
					ability = self.ability,
					new_pos = Vector(0, 0, 0),
				}
				mod:OnAbilityExecuted(data)
			end
		end
	end

	self:StartIntervalThink(0.1)
end

modifier_custom_bristleback_quill_spray_autocast = class(mod_hidden)
function modifier_custom_bristleback_quill_spray_autocast:RemoveOnDeath()
	return false
end
function modifier_custom_bristleback_quill_spray_autocast:OnCreated()
	self.parent = self:GetParent()
	if not IsServer() then
		return
	end
	self.mod = self.parent:FindModifierByName("modifier_custom_bristleback_quill_spray_tracker")
	if self.mod then
		self.mod:OnIntervalThink()
	end
end

modifier_custom_bristleback_quill_spray_double = class(mod_hidden)
function modifier_custom_bristleback_quill_spray_double:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_custom_bristleback_quill_spray_double:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.min = self.ability.talents.w3_min
	self.count = self.min

	for i = self.min, (self.ability.talents.w3_max - self.min) do
		local index = 8001 + i
		if RollPseudoRandomPercentage(self.ability.talents.w3_chance_inc, index, self.parent) then
			self.count = self.count + 1
		end
	end

	local effect_cast =
		ParticleManager:CreateParticle("particles/bristleback/spray_double.vpcf", PATTACH_OVERHEAD_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.count, 0, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	self:StartIntervalThink(self.ability.talents.w3_interval)
end

function modifier_custom_bristleback_quill_spray_double:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.ability:MakeSpray(nil, false, false, true)

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
	end
end