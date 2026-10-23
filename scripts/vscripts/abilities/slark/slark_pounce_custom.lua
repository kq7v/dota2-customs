--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_slark_pounce_custom_arc", "abilities/slark/slark_pounce_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_slark_pounce_custom_tracker", "abilities/slark/slark_pounce_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_slark_pounce_custom_leash",
	"abilities/slark/slark_pounce_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_slark_pounce_custom_legendary_fish",
	"abilities/slark/slark_pounce_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_pounce_custom_magic_field",
	"abilities/slark/slark_pounce_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_pounce_custom_magic_effect",
	"abilities/slark/slark_pounce_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_pounce_3"
)
LinkLuaModifier(
	"modifier_slark_pounce_custom_magic_aura",
	"abilities/slark/slark_pounce_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_pounce_custom_scepter",
	"abilities/slark/slark_pounce_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_slark_pounce_custom_invun",
	"abilities/slark/slark_pounce_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_hero_4"
)
LinkLuaModifier(
	"modifier_slark_pounce_custom_health_reduce",
	"abilities/slark/slark_pounce_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_pounce_1"
)
LinkLuaModifier("modifier_slark_pounce_custom_damage", "abilities/slark/slark_pounce_custom", LUA_MODIFIER_MOTION_NONE)

slark_pounce_custom = class({})
slark_pounce_custom.talents = {}
slark_pounce_custom.arc_mod = nil
slark_pounce_custom.leash_mod = nil

function slark_pounce_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_pounce_start.vpcf", context)
	PrecacheResource("particle", "particles/slark/pounce_ground.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_pounce_leash.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_pounce_trail.vpcf", context)
	PrecacheResource("particle", "particles/slark/pounce_legendary_refresh.vpcf", context)
	PrecacheResource("particle", "particles/slark/pounce_legendary_water.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tidehunter/tidehunter_gush_splash.vpcf", context)
	PrecacheResource("particle", "particles/slark/pounce_legendary_cast.vpcf", context)
	PrecacheResource("particle", "particles/slark/pounce_armora.vpcf", context)
	PrecacheResource("particle", "particles/slark/pounce_slow.vpcf", context)
	PrecacheResource("particle", "particles/slark/pounce_pact.vpcf", context)

	PrecacheUnitByNameSync("npc_dota_slark_fish_legendary", context, -1)
end

function slark_pounce_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_heal_reduce = 0,
			w1_damage = 0,
			w1_duration = caster:GetTalentValue("modifier_slark_pounce_1", "duration", true),

			has_w2 = 0,
			w2_cd = 0,

			has_w3 = 0,
			w3_damage = 0,
			w3_magic = 0,
			w3_effect_duration = caster:GetTalentValue("modifier_slark_pounce_3", "effect_duration", true),
			w3_max = caster:GetTalentValue("modifier_slark_pounce_3", "max", true),
			w3_duration = caster:GetTalentValue("modifier_slark_pounce_3", "duration", true),
			w3_interval = caster:GetTalentValue("modifier_slark_pounce_3", "interval", true),
			w3_damage_type = caster:GetTalentValue("modifier_slark_pounce_3", "damage_type", true),
			w3_min_radius = caster:GetTalentValue("modifier_slark_pounce_3", "min_radius", true),

			has_w4 = 0,
			w4_cd_items = caster:GetTalentValue("modifier_slark_pounce_4", "cd_items", true),
			w4_move = caster:GetTalentValue("modifier_slark_pounce_4", "move", true),
			w4_cd_items_legendary = caster:GetTalentValue("modifier_slark_pounce_4", "cd_items_legendary", true),
			w4_cdr = caster:GetTalentValue("modifier_slark_pounce_4", "cdr", true),
			w4_duration = caster:GetTalentValue("modifier_slark_pounce_4", "duration", true),

			has_w7 = 0,
			w7_leash = caster:GetTalentValue("modifier_slark_pounce_7", "leash", true) / 100,
			w7_damage = caster:GetTalentValue("modifier_slark_pounce_7", "damage", true) / 100,
			w7_charge = caster:GetTalentValue("modifier_slark_pounce_7", "charge", true),
			w7_charge_return = caster:GetTalentValue("modifier_slark_pounce_7", "charge_return", true),

			has_h1 = 0,
			h1_damage_reduce = 0,
			h1_duration = 0,

			has_h4 = 0,
			h4_range = caster:GetTalentValue("modifier_slark_hero_4", "range", true) / 100,
			h4_invun = caster:GetTalentValue("modifier_slark_hero_4", "invun", true),
			h4_speed = caster:GetTalentValue("modifier_slark_hero_4", "speed", true) / 100,
		}
	end

	if caster:HasTalent("modifier_slark_pounce_1") then
		self.talents.has_w1 = 1
		self.talents.w1_heal_reduce = caster:GetTalentValue("modifier_slark_pounce_1", "heal_reduce")
		self.talents.w1_damage = caster:GetTalentValue("modifier_slark_pounce_1", "damage") / 100
	end

	if caster:HasTalent("modifier_slark_pounce_2") then
		self.talents.has_w2 = 1
		self.talents.w2_cd = caster:GetTalentValue("modifier_slark_pounce_2", "cd")
	end

	if caster:HasTalent("modifier_slark_pounce_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_slark_pounce_3", "damage")
		self.talents.w3_magic = caster:GetTalentValue("modifier_slark_pounce_3", "magic")
	end

	if caster:HasTalent("modifier_slark_pounce_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_slark_pounce_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_slark_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_damage_reduce = caster:GetTalentValue("modifier_slark_hero_1", "damage_reduce")
		self.talents.h1_duration = caster:GetTalentValue("modifier_slark_hero_1", "duration")
	end

	if caster:HasTalent("modifier_slark_hero_4") then
		self.talents.has_h4 = 1
	end
end

function slark_pounce_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_slark_pounce_custom_scepter") then
		return "pounce_scepter"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "slark_pounce", self)
end

function slark_pounce_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_slark_pounce_custom_tracker"
end

function slark_pounce_custom:GetBehavior()
	local base = DOTA_ABILITY_BEHAVIOR_NO_TARGET
	if self.caster:HasScepter() then
		base = DOTA_ABILITY_BEHAVIOR_POINT
	end
	return base + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
end

function slark_pounce_custom:GetCastRange(vLocation, hTarget)
	if IsServer() and self.caster:HasScepter() then
		return 999999
	end
	return (self.pounce_distance or 0) * (1 + (self.talents.has_h4 == 1 and self.talents.h4_range or 0))
		- self.caster:GetCastRangeBonus()
end

function slark_pounce_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_slark_pounce_custom_scepter") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function slark_pounce_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w2_cd or 0)
end

function slark_pounce_custom:OnAbilityPhaseStart()
	return not self.caster:HasModifier("modifier_slark_pounce_custom_arc")
end

function slark_pounce_custom:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_slark_pounce_custom_scepter")
	local no_target = 0

	if mod then
		no_target = 1
		mod:Destroy()
	end

	local cast_vector = self.caster:GetForwardVector()
	if self.caster:HasScepter() then
		local point = self:GetCursorPosition()
		if point == self.caster:GetAbsOrigin() then
			point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
		end

		local vec = point - self.caster:GetAbsOrigin()
		local dir = vec:Normalized()
		dir.z = 0

		cast_vector = dir

		self.caster:FacePoint(self.caster:GetAbsOrigin() + dir * 10)
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_slark_pounce_custom_arc",
		{ no_target = no_target, x = cast_vector.x, y = cast_vector.y }
	)
end

function slark_pounce_custom:ApplyEffect(target, point, radius, is_main)
	local leash_duration = self.leash_duration + self.talents.h1_duration
	local damage = self.damage
	local damage_k = 1
	local main = is_main and 1 or 0
	local damage_ability = nil
	local targets = { target }
	local heroes_damage = 1

	if main == 0 then
		damage_k = self.talents.w7_damage
		leash_duration = leash_duration * self.talents.w7_leash
		damage_ability = "modifier_slark_pounce_7"
		targets = self.caster:FindTargets(radius, point)
	end

	if IsValid(self.caster.essence_ability) then
		for i = 1, self.essence_stack do
			self.caster.essence_ability:AddStack(target)
		end
	end

	if IsValid(self.caster.pact_ability) then
		self.caster.pact_ability:AddStack(target:IsHero(), main == 0)
	end

	if self.talents.has_w1 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_slark_pounce_custom_health_reduce",
			{ duration = self.talents.w1_duration }
		)
	end

	if self.caster:HasShard() then
		self.caster:PerformAttack(target, true, true, true, true, false, false, true)
	end

	Timers:CreateTimer(0.1, function()
		if IsValid(target) then
			local damageTable = { attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }
			for _, aoe_target in pairs(targets) do
				damageTable.victim = aoe_target
				damageTable.damage = damage * damage_k
				DoDamage(damageTable, damage_ability)

				if
					self.talents.has_w1 == 1
					and IsValid(self.caster.pact_ability)
					and self.caster.pact_ability:IsTrained()
				then
					aoe_target:AddNewModifier(
						self.caster,
						self.ability,
						"modifier_slark_pounce_custom_damage",
						{ damage_k = damage_k }
					)
				end
			end
		end
	end)

	if self.caster:HasScepter() and main == 1 then
		target:AddNewModifier(
			self.caster,
			self.caster:BkbAbility(self, true),
			"modifier_stunned",
			{ duration = (1 - target:GetStatusResistance()) * self.scepter_stun }
		)
	end

	target:RemoveModifierByName("modifier_slark_pounce_custom_leash")
	target:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self, self.caster:HasScepter()),
		"modifier_slark_pounce_custom_leash",
		{
			main = main,
			radius = radius,
			x = point.x,
			y = point.y,
			duration = leash_duration * (1 - target:GetStatusResistance()),
		}
	)
	local sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Slark.Pounce.Impact", self)
	target:EmitSound(sound)
end

function slark_pounce_custom:CreateArea(point, new_radius)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end

	local radius = new_radius and new_radius or self.leash_radius
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_slark_pounce_custom_magic_field",
		{ radius = radius, duration = self.talents.w3_effect_duration },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_slark_pounce_custom_arc = class(mod_hidden)
function modifier_slark_pounce_custom_arc:GetEffectName()
	return wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_slark/slark_pounce_trail.vpcf",
		self.ability,
		"slark_pounce_custom"
	)
end
function modifier_slark_pounce_custom_arc:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_slark_pounce_custom_arc:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	local speed = self.ability.pounce_speed
		* (1 + (self.ability.talents.has_h4 == 1 and self.ability.talents.h4_speed or 0))
	local distance = self.ability.pounce_distance
		* (1 + (self.ability.talents.has_h4 == 1 and self.ability.talents.h4_range or 0))

	self.radius = self.ability.pounce_radius
	self.leash_radius = self.ability.leash_radius

	local duration = distance / speed
	local height = 160

	self.hit = false

	if not IsServer() then
		return
	end
	self.no_target = kv.no_target

	if self.no_target == 0 then
		self.ability:EndCd()
		self.ability.arc_mod = self

		if
			self.ability.talents.has_w7 == 1
			and IsValid(self.parent.pounce_legendary_ability)
			and self.parent.pounce_legendary_ability:GetCurrentAbilityCharges() < self.ability.talents.w7_charge
		then
			local effect = ParticleManager:CreateParticle(
				"particles/slark/pounce_legendary_refresh.vpcf",
				PATTACH_CUSTOMORIGIN,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				effect,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(effect)
			self.parent:EmitSound("Slark.Pounce_legendary_refresh")
			self.parent.pounce_legendary_ability:AddCharge(self.ability.talents.w7_charge_return)
		end

		if self.ability.talents.has_h4 == 1 then
			ProjectileManager:ProjectileDodge(self.parent)
			self.invun_mod =
				self.parent:AddNewModifier(self.parent, self.ability, "modifier_slark_pounce_custom_invun", {})
		end
	end

	local sound = wearables_system:GetSoundReplacement(self.parent, "Hero_Slark.Pounce.Cast", self.ability)
	self.parent:EmitSound(sound)
	self.parent:StartGesture(ACT_DOTA_SLARK_POUNCE)

	local pfx_start = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_slark/slark_pounce_start.vpcf",
		self.ability,
		"slark_pounce_custom"
	)
	local effect_cast = ParticleManager:CreateParticle(pfx_start, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(effect_cast)

	local cast_vector = Vector(kv.x, kv.y, 0)
	local point = self.parent:GetAbsOrigin() + cast_vector * distance

	self.arc = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_arc", {
		target_x = point.x,
		target_y = point.y,
		distance = distance,
		speed = speed,
		height = height,
		fix_end = false,
		isStun = false,
	})

	self.arc:SetEndCallback(function()
		if self and not self:IsNull() then
			self.arc = nil
			self:Destroy()
		end
	end)

	self:SetDuration(duration, true)
	self.interval = FrameTime()

	self:StartIntervalThink(self.interval)
	self:OnIntervalThink()
end

function modifier_slark_pounce_custom_arc:OnDestroy()
	if not IsServer() then
		return
	end
	GridNav:DestroyTreesAroundPoint(self.parent:GetOrigin(), 100, false)

	local invun_duration = 0

	if self.no_target == 0 then
		if not self.hit then
			self.ability:StartCd()
			if self.ability.talents.has_w3 == 1 then
				local sound =
					wearables_system:GetSoundReplacement(self.parent, "Hero_Slark.Pounce.Impact", self.ability)
				EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), sound, self.parent)
				self.ability:CreateArea(self.parent:GetAbsOrigin())
			end
		else
			invun_duration = self.ability.talents.h4_invun
		end
		if self.parent:HasScepter() then
			self.parent:AddNewModifier(self.parent, self.ability, "modifier_slark_pounce_custom_scepter", {})
			self.ability:StartCd()
			self.ability:EndCd(0)
		end
		self.ability.arc_mod = nil
	end

	if IsValid(self.invun_mod) then
		self.invun_mod:SetDuration(invun_duration, true)
	end

	if IsValid(self.arc) then
		self.arc:Destroy()
	end
end

function modifier_slark_pounce_custom_arc:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
	}
end

function modifier_slark_pounce_custom_arc:OnIntervalThink()
	if self.hit == true then
		return
	end
	if self.no_target == 1 then
		return
	end

	local targets = self.parent:FindTargets(self.radius)

	local target
	for _, enemy in pairs(targets) do
		if enemy:IsRealHero() then
			target = enemy
			break
		end
	end

	if not target then
		return
	end

	self.hit = true

	self.ability:ApplyEffect(target, self.parent:GetAbsOrigin(), self.leash_radius, true)
	self.parent:MoveToTargetToAttack(target)
	self:Destroy()
end

modifier_slark_pounce_custom_leash = class(mod_visible)
function modifier_slark_pounce_custom_leash:GetTexture()
	return "slark_pounce"
end
function modifier_slark_pounce_custom_leash:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_slark_pounce_custom_leash:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_slark_pounce_custom_leash:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.pounce_ability
	if not self.ability then
		self:Destroy()
		return
	end

	if not IsServer() then
		return
	end

	if table.main == 1 then
		self.ability.leash_mod = self
	end

	self.center = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self.radius = table.radius
	self.real_radius = self.radius

	self.max_speed = 550
	self.min_speed = 0.1
	self.max_min = self.max_speed - self.min_speed
	self.half_width = 50

	local sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Slark.Pounce.Leash", self.ability)
	self.parent:EmitSound(sound)

	AddFOWViewer(self.caster:GetTeamNumber(), self.center, 500, self:GetRemainingTime(), false)

	if self.ability.talents.has_w3 == 0 then
		local effect_cast = ParticleManager:CreateParticle(
			wearables_system:GetParticleReplacementAbility(
				self.caster,
				"particles/slark/pounce_ground.vpcf",
				self.ability,
				"slark_pounce_custom"
			),
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(effect_cast, 0, self.center)
		ParticleManager:SetParticleControl(effect_cast, 3, self.center)
		ParticleManager:SetParticleControl(effect_cast, 4, Vector(self.radius, self:GetRemainingTime(), 0))
		self:AddParticle(effect_cast, false, false, -1, false, false)
	else
		self.ability:CreateArea(self.center, self.radius)
	end

	local leash_pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_slark/slark_pounce_leash.vpcf",
		self.ability,
		"slark_pounce_custom"
	)
	local leash_effect = ParticleManager:CreateParticle(leash_pfx, PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		leash_effect,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(leash_effect, 3, self.center)
	self:AddParticle(leash_effect, false, false, -1, false, false)

	if self.caster:GetQuest() ~= "Slark.Quest_6" then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	if self.caster:QuestCompleted() then
		return
	end

	self:StartIntervalThink(0.1)
end

function modifier_slark_pounce_custom_leash:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.caster:UpdateQuest(0.1)
end

function modifier_slark_pounce_custom_leash:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.leash_mod == self then
		self.ability.leash_mod = nil
		if not self.caster:HasModifier("modifier_slark_pounce_custom_scepter") then
			self.ability:StartCd()
		end
	end

	local sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Slark.Pounce.Leash", self.ability)
	self.parent:StopSound(sound)
	self.parent:EmitSound("Hero_Slark.Pounce.End")
end

function modifier_slark_pounce_custom_leash:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_slark_pounce_custom_leash:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.h1_damage_reduce
end

function modifier_slark_pounce_custom_leash:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.h1_damage_reduce
end

function modifier_slark_pounce_custom_leash:GetModifierMoveSpeed_Limit(params)
	if not IsServer() then
		return
	end

	local parent_vector = self.parent:GetOrigin() - self.center
	local parent_direction = parent_vector:Normalized()
	local actual_distance = parent_vector:Length2D()
	local wall_distance = self.real_radius - actual_distance

	if wall_distance < -self.half_width then
		self:Destroy()
		return 0
	end

	local parent_angle = VectorToAngles(parent_direction).y
	local unit_angle = self.parent:GetAnglesAsVector().y
	local wall_angle = math.abs(AngleDiff(parent_angle, unit_angle))

	local limit = 0
	if wall_angle <= 90 then
		if wall_distance < 0 then
			limit = self.min_speed
		else
			limit = (wall_distance / self.half_width) * self.max_min + self.min_speed
		end
	end

	return limit
end

function modifier_slark_pounce_custom_leash:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

modifier_slark_pounce_custom_magic_field = class(mod_hidden)
function modifier_slark_pounce_custom_magic_field:IsAura()
	return true
end
function modifier_slark_pounce_custom_magic_field:GetAuraDuration()
	return 0.1
end
function modifier_slark_pounce_custom_magic_field:GetAuraRadius()
	return self.radius
end
function modifier_slark_pounce_custom_magic_field:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_slark_pounce_custom_magic_field:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_slark_pounce_custom_magic_field:GetModifierAura()
	return "modifier_slark_pounce_custom_magic_aura"
end
function modifier_slark_pounce_custom_magic_field:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.center = self.parent:GetAbsOrigin()

	if not IsServer() then
		return
	end

	self.radius = math.max(self.ability.talents.w3_min_radius, table.radius)

	local effect_cast = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/slark/pounce_ground.vpcf",
			self.ability,
			"slark_pounce_custom"
		),
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect_cast, 0, self.center)
	ParticleManager:SetParticleControl(effect_cast, 3, self.center)
	ParticleManager:SetParticleControl(effect_cast, 4, Vector(self.radius, self:GetRemainingTime(), 0))
	self:AddParticle(effect_cast, false, false, -1, false, false)
end

modifier_slark_pounce_custom_magic_aura = class(mod_hidden)
function modifier_slark_pounce_custom_magic_aura:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.interval = self.ability.talents.w3_interval
	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.w3_damage_type,
		damage = self.ability.talents.w3_damage * self.interval,
	}

	self.parent:GenericParticle("particles/slark/pounce_slow.vpcf", self)
	self:OnIntervalThink(true)
	self:StartIntervalThink(self.interval - 0.02)
end

function modifier_slark_pounce_custom_magic_aura:OnIntervalThink(first)
	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_slark_pounce_custom_magic_effect",
		{ duration = self.ability.talents.w3_duration }
	)

	if first then
		return
	end
	DoDamage(self.damageTable, "modifier_slark_pounce_3")
end

modifier_slark_pounce_custom_magic_effect = class(mod_visible)
function modifier_slark_pounce_custom_magic_effect:GetTexture()
	return "buffs/slark/pounce_3"
end
function modifier_slark_pounce_custom_magic_effect:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.max = self.ability.talents.w3_max
	self:StartIntervalThink(0.98)
end

function modifier_slark_pounce_custom_magic_effect:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.parent:HasModifier("modifier_slark_pounce_custom_magic_aura") and self:GetStackCount() < self.max then
		self:IncrementStackCount()
		if self:GetStackCount() >= self.max then
			self.parent:EmitSound("Slark.Pounce_armor")
			self.parent:GenericParticle("particles/slark/pounce_armora.vpcf", self, true)
		end
	end
end

function modifier_slark_pounce_custom_magic_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_slark_pounce_custom_magic_effect:GetModifierMagicalResistanceBonus()
	return self.ability.talents.w3_magic * self:GetStackCount()
end

modifier_slark_pounce_custom_scepter = class(mod_visible)
function modifier_slark_pounce_custom_scepter:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.init_cd = false
	self.cooldown = self.ability:GetEffectiveCooldown(self.ability:GetLevel())
	self.interval = 0.1

	self:StartIntervalThink(self.interval)
end

function modifier_slark_pounce_custom_scepter:OnIntervalThink()
	if not IsServer() then
		return
	end
	if IsValid(self.ability.leash_mod) then
		return
	end

	if not self.init_cd then
		self.init_cd = true
		self:SetDuration(self.cooldown, true)
	end

	self.cooldown = self.cooldown - self.interval
	if self.cooldown <= 0 then
		self:Destroy()
	end
end

function modifier_slark_pounce_custom_scepter:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.ability.leash_mod) then
		self.ability:EndCd()
		return
	else
		self.ability:EndCd(0)
		self.ability:StartCooldown(self.cooldown)
	end
end

modifier_slark_pounce_custom_tracker = class(mod_hidden)
function modifier_slark_pounce_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.pounce_ability = self.ability
	self.parent.pounce_legendary_ability = self.parent:FindAbilityByName("slark_pounce_custom_legendary")
	if self.parent.pounce_legendary_ability then
		self.parent.pounce_legendary_ability:UpdateTalents()
	end

	self.ability.pounce_damage = self.ability:GetSpecialValueFor("pounce_damage")
	self.ability.pounce_distance = self.ability:GetSpecialValueFor("pounce_distance")
	self.ability.pounce_speed = self.ability:GetSpecialValueFor("pounce_speed")
	self.ability.leash_duration = self.ability:GetSpecialValueFor("leash_duration")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.essence_stack = self.ability:GetSpecialValueFor("essence_stack")
	self.ability.leash_radius = self.ability:GetSpecialValueFor("leash_radius")
	self.ability.pounce_radius = self.ability:GetSpecialValueFor("pounce_radius")

	self.ability.scepter_stun = self.ability:GetSpecialValueFor("scepter_stun")
	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
end

function modifier_slark_pounce_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.ability.leash_mod) and not IsValid(self.ability.arc_mod) and not self.ability:IsActivated() then
		self.ability:StartCd()
	end
end

function modifier_slark_pounce_custom_tracker:OnRefresh()
	self.ability.leash_duration = self.ability:GetSpecialValueFor("leash_duration")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.essence_stack = self.ability:GetSpecialValueFor("essence_stack")
end

function modifier_slark_pounce_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_slark_pounce_custom_tracker:GetModifierPercentageCooldown(params)
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_cdr
end

modifier_slark_pounce_custom_invun = class(mod_hidden)
function modifier_slark_pounce_custom_invun:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
	}
end

modifier_slark_pounce_custom_health_reduce = class(mod_visible)
function modifier_slark_pounce_custom_health_reduce:GetTexture()
	return "buffs/slark/pounce_1"
end
function modifier_slark_pounce_custom_health_reduce:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_slark_pounce_custom_health_reduce:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_slark_pounce_custom_health_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_slark_pounce_custom_health_reduce:GetModifierExtraHealthPercentage()
	return self.ability.talents.w1_heal_reduce
end

modifier_slark_pounce_custom_damage = class(mod_hidden)
function modifier_slark_pounce_custom_damage:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_slark_pounce_custom_damage:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.damage = self.caster.pact_ability:GetDamage() * self.ability.talents.w1_damage * table.damage_k
	self.count = 4
	self.duration = 0.8
	self.interval = self.duration / self.count

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.caster.pact_ability,
		damage = self.damage / self.count,
		damage_type = DAMAGE_TYPE_MAGICAL,
	}

	local effect_cast =
		ParticleManager:CreateParticle("particles/slark/pounce_pact.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(200, self.duration, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	self:StartIntervalThink(self.interval)
end

function modifier_slark_pounce_custom_damage:OnIntervalThink()
	if not IsServer() then
		return
	end
	DoDamage(self.damageTable, "modifier_slark_pounce_1")

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end

slark_pounce_custom_legendary = class({})
slark_pounce_custom_legendary.talents = {}

function slark_pounce_custom_legendary:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()
	self.ability = self
	self.parent = self:GetCaster()

	self.min_dist = self:GetLevelSpecialValueFor("min_dist", 1)
end

function slark_pounce_custom_legendary:CreateTalent()
	self:UpdateTalents()

	if self.talents.has_r7 == 1 then
		self.caster:SwapAbilities("slark_shadow_dance_custom_legendary", "slark_pounce_custom_legendary", false, true)
	else
		self:SetHidden(false)
	end
end

function slark_pounce_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w7 = 0,
			w7_tower_duration = caster:GetTalentValue("modifier_slark_pounce_7", "tower_duration", true),
			w7_radius = caster:GetTalentValue("modifier_slark_pounce_7", "radius", true),
			w7_duration = caster:GetTalentValue("modifier_slark_pounce_7", "duration", true),
			w7_range = caster:GetTalentValue("modifier_slark_pounce_7", "range", true),
			w7_speed = caster:GetTalentValue("modifier_slark_pounce_7", "speed", true),
			w7_talent_cd = caster:GetTalentValue("modifier_slark_pounce_7", "talent_cd", true),

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_slark_pounce_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_slark_dance_7") then
		self.talents.has_r7 = 1
	end
end

function slark_pounce_custom_legendary:GetCastRange()
	return self.talents.w7_range or 0
end

function slark_pounce_custom_legendary:GetAbilityChargeRestoreTime(level)
	return self.talents.w7_talent_cd or 0
end

function slark_pounce_custom_legendary:GetAOERadius()
	return self.talents.w7_radius or 0
end

function slark_pounce_custom_legendary:OnSpellStart()
	local point = self:GetCursorPosition()
	if point == self.caster:GetAbsOrigin() then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
	end

	local dir = point - self.caster:GetAbsOrigin()
	dir.z = 0

	local abs = self.caster:GetAbsOrigin() + dir:Normalized() * 85

	if dir:Length() < self.min_dist then
		point = self.caster:GetAbsOrigin() + dir:Normalized() * self.min_dist
	end

	local fish = CreateUnitByName(
		"npc_dota_slark_fish_legendary",
		abs,
		false,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)
	self.caster:EmitSound("Slark.Pounce_legendary_cast")
	fish:EmitSound("Slark.Pounce_legendary_fish")
	fish:AddNewModifier(self.caster, self, "modifier_slark_pounce_custom_legendary_fish", { x = point.x, y = point.y })

	local effect_point = abs + Vector(0, 0, 75)

	local effect_cast = ParticleManager:CreateParticle(
		"particles/slark/pounce_legendary_cast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControl(effect_cast, 3, effect_point)
	ParticleManager:SetParticleControlForward(effect_cast, 3, self.caster:GetForwardVector())
	ParticleManager:DestroyParticle(effect_cast, false)
	ParticleManager:ReleaseParticleIndex(effect_cast)

	fish:FacePoint(point)
end

modifier_slark_pounce_custom_legendary_fish = class(mod_hidden)
function modifier_slark_pounce_custom_legendary_fish:RemoveOnDeath()
	return false
end
function modifier_slark_pounce_custom_legendary_fish:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end

	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self.dist = (self.parent:GetAbsOrigin() - self.point):Length2D()
	self.speed = self.ability.talents.w7_speed
	self.radius = self.ability.talents.w7_radius
	self.leash_radius = self.radius
	self.duration = self.ability.talents.w7_duration
	self.tower_duration = self.ability.talents.w7_tower_duration

	self.pounce = self.caster.pounce_ability

	self.time = self.dist / self.speed

	self.parent:FadeGesture(ACT_DOTA_SPAWN)
	self.parent:StartGesture(ACT_DOTA_RUN)

	self.stage = 0

	self:OnIntervalThink()
	self:StartIntervalThink(FrameTime())
end

function modifier_slark_pounce_custom_legendary_fish:OnIntervalThink()
	if not IsServer() then
		return
	end

	local point = self.parent:GetAbsOrigin()

	if self.stage == 0 then
		if (point - self.point):Length2D() <= 30 or self:GetElapsedTime() >= (self.time + 1) then
			self.stage = 1
			self.parent:Stop()

			local duration = self.duration

			if self.parent:NearTower() then
				duration = self.tower_duration
			end

			self:SetDuration(duration, true)
			self.parent:FadeGesture(ACT_DOTA_RUN)
			self.parent:StartGesture(ACT_DOTA_SPAWN)
			self.parent:EmitSound("Slark.Pounce_legendary_fish_end")

			local effect_cast1 = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_tidehunter/tidehunter_gush_splash.vpcf",
				PATTACH_WORLDORIGIN,
				nil
			)
			ParticleManager:SetParticleControl(effect_cast1, 0, self.parent:GetAbsOrigin())
			ParticleManager:SetParticleControl(effect_cast1, 3, self.parent:GetAbsOrigin())
			ParticleManager:ReleaseParticleIndex(effect_cast1)

			local effect_cast = ParticleManager:CreateParticle(
				"particles/slark/pounce_legendary_water.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetAbsOrigin())
			ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, 0, 0))
			self:AddParticle(effect_cast, false, false, -1, false, false)
		else
			self.parent:MoveToPosition(self.point)
		end
	elseif self.stage == 1 then
		local targets = self.caster:FindTargets(self.radius, point)

		if #targets > 0 and self.pounce and self.pounce:IsTrained() then
			self.parent:EmitSound("Slark.Pounce_legendary_fish_hit")

			local effect_cast = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_tidehunter/tidehunter_gush_splash.vpcf",
				PATTACH_WORLDORIGIN,
				nil
			)
			ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetAbsOrigin())
			ParticleManager:SetParticleControl(effect_cast, 3, self.parent:GetAbsOrigin())
			ParticleManager:ReleaseParticleIndex(effect_cast)

			self.pounce:ApplyEffect(targets[1], point, self.leash_radius)
			self.stage = 2
			self:Destroy()
		end
	end
end

function modifier_slark_pounce_custom_legendary_fish:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Slark.Pounce_legendary_fish_destroy")
	self.parent:Kill(nil, nil)
end

function modifier_slark_pounce_custom_legendary_fish:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = self.stage ~= 0,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
	}
end

function modifier_slark_pounce_custom_legendary_fish:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_slark_pounce_custom_legendary_fish:GetModifierMoveSpeed_Absolute()
	return self.speed
end

function modifier_slark_pounce_custom_legendary_fish:GetActivityTranslationModifiers()
	return "haste"
end