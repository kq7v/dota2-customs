--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_marci_companion_run_custom",
	"abilities/marci/marci_companion_run_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_marci_companion_run_custom_tracker",
	"abilities/marci/marci_companion_run_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_companion_run_custom_heal_reduce",
	"abilities/marci/marci_companion_run_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_marci_rebound_2"
)
LinkLuaModifier(
	"modifier_marci_companion_run_custom_damage",
	"abilities/marci/marci_companion_run_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_companion_run_custom_no_damage",
	"abilities/marci/marci_companion_run_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_companion_run_custom_legendary_magic",
	"abilities/marci/marci_companion_run_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_marci_rebound_7"
)

marci_companion_run_custom = class({})
marci_companion_run_custom.talents = {}

function marci_companion_run_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "marci_companion_run", self)
end

function marci_companion_run_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_bounce_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_charge_projectile.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_bounce.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_landing_zone.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/blink_overwhelming_burst.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_pulse.vpcf", context)
	PrecacheResource("particle", "particles/alchemist/alch_stun_legendary.vpcf", context)
	PrecacheResource("particle", "particles/marci/rebound_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_attack.vpcf", context)
	PrecacheResource("particle", "particles/ui_mouseactions/range_finder_generic_aoe_nocenter.vpcf", context)
	PrecacheResource("particle", "particles/ui_mouseactions/range_finder_line_moving_dash.vpcf", context)
end

function marci_companion_run_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_damage = 0,
			w1_spell = 0,

			has_w2 = 0,
			w2_heal_reduce = 0,
			w2_cd = 0,
			w2_duration = caster:GetTalentValue("modifier_marci_rebound_2", "duration", true),

			has_w3 = 0,
			w3_damage = 0,
			w3_min = caster:GetTalentValue("modifier_marci_rebound_3", "min", true),
			w3_max = caster:GetTalentValue("modifier_marci_rebound_3", "max", true),
			w3_chance = caster:GetTalentValue("modifier_marci_rebound_3", "chance", true),
			w3_interval = caster:GetTalentValue("modifier_marci_rebound_3", "interval", true),
			w3_chance_inc = caster:GetTalentValue("modifier_marci_rebound_3", "chance_inc", true),

			has_w4 = 0,
			w4_range = caster:GetTalentValue("modifier_marci_rebound_4", "range", true),

			has_w7 = 0,
			w7_max = caster:GetTalentValue("modifier_marci_rebound_7", "max", true),
			w7_stun = caster:GetTalentValue("modifier_marci_rebound_7", "stun", true) / 100,
			w7_duration = caster:GetTalentValue("modifier_marci_rebound_7", "duration", true),
			w7_cd_inc = caster:GetTalentValue("modifier_marci_rebound_7", "cd_inc", true) / 100,
			w7_magic = caster:GetTalentValue("modifier_marci_rebound_7", "magic", true),
			w7_distance = caster:GetTalentValue("modifier_marci_rebound_7", "distance", true),

			has_h5 = 0,
			h5_stun = caster:GetTalentValue("modifier_marci_hero_5", "stun", true),
			h5_speed = caster:GetTalentValue("modifier_marci_hero_5", "speed", true) / 100,
		}
	end

	if caster:HasTalent("modifier_marci_rebound_1") then
		self.talents.w1_damage = caster:GetTalentValue("modifier_marci_rebound_1", "damage")
		self.talents.w1_spell = caster:GetTalentValue("modifier_marci_rebound_1", "spell")
	end

	if caster:HasTalent("modifier_marci_rebound_2") then
		self.talents.has_w2 = 1
		self.talents.w2_heal_reduce = caster:GetTalentValue("modifier_marci_rebound_2", "heal_reduce")
		self.talents.w2_cd = caster:GetTalentValue("modifier_marci_rebound_2", "cd")
	end

	if caster:HasTalent("modifier_marci_rebound_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_marci_rebound_3", "damage") / 100
	end

	if caster:HasTalent("modifier_marci_rebound_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_marci_rebound_7") then
		self.talents.has_w7 = 1
		if IsServer() and not self.w7_init then
			self.w7_init = true
			self.tracker:InitLegendary()
		end
	end

	if caster:HasTalent("modifier_marci_hero_5") then
		self.talents.has_h5 = 1
	end
end

function marci_companion_run_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_marci_companion_run_custom_tracker"
end

function marci_companion_run_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w2_cd or 0)
end

function marci_companion_run_custom:GetCustomCastErrorTarget()
	return "#dota_hud_error_cant_cast_on_self"
end

function marci_companion_run_custom:GetDamage()
	return self.impact_damage
end

function marci_companion_run_custom:CastFilterResultTarget(hTarget)
	if self.caster == hTarget then
		return UF_FAIL_CUSTOM
	end

	local nResult = UnitFilter(
		hTarget,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_CREEP,
		DOTA_UNIT_TARGET_FLAG_NONE,
		self.caster:GetTeamNumber()
	)
	if nResult ~= UF_SUCCESS then
		return nResult
	end

	self.targetcast = hTarget
	return UF_SUCCESS
end

function marci_companion_run_custom:OnVectorCastStart(vStartLocation, vDirection)
	local target = self.targetcast

	if not IsValid(target) then
		return
	end

	if
		target:GetTeamNumber() ~= self.caster:GetTeamNumber()
		and self.talents.has_h5 == 0
		and target:TriggerSpellAbsorb(self)
	then
		return
	end

	local speed = self.move_speed
	if self.talents.has_h5 == 1 then
		speed = speed * (1 + self.talents.h5_speed)
	end

	local info = {
		Target = target,
		Source = self.caster,
		Ability = self,
		iMoveSpeed = speed,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_HITLOCATION,
		bDodgeable = false,
	}

	local proj = ProjectileManager:CreateTrackingProjectile(info)
	local point = self.vectorTargetPosition2
	local point_check = target:GetAbsOrigin()

	self.caster:FacePoint(point_check)
	self.caster:RemoveGesture(ACT_DOTA_CAST_ABILITY_3)
	self.caster:RemoveGesture(ACT_DOTA_ATTACK)

	self.modifier = self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_marci_companion_run_custom",
		{ proj = tostring(proj), target = target:entindex(), point_x = point.x, point_y = point.y }
	)

	if not self.modifier then
		return
	end

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_marci/marci_rebound_charge_projectile.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(speed, 0, 0))
	self.modifier:AddParticle(effect_cast, false, false, -1, false, false)
end

function marci_companion_run_custom:OnProjectileHit(target, location)
	if not IsValid(self.modifier) then
		return
	end
	if not target then
		self.modifier.interrupted = true
	end
	self.modifier:Destroy()
end

function marci_companion_run_custom:DealDamage(forced_point)
	if not IsServer() then
		return
	end
	local point = self.caster:GetAbsOrigin()
	if forced_point then
		point = forced_point
	end

	local radius = self.landing_radius
	local stun = self.stun_duration + (self.talents.has_h5 == 1 and self.talents.h5_stun or 0)
	local damage = self.impact_damage + self.talents.w1_damage

	if self.talents.has_w7 == 1 then
		stun = stun * (1 + self.talents.w7_stun)
	end

	local damageTable = { attacker = self.caster, damage = damage, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }

	for _, enemy in pairs(self.caster:FindTargets(radius, point)) do
		if not enemy:HasModifier("modifier_marci_companion_run_custom_no_damage") then
			damageTable.victim = enemy
			damageTable.damage = damage
			DoDamage(damageTable)

			if enemy:IsRealHero() and self.caster:GetQuest() == "Marci.Quest_6" then
				self.caster:UpdateQuest(1)
			end
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_stunned",
				{ duration = (1 - enemy:GetStatusResistance()) * stun }
			)
			self:ApplyProc(enemy)

			if self.talents.has_w7 == 1 then
				enemy:AddNewModifier(
					self.caster,
					self,
					"modifier_marci_companion_run_custom_no_damage",
					{ duration = 1 }
				)
				enemy:AddNewModifier(
					self.caster,
					self,
					"modifier_marci_companion_run_custom_legendary_magic",
					{ duration = self.talents.w7_duration }
				)
			end
		end
	end

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_marci/marci_rebound_bounce_impact.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect_cast, 0, point)
	ParticleManager:SetParticleControl(effect_cast, 1, point)
	ParticleManager:SetParticleControl(effect_cast, 9, Vector(radius, radius, radius))
	ParticleManager:SetParticleControl(effect_cast, 10, point)
	ParticleManager:DestroyParticle(effect_cast, false)
	ParticleManager:ReleaseParticleIndex(effect_cast)

	EmitSoundOnLocationWithCaster(point, "Hero_Marci.Rebound.Impact", self.caster)
end

function marci_companion_run_custom:ApplyProc(target, is_innate)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end

	if self.talents.has_w3 == 1 and RollPseudoRandomPercentage(self.talents.w3_chance, 9230, self.parent) then
		target:AddNewModifier(self.caster, self, "modifier_marci_companion_run_custom_damage", {})
	end

	if is_innate then
		return
	end
	if self.talents.has_w2 == 0 then
		return
	end
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_marci_companion_run_custom_heal_reduce",
		{ duration = self.talents.w2_duration }
	)
end

modifier_marci_companion_run_custom = class(mod_hidden)
function modifier_marci_companion_run_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max_distance = self.ability.max_jump_distance
		+ (self.ability.talents.has_w4 == 1 and self.ability.talents.w4_range or 0)
	self.radius = self.ability.landing_radius

	if not IsServer() then
		return
	end

	self.parent.marci_jump_mod = self

	self.projectile = tonumber(kv.proj)
	self.target = EntIndexToHScript(kv.target)
	self.targetpos = self.target:GetOrigin()
	self.distancethreshold = 2000
	self.jump_duration = 0.5

	if not self:ApplyHorizontalMotionController() then
		self.interrupted = true
		self:Destroy()
		return
	end

	if self.ability.talents.has_h5 == 1 then
		self.bkb_mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_debuff_immune", {})
		self.jump_duration = self.jump_duration * (1 - self.ability.talents.h5_speed)
	end

	self.parent:EmitSound("Hero_Marci.Rebound.Cast")

	self.start_direction = self.targetpos - self.parent:GetAbsOrigin()

	self.vector_point = GetGroundPosition(Vector(kv.point_x, kv.point_y, 0), nil)
	self.vector_direction = self.vector_point - self.target:GetAbsOrigin()
	self.vector_distance = self.vector_direction:Length2D()

	if (self.targetpos - self.vector_point):Length2D() <= 50 then
		self.vector_direction = self.start_direction
	end

	self.vector_direction.z = 0
	self.vector_direction = self.vector_direction:Normalized()

	self.vector_distance = math.min(self.vector_distance, self.max_distance)

	local land_particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_marci/marci_rebound_landing_zone.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(land_particle, 0, self.targetpos + self.vector_distance * self.vector_direction)
	ParticleManager:SetParticleControl(land_particle, 1, Vector(self.radius, self.radius, self.radius))
	ParticleManager:ReleaseParticleIndex(land_particle)
end

function modifier_marci_companion_run_custom:UpdateHorizontalMotion(me, dt)
	if not IsValid(self.target) then
		self:Destroy()
		return
	end

	local target_pos = self.target:GetAbsOrigin()
	if (me:GetAbsOrigin() - target_pos):Length2D() > self.distancethreshold then
		self.interrupted = true
		self:Destroy()
		return
	end

	local pos = ProjectileManager:GetTrackingProjectileLocation(self.projectile)
	me:SetOrigin(GetGroundPosition(pos, nil))
	me:FaceTowards(target_pos)
end

function modifier_marci_companion_run_custom:OnHorizontalMotionInterrupted()
	self.interrupted = true
	self:Destroy()
end

function modifier_marci_companion_run_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_marci_companion_run_custom:GetOverrideAnimation()
	return ACT_DOTA_CAST_ABILITY_2_ALLY
end

function modifier_marci_companion_run_custom:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
	}
end

function modifier_marci_companion_run_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveHorizontalMotionController(self)

	if IsValid(self.bkb_mod) then
		self.bkb_mod:Destroy()
	end

	if self.interrupted then
		return
	end

	self.parent:FacePoint(self.parent:GetAbsOrigin() + self.vector_direction)

	if IsValid(self.target) then
		if self.target:GetTeamNumber() ~= self.parent:GetTeamNumber() then
			if IsValid(self.parent.dispose_ability) then
				self.parent.dispose_ability:ApplyHealth(self.target)
			end

			if self.ability.talents.has_w7 == 1 then
				self.ability:DealDamage(self.target:GetAbsOrigin())
			end
		end
	end

	local arc = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_arc", {
		dir_x = self.vector_direction.x,
		dir_y = self.vector_direction.y,
		duration = self.jump_duration,
		distance = self.vector_distance,
		height = self.ability.min_height_above_highest,
		fix_end = false,
		isStun = true,
		isForward = true,
		activity = ACT_DOTA_OVERRIDE_ABILITY_2,
		isBkb = self.ability.talents.has_h5 == 1,
	})

	if not arc then
		return
	end
	self.parent.marci_jump_mod = arc

	arc:SetEndCallback(function(interrupted)
		if not interrupted then
			self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_2_END, 1)
			self.ability:DealDamage()

			if IsValid(self.parent.unleash_ability) then
				self.parent.unleash_ability:Pulse(self.parent:GetAbsOrigin(), true)
			end
		end
	end)

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_marci/marci_rebound_bounce.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	arc:AddParticle(effect_cast, false, false, -1, false, false)

	self.parent:EmitSound("Hero_Marci.Rebound.Leap")
end

modifier_marci_companion_run_custom_tracker = class(mod_hidden)
function modifier_marci_companion_run_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.rebound_ability = self.ability

	self.ability.impact_damage = self.ability:GetSpecialValueFor("impact_damage")
	self.ability.stun_duration = self.ability:GetSpecialValueFor("stun_duration")
	self.ability.max_jump_distance = self.ability:GetSpecialValueFor("max_jump_distance")
	self.ability.move_speed = self.ability:GetSpecialValueFor("move_speed")
	self.ability.landing_radius = self.ability:GetSpecialValueFor("landing_radius")
	self.ability.min_height_above_highest = self.ability:GetSpecialValueFor("min_height_above_highest")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_marci_companion_run_custom_tracker:OnRefresh()
	self.ability.impact_damage = self.ability:GetSpecialValueFor("impact_damage")
	self.ability.stun_duration = self.ability:GetSpecialValueFor("stun_duration")
	self.ability.max_jump_distance = self.ability:GetSpecialValueFor("max_jump_distance")
end

function modifier_marci_companion_run_custom_tracker:InitLegendary()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end
	if self.legendary_init then
		return
	end

	self.legendary_init = true
	self.pos = self.parent:GetAbsOrigin()
	self.distance = 0
	self:StartIntervalThink(0.2)
end

function modifier_marci_companion_run_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end

	local pass = (self.parent:GetAbsOrigin() - self.pos):Length2D()
	self.pos = self.parent:GetAbsOrigin()

	if self.ability:GetCooldownTimeRemaining() <= 0 or IsValid(self.parent.marci_jump_mod) then
		self.distance = 0
		return
	end

	local final = self.distance + pass
	local max_distance = self.ability.talents.w7_distance

	if final >= max_distance then
		local delta = math.floor(final / max_distance)
		self.parent:CdAbility(self.ability, nil, self.ability.talents.w7_cd_inc * delta, "modifier_marci_rebound_7")
		self.distance = final - delta * max_distance
	else
		self.distance = final
	end
end

function modifier_marci_companion_run_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_marci_companion_run_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.w1_spell
end

modifier_marci_companion_run_custom_heal_reduce = class(mod_hidden)
function modifier_marci_companion_run_custom_heal_reduce:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.heal_reduce = self.ability.talents.w2_heal_reduce

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
end

function modifier_marci_companion_run_custom_heal_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_marci_companion_run_custom_heal_reduce:GetModifierHealChange()
	return self.heal_reduce
end

function modifier_marci_companion_run_custom_heal_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce
end

modifier_marci_companion_run_custom_damage = class(mod_hidden)
function modifier_marci_companion_run_custom_damage:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_marci_companion_run_custom_damage:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.min = self.ability.talents.w3_min
	self.count = self.min

	for i = 1, self.ability.talents.w3_max - self.min do
		local index = 9231 + i
		if RollPseudoRandomPercentage(self.ability.talents.w3_chance_inc, index, self.parent) then
			self.count = self.count + 1
		end
	end

	local damage = 0
	if IsValid(self.caster.dispose_ability) then
		damage = self.caster.dispose_ability:GetDamage() * self.ability.talents.w3_damage
	end

	self.damageTable = {
		attacker = self.caster,
		ability = self.ability,
		victim = self.parent,
		damage = damage,
		damage_type = DAMAGE_TYPE_MAGICAL,
	}
	self:StartIntervalThink(self.ability.talents.w3_interval)
end

function modifier_marci_companion_run_custom_damage:OnIntervalThink()
	if not IsServer() then
		return
	end

	for i = 1, 2 do
		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_marci/marci_unleash_attack.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:DestroyParticle(particle, false)
		ParticleManager:ReleaseParticleIndex(particle)
	end

	DoDamage(self.damageTable, "modifier_marci_rebound_3")

	self.parent:EmitSound("Marci.Dispose_hits")
	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
	end
end

modifier_marci_companion_run_custom_no_damage = class(mod_hidden)

modifier_marci_companion_run_custom_legendary_magic = class(mod_visible)
function modifier_marci_companion_run_custom_legendary_magic:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.magic = self.ability.talents.w7_magic
	self.max = self.ability.talents.w7_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.effect_cast = self.parent:GenericParticle("particles/marci/rebound_legendary_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_marci_companion_run_custom_legendary_magic:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
end

function modifier_marci_companion_run_custom_legendary_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_marci_companion_run_custom_legendary_magic:GetModifierMagicalResistanceBonus()
	return self:GetStackCount() * self.magic
end