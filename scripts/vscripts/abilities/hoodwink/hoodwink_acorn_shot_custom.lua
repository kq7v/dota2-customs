--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_hoodwink_acorn_shot_custom",
	"abilities/hoodwink/hoodwink_acorn_shot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_acorn_shot_custom_thinker",
	"abilities/hoodwink/hoodwink_acorn_shot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_acorn_shot_custom_thinker_tree",
	"abilities/hoodwink/hoodwink_acorn_shot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_acorn_shot_custom_thinker_tree_target",
	"abilities/hoodwink/hoodwink_acorn_shot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_acorn_shot_custom_debuff",
	"abilities/hoodwink/hoodwink_acorn_shot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_acorn_shot_custom_armor_count",
	"abilities/hoodwink/hoodwink_acorn_shot_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_acorn_7"
)
LinkLuaModifier(
	"modifier_hoodwink_acorn_shot_custom_tracker",
	"abilities/hoodwink/hoodwink_acorn_shot_custom",
	LUA_MODIFIER_MOTION_NONE,
	false
)
LinkLuaModifier(
	"modifier_hoodwink_acorn_shot_custom_attack_cd",
	"abilities/hoodwink/hoodwink_acorn_shot_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_acorn_3"
)
LinkLuaModifier(
	"modifier_hoodwink_acorn_shot_custom_stun_cd",
	"abilities/hoodwink/hoodwink_acorn_shot_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_acorn_4"
)

hoodwink_acorn_shot_custom = class({})
hoodwink_acorn_shot_custom.talents = {}
hoodwink_acorn_shot_custom.armor_mod = nil

function hoodwink_acorn_shot_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_tracking.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_tree.vpcf", context)
	PrecacheResource("particle", "particles/tree_fx/tree_simple_explosion.vpcf", context)
	PrecacheResource("particle", "particles/generic/generic_armor_reduction.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/desolator_projectile.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/acorn_refresh.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/acorn_auto.vpcf", context)
end

function hoodwink_acorn_shot_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_damage = 0,
			q1_chance = caster:GetTalentValue("modifier_hoodwink_acorn_1", "chance", true),
			q1_bonus = caster:GetTalentValue("modifier_hoodwink_acorn_1", "bonus", true),

			q2_cd = 0,
			q2_heal = 0,

			h1_range = 0,
			h1_mana = 0,

			has_q3 = 0,
			q3_damage = 0,
			q3_count = 0,
			q3_cd = caster:GetTalentValue("modifier_hoodwink_acorn_3", "cd", true),
			q3_range = caster:GetTalentValue("modifier_hoodwink_acorn_3", "range", true),

			has_q4 = 0,
			q4_talent_cd = caster:GetTalentValue("modifier_hoodwink_acorn_4", "talent_cd", true),
			q4_cast = caster:GetTalentValue("modifier_hoodwink_acorn_4", "cast", true),
			q4_chance = caster:GetTalentValue("modifier_hoodwink_acorn_4", "chance", true),
			q4_max = caster:GetTalentValue("modifier_hoodwink_acorn_4", "max", true),
			q4_stun = caster:GetTalentValue("modifier_hoodwink_acorn_4", "stun", true),

			has_q7 = 0,
			q7_cd_inc = caster:GetTalentValue("modifier_hoodwink_acorn_7", "cd_inc", true) / 100,
			q7_armor = caster:GetTalentValue("modifier_hoodwink_acorn_7", "armor", true),
			q7_duration = caster:GetTalentValue("modifier_hoodwink_acorn_7", "duration", true),

			has_e3 = 0,
			e3_range = 0,

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_hoodwink_acorn_1") then
		self.talents.has_q1 = 1
		self.talents.q1_damage = caster:GetTalentValue("modifier_hoodwink_acorn_1", "damage")
		caster:AddRecordDestroyEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_hoodwink_acorn_2") then
		self.talents.q2_cd = caster:GetTalentValue("modifier_hoodwink_acorn_2", "cd")
		self.talents.q2_heal = caster:GetTalentValue("modifier_hoodwink_acorn_2", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_hoodwink_acorn_2", type = 2, value = self.talents.q2_heal }
		)
	end

	if caster:HasTalent("modifier_hoodwink_hero_1") then
		self.talents.h1_range = caster:GetTalentValue("modifier_hoodwink_hero_1", "range")
		self.talents.h1_mana = caster:GetTalentValue("modifier_hoodwink_hero_1", "mana")
	end

	if caster:HasTalent("modifier_hoodwink_acorn_3") then
		self.talents.has_q3 = 1
		self.talents.q3_damage = caster:GetTalentValue("modifier_hoodwink_acorn_3", "damage")
		self.talents.q3_count = caster:GetTalentValue("modifier_hoodwink_acorn_3", "count")
		caster:AddAttackStartEvent_out(self.tracker, true)
		if IsServer() and not self.tracker.auto_init then
			self.tracker.auto_init = true
			self.tracker:OnIntervalThink()
		end
	end

	if caster:HasTalent("modifier_hoodwink_acorn_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_hoodwink_acorn_7") then
		self.talents.has_q7 = 1
		caster:AddSpellEvent(self.tracker, true)
		self.tracker:UpdateUI()
	end

	if caster:HasTalent("modifier_hoodwink_scurry_3") then
		self.talents.has_e3 = 1
		self.talents.e3_range = caster:GetTalentValue("modifier_hoodwink_scurry_3", "range")
	end

	if caster:HasTalent("modifier_hoodwink_scurry_7") then
		self.talents.has_e7 = 1
	end
end

function hoodwink_acorn_shot_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_hoodwink_acorn_shot_custom_tracker"
end

function hoodwink_acorn_shot_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
end

function hoodwink_acorn_shot_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.q2_cd or 0)
end

function hoodwink_acorn_shot_custom:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_q4 == 1 and self.talents.q4_cast or 0)
end

function hoodwink_acorn_shot_custom:GetCastRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
		+ (self.talents.has_e3 == 1 and self.talents.e3_range or 0)
end

function hoodwink_acorn_shot_custom:OnSpellStart()
	local point = self:GetCursorPosition()

	if IsValid(self.tracker) and self.talents.has_q7 == 1 then
		self.tracker.can_cd = true
	end

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_hoodwink_acorn_shot_custom_thinker",
		{},
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

function hoodwink_acorn_shot_custom:OnProjectileHit_ExtraData(target, location, ExtraData)
	if not IsServer() then
		return
	end
	local thinker = EntIndexToHScript(ExtraData.thinker)

	if not thinker then
		return
	end
	local mod = thinker:FindModifierByName("modifier_hoodwink_acorn_shot_custom_thinker")
	if not IsValid(mod) then
		return
	end

	local is_auto = mod.is_auto

	if ExtraData.first == 1 and not is_auto then
		local pos = GetGroundPosition(location, nil) + Vector(0, 0, 100)
		local tree = self:SpawnTree(pos)
		mod.last_tree = tree:entindex()
	end

	local first = false
	if thinker.first_hit == true and ExtraData.first == 0 then
		thinker.first_hit = false
		first = true
	end

	thinker:SetAbsOrigin(location)
	self:PerformHit(target, location, first, is_auto)
	mod:Bounce()
end

function hoodwink_acorn_shot_custom:PerformHit(target, location, first, is_auto, is_scepter)
	if not IsServer() then
		return
	end
	local duration = self.debuff_duration
	local is_tree = not IsValid(target) or not target:IsUnit()

	EmitSoundOnLocationWithCaster(location, "Hero_Hoodwink.AcornShot.Target", self.caster)
	EmitSoundOnLocationWithCaster(location, "Hero_Hoodwink.AcornShot.Slow", self.caster)

	if IsValid(target) then
		local tree_mod = target:FindModifierByName("modifier_hoodwink_acorn_shot_custom_thinker_tree_target")
		if tree_mod then
			tree_mod:Destroy()
		end
	end

	if is_tree then
		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_impact.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(particle, 0, location)
		ParticleManager:ReleaseParticleIndex(particle)
		return
	else
		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_impact.vpcf",
			PATTACH_CUSTOMORIGIN,
			target
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
	end

	if first and not is_auto and not is_scepter then
		if target:TriggerSpellAbsorb(self) then
			return
		end
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_hoodwink_acorn_shot_custom",
		{ target = target:entindex(), is_auto = is_auto and 1 or 0, is_scepter = is_scepter and 1 or 0 }
	)
	self.caster:PerformAttack(target, true, true, true, true, false, false, false)
	self.caster:RemoveModifierByName("modifier_hoodwink_acorn_shot_custom")

	if
		self.talents.has_q4 == 1
		and not is_scepter
		and not target:HasModifier("modifier_hoodwink_acorn_shot_custom_stun_cd")
		and RollPseudoRandomPercentage(self.talents.q4_chance, 1849, self.caster)
	then
		target:EmitSound("Hoodwink.Acorn_stun")
		target:AddNewModifier(
			self.caster,
			self.caster:BkbAbility(self, true),
			"modifier_bashed",
			{ duration = (1 - target:GetStatusResistance()) * self.talents.q4_stun }
		)
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_hoodwink_acorn_shot_custom_stun_cd",
			{ duration = self.talents.q4_talent_cd }
		)
	end

	target:AddNewModifier(self.caster, self, "modifier_hoodwink_acorn_shot_custom_debuff", { duration = duration })

	if self.talents.has_q7 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_hoodwink_acorn_shot_custom_armor_count",
			{ duration = self.talents.q7_duration }
		)
	end
end

function hoodwink_acorn_shot_custom:SpawnTree(point)
	if not IsServer() then
		return
	end
	local tree = CreateTempTreeWithModel(
		GetGroundPosition(point, nil),
		self.tree_duration,
		"models/heroes/hoodwink/hoodwink_tree_model.vmdl"
	)
	tree.is_tree = true
	tree:SetSequence("hoodwink_tree_spawn")
	tree:SetSequence("hoodwink_tree_idle")
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_hoodwink_acorn_shot_custom_thinker_tree",
		{ duration = self.tree_duration - FrameTime(), tree = tree:entindex() },
		point,
		self.caster:GetTeamNumber(),
		false
	)

	return tree
end

modifier_hoodwink_acorn_shot_custom_thinker = class(mod_hidden)
function modifier_hoodwink_acorn_shot_custom_thinker:OnCreated(table)
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent.first_hit = true

	self.projectile_speed = self.caster:GetProjectileSpeed()
	self.bounces = self.ability.bounce_count + (self.ability.talents.has_q4 == 1 and self.ability.talents.q4_max or 0)
	self.target = self.parent

	if table.count then
		self.bounces = table.count + 1
		self.is_auto = true
		self.target = EntIndexToHScript(table.target)
	end

	self.delay = self.ability.bounce_delay
	self.range = self.ability.bounce_range
	self.source = self.caster

	self.info = {
		Ability = self.ability,
		EffectName = "particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_tracking.vpcf",
		iMoveSpeed = self.projectile_speed,
		bDodgeable = true,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_HITLOCATION,
		bVisibleToEnemies = true,
		bProvidesVision = true,
		iVisionRadius = 200,
		iVisionTeamNumber = self.caster:GetTeamNumber(),
		ExtraData = {
			thinker = self.parent:entindex(),
		},
	}

	self.caster:EmitSound("Hero_Hoodwink.AcornShot.Cast")
	self:StartIntervalThink(0)
end

function modifier_hoodwink_acorn_shot_custom_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end

	self:StartIntervalThink(-1)

	local first = 0
	if not self.first then
		self.first = true
		first = 1
	else
		self.source = self.parent
		local point = self.parent:GetAbsOrigin()
		if IsValid(self.target) then
			point = self.target:GetAbsOrigin()
			self.source = self.target
		end

		local enemies = self.caster:FindTargets(self.range, point)
		local next_target

		for _, enemy in pairs(enemies) do
			if enemy ~= self.target then
				next_target = enemy
				self.last_tree = nil
				break
			end
		end

		if not next_target then
			local trees = GridNav:GetAllTreesAroundPoint(point, self.range, false)
			if #trees > 0 then
				local min_tree
				local min_treedist = 99999
				for _, tree in pairs(trees) do
					local treedist = (tree:GetOrigin() - point):Length2D()
					if treedist < min_treedist and tree:entindex() ~= self.last_tree then
						min_tree = tree
						min_treedist = treedist
					end
				end
				if min_tree then
					local pos = GetGroundPosition(min_tree:GetAbsOrigin(), nil) + Vector(0, 0, 100)
					next_target = CreateModifierThinker(
						self.caster,
						self.ability,
						"modifier_hoodwink_acorn_shot_custom_thinker_tree_target",
						{ duration = 10 },
						pos,
						self.caster:GetTeamNumber(),
						false
					)
					self.last_tree = min_tree:entindex()
				end
			end
		end

		if not next_target then
			self:Destroy()
			return
		end

		self.target = next_target
		self.info.iMoveSpeed = self.projectile_speed / 2
	end

	self.info.Source = self.source
	self.info.Target = self.target
	self.info.ExtraData.first = first
	ProjectileManager:CreateTrackingProjectile(self.info)
	self.source:EmitSound("Hero_Hoodwink.AcornShot.Bounce")
end

function modifier_hoodwink_acorn_shot_custom_thinker:Bounce()
	if not IsServer() then
		return
	end
	self.bounces = self.bounces - 1
	if self.bounces <= 0 then
		self:Destroy()
		return
	end

	self:StartIntervalThink(self.delay)
end

function modifier_hoodwink_acorn_shot_custom_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	local parent = self.parent
	Timers:CreateTimer(FrameTime(), function()
		if IsValid(parent) then
			UTIL_Remove(parent)
		end
	end)
end

modifier_hoodwink_acorn_shot_custom_thinker_tree = class(mod_hidden)
function modifier_hoodwink_acorn_shot_custom_thinker_tree:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.tree = EntIndexToHScript(table.tree)
	if not self.tree then
		self:Destroy()
		return
	end

	self.vision = self.ability.tree_vision

	local units = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		100,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_NONE,
		0,
		false
	)
	for _, unit in pairs(units) do
		if unit:IsUnit() then
			FindClearSpaceForUnit(unit, unit:GetOrigin(), true)
		end
	end

	local particle_1 = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_tree.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.tree
	)
	ParticleManager:SetParticleControl(particle_1, 0, self.tree:GetOrigin())
	ParticleManager:SetParticleControl(particle_1, 1, Vector(1, 1, 1))
	ParticleManager:ReleaseParticleIndex(particle_1)

	local particle_2 =
		ParticleManager:CreateParticle("particles/tree_fx/tree_simple_explosion.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle_2, 0, self.tree:GetOrigin() + Vector(1, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle_2)

	self.interval = 0.1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_hoodwink_acorn_shot_custom_thinker_tree:OnIntervalThink()
	if not IsServer() then
		return
	end

	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), self.vision, self.interval * 2, false)

	if self.tree:IsNull() then
		self:Destroy()
	end
end

function modifier_hoodwink_acorn_shot_custom_thinker_tree:OnDestroy()
	if not IsServer() then
		return
	end
	GridNav:DestroyTreesAroundPoint(self.parent:GetAbsOrigin(), 10, true)
end

modifier_hoodwink_acorn_shot_custom_thinker_tree_target = class(mod_hidden)
function modifier_hoodwink_acorn_shot_custom_thinker_tree_target:OnCreated()
	self.parent = self:GetParent()
end

function modifier_hoodwink_acorn_shot_custom_thinker_tree_target:OnDestroy()
	if not IsServer() then
		return
	end
	local parent = self.parent
	Timers:CreateTimer(FrameTime(), function()
		if IsValid(parent) then
			UTIL_Remove(parent)
		end
	end)
end

modifier_hoodwink_acorn_shot_custom_tracker = class(mod_hidden)
function modifier_hoodwink_acorn_shot_custom_tracker:GetTexture()
	return "buffs/hoodwink/acorn_3"
end
function modifier_hoodwink_acorn_shot_custom_tracker:IsHidden()
	return self.ability.talents.has_q3 == 0 or self.parent:HasModifier("modifier_hoodwink_acorn_shot_custom_attack_cd")
end
function modifier_hoodwink_acorn_shot_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.acorn_ability = self.ability

	self.ability.acorn_shot_damage = self.ability:GetSpecialValueFor("acorn_shot_damage")
	self.ability.bounce_count = self.ability:GetSpecialValueFor("bounce_count")
	self.ability.base_damage_pct = self.ability:GetSpecialValueFor("base_damage_pct") / 100
	self.ability.bounce_range = self.ability:GetSpecialValueFor("bounce_range")
	self.ability.debuff_duration = self.ability:GetSpecialValueFor("debuff_duration")
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
	self.ability.bounce_delay = self.ability:GetSpecialValueFor("bounce_delay")
	self.ability.tree_duration = self.ability:GetSpecialValueFor("tree_duration")
	self.ability.tree_vision = self.ability:GetSpecialValueFor("tree_vision")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.aoe_damage = self.ability:GetSpecialValueFor("aoe_damage") / 100

	self.can_cd = false
	self.records = {}
	self.damage_table = {
		attacker = self.parent,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_PHYSICAL,
		damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
	}
	self.parent:AddProc(self, { land = true, sync = true })
end

function modifier_hoodwink_acorn_shot_custom_tracker:OnRefresh()
	self.ability.acorn_shot_damage = self.ability:GetSpecialValueFor("acorn_shot_damage")
	self.ability.bounce_count = self.ability:GetSpecialValueFor("bounce_count")
end

function modifier_hoodwink_acorn_shot_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		self:StartIntervalThink(0.2)
		return
	end

	self.parent:GenericParticle("particles/hoodwink/acorn_auto.vpcf")
	self.parent:EmitSound("Hoodwink.Acorn_auto")
	self:StartIntervalThink(-1)
end

function modifier_hoodwink_acorn_shot_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_hoodwink_acorn_shot_custom_tracker:GetModifierAttackRangeBonus()
	if self.ability.talents.has_q3 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_hoodwink_acorn_shot_custom_attack_cd") then
		return
	end
	return self.ability.talents.q3_range
end

function modifier_hoodwink_acorn_shot_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.h1_range
end

function modifier_hoodwink_acorn_shot_custom_tracker:GetModifierPercentageManacostStacking()
	return self.ability.talents.h1_mana
end

function modifier_hoodwink_acorn_shot_custom_tracker:GetModifierDamageOutgoing_Percentage()
	if self.parent:HasModifier("modifier_hoodwink_acorn_shot_custom") then
		return
	end
	return self.ability.talents.q3_damage
end

function modifier_hoodwink_acorn_shot_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if self.ability.talents.has_e7 == 1 then
		return
	end

	local max = self.ability.talents.q7_duration
	local stack = 0
	local override_stack = 0
	local zero = 0
	if IsValid(self.ability.armor_mod) then
		override_stack = self.ability.armor_mod:GetStackCount() * self.ability.talents.q7_armor
		stack = self.ability.armor_mod:GetRemainingTime()
		zero = 1
	end

	self.parent:UpdateUIlong({
		max = max,
		stack = stack,
		override_stack = override_stack,
		priority = 0,
		use_zero = zero,
		style = "HoodwinkAcorn",
	})
end

function modifier_hoodwink_acorn_shot_custom_tracker:GetCritChance()
	if self.ability.talents.has_q1 == 0 then
		return 0
	end
	if self.parent:HasModifier("modifier_hoodwink_acorn_shot_custom") then
		return self.ability.talents.q1_chance * self.ability.talents.q1_bonus, 5124
	end

	return self.ability.talents.q1_chance, 5123
end

function modifier_hoodwink_acorn_shot_custom_tracker:GetCritDamage()
	return self.ability.talents.q1_damage
end

function modifier_hoodwink_acorn_shot_custom_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q1 == 0 then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	local chance, index = self:GetCritChance()
	if not RollPseudoRandomPercentage(chance, index, self.parent) then
		return
	end
	self.records[params.record] = true
	return self:GetCritDamage()
end

function modifier_hoodwink_acorn_shot_custom_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if self.parent:HasModifier("modifier_hoodwink_acorn_shot_custom_attack_cd") then
		return
	end
	local target = params.target

	if not target:IsUnit() then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	CreateModifierThinker(
		self.parent,
		self.ability,
		"modifier_hoodwink_acorn_shot_custom_thinker",
		{ count = self.ability.talents.q3_count, target = target:entindex() },
		target:GetAbsOrigin(),
		self.parent:GetTeamNumber(),
		false
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_hoodwink_acorn_shot_custom_attack_cd",
		{ duration = self.ability.talents.q3_cd }
	)
end

function modifier_hoodwink_acorn_shot_custom_tracker:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	self.records[params.record] = nil
end

function modifier_hoodwink_acorn_shot_custom_tracker:GetProcChance()
	return 100
end

function modifier_hoodwink_acorn_shot_custom_tracker:AttackProc(params)
	if self.parent:HasModifier("modifier_hoodwink_acorn_shot_custom") then
		self.damage_table.damage = params.damage * self.ability.aoe_damage
		self.damage_table.victim = params.target
		for _, target in pairs(self.parent:FindTargets(200, params.target:GetAbsOrigin())) do
			if target ~= params.target then
				self.damage_table.victim = target
				DoDamage(self.damage_table)
			end
		end
	end

	if self.records[params.record] then
		params.target:EmitSound("DOTA_Item.Daedelus.Crit")
	end
end

function modifier_hoodwink_acorn_shot_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if not self.can_cd then
		return
	end
	if self.ability == params.ability then
		return
	end
	if self.ability:GetCooldownTimeRemaining() <= 0 then
		return
	end

	self.can_cd = false

	local particle =
		ParticleManager:CreateParticle("particles/hoodwink/acorn_refresh.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:CdAbility(self.ability, nil, self.ability.talents.q7_cd_inc, "modifier_hoodwink_acorn_7")
end

modifier_hoodwink_acorn_shot_custom = class(mod_hidden)
function modifier_hoodwink_acorn_shot_custom:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.is_auto = table.is_auto
	self.is_scepter = table.is_scepter

	self.damage = (
		self.ability.base_damage_pct * self.parent:GetAverageTrueAttackDamage(nil) + self.ability.acorn_shot_damage
	) * (1 + self.ability.talents.q3_damage / 100)

	self.target = EntIndexToHScript(table.target)
	if not self.target or not self.target:IsCreep() then
		return
	end
	self.damage = self.damage * (1 + self.ability.creeps_damage)
end

function modifier_hoodwink_acorn_shot_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE,
	}
end

function modifier_hoodwink_acorn_shot_custom:GetModifierOverrideAttackDamage()
	if not IsServer() then
		return
	end
	return self.damage
end

modifier_hoodwink_acorn_shot_custom_debuff = class(mod_visible)
function modifier_hoodwink_acorn_shot_custom_debuff:IsPurgable()
	return true
end
function modifier_hoodwink_acorn_shot_custom_debuff:GetTexture()
	return "hoodwink_acorn_shot"
end
function modifier_hoodwink_acorn_shot_custom_debuff:GetEffectName()
	return "particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_slow.vpcf"
end
function modifier_hoodwink_acorn_shot_custom_debuff:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_hoodwink_acorn_shot_custom_debuff:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", self, true)
end

function modifier_hoodwink_acorn_shot_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_hoodwink_acorn_shot_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_hoodwink_acorn_shot_custom_armor_count = class(mod_visible)
function modifier_hoodwink_acorn_shot_custom_armor_count:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.armor = self.ability.talents.q7_armor
	self.max = 10

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()

	if self.parent:IsRealHero() and not self.parent:IsTempestDouble() then
		self:OnIntervalThink()
		self:StartIntervalThink(0.1)
	end
end

function modifier_hoodwink_acorn_shot_custom_armor_count:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() == self.max then
		self.parent:EmitSound("Hoodwink.Acorn_armor")
		self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	end
end

function modifier_hoodwink_acorn_shot_custom_armor_count:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.ability.armor_mod then
		self.ability.armor_mod = self
	end

	if self.ability.armor_mod ~= self then
		return
	end
	if not IsValid(self.ability.tracker) then
		return
	end
	self.ability.tracker:UpdateUI()
end

function modifier_hoodwink_acorn_shot_custom_armor_count:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.armor_mod == self then
		self.ability.armor_mod = nil

		if IsValid(self.ability.tracker) then
			self.ability.tracker:UpdateUI()
		end
	end
end

function modifier_hoodwink_acorn_shot_custom_armor_count:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_hoodwink_acorn_shot_custom_armor_count:GetModifierPhysicalArmorBonus()
	return self.armor * self:GetStackCount()
end

modifier_hoodwink_acorn_shot_custom_attack_cd = class(mod_cd)
function modifier_hoodwink_acorn_shot_custom_attack_cd:GetTexture()
	return "buffs/hoodwink/acorn_3"
end
function modifier_hoodwink_acorn_shot_custom_attack_cd:OnCreated()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true
end

function modifier_hoodwink_acorn_shot_custom_attack_cd:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability.tracker) then
		return
	end
	self.ability.tracker:OnIntervalThink()
end

modifier_hoodwink_acorn_shot_custom_stun_cd = class(mod_hidden)