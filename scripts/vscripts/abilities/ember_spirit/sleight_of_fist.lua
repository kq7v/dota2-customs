--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_ember_spirit_sleight_of_fist_custom_target",
	"abilities/ember_spirit/sleight_of_fist",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_sleight_of_fist_custom_caster",
	"abilities/ember_spirit/sleight_of_fist",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_sleight_of_fist_custom_legendary",
	"abilities/ember_spirit/sleight_of_fist",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_fist_7"
)
LinkLuaModifier(
	"modifier_ember_spirit_sleight_of_fist_custom_slow",
	"abilities/ember_spirit/sleight_of_fist",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_hero_1"
)
LinkLuaModifier(
	"modifier_ember_spirit_sleight_of_fist_custom_tracker",
	"abilities/ember_spirit/sleight_of_fist",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_sleight_of_fist_custom_speed_bonus",
	"abilities/ember_spirit/sleight_of_fist",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_ember_hero_1" }
)
LinkLuaModifier(
	"modifier_ember_spirit_sleight_of_fist_custom_unslow",
	"abilities/ember_spirit/sleight_of_fist",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_fist_4"
)
LinkLuaModifier(
	"modifier_ember_spirit_sleight_of_fist_custom_magic",
	"abilities/ember_spirit/sleight_of_fist",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_fist_3"
)

ember_spirit_sleight_of_fist_custom = class({})
ember_spirit_sleight_of_fist_custom.talents = {}

function ember_spirit_sleight_of_fist_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_tgt.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_ember_spirit/ember_spirit_sleight_of_fist_cast.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_ember_spirit/ember_spirit_sleight_of_fist_caster.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_ember_spirit/ember_spirit_sleightoffist_trail.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_ember_spirit/ember_spirit_sleight_of_fist_targetted_marker.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_snapfire_slow.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/fist_shield.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/spray_double.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_parry.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/guard_stack.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/guard_resist_max.vpcf", context)
	PrecacheResource("model", "models/ember_spirit_fx.vmdl", context)
end

function ember_spirit_sleight_of_fist_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_cd = 0,

			w2_heal = 0,

			has_w3 = 0,
			w3_magic = 0,
			w3_damage = 0,
			w3_duration = caster:GetTalentValue("modifier_ember_fist_3", "duration", true),
			w3_max = caster:GetTalentValue("modifier_ember_fist_3", "max", true),
			w3_chance = caster:GetTalentValue("modifier_ember_fist_3", "chance", true),
			w3_damage_type = caster:GetTalentValue("modifier_ember_fist_3", "damage_type", true),

			has_w4 = 0,
			w4_range = caster:GetTalentValue("modifier_ember_fist_4", "range", true),
			w4_cd_items = caster:GetTalentValue("modifier_ember_fist_4", "cd_items", true),
			w4_duration = caster:GetTalentValue("modifier_ember_fist_4", "duration", true),

			has_w7 = 0,
			w7_damage_inc = caster:GetTalentValue("modifier_ember_fist_7", "damage_inc", true) / 100,
			w7_duration = caster:GetTalentValue("modifier_ember_fist_7", "duration", true),
			w7_damage_max = caster:GetTalentValue("modifier_ember_fist_7", "damage_max", true),
			w7_max = caster:GetTalentValue("modifier_ember_fist_7", "max", true),
			w7_effect_duration = caster:GetTalentValue("modifier_ember_fist_7", "effect_duration", true),
			w7_damage = caster:GetTalentValue("modifier_ember_fist_7", "damage", true),
			w7_min = caster:GetTalentValue("modifier_ember_fist_7", "min", true),
			w7_distance = caster:GetTalentValue("modifier_ember_fist_7", "distance", true),
			w7_cd_inc = caster:GetTalentValue("modifier_ember_fist_7", "cd_inc", true) / 100,
			w7_chance = caster:GetTalentValue("modifier_ember_fist_7", "chance", true),
			w7_interval = caster:GetTalentValue("modifier_ember_fist_7", "interval", true),

			has_h1 = 0,
			h1_move = 0,
			h1_slow = 0,
			h1_bonus = caster:GetTalentValue("modifier_ember_hero_1", "bonus", true),
			h1_duration = caster:GetTalentValue("modifier_ember_hero_1", "duration", true),

			has_h5 = 0,
			h5_heal = caster:GetTalentValue("modifier_ember_hero_5", "heal", true) / 100,
			h5_duration = caster:GetTalentValue("modifier_ember_hero_5", "duration", true),
			h5_shield = caster:GetTalentValue("modifier_ember_hero_5", "shield", true) / 100,
		}
	end

	if caster:HasTalent("modifier_ember_fist_1") then
		self.talents.w1_cd = caster:GetTalentValue("modifier_ember_fist_1", "cd")
	end

	if caster:HasTalent("modifier_ember_fist_2") then
		self.talents.w2_heal = caster:GetTalentValue("modifier_ember_fist_2", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_ember_fist_2", type = 1, value = self.talents.w2_heal })
	end

	if caster:HasTalent("modifier_ember_fist_3") then
		self.talents.has_w3 = 1
		self.talents.w3_magic = caster:GetTalentValue("modifier_ember_fist_3", "magic")
		self.talents.w3_damage = caster:GetTalentValue("modifier_ember_fist_3", "damage")
	end

	if caster:HasTalent("modifier_ember_fist_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_ember_fist_7") then
		self.talents.has_w7 = 1
		if IsServer() and self.tracker then
			self.tracker:InitLegendary()
		end
	end

	if caster:HasTalent("modifier_ember_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_move = caster:GetTalentValue("modifier_ember_hero_1", "move")
		self.talents.h1_slow = caster:GetTalentValue("modifier_ember_hero_1", "slow")
	end

	if caster:HasTalent("modifier_ember_hero_5") then
		self.talents.has_h5 = 1
	end
end

function ember_spirit_sleight_of_fist_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_ember_spirit_sleight_of_fist_custom_tracker"
end

function ember_spirit_sleight_of_fist_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_POINT
		+ DOTA_ABILITY_BEHAVIOR_AOE
		+ (self.talents.has_h5 == 1 and 0 or DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES)
end

function ember_spirit_sleight_of_fist_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w1_cd or 0)
end

function ember_spirit_sleight_of_fist_custom:GetAOERadius()
	return self.radius or 0
end

function ember_spirit_sleight_of_fist_custom:OnAbilityPhaseStart()
	return not self.caster:HasModifier("modifier_ember_spirit_activate_fire_remnant_custom_caster")
end

function ember_spirit_sleight_of_fist_custom:OnSpellStart()
	local target_loc = self:GetCursorPosition()
	local effect_radius = self.radius

	self.caster:EmitSound("Hero_EmberSpirit.SleightOfFist.Cast")

	local cast_pfx = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ember_spirit/ember_spirit_sleight_of_fist_cast.vpcf",
		PATTACH_CUSTOMORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(cast_pfx, 0, target_loc)
	ParticleManager:SetParticleControl(cast_pfx, 1, Vector(effect_radius, 1, 1))
	ParticleManager:ReleaseParticleIndex(cast_pfx)

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_ember_spirit_sleight_of_fist_custom_caster",
		{ x = target_loc.x, y = target_loc.y, disarmed = self.caster:IsDisarmed() and 1 or 0 }
	)
end

function ember_spirit_sleight_of_fist_custom:ProcCd()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w4 == 0 then
		return
	end

	self.caster:CdItems(self.talents.w4_cd_items, "modifier_ember_fist_4")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_ember_spirit_sleight_of_fist_custom_unslow",
		{ duration = self.talents.w4_duration }
	)
end

function ember_spirit_sleight_of_fist_custom:ProcDamage(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end
	if not RollPseudoRandomPercentage(self.talents.w3_chance, 1436, self.caster) then
		return
	end

	local hit_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
		PATTACH_CUSTOMORIGIN,
		target
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_ember_spirit_sleight_of_fist_custom_magic",
		{ duration = self.talents.w3_duration }
	)

	DoDamage(
		{
			victim = target,
			attacker = self.caster,
			ability = self,
			damage_type = self.talents.w3_damage_type,
			damage = self.talents.w3_damage,
		},
		"modifier_ember_fist_3"
	)
	target:SendNumber(4, self.talents.w3_damage)
	target:EmitSound("Ember.Fist_proc")
end

modifier_ember_spirit_sleight_of_fist_custom_caster = class(mod_visible)
function modifier_ember_spirit_sleight_of_fist_custom_caster:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.attack_interval = self.ability.attack_interval
	self.effect_radius = self.ability.radius
	self.damage = self.ability.bonus_hero_damage

	self.parent_loc = self.parent:GetAbsOrigin()
	self.previous_position = self.parent_loc

	self.current_count = 1
	self.sleight_targets = {}
	self.targets_hit = {}

	if not IsServer() then
		return
	end
	self.disarmed = params.disarmed
	local target_loc = GetGroundPosition(Vector(params.x, params.y, 0), nil)

	self.original_direction = (self.parent_loc - target_loc):Normalized()

	self.count = 1
	if self.ability.talents.has_w7 == 1 then
		self.attack_interval = self.ability.talents.w7_interval
		self.min = self.ability.talents.w7_min
		self.max = self.ability.talents.w7_max

		for i = self.min, (self.max - 1) do
			local index = 9043 + i
			if RollPseudoRandomPercentage(self.ability.talents.w7_chance, index, self.parent) then
				self.count = self.count + 1
			end
		end

		local effect_cast =
			ParticleManager:CreateParticle("particles/bristleback/spray_double.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetAbsOrigin() + Vector(0, 0, 275))
		ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.count, 0, 0))
		ParticleManager:ReleaseParticleIndex(effect_cast)
	end

	for _, enemy in
		pairs(
			self.parent:FindTargets(
				self.effect_radius,
				target_loc,
				FIND_ANY_ORDER,
				DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE + DOTA_UNIT_TARGET_FLAG_NO_INVIS
			)
		)
	do
		if enemy:IsUnit() then
			for i = 1, self.count do
				table.insert(self.sleight_targets, enemy:entindex())
			end
			enemy:AddNewModifier(self.parent, self.ability, "modifier_ember_spirit_sleight_of_fist_custom_target", {})
		end
	end

	if #self.sleight_targets == 0 then
		self.quick_end = true
		self:Destroy()
		return
	end

	self.RemoveForDuel = true

	self.particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ember_spirit/ember_spirit_sleight_of_fist_caster.vpcf",
		PATTACH_CUSTOMORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		self.particle,
		1,
		self.parent,
		PATTACH_CUSTOMORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlForward(self.particle, 1, self.parent:GetForwardVector())
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.parent:NoDraw(self, true)
	self.parent:AddNoDraw()
	self.ability:EndCd()

	self:OnIntervalThink()
	self:StartIntervalThink(self.attack_interval)
end

function modifier_ember_spirit_sleight_of_fist_custom_caster:OnIntervalThink()
	if not IsServer() then
		return
	end

	local current_target = nil

	if self.current_count > #self.sleight_targets then
		self:Destroy()
		return
	end

	for i = self.current_count, #self.sleight_targets do
		if self.sleight_targets[i] then
			current_target = EntIndexToHScript(self.sleight_targets[i])
			if IsValid(current_target) and current_target:IsAlive() then
				self.current_count = i + 1
				break
			end
		end
	end

	if not IsValid(current_target) or not current_target:IsAlive() then
		self:Destroy()
		return
	end

	local trail_pfx = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ember_spirit/ember_spirit_sleightoffist_trail.vpcf",
		PATTACH_CUSTOMORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(trail_pfx, 0, current_target:GetAbsOrigin())
	ParticleManager:SetParticleControl(trail_pfx, 1, self.previous_position)
	ParticleManager:ReleaseParticleIndex(trail_pfx)

	self.previous_position = current_target:GetAbsOrigin()
	self.parent:SetAbsOrigin(self.previous_position + self.original_direction * 64)

	if self.disarmed == 0 then
		self.parent:PerformAttack(current_target, true, true, true, false, false, false, false)

		current_target:EmitSound(
			wearables_system:GetSoundReplacement(self.parent, "Hero_EmberSpirit.SleightOfFist.Damage", self.ability)
		)
		local particle = ParticleManager:CreateParticle(
			"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_tgt.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			current_target
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			current_target,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			current_target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			current_target,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			current_target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)

		if not self.first and self.parent.remnant_activate_ability then
			self.first = true
			self.parent.remnant_activate_ability:ProcFire(current_target:GetAbsOrigin())
		end

		if not self.targets_hit[current_target] then
			self.targets_hit[current_target] = true
			self.ability:ProcDamage(current_target)
		end

		if self.ability.talents.has_w7 == 1 then
			current_target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_ember_spirit_sleight_of_fist_custom_legendary",
				{ duration = self.ability.talents.w7_effect_duration }
			)
		end

		if self.ability.talents.has_h1 == 1 then
			current_target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_ember_spirit_sleight_of_fist_custom_slow",
				{ duration = self.ability.talents.h1_duration }
			)
		end
	end

	self:StartIntervalThink(self.attack_interval)
end

function modifier_ember_spirit_sleight_of_fist_custom_caster:OnDestroy()
	if not IsServer() then
		return
	end
	if self.quick_end then
		return
	end

	if self.ability.talents.has_h1 == 1 or self.ability.talents.has_w4 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_ember_spirit_sleight_of_fist_custom_speed_bonus",
			{ duration = self.ability.talents.h1_duration }
		)
	end

	self.ability:ProcCd()

	if self.ability.talents.has_h5 == 1 then
		if IsValid(self.active_shield) then
			self.active_shield:Destroy()
		end

		self.active_shield = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield", {
			duration = self.ability.talents.h5_duration,
			max_shield = self.parent:GetMaxHealth() * self.ability.talents.h5_shield,
			shield_talent = "modifier_ember_hero_5",
			start_full = 1,
		})
		if self.active_shield then
			self.parent:GenericParticle("particles/ember_spirit/fist_shield.vpcf", self.active_shield)
			self.active_shield:SetHitFunction(function()
				self.parent:EmitSound("Juggernaut.Parry")
				local particle = ParticleManager:CreateParticle(
					"particles/juggernaut/jugg_parry.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					self.parent
				)
				ParticleManager:SetParticleControlEnt(
					particle,
					0,
					self.parent,
					PATTACH_POINT_FOLLOW,
					"attach_attack1",
					self.parent:GetAbsOrigin(),
					true
				)
				ParticleManager:SetParticleControl(particle, 1, self.parent:GetAbsOrigin())
				ParticleManager:ReleaseParticleIndex(particle)
			end)

			self.active_shield:SetEndFunction(function()
				if self.active_shield.shield and self.active_shield.shield <= 0 then
					self.parent:GenericHeal(
						self.parent:GetMaxHealth() * self.ability.talents.h5_heal,
						self.ability,
						false,
						false,
						"modifier_ember_hero_5"
					)
				end
			end)
		end
	end

	for _, target in pairs(self.sleight_targets) do
		local unit = EntIndexToHScript(target)
		if IsValid(unit) then
			unit:RemoveModifierByName("modifier_ember_spirit_sleight_of_fist_custom_target")
		end
	end

	self.ability:StartCd()

	local trail_pfx = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ember_spirit/ember_spirit_sleightoffist_trail.vpcf",
		PATTACH_CUSTOMORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(trail_pfx, 0, self.parent_loc)
	ParticleManager:SetParticleControl(trail_pfx, 1, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(trail_pfx)
	FindClearSpaceForUnit(self.parent, self.parent_loc, true)

	self.parent:EndNoDraw(self)
	self.parent:RemoveNoDraw()
end

function modifier_ember_spirit_sleight_of_fist_custom_caster:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_IGNORING_MOVE_AND_ATTACK_ORDERS] = true,
		[MODIFIER_STATE_DISARMED] = true,
	}
end

function modifier_ember_spirit_sleight_of_fist_custom_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_ember_spirit_sleight_of_fist_custom_caster:GetModifierIgnoreCastAngle()
	return 1
end

function modifier_ember_spirit_sleight_of_fist_custom_caster:GetModifierPreAttack_BonusDamage(params)
	if not IsServer() then
		return
	end
	if not params.target then
		return
	end
	if not params.target:IsHero() then
		return
	end

	return self.damage
end

function modifier_ember_spirit_sleight_of_fist_custom_caster:GetModifierTotalDamageOutgoing_Percentage(params)
	if self.ability.talents.has_w7 == 0 then
		return
	end
	if params.inflictor then
		return
	end
	return self.ability.talents.w7_damage - 100
end

modifier_ember_spirit_sleight_of_fist_custom_target = class(mod_hidden)
function modifier_ember_spirit_sleight_of_fist_custom_target:GetEffectName()
	return "particles/units/heroes/hero_ember_spirit/ember_spirit_sleight_of_fist_targetted_marker.vpcf"
end
function modifier_ember_spirit_sleight_of_fist_custom_target:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end

modifier_ember_spirit_sleight_of_fist_custom_tracker = class(mod_hidden)
function modifier_ember_spirit_sleight_of_fist_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.fist_ability = self.ability

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.bonus_hero_damage = self.ability:GetSpecialValueFor("bonus_hero_damage")
	self.ability.attack_interval = self.ability:GetSpecialValueFor("attack_interval")
end

function modifier_ember_spirit_sleight_of_fist_custom_tracker:OnRefresh()
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.bonus_hero_damage = self.ability:GetSpecialValueFor("bonus_hero_damage")
end

function modifier_ember_spirit_sleight_of_fist_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
	}
end

function modifier_ember_spirit_sleight_of_fist_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h1_move
		* (
			self.parent:HasModifier("modifier_ember_spirit_sleight_of_fist_custom_speed_bonus")
				and self.ability.talents.h1_bonus
			or 1
		)
end

function modifier_ember_spirit_sleight_of_fist_custom_tracker:GetModifierCastRangeBonusStacking()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_range
end

function modifier_ember_spirit_sleight_of_fist_custom_tracker:InitLegendary()
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

function modifier_ember_spirit_sleight_of_fist_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_ember_spirit_sleight_of_fist_custom_caster") then
		return
	end

	local pass = (self.parent:GetAbsOrigin() - self.pos):Length2D()
	self.pos = self.parent:GetAbsOrigin()

	if self.ability:GetCooldownTimeRemaining() <= 0 then
		self.distance = 0
		return
	end

	local final = self.distance + pass
	local max_distance = self.ability.talents.w7_distance

	if final >= max_distance then
		local delta = math.floor(final / max_distance)
		self.parent:CdAbility(self.ability, nil, self.ability.talents.w7_cd_inc * delta, "modifier_ember_fist_7")
		self.distance = final - delta * max_distance
	else
		self.distance = final
	end
end

modifier_ember_spirit_sleight_of_fist_custom_speed_bonus = class(mod_visible)
function modifier_ember_spirit_sleight_of_fist_custom_speed_bonus:GetTexture()
	return "buffs/ember_spirit/hero_2"
end
function modifier_ember_spirit_sleight_of_fist_custom_speed_bonus:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_ember_spirit_sleight_of_fist_custom_speed_bonus:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_ember_spirit_sleight_of_fist_custom_speed_bonus:GetEffectName()
	if self.ability.talents.has_w4 == 1 then
		return
	end
	return "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf"
end

modifier_ember_spirit_sleight_of_fist_custom_unslow = class(mod_hidden)
function modifier_ember_spirit_sleight_of_fist_custom_unslow:GetEffectName()
	return "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf"
end
function modifier_ember_spirit_sleight_of_fist_custom_unslow:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_ember_spirit_sleight_of_fist_custom_unslow:CheckState()
	return {
		[MODIFIER_STATE_UNSLOWABLE] = true,
	}
end

modifier_ember_spirit_sleight_of_fist_custom_slow = class(mod_hidden)
function modifier_ember_spirit_sleight_of_fist_custom_slow:IsPurgable()
	return true
end
function modifier_ember_spirit_sleight_of_fist_custom_slow:GetEffectName()
	return "particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf"
end
function modifier_ember_spirit_sleight_of_fist_custom_slow:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_ember_spirit_sleight_of_fist_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.h1_slow
end

function modifier_ember_spirit_sleight_of_fist_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_ember_spirit_sleight_of_fist_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_ember_spirit_sleight_of_fist_custom_magic = class(mod_visible)
function modifier_ember_spirit_sleight_of_fist_custom_magic:GetTexture()
	return "buffs/ember_spirit/guard_3"
end
function modifier_ember_spirit_sleight_of_fist_custom_magic:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w3_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_ember_spirit_sleight_of_fist_custom_magic:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Ember.Guard_resist")
		self.parent:GenericParticle("particles/ember_spirit/guard_resist_max.vpcf", self)
	end
end

function modifier_ember_spirit_sleight_of_fist_custom_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_ember_spirit_sleight_of_fist_custom_magic:GetModifierMagicalResistanceBonus()
	return self.ability.talents.w3_magic * self:GetStackCount()
end

modifier_ember_spirit_sleight_of_fist_custom_legendary = class(mod_visible)
function modifier_ember_spirit_sleight_of_fist_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true
	self.max = self.ability.talents.w7_damage_max
	self.damage = self.ability.talents.w7_damage_inc

	self.effect_cast = self.parent:GenericParticle("particles/ember_spirit/guard_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_ember_spirit_sleight_of_fist_custom_legendary:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.effect_cast then
		local number_1 = self:GetStackCount()
		local double = math.floor(number_1 / 10)
		local number_2 = number_1 - double * 10

		ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(double, number_1, number_2))
	end
end