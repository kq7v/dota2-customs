--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_puck_coil_orb_flight", "abilities/puck/custom_puck_illusory_orb", LUA_MODIFIER_MOTION_BOTH)
LinkLuaModifier("modifier_puck_coil_orb_unit", "abilities/puck/custom_puck_illusory_orb", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_puck_coil_orb_tracker", "abilities/puck/custom_puck_illusory_orb", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_puck_coil_orb_custom_steal_jump",
	"abilities/puck/custom_puck_illusory_orb",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_puck_coil_orb_perma",
	"abilities/puck/custom_puck_illusory_orb",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_orb_1"
)
LinkLuaModifier(
	"modifier_puck_coil_orb_amp",
	"abilities/puck/custom_puck_illusory_orb",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_orb_3"
)
LinkLuaModifier(
	"modifier_puck_coil_orb_slow",
	"abilities/puck/custom_puck_illusory_orb",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_orb_4"
)

custom_puck_illusory_orb = class({})
custom_puck_illusory_orb.talents = {}

function custom_puck_illusory_orb:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_puck/puck_illusory_orb_tracking_projectile.vpcf", context)
	PrecacheResource("particle", "particles/puck/orb_legendary.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_puck/puck_waning_rift.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_puck/puck_illusory_orb_explode.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_puck/puck_orb_damage.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_puck/puck_orb_curve_path_prediction_preview.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_puck/puck_illusory_orb_blink_out.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_shield_active.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_magic_stack.vpcf", context)
	PrecacheResource("particle", "particles/puck/puck_orb_slow.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/outworld_devourer/od_shards_exile/od_shards_exile_prison_end.vpcf",
		context
	)
end

function custom_puck_illusory_orb:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q7 = 0,
			q7_bonus = caster:GetTalentValue("modifier_puck_orb_7", "bonus", true) / 100,
			q7_charge = caster:GetTalentValue("modifier_puck_orb_7", "charge", true),
			q7_cd = caster:GetTalentValue("modifier_puck_orb_7", "cd", true),

			has_h4 = 0,

			has_q1 = 0,
			q1_spell = 0,
			q1_damage = 0,
			q1_max = caster:GetTalentValue("modifier_puck_orb_1", "max", true),

			has_q2 = 0,
			q2_heal = 0,
			q2_health = 0,

			has_q3 = 0,
			q3_cd = 0,
			q3_damage = 0,
			q3_max = caster:GetTalentValue("modifier_puck_orb_3", "max", true),
			q3_duration = caster:GetTalentValue("modifier_puck_orb_3", "duration", true),

			has_q4 = 0,
			q4_slow = caster:GetTalentValue("modifier_puck_orb_4", "slow", true),
			q4_duration = caster:GetTalentValue("modifier_puck_orb_4", "duration", true),
			q4_interval = caster:GetTalentValue("modifier_puck_orb_4", "interval", true),
			q4_stun = caster:GetTalentValue("modifier_puck_orb_4", "stun", true),

			w2_range = 0,

			has_w7 = 0,

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_puck_orb_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_puck_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_puck_orb_1") then
		self.talents.has_q1 = 1
		self.talents.q1_spell = caster:GetTalentValue("modifier_puck_orb_1", "spell")
		self.talents.q1_damage = caster:GetTalentValue("modifier_puck_orb_1", "damage")
	end

	if caster:HasTalent("modifier_puck_orb_2") then
		local health = self.talents.q2_health
		self.talents.has_q2 = 1
		self.talents.q2_heal = caster:GetTalentValue("modifier_puck_orb_2", "heal") / 100
		self.talents.q2_health = caster:GetTalentValue("modifier_puck_orb_2", "health") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_puck_orb_2", type = 1, value = self.talents.q2_heal })
		if IsServer() and health ~= self.talents.q2_health then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_puck_orb_3") then
		self.talents.has_q3 = 1
		self.talents.q3_cd = caster:GetTalentValue("modifier_puck_orb_3", "cd")
		self.talents.q3_damage = caster:GetTalentValue("modifier_puck_orb_3", "damage")
	end

	if caster:HasTalent("modifier_puck_orb_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_puck_rift_2") then
		self.talents.w2_range = caster:GetTalentValue("modifier_puck_rift_2", "range")
	end

	if caster:HasTalent("modifier_puck_rift_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_puck_shift_7") then
		self.talents.has_e7 = 1
	end
end

function custom_puck_illusory_orb:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_puck_coil_orb_tracker"
end

function custom_puck_illusory_orb:GetManaCost(level)
	if self.caster:HasModifier("modifier_puck_coil_orb_custom_steal_jump") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function custom_puck_illusory_orb:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel)
		+ (self.talents.q3_cd or 0)
		+ (self.talents.has_q7 == 1 and self.talents.q7_cd or 0)
end

function custom_puck_illusory_orb:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_puck_coil_orb_custom_steal_jump") then
		return "puck_ethereal_jaunt"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "puck_illusory_orb", self)
end

function custom_puck_illusory_orb:GetBehavior()
	if self.caster:HasModifier("modifier_puck_coil_orb_custom_steal_jump") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
	end
	local behavior = DOTA_ABILITY_BEHAVIOR_POINT
		+ DOTA_ABILITY_BEHAVIOR_ALT_CASTABLE_CUSTOM
		+ (self.talents.has_h4 == 1 and DOTA_ABILITY_BEHAVIOR_IMMEDIATE or 0)
	if self.tracker and self.tracker:GetStackCount() == 1 then
		return behavior
	end
	return behavior + DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING
end

function custom_puck_illusory_orb:GetCastAnimation()
	if self.talents.has_h4 == 1 then
		return 0
	end
	return ACT_DOTA_CAST_ABILITY_1
end

function custom_puck_illusory_orb:GetCursor(point, data)
	local direction = Vector(data.end_x - data.start_x, data.end_y - data.start_y, 0)
	if direction:Length2D() >= 0.1 then
		direction = direction:Normalized()
	end
	self.preview = {
		origin = point,
		start = Vector(data.start_x, data.start_y, 0),
		direction = direction,
		time = GameRules:GetGameTime(),
	}
	self:LaunchOrb()
end

function custom_puck_illusory_orb:OnSpellStart()
	local point = self:GetCursorPosition()
	self:OnVectorCastStart(point, (point - self.caster:GetAbsOrigin()):Normalized())
end

function custom_puck_illusory_orb:OnVectorCastStart(vStartLocation, vDirection)
	if self.caster:HasModifier("modifier_puck_coil_orb_custom_steal_jump") then
		if self.caster:CanBlink() then
			self:Teleport()
		end
		return
	end

	if bit.band(self:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING) == 0 then
		vStartLocation = self:GetCursorPosition()
		vDirection = (vStartLocation - self.caster:GetAbsOrigin()):Normalized()
	end

	if not IsValid(self.jaunt_ability) then
		self.caster:AddNewModifier(self.caster, self, "modifier_puck_coil_orb_custom_steal_jump", {})
	end

	if self.talents.has_h4 == 1 then
		self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_1)
	end

	local straight = self:ShouldAltCast()
	if IsValid(self.tracker) then
		self.tracker:SetStackCount(straight and 1 or 0)
	end

	self.pending = { start = vStartLocation, direction = vDirection, straight = straight }

	if straight or self:GetPreview(self.caster:GetAbsOrigin(), vStartLocation) then
		self:LaunchOrb()
		return
	end

	Timers:CreateTimer(0.1, function()
		if not IsValid(self) then
			return
		end
		self:LaunchOrb()
	end)
end

function custom_puck_illusory_orb:LaunchOrb()
	local pending = self.pending
	if not pending then
		return
	end
	self.pending = nil

	local origin = self.caster:GetAbsOrigin()
	local start = pending.start
	local direction = pending.direction
	local preview = not pending.straight and self:GetPreview(origin, start)
	self.preview = nil

	if preview then
		origin = preview.origin
		start = preview.start
		direction = preview.direction
	end

	local aim = start - origin
	aim.z = 0

	local length = aim:Length2D()
	local forward = self.caster:GetForwardVector()
	if length < 0.1 then
		length = 0.1
	else
		forward = aim:Normalized()
	end
	forward.z = 0

	local velocity = forward * self.orb_speed
	local accel = Vector(0, 0, 0)

	if not pending.straight then
		if direction:Length2D() < 0.1 then
			direction = forward
		end

		local cos = math.max(-0.9999, math.min(1, forward:Dot(direction)))
		local side_dir = Vector(forward.y, -forward.x, 0)
		if direction.x * forward.y - direction.y * forward.x < 0 then
			side_dir = side_dir * -1
		end

		local side = 1
		local back = 0
		if cos <= 0 then
			side = math.sqrt(1 - cos * cos)
			back = -cos
		end

		local strength = math.max(0, math.min(0.9, self.curve_strength))
		if side < 0.2 then
			strength = 0.5 + (strength - 0.5) * side / 0.2
		end

		local angle = math.acos(math.abs(cos)) * strength
		local speed = self.orb_speed * (1 + self.curve_orb_pullback_bonus_launch_speed * back)
		local power = math.min(
			self.curve_orb_max_acceleration,
			2 * math.sin(angle) * (math.cos(angle) * side - math.sin(angle) * back) / (length * side * side)
		)

		velocity = (forward * math.cos(angle) - side_dir * math.sin(angle)) * speed
		accel = (side_dir * side - forward * back) * power * speed * speed
	end

	local dot = forward:Dot(accel)
	local thinker = CreateUnitByName(
		"npc_dota_companion",
		origin,
		false,
		self.caster,
		self.caster:GetOwner(),
		self.caster:GetTeamNumber()
	)
	thinker:AddNewModifier(self.caster, self, "modifier_puck_coil_orb_unit", {})
	thinker:AddNewModifier(
		self.caster,
		self,
		"modifier_puck_coil_orb_flight",
		{
			curve = pending.straight and 0 or 1,
			vx = velocity.x,
			vy = velocity.y,
			ax = accel.x,
			ay = accel.y,
			tx = -forward.y * dot,
			ty = forward.x * dot,
			tz = forward.x * accel.y - forward.y * accel.x,
		}
	)
	self.caster:LogProc("custom_puck_illusory_orb", pending.straight and 0 or 1)
end

function custom_puck_illusory_orb:GetPreview(origin, start)
	local preview = self.preview
	if not preview then
		return
	end
	if GameRules:GetGameTime() - preview.time > 3 then
		return
	end
	if (preview.origin - origin):Length2D() > 150 then
		return
	end
	if (preview.start - start):Length2D() > 300 then
		return
	end
	return preview
end

function custom_puck_illusory_orb:HideBarrier()
	if not self:IsTrained() then
		return
	end
	if not IsValid(self.barrier_ability) then
		return
	end
	if not self:IsHidden() then
		return
	end
	self.caster:SwapAbilities("custom_puck_illusory_barrier", "custom_puck_illusory_orb", false, true)
end

function custom_puck_illusory_orb:Teleport()
	local mod = self.orb_mod
	if not IsValid(mod) then
		return
	end

	self.caster:EmitSound("Hero_Puck.EtherealJaunt")

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_puck/puck_illusory_orb_blink_out.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin() + Vector(0, 0, 150))
	ParticleManager:ReleaseParticleIndex(particle)

	self.caster:Teleport(mod.parent:GetAbsOrigin(), true)

	if IsValid(self.caster.innate_ability) then
		self.caster.innate_ability:ProcSpeed()
	end

	if self.caster:HasShard() and mod.health > self.caster:GetHealth() then
		self.caster:GenericHeal((mod.health - self.caster:GetHealth()) * self.shard_heal, self, false, nil, "Shard")
	end

	mod:Destroy()
end

function custom_puck_illusory_orb:ProcHit(target, source)
	if not self:IsTrained() then
		return
	end

	if self.talents.has_q3 == 1 then
		target:AddNewModifier(self.caster, self, "modifier_puck_coil_orb_amp", { duration = self.talents.q3_duration })
	end

	if self.talents.has_q4 == 0 then
		return
	end
	target:AddNewModifier(self.caster, self, "modifier_puck_coil_orb_slow", { duration = self.talents.q4_duration })

	local mark = source == self and "puck_q4_orb" or "puck_q4_rift"
	local other = source == self and "puck_q4_rift" or "puck_q4_orb"
	if not target:HasCd(other, self.talents.q4_interval) then
		target:StartCd(mark)
		return
	end

	target:RemoveCd(other)
	target:EmitSound("Puck.Shift_Stun")
	target:GenericParticle("particles/econ/items/outworld_devourer/od_shards_exile/od_shards_exile_prison_end.vpcf")
	target:ApplyStun(self, false, self.caster, self.talents.q4_stun)
end

custom_puck_ethereal_jaunt = class({})

function custom_puck_ethereal_jaunt:ProcsMagicStick()
	return false
end

function custom_puck_ethereal_jaunt:OnUpgrade()
	self:SetActivated(false)
end

function custom_puck_ethereal_jaunt:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE
		+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
		+ DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
end

function custom_puck_ethereal_jaunt:OnSpellStart()
	if not self.caster:CanBlink() then
		return
	end
	if not IsValid(self.caster.orb_ability) then
		return
	end

	self.caster.orb_ability:Teleport()

	if IsValid(self.caster.coil_ability) then
		self.caster.coil_ability:ProcVolley(self)
	end

	if self.caster:GetName() == "npc_dota_hero_puck" then
		self.caster:EmitSound("puck_puck_ability_orb_0" .. RandomInt(1, 3))
	end
end

custom_puck_illusory_barrier = class({})

function custom_puck_illusory_barrier:GetCursor(point, data)
	self.cursor = point
	self.from = Vector(data.from_x, data.from_y, 0)
end

function custom_puck_illusory_barrier:OnSpellStart()
	local orb = self.caster.orb_ability
	if not IsValid(orb) then
		return
	end

	orb:HideBarrier()
	local mod = orb.orb_mod
	if not IsValid(mod) then
		return
	end

	local point = self:GetCursorPosition()
	local direction = point - mod.position
	if self.cursor and (self.cursor - point):Length2D() <= 100 then
		direction = self.cursor - self.from
	end
	self.cursor = nil
	direction.z = 0
	if direction:Length2D() < 1 then
		direction = self.caster:GetForwardVector()
	end

	mod:Shoot(direction)
end

modifier_puck_coil_orb_tracker = class(mod_hidden)
function modifier_puck_coil_orb_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.orb_ability = self.ability
	self.ability.jaunt_ability = self.parent:FindAbilityByName("custom_puck_ethereal_jaunt")
	self.ability.barrier_ability = self.parent:FindAbilityByName("custom_puck_illusory_barrier")

	if IsServer() and IsValid(self.ability.barrier_ability) and not self.ability.barrier_ability:IsTrained() then
		self.ability.barrier_ability:SetLevel(1)
	end

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.max_distance = self.ability:GetSpecialValueFor("max_distance")
	self.ability.orb_speed = self.ability:GetSpecialValueFor("orb_speed")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.orb_vision = self.ability:GetSpecialValueFor("orb_vision")
	self.ability.vision_duration = self.ability:GetSpecialValueFor("vision_duration")
	self.ability.curve_strength = self.ability:GetSpecialValueFor("curve_strength")
	self.ability.curve_orb_max_acceleration = self.ability:GetSpecialValueFor("curve_orb_max_acceleration")
	self.ability.curve_orb_pullback_bonus_launch_speed =
		self.ability:GetSpecialValueFor("curve_orb_pullback_bonus_launch_speed")
	self.ability.curve_orb_duration_multiplier = self.ability:GetSpecialValueFor("curve_orb_duration_multiplier") / 100
	self.ability.curve_speed_max = self.ability:GetSpecialValueFor("curve_speed_max") / 100
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.shard_speed = self.ability:GetSpecialValueFor("shard_speed") / 100
	self.ability.shard_duration = self.ability:GetSpecialValueFor("shard_duration")
	self.ability.shard_heal = self.ability:GetSpecialValueFor("shard_heal") / 100

	if not IsServer() then
		return
	end
	self.parent:AddOrderEvent(self)
end

function modifier_puck_coil_orb_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_puck_coil_orb_tracker:OrderEvent(params)
	if not IsServer() then
		return
	end
	if params.order_type ~= DOTA_UNIT_ORDER_CAST_TOGGLE_ALT then
		return
	end
	if params.ability ~= self.ability then
		return
	end

	Timers:CreateTimer(FrameTime(), function()
		if not IsValid(self) then
			return
		end
		self:SetStackCount(self.ability:GetAltCastState() and 1 or 0)
	end)
end

function modifier_puck_coil_orb_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_puck_coil_orb_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.q1_spell
end

function modifier_puck_coil_orb_tracker:GetModifierHealthBonus()
	if self.ability.talents.has_q2 == 0 then
		return
	end
	return self.parent:GetMaxMana() * self.ability.talents.q2_health
end

modifier_puck_coil_orb_flight = class(mod_hidden)
function modifier_puck_coil_orb_flight:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.ability.orb_mod = self

	self.damage_type = self.ability:GetAbilityDamageType()
	self.curve = params.curve == 1
	self.length = self.ability.max_distance + self.ability.talents.w2_range
	self.speed = self.ability.orb_speed
	self.speed_k = 1 + (self.caster:HasShard() and self.ability.shard_speed or 0)
	self.health = self.caster:GetHealth()
	self.bonus = 1
	self.duration = self.length / self.speed * (1 + self.ability.curve_orb_duration_multiplier)
	self.height = Vector(0, 0, 120)
	self.position = self.parent:GetAbsOrigin()
	self:Launch(
		Vector(params.vx, params.vy, 0),
		Vector(params.ax, params.ay, 0),
		Vector(params.tx, params.ty, params.tz)
	)

	if self.ability.talents.has_q7 == 1 then
		self.parent:EmitSound("Puck.Orb_Legendary_charge")
		self:OnIntervalThink()
		self:StartIntervalThink(0.1)

		if IsValid(self.ability.barrier_ability) and self.ability.barrier_ability:IsHidden() then
			self.caster:SwapAbilities("custom_puck_illusory_orb", "custom_puck_illusory_barrier", false, true)
			CustomGameEventManager:Send_ServerToPlayer(
				PlayerResource:GetPlayer(self.caster:GetPlayerOwnerID()),
				"ability_puck_orb",
				{ unit = self.parent:entindex() }
			)
		end
	end

	if IsValid(self.ability.jaunt_ability) then
		self.ability.jaunt_ability:SetActivated(true)
		self.ability:EndCd()
	end

	if self:ApplyHorizontalMotionController() == false or self:ApplyVerticalMotionController() == false then
		self:Destroy()
	end
end

function modifier_puck_coil_orb_flight:Launch(velocity, accel, twist)
	self.origin = self.position
	self.point = GetGroundPosition(self.position, nil)
	self.traveled = 0
	self.clock = 0
	self.path = { self.origin }
	self.distances = { 0 }
	self.hit = {}

	if self.particle then
		ParticleManager:DestroyParticle(self.particle, false)
	end

	local effect = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_puck/puck_illusory_orb_tracking_projectile.vpcf",
		self.ability
	)
	if self.legendary and effect == "particles/units/heroes/hero_puck/puck_illusory_orb_tracking_projectile.vpcf" then
		effect = "particles/puck/orb_legendary.vpcf"
	end

	self.particle = self.parent:GenericParticle(effect, self)
	ParticleManager:SetParticleControl(self.particle, 1, self.origin)
	ParticleManager:SetParticleControl(self.particle, 2, twist)

	self.parent:StopSound("Puck.Orb")
	self.parent:EmitSound(self.legendary and "Puck.Orb_Legendary" or "Puck.Orb")

	if self.preview then
		ParticleManager:DestroyParticle(self.preview, true)
	end

	local path = self.path
	local position = self.origin
	local time = 0
	local traveled = 0
	local interval = FrameTime()
	for i = 1, 1000 do
		velocity = velocity + accel * interval
		local length = velocity:Length2D()
		if velocity:Dot(accel) > 0 and length > self.speed then
			velocity = velocity * (self.speed / length)
		end

		position = position + velocity * interval
		time = time + interval
		traveled = traveled + velocity:Length2D() * interval
		table.insert(path, position)
		table.insert(self.distances, traveled)
		if self.curve and traveled >= self.length then
			break
		end
		if not self.curve and (time >= self.duration or (position - self.origin):Length2D() > self.length) then
			break
		end
	end
	self.interval = interval
	self.flight_time = time
	self.rate = traveled > 0 and math.min(self.ability.curve_speed_max, time * self.speed / traveled) or 1

	local points = 15
	self.preview = ParticleManager:CreateParticleForTeam(
		"particles/units/heroes/hero_puck/puck_orb_curve_path_prediction_preview.vpcf",
		PATTACH_WORLDORIGIN,
		nil,
		self.caster:GetTeamNumber()
	)
	ParticleManager:SetParticleControl(self.preview, 1, Vector(points, 1, 0))
	for i = 0, points - 1 do
		local index = i * (#path - 1) / (points - 1)
		local low = math.floor(index)
		local high = math.min(#path - 1, low + 1)
		ParticleManager:SetParticleControl(
			self.preview,
			10 + i,
			path[low + 1] + (path[high + 1] - path[low + 1]) * (index - low)
		)
	end
	self:AddParticle(self.preview, false, false, -1, false, false)
end

function modifier_puck_coil_orb_flight:Shoot(direction)
	self:StartIntervalThink(-1)
	self.parent:StopSound("Puck.Orb_Legendary_charge")
	self:UpdateUI(true)

	if self.hover then
		self.hover = nil
		self:SetDuration(-1, true)
	end

	self.caster:LogProc("modifier_puck_orb_7", self:GetCharge() * 100)
	self.legendary = true
	self.curve = false
	self.bonus = 1 + self:GetCharge() * self.ability.talents.q7_bonus
	self.speed = self.ability.orb_speed * self.bonus
	self.duration = self.length / self.speed
	self.damage_source = "modifier_puck_orb_7"

	self.parent:EmitSound("Puck.Orb_Legendary_shot")

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_puck/puck_waning_rift.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, self.point)
	ParticleManager:SetParticleControl(particle, 1, Vector(self.ability.radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)

	self:Launch(direction:Normalized() * self.speed, Vector(0, 0, 0), Vector(0, 0, 0))
end

function modifier_puck_coil_orb_flight:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:UpdateUI()
	if self:GetCharge() < 1 then
		return
	end
	self:StartIntervalThink(-1)
end

function modifier_puck_coil_orb_flight:UpdateUI(hide)
	if hide then
		self.caster:UpdateUIshort({ hide = 1, priority = 2, style = "PuckOrb" })
		return
	end

	local charge = self:GetCharge()
	self.caster:UpdateUIshort({
		max_time = 1,
		time = charge,
		stack = tostring(math.floor(charge * 100)) .. "%",
		priority = 2,
		style = "PuckOrb",
	})
end

function modifier_puck_coil_orb_flight:GetCharge()
	return math.min(1, self.traveled / self.ability.talents.q7_charge)
end

function modifier_puck_coil_orb_flight:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	if not self.hover then
		self.clock = math.min(self.flight_time, self.clock + dt * self.rate * self.speed_k)

		local index = self.clock / self.interval
		local low = math.min(#self.path - 2, math.floor(index))
		local fraction = index - low
		self.position = self.path[low + 1] + (self.path[low + 2] - self.path[low + 1]) * fraction
		self.traveled = self.distances[low + 1] + (self.distances[low + 2] - self.distances[low + 1]) * fraction
		self.point = GetGroundPosition(self.position, nil)
		me:SetAbsOrigin(self.point)

		if not self.vision_point or (self.position - self.vision_point):Length2D() >= self.ability.orb_vision / 2 then
			self.vision_point = self.position
			self.ability:CreateVisibilityNode(self.position, self.ability.orb_vision, self.ability.vision_duration)
		end
	end

	for _, enemy in pairs(self.caster:FindTargets(self.ability.radius, self.position)) do
		if not self.hit[enemy] then
			self.hit[enemy] = true
			if enemy:IsRealHero() then
				self.caster:AddNewModifier(self.caster, self.ability, "modifier_puck_coil_orb_perma", {})
				if
					self.caster:GetQuest() == "Puck.Quest_5"
					and (enemy:GetAbsOrigin() - self.origin):Length2D() > self.caster.quest.number
				then
					self.caster:UpdateQuest(1)
				end
			end

			local damage = self.ability.damage
			if IsValid(self.ability.perma) then
				damage = damage + self.ability.perma:GetDamage()
			end

			enemy:EmitSound("Hero_Puck.IIllusory_Orb_Damage")
			local real_damage = DoDamage(
				{
					victim = enemy,
					damage = damage * self.bonus,
					damage_type = self.damage_type,
					attacker = self.caster,
					ability = self.ability,
				},
				self.damage_source
			)
			self.ability:ProcHit(enemy, self.ability)

			if IsValid(self.caster.innate_ability) then
				self.caster.innate_ability:ProcHealReduce(enemy)
			end

			if self.legendary then
				self.caster:LogProc("modifier_puck_orb_7_hit", nil, enemy)
				enemy:EmitSound("Puck.Orb_Legendary_damage")
				enemy:SendNumber(116, real_damage)
				enemy:GenericParticle("particles/units/heroes/hero_puck/puck_orb_damage.vpcf")

				local particle = ParticleManager:CreateParticle(
					"particles/units/heroes/hero_puck/puck_illusory_orb_explode.vpcf",
					PATTACH_CUSTOMORIGIN,
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
				ParticleManager:SetParticleControlEnt(
					particle,
					3,
					enemy,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					enemy:GetAbsOrigin(),
					true
				)
				ParticleManager:ReleaseParticleIndex(particle)
			end
		end
	end

	if self.hover then
		return
	end
	if self.clock < self.flight_time then
		return
	end
	if self.caster:HasShard() and not self.legendary then
		self.hover = true
		self.ability:CreateVisibilityNode(self.position, self.ability.orb_vision, self.ability.vision_duration)
		self:SetDuration(self.ability.shard_duration, true)
		return
	end

	self:Destroy()
end

function modifier_puck_coil_orb_flight:UpdateVerticalMotion(me, dt)
	if not IsServer() then
		return
	end
	me:SetAbsOrigin(self.point + self.height)
end

function modifier_puck_coil_orb_flight:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_puck_coil_orb_flight:OnVerticalMotionInterrupted()
	self:Destroy()
end

function modifier_puck_coil_orb_flight:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability.orb_mod = nil
	self.parent:StopSound("Puck.Orb")
	self.parent:StopSound("Puck.Orb_Legendary")
	self.parent:StopSound("Puck.Orb_Legendary_charge")

	if self.ability.talents.has_q7 == 1 and not self.legendary then
		self:UpdateUI(true)
	end

	local parent = self.parent
	Timers:CreateTimer(0.5, function()
		if IsValid(parent) then
			UTIL_Remove(parent)
		end
	end)

	self.caster:RemoveModifierByName("modifier_puck_coil_orb_custom_steal_jump")
	self.ability:HideBarrier()

	if not IsValid(self.ability.jaunt_ability) then
		return
	end
	self.ability.jaunt_ability:SetActivated(false)
	self.ability:StartCd()
end

modifier_puck_coil_orb_unit = class(mod_hidden)
function modifier_puck_coil_orb_unit:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

modifier_puck_coil_orb_perma = class(mod_visible)
function modifier_puck_coil_orb_perma:IsHidden()
	return self.ability.talents.has_q1 == 0 or self:GetStackCount() >= self.max
end
function modifier_puck_coil_orb_perma:RemoveOnDeath()
	return false
end
function modifier_puck_coil_orb_perma:GetTexture()
	return "buffs/puck/orb_1"
end
function modifier_puck_coil_orb_perma:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.perma = self
	self.max = self.ability.talents.q1_max

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
	self:OnRefresh()
end

function modifier_puck_coil_orb_perma:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_puck_coil_orb_perma:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q1 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/crystal_maiden/maiden_shield_active.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_puck_coil_orb_perma:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_puck_coil_orb_perma:GetDamage()
	return self.ability.talents.q1_damage * self:GetStackCount() / self.max
end

function modifier_puck_coil_orb_perma:OnTooltip()
	return self:GetDamage()
end

modifier_puck_coil_orb_amp = class(mod_visible)
function modifier_puck_coil_orb_amp:GetTexture()
	return "buffs/puck/orb_3"
end
function modifier_puck_coil_orb_amp:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.q3_damage
	self.max = self.ability.talents.q3_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.spells = {
		["custom_puck_illusory_orb"] = true,
		["custom_puck_waning_rift"] = true,
		["custom_puck_dream_coil"] = true,
	}

	if self.ability.talents.has_w7 == 0 and self.ability.talents.has_e7 == 0 then
		self.particle = self.parent:GenericParticle("particles/puck/rift_magic_stack.vpcf", self, true)
	end

	self:OnRefresh()
end

function modifier_puck_coil_orb_amp:OnRefresh()
	self.damage = self.ability.talents.q3_damage
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
	if not self.particle then
		return
	end

	local stack = self:GetStackCount()
	local double = math.floor(stack / 10)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(double, stack, stack - double * 10))
end

function modifier_puck_coil_orb_amp:OnDestroy()
	if not IsServer() then
		return
	end
	if self.parent:IsAlive() then
		return
	end
	self.caster:LogProc("modifier_puck_orb_3", self:GetStackCount(), self.parent)
end

function modifier_puck_coil_orb_amp:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_puck_coil_orb_amp:GetModifierIncomingDamage_Percentage(params)
	if not IsServer() then
		return
	end
	if params.attacker ~= self.caster then
		return
	end
	if not params.inflictor then
		return
	end
	if not self.spells[params.inflictor:GetName()] then
		return
	end

	return self:OnTooltip()
end

function modifier_puck_coil_orb_amp:OnTooltip()
	return self.damage * self:GetStackCount()
end

modifier_puck_coil_orb_slow = class(mod_hidden)
function modifier_puck_coil_orb_slow:IsPurgable()
	return true
end
function modifier_puck_coil_orb_slow:GetEffectName()
	return "particles/puck/puck_orb_slow.vpcf"
end
function modifier_puck_coil_orb_slow:OnCreated()
	self.ability = self:GetAbility()
	self.slow = self.ability.talents.q4_slow
end

function modifier_puck_coil_orb_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_puck_coil_orb_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_puck_coil_orb_custom_steal_jump = class(mod_hidden)
function modifier_puck_coil_orb_custom_steal_jump:RemoveOnDeath()
	return false
end
function modifier_puck_coil_orb_custom_steal_jump:OnCreated()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.ability:EndCd(0.2)
end

function modifier_puck_coil_orb_custom_steal_jump:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
end