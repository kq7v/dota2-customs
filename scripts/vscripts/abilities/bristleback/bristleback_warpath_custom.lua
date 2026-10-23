--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_bristleback_warpath",
	"abilities/bristleback/bristleback_warpath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_bristleback_warpath_buff",
	"abilities/bristleback/bristleback_warpath_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_custom_bristleback_warpath_legendary_crit",
	"abilities/bristleback/bristleback_warpath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_bristleback_warpath_legendary_cast",
	"abilities/bristleback/bristleback_warpath_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bristle_warpath_7"
)
LinkLuaModifier(
	"modifier_custom_bristleback_warpath_legendary_stack",
	"abilities/bristleback/bristleback_warpath_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bristle_warpath_7"
)
LinkLuaModifier(
	"modifier_custom_bristleback_warpath_bkb_cd",
	"abilities/bristleback/bristleback_warpath_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bristle_warpath_4"
)
LinkLuaModifier(
	"modifier_custom_bristleback_warpath_legendary_unit",
	"abilities/bristleback/bristleback_warpath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_bristleback_warpath_damage",
	"abilities/bristleback/bristleback_warpath_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bristle_warpath_3"
)

bristleback_warpath_custom = class({})
bristleback_warpath_custom.talents = {}

function bristleback_warpath_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_dawnbreaker/dawnbreaker_fire_wreath_smash.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_lowhp_.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bristleback/bristleback_warpath_dust.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bristleback/bristleback_warpath.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_legion_commander_duel.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/vindicators_axe_armor.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/warpath_hit.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/warptath_stone.vpcf", context)
	PrecacheResource("particle", "particles/centaur/edge_stack.vpcf", context)
end

function bristleback_warpath_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r1_radius = 0,
			r1_damage = 0,
			r1_range = 0,

			r2_status = 0,
			r2_max = 0,

			has_r3 = 0,
			r3_damage = 0,
			r3_heal = 0,
			r3_duration = caster:GetTalentValue("modifier_bristle_warpath_3", "duration", true),

			has_r4 = 0,
			r4_talent_cd = caster:GetTalentValue("modifier_bristle_warpath_4", "talent_cd", true),
			r4_max = caster:GetTalentValue("modifier_bristle_warpath_4", "max", true),
			r4_stack = caster:GetTalentValue("modifier_bristle_warpath_4", "stack", true),
			r4_bkb = caster:GetTalentValue("modifier_bristle_warpath_4", "bkb", true),

			has_r7 = 0,
			r7_duration = caster:GetTalentValue("modifier_bristle_warpath_7", "duration", true),
			r7_cast = caster:GetTalentValue("modifier_bristle_warpath_7", "cast", true),
			r7_talent_cd = caster:GetTalentValue("modifier_bristle_warpath_7", "talent_cd", true),
			r7_cast_inc = caster:GetTalentValue("modifier_bristle_warpath_7", "cast_inc", true),
			r7_speed = caster:GetTalentValue("modifier_bristle_warpath_7", "speed", true),
			r7_max = caster:GetTalentValue("modifier_bristle_warpath_7", "max", true),
			r7_damage = caster:GetTalentValue("modifier_bristle_warpath_7", "damage", true),
			r7_stun = caster:GetTalentValue("modifier_bristle_warpath_7", "stun", true),
			r7_damage_inc = caster:GetTalentValue("modifier_bristle_warpath_7", "damage_inc", true),
			r7_range = caster:GetTalentValue("modifier_bristle_warpath_7", "range", true),
			r7_damage_max = caster:GetTalentValue("modifier_bristle_warpath_7", "damage_max", true),
			r7_radius = caster:GetTalentValue("modifier_bristle_warpath_7", "radius", true),

			h3_armor = 0,
			h3_regen = 0,

			has_h6 = 0,
			h6_cdr = caster:GetTalentValue("modifier_bristle_hero_6", "cdr", true),
			h6_move = caster:GetTalentValue("modifier_bristle_hero_6", "move", true),
			h6_move_max = caster:GetTalentValue("modifier_bristle_hero_6", "move_max", true),
			h6_move_tooltip = caster:GetTalentValue("modifier_bristle_hero_6", "move_tooltip", true),
		}
	end

	if caster:HasTalent("modifier_bristle_warpath_1") then
		self.talents.r1_radius = caster:GetTalentValue("modifier_bristle_warpath_1", "radius")
		self.talents.r1_damage = caster:GetTalentValue("modifier_bristle_warpath_1", "damage")
		self.talents.r1_range = caster:GetTalentValue("modifier_bristle_warpath_1", "range")
	end

	if caster:HasTalent("modifier_bristle_warpath_2") then
		self.talents.r2_status = caster:GetTalentValue("modifier_bristle_warpath_2", "status")
		self.talents.r2_max = caster:GetTalentValue("modifier_bristle_warpath_2", "max")
	end

	if caster:HasTalent("modifier_bristle_warpath_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_bristle_warpath_3", "damage")
		self.talents.r3_heal = caster:GetTalentValue("modifier_bristle_warpath_3", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_bristle_warpath_3", type = 2, value = self.talents.r3_heal }
		)
	end

	if caster:HasTalent("modifier_bristle_warpath_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_bristle_warpath_7") then
		self.talents.has_r7 = 1
		if self.tracker then
			self.tracker:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_bristle_hero_3") then
		self.talents.h3_armor = caster:GetTalentValue("modifier_bristle_hero_3", "armor")
		self.talents.h3_regen = caster:GetTalentValue("modifier_bristle_hero_3", "regen")
	end

	if caster:HasTalent("modifier_bristle_hero_6") then
		self.talents.has_h6 = 1
	end

	if not IsServer() then
		return
	end

	local buff = caster:FindModifierByName("modifier_custom_bristleback_warpath_buff")
	if buff then
		buff:UpdateEvents()
	end
end

function bristleback_warpath_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "bristleback_warpath", self)
end

function bristleback_warpath_custom:GetCastAnimation()
	return
end

function bristleback_warpath_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_bristleback_warpath"
end

function bristleback_warpath_custom:GetCooldown(iLevel)
	if self.talents.has_r7 == 1 then
		return self.talents.r7_talent_cd
	end
	return 0
end

function bristleback_warpath_custom:GetCastPoint(iLevel)
	if self.talents.has_r7 == 1 then
		local cast = self.talents.r7_cast
		if self.caster:HasModifier("modifier_custom_bristleback_warpath_legendary_cast") then
			cast = cast
				+ self.caster:GetUpgradeStack("modifier_custom_bristleback_warpath_legendary_cast")
					* self.talents.r7_cast_inc
		end
		return cast
	end
	return 0
end

function bristleback_warpath_custom:GetCastRange(vector, hTarget)
	if self.talents.has_r7 == 0 then
		return
	end
	return self.talents.r7_range or 0
end

function bristleback_warpath_custom:GetAOERadius()
	if self.talents.has_r7 == 0 then
		return
	end
	return (self.talents.r7_radius or 0) + (self.talents.r1_radius or 0)
end

function bristleback_warpath_custom:GetBehavior()
	if self.talents.has_r7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function bristleback_warpath_custom:OnAbilityPhaseStart()
	self.caster:EmitSound("BB.Warpath_legendary_swing")
	local cast = self:GetCastPoint()

	local short = false
	local full_duration = 1.8
	if cast <= 0.5 then
		full_duration = 1.2
		short = true
	end

	local anim_k = full_duration / cast
	local time_1 = cast * 0.4
	local time_2 = cast * 0.8

	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_VICTORY, anim_k)

	self.timer_1 = Timers:CreateTimer(time_1, function()
		self.caster:EmitSound("BB.Warpath_legendary_swing")
	end)

	if not short then
		self.timer_2 = Timers:CreateTimer(time_2, function()
			self.caster:EmitSound("BB.Warpath_legendary_swing")
		end)
	end

	return true
end

function bristleback_warpath_custom:OnAbilityPhaseInterrupted()
	if not IsServer() then
		return
	end
	self.caster:FadeGesture(ACT_DOTA_VICTORY)

	if self.timer_1 ~= nil then
		Timers:RemoveTimer(self.timer_1)
	end

	if self.timer_2 ~= nil then
		Timers:RemoveTimer(self.timer_2)
	end
end

function bristleback_warpath_custom:OnSpellStart()
	if self.timer_1 then
		Timers:RemoveTimer(self.timer_1)
	end

	if self.timer_2 then
		Timers:RemoveTimer(self.timer_2)
	end

	self.caster:FadeGesture(ACT_DOTA_VICTORY)
	self.caster:RemoveModifierByName("modifier_custom_bristleback_warpath_legendary_cast")

	local origin = self:GetCursorPosition()
	local unit =
		CreateUnitByName("npc_dota_templar_assassin_psionic_trap", origin, false, nil, nil, self.caster:GetTeamNumber())
	unit:AddNewModifier(self.caster, self, "modifier_custom_bristleback_warpath_legendary_unit", { duration = 10 })

	self.caster:EmitSound("BB.Warpath_legendary_cast")

	local projectile = {
		Source = self.caster,
		Ability = self,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
		EffectName = "particles/bristleback/warptath_stone.vpcf",
		iMoveSpeed = self.talents.r7_speed,
		vSourceLoc = self.caster:GetAbsOrigin(),
		bDrawsOnMinimap = false,
		bDodgeable = false,
		flExpireTime = GameRules:GetGameTime() + 10,
		bProvidesVision = false,
		ExtraData = {},
		Target = unit,
	}

	ProjectileManager:CreateTrackingProjectile(projectile)
end

function bristleback_warpath_custom:OnProjectileHit(target, location)
	if not target then
		return
	end
	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_dawnbreaker/dawnbreaker_fire_wreath_smash.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, location)
	ParticleManager:ReleaseParticleIndex(particle)

	EmitSoundOnLocationWithCaster(location, "BB.Warpath_legendary", self.caster)
	EmitSoundOnLocationWithCaster(location, "BB.Warpath_legendary2", self.caster)

	self.caster:AddNewModifier(self.caster, self, "modifier_custom_bristleback_warpath_legendary_crit", {})

	local hit_type = 0
	for _, enemy in pairs(self.caster:FindTargets(self:GetAOERadius(), location)) do
		self.caster:PerformAttack(enemy, false, true, true, true, false, false, true)
		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_stunned",
			{ duration = self.talents.r7_stun * (1 - enemy:GetStatusResistance()) }
		)
		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_bristleback_warpath_legendary_stack",
			{ duration = self.talents.r7_duration }
		)

		if enemy:IsHero() then
			hit_type = 2
		elseif hit_type == 0 then
			hit_type = 1
		end
	end

	if hit_type ~= 0 and self.tracker then
		self.tracker:AddStack(hit_type == 2, true)
	end

	self.caster:RemoveModifierByName("modifier_custom_bristleback_warpath_legendary_crit")
	target:RemoveModifierByName("modifier_custom_bristleback_warpath_legendary_unit")
end

modifier_custom_bristleback_warpath = class(mod_hidden)
function modifier_custom_bristleback_warpath:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.warpath_ability = self.ability

	self.ability.damage_per_stack = self.ability:GetSpecialValueFor("damage_per_stack")
	self.ability.move_speed_per_stack = self.ability:GetSpecialValueFor("move_speed_per_stack")
	self.ability.max_stacks = self.ability:GetSpecialValueFor("max_stacks")
	self.ability.stack_duration = self.ability:GetSpecialValueFor("stack_duration")
end

function modifier_custom_bristleback_warpath:OnRefresh()
	self.ability.damage_per_stack = self.ability:GetSpecialValueFor("damage_per_stack")
	self.ability.move_speed_per_stack = self.ability:GetSpecialValueFor("move_speed_per_stack")
	self.ability.max_stacks = self.ability:GetSpecialValueFor("max_stacks")
end

function modifier_custom_bristleback_warpath:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
	}
end

function modifier_custom_bristleback_warpath:GetModifierAttackRangeBonus()
	if self.ability.talents.has_r7 == 1 then
		return
	end
	return self.ability.talents.r1_range
end

function modifier_custom_bristleback_warpath:GetModifierIgnoreMovespeedLimit()
	return self.ability.talents.has_h6 == 1 and 1 or 0
end

function modifier_custom_bristleback_warpath:GetModifierMoveSpeed_Max()
	return self.ability.talents.has_h6 == 1 and self.ability.talents.h6_move_max or nil
end

function modifier_custom_bristleback_warpath:GetModifierMoveSpeed_Limit()
	return self.ability.talents.has_h6 == 1 and self.ability.talents.h6_move_max or nil
end

function modifier_custom_bristleback_warpath:AddStack(hit_hero, self_ability)
	if not IsServer() then
		return
	end

	if
		hit_hero
		and self.ability.talents.has_r7 == 1
		and self.ability:GetCooldownTimeRemaining() <= 0
		and not self_ability
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_bristleback_warpath_legendary_cast",
			{ duration = self.ability.talents.r7_duration }
		)
	end

	if hit_hero and self.ability.talents.has_r3 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_bristleback_warpath_damage",
			{ duration = self.ability.talents.r3_duration }
		)
	end

	if self.parent:PassivesDisabled() then
		return
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_custom_bristleback_warpath_buff",
		{ duration = self.ability.stack_duration }
	)
end

function modifier_custom_bristleback_warpath:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end

	local stack = 0
	local override = nil
	local interval = -1
	local zero = nil
	local mod = self.parent:FindModifierByName("modifier_custom_bristleback_warpath_legendary_cast")

	if mod then
		stack = mod:GetStackCount()
	end

	if self.ability:GetCooldownTimeRemaining() > 0 then
		override = self.ability:GetCooldownTimeRemaining()
		interval = 0.1
		zero = 1
	end

	self.parent:UpdateUIlong({
		stack = stack,
		max = self.ability.talents.r7_max,
		override_stack = override,
		use_zero = zero,
		style = "BristWarpath",
	})
	self:StartIntervalThink(interval)
end

function modifier_custom_bristleback_warpath:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:UpdateUI()
end

modifier_custom_bristleback_warpath_buff = class(mod_visible)
function modifier_custom_bristleback_warpath_buff:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.max = self.ability.max_stacks + self.ability.talents.r2_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:UpdateEvents()

	local stack = 1

	if self.ability.talents.has_r4 == 1 then
		stack = self.ability.talents.r4_stack
	end

	for i = 1, stack do
		self:AddStack()
	end
end

function modifier_custom_bristleback_warpath_buff:OnRefresh()
	self.max = self.ability.max_stacks + self.ability.talents.r2_max
	if not IsServer() then
		return
	end
	self:AddStack()
end

function modifier_custom_bristleback_warpath_buff:UpdateEvents()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end

	self.parent:AddDamageEvent_inc(self, true)
end

function modifier_custom_bristleback_warpath_buff:AddStack()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:GenericParticle("particles/units/heroes/hero_bristleback/bristleback_warpath_dust.vpcf", self)

	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_bristleback/bristleback_warpath.vpcf",
		self
	)
	self.particle = ParticleManager:CreateParticle(pfx_name, PATTACH_POINT_FOLLOW, self.parent)
	local weapon_model = self.parent:GetItemWearableHandle("weapon")

	ParticleManager:SetParticleControlEnt(
		self.particle,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		4,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)

	if pfx_name == "particles/econ/items/bristleback/bristleback_dark_carnival/bristleback_carnival_warpath.vpcf" then
		local weapon = self.parent:GetItemWearableHandle("weapon_persona_1")
		if weapon then
			ParticleManager:SetParticleControlEnt(
				self.particle,
				6,
				weapon,
				PATTACH_POINT_FOLLOW,
				"attach_weapon",
				weapon:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				self.particle,
				29,
				weapon,
				PATTACH_POINT_FOLLOW,
				"attach_weapon_center",
				weapon:GetAbsOrigin(),
				true
			)
		end
	else
		if weapon_model then
			ParticleManager:SetParticleControlEnt(
				self.particle,
				6,
				weapon_model,
				PATTACH_POINT_FOLLOW,
				"attach_weapon",
				weapon_model:GetAbsOrigin(),
				true
			)
		else
			ParticleManager:SetParticleControlEnt(
				self.particle,
				6,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_weapon",
				self.parent:GetAbsOrigin(),
				true
			)
		end
	end

	self:AddParticle(self.particle, false, false, -1, false, false)
end

function modifier_custom_bristleback_warpath_buff:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self:GetStackCount() < self.ability.talents.r4_max then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	local attacker = params.attacker:FindOwner()

	if not attacker:IsUnit() then
		return
	end
	if not attacker:IsRealHero() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_custom_bristleback_warpath_bkb_cd") then
		return
	end
	self.parent:EmitSound("DOTA_Item.MinotaurHorn.Cast")
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_custom_bristleback_warpath_bkb_cd",
		{ duration = self.ability.talents.r4_talent_cd }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_generic_debuff_immune",
		{ duration = self.ability.talents.r4_bkb, effect = 2 }
	)
end

function modifier_custom_bristleback_warpath_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_custom_bristleback_warpath_buff:GetModifierPercentageCooldown()
	return ((self.ability.talents.has_h6 == 1 and self.ability.talents.h6_cdr or 0) / self.max) * self:GetStackCount()
end

function modifier_custom_bristleback_warpath_buff:GetModifierPhysicalArmorBonus()
	return (self.ability.talents.h3_armor / self.max) * self:GetStackCount()
end

function modifier_custom_bristleback_warpath_buff:GetModifierStatusResistanceStacking()
	return (self.ability.talents.r2_status / self.max) * self:GetStackCount()
end

function modifier_custom_bristleback_warpath_buff:GetModifierConstantHealthRegen()
	return (self.ability.talents.h3_regen / self.max) * self:GetStackCount()
end

function modifier_custom_bristleback_warpath_buff:GetModifierPreAttack_BonusDamage()
	return (self.ability.damage_per_stack + self.ability.talents.r1_damage) * self:GetStackCount()
end

function modifier_custom_bristleback_warpath_buff:GetModifierMoveSpeedBonus_Percentage()
	return (
		self.ability.move_speed_per_stack + (self.ability.talents.has_h6 == 1 and self.ability.talents.h6_move or 0)
	) * self:GetStackCount()
end

function modifier_custom_bristleback_warpath_buff:GetModifierModelScale()
	return (50 / self.max) * self:GetStackCount()
end

modifier_custom_bristleback_warpath_legendary_cast = class(mod_hidden)
function modifier_custom_bristleback_warpath_legendary_cast:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r7_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.mod = self.ability.tracker
	self:AddStack()
end

function modifier_custom_bristleback_warpath_legendary_cast:OnRefresh()
	if not IsServer() then
		return
	end
	self:AddStack()
end

function modifier_custom_bristleback_warpath_legendary_cast:AddStack()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if not self.mod then
		return
	end
	self.mod:UpdateUI()
end

function modifier_custom_bristleback_warpath_legendary_cast:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.mod then
		return
	end
	self.mod:UpdateUI()
end

modifier_custom_bristleback_warpath_legendary_crit = class(mod_hidden)
function modifier_custom_bristleback_warpath_legendary_crit:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.base = self.ability.talents.r7_damage
	self.inc = self.ability.talents.r7_damage_inc
	self.max = self.ability.talents.r7_damage_max
end

function modifier_custom_bristleback_warpath_legendary_crit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_custom_bristleback_warpath_legendary_crit:GetCritDamage()
	return self.max
end

function modifier_custom_bristleback_warpath_legendary_crit:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	local crit = self.base
	local mod = params.target:FindModifierByName("modifier_custom_bristleback_warpath_legendary_stack")
	if mod then
		crit = math.min(self.max, crit + self.inc * mod:GetStackCount())
	end
	return crit
end

modifier_custom_bristleback_warpath_bkb_cd = class(mod_cd)
function modifier_custom_bristleback_warpath_bkb_cd:GetTexture()
	return "buffs/bristleback/warpath_4"
end

modifier_custom_bristleback_warpath_legendary_unit = class(mod_hidden)
function modifier_custom_bristleback_warpath_legendary_unit:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
end

function modifier_custom_bristleback_warpath_legendary_unit:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
	}
end

function modifier_custom_bristleback_warpath_legendary_unit:OnDestroy()
	if not IsServer() then
		return
	end
	UTIL_Remove(self.parent)
end

modifier_custom_bristleback_warpath_legendary_stack = class(mod_hidden)
function modifier_custom_bristleback_warpath_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = math.floor(
		(self.ability.talents.r7_damage_max - self.ability.talents.r7_damage) / self.ability.talents.r7_damage_inc
	)
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.particle = self.parent:GenericParticle("particles/centaur/edge_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_custom_bristleback_warpath_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.particle then
		ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
	end
end

modifier_custom_bristleback_warpath_damage = class(mod_visible)
function modifier_custom_bristleback_warpath_damage:GetTexture()
	return "buffs/bristleback/warpath_3"
end
function modifier_custom_bristleback_warpath_damage:OnCreated()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:AddStack()
end

function modifier_custom_bristleback_warpath_damage:OnRefresh()
	if not IsServer() then
		return
	end
	self:AddStack()
end

function modifier_custom_bristleback_warpath_damage:AddStack()
	if not IsServer() then
		return
	end

	Timers:CreateTimer(self.ability.talents.r3_duration, function()
		if IsValid(self) then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)

	self:IncrementStackCount()
end

function modifier_custom_bristleback_warpath_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_custom_bristleback_warpath_damage:GetModifierDamageOutgoing_Percentage()
	return self:GetStackCount() * self.ability.talents.r3_damage
end