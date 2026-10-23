--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_thinker_speed",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_speed",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_speed_count",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_tracker",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_knock_cd",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_legendary",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_legendary_illusion",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_stun",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_arc_warden_hero_5"
)
LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_linger",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_agi",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_arc_warden_field_3"
)
LinkLuaModifier(
	"modifier_arc_warden_magnetic_field_custom_slow",
	"abilities/arc_warden/arc_warden_magnetic_field_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_arc_warden_field_4"
)

arc_warden_magnetic_field_custom = class({})
arc_warden_magnetic_field_custom.talents = {}

function arc_warden_magnetic_field_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_magnetic_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_brewmaster/brewmaster_dispel_magic.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/arc_warden_magnetic.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/arc_warden_magnetic_shard.vpcf", context)
	PrecacheResource("particle", "particles/generic/duel_stun.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/immunity_sphere.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/field_blink_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/earthshaker/earthshaker_arcana/earthshaker_arcana_blink_end.vpcf",
		context
	)
	PrecacheResource("particle", "particles/status_fx/status_effect_faceless_chronosphere.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/field_attack.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/spark_heall.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/frost_cleave.vpcf", context)
end

function arc_warden_magnetic_field_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_cleave = 0,
			w1_speed = 0,
			w1_radius = caster:GetTalentValue("modifier_arc_warden_field_1", "radius", true),

			has_w2 = 0,
			w2_heal = 0,
			w2_duration = caster:GetTalentValue("modifier_arc_warden_field_2", "duration", true),
			w2_bonus = caster:GetTalentValue("modifier_arc_warden_field_2", "bonus", true),

			has_w3 = 0,
			w3_agi = 0,
			w3_max = caster:GetTalentValue("modifier_arc_warden_field_3", "max", true),
			w3_duration_creeps = caster:GetTalentValue("modifier_arc_warden_field_3", "duration_creeps", true),
			w3_duration = caster:GetTalentValue("modifier_arc_warden_field_3", "duration", true),

			has_w4 = 0,
			w4_range = caster:GetTalentValue("modifier_arc_warden_field_4", "range", true),
			w4_cd = caster:GetTalentValue("modifier_arc_warden_field_4", "cd", true),
			w4_slow = caster:GetTalentValue("modifier_arc_warden_field_4", "slow", true),
			w4_slow_duration = caster:GetTalentValue("modifier_arc_warden_field_4", "slow_duration", true),

			has_w7 = 0,
			w7_cd_inc = caster:GetTalentValue("modifier_arc_warden_field_7", "cd_inc", true),
			w7_radius = caster:GetTalentValue("modifier_arc_warden_field_7", "radius", true),

			has_h2 = 0,
			h2_armor = 0,
			h2_status = 0,
			h2_bonus = caster:GetTalentValue("modifier_arc_warden_hero_2", "bonus", true),
			h2_duration = caster:GetTalentValue("modifier_arc_warden_hero_2", "duration", true),

			has_h5 = 0,
			h5_cast = caster:GetTalentValue("modifier_arc_warden_hero_5", "cast", true),
			h5_range = caster:GetTalentValue("modifier_arc_warden_hero_5", "range", true),
			h5_stun = caster:GetTalentValue("modifier_arc_warden_hero_5", "stun", true),
			h5_talent_cd = caster:GetTalentValue("modifier_arc_warden_hero_5", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_arc_warden_field_1") then
		self.talents.has_w1 = 1
		self.talents.w1_cleave = caster:GetTalentValue("modifier_arc_warden_field_1", "cleave") / 100
		self.talents.w1_speed = caster:GetTalentValue("modifier_arc_warden_field_1", "speed")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_arc_warden_field_2") then
		self.talents.has_w2 = 1
		self.talents.w2_heal = caster:GetTalentValue("modifier_arc_warden_field_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_arc_warden_field_2",
			type = 2,
			value = function()
				if
					caster:HasModifier("modifier_arc_warden_magnetic_field_custom_speed_count")
					or caster:HasModifier("modifier_arc_warden_magnetic_field_custom_linger")
				then
					return self.talents.w2_heal * self.talents.w2_bonus
				end
				return self.talents.w2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_arc_warden_field_3") then
		self.talents.has_w3 = 1
		self.talents.w3_agi = caster:GetTalentValue("modifier_arc_warden_field_3", "agi")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_arc_warden_field_4") then
		self.talents.has_w4 = 1
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_arc_warden_field_7") then
		self.talents.has_w7 = 1
		caster:AddAttackStartEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_arc_warden_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_armor = caster:GetTalentValue("modifier_arc_warden_hero_2", "armor")
		self.talents.h2_status = caster:GetTalentValue("modifier_arc_warden_hero_2", "status")
	end

	if caster:HasTalent("modifier_arc_warden_hero_5") then
		self.talents.has_h5 = 1
	end
end

function arc_warden_magnetic_field_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_arc_warden_magnetic_field_custom_tracker"
end

function arc_warden_magnetic_field_custom:GetBehavior()
	local base = self.talents.has_w7 == 1 and DOTA_ABILITY_BEHAVIOR_NO_TARGET
		or (DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_AOE)
	return base + DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
end

function arc_warden_magnetic_field_custom:GetAOERadius()
	return self.radius or 0
end

function arc_warden_magnetic_field_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_h5 == 1 and self.talents.h5_cast or 0)
end

function arc_warden_magnetic_field_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.has_w4 == 1 and self.talents.w4_cd or 0)
end

function arc_warden_magnetic_field_custom:GetAbilityTextureName()
	local icon = wearables_system:GetAbilityIconReplacement(self.caster, "arc_warden_magnetic_field", self)
	if icon == "arc_warden_magnetic_field_frostivus" then
		return icon
	end
	if self.caster:HasModifier("modifier_arc_warden_tempest_double") then
		return wearables_system:GetAbilityIconReplacement(self.caster, "arc_warden_magnetic_field_tempest", self)
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "arc_warden_magnetic_field", self)
end

function arc_warden_magnetic_field_custom:OnSpellStart()
	self.caster:EmitSound("Hero_ArcWarden.MagneticField.Cast")
	self.caster:GenericParticle("particles/units/heroes/hero_arc_warden/arc_warden_magnetic_cast.vpcf")

	local duration = self.duration
	local point = self:GetCursorTarget() and self:GetCursorTarget():GetAbsOrigin() or self:GetCursorPosition()

	if self.talents.has_w7 == 1 then
		point = self.caster:GetAbsOrigin()
	elseif self.talents.has_w4 == 1 and not self.caster:IsRooted() and not self.caster:IsLeashed() then
		ProjectileManager:ProjectileDodge(self.caster)
		EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Arc.Field_blink_start", self.caster)
		EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Arc.Field_blink_start2", self.caster)

		local effect =
			ParticleManager:CreateParticle("particles/arc_warden/field_blink_start.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect, 0, self.caster:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(effect)

		self.caster:SetOrigin(point)
		FindClearSpaceForUnit(self.caster, point, false)

		effect = ParticleManager:CreateParticle(
			"particles/econ/items/earthshaker/earthshaker_arcana/earthshaker_arcana_blink_end.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(effect, 0, point)
		ParticleManager:ReleaseParticleIndex(effect)

		self.caster:EmitSound("Arc.Field_blink_end")
		self.caster:EmitSound("Arc.Field_blink_end2")
	end

	if self.talents.has_w7 == 1 then
		if self.caster.field_legendary_ability then
			self.caster.field_legendary_ability:EndCd(0.3)
		end
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_arc_warden_magnetic_field_custom_thinker_speed",
			{ duration = duration, original = 1 }
		)
	else
		CreateModifierThinker(
			self.caster,
			self,
			"modifier_arc_warden_magnetic_field_custom_thinker_speed",
			{ duration = duration },
			point,
			self.caster:GetTeamNumber(),
			false
		)
	end
end

modifier_arc_warden_magnetic_field_custom_thinker_speed = class(mod_hidden)
function modifier_arc_warden_magnetic_field_custom_thinker_speed:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_arc_warden_magnetic_field_custom_thinker_speed:IsAura()
	return true
end
function modifier_arc_warden_magnetic_field_custom_thinker_speed:GetAuraDuration()
	return 0.1
end
function modifier_arc_warden_magnetic_field_custom_thinker_speed:GetAuraRadius()
	return self.radius
end
function modifier_arc_warden_magnetic_field_custom_thinker_speed:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_arc_warden_magnetic_field_custom_thinker_speed:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_arc_warden_magnetic_field_custom_thinker_speed:GetModifierAura()
	return "modifier_arc_warden_magnetic_field_custom_speed"
end
function modifier_arc_warden_magnetic_field_custom_thinker_speed:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.ability:EndCd()

	self.parent_owner = self.parent:FindOwner()
	self.priority = 0
	self.event = "ArcField_Tempest"
	if self.parent == self.parent_owner then
		self.priority = 1
		self.event = "ArcField"
	end

	self.has_legendary = self.ability.talents.has_w7 == 1
	self.has_knock = self.ability.talents.has_h5 == 1
	self.legendary_ability = self.parent.field_legendary_ability

	self.knock_cd = self.ability.talents.h5_talent_cd
	self.knock_range = self.ability.talents.h5_range
	self.knock_stun = self.ability.talents.h5_stun
	self.knock_duration = 0.2

	self.RemoveForDuel = true

	if table.original and table.original == 1 and self.legendary_ability and self.legendary_ability:IsHidden() then
		self.parent:SwapAbilities(self.ability:GetName(), self.legendary_ability:GetName(), false, true)
	end

	self.duration = self.ability.duration
	self.radius = self.ability.radius
	if self.parent:IsHero() then
		self.radius = self.ability.talents.w7_radius
	end

	self.parent:EmitSound("Hero_ArcWarden.MagneticField")

	local part = self.has_knock and "particles/arc_warden/arc_warden_magnetic_shard.vpcf"
		or "particles/arc_warden/arc_warden_magnetic.vpcf"
	part = wearables_system:GetParticleReplacementAbility(self.caster, part, self.ability)

	self.magnetic_particle = ParticleManager:CreateParticle(part, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.magnetic_particle, 1, Vector(self.radius, 1, 1))
	self:AddParticle(self.magnetic_particle, false, false, 1, false, false)

	if not self.has_knock and not self.has_legendary then
		return
	end

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_arc_warden_magnetic_field_custom_thinker_speed:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.has_legendary and not self.parent:IsIllusion() then
		local time = self:GetRemainingTime()
		local active = (self.legendary_ability and self.legendary_ability:IsFullyCastable()) and 1 or 0
		self.parent_owner:UpdateUIshort({
			max_time = self.duration,
			time = time,
			stack = time,
			use_zero = 1,
			active = active,
			priority = self.priority,
			style = self.event,
		})
	end

	if not self.has_knock then
		return
	end
	if self.parent:HasModifier("modifier_arc_warden_magnetic_field_custom_legendary") then
		return
	end

	for _, enemy in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
		if
			not enemy:HasModifier("modifier_arc_warden_magnetic_field_custom_knock_cd") and not enemy:IsDebuffImmune()
		then
			enemy:EmitSound("Arc.Field_shard")
			enemy:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_arc_warden_magnetic_field_custom_knock_cd",
				{ duration = self.knock_cd }
			)

			local attack_particle =
				ParticleManager:CreateParticle("particles/generic/duel_stun.vpcf", PATTACH_ABSORIGIN_FOLLOW, enemy)
			ParticleManager:SetParticleControlEnt(
				attack_particle,
				1,
				enemy,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				enemy:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				attack_particle,
				0,
				enemy,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				enemy:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControl(attack_particle, 60, Vector(31, 82, 167))
			ParticleManager:SetParticleControl(attack_particle, 61, Vector(1, 0, 0))
			ParticleManager:ReleaseParticleIndex(attack_particle)

			local direction = enemy:GetOrigin() - self.parent:GetOrigin()
			direction.z = 0
			direction = direction:Normalized()
			if enemy:GetAbsOrigin() == self.parent:GetAbsOrigin() then
				direction = enemy:GetForwardVector()
			end

			local point = self.parent:GetAbsOrigin() + direction * (self.radius + self.knock_range)
			local distance = (enemy:GetAbsOrigin() - point):Length2D()

			local mod = enemy:AddNewModifier(self.caster, self.ability, "modifier_generic_arc", {
				target_x = point.x,
				target_y = point.y,
				distance = distance,
				duration = self.knock_duration,
				height = 0,
				fix_end = false,
				isStun = true,
				activity = ACT_DOTA_FLAIL,
			})

			if mod then
				enemy:GenericParticle("particles/items_fx/harpoon_pull.vpcf", mod)
				mod:SetEndCallback(function(interrupted)
					enemy:AddNewModifier(
						self.caster,
						self.ability,
						"modifier_arc_warden_magnetic_field_custom_stun",
						{ duration = (1 - enemy:GetStatusResistance()) * self.knock_stun }
					)
				end)
			end
		end
	end
end

function modifier_arc_warden_magnetic_field_custom_thinker_speed:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Hero_ArcWarden.MagneticField")

	if self.parent:IsIllusion() then
		return
	end
	if self.parent:HasModifier("modifier_arc_warden_magnetic_field_custom_legendary") then
		return
	end

	self.parent_owner:UpdateUIshort({ hide = 1, hide_full = 1, priority = self.priority, style = self.event })

	if self.ability.talents.has_w7 == 0 then
		self.ability:StartCd()
		return
	end

	if self.ability:IsActivated() then
		return
	end
	if self.caster:HasModifier("modifier_arc_warden_magnetic_field_custom_thinker_speed") then
		return
	end
	if self.caster:HasModifier("modifier_arc_warden_magnetic_field_custom_legendary") then
		return
	end

	local legendary_ability = self.caster.field_legendary_ability
	if legendary_ability and not legendary_ability:IsHidden() then
		self.caster:SwapAbilities(self.ability:GetName(), legendary_ability:GetName(), true, false)
	end
	self.ability:StartCd()
end

modifier_arc_warden_magnetic_field_custom_speed = class(mod_hidden)
function modifier_arc_warden_magnetic_field_custom_speed:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_arc_warden_magnetic_field_custom_speed:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.aura_owner = self:GetAuraOwner()
	self.caster = self:GetCaster()

	self.radius = self.ability.radius

	if IsValid(self.aura_owner) and self.aura_owner:IsHero() then
		self.radius = self.ability.talents.w7_radius
	end

	self.evasion_chance = self.ability.evasion_chance

	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_arc_warden_magnetic_field_custom_speed_count", {})
end

function modifier_arc_warden_magnetic_field_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EVASION_CONSTANT,
	}
end

function modifier_arc_warden_magnetic_field_custom_speed:OnDestroy()
	if not IsServer() then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_arc_warden_magnetic_field_custom_speed_count")
	if mod then
		mod:DecrementStackCount()
		if mod:GetStackCount() <= 0 then
			mod:Destroy()
		end
	end
end

function modifier_arc_warden_magnetic_field_custom_speed:GetModifierEvasion_Constant(params)
	if not IsValid(self.aura_owner, params.attacker) then
		return
	end
	if (params.attacker:GetAbsOrigin() - self.aura_owner:GetAbsOrigin()):Length2D() <= self.radius then
		return
	end
	return self.evasion_chance
end

modifier_arc_warden_magnetic_field_custom_speed_count = class(mod_visible)
function modifier_arc_warden_magnetic_field_custom_speed_count:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.attack_speed_bonus = self.ability.attack_speed_bonus + self.ability.talents.w1_speed
	self.flight_speed = self.ability.flight_speed

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_arc_warden_magnetic_field_custom_speed_count:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
end

function modifier_arc_warden_magnetic_field_custom_speed_count:OnDestroy()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h2 == 0 and self.ability.talents.has_w2 == 0 then
		return
	end

	local duration = self.ability.talents.has_w2 == 1 and self.ability.talents.w2_duration
		or self.ability.talents.h2_duration
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_arc_warden_magnetic_field_custom_linger",
		{ duration = duration }
	)
end

function modifier_arc_warden_magnetic_field_custom_speed_count:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS,
	}
end

function modifier_arc_warden_magnetic_field_custom_speed_count:GetModifierProjectileSpeedBonus()
	return self.flight_speed
end

function modifier_arc_warden_magnetic_field_custom_speed_count:GetModifierAttackSpeedBonus_Constant()
	return self.attack_speed_bonus
end

modifier_arc_warden_magnetic_field_custom_tracker = class(mod_hidden)
function modifier_arc_warden_magnetic_field_custom_tracker:RemoveOnDeath()
	return false
end
function modifier_arc_warden_magnetic_field_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.attack_speed_bonus = self.ability:GetSpecialValueFor("attack_speed_bonus")
	self.ability.evasion_chance = self.ability:GetSpecialValueFor("evasion_chance")
	self.ability.flight_speed = self.ability:GetSpecialValueFor("flight_speed")

	self.parent.magnetic_ability = self.ability

	self.parent.field_legendary_ability = self.parent:FindAbilityByName("arc_warden_magnetic_field_custom_legendary")
	if self.parent.field_legendary_ability then
		self.parent.field_legendary_ability:UpdateTalents()
	end

	if not IsServer() then
		return
	end
	self.aoe_table = {
		attacker = self.parent,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_PHYSICAL,
		damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK + DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
	}
end

function modifier_arc_warden_magnetic_field_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.attack_speed_bonus = self.ability:GetSpecialValueFor("attack_speed_bonus")
end

function modifier_arc_warden_magnetic_field_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_arc_warden_magnetic_field_custom_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if params.attacker ~= self.parent then
		return
	end

	if
		self.ability.talents.has_w7 == 1
		and self.parent.field_legendary_ability
		and self.parent:HasModifier("modifier_arc_warden_magnetic_field_custom_speed_count")
	then
		self.parent:CdAbility(
			self.parent.field_legendary_ability,
			self.ability.talents.w7_cd_inc,
			nil,
			"modifier_arc_warden_field_7"
		)
	end
end

function modifier_arc_warden_magnetic_field_custom_tracker:GetProcChance()
	return 100
end

function modifier_arc_warden_magnetic_field_custom_tracker:AttackProc(params, name)
	local attacker = params.attacker
	local target = params.target

	if not attacker:IsRealHero() then
		return
	end

	if self.ability.talents.has_w1 == 1 then
		local enemies = self.parent:FindTargets(self.ability.talents.w1_radius, target:GetAbsOrigin())
		self.aoe_table.damage = params.damage * self.ability.talents.w1_cleave
		local hit = false
		for _, aoe_target in pairs(enemies) do
			if aoe_target ~= target then
				hit = true
				self.aoe_table.victim = aoe_target
				DoDamage(self.aoe_table, "modifier_arc_warden_field_1")
			end
		end
		if hit then
			local particle =
				ParticleManager:CreateParticle("particles/drow_ranger/frost_cleave.vpcf", PATTACH_WORLDORIGIN, nil)
			ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
			ParticleManager:Delete(particle, 1)
		end
	end

	if attacker:HasModifier("modifier_arc_warden_magnetic_field_custom_speed_count") then
		if self.ability.talents.has_w3 == 1 then
			local duration = target:IsCreep() and self.ability.talents.w3_duration_creeps
				or self.ability.talents.w3_duration
			attacker:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_arc_warden_magnetic_field_custom_agi",
				{ duration = duration }
			)
			local agi_target = attacker:GetTempest()
			if agi_target then
				agi_target:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_arc_warden_magnetic_field_custom_agi",
					{ duration = duration }
				)
			end
		end

		if self.ability.talents.has_w4 == 1 then
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_arc_warden_magnetic_field_custom_slow",
				{ duration = self.ability.talents.w4_slow_duration }
			)
		end
	end
end

function modifier_arc_warden_magnetic_field_custom_tracker:GetModifierStatusResistanceStacking()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.h2_status
		* (
			(
					self.parent:HasModifier("modifier_arc_warden_magnetic_field_custom_speed_count")
					or self.parent:HasModifier("modifier_arc_warden_magnetic_field_custom_linger")
				)
				and self.ability.talents.h2_bonus
			or 1
		)
end

function modifier_arc_warden_magnetic_field_custom_tracker:GetModifierPhysicalArmorBonus()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.h2_armor
		* (
			(
					self.parent:HasModifier("modifier_arc_warden_magnetic_field_custom_speed_count")
					or self.parent:HasModifier("modifier_arc_warden_magnetic_field_custom_linger")
				)
				and self.ability.talents.h2_bonus
			or 1
		)
end

modifier_arc_warden_magnetic_field_custom_knock_cd = class(mod_hidden)
function modifier_arc_warden_magnetic_field_custom_knock_cd:RemoveOnDeath()
	return false
end
function modifier_arc_warden_magnetic_field_custom_knock_cd:OnCreated()
	self.RemoveForDuel = true
end

modifier_arc_warden_magnetic_field_custom_stun = class(mod_hidden)
function modifier_arc_warden_magnetic_field_custom_stun:IsStunDebuff()
	return true
end
function modifier_arc_warden_magnetic_field_custom_stun:IsPurgeException()
	return true
end
function modifier_arc_warden_magnetic_field_custom_stun:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_arc_warden_magnetic_field_custom_stun:GetStatusEffectName()
	return "particles/status_fx/status_effect_faceless_chronosphere.vpcf"
end
function modifier_arc_warden_magnetic_field_custom_stun:CheckState()
	return {
		[MODIFIER_STATE_FROZEN] = true,
		[MODIFIER_STATE_STUNNED] = true,
	}
end

modifier_arc_warden_magnetic_field_custom_linger = class(mod_hidden)

modifier_arc_warden_magnetic_field_custom_agi = class(mod_visible)
function modifier_arc_warden_magnetic_field_custom_agi:GetTexture()
	return "buffs/arc_warden/field_3"
end
function modifier_arc_warden_magnetic_field_custom_agi:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if self.parent.owner and self.parent.owner.magnetic_ability then
		self.ability = self.parent.owner.magnetic_ability
	end

	self.agi = self.ability.talents.w3_agi
	self.max = self.ability.talents.w3_max

	if not IsServer() then
		return
	end
	self.StackOnIllusion = true
	self:OnRefresh()
end

function modifier_arc_warden_magnetic_field_custom_agi:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_arc_warden_magnetic_field_custom_agi:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_arc_warden_magnetic_field_custom_agi:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
	}
end

function modifier_arc_warden_magnetic_field_custom_agi:GetModifierBonusStats_Agility()
	return self.agi * self:GetStackCount()
end

modifier_arc_warden_magnetic_field_custom_slow = class(mod_hidden)
function modifier_arc_warden_magnetic_field_custom_slow:IsPurgable()
	return true
end
function modifier_arc_warden_magnetic_field_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.w4_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", self)
end

function modifier_arc_warden_magnetic_field_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_arc_warden_magnetic_field_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

arc_warden_magnetic_field_custom_legendary = class({})
arc_warden_magnetic_field_custom_legendary.talents = {}

function arc_warden_magnetic_field_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w4 = 0,
			w4_range = caster:GetTalentValue("modifier_arc_warden_field_4", "range", true),

			has_w7 = 0,
			w7_incoming = caster:GetTalentValue("modifier_arc_warden_field_7", "incoming", true),
			w7_damage = caster:GetTalentValue("modifier_arc_warden_field_7", "damage", true),
			w7_duration = caster:GetTalentValue("modifier_arc_warden_field_7", "duration", true),
			w7_invun = caster:GetTalentValue("modifier_arc_warden_field_7", "invun", true),
			w7_radius = caster:GetTalentValue("modifier_arc_warden_field_7", "radius", true),
			w7_talent_cd = caster:GetTalentValue("modifier_arc_warden_field_7", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_arc_warden_field_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_arc_warden_field_7") then
		self.talents.has_w7 = 1
	end
end

function arc_warden_magnetic_field_custom_legendary:GetCooldown()
	return (self.talents.w7_talent_cd or 0) / self.caster:GetCooldownReduction()
end

function arc_warden_magnetic_field_custom_legendary:GetBehavior()
	local base = self.talents.has_w4 == 1 and DOTA_ABILITY_BEHAVIOR_POINT or DOTA_ABILITY_BEHAVIOR_NO_TARGET
	return base + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
end

function arc_warden_magnetic_field_custom_legendary:GetCastRange(vLocation, hTarget)
	if self.talents.has_w4 == 0 then
		return
	end
	return IsClient() and self.talents.w4_range or 99999
end

function arc_warden_magnetic_field_custom_legendary:OnSpellStart()
	local duration = self.talents.w7_invun

	local point = self.caster:GetAbsOrigin()
	if self.talents.has_w4 == 1 then
		local dir = self:GetCursorPosition() - point
		local max_range = self.talents.w4_range + self.caster:GetCastRangeBonus()
		local range = math.min(max_range, dir:Length2D())
		point = point + dir:Normalized() * range
	end
	self:EndCd(self.talents.w7_talent_cd)
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_arc_warden_magnetic_field_custom_legendary",
		{ x = point.x, y = point.y, duration = duration }
	)
end

modifier_arc_warden_magnetic_field_custom_legendary = class(mod_hidden)
function modifier_arc_warden_magnetic_field_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.main_ability = self.parent.magnetic_ability

	self.radius = self.ability.talents.w7_radius

	ProjectileManager:ProjectileDodge(self.parent)

	self.point = GetGroundPosition((Vector(table.x, table.y, 0)), nil)

	self.old_pos = self.parent:GetAbsOrigin()
	self.old_pos.z = self.old_pos.z + 150

	local effect =
		ParticleManager:CreateParticle("particles/arc_warden/field_blink_start.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect, 0, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(effect)

	local qangle_rotation_rate = 120
	local line_position = self.parent:GetAbsOrigin() + self.parent:GetForwardVector() * self.radius
	for i = 1, 3 do
		local qangle = QAngle(0, qangle_rotation_rate, 0)
		line_position = RotatePosition(self.parent:GetAbsOrigin(), qangle, line_position)

		local cast_particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(cast_particle, 0, self.old_pos)
		ParticleManager:SetParticleControl(cast_particle, 1, line_position)
		ParticleManager:SetParticleControl(cast_particle, 2, self.old_pos)
		ParticleManager:ReleaseParticleIndex(cast_particle)
	end

	local speed_mod = self.parent:FindModifierByName("modifier_arc_warden_magnetic_field_custom_thinker_speed")
	if speed_mod then
		speed_mod:OnIntervalThink()
		speed_mod:Destroy()
	end

	self.parent:EmitSound("Arc.Field_blink_start")
	self.parent:EmitSound("Arc.Field_blink_start2")

	self.parent:NoDraw(self)
	self.parent:AddNoDraw()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	self:StartIntervalThink(0.2)
end

function modifier_arc_warden_magnetic_field_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	FindClearSpaceForUnit(self.parent, self.point, true)
	self:StartIntervalThink(-1)
end

function modifier_arc_warden_magnetic_field_custom_legendary:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_DISARMED] = true,
	}
end

function modifier_arc_warden_magnetic_field_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:RemoveNoDraw()
	self.point.z = self.point.z + 150

	self:PlayEffect(self.parent)

	if not self.parent:IsAlive() then
		return
	end

	if IsValid(self.ability.active_illusion) then
		self.ability.active_illusion:Kill(nil, nil)
	end

	local illusions = CreateIllusions(self.parent, self.parent, {
		duration = self.ability.talents.w7_duration,
		outgoing_damage = -100 + self.ability.talents.w7_damage,
		incoming_damage = self.ability.talents.w7_incoming - 100,
	}, 1, self.radius / 2 + 60, false, true)

	for k, illusion in pairs(illusions) do
		illusion.owner = self.parent
		for _, mod in pairs(self.parent:FindAllModifiers()) do
			if mod.StackOnIllusion == true then
				illusion:UpgradeIllusion(mod:GetName(), mod:GetStackCount(), mod)
			end
		end

		illusion:AddNewModifier(
			illusion,
			self.ability,
			"modifier_arc_warden_magnetic_field_custom_legendary_illusion",
			{}
		)
		self:PlayEffect(illusion)

		illusion:SetOwner(nil)
		self.ability.active_illusion = illusion

		local enemies = FindUnitsInRadius(
			illusion:GetTeamNumber(),
			illusion:GetAbsOrigin(),
			nil,
			1200,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_HERO,
			DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
			FIND_CLOSEST,
			false
		)
		local creeps = FindUnitsInRadius(
			illusion:GetTeamNumber(),
			illusion:GetAbsOrigin(),
			nil,
			1200,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_BASIC,
			DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
			FIND_CLOSEST,
			false
		)

		if #enemies > 0 then
			illusion:SetForceAttackTarget(enemies[1])
		else
			if #creeps > 0 then
				illusion:SetForceAttackTarget(creeps[1])
			end
		end

		Timers:CreateTimer(0.5, function()
			if IsValid(illusion) then
				illusion:SetForceAttackTarget(nil)
			end
		end)
	end
end

function modifier_arc_warden_magnetic_field_custom_legendary:PlayEffect(unit)
	if not IsServer() then
		return
	end

	unit:EmitSound("Arc.Field_blink_end")
	unit:EmitSound("Arc.Field_blink_end2")

	unit:AddNewModifier(
		self.parent,
		self.main_ability,
		"modifier_arc_warden_magnetic_field_custom_thinker_speed",
		{ duration = self.main_ability.duration, original = 0 }
	)

	unit:MoveToPositionAggressive(unit:GetAbsOrigin())

	local point = unit:GetAbsOrigin()
	point.z = point.z + 150

	local qangle_rotation_rate = 120
	local line_position = unit:GetAbsOrigin() + unit:GetForwardVector() * self.radius
	for i = 1, 3 do
		local qangle = QAngle(0, qangle_rotation_rate, 0)
		line_position = RotatePosition(unit:GetAbsOrigin(), qangle, line_position)

		local cast_particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(cast_particle, 0, line_position)
		ParticleManager:SetParticleControl(cast_particle, 1, point)
		ParticleManager:SetParticleControl(cast_particle, 2, line_position)
		ParticleManager:ReleaseParticleIndex(cast_particle)
	end

	local effect = ParticleManager:CreateParticle(
		"particles/econ/items/earthshaker/earthshaker_arcana/earthshaker_arcana_blink_end.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect, 0, unit:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(effect)

	if unit:IsIllusion() then
		local illusion = unit
		local cast_particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			illusion
		)
		ParticleManager:SetParticleControlEnt(
			cast_particle,
			0,
			illusion,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			illusion:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			cast_particle,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			cast_particle,
			2,
			illusion,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			illusion:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(cast_particle)

		cast_particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			cast_particle,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			cast_particle,
			1,
			illusion,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			illusion:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			cast_particle,
			2,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(cast_particle)
	end
end

modifier_arc_warden_magnetic_field_custom_legendary_illusion = class(mod_hidden)
function modifier_arc_warden_magnetic_field_custom_legendary_illusion:CheckState()
	return {
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end