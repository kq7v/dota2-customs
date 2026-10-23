--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_tracker",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_thinker",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_stun",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_fire_debuff",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_frost_debuff",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_armor",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_jakiro_path_2"
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_damage",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_jakiro_path_1"
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_crit",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_charge",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL,
	{ true, "Shard" }
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_legendary_stack",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_jakiro_path_7"
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_legendary_active",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_jakiro_path_7" }
)
LinkLuaModifier(
	"modifier_jakiro_ice_path_custom_legendary_armor",
	"abilities/jakiro/jakiro_ice_path_custom",
	LUA_MODIFIER_MOTION_NONE
)

jakiro_ice_path_custom = class({})
jakiro_ice_path_custom.talents = {}

function jakiro_ice_path_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/jakiro/ice_path_custom.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/fire_path/fire_path.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_mars/mars_spear_impact_debuff.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/ice_path_fire_damage.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/ice_path_frost_debuff.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_frostbite_slow.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/path_legendary_stack_fire.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/path_legendary_stack_ice.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/path_legendary_fire_target.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/path_legendary_caster_fire.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/path_legendary_caster_ice.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/ice_path_custom_both.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_base_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_base_attack_dual.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_icepath_debuff.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/frost_heal.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_ice_start.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_arcane.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/scepter_shield_ice.vpcf", context)
end

function jakiro_ice_path_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_damage = 0,
			w1_range = 0,
			w1_max = caster:GetTalentValue("modifier_jakiro_path_1", "max", true),
			w1_duration = caster:GetTalentValue("modifier_jakiro_path_1", "duration", true),

			has_w2 = 0,
			w2_armor = 0,
			w2_slow = 0,
			w2_duration = caster:GetTalentValue("modifier_jakiro_path_2", "duration", true),

			has_w3 = 0,
			w3_damage = 0,
			w3_crit = 0,
			w3_duration = caster:GetTalentValue("modifier_jakiro_path_3", "duration", true),
			w3_max = caster:GetTalentValue("modifier_jakiro_path_3", "max", true),
			w3_radius = caster:GetTalentValue("modifier_jakiro_path_3", "radius", true),
			w3_targets = caster:GetTalentValue("modifier_jakiro_path_3", "targets", true),

			has_w4 = 0,
			w4_cd_inc = caster:GetTalentValue("modifier_jakiro_path_4", "cd_inc", true) / 100,
			w4_cast = caster:GetTalentValue("modifier_jakiro_path_4", "cast", true),
			w4_damage = caster:GetTalentValue("modifier_jakiro_path_4", "damage", true),
			w4_damage_inc = caster:GetTalentValue("modifier_jakiro_path_4", "damage_inc", true),
			w4_cd_inc_legendary = caster:GetTalentValue("modifier_jakiro_path_4", "cd_inc_legendary", true) / 100,

			has_w7 = 0,
			w7_duration = caster:GetTalentValue("modifier_jakiro_path_7", "duration", true),
			w7_radius = caster:GetTalentValue("modifier_jakiro_path_7", "radius", true),
			w7_damage = caster:GetTalentValue("modifier_jakiro_path_7", "damage", true),
			w7_range = caster:GetTalentValue("modifier_jakiro_path_7", "range", true),
			w7_armor = caster:GetTalentValue("modifier_jakiro_path_7", "armor", true) / 100,
			w7_armor_base = caster:GetTalentValue("modifier_jakiro_path_7", "armor_base", true),
			w7_speed = caster:GetTalentValue("modifier_jakiro_path_7", "speed", true),
			w7_stun = caster:GetTalentValue("modifier_jakiro_path_7", "stun", true),
			w7_max = caster:GetTalentValue("modifier_jakiro_path_7", "max", true),
			w7_cleave = caster:GetTalentValue("modifier_jakiro_path_7", "cleave", true) / 100,
			w7_cleave_radius = caster:GetTalentValue("modifier_jakiro_path_7", "cleave_radius", true),
			w7_shield_duration = caster:GetTalentValue("modifier_jakiro_path_7", "shield_duration", true),
			w7_shield_duration_creeps = caster:GetTalentValue("modifier_jakiro_path_7", "shield_duration_creeps", true),
			w7_shield = caster:GetTalentValue("modifier_jakiro_path_7", "shield", true) / 100,

			has_h1 = 0,
			h1_range = 0,
			h1_stun = 0,
		}
	end

	if caster:HasTalent("modifier_jakiro_path_1") then
		self.talents.has_w1 = 1
		self.talents.w1_damage = caster:GetTalentValue("modifier_jakiro_path_1", "damage")
		self.talents.w1_range = caster:GetTalentValue("modifier_jakiro_path_1", "range")
		if IsServer() then
			caster:AddSpellEvent(self.tracker, true)
		end
	end

	if caster:HasTalent("modifier_jakiro_path_2") then
		self.talents.has_w2 = 1
		self.talents.w2_armor = caster:GetTalentValue("modifier_jakiro_path_2", "armor")
		self.talents.w2_slow = caster:GetTalentValue("modifier_jakiro_path_2", "slow")
	end

	if caster:HasTalent("modifier_jakiro_path_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_jakiro_path_3", "damage")
		self.talents.w3_crit = caster:GetTalentValue("modifier_jakiro_path_3", "crit")
		caster:AddProc(self.tracker, { land = true })
		caster:AddRecordDestroyEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_jakiro_path_4") then
		self.talents.has_w4 = 1
		caster:AddAttackStartEvent_out(self.tracker)
	end

	if caster:HasTalent("modifier_jakiro_path_7") then
		self.talents.has_w7 = 1
		if IsServer() and not self.w7_init then
			self.w7_init = true
			self.tracker:UpdateUI()
			caster:AddAttackStartEvent_out(self.tracker)
			caster:AddProc(self.tracker, { land = true })
			caster:AddRecordDestroyEvent(self.tracker, true)
		end
		caster:AddLifesteal(self.tracker, {
			name = "modifier_jakiro_path_7",
			type = 2,
			heal = false,
			proc = "LifestealPath",
			value = function(params)
				if not self.tracker.legendary_records[params.record] then
					return 0
				end
				return self.talents.w7_shield
			end,
		})
	end

	if caster:HasTalent("modifier_jakiro_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_range = caster:GetTalentValue("modifier_jakiro_hero_1", "range")
		self.talents.h1_stun = caster:GetTalentValue("modifier_jakiro_hero_1", "stun")
	end
end

function jakiro_ice_path_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_jakiro_ice_path_custom_tracker"
end

function jakiro_ice_path_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") then
		return "jakiro_path_both"
	end
	if self.caster:HasModifier("modifier_jakiro_innate_custom_active_frost") then
		return wearables_system:GetAbilityIconReplacement(self.caster, "jakiro_ice_path", self)
	end
	return "jakiro_ice_path_fire"
end

function jakiro_ice_path_custom:GetCastAnimation()
	return 0
end

function jakiro_ice_path_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_POINT + (self.caster:HasShard() and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0)
end

function jakiro_ice_path_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_w4 == 1 and self.talents.w4_cast or 0)
end

function jakiro_ice_path_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if self.shard_init then
		return
	end
	if not self.caster:HasShard() then
		return
	end

	self.shard_init = true
	self:ToggleAutoCast()
end

function jakiro_ice_path_custom:OnAbilityPhaseStart()
	local anim_k = self.BaseClass.GetCastPoint(self)
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_2, anim_k / self:GetCastPoint(self:GetLevel()))
	return true
end

function jakiro_ice_path_custom:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_2)
end

function jakiro_ice_path_custom:OnSpellStart()
	local point = self.caster:CastPosition(self:GetCursorPosition())

	local vec = point - self.caster:GetAbsOrigin()
	vec.z = 0
	vec = vec:Normalized()

	local final_point = self.caster:GetAbsOrigin() + vec * (self.AbilityCastRange + self.caster:GetCastRangeBonus())
	local duration = self.path_duration
	local both = self.caster:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") and 1 or 0
	local is_ice = (self.caster:HasModifier("modifier_jakiro_innate_custom_active_frost") and both == 0) and 1 or 0

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate:SpellCast(self, is_ice)
	end

	if
		self.caster:HasShard()
		and self:GetAutoCastState()
		and not self.caster:IsRooted()
		and not self.caster:IsLeashed()
	then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_jakiro_ice_path_custom_charge",
			{ duration = self.shard_range / self.shard_speed, x = point.x, y = point.y }
		)
	end

	local mod = self.caster:FindModifierByName("modifier_jakiro_ice_path_custom_legendary_stack")
	if mod then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_jakiro_ice_path_custom_legendary_active",
			{ duration = self.talents.w7_duration, stack = mod:GetStackCount(), type = is_ice }
		)
		mod:Destroy()
	end

	self.caster:EmitSound("Hero_Jakiro.IcePath.Cast")
	CreateModifierThinker(
		self.caster,
		self.ability,
		"modifier_jakiro_ice_path_custom_thinker",
		{ duration = duration, x = final_point.x, y = final_point.y, is_ice = is_ice, both = both },
		self.caster:GetAbsOrigin(),
		self.caster:GetTeamNumber(),
		false
	)
end

function jakiro_ice_path_custom:OnProjectileHit(target, vLocation)
	if not IsServer() then
		return
	end
	if not target then
		return
	end

	self.caster.jakiro_w3 = true
	self.caster:PerformAttack(target, true, true, true, true, false, false, true, { damage = "jakiro_w3" })
	self.caster.jakiro_w3 = false

	target:EmitSound("Jakiro.Path_attack")
end

function jakiro_ice_path_custom:AbilityAttacks(is_ice)
	if not IsServer() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end
	local count = 0

	local projectile = {
		EffectName = is_ice == 1 and "particles/units/heroes/hero_jakiro/jakiro_base_attack.vpcf"
			or "particles/units/heroes/hero_jakiro/jakiro_base_attack_dual.vpcf",
		Source = self.caster,
		Ability = self,
		iMoveSpeed = 1200,
		vSourceLoc = self.caster:GetAbsOrigin(),
		bDodgeable = true,
		bVisibleToEnemies = true,
		flExpireTime = GameRules:GetGameTime() + 20,
		bProvidesVision = false,
	}

	local targets = self.caster:FindTargets(self.talents.w3_radius, nil, nil, DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE)

	for _, target in pairs(targets) do
		projectile.Target = target
		ProjectileManager:CreateTrackingProjectile(projectile)
		count = count + 1
		if count >= self.talents.w3_targets then
			break
		end
	end

	if #targets > 0 then
		self.caster:EmitSound("Jakiro.Path_attack_start")
	end
end

modifier_jakiro_ice_path_custom_tracker = class(mod_hidden)
function modifier_jakiro_ice_path_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.path_ability = self.ability

	self.ability.path_stun = self.ability:GetSpecialValueFor("path_stun")
	self.ability.fire_debuff = self.ability:GetSpecialValueFor("fire_debuff")
	self.ability.frost_debuff = self.ability:GetSpecialValueFor("frost_debuff")
	self.ability.frost_duration = self.ability:GetSpecialValueFor("frost_duration")
	self.ability.frost_stun = self.ability:GetSpecialValueFor("frost_stun") / 100
	self.ability.path_radius = self.ability:GetSpecialValueFor("path_radius")
	self.ability.fire_duration = self.ability:GetSpecialValueFor("fire_duration")
	self.ability.path_delay = self.ability:GetSpecialValueFor("path_delay")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.path_duration = self.ability:GetSpecialValueFor("path_duration")
	self.ability.AbilityCastRange = self.ability:GetSpecialValueFor("AbilityCastRange")
	self.ability.vision_duration = self.ability:GetSpecialValueFor("vision_duration")

	self.ability.shard_stun = self.ability:GetSpecialValueFor("shard_stun")
	self.ability.shard_range = self.ability:GetSpecialValueFor("shard_range")
	self.ability.shard_speed = self.ability:GetSpecialValueFor("shard_speed")

	if not IsServer() then
		return
	end
	self.crit_records = {}
	self.legendary_records = {}
end

function modifier_jakiro_ice_path_custom_tracker:OnRefresh(table)
	self.ability.path_stun = self.ability:GetSpecialValueFor("path_stun")
	self.ability.fire_debuff = self.ability:GetSpecialValueFor("fire_debuff")
	self.ability.frost_debuff = self.ability:GetSpecialValueFor("frost_debuff")
end

function modifier_jakiro_ice_path_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end

	local stack = 0
	local mod = self.parent:FindModifierByName("modifier_jakiro_ice_path_custom_legendary_stack")
	local active_mod = self.parent:FindModifierByName("modifier_jakiro_ice_path_custom_legendary_active")
	local active = 0
	local glow = 0

	if mod then
		stack = mod:GetStackCount()
	end

	if active_mod then
		stack = active_mod:GetStackCount()
		active = active_mod.type
		glow = 1
	end

	self.parent:UpdateUIlong({
		stack = stack,
		max = self.ability.talents.w7_max,
		no_min = 0,
		active = active,
		priority = 2,
		glow = glow,
		style = "JakiroPath",
	})
end

function modifier_jakiro_ice_path_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w1 == 0 then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_jakiro_ice_path_custom_damage",
		{ duration = self.ability.talents.w1_duration }
	)
end

function modifier_jakiro_ice_path_custom_tracker:GetProcChance()
	return 100
end

function modifier_jakiro_ice_path_custom_tracker:AttackProc(params, name)
	local target = params.target

	if self.crit_records[params.record] then
		target:EmitSound("DOTA_Item.Daedelus.Crit")
	end
end

function modifier_jakiro_ice_path_custom_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if params.no_attack_cooldown and not self.parent.jakiro_e7 then
		return
	end

	local target = params.target
	if not target:IsUnit() then
		return
	end

	local cd = nil

	if self.ability.talents.has_w7 == 1 then
		local mod = self.parent:FindModifierByName("modifier_jakiro_ice_path_custom_legendary_active")
		if mod and not params.no_attack_cooldown then
			self.legendary_records[params.record] = mod.type
			self.parent:EmitSound("Jakiro.Path_legnedary_launch_" .. mod.type)

			mod:DecrementStackCount()
			if mod:GetStackCount() <= 0 then
				mod:Destroy()
			end
			cd = self.ability.talents.w4_cd_inc_legendary
		end
	else
		cd = self.ability.talents.w4_cd_inc
	end

	if self.ability.talents.has_w4 == 0 or not cd then
		return
	end
	self.parent:CdAbility(self.ability, nil, cd, "modifier_jakiro_path_4")
end

function modifier_jakiro_ice_path_custom_tracker:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	self.crit_records[params.record] = nil
	self.legendary_records[params.record] = nil
end

function modifier_jakiro_ice_path_custom_tracker:LifestealPath(params, shield)
	local target = params.unit
	if
		self.legendary_records[params.record] == 1
		or self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve")
	then
		self.parent:GenericParticle("particles/drow_ranger/frost_heal.vpcf")

		local duration = target:IsCreep() and self.ability.talents.w7_shield_duration_creeps
			or self.ability.talents.w7_shield_duration

		if not IsValid(self.path_shield) then
			self.path_shield =
				self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield_multiple", {
					duration = duration,
					shield_talent = "modifier_jakiro_path_7",
				})

			if self.path_shield then
				self.path_shield.shield_attack_max = 0
				self.parent:GenericParticle("particles/jakiro/scepter_shield_ice_start.vpcf", self.path_shield)
				self.parent:GenericParticle("particles/crystal_maiden/maiden_arcane.vpcf")

				local pfx = ParticleManager:CreateParticle(
					"particles/jakiro/scepter_shield_ice.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					self.parent
				)
				ParticleManager:SetParticleControlEnt(
					pfx,
					1,
					self.parent,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					self.parent:GetAbsOrigin(),
					false
				)
				ParticleManager:SetParticleControl(pfx, 2, Vector(90, 90, 90))
				self.path_shield:AddParticle(pfx, false, false, -1, false, false)
			end
		end

		if self.path_shield then
			self.path_shield.shield_attack_max = self.path_shield.shield_attack_max + shield
			self.path_shield:AddShield(shield, self.path_shield.shield_attack_max)
			self.path_shield:SetDuration(duration, true)
		end
	end

	local damageTable = {
		attacker = self.parent,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_PURE,
		damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
		damage = params.damage * self.ability.talents.w7_cleave,
	}
	for _, aoe_target in pairs(self.parent:FindTargets(self.ability.talents.w7_cleave_radius, target:GetAbsOrigin())) do
		if target ~= aoe_target then
			damageTable.victim = aoe_target
			DoDamage(damageTable, "modifier_jakiro_path_7")
		end
	end
end

function modifier_jakiro_ice_path_custom_tracker:GetModifierProcAttack_Feedback(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local target = params.target
	if not target:IsUnit() then
		return
	end

	if not self.legendary_records[params.record] then
		return
	end

	if self.legendary_records[params.record] == 0 then
		local effect = ParticleManager:CreateParticle(
			"particles/jakiro/path_legendary_fire_target.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			effect,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(effect)

		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_jakiro_ice_path_custom_legendary_armor",
			{ duration = 0.1 }
		)
	end

	if
		self.legendary_records[params.record] == 1
		or self.parent:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve")
	then
		local stun_duration = (1 - target:GetStatusResistance()) * self.ability.talents.w7_stun
		local mod = target:FindModifierByName("modifier_jakiro_ice_path_custom_stun")
		if mod then
			mod:SetDuration(mod:GetRemainingTime() + stun_duration, true)
		else
			target:AddNewModifier(
				self.parent,
				self.parent:BkbAbility(self.ability, true),
				"modifier_bashed",
				{ duration = stun_duration }
			)
		end
	end

	target:EmitSound("Jakiro.Path_legnedary_target_" .. self.legendary_records[params.record])
end

function modifier_jakiro_ice_path_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
	}
end

function modifier_jakiro_ice_path_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.w1_range
end

function modifier_jakiro_ice_path_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.h1_range
end

function modifier_jakiro_ice_path_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if self.ability.talents.has_w3 == 0 then
		return
	end
	if not self.parent.jakiro_w3 then
		return
	end
	if params.inflictor then
		return
	end
	return self.ability.talents.w3_damage - 100
end

function modifier_jakiro_ice_path_custom_tracker:GetCritDamage()
	return self.ability.talents.w3_crit
end

function modifier_jakiro_ice_path_custom_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local target = params.target
	if not target:IsUnit() then
		return
	end

	local mod = target:FindModifierByName("modifier_jakiro_ice_path_custom_crit")
	if not mod then
		return
	end

	mod.count = mod.count - 1
	if mod.count <= 0 then
		mod:Destroy()
	end

	self.crit_records[params.record] = true
	return self:GetCritDamage()
end

modifier_jakiro_ice_path_custom_thinker = class(mod_hidden)
function modifier_jakiro_ice_path_custom_thinker:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.origin = self.parent:GetAbsOrigin()
	self.final_point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self.duration = table.duration
	self.width = self.ability.path_radius
	self.damage = self.ability.damage
	self.stun = self.ability.path_stun + self.ability.talents.h1_stun
	self.is_ice = table.is_ice
	self.both = table.both
	self.effect_ability = self.caster:BkbAbility(self.ability, self.caster:HasShard())

	local effect = "particles/jakiro/fire_path/fire_path.vpcf"
	local sound = "Jakiro.IcePath_fire"
	self.mod_name = "modifier_jakiro_ice_path_custom_fire_debuff"
	self.debuff_duration = self.ability.fire_duration

	local ice_path_sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Jakiro.IcePath", self)

	if self.is_ice == 1 then
		self.mod_name = "modifier_jakiro_ice_path_custom_frost_debuff"
		effect = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/jakiro/ice_path_custom.vpcf",
			self.ability,
			"jakiro_ice_path_custom"
		)
		sound = ice_path_sound
		self.debuff_duration = self.ability.frost_duration
	else
		self.parent:EmitSound("Jakiro.IcePath_fire2")
	end

	if self.both == 1 then
		self:PlayEffects("particles/jakiro/ice_path_custom_both.vpcf")
		self.parent:EmitSound(ice_path_sound)
	end

	if self.both == 1 or self.is_ice == 1 then
		self.stun = self.stun * (1 + self.ability.frost_stun)
	end

	self.parent:EmitSound(sound)
	self:PlayEffects(effect)

	self.timer = 0
	self.max_timer = 3

	self.targets = {}
	self.damageTable =
		{ attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL, damage = self.damage }

	if self.is_ice == 0 then
		self.damageTable.custom_flag = "jakiro_fire"
	end

	self.interval = self.ability.path_delay
	self:StartIntervalThink(self.interval)
end

function modifier_jakiro_ice_path_custom_thinker:PlayEffects(effect)
	if not IsServer() then
		return
	end

	local effect_cast = ParticleManager:CreateParticle(effect, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_cast, 0, self.origin)
	ParticleManager:SetParticleControl(effect_cast, 1, self.final_point)
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(self.duration, 0, 0))
	ParticleManager:SetParticleControl(effect_cast, 9, self.origin)
	self:AddParticle(effect_cast, false, false, -1, false, false)
end

function modifier_jakiro_ice_path_custom_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end

	local targets = FindUnitsInLine(
		self.caster:GetTeamNumber(),
		self.origin,
		self.final_point,
		nil,
		self.width,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		0
	)

	for _, target in pairs(targets) do
		if self.ability.talents.has_w2 == 1 then
			target:AddNewModifier(
				self.caster,
				self.effect_ability,
				"modifier_jakiro_ice_path_custom_armor",
				{ duration = self.ability.talents.w2_duration }
			)
		end

		if not self.targets[target] then
			self.targets[target] = true
			self.damageTable.victim = target

			target:AddNewModifier(self.caster, self.effect_ability, self.mod_name, { duration = self.debuff_duration })
			if self.both == 1 then
				target:AddNewModifier(
					self.caster,
					self.effect_ability,
					"modifier_jakiro_ice_path_custom_frost_debuff",
					{ duration = self.ability.frost_duration }
				)
			end

			DoDamage(self.damageTable)

			if self.ability.talents.has_w3 == 1 then
				target:AddNewModifier(
					self.caster,
					self.ability,
					"modifier_jakiro_ice_path_custom_crit",
					{ duration = self.ability.talents.w3_duration }
				)
			end

			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_generic_vision",
				{ duration = self.ability.vision_duration }
			)

			local stun_duration = (1 - target:GetStatusResistance()) * self.stun
			if self.caster:HasShard() and target:IsDebuffImmune() then
				stun_duration = stun_duration / self.ability.shard_stun
			end

			if self.is_ice == 1 then
				target:AddNewModifier(
					self.caster,
					self.effect_ability,
					"modifier_jakiro_ice_path_custom_stun",
					{ duration = stun_duration }
				)
			else
				local mod = target:AddNewModifier(
					self.caster,
					self.effect_ability,
					"modifier_stunned",
					{ duration = stun_duration }
				)
				if mod then
					target:GenericParticle("particles/units/heroes/hero_mars/mars_spear_impact_debuff.vpcf", mod, true)
				end
			end
		end
	end

	self.interval = 0.1
	self:StartIntervalThink(self.interval)
end

modifier_jakiro_ice_path_custom_stun = class(mod_hidden)
function modifier_jakiro_ice_path_custom_stun:IsStunDebuff()
	return true
end
function modifier_jakiro_ice_path_custom_stun:IsPurgeException()
	return true
end
function modifier_jakiro_ice_path_custom_stun:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_jakiro_ice_path_custom_stun:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_jakiro_ice_path_custom_stun:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:GenericParticle("particles/units/heroes/hero_jakiro/jakiro_icepath_debuff.vpcf", self)
	self.parent:GenericParticle("particles/generic_gameplay/generic_stunned.vpcf", self, true)
end

function modifier_jakiro_ice_path_custom_stun:CheckState()
	return {
		[MODIFIER_STATE_FROZEN] = true,
		[MODIFIER_STATE_STUNNED] = true,
	}
end

modifier_jakiro_ice_path_custom_fire_debuff = class(mod_visible)
function modifier_jakiro_ice_path_custom_fire_debuff:GetTexture()
	return "jakiro_ice_path_fire"
end
function modifier_jakiro_ice_path_custom_fire_debuff:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.path_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.damage = self.ability.fire_debuff
		+ (self.ability.talents.has_w4 == 1 and self.ability.talents.w4_damage_inc or 0)
	if not IsServer() then
		return
	end

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self)
	end

	self.parent:GenericParticle("particles/jakiro/ice_path_fire_damage.vpcf", self, true)
end

function modifier_jakiro_ice_path_custom_fire_debuff:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self, true)
	end
end

function modifier_jakiro_ice_path_custom_fire_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_jakiro_ice_path_custom_fire_debuff:GetModifierIncomingDamage_Percentage()
	return self.damage
end

modifier_jakiro_ice_path_custom_frost_debuff = class(mod_visible)
function modifier_jakiro_ice_path_custom_frost_debuff:GetTexture()
	return "jakiro_ice_path"
end
function modifier_jakiro_ice_path_custom_frost_debuff:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.path_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.damage = self.ability.frost_debuff + (self.ability.talents.has_w4 == 1 and self.ability.talents.w4_damage or 0)
	if not IsServer() then
		return
	end

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self)
	end

	self.parent:GenericParticle("particles/jakiro/ice_path_frost_debuff.vpcf", self, true)
end

function modifier_jakiro_ice_path_custom_frost_debuff:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self, true)
	end
end

function modifier_jakiro_ice_path_custom_frost_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_jakiro_ice_path_custom_frost_debuff:GetModifierDamageOutgoing_Percentage()
	return self.damage
end

function modifier_jakiro_ice_path_custom_frost_debuff:GetModifierSpellAmplify_Percentage()
	return self.damage
end

modifier_jakiro_ice_path_custom_damage = class(mod_visible)
function modifier_jakiro_ice_path_custom_damage:GetTexture()
	return "buffs/jakiro/path_1"
end
function modifier_jakiro_ice_path_custom_damage:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w1_max
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_jakiro_ice_path_custom_damage:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_jakiro_ice_path_custom_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_jakiro_ice_path_custom_damage:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.w1_damage * self:GetStackCount()
end

modifier_jakiro_ice_path_custom_armor = class(mod_hidden)
function modifier_jakiro_ice_path_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.path_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.armor = self.ability.talents.w2_armor
	self.slow = self.ability.talents.w2_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/crystal_maiden/maiden_frostbite_slow.vpcf", self)
end

function modifier_jakiro_ice_path_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_jakiro_ice_path_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

function modifier_jakiro_ice_path_custom_armor:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_jakiro_ice_path_custom_crit = class(mod_hidden)
function modifier_jakiro_ice_path_custom_crit:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.count = self.ability.talents.w3_max
end

function modifier_jakiro_ice_path_custom_crit:OnRefresh()
	if not IsServer() then
		return
	end
	self.count = self.ability.talents.w3_max
end

modifier_jakiro_ice_path_custom_charge = class(mod_hidden)
function modifier_jakiro_ice_path_custom_charge:GetStatusEffectName()
	return "particles/status_fx/status_effect_forcestaff.vpcf"
end
function modifier_jakiro_ice_path_custom_charge:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_jakiro_ice_path_custom_charge:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:StartGesture(ACT_DOTA_FLAIL)

	self.point = GetGroundPosition(Vector(params.x, params.y, 0), nil)

	self.dir = (self.point - self.parent:GetAbsOrigin())
	self.dir.z = 0

	self.speed = self.ability.shard_speed

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_jakiro_ice_path_custom_charge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_jakiro_ice_path_custom_charge:GetActivityTranslationModifiers()
	return "forcestaff_friendly"
end

function modifier_jakiro_ice_path_custom_charge:GetModifierDisableTurning()
	return 1
end

function modifier_jakiro_ice_path_custom_charge:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:InterruptMotionControllers(true)
	self.parent:FacePoint()
	ResolveNPCPositions(self.parent:GetAbsOrigin(), 128)

	self.parent:FadeGesture(ACT_DOTA_FLAIL)
end

function modifier_jakiro_ice_path_custom_charge:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	me:SetAbsOrigin(GetGroundPosition(me:GetAbsOrigin() + self.dir:Normalized() * self.speed * dt, nil))
end

function modifier_jakiro_ice_path_custom_charge:OnHorizontalMotionInterrupted()
	self:Destroy()
end

modifier_jakiro_ice_path_custom_legendary_stack = class(mod_hidden)
function modifier_jakiro_ice_path_custom_legendary_stack:RemoveOnDeath()
	return false
end
function modifier_jakiro_ice_path_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w7_max
	self.radius = self.ability.talents.w7_radius
	if not IsServer() then
		return
	end
	self.duration = self:GetRemainingTime()

	self:OnRefresh()
	self:StartIntervalThink(0.5)
end

function modifier_jakiro_ice_path_custom_legendary_stack:OnIntervalThink()
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

function modifier_jakiro_ice_path_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.ability.tracker then
		self.ability.tracker:UpdateUI()
	end
end

function modifier_jakiro_ice_path_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.ability.tracker then
		return
	end
	self.ability.tracker:UpdateUI()
end

modifier_jakiro_ice_path_custom_legendary_active = class(mod_hidden)
function modifier_jakiro_ice_path_custom_legendary_active:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.type = table.type
	self.RemoveForDuel = true

	local effect = "particles/jakiro/path_legendary_stack_fire.vpcf"
	local effect_cast = "particles/jakiro/path_legendary_caster_fire.vpcf"
	if self.type == 1 then
		effect_cast = "particles/jakiro/path_legendary_caster_ice.vpcf"
		effect = "particles/jakiro/path_legendary_stack_ice.vpcf"
	end

	self.parent:GenericParticle(effect_cast)
	self.particle = self.parent:GenericParticle(effect, self, true)
	self:SetStackCount(table.stack)
end

function modifier_jakiro_ice_path_custom_legendary_active:OnStackCountChanged()
	if not IsServer() then
		return
	end

	if self.ability.tracker then
		self.ability.tracker:UpdateUI()
	end

	if not self.particle then
		return
	end
	ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
end

function modifier_jakiro_ice_path_custom_legendary_active:OnDestroy()
	if not IsServer() then
		return
	end

	if not self.ability.tracker then
		return
	end
	self.ability.tracker:UpdateUI()
end

function modifier_jakiro_ice_path_custom_legendary_active:CheckState()
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_jakiro_ice_path_custom_legendary_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_jakiro_ice_path_custom_legendary_active:GetModifierAttackRangeBonus()
	return self.ability.talents.w7_range
end

function modifier_jakiro_ice_path_custom_legendary_active:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.w7_speed
end

function modifier_jakiro_ice_path_custom_legendary_active:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.w7_damage
end

modifier_jakiro_ice_path_custom_legendary_armor = class(mod_hidden)
function modifier_jakiro_ice_path_custom_legendary_armor:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.armor = self.parent:GetArmor(self)
end

function modifier_jakiro_ice_path_custom_legendary_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_jakiro_ice_path_custom_legendary_armor:GetModifierPhysicalArmorBonus()
	if not IsServer() then
		return
	end
	if not self.armor then
		return
	end
	return math.max(-self.armor, self.armor * self.ability.talents.w7_armor + self.ability.talents.w7_armor_base)
end