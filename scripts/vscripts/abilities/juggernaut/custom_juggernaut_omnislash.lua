--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_juggernaut_omnislash",
	"abilities/juggernaut/custom_juggernaut_omnislash.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_omnislash_tracker",
	"abilities/juggernaut/custom_juggernaut_omnislash.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_omnislash_root",
	"abilities/juggernaut/custom_juggernaut_omnislash.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_juggernaut_omnislash_4"
)
LinkLuaModifier(
	"modifier_custom_juggernaut_omnislash_move",
	"abilities/juggernaut/custom_juggernaut_omnislash.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_juggernaut_omnislash_4"
)
LinkLuaModifier(
	"modifier_custom_juggernaut_omnislash_attack",
	"abilities/juggernaut/custom_juggernaut_omnislash.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_omnislash_bonus",
	"abilities/juggernaut/custom_juggernaut_omnislash.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_omnislash_armor",
	"abilities/juggernaut/custom_juggernaut_omnislash.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_omnislash_more_attacks",
	"abilities/juggernaut/custom_juggernaut_omnislash.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_omnislash_legendary_mark",
	"abilities/juggernaut/custom_juggernaut_omnislash.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_juggernaut_omnislash_7"
)

custom_juggernaut_omnislash = class({})
custom_juggernaut_omnislash.talents = {}

function custom_juggernaut_omnislash:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_juggernaut/juggernaut_omni_slash_tgt.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_juggernaut/juggernaut_omni_slash_trail.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_juggernaut/juggernaut_omni_slash_tgt_scepter.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_juggernaut/juggernaut_omni_slash_trail_scepter.vpcf",
		context
	)
	PrecacheResource("particle", "particles/status_fx/status_effect_omnislash.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_swiftslash.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugger_stack.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/omni_root.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_legendary_proc_.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/iron_talon_active.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/crit_speed.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/armor_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_huskar/huskar_inner_fire_debuff.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/omni_attacks.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_tgt.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_juggernaut/juggernaut_omni_dash.vpcf", context)
end

function custom_juggernaut_omnislash:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r2_cd = 0,
			r2_range = 0,

			has_r3 = 0,
			r3_armor = 0,
			r3_damage = 0,
			r3_min = caster:GetTalentValue("modifier_juggernaut_omnislash_3", "min", true),
			r3_max = caster:GetTalentValue("modifier_juggernaut_omnislash_3", "max", true),
			r3_interval = caster:GetTalentValue("modifier_juggernaut_omnislash_3", "interval", true),
			r3_chance = caster:GetTalentValue("modifier_juggernaut_omnislash_3", "chance", true),

			has_r4 = 0,
			r4_duration = caster:GetTalentValue("modifier_juggernaut_omnislash_4", "duration", true),
			r4_cast = caster:GetTalentValue("modifier_juggernaut_omnislash_4", "cast", true),
			r4_move = caster:GetTalentValue("modifier_juggernaut_omnislash_4", "move", true),
			r4_root = caster:GetTalentValue("modifier_juggernaut_omnislash_4", "root", true),

			has_r7 = 0,
			r7_duration = caster:GetTalentValue("modifier_juggernaut_omnislash_7", "duration", true),
			r7_cd_inc = caster:GetTalentValue("modifier_juggernaut_omnislash_7", "cd_inc", true) / 100,
			r7_bva = caster:GetTalentValue("modifier_juggernaut_omnislash_7", "bva", true),
			r7_damage_type = caster:GetTalentValue("modifier_juggernaut_omnislash_7", "damage_type", true),
			r7_distance = caster:GetTalentValue("modifier_juggernaut_omnislash_7", "distance", true),
			r7_damage = caster:GetTalentValue("modifier_juggernaut_omnislash_7", "damage", true) / 100,
		}
	end

	if caster:HasTalent("modifier_juggernaut_omnislash_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_juggernaut_omnislash_2", "cd")
		self.talents.r2_range = caster:GetTalentValue("modifier_juggernaut_omnislash_2", "range")
	end

	if caster:HasTalent("modifier_juggernaut_omnislash_3") then
		self.talents.has_r3 = 1
		self.talents.r3_armor = caster:GetTalentValue("modifier_juggernaut_omnislash_3", "armor") / 100
		self.talents.r3_damage = caster:GetTalentValue("modifier_juggernaut_omnislash_3", "damage") / 100
	end

	if caster:HasTalent("modifier_juggernaut_omnislash_4") then
		self.talents.has_r4 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_juggernaut_omnislash_7") then
		self.talents.has_r7 = 1
		if IsServer() and not self.cd_init then
			self.cd_init = true
			self.tracker:UpdateUI()
			caster:AddProc(self.tracker, { damage = true, sync = true })
			self.tracker:StartIntervalThink(self.tracker.interval)
		end
	end
end

function custom_juggernaut_omnislash:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_juggernaut_omnislash_tracker"
end

function custom_juggernaut_omnislash:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "juggernaut_omni_slash", self)
end

function custom_juggernaut_omnislash:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_r4 == 1 and self.talents.r4_cast or 0)
end

function custom_juggernaut_omnislash:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.r2_cd or 0)
end

function custom_juggernaut_omnislash:IsArcana()
	return self.caster:GetModelName() == "models/heroes/juggernaut/juggernaut_arcana.vmdl"
end

function custom_juggernaut_omnislash:OnAbilityPhaseStart()
	return not self.caster:HasModifier("modifier_custom_juggernaut_blade_fury")
end

function custom_juggernaut_omnislash:OnSpellStart()
	local target = self:GetCursorTarget()

	self.sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Juggernaut.OmniSlash", self)
	self.juggernaut_tgt_particle = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_juggernaut/juggernaut_omni_slash_tgt.vpcf",
		self
	)
	self.juggernaut_trail_particle = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_juggernaut/juggernaut_omni_slash_trail.vpcf",
		self
	)

	self.caster:EmitSound(self.sound)
	self.caster:RemoveModifierByName("modifier_custom_juggernaut_omnislash")

	self.caster:InterruptMotionControllers(false)
	self.caster:Purge(false, true, false, false, false)

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_juggernaut_omnislash",
		{ target = target:entindex() }
	)
end

function custom_juggernaut_omnislash:DealAttack(target, is_auto)
	if not IsServer() then
		return
	end
	local auto = 0
	local effect = self.juggernaut_tgt_particle

	if is_auto then
		auto = 1
		effect = "particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_tgt.vpcf"
	end

	if self.talents.has_r3 == 1 then
		target:AddNewModifier(self.caster, self, "modifier_custom_juggernaut_omnislash_armor", {})
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_juggernaut_omnislash_attack",
		{ auto = auto, creep = target:IsCreep() and 1 or 0 }
	)
	self.caster:PerformAttack(target, true, true, true, false, false, false, auto == 1, { damage = "jugg_omnislash" })
	self.caster:RemoveModifierByName("modifier_custom_juggernaut_omnislash_attack")
	target:RemoveModifierByName("modifier_custom_juggernaut_omnislash_armor")

	if self.sound then
		target:EmitSound(self.sound)
	end

	if not effect then
		return
	end

	if
		self:IsArcana()
		or effect == "particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_omni_slash_tgt.vpcf"
		or effect == "particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_tgt.vpcf"
	then
		local particle = ParticleManager:CreateParticle(effect, PATTACH_ABSORIGIN_FOLLOW, target)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			target,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			target,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
	else
		local particle = ParticleManager:CreateParticle(effect, PATTACH_ABSORIGIN_FOLLOW, target)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(particle, 1, target:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(particle)
	end
end

function custom_juggernaut_omnislash:ApplyMove()
	if not IsServer() then
		return
	end

	if IsValid(self.caster.healing_ward_ability) and IsValid(self.caster.healing_ward_ability.ward) then
		self.caster.healing_ward_ability.ward:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_juggernaut_omnislash_move",
			{ duration = self.talents.r4_duration }
		)
	end

	self.caster:RemoveModifierByName("modifier_custom_juggernaut_omnislash_move")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_juggernaut_omnislash_move",
		{ duration = self.talents.r4_duration }
	)
end

modifier_custom_juggernaut_omnislash = class(mod_visible)
function modifier_custom_juggernaut_omnislash:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_custom_juggernaut_omnislash:GetStatusEffectName()
	return wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/status_fx/status_effect_omnislash.vpcf",
		self
	)
end
function modifier_custom_juggernaut_omnislash:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.interval = self.ability.interval
	self.attacks = self.ability.attacks
	self.radius = self.ability.radius
	self.count = 0

	if not IsServer() then
		return
	end

	self.target = EntIndexToHScript(table.target)

	self.end_interval = 0.15

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_custom_juggernaut_omnislash:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.count = self.count + 1

	local enemy = nil
	local final = self.target == nil

	if
		IsValid(self.target)
		and self.target:IsAlive()
		and not self.target:IsOutOfGame()
		and (not self.target:IsInvisible() or self.parent:CanEntityBeSeenByMyTeam(self.target))
		and ((self.target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() <= self.radius or self.count == 1)
	then
		enemy = self.target
	end

	if not enemy then
		enemy = self.parent:FindTargets(
			self.radius,
			nil,
			FIND_ANY_ORDER,
			DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAG_INVULNERABLE
		)[1]
	end

	if not enemy then
		if final then
			self:Destroy()
			return
		end

		self.target = nil
		self:StartIntervalThink(self.end_interval)
		return
	end

	self.target = enemy
	self.last_target = enemy

	self.parent:RemoveGesture(ACT_DOTA_OVERRIDE_ABILITY_4)
	self.parent:StartGesture(ACT_DOTA_OVERRIDE_ABILITY_4)

	local position1 = self.parent:GetAbsOrigin()
	local turn = (enemy:GetAbsOrigin() - position1):Normalized()
	turn.z = 0

	local line_pos = enemy:GetAbsOrigin() + turn * 120
	local qangle = QAngle(0, -30 + 60 * RandomInt(0, 1), 0)
	line_pos = RotatePosition(enemy:GetAbsOrigin(), qangle, line_pos)

	self.parent:SetAbsOrigin(line_pos + Vector(0, 0, 20))
	local position2 = self.parent:GetAbsOrigin()
	self.parent:FacePoint(enemy:GetAbsOrigin())

	local trail_pfx =
		ParticleManager:CreateParticle(self.ability.juggernaut_trail_particle, PATTACH_ABSORIGIN, self.parent)
	ParticleManager:SetParticleControl(trail_pfx, 0, position1)
	ParticleManager:SetParticleControl(trail_pfx, 1, position2)
	ParticleManager:ReleaseParticleIndex(trail_pfx)

	if self.count == 1 then
		local dash_arcana = wearables_system:GetParticleReplacementAbility(
			self.parent,
			"particles/units/heroes/hero_juggernaut/juggernaut_omni_dash.vpcf",
			self
		)
		if
			self.ability:IsArcana()
			or dash_arcana ~= "particles/units/heroes/hero_juggernaut/juggernaut_omni_dash.vpcf"
		then
			local vDirection = position2 - position1
			vDirection.z = 0

			local iParticleID = ParticleManager:CreateParticle(dash_arcana, PATTACH_CUSTOMORIGIN, self.parent)
			ParticleManager:SetParticleControl(iParticleID, 0, position1)
			ParticleManager:SetParticleControlForward(iParticleID, 0, -vDirection:Normalized())
			ParticleManager:SetParticleControlEnt(
				iParticleID,
				1,
				enemy,
				PATTACH_ABSORIGIN_FOLLOW,
				nil,
				enemy:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				iParticleID,
				2,
				enemy,
				PATTACH_ABSORIGIN_FOLLOW,
				nil,
				enemy:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(iParticleID)
		end
	end

	local linken = false
	if self.count == 1 and self.parent:GetName() == "npc_dota_hero_juggernaut" then
		if enemy:TriggerSpellAbsorb(self.ability) then
			linken = true
		end
	end

	if self.count == 1 and self.ability.talents.has_r4 == 1 then
		local particle =
			ParticleManager:CreateParticle("particles/juggernaut/jugger_stack.vpcf", PATTACH_ABSORIGIN_FOLLOW, enemy)
		ParticleManager:SetParticleControl(particle, 2, enemy:GetAbsOrigin() + Vector(0, 0, -100))
		ParticleManager:SetParticleControl(particle, 3, enemy:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(particle)

		enemy:EmitSound("Juggernaut.Omni_root")
		enemy:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_juggernaut_omnislash_root",
			{ duration = (1 - enemy:GetStatusResistance()) * self.ability.talents.r4_root }
		)
	end

	if not linken then
		self.ability:DealAttack(self.target)
	end

	if self.count >= self.attacks then
		self:Destroy()
		return
	end

	self:StartIntervalThink(self.interval)
end

function modifier_custom_juggernaut_omnislash:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.last_target) and self.ability.talents.has_r3 == 1 then
		self.last_target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_juggernaut_omnislash_more_attacks",
			{}
		)
	end

	if self.ability.talents.has_r4 == 1 then
		self.ability:ApplyMove()
	end

	self.parent:FadeGesture(ACT_DOTA_OVERRIDE_ABILITY_4)
	local vec = self.parent:GetForwardVector()
	vec.z = 0

	self.parent:FacePoint(self.parent:GetAbsOrigin() + vec * 10)
	self.parent:MoveToPositionAggressive(self.parent:GetAbsOrigin())
end

function modifier_custom_juggernaut_omnislash:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_SILENCED] = true,
	}
end

function modifier_custom_juggernaut_omnislash:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
	}
end

function modifier_custom_juggernaut_omnislash:GetModifierIgnoreCastAngle()
	return 1
end

modifier_custom_juggernaut_omnislash_attack = class(mod_hidden)
function modifier_custom_juggernaut_omnislash_attack:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if table.auto == 1 then
		self.is_auto = true
	end

	self.creeps = table.creep == 1 and self.ability.creeps_damage or 0
end

function modifier_custom_juggernaut_omnislash_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE,
	}
end

function modifier_custom_juggernaut_omnislash_attack:GetModifierOverrideAttackDamage()
	if not IsServer() then
		return
	end
	local damage = self.ability.damage_base + self.ability.damage * self.parent:GetAverageTrueAttackDamage(nil)
	if self.is_auto then
		damage = self.ability.talents.r3_damage * self.parent:GetAverageTrueAttackDamage(nil)
	end
	return damage * (1 + self.creeps)
end

modifier_custom_juggernaut_omnislash_tracker = class(mod_hidden)
function modifier_custom_juggernaut_omnislash_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self

	self.interval = 0.1
	self.pos = self.parent:GetAbsOrigin()
	self.distance = 0

	self.ability:UpdateTalents()

	self.parent.omnislash_ability = self.ability

	self.base_bva = self.parent:GetBaseAttackTime(false)

	self.ability.attacks = self.ability:GetSpecialValueFor("attacks")
	self.ability.damage = self.ability:GetSpecialValueFor("damage") / 100
	self.ability.damage_base = self.ability:GetSpecialValueFor("damage_base")
	self.ability.crit_bonus = self.ability:GetSpecialValueFor("crit_bonus")
	self.ability.interval = self.ability:GetSpecialValueFor("interval")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_custom_juggernaut_omnislash_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage") / 100
	self.ability.damage_base = self.ability:GetSpecialValueFor("damage_base")
end

function modifier_custom_juggernaut_omnislash_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end

	local pass = (self.parent:GetAbsOrigin() - self.pos):Length2D()
	self.pos = self.parent:GetAbsOrigin()

	if self.parent:HasModifier("modifier_custom_juggernaut_omnislash") then
		return
	end
	if self.ability:GetCooldownTimeRemaining() <= 0 then
		self.distance = 0
		return
	end

	local final = self.distance + pass
	if final >= self.ability.talents.r7_distance then
		local cd = self.ability:GetEffectiveCooldown(self.ability:GetLevel())
		local delta = math.floor(final / self.ability.talents.r7_distance)
		for i = 1, delta do
			self.parent:CdAbility(
				self.ability,
				cd * self.ability.talents.r7_cd_inc,
				nil,
				"modifier_juggernaut_omnislash_7"
			)
		end
		self.distance = final - delta * self.ability.talents.r7_distance
	else
		self.distance = final
	end
end

function modifier_custom_juggernaut_omnislash_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end
	local stack = 0
	local show = 0
	local mod = self.ability.legendary_mod
	if IsValid(mod) then
		stack = mod:GetStackCount()
		show = 1
	end

	self.parent:UpdateUIlong({ max = 1, stack = show, override_stack = stack, style = "JuggernautOmni" })
end

function modifier_custom_juggernaut_omnislash_tracker:GetProcChance(params)
	if params.damage <= 0 then
		return 0
	end
	if not params.target:IsRealHero() then
		return 0
	end
	return 100
end

function modifier_custom_juggernaut_omnislash_tracker:DamageProc(params, name)
	local unit = params.target

	if self.parent:HasModifier("modifier_custom_juggernaut_omnislash_attack") then
		unit:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_juggernaut_omnislash_legendary_mark",
			{ damage = params.damage, duration = self.ability.talents.r7_duration }
		)
	end

	local mod = unit:FindModifierByName("modifier_custom_juggernaut_omnislash_legendary_mark")
	if mod then
		mod:CheckDamage()
	end
end

function modifier_custom_juggernaut_omnislash_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if params.ability == self.ability then
		return
	end

	self.ability:ApplyMove()
end

function modifier_custom_juggernaut_omnislash_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
	}
end

function modifier_custom_juggernaut_omnislash_tracker:GetModifierBaseAttackTimeConstant()
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if not self.base_bva then
		return
	end
	return self.ability.talents.r7_bva + self.base_bva
end

function modifier_custom_juggernaut_omnislash_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.r2_range
end

modifier_custom_juggernaut_omnislash_root = class(mod_hidden)
function modifier_custom_juggernaut_omnislash_root:IsPurgable()
	return true
end
function modifier_custom_juggernaut_omnislash_root:GetEffectName()
	return "particles/juggernaut/omni_root.vpcf"
end
function modifier_custom_juggernaut_omnislash_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_custom_juggernaut_omnislash_legendary_mark = class(mod_visible)
function modifier_custom_juggernaut_omnislash_legendary_mark:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh(table)
	self:StartIntervalThink(0.1)
end

function modifier_custom_juggernaut_omnislash_legendary_mark:OnRefresh(table)
	if not IsServer() then
		return
	end
	local stack = table.damage * self.ability.talents.r7_damage
	self:SetStackCount(self:GetStackCount() + stack)

	if not IsValid(self.ability.legendary_mod) then
		self.ability.legendary_mod = self
	end

	self.ability.tracker:UpdateUI()
end

function modifier_custom_juggernaut_omnislash_legendary_mark:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:CheckDamage()
end

function modifier_custom_juggernaut_omnislash_legendary_mark:CheckDamage()
	if not IsServer() then
		return
	end
	if self.proced then
		return
	end
	if self.parent:GetHealth() > self:GetStackCount() then
		return
	end
	self.proced = true

	self.parent:GenericParticle("particles/juggernaut/jugg_legendary_proc_.vpcf")
	self.parent:EmitSound("DOTA_Item.Daedelus.Crit")
	self.parent:EmitSound("Juggernaut.Omni_legendary_proc")

	local trail_pfx =
		ParticleManager:CreateParticle("particles/items3_fx/iron_talon_active.vpcf", PATTACH_ABSORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		trail_pfx,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		trail_pfx,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(trail_pfx)

	local damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage = self:GetStackCount() + 10,
		damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION + DOTA_DAMAGE_FLAG_NO_DAMAGE_MULTIPLIERS,
		damage_type = self.ability.talents.r7_damage_type,
	}
	local real_damage = DoDamage(damageTable, "modifier_juggernaut_omnislash_7")
	self.parent:SendNumber(6, real_damage)

	self:Destroy()
end

function modifier_custom_juggernaut_omnislash_legendary_mark:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.legendary_mod == self then
		self.ability.legendary_mod = nil
		self.ability.tracker:UpdateUI()
	end
end

modifier_custom_juggernaut_omnislash_move = class(mod_visible)
function modifier_custom_juggernaut_omnislash_move:GetTexture()
	return "buffs/juggernaut/omnislash_4"
end
function modifier_custom_juggernaut_omnislash_move:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.move = self.ability.talents.r4_move

	if not IsServer() then
		return
	end
	if self.parent ~= self.caster then
		return
	end
	self.parent:GenericParticle("particles/juggernaut/crit_speed.vpcf", self)
end

function modifier_custom_juggernaut_omnislash_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
	}
end

function modifier_custom_juggernaut_omnislash_move:GetModifierMoveSpeed_Absolute()
	return self.move
end

modifier_custom_juggernaut_omnislash_armor = class(mod_hidden)
function modifier_custom_juggernaut_omnislash_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor = self.parent:GetPhysicalArmorBaseValue() * self.ability.talents.r3_armor * -1
end

function modifier_custom_juggernaut_omnislash_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_custom_juggernaut_omnislash_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

modifier_custom_juggernaut_omnislash_more_attacks = class(mod_hidden)
function modifier_custom_juggernaut_omnislash_more_attacks:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	local min = self.ability.talents.r3_min
	local max = self.ability.talents.r3_max

	self.stack = min
	for i = 1, (max - min) do
		if RollPercentage(self.ability.talents.r3_chance) then
			self.stack = self.stack + 1
		end
	end

	local effect_cast =
		ParticleManager:CreateParticle("particles/juggernaut/omni_attacks.vpcf", PATTACH_OVERHEAD_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.stack, 0, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	self.parent:EmitSound("Juggernaut.Omni_attacks")
	if self.stack >= max then
		self.parent:EmitSound("Juggernaut.Omni_attacks2")
	end

	self:StartIntervalThink(self.ability.talents.r3_interval)
end

function modifier_custom_juggernaut_omnislash_more_attacks:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.ability:DealAttack(self.parent, true)
	self.stack = self.stack - 1
	if self.stack <= 0 then
		self:Destroy()
		return
	end
end

custom_juggernaut_swift_slash = class({})
function custom_juggernaut_swift_slash:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_trail.vpcf",
		context
	)
	PrecacheResource("particle", "particles/econ/events/ti10/blink_dagger_start_ti10_lvl2_sparkles.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_dash.vpcf",
		context
	)
	PrecacheResource("particle", "particles/juggernaut/shard_blink_end.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_tgt.vpcf",
		context
	)
end

function custom_juggernaut_swift_slash:Spawn()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()
	self.caster.swift_ability = self
	if IsServer() then
		self:SetLevel(1)
	end
	self.range = self:GetLevelSpecialValueFor("AbilityCastRange", 1)
	self.stun = self:GetLevelSpecialValueFor("stun", 1)
	self.width = self:GetLevelSpecialValueFor("width", 1)
	self.cd_inc = self:GetLevelSpecialValueFor("cd_inc", 1)
end

function custom_juggernaut_swift_slash:GetCastRange(vector, hTarget)
	if IsClient() then
		return self.range or 0
	end
	return 999999
end

function custom_juggernaut_swift_slash:OnAbilityPhaseStart()
	return not self.caster:HasModifier("modifier_custom_juggernaut_blade_fury")
end

function custom_juggernaut_swift_slash:OnSpellStart()
	local point = self:GetCursorPosition()
	local max_range = self.range + self.caster:GetCastRangeBonus()
	local origin = self.caster:GetAbsOrigin()

	if point == origin then
		point = origin + self.caster:GetForwardVector() * 10
	end

	local vec = point - self.caster:GetAbsOrigin()
	if vec:Length2D() > max_range then
		point = origin + vec:Normalized() * max_range
	end

	local particle2 = ParticleManager:CreateParticle(
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_trail.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle2, 0, origin)
	ParticleManager:SetParticleControl(particle2, 1, point)
	ParticleManager:ReleaseParticleIndex(particle2)

	local particle3 = ParticleManager:CreateParticle(
		"particles/econ/events/ti10/blink_dagger_start_ti10_lvl2_sparkles.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle3, 0, origin)
	ParticleManager:ReleaseParticleIndex(particle3)

	local iParticleID = ParticleManager:CreateParticle(
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_dash.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.caster
	)
	ParticleManager:SetParticleControl(iParticleID, 0, origin)
	ParticleManager:SetParticleControlForward(iParticleID, 0, -vec:Normalized())
	ParticleManager:SetParticleControl(iParticleID, 1, point)
	ParticleManager:SetParticleControl(iParticleID, 2, point)
	ParticleManager:ReleaseParticleIndex(iParticleID)

	self.caster:EmitSound("Juggernaut.Stack")
	self.caster:SetAbsOrigin(point)
	self.caster:EmitSound(wearables_system:GetSoundReplacement(self.caster, "Hero_Juggernaut.OmniSlash", self))

	FindClearSpaceForUnit(self.caster, point, false)
	vec.z = 0
	self.caster:FacePoint(point + vec * 10)

	self.caster:GenericParticle("particles/juggernaut/shard_blink_end.vpcf")

	local enemies = FindUnitsInLine(
		self.caster:GetTeamNumber(),
		origin,
		point,
		nil,
		self.width,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_NONE
	)
	for _, target in pairs(enemies) do
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_bashed",
			{ duration = (1 - target:GetStatusResistance()) * self.stun }
		)

		local particle = ParticleManager:CreateParticle(
			"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_tgt.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			target,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			target,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)

		target:EmitSound("Hero_Juggernaut.OmniSlash")
		self.caster:PerformAttack(target, true, true, true, false, false, false, true)
	end
end